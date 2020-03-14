<script>

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
    background-color: $theme-black;
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
    user-select: none;
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
</style>

<div class="container1">
  <div class="wave wave1" />
  <div class="wave wave2" />
  <div class="wave wave3" />
  <div class="wave wave4" />
</div>
