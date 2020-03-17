<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';
  import Button from '@components/Button.svelte';

  const { session } = stores();
  let { user } = $session;
</script>

<style>
  .content {
    padding: 50px 10%;
  }
  .profile-picture {
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
</style>

<div class="content">
  <img class="profile-picture" src={user.image} alt="profile-picture" />
  <h1>{user.firstName} {user.lastName}</h1>
  <p>{user.email}</p>
  <hr />
  <p>{$_('accountID')}: {user.id}</p>
  <br />
  <Button href="/{$lang.current}/profile/buy" style="green">{$_('buy')}</Button>
  <Button href="/api/auth/logout" style="green">{$_('logout')}</Button>
</div>
