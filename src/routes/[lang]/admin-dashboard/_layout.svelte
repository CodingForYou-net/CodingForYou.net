<script>
  import { _ } from '@helpers/translation.js';
  import { isLoggedIn, isAdmin } from '@helpers/user.js';
</script>

{#if $isLoggedIn && $isLoggedIn}
<slot />
{:else}
<p>{$_('plsLoginProfileP1')} <a href="/api/google">{$_('here')}</a> {$_('plsLoginAdminP2')}</p>
{/if}
