<script context="module">
  export function preload({}, { isLoggedIn }) {
    return { isLoggedIn };
  }
</script>

<script>
  export let isLoggedIn;
</script>

{#if isLoggedIn}
  <p>logged in</p>
{:else}
  <p>not logged in</p>
{/if}
