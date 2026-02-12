'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.multicol {
  column-count: 3;
  column-gap: 30px;
  column-rule: 2px solid #667eea;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`;

const defaultHTML = `<div class="multicol">
  多列布局不仅可以设置列数和列宽，还可以通过 column-gap 控制列之间的间隔，通过 column-rule 属性在列之间添加分隔线。column-rule 是一个简写属性，包含 column-rule-width、column-rule-style 和 column-rule-color 三个子属性。这些特性使得多列布局更加美观和易读。
</div>`;

const presets = [
  {
    label: '细线分隔',
    css: `.multicol {
  column-count: 3;
  column-gap: 30px;
  column-rule: 1px solid #cbd5e0;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
  {
    label: '虚线蓝色',
    css: `.multicol {
  column-count: 3;
  column-gap: 40px;
  column-rule: 2px dashed #667eea;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
  {
    label: '粗双线紫色',
    css: `.multicol {
  column-count: 3;
  column-gap: 50px;
  column-rule: 6px double #764ba2;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
  {
    label: '无间隔无线',
    css: `.multicol {
  column-count: 3;
  column-gap: 0;
  column-rule: none;
  padding: 8px;
  font-size: 14px;
  line-height: 1.8;
}`,
  },
];

export function ColumnRuleDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={240}
    />
  );
}
