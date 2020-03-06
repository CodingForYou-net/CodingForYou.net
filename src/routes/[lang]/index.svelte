<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<style lang="scss">
  @import '../../../../styles/_theme.scss';
  a {
    padding: 10px;
    background-color: $theme-green;
    color: $theme-light-green;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: darken($theme-green, 15%);
  }
</style>

<!-- TODO if user is logged in : Hello {name}, else welcome -->

<a href={otherLangPath}>{$lang.other}</a>
<a rel="prefetch" href="/{$lang.current}/contact">Contact</a>
<a href="/api/auth/google">Login</a>

<div>
  <h1>{$_('hello', { name: 'Claude' })}</h1>
  <p>{$_('aboutUs')}</p>
</div>

<h2>{$_('webPackages')}</h2>
