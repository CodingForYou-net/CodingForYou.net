<script>
  import { _, store as lang, getTranslation } from '@helpers/translation.js';
  import { user, isLoggedIn, isAdmin } from '@helpers/user.js';
  import { stores, goto } from '@sapper/app';
  import Button from '@components/Button.svelte';
  import Swal from 'sweetalert2';

  async function logout() {
    const { dismiss } = await Swal.fire({
      title: getTranslation('logoutTitle'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: getTranslation('logout'),
      cancelButtonText: getTranslation('cancel'),
      width: 600,
    });
    if (!dismiss) {
      goto('/api/auth/logout');
    }
  }
</script>

<style lang="scss">
  // Small screens
  @media only screen and (max-width: 600px) {
    #buttons-container {
      flex-direction: column;
      text-align: center;
    }
  }

  // Large screens
  @media only screen and (min-width: 600px) {
    #buttons-container {
      flex-direction: row;
    }
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

  #buttons-container {
    display: flex;
  }
</style>

<section class="page">
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
  <div id="buttons-container">
    <Button href="/{$lang.current}/#buy" style="green">{$_('buy')}</Button>
    <Button href="/{$lang.current}/profile/orders" style="green">{$_('orders')}</Button>
    <Button style="green" on:click={logout}>{$_('logout')}</Button>
  </div>
</section>
