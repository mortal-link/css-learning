'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 函数演示 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box { padding: 12px 16px; background: #ecfeff; border-left: 4px solid #06b6d4; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #155e75; }
.func-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; }
.func-card { padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; background: #f9fafb; cursor: pointer; text-align: center; }
.func-card:hover { background: #f3f4f6; }
.func-card.active { border-color: #06b6d4; background: #ecfeff; }
.func-name { font-family: monospace; font-size: 14px; font-weight: 600; color: #06b6d4; }
.section { padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 12px; }
.section h3 { font-size: 16px; font-weight: 600; margin: 0 0 4px; }
.section .desc { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
.section .syntax { font-family: monospace; font-size: 12px; background: #fff; padding: 4px 8px; border-radius: 4px; display: inline-block; }
.result-box { padding: 16px; border-radius: 8px; margin-top: 12px; text-align: center; }
.result-value { font-size: 28px; font-family: monospace; font-weight: 700; }
.code-line { font-family: monospace; font-size: 13px; padding: 8px 12px; background: #f3f4f6; border-radius: 4px; margin-top: 8px; }
.calc-demo { height: 40px; background: #06b6d4; border-radius: 4px; transition: width 0.3s; margin-top: 12px; }
.var-preview { height: 80px; border-radius: 8px; border: 2px solid #e5e7eb; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin-top: 12px; }`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>CSS 函数：</strong>CSS 提供了多种内置函数，用于动态计算值、引用变量、处理资源等。
  </div>

  <h3 style="font-size:14px;margin:0 0 12px;">calc() — 混合单位计算</h3>
  <div class="section">
    <div class="syntax">calc(expression)</div>
    <div class="desc" style="margin-top:8px;">执行数学计算，可混合不同单位</div>
    <div style="background:#e5e7eb;border-radius:4px;overflow:hidden;">
      <div class="calc-demo" style="width:calc(100% - 80px);display:flex;align-items:center;padding:0 12px;color:white;font-size:12px;">
        calc(100% - 80px)
      </div>
    </div>
    <div class="code-line">width: calc(100% - 80px);</div>
  </div>

  <h3 style="font-size:14px;margin:16px 0 12px;">min() / max() / clamp()</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
    <div class="section">
      <div class="func-name">min()</div>
      <div class="desc">取最小值，设上限</div>
      <div class="code-line" style="font-size:11px;">width: min(90%, 600px);</div>
    </div>
    <div class="section">
      <div class="func-name">max()</div>
      <div class="desc">取最大值，设下限</div>
      <div class="code-line" style="font-size:11px;">width: max(300px, 50%);</div>
    </div>
    <div class="section">
      <div class="func-name">clamp()</div>
      <div class="desc">限制在范围内</div>
      <div class="code-line" style="font-size:11px;">font-size: clamp(16px, 2vw, 24px);</div>
    </div>
  </div>

  <h3 style="font-size:14px;margin:16px 0 12px;">var() — CSS 自定义属性</h3>
  <div class="section">
    <div class="var-preview" style="background:#3b82f6;">
      使用 var(--primary-color) 的元素
    </div>
    <div class="code-line" style="white-space:pre;">:root { --primary-color: #3b82f6; }
.element { background: var(--primary-color); }</div>
  </div>

  <h3 style="font-size:14px;margin:16px 0 12px;">env() / url()</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div class="section">
      <div class="func-name">env()</div>
      <div class="desc">环境变量（安全区域）</div>
      <div class="code-line" style="font-size:11px;">padding-top: env(safe-area-inset-top);</div>
    </div>
    <div class="section">
      <div class="func-name">url()</div>
      <div class="desc">引用外部资源</div>
      <div class="code-line" style="font-size:11px;">background-image: url('/img/hero.jpg');</div>
    </div>
  </div>
</div>`;

const presets = [
  { label: 'calc() 计算', css: `/* calc() 混合单位计算 */
.demo { padding: 16px; font-family: system-ui; }
.container { background: #f3f4f6; border-radius: 8px; padding: 4px; margin-bottom: 12px; }
.bar { height: 40px; background: #06b6d4; border-radius: 6px; display: flex; align-items: center; padding: 0 12px; color: white; font-size: 12px; font-family: monospace; }
.bar-1 { width: calc(100% - 40px); }
.bar-2 { width: calc(50% + 60px); margin-top: 4px; }
.bar-3 { width: calc(100% / 3); margin-top: 4px; }
.label { font-size: 12px; color: #666; margin-top: 4px; font-family: monospace; }`,
    html: `<div class="demo">
  <h3 style="font-size:14px;margin:0 0 12px;">calc() 不同计算示例</h3>
  <div class="container"><div class="bar bar-1">calc(100% - 40px)</div></div>
  <div class="container"><div class="bar bar-2" style="background:#8b5cf6;">calc(50% + 60px)</div></div>
  <div class="container"><div class="bar bar-3" style="background:#f59e0b;">calc(100% / 3)</div></div>
</div>` },
  { label: 'var() 变量', css: `/* CSS 自定义属性 */
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --accent: #f59e0b;
  --radius: 12px;
  --spacing: 16px;
}
.demo { padding: var(--spacing); font-family: system-ui; }
.card { padding: var(--spacing); border-radius: var(--radius); margin-bottom: 12px; color: white; font-weight: 600; }
.card-1 { background: var(--primary); }
.card-2 { background: var(--secondary); }
.card-3 { background: var(--accent); color: #1a1a1a; }
.code { font-family: monospace; font-size: 11px; opacity: 0.8; margin-top: 4px; }`,
    html: `<div class="demo">
  <div class="card card-1">--primary: #3b82f6<div class="code">background: var(--primary)</div></div>
  <div class="card card-2">--secondary: #8b5cf6<div class="code">background: var(--secondary)</div></div>
  <div class="card card-3">--accent: #f59e0b<div class="code">background: var(--accent)</div></div>
</div>` },
];

export function CSSFunctionDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={520}
    />
  );
}
