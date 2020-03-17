<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import products from '@config/products.js';
  import { stripePublic } from '@config/keys.js';

  const { page } = stores();
  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function buy(productID) {
    try {
      const res = await fetch(
        `/api/stripe/create-checkout-session?productID=${productID}&cancelPath=${$page.path}`
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
