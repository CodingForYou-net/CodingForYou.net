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

<style>
  .container1 {
    height: 50vh;
  }
</style>

<Button style="green" href={otherLangPath}>{$lang.other}</Button>
<a rel="prefetch" href="/{$lang.current}/contact">Contact</a>
<a href="/api/auth/google">Login</a>

<div class="container1">
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <p>{$_('aboutUs')}</p>
</div>

<h2>{$_('webPackages')}</h2>
