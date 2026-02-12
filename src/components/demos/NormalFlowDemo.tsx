'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 正常流 (Normal Flow) 布局 */
.container {
  padding: 16px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
}
.hint {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
}
.block {
  display: block;
  padding: 12px 16px;
  margin: 8px 0;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}
.inline {
  display: inline;
  padding: 3px 10px;
  margin: 0 4px;
  background: #10b981;
  color: white;
  border-radius: 4px;
  font-size: 14px;
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
  <div class="hint">蓝色 = 块级元素（垂直堆叠），绿色 = 行内元素（水平排列）</div>
  <div class="block">块级元素 A</div>
  <span class="inline">行内 1</span>
  <span class="inline">行内 2</span>
  <div class="block">块级元素 B</div>
  <span class="inline">行内 3</span>
</div>
<div class="note">
  正常流（Normal Flow）是 CSS 默认布局方式。块级元素在 BFC 中垂直堆叠，行内元素在 IFC 中水平排列。
</div>`;

const presets = [
  {
    label: '混合排列',
  },
  {
    label: '纯块级 (BFC)',
    css: `.container { padding: 16px; border: 2px dashed #cbd5e1; border-radius: 8px; }
.block {
  display: block; padding: 12px 16px; margin: 8px 0;
  background: #3b82f6; color: white; border-radius: 6px;
  font-size: 14px; font-weight: 500;
}
.info { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }`,
    html: `<div class="container">
  <div class="block">块级元素 A（↓ 垂直堆叠）</div>
  <div class="block">块级元素 B（↔ 宽度填满父容器）</div>
  <div class="block">块级元素 C（所有 margin/padding 生效）</div>
</div>
<div class="info">BFC（块级格式化上下文）：块级元素垂直方向依次堆叠，宽度默认 100%。</div>`,
  },
  {
    label: '纯行内 (IFC)',
    css: `.container { padding: 16px; border: 2px dashed #cbd5e1; border-radius: 8px; line-height: 2.4; }
.inline {
  display: inline; padding: 3px 10px; margin: 0 4px;
  background: #10b981; color: white; border-radius: 4px; font-size: 14px;
}
.info { margin-top: 12px; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 13px; color: #166534; line-height: 1.6; }`,
    html: `<div class="container">
  <span class="inline">行内 1</span>
  <span class="inline">行内 2</span>
  <span class="inline">行内 3</span>
  <span class="inline">行内 4</span>
  <span class="inline">行内 5</span>
  <span class="inline">行内 6</span>
  <span class="inline">行内 7</span>
  <span class="inline">行内 8</span>
</div>
<div class="info">IFC（行内格式化上下文）：行内元素水平排列，遇到边界自动换行。width/height 无效。</div>`,
  },
  {
    label: '匿名块框',
    css: `.container { padding: 16px; border: 2px dashed #cbd5e1; border-radius: 8px; font-size: 14px; color: #334155; }
.block {
  display: block; padding: 12px 16px; margin: 8px 0;
  background: #3b82f6; color: white; border-radius: 6px;
  font-size: 14px; font-weight: 500;
}
.anon-hint {
  display: inline;
  background: rgba(245, 158, 11, 0.15);
  border: 1px dashed #f59e0b;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  color: #92400e;
}
.info { margin-top: 12px; padding: 10px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; font-size: 13px; color: #c2410c; line-height: 1.6; }`,
    html: `<div class="container">
  <span class="anon-hint">裸文本 → 匿名块框</span> 这段文本没有包裹在任何块级元素中
  <div class="block">块级元素</div>
  <span class="anon-hint">裸文本 → 匿名块框</span> 这段也是裸文本
</div>
<div class="info">
  当行内内容与块级元素混合时，行内内容会被包裹在匿名块框中，以维持 BFC 的规则。
</div>`,
  },
];

export function NormalFlowDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
