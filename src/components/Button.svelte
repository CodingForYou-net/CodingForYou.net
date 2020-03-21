<script>
  export let href;
  export let style;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  a,
  div {
    padding: 15px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
    display: inline-block;
    cursor: pointer;
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
