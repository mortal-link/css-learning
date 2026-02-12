'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo-box {
  writing-mode: horizontal-tb;
  margin-inline: 20px;
  margin-block: 30px;
  padding-inline: 16px;
  padding-block: 12px;
  border-inline: 3px solid #3b82f6;
  background: #dbeafe;
  display: inline-block;
}
.content {
  background: white;
  padding: 12px;
  font-size: 14px;
}
.info {
  font-size: 11px;
  color: #555;
  padding: 8px 12px;
  margin-top: 12px;
  font-family: monospace;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
}`;

const defaultHTML = `<div class="demo-box">
  <div class="content">示例文本 Example Text</div>
</div>
<div class="info">
  writing-mode: horizontal-tb<br>
  margin-inline → margin-left/right | margin-block → margin-top/bottom
</div>`;

const presets = [
  {
    label: 'English (LTR)',
    css: `.demo-box { writing-mode: horizontal-tb; margin-inline: 20px; margin-block: 30px; padding-inline: 16px; padding-block: 12px; border-inline: 3px solid #3b82f6; background: #dbeafe; display: inline-block; }
.content { background: white; padding: 12px; font-size: 14px; }
.info { font-size: 11px; color: #555; padding: 8px 12px; margin-top: 12px; font-family: monospace; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; }`,
    html: `<div class="demo-box"><div class="content">English text flows left to right</div></div>
<div class="info">horizontal-tb: inline = 水平(left/right), block = 垂直(top/bottom)</div>`,
  },
  {
    label: 'Arabic (RTL)',
    css: `.demo-box { writing-mode: horizontal-tb; direction: rtl; margin-inline: 24px; margin-block: 20px; padding-inline: 20px; padding-block: 10px; border-inline: 2px solid #22c55e; background: #dcfce7; display: inline-block; }
.content { background: white; padding: 12px; font-size: 14px; }
.info { font-size: 11px; color: #555; padding: 8px 12px; margin-top: 12px; font-family: monospace; background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; direction: ltr; }`,
    html: `<div class="demo-box"><div class="content">نص عربي من اليمين إلى اليسار</div></div>
<div class="info">RTL: margin-inline-start → margin-right (逻辑属性自动适配方向)</div>`,
  },
  {
    label: 'Japanese (vertical)',
    css: `.demo-box { writing-mode: vertical-rl; margin-inline: 16px; margin-block: 24px; padding-inline: 12px; padding-block: 16px; border-inline: 4px solid #a855f7; background: #f3e8ff; display: inline-block; }
.content { background: white; padding: 12px; font-size: 14px; }
.info { font-size: 11px; color: #555; padding: 8px 12px; margin-top: 12px; font-family: monospace; background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 4px; }`,
    html: `<div class="demo-box"><div class="content">日本語テキスト 縦書き</div></div>
<div class="info">vertical-rl: inline = 垂直(top/bottom), block = 水平(left/right)<br>逻辑属性自动旋转映射！</div>`,
  },
  {
    label: '对比: 逻辑 vs 物理',
    css: `.row { display: flex; gap: 16px; flex-wrap: wrap; padding: 8px; }
.logical { writing-mode: vertical-rl; margin-inline: 12px; padding-inline: 16px; border-inline: 3px solid #3b82f6; background: #dbeafe; display: inline-block; }
.physical { writing-mode: vertical-rl; margin-left: 12px; margin-right: 12px; padding-left: 16px; padding-right: 16px; border-left: 3px solid #ef4444; border-right: 3px solid #ef4444; background: #fee2e2; display: inline-block; }
.content { background: white; padding: 8px; font-size: 13px; }
.label { font-size: 11px; font-weight: bold; margin-bottom: 4px; }
.info { font-size: 11px; color: #555; padding: 8px 12px; margin-top: 12px; font-family: monospace; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; }`,
    html: `<div class="row">
  <div>
    <div class="label" style="color:#2563eb">逻辑属性 (推荐)</div>
    <div class="logical"><div class="content">垂直文字</div></div>
  </div>
  <div>
    <div class="label" style="color:#dc2626">物理属性</div>
    <div class="physical"><div class="content">垂直文字</div></div>
  </div>
</div>
<div class="info">逻辑属性(蓝)：border-inline 跟随文字流向自动旋转<br>物理属性(红)：border-left/right 始终在左右，不随书写模式变化</div>`,
  },
];

export function LogicalPropsDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={280} />;
}
