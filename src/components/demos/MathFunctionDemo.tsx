'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 数学函数演示 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box { padding: 12px 16px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #065f46; }
.func-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.func-card { padding: 16px; border-radius: 8px; border: 1px solid; }
.func-card h4 { font-size: 14px; font-weight: 600; margin: 0 0 8px; }
.func-card .expr { font-family: monospace; font-size: 12px; margin-bottom: 8px; }
.func-card .bar-track { height: 24px; border-radius: 4px; overflow: hidden; }
.func-card .bar-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
.func-card .result { font-family: monospace; font-size: 12px; margin-top: 4px; }
.card-calc { background: #eff6ff; border-color: #3b82f6; }
.card-calc .bar-track { background: #bfdbfe; }
.card-calc .bar-fill { background: #3b82f6; }
.card-calc .result { color: #1d4ed8; }
.card-min { background: #f0fdf4; border-color: #22c55e; }
.card-min .bar-track { background: #bbf7d0; }
.card-min .bar-fill { background: #22c55e; }
.card-min .result { color: #16a34a; }
.card-max { background: #fff7ed; border-color: #f97316; }
.card-max .bar-track { background: #fed7aa; }
.card-max .bar-fill { background: #f97316; }
.card-max .result { color: #ea580c; }
.card-clamp { background: #faf5ff; border-color: #a855f7; }
.card-clamp .bar-track { background: #e9d5ff; }
.card-clamp .bar-fill { background: #a855f7; }
.card-clamp .result { color: #7c3aed; }
.ref-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 16px; }
.ref-table th, .ref-table td { padding: 8px; border: 1px solid #e5e7eb; text-align: left; }
.ref-table th { background: #f9fafb; font-weight: 600; }
.ref-table .mono { font-family: monospace; color: #3b82f6; }
.tips { padding: 16px; background: #fffbeb; border: 1px solid #f59e0b; border-radius: 8px; margin-top: 16px; }
.tips h4 { font-size: 13px; font-weight: 600; color: #92400e; margin: 0 0 8px; }
.tips li { font-size: 12px; color: #a16207; margin-bottom: 4px; }`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>CSS 数学函数：</strong>calc()、min()、max() 和 clamp() 允许在 CSS 中执行动态计算，创建真正响应式的布局。
  </div>

  <h3 style="font-size:14px;margin:0 0 12px;">四大函数对比（容器 500px）</h3>
  <div class="func-grid">
    <div class="func-card card-calc">
      <h4>calc()</h4>
      <div class="expr">calc(100% - 40px)</div>
      <div class="bar-track"><div class="bar-fill" style="width:calc(100% - 40px);"></div></div>
      <div class="result">= 460px</div>
    </div>
    <div class="func-card card-min">
      <h4>min()</h4>
      <div class="expr">min(90%, 300px)</div>
      <div class="bar-track"><div class="bar-fill" style="width:min(90%, 300px);"></div></div>
      <div class="result">= min(450px, 300px) = 300px</div>
    </div>
    <div class="func-card card-max">
      <h4>max()</h4>
      <div class="expr">max(20px, 5%)</div>
      <div class="bar-track"><div class="bar-fill" style="width:max(20px, 5%);"></div></div>
      <div class="result">= max(20px, 25px) = 25px</div>
    </div>
    <div class="func-card card-clamp">
      <h4>clamp()</h4>
      <div class="expr">clamp(200px, 50%, 400px)</div>
      <div class="bar-track"><div class="bar-fill" style="width:clamp(200px, 50%, 400px);"></div></div>
      <div class="result">= clamp(200, 250, 400) = 250px</div>
    </div>
  </div>

  <h3 style="font-size:14px;margin:0 0 12px;">响应式排版示例</h3>
  <div style="padding:16px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
    <p style="font-size:clamp(14px, 3vw, 28px);font-weight:700;margin:0 0 8px;">
      这段文字使用 clamp() 实现流式排版
    </p>
    <div style="font-family:monospace;font-size:12px;color:#888;">
      font-size: clamp(14px, 3vw, 28px)
    </div>
  </div>

  <table class="ref-table">
    <tr><th>函数</th><th>用途</th><th>示例</th></tr>
    <tr><td class="mono">calc()</td><td>混合单位计算</td><td class="mono" style="font-size:11px;">calc(100% - 20px)</td></tr>
    <tr><td class="mono">min()</td><td>取最小值，设上限</td><td class="mono" style="font-size:11px;">min(90%, 1200px)</td></tr>
    <tr><td class="mono">max()</td><td>取最大值，设下限</td><td class="mono" style="font-size:11px;">max(20px, 2%)</td></tr>
    <tr><td class="mono">clamp()</td><td>限制在范围内</td><td class="mono" style="font-size:11px;">clamp(16px, 2vw, 24px)</td></tr>
  </table>

  <div class="tips">
    <h4>实用技巧</h4>
    <ul style="padding-left:16px;margin:0;">
      <li>clamp() = max(MIN, min(VAL, MAX)) 的简写</li>
      <li>min() 用于限制最大值（如容器宽度）</li>
      <li>max() 用于限制最小值（如保持可读性）</li>
      <li>calc() 中运算符两侧必须有空格</li>
    </ul>
  </div>
</div>`;

const presets = [
  { label: '流式排版', css: `/* 流式排版 — clamp() */
.demo { padding: 20px; font-family: system-ui; }
h1 { font-size: clamp(20px, 5vw, 48px); font-weight: 800; margin: 0 0 12px; line-height: 1.2; }
p { font-size: clamp(14px, 2vw, 18px); color: #555; line-height: 1.6; margin: 0 0 12px; }
.note { font-family: monospace; font-size: 12px; color: #888; padding: 8px; background: #f3f4f6; border-radius: 4px; }`,
    html: `<div class="demo">
  <h1>响应式标题随视口缩放</h1>
  <p>这段正文也使用 clamp() 实现流式排版，在小屏幕和大屏幕上都有合适的字号。</p>
  <div class="note">h1: clamp(20px, 5vw, 48px)<br>p: clamp(14px, 2vw, 18px)</div>
</div>` },
  { label: '响应式间距', css: `/* 响应式间距 */
.demo { padding: max(16px, 3vw); font-family: system-ui; }
.card { padding: clamp(12px, 3vw, 32px); background: #eff6ff; border-radius: 8px; border: 1px solid #3b82f6; margin-bottom: 12px; }
.card h3 { margin: 0 0 8px; font-size: 16px; }
.card p { margin: 0; font-size: 13px; color: #555; }
.gap-demo { display: flex; gap: clamp(8px, 2vw, 24px); }
.box { flex: 1; height: 60px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; }
.note { font-family: monospace; font-size: 11px; color: #888; margin-top: 12px; }`,
    html: `<div class="demo">
  <div class="card"><h3>自适应 padding</h3><p>padding: clamp(12px, 3vw, 32px)</p></div>
  <div class="gap-demo"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>
  <div class="note">gap: clamp(8px, 2vw, 24px)</div>
</div>` },
];

export function MathFunctionDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={520}
    />
  );
}
