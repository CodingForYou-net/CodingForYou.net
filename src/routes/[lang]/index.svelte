<script context="module">
  export async function preload() {
    return {
      products: await (await this.fetch('/api/products')).json(),
    };
  }
</script>

<script>
  import Container1 from '@components/containers/Container1.svelte';
  import Container2 from '@components/containers/Container2.svelte';
  import Container3 from '@components/containers/Container3.svelte';
  import Container4 from '@components/containers/Container4.svelte';
  import Container5 from '@components/containers/Container5.svelte';
  import { onMount } from 'svelte';
  import ScrollOut from 'scroll-out';

  export let products;

  onMount(() => {
    ScrollOut({
      threshold: 0.5,
      once: true,
    });
  });
</script>

<style global lang="scss">
  // Slide in right, fade in
  [data-scroll][data-type='1'] {
    transition: 1s;
  }
  [data-scroll='in'][data-type='1'] {
    opacity: 1;
    transform: translateX(0);
  }
  [data-scroll='out'][data-type='1'] {
    opacity: 0;
    transform: translateX(-200px);
  }

  // Slide in top, fade in
  [data-scroll][data-type='2'] {
    transition: 1s;
  }
  [data-scroll='in'][data-type='2'] {
    opacity: 1;
    transform: translateY(0);
  }
  [data-scroll='out'][data-type='2'] {
    opacity: 0;
    transform: translateY(-20px);
  }
</style>

<Container1 />

<Container2 />

<Container3 {products} />

<Container4 />

<Container5 />
