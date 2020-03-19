<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { user, isLoggedIn } from '@helpers/user.js';

  let name = $isLoggedIn ? `${$user.firstName} ${$user.lastName}` : '';
  let email = $isLoggedIn ? $user.email : '';
  let title = '';
  let body = '';

  async function sendMail() {
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, title: title, body: body }),
      });
      if (!res.ok) throw new Error(res.statusText);
      // Success
    } catch (error) {
      // Error
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  #container5 {
    margin-top: 50px;
  }

  #content {
    padding: 25px 10%;
    background-color: $theme-blue;
    color: white;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
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
    margin-bottom: -0.5px;
  }
</style>

<div id="container5">
  <div id="repeating-top" />
  <div id="content">
    <h2>Contact</h2>
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
      <textarea class="form-element" rows="8" bind:value={body} placeholder={$_('body')} />
      <button id="send" type="button" on:click={sendMail}>{$_('send')}</button>
    </form>
  </div>
</div>
