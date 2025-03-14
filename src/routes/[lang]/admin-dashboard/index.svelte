<script>
  import FuzzySearch from 'fuzzy-search';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import OrderCardAdmin from '@components/OrderCardAdmin.svelte';
  import Swal from 'sweetalert2';
  import { Toast } from '@helpers/other.js';
  import { quillHtml } from '@helpers/other.js';
  import { _, getTranslation } from '@helpers/translation.js';
  import Spinner from 'svelte-spinner';

  let promise;
  let searchTerms = '';
  let searchCategories = ['product.name', 'user.firstName', 'user.lastName', 'user.email'];
  let allOrders = [];
  let searcher;
  let filter = 'not-completed';
  let error = false;

  $: orders = allOrders
    .filter((o) => (filter === 'completed' ? o.completed : true))
    .filter((o) => (filter === 'not-completed' ? !o.completed : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  $: searcher = new FuzzySearch(orders, searchCategories, {
    sort: true,
  });
  $: searchResults = searcher ? searcher.search(searchTerms) : [];

  onMount(async () => {
    promise = fetchOrders();
  });

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders', { credentials: 'include' });
      if (!res.ok) throw res.statusText;
      const json = await res.json();
      allOrders = json;
    } catch (err) {
      error = err;
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
    if (!res.ok)
      return Toast.fire({
        icon: 'error',
        title: getTranslation('errorUpdatingOrder'),
      });
    order.completed = !order.completed;
    allOrders = allOrders;
    Toast.fire({
      icon: 'success',
      title: getTranslation('successUpdateOrder'),
    });
  }

  async function updateOrderComments(orderID) {
    const order = allOrders.find((o) => o._id === orderID);
    let editor;
    setTimeout(() => {
      editor = new Quill('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow',
        placeholder: getTranslation('editCommentsPlaceholder'),
      });
      editor.container.firstChild.innerHTML = order.comments;
    }, 0);
    const sa = await Swal.fire({
      title: getTranslation('editComments'),
      html: quillHtml,
      width: 1500,
      showCancelButton: true,
      cancelButtonText: getTranslation('cancel'),
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
    if (!res.ok)
      return Toast.fire({
        icon: 'error',
        title: getTranslation('errorUpdatingOrder'),
      });
    order.comments = comments;
    allOrders = allOrders;
    Toast.fire({
      icon: 'success',
      title: getTranslation('successUpdateOrder'),
    });
  }

  async function sendMailToClient(orderID) {
    const order = allOrders.find((o) => o._id === orderID);
    let editor;
    const sa = await Swal.mixin({
      title: getTranslation('mailToClient'),
      showCancelButton: true,
      cancelButtonText: getTranslation('cancel'),
      progressSteps: ['1', '2', '3'],
    }).queue([
      {
        input: 'select',
        inputOptions: {
          main: 'codingforyou.net@gmail.com',
          codingTeam: 'codingteam@codingforyou.net',
          sales: 'sales@codingforyou.net',
          contact: 'contact@codingforyou.net',
        },
        inputPlaceholder: getTranslation('sendFrom'),
        inputValidator(val) {
          return val ? false : getTranslation('selectEmail');
        },
      },
      {
        input: 'text',
        inputPlaceholder: getTranslation('subject'),
      },
      {
        html: quillHtml,
        width: 1500,
        onBeforeOpen() {
          editor = new Quill('#editor', {
            modules: { toolbar: '#toolbar' },
            theme: 'snow',
            placeholder: getTranslation('messageToClient'),
          });
        },
        preConfirm() {
          return editor.container.firstChild.innerHTML;
        },
      },
    ]);
    if (sa.dismiss) return;
    const [accountFrom, subject, message] = sa.value;
    const res = await fetch('/api/send-mail-to-client', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        accountFrom,
        message,
        subject,
        user: order.user,
      }),
    });
    if (!res.ok)
      return Toast.fire({
        icon: 'error',
        title: getTranslation('errorSendingMail'),
      });
    Toast.fire({
      icon: 'success',
      title: getTranslation('successSendingMail'),
    });
  }
</script>

<style lang="scss">
  #error {
    color: red;
  }
  #input {
    width: 99%;
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
  <b>{$_('filterBy')}</b>
  <label>
    <input type="radio" bind:group={filter} value={'completed'} />
    {$_('completed')}
  </label>
  <label>
    <input type="radio" bind:group={filter} value={'not-completed'} />
    {$_('notCompleted')}
  </label>
  <label>
    <input type="radio" bind:group={filter} value={false} />
    {$_('noFilter')}
  </label>
  <br />

  <b>{$_('searchBy')}</b>
  <label>
    <input type="checkbox" bind:group={searchCategories} value={'product.name'} />
    {$_('productName')}
  </label>
  <label>
    <input type="checkbox" bind:group={searchCategories} value={'user.firstName'} />
    {$_('clientFirstName')}
  </label>
  <label>
    <input type="checkbox" bind:group={searchCategories} value={'user.lastName'} />
    {$_('clientLastName')}
  </label>
  <label>
    <input type="checkbox" bind:group={searchCategories} value={'user.email'} />
    {$_('clientEmail')}
  </label>
  <label>
    <input type="checkbox" bind:group={searchCategories} value={'comments'} />
    {$_('comments')}
  </label>
  <br />

  <input id="input" type="text" bind:value={searchTerms} placeholder={$_('searchTerms')} />
  {#await promise}
    <div id="spinner-container">
      <div id="spinner">
        <Spinner size="60" speed="750" color="#272727" thickness="3" gap="40" />
      </div>
    </div>
  {:then}
    {#if error}
      <p id="error">
        {$_('errorMessage')}
        <b>({error})</b>
      </p>
    {:else}
      <div in:fade={{ duration: 250 }}>
        {#each searchResults as searchResult (searchResult._id)}
          <div
            transition:fade|local={{ delay: 0, duration: 250 }}
            animate:flip={{ delay: 0, duration: 250 }}>
            <OrderCardAdmin
              {...searchResult}
              on:ordercommentsupdate={() => updateOrderComments(searchResult._id)}
              on:orderstatusupdate={() => updateOrderStatus(searchResult._id)}
              on:sendmailtoclient={() => sendMailToClient(searchResult._id)} />
          </div>
        {/each}
      </div>
    {/if}
  {/await}
</section>
