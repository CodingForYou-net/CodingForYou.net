<script context="module">
  import { store as lang, translations, translationsList } from '@helpers/translation.js';
  export async function preload({ params }) {
    if (!['fr', 'en'].includes(params.lang)) return;
    translations.update(translationsList);
    lang.set(params.lang);
  }
</script>

<script>
  import Head from '@components/Head.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { stores } from '@sapper/app';

  let unsub;
  onMount(() => {
    const { page } = stores();
    unsub = page.subscribe((p) => {
      lang.set(p.path.split('/')[1]);
    });
  });
  onDestroy(() => unsub && unsub());
</script>

<Head />
<slot />
