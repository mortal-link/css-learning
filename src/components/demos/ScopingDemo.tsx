'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* @scope 限定样式作用范围 */
@scope (.card) to (.footer) {
  .target {
    background: #dbeafe;
    padding: 8px;
    border-radius: 4px;
    margin: 4px 0;
    font-size: 14px;
  }
}

.card {
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 8px;
  margin-top: 8px;
}

.outside {
  border: 2px dashed #94a3b8;
  border-radius: 8px;
  padding: 12px;
}

.label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}`;

const defaultHTML = `<div class="card">
  <div class="label">card (作用域根)</div>
  <div class="target">在作用域内 - 样式生效</div>
  <div class="target">在作用域内 - 样式生效</div>
  <div class="footer">
    <div class="label">footer (作用域限制)</div>
    <div class="target">在 footer 内 - 超出作用域，样式不生效</div>
  </div>
</div>

<div class="outside">
  <div class="label">card 外部</div>
  <div class="target">作用域外 - 样式不生效</div>
</div>`;

const presets = [
  {
    label: '组件作用域',
    css: `@scope (.card) to (.footer) {
  .target {
    background: #dbeafe;
    padding: 8px;
    border-radius: 4px;
    margin: 4px 0;
    font-size: 14px;
  }
}
.card { border: 2px solid #3b82f6; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.footer { border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 8px; }
.outside { border: 2px dashed #94a3b8; border-radius: 8px; padding: 12px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }`,
  },
  {
    label: '无限制作用域',
    css: `/* 无 to 限制 = 作用域覆盖所有后代 */
@scope (.card) {
  .target {
    background: #dcfce7;
    padding: 8px;
    border-radius: 4px;
    margin: 4px 0;
    font-size: 14px;
    border-left: 3px solid #22c55e;
  }
}
.card { border: 2px solid #22c55e; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.footer { border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 8px; }
.outside { border: 2px dashed #94a3b8; border-radius: 8px; padding: 12px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }`,
  },
  {
    label: '嵌套限制',
    css: `@scope (.container) to (.nested) {
  p {
    color: #7c3aed;
    font-weight: 600;
    font-size: 14px;
  }
}
.container { border: 2px solid #7c3aed; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.nested { border: 1px dashed #f97316; padding: 8px; margin-top: 8px; border-radius: 4px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }`,
    html: `<div class="container">
  <div class="label">.container (作用域根)</div>
  <p>在作用域内 - 紫色加粗</p>
  <div class="nested">
    <div class="label">.nested (作用域限制)</div>
    <p>在 nested 内 - 样式不生效</p>
  </div>
</div>
<p>容器外部 - 样式不生效</p>`,
  },
  {
    label: '多个作用域',
    css: `@scope (.blue-zone) {
  .item { background: #dbeafe; padding: 6px; margin: 4px 0; border-radius: 4px; font-size: 13px; }
}
@scope (.green-zone) {
  .item { background: #dcfce7; padding: 6px; margin: 4px 0; border-radius: 4px; font-size: 13px; }
}
.blue-zone { border: 2px solid #3b82f6; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.green-zone { border: 2px solid #22c55e; border-radius: 8px; padding: 12px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }`,
    html: `<div class="blue-zone">
  <div class="label">.blue-zone 作用域</div>
  <div class="item">蓝色区域项目</div>
  <div class="item">蓝色区域项目</div>
</div>
<div class="green-zone">
  <div class="label">.green-zone 作用域</div>
  <div class="item">绿色区域项目</div>
  <div class="item">绿色区域项目</div>
</div>`,
  },
];

export function ScopingDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
