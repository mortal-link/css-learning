'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* display 属性值演示 */
.container {
  padding: 16px;
}
.label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  font-family: monospace;
}
.prev, .next {
  display: inline-block;
  width: 80px;
  height: 50px;
  background: #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  color: #475569;
  text-align: center;
  line-height: 50px;
  vertical-align: top;
}
.target {
  display: block;
  width: 200px;
  height: 80px;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 80px;
  margin: 8px 0;
}
.note {
  margin-top: 16px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="container">
  <div class="label">display: block</div>
  <span class="prev">前置</span>
  <div class="target">display: block</div>
  <span class="next">后置</span>
</div>
<div class="note">
  块级元素独占一行，宽度默认为父元素的 100%，可以设置宽高、内外边距。
</div>`;

const presets = [
  {
    label: 'block',
    css: `.container { padding: 16px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 8px; font-family: monospace; }
.prev, .next {
  display: inline-block; width: 80px; height: 50px; background: #e2e8f0;
  border-radius: 6px; font-size: 12px; color: #475569; text-align: center; line-height: 50px;
}
.target {
  display: block; width: 200px; height: 80px;
  background: #3b82f6; color: white; border-radius: 6px;
  font-size: 14px; font-weight: 500; text-align: center; line-height: 80px; margin: 8px 0;
}
.note { margin-top: 16px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; }`,
    html: `<div class="container">
  <div class="label">display: block — 独占一行</div>
  <span class="prev">前置</span>
  <div class="target">display: block</div>
  <span class="next">后置</span>
</div>
<div class="note">块级元素独占一行，宽度默认为父元素的 100%，可以设置宽高。</div>`,
  },
  {
    label: 'inline',
    css: `.container { padding: 16px; font-size: 14px; line-height: 2; color: #475569; }
.label { font-size: 12px; color: #64748b; margin-bottom: 8px; font-family: monospace; display: block; }
.target {
  display: inline;
  background: #10b981; color: white; padding: 2px 10px; border-radius: 4px;
  font-size: 14px;
}
.note { margin-top: 16px; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 13px; color: #166534; }`,
    html: `<div class="container">
  <div class="label">display: inline — 与其他元素同行</div>
  这是前置文本，<span class="target">display: inline</span>，后面还有更多文本内容。width/height 对 inline 无效。
</div>
<div class="note">行内元素不独占一行，宽度由内容决定，设置 width/height 无效。</div>`,
  },
  {
    label: 'inline-block',
    css: `.container { padding: 16px; font-size: 14px; color: #475569; }
.label { font-size: 12px; color: #64748b; margin-bottom: 8px; font-family: monospace; }
.target {
  display: inline-block; width: 140px; height: 60px;
  background: #8b5cf6; color: white; border-radius: 6px;
  font-size: 14px; font-weight: 500; text-align: center; line-height: 60px;
  margin: 4px;
}
.note { margin-top: 16px; padding: 10px; background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 6px; font-size: 13px; color: #5b21b6; }`,
    html: `<div class="container">
  <div class="label">display: inline-block — 同行且可设尺寸</div>
  文本 <span class="target">inline-block</span> <span class="target">inline-block</span> 文本
</div>
<div class="note">inline-block 结合两者优点：像 inline 一样水平排列，像 block 一样可设置宽高。</div>`,
  },
  {
    label: 'none',
    css: `.container { padding: 16px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 8px; font-family: monospace; }
.prev, .next {
  display: inline-block; width: 80px; height: 50px; background: #e2e8f0;
  border-radius: 6px; font-size: 12px; color: #475569; text-align: center; line-height: 50px;
}
.target {
  display: none;
  /* 完全隐藏，不占空间 */
}
.hidden-hint {
  display: inline-block; width: 80px; height: 50px;
  border: 2px dashed #cbd5e1; border-radius: 6px;
  font-size: 11px; color: #94a3b8; text-align: center; line-height: 50px;
  margin: 0 4px;
}
.note { margin-top: 16px; padding: 10px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; font-size: 13px; color: #c2410c; }`,
    html: `<div class="container">
  <div class="label">display: none — 完全隐藏</div>
  <span class="prev">前置</span>
  <span class="target">隐藏了</span>
  <span class="hidden-hint">已隐藏</span>
  <span class="next">后置</span>
</div>
<div class="note">display: none 完全隐藏元素，不占据任何空间。与 visibility: hidden 不同，后者隐藏但仍占据空间。</div>`,
  },
];

export function DisplayValueDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={240}
    />
  );
}
