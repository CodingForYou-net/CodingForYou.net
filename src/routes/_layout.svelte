<script context="module">
  import {
    store as lang,
    translations,
    translationsList,
    validPathRegex,
    getTranslation,
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
  import Swal from 'sweetalert2';
  import mobile from 'is-mobile';

  const { page, session } = stores();
  let navStayOpen;
  let main;
  let landscapeAsked;
  $: console.log(landscapeAsked);

  onMount(() => {
    import('quill').then((module) => (window.Quill = module.default));
    const subscritptions = [
      page.subscribe((p) => {
        if (validPathRegex.test(p.path)) $lang = p.path.split('/')[1];
      }),
    ];
    handleResize();
    return () => subscritptions.forEach((unsub) => unsub && unsub());
  });

  function handleResize() {
    if (!mobile({ tablet: false, featureDetect: true })) return;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    if (isLandscape) {
      if (!landscapeAsked) {
        landscapeAsked = true;
        Swal.fire({
          title: getTranslation('plsTurnDevice'),
          width: 600,
        });
      }
    } else {
      Swal.close();
      landscapeAsked = false;
    }
  }
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<svelte:window on:resize={handleResize} />

<div id="top" />
<Head />
<Navbar on:stayopen={({ detail: newState }) => (navStayOpen = newState)} />
<main class:navOpen={navStayOpen}>
  <div id="main">
    <slot />
  </div>
  <Footer />
</main>
