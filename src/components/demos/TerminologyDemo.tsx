'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 规则结构解析 */
.rule-box {
  font-family: monospace;
  font-size: 15px;
  line-height: 2;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
}
.selector { color: #2563eb; font-weight: bold; border-bottom: 2px solid #2563eb; }
.property { color: #16a34a; }
.value    { color: #9333ea; }
.declaration { background: #fef3c7; padding: 2px 4px; border-radius: 3px; }
.brace { color: #64748b; }

.legend {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
}
.legend-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
}
.legend-item.s { background: #dbeafe; border: 1px solid #93c5fd; }
.legend-item.p { background: #dcfce7; border: 1px solid #86efac; }
.legend-item.v { background: #f3e8ff; border: 1px solid #c4b5fd; }
.legend-item.d { background: #fef3c7; border: 1px solid #fcd34d; }
.legend-item.db { background: #fce7f3; border: 1px solid #f9a8d4; }
.legend-item.rs { background: #e0e7ff; border: 1px solid #a5b4fc; }`;

const defaultHTML = `<div class="rule-box">
  <span class="selector">h1</span> <span class="brace">{</span><br>
  &nbsp;&nbsp;<span class="declaration"><span class="property">color</span>: <span class="value">red</span>;</span><br>
  &nbsp;&nbsp;<span class="declaration"><span class="property">font-size</span>: <span class="value">2em</span>;</span><br>
  <span class="brace">}</span>
</div>

<div class="legend">
  <div class="legend-item s"><strong>选择器</strong> (Selector) — 指定目标元素</div>
  <div class="legend-item p"><strong>属性</strong> (Property) — 样式特征名</div>
  <div class="legend-item v"><strong>值</strong> (Value) — 具体样式值</div>
  <div class="legend-item d"><strong>声明</strong> (Declaration) — 属性:值 的组合</div>
  <div class="legend-item db"><strong>声明块</strong> (Block) — {} 内所有声明</div>
  <div class="legend-item rs"><strong>规则集</strong> (Rule Set) — 选择器 + 声明块</div>
</div>`;

const presets = [
  {
    label: '基础规则集',
    css: `.rule-box { font-family: monospace; font-size: 15px; line-height: 2; padding: 20px; background: #f8fafc; border-radius: 8px; border: 2px solid #e2e8f0; }
.selector { color: #2563eb; font-weight: bold; border-bottom: 2px solid #2563eb; }
.property { color: #16a34a; }
.value { color: #9333ea; }
.declaration { background: #fef3c7; padding: 2px 4px; border-radius: 3px; }
.brace { color: #64748b; }
.note { margin-top: 12px; font-size: 13px; color: #475569; font-family: system-ui; }`,
    html: `<div class="rule-box">
  <span class="selector">h1</span> <span class="brace">{</span><br>
  &nbsp;&nbsp;<span class="declaration"><span class="property">color</span>: <span class="value">red</span>;</span><br>
  &nbsp;&nbsp;<span class="declaration"><span class="property">font-size</span>: <span class="value">2em</span>;</span><br>
  <span class="brace">}</span>
</div>
<p class="note">一个完整的规则集 = 选择器 + 声明块（花括号内的所有声明）</p>`,
  },
  {
    label: '元素 vs 盒子',
    css: `.container { font-family: system-ui; padding: 16px; }
.row { display: flex; gap: 24px; align-items: flex-start; }
.col { flex: 1; }
.col h3 { font-size: 14px; font-weight: bold; margin-bottom: 10px; padding: 6px 10px; border-radius: 4px; }
.col.dom h3 { background: #dbeafe; color: #1e40af; }
.col.box h3 { background: #dcfce7; color: #166534; }
.tree { font-family: monospace; font-size: 13px; line-height: 1.8; padding: 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; }
.tree .block { color: #16a34a; }
.tree .inline { color: #2563eb; }
.tree .none { color: #9ca3af; text-decoration: line-through; }
.arrow { font-size: 24px; color: #94a3b8; align-self: center; }
.note { margin-top: 12px; font-size: 12px; color: #64748b; padding: 8px; background: #fffbeb; border-radius: 4px; }`,
    html: `<div class="container">
  <div class="row">
    <div class="col dom">
      <h3>DOM 树 (元素)</h3>
      <div class="tree">
        div<br>
        &nbsp;&nbsp;p<br>
        &nbsp;&nbsp;span (display:none)<br>
        &nbsp;&nbsp;img
      </div>
    </div>
    <div class="arrow">→</div>
    <div class="col box">
      <h3>盒树 (盒子)</h3>
      <div class="tree">
        <span class="block">div — block box</span><br>
        &nbsp;&nbsp;<span class="block">p — block box</span><br>
        &nbsp;&nbsp;<span class="none">span — 无盒子</span><br>
        &nbsp;&nbsp;<span class="inline">img — replaced box</span>
      </div>
    </div>
  </div>
  <div class="note">元素是 HTML 结构，盒子是 CSS 渲染结构。display:none 的元素不生成盒子。</div>
</div>`,
  },
  {
    label: '伪元素生成额外盒子',
    css: `.demo { font-family: system-ui; padding: 16px; }
.title { font-size: 18px; font-weight: bold; margin-bottom: 12px; }
.title::before { content: "★ "; color: gold; }
.code { font-family: monospace; font-size: 13px; padding: 12px; background: #1e293b; color: #e2e8f0; border-radius: 6px; margin-bottom: 12px; line-height: 1.8; }
.result { display: flex; gap: 16px; align-items: center; }
.box-count { padding: 8px 12px; border-radius: 6px; font-size: 13px; }
.bc-dom { background: #dbeafe; border: 1px solid #93c5fd; }
.bc-render { background: #f3e8ff; border: 1px solid #c4b5fd; }`,
    html: `<div class="demo">
  <h2 class="title">伪元素标题</h2>
  <div class="code">
    h2::before {<br>
    &nbsp;&nbsp;content: "★ ";<br>
    &nbsp;&nbsp;color: gold;<br>
    }
  </div>
  <div class="result">
    <div class="box-count bc-dom">DOM: 1 个 h2 元素</div>
    <span style="color:#94a3b8; font-size:20px;">→</span>
    <div class="box-count bc-render">渲染: 2 个盒子 (::before + h2)</div>
  </div>
</div>`,
  },
  {
    label: '复杂选择器结构',
    css: `.rule-box { font-family: monospace; font-size: 14px; line-height: 2.2; padding: 20px; background: #f8fafc; border-radius: 8px; border: 2px solid #e2e8f0; }
.sel { color: #2563eb; font-weight: bold; }
.combinator { color: #dc2626; font-weight: bold; font-size: 16px; }
.pseudo { color: #d97706; font-style: italic; }
.prop { color: #16a34a; }
.val { color: #9333ea; }
.comment { color: #94a3b8; font-style: italic; }
.note { margin-top: 12px; font-size: 12px; color: #64748b; font-family: system-ui; }`,
    html: `<div class="rule-box">
  <span class="comment">/* 复合选择器 */</span><br>
  <span class="sel">div</span><span class="combinator"> > </span><span class="sel">p</span><span class="sel">.highlight</span><span class="pseudo">:first-child</span> {<br>
  &nbsp;&nbsp;<span class="prop">color</span>: <span class="val">red</span>;<br>
  &nbsp;&nbsp;<span class="prop">font-weight</span>: <span class="val">bold</span>;<br>
  }
</div>
<p class="note">
  选择器组成：类型选择器(div) + 子组合器(>) + 类型选择器(p) + 类选择器(.highlight) + 伪类(:first-child)
</p>`,
  },
];

export function TerminologyDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
