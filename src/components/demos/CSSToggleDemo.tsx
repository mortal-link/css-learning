'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.page {
  font-family: system-ui, sans-serif;
  padding: 20px;
  max-width: 600px;
  line-height: 1.6;
}
.heading {
  color: #2563eb;
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 600;
}
.paragraph {
  color: #374151;
  margin-bottom: 16px;
}
.link {
  color: #2563eb;
  text-decoration: none;
  border-bottom: 1px solid #2563eb;
}
.list {
  list-style: disc;
  padding-left: 24px;
  color: #4b5563;
}`;

const defaultHTML = `<div class="page">
  <h1 class="heading">欢迎来到 CSS 世界</h1>
  <p class="paragraph">
    CSS（层叠样式表）将<strong>内容</strong>与<strong>表现</strong>分离，
    让我们可以用同一份 HTML 创建完全不同的视觉效果。
  </p>
  <a href="#" class="link">了解更多</a>
  <ul class="list">
    <li>可维护性更强</li>
    <li>样式可复用</li>
    <li>加载速度更快</li>
  </ul>
</div>`;

const presets = [
  {
    label: '简约主题',
    css: `.page { font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; line-height: 1.6; }
.heading { color: #2563eb; font-size: 24px; margin-bottom: 12px; font-weight: 600; }
.paragraph { color: #374151; margin-bottom: 16px; }
.link { color: #2563eb; text-decoration: none; border-bottom: 1px solid #2563eb; }
.list { list-style: disc; padding-left: 24px; color: #4b5563; }`,
  },
  {
    label: '彩色主题',
    css: `.page { font-family: 'Comic Sans MS', cursive, sans-serif; padding: 24px; max-width: 600px; background: linear-gradient(135deg, #fef3c7, #fce7f3); border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.heading { color: #db2777; font-size: 28px; margin-bottom: 16px; text-shadow: 2px 2px 4px rgba(219,39,119,0.2); font-weight: 700; }
.paragraph { color: #7c3aed; margin-bottom: 20px; font-size: 16px; }
.link { color: #059669; text-decoration: underline; font-weight: 600; }
.list { list-style: square; padding-left: 28px; color: #ea580c; font-weight: 500; }`,
  },
  {
    label: '暗色主题',
    css: `.page { font-family: 'Courier New', monospace; padding: 24px; max-width: 600px; background: #1f2937; border: 1px solid #374151; border-radius: 8px; }
.heading { color: #60a5fa; font-size: 26px; margin-bottom: 14px; font-weight: 700; letter-spacing: -0.5px; }
.paragraph { color: #d1d5db; margin-bottom: 18px; line-height: 1.7; }
.link { color: #34d399; text-decoration: none; border-bottom: 1px dashed #34d399; }
.list { list-style: circle; padding-left: 26px; color: #9ca3af; line-height: 1.8; }`,
  },
  {
    label: '禁用 CSS',
    css: `/* 无样式 — 浏览器默认渲染 */`,
  },
];

export function CSSToggleDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
