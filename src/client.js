import * as sapper from '@sapper/app';

var isIE = /(MSIE|Trident\/)/i.test(navigator.userAgent);
if (isIE) {
  alert(
    "This website may not render properly on this browser. Please try with an other one. Ce site web peut mal s'afficher avec ce naviguateur web. Veuillez en essayer un autre."
  );
} else {
  console.log('Not IE');
}

sapper.start({
  target: document.querySelector('#sapper'),
});
