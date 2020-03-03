<script>
  import { _, langStore } from '../../helpers/translation.js';
  import { stores } from '@sapper/app';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $langStore.other);
</script>

<h1>Contact</h1>
<a href={otherLangPath}>{$langStore.other}</a>
