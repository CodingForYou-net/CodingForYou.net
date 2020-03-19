<script context="module">
  import {
    store as lang,
    translations,
    translationsList,
    validPathRegex,
  } from '@helpers/translation.js';

  export async function preload({ path }, params) {
    // NOTE Redirect user to good language when no language specified in URL
    if (!path.startsWith('/api') && !validPathRegex.test(path)) {
      let lang = ['en', 'fr'].includes(params.lang) ? params.lang : 'en';
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
  import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
  import { CSSPlugin, gsap, TimelineLite, TweenLite } from 'gsap';
  import { scrollMagicLoaded } from '@helpers/other.js';
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
    gsap.registerPlugin(CSSPlugin);
    window.ScrollMagic = (await import('scrollmagic')).default;
    ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);
    scrollMagicLoaded.set(true);
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
