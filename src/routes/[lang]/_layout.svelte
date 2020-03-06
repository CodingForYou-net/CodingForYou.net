<script context="module">
  import { store as lang, translations, translationsList } from '@helpers/translation.js';
  export async function preload({ params }) {
    if (!['fr', 'en'].includes(params.lang)) this.redirect(302, '/');
    translations.update(translationsList);
    lang.set(params.lang);
  }
</script>

<script>
  import Head from '@components/Head.svelte';
  import { detect as detectBrowser } from 'detect-browser';
  import { onMount, onDestroy } from 'svelte';
  import { stores } from '@sapper/app';

  let unsub;
  onMount(() => {
    console.log(true);
    const { page } = stores();
    unsub = page.subscribe((p) => {
      lang.set(p.path.split('/')[1]);
    });
    const browser = detectBrowser();
    console.log(browser);
  });
  onDestroy(() => unsub && unsub());
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<Head />
<slot />
