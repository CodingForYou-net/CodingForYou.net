import { writable } from 'svelte/store';

export function scrollToId(anchor) {
  // document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' });
}

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
<div id="editor"></div>`.replace(/\n/gm, '');
