<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { createEventDispatcher } from 'svelte';
  import navRoutes from '@config/navRoutes.js';
  import { stores } from '@sapper/app';

  const { session, page } = stores();
  const dispatch = createEventDispatcher();

  $: segment = $page.path
    .split('/')
    .splice(2)
    .join('/');

  let isOpen, stayOpen, logoHovered;

  function handleHover() {
    !stayOpen && !logoHovered && (isOpen = true);
  }

  function handleLeave() {
    !stayOpen && (isOpen = false);
  }

  function handleClick() {
    isOpen = !isOpen;
    stayOpen = isOpen;
    dispatch('stayopen', isOpen);
  }

  function logoHover() {
    logoHovered = true;
  }

  function logoLeave() {
    logoHovered = false;
  }

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  .navbar {
    width: 5rem;
    height: 100vh;
    position: fixed;
    background-color: darken($theme-black, 5%);
    transition: width 0.6s ease;
    z-index: 1000;
    &.open {
      width: 16rem;
      & .link-text {
        visibility: visible;
        opacity: 1;
      }
      & .logo svg {
        transform: rotate(-180deg);
        margin-left: 12rem;
      }
      & .logo-text {
        left: 0px;
      }
    }
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    width: 100%;
    &:last-child {
      margin-top: auto;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: white;
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: 0.3s;
    &:hover,
    &.selected {
      filter: grayscale(0%) opacity(1);
      background-color: darken($theme-black, 10%);
      color: white;
    }
    & svg {
      width: 2rem;
      min-width: 2rem;
      margin: 0 1.5rem;
      color: $theme-green;
    }
  }

  .link-text {
    margin-left: 1rem;
    margin-right: 1rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s linear;
    transition-delay: 0.2s;
  }

  .logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    background-color: darken($theme-black, 10%);
    text-align: center;
    color: white;
    width: 100%;
    cursor: pointer;
    & svg {
      transform: rotate(0deg);
      transition: 0.6s;
    }
  }

  .logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: 0.6s;
    letter-spacing: 0.15ch;
  }

  .login {
    display: flex;
    align-items: center;
    height: 5rem;
    color: white;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
      background-color: darken($theme-black, 10%);
      color: white;
      & span {
        filter: grayscale(0%) opacity(1);
      }
    }
    & img {
      width: 3rem;
      min-width: 3rem;
      margin: 0 1rem;
      border-radius: 1.5rem;
    }
    & span {
      filter: grayscale(100%) opacity(0.7);
    }
  }
</style>

<nav class="navbar" on:mouseover={handleHover} on:mouseleave={handleLeave} class:open={isOpen}>
  <ul class="navbar-nav">
    <li class="logo" on:click={handleClick} on:mouseover={logoHover} on:mouseleave={logoLeave}>
      <div class="nav-link">
        <a href="/{$lang.current}" class="nav-link">
          <span class="link-text logo-text">CodingForYou</span>
        </a>

        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="angle-double-right"
          class="svg-inline--fa fa-angle-double-right fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6
            0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
            136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4
            9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6
            9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
        </svg>
      </div>
    </li>
    {#each navRoutes as route}
      <li class="nav-item">
        <a
          rel="prefetch"
          href="/{$lang.current}/{route.path}"
          class="nav-link"
          class:selected={segment === route.path}>
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={route.icon.viewBox}>
            <path fill="currentColor" d={route.icon.path} />
          </svg>
          <span class="link-text">{route.name}</span>
        </a>
      </li>
    {/each}
    <li class="nav-item">
      {#if $session.isLoggedIn}
        <a href="/{$lang.current}/profile" class="login">
          <img src={$session.user.image} alt="profile-picture" />
          <span class="link-text name">{$session.user.firstName} {$session.user.lastName}</span>
        </a>
      {:else}
        <a href="/api/auth/google" class="nav-link">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user"
            class="svg-inline--fa fa-user fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128
              128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2
              0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5
              48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
          </svg>
          <span class="link-text name">{$_('login')}</span>
        </a>
      {/if}
    </li>
  </ul>
</nav>
