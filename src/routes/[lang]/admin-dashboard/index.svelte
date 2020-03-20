<script>
  import FuzzySearch from 'fuzzy-search';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import OrderCard from '@components/OrderCard.svelte';
  import Swal from 'sweetalert2';
  import { quillHtml } from '@helpers/other.js';

  let searchTerms = '';
  let searchCategories = ['product.name', 'user.firstName', 'user.lastName', 'user.email'];
  let allOrders = [];
  let searcher;
  let filter = 'not-completed';

  $: orders = allOrders
    .filter((o) => (filter === 'completed' ? o.completed : true))
    .filter((o) => (filter === 'not-completed' ? !o.completed : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  $: searcher = new FuzzySearch(orders, searchCategories, {
    sort: true,
  });
  $: searchResults = searcher ? searcher.search(searchTerms) : [];

  onMount(async () => {
    allOrders = await fetchOrders();
  });

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders', { credentials: 'include' });
      if (!res.ok) throw 'err';
      const json = await res.json();
      return json;
    } catch (error) {
      alert('error');
    }
  }

  async function updateOrderStatus(orderID) {
    const order = allOrders.find((o) => o._id === orderID);
    const res = await fetch('/api/update-order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: orderID,
        update: { completed: !order.completed },
      }),
    });
    if (!res.ok) return alert('error');
    order.completed = !order.completed;
    allOrders = allOrders;
  }

  async function updateOrderComments(orderID) {
    const order = allOrders.find((o) => o._id === orderID);
    let editor;
    setTimeout(() => {
      editor = new Quill('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow',
        placeholder: 'placeholder',
      });
      editor.container.firstChild.innerHTML = order.comments;
    }, 0);
    const sa = await Swal.fire({
      title: 'cOmMeNtAiReS',
      html: quillHtml,
      width: 1500,
    });
    if (sa.dismiss) return;
    const comments = editor.container.firstChild.innerHTML;
    const res = await fetch('/api/update-order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: orderID,
        update: { comments },
      }),
    });
    if (!res.ok) return alert('error');
    order.comments = comments;
    allOrders = allOrders;
  }
</script>

<h1>Commandes</h1>

<b>Filtrer par</b>
<label>
  <input type="radio" bind:group={filter} value={'completed'} />
  Complété
</label>
<label>
  <input type="radio" bind:group={filter} value={'not-completed'} />
  Non complété
</label>
<label>
  <input type="radio" bind:group={filter} value={false} />
  Aucun filtre
</label>
<br />

<b>Chercher par</b>
<label>
  <input type="checkbox" bind:group={searchCategories} value={'product.name'} />
  Nom du produit
</label>
<label>
  <input type="checkbox" bind:group={searchCategories} value={'user.firstName'} />
  Prénom du client
</label>
<label>
  <input type="checkbox" bind:group={searchCategories} value={'user.lastName'} />
  Nom de famille du client
</label>
<label>
  <input type="checkbox" bind:group={searchCategories} value={'user.email'} />
  Courriel du client
</label>
<label>
  <input type="checkbox" bind:group={searchCategories} value={'comments'} />
  Commentaires
</label>
<br />

<input style="width: 99%;" type="text" bind:value={searchTerms} placeholder="Termes de recherche" />
{#each searchResults as searchResult (searchResult._id)}
  <div transition:fade={{ delay: 0, duration: 250 }} animate:flip={{ delay: 0, duration: 250 }}>
    <OrderCard
      {...searchResult}
      on:ordercommentsupdate={() => updateOrderComments(searchResult._id)}
      on:orderstatusupdate={() => updateOrderStatus(searchResult._id)} />
  </div>
{/each}
