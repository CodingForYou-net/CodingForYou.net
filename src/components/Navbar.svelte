<script>
  import { _, store as lang } from '@helpers/translation.js';
  import { createEventDispatcher } from 'svelte';
  import navRoutes from '@config/navRoutes.js';
  import { stores } from '@sapper/app';
  import { isLoggedIn, user } from '@helpers/user.js';
  import mobile from 'is-mobile';

  const { page } = stores();
  const dispatch = createEventDispatcher();

  $: otherLangPath = $page.path.replace(/^\/(fr|en)/, '/' + $lang.other);

  $: segment = $page.path
    .split('/')
    .splice(2)
    .join('/');

  let isOpen, stayOpen, logoHovered, mobileOpen;

  // Navbar hover
  function navbarHover() {
    !stayOpen && !logoHovered && !mobile({ tablet: true, featureDetect: true }) && (isOpen = true);
  }

  // Navbar leave
  function navbarLeave() {
    !stayOpen && !mobile({ tablet: true, featureDetect: true }) && (isOpen = false);
  }

  // nav-item clicked
  function navItemClicked() {
    !stayOpen && (isOpen = false);
    mobileOpen && mobileClose();
    const interval = setInterval(() => !stayOpen && (isOpen = false), 1);
    setTimeout(() => clearInterval(interval), 250);
  }

  // Logo item clicked
  function logoClicked() {
    mobileOpen && isOpen && (mobileOpen = false);
    isOpen = !isOpen;
    stayOpen = isOpen;
    dispatch('stayopen', isOpen);
  }

  // Lover hover
  function logoHover() {
    !isOpen && (logoHovered = true);
  }

  //Logo leave
  function logoLeave() {
    logoHovered = false;
  }

  // Mobile navbar clicked
  function mobileClick() {
    logoClicked();
    mobileOpen = true;
  }

  // Overlay clicked
  function mobileClose() {
    mobileOpen = false;
    isOpen = false;
    stayOpen = false;
    dispatch('stayopen', isOpen);
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  // Small screens
  @media only screen and (max-width: 600px) {
    nav {
      width: 0;
    }
    #mobile-button {
      width: 5rem;
    }
  }

  // Large screens
  @media only screen and (min-width: 600px) {
    nav {
      width: 5rem;
    }
    #mobile-button {
      width: 0;
    }
  }

  svg {
    color: $theme-green;
    margin: 0 1.5rem;
    min-width: 2rem;
    width: 2rem;
  }

  nav {
    background-color: darken($theme-black, 5%);
    height: -webKit-fill-available;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    transition: width 0.6s ease;
    z-index: 1000;
    &.open {
      width: 16rem;
      & .link-text {
        opacity: 1;
        visibility: visible;
      }
    }
    & ul {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      transition: 0.3s;
      #bottom {
        margin-top: auto;
      }

      & li#logo {
        background-color: darken($theme-black, 10%);
        font-weight: 500;
        margin-bottom: 1rem;
        text-align: center;
        text-transform: uppercase;
        width: 100%;
        & #logo-container {
          align-items: center;
          display: flex;
          height: 5rem;
          text-decoration: none;
          & #double-arrow {
            cursor: pointer;
            filter: grayscale(100%) opacity(0.7);
            transform: rotate(0deg);
            transition: filter 0.3s, transform 0.6s, margin-left 0.6s;
            &:hover {
              filter: grayscale(0%) opacity(1);
            }
            &.open {
              margin-left: 12rem;
              transform: rotate(-180deg);
            }
          }
          & #logo-text {
            display: inline;
            left: -999px;
            letter-spacing: 0.15ch;
            position: absolute;
            transition: 0.6s;
            &.open {
              left: 0;
            }
          }
        }
      }

      & li.nav-item {
        width: 100%;
        & #login {
          align-items: center;
          color: white;
          display: flex;
          height: 5rem;
          text-decoration: none;
          transition: background-color 0.3s;
          &:hover {
            background-color: darken($theme-black, 10%);
            & span {
              filter: grayscale(0%) opacity(1);
            }
          }
          & #profile-picture {
            border-radius: 50%;
            margin: 0 1rem;
            min-width: 3rem;
            width: 3rem;
          }
          & span {
            transition: filter 0.3s;
            filter: grayscale(100%) opacity(0.7);
          }
        }
      }

      & a.nav-link {
        align-items: center;
        color: white;
        display: flex;
        filter: grayscale(100%) opacity(0.7);
        height: 5rem;
        text-decoration: none;
        transition: 0.3s;
        &:hover {
          background-color: darken($theme-black, 10%);
          filter: grayscale(0%) opacity(1);
        }
        &.selected {
          filter: grayscale(0%) opacity(1);
        }
      }

      & .link-text {
        margin: 0 1rem;
        opacity: 0;
        transition-delay: 0.2s;
        transition: opacity 0.5s linear;
        visibility: hidden;
      }
    }
  }

  #overlay {
    background-color: rgba(0, 0, 0, 0.25);
    bottom: 0;
    height: 100%;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: visibility 0.3s linear, opacity 0.3s linear;
    visibility: hidden;
    width: 100%;
    z-index: 998;
    &.on {
      opacity: 1;
      visibility: visible;
    }
  }

  #mobile-button {
    align-items: center;
    background-color: darken($theme-black, 10%);
    display: flex;
    height: 5rem;
    left: 0;
    opacity: 0.75;
    overflow: none;
    position: fixed;
    top: 0;
    transition: width 0.6s ease;
    z-index: 999;
    svg {
      cursor: pointer;
      filter: grayscale(100%);
      transition: filter 0.3s;
      &:hover {
        filter: grayscale(0%);
      }
    }
  }
</style>

<div id="mobile-button">
  <svg
    on:click={mobileClick}
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="angle-double-right"
    class="svg-inline--fa fa-angle-double-right fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    class:open={isOpen}>
    <path
      fill="currentColor"
      d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6
      0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
      136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4
      24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9
      0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
  </svg>
</div>

<nav class="navbar" on:mouseover={navbarHover} on:mouseleave={navbarLeave} class:open={isOpen}>
  <ul class="navbar-nav">
    <li id="logo" on:mouseover={logoHover} on:mouseleave={logoLeave}>
      <div id="logo-container">
        <a href="/{$lang.current}" class="nav-link" on:click={navItemClicked}>
          <span class="link-text" id="logo-text" class:open={isOpen}>CodingForYou</span>
        </a>
        <svg
          on:click={logoClicked}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="angle-double-right"
          class="svg-inline--fa fa-angle-double-right fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class:open={isOpen}
          id="double-arrow">
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
          class:selected={segment === route.path}
          on:click={navItemClicked}>
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={route.icon.viewBox}>
            <path fill="currentColor" d={route.icon.path} />
          </svg>
          <span class="link-text">{$_(route.name)}</span>
        </a>
      </li>
    {/each}
    <div id="bottom" />
    <li class="nav-item">
      <a rel="prefetch" href={otherLangPath} class="nav-link" on:click={navItemClicked}>
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
      {#if $isLoggedIn}
        <a href="/{$lang.current}/profile" id="login" on:click={navItemClicked}>
          <img src={$user.image} alt="profile-picture" id="profile-picture" />
          <span class="link-text">{$user.firstName} {$user.lastName}</span>
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
          <span class="link-text">{$_('login')}</span>
        </a>
      {/if}
    </li>
  </ul>
</nav>
<div id="overlay" class:on={(isOpen && !stayOpen) || mobileOpen} on:click={mobileClose} />
