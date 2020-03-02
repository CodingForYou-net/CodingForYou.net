<script context="module">
  export async function preload({ path }, { lang }) {
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    if (!['/global.css'].includes(path) && !/^\/(fr|en)\/?.*$/.test(path))
      this.redirect(302, `/${lang}${path}`);
  }
</script>

<script>
  import MetaTags from '../components/MetaTags.svelte';
</script>

<style global lang="scss">
  @import '../styles/global.scss';
</style>

<MetaTags />

<slot />
