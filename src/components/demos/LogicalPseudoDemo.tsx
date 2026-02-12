'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultHTML = `<ul class="list">
  <li class="important">重要项目</li>
  <li class="normal">普通项目</li>
  <li class="important urgent">紧急项目</li>
  <li class="completed">已完成</li>
  <li class="normal"><span>有子元素的普通项</span></li>
  <li class="important">重要项目</li>
</ul>`;

const defaultCSS = `/* :is() — 匹配 .important 或 .urgent */
li:is(.important, .urgent) {
  background: #dbeafe;
  border: 2px solid #3b82f6;
  font-weight: bold;
}

.list { list-style: none; padding: 0; }
li { padding: 8px 12px; margin: 4px 0; border-radius: 4px; font-size: 14px; border: 2px solid transparent; }`;

const presets = [
  {
    label: ':is()',
    css: `li:is(.important, .urgent) { background: #dbeafe; border: 2px solid #3b82f6; font-weight: bold; }
.list { list-style: none; padding: 0; }
li { padding: 8px 12px; margin: 4px 0; border-radius: 4px; font-size: 14px; border: 2px solid transparent; }
.info { font-size: 11px; color: #555; padding: 8px; margin-top: 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; }`,
    html: `<ul class="list">
  <li class="important">重要项目 (.important)</li>
  <li class="normal">普通项目 (.normal)</li>
  <li class="important urgent">紧急项目 (.important.urgent)</li>
  <li class="completed">已完成 (.completed)</li>
  <li class="normal"><span>有子元素的普通项</span></li>
  <li class="important">重要项目 (.important)</li>
</ul>
<div class="info">:is(.important, .urgent) — 匹配任一类名<br>特异性 = 参数中最高值 (0,1,0)</div>`,
  },
  {
    label: ':where()',
    css: `li:where(.important, .urgent) { background: #dcfce7; border: 2px solid #22c55e; font-weight: bold; }
.list { list-style: none; padding: 0; }
li { padding: 8px 12px; margin: 4px 0; border-radius: 4px; font-size: 14px; border: 2px solid transparent; }
.info { font-size: 11px; color: #555; padding: 8px; margin-top: 8px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; }`,
    html: `<ul class="list">
  <li class="important">重要项目 (.important)</li>
  <li class="normal">普通项目 (.normal)</li>
  <li class="important urgent">紧急项目 (.important.urgent)</li>
  <li class="completed">已完成 (.completed)</li>
  <li class="normal"><span>有子元素的普通项</span></li>
  <li class="important">重要项目 (.important)</li>
</ul>
<div class="info">:where(.important, .urgent) — 与 :is() 匹配逻辑相同<br>但特异性始终为 0，易被覆盖</div>`,
  },
  {
    label: ':not()',
    css: `li:not(.completed) { background: #fef3c7; border: 2px solid #f59e0b; }
li.completed { opacity: 0.5; text-decoration: line-through; }
.list { list-style: none; padding: 0; }
li { padding: 8px 12px; margin: 4px 0; border-radius: 4px; font-size: 14px; border: 2px solid transparent; }
.info { font-size: 11px; color: #555; padding: 8px; margin-top: 8px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 4px; }`,
    html: `<ul class="list">
  <li class="important">重要项目</li>
  <li class="normal">普通项目</li>
  <li class="important urgent">紧急项目</li>
  <li class="completed">已完成 (被 :not 排除)</li>
  <li class="normal"><span>有子元素的普通项</span></li>
  <li class="important">重要项目</li>
</ul>
<div class="info">:not(.completed) — 排除 .completed，其余全部匹配<br>特异性 = 参数的特异性 (0,1,0)</div>`,
  },
  {
    label: ':has()',
    css: `li:has(span) { background: #f3e8ff; border: 2px solid #a855f7; font-weight: bold; }
li:has(span) span { color: #7c3aed; }
.list { list-style: none; padding: 0; }
li { padding: 8px 12px; margin: 4px 0; border-radius: 4px; font-size: 14px; border: 2px solid transparent; }
.info { font-size: 11px; color: #555; padding: 8px; margin-top: 8px; background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 4px; }`,
    html: `<ul class="list">
  <li class="important">重要项目（无子元素）</li>
  <li class="normal">普通项目（无子元素）</li>
  <li class="important urgent">紧急项目（无子元素）</li>
  <li class="completed">已完成（无子元素）</li>
  <li class="normal"><span>有 span 子元素的项！</span></li>
  <li class="important">重要项目（无子元素）</li>
</ul>
<div class="info">:has(span) — "父选择器"，根据后代选择父元素<br>只有包含 &lt;span&gt; 的 li 被匹配</div>`,
  },
  {
    label: ':is vs :where 对比',
    css: `/* :is 特异性 = (0,1,0) */
li:is(.important) { color: blue; }
/* :where 特异性 = (0,0,0)，被下面覆盖 */
li:where(.important) { background: #dcfce7; }
/* 普通类选择器 (0,1,0) 可以覆盖 :where */
li { background: #fee2e2; }
li:is(.important) { background: #dbeafe; border: 2px solid #3b82f6; }

.list { list-style: none; padding: 0; }
li { padding: 8px 12px; margin: 4px 0; border-radius: 4px; font-size: 14px; border: 2px solid transparent; }
.info { font-size: 11px; color: #555; padding: 8px; margin-top: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; }`,
    html: `<ul class="list">
  <li class="important">:is 高特异性（蓝色生效）</li>
  <li class="normal">普通元素（红色背景）</li>
  <li class="important">:is 高特异性（蓝色生效）</li>
</ul>
<div class="info">:is() 特异性 = 参数最高值，:where() 特异性 = 0<br>:where 样式易被覆盖，适合写默认/base 样式</div>`,
  },
];

export function LogicalPseudoDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={340} />;
}
