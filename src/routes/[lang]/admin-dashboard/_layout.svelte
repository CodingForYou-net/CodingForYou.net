<script>
  import { _ } from '@helpers/translation.js';
  import { isLoggedIn, isAdmin } from '@helpers/user.js';
</script>

<style lang="scss">
  svg {
    position: relative;
    min-width: 100px;
    width: 10%;
    max-width: 175px;
    animation: MoveUpDown 1s linear infinite;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
  }
</style>

{#if $isLoggedIn && $isLoggedIn}
  <slot />
{:else}
  <section class="page">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="user-lock"
      class="svg-inline--fa fa-user-lock fa-w-20"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512">
      <path
        fill="currentColor"
        d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm96 64a63.08 63.08 0 0 1
        8.1-30.5c-4.8-.5-9.5-1.5-14.5-1.5h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0
        0 0 422.4V464a48 48 0 0 0 48 48h280.9a63.54 63.54 0 0 1-8.9-32zm288-32h-32v-80a80 80 0 0
        0-160 0v80h-32a32 32 0 0 0-32 32v160a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V320a32 32 0 0
        0-32-32zM496 432a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm32-144h-64v-80a32 32 0 0 1 64 0z" />
    </svg>

    <h1>{$_('plsLoginTitle')}</h1>

    <p>
      {$_('plsLoginAdminP1')}
      <a href="/api/auth/google">{$_('here')}</a>
      {$_('plsLoginAdminP2')}
    </p>
  </section>
{/if}
