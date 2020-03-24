<script>
  import { slide } from 'svelte/transition';
  import { store as lang } from '@helpers/translation.js';

  export let name;
  export let images;
  export let amount;
  export let currency;
  export let description;
  export let features;
  export let _id;
  export let showDetails;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  #package {
    color: $theme-green;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 50px;
    transition: transform 0.3s;
    cursor: pointer;
    #image {
      width: 25%;
      min-width: 75px;
      float: right;
      img {
        width: 100%;
      }
    }
    #price {
      display: flex;
      margin: 10px 0;
      position: relative;
      & h1,
      h3 {
        margin: auto 0;
      }
    }
    #features {
      margin: 10px 0;
    }
    &:hover {
      transform: translateY(-10px);
    }
  }
</style>

<div id="package" on:click>
  <h3>{name}</h3>
  <div id="image">
    <img src={images[0]} alt={_id} />
  </div>
  <div id="price">
    {#if $lang.current === 'en'}
      <h3>{currency.toUpperCase()}</h3>
      <h1>${amount / 100}</h1>
    {:else}
      <h1>{amount / 100}$</h1>
      <h3>{currency.toUpperCase()}</h3>
    {/if}
  </div>
  <p>{description}</p>
  {#if features.length > 0 && showDetails}
    <ul transition:slide|local id="features">
      {#each features as feature}
        <li>{feature}</li>
      {/each}
    </ul>
  {/if}
</div>
