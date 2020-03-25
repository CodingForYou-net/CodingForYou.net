<script>
  import { _, store as lang, getTranslation } from '@helpers/translation.js';
  import { user, isLoggedIn } from '@helpers/user.js';
  import { emailRegex } from '@helpers/other.js';
  import { Toast } from '@helpers/other.js';
  import { fade } from 'svelte/transition';
  import Spinner from 'svelte-spinner';

  let name = $isLoggedIn ? `${$user.firstName} ${$user.lastName}` : '';
  let email = $isLoggedIn ? $user.email : '';
  let title = '';
  let message = '';
  let sending = false;

  async function sendMail() {
    if (sending) return;
    try {
      sending = true;
      if (!name.trim()) {
        Toast.fire({ icon: 'warning', title: getTranslation('validName') });
        return (sending = false);
      }
      if (!emailRegex.test(email)) {
        Toast.fire({ icon: 'warning', title: getTranslation('validEmail') });
        return (sending = false);
      }
      if (!title.trim()) {
        Toast.fire({ icon: 'warning', title: getTranslation('validTitle') });
        return (sending = false);
      }
      if (!message.trim()) {
        Toast.fire({ icon: 'warning', title: getTranslation('validMessage') });
        return (sending = false);
      }
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, title: title, message: message }),
      });
      if (!res.ok) throw new Error(res.statusText);
      Toast.fire({
        title: getTranslation('successSendingMail'),
        icon: 'success',
      });
      title = '';
      message = '';
    } catch (error) {
      console.log(error);
      Toast.fire({
        title: getTranslation('errorSendingMail'),
        icon: 'error',
      });
    }
    sending = false;
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  #container {
    position: relative;
  }

  #spinner {
    width: 100%;
    position: absolute;
    text-align: center;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
  }

  section {
    margin-top: 50px;
    transition: opacity 750ms ease;
    &.sending {
      opacity: 0.7;
      * {
        cursor: default;
      }
    }
  }

  #content {
    padding: 50px 10%;
    background-color: $theme-blue;
    color: white;
  }

  h2 {
    text-align: center;
  }

  #contact-form {
    display: flex;
    flex-direction: column;
    textarea {
      resize: vertical;
    }
    .form-element {
      box-sizing: border-box;
      margin-bottom: 20px;
      width: 100%;
      border-radius: 5px;
      padding: 10px 10px;
      border: none;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
      &[readonly] {
        background: #e8e8e8;
        color: #a1a1a1;
      }
    }

    #send {
      background-color: darken($theme-blue, 10%);
      border: none;
      border-radius: 5px 15px 5px;
      color: white;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
      height: 30px;
      width: 150px;
      transition: background-color 0.3s;
      margin: 0 auto;
      cursor: pointer;
      &:hover {
        background-color: darken($theme-blue, 15%);
      }
      &:disabled:hover {
        background-color: darken($theme-blue, 10%);
      }
    }
  }

  #repeating-top {
    background-image: url(/triangleUpBlue.svg);
    background-size: 20px;
    background-repeat: repeat-x;
    overflow: hidden;
    height: 17px;
    margin-bottom: -1px;
    margin-left: -1px;
  }

  #contactInfo {
    margin: 20px 0;
  }
</style>

<div id="container">
  {#if sending}
    <div id="spinner" transition:fade={{ duration: 750 }}>
      <Spinner size="65" speed="750" color="#4f98ca" thickness="3" gap="40" />
    </div>
  {/if}
  <section id="contact" class:sending>
    <div id="repeating-top" />
    <div id="content">
      <h2 data-scroll data-type="2">Contact</h2>
      <p id="contactInfo" data-scroll data-type="1">
        {$_('contactInfo')}
        <strong>contact@codingforyou.net</strong>
        !
      </p>
      <form id="contact-form" enctype="text/plain">
        <input
          type="text"
          class="form-element"
          bind:value={name}
          placeholder={$_('fullname')}
          readonly={$isLoggedIn || sending} />
        <input
          class="form-element"
          bind:value={email}
          placeholder={$_('email')}
          readonly={$isLoggedIn || sending} />
        <input
          class="form-element"
          type="text"
          bind:value={title}
          placeholder={$_('title')}
          readonly={sending} />
        <textarea
          class="form-element"
          rows="8"
          bind:value={message}
          placeholder="Message"
          readonly={sending} />
        <button id="send" type="button" on:click={sendMail} disabled={sending}>{$_('send')}</button>
      </form>
    </div>
  </section>
</div>
