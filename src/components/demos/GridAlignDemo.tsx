'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 80px);
  gap: 8px;
  justify-items: stretch;
  align-items: stretch;
  padding: 16px;
  border: 2px solid #10b981;
  border-radius: 8px;
  background: #ecfdf5;
  width: fit-content;
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
.item-1 { background: #10b981; }
.item-2 { background: #3b82f6; }
.item-3 { background: #8b5cf6; }
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

const defaultHTML = `<div class="label">justify-items + align-items: stretch (默认值)</div>
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
    label: 'stretch (默认)',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: 'center + center',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 80px);
  gap: 8px;
  justify-items: center;
  align-items: center;
  padding: 16px;
  border: 2px solid #10b981;
  border-radius: 8px;
  background: #ecfdf5;
  width: fit-content;
}
.item {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #10b981; }
.item-2 { background: #3b82f6; }
.item-3 { background: #8b5cf6; }
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
    html: `<div class="label">justify-items: center + align-items: center — 项目在单元格内居中</div>
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
    label: 'justify/align-content',
    css: `.outer {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 450px;
  height: 350px;
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(3, 60px);
  gap: 8px;
  justify-content: space-evenly;
  align-content: center;
  height: 100%;
  border: 2px solid #10b981;
  border-radius: 8px;
  background: #ecfdf5;
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
.item-1 { background: #10b981; }
.item-2 { background: #3b82f6; }
.item-3 { background: #8b5cf6; }
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
    html: `<div class="label">justify-content: space-evenly + align-content: center — 网格在容器内分布</div>
<div class="outer">
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
  </div>
</div>`,
  },
  {
    label: 'justify-self / align-self',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 80px);
  gap: 8px;
  justify-items: stretch;
  align-items: stretch;
  padding: 16px;
  border: 2px solid #10b981;
  border-radius: 8px;
  background: #ecfdf5;
  width: fit-content;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
}
.item-1 { background: #10b981; }
.item-2 { background: #3b82f6; }
.item-3 { background: #8b5cf6; }
.item-4 { background: #f59e0b; }
/* 项目 5 单独设置 */
.item-5 {
  background: #ef4444;
  justify-self: center;
  align-self: end;
  width: 60px;
  height: 40px;
}
.item-6 { background: #6366f1; }
.item-7 { background: #ec4899; }
.item-8 { background: #14b8a6; }
.item-9 { background: #f97316; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">项目 5 使用 justify-self: center + align-self: end 覆盖</div>
<div class="container">
  <div class="item item-1">stretch</div>
  <div class="item item-2">stretch</div>
  <div class="item item-3">stretch</div>
  <div class="item item-4">stretch</div>
  <div class="item item-5">center<br>+ end</div>
  <div class="item item-6">stretch</div>
  <div class="item item-7">stretch</div>
  <div class="item item-8">stretch</div>
  <div class="item item-9">stretch</div>
</div>`,
  },
  {
    label: 'place-items 简写',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 80px);
  gap: 8px;
  /* place-items: align-items justify-items */
  place-items: end start;
  padding: 16px;
  border: 2px solid #10b981;
  border-radius: 8px;
  background: #ecfdf5;
  width: fit-content;
}
.item {
  width: 50px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #10b981; }
.item-2 { background: #3b82f6; }
.item-3 { background: #8b5cf6; }
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
    html: `<div class="label">place-items: end start — 垂直底部 + 水平起点</div>
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
];

export function GridAlignDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={360}
    />
  );
}
