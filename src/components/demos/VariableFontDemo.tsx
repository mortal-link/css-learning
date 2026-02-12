'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo-text {
  font-size: 36px;
  font-weight: 400;
  font-stretch: 100%;
  line-height: 1.4;
}

.axes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px;
}
.axis {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px;
}
.axis code { color: #3b82f6; font-size: 12px; font-weight: bold; }
.axis .name { font-size: 13px; font-weight: 600; margin: 4px 0; }
.axis .desc { font-size: 12px; color: #666; }

.code {
  font-family: monospace;
  font-size: 12px;
  background: #f8fafc;
  padding: 12px;
  border-radius: 4px;
  margin-top: 16px;
  white-space: pre-wrap;
  line-height: 1.6;
}`;

const defaultHTML = `<p class="demo-text">Variable Fonts 可变字体</p>

<div class="code">/* 高级属性（推荐） */
font-weight: 400;
font-stretch: 100%;

/* 低级语法 */
font-variation-settings: 'wght' 400, 'wdth' 100;</div>

<div class="axes">
  <div class="axis"><code>wght</code><div class="name">字重</div><div class="desc">控制字体粗细，从极细（100）到极粗（900）。</div></div>
  <div class="axis"><code>wdth</code><div class="name">宽度</div><div class="desc">控制字体宽窄比例，从紧缩（50）到扩展（200）。</div></div>
  <div class="axis"><code>ital</code><div class="name">斜体</div><div class="desc">控制是否使用真斜体，0 为正常，1 为斜体。</div></div>
  <div class="axis"><code>slnt</code><div class="name">倾斜</div><div class="desc">控制字体的倾斜角度，通常为负值（向右倾斜）。</div></div>
</div>`;

const presets = [
  {
    label: '极细',
    css: `.demo-text {
  font-size: 36px;
  font-weight: 200;
  font-stretch: 100%;
  line-height: 1.4;
}
.axes { display: none; }
.code {
  font-family: monospace;
  font-size: 12px;
  background: #f8fafc;
  padding: 12px;
  border-radius: 4px;
  margin-top: 16px;
  white-space: pre-wrap;
}`,
    html: `<p class="demo-text">Variable Fonts 可变字体</p>
<div class="code">font-weight: 200;
font-variation-settings: 'wght' 200;</div>`,
  },
  {
    label: '标准',
    css: `.demo-text {
  font-size: 36px;
  font-weight: 400;
  font-stretch: 100%;
  line-height: 1.4;
}
.axes { display: none; }
.code {
  font-family: monospace;
  font-size: 12px;
  background: #f8fafc;
  padding: 12px;
  border-radius: 4px;
  margin-top: 16px;
  white-space: pre-wrap;
}`,
    html: `<p class="demo-text">Variable Fonts 可变字体</p>
<div class="code">font-weight: 400;
font-variation-settings: 'wght' 400;</div>`,
  },
  {
    label: '粗黑',
    css: `.demo-text {
  font-size: 36px;
  font-weight: 700;
  font-stretch: 100%;
  line-height: 1.4;
}
.axes { display: none; }
.code {
  font-family: monospace;
  font-size: 12px;
  background: #f8fafc;
  padding: 12px;
  border-radius: 4px;
  margin-top: 16px;
  white-space: pre-wrap;
}`,
    html: `<p class="demo-text">Variable Fonts 可变字体</p>
<div class="code">font-weight: 700;
font-variation-settings: 'wght' 700;</div>`,
  },
  {
    label: '字重渐变',
    css: `.row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}
.label { font-family: monospace; font-size: 12px; color: #3b82f6; width: 36px; }
.text { font-size: 24px; }
.axes { display: none; }
.code { display: none; }
.demo-text { display: none; }`,
    html: `<div class="row"><span class="label">100</span><span class="text" style="font-weight:100">可变字体 Variable</span></div>
<div class="row"><span class="label">200</span><span class="text" style="font-weight:200">可变字体 Variable</span></div>
<div class="row"><span class="label">300</span><span class="text" style="font-weight:300">可变字体 Variable</span></div>
<div class="row"><span class="label">400</span><span class="text" style="font-weight:400">可变字体 Variable</span></div>
<div class="row"><span class="label">500</span><span class="text" style="font-weight:500">可变字体 Variable</span></div>
<div class="row"><span class="label">600</span><span class="text" style="font-weight:600">可变字体 Variable</span></div>
<div class="row"><span class="label">700</span><span class="text" style="font-weight:700">可变字体 Variable</span></div>
<div class="row"><span class="label">800</span><span class="text" style="font-weight:800">可变字体 Variable</span></div>
<div class="row"><span class="label">900</span><span class="text" style="font-weight:900">可变字体 Variable</span></div>`,
  },
  {
    label: '轴说明',
    css: `.demo-text { display: none; }
.code { display: none; }
.axes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.axis { border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; }
.axis code { color: #3b82f6; font-size: 12px; font-weight: bold; }
.axis .name { font-size: 13px; font-weight: 600; margin: 4px 0; }
.axis .desc { font-size: 12px; color: #666; }
.note { font-size: 12px; color: #666; margin-top: 12px; border-left: 3px solid #3b82f6; padding-left: 10px; }`,
    html: `<div class="axes">
  <div class="axis"><code>wght</code><div class="name">字重 (100-900)</div><div class="desc">控制字体粗细程度。</div></div>
  <div class="axis"><code>wdth</code><div class="name">宽度 (50-200)</div><div class="desc">控制字体宽窄比例。</div></div>
  <div class="axis"><code>ital</code><div class="name">斜体 (0-1)</div><div class="desc">切换正常/斜体。</div></div>
  <div class="axis"><code>slnt</code><div class="name">倾斜 (-15~0)</div><div class="desc">控制倾斜角度。</div></div>
</div>
<div class="note">推荐使用高级属性（font-weight、font-stretch）而非 font-variation-settings，语义更清晰且更易维护。</div>`,
  },
];

export function VariableFontDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={360}
    />
  );
}
