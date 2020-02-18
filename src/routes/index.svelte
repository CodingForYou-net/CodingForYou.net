<script>
  import { _, locale } from 'svelte-intl';
  import { onMount, onDestroy } from 'svelte';
  import { getOtherLanguage } from './_translation.helpers.js';

  const name = 'Claude';

  let otherLanguageUrl;
  let otherLanguage;
  let unsub;
  otherLanguage = getOtherLanguage();
  onMount(() => {
    unsub = locale.subscribe((lang) => {
      otherLanguage = lang === 'en' ? 'fr' : 'en';
      const url = new URL(window.location);
      const searchParams = new URLSearchParams(url.search);
      searchParams.set('lang', otherLanguage);
      url.search = searchParams.toString();
      otherLanguageUrl = url.toString();
    });
  });

  onDestroy(() => unsub && unsub());
</script>

<h1>{$_('hello', { name })}</h1>
<a href={otherLanguageUrl}>{otherLanguage}</a>
