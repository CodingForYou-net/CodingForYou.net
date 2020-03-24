<script>
  import { _, store as lang } from '@helpers/translation.js';
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  footer {
    text-align: center;
    background-color: $theme-black;
    color: white;
    padding: 35px 10% 0;
  }

  #about {
    font-size: 0.9rem;
    text-align: center;
    margin: 10px 0;
    & div {
      display: inline-block;
      margin: 0 auto;
      text-align: left;
      & ul {
        list-style: none;
        & li {
          margin-bottom: 0.9rem;
          & a {
            text-decoration: none;
            color: white;
            text-decoration: none;
            display: inline-block;
            &::after {
              content: '';
              display: block;
              width: 0;
              height: 1px;
              background: white;
              transition: width 0.3s;
            }
            &:hover::after {
              width: 100%;
              transition: width 0.3s;
            }
          }
        }
      }
    }
  }
  #copyright {
    font-size: 0.75rem;
    padding: 20px 0;
  }

  hr {
    background-color: lighten($theme-black, 20%);
    margin: 0;
  }

  #twitter {
    width: 40px;
    margin: 30px;
  }
</style>

<footer>
  <div id="about">
    <a href="https://twitter.com/team_cfy">
      <img id="twitter" src="twitterLogo.svg" alt="twitter" />
    </a>
    <div>
      <ul>
        <li>
          <a href="/{$lang.current}/about/privacy">{$_('privacy')}</a>
        </li>
        <li>
          <a href="/{$lang.current}/about/contract">{$_('contract')}</a>
        </li>
        <li>
          <a href="/{$lang.current}/about/credits">{$_('credits')}</a>
        </li>
      </ul>
    </div>

  </div>

  <hr />
  <div id="copyright">
    <span>&copy; 2020 Samuel Martineau & Vu Dang Khoa Chiem. {$_('copyright')}</span>
  </div>
</footer>
