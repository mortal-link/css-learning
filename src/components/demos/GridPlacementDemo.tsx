'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 70px);
  gap: 8px;
  padding: 16px;
  border: 2px solid #e11d48;
  border-radius: 8px;
  background: #fff1f2;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  background: #d1d5db;
}
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background: #e11d48;
}
.item-2 { background: #6366f1; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #3b82f6; }
.item-6 { background: #8b5cf6; }
.item-7 { background: #ec4899; }
.item-8 { background: #14b8a6; }
.item-9 { background: #f97316; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">项目 1 跨两列: grid-column: 1 / 3</div>
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
</div>`;

const presets = [
  {
    label: '跨两列',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: '跨两行',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 70px);
  gap: 8px;
  padding: 16px;
  border: 2px solid #e11d48;
  border-radius: 8px;
  background: #fff1f2;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  background: #d1d5db;
}
.item-1 {
  grid-column: 2;
  grid-row: 1 / 3;
  background: #e11d48;
}
.item-2 { background: #6366f1; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #3b82f6; }
.item-6 { background: #8b5cf6; }
.item-7 { background: #ec4899; }
.item-8 { background: #14b8a6; }
.item-9 { background: #f97316; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">项目 1 跨两行: grid-row: 1 / 3</div>
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
    label: 'span 关键字',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 70px);
  gap: 8px;
  padding: 16px;
  border: 2px solid #e11d48;
  border-radius: 8px;
  background: #fff1f2;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  background: #d1d5db;
}
.item-1 {
  /* span 2 = 跨越 2 个轨道 */
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  background: #e11d48;
}
.item-2 { background: #6366f1; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #3b82f6; }
.item-6 { background: #8b5cf6; }
.item-7 { background: #ec4899; }
.item-8 { background: #14b8a6; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">span 2: 从第 1 条线跨越 2 列 + 2 行</div>
<div class="container">
  <div class="item item-1">span 2x2</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
  <div class="item item-7">7</div>
  <div class="item item-8">8</div>
</div>`,
  },
  {
    label: 'grid-area 简写',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 70px);
  gap: 8px;
  padding: 16px;
  border: 2px solid #e11d48;
  border-radius: 8px;
  background: #fff1f2;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  background: #d1d5db;
}
/* grid-area: row-start / col-start / row-end / col-end */
.item-1 {
  grid-area: 1 / 1 / 2 / 5;
  background: #e11d48;
}
.item-2 {
  grid-area: 2 / 1 / 5 / 2;
  background: #6366f1;
}
.item-3 {
  grid-area: 2 / 2 / 4 / 4;
  background: #10b981;
}
.item-4 {
  grid-area: 2 / 4 / 5 / 5;
  background: #f59e0b;
}
.item-5 {
  grid-area: 4 / 2 / 5 / 4;
  background: #3b82f6;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-area 实现页面布局 (header/sidebar/main/aside/footer)</div>
<div class="container">
  <div class="item item-1">Header</div>
  <div class="item item-2">Sidebar</div>
  <div class="item item-3">Main</div>
  <div class="item item-4">Aside</div>
  <div class="item item-5">Footer</div>
</div>`,
  },
  {
    label: '命名网格区域',
    css: `.container {
  display: grid;
  grid-template-columns: 120px 1fr 100px;
  grid-template-rows: 50px 1fr 40px;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  gap: 8px;
  padding: 16px;
  border: 2px solid #e11d48;
  border-radius: 8px;
  background: #fff1f2;
  min-height: 280px;
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
.header { grid-area: header; background: #e11d48; }
.nav    { grid-area: nav;    background: #6366f1; }
.main   { grid-area: main;   background: #10b981; }
.aside  { grid-area: aside;  background: #f59e0b; }
.footer { grid-area: footer; background: #3b82f6; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-template-areas 命名区域布局</div>
<div class="container">
  <div class="item header">Header</div>
  <div class="item nav">Nav</div>
  <div class="item main">Main</div>
  <div class="item aside">Aside</div>
  <div class="item footer">Footer</div>
</div>`,
  },
];

export function GridPlacementDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
