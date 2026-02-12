'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.category {
  margin-bottom: 16px;
}
.category h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid;
}
.cat-viewport h3 { border-color: #3b82f6; color: #3b82f6; }
.cat-display h3  { border-color: #10b981; color: #10b981; }
.cat-pref h3     { border-color: #8b5cf6; color: #8b5cf6; }
.cat-interact h3 { border-color: #f59e0b; color: #f59e0b; }

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
}
.feature {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px;
}
.feature .name { font-size: 11px; color: #999; font-family: monospace; }
.feature .label { font-size: 13px; font-weight: 600; margin: 2px 0; }
.feature .query {
  font-size: 11px;
  font-family: monospace;
  background: #f1f5f9;
  padding: 3px 6px;
  border-radius: 3px;
  margin-top: 4px;
  word-break: break-all;
}

.cat-viewport .feature { border-left: 3px solid #3b82f6; }
.cat-display .feature  { border-left: 3px solid #10b981; }
.cat-pref .feature     { border-left: 3px solid #8b5cf6; }
.cat-interact .feature { border-left: 3px solid #f59e0b; }`;

const defaultHTML = `<div class="category cat-viewport">
  <h3>视口特性</h3>
  <div class="features">
    <div class="feature"><div class="name">width</div><div class="label">视口宽度</div><div class="query">@media (min-width: 768px)</div></div>
    <div class="feature"><div class="name">height</div><div class="label">视口高度</div><div class="query">@media (min-height: 600px)</div></div>
    <div class="feature"><div class="name">aspect-ratio</div><div class="label">宽高比</div><div class="query">@media (aspect-ratio: 16/9)</div></div>
    <div class="feature"><div class="name">orientation</div><div class="label">方向</div><div class="query">@media (orientation: landscape)</div></div>
  </div>
</div>

<div class="category cat-display">
  <h3>显示质量</h3>
  <div class="features">
    <div class="feature"><div class="name">resolution</div><div class="label">分辨率</div><div class="query">@media (min-resolution: 2dppx)</div></div>
    <div class="feature"><div class="name">color</div><div class="label">颜色位深</div><div class="query">@media (color)</div></div>
    <div class="feature"><div class="name">color-gamut</div><div class="label">色域</div><div class="query">@media (color-gamut: p3)</div></div>
  </div>
</div>

<div class="category cat-pref">
  <h3>用户偏好</h3>
  <div class="features">
    <div class="feature"><div class="name">prefers-color-scheme</div><div class="label">配色方案</div><div class="query">@media (prefers-color-scheme: dark)</div></div>
    <div class="feature"><div class="name">prefers-reduced-motion</div><div class="label">减少动画</div><div class="query">@media (prefers-reduced-motion: reduce)</div></div>
    <div class="feature"><div class="name">prefers-contrast</div><div class="label">对比度</div><div class="query">@media (prefers-contrast: high)</div></div>
  </div>
</div>

<div class="category cat-interact">
  <h3>交互能力</h3>
  <div class="features">
    <div class="feature"><div class="name">hover</div><div class="label">悬停能力</div><div class="query">@media (hover: hover)</div></div>
    <div class="feature"><div class="name">pointer</div><div class="label">指针精度</div><div class="query">@media (pointer: fine)</div></div>
  </div>
</div>`;

const presets = [
  {
    label: '全部特性',
    css: `.category { margin-bottom: 16px; }
.category h3 { font-size: 14px; font-weight: 700; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 2px solid; }
.cat-viewport h3 { border-color: #3b82f6; color: #3b82f6; }
.cat-display h3  { border-color: #10b981; color: #10b981; }
.cat-pref h3     { border-color: #8b5cf6; color: #8b5cf6; }
.cat-interact h3 { border-color: #f59e0b; color: #f59e0b; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; }
.feature { border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; }
.feature .name { font-size: 11px; color: #999; font-family: monospace; }
.feature .label { font-size: 13px; font-weight: 600; margin: 2px 0; }
.feature .query { font-size: 11px; font-family: monospace; background: #f1f5f9; padding: 3px 6px; border-radius: 3px; margin-top: 4px; word-break: break-all; }
.cat-viewport .feature { border-left: 3px solid #3b82f6; }
.cat-display .feature  { border-left: 3px solid #10b981; }
.cat-pref .feature     { border-left: 3px solid #8b5cf6; }
.cat-interact .feature { border-left: 3px solid #f59e0b; }`,
  },
  {
    label: '宽度响应',
    css: `.box {
  padding: 20px;
  border-radius: 6px;
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  background: #fee2e2;
  color: #991b1b;
}
.box::after { content: " -- 窄屏 (< 400px)"; }

@media (min-width: 400px) {
  .box { background: #fef3c7; color: #92400e; }
  .box::after { content: " -- 中等 (400-599px)"; }
}
@media (min-width: 600px) {
  .box { background: #d1fae5; color: #065f46; }
  .box::after { content: " -- 宽屏 (>= 600px)"; }
}
.note { font-size: 12px; color: #666; margin-top: 12px; }`,
    html: `<div class="box">当前宽度</div>
<div class="note">iframe 宽度就是 @media 查询检测的宽度，调整后观察变化。</div>`,
  },
  {
    label: '组合查询',
    css: `.example { border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; margin-bottom: 10px; }
.example h3 { font-size: 13px; color: #3b82f6; font-family: monospace; margin-bottom: 6px; }
.example pre { font-size: 12px; font-family: monospace; background: #f8fafc; padding: 10px; border-radius: 4px; white-space: pre-wrap; line-height: 1.5; }`,
    html: `<div class="example">
  <h3>AND 组合</h3>
  <pre>@media (min-width: 768px) and (orientation: landscape) {
  /* 宽屏且横向 */
}</pre>
</div>
<div class="example">
  <h3>OR 组合（逗号）</h3>
  <pre>@media (max-width: 599px), (orientation: portrait) {
  /* 窄屏 或 竖向 */
}</pre>
</div>
<div class="example">
  <h3>NOT 否定</h3>
  <pre>@media not print {
  /* 非打印设备 */
}</pre>
</div>
<div class="example">
  <h3>范围语法 (Level 4)</h3>
  <pre>@media (400px <= width <= 800px) {
  /* 宽度在 400-800px 之间 */
}</pre>
</div>`,
  },
  {
    label: '用户偏好',
    css: `.example { border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; margin-bottom: 10px; }
.example h3 { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
.example pre { font-size: 12px; font-family: monospace; background: #f8fafc; padding: 10px; border-radius: 4px; white-space: pre-wrap; line-height: 1.5; }
.example .desc { font-size: 12px; color: #666; margin-top: 6px; }`,
    html: `<div class="example">
  <h3>暗色模式</h3>
  <pre>@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #eee; }
}</pre>
  <div class="desc">检测用户系统是否启用暗色模式。</div>
</div>
<div class="example">
  <h3>减少动画</h3>
  <pre>@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}</pre>
  <div class="desc">尊重用户的辅助功能设置，移除动画。</div>
</div>
<div class="example">
  <h3>高对比度</h3>
  <pre>@media (prefers-contrast: high) {
  body { border: 2px solid; }
}</pre>
  <div class="desc">增强视觉对比度，提升可读性。</div>
</div>`,
  },
];

export function MediaFeatureDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={520}
    />
  );
}
