<script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script>

<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Button from '@components/Button.svelte';

  export let isLoggedIn;
  export let user;

  const { page } = stores();
  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .langBtn {
    position: relative;
    top: 10px;
    left: 10px;
  }
  .container1 {
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: $theme-black;
    display: inline-block;
  }
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background-image: url('/wave.svg');
    background-size: 1000px 100px;
    user-select: none;
  }

  .wave.wave1 {
    animation: moveWave1 30s linear infinite;
    z-index: 800;
    opacity: 1;
    animation-delay: 0s;
    bottom: -1px;
  }

  .wave.wave2 {
    animation: moveWave2 15s linear infinite;
    z-index: 799;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 10px;
  }

  .wave.wave3 {
    animation: moveWave1 30s linear infinite;
    z-index: 798;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 15px;
  }

  .wave.wave4 {
    animation: moveWave2 5s linear infinite;
    z-index: 797;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 20px;
  }

  @keyframes moveWave1 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 1000px;
    }
  }

  @keyframes moveWave2 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -1000px;
    }
  }
</style>

<div class="container1">
  <Button class="langBtn" style="green" href={otherLangPath}>{$lang.other}</Button>
  <div class="wave wave1" />
  <div class="wave wave2" />
  <div class="wave wave3" />
  <div class="wave wave4" />
</div>

<div>
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <p>{$_('aboutUs')}</p>
</div>

<h2>{$_('webPackages')}</h2>
