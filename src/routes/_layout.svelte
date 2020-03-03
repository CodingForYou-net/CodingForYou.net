<script context="module">
  export async function preload({ path }, { lang }) {
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    if (!['/global.css'].includes(path) && !/^\/(fr|en)\/?.*$/.test(path))
      this.redirect(302, `/${lang}${path}`);
  }
</script>

<style global lang="scss">
  @import '../styles/global.scss';
</style>

<link rel="alternate" hreflang="en" href="https://codingforyou.net/en/" />
<link rel="alternate" hreflang="fr" href="https://codingforyou.net/fr/" />

<slot />
