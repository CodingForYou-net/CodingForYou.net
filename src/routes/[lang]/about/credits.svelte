<script>
  import { _, store as lang } from '@helpers/translation.js';
</script>

<style lang="scss">
  section {
    & h4 {
      margin-bottom: 20px;
    }
    & ul {
      & li {
        margin-bottom: 10px;
      }
    }
  }
</style>

<section class="page">
  <h1>{$_('credits')}</h1>
  <h4>{$_('toolsMaterials')}</h4>
  <ul>
    <li>https://colorhunt.co/palette/167040</li>
    <li>
      The icons on the navigation bar, the web packages and the error page are licensed under a
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0 Licence</a>
      . It is attributed to
      <a href="https://fontawesome.com/">Font Awesome</a>
      .
    </li>
  </ul>
</section>
