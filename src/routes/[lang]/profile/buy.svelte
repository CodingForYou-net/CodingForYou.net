<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import products from '@config/products.js';
  import { stripePublic } from '@config/keys.js';
  import Swal from 'sweetalert2';

  const { page } = stores();
  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function buy(productID) {
    const { value: comments } = await Swal.fire({
      title: 'Enter a text',
      input: 'text',
      showCancelButton: false,
    });
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
      alert('error');
      console.log(error);
    }
  }
</script>

<ul>
  {#each Object.entries(products) as product (product[0])}
    <li>
      {product[1].name}: {product[1].amount / 100}$CAD
      <button on:click={() => buy(product[0])}>Buy</button>
    </li>
  {/each}
</ul>
