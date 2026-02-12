'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.type-card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 10px;
}
.type-card h3 {
  font-family: monospace;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}
.type-card p {
  font-size: 13px;
  color: #666;
}
.type-card code {
  font-size: 12px;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 3px;
}

.active { border-color: #3b82f6; background: #eff6ff; }
.active h3 { color: #3b82f6; }

.deprecated {
  opacity: 0.5;
  border-style: dashed;
}
.deprecated h3 { text-decoration: line-through; }

h2 { font-size: 15px; font-weight: 700; margin: 16px 0 8px; }`;

const defaultHTML = `<h2>现行媒体类型</h2>
<div class="type-card active">
  <h3>screen</h3>
  <p>用于屏幕设备（电脑、平板、手机等）</p>
  <p><code>@media screen { ... }</code></p>
</div>
<div class="type-card">
  <h3>all</h3>
  <p>适用于所有设备（默认值）</p>
  <p><code>@media all { ... }</code></p>
</div>
<div class="type-card">
  <h3>print</h3>
  <p>用于打印预览和打印页面</p>
  <p><code>@media print { ... }</code></p>
</div>
<div class="type-card">
  <h3>speech</h3>
  <p>用于语音合成器和屏幕阅读器</p>
  <p><code>@media speech { ... }</code></p>
</div>

<h2>已弃用的媒体类型</h2>
<div class="type-card deprecated"><h3>tty</h3><p>电传打字机和终端</p></div>
<div class="type-card deprecated"><h3>tv</h3><p>电视设备</p></div>
<div class="type-card deprecated"><h3>projection</h3><p>投影仪</p></div>
<div class="type-card deprecated"><h3>handheld</h3><p>手持设备</p></div>`;

const presets = [
  {
    label: 'screen 样式',
    css: `@media screen {
  .demo { background: linear-gradient(135deg, #dbeafe, #e9d5ff); padding: 20px; border-radius: 6px; }
  .demo h2 { font-size: 22px; font-weight: bold; margin-bottom: 8px; }
  .demo p { color: #4b5563; }
  .demo .color-bar { display: flex; gap: 8px; margin-top: 12px; }
  .demo .swatch { width: 40px; height: 40px; border-radius: 6px; }
}
.info { font-size: 12px; color: #666; margin-top: 12px; }`,
    html: `<div class="demo">
  <h2>屏幕视图</h2>
  <p>针对屏幕优化，包含丰富的颜色和交互效果。</p>
  <div class="color-bar">
    <div class="swatch" style="background:#3b82f6"></div>
    <div class="swatch" style="background:#8b5cf6"></div>
    <div class="swatch" style="background:#ec4899"></div>
  </div>
</div>
<div class="info">@media screen { ... } -- 只在屏幕设备上生效</div>`,
  },
  {
    label: 'print 样式',
    css: `@media print {
  body { font-family: Georgia, serif; }
  .nav, .sidebar { display: none; }
  a::after { content: " (" attr(href) ")"; font-size: 12px; color: #666; }
}

/* 模拟打印样式（始终显示） */
.print-preview {
  font-family: Georgia, serif;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 6px;
}
.print-preview h2 { font-size: 20px; font-weight: bold; margin-bottom: 8px; }
.print-preview p { line-height: 1.7; font-size: 14px; }
.print-preview .footer { border-top: 1px solid #ccc; padding-top: 8px; margin-top: 16px; font-size: 12px; color: #999; }
.info { font-size: 12px; color: #666; margin-top: 12px; }`,
    html: `<div class="print-preview">
  <h2>文档标题</h2>
  <p>这是针对打印优化的视图。移除了背景色、阴影和装饰效果，使用更适合打印的衬线字体。</p>
  <div class="footer">打印日期: 2025-01-01</div>
</div>
<div class="info">@media print { ... } -- 只在打印时生效，隐藏导航等非必要元素</div>`,
  },
  {
    label: 'all 样式',
    css: `.type-card { border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; margin-bottom: 10px; }
.type-card h3 { font-family: monospace; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
.type-card p { font-size: 13px; color: #666; }
.type-card code { font-size: 12px; background: #f1f5f9; padding: 2px 6px; border-radius: 3px; }
.active { border-color: #3b82f6; background: #eff6ff; }
.active h3 { color: #3b82f6; }
.deprecated { opacity: 0.5; border-style: dashed; }
.deprecated h3 { text-decoration: line-through; }
h2 { font-size: 15px; font-weight: 700; margin: 16px 0 8px; }`,
  },
  {
    label: '类型选择器对比',
    css: `table { border-collapse: collapse; width: 100%; font-size: 13px; }
th, td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
th { background: #f8fafc; font-weight: 600; }
.yes { color: #16a34a; font-weight: bold; }
.no  { color: #dc2626; }
.dep { color: #9ca3af; font-style: italic; }`,
    html: `<table>
  <tr><th>媒体类型</th><th>屏幕</th><th>打印</th><th>语音</th><th>状态</th></tr>
  <tr><td><code>all</code></td><td class="yes">Y</td><td class="yes">Y</td><td class="yes">Y</td><td>现行</td></tr>
  <tr><td><code>screen</code></td><td class="yes">Y</td><td class="no">N</td><td class="no">N</td><td>现行</td></tr>
  <tr><td><code>print</code></td><td class="no">N</td><td class="yes">Y</td><td class="no">N</td><td>现行</td></tr>
  <tr><td><code>speech</code></td><td class="no">N</td><td class="no">N</td><td class="yes">Y</td><td>现行</td></tr>
  <tr><td class="dep">tty, tv, projection...</td><td colspan="3" class="dep">不再使用</td><td class="dep">已弃用</td></tr>
</table>`,
  },
];

export function MediaTypeDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={480}
    />
  );
}
