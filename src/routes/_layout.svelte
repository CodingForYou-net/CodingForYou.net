<script context="module">
  import {
    store as lang,
    translations,
    translationsList,
    validPathRegex,
  } from '@helpers/translation.js';
  import { isLoggedIn, user, isAdmin, getLoggedIn } from '@helpers/user.js';

  export async function preload({ path }, { browserLang }) {
    const { isLoggedIn: _isLoggedIn, isAdmin: _isAdmin, user: _user } = await (await this.fetch(
      `/api/auth/user`,
      { credentials: 'include' }
    )).json();
    isLoggedIn.set(_isLoggedIn);
    isAdmin.set(_isAdmin);
    user.set(_user);
    if (!path.startsWith('/api') && !validPathRegex.test(path)) {
      if (_isLoggedIn && _user.lang) return this.redirect(303, `/${_user.lang}${path}`);
      const lang = ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
      return this.redirect(303, `/${lang}${path}`);
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
  import Footer from '@components/Footer.svelte';
  import { onMount } from 'svelte';
  import { stores, goto } from '@sapper/app';

  const { page, session } = stores();
  let navStayOpen;
  let main;

  onMount(() => {
    import('quill').then((module) => (window.Quill = module.default));
    const subscritptions = [
      page.subscribe((p) => {
        if (validPathRegex.test(p.path)) $lang = p.path.split('/')[1];
      }),
    ];
    return () => subscritptions.forEach((unsub) => unsub && unsub());
  });
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<div id="top" />
<Head />
<Navbar on:stayopen={({ detail: newState }) => (navStayOpen = newState)} />
<main class:navOpen={navStayOpen}>
  <div id="main">
    <slot />
  </div>
  <Footer />
</main>
