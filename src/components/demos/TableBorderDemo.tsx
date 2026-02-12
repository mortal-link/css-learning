'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 8px;
  border: 2px solid #94a3b8;
}
th {
  border: 2px solid #3b82f6;
  padding: 8px;
  background: #eff6ff;
  font-size: 13px;
  text-align: left;
}
td {
  border: 2px solid #a78bfa;
  padding: 8px;
  font-size: 13px;
}
td:empty {
  background: #fef3c7;
}`;

const defaultHTML = `<table>
  <thead>
    <tr>
      <th>标题 1 (蓝边框)</th>
      <th style="border: 4px solid #ef4444;">标题 2 (红 4px)</th>
      <th>标题 3 (蓝边框)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>单元格 1</td>
      <td style="border: 4px solid #f97316;">单元格 2 (橙 4px)</td>
      <td></td>
    </tr>
    <tr>
      <td>单元格 4</td>
      <td></td>
      <td>单元格 6</td>
    </tr>
  </tbody>
</table>`;

const presets = [
  {
    label: '分离边框',
    css: `table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 8px;
  border: 2px solid #94a3b8;
}
th { border: 2px solid #3b82f6; padding: 8px; background: #eff6ff; font-size: 13px; text-align: left; }
td { border: 2px solid #a78bfa; padding: 8px; font-size: 13px; }
td:empty { background: #fef3c7; }`,
  },
  {
    label: '合并边框',
    css: `/* collapse: 相邻边框合并，间距无效 */
table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #94a3b8;
}
th { border: 2px solid #3b82f6; padding: 8px; background: #eff6ff; font-size: 13px; text-align: left; }
td { border: 2px solid #a78bfa; padding: 8px; font-size: 13px; }`,
  },
  {
    label: '隐藏空单元格',
    css: `/* empty-cells: hide 只在 separate 下生效 */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 6px;
  border: 2px solid #94a3b8;
  empty-cells: hide;
}
th { border: 2px solid #3b82f6; padding: 8px; background: #eff6ff; font-size: 13px; text-align: left; }
td { border: 2px solid #a78bfa; padding: 8px; font-size: 13px; }
td:empty { background: #fef3c7; }`,
  },
  {
    label: '边框冲突演示',
    css: `/* collapse 模式下冲突优先级：cell > row > row-group > col > col-group > table */
table {
  width: 100%;
  border-collapse: collapse;
  border: 3px solid #94a3b8;
}
th { border: 2px solid #3b82f6; padding: 8px; background: #eff6ff; font-size: 13px; text-align: left; }
td { border: 2px solid #a78bfa; padding: 8px; font-size: 13px; }
tr:first-child td { border: 4px solid #ef4444; }`,
  },
];

export function TableBorderDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={250}
    />
  );
}
