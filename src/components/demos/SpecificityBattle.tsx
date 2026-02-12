'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultHTML = `<div class="battle">
  <h3>特异性对决</h3>
  <div class="versus">
    <div class="fighter win">
      <div class="selector">#id</div>
      <div class="spec">(0, 1, 0, 0)</div>
      <div class="breakdown">
        <span class="s-item">inline: 0</span>
        <span class="s-item highlight">ID: 1</span>
        <span class="s-item">class: 0</span>
        <span class="s-item">element: 0</span>
      </div>
      <div class="result win-badge">获胜</div>
    </div>
    <div class="vs">VS</div>
    <div class="fighter lose">
      <div class="selector">.class.class.class</div>
      <div class="spec">(0, 0, 3, 0)</div>
      <div class="breakdown">
        <span class="s-item">inline: 0</span>
        <span class="s-item">ID: 0</span>
        <span class="s-item highlight">class: 3</span>
        <span class="s-item">element: 0</span>
      </div>
      <div class="result lose-badge">落败</div>
    </div>
  </div>
  <div class="rule">1 个 ID 选择器 > 任意数量的类选择器</div>
</div>`;

const defaultCSS = `.battle { padding: 16px; font-family: sans-serif; }
h3 { text-align: center; margin: 0 0 16px; font-size: 18px; }
.versus { display: flex; align-items: center; gap: 12px; }
.fighter { flex: 1; padding: 16px; border-radius: 8px; text-align: center; }
.win { background: #f0fdf4; border: 2px solid #22c55e; }
.lose { background: #fef2f2; border: 2px solid #ef4444; }
.selector { font-family: monospace; font-size: 18px; font-weight: bold; margin-bottom: 8px; }
.spec { font-family: monospace; font-size: 22px; font-weight: bold; color: #333; margin-bottom: 8px; }
.breakdown { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin-bottom: 8px; }
.s-item { font-size: 10px; padding: 2px 6px; background: #f1f5f9; border-radius: 4px; }
.s-item.highlight { background: #dbeafe; color: #1d4ed8; font-weight: bold; }
.result { font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 4px; display: inline-block; }
.win-badge { background: #22c55e; color: white; }
.lose-badge { background: #ef4444; color: white; }
.vs { font-size: 24px; font-weight: bold; color: #666; }
.rule { text-align: center; margin-top: 12px; padding: 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`;

const presets = [
  {
    label: 'ID vs 类',
    css: `.battle { padding: 16px; font-family: sans-serif; } h3 { text-align: center; margin: 0 0 16px; font-size: 18px; }
.versus { display: flex; align-items: center; gap: 12px; }
.fighter { flex: 1; padding: 16px; border-radius: 8px; text-align: center; }
.win { background: #f0fdf4; border: 2px solid #22c55e; } .lose { background: #fef2f2; border: 2px solid #ef4444; }
.selector { font-family: monospace; font-size: 18px; font-weight: bold; margin-bottom: 8px; }
.spec { font-family: monospace; font-size: 22px; font-weight: bold; color: #333; margin-bottom: 8px; }
.result { font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 4px; display: inline-block; }
.win-badge { background: #22c55e; color: white; } .lose-badge { background: #ef4444; color: white; }
.vs { font-size: 24px; font-weight: bold; color: #666; }
.rule { text-align: center; margin-top: 12px; padding: 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`,
    html: `<div class="battle"><h3>ID vs 类</h3>
<div class="versus">
  <div class="fighter win"><div class="selector">#id</div><div class="spec">(0,1,0,0)</div><div class="result win-badge">获胜</div></div>
  <div class="vs">VS</div>
  <div class="fighter lose"><div class="selector">.a.b.c</div><div class="spec">(0,0,3,0)</div><div class="result lose-badge">落败</div></div>
</div>
<div class="rule">1个 ID > 任意数量的 class。ID 在更高位，永远胜出。</div></div>`,
  },
  {
    label: 'style vs ID',
    css: `.battle { padding: 16px; font-family: sans-serif; } h3 { text-align: center; margin: 0 0 16px; font-size: 18px; }
.versus { display: flex; align-items: center; gap: 12px; }
.fighter { flex: 1; padding: 16px; border-radius: 8px; text-align: center; }
.win { background: #f0fdf4; border: 2px solid #22c55e; } .lose { background: #fef2f2; border: 2px solid #ef4444; }
.selector { font-family: monospace; font-size: 16px; font-weight: bold; margin-bottom: 8px; }
.spec { font-family: monospace; font-size: 22px; font-weight: bold; color: #333; margin-bottom: 8px; }
.result { font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 4px; display: inline-block; }
.win-badge { background: #22c55e; color: white; } .lose-badge { background: #ef4444; color: white; }
.vs { font-size: 24px; font-weight: bold; color: #666; }
.rule { text-align: center; margin-top: 12px; padding: 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`,
    html: `<div class="battle"><h3>inline style vs ID</h3>
<div class="versus">
  <div class="fighter win"><div class="selector">style=""</div><div class="spec">(1,0,0,0)</div><div class="result win-badge">获胜</div></div>
  <div class="vs">VS</div>
  <div class="fighter lose"><div class="selector">#header</div><div class="spec">(0,1,0,0)</div><div class="result lose-badge">落败</div></div>
</div>
<div class="rule">内联样式 (1,0,0,0) 始终优先于 ID 选择器 (0,1,0,0)</div></div>`,
  },
  {
    label: '复杂选择器',
    css: `.battle { padding: 16px; font-family: sans-serif; } h3 { text-align: center; margin: 0 0 16px; font-size: 18px; }
.versus { display: flex; align-items: center; gap: 12px; }
.fighter { flex: 1; padding: 16px; border-radius: 8px; text-align: center; }
.win { background: #f0fdf4; border: 2px solid #22c55e; } .lose { background: #fef2f2; border: 2px solid #ef4444; }
.selector { font-family: monospace; font-size: 15px; font-weight: bold; margin-bottom: 8px; }
.spec { font-family: monospace; font-size: 22px; font-weight: bold; color: #333; margin-bottom: 4px; }
.detail { font-size: 10px; color: #666; margin-bottom: 8px; }
.result { font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 4px; display: inline-block; }
.win-badge { background: #22c55e; color: white; } .lose-badge { background: #ef4444; color: white; }
.vs { font-size: 24px; font-weight: bold; color: #666; }
.rule { text-align: center; margin-top: 12px; padding: 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`,
    html: `<div class="battle"><h3>复杂选择器对决</h3>
<div class="versus">
  <div class="fighter win"><div class="selector">div.class#id</div><div class="spec">(0,1,1,1)</div><div class="detail">1 ID + 1 class + 1 元素</div><div class="result win-badge">获胜</div></div>
  <div class="vs">VS</div>
  <div class="fighter lose"><div class="selector">.nav .item:hover</div><div class="spec">(0,0,3,0)</div><div class="detail">2 class + 1 伪类</div><div class="result lose-badge">落败</div></div>
</div>
<div class="rule">有 ID 的选择器始终胜出，因为 ID 位 (b) 优先于 class 位 (c)</div></div>`,
  },
  {
    label: '伪类对决',
    css: `.battle { padding: 16px; font-family: sans-serif; } h3 { text-align: center; margin: 0 0 16px; font-size: 18px; }
.versus { display: flex; align-items: center; gap: 12px; }
.fighter { flex: 1; padding: 16px; border-radius: 8px; text-align: center; }
.win { background: #f0fdf4; border: 2px solid #22c55e; }
.tie { background: #fffbeb; border: 2px solid #f59e0b; }
.selector { font-family: monospace; font-size: 18px; font-weight: bold; margin-bottom: 8px; }
.spec { font-family: monospace; font-size: 22px; font-weight: bold; color: #333; margin-bottom: 4px; }
.detail { font-size: 10px; color: #666; margin-bottom: 8px; }
.result { font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 4px; display: inline-block; }
.win-badge { background: #22c55e; color: white; } .tie-badge { background: #f59e0b; color: white; }
.vs { font-size: 24px; font-weight: bold; color: #666; }
.rule { text-align: center; margin-top: 12px; padding: 8px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 12px; color: #92400e; }`,
    html: `<div class="battle"><h3>伪类 vs 类</h3>
<div class="versus">
  <div class="fighter tie"><div class="selector">a:hover</div><div class="spec">(0,0,1,1)</div><div class="detail">1 伪类 + 1 元素</div><div class="result tie-badge">平局</div></div>
  <div class="vs">VS</div>
  <div class="fighter tie"><div class="selector">.link</div><div class="spec">(0,0,1,0)</div><div class="detail">1 class</div><div class="result win-badge">稍胜</div></div>
</div>
<div class="rule">伪类(:hover)与类(.link)同属 c 列，但 a:hover 多了 1 个元素(d 列)，所以 a:hover 略高。但如果用 .link:hover 则为 (0,0,2,0)，更强！</div></div>`,
  },
  {
    label: '属性选择器',
    css: `.battle { padding: 16px; font-family: sans-serif; } h3 { text-align: center; margin: 0 0 16px; font-size: 18px; }
.versus { display: flex; align-items: center; gap: 12px; }
.fighter { flex: 1; padding: 16px; border-radius: 8px; text-align: center; }
.tie { background: #fffbeb; border: 2px solid #f59e0b; }
.selector { font-family: monospace; font-size: 16px; font-weight: bold; margin-bottom: 8px; }
.spec { font-family: monospace; font-size: 22px; font-weight: bold; color: #333; margin-bottom: 4px; }
.detail { font-size: 10px; color: #666; margin-bottom: 8px; }
.result { font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 4px; display: inline-block; }
.tie-badge { background: #f59e0b; color: white; }
.vs { font-size: 24px; font-weight: bold; color: #666; }
.rule { text-align: center; margin-top: 12px; padding: 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`,
    html: `<div class="battle"><h3>属性 vs 类</h3>
<div class="versus">
  <div class="fighter tie"><div class="selector">[type="text"]</div><div class="spec">(0,0,1,0)</div><div class="detail">1 属性选择器</div><div class="result tie-badge">平局</div></div>
  <div class="vs">VS</div>
  <div class="fighter tie"><div class="selector">.field</div><div class="spec">(0,0,1,0)</div><div class="detail">1 类选择器</div><div class="result tie-badge">平局</div></div>
</div>
<div class="rule">属性选择器和类选择器特异性相同，都在 c 列计数。相同特异性时，后声明的规则胜出。</div></div>`,
  },
];

export function SpecificityBattle() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={340} />;
}
