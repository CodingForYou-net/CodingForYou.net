<script>
  import { store as lang, translations, translationsList } from '@helpers/translation.js';
  import Navbar from '@components/Navbar.svelte';

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';

  translations.update(translationsList);
</script>

<style lang="scss">
  @keyframes MoveUpDown {
    0%,
    100% {
      bottom: 0;
    }
    50% {
      bottom: 5px;
    }
  }
  .error-message {
    position: relative;
    text-align: center;
    vertical-align: middle;
    top: 50px;
    width: 100%;
  }
  .svg-inline--fa {
    position: relative;
    min-width: 100px;
    width: 10%;
    max-width: 175px;
    animation: MoveUpDown 1.5s linear infinite;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="error-message">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="exclamation-circle"
    class="svg-inline--fa fa-exclamation-circle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248
      111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595
      46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982
      11.346h48.546c6.373 0 11.635-4.982
      11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356
      5.78-11.981 12.654z" />
  </svg>

  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
