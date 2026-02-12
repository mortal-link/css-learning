'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 层叠与默认值：color 属性有声明时走层叠路径 */
.parent {
  color: black;
  font-size: 16px;
  width: 100%;
  padding: 16px;
  font-family: system-ui;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}
.child {
  color: red;            /* 有声明 → 走层叠路径 */
  padding: 12px;
  margin-top: 8px;
  background: #fef2f2;
  border-radius: 6px;
}
.label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}
.note {
  margin-top: 16px;
  padding: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  font-size: 13px;
  color: #166534;
}`;

const defaultHTML = `<div class="parent">
  <div class="label">父元素 (.parent) — color: black</div>
  这是父元素的文字
  <div class="child">
    <div class="label">子元素 (.child) — color: red (声明值)</div>
    这是子元素的文字 — 红色 (层叠路径获胜)
  </div>
</div>
<div class="note">
  <strong>层叠路径：</strong>有声明 → 声明值(red) → 层叠值(red) → 指定值(red) → 计算值(rgb(255,0,0)) → 使用值 → 实际值
</div>`;

const presets = [
  {
    label: '颜色层叠',
    css: `.parent { color: black; font-size: 16px; padding: 16px; font-family: system-ui; border: 2px solid #e2e8f0; border-radius: 8px; }
.child { color: red; padding: 12px; margin-top: 8px; background: #fef2f2; border-radius: 6px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
.note { margin-top: 16px; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 13px; color: #166534; }`,
    html: `<div class="parent">
  <div class="label">父: color: black</div>
  父元素文字
  <div class="child">
    <div class="label">子: color: red (有声明)</div>
    子元素文字 — 层叠路径: red 胜出
  </div>
</div>
<div class="note"><strong>层叠路径：</strong>声明值 → 层叠值 → 指定值 → 计算值 → 使用值 → 实际值</div>`,
  },
  {
    label: '字号继承',
    css: `.parent { color: #333; font-size: 16px; padding: 16px; font-family: system-ui; border: 2px solid #e2e8f0; border-radius: 8px; }
.child { padding: 12px; margin-top: 8px; background: #eff6ff; border-radius: 6px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
.note { margin-top: 16px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; font-size: 13px; color: #92400e; }`,
    html: `<div class="parent">
  <div class="label">父: font-size: 16px</div>
  父元素文字 (16px)
  <div class="child">
    <div class="label">子: 无 font-size 声明 (继承)</div>
    子元素文字 — 默认路径: 继承父元素的 16px
  </div>
</div>
<div class="note"><strong>默认路径（继承）：</strong>无声明 → 无层叠值 → 指定值 = 继承父元素的 16px</div>`,
  },
  {
    label: '宽度计算',
    css: `.parent { width: 100%; padding: 16px; font-family: system-ui; border: 2px solid #e2e8f0; border-radius: 8px; }
.child { width: 50%; padding: 12px; margin-top: 8px; background: #f3e8ff; border-radius: 6px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
.note { margin-top: 16px; padding: 10px; background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 6px; font-size: 13px; color: #6b21a8; }`,
    html: `<div class="parent">
  <div class="label">父: width: 100%</div>
  <div class="child">
    <div class="label">子: width: 50% (有声明)</div>
    宽度是父元素的一半
  </div>
</div>
<div class="note"><strong>值处理：</strong>50% → Computed 保持 50% → Used 阶段计算为具体像素值</div>`,
  },
  {
    label: '无声明 (初始值)',
    css: `.parent { padding: 16px; font-family: system-ui; border: 2px solid #e2e8f0; border-radius: 8px; }
.child { padding: 12px; margin-top: 8px; background: #fff7ed; border-radius: 6px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
.note { margin-top: 16px; padding: 10px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; font-size: 13px; color: #9a3412; }`,
    html: `<div class="parent">
  <div class="label">父: 无 margin 声明</div>
  <div class="child">
    <div class="label">子: 无 margin 声明 (不可继承属性)</div>
    margin 使用初始值 0
  </div>
</div>
<div class="note"><strong>默认路径（初始值）：</strong>无声明 → 无层叠值 → 指定值 = 初始值(0) — margin 不可继承</div>`,
  },
];

export function CascadeIntroDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
