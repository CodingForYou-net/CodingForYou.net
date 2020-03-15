export function scrollTo(anchor) {
  document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' });
}
