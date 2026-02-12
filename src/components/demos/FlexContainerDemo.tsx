'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #a855f7; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.label {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">flex 容器占据整行宽度，flex-direction: row</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`;

const presets = [
  {
    label: '行排列 (row)',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: '列排列 (column)',
    css: `.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  width: 200px;
}
.item {
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #a855f7; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.label {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-direction: column — 子项纵向排列</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`,
  },
  {
    label: '反向行 (row-reverse)',
    css: `.container {
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}
.item {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #a855f7; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.label {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-direction: row-reverse — 反转排列顺序</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`,
  },
  {
    label: '行内 flex (inline-flex)',
    css: `.wrapper {
  text-align: center;
}
.text {
  font-size: 14px;
  color: #333;
}
.container {
  display: inline-flex;
  flex-direction: row;
  gap: 8px;
  padding: 12px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  vertical-align: middle;
}
.item {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}
.item-1 { background: #a855f7; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.label {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">inline-flex 容器可以与行内元素并排</div>
<div class="wrapper">
  <span class="text">前面文本 </span>
  <div class="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
  </div>
  <span class="text"> 后面文本</span>
</div>`,
  },
  {
    label: '反向列 (column-reverse)',
    css: `.container {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  width: 200px;
}
.item {
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.item-1 { background: #a855f7; }
.item-2 { background: #3b82f6; }
.item-3 { background: #10b981; }
.item-4 { background: #f59e0b; }
.label {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-direction: column-reverse — 从下往上排列</div>
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>`,
  },
];

export function FlexContainerDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
