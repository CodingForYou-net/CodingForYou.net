<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<style>

</style>

<h1>{$_('hello', { name: 'Claude' })}</h1>
<a href={otherLangPath}>{$lang.other}</a>
<a href="/{$lang.current}/contact">Contact</a>
<a href="/{$lang.current}/auth/google">Login</a>
<a href="/{$lang.current}/auth/verify">Verify</a>
<a href="/{$lang.current}/auth/logout">Logout</a>
