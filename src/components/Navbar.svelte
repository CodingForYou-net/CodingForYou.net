<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { createEventDispatcher } from 'svelte';
  import navRoutes from '@config/navRoutes.js';
  import { stores } from '@sapper/app';
  import mobile from 'is-mobile';

  const { session, page } = stores();
  const dispatch = createEventDispatcher();

  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);

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

  if (mobile({ tablet: true })) {
    alert('This is a mobile device');
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  // Small screens
  @media only screen and (max-width: 600px) {
  }

  // Large screens
  @media only screen and (min-width: 600px) {
  }

  .navbar {
    width: 5rem;
    height: 100vh;
    height: -webKit-fill-available;
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
    & .nav-link {
      display: flex;
      align-items: center;
      height: 5rem;
      color: white;
      text-decoration: none;
      filter: grayscale(100%) opacity(0.7);
      transition: 0.3s;
      &:hover {
        filter: grayscale(0%) opacity(1);
        background-color: darken($theme-black, 10%);
        color: white;
      }
      &.selected {
        filter: grayscale(0%) opacity(1);
        color: white;
      }
      & svg {
        width: 2rem;
        min-width: 2rem;
        margin: 0 1.5rem;
        color: $theme-green;
      }
    }
    & .link-text {
      margin-left: 1rem;
      margin-right: 1rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.5s linear;
      transition-delay: 0.2s;
    }
  }

  li.logo {
    font-weight: 500;
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
    & .logo-text {
      display: inline;
      position: absolute;
      left: -999px;
      transition: 0.6s;
      letter-spacing: 0.15ch;
    }
  }

  li.nav-item {
    width: 100%;
    & .login {
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
  }

  .overlay {
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.25);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s linear, opacity 0.3s linear;
    &.on {
      visibility: visible;
      opacity: 1;
    }
  }

  .bottom {
    margin-top: auto;
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
    <div class="bottom" />
    <li class="nav-item">
      <a rel="prefetch" href={otherLangPath} class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512">
          <path
            fill="currentColor"
            d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248
            8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73
            11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65
            4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792
            114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04
            103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11
            24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12
            8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66
            2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59
            31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017
            16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61
            10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62
            3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72
            32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1
            0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448
            256c0 8.67-.74 17.16-1.82 25.54L417 274.25z" />
        </svg>
        <span class="link-text">{$lang.other.toUpperCase()}</span>
      </a>
    </li>
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
<div class="overlay" class:on={isOpen && !stayOpen} />
