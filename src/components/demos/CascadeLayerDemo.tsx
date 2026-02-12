'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* @layer 声明顺序决定优先级 */
@layer reset, base, theme;

@layer reset {
  .btn { color: gray; padding: 10px 20px; border: 2px solid gray; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; }
}

@layer base {
  .btn { color: blue; border-color: blue; background: #eff6ff; }
}

@layer theme {
  .btn { color: purple; border-color: purple; background: #faf5ff; }
}

/* 未分层样式优先级最高 */
.btn {
  color: red;
  border-color: red;
  background: #fef2f2;
}

.info {
  margin-top: 16px;
  padding: 12px;
  font-size: 13px;
  border-radius: 6px;
  background: #f1f5f9;
  line-height: 1.6;
}`;

const defaultHTML = `<div style="text-align:center;padding:20px;">
  <div class="btn">.btn 元素</div>
</div>
<div class="info">
  <strong>优先级顺序（从低到高）:</strong><br>
  @layer reset &lt; @layer base &lt; @layer theme &lt; 未分层样式<br><br>
  当前：未分层样式（红色）优先级最高，覆盖所有 @layer 规则。
</div>`;

const presets = [
  {
    label: '默认顺序 (未分层最高)',
    css: `@layer reset, base, theme;
@layer reset { .btn { color: gray; padding: 10px 20px; border: 2px solid gray; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; } }
@layer base { .btn { color: blue; border-color: blue; background: #eff6ff; } }
@layer theme { .btn { color: purple; border-color: purple; background: #faf5ff; } }
.btn { color: red; border-color: red; background: #fef2f2; }
.info { margin-top: 16px; padding: 12px; font-size: 13px; border-radius: 6px; background: #f1f5f9; line-height: 1.6; }`,
  },
  {
    label: '仅分层 (theme 最高)',
    css: `@layer reset, base, theme;
@layer reset { .btn { color: gray; padding: 10px 20px; border: 2px solid gray; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; } }
@layer base { .btn { color: blue; border-color: blue; background: #eff6ff; } }
@layer theme { .btn { color: purple; border-color: purple; background: #faf5ff; } }
.info { margin-top: 16px; padding: 12px; font-size: 13px; border-radius: 6px; background: #f1f5f9; line-height: 1.6; }`,
    html: `<div style="text-align:center;padding:20px;">
  <div class="btn">.btn 元素</div>
</div>
<div class="info">
  <strong>优先级:</strong> reset &lt; base &lt; theme<br>
  没有未分层样式，theme 层最后声明，优先级最高（紫色）。
</div>`,
  },
  {
    label: '逆序 (reset 最高)',
    css: `@layer theme, base, reset;
@layer reset { .btn { color: gray; padding: 10px 20px; border: 2px solid gray; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; background: #f1f5f9; } }
@layer base { .btn { color: blue; border-color: blue; background: #eff6ff; } }
@layer theme { .btn { color: purple; border-color: purple; background: #faf5ff; } }
.info { margin-top: 16px; padding: 12px; font-size: 13px; border-radius: 6px; background: #f1f5f9; line-height: 1.6; }`,
    html: `<div style="text-align:center;padding:20px;">
  <div class="btn">.btn 元素</div>
</div>
<div class="info">
  <strong>优先级:</strong> theme &lt; base &lt; reset<br>
  逆序声明后 reset 在最后，优先级最高（灰色）。
</div>`,
  },
  {
    label: '无分层样式覆盖',
    css: `@layer reset, base;
@layer reset { .btn { color: gray; padding: 10px 20px; border: 2px solid gray; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; } }
@layer base { .btn { color: blue; border-color: blue; background: #eff6ff; } }
.btn { color: orange; border-color: orange; background: #fff7ed; }
.info { margin-top: 16px; padding: 12px; font-size: 13px; border-radius: 6px; background: #f1f5f9; line-height: 1.6; }`,
    html: `<div style="text-align:center;padding:20px;">
  <div class="btn">.btn 元素</div>
</div>
<div class="info">
  <strong>优先级:</strong> @layer reset &lt; @layer base &lt; 未分层<br>
  未分层样式（橙色）始终优先于所有 @layer。
</div>`,
  },
];

export function CascadeLayerDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
