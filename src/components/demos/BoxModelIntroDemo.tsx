'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #fff7ed;
}

/* margin 层 */
.margin-box {
  padding: 10px;
  background: rgba(251, 191, 36, 0.15);
  border: 2px dashed rgba(251, 191, 36, 0.5);
  position: relative;
}
.margin-box::before {
  content: 'margin: 10px';
  position: absolute; top: -1px; left: 4px;
  font-size: 10px; color: #b45309; font-family: monospace;
}

/* border 层 */
.border-box {
  padding: 5px;
  background: rgba(34, 197, 94, 0.15);
  border: 5px solid rgba(34, 197, 94, 0.5);
}

/* padding 层 */
.padding-box {
  padding: 20px;
  background: rgba(59, 130, 246, 0.15);
  border: 2px dashed rgba(59, 130, 246, 0.5);
}

/* content 层 */
.content-box {
  width: 200px;
  height: 100px;
  background: rgba(168, 85, 247, 0.15);
  border: 2px solid rgba(168, 85, 247, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: monospace;
  color: #7c3aed;
}

.info {
  font-size: 11px;
  color: #555;
  padding: 8px;
  text-align: center;
  font-family: monospace;
}`;

const defaultHTML = `<div class="wrapper">
  <div class="margin-box">
    <div class="border-box">
      <div class="padding-box">
        <div class="content-box">Content 200×100</div>
      </div>
    </div>
  </div>
</div>
<div class="info">
  content-box 模型：width 指定内容区宽度<br>
  总宽度 = 200 + 20×2 + 5×2 + 10×2 = 270px
</div>`;

const presets = [
  {
    label: '标准盒模型',
    css: `.wrapper { display:flex; align-items:center; justify-content:center; padding:16px; background:#fff7ed; }
.margin-box { padding:10px; background:rgba(251,191,36,0.15); border:2px dashed rgba(251,191,36,0.5); position:relative; }
.margin-box::before { content:'margin:10px'; position:absolute; top:-1px; left:4px; font-size:10px; color:#b45309; font-family:monospace; }
.border-box { padding:5px; background:rgba(34,197,94,0.15); border:5px solid rgba(34,197,94,0.5); }
.padding-box { padding:20px; background:rgba(59,130,246,0.15); border:2px dashed rgba(59,130,246,0.5); }
.content-box { width:200px; height:100px; background:rgba(168,85,247,0.15); border:2px solid rgba(168,85,247,0.5); display:flex; align-items:center; justify-content:center; font-size:12px; font-family:monospace; color:#7c3aed; box-sizing:content-box; }
.info { font-size:11px; color:#555; padding:8px; text-align:center; font-family:monospace; }`,
    html: `<div class="wrapper"><div class="margin-box"><div class="border-box"><div class="padding-box"><div class="content-box">Content 200×100</div></div></div></div></div>
<div class="info">content-box：width = 内容宽度 → 总宽度 = 200+40+10+20 = 270px</div>`,
  },
  {
    label: '替代盒模型',
    css: `.wrapper { display:flex; align-items:center; justify-content:center; padding:16px; background:#f0fdf4; }
.box { width:200px; height:100px; padding:20px; border:5px solid rgba(34,197,94,0.5); margin:10px; box-sizing:border-box; background:rgba(59,130,246,0.15); display:flex; align-items:center; justify-content:center; font-size:12px; font-family:monospace; color:#2563eb; }
.info { font-size:11px; color:#555; padding:8px; text-align:center; font-family:monospace; }`,
    html: `<div class="wrapper"><div class="box">border-box 200×100</div></div>
<div class="info">border-box：width 包含 padding + border → 内容区 = 200-40-10 = 150px</div>`,
  },
  {
    label: 'display:none',
    css: `.wrapper { padding:16px; background:#fef2f2; }
.visible { padding:12px; background:#dbeafe; border:2px solid #3b82f6; margin:8px 0; font-size:13px; }
.hidden { display:none; padding:12px; background:#fca5a5; border:2px solid #ef4444; margin:8px 0; font-size:13px; }
.info { font-size:11px; color:#555; padding:8px; text-align:center; font-family:monospace; }`,
    html: `<div class="wrapper">
  <div class="visible">可见元素 (display: block)</div>
  <div class="hidden">隐藏元素 (display: none)</div>
  <div class="visible">可见元素 (display: block)</div>
</div>
<div class="info">display:none → 不生成盒子，不参与布局和渲染</div>`,
  },
  {
    label: '列表项多盒',
    css: `.wrapper { padding:16px; background:#faf5ff; }
.list-item { display:list-item; list-style:disc inside; padding:12px; background:#e9d5ff; border:2px solid #a855f7; margin:8px 16px; font-size:13px; }
.info { font-size:11px; color:#555; padding:8px; text-align:center; font-family:monospace; }`,
    html: `<div class="wrapper">
  <div class="list-item">列表项 1（主盒 + 标记盒）</div>
  <div class="list-item">列表项 2（主盒 + 标记盒）</div>
</div>
<div class="info">display:list-item → 生成 2 个盒子（主盒 + marker 标记盒）</div>`,
  },
];

export function BoxModelIntroDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={280} />;
}
