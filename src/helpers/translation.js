import store from '@helpers/lang/langStore.js';
import translationsList from '@helpers/lang/translationsList.js';
import format from 'string-template';
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

function getTranslation(textId, variables = {}, lang = getCurrent()) {
  return format(translationsList[lang][textId], variables);
}

const validPathRegex = /^\/(fr|en)\/?.*$/;

export {
  translationsList,
  store,
  translations,
  _,
  getCurrent,
  getOther,
  validPathRegex,
  getTranslation,
};
