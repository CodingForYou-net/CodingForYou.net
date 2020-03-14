<script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script>

<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Button from '@components/Button.svelte';

  export let isLoggedIn;
  export let user;

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .container1 {
    height: 100vh;
    background-color: $theme-black;
  }
  .langBtn {
    position: relative;
    top: 10px;
    left: 10px;
  }
</style>

<div class="container1">
  <Button class="langBtn" style="green" href={otherLangPath}>{$lang.other}</Button>
</div>

<div>
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <p>{$_('aboutUs')}</p>
</div>

<h2>{$_('webPackages')}</h2>
