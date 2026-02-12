'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.list {
  counter-reset: item 0;
  list-style: none;
  padding: 0;
}
.list > li {
  counter-increment: item 1;
  margin-bottom: 8px;
  font-size: 15px;
}
.list > li::before {
  content: counter(item, decimal) ". ";
  font-weight: bold;
  color: #3b82f6;
  margin-right: 6px;
}`;

const defaultHTML = `<ul class="list">
  <li>概述</li>
  <li>基础</li>
  <li>进阶</li>
  <li>实践</li>
</ul>`;

const presets = [
  {
    label: '简单编号',
    css: `.list {
  counter-reset: item 0;
  list-style: none;
  padding: 0;
}
.list > li {
  counter-increment: item 1;
  margin-bottom: 8px;
  font-size: 15px;
}
.list > li::before {
  content: counter(item, decimal) ". ";
  font-weight: bold;
  color: #3b82f6;
  margin-right: 6px;
}`,
  },
  {
    label: '罗马编号',
    css: `.list {
  counter-reset: item 0;
  list-style: none;
  padding: 0;
}
.list > li {
  counter-increment: item 1;
  margin-bottom: 8px;
  font-size: 15px;
}
.list > li::before {
  content: counter(item, upper-roman) ". ";
  font-weight: bold;
  color: #3b82f6;
  margin-right: 6px;
}`,
  },
  {
    label: '字母编号',
    css: `.list {
  counter-reset: item 0;
  list-style: none;
  padding: 0;
}
.list > li {
  counter-increment: item 1;
  margin-bottom: 8px;
  font-size: 15px;
}
.list > li::before {
  content: counter(item, upper-alpha) ". ";
  font-weight: bold;
  color: #3b82f6;
  margin-right: 6px;
}`,
  },
  {
    label: '大纲编号',
    css: `.list {
  counter-reset: chapter 0;
  list-style: none;
  padding: 0;
}
.list > li {
  counter-increment: chapter;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 600;
}
.list > li::before {
  content: counter(chapter) ". ";
  color: #3b82f6;
  font-weight: bold;
}
.nested {
  counter-reset: section 0;
  list-style: none;
  padding-left: 24px;
  margin-top: 6px;
}
.nested > li {
  counter-increment: section;
  margin-bottom: 6px;
  font-weight: normal;
}
.nested > li::before {
  content: counter(chapter) "." counter(section) " ";
  color: #3b82f6;
  font-weight: 600;
}
.deep {
  counter-reset: sub 0;
  list-style: none;
  padding-left: 24px;
  margin-top: 4px;
}
.deep > li {
  counter-increment: sub;
  margin-bottom: 4px;
  font-size: 13px;
  color: #666;
}
.deep > li::before {
  content: counter(chapter) "." counter(section) "." counter(sub) " ";
  color: #3b82f6;
  font-weight: 500;
}`,
    html: `<ul class="list">
  <li>概述
    <ul class="nested">
      <li>定义</li>
      <li>语法</li>
      <li>示例
        <ul class="deep">
          <li>要点一</li>
          <li>要点二</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>基础
    <ul class="nested">
      <li>定义</li>
      <li>语法</li>
    </ul>
  </li>
  <li>进阶
    <ul class="nested">
      <li>定义</li>
      <li>语法</li>
    </ul>
  </li>
</ul>`,
  },
  {
    label: '自定义起始值',
    css: `/* counter-reset: item 10 从 10 开始 */
.list {
  counter-reset: item 10;
  list-style: none;
  padding: 0;
}
.list > li {
  counter-increment: item 2;
  margin-bottom: 8px;
  font-size: 15px;
}
.list > li::before {
  content: "第" counter(item) "条 ";
  font-weight: bold;
  color: #3b82f6;
  margin-right: 6px;
}`,
    html: `<ul class="list">
  <li>从 10 开始，每次 +2</li>
  <li>第二项</li>
  <li>第三项</li>
  <li>第四项</li>
</ul>`,
  },
];

export function CounterDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={220}
    />
  );
}
