'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultHTML = `<div id="main" class="container" data-type="content">
  <div class="highlight box" data-type="content">高亮框</div>
  <p class="text">段落文本</p>
  <span>行内元素</span>
  <div class="box" data-type="sidebar">侧边栏</div>
  <p id="footer">页脚段落</p>
</div>`;

const defaultCSS = `/* 类型选择器: 匹配所有 div */
div {
  border: 2px solid #3b82f6;
  background: #dbeafe;
  padding: 8px;
  margin: 4px 0;
  font-size: 14px;
}
p, span {
  padding: 8px;
  margin: 4px 0;
  font-size: 14px;
}`;

const presets = [
  {
    label: '类型选择器 (div)',
    css: `div { border: 2px solid #3b82f6; background: #dbeafe; padding: 8px; margin: 4px 0; font-size: 14px; }
p, span { padding: 8px; margin: 4px 0; font-size: 14px; }`,
  },
  {
    label: '类选择器 (.highlight)',
    css: `.highlight { border: 2px solid #f59e0b; background: #fef3c7; padding: 8px; font-weight: bold; }
div, p, span { padding: 8px; margin: 4px 0; font-size: 14px; }`,
  },
  {
    label: 'ID 选择器 (#main)',
    css: `#main { border: 2px solid #ef4444; background: #fee2e2; padding: 12px; }
div, p, span { padding: 8px; margin: 4px 0; font-size: 14px; }`,
  },
  {
    label: '通用选择器 (*)',
    css: `* { border: 1px solid #a855f7; background: #f3e8ff; padding: 6px; margin: 2px 0; font-size: 14px; box-sizing: border-box; }`,
  },
  {
    label: '属性选择器 ([data-type])',
    css: `[data-type] { border: 2px solid #22c55e; background: #dcfce7; padding: 8px; font-weight: bold; }
[data-type="sidebar"] { border-color: #0891b2; background: #cffafe; }
div, p, span { padding: 8px; margin: 4px 0; font-size: 14px; }`,
  },
];

export function SimpleSelectorDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={300} />;
}
