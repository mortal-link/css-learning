'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}
.item-1 {
  flex: 1 1 0;
  background: #a855f7;
}
.item-2 {
  flex: 1 1 0;
  background: #3b82f6;
}
.item-3 {
  flex: 1 1 0;
  background: #10b981;
}
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">flex: 1 1 0 — 三列等分空间 (basis 为 0)</div>
<div class="container">
  <div class="item item-1">1<span class="sub">flex: 1 1 0</span></div>
  <div class="item item-2">2<span class="sub">flex: 1 1 0</span></div>
  <div class="item item-3">3<span class="sub">flex: 1 1 0</span></div>
</div>`;

const presets = [
  {
    label: '等分空间 (flex: 1 1 0)',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: '固定 + 弹性',
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}
.item-1 {
  flex: 0 0 100px;
  background: #a855f7;
}
.item-2 {
  flex: 1 1 0;
  background: #3b82f6;
}
.item-3 {
  flex: 0 0 80px;
  background: #10b981;
}
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">侧边栏固定，中间弹性布局</div>
<div class="container">
  <div class="item item-1">1<span class="sub">flex: 0 0 100px</span></div>
  <div class="item item-2">2<span class="sub">flex: 1 1 0</span></div>
  <div class="item item-3">3<span class="sub">flex: 0 0 80px</span></div>
</div>`,
  },
  {
    label: '不收缩 (shrink: 0)',
    css: `.container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  width: 300px;
  overflow: auto;
}
.item {
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
  flex: 0 0 150px;
  background: #a855f7;
}
.item-2 {
  flex: 0 0 150px;
  background: #3b82f6;
}
.item-3 {
  flex: 0 0 150px;
  background: #10b981;
}
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">容器 300px，3 项各 150px — shrink:0 不收缩会溢出</div>
<div class="container">
  <div class="item item-1">1<span class="sub">flex: 0 0 150px</span></div>
  <div class="item item-2">2<span class="sub">flex: 0 0 150px</span></div>
  <div class="item item-3">3<span class="sub">flex: 0 0 150px</span></div>
</div>`,
  },
  {
    label: 'flex: auto vs flex: 1',
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
}
.item-1 {
  /* flex: auto = 1 1 auto */
  flex: auto;
  background: #a855f7;
  padding: 0 20px;
}
.item-2 {
  /* flex: 1 = 1 1 0% */
  flex: 1;
  background: #3b82f6;
}
.item-3 {
  flex: auto;
  background: #10b981;
}
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex: auto (基于内容) vs flex: 1 (忽略内容)</div>
<div class="container">
  <div class="item item-1">长内容文本<span class="sub">flex: auto</span></div>
  <div class="item item-2">短<span class="sub">flex: 1</span></div>
  <div class="item item-3">中文本<span class="sub">flex: auto</span></div>
</div>`,
  },
  {
    label: '比例分配 (grow)',
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}
.item-1 {
  flex: 1 1 0;
  background: #a855f7;
}
.item-2 {
  flex: 2 1 0;
  background: #3b82f6;
}
.item-3 {
  flex: 3 1 0;
  background: #10b981;
}
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">grow 比例 1:2:3 — 剩余空间按比例分配</div>
<div class="container">
  <div class="item item-1">1<span class="sub">flex: 1</span></div>
  <div class="item item-2">2<span class="sub">flex: 2</span></div>
  <div class="item item-3">3<span class="sub">flex: 3</span></div>
</div>`,
  },
];

export function FlexSizingDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={240}
    />
  );
}
