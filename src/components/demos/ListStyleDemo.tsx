'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `ul {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 24px;
}
li {
  margin-bottom: 8px;
  font-size: 15px;
  padding: 4px 0;
}
li::marker {
  color: #3b82f6;
  font-size: 16px;
}`;

const defaultHTML = `<ul>
  <li>列表项 1 - 展示列表样式效果</li>
  <li>列表项 2 - 展示列表样式效果</li>
  <li>列表项 3 - 展示列表样式效果</li>
  <li>列表项 4 - 展示列表样式效果</li>
</ul>`;

const presets = [
  {
    label: '有序列表',
    css: `ol {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 24px;
}
li {
  margin-bottom: 8px;
  font-size: 15px;
  padding: 4px 0;
}
li::marker {
  color: #3b82f6;
  font-size: 16px;
  font-weight: bold;
}`,
    html: `<ol>
  <li>列表项 1 - 有序编号</li>
  <li>列表项 2 - 有序编号</li>
  <li>列表项 3 - 有序编号</li>
  <li>列表项 4 - 有序编号</li>
</ol>`,
  },
  {
    label: '无序列表',
    css: `ul {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 24px;
}
li {
  margin-bottom: 8px;
  font-size: 15px;
  padding: 4px 0;
}
li::marker {
  color: #6b7280;
  font-size: 16px;
}`,
  },
  {
    label: '自定义标记',
    css: `ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 8px;
  font-size: 15px;
  padding: 4px 0;
}
li::marker {
  content: "\\25B8 ";
  color: #8b5cf6;
  font-size: 18px;
}`,
  },
  {
    label: 'Emoji 标记',
    css: `ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 8px;
  font-size: 15px;
  padding: 4px 0;
}
li::marker {
  content: "\\2713 ";
  color: #10b981;
  font-size: 20px;
}`,
  },
  {
    label: 'inside vs outside',
    css: `.outside-list, .inside-list {
  padding-left: 24px;
  margin-bottom: 16px;
}
.outside-list {
  list-style-type: disc;
  list-style-position: outside;
}
.inside-list {
  list-style-type: disc;
  list-style-position: inside;
}
li {
  margin-bottom: 6px;
  font-size: 14px;
  border: 1px dashed #ccc;
  padding: 4px;
}
li::marker { color: #3b82f6; }
h3 { font-size: 13px; color: #3b82f6; margin-bottom: 6px; font-family: monospace; }`,
    html: `<h3>list-style-position: outside</h3>
<ul class="outside-list">
  <li>标记在内容框外部</li>
  <li>换行时文本不会缩进到标记下方</li>
</ul>
<h3>list-style-position: inside</h3>
<ul class="inside-list">
  <li>标记在内容框内部</li>
  <li>换行时文本会缩进到标记下方</li>
</ul>`,
  },
];

export function ListStyleDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={220}
    />
  );
}
