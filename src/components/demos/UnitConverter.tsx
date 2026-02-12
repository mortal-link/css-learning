'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 单位转换器 */
.converter { padding: 16px; font-family: system-ui, sans-serif; }
.input-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; margin-bottom: 16px; }
.input-row label { font-size: 11px; color: #888; display: block; margin-bottom: 4px; }
.input-row input, .input-row select {
  padding: 8px; font-size: 13px; border: 1px solid #ddd; border-radius: 6px;
  font-family: monospace; background: #fff;
}
.input-row input { width: 100px; }
.px-result { font-size: 14px; color: #666; margin-bottom: 16px; }
.px-result strong { color: #1a1a1a; font-family: monospace; }
.preview-bar-wrap { margin-bottom: 16px; }
.preview-label { font-size: 11px; color: #888; margin-bottom: 4px; }
.preview-track { height: 32px; background: #f3f4f6; border-radius: 6px; position: relative; overflow: hidden; }
.preview-fill { position: absolute; inset: 0; right: auto; background: rgba(59,130,246,0.2); border-right: 2px solid #3b82f6; transition: width 0.2s; }
.preview-text { position: absolute; inset: 0; display: flex; align-items: center; padding: 0 12px; font-size: 12px; font-family: monospace; color: rgba(0,0,0,0.5); }
.scale-row { display: flex; justify-content: space-between; font-size: 10px; color: #aaa; font-family: monospace; }
.conv-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.conv-table th { text-align: left; padding: 6px 8px; background: #f9fafb; border-bottom: 1px solid #eee; color: #888; font-weight: 600; }
.conv-table td { padding: 6px 8px; border-bottom: 1px solid #f3f4f6; }
.conv-table .unit-badge { display: inline-block; padding: 1px 6px; border-radius: 3px; font-family: monospace; font-size: 10px; font-weight: 600; }
.cat-abs { background: #dbeafe; color: #1e40af; }
.cat-font { background: #fef3c7; color: #92400e; }
.cat-vp { background: #d1fae5; color: #065f46; }
.conv-table .mono { font-family: monospace; text-align: right; }
.cat-header { padding: 6px 8px; background: #f9fafb; color: #888; font-weight: 600; font-size: 11px; }
.highlight { background: rgba(59,130,246,0.05); }`;

const defaultHTML = `<div class="converter">
  <div class="input-row">
    <div><label>数值</label><input id="val" type="number" value="16" oninput="convert()"></div>
    <div><label>单位</label>
      <select id="unit" onchange="convert()">
        <optgroup label="绝对单位">
          <option value="px" selected>px (Pixels)</option>
          <option value="cm">cm (Centimeters)</option>
          <option value="mm">mm (Millimeters)</option>
          <option value="in">in (Inches)</option>
          <option value="pt">pt (Points)</option>
          <option value="pc">pc (Picas)</option>
        </optgroup>
        <optgroup label="字体相对单位">
          <option value="em">em (Parent Em)</option>
          <option value="rem">rem (Root Em)</option>
        </optgroup>
        <optgroup label="视口相对单位">
          <option value="vw">vw (Viewport Width)</option>
          <option value="vh">vh (Viewport Height)</option>
        </optgroup>
      </select>
    </div>
    <div id="px-out" class="px-result">= <strong>16px</strong></div>
  </div>

  <div class="preview-bar-wrap">
    <div class="preview-label" id="preview-label">实时预览 (16px)</div>
    <div class="preview-track">
      <div class="preview-fill" id="fill" style="width:2.67%"></div>
      <div class="preview-text" id="fill-text">16px</div>
    </div>
    <div class="scale-row"><span>0px</span><span>600px</span></div>
  </div>

  <table class="conv-table" id="table"></table>
</div>

<script>
var units = {
  px:  {name:'px',  full:'Pixels',          cat:'abs',  toPx:function(v){return v}},
  cm:  {name:'cm',  full:'Centimeters',     cat:'abs',  toPx:function(v){return v*96/2.54}},
  mm:  {name:'mm',  full:'Millimeters',     cat:'abs',  toPx:function(v){return v*96/25.4}},
  'in':{name:'in',  full:'Inches',          cat:'abs',  toPx:function(v){return v*96}},
  pt:  {name:'pt',  full:'Points',          cat:'abs',  toPx:function(v){return v*96/72}},
  pc:  {name:'pc',  full:'Picas',           cat:'abs',  toPx:function(v){return v*96/6}},
  em:  {name:'em',  full:'Em (parent)',     cat:'font', toPx:function(v){return v*16}},
  rem: {name:'rem', full:'Root Em',         cat:'font', toPx:function(v){return v*16}},
  vw:  {name:'vw',  full:'Viewport Width',  cat:'vp',   toPx:function(v){return v*1920/100}},
  vh:  {name:'vh',  full:'Viewport Height', cat:'vp',   toPx:function(v){return v*1080/100}},
};
var catLabels = {abs:'绝对单位', font:'字体相对单位', vp:'视口相对单位'};
var catCls = {abs:'cat-abs', font:'cat-font', vp:'cat-vp'};

function fmt(n) {
  if (isNaN(n) || !isFinite(n)) return '—';
  return parseFloat(n.toPrecision(6)).toString();
}

function convert() {
  var v = parseFloat(document.getElementById('val').value);
  var u = document.getElementById('unit').value;
  var info = units[u];
  var px = isNaN(v) ? NaN : info.toPx(v);

  document.getElementById('px-out').innerHTML = isNaN(px) ? '—' : '= <strong>' + fmt(px) + 'px</strong>';
  var pct = isNaN(px) ? 0 : Math.min(Math.max(px/600*100, 0), 100);
  document.getElementById('fill').style.width = pct + '%';
  document.getElementById('fill-text').textContent = isNaN(px) ? '' : fmt(v) + u;
  document.getElementById('preview-label').textContent = '实时预览 (' + fmt(px) + 'px)';

  var html = '<tr><th></th><th>单位</th><th style="text-align:right">值</th><th>全称</th></tr>';
  var lastCat = '';
  var keys = Object.keys(units);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var ui = units[k];
    if (ui.cat !== lastCat) {
      lastCat = ui.cat;
      html += '<tr><td colspan="4" class="cat-header">' + catLabels[ui.cat] + '</td></tr>';
    }
    var conv = isNaN(px) ? NaN : px / ui.toPx(1);
    var hl = k === u ? ' highlight' : '';
    html += '<tr class="' + hl + '"><td><span class="unit-badge ' + catCls[ui.cat] + '">' + ui.name + '</span></td>';
    html += '<td>' + ui.full + '</td><td class="mono">' + fmt(conv) + '</td><td></td></tr>';
  }
  document.getElementById('table').innerHTML = html;
}
convert();
</script>`;

const presets = [
  { label: '16px 基准', css: `/* 16px 基准 */
.converter { padding: 16px; font-family: system-ui; }
.input-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; margin-bottom: 16px; }
.input-row label { font-size: 11px; color: #888; display: block; margin-bottom: 4px; }
.input-row input, .input-row select { padding: 8px; font-size: 13px; border: 1px solid #ddd; border-radius: 6px; font-family: monospace; }
.conv-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.conv-table td, .conv-table th { padding: 6px 8px; border-bottom: 1px solid #f3f4f6; }
.unit-badge { display: inline-block; padding: 1px 6px; border-radius: 3px; font-family: monospace; font-size: 10px; font-weight: 600; }
.cat-abs { background: #dbeafe; color: #1e40af; }` },
  { label: '1rem = ?', css: `/* rem 转换 */
.converter { padding: 16px; font-family: system-ui; }
.input-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; margin-bottom: 16px; }
.input-row label { font-size: 11px; color: #888; display: block; margin-bottom: 4px; }
.input-row input, .input-row select { padding: 8px; font-size: 13px; border: 1px solid #ddd; border-radius: 6px; font-family: monospace; }
.conv-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.conv-table td, .conv-table th { padding: 6px 8px; border-bottom: 1px solid #f3f4f6; }
.unit-badge { display: inline-block; padding: 1px 6px; border-radius: 3px; font-family: monospace; font-size: 10px; font-weight: 600; }
.cat-font { background: #fef3c7; color: #92400e; }` },
];

export function UnitConverter() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={460}
    />
  );
}
