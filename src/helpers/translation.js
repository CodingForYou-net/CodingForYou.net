import store from '@helpers/lang/langStore.js';
import translationsList from '@helpers/lang/translationsList.js';
import { _, translations } from 'svelte-intl';

function getCurrent() {
  let lang;
  store.subscribe((l) => (lang = l.current))();
  return lang;
}

function getOther() {
  let lang;
  store.subscribe((l) => (lang = l.other))();
  return lang;
}

export { translationsList, store, translations, _, getCurrent, getOther };
