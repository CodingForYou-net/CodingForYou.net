<script>
  import { _, getTranslation } from '@helpers/translation.js';
  import Spinner from 'svelte-spinner';
  import { user } from '@helpers/user.js';
  import { onMount } from 'svelte';
  import { Toast } from '@helpers/other.js';
  import { fade } from 'svelte/transition';

  let orders;

  onMount(async () => {
    orders = fetchOrders();
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

<style lang="scss">
  section {
    position: relative;
    height: 100vh;
  }
  #spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<section class="page">
  <h1>{$_('orders')}</h1>
  {#await orders}
    <div id="spinner">
      <Spinner size="60" speed="750" color="#272727" thickness="3" gap="40" />
    </div>
  {:then orders}
    <div in:fade={{ duration: 250 }}>
      {#if orders}
        {#each orders as order}
          <h1>{order.product.name}</h1>
        {/each}
      {/if}
    </div>
  {/await}
</section>
