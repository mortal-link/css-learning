'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.bar {
  display: flex;
  margin-bottom: 16px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.bar .segment {
  flex: 1;
  padding: 10px 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
  opacity: 0.4;
}
.bar .segment.active { opacity: 1; }
.s-mobile  { background: #ef4444; }
.s-tablet  { background: #f59e0b; }
.s-laptop  { background: #10b981; }
.s-desktop { background: #3b82f6; }

.preview {
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 16px;
}
.preview .title {
  font-size: 18px;
  font-weight: bold;
  color: #3b82f6;
}
.preview .width-label {
  font-size: 13px;
  color: #666;
  margin: 4px 0 12px;
  font-family: monospace;
}
.grid {
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(2, 1fr);
}
.grid .cell {
  aspect-ratio: 1;
  border-radius: 4px;
  background: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6b7280;
}

@media (max-width: 399px) {
  .grid { grid-template-columns: 1fr; }
  .preview { border-color: #ef4444; }
  .preview .title { color: #ef4444; }
  .s-mobile { opacity: 1; }
}
@media (min-width: 400px) and (max-width: 599px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .preview { border-color: #f59e0b; }
  .preview .title { color: #f59e0b; }
  .s-tablet { opacity: 1; }
}
@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
  .preview { border-color: #10b981; }
  .preview .title { color: #10b981; }
  .s-laptop { opacity: 1; }
}`;

const defaultHTML = `<div class="bar">
  <div class="segment s-mobile">手机<br><small>< 400px</small></div>
  <div class="segment s-tablet">平板<br><small>400-599px</small></div>
  <div class="segment s-laptop">笔记本<br><small>600-899px</small></div>
  <div class="segment s-desktop">桌面<br><small>>= 900px</small></div>
</div>

<div class="preview">
  <div class="title">响应式视图</div>
  <div class="width-label">调整浏览器/iframe 宽度观察变化</div>
  <div class="grid">
    <div class="cell">1</div>
    <div class="cell">2</div>
    <div class="cell">3</div>
    <div class="cell">4</div>
    <div class="cell">5</div>
    <div class="cell">6</div>
    <div class="cell">7</div>
    <div class="cell">8</div>
  </div>
</div>`;

const presets = [
  {
    label: '断点指示器',
    css: `.bar { display: flex; margin-bottom: 16px; border-radius: 6px; overflow: hidden; border: 1px solid #e5e7eb; }
.bar .segment { flex: 1; padding: 10px 8px; text-align: center; font-size: 12px; font-weight: 600; color: white; opacity: 0.4; }
.s-mobile  { background: #ef4444; }
.s-tablet  { background: #f59e0b; }
.s-laptop  { background: #10b981; }
.s-desktop { background: #3b82f6; }
.preview { border: 2px solid #3b82f6; border-radius: 6px; padding: 16px; }
.preview .title { font-size: 18px; font-weight: bold; color: #3b82f6; }
.preview .width-label { font-size: 13px; color: #666; margin: 4px 0 12px; font-family: monospace; }
.grid { display: grid; gap: 6px; grid-template-columns: repeat(2, 1fr); }
.grid .cell { aspect-ratio: 1; border-radius: 4px; background: #dbeafe; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280; }
@media (max-width: 399px) { .grid { grid-template-columns: 1fr; } .preview { border-color: #ef4444; } .preview .title { color: #ef4444; } .s-mobile { opacity: 1; } }
@media (min-width: 400px) and (max-width: 599px) { .grid { grid-template-columns: repeat(2, 1fr); } .preview { border-color: #f59e0b; } .preview .title { color: #f59e0b; } .s-tablet { opacity: 1; } }
@media (min-width: 600px) { .grid { grid-template-columns: repeat(4, 1fr); } .preview { border-color: #10b981; } .preview .title { color: #10b981; } .s-laptop { opacity: 1; } }`,
  },
  {
    label: '媒体查询语法',
    css: `.example { border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; margin-bottom: 10px; }
.example h3 { font-size: 13px; color: #3b82f6; font-family: monospace; margin-bottom: 6px; }
.example pre { font-size: 12px; font-family: monospace; background: #f8fafc; padding: 10px; border-radius: 4px; white-space: pre-wrap; line-height: 1.5; }`,
    html: `<div class="example">
  <h3>基本语法</h3>
  <pre>@media (min-width: 768px) {
  .container { padding: 2rem; }
}</pre>
</div>
<div class="example">
  <h3>组合条件</h3>
  <pre>@media (min-width: 640px) and (max-width: 1023px) {
  .container { padding: 1.5rem; }
}</pre>
</div>
<div class="example">
  <h3>否定条件</h3>
  <pre>@media not print {
  .no-print { display: block; }
}</pre>
</div>`,
  },
  {
    label: '移动优先',
    css: `.box { padding: 12px; border: 2px solid #ef4444; border-radius: 6px; margin-bottom: 8px; font-size: 13px; }
.box::before { content: "基础样式 (移动优先)"; display: block; font-weight: bold; color: #ef4444; margin-bottom: 4px; }

@media (min-width: 400px) {
  .box { border-color: #f59e0b; }
  .box::before { content: "基础 + 平板样式 (>= 400px)"; color: #f59e0b; }
}
@media (min-width: 600px) {
  .box { border-color: #10b981; }
  .box::before { content: "基础 + 平板 + 桌面样式 (>= 600px)"; color: #10b981; }
}

.note { font-size: 12px; color: #666; border-left: 3px solid #3b82f6; padding-left: 10px; }`,
    html: `<div class="box">移动优先策略：从小屏开始，逐步增强。</div>
<div class="note">
  <p><strong>移动优先：</strong>使用 min-width 从小到大编写。</p>
  <p><strong>桌面优先：</strong>使用 max-width 从大到小编写。</p>
</div>`,
  },
];

export function MediaIntroDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
