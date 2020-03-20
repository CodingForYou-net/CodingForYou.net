<script context="module">
  import {
    store as lang,
    translations,
    translationsList,
    validPathRegex,
  } from '@helpers/translation.js';

  export async function preload({ path }, { browserLang, isLoggedIn, user }) {
    // NOTE Redirect user to good language when no language specified in URL
    if (!path.startsWith('/api') && !validPathRegex.test(path)) {
      if (isLoggedIn) return this.redirect(302, `/${user.lang}${path}`);
      let lang = ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
      return this.redirect(302, `/${lang}${path}`);
    }
    if (validPathRegex.test(path)) {
      translations.update(translationsList);
      lang.set(validPathRegex.exec(path)[1]);
    }
  }
</script>

<script>
  import Navbar from '@components/Navbar.svelte';
  import Head from '@components/Head.svelte';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { isLoggedIn, user, isAdmin } from '@helpers/user.js';

  const { page, session } = stores();
  let navStayOpen;

  onMount(async () => {
    const subscritptions = [
      page.subscribe((p) => {
        if (validPathRegex.test(p.path)) $lang = p.path.split('/')[1];
      }),
      session.subscribe((s) => {
        $isLoggedIn = s.isLoggedIn;
        $user = s.user;
        $isAdmin = s.isAdmin;
      }),
    ];
    window.Quill = (await import('quill')).default;
    return () => subscritptions.forEach((unsub) => unsub && unsub());
  });
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<Head />
<Navbar on:stayopen={({ detail }) => (navStayOpen = detail)} />
<main class:open={navStayOpen}>
  <slot />
</main>
