<script context="module">
  export async function preload({ params: { lang } }) {
    return { lang };
  }
</script>

<script>
  import MetaTags from '../../components/MetaTags.svelte';
  import { locale, translations } from 'svelte-intl';
  import translationsList from './_translations.js';

  export let lang;

  translations.update(translationsList);
  locale.set(lang);
</script>

<MetaTags {lang} />
<slot />
