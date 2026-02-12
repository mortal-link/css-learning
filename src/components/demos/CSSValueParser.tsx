'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 值类型解析器 */
.parser {
  padding: 20px;
  font-family: system-ui, sans-serif;
}
.input-row {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}
.input-row input {
  flex: 1;
  padding: 8px 12px;
  font-family: monospace;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
}
.input-row input:focus { border-color: #3b82f6; }
.quick-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.quick-btns button {
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f5f5f5;
  cursor: pointer;
}
.quick-btns button:hover { background: #e5e5e5; }
.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.result-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
.type-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}
.type-length { background: #dbeafe; color: #1e40af; }
.type-percentage { background: #fef3c7; color: #92400e; }
.type-color { background: #fce7f3; color: #9d174d; }
.type-angle { background: #cffafe; color: #155e75; }
.type-time { background: #ffedd5; color: #9a3412; }
.type-number { background: #d1fae5; color: #065f46; }
.type-function { background: #ede9fe; color: #5b21b6; }
.type-keyword { background: #f3f4f6; color: #374151; }
.type-flex { background: #ccfbf1; color: #134e4a; }
.preview-box {
  min-height: 60px;
  display: flex;
  align-items: center;
}
.color-swatch {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.bar-preview {
  height: 32px;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s;
}
.angle-dial {
  width: 64px; height: 64px;
  border-radius: 50%;
  border: 2px solid #ddd;
  position: relative;
}
.angle-needle {
  position: absolute;
  top: 50%; left: 50%;
  width: 2px; height: 28px;
  background: #3b82f6;
  transform-origin: bottom center;
  border-radius: 2px;
}
.ref-table {
  margin-top: 16px;
  font-size: 12px;
  color: #666;
}
.ref-table dt { font-weight: 600; }
.ref-table dd { margin: 0 0 4px 0; }`;

const defaultHTML = `<div class="parser">
  <div class="quick-btns">
    <button onclick="parse('16px')">长度</button>
    <button onclick="parse('50%')">百分比</button>
    <button onclick="parse('#ff6600')">颜色</button>
    <button onclick="parse('calc(100% - 20px)')">函数</button>
    <button onclick="parse('oklch(0.7 0.15 180)')">oklch</button>
    <button onclick="parse('45deg')">角度</button>
    <button onclick="parse('300ms')">时间</button>
    <button onclick="parse('1fr')">弹性</button>
  </div>

  <div class="input-row">
    <input id="val-input" value="16px" oninput="parse(this.value)" placeholder="输入 CSS 值，如 16px、#ff0、calc(100% - 20px)" />
  </div>

  <div class="result-grid">
    <div class="result-card">
      <div id="type-badge" class="type-badge type-length">&lt;length&gt;</div>
      <p id="detail" style="font-size:13px;color:#666;">绝对长度单位 px</p>
    </div>
    <div class="result-card">
      <div style="font-size:12px;color:#888;margin-bottom:8px;font-weight:600;">实时预览</div>
      <div class="preview-box" id="preview">
        <div class="bar-preview" style="width:16px"></div>
      </div>
    </div>
  </div>

  <div class="ref-table" style="margin-top:20px;">
    <p style="font-weight:600;margin-bottom:4px;">CSS 值类型速查</p>
    <dl style="display:grid;grid-template-columns:auto 1fr;gap:2px 16px;">
      <dt>&lt;length&gt;</dt><dd>px, em, rem, vw, vh, ch...</dd>
      <dt>&lt;percentage&gt;</dt><dd>50%, 100%</dd>
      <dt>&lt;number&gt;</dt><dd>1.5, 0.8, 3</dd>
      <dt>&lt;color&gt;</dt><dd>#hex, rgb(), hsl(), oklch()</dd>
      <dt>&lt;angle&gt;</dt><dd>deg, rad, grad, turn</dd>
      <dt>&lt;time&gt;</dt><dd>s, ms</dd>
      <dt>&lt;flex&gt;</dt><dd>fr</dd>
    </dl>
  </div>
</div>

<script>
var lengthUnits = ['px','em','rem','vw','vh','vmin','vmax','ch','ex','cm','mm','in','pt','pc','fr'];
var angleUnits = ['deg','rad','grad','turn'];
var timeUnits = ['s','ms'];

function parse(v) {
  v = v.trim();
  document.getElementById('val-input').value = v;
  var type = 'unknown', detail = '无法识别', cls = '';

  if (/^#([0-9a-fA-F]{3,8})$/.test(v)) {
    type = '<color>'; detail = '十六进制颜色'; cls = 'type-color';
  } else if (/^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color|color-mix)\\s*\\(/.test(v)) {
    type = '<color>'; detail = '颜色函数'; cls = 'type-color';
  } else if (/^(calc|min|max|clamp)\\s*\\(/.test(v)) {
    type = '<function>'; detail = '数学函数'; cls = 'type-function';
  } else if (/^[+-]?[\\d.]+(%|px|em|rem|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pt|pc|fr)$/.test(v)) {
    var m = v.match(/([a-z%]+)$/);
    var u = m ? m[1] : '';
    if (u === '%') { type = '<percentage>'; detail = '百分比值'; cls = 'type-percentage'; }
    else if (u === 'fr') { type = '<flex>'; detail = '弹性单位 fr'; cls = 'type-flex'; }
    else if (lengthUnits.indexOf(u)>=0) { type = '<length>'; detail = '长度单位 ' + u; cls = 'type-length'; }
    else if (angleUnits.indexOf(u)>=0) { type = '<angle>'; detail = '角度单位 ' + u; cls = 'type-angle'; }
    else if (timeUnits.indexOf(u)>=0) { type = '<time>'; detail = '时间单位 ' + u; cls = 'type-time'; }
  } else if (/^[+-]?[\\d.]+$/.test(v)) {
    type = '<number>'; detail = '数值'; cls = 'type-number';
  }

  document.getElementById('type-badge').textContent = type;
  document.getElementById('type-badge').className = 'type-badge ' + cls;
  document.getElementById('detail').textContent = detail;

  var preview = document.getElementById('preview');
  if (type === '<color>') {
    preview.innerHTML = '<div class="color-swatch" style="background:'+v+'"></div><span style="margin-left:12px;font-family:monospace;font-size:13px;">'+v+'</span>';
  } else if (type === '<angle>') {
    preview.innerHTML = '<div class="angle-dial"><div class="angle-needle" style="transform:translate(-50%,-100%) rotate('+v+')"></div></div>';
  } else if (type === '<length>' || type === '<percentage>' || type === '<function>') {
    preview.innerHTML = '<div style="width:100%;background:#e5e7eb;border-radius:4px;overflow:hidden;"><div class="bar-preview" style="width:'+v+'"></div></div>';
  } else {
    preview.innerHTML = '<span style="font-size:13px;color:#999;">该类型无可视化预览</span>';
  }
}
</script>`;

const presets = [
  { label: '长度 16px', css: `/* 长度值 */
.parser { padding: 20px; font-family: system-ui, sans-serif; }
.input-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
.input-row input { flex: 1; padding: 8px 12px; font-family: monospace; font-size: 14px; border: 2px solid #ddd; border-radius: 6px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
.type-badge { display: inline-block; padding: 2px 10px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 600; background: #dbeafe; color: #1e40af; }
.demo-bar { height: 32px; background: #3b82f6; border-radius: 4px; transition: width 0.3s; }` },
  { label: '颜色值', css: `/* 颜色值展示 */
.color-demo {
  padding: 20px;
  font-family: system-ui;
}
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}
.color-item {
  text-align: center;
}
.swatch {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 4px;
}
.swatch-label {
  font-family: monospace;
  font-size: 11px;
  color: #666;
}`,
    html: `<div class="color-demo">
  <h3 style="margin:0 0 12px;">CSS 颜色类型</h3>
  <div class="color-grid">
    <div class="color-item"><div class="swatch" style="background:#ff6600;"></div><div class="swatch-label">#ff6600</div></div>
    <div class="color-item"><div class="swatch" style="background:rgb(59,130,246);"></div><div class="swatch-label">rgb()</div></div>
    <div class="color-item"><div class="swatch" style="background:hsl(280,70%,50%);"></div><div class="swatch-label">hsl()</div></div>
    <div class="color-item"><div class="swatch" style="background:oklch(0.7 0.15 180);"></div><div class="swatch-label">oklch()</div></div>
    <div class="color-item"><div class="swatch" style="background:transparent; border-style:dashed;"></div><div class="swatch-label">transparent</div></div>
    <div class="color-item"><div class="swatch" style="background:currentcolor;color:coral;"></div><div class="swatch-label">currentcolor</div></div>
  </div>
</div>` },
];

export function CSSValueParser() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={420}
    />
  );
}
