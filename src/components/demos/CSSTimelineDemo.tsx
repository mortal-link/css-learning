'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS1 (1996) — 基础样式能力 */
.demo {
  font-family: serif;
  color: #333;
  background: #fffff0;
  padding: 20px;
  border: 1px solid #ccc;
}
.demo h2 {
  color: navy;
  font-size: 22px;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 12px;
}
.demo p {
  text-align: justify;
  margin-bottom: 8px;
}
.demo a {
  color: blue;
  text-decoration: none;
}
.demo .list {
  list-style: square;
  padding-left: 24px;
  margin-top: 8px;
}`;

const defaultHTML = `<div class="demo">
  <h2>CSS 演进历程</h2>
  <p>从 CSS1 (1996) 的基础样式，到如今的模块化架构，CSS 经历了巨大的变革。</p>
  <p>点击预设按钮，体验不同时代的 CSS 能力。</p>
  <a href="#">了解更多 CSS 历史</a>
  <ul class="list">
    <li>CSS1: 字体、颜色、基础选择器</li>
    <li>CSS2: 定位、z-index、媒体类型</li>
    <li>CSS3+: Flex、Grid、动画、变量</li>
  </ul>
</div>`;

const presets = [
  {
    label: 'CSS1 (1996)',
    css: `/* CSS1: 基础选择器 + 字体 + 颜色 + 盒模型 */
.demo {
  font-family: Times, serif;
  color: #333;
  background: #fffff0;
  padding: 20px;
  margin: 10px;
  border: 1px solid #999;
}
.demo h2 {
  color: navy;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
}
.demo p { text-align: justify; margin-bottom: 8px; }
.demo a { color: blue; }
.demo .list { list-style: square; padding-left: 24px; }`,
  },
  {
    label: 'CSS2 (1998)',
    css: `/* CSS2: 定位 + z-index + 伪元素 + 表格布局 */
.demo {
  font-family: Verdana, sans-serif;
  color: #333;
  padding: 20px;
  position: relative;
  border: 1px solid #ccc;
  background: white;
}
.demo h2 {
  color: darkgreen;
  font-size: 22px;
  border-bottom: 2px solid darkgreen;
  padding-bottom: 6px;
}
.demo h2::before { content: ">> "; color: #999; }
.demo p { margin-bottom: 8px; }
.demo a { color: darkgreen; text-decoration: none; }
.demo a:hover { text-decoration: underline; }
.demo .list { list-style: disc; padding-left: 24px; }`,
  },
  {
    label: 'CSS3 模块化',
    css: `/* CSS3+: Flexbox + 圆角 + 阴影 + 渐变 + 过渡 + 变量 */
:root { --primary: #6366f1; --accent: #ec4899; }
.demo {
  font-family: system-ui, sans-serif;
  color: #1e293b;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.demo h2 {
  color: var(--primary);
  font-size: 22px;
  margin-bottom: 12px;
}
.demo p { margin-bottom: 10px; line-height: 1.6; }
.demo a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
}
.demo a:hover { border-bottom-color: var(--accent); }
.demo .list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin-top: 12px;
}
.demo .list li {
  padding: 6px 14px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 13px;
}`,
  },
  {
    label: 'CSS Grid + 动画',
    css: `/* 现代 CSS: Grid + 动画 + 容器查询 */
.demo {
  font-family: system-ui, sans-serif;
  padding: 24px;
  border-radius: 16px;
  background: #0f172a;
  color: #e2e8f0;
}
.demo h2 {
  color: #38bdf8;
  font-size: 24px;
  margin-bottom: 16px;
  animation: glow 2s ease-in-out infinite alternate;
}
@keyframes glow {
  from { text-shadow: 0 0 4px #38bdf8; }
  to { text-shadow: 0 0 16px #38bdf8, 0 0 30px #0ea5e9; }
}
.demo p { margin-bottom: 10px; line-height: 1.6; color: #94a3b8; }
.demo a { color: #a78bfa; text-decoration: none; }
.demo .list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
  list-style: none;
  padding: 0;
  margin-top: 16px;
}
.demo .list li {
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 13px;
  transition: transform 0.2s, border-color 0.2s;
}
.demo .list li:hover {
  transform: translateY(-2px);
  border-color: #38bdf8;
}`,
  },
];

export function CSSTimelineDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
