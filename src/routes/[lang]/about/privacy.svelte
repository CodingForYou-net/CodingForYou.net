<script>
  import { _ } from '@helpers/translation.js';
</script>

<style lang="scss">
  .indent {
    margin-left: 20px;
  }
</style>

<section class="page">
  <h1>{$_('privacy')}</h1>
  <p>
    <b>IMPORTANT:</b>
    {$_('enNotLegallyBinding')}
  </p>
  <br />
  <p>{$_('privacyP1')}</p>
  <h4 class="indent">Gmail</h4>
  <p class="indent">{$_('privacyP2')}</p>
  <h4 class="indent">Stripe</h4>
  <p class="indent">{$_('privacyP3')}</p>
  <br />
  <p>{$_('privacyP4')}</p>
</section>
