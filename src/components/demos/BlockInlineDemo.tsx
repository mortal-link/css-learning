'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* block 元素独占一行 */
.element {
  display: block;
  width: 200px;
  height: 60px;
  padding: 10px 20px;
  margin: 10px 0;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}
.context {
  font-size: 14px;
  color: #475569;
  line-height: 1.8;
}
.note {
  margin-top: 12px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
}`;

const defaultHTML = `<div class="context">
  前置文本内容，
  <div class="element">display: block</div>
  后续文本内容，block 元素独占一行。
</div>
<div class="note">block 元素独占一行，宽度默认 100%（或设定值），可设置 width/height、所有 margin/padding 均生效。</div>`;

const presets = [
  {
    label: 'block',
    css: `.element {
  display: block;
  width: 200px;
  height: 60px;
  padding: 10px 20px;
  margin: 10px 0;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
}
.context { font-size: 14px; color: #475569; line-height: 1.8; }
.note { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; }`,
    html: `<div class="context">
  前置文本内容，
  <div class="element">display: block</div>
  后续文本内容，block 元素独占一行。
</div>
<div class="note">block: 独占一行，宽度 100%（或设定值），所有盒模型属性正常生效。</div>`,
  },
  {
    label: 'inline',
    css: `.element {
  display: inline;
  /* width/height 对 inline 无效 */
  padding: 4px 12px;
  margin: 0 8px;
  background: #10b981;
  color: white;
  border-radius: 4px;
  font-size: 14px;
}
.context { font-size: 14px; color: #475569; line-height: 2.2; }
.note { margin-top: 12px; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 13px; color: #166534; }`,
    html: `<div class="context">
  这是前置文本，<span class="element">display: inline</span>，后面还有更多文本内容展示 inline 元素的行为特征。inline 元素和文本在同一行排列。
</div>
<div class="note">inline: 与文本同行，宽高由内容决定，width/height 无效。垂直 margin 无效，垂直 padding 仅有视觉效果不影响布局。</div>`,
  },
  {
    label: 'inline-block',
    css: `.element {
  display: inline-block;
  width: 150px;
  height: 50px;
  padding: 10px 16px;
  margin: 8px;
  background: #8b5cf6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
.context { font-size: 14px; color: #475569; line-height: 1.8; }
.note { margin-top: 12px; padding: 10px; background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 6px; font-size: 13px; color: #5b21b6; }`,
    html: `<div class="context">
  前置文本，<span class="element">inline-block</span>后续文本，两者在同一行排列。
</div>
<div class="note">inline-block: 与文本同行排列，但可设置 width/height，所有盒模型属性均正常生效。</div>`,
  },
  {
    label: '三者对比',
    css: `.row { margin-bottom: 16px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; }
.row-label { font-size: 12px; color: #64748b; margin-bottom: 8px; font-family: monospace; }
.block-el {
  display: block; width: 200px; padding: 8px 16px; margin: 4px 0;
  background: #3b82f6; color: white; border-radius: 4px; font-size: 13px;
}
.inline-el {
  display: inline; padding: 4px 12px;
  background: #10b981; color: white; border-radius: 4px; font-size: 13px;
}
.ib-el {
  display: inline-block; width: 120px; height: 40px; padding: 8px; margin: 4px;
  background: #8b5cf6; color: white; border-radius: 4px; font-size: 13px;
  text-align: center; line-height: 24px;
}
.text { font-size: 13px; color: #475569; }`,
    html: `<div class="row">
  <div class="row-label">display: block</div>
  <div class="block-el">Block A</div>
  <div class="block-el">Block B</div>
</div>
<div class="row">
  <div class="row-label">display: inline</div>
  <span class="text">文本</span> <span class="inline-el">Inline A</span> <span class="inline-el">Inline B</span> <span class="text">文本</span>
</div>
<div class="row">
  <div class="row-label">display: inline-block</div>
  <span class="text">文本</span> <span class="ib-el">IB A</span> <span class="ib-el">IB B</span> <span class="text">文本</span>
</div>`,
  },
];

export function BlockInlineDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={220}
    />
  );
}
