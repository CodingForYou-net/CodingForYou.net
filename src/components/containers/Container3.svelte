<script>
  import { _, store as lang, getTranslation } from '@helpers/translation.js';
  import ProductCard from '@components/ProductCard.svelte';
  import { user, isLoggedIn } from '@helpers/user.js';
  import { stripePublic } from '@config/keys.js';
  import { quillHtml } from '@helpers/other.js';
  import { stores, goto } from '@sapper/app';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Swal from 'sweetalert2';
  import { fade } from 'svelte/transition';

  export let products;

  let showDetails = false;
  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function buy(productID) {
    if (!$isLoggedIn) {
      const { dismiss } = await Swal.fire({
        title: getTranslation('plsLoginTitle'),
        text: getTranslation('plsLoginToBuy'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: getTranslation('login'),
        cancelButtonText: getTranslation('later'),
        width: 600,
      });
      if (!dismiss) {
        goto('/api/auth/google');
      }
    } else {
      let editor;
      setTimeout(() => {
        editor = new Quill('#editor', {
          modules: { toolbar: '#toolbar' },
          theme: 'snow',
          placeholder: getTranslation('editCommentsPlaceholder'),
        });
      }, 0);
      const { dismiss } = await Swal.fire({
        title: getTranslation('haveComments'),
        html: quillHtml,
        width: 1500,
        showCancelButton: true,
        cancelButtonText: getTranslation('cancel'),
      });
      if (dismiss) return;
      const comments = editor.container.firstChild.innerHTML;
      try {
        const res = await fetch(
          `/api/stripe/create-checkout-session
        ?productID=${productID}
        &cancelPath=%23buy
        &comments=${encodeURIComponent(comments)}`
            .replace(/\s/gm, '')
            .replace(/\n/gm, ''),
          {
            credentials: 'include',
          }
        );
        if (!res.ok) throw new Error(res.statusText);
        const { error } = await stripe.redirectToCheckout({
          sessionId: await res.text(),
        });
        if (error) throw error;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: getTranslation('errorRedirectingCheckout'),
        });
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  section {
    margin: 50px 0;
  }

  #repeating-top {
    background-image: url(/triangleUp.svg);
    background-repeat: repeat-x;
    background-size: 20px;
    height: 17px;
    margin-bottom: -1px;
    margin-left: -1px;
    overflow: hidden;
  }

  #repeating-bottom {
    background-image: url(/triangleDown.svg);
    background-repeat: repeat-x;
    background-size: 20px;
    height: 17px;
    margin-left: -1px;
    margin-top: -1px;
    overflow: hidden;
  }

  #content {
    background-color: $theme-green;
    color: white;
    padding: 50px 10%;
    text-align: center;
    #packages {
      display: grid;
      grid-gap: 50px;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      margin: 40px 0;
    }
  }

  #learnMore {
    cursor: pointer;
    display: inline-block;
    font-size: 1.25rem;
    &::after {
      background: white;
      content: '';
      display: block;
      height: 2px;
      transition: width 0.3s;
      width: 0;
    }
    &:hover::after {
      transition: width 0.3s;
      width: 100%;
    }
  }
</style>

<section id="buy">
  <div id="repeating-top" />
  <div id="content">
    <h2 data-scroll data-type="2">{$_('webPackages')}</h2>
    <h4 data-scroll data-type="1">{$_('webPackagesInstructions')}</h4>
    <div id="packages" in:fade={{ duration: 250 }}>
      {#each products as product (product._id)}
        <ProductCard {...product} {showDetails} on:click={() => buy(product._id)} />
      {/each}
    </div>
    <div id="learnMore" data-scroll data-type="2">
      <span on:click={() => (showDetails = !showDetails)}>
        {showDetails ? $_('learnLess') + ' -' : $_('learnMore') + ' +'}
      </span>
    </div>
  </div>
  <div id="repeating-bottom" />
</section>
