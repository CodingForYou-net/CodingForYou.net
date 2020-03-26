<script>
  import { xssFilter } from '@helpers/other.js';
  import { _, store as lang } from '@helpers/translation.js';
  export let product;
  export let comments;
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
  <h2>{product.name}</h2>
  <h5>{product.description}</h5>
  <hr />
  <p>
    <strong>{$_('completed')}:</strong>
    {completed ? '✅' : '❌'}
  </p>
  <p>
    <strong>Date:</strong>
    {date}
  </p>
  <p>
    <strong>{$_('comments')}:</strong>
    (Please email us in order to give more detail on your order)
  </p>
  {@html xssFilter.process(comments)}
</div>
