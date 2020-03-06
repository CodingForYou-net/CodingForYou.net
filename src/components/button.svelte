<script>
  let href;
</script>

<style lang="scss">
  @import '../styles/_theme.scss';
  a {
    padding: 10px;
    background-color: $theme-green;
    color: $theme-light-green;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: darken($theme-green, 15%);
    }
  }
</style>

<a {href} />
