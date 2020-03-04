<script>
  import { _, store as lang } from '@helpers/translation';
  import { stores } from '@sapper/app';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<style>

</style>

<h1>{$_('hello', { name: 'Claude' })}</h1>
<a href={otherLangPath}>{$lang.other}</a>
<a href="/{$lang.current}/contact">Contact</a>
