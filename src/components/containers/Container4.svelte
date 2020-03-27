<script>
  import { _, store as lang } from '@helpers/translation.js';
</script>

<style lang="scss">
  section {
    padding: 25px 10%;
  }

  h2 {
    text-align: center;
  }

  div {
    margin: 50px 0;
  }
</style>

<section id="features">
  <h2>{$_('easyFastReliable')}</h2>
  <div>
    <h3>{$_('advancedAnimation')}</h3>
    <p>{$_('advancedAnimationDescription')}</p>
  </div>
  <div>
    <h3>{$_('nextLevelUI')}</h3>
    <p>{$_('nextLevelUIDescription')}</p>
  </div>
  <div>
    <h3>{$_('websiteOptimization')}</h3>
    <p>{$_('websiteOptimizationDescription')}</p>
  </div>
</section>
