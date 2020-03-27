import * as sapper from '@sapper/app';

window.Promise = Promise;

sapper.start({
  target: document.querySelector('#sapper'),
});
