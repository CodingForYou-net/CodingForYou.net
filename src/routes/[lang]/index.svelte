<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Container1 from '@components/containers/Container1.svelte';
  import Container2 from '@components/containers/Container2.svelte';
  import Container3 from '@components/containers/Container3.svelte';
  import Container4 from '@components/containers/Container4.svelte';
  import Footer from '@components/Footer.svelte';
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
</style>

<Container1 />

<Container2 />

<Container3 />

<Container4 />

<Footer />
