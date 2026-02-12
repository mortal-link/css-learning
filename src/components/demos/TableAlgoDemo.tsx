'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* auto: 浏览器扫描所有内容计算列宽 */
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 13px;
  text-align: left;
}
th { background: #f1f5f9; font-weight: 600; }

.info {
  margin-top: 12px;
  padding: 8px 12px;
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
  font-size: 12px;
  color: #1e40af;
  line-height: 1.6;
}`;

const defaultHTML = `<table>
  <thead>
    <tr><th>列 1</th><th>列 2</th><th>列 3</th></tr>
  </thead>
  <tbody>
    <tr><td>短</td><td>文本</td><td>数据</td></tr>
    <tr><td>小</td><td>内容</td><td>示例</td></tr>
  </tbody>
</table>
<div class="info">
  <strong>auto 算法步骤：</strong>扫描所有行和列 → 计算每个单元格的最小/最大宽度 → 考虑所有内容后确定列宽 → 分配剩余空间 → 渲染表格
</div>`;

const presets = [
  {
    label: 'auto + 少量数据',
    css: `table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
th { background: #f1f5f9; font-weight: 600; }
.info { margin-top: 12px; padding: 8px 12px; background: #eff6ff; border-left: 3px solid #3b82f6; font-size: 12px; color: #1e40af; }`,
    html: `<table>
  <thead><tr><th>列 1</th><th>列 2</th><th>列 3</th></tr></thead>
  <tbody>
    <tr><td>短</td><td>文本</td><td>数据</td></tr>
    <tr><td>小</td><td>内容</td><td>示例</td></tr>
  </tbody>
</table>
<div class="info"><strong>auto</strong>: 精确但慢，扫描所有行内容决定列宽</div>`,
  },
  {
    label: 'fixed + 大量数据',
    css: `/* fixed: 仅根据第一行确定列宽（快速但可能溢出） */
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
th { background: #f1f5f9; font-weight: 600; }
.info { margin-top: 12px; padding: 8px 12px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<table>
  <thead><tr><th>列 1</th><th>列 2</th><th>列 3</th></tr></thead>
  <tbody>
    <tr><td>这是一段非常长的文本内容</td><td>大量数据演示</td><td>更多详细信息在这里</td></tr>
    <tr><td>长文本会影响计算</td><td>自动布局需要扫描所有行</td><td>固定布局只看第一行</td></tr>
    <tr><td>性能差异在大表格中明显</td><td>数据越多差异越大</td><td>固定布局渲染更快</td></tr>
  </tbody>
</table>
<div class="info"><strong>fixed</strong>: 仅根据第一行（表头）确定列宽，后续行内容可能溢出</div>`,
  },
  {
    label: 'auto + 混合宽度',
    css: `table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
th { background: #f1f5f9; font-weight: 600; }
.info { margin-top: 12px; padding: 8px 12px; background: #f0fdf4; border-left: 3px solid #22c55e; font-size: 12px; color: #166534; }`,
    html: `<table>
  <thead><tr><th>列 1</th><th>列 2</th><th>列 3</th></tr></thead>
  <tbody>
    <tr><td>短</td><td>这是一段很长的描述文本</td><td>中</td></tr>
    <tr><td>非常非常长的内容</td><td>小</td><td>中等长度文本</td></tr>
  </tbody>
</table>
<div class="info"><strong>auto + 混合内容</strong>: 列宽根据所有行的内容综合计算</div>`,
  },
  {
    label: 'fixed + 混合宽度',
    css: `table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
th { background: #f1f5f9; font-weight: 600; }
.info { margin-top: 12px; padding: 8px 12px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<table>
  <thead><tr><th>列 1</th><th>列 2</th><th>列 3</th></tr></thead>
  <tbody>
    <tr><td>短</td><td>这是一段很长的描述文本</td><td>中</td></tr>
    <tr><td>非常非常长的内容</td><td>小</td><td>中等长度文本</td></tr>
  </tbody>
</table>
<div class="info"><strong>fixed + 混合内容</strong>: 列宽等分，忽略内容差异</div>`,
  },
];

export function TableAlgoDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
