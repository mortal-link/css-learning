'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo {
  display: flex;
  justify-content: center;
  padding: 32px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
}

.shape {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  clip-path: circle(50% at 50% 50%);
  transition: clip-path 0.5s ease;
}

.label {
  text-align: center;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="demo">
  <div class="shape"></div>
</div>
<div class="label">clip-path: circle(50% at 50% 50%)</div>`;

const presets = [
  {
    label: '圆形',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.shape {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  clip-path: circle(50% at 50% 50%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="shape"></div></div>
<div class="label">clip-path: circle(50% at 50% 50%)</div>`,
  },
  {
    label: '椭圆',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.shape {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  clip-path: ellipse(50% 35% at 50% 50%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="shape"></div></div>
<div class="label">clip-path: ellipse(50% 35% at 50% 50%)</div>`,
  },
  {
    label: '三角形',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.shape {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="shape"></div></div>
<div class="label">clip-path: polygon(50% 0%, 0% 100%, 100% 100%)</div>`,
  },
  {
    label: '星形',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.shape {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="shape"></div></div>
<div class="label">clip-path: polygon(...) /* 五角星 */</div>`,
  },
  {
    label: '圆角矩形 (inset)',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.shape {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  clip-path: inset(10% 10% 10% 10% round 20%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="shape"></div></div>
<div class="label">clip-path: inset(10% 10% 10% 10% round 20%)</div>`,
  },
];

export function ClipPathDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={350}
    />
  );
}
