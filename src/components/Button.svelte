<script>
  export let href = false;
  export let style;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  a,
  div {
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    font-weight: bold;
    margin: 5px;
    padding: 15px;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color 0.3s;
    &.green {
      background-color: $theme-green;
      color: white;
      &:hover {
        background-color: darken($theme-green, 15%);
      }
    }
  }
</style>

{#if href}
  <a {href} class={style}>
    <slot />
  </a>
{:else}
  <div on:click class={style}>
    <slot />
  </div>
{/if}
