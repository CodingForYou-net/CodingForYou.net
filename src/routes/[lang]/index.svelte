<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import coolButton from '@components/button.svelte';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<!-- TODO if user is logged in : Hello {name}, else welcome -->

<coolButton href={otherLangPath} content={$lang.other} />
<a rel="prefetch" href="/{$lang.current}/contact">Contact</a>
<a href="/api/auth/google">Login</a>

<div>
  <h1>{$_('hello', { name: 'Claude' })}</h1>
  <p>{$_('aboutUs')}</p>
</div>

<h2>{$_('webPackages')}</h2>
