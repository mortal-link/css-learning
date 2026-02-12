'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 值定义语法 — 乘法器 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box { padding: 12px 16px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #1e3a5f; }
.multiplier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
.mult-card { padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; text-align: left; background: #f9fafb; }
.mult-card:hover { background: #f3f4f6; }
.mult-card.active { border-color: #3b82f6; background: #eff6ff; }
.mult-symbol { font-size: 20px; font-family: monospace; font-weight: 700; color: #3b82f6; }
.mult-name { font-size: 11px; color: #6b7280; margin-top: 4px; }
.detail-box { padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 16px; }
.detail-symbol { font-size: 28px; font-family: monospace; font-weight: 700; color: #3b82f6; }
.detail-desc { font-size: 13px; color: #6b7280; margin: 8px 0; }
.pattern-box { padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; border-radius: 4px; font-family: monospace; font-size: 13px; }
.examples { margin-top: 12px; }
.examples h4 { font-size: 13px; margin: 0 0 8px; }
.example-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ex-item { padding: 8px 12px; border-radius: 6px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.ex-valid { background: #f0fdf4; border-color: #86efac; }
.ex-invalid { background: #fef2f2; border-color: #fca5a5; }
.ex-mark { font-size: 16px; }
.ex-code { font-family: monospace; font-size: 12px; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; line-height: 1.6; margin-top: 16px; }
.code-comment { color: #6a9955; }
.ref-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 16px; }
.ref-table th, .ref-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left; }
.ref-table th { background: #f9fafb; font-weight: 600; }
.ref-table .mono { font-family: monospace; color: #3b82f6; }`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>CSS 值定义语法：</strong>
    CSS 规范使用特殊符号（乘法器）来定义属性值可以出现的次数和组合方式。
  </div>

  <div class="multiplier-grid" id="grid"></div>
  <div id="detail"></div>

  <div class="code-block">
    <span class="code-comment">/* margin 属性：&lt;length&gt;{1,4} */</span><br>
    margin: 10px;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment">/* 1 个值 */</span><br>
    margin: 10px 20px;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment">/* 2 个值 */</span><br>
    margin: 10px 20px 30px 40px; <span class="code-comment">/* 4 个值 */</span><br><br>
    <span class="code-comment">/* background-image：&lt;image&gt;# */</span><br>
    background-image: url(a.jpg);<br>
    background-image: url(a.jpg), url(b.jpg);<br><br>
    <span class="code-comment">/* animation-name：&lt;name&gt;# */</span><br>
    animation-name: fadeIn, slideUp;
  </div>

  <table class="ref-table">
    <tr><th>组合</th><th>含义</th><th>示例</th></tr>
    <tr><td class="mono">*</td><td>0 或多次，空格分隔</td><td class="mono">&lt;length&gt;*</td></tr>
    <tr><td class="mono">+</td><td>1 或多次，空格分隔</td><td class="mono">&lt;length&gt;+</td></tr>
    <tr><td class="mono">#</td><td>1 或多次，逗号分隔</td><td class="mono">&lt;length&gt;#</td></tr>
    <tr><td class="mono">{1,4}</td><td>1 到 4 次，逗号分隔</td><td class="mono">&lt;length&gt;#{1,4}</td></tr>
  </table>
</div>

<script>
var mults = [
  {sym:'?', name:'可选(0或1次)', desc:'该值可以出现 0 次或 1 次', pattern:'<length>?', valid:['','10px','2em'], invalid:['10px 20px']},
  {sym:'*', name:'零或多次', desc:'该值可以出现 0 次或多次', pattern:'<length>*', valid:['','10px','10px 20px'], invalid:[]},
  {sym:'+', name:'一或多次', desc:'该值必须至少出现 1 次', pattern:'<length>+', valid:['10px','10px 20px'], invalid:['(空)']},
  {sym:'#', name:'逗号分隔', desc:'可多次出现，用逗号分隔', pattern:'<length>#', valid:['10px','10px, 20px'], invalid:['(空)','10px 20px']},
  {sym:'{A,B}', name:'次数范围', desc:'必须出现 A 到 B 次', pattern:'<length>{1,4}', valid:['10px','10px 20px','10px 20px 30px 40px'], invalid:['(空)','5个值']},
  {sym:'!', name:'必需值', desc:'该值是必需的，不能省略', pattern:'<color>!', valid:['red','#ff0000'], invalid:['(空)']},
];
var sel = 0;

function render() {
  var grid = '';
  for (var i = 0; i < mults.length; i++) {
    grid += '<div class="mult-card' + (i===sel?' active':'') + '" onclick="sel=' + i + ';render()">';
    grid += '<div class="mult-symbol">' + mults[i].sym + '</div>';
    grid += '<div class="mult-name">' + mults[i].name + '</div></div>';
  }
  document.getElementById('grid').innerHTML = grid;

  var m = mults[sel];
  var html = '<div class="detail-box">';
  html += '<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;">';
  html += '<span class="detail-symbol">' + m.sym + '</span>';
  html += '<span style="font-size:16px;font-weight:600;">' + m.name + '</span></div>';
  html += '<div class="detail-desc">' + m.desc + '</div>';
  html += '<div class="pattern-box"><span style="font-size:11px;color:#888;">语法示例：</span> ' + m.pattern + '</div></div>';

  html += '<div class="examples"><h4 style="color:#16a34a;">有效示例</h4><div class="example-grid">';
  for (var j = 0; j < m.valid.length; j++) {
    html += '<div class="ex-item ex-valid"><span class="ex-mark">&#10003;</span><span class="ex-code">' + (m.valid[j]||'(空)') + '</span></div>';
  }
  html += '</div></div>';

  if (m.invalid.length) {
    html += '<div class="examples" style="margin-top:8px;"><h4 style="color:#dc2626;">无效示例</h4><div class="example-grid">';
    for (var k = 0; k < m.invalid.length; k++) {
      html += '<div class="ex-item ex-invalid"><span class="ex-mark">&#10007;</span><span class="ex-code">' + (m.invalid[k]||'(空)') + '</span></div>';
    }
    html += '</div></div>';
  }
  document.getElementById('detail').innerHTML = html;
}
render();
</script>`;

const presets = [
  { label: '可选 ?', css: `/* 可选乘法器 ? */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 16px; font-size: 13px; }
.detail-box { padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
.detail-symbol { font-size: 28px; font-family: monospace; font-weight: 700; color: #3b82f6; }
.example-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
.ex-item { padding: 8px 12px; border-radius: 6px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.ex-valid { background: #f0fdf4; border-color: #86efac; }
.ex-invalid { background: #fef2f2; border-color: #fca5a5; }` },
  { label: '逗号分隔 #', css: `/* 逗号分隔乘法器 # */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 16px; font-size: 13px; }
.detail-box { padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
.detail-symbol { font-size: 28px; font-family: monospace; font-weight: 700; color: #3b82f6; }
.example-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
.ex-item { padding: 8px 12px; border-radius: 6px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.ex-valid { background: #f0fdf4; border-color: #86efac; }
.ex-invalid { background: #fef2f2; border-color: #fca5a5; }` },
];

export function ValueSyntaxDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={500}
    />
  );
}
