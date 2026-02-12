'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* @import 规则演示 */
.demo { font-family: system-ui; padding: 16px; }
.code {
  font-family: monospace;
  font-size: 13px;
  padding: 16px;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  line-height: 1.9;
  margin-bottom: 16px;
}
.valid { color: #4ade80; }
.invalid { color: #f87171; text-decoration: line-through; }
.comment { color: #64748b; }
.condition { color: #38bdf8; }
.layer { color: #c084fc; }

.tree {
  font-family: monospace;
  font-size: 13px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  line-height: 1.8;
}
.tree-file { font-weight: bold; }
.tree-import { color: #16a34a; }
.tree-condition { color: #2563eb; font-size: 11px; }
.tree-layer { color: #9333ea; font-size: 11px; }`;

const defaultHTML = `<div class="demo">
  <div class="code">
    <span class="comment">/* main.css */</span><br>
    <span class="valid">@import url('base.css');</span><br>
    <span class="valid">@import 'theme.css';</span><br>
    <span class="valid">@import url('mobile.css') (max-width: 768px);</span><br>
    <span class="valid">@import url('modern.css') supports(display: grid);</span><br>
    <span class="valid">@import url('layer.css') layer(components);</span><br>
    <br>
    <span class="comment">/* 其他样式规则 */</span><br>
    body { margin: 0; }
  </div>
  <div class="tree">
    <span class="tree-file">main.css</span><br>
    &nbsp;&nbsp;├─ <span class="tree-import">base.css</span><br>
    &nbsp;&nbsp;├─ <span class="tree-import">theme.css</span><br>
    &nbsp;&nbsp;├─ <span class="tree-import">mobile.css</span> <span class="tree-condition">(media query)</span><br>
    &nbsp;&nbsp;├─ <span class="tree-import">modern.css</span> <span class="tree-condition">(supports)</span><br>
    &nbsp;&nbsp;├─ <span class="tree-import">layer.css</span> <span class="tree-layer">[layer: components]</span><br>
    &nbsp;&nbsp;└─ (其他样式规则)
  </div>
</div>`;

const presets = [
  {
    label: '基础导入',
    css: `.demo { font-family: system-ui; padding: 16px; }
.code { font-family: monospace; font-size: 13px; padding: 16px; background: #1e293b; color: #e2e8f0; border-radius: 8px; line-height: 1.9; margin-bottom: 12px; }
.valid { color: #4ade80; }
.comment { color: #64748b; }
.note { padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 13px; color: #166534; }`,
    html: `<div class="demo">
  <div class="code">
    <span class="comment">/* 两种语法都可以 */</span><br>
    <span class="valid">@import url('base.css');</span> <span class="comment">/* URL 函数 */</span><br>
    <span class="valid">@import 'theme.css';</span> <span class="comment">/* 字符串 */</span><br>
    <br>
    <span class="comment">/* 然后是其他样式规则 */</span><br>
    body { margin: 0; }
  </div>
  <div class="note">@import 支持 url() 函数和字符串两种语法，效果相同。</div>
</div>`,
  },
  {
    label: '条件导入',
    css: `.demo { font-family: system-ui; padding: 16px; }
.code { font-family: monospace; font-size: 13px; padding: 16px; background: #1e293b; color: #e2e8f0; border-radius: 8px; line-height: 1.9; margin-bottom: 12px; }
.valid { color: #4ade80; }
.condition { color: #38bdf8; }
.comment { color: #64748b; }
.note { padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; }`,
    html: `<div class="demo">
  <div class="code">
    <span class="comment">/* 媒体查询条件 */</span><br>
    <span class="valid">@import url('mobile.css')</span> <span class="condition">(max-width: 768px)</span>;<br><br>
    <span class="comment">/* 特性查询条件 */</span><br>
    <span class="valid">@import url('modern.css')</span> <span class="condition">supports(display: grid)</span>;<br><br>
    <span class="comment">/* 组合条件 */</span><br>
    <span class="valid">@import url('dark.css')</span> <span class="condition">supports(color: oklch(0 0 0)) (prefers-color-scheme: dark)</span>;
  </div>
  <div class="note">@import 可以附加媒体查询和 supports() 条件，只在条件满足时加载。</div>
</div>`,
  },
  {
    label: '层叠层导入',
    css: `.demo { font-family: system-ui; padding: 16px; }
.code { font-family: monospace; font-size: 13px; padding: 16px; background: #1e293b; color: #e2e8f0; border-radius: 8px; line-height: 1.9; margin-bottom: 12px; }
.valid { color: #4ade80; }
.layer { color: #c084fc; }
.comment { color: #64748b; }
.note { padding: 10px; background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 6px; font-size: 13px; color: #6b21a8; }`,
    html: `<div class="demo">
  <div class="code">
    <span class="comment">/* 导入到具名层 */</span><br>
    <span class="valid">@import url('reset.css')</span> <span class="layer">layer(reset)</span>;<br>
    <span class="valid">@import url('base.css')</span> <span class="layer">layer(base)</span>;<br>
    <span class="valid">@import url('components.css')</span> <span class="layer">layer(components)</span>;<br><br>
    <span class="comment">/* 导入到匿名层 */</span><br>
    <span class="valid">@import url('utilities.css')</span> <span class="layer">layer</span>;
  </div>
  <div class="note">layer() 将导入的样式表放入指定的层叠层，用于精确控制优先级。</div>
</div>`,
  },
  {
    label: '错误位置',
    css: `.demo { font-family: system-ui; padding: 16px; }
.code { font-family: monospace; font-size: 13px; padding: 16px; background: #1e293b; color: #e2e8f0; border-radius: 8px; line-height: 1.9; margin-bottom: 12px; }
.valid { color: #4ade80; }
.invalid { color: #f87171; text-decoration: line-through; }
.comment { color: #64748b; }
.warning { padding: 10px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; font-size: 13px; color: #991b1b; }`,
    html: `<div class="demo">
  <div class="code">
    <span class="comment">/* main.css */</span><br>
    <span class="valid">body { margin: 0; }</span> <span class="comment">/* 其他规则在前！ */</span><br><br>
    <span class="invalid">@import url('base.css');</span> <span class="comment">/* 被忽略！ */</span><br>
    <span class="invalid">@import 'theme.css';</span> <span class="comment">/* 被忽略！ */</span>
  </div>
  <div class="warning">
    <strong>错误：</strong>@import 必须出现在所有其他 CSS 规则之前（@charset 和 @layer 除外）。位置不对的 @import 会被浏览器忽略！
  </div>
</div>`,
  },
];

export function AtImportDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
