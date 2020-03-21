<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { user, isLoggedIn } from '@helpers/user.js';
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  section {
    padding: 50px 10%;
    margin-top: 50px;
  }
</style>

<section id="container2" data-scroll data-type="1">
  {#if $isLoggedIn}
    <h1>{$_('hello', { name: `${$user.firstName} ${$user.lastName}` })}</h1>
  {:else}
    <h1>{$_('welcome')}</h1>
  {/if}
  <h5>{$_('aboutUs')}</h5>
</section>
