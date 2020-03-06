<script>
  export let href;
  export let style;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  a {
    padding: 10px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    &.green {
      background-color: $theme-green;
      color: $theme-light-green;
      &:hover {
        background-color: darken($theme-green, 15%);
      }
    }
  }
</style>

<a {href} class:green={style === 'green'}>
  <slot />
</a>
