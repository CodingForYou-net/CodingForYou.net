<script context="module">
  export async function preload({ path }, { lang }) {
    // NOTE Redirect user to good language when no language specified in URL
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    if (!/^\/(fr|en)\/?.*$/.test(path)) this.redirect(302, `/${lang}${path}`);
  }
</script>
