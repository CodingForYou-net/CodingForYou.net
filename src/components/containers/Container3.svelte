<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { onMount } from 'svelte';
  import { stores, goto } from '@sapper/app';
  import products from '@config/products.js';
  import { stripePublic } from '@config/keys.js';
  import Swal from 'sweetalert2';
  import { user, isLoggedIn } from '@helpers/user.js';

  const { page } = stores();
  let stripe;

  onMount(() => {
    stripe = Stripe(stripePublic);
  });

  async function buy(productID) {
    if (!$isLoggedIn) {
      Swal.fire({
        title: 'Please login',
        text: 'Login in order to buy a site from us!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Later',
      }).then((result) => {
        if (result.value) {
          goto('/api/auth/google');
        }
      });
    } else {
      const { value: comments } = await Swal.fire({
        title: 'Enter a text',
        input: 'text',
        showCancelButton: false,
      });
      try {
        const res = await fetch(
          `/api/stripe/create-checkout-session
        ?productID=${productID}
        &cancelPath=${$page.path}
        &comments=${encodeURIComponent(comments)}`
            .replace(/\s/gm, '')
            .replace(/\n/gm, ''),
          {
            credentials: 'include',
          }
        );
        if (!res.ok) throw new Error(res.statusText);
        const { error } = await stripe.redirectToCheckout({
          sessionId: await res.text(),
        });
        if (error) throw error;
      } catch (error) {
        alert('error');
        console.log(error);
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  section {
    margin: 50px 0;
  }

  #repeating-top {
    background-image: url(/triangleUp.svg);
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
    margin-bottom: -0.5px;
    margin-left: -1px;
  }

  #repeating-bottom {
    background-image: url(/triangleDown.svg);
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
    margin-top: -1px;
    margin-left: -1px;
  }

  #content {
    background-color: $theme-green;
    text-align: center;
    color: white;
    padding: 20px 10%;
    & .packages {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      grid-gap: 50px;
      color: $theme-green;
      margin: 40px 0;
      & .package {
        display: flex;
        padding: 20px 50px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 10px;
        transition: transform 0.3s;
        svg {
          width: 25%;
          min-width: 75px;
          float: right;
        }
        &:hover {
          transform: translateY(-10px);
        }
      }
    }
  }

  #learnMore {
    text-decoration: none;
    display: inline-block;
    &::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background: white;
      transition: width 0.3s;
    }
    &:hover::after {
      width: 100%;
      transition: width 0.3s;
    }
    div {
      font-size: 1.25rem;
      vertical-align: middle;
      display: flex;
      color: white;
      margin-bottom: 2px;
      & span {
        margin-right: 10px;
      }
      & svg {
        width: 1rem;
        height: 100%;
        margin: auto 0;
      }
    }
  }

  .price {
    display: flex;
    position: relative;
    margin: 10px 0;
    & h1,
    h3 {
      margin: auto 0;
    }
  }
</style>

<section id="container3">
  <div id="repeating-top" />
  <div id="content">
    <h2>{$_('webPackages')}</h2>
    <div class="packages">
      {#each Object.entries(products) as product (product[0])}
        <div class="package" id="package1" on:click={() => buy(product[0])}>
          <h3>{product[1].name}</h3>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="smile-beam"
            class="svg-inline--fa fa-smile-beam fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512">
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM112
              223.4c3.3-42.1 32.2-71.4 56-71.4s52.7 29.3 56 71.4c.7 8.6-10.8 11.9-14.9
              4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5 17c-4.3 7.4-15.8
              4-15.1-4.5zm250.8 122.8C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.5-16.3
              11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.6-16.2 38.1 4.3
              24.6 20.5zm6.2-118.3l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5
              17c-4.1 7.3-15.6 4-14.9-4.5 3.3-42.1 32.2-71.4 56-71.4s52.7 29.3 56 71.4c.6 8.6-11
              11.9-15.1 4.5z" />
          </svg>
          <div class="price">
            <h1>{product[1].amount / 100}$</h1>
            <h3>CAD</h3>
          </div>
          <ul>
            <li>Features</li>
          </ul>
        </div>
      {/each}
      <!-- <div class="package" id="package1">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="smile-beam"
          class="svg-inline--fa fa-smile-beam fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512">
          <path
            fill="currentColor"
            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM112
            223.4c3.3-42.1 32.2-71.4 56-71.4s52.7 29.3 56 71.4c.7 8.6-10.8 11.9-14.9
            4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5 17c-4.3 7.4-15.8
            4-15.1-4.5zm250.8 122.8C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.5-16.3
            11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.6-16.2 38.1 4.3
            24.6 20.5zm6.2-118.3l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5
            17c-4.1 7.3-15.6 4-14.9-4.5 3.3-42.1 32.2-71.4 56-71.4s52.7 29.3 56 71.4c.6 8.6-11
            11.9-15.1 4.5z" />
        </svg>
        <h1>5$</h1>
        <ul>
          <li>Maximum 5 pages</li>
          <li>No custom SVG</li>
          <li>Custom design</li>
          <li>Top navbar</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
        </ul>
      </div>
      <div class="package" id="package2">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="grin-squint"
          class="svg-inline--fa fa-grin-squint fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512">
          <path
            fill="currentColor"
            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm33.8
            189.7l80-48c11.6-6.9 24 7.7 15.4 18L343.6 208l33.6 40.3c8.7 10.4-3.9 24.8-15.4
            18l-80-48c-7.7-4.7-7.7-15.9 0-20.6zm-163-30c-8.6-10.3 3.8-24.9 15.4-18l80 48c7.8 4.7 7.8
            15.9 0 20.6l-80 48c-11.5 6.8-24-7.6-15.4-18l33.6-40.3-33.6-40.3zM248 432c-60.6
            0-134.5-38.3-143.8-93.3-2-11.9 9.4-21.6 20.7-17.9C155.1 330.5 200 336 248 336s92.9-5.5
            123.1-15.2c11.5-3.7 22.6 6.2 20.7 17.9-9.3 55-83.2 93.3-143.8 93.3z" />
        </svg>
        <h1>10$</h1>
        <ul>
          <li>Maximum 5 pages</li>
          <li>No custom SVG</li>
          <li>Custom design</li>
          <li>Top navbar</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
        </ul>
      </div> -->
      <div class="package" id="package3">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="grin-stars"
          class="svg-inline--fa fa-grin-stars fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512">
          <path
            fill="currentColor"
            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM94.6
            168.9l34.9-5 15.5-31.6c2.9-5.8 11-5.8 13.9 0l15.5 31.6 34.9 5c6.2 1 8.9 8.6 4.3
            13.2l-25.4 24.6 6 34.9c1 6.2-5.3 11-11 7.9L152 233.3l-31.3 16.3c-5.7
            3.1-12-1.7-11-7.9l6-34.9-25.4-24.6c-4.6-4.7-1.9-12.3 4.3-13.3zM248 432c-60.6
            0-134.5-38.3-143.8-93.3-2-11.8 9.3-21.5 20.7-17.9C155.1 330.5 200 336 248 336s92.9-5.5
            123.1-15.2c11.5-3.7 22.6 6.1 20.7 17.9-9.3 55-83.2 93.3-143.8 93.3zm157.7-249.9l-25.4
            24.6 6 34.9c1 6.2-5.3 11-11 7.9L344 233.3l-31.3 16.3c-5.7
            3.1-12-1.7-11-7.9l6-34.9-25.4-24.6c-4.5-4.6-1.9-12.2 4.3-13.2l34.9-5 15.5-31.6c2.9-5.8
            11-5.8 13.9 0l15.5 31.6 34.9 5c6.3.9 9 8.5 4.4 13.1z" />
        </svg>
        <h1>15$</h1>
        <ul>
          <li>Maximum 5 pages</li>
          <li>No custom SVG</li>
          <li>Custom design</li>
          <li>Top navbar</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
        </ul>
      </div>
    </div>
    <a href="/" id="learnMore">
      <div>
        <span>{$_('learnMore')}</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrow-right"
          class="svg-inline--fa fa-arrow-right fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6
            467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3
            0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
        </svg>
      </div>
    </a>
  </div>
  <div id="repeating-bottom" />
</section>
