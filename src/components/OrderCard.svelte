<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from '@helpers/translation.js';
  import { xssFilter } from '@helpers/other.js';
  import xss from 'xss';

  export let product;
  export let comments;
  export let date;
  export let completed;
  export let user;

  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  div#content {
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: #f2f2f2;
    small {
      color: gray;
      span {
        margin: -3px;
        color: darkgoldenrod;
        text-decoration: underline;
      }
    }
  }
  :global(ol) {
    padding-left: 1rem;
  }
</style>

<div id="content">
  <h3>{completed ? '✅' : '❌'} {product.name}</h3>
  <p>
    <samp>{product.description}</samp>
  </p>
  <div id="comments">
    {@html xssFilter.process(comments)}
  </div>
  <small>
    {user.firstName} {user.lastName} &lt;
    <span>{user.email}</span>
    &gt; [{user.lang}] ({new Date(date).toLocaleDateString()})
  </small>
  <br />
  <button on:click={() => dispatch('orderstatusupdate')}>
    {$_('setAs')} {completed ? $_('notCompleted').toLowerCase() : $_('completed').toLowerCase()}
  </button>
  <button on:click={() => dispatch('ordercommentsupdate')}>{$_('editComments')}</button>
</div>
