'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 80px);
  grid-auto-rows: 60px;
  grid-auto-flow: row;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
/* 显式网格项 (蓝色) */
.item-1 { background: #3b82f6; }
.item-2 { background: #6366f1; }
.item-3 { background: #8b5cf6; }
.item-4 { background: #2563eb; }
.item-5 { background: #4f46e5; }
.item-6 { background: #7c3aed; }
/* 隐式网格项 (橙色) */
.item-7 { background: #f59e0b; }
.item-8 { background: #f97316; }
.implicit-label {
  font-size: 10px;
  opacity: 0.8;
}
.legend {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}
.legend-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">显式 3x2 网格 + 隐式行 (grid-auto-rows: 60px)</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
  <div class="item item-7">7<span class="implicit-label">隐式</span></div>
  <div class="item item-8">8<span class="implicit-label">隐式</span></div>
</div>
<div class="legend">
  <span><span class="legend-box" style="background:#3b82f6"></span>显式网格</span>
  <span><span class="legend-box" style="background:#f59e0b"></span>隐式网格</span>
</div>`;

const presets = [
  {
    label: '自动行 (row)',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: '自动列 (column)',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 80px);
  grid-auto-columns: 80px;
  grid-auto-flow: column;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  overflow-x: auto;
}
.item {
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
.item-1 { background: #3b82f6; }
.item-2 { background: #6366f1; }
.item-3 { background: #8b5cf6; }
.item-4 { background: #2563eb; }
.item-5 { background: #4f46e5; }
.item-6 { background: #7c3aed; }
.item-7 { background: #f59e0b; }
.item-8 { background: #f97316; }
.implicit-label {
  font-size: 10px;
  opacity: 0.8;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-auto-flow: column — 按列填充，隐式列宽 80px</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
  <div class="item item-7">7<span class="implicit-label">隐式</span></div>
  <div class="item item-8">8<span class="implicit-label">隐式</span></div>
</div>`,
  },
  {
    label: '密集填充 (dense)',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 60px;
  grid-auto-flow: dense;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
.item-1 { background: #3b82f6; }
.item-2 { background: #6366f1; }
.item-3 {
  background: #ef4444;
  grid-column: span 2;
}
.item-4 { background: #f59e0b; }
.item-5 { background: #10b981; }
.item-6 {
  background: #ec4899;
  grid-column: span 2;
  grid-row: span 2;
}
.item-7 { background: #8b5cf6; }
.item-8 { background: #14b8a6; }
.item-9 { background: #f97316; }
.item-10 { background: #06b6d4; }
.item-11 { background: #84cc16; }
.item-12 { background: #a855f7; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-auto-flow: dense — 自动填补空隙</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3 (span 2)</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6 (2x2)</div>
  <div class="item item-7">7</div>
  <div class="item item-8">8</div>
  <div class="item item-9">9</div>
  <div class="item item-10">10</div>
  <div class="item item-11">11</div>
  <div class="item item-12">12</div>
</div>`,
  },
  {
    label: 'minmax 隐式行',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(60px, auto);
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 8px;
}
.item-1 { background: #3b82f6; }
.item-2 { background: #6366f1; }
.item-3 { background: #8b5cf6; }
.item-4 { background: #f59e0b; }
.item-5 { background: #10b981; }
.item-6 { background: #ef4444; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-auto-rows: minmax(60px, auto) — 最小 60px，内容多时自动撑高</div>
<div class="container">
  <div class="item item-1">短内容</div>
  <div class="item item-2">这是一段较长的内容，会自动撑高行的高度，其他同行项目也跟着变高</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
</div>`,
  },
];

export function GridAutoDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
