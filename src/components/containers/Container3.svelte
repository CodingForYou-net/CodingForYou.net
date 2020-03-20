<script>
  import { _, store as lang, getTranslation } from '@helpers/translation.js';
  import { user, isLoggedIn } from '@helpers/user.js';
  import { stripePublic } from '@config/keys.js';
  import { quillHtml } from '@helpers/other.js';
  import { stores, goto } from '@sapper/app';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Swal from 'sweetalert2';

  const { page } = stores();
  let stripe;
  let products = [];
  let showDetails = false;

  onMount(async () => {
    stripe = Stripe(stripePublic);
    products = await (await fetch('/api/products')).json();
  });

  async function buy(productID) {
    if (!$isLoggedIn) {
      const { dismiss } = await Swal.fire({
        title: getTranslation('plsLoginTitle'),
        text: getTranslation('plsLoginText'),
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
        &cancelPath=${$page.path}
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
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
    margin-bottom: -0.5px;
    margin-left: -1px;
  }

  #repeating-bottom {
    background-image: url(/triangleDown.svg);
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
    margin-top: -1px;
    margin-left: -1px;
  }

  #content {
    background-color: $theme-green;
    text-align: center;
    color: white;
    padding: 20px 10%;
    & .packages {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      grid-gap: 50px;
      color: $theme-green;
      margin: 40px 0;
      & .package {
        display: flex;
        padding: 20px 50px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 10px;
        transition: transform 0.3s;
        cursor: pointer;
        img {
          width: 25%;
          min-width: 75px;
          float: right;
        }
        &:hover {
          transform: translateY(-10px);
        }
      }
    }
  }

  #learnMore {
    display: inline-block;
    &::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background: white;
      transition: width 0.3s;
    }
    &:hover::after {
      width: 100%;
      transition: width 0.3s;
    }
    div {
      font-size: 1.25rem;
      vertical-align: middle;
      display: flex;
      color: white;
      margin-bottom: 2px;
    }
  }

  .price {
    display: flex;
    position: relative;
    margin: 10px 0;
    & h1,
    h3 {
      margin: auto 0;
    }
  }
</style>

<section id="container3">
  <div id="repeating-top" />
  <div id="content">
    <h2>{$_('webPackages')}</h2>
    <div class="packages">
      {#each products as product (product._id)}
        <div class="package" on:click={() => buy(product._id)}>
          <h3>{product.name}</h3>
          <img src={product.images[0]} alt="aLt" />
          <div class="price">
            <h1>{product.amount / 100}$</h1>
            <h3>{product.currency.toUpperCase()}</h3>
          </div>
          <p>{product.description}</p>
          {#if product.features.length > 0 && showDetails}
            <ul transition:slide>
              {#each product.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
    <div id="learnMore">
      <div>
        <span on:click={() => (showDetails = !showDetails)}>{$_('learnMore')}</span>
      </div>
    </div>
  </div>
  <div id="repeating-bottom" />
</section>
