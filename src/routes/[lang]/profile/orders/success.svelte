<script>
  import Orders from './index.svelte';
  import { onMount } from 'svelte';
  import { Toast } from '@helpers/other.js';
  import { getTranslation } from '@helpers/translation.js';

  onMount(async () => {
    await Toast.fire({
      title: getTranslation('orderReceived'),
      icon: 'success',
    });
  });
</script>

<Orders />
