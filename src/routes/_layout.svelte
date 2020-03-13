<script context="module">
  import { store as lang, translations, translationsList } from '@helpers/translation.js';

  export async function preload({ path }, params) {
    // NOTE Redirect user to good language when no language specified in URL
    if (!path.startsWith('/api') && !/^\/(fr|en)\/?.*$/.test(path)) {
      let lang = ['en', 'fr'].includes(params.lang) ? params.lang : 'en';
      return this.redirect(302, `/${lang}${path}`);
    }
    translations.update(translationsList);
    lang.set(params.lang);
  }
</script>

<script>
  import Navbar from '@components/Navbar.svelte';
  import Head from '@components/Head.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { stores } from '@sapper/app';

  let unsub;
  let navStayOpen;

  onMount(() => {
    const { page } = stores();
    unsub = page.subscribe((p) => {
      lang.set(p.path.split('/')[1]);
    });
  });
  onDestroy(() => unsub && unsub());
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<Head />
<Navbar on:stayopen={({ detail }) => (navStayOpen = detail)} />
<main class:open={navStayOpen}>
  <slot />
</main>
