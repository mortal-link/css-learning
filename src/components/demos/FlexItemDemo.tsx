'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  height: 64px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
.item-1 {
  flex-grow: 1;
  background: #a855f7;
}
.item-2 {
  flex-grow: 2;
  background: #3b82f6;
}
.item-3 {
  flex-grow: 1;
  background: #10b981;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">flex-grow 控制项目如何分配剩余空间 (比例 1:2:1)</div>
<div class="container">
  <div class="item item-1">grow: 1</div>
  <div class="item item-2">grow: 2</div>
  <div class="item item-3">grow: 1</div>
</div>`;

const presets = [
  {
    label: 'flex-grow 比例分配',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: 'flex-shrink 收缩',
    css: `.container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  width: 400px;
}
.item {
  height: 64px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  width: 200px;
}
.item-1 {
  flex-shrink: 1;
  background: #a855f7;
}
.item-2 {
  flex-shrink: 2;
  background: #3b82f6;
}
.item-3 {
  flex-shrink: 0;
  background: #10b981;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">容器 400px，各项 200px — shrink: 0 不收缩</div>
<div class="container">
  <div class="item item-1">shrink: 1</div>
  <div class="item item-2">shrink: 2</div>
  <div class="item item-3">shrink: 0</div>
</div>`,
  },
  {
    label: 'flex-basis 基准尺寸',
    css: `.container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  height: 64px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
}
.item-1 {
  flex-basis: 100px;
  background: #a855f7;
}
.item-2 {
  flex-basis: 200px;
  background: #3b82f6;
}
.item-3 {
  flex-basis: auto;
  background: #10b981;
  padding: 0 20px;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-basis 设置初始主轴尺寸 (优先于 width)</div>
<div class="container">
  <div class="item item-1">basis: 100px</div>
  <div class="item item-2">basis: 200px</div>
  <div class="item item-3">basis: auto</div>
</div>`,
  },
  {
    label: 'order 属性排序',
    css: `.container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  width: 80px;
  height: 64px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}
.item-1 {
  order: 3;
  background: #a855f7;
}
.item-2 {
  order: 1;
  background: #3b82f6;
}
.item-3 {
  order: 2;
  background: #10b981;
}
.item-4 {
  order: -1;
  background: #f59e0b;
}
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">order 改变视觉顺序，不影响 DOM 顺序</div>
<div class="container">
  <div class="item item-1">1<span class="sub">order:3</span></div>
  <div class="item item-2">2<span class="sub">order:1</span></div>
  <div class="item item-3">3<span class="sub">order:2</span></div>
  <div class="item item-4">4<span class="sub">order:-1</span></div>
</div>`,
  },
  {
    label: 'align-self 单项对齐',
    css: `.container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 160px;
  align-items: flex-start;
}
.item {
  width: 72px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
}
.item-1 {
  height: 50px;
  align-self: flex-start;
  background: #a855f7;
}
.item-2 {
  height: 50px;
  align-self: center;
  background: #3b82f6;
}
.item-3 {
  height: 50px;
  align-self: flex-end;
  background: #10b981;
}
.item-4 {
  align-self: stretch;
  background: #f59e0b;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">align-self 覆盖容器的 align-items 设置</div>
<div class="container">
  <div class="item item-1">flex-<br>start</div>
  <div class="item item-2">center</div>
  <div class="item item-3">flex-<br>end</div>
  <div class="item item-4">stretch</div>
</div>`,
  },
];

export function FlexItemDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
