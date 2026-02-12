'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.gradient-box {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.label {
  margin-top: 12px;
  font-size: 13px;
  color: #666;
  font-family: monospace;
}`;

const defaultHTML = `<div class="gradient-box"></div>
<div class="label">linear-gradient(135deg, #667eea, #764ba2)</div>`;

const presets = [
  {
    label: '线性渐变',
    css: `.gradient-box {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.label { margin-top: 12px; font-size: 13px; color: #666; font-family: monospace; }`,
    html: `<div class="gradient-box"></div>
<div class="label">linear-gradient(135deg, #667eea, #764ba2)</div>`,
  },
  {
    label: '径向渐变',
    css: `.gradient-box {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: radial-gradient(circle, #134e5e 0%, #71b280 100%);
}
.label { margin-top: 12px; font-size: 13px; color: #666; font-family: monospace; }`,
    html: `<div class="gradient-box"></div>
<div class="label">radial-gradient(circle, #134e5e, #71b280)</div>`,
  },
  {
    label: '锥形渐变',
    css: `.gradient-box {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: conic-gradient(from 0deg, #ff6b6b, #feca57, #48c6ef, #667eea, #ff6b6b);
}
.label { margin-top: 12px; font-size: 13px; color: #666; font-family: monospace; }`,
    html: `<div class="gradient-box"></div>
<div class="label">conic-gradient(from 0deg, red, yellow, blue, purple, red)</div>`,
  },
  {
    label: '日落渐变',
    css: `.gradient-box {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%);
}
.label { margin-top: 12px; font-size: 13px; color: #666; font-family: monospace; }`,
    html: `<div class="gradient-box"></div>
<div class="label">linear-gradient(135deg, #ff6b6b, #feca57, #ee5a6f)</div>`,
  },
  {
    label: '重复渐变',
    css: `.gradient-box {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: repeating-linear-gradient(
    45deg,
    #667eea 0px, #667eea 10px,
    #764ba2 10px, #764ba2 20px
  );
}
.label { margin-top: 12px; font-size: 13px; color: #666; font-family: monospace; }`,
    html: `<div class="gradient-box"></div>
<div class="label">repeating-linear-gradient(45deg, ...)</div>`,
  },
];

export function GradientBuilder() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
