<script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script>

<script>
  import { _, store as lang } from '@helpers/translation.js';

  export let isLoggedIn;
  export let user;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .container2 {
    padding: 50px 10%;
  }
</style>

<div class="container2" id="container2">
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <h4>{$_('aboutUs')}</h4>
</div>
