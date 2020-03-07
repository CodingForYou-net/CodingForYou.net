<script>
  import Navbar from '@components/Navbar.svelte';

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
  :root {
    font-family: 'Montserrat', sans-serif;
    color: $theme-black;
  }
  body {
    margin: 0;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>
<Navbar />
<main>

  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</main>
