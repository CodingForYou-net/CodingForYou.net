<script context="module">
  import { getCurrent as getCurrentLang } from '@helpers/translation.js';
  export async function preload({}, { isLoggedIn, isAdmin }) {
    if (!(isLoggedIn && isAdmin)) this.error(404, 'Not found');
  }
</script>

<slot />
