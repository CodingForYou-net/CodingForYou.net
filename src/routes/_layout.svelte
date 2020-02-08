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

<style lang="scss" global>
  @import '../styles/global.scss';
</style>

<main>
  <slot />
</main>
