'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 步骤 1: HTML 解析为 DOM 树 */
/* 步骤 2: 收集 CSS 规则 */
/* 步骤 3: 计算属性值 */
/* 步骤 4: 生成盒模型 */
/* 步骤 5: 渲染到屏幕 */

.container {
  font-family: system-ui, sans-serif;
  padding: 16px;
}
.title {
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}
.text {
  color: red;          /* 继承自 .container 的 color */
  display: block;
  margin-bottom: 8px;
}
.hidden {
  display: none;       /* 不生成盒子，不会渲染 */
}
.visible {
  color: green;
  font-style: italic;
}`;

const defaultHTML = `<div class="container" style="color: red;">
  <p class="text">这段文字继承了父元素的红色</p>
  <span class="hidden">这段文字不会显示 (display: none)</span>
  <p class="visible">这段文字是绿色斜体</p>
</div>

<div style="margin-top: 20px; padding: 12px; background: #f8f9fa; border-radius: 8px; font-size: 13px;">
  <strong>CSS 处理流程：</strong><br>
  1. 解析 HTML → DOM 树<br>
  2. 收集 CSS → 规则集<br>
  3. 层叠+继承 → 计算值<br>
  4. display → 生成盒树<br>
  5. 布局+绘制 → 像素输出
</div>`;

const presets = [
  {
    label: '完整流程',
    css: `.container { font-family: system-ui, sans-serif; padding: 16px; color: red; }
.text { display: block; margin-bottom: 8px; }
.hidden { display: none; }
.visible { color: green; font-style: italic; }`,
  },
  {
    label: 'display:none 不生成盒子',
    css: `.container { padding: 16px; font-family: system-ui, sans-serif; }
.text { color: #333; margin-bottom: 8px; }
.hidden { display: none; /* 此元素不生成盒子，不参与布局和渲染 */ }
.visible { color: green; }`,
    html: `<div class="container">
  <p class="text">第一段 (display: block → 生成块级盒子)</p>
  <p class="hidden">第二段 (display: none → 不生成盒子)</p>
  <p class="text">第三段 (display: block → 生成块级盒子)</p>
</div>
<p style="margin-top:12px; font-size:13px; color:#666;">注意：第二段不占据空间，第三段紧跟第一段。</p>`,
  },
  {
    label: '继承演示',
    css: `.parent {
  color: blue;
  font-size: 20px;
  font-family: Georgia, serif;
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
}
.child {
  /* color: blue 继承自 parent */
  /* font-size: 20px 继承自 parent */
  margin-top: 8px;
  padding: 8px;
  background: #f0f8ff;
  border-radius: 4px;
}
.grandchild {
  /* 继承链：parent → child → grandchild */
  font-style: italic;
}`,
    html: `<div class="parent">
  父元素 (color: blue, font-size: 20px)
  <div class="child">
    子元素 (继承了 color 和 font-size)
    <div class="grandchild">
      孙元素 (继承链传递)
    </div>
  </div>
</div>`,
  },
  {
    label: '盒树 vs DOM 树',
    css: `.tree { padding: 16px; font-family: monospace; font-size: 14px; line-height: 1.8; }
.block { display: block; padding: 8px 12px; margin: 4px 0; background: #e8f5e9; border-left: 3px solid #4caf50; }
.inline { display: inline; padding: 2px 8px; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 3px; }
.none { display: none; }
.note { margin-top: 12px; font-size: 12px; color: #666; font-family: system-ui; }`,
    html: `<div class="tree">
  <div class="block">div — Block Box</div>
  <div class="block">p — Block Box
    <span class="inline">span — Inline Box</span>
  </div>
  <div class="none">隐藏元素 — No Box</div>
  <div class="block">footer — Block Box</div>
</div>
<p class="note" style="padding:0 16px; font-size:13px; color:#666;">
  DOM 有 4 个子元素，但盒树只有 3 个盒子（display:none 的元素不生成盒子）
</p>`,
  },
];

export function ProcessingModelDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
