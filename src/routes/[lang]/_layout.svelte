<script context="module">
  import { store as lang } from '@helpers/translation.js';
  export async function preload({ params }) {
    lang.set(params.lang);
  }
</script>

<script>
  import { translations, translationsList } from '@helpers/translation.js';
  import MetaTags from '@components/MetaTags.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { stores } from '@sapper/app';

  translations.update(translationsList);

  let unsub;
  onMount(() => {
    const { page } = stores();
    unsub = page.subscribe((p) => {
      lang.set(p.path.split('/')[1]);
    });
  });
  onDestroy(() => unsub && unsub());
</script>

<MetaTags />
<slot />
