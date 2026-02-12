'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo-text {
  font-size: 28px;
  font-weight: 500;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #6366f1;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}`;

const defaultHTML = `<p class="demo-text">文本装饰效果演示 Text Decoration Demo</p>`;

const presets = [
  {
    label: '下划线',
    css: `.demo-text {
  font-size: 28px;
  font-weight: 500;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #6366f1;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}`,
  },
  {
    label: '删除线',
    css: `.demo-text {
  font-size: 28px;
  font-weight: 500;
  text-decoration-line: line-through;
  text-decoration-style: solid;
  text-decoration-color: #ef4444;
  text-decoration-thickness: 2px;
}`,
  },
  {
    label: '波浪线',
    css: `.demo-text {
  font-size: 28px;
  font-weight: 500;
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: #ec4899;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}`,
  },
  {
    label: '装饰组合',
    css: `.demo-text {
  font-size: 28px;
  font-weight: 500;
  text-decoration-line: underline overline;
  text-decoration-style: double;
  text-decoration-color: #8b5cf6;
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
}`,
  },
  {
    label: '上划线虚线',
    css: `.demo-text {
  font-size: 28px;
  font-weight: 500;
  text-decoration-line: overline;
  text-decoration-style: dashed;
  text-decoration-color: #f59e0b;
  text-decoration-thickness: 2px;
}`,
  },
];

export function TextDecorationDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={120}
    />
  );
}
