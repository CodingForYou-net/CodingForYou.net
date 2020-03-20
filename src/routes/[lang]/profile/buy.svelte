<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { stripePublic } from '@config/keys.js';
  import Swal from 'sweetalert2';
  import { quillHtml } from '@helpers/other.js';

  let products = [];
  const { page } = stores();
  let stripe;

  onMount(async () => {
    stripe = Stripe(stripePublic);
    products = await (await fetch('/api/products')).json();
  });

  async function buy(productID) {
    let editor;
    setTimeout(() => {
      editor = new Quill('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow',
        placeholder: 'placeholder',
      });
    }, 0);
    const sa = await Swal.fire({
      title: 'cOmMeNtAiReS',
      html: quillHtml,
      width: 1500,
    });
    if (sa.dismiss) return;
    const comments = editor.container.firstChild.innerHTML;
    console.log(comments);
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
</script>

<ul>
  {#each products as product (product._id)}
    <li on:click={() => buy(product._id)}>
      {product.name} ${product.amount / 100} {product.currency}
    </li>
  {/each}
</ul>
