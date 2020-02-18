import { locale } from 'svelte-intl';

export function getOtherLanguage(lang = getCurrentLanguage()) {
  return lang === 'en' ? 'fr' : 'en';
}

export function getCurrentLanguage() {
  let lang;
  locale.subscribe((l) => (lang = l))();
  return lang;
}
