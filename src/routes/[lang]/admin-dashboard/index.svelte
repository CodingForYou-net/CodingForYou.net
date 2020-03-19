<script>
  import FuzzySearch from 'fuzzy-search';
  import { onMount } from 'svelte';

  let searchTerms;
  let orders = [];
  let searcher;
  let results;

  $: searcher = new FuzzySearch(orders, ['productID', 'user.email', 'user.lastName'], {
    sort: true,
  });
  $: results = searcher.search(searchTerms);

  onMount(async () => (orders = await fetchOrders()));

  async function fetchOrders() {
    try {
      const res = await fetch('/api/get-orders', { credentials: 'include' });
      if (!res.ok) throw 'err';
      const json = await res.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      alert('error');
    }
  }
</script>

<h1>Commandes</h1>
<input type="text" bind:value={searchTerms} />
<ol>
  {#each results as result}
    <li>{result.product.name} => {result.user.firstName} {result.user.lastName}</li>
  {/each}
</ol>
