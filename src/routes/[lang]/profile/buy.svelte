<script>
  import { onMount } from 'svelte';
  import products from '@config/products.js';
  import { stripePublic } from '@config/keys.js';

  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function buy(productID) {
    console.log('test');
    try {
      console.log('test1');
      const res = await fetch('/api/stripe/create-checkout-session');
      console.log(res);
    } catch (error) {
      console.log('test2');
      console(error);
    }
    // const { error } = await stripe.redirectToCheckout({
    //   items: [{ sku: 'sku_GrDM0TwVZHIk7N', quantity: 1 }],
    //   successUrl: 'http://localhost:3000/success',
    //   cancelUrl: 'http://localhost:3000/canceled',
    // });
    // if (error) alert('payment is broken');
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
