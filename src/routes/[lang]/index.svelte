<script context="module">
  export function preload({}, { isLoggedIn, user }) {
    return { isLoggedIn, user };
  }
</script>

<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Container1 from '@components/Container1.svelte';

  export let isLoggedIn;
  export let user;

  const { page } = stores();
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .container2 {
    padding: 50px 10%;
  }

  .repeating-top {
    background-image: url(/triangleUp.svg);
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
  }

  .repeating-bottom {
    background-image: url(/triangleDown.svg);
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
    margin-top: -1px;
  }

  .content {
    background-color: $theme-green;
    height: 200px;
  }
</style>

<Container1 />

<div class="container2" id="container2">
  {#if isLoggedIn}
    <h1>{$_('hello', { name: `${user.firstName} ${user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <p>{$_('aboutUs')}</p>
</div>

<div class="container3">
  <div class="repeating-top" />
  <div class="content">
    <h2>{$_('webPackages')}</h2>
  </div>
  <div class="repeating-bottom" />
</div>
