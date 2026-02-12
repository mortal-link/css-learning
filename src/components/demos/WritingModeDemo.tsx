'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.box {
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
  min-height: 200px;
}
.box h3 {
  font-size: 12px;
  color: #3b82f6;
  font-family: monospace;
  margin-bottom: 8px;
}
.horizontal { writing-mode: horizontal-tb; width: 220px; }
.vertical-rl { writing-mode: vertical-rl; height: 220px; }
.vertical-lr { writing-mode: vertical-lr; height: 220px; }`;

const defaultHTML = `<div class="container">
  <div class="box horizontal">
    <h3>horizontal-tb</h3>
    <p>CSS Writing Modes</p>
    <p>CSS 书写模式演示</p>
    <p>日本語のテキスト</p>
  </div>
  <div class="box vertical-rl">
    <h3>vertical-rl</h3>
    <p>CSS Writing Modes</p>
    <p>CSS 书写模式演示</p>
    <p>日本語のテキスト</p>
  </div>
  <div class="box vertical-lr">
    <h3>vertical-lr</h3>
    <p>CSS Writing Modes</p>
    <p>CSS 书写模式演示</p>
    <p>日本語のテキスト</p>
  </div>
</div>`;

const presets = [
  {
    label: '英文横排',
    css: `.box {
  writing-mode: horizontal-tb;
  direction: ltr;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
  font-size: 16px;
  line-height: 1.8;
}`,
    html: `<div class="box">
  <p>CSS Writing Modes</p>
  <p>CSS 书写模式演示</p>
  <p>English text flows left-to-right, top-to-bottom.</p>
</div>`,
  },
  {
    label: '中文竖排',
    css: `.box {
  writing-mode: vertical-rl;
  text-orientation: upright;
  direction: ltr;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
  height: 260px;
  font-size: 16px;
  line-height: 2;
}`,
    html: `<div class="box">
  <p>传统中文竖排</p>
  <p>从右向左书写</p>
  <p>字符保持直立</p>
</div>`,
  },
  {
    label: '日文竖排',
    css: `.box {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  direction: ltr;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
  height: 260px;
  font-size: 16px;
  line-height: 2;
}`,
    html: `<div class="box">
  <p>日本語のテキスト</p>
  <p>CSS Writing Modes</p>
  <p>縦書きの例です</p>
</div>`,
  },
  {
    label: '阿拉伯文',
    css: `.box {
  writing-mode: horizontal-tb;
  direction: rtl;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
  font-size: 16px;
  line-height: 1.8;
}`,
    html: `<div class="box">
  <p>مرحبا بك (Arabic)</p>
  <p>CSS 书写模式演示</p>
  <p>从右到左的文字方向</p>
</div>`,
  },
  {
    label: '三种模式对比',
    css: `.container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.box {
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
  min-height: 200px;
}
.box h3 {
  font-size: 12px;
  color: #3b82f6;
  font-family: monospace;
  margin-bottom: 8px;
}
.horizontal { writing-mode: horizontal-tb; width: 220px; }
.vertical-rl { writing-mode: vertical-rl; height: 220px; }
.vertical-lr { writing-mode: vertical-lr; height: 220px; }`,
  },
];

export function WritingModeDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
