export function scrollToId(anchor) {
  document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' });
}
