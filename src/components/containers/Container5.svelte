<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { user, isLoggedIn } from '@helpers/user.js';
  import Swal from 'sweetalert2';

  let name = $isLoggedIn ? `${$user.firstName} ${$user.lastName}` : '';
  let email = $isLoggedIn ? $user.email : '';
  let title = '';
  let message = '';

  async function sendMail() {
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, title: title, message: message }),
      });
      if (!res.ok) throw new Error(res.statusText);
      Swal.fire({
        title: 'Success sending message',
        text: 'We will review your message and respond to you as soon as possible!',
        icon: 'success',
      });
      title = '';
      message = '';
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error sending message',
        text: 'Please try again later...',
        icon: 'error',
      });
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  section {
    margin-top: 50px;
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
    & textarea {
      resize: vertical;
    }
    & .form-element {
      box-sizing: border-box;
      margin-bottom: 20px;
      width: 100%;
      border-radius: 5px;
      padding: 10px 10px;
      border: none;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
      &.readonly {
        background: #e8e8e8;
        color: #a1a1a1;
      }
    }
    & #send {
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

  a {
    text-decoration: none;
    color: white;
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
  }
</style>

<section id="contact">
  <div id="repeating-top" />
  <div id="content">
    <h2 data-scroll data-type="2">Contact</h2>
    <p id="contactInfo" data-scroll data-type="1">
      {$_('contactInfo')}
      <strong>
        <a href="mailto:contact@codingforyou.net">contact@codingforyou.net</a>
      </strong>
      !
    </p>
    <form id="contact-form" enctype="text/plain">
      <input
        type="text"
        class="form-element"
        bind:value={name}
        placeholder={$_('fullname')}
        readonly={$isLoggedIn}
        class:readonly={$isLoggedIn} />
      <input
        class="form-element"
        type="email"
        bind:value={email}
        placeholder={$_('email')}
        readonly={$isLoggedIn}
        class:readonly={$isLoggedIn} />
      <input class="form-element" type="text" bind:value={title} placeholder={$_('title')} />
      <textarea class="form-element" rows="8" bind:value={message} placeholder="Message" />
      <button id="send" type="button" on:click={sendMail}>{$_('send')}</button>
    </form>
  </div>
</section>
