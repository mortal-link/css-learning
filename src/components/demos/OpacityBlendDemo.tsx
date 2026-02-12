'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo {
  position: relative;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.layer-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.layer-fg {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  opacity: 0.5;
  mix-blend-mode: normal;
}

.text-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.label {
  text-align: center;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="demo">
  <div class="layer-bg"></div>
  <div class="layer-fg"></div>
  <div class="text-overlay">opacity + mix-blend-mode</div>
</div>
<div class="label">opacity: 0.5; mix-blend-mode: normal;</div>`;

const presets = [
  {
    label: 'multiply 正片叠底',
    css: `.demo { position: relative; height: 240px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; }
.layer-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.layer-fg { position: absolute; inset: 0; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); mix-blend-mode: multiply; }
.text-overlay { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 24px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="layer-bg"></div><div class="layer-fg"></div><div class="text-overlay">multiply</div></div>
<div class="label">mix-blend-mode: multiply;</div>`,
  },
  {
    label: 'screen 滤色',
    css: `.demo { position: relative; height: 240px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; }
.layer-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.layer-fg { position: absolute; inset: 0; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); mix-blend-mode: screen; }
.text-overlay { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 24px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="layer-bg"></div><div class="layer-fg"></div><div class="text-overlay">screen</div></div>
<div class="label">mix-blend-mode: screen;</div>`,
  },
  {
    label: 'overlay 叠加',
    css: `.demo { position: relative; height: 240px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; }
.layer-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.layer-fg { position: absolute; inset: 0; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); mix-blend-mode: overlay; }
.text-overlay { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 24px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="layer-bg"></div><div class="layer-fg"></div><div class="text-overlay">overlay</div></div>
<div class="label">mix-blend-mode: overlay;</div>`,
  },
  {
    label: 'difference 差值',
    css: `.demo { position: relative; height: 240px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; }
.layer-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.layer-fg { position: absolute; inset: 0; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); mix-blend-mode: difference; }
.text-overlay { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 24px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="layer-bg"></div><div class="layer-fg"></div><div class="text-overlay">difference</div></div>
<div class="label">mix-blend-mode: difference;</div>`,
  },
  {
    label: 'opacity 半透明',
    css: `.demo { position: relative; height: 240px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; }
.layer-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.layer-fg { position: absolute; inset: 0; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); opacity: 0.3; }
.text-overlay { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 24px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="layer-bg"></div><div class="layer-fg"></div><div class="text-overlay">opacity: 0.3</div></div>
<div class="label">opacity: 0.3; (前景图层)</div>`,
  },
];

export function OpacityBlendDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
