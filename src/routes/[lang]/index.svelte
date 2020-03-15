<script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script>

<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Container1 from '@components/Container1.svelte';

  export let isLoggedIn;
  export let user;

  const { page } = stores();
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .langBtn {
    position: relative;
    top: 10px;
    left: 10px;
  }
</style>

<Container1 arrowLink="#content" />

<div id="content">
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <p>{$_('aboutUs')}</p>
</div>

<h2>{$_('webPackages')}</h2>
