<script>
  import { store as lang } from '@helpers/translation.js';
  import { scrollToId } from '@helpers/other.js';
  import { TweenLite, Power1 } from 'gsap';
  import { scrollMagicLoaded } from '@helpers/other.js';
  // import Rellax from 'rellax';
  import { onMount } from 'svelte';
  // onMount(() => {
  //   const rellax = new Rellax('.rellax');
  // });
  scrollMagicLoaded.subscribe((state) => {
    if (!state) return;
    const tween = TweenLite.to('#rocket', 1, {
      // backgroundColor: '#ffff00',
      y: -600,
      ease: Power1.easeInOut,
    });
    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: '#container1',
      duration: 500,
      triggerHook: 0,
    })
      .setTween(tween)
      .setPin('#container1')
      .addTo(controller);
  });
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  @keyframes moveWave1 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 1000px;
    }
  }

  @keyframes moveWave2 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -1000px;
    }
  }

  #container1 {
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #0c164f;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background-image: url('/wave.svg');
    background-size: 1000px 100px;
  }

  #wave1 {
    animation: moveWave1 30s linear infinite;
    z-index: 800;
    opacity: 1;
    animation-delay: 0s;
    bottom: -1px;
  }
  #wave2 {
    animation: moveWave2 15s linear infinite;
    z-index: 799;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 10px;
  }
  #wave3 {
    animation: moveWave1 30s linear infinite;
    z-index: 798;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 15px;
  }
  #wave4 {
    animation: moveWave2 5s linear infinite;
    z-index: 797;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 20px;
  }

  #arrow-down {
    position: absolute;
    width: 40px;
    bottom: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 20;
    & .arrow {
      position: relative;
      animation: MoveUpDown 1.5s linear infinite;
      color: lighten($theme-black, 60%);
      transition: color 0.3s;
      cursor: pointer;
      &:hover {
        color: lighten($theme-black, 50%);
      }
    }
  }

  #shape1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    min-width: 500px;
  }

  #shape2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    min-width: 500px;
  }

  #rocket {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 250px;
  }

  #desktop {
    width: 50%;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>

<div id="container1">
  <div class="wave" id="wave1" />
  <div class="wave" id="wave2" />
  <div class="wave" id="wave3" />
  <div class="wave" id="wave4" />

  <div>
    <img
      id="shape1"
      class="rellax"
      src="/shape1.svg"
      alt="shape"
      data-rellax-speed="-5"
      data-rellax-zindex="0" />
    <img
      id="shape2"
      class="rellax"
      src="/shape2.svg"
      alt="shape"
      data-rellax-speed="-5"
      data-rellax-percentage="0.3"
      data-rellax-zindex="0" />
    <img src="/desktop.svg" id="desktop" alt="desktop" data-rellax-speed="-10" />
    <img
      id="rocket"
      class="rellax"
      src="/rocket.svg"
      alt="rocket"
      data-rellax-speed="7"
      data-rellax-zindex="2"
      data-rellax-percentage="0.5" />
  </div>

  <div id="arrow-down">
    <span rel="prefetch" on:click={() => scrollToId('container2')}>
      <svg
        aria-hidden="true"
        focusable="false"
        class="arrow"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569
          0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224
          284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373
          24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
      </svg>
    </span>
  </div>
</div>
