<script context="module">
  import { locale, translations, getBrowserLocale } from 'svelte-intl';
  import translationsList from './_translations.js';

  export function preload({ query }) {
    translations.update(translationsList);
    locale.set((query.lang && query.lang.split('-')[0]) || getBrowserLocale('en'));
  }
</script>

<script>
  import MetaTags from '../components/MetaTags.svelte';
  import { getCurrentLanguage } from '../helpers/translation.js';
  import { onMount } from 'svelte';

  onMount(() => {
    const url = new URL(window.location);
    const searchParams = new URLSearchParams(url.search);
    if (localStorage.getItem('lang') && !searchParams.get('lang'))
      locale.set(localStorage.getItem('lang'));
    locale.subscribe((val) => localStorage.setItem('lang', val));
  });
</script>

<style lang="scss" global>
  @import '../styles/global.scss';
</style>

<MetaTags lang={getCurrentLanguage()} />

<main>
  <slot />
</main>
