<script>
  import { onMount } from 'svelte';
  import { stripePublic } from '@config/keys.js';

  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function startCheckout() {
    const { error } = await stripe.redirectToCheckout({
      items: [{ sku: 'sku_GrDM0TwVZHIk7N', quantity: 1 }],
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/canceled',
    });
    if (error) alert('payment is broken');
  }
</script>

<h1>this is a scam</h1>
<button on:click={startCheckout}>Buy</button>
