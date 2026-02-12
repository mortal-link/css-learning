'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 200px;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}
.item-1 { width: 60px; height: 60px; background: #a855f7; }
.item-2 { width: 60px; height: 80px; background: #3b82f6; }
.item-3 { width: 60px; height: 48px; background: #10b981; }
.item-4 { width: 60px; height: 96px; background: #f59e0b; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">justify-content: center + align-items: center — 完美居中</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`;

const presets = [
  {
    label: '居中对齐',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: 'space-between',
    css: `.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 200px;
}
.item {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}
.item-1 { width: 60px; height: 60px; background: #a855f7; }
.item-2 { width: 60px; height: 80px; background: #3b82f6; }
.item-3 { width: 60px; height: 48px; background: #10b981; }
.item-4 { width: 60px; height: 96px; background: #f59e0b; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">justify-content: space-between + align-items: flex-end</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`,
  },
  {
    label: 'space-evenly + stretch',
    css: `.container {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  gap: 12px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 200px;
}
.item {
  width: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}
.item-1 { background: #a855f7; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">justify-content: space-evenly + align-items: stretch</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`,
  },
  {
    label: '多行 align-content',
    css: `.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 260px;
  max-width: 280px;
}
.item {
  width: 72px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}
.item-1 { height: 50px; background: #a855f7; }
.item-2 { height: 60px; background: #3b82f6; }
.item-3 { height: 40px; background: #10b981; }
.item-4 { height: 55px; background: #f59e0b; }
.item-5 { height: 45px; background: #ef4444; }
.item-6 { height: 65px; background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-wrap: wrap + align-content: space-around</div>
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
    label: 'align-self 覆盖',
    css: `.container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 200px;
}
.item {
  width: 60px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  text-align: center;
}
.item-1 {
  align-self: flex-start;
  background: #a855f7;
}
.item-2 {
  align-self: center;
  background: #3b82f6;
}
.item-3 {
  align-self: flex-end;
  background: #10b981;
}
.item-4 {
  align-self: stretch;
  height: auto;
  background: #f59e0b;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">align-self 单独覆盖每项的交叉轴对齐</div>
<div class="container">
  <div class="item item-1">start</div>
  <div class="item item-2">center</div>
  <div class="item item-3">end</div>
  <div class="item item-4">stretch</div>
</div>`,
  },
];

export function FlexAlignDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
