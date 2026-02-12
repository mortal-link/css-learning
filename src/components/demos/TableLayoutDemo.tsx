'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `table {
  width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 5px;
  caption-side: top;
}
caption {
  padding: 8px;
  font-weight: bold;
  font-size: 14px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 13px;
  text-align: left;
}
th { background: #f1f5f9; }`;

const defaultHTML = `<table>
  <caption>用户信息表</caption>
  <thead>
    <tr><th>姓名</th><th>年龄</th><th>描述</th></tr>
  </thead>
  <tbody>
    <tr><td>短</td><td>25</td><td>短文本</td></tr>
    <tr><td>中等长度的名字</td><td>30</td><td>这是一段中等长度的描述文本</td></tr>
    <tr><td>非常非常长的名字示例</td><td>28</td><td>这是一段非常非常长的描述文本，用于演示表格布局算法如何处理内容</td></tr>
  </tbody>
</table>`;

const presets = [
  {
    label: 'auto 自动布局',
    css: `table {
  width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 5px;
  caption-side: top;
}
caption { padding: 8px; font-weight: bold; font-size: 14px; }
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
th { background: #f1f5f9; }`,
  },
  {
    label: 'fixed 固定布局',
    css: `/* fixed: 仅根据第一行确定列宽（性能更好） */
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 5px;
  caption-side: top;
}
caption { padding: 8px; font-weight: bold; font-size: 14px; }
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; overflow: hidden; text-overflow: ellipsis; }
th { background: #f1f5f9; }`,
  },
  {
    label: '标题在底部',
    css: `table {
  width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 8px;
  caption-side: bottom;
}
caption { padding: 8px; font-weight: bold; font-size: 14px; color: #6366f1; }
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
th { background: #f1f5f9; }`,
  },
  {
    label: '大间距',
    css: `table {
  width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 12px;
  caption-side: top;
}
caption { padding: 8px; font-weight: bold; font-size: 14px; }
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; border-radius: 4px; }
th { background: #f1f5f9; }`,
  },
];

export function TableLayoutDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
