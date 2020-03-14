import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const user = writable({});

export function getLoggedIn() {
  let ili;
  isLoggedIn.subscribe((s) => (ili = s))();
  return ili;
}

export function getUser() {
  let u;
  user.subscribe((_u) => (u = _u))();
  return u;
}
