<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import products from '@config/products.js';
  import { stripePublic } from '@config/keys.js';
  import { store as lang } from '@helpers/translation.js';

  const { page } = stores();
  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function buy(productID) {
    try {
      // const res = await axios.get(`/api/stripe/create-checkout-session`, {
      //   params: {
      //     productID,
      //     cancelPath: $page.path,
      //     lang: $lang.current,
      //   },
      // });
      // const { error } = await stripe.redirectToCheckout({
      //   sessionId: res.data,
      // });
      // if (error) throw error;
      // const
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
