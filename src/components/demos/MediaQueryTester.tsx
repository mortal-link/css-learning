'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box {
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background: #dbeafe;
  color: #1e40af;
  transition: all 0.3s;
}

/* 宽度小于 300px */
@media (max-width: 299px) {
  .box {
    background: #fecaca;
    color: #991b1b;
  }
  .box::after { content: " (< 300px)"; }
}

/* 宽度 300-499px */
@media (min-width: 300px) and (max-width: 499px) {
  .box {
    background: #fed7aa;
    color: #9a3412;
  }
  .box::after { content: " (300-499px)"; }
}

/* 宽度 >= 500px */
@media (min-width: 500px) {
  .box {
    background: #bbf7d0;
    color: #166534;
  }
  .box::after { content: " (>= 500px)"; }
}

.info {
  margin-top: 16px;
  font-size: 13px;
  color: #666;
  border-left: 3px solid #3b82f6;
  padding-left: 10px;
}`;

const defaultHTML = `<div class="box">当前断点</div>
<div class="info">
  <p>调整 iframe 宽度或编辑 CSS 中的 @media 查询来观察变化。</p>
  <p>iframe 的宽度就是媒体查询检测的宽度。</p>
</div>`;

const presets = [
  {
    label: '断点颜色',
    css: `.box {
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background: #dbeafe;
  color: #1e40af;
}

@media (max-width: 299px) {
  .box { background: #fecaca; color: #991b1b; }
  .box::after { content: " (< 300px)"; }
}
@media (min-width: 300px) and (max-width: 499px) {
  .box { background: #fed7aa; color: #9a3412; }
  .box::after { content: " (300-499px)"; }
}
@media (min-width: 500px) {
  .box { background: #bbf7d0; color: #166534; }
  .box::after { content: " (>= 500px)"; }
}

.info { margin-top: 16px; font-size: 13px; color: #666; border-left: 3px solid #3b82f6; padding-left: 10px; }`,
  },
  {
    label: '响应式栅格',
    css: `.grid {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
}
.cell {
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #1e40af;
}

@media (min-width: 400px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

.info { margin-top: 12px; font-size: 12px; color: #666; }`,
    html: `<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>
<div class="info">< 400px: 1列 | 400-599px: 2列 | >= 600px: 3列</div>`,
  },
  {
    label: '隐藏/显示元素',
    css: `.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 500px) {
  .mobile-only { display: none; }
  .desktop-only { display: block; }
}

.box {
  padding: 16px;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
}
.mobile-only { background: #fef3c7; color: #92400e; }
.desktop-only { background: #d1fae5; color: #065f46; }
.info { margin-top: 12px; font-size: 12px; color: #666; }`,
    html: `<div class="box mobile-only">移动端内容 (< 500px 显示)</div>
<div class="box desktop-only">桌面端内容 (>= 500px 显示)</div>
<div class="info">使用 @media 查询控制元素在不同宽度下的显示/隐藏。</div>`,
  },
  {
    label: '暗色模式',
    css: `body { background: white; color: #1a1a1a; }

@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #e5e5e5; }
  .box { background: #334155; color: #e2e8f0; border-color: #475569; }
}

.box {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 15px;
}
.info { margin-top: 12px; font-size: 12px; color: #999; }`,
    html: `<div class="box">
  <p>这段文字会根据系统暗色模式自动切换样式。</p>
</div>
<div class="info">使用 prefers-color-scheme 媒体特性检测暗色模式。</div>`,
  },
];

export function MediaQueryTester() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={200}
    />
  );
}
