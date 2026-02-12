'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 属性定义表: color */
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; color: #475569; font-weight: 600; width: 140px; }
td { font-family: monospace; color: #1e293b; }
caption { text-align: left; font-weight: bold; font-size: 16px; margin-bottom: 10px; color: #1e293b; }
.inherited-yes { color: #16a34a; font-weight: bold; }
.inherited-no { color: #dc2626; font-weight: bold; }
.note { margin-top: 16px; padding: 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; font-size: 13px; color: #92400e; }`;

const defaultHTML = `<table>
  <caption>color 属性定义表</caption>
  <tr><th>Value</th><td>&lt;color&gt;</td></tr>
  <tr><th>Initial</th><td>canvastext</td></tr>
  <tr><th>Applies to</th><td>所有元素</td></tr>
  <tr><th>Inherited</th><td><span class="inherited-yes">是</span></td></tr>
  <tr><th>Percentages</th><td>不适用</td></tr>
  <tr><th>Computed value</th><td>计算后的颜色值</td></tr>
</table>
<div class="note">
  <strong>提示：</strong>CSS 规范使用标准化的属性定义表来描述每个属性的行为。理解这些字段能帮助你准确预测 CSS 属性的表现。
</div>`;

const presets = [
  {
    label: 'color (可继承)',
    css: `table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; color: #475569; font-weight: 600; width: 140px; }
td { font-family: monospace; color: #1e293b; }
caption { text-align: left; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
.yes { color: #16a34a; font-weight: bold; }
.no { color: #dc2626; font-weight: bold; }`,
    html: `<table>
  <caption>color 属性定义表</caption>
  <tr><th>Value</th><td>&lt;color&gt;</td></tr>
  <tr><th>Initial</th><td>canvastext</td></tr>
  <tr><th>Applies to</th><td>所有元素</td></tr>
  <tr><th>Inherited</th><td><span class="yes">是</span></td></tr>
  <tr><th>Percentages</th><td>不适用</td></tr>
  <tr><th>Computed value</th><td>计算后的颜色值</td></tr>
</table>`,
  },
  {
    label: 'margin (不可继承)',
    css: `table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; color: #475569; font-weight: 600; width: 140px; }
td { font-family: monospace; color: #1e293b; }
caption { text-align: left; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
.yes { color: #16a34a; font-weight: bold; }
.no { color: #dc2626; font-weight: bold; }`,
    html: `<table>
  <caption>margin 属性定义表</caption>
  <tr><th>Value</th><td>&lt;length&gt; | &lt;percentage&gt; | auto</td></tr>
  <tr><th>Initial</th><td>0</td></tr>
  <tr><th>Applies to</th><td>所有元素（除 display: table-* 外）</td></tr>
  <tr><th>Inherited</th><td><span class="no">否</span></td></tr>
  <tr><th>Percentages</th><td>相对于包含块的宽度</td></tr>
  <tr><th>Computed value</th><td>百分比或绝对长度，或 auto</td></tr>
</table>`,
  },
  {
    label: 'display',
    css: `table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; color: #475569; font-weight: 600; width: 140px; }
td { font-family: monospace; color: #1e293b; }
caption { text-align: left; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
.no { color: #dc2626; font-weight: bold; }`,
    html: `<table>
  <caption>display 属性定义表</caption>
  <tr><th>Value</th><td>block | inline | flex | grid | none | ...</td></tr>
  <tr><th>Initial</th><td>inline</td></tr>
  <tr><th>Applies to</th><td>所有元素</td></tr>
  <tr><th>Inherited</th><td><span class="no">否</span></td></tr>
  <tr><th>Percentages</th><td>不适用</td></tr>
  <tr><th>Computed value</th><td>指定值，除非元素是浮动或绝对定位</td></tr>
</table>`,
  },
  {
    label: 'width',
    css: `table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; color: #475569; font-weight: 600; width: 140px; }
td { font-family: monospace; color: #1e293b; }
caption { text-align: left; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
.no { color: #dc2626; font-weight: bold; }
.note { margin-top: 12px; padding: 10px; background: #eff6ff; border-radius: 6px; font-size: 13px; color: #1e40af; }`,
    html: `<table>
  <caption>width 属性定义表</caption>
  <tr><th>Value</th><td>&lt;length&gt; | &lt;percentage&gt; | auto | min-content | ...</td></tr>
  <tr><th>Initial</th><td>auto</td></tr>
  <tr><th>Applies to</th><td>除非替换行内元素、表格行、行组外的所有元素</td></tr>
  <tr><th>Inherited</th><td><span class="no">否</span></td></tr>
  <tr><th>Percentages</th><td>相对于包含块的宽度</td></tr>
  <tr><th>Computed value</th><td>百分比、auto 或绝对长度</td></tr>
</table>
<div class="note">
  <strong>注意：</strong>margin: 10% 相对于包含块的<em>宽度</em>（不是高度！），width: 50% 也是如此。
</div>`,
  },
];

export function PropertyDefDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
