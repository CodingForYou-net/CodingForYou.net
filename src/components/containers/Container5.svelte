<script>
  import { _, store as lang } from '@helpers/translation.js';

  function sendMail() {
    console.log('Send button pressed');
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  #container5 {
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
    & .form-element {
      box-sizing: border-box;
      margin-bottom: 20px;
      width: 100%;
      border-radius: 2px;
      padding: 10px 10px;
      border: none;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
    }
    & #send {
      background-color: lighten($theme-blue, 10%);
      border: none;
      border-radius: 5px 20px 5px;
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
</style>

<div id="container5">
  <h2>Contact</h2>
  <form id="contact-form" enctype="text/plain">
    <input class="form-element" type="text" value="" placeholder={$_('fullname')} />
    <input class="form-element" type="email" value="" placeholder={$_('email')} />
    <input class="form-element" type="text" value="" placeholder={$_('title')} />
    <textarea class="form-element" rows="8" placeholder={$_('body')} />
    <button id="send" type="submit" on:click={sendMail}>{$_('send')}</button>
  </form>
</div>
