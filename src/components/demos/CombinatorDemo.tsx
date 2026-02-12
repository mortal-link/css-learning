'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultHTML = `<div class="container">
  <header>
    <h1>Title</h1>
    <nav>nav</nav>
  </header>
  <main>
    <h2>Heading</h2>
    <section>
      <p>Paragraph 1 (inside section)</p>
      <p>Paragraph 2 (inside section)</p>
    </section>
    <p>Paragraph 3 (direct child of main)</p>
  </main>
  <footer>footer</footer>
</div>`;

const defaultCSS = `/* 后代选择器: div p — 匹配所有后代 <p> */
div p {
  background: #dbeafe;
  border: 2px solid #3b82f6;
  padding: 6px 10px;
  border-radius: 4px;
}

/* 基础样式 */
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
header, main, section, footer, nav { padding: 8px; margin: 4px 0; }
h1, h2, p { margin: 4px 0; }`;

const presets = [
  {
    label: '后代 (space)',
    css: `div p { background: #dbeafe; border: 2px solid #3b82f6; padding: 6px 10px; border-radius: 4px; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
header, main, section, footer, nav { padding: 8px; margin: 4px 0; } h1, h2, p { margin: 4px 0; }`,
  },
  {
    label: '子元素 (>)',
    css: `main > p { background: #dcfce7; border: 2px solid #22c55e; padding: 6px 10px; border-radius: 4px; font-weight: bold; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
header, main, section, footer, nav { padding: 8px; margin: 4px 0; } h1, h2, p { margin: 4px 0; }`,
  },
  {
    label: '相邻兄弟 (+)',
    css: `h2 + section { background: #fef3c7; border: 2px solid #f59e0b; padding: 10px; border-radius: 4px; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
header, main, section, footer, nav { padding: 8px; margin: 4px 0; } h1, h2, p { margin: 4px 0; }`,
  },
  {
    label: '通用兄弟 (~)',
    css: `h2 ~ p { background: #f3e8ff; border: 2px solid #a855f7; padding: 6px 10px; border-radius: 4px; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
header, main, section, footer, nav { padding: 8px; margin: 4px 0; } h1, h2, p { margin: 4px 0; }`,
  },
];

export function CombinatorDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={320} />;
}
