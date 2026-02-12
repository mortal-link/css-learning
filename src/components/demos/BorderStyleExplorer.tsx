'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 所有 border-style 值一览 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  padding: 16px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
}
.preview {
  width: 100%;
  height: 60px;
  border-width: 4px;
  border-color: #334155;
  background: white;
  border-radius: 4px;
}
.label {
  font-size: 12px;
  font-family: monospace;
  font-weight: 600;
  color: #334155;
}
.note {
  margin: 0 16px 16px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="grid">
  <div class="item">
    <div class="preview" style="border-style: none;"></div>
    <span class="label">none</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: hidden;"></div>
    <span class="label">hidden</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: dotted;"></div>
    <span class="label">dotted</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: dashed;"></div>
    <span class="label">dashed</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: solid;"></div>
    <span class="label">solid</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: double;"></div>
    <span class="label">double</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: groove;"></div>
    <span class="label">groove</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: ridge;"></div>
    <span class="label">ridge</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: inset;"></div>
    <span class="label">inset</span>
  </div>
  <div class="item">
    <div class="preview" style="border-style: outset;"></div>
    <span class="label">outset</span>
  </div>
</div>
<div class="note">
  3D 效果样式（groove、ridge、inset、outset）取决于 border-color。双线（double）要求 border-width ≥ 3px。
</div>`;

const presets = [
  {
    label: '所有样式',
  },
  {
    label: 'solid 详情',
    css: `.demo {
  width: 240px;
  height: 120px;
  margin: 24px auto;
  border: 8px solid #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #64748b;
}
.desc {
  text-align: center;
  font-size: 13px;
  color: #475569;
  margin-top: 12px;
  line-height: 1.6;
}`,
    html: `<div class="demo">border-style: solid</div>
<p class="desc">实线边框，最常用的边框样式。单条实线。</p>`,
  },
  {
    label: 'double 详情',
    css: `.demo {
  width: 240px;
  height: 120px;
  margin: 24px auto;
  border: 8px double #8b5cf6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #64748b;
}
.desc {
  text-align: center;
  font-size: 13px;
  color: #475569;
  margin-top: 12px;
  line-height: 1.6;
}`,
    html: `<div class="demo">border-style: double</div>
<p class="desc">双线边框。两条平行实线，线宽之和等于 border-width 值。需要 border-width ≥ 3px 才能看到效果。</p>`,
  },
  {
    label: '3D 效果对比',
    css: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
}
.item {
  height: 100px;
  border-width: 6px;
  border-color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  border-radius: 4px;
  background: #f1f5f9;
}
.note {
  margin: 0 16px 16px;
  padding: 10px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-radius: 6px;
  font-size: 13px;
  color: #5b21b6;
}`,
    html: `<div class="grid">
  <div class="item" style="border-style: groove;">groove (凹槽)</div>
  <div class="item" style="border-style: ridge;">ridge (垄状)</div>
  <div class="item" style="border-style: inset;">inset (内嵌)</div>
  <div class="item" style="border-style: outset;">outset (外凸)</div>
</div>
<div class="note">groove 与 ridge 互为反面；inset 与 outset 互为反面。效果取决于 border-color。</div>`,
  },
];

export function BorderStyleExplorer() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={360}
    />
  );
}
