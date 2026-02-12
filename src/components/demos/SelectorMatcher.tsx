'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.active {
  background: #dbeafe;
  border: 2px solid #3b82f6;
  color: #1e40af;
  font-weight: bold;
}

/* 基础样式 */
.container { padding: 12px; font-family: sans-serif; }
h1 { font-size: 18px; margin: 8px 0; }
p { margin: 6px 0; font-size: 14px; }
ul { margin: 8px 0; padding-left: 20px; }
li { padding: 4px 0; font-size: 14px; }
.intro { font-style: italic; }`;

const defaultHTML = `<div class="container">
  <h1 id="title">Hello World</h1>
  <p class="intro">First paragraph</p>
  <ul>
    <li class="active">Item 1</li>
    <li>Item 2</li>
    <li class="active">Item 3</li>
  </ul>
  <p>Second paragraph</p>
</div>`;

const presets = [
  {
    label: '.active (类)',
    css: `.active { background: #dbeafe; border: 2px solid #3b82f6; padding: 4px 8px; border-radius: 4px; }
.container { padding: 12px; font-family: sans-serif; }
h1 { font-size: 18px; margin: 8px 0; } p { margin: 6px 0; font-size: 14px; }
ul { margin: 8px 0; padding-left: 20px; } li { padding: 4px 0; font-size: 14px; } .intro { font-style: italic; }`,
  },
  {
    label: '#title (ID)',
    css: `#title { background: #fef3c7; border: 2px solid #f59e0b; padding: 4px 8px; border-radius: 4px; }
.container { padding: 12px; font-family: sans-serif; }
h1 { font-size: 18px; margin: 8px 0; } p { margin: 6px 0; font-size: 14px; }
ul { margin: 8px 0; padding-left: 20px; } li { padding: 4px 0; font-size: 14px; } .intro { font-style: italic; }`,
  },
  {
    label: 'ul > li (子代)',
    css: `ul > li { background: #dcfce7; border-left: 3px solid #22c55e; padding-left: 8px; }
.container { padding: 12px; font-family: sans-serif; }
h1 { font-size: 18px; margin: 8px 0; } p { margin: 6px 0; font-size: 14px; }
ul { margin: 8px 0; padding-left: 20px; } li { padding: 4px 0; font-size: 14px; } .intro { font-style: italic; }`,
  },
  {
    label: 'h1 + p (相邻兄弟)',
    css: `h1 + p { background: #f3e8ff; border: 2px solid #a855f7; padding: 4px 8px; border-radius: 4px; }
.container { padding: 12px; font-family: sans-serif; }
h1 { font-size: 18px; margin: 8px 0; } p { margin: 6px 0; font-size: 14px; }
ul { margin: 8px 0; padding-left: 20px; } li { padding: 4px 0; font-size: 14px; } .intro { font-style: italic; }`,
  },
  {
    label: 'li:first-child (伪类)',
    css: `li:first-child { background: #fee2e2; border: 2px solid #ef4444; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
.container { padding: 12px; font-family: sans-serif; }
h1 { font-size: 18px; margin: 8px 0; } p { margin: 6px 0; font-size: 14px; }
ul { margin: 8px 0; padding-left: 20px; } li { padding: 4px 0; font-size: 14px; } .intro { font-style: italic; }`,
  },
];

export function SelectorMatcher() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={260} />;
}
