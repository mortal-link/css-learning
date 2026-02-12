'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 全局关键字演示 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box { padding: 12px 16px; background: #faf5ff; border-left: 4px solid #a855f7; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #581c87; }
.parent-box { padding: 16px; border: 2px solid #3b82f6; border-radius: 8px; background: #eff6ff; position: relative; }
.parent-label { font-size: 11px; font-weight: 600; color: #2563eb; margin-bottom: 8px; }
.parent-prop { font-family: monospace; font-size: 13px; }
.parent-prop .key { color: #6b7280; }
.parent-prop .val { font-weight: 600; }
.child-box { margin-top: 16px; padding: 16px; border: 2px solid #a855f7; border-radius: 8px; background: rgba(168,85,247,0.1); }
.child-label { font-size: 11px; font-weight: 600; color: #a855f7; margin-bottom: 8px; }
.result-row { margin-top: 8px; font-size: 12px; }
.result-row .key { color: #6b7280; }
.result-row .val { font-family: monospace; font-weight: 600; color: #a855f7; }
.explain-box { margin-top: 16px; padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
.explain-box .title { font-size: 11px; font-weight: 600; margin-bottom: 4px; }
.explain-box p { font-size: 13px; color: #6b7280; margin: 0; }
.ref-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 16px; }
.ref-table th, .ref-table td { padding: 8px; border: 1px solid #e5e7eb; text-align: left; }
.ref-table th { background: #f3f4f6; font-weight: 600; }
.ref-table .mono { font-family: monospace; color: #a855f7; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; line-height: 1.6; margin-top: 16px; }
.code-comment { color: #6a9955; }`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>CSS 全局关键字：</strong>所有 CSS 属性都接受 initial、inherit、unset、revert、revert-layer 这些全局关键字。
  </div>

  <div class="parent-box">
    <div class="parent-label">父元素 (Parent)</div>
    <div class="parent-prop"><span class="key">color:</span> <span class="val" style="color:blue;">blue</span></div>
    <div style="font-size:11px;color:#2563eb;margin-top:4px;">计算值：blue</div>

    <div class="child-box">
      <div class="child-label">子元素 (Child)</div>
      <div class="parent-prop"><span class="key">color:</span> <span class="val">initial</span></div>
      <div class="result-row"><span class="key">指定值：</span><span class="val">initial</span></div>
      <div class="result-row"><span class="key">计算值：</span><span class="val">black</span></div>
    </div>
  </div>

  <div class="explain-box">
    <div class="title">解析过程</div>
    <p>使用属性的初始值：black（color 的初始值为 black）</p>
  </div>

  <table class="ref-table">
    <tr><th>关键字</th><th>继承属性</th><th>非继承属性</th></tr>
    <tr><td class="mono">initial</td><td>→ 初始值</td><td>→ 初始值</td></tr>
    <tr><td class="mono">inherit</td><td>→ 父元素计算值</td><td>→ 父元素计算值</td></tr>
    <tr><td class="mono">unset</td><td>→ 父元素计算值（=inherit）</td><td>→ 初始值（=initial）</td></tr>
    <tr><td class="mono">revert</td><td>→ 用户代理样式</td><td>→ 用户代理样式</td></tr>
    <tr><td class="mono">revert-layer</td><td>→ 上一层样式</td><td>→ 上一层样式</td></tr>
  </table>

  <div class="code-block">
    .parent {<br>
    &nbsp;&nbsp;color: blue;<br>
    }<br><br>
    .child {<br>
    &nbsp;&nbsp;color: initial;<br>
    &nbsp;&nbsp;<span class="code-comment">/* 计算值: black */</span><br>
    }
  </div>
</div>`;

const presets = [
  { label: 'initial (继承属性)', html: `<div class="demo">
  <div class="info-box"><strong>initial：</strong>使用属性的初始值，不管是否为继承属性。</div>
  <div class="parent-box">
    <div class="parent-label">父元素</div>
    <div class="parent-prop"><span class="key">color:</span> <span class="val" style="color:blue;">blue</span></div>
    <div class="child-box">
      <div class="child-label">子元素</div>
      <div class="parent-prop"><span class="key">color:</span> <span class="val">initial</span></div>
      <div class="result-row"><span class="key">计算值：</span><span class="val">black</span></div>
      <div style="margin-top:8px;padding:8px;border-radius:4px;background:white;color:black;">这段文字是 black（初始值）</div>
    </div>
  </div>
</div>` },
  { label: 'inherit (非继承属性)', html: `<div class="demo">
  <div class="info-box"><strong>inherit：</strong>强制继承父元素的计算值，即使是非继承属性。</div>
  <div class="parent-box" style="border-color:#16a34a;background:#f0fdf4;">
    <div class="parent-label" style="color:#16a34a;">父元素</div>
    <div class="parent-prop"><span class="key">border:</span> <span class="val" style="color:#16a34a;">2px solid green</span></div>
    <div class="child-box">
      <div class="child-label">子元素</div>
      <div class="parent-prop"><span class="key">border:</span> <span class="val">inherit</span></div>
      <div class="result-row"><span class="key">计算值：</span><span class="val">2px solid green</span></div>
      <div style="margin-top:8px;padding:8px;border:2px solid green;border-radius:4px;">border 继承自父元素</div>
    </div>
  </div>
</div>` },
  { label: 'unset 对比', html: `<div class="demo">
  <div class="info-box"><strong>unset：</strong>继承属性→inherit，非继承属性→initial。</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div class="parent-box">
      <div class="parent-label">color (继承属性)</div>
      <div class="parent-prop"><span class="key">color:</span> <span class="val" style="color:blue;">blue</span></div>
      <div class="child-box"><div class="child-label">unset = inherit</div>
        <div class="result-row"><span class="key">计算值：</span><span class="val">blue</span></div>
        <div style="margin-top:8px;padding:8px;background:white;border-radius:4px;color:blue;">继承 blue</div>
      </div>
    </div>
    <div class="parent-box" style="border-color:#16a34a;background:#f0fdf4;">
      <div class="parent-label" style="color:#16a34a;">border (非继承属性)</div>
      <div class="parent-prop"><span class="key">border:</span> <span class="val">2px solid green</span></div>
      <div class="child-box"><div class="child-label">unset = initial</div>
        <div class="result-row"><span class="key">计算值：</span><span class="val">none</span></div>
        <div style="margin-top:8px;padding:8px;background:white;border-radius:4px;">无边框</div>
      </div>
    </div>
  </div>
</div>` },
];

export function CSSKeywordDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={480}
    />
  );
}
