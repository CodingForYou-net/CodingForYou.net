<script>
  import { _ } from '@helpers/translation.js';
  import { isLoggedIn } from '@helpers/user.js';
</script>

{#if $isLoggedIn}
<slot />
{:else}
<p>{$_('plsLoginProfileP1')} <a href="/api/google">{$_('here')}</a> {$_('plsLoginProfileP2')}</p>
{/if}