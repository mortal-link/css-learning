'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.outer {
  background: #dcfce7;
  border: 2px solid #22c55e;
  padding: 20px;
  display: inline-block;
}
.content {
  background: #dbeafe;
  border: 2px solid #3b82f6;
  padding: 16px;
  text-align: center;
  font-size: 14px;
}
.label {
  margin-top: 12px;
  font-size: 12px;
  color: #666;
  font-family: monospace;
}`;

const defaultHTML = `<div class="outer">
  <div class="content">内容区域 (Content)</div>
</div>
<div class="label">
  绿色 = padding 区域 / 蓝色 = content 区域<br>
  padding: 20px（四边均匀）
</div>`;

const presets = [
  {
    label: '均匀 20px',
    css: `.outer { background: #dcfce7; border: 2px solid #22c55e; padding: 20px; display: inline-block; }
.content { background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; text-align: center; font-size: 14px; }
.label { margin-top: 12px; font-size: 12px; color: #666; font-family: monospace; }`,
    html: `<div class="outer"><div class="content">内容区域</div></div>
<div class="label">padding: 20px; — 四边均匀</div>`,
  },
  {
    label: '上下 40px',
    css: `.outer { background: #dcfce7; border: 2px solid #22c55e; padding: 40px 20px; display: inline-block; }
.content { background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; text-align: center; font-size: 14px; }
.label { margin-top: 12px; font-size: 12px; color: #666; font-family: monospace; }`,
    html: `<div class="outer"><div class="content">内容区域</div></div>
<div class="label">padding: 40px 20px; — 上下40 左右20</div>`,
  },
  {
    label: '左右 20px',
    css: `.outer { background: #dcfce7; border: 2px solid #22c55e; padding: 10px 20px; display: inline-block; }
.content { background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; text-align: center; font-size: 14px; }
.label { margin-top: 12px; font-size: 12px; color: #666; font-family: monospace; }`,
    html: `<div class="outer"><div class="content">内容区域</div></div>
<div class="label">padding: 10px 20px; — 上下10 左右20</div>`,
  },
  {
    label: '不对称',
    css: `.outer { background: #dcfce7; border: 2px solid #22c55e; padding: 40px 60px 20px 40px; display: inline-block; }
.content { background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; text-align: center; font-size: 14px; }
.label { margin-top: 12px; font-size: 12px; color: #666; font-family: monospace; }`,
    html: `<div class="outer"><div class="content">内容区域</div></div>
<div class="label">padding: 40px 60px 20px 40px;<br>上40 右60 下20 左40（顺时针）</div>`,
  },
];

export function PaddingDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={240} />;
}
