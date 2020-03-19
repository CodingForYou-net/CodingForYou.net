<script context="module">
  import { getCurrent as getCurrentLang } from '@helpers/translation.js';
  export async function preload({}, { isLoggedIn, isAdmin }) {
    if (!(isLoggedIn && isAdmin)) this.redirect(302, '/' + getCurrentLang());
  }
</script>

<slot />
