<script>
  import { _ } from '@helpers/translation.js';
</script>

<section class="page">
  <h1>{$_('salesAgreementTitle')}</h1>
  <p>
    <b>IMPORTANT:</b>
    {$_('enNotLegallyBinding')}
  </p>
  <br />
  <p>
    {@html $_('salesAgreement')}
  </p>
</section>
