<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Container1 from '@components/containers/Container1.svelte';
  import Container2 from '@components/containers/Container2.svelte';
  import Container3 from '@components/containers/Container3.svelte';
  import Container4 from '@components/containers/Container4.svelte';
  import Footer from '@components/containers/Footer.svelte';

  // export let isLoggedIn;
  // export let user;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
</style>

<!-- <script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script> -->
<Container1 />

<Container2 />

<Container3 />

<Container4 />

<Footer />
