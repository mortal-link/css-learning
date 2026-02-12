'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 转义规则演示 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box { padding: 12px 16px; background: #fff7ed; border-left: 4px solid #f97316; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #9a3412; }
.scenario-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.scenario { padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
.scenario h4 { font-size: 12px; font-weight: 600; margin: 0 0 4px; }
.scenario .input { font-family: monospace; font-size: 11px; color: #6b7280; }
.scenario .output { font-family: monospace; font-size: 12px; color: #16a34a; margin-top: 4px; font-weight: 600; }
.result-box { padding: 16px; border-radius: 8px; margin-bottom: 12px; }
.result-original { background: #f9fafb; border: 1px solid #e5e7eb; }
.result-escaped { background: rgba(168,85,247,0.1); border: 2px solid #a855f7; }
.result-api { background: #f0fdf4; border: 1px solid #22c55e; }
.result-label { font-size: 11px; font-weight: 600; margin-bottom: 4px; }
.result-code { font-family: monospace; font-size: 14px; font-weight: 700; word-break: break-all; }
.rule-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
.rule-card { padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; }
.rule-card h4 { font-size: 12px; font-weight: 600; margin: 0 0 4px; }
.rule-card p { font-size: 11px; color: #6b7280; margin: 0 0 8px; }
.rule-example { font-family: monospace; font-size: 11px; }
.rule-example .bad { color: #dc2626; }
.rule-example .good { color: #16a34a; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; line-height: 1.6; margin-top: 16px; }
.code-comment { color: #6a9955; }`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>CSS 转义规则：</strong>当类名或 ID 包含特殊字符、数字开头或空格时，必须在 CSS 选择器中进行转义。
  </div>

  <div class="scenario-grid">
    <div class="scenario"><h4>数字开头</h4><div class="input">class="1foo"</div><div class="output">.\\31 foo</div></div>
    <div class="scenario"><h4>特殊字符 @</h4><div class="input">class="my@class"</div><div class="output">.my\\@class</div></div>
    <div class="scenario"><h4>空格</h4><div class="input">class="my class"</div><div class="output">.my\\ class</div></div>
    <div class="scenario"><h4>冒号</h4><div class="input">class="col:12"</div><div class="output">.col\\:12</div></div>
    <div class="scenario"><h4>方括号</h4><div class="input">class="data[value]"</div><div class="output">.data\\[value\\]</div></div>
    <div class="scenario"><h4>Unicode</h4><div class="input">class="测试类名"</div><div class="output">.\\6d4b \\8bd5 \\7c7b \\540d</div></div>
  </div>

  <div class="result-box result-original">
    <div class="result-label" style="color:#6b7280;">HTML 属性值（原始）</div>
    <div class="result-code">class="1foo"</div>
  </div>
  <div class="result-box result-escaped">
    <div class="result-label" style="color:#a855f7;">CSS 选择器（转义后）</div>
    <div class="result-code">.\\31 foo</div>
  </div>

  <div class="rule-grid">
    <div class="rule-card">
      <h4>数字开头</h4><p>使用 Unicode 码点转义</p>
      <div class="rule-example"><span class="bad">1</span>foo → <span class="good">\\31 </span>foo</div>
    </div>
    <div class="rule-card">
      <h4>特殊字符</h4><p>在字符前加反斜杠</p>
      <div class="rule-example">my<span class="bad">@</span>class → my<span class="good">\\@</span>class</div>
    </div>
    <div class="rule-card">
      <h4>空格</h4><p>转义为 \\20 或 \\(空格)</p>
      <div class="rule-example">my<span class="bad"> </span>class → my<span class="good">\\ </span>class</div>
    </div>
    <div class="rule-card">
      <h4>Unicode 字符</h4><p>可选转义（不强制）</p>
      <div class="rule-example"><span class="bad">测</span>试 → <span class="good">\\6d4b </span>\\8bd5</div>
    </div>
  </div>

  <div class="code-block">
    <span class="code-comment">/* HTML */</span><br>
    &lt;div class="1foo"&gt;内容&lt;/div&gt;<br><br>
    <span class="code-comment">/* CSS */</span><br>
    .\\31 foo {<br>
    &nbsp;&nbsp;color: red;<br>
    &nbsp;&nbsp;font-weight: bold;<br>
    }<br><br>
    <span class="code-comment">/* JavaScript API */</span><br>
    const selector = "." + CSS.escape("1foo");<br>
    document.querySelector(selector);
  </div>
</div>`;

const presets = [
  { label: '数字开头', css: `/* 数字开头类名转义 */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #fff7ed; border-left: 4px solid #f97316; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #9a3412; }
.result-box { padding: 16px; border-radius: 8px; margin-bottom: 12px; }
.result-escaped { background: rgba(168,85,247,0.1); border: 2px solid #a855f7; }
.result-label { font-size: 11px; font-weight: 600; margin-bottom: 4px; color: #a855f7; }
.result-code { font-family: monospace; font-size: 14px; font-weight: 700; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; line-height: 1.6; margin-top: 16px; }
.code-comment { color: #6a9955; }
.\\31 foo { color: red; font-weight: bold; padding: 8px; background: #fef2f2; border-radius: 4px; margin-top: 12px; }`,
    html: `<div class="demo">
  <div class="info-box"><strong>数字开头：</strong>CSS 标识符不能以数字开头，需要转义。</div>
  <div class="result-box result-escaped">
    <div class="result-label">转义结果</div>
    <div class="result-code">.\\31 foo { color: red; }</div>
  </div>
  <div class="1foo">这个元素的 class 是 "1foo"，已通过转义选择器应用样式</div>
</div>` },
  { label: '特殊字符', css: `/* 特殊字符转义 */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #fff7ed; border-left: 4px solid #f97316; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #9a3412; }
.scenario-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.scenario { padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
.scenario h4 { font-size: 12px; font-weight: 600; margin: 0 0 4px; }
.scenario .output { font-family: monospace; font-size: 12px; color: #16a34a; margin-top: 4px; font-weight: 600; }` },
];

export function CSSEscapeDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={500}
    />
  );
}
