'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 浮动与图文环绕 */
.container {
  padding: 16px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
}
.float-box {
  float: left;
  width: 120px;
  height: 120px;
  margin: 0 16px 8px 0;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  font-weight: 600;
}
.text {
  font-size: 14px;
  color: #334155;
  line-height: 1.8;
}
.note {
  margin-top: 16px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="container">
  <div class="float-box">float: left</div>
  <p class="text">
    这是一段环绕文本内容。当元素设置 float 属性后，它会脱离正常文档流，
    向左或向右浮动，直到它的外边缘碰到包含框或另一个浮动元素的边缘。
    文本和行内元素会环绕浮动元素排列。这是实现图文混排的经典方式。
    浮动元素虽然脱离了文档流，但仍会影响周围内容的布局。
  </p>
</div>
<div class="note">浮动最初是为了实现图文环绕效果。元素脱离文档流，文本环绕排列。</div>`;

const presets = [
  {
    label: '图文环绕',
  },
  {
    label: '右浮动',
    css: `.container {
  padding: 16px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
}
.float-box {
  float: right;
  width: 120px;
  height: 120px;
  margin: 0 0 8px 16px;
  background: #8b5cf6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  font-weight: 600;
}
.text { font-size: 14px; color: #334155; line-height: 1.8; }`,
    html: `<div class="container">
  <div class="float-box">float: right</div>
  <p class="text">
    这是一段环绕文本内容。float: right 使元素向右浮动。
    文本和行内元素会环绕在浮动元素的左侧排列。
    浮动元素虽然脱离了文档流，但仍会影响周围内容的布局。
    需要注意的是，浮动元素的父容器可能会发生高度塌陷问题。
  </p>
</div>`,
  },
  {
    label: '高度塌陷',
    css: `.container {
  padding: 16px;
  border: 2px solid #f97316;
  border-radius: 8px;
  /* 注意：没有 overflow 处理浮动 */
}
.float-box {
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 12px 8px 0;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
.warning {
  margin-top: 8px;
  padding: 10px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 6px;
  font-size: 13px;
  color: #c2410c;
  line-height: 1.6;
}`,
    html: `<div class="container">
  <div class="float-box">浮动 1</div>
  <div class="float-box">浮动 2</div>
</div>
<div class="warning">
  高度塌陷：容器边框紧贴顶部，没有包含浮动元素。因为浮动元素脱离了文档流。
</div>`,
  },
  {
    label: 'BFC 包含',
    css: `.container {
  padding: 16px;
  border: 2px solid #10b981;
  border-radius: 8px;
  overflow: auto; /* 建立 BFC，包含浮动 */
}
.float-box {
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 12px 8px 0;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
.label {
  font-size: 12px;
  color: #10b981;
  margin-bottom: 8px;
}
.note {
  clear: both;
  margin-top: 12px;
  padding: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  font-size: 13px;
  color: #166534;
}`,
    html: `<div class="container">
  <div class="label">容器 overflow: auto (BFC)</div>
  <div class="float-box">浮动 1</div>
  <div class="float-box">浮动 2</div>
  <div class="note">容器建立了 BFC，正确包含了浮动元素的高度。</div>
</div>`,
  },
  {
    label: 'clear 清除',
    css: `.container {
  padding: 16px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
}
.float-box {
  float: left;
  width: 100px;
  height: 80px;
  margin: 0 12px 8px 0;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
.text { font-size: 14px; color: #334155; line-height: 1.6; }
.clear-el {
  clear: both;
  margin-top: 12px;
  padding: 12px;
  background: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 13px;
}`,
    html: `<div class="container">
  <div class="float-box">float: left</div>
  <p class="text">环绕的文本内容。</p>
  <div class="clear-el">
    clear: both — 此元素下方不允许浮动元素
  </div>
</div>`,
  },
];

export function FloatDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
