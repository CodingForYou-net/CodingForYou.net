import store from '@helpers/langStore.js';
import translationsList from '@helpers/translationsList.js';
import { _, translations } from 'svelte-intl';

function getCurrent() {
  let lang;
  langStore.subscribe((l) => (lang = l.current))();
  return lang;
}

function getOther() {
  let lang;
  langStore.subscribe((l) => (lang = l.other))();
  return lang;
}

export { translationsList, store, translations, _, getCurrent, getOther };
