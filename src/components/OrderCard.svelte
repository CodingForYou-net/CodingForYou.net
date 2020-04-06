<script>
  import { xssFilter } from '@helpers/other.js';
  import { _, store as lang } from '@helpers/translation.js';
  export let product;
  export let date;
  export let completed;
</script>

<style>
  .order {
    background-color: #f2f2f2;
    border-radius: 5px;
    padding: 20px;
    margin: 5px;
  }

  h2 {
    margin: 0;
  }
  hr {
    margin: 10px 0;
  }
</style>

<div class="order">
  <h2>{product.name[$lang.current]}</h2>
  <h5>{product.description[$lang.current]}</h5>
  {#if product.features.length > 0}
    <p>
      <strong>{$_('features')}:</strong>
      <span>{product.features.map((feature) => feature[$lang.current]).join(', ')}</span>
    </p>
  {/if}
  <hr />
  <p>
    <strong>{$_('completed')}:</strong>
    {completed ? '✅' : '❌'}
  </p>
  <p>
    <strong>Date:</strong>
    {new Date(date).toLocaleDateString()}
  </p>
  <p>({$_('addOrderDetails')})</p>
</div>
