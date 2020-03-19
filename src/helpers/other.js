import { writable } from 'svelte/store';

export function scrollToId(anchor) {
  document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' });
}
