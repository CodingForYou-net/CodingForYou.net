<script>
  import { _, getTranslation } from '@helpers/translation.js';
  import Spinner from 'svelte-spinner';
  import { user } from '@helpers/user.js';
  import { onMount } from 'svelte';
  import { Toast } from '@helpers/other.js';
  import { fade } from 'svelte/transition';
  import OrderCard from '@components/OrderCard.svelte';

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
  }
  #spinner-container {
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    #spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

<section class="page">
  <h1>{$_('orders')}</h1>
  {#if !orders}
    <div id="spinner-container">
      <div id="spinner">
        <Spinner size="60" speed="750" color="#272727" thickness="3" gap="40" />
      </div>
    </div>
  {/if}
  {#await orders}
    <div id="spinner-container">
      <div id="spinner">
        <Spinner size="60" speed="750" color="#272727" thickness="3" gap="40" />
      </div>
    </div>
  {:then orders}
    <div in:fade={{ duration: 250 }}>
      {#if orders}
        {#each orders as order}
          <OrderCard {...order} />
        {:else}
          <h3>{$_('noOrders')}</h3>
        {/each}
      {/if}
    </div>
  {/await}
</section>
