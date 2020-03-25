import 'setimmediate';
import 'unfetch/polyfill';

import * as sapper from '@sapper/app';
import { Promise } from 'es6-promise-polyfill';

window.Promise = Promise;

sapper.start({
  target: document.querySelector('#sapper'),
});
