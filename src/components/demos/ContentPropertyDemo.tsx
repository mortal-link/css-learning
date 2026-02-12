'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.item {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 15px;
}
.item::before {
  content: "Hello, CSS! ";
  color: #3b82f6;
  font-weight: 600;
}
.label { font-size: 12px; color: #666; margin-top: 8px; font-family: monospace; }`;

const defaultHTML = `<div class="item">元素内容</div>
<div class="label">content: "Hello, CSS! ";</div>`;

const presets = [
  {
    label: '字符串',
    css: `.item {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 15px;
}
.item::before {
  content: "\\2713 完成 ";
  color: #10b981;
  font-weight: 600;
}
.label { font-size: 12px; color: #666; margin-top: 8px; font-family: monospace; }`,
    html: `<div class="item">任务已完成</div>
<div class="label">content: "\\2713 完成 ";</div>`,
  },
  {
    label: 'attr()',
    css: `.item {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 15px;
}
.item::before {
  content: attr(data-label) ": ";
  color: #3b82f6;
  font-weight: 600;
}
.label { font-size: 12px; color: #666; margin-top: 8px; font-family: monospace; }`,
    html: `<div class="item" data-label="标签A">第一项内容</div>
<div class="item" data-label="标签B">第二项内容</div>
<div class="item" data-label="标签C">第三项内容</div>
<div class="label">content: attr(data-label) ": ";</div>`,
  },
  {
    label: 'counter()',
    css: `.list {
  counter-reset: item;
  list-style: none;
  padding: 0;
}
.list li {
  counter-increment: item;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 15px;
}
.list li::before {
  content: counter(item) ". ";
  color: #8b5cf6;
  font-weight: bold;
}
.label { font-size: 12px; color: #666; margin-top: 8px; font-family: monospace; }`,
    html: `<ul class="list">
  <li>列表项一</li>
  <li>列表项二</li>
  <li>列表项三</li>
  <li>列表项四</li>
</ul>
<div class="label">content: counter(item) ". ";</div>`,
  },
  {
    label: 'open-quote',
    css: `.quote {
  quotes: "\\201C" "\\201D" "\\2018" "\\2019";
  font-size: 16px;
  padding: 16px;
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 6px 6px 0;
  margin-bottom: 12px;
}
.quote::before {
  content: open-quote;
  color: #9ca3af;
  font-size: 24px;
}
.quote::after {
  content: close-quote;
  color: #9ca3af;
  font-size: 24px;
}
.label { font-size: 12px; color: #666; margin-top: 8px; font-family: monospace; }`,
    html: `<div class="quote">引用的内容在这里</div>
<div class="label">content: open-quote / close-quote;</div>`,
  },
  {
    label: 'none',
    css: `.item {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 15px;
}
/* content: none 移除伪元素 */
.item::before {
  content: none;
}
.label { font-size: 12px; color: #666; margin-top: 8px; font-family: monospace; }`,
    html: `<div class="item">无伪元素内容</div>
<div class="label">content: none; -- 移除伪元素的内容</div>`,
  },
];

export function ContentPropertyDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={180}
    />
  );
}
