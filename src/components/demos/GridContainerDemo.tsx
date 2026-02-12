'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
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
.item-1 { background: #3b82f6; }
.item-2 { background: #8b5cf6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">display: grid — 3 列等分网格</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
</div>`;

const presets = [
  {
    label: '3 列等分',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: '2 列布局',
    css: `.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
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
.item-1 { background: #3b82f6; }
.item-2 { background: #8b5cf6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">display: grid — 2 列布局</div>
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
    label: '固定 + 弹性列',
    css: `.container {
  display: grid;
  grid-template-columns: 100px 1fr 80px;
  grid-template-rows: 80px auto;
  gap: 12px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
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
.item-1 { background: #3b82f6; }
.item-2 { background: #8b5cf6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grid-template-columns: 100px 1fr 80px</div>
<div class="container">
  <div class="item item-1">100px</div>
  <div class="item item-2">1fr</div>
  <div class="item item-3">80px</div>
  <div class="item item-4">100px</div>
  <div class="item item-5">1fr</div>
  <div class="item item-6">80px</div>
</div>`,
  },
  {
    label: 'inline-grid',
    css: `.wrapper { text-align: center; }
.text { font-size: 14px; color: #333; }
.container {
  display: inline-grid;
  grid-template-columns: 60px 60px 60px;
  gap: 8px;
  padding: 12px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  vertical-align: middle;
}
.item {
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
.item-1 { background: #3b82f6; }
.item-2 { background: #8b5cf6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">inline-grid 容器与行内元素并排</div>
<div class="wrapper">
  <span class="text">前面 </span>
  <div class="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
  </div>
  <span class="text"> 后面</span>
</div>`,
  },
  {
    label: 'gap 效果对比',
    css: `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
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
.item-1 { background: #3b82f6; }
.item-2 { background: #8b5cf6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">row-gap: 20px, column-gap: 8px — 行列间距分别设置</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
  <div class="item item-6">6</div>
</div>`,
  },
];

export function GridContainerDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
