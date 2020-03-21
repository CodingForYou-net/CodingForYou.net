<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { user, isLoggedIn, isAdmin } from '@helpers/user.js';
  import { stores } from '@sapper/app';
  import Button from '@components/Button.svelte';
</script>

<style>
  section {
    padding: 50px 10%;
  }
  #profile-picture {
    border-radius: 50%;
    float: left;
    width: 20%;
    min-width: 100px;
    max-width: 250px;
    margin: 20px;
  }
  hr {
    margin: 20px 0;
  }

  p {
    margin: 10px 0;
  }
</style>

<section>
  <img id="profile-picture" src={$user.image} alt="profile-picture" />
  <h1>{$user.firstName} {$user.lastName}</h1>
  <h4>{$user.email}</h4>
  <hr />
  <p>{$_('accountID')}: {$user.id}</p>
  {#if $isAdmin}
    <p>
      {$_('isAdminLinkP1')}
      <a href="/{$lang.current}/admin-dashboard">{$_('here')}</a>
      {$_('isAdminLinkP2')}
    </p>
  {/if}
  <br />
  <Button href="/{$lang.current}/#container3" style="green">{$_('buy')}</Button>
  <Button href="/{$lang.current}/profile/orders" style="green">{$_('orders')}</Button>
  <Button href="/api/auth/logout" style="green">{$_('logout')}</Button>
</section>
