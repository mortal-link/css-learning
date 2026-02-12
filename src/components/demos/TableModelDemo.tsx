'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* HTML 原生表格 */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
  font-size: 14px;
}
th {
  background: #f1f5f9;
  font-weight: 600;
}`;

const defaultHTML = `<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>城市</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>张三</td><td>28</td><td>北京</td></tr>
    <tr><td>李四</td><td>32</td><td>上海</td></tr>
  </tbody>
</table>`;

const presets = [
  {
    label: 'HTML 表格',
    css: `table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
  font-size: 14px;
}
th { background: #f1f5f9; font-weight: 600; }`,
    html: `<table>
  <thead>
    <tr><th>姓名</th><th>年龄</th><th>城市</th></tr>
  </thead>
  <tbody>
    <tr><td>张三</td><td>28</td><td>北京</td></tr>
    <tr><td>李四</td><td>32</td><td>上海</td></tr>
  </tbody>
</table>`,
  },
  {
    label: 'CSS 表格布局',
    css: `/* 用 div + display: table 模拟表格 */
.table { display: table; width: 100%; border-collapse: collapse; }
.thead { display: table-header-group; }
.tbody { display: table-row-group; }
.row { display: table-row; }
.cell {
  display: table-cell;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 14px;
}
.head-cell {
  display: table-cell;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 14px;
  background: #f1f5f9;
  font-weight: 600;
}`,
    html: `<div class="table">
  <div class="thead">
    <div class="row">
      <div class="head-cell">姓名</div>
      <div class="head-cell">年龄</div>
      <div class="head-cell">城市</div>
    </div>
  </div>
  <div class="tbody">
    <div class="row">
      <div class="cell">张三</div>
      <div class="cell">28</div>
      <div class="cell">北京</div>
    </div>
    <div class="row">
      <div class="cell">李四</div>
      <div class="cell">32</div>
      <div class="cell">上海</div>
    </div>
  </div>
</div>`,
  },
  {
    label: '匿名盒子',
    css: `/* 缺少 table-row 时浏览器自动生成匿名盒子 */
.table { display: table; width: 100%; border-collapse: collapse; }
.cell {
  display: table-cell;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 14px;
  background: #fef9c3;
}
.note {
  margin-top: 12px;
  padding: 8px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
  font-size: 12px;
  color: #1e40af;
}`,
    html: `<div class="table">
  <div class="cell">姓名</div>
  <div class="cell">年龄</div>
  <div class="cell">城市</div>
</div>
<div class="note">
  这些 table-cell 之间缺少 table-row 父元素，浏览器会自动生成匿名的 table-row 盒子来包裹它们。
</div>`,
  },
  {
    label: '表格层次结构',
    css: `/* 表格完整层次：table > row-group > row > cell */
.table { display: table; width: 100%; border-collapse: collapse; }
.caption { display: table-caption; text-align: center; font-weight: bold; padding: 8px; background: #e0e7ff; }
.col-group { display: table-column-group; }
.col { display: table-column; }
.thead { display: table-header-group; background: #f1f5f9; }
.tbody { display: table-row-group; }
.tfoot { display: table-footer-group; background: #f0fdf4; }
.row { display: table-row; }
.cell { display: table-cell; border: 1px solid #ccc; padding: 8px; font-size: 13px; }`,
    html: `<div class="table">
  <div class="caption">用户信息表</div>
  <div class="thead">
    <div class="row">
      <div class="cell"><strong>姓名</strong></div>
      <div class="cell"><strong>年龄</strong></div>
      <div class="cell"><strong>城市</strong></div>
    </div>
  </div>
  <div class="tbody">
    <div class="row">
      <div class="cell">张三</div><div class="cell">28</div><div class="cell">北京</div>
    </div>
    <div class="row">
      <div class="cell">李四</div><div class="cell">32</div><div class="cell">上海</div>
    </div>
  </div>
  <div class="tfoot">
    <div class="row">
      <div class="cell" colspan="3">合计: 2 人</div>
    </div>
  </div>
</div>`,
  },
];

export function TableModelDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={250}
    />
  );
}
