<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { user, isLoggedIn } from '@helpers/user.js';

  function sendMail() {
    console.log('Send button pressed');
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
      background-color: lighten($theme-blue, 10%);
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
        value={$isLoggedIn ? `${$user.firstName} ${$user.lastName}` : ''}
        placeholder={$_('fullname')}
        readonly={$isLoggedIn}
        class:readonly={$isLoggedIn} />
      <input
        class="form-element"
        type="email"
        value={$isLoggedIn ? $user.email : ''}
        placeholder={$_('email')}
        readonly={$isLoggedIn}
        class:readonly={$isLoggedIn} />
      <input class="form-element" type="text" value="" placeholder={$_('title')} />
      <textarea class="form-element" rows="8" placeholder={$_('body')} />
      <button id="send" type="submit" on:click={sendMail}>{$_('send')}</button>
    </form>
  </div>
</div>
