'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo-text {
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  font-stretch: normal;
  line-height: 1.4;
}
.code {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 16px;
}`;

const defaultHTML = `<p class="demo-text">字体属性演示 Font Properties Demo</p>
<div class="code">font: normal 400 32px/1.4 system-ui, sans-serif;</div>`;

const presets = [
  {
    label: '正文',
    css: `.demo-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-stretch: normal;
  line-height: 1.6;
}
.code {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 16px;
}`,
  },
  {
    label: '标题',
    css: `.demo-text {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  font-stretch: normal;
  line-height: 1.2;
}
.code {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 16px;
}`,
  },
  {
    label: '斜体',
    css: `.demo-text {
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  font-stretch: normal;
  line-height: 1.5;
}
.code {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 16px;
}`,
  },
  {
    label: '轻细体',
    css: `.demo-text {
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  font-stretch: condensed;
  line-height: 1.5;
}
.code {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 16px;
}`,
  },
  {
    label: '字重对比',
    css: `.demo-text { display: none; }
.code { display: none; }
.weight-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}
.weight-row .label {
  font-size: 12px;
  color: #3b82f6;
  font-family: monospace;
  width: 40px;
}
.weight-row .text { font-size: 22px; }`,
    html: `<div class="weight-row"><span class="label">100</span><span class="text" style="font-weight:100">极细 Thin</span></div>
<div class="weight-row"><span class="label">300</span><span class="text" style="font-weight:300">细体 Light</span></div>
<div class="weight-row"><span class="label">400</span><span class="text" style="font-weight:400">正常 Regular</span></div>
<div class="weight-row"><span class="label">500</span><span class="text" style="font-weight:500">中等 Medium</span></div>
<div class="weight-row"><span class="label">700</span><span class="text" style="font-weight:700">粗体 Bold</span></div>
<div class="weight-row"><span class="label">900</span><span class="text" style="font-weight:900">特粗 Black</span></div>`,
  },
];

export function FontPropertyDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={160}
    />
  );
}
