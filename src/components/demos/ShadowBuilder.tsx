'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box-demo {
  display: flex;
  justify-content: center;
  padding: 48px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
}

.shadow-box {
  width: 200px;
  height: 150px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
}

.label {
  text-align: center;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="box-demo">
  <div class="shadow-box">盒阴影预览</div>
</div>
<div class="label">box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15)</div>`;

const presets = [
  {
    label: '卡片阴影',
    css: `.box-demo { display: flex; justify-content: center; padding: 48px 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; }
.shadow-box {
  width: 200px; height: 150px; background: #fff; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1), 0 4px 16px 0 rgba(0,0,0,0.06);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box-demo"><div class="shadow-box">卡片阴影</div></div>
<div class="label">box-shadow: 0 2px 8px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)</div>`,
  },
  {
    label: '悬浮效果',
    css: `.box-demo { display: flex; justify-content: center; padding: 48px 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; }
.shadow-box {
  width: 200px; height: 150px; background: #fff; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box-demo"><div class="shadow-box">悬浮效果</div></div>
<div class="label">box-shadow: 0 10px 30px -5px rgba(0,0,0,0.2)</div>`,
  },
  {
    label: '内阴影',
    css: `.box-demo { display: flex; justify-content: center; padding: 48px 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; }
.shadow-box {
  width: 200px; height: 150px; background: #fff; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.15);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box-demo"><div class="shadow-box">内阴影</div></div>
<div class="label">box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.15)</div>`,
  },
  {
    label: '多层阴影',
    css: `.box-demo { display: flex; justify-content: center; padding: 48px 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; }
.shadow-box {
  width: 200px; height: 150px; background: #fff; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  box-shadow:
    0 1px 2px 0 rgba(0,0,0,0.06),
    0 2px 4px 0 rgba(0,0,0,0.08),
    0 4px 8px 0 rgba(0,0,0,0.1);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box-demo"><div class="shadow-box">多层阴影</div></div>
<div class="label">3 层递进阴影</div>`,
  },
  {
    label: '霓虹文字',
    css: `.box-demo { display: flex; justify-content: center; padding: 48px 16px; background: #111; border-radius: 8px; margin-bottom: 16px; }
.neon-text {
  font-size: 42px;
  font-weight: 700;
  color: #fff;
  text-shadow:
    0 0 10px #ff00de,
    0 0 20px #00d4ff,
    0 0 30px #ff00de;
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box-demo"><div class="neon-text">霓虹文字</div></div>
<div class="label">text-shadow: 0 0 10px #ff00de, 0 0 20px #00d4ff, 0 0 30px #ff00de</div>`,
  },
];

export function ShadowBuilder() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
