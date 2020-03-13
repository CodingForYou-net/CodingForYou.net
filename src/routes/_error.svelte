<script>
  import Navbar from '@components/Navbar.svelte';

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<style global lang="scss">
  @import 'src/styles/global.scss';
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>
<Navbar>
  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</Navbar>
