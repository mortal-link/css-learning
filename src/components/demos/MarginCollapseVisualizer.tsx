'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  background: #f8fafc;
  padding: 16px;
}
.box1 {
  background: #3b82f6;
  color: white;
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 40px;
}
.box2 {
  background: #22c55e;
  color: white;
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 30px;
}
.info {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  padding: 8px 12px;
  margin-top: 12px;
  font-size: 12px;
  border-radius: 4px;
}`;

const defaultHTML = `<div class="container">
  <div class="box1">第一个元素 (margin-bottom: 40px)</div>
  <div class="box2">第二个元素 (margin-top: 30px)</div>
</div>
<div class="info">
  <strong>折叠规则：</strong>相邻元素的 margin-bottom(40px) 和 margin-top(30px)
  折叠为较大值 <strong>40px</strong>，而不是相加为 70px。
</div>`;

const presets = [
  {
    label: '相邻兄弟元素',
    css: `.container { background: #f8fafc; padding: 16px; }
.box1 { background: #3b82f6; color: white; padding: 16px; border-radius: 4px; font-size: 14px; margin-bottom: 40px; }
.box2 { background: #22c55e; color: white; padding: 16px; border-radius: 4px; font-size: 14px; margin-top: 30px; }
.info { background: #fef3c7; border: 1px solid #fbbf24; padding: 8px 12px; margin-top: 12px; font-size: 12px; border-radius: 4px; }`,
    html: `<div class="container">
  <div class="box1">第一个元素 (margin-bottom: 40px)</div>
  <div class="box2">第二个元素 (margin-top: 30px)</div>
</div>
<div class="info"><strong>相邻兄弟：</strong>margin-bottom(40px) 和 margin-top(30px) 折叠为 <strong>40px</strong></div>`,
  },
  {
    label: '父子元素',
    css: `.ref { background: #fef3c7; padding: 8px; font-size: 13px; text-align: center; }
.parent { margin-top: 40px; background: #eff6ff; border: none; padding: 0; }
.parent-label { font-size: 10px; color: #3b82f6; padding: 4px 8px; }
.child { background: #3b82f6; color: white; padding: 16px; border-radius: 4px; font-size: 14px; margin-top: 30px; }
.info { background: #fef3c7; border: 1px solid #fbbf24; padding: 8px 12px; margin-top: 12px; font-size: 12px; border-radius: 4px; }`,
    html: `<div class="ref">参照元素</div>
<div class="parent">
  <div class="parent-label">父元素 (margin-top: 40px, 无 border/padding)</div>
  <div class="child">子元素 (margin-top: 30px)</div>
</div>
<div class="info"><strong>父子折叠：</strong>父 margin-top(40px) 与子 margin-top(30px) 合并为 <strong>40px</strong></div>`,
  },
  {
    label: '空块元素',
    css: `.box1 { background: #3b82f6; color: white; padding: 16px; border-radius: 4px; font-size: 14px; }
.empty { margin-top: 40px; margin-bottom: 30px; }
.box2 { background: #22c55e; color: white; padding: 16px; border-radius: 4px; font-size: 14px; }
.info { background: #fef3c7; border: 1px solid #fbbf24; padding: 8px 12px; margin-top: 12px; font-size: 12px; border-radius: 4px; }`,
    html: `<div class="box1">前一个元素</div>
<div class="empty"><!-- 空元素 --></div>
<div class="box2">后一个元素</div>
<div class="info"><strong>空元素折叠：</strong>margin-top(40px) 与 margin-bottom(30px) 自身折叠为 <strong>40px</strong></div>`,
  },
  {
    label: '阻止折叠 (overflow)',
    css: `.container { background: #f8fafc; padding: 16px; overflow: hidden; }
.box1 { background: #3b82f6; color: white; padding: 16px; border-radius: 4px; font-size: 14px; margin-bottom: 40px; }
.box2 { background: #22c55e; color: white; padding: 16px; border-radius: 4px; font-size: 14px; margin-top: 30px; }
.info { background: #dcfce7; border: 1px solid #86efac; padding: 8px 12px; margin-top: 12px; font-size: 12px; border-radius: 4px; }`,
    html: `<div class="container">
  <div class="box1">第一个元素 (margin-bottom: 40px)</div>
  <div class="box2">第二个元素 (margin-top: 30px)</div>
</div>
<div class="info"><strong>BFC 阻止折叠：</strong>容器 overflow:hidden 创建新 BFC，但内部兄弟元素仍然折叠</div>`,
  },
];

export function MarginCollapseVisualizer() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={260} />;
}
