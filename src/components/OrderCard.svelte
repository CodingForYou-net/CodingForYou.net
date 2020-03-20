<script>
  import { createEventDispatcher } from 'svelte';
  import xss from 'xss';

  export let product;
  export let comments;
  export let date;
  export let completed;
  export let user;

  const dispatch = createEventDispatcher();

  const xssFilter = new xss.FilterXSS({
    css: {
      whiteList: {
        'color': true,
        'background-color': true,
      },
    },
    whiteList: {
      span: ['style'],
      strong: ['style'],
      em: ['style'],
      i: ['style'],
      s: ['style'],
      a: ['href', 'rel', 'target', 'style'],
      p: [],
    },
  });
</script>

<style lang="scss">
  div {
    border: 1px solid #000;
    margin: 5px;
    padding: 5px;
    small {
      color: gray;
      span {
        margin: -3px;
        color: darkgoldenrod;
        text-decoration: underline;
      }
    }
  }
</style>

<div>
  <h3>{completed ? '✅' : '❌'} {product.name}</h3>
  <p>
    <samp>{product.description}</samp>
  </p>
  <p>
    {@html xssFilter.process(comments)}
  </p>
  <small>
    {user.firstName} {user.lastName} &lt;
    <span>{user.email}</span>
    &gt; ({new Date(date).toLocaleDateString()})
  </small>
  <br />
  <button on:click={() => dispatch('orderstatusupdate')}>
    Mettre comme {completed ? 'non ' : ''}complété
  </button>
  <button on:click={() => dispatch('ordercommentsupdate')}>Modifier le commentaire</button>
</div>
