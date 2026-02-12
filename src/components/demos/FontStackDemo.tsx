'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.sample {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
}
.stack {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.note {
  font-size: 13px;
  color: #666;
  border-left: 3px solid #3b82f6;
  padding-left: 12px;
  margin-top: 16px;
}`;

const defaultHTML = `<div class="stack">font-family: system-ui, -apple-system, sans-serif;</div>
<div class="sample">The quick brown fox jumps over the lazy dog. 快速的棕色狐狸跳过懒狗。</div>
<div class="note">
  <p><strong>回退机制：</strong>浏览器从左到右检查每个字体，使用第一个可用的字体进行渲染。</p>
  <p>通用字体族（serif、sans-serif、monospace）始终可用，建议作为最后的回退选项。</p>
</div>`;

const presets = [
  {
    label: '系统默认',
    css: `.sample {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
}
.stack {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.note { font-size: 13px; color: #666; border-left: 3px solid #3b82f6; padding-left: 12px; margin-top: 16px; }`,
    html: `<div class="stack">font-family: system-ui, -apple-system, sans-serif;</div>
<div class="sample">The quick brown fox jumps over the lazy dog. 快速的棕色狐狸跳过懒狗。</div>
<div class="note"><p>系统 UI 字体栈 -- 使用操作系统原生字体，视觉一致性最好。</p></div>`,
  },
  {
    label: '等宽字体',
    css: `.sample {
  font-family: 'Courier New', 'Fira Code', monospace;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
}
.stack {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.note { font-size: 13px; color: #666; border-left: 3px solid #3b82f6; padding-left: 12px; margin-top: 16px; }`,
    html: `<div class="stack">font-family: 'Courier New', 'Fira Code', monospace;</div>
<div class="sample">The quick brown fox jumps over the lazy dog. 快速的棕色狐狸跳过懒狗。</div>
<div class="note"><p>等宽字体栈 -- 每个字符占据相同宽度，适合代码展示。</p></div>`,
  },
  {
    label: '衬线字体',
    css: `.sample {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
}
.stack {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.note { font-size: 13px; color: #666; border-left: 3px solid #3b82f6; padding-left: 12px; margin-top: 16px; }`,
    html: `<div class="stack">font-family: Georgia, 'Times New Roman', serif;</div>
<div class="sample">The quick brown fox jumps over the lazy dog. 快速的棕色狐狸跳过懒狗。</div>
<div class="note"><p>衬线字体栈 -- 字母笔画末端有装饰线，传统印刷风格。</p></div>`,
  },
  {
    label: '中文优先',
    css: `.sample {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
}
.stack {
  font-family: monospace;
  font-size: 13px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.note { font-size: 13px; color: #666; border-left: 3px solid #3b82f6; padding-left: 12px; margin-top: 16px; }`,
    html: `<div class="stack">font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;</div>
<div class="sample">The quick brown fox jumps over the lazy dog. 快速的棕色狐狸跳过懒狗。</div>
<div class="note"><p>中文优先字体栈 -- 优先使用苹方（macOS）或微软雅黑（Windows）。</p></div>`,
  },
];

export function FontStackDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={200}
    />
  );
}
