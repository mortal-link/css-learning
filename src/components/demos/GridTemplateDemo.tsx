'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 12px;
  padding: 16px;
  border: 2px solid #8b5cf6;
  border-radius: 8px;
  background: #f5f3ff;
}
.item {
  min-height: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
.item-1 { background: #8b5cf6; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.item-7 { background: #ec4899; }
.item-8 { background: #14b8a6; }
.item-9 { background: #f97316; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">grid-template-columns: 1fr 2fr 1fr — 比例 1:2:1</div>
<div class="container">
  <div class="item item-1">1fr</div>
  <div class="item item-2">2fr</div>
  <div class="item item-3">1fr</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
  <div class="item item-7">7</div>
  <div class="item item-8">8</div>
  <div class="item item-9">9</div>
</div>`;

const presets = [
  {
    label: 'fr 比例 (1:2:1)',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: 'repeat(3, 1fr)',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 80px);
  gap: 12px;
  padding: 16px;
  border: 2px solid #8b5cf6;
  border-radius: 8px;
  background: #f5f3ff;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #8b5cf6; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.item-7 { background: #ec4899; }
.item-8 { background: #14b8a6; }
.item-9 { background: #f97316; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">repeat(3, 1fr) — 等分三列，固定行高 80px</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
  <div class="item item-7">7</div>
  <div class="item item-8">8</div>
  <div class="item item-9">9</div>
</div>`,
  },
  {
    label: 'minmax() 响应式',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  grid-template-rows: minmax(60px, auto);
  gap: 12px;
  padding: 16px;
  border: 2px solid #8b5cf6;
  border-radius: 8px;
  background: #f5f3ff;
}
.item {
  min-height: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
.item-1 { background: #8b5cf6; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">minmax(80px, 1fr) — 最小 80px，最大 1fr</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
</div>`,
  },
  {
    label: 'auto-fill 自动填充',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  padding: 16px;
  border: 2px solid #8b5cf6;
  border-radius: 8px;
  background: #f5f3ff;
}
.item {
  min-height: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #8b5cf6; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">auto-fill: 自动填充尽可能多的列</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
</div>`,
  },
  {
    label: '混合单位 (px+fr+%)',
    css: `.container {
  display: grid;
  grid-template-columns: 80px 1fr 30%;
  gap: 12px;
  padding: 16px;
  border: 2px solid #8b5cf6;
  border-radius: 8px;
  background: #f5f3ff;
}
.item {
  min-height: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
}
.item-1 { background: #8b5cf6; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-template-columns: 80px 1fr 30%</div>
<div class="container">
  <div class="item item-1">80px</div>
  <div class="item item-2">1fr</div>
  <div class="item item-3">30%</div>
  <div class="item item-4">80px</div>
  <div class="item item-5">1fr</div>
  <div class="item item-6">30%</div>
</div>`,
  },
];

export function GridTemplateDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
