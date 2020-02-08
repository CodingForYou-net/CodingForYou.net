<script>
  import { _, locale } from 'svelte-intl';
  import { onMount, onDestroy } from 'svelte';

  const name = 'Claude';

  let newUrl;
  let otherLanguage;
  let unsub;
  locale.subscribe((val) => (otherLanguage = val === 'en' ? 'fr' : 'en'))();
  onMount(() => {
    unsub = locale.subscribe((val) => {
      otherLanguage = val === 'en' ? 'fr' : 'en';
      const url = new URL(window.location);
      const searchParams = new URLSearchParams(url.search);
      searchParams.set('lang', otherLanguage);
      url.search = searchParams.toString();
      newUrl = url.toString();
    });
  });

  onDestroy(() => unsub && unsub());
</script>

<h1>{$_('hello', { name })}</h1>
<a href={newUrl}>{otherLanguage}</a>
