'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultHTML = `<p class="quote">CSS 层叠样式表是一种用于描述 HTML 文档样式的语言。它可以控制网页的布局、颜色、字体等视觉表现。通过 CSS，我们可以将内容与表现分离。</p>`;

const defaultCSS = `/* ::before 和 ::after 装饰引号 */
.quote::before {
  content: "\\201C";
  color: #3b82f6;
  font-size: 2em;
  margin-right: 0.25em;
}
.quote::after {
  content: "\\201D";
  color: #3b82f6;
  font-size: 2em;
  margin-left: 0.25em;
}
.quote {
  font-size: 15px;
  line-height: 1.8;
  padding: 16px;
  margin: 12px;
}`;

const presets = [
  {
    label: '装饰引号',
    css: `.quote::before { content: "\\201C"; color: #3b82f6; font-size: 2em; margin-right: 0.25em; }
.quote::after { content: "\\201D"; color: #3b82f6; font-size: 2em; margin-left: 0.25em; }
.quote { font-size: 15px; line-height: 1.8; padding: 16px; margin: 12px; }`,
  },
  {
    label: '首字下沉',
    css: `.quote::first-letter { font-size: 3em; font-weight: bold; color: #ef4444; float: left; line-height: 0.8; margin-right: 0.1em; margin-top: 0.05em; }
.quote { font-size: 15px; line-height: 1.8; padding: 16px; margin: 12px; }`,
  },
  {
    label: '首行加粗',
    css: `.quote::first-line { font-weight: bold; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.05em; }
.quote { font-size: 15px; line-height: 1.8; padding: 16px; margin: 12px; }`,
  },
  {
    label: '自定义选中',
    css: `.quote::selection { background-color: #fbbf24; color: #000; }
.quote { font-size: 15px; line-height: 1.8; padding: 16px; margin: 12px; }
.hint { font-size: 12px; color: #666; padding: 8px 16px; }`,
    html: `<p class="quote">CSS 层叠样式表是一种用于描述 HTML 文档样式的语言。它可以控制网页的布局、颜色、字体等视觉表现。通过 CSS，我们可以将内容与表现分离。</p>
<p class="hint">请用鼠标选中上方文本，查看 ::selection 效果（黄色高亮）</p>`,
  },
  {
    label: '列表标记 ::marker',
    css: `li::marker { content: "\\2713  "; color: #22c55e; font-size: 1.2em; }
li { padding: 6px 0; font-size: 14px; }
ul { padding-left: 24px; margin: 12px; }`,
    html: `<ul>
  <li>第一项内容</li>
  <li>第二项内容</li>
  <li>第三项内容</li>
</ul>
<p style="font-size:12px;color:#666;padding:8px 12px">::marker 自定义列表标记符号</p>`,
  },
];

export function PseudoElementSelectorDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={240} />;
}
