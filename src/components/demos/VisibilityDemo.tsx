'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.boxes {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 24px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 16px;
  min-height: 120px;
  align-items: start;
}

.box {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}

.box-1 { background: #3b82f6; }
.box-2 { background: #8b5cf6; }
.box-3 { background: #ec4899; }

.box-label {
  text-align: center;
  font-size: 11px;
  color: #888;
  margin-top: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border: 1px solid #e0e0e0;
}

th { background: #f5f5f5; font-weight: 600; }`;

const defaultHTML = `<div class="boxes">
  <div style="text-align: center;">
    <div class="box box-1">Box 1</div>
    <div class="box-label">可见</div>
  </div>
  <div style="text-align: center;">
    <div class="box box-2">Box 2</div>
    <div class="box-label">可见</div>
  </div>
  <div style="text-align: center;">
    <div class="box box-3">Box 3</div>
    <div class="box-label">可见</div>
  </div>
</div>

<table>
  <thead>
    <tr><th>方法</th><th>占据空间</th><th>可点击</th><th>支持过渡</th></tr>
  </thead>
  <tbody>
    <tr><td><code>visibility: hidden</code></td><td>是</td><td>否</td><td>是</td></tr>
    <tr><td><code>display: none</code></td><td>否</td><td>否</td><td>否</td></tr>
    <tr><td><code>opacity: 0</code></td><td>是</td><td>是</td><td>是</td></tr>
  </tbody>
</table>`;

const presets = [
  {
    label: 'visibility: hidden',
    css: `.boxes { display: flex; gap: 16px; justify-content: center; padding: 24px; background: #f0f0f0; border-radius: 8px; margin-bottom: 16px; min-height: 120px; align-items: start; }
.box { width: 96px; height: 96px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; }
.box-1 { background: #3b82f6; visibility: hidden; }
.box-2 { background: #8b5cf6; visibility: hidden; }
.box-3 { background: #ec4899; visibility: hidden; }
.box-label { text-align: center; font-size: 11px; color: #888; margin-top: 4px; }
.note { padding: 12px; background: #eff6ff; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6; }`,
    html: `<div class="boxes">
  <div style="text-align:center"><div class="box box-1">Box 1</div><div class="box-label">visibility: hidden</div></div>
  <div style="text-align:center"><div class="box box-2">Box 2</div><div class="box-label">visibility: hidden</div></div>
  <div style="text-align:center"><div class="box box-3">Box 3</div><div class="box-label">visibility: hidden</div></div>
</div>
<div class="note">visibility: hidden 隐藏元素，但仍然占据空间。注意上方的空白区域仍保留了三个盒子的位置。</div>`,
  },
  {
    label: 'display: none',
    css: `.boxes { display: flex; gap: 16px; justify-content: center; padding: 24px; background: #f0f0f0; border-radius: 8px; margin-bottom: 16px; min-height: 120px; align-items: start; }
.box { width: 96px; height: 96px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; }
.box-1 { background: #3b82f6; display: none; }
.box-2 { background: #8b5cf6; display: none; }
.box-3 { background: #ec4899; display: none; }
.box-label { text-align: center; font-size: 11px; color: #888; margin-top: 4px; }
.note { padding: 12px; background: #eff6ff; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6; }`,
    html: `<div class="boxes">
  <div style="text-align:center"><div class="box box-1">Box 1</div><div class="box-label">display: none</div></div>
  <div style="text-align:center"><div class="box box-2">Box 2</div><div class="box-label">display: none</div></div>
  <div style="text-align:center"><div class="box box-3">Box 3</div><div class="box-label">display: none</div></div>
</div>
<div class="note">display: none 完全移除元素，不占据任何空间。盒子和标签都不可见（标签也是子元素的一部分）。</div>`,
  },
  {
    label: 'opacity: 0',
    css: `.boxes { display: flex; gap: 16px; justify-content: center; padding: 24px; background: #f0f0f0; border-radius: 8px; margin-bottom: 16px; min-height: 120px; align-items: start; }
.box { width: 96px; height: 96px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; }
.box-1 { background: #3b82f6; opacity: 0; }
.box-2 { background: #8b5cf6; opacity: 0; }
.box-3 { background: #ec4899; opacity: 0; }
.box-label { text-align: center; font-size: 11px; color: #888; margin-top: 4px; }
.note { padding: 12px; background: #eff6ff; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6; }`,
    html: `<div class="boxes">
  <div style="text-align:center"><div class="box box-1">Box 1</div><div class="box-label">opacity: 0</div></div>
  <div style="text-align:center"><div class="box box-2">Box 2</div><div class="box-label">opacity: 0</div></div>
  <div style="text-align:center"><div class="box box-3">Box 3</div><div class="box-label">opacity: 0</div></div>
</div>
<div class="note">opacity: 0 使元素透明，但仍占据空间且可以点击。注意标签仍然可见，因为 opacity 只影响盒子本身。</div>`,
  },
  {
    label: '混合对比',
    css: `.boxes { display: flex; gap: 16px; justify-content: center; padding: 24px; background: #f0f0f0; border-radius: 8px; margin-bottom: 16px; min-height: 120px; align-items: start; }
.box { width: 96px; height: 96px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; }
.box-1 { background: #3b82f6; visibility: hidden; }
.box-2 { background: #8b5cf6; display: none; }
.box-3 { background: #ec4899; opacity: 0; }
.box-label { text-align: center; font-size: 11px; color: #888; margin-top: 4px; }
.note { padding: 12px; background: #eff6ff; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6; }`,
    html: `<div class="boxes">
  <div style="text-align:center"><div class="box box-1">Box 1</div><div class="box-label">visibility: hidden</div></div>
  <div style="text-align:center"><div class="box box-2">Box 2</div><div class="box-label">display: none</div></div>
  <div style="text-align:center"><div class="box box-3">Box 3</div><div class="box-label">opacity: 0</div></div>
</div>
<div class="note">三种方法对比: Box 1 (visibility:hidden) 占空间但不可见; Box 2 (display:none) 完全消失; Box 3 (opacity:0) 透明但占空间。</div>`,
  },
];

export function VisibilityDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
