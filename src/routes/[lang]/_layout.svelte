<script context="module">
  import { store as lang, translations, translationsList } from '@helpers/translation.js';

  export async function preload({ params }) {
    if (!['fr', 'en'].includes(params.lang)) this.redirect(302, '/');
    translations.update(translationsList);
    lang.set(params.lang);
  }
</script>

<script>
  import Navbar from '@components/Navbar.svelte';
  import Head from '@components/Head.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { stores } from '@sapper/app';
  import axios from 'axios';
  const { page, session } = stores();

  let unsub;
  onMount(() => {
    unsub = page.subscribe((p) => {
      lang.set(p.path.split('/')[1]);
      console.log({ params: { lang: $lang.current, id: $session.user.id } });
      axios
        .post('/api/update-lang', { params: { lang: $lang.current, id: $session.user.id } })
        .then(console.log)
        .catch(console.log);
    });
  });
  onDestroy(() => unsub && unsub());
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<Head />
<Navbar />
<main>
  <slot />
</main>
