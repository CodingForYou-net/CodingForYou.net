<script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script>

<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Container1 from '@components/Container1.svelte';
  import Container3 from '@components/Container3.svelte';

  export let isLoggedIn;
  export let user;

  const { page } = stores();
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .container2 {
    padding: 50px 10%;
  }
</style>

<Container1 />

<div class="container2" id="container2">
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <h3>{$_('aboutUs')}</h3>
</div>

<Container3 />
