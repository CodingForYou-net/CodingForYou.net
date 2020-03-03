<script context="module">
  export async function preload({ params: { lang } }) {
    return { lang };
  }
</script>

<script>
  import { langStore, translations, translationsList } from '../../helpers/translation.js';
  import MetaTags from '../../components/MetaTags.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { stores } from '@sapper/app';

  export let lang;

  translations.update(translationsList);
  langStore.set(lang);

  let unsub;
  onMount(() => {
    const { page } = stores();
    unsub = page.subscribe((p) => {
      lang = p.path.split('/')[1];
      langStore.set(lang);
    });
  });
  onDestroy(() => unsub && unsub());
</script>

<MetaTags {lang} />
<slot />
