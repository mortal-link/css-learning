'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo {
  display: flex;
  justify-content: center;
  padding: 32px;
  background: repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 0 0 / 20px 20px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.masked {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}

.label {
  text-align: center;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="demo">
  <div class="masked"></div>
</div>
<div class="label">mask-image: linear-gradient(to bottom, black 50%, transparent 100%)</div>`;

const presets = [
  {
    label: '线性渐变遮罩',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 0 0 / 20px 20px; border-radius: 8px; margin-bottom: 12px; }
.masked {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="masked"></div></div>
<div class="label">mask-image: linear-gradient(to bottom, black 50%, transparent)</div>`,
  },
  {
    label: '径向渐变遮罩',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 0 0 / 20px 20px; border-radius: 8px; margin-bottom: 12px; }
.masked {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-mask-image: radial-gradient(circle, black 40%, transparent 70%);
  mask-image: radial-gradient(circle, black 40%, transparent 70%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="masked"></div></div>
<div class="label">mask-image: radial-gradient(circle, black 40%, transparent 70%)</div>`,
  },
  {
    label: '对角渐变遮罩',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 0 0 / 20px 20px; border-radius: 8px; margin-bottom: 12px; }
.masked {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-mask-image: linear-gradient(135deg, black 30%, transparent 70%);
  mask-image: linear-gradient(135deg, black 30%, transparent 70%);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="masked"></div></div>
<div class="label">mask-image: linear-gradient(135deg, black 30%, transparent 70%)</div>`,
  },
  {
    label: '条纹遮罩',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 0 0 / 20px 20px; border-radius: 8px; margin-bottom: 12px; }
.masked {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-mask-image: repeating-linear-gradient(90deg, black 0px, black 10px, transparent 10px, transparent 20px);
  mask-image: repeating-linear-gradient(90deg, black 0px, black 10px, transparent 10px, transparent 20px);
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="masked"></div></div>
<div class="label">mask-image: repeating-linear-gradient(...) /* 条纹 */</div>`,
  },
  {
    label: 'mask-composite',
    css: `.demo { display: flex; justify-content: center; padding: 32px; background: repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 0 0 / 20px 20px; border-radius: 8px; margin-bottom: 12px; }
.masked {
  width: 250px; height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-mask-image:
    radial-gradient(circle at 30% 50%, black 25%, transparent 25%),
    radial-gradient(circle at 70% 50%, black 25%, transparent 25%);
  mask-image:
    radial-gradient(circle at 30% 50%, black 25%, transparent 25%),
    radial-gradient(circle at 70% 50%, black 25%, transparent 25%);
  -webkit-mask-composite: source-over;
  mask-composite: add;
}
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="demo"><div class="masked"></div></div>
<div class="label">多重 mask-image + mask-composite: add</div>`,
  },
];

export function MaskDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={350}
    />
  );
}
