<script context="module">
  import { locale, translations, getBrowserLocale } from 'svelte-intl';
  export function preload({ query }) {
    translations.update({
      fr: {
        hello: 'Bonjour, {name}',
      },
      en: {
        hello: 'Hi, {name}',
      },
    });
    locale.set((query.lang && query.lang.split('-')[0]) || getBrowserLocale('en'));
  }
</script>

<script>
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

<main>
  <slot />
</main>
