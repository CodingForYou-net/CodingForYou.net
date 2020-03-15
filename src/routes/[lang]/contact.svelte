<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<style lang="scss">
  .content {
    position: relative;
    top: 0;
    left: 0;
  }
</style>

<div class="content">
  <h1>Contact</h1>
  <a href={otherLangPath}>{$lang.other}</a>
  <a href="/{$lang.current}/">Index</a>
</div>
