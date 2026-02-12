'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.target {
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-align: center;
}
.target::before {
  content: "\\2192 ";
  color: #3b82f6;
  font-size: 20px;
  margin-right: 8px;
}
.target::after {
  content: " \\2190";
  color: #8b5cf6;
  font-size: 20px;
  margin-left: 8px;
}`;

const defaultHTML = `<div class="target">目标元素内容</div>`;

const presets = [
  {
    label: '箭头标记',
    css: `.target {
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-align: center;
}
.target::before {
  content: "\\2192 ";
  color: #3b82f6;
  font-size: 20px;
  margin-right: 8px;
}
.target::after {
  content: " \\2190";
  color: #8b5cf6;
  font-size: 20px;
  margin-left: 8px;
}`,
  },
  {
    label: '装饰星号',
    css: `.target {
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-align: center;
}
.target::before {
  content: "\\2605 ";
  color: #f59e0b;
  font-size: 24px;
  margin-right: 8px;
}
.target::after {
  content: " \\2605";
  color: #f59e0b;
  font-size: 24px;
  margin-left: 8px;
}`,
  },
  {
    label: '引号包裹',
    css: `.target {
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-align: center;
  font-style: italic;
}
.target::before {
  content: "\\201C";
  color: #6b7280;
  font-size: 32px;
  margin-right: 4px;
  vertical-align: -0.2em;
}
.target::after {
  content: "\\201D";
  color: #6b7280;
  font-size: 32px;
  margin-left: 4px;
  vertical-align: -0.2em;
}`,
  },
  {
    label: '装饰色条',
    css: `.target {
  font-size: 18px;
  font-weight: 500;
  padding: 16px 16px 16px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  position: relative;
}
.target::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 6px 0 0 6px;
}
.target::after {
  content: " \\2713";
  color: #10b981;
  font-size: 18px;
  margin-left: 8px;
}`,
  },
  {
    label: '清除浮动',
    css: `.container {
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 12px;
}
/* clearfix: 使用 ::after 清除浮动 */
.container::after {
  content: "";
  display: table;
  clear: both;
}
.float-box {
  float: left;
  width: 80px;
  height: 80px;
  margin-right: 12px;
  background: #dbeafe;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #3b82f6;
}
.target { border: none; padding: 0; }`,
    html: `<div class="container">
  <div class="float-box">浮动 1</div>
  <div class="float-box">浮动 2</div>
  <div class="target">容器使用 ::after 清除浮动，高度自动包含浮动子元素。</div>
</div>`,
  },
];

export function PseudoElementDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={140}
    />
  );
}
