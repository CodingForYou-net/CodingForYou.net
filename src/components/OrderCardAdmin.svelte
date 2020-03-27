<script>
  import { createEventDispatcher } from 'svelte';
  import { _, store as lang } from '@helpers/translation.js';
  import { xssFilter } from '@helpers/other.js';
  import xss from 'xss';

  export let product;
  export let comments;
  export let date;
  export let completed;
  export let user;

  $: price =
    $lang.current === 'en'
      ? `${product.currency.toUpperCase()}$ ${product.amount / 100}`
      : `${product.amount / 100}$ ${product.currency.toUpperCase()}`;

  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  div#content {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid $theme-black;
    background-color: #f2f2f2;
    small {
      color: gray;
      span {
        margin: -3px;
        color: darkgoldenrod;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>

<div id="content">
  <h3>{completed ? '✅' : '❌'} {product.name}</h3>
  <p>
    <samp>{product.description} ({price})</samp>
  </p>
  <div id="comments">
    {@html xssFilter.process(comments)}
  </div>
  <small>
    {user.firstName} {user.lastName} &lt;
    <span on:click={() => dispatch('sendmailtoclient')}>{user.email}</span>
    &gt; [{user.lang}] ({new Date(date).toLocaleDateString()})
  </small>
  <br />
  <button on:click={() => dispatch('orderstatusupdate')}>
    {$_('setAs')} {completed ? $_('notCompleted').toLowerCase() : $_('completed').toLowerCase()}
  </button>
  <button on:click={() => dispatch('ordercommentsupdate')}>{$_('editComments')}</button>
</div>
