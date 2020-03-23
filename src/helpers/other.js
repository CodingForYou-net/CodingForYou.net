import Swal from 'sweetalert2';
import xss from 'xss';

export const quillHtml = `
<div id="toolbar">
<span class="ql-formats">
<button class="ql-bold"></button>
<button class="ql-italic"></button>
<button class="ql-underline"></button>
<button class="ql-strike"></button>
</span>
<span class="ql-formats">
<select class="ql-color"></select>
<select class="ql-background"></select>
</span>
<span class="ql-formats">
<button class="ql-script" value="sub"></button>
<button class="ql-script" value="super"></button>
</span>
<span class="ql-formats">
<button class="ql-header" value="1"></button>
<button class="ql-header" value="2"></button>
</span>
<span class="ql-formats">
<button class="ql-list" value="ordered"></button>
<button class="ql-list" value="bullet"></button>
</span>
<span class="ql-formats">
<button class="ql-link"></button>
</span>
<span class="ql-formats">
<button class="ql-clean"></button>
</span>
</div>
<div id="editor" style="min-height: 100px;"></div>`.replace(/\n/gm, '');

export const xssFilter = new xss.FilterXSS({
  css: {
    whiteList: {
      'color': true,
      'background-color': true,
    },
  },
  whiteList: {
    span: ['style'],
    strong: ['style'],
    u: ['style'],
    i: ['style'],
    s: ['style'],
    a: ['href', 'rel', 'target', 'style'],
    h1: ['style'],
    h2: ['style'],
    ul: ['style'],
    ol: ['style'],
    li: ['style'],
    p: [],
  },
});

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
});
