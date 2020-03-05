<script context="module">
  export function preload({}, { user }) {
    return { user };
  }
</script>

<script>
  export let user;
</script>

<img src={user.image} alt="" />
<h1>{user.firstName} {user.lastName}</h1>
<a href="mailto:{user.email}">{user.email}</a>
<p>{user.id}</p>
