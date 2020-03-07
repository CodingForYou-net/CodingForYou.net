<script>
  export let href;
  export let style;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  a {
    padding: 15px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
    display: inline-block;
    margin: 10px 10px;
    &.green {
      background-color: $theme-green;
      color: $theme-light-green;
      &:hover {
        background-color: darken($theme-green, 15%);
      }
    }
  }
</style>

<a {href} class={style}>
  <slot />
</a>
