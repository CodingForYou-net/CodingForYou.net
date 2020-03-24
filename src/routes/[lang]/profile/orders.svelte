<script>
  import { _, getTranslation } from '@helpers/translation.js';
  import { user } from '@helpers/user.js';
  import { onMount } from 'svelte';
  import { Toast } from '@helpers/other.js';

  let orders = [];

  onMount(async () => {
    orders = await fetchOrders();
  });

  async function fetchOrders() {
    try {
      const res = await fetch(`/api/orders?id=${$user.id}`, { credentials: 'include' });
      if (!res.ok) throw res.statusText;
      const json = await res.json();
      return json;
    } catch (err) {
      await Toast.fire({
        icon: 'error',
        title: getTranslation('errorLoadingOrders'),
      });
    }
  }
</script>

<style>
  section {
    padding: 50px 10%;
  }
</style>

<section>
  <h1>{$_('orders')}</h1>
</section>

{#each orders as order}
  <h1>{order.product.name}</h1>
{/each}
