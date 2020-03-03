<script>
  import { _, langStore } from '../../helpers/translation.js';
  import { stores } from '@sapper/app';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $langStore.other);
</script>

<style>

</style>

<h1>{$_('hello', { name: 'Claude' })}</h1>
<a href={otherLangPath}>{$langStore.other}</a>
<a href="/{$langStore.current}/contact">Contact</a>
