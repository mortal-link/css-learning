'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.swatches {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.swatch {
  height: 80px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.swatch-label {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 4px;
  font-family: monospace;
}

.formats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.format-box {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.format-box .label {
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
}

.format-box code {
  font-size: 13px;
  font-weight: 600;
}

.contrast-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.contrast-box {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #e0e0e0;
}`;

const defaultHTML = `<div class="swatches">
  <div>
    <div class="swatch" style="background: rgb(255, 99, 71)"></div>
    <div class="swatch-label">rgb(255, 99, 71)</div>
  </div>
  <div>
    <div class="swatch" style="background: hsl(9, 100%, 64%)"></div>
    <div class="swatch-label">hsl(9, 100%, 64%)</div>
  </div>
  <div>
    <div class="swatch" style="background: oklch(0.63 0.26 29)"></div>
    <div class="swatch-label">oklch(0.63 0.26 29)</div>
  </div>
</div>

<div class="contrast-row">
  <div class="contrast-box" style="background: rgb(255, 99, 71); color: #000;">黑色文字</div>
  <div class="contrast-box" style="background: rgb(255, 99, 71); color: #fff;">白色文字</div>
</div>

<div class="formats">
  <div class="format-box"><div class="label">HEX</div><code>#FF6347</code></div>
  <div class="format-box"><div class="label">RGB</div><code>rgb(255, 99, 71)</code></div>
  <div class="format-box"><div class="label">HSL</div><code>hsl(9, 100%, 64%)</code></div>
  <div class="format-box"><div class="label">OKLCH</div><code>oklch(0.63 0.26 29)</code></div>
</div>`;

const presets = [
  {
    label: '番茄红 (RGB)',
    css: `.swatches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.swatch { height: 80px; border-radius: 8px; border: 2px solid #e0e0e0; }
.swatch-label { font-size: 12px; color: #666; text-align: center; margin-top: 4px; font-family: monospace; }
.formats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.format-box { padding: 10px; background: #f5f5f5; border-radius: 6px; border: 1px solid #e0e0e0; }
.format-box .label { font-size: 11px; color: #999; margin-bottom: 4px; }
.format-box code { font-size: 13px; font-weight: 600; }
.contrast-row { display: flex; gap: 12px; margin-bottom: 16px; }
.contrast-box { flex: 1; padding: 16px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 16px; border: 1px solid #e0e0e0; }`,
    html: `<div class="swatches">
  <div><div class="swatch" style="background: rgb(255, 99, 71)"></div><div class="swatch-label">rgb(255, 99, 71)</div></div>
  <div><div class="swatch" style="background: hsl(9, 100%, 64%)"></div><div class="swatch-label">hsl(9, 100%, 64%)</div></div>
  <div><div class="swatch" style="background: oklch(0.63 0.26 29)"></div><div class="swatch-label">oklch(0.63 0.26 29)</div></div>
</div>
<div class="contrast-row">
  <div class="contrast-box" style="background: rgb(255, 99, 71); color: #000;">黑色文字</div>
  <div class="contrast-box" style="background: rgb(255, 99, 71); color: #fff;">白色文字</div>
</div>
<div class="formats">
  <div class="format-box"><div class="label">HEX</div><code>#FF6347</code></div>
  <div class="format-box"><div class="label">RGB</div><code>rgb(255, 99, 71)</code></div>
  <div class="format-box"><div class="label">HSL</div><code>hsl(9, 100%, 64%)</code></div>
  <div class="format-box"><div class="label">OKLCH</div><code>oklch(0.63 0.26 29)</code></div>
</div>`,
  },
  {
    label: '海洋蓝 (HSL)',
    css: `.swatches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.swatch { height: 80px; border-radius: 8px; border: 2px solid #e0e0e0; }
.swatch-label { font-size: 12px; color: #666; text-align: center; margin-top: 4px; font-family: monospace; }
.formats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.format-box { padding: 10px; background: #f5f5f5; border-radius: 6px; border: 1px solid #e0e0e0; }
.format-box .label { font-size: 11px; color: #999; margin-bottom: 4px; }
.format-box code { font-size: 13px; font-weight: 600; }`,
    html: `<div class="swatches">
  <div><div class="swatch" style="background: rgb(0, 119, 190)"></div><div class="swatch-label">rgb(0, 119, 190)</div></div>
  <div><div class="swatch" style="background: hsl(202, 100%, 37%)"></div><div class="swatch-label">hsl(202, 100%, 37%)</div></div>
  <div><div class="swatch" style="background: oklch(0.55 0.15 245)"></div><div class="swatch-label">oklch(0.55 0.15 245)</div></div>
</div>
<div class="formats">
  <div class="format-box"><div class="label">HEX</div><code>#0077BE</code></div>
  <div class="format-box"><div class="label">RGB</div><code>rgb(0, 119, 190)</code></div>
  <div class="format-box"><div class="label">HSL</div><code>hsl(202, 100%, 37%)</code></div>
  <div class="format-box"><div class="label">OKLCH</div><code>oklch(0.55 0.15 245)</code></div>
</div>`,
  },
  {
    label: 'OKLCH 色域',
    css: `.swatches { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; }
.swatch { height: 60px; border-radius: 8px; border: 2px solid #e0e0e0; }
.swatch-label { font-size: 11px; color: #666; text-align: center; margin-top: 4px; font-family: monospace; }
.note { padding: 12px; background: #f0f4ff; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6; }`,
    html: `<div class="swatches">
  <div><div class="swatch" style="background: oklch(0.7 0.25 30)"></div><div class="swatch-label">H: 30</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.25 90)"></div><div class="swatch-label">H: 90</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.25 150)"></div><div class="swatch-label">H: 150</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.25 210)"></div><div class="swatch-label">H: 210</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.25 270)"></div><div class="swatch-label">H: 270</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.25 330)"></div><div class="swatch-label">H: 330</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.15 210)"></div><div class="swatch-label">C: 0.15</div></div>
  <div><div class="swatch" style="background: oklch(0.7 0.05 210)"></div><div class="swatch-label">C: 0.05</div></div>
</div>
<div class="note">OKLCH 使用感知均匀的亮度(L)、彩度(C)和色相(H)，比 HSL 更准确地反映人眼感知。</div>`,
  },
  {
    label: 'Lab 色彩空间',
    css: `.swatches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.swatch { height: 80px; border-radius: 8px; border: 2px solid #e0e0e0; }
.swatch-label { font-size: 12px; color: #666; text-align: center; margin-top: 4px; font-family: monospace; }
.note { padding: 12px; background: #f0f4ff; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6; }`,
    html: `<div class="swatches">
  <div><div class="swatch" style="background: lab(60 80 0)"></div><div class="swatch-label">lab(60 80 0)</div></div>
  <div><div class="swatch" style="background: lab(60 -80 0)"></div><div class="swatch-label">lab(60 -80 0)</div></div>
  <div><div class="swatch" style="background: lab(60 0 80)"></div><div class="swatch-label">lab(60 0 80)</div></div>
  <div><div class="swatch" style="background: lab(60 0 -80)"></div><div class="swatch-label">lab(60 0 -80)</div></div>
  <div><div class="swatch" style="background: lch(60 80 30)"></div><div class="swatch-label">lch(60 80 30)</div></div>
  <div><div class="swatch" style="background: lch(60 80 270)"></div><div class="swatch-label">lch(60 80 270)</div></div>
</div>
<div class="note">Lab 和 LCH 是 CSS Color Level 4 中的色彩空间，基于人眼感知设计。a 轴表示红绿，b 轴表示蓝黄。</div>`,
  },
];

export function ColorSpaceExplorer() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
