<script>
  import { store as lang } from '@helpers/translation.js';
  import { stores } from '@sapper/app';

  const { session } = stores();
  let { user } = $session;
</script>

<img src={user.image} alt="" />
<h1>{user.firstName} {user.lastName}</h1>
<a href="mailto:{user.email}">{user.email}</a>
<p>{user.id}</p>
<a href="/{$lang.current}/profile/buy">Buy</a>
<a href="/api/auth/logout">Logout</a>
