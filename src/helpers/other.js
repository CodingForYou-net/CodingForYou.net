import mobile from 'is-mobile';

export function scrollTo(anchor) {
  document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' });
}

export function isMobile() {
  return (
    mobile({ tablet: true }) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}
