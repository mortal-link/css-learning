'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* position: static (默认) */
.parent {
  position: relative;
  width: 90%;
  height: 200px;
  margin: 16px auto;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
}
.parent-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: white;
  padding: 0 6px;
  font-size: 12px;
  color: #3b82f6;
  font-weight: 500;
}
.child {
  position: static;
  width: 80px;
  height: 80px;
  margin: 20px;
  background: #f43f5e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.note {
  max-width: 90%;
  margin: 12px auto 0;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="parent">
  <span class="parent-label">父元素 (position: relative)</span>
  <div class="child">子元素</div>
</div>
<div class="note">
  <strong>STATIC:</strong> 默认定位。元素按照正常文档流布局，top/left/right/bottom 属性无效。
</div>`;

const presets = [
  {
    label: 'static',
    css: `.parent {
  position: relative; width: 90%; height: 200px; margin: 16px auto;
  border: 2px solid #93c5fd; border-radius: 8px; background: #eff6ff;
}
.parent-label { position: absolute; top: -10px; left: 12px; background: white; padding: 0 6px; font-size: 12px; color: #3b82f6; }
.child {
  position: static;
  width: 80px; height: 80px; margin: 20px;
  background: #f43f5e; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 12px; font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.note { max-width: 90%; margin: 12px auto 0; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; color: #475569; }`,
    html: `<div class="parent">
  <span class="parent-label">父元素 (position: relative)</span>
  <div class="child">static</div>
</div>
<div class="note"><strong>STATIC:</strong> 默认值，按正常文档流布局，top/left 无效。</div>`,
  },
  {
    label: 'relative',
    css: `.parent {
  position: relative; width: 90%; height: 200px; margin: 16px auto;
  border: 2px solid #93c5fd; border-radius: 8px; background: #eff6ff;
}
.parent-label { position: absolute; top: -10px; left: 12px; background: white; padding: 0 6px; font-size: 12px; color: #3b82f6; }
.ghost {
  position: absolute; top: 20px; left: 20px;
  width: 80px; height: 80px;
  border: 2px dashed #94a3b8; border-radius: 8px;
}
.ghost-label { position: absolute; top: -16px; font-size: 10px; color: #94a3b8; white-space: nowrap; }
.child {
  position: relative;
  top: 20px;
  left: 30px;
  width: 80px; height: 80px; margin: 20px;
  background: #f43f5e; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 12px; font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.note { max-width: 90%; margin: 12px auto 0; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; color: #475569; }`,
    html: `<div class="parent">
  <span class="parent-label">父元素 (position: relative)</span>
  <div class="ghost"><span class="ghost-label">原始位置</span></div>
  <div class="child">relative</div>
</div>
<div class="note"><strong>RELATIVE:</strong> 相对于正常位置偏移(top:20px, left:30px)，原始空间仍保留（虚线框）。</div>`,
  },
  {
    label: 'absolute',
    css: `.parent {
  position: relative; width: 90%; height: 200px; margin: 16px auto;
  border: 2px solid #93c5fd; border-radius: 8px; background: #eff6ff;
}
.parent-label { position: absolute; top: -10px; left: 12px; background: white; padding: 0 6px; font-size: 12px; color: #3b82f6; }
.child {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px; height: 80px;
  background: #f43f5e; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 12px; font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.note { max-width: 90%; margin: 12px auto 0; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; color: #475569; }`,
    html: `<div class="parent">
  <span class="parent-label">父元素 (position: relative)</span>
  <div class="child">absolute</div>
</div>
<div class="note"><strong>ABSOLUTE:</strong> 相对于最近的 positioned 祖先定位(top:0, right:0)，脱离文档流，不占据空间。</div>`,
  },
  {
    label: 'fixed',
    css: `.parent {
  position: relative; width: 90%; height: 200px; margin: 16px auto;
  border: 2px solid #93c5fd; border-radius: 8px; background: #eff6ff;
}
.parent-label { position: absolute; top: -10px; left: 12px; background: white; padding: 0 6px; font-size: 12px; color: #3b82f6; }
.child {
  /* 在 iframe 中演示 fixed，相对视口 */
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 80px; height: 40px;
  background: #f43f5e; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 12px; font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.note { max-width: 90%; margin: 12px auto 0; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; color: #475569; }`,
    html: `<div class="parent">
  <span class="parent-label">父元素 (position: relative)</span>
  <div class="child">fixed</div>
</div>
<div class="note"><strong>FIXED:</strong> 相对于视口定位(bottom:10px, right:10px)，滚动时位置不变。脱离文档流。</div>`,
  },
  {
    label: 'sticky',
    css: `.scroll-area {
  height: 200px;
  overflow-y: auto;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  margin: 16px auto;
  width: 90%;
}
.sticky-header {
  position: sticky;
  top: 0;
  background: #f43f5e;
  color: white;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  z-index: 1;
}
.content p {
  padding: 8px 16px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
}
.note { max-width: 90%; margin: 12px auto 0; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; color: #475569; }`,
    html: `<div class="scroll-area">
  <div class="sticky-header">position: sticky (滚动试试)</div>
  <div class="content">
    <p>内容行 1</p><p>内容行 2</p><p>内容行 3</p>
    <p>内容行 4</p><p>内容行 5</p><p>内容行 6</p>
    <p>内容行 7</p><p>内容行 8</p><p>内容行 9</p>
    <p>内容行 10</p>
  </div>
</div>
<div class="note"><strong>STICKY:</strong> 在滚动到阈值前表现为 relative，之后表现为 fixed。常用于固定表头。</div>`,
  },
];

export function PositionDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
