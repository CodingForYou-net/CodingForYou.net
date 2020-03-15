<script>
  import { _, store as lang } from '@helpers/translation.js';
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  footer {
    text-align: center;
    background-color: $theme-black;
    color: white;
    padding-top: 50px;
  }
  div {
    padding: 20px;
  }
  #copyright {
    font-size: 0.7rem;
  }
  hr {
    background-color: lighten($theme-black, 20%);
    margin: 0 10%;
  }
</style>

<footer>
  <div>
    <ul>
      <li>Privacy Policy</li>
      <li>Terms of Use</li>
      <li>Sales and Refunds</li>
      <li>Legal</li>
    </ul>
  </div>
  <hr />
  <div id="copyright">
    <span>{$_('copyright')}</span>
  </div>
</footer>
