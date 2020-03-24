<script>
  import { store as lang } from '@helpers/translation.js';
  import { draw } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';

  let displayRocket = false;
  let transitionDuration = 4000;
  let transitionDelay = 1000;
  onMount(() => {
    displayRocket = true;
    setTimeout(() => {
      document.getElementById('rocket') &&
        document
          .getElementById('rocket')
          .childNodes.forEach((path) => (path.style.fill = path.getAttribute('stroke')));
    }, transitionDelay + transitionDuration);
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

  // Small screens
  @media only screen and (max-width: 600px) {
    #shape1 {
      display: none;
    }
    #shape2 {
      display: none;
    }
    #desktop {
      display: none;
    }
  }

  // Large screens
  @media only screen and (min-width: 600px) {
  }

  section {
    background-color: #0c164f;
    height: 100vh;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .wave {
    background-image: url('/wave.svg');
    background-size: 1000px 100px;
    bottom: 0;
    height: 100px;
    left: 0;
    position: absolute;
    right: 0;
    width: 100%;
  }

  #wave1 {
    animation-delay: 0s;
    animation: moveWave1 30s linear infinite;
    bottom: -1px;
    opacity: 1;
    z-index: 800;
  }
  #wave2 {
    animation-delay: -5s;
    animation: moveWave2 15s linear infinite;
    bottom: 10px;
    opacity: 0.5;
    z-index: 799;
  }
  #wave3 {
    animation-delay: -2s;
    animation: moveWave1 30s linear infinite;
    bottom: 15px;
    opacity: 0.2;
    z-index: 798;
  }
  #wave4 {
    animation-delay: -5s;
    animation: moveWave2 5s linear infinite;
    bottom: 20px;
    opacity: 0.7;
    z-index: 797;
  }

  #shape1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    min-width: 250px;
  }

  #shape2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    min-width: 250px;
  }

  #rocket {
    height: 50%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 25%;
    fill: transparent;
    path {
      transition: fill 0.5s ease;
    }
  }

  #desktop {
    width: 50%;
    min-width: 500px;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  #text {
    color: white;
    left: 0;
    position: absolute;
    text-transform: uppercase;
    top: 0;
    z-index: 796;
    & h1 {
      font-size: 4rem;
    }
  }

  #rocket-fire {
    #fire {
      height: 50px;
      #outer-fire {
        position: relative;
        animation: MoveUpDown 0.25s linear infinite;
      }

      #inner-fire {
        position: relative;
        animation: MoveUpDown 0.25s linear infinite;
      }
    }
  }
</style>

<section id="container1">
  <div class="wave" id="wave1" />
  <div class="wave" id="wave2" />
  <div class="wave" id="wave3" />
  <div class="wave" id="wave4" />
  <div>
    <div id="text">
      <h1>Coding</h1>
      <h1>For</h1>
      <h1>You</h1>
    </div>
    <img id="shape1" src="/shape1.svg" alt="shape" />
    <img id="shape2" src="/shape2.svg" alt="shape" />
    <img src="/desktop.svg" id="desktop" alt="desktop" />

    <div rocket-fire>
      <div id="fire">
        <svg viewBox="0 0 43 86" xmlns="http://www.w3.org/2000/svg" id="outer-fire">
          <path
            d="M0.17348 18.2692C0.17348 -4.99472 9.56555 1.42003 21.1513 1.42003C32.737 1.42003
            42.129 -4.99472 42.129 18.2692C42.129 41.5331 21.1513 85.6661 21.1513 85.6661C21.1513
            85.6661 0.17348 41.5332 0.17348 18.2692Z"
            fill="#FF9F43" />
        </svg>
        <svg viewBox="0 0 93 188" xmlns="http://www.w3.org/2000/svg" id="inner-fire">
          <path
            d="M-1.86327e-05 38.8514C-1.86327e-05 -12.3293 20.6626 1.78303 46.1512 1.78303C71.6398
            1.78303 92.3024 -12.3293 92.3024 38.8514C92.3024 90.032 46.1512 187.125 46.1512
            187.125C46.1512 187.125 -1.86327e-05 90.032 -1.86327e-05 38.8514Z"
            fill="#FECA57" />
        </svg>
      </div>

      {#if displayRocket}
        <svg id="rocket" viewBox="0 0 288 693" stroke="none" xmlns="http://www.w3.org/2000/svg">
          <!-- <path
          transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
          d="M97 543.851C97 492.671 117.663 506.783 143.151 506.783C168.64 506.783 189.302 492.671
          189.302 543.851C189.302 595.032 143.151 692.125 143.151 692.125C143.151 692.125 97 595.032
          97 543.851Z"
          stroke="#FECA57"
          id="outer-fire" />
        <path
          transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
          d="M122.173 524.269C122.173 501.005 131.566 507.42 143.151 507.42C154.737 507.42 164.129
          501.005 164.129 524.269C164.129 547.533 143.151 591.666 143.151 591.666C143.151 591.666
          122.173 547.533 122.173 524.269Z"
          stroke="#FF9F43"
          id="inner-fire" /> -->
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M81.74 433.73C79.788 434.077 77.8767 434.622 76.0357 435.358C35.0105 451.741 35.695
            558.981 35.695 558.981H23.6171C23.6171 558.981 19.8143 512.959 3.24141 447.299C-11.6886
            388.225 49.545 335.282 61.9803 325.242C63.3798 324.124 64.1556 323.531 64.1556
            323.531C125.83 346.196 81.74 433.73 81.74 433.73Z"
            stroke="#0ABDE3" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            opacity="0.2"
            d="M68.6429 325.395C67.2206 324.74 65.7527 324.117 64.1936 323.546C64.1936 323.546
            63.433 324.14 62.0183 325.258C49.583 335.297 -11.6506 388.24 3.27944 447.314C19.8523
            512.974 23.6171 558.981 23.6171 558.981H30.409C30.409 558.981 26.6442 512.959 10.0333
            447.299C-4.83585 388.499 55.8045 335.753 68.6429 325.395Z"
            stroke="white" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M285.223 447.314C268.612 512.974 264.87 558.981 264.87 558.981H252.77C252.77 558.981
            253.53 446.903 209.622 434.392C208.671 434.107 207.704 433.88 206.725 433.715C206.725
            433.715 162.611 346.181 224.309 323.531C224.309 323.531 224.933 323.995 226.058
            324.9C237.49 334.05 300.32 387.556 285.223 447.314Z"
            stroke="#0ABDE3" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            opacity="0.1"
            d="M81.74 433.73C79.788 434.077 77.8767 434.622 76.0357 435.358C68.6185 399.058 63.9204
            362.256 61.9803 325.258C63.3798 324.14 64.1556 323.546 64.1556 323.546C125.83 346.196
            81.74 433.73 81.74 433.73Z"
            stroke="black" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            opacity="0.1"
            d="M226.081 324.915C223.566 361.806 218.07 398.433 209.645 434.438C208.694 434.152
            207.726 433.926 206.747 433.761C206.747 433.761 162.634 346.226 224.332 323.577C224.309
            323.546 224.933 324.01 226.081 324.915Z"
            stroke="black" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M203.5 450.326C199.241 467.129 194.249 484.369 188.524 502.045C188.524 502.045
            161.357 530.346 95.7345 502.045C95.7345 502.045 89.1784 483.563 81.9682 452.144C66.0951
            383.061 47.058 251.414 87.6192 116.192C99.6979 75.5414 116.866 36.5805 138.714
            0.235168C138.714 0.235168 173.366 40.0206 198.799 116.169C224.233 192.317 240.418
            304.844 203.5 450.326Z"
            stroke="#E3E8F4" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M144.228 278.019C174.317 278.019 198.708 253.627 198.708 223.539C198.708 193.45
            174.317 169.059 144.228 169.059C114.14 169.059 89.7488 193.45 89.7488 223.539C89.7488
            253.627 114.14 278.019 144.228 278.019Z"
            stroke="#AFC0E0" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M182.865 223.569C182.865 230.886 180.788 238.052 176.874 244.234C172.961 250.416
            167.373 255.36 160.76 258.49C154.146 261.621 146.781 262.809 139.519 261.917C132.257
            261.025 125.397 258.09 119.738 253.452C116.976 251.177 114.539 248.534 112.497
            245.595C111.58 244.283 110.747 242.914 110.003 241.496C107.105 235.965 105.594 229.813
            105.599 223.569C105.599 223.257 105.599 222.953 105.599 222.649C105.797 214.387 108.636
            206.405 113.7 199.874C118.765 193.342 125.788 188.604 133.74 186.355C136.777 185.518
            139.901 185.043 143.05 184.94H144.206C149.281 184.937 154.307 185.934 158.997
            187.874C163.686 189.814 167.948 192.658 171.538 196.246C175.128 199.833 177.976 204.092
            179.92 208.781C181.864 213.469 182.864 218.494 182.865 223.569Z"
            stroke="#00B0FF" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M198.792 116.169C136.98 145.763 87.5812 116.169 87.5812 116.169C99.6736 75.5246
            116.854 36.5714 138.714 0.235138C138.714 0.235138 173.366 40.0206 198.792 116.169Z"
            stroke="#0ABDE3" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M203.5 450.326C200.61 461.704 197.39 473.277 193.841 485.046C192.157 490.659 190.382
            496.318 188.517 502.022C188.517 502.022 161.349 530.323 95.7269 502.022C95.7269 502.022
            93.5973 496.021 90.4029 485.046C88.0147 476.756 85.0409 465.644 81.9377 452.121C81.9377
            452.121 106.367 462.548 141.042 462.548C162.462 462.622 183.687 458.468 203.5 450.326Z"
            stroke="#0ABDE3" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M193.84 485.046C192.157 490.659 190.382 496.318 188.516 502.022C188.516 502.022
            161.349 530.323 95.7268 502.022C95.7268 502.022 93.5972 496.021 90.4028 485.046C90.3952
            485.046 157.28 504.288 193.84 485.046Z"
            stroke="#E3E8F4" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            opacity="0.2"
            d="M133.763 186.301L133.679 186.362L105.614 222.596C105.614 222.9 105.614 223.204
            105.614 223.516C105.609 229.76 107.12 235.912 110.018 241.443L143.088 184.887L133.763
            186.301Z"
            stroke="white" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            opacity="0.2"
            d="M142.968 219.474L119.984 253.89C117.221 251.615 114.785 248.971 112.743
            246.033L140.123 216.645L142.968 219.474Z"
            stroke="white" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            opacity="0.2"
            d="M110.413 502.79C110.413 502.79 103.857 484.301 96.6472 452.889C80.774 383.799 61.7369
            252.152 102.298 116.93C113.201 80.3416 128.217 45.1076 147.058 11.9023C141.909 4.68452
            138.692 1.00336 138.692 1.00336C116.839 37.3381 99.6665 76.2888 87.5811 116.93C47.0199
            252.152 66.057 383.799 81.9301 452.889C89.1403 484.301 95.6964 502.79 95.6964
            502.79C121.624 513.963 141.544 516.305 156.162 515.058C143.673 514.107 128.507 510.586
            110.413 502.79Z"
            stroke="white" />
          <path
            transition:draw|local={{ duration: transitionDuration, delay: transitionDelay }}
            d="M125.636 396.051C125.589 396.239 125.472 396.684 125.285 397.387C125.097 398.09
            124.921 399.04 124.757 400.235C124.593 401.43 124.511 402.719 124.511 404.102C124.511
            407.946 125.976 410.887 128.906 412.926C131.812 414.965 136.218 415.985 142.125
            415.985C147.796 415.985 151.98 414.93 154.675 412.821C157.347 410.711 158.683 407.688
            158.683 403.751C158.683 401.641 158.32 399.567 157.593 397.528C156.843 395.489 156.023
            393.743 155.132 392.29C154.242 390.813 153.75 390.075 153.656 390.075L160.125
            386.102C160.265 386.102 161.039 387.016 162.445 388.844C163.828 390.672 165.105 392.981
            166.277 395.77C167.425 398.559 168 401.629 168 404.981C168 412.317 165.832 417.989
            161.496 421.997C157.136 426.004 150.808 428.008 142.511 428.008C136.933 428.008 132.117
            427.012 128.062 425.02C124.007 423.028 120.902 420.215 118.746 416.583C116.589 412.926
            115.511 408.649 115.511 403.751C115.511 401.149 115.769 398.618 116.285 396.157C116.777
            393.696 117.328 391.551 117.937 389.723C118.523 387.895 118.839 386.981 118.886
            386.981L132.562 387.333L132.562 394.399L125.636 396.051ZM161.003 380.723L158.824
            375.309L125.003 375.309L122.824 380.723L116.707 380.723L116.355 364.165L116.355
            343.985L130.031 343.985L130.031 350.7L125.003 352.493L125.003 364.165L137.589
            364.165L137.589 349.258L145.535 349.258L145.535 364.165L158.824 364.165L161.003
            357.52L167.121 357.52L167.121 380.723L161.003 380.723ZM161.003 329.219L158.824
            323.84L149.542 323.84L124.792 337.024L122.824 341.7L116.707 341.7L116.355
            321.309L122.824 321.309L124.335 325.001L139.839 317.793L124.441 310.165L122.824
            314.102L116.707 314.102L116.355 294.661L122.824 294.661L124.792 299.653L149.472
            312.661L158.824 312.661L161.003 307.282L167.121 307.282L167.121 329.219L161.003 329.219Z"
            stroke="#48DBFB" />
        </svg>
      {/if}
    </div>
  </div>
</section>
