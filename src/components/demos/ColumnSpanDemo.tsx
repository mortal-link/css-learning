'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  column-fill: balance;
  font-size: 14px;
  line-height: 1.6;
}

.heading {
  column-span: all;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  margin: 8px 0;
  background: #eef2ff;
  text-align: center;
  border-radius: 4px;
}`;

const defaultHTML = `<div class="container">
  <p>在多列布局中，有时我们需要让某个元素横跨所有列，比如文章标题或分节标题。</p>
  <h3 class="heading">多列布局中的跨列标题</h3>
  <p>column-span 属性可以实现这一效果。当设置为 all 时，元素会横跨所有列，打破列的流动。这对于创建杂志风格的布局非常有用。同时，column-fill 属性控制内容如何在各列之间分布。balance 会尽量让各列高度相等，而 auto 则按顺序填充。</p>
</div>`;

const presets = [
  {
    label: '标题跨列',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  column-fill: balance;
  font-size: 14px;
  line-height: 1.6;
}

.heading {
  column-span: all;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  margin: 8px 0;
  background: #eef2ff;
  text-align: center;
  border-radius: 4px;
}`,
  },
  {
    label: '不跨列',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  column-fill: balance;
  font-size: 14px;
  line-height: 1.6;
}

.heading {
  column-span: none;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  margin: 8px 0;
  background: #eef2ff;
  text-align: center;
  border-radius: 4px;
}`,
  },
  {
    label: 'column-fill: auto',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  column-fill: auto;
  height: 300px;
  font-size: 14px;
  line-height: 1.6;
}

.heading {
  column-span: all;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  margin: 8px 0;
  background: #eef2ff;
  text-align: center;
  border-radius: 4px;
}`,
  },
  {
    label: 'column-fill: balance',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
  column-fill: balance;
  font-size: 14px;
  line-height: 1.6;
}

.heading {
  column-span: all;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  margin: 8px 0;
  background: #eef2ff;
  text-align: center;
  border-radius: 4px;
}`,
  },
];

export function ColumnSpanDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
