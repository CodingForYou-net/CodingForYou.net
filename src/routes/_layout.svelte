<script context="module">
  export async function preload({ path }, { lang }) {
    // NOTE Redirect user to good language when no language specified in URL
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    if (!path.startsWith('/api') && !/^\/(fr|en)\/?.*$/.test(path))
      this.redirect(302, `/${lang}${path}`);
  }
</script>

<link rel="alternate" hreflang="en" href="https://codingforyou.net/en/" />
<link rel="alternate" hreflang="fr" href="https://codingforyou.net/fr/" />

<slot />
