'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 多列布局 */
.multicol {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`;

const defaultHTML = `<div class="multicol">
  CSS 多列布局模块定义了一种多列布局方式，可以将内容像报纸一样排列成多列。这种布局方式非常适合展示大量文本内容，能够提升阅读体验。通过设置 column-count 或 column-width 属性，可以控制列的数量或宽度。浏览器会自动将内容流入到各个列中，并在列之间进行平衡。多列布局还支持列间隔、列规则线等特性，让布局更加灵活美观。
</div>`;

const presets = [
  {
    label: '2 列',
    css: `.multicol {
  column-count: 2;
  column-gap: 24px;
  column-rule: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
  {
    label: '3 列',
    css: `.multicol {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
  {
    label: 'column-width 自动',
    css: `/* 浏览器根据可用宽度自动决定列数 */
.multicol {
  column-width: 180px;
  column-gap: 20px;
  column-rule: 1px dashed #999;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
  {
    label: 'columns 简写',
    css: `/* columns: <count> <width> */
.multicol {
  columns: 3 150px;
  column-gap: 16px;
  column-rule: 2px solid #667eea;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
];

export function MulticolDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
