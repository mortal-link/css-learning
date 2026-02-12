'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  max-width: 320px;
}
.item {
  width: 80px;
  height: 80px;
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
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">flex-flow: row wrap — 项目换行排列</div>
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
    label: 'row wrap',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: 'row nowrap',
    css: `.container {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  max-width: 320px;
  overflow: auto;
}
.item {
  width: 80px;
  height: 80px;
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
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-flow: row nowrap — 不换行，项目溢出</div>
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
    label: 'row wrap-reverse',
    css: `.container {
  display: flex;
  flex-flow: row wrap-reverse;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  max-width: 320px;
}
.item {
  width: 80px;
  height: 80px;
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
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-flow: row wrap-reverse — 反向换行，新行在上方</div>
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
    label: 'column wrap',
    css: `.container {
  display: flex;
  flex-flow: column wrap;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  height: 280px;
  max-width: 320px;
}
.item {
  width: 80px;
  height: 80px;
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
.item-5 { background: #ef4444; }
.item-6 { background: #6366f1; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">flex-flow: column wrap — 纵向排列并换列</div>
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
    label: 'order + wrap',
    css: `.container {
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  padding: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
  max-width: 320px;
}
.item {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  flex-shrink: 0;
}
.item-1 { background: #a855f7; order: 3; }
.item-2 { background: #3b82f6; order: 1; }
.item-3 { background: #10b981; order: -1; }
.item-4 { background: #f59e0b; order: 2; }
.item-5 { background: #ef4444; order: 0; }
.item-6 { background: #6366f1; order: -2; }
.sub { font-size: 10px; opacity: 0.8; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">order 属性改变视觉排列顺序</div>
<div class="container">
  <div class="item item-1">1<span class="sub">order:3</span></div>
  <div class="item item-2">2<span class="sub">order:1</span></div>
  <div class="item item-3">3<span class="sub">order:-1</span></div>
  <div class="item item-4">4<span class="sub">order:2</span></div>
  <div class="item item-5">5<span class="sub">order:0</span></div>
  <div class="item item-6">6<span class="sub">order:-2</span></div>
</div>`,
  },
];

export function FlexFlowDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
