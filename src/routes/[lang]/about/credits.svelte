<script>
  import { _, store as lang } from '@helpers/translation.js';
</script>

<style lang="scss">
  section {
    padding: 50px 10%;
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

<section>
  <h1>{$_('credits')}</h1>
  <h4>{$_('toolsMaterials')}</h4>
  <ul>
    <li>https://colorhunt.co/palette/167040</li>
    <li>https://fontawesome.com/license/free</li>
    <li>https://undraw.co/</li>
  </ul>
</section>
