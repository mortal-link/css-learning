'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  background: #f8fafc;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
}
.box1 {
  background: #dbeafe;
  border: 2px solid #3b82f6;
  padding: 12px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 14px;
}
.box2 {
  background: #dcfce7;
  border: 2px solid #22c55e;
  padding: 12px;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}
.info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 8px 12px;
  margin: 12px 0;
  font-size: 12px;
  color: #1e40af;
  border-radius: 4px;
}`;

const defaultHTML = `<div class="container">
  <div class="box1">元素 1 (margin-bottom: 30px)</div>
  <div class="box2">元素 2 (margin-top: 20px)</div>
</div>
<div class="info">
  折叠结果：间距 = max(30px, 20px) = <strong>30px</strong>，而非 50px
</div>`;

const presets = [
  {
    label: '相邻兄弟',
    css: `.container { background: #f8fafc; padding: 0 16px; border: 1px solid #e2e8f0; }
.box1 { background: #dbeafe; border: 2px solid #3b82f6; padding: 12px; margin-bottom: 30px; text-align: center; font-size: 14px; }
.box2 { background: #dcfce7; border: 2px solid #22c55e; padding: 12px; margin-top: 20px; text-align: center; font-size: 14px; }
.info { background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px 12px; margin: 12px 0; font-size: 12px; color: #1e40af; border-radius: 4px; }`,
    html: `<div class="container">
  <div class="box1">元素 1 (margin-bottom: 30px)</div>
  <div class="box2">元素 2 (margin-top: 20px)</div>
</div>
<div class="info">相邻兄弟：间距 = max(30, 20) = <strong>30px</strong></div>`,
  },
  {
    label: '父子关系',
    css: `.parent { border: none; padding: 0; margin-top: 20px; background: #f3e8ff; }
.child { background: #dbeafe; border: 2px solid #3b82f6; padding: 12px; margin-top: 40px; text-align: center; font-size: 14px; }
.ref { background: #fef3c7; padding: 8px; margin-bottom: 4px; font-size: 13px; text-align: center; }
.info { background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px 12px; margin: 12px 0; font-size: 12px; color: #1e40af; border-radius: 4px; }`,
    html: `<div class="ref">参照元素</div>
<div class="parent">
  <div class="child">子元素 (margin-top: 40px)</div>
</div>
<div class="info">父子折叠：父 margin-top(20px) 与子 margin-top(40px) 合并为 <strong>40px</strong>。添加 padding 或 border 可阻止。</div>`,
  },
  {
    label: '空元素',
    css: `.box1 { background: #dbeafe; border: 2px solid #3b82f6; padding: 12px; text-align: center; font-size: 14px; }
.empty { margin-top: 30px; margin-bottom: 20px; /* 无 height/padding/border/内容 */ }
.box2 { background: #dcfce7; border: 2px solid #22c55e; padding: 12px; text-align: center; font-size: 14px; }
.info { background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px 12px; margin: 12px 0; font-size: 12px; color: #1e40af; border-radius: 4px; }`,
    html: `<div class="box1">元素 1</div>
<div class="empty"></div>
<div class="box2">元素 2</div>
<div class="info">空元素自身的 margin-top(30px) 与 margin-bottom(20px) 折叠为 <strong>30px</strong></div>`,
  },
  {
    label: '阻止折叠',
    css: `.parent { padding: 1px; border: 2px solid #a855f7; margin-top: 20px; background: #f3e8ff; }
.child { background: #dbeafe; border: 2px solid #3b82f6; padding: 12px; margin-top: 40px; text-align: center; font-size: 14px; }
.ref { background: #fef3c7; padding: 8px; margin-bottom: 4px; font-size: 13px; text-align: center; }
.info { background: #dcfce7; border: 1px solid #86efac; padding: 8px 12px; margin: 12px 0; font-size: 12px; color: #166534; border-radius: 4px; }`,
    html: `<div class="ref">参照元素</div>
<div class="parent">
  <div class="child">子元素 (margin-top: 40px)</div>
</div>
<div class="info">父元素有 border/padding，阻止了折叠！父 margin(20px) 和子 margin(40px) 各自独立生效。</div>`,
  },
];

export function MarginCollapseDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={250} />;
}
