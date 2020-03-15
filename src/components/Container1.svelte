<script>
  import { store as lang } from '@helpers/translation.js';
  import { scrollTo } from '@helpers/other.js';
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

  .container1 {
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

  .wave1 {
    animation: moveWave1 30s linear infinite;
    z-index: 800;
    opacity: 1;
    animation-delay: 0s;
    bottom: -1px;
  }
  .wave2 {
    animation: moveWave2 15s linear infinite;
    z-index: 799;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 10px;
  }
  .wave3 {
    animation: moveWave1 30s linear infinite;
    z-index: 798;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 15px;
  }
  .wave4 {
    animation: moveWave2 5s linear infinite;
    z-index: 797;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 20px;
  }

  .arrow-down {
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
      &:hover {
        color: lighten($theme-black, 50%);
      }
    }
  }

  .rocket {
    position: absolute;
    width: 35%;
    min-width: 350px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .shape1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    min-width: 500px;
    color: #5643fd;
  }

  .shape2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    min-width: 500px;
    color: #7649fe;
  }

  .desktop {
    position: absolute;
    z-index: 9;
    bottom: -250px;
    left: -10%;
    width: 50%;
    min-width: 500px;
  }
</style>

<div class="container1">
  <div class="wave wave1" />
  <div class="wave wave2" />
  <div class="wave wave3" />
  <div class="wave wave4" />

  <svg viewBox="0 0 4055 3090" class="shape1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 0H4054.5C4054.5 0 3595.5 320 3255 856.5C2914.5 1393 2460.59 1174.31 2156.5 1362C1738.5
      1620 1976 2156 1620 2362.5C1264 2569 934 2324.44 583 2692.5C279.438 3010.82 0 3090 0 3090V0Z"
      fill="currentColor" />
  </svg>

  <svg viewBox="0 0 5127 4431" class="shape2" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2491.5 2156.5C2960.85 1946.17 3428.62 1921.06 3884 1682C4394.5 1414 5127 0.5 5127
      0.5V4431H0C0 4431 1207 3626.5 1625 3229.5C2043 2832.5 2035.24 2360.96 2491.5 2156.5Z"
      fill="currentColor" />
  </svg>

  <img class="desktop" src="/desktop.svg" alt="desktop" />

  <img class="rocket" src="/rocket.svg" alt="rocket" />

  <div class="arrow-down">
    <span rel="prefetch" on:click={() => scrollTo('container2')}>
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
