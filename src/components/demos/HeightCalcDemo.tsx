'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 高度: auto — 由内容撑开 */
.parent {
  height: auto;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}
.parent::before {
  content: "父容器: height: auto";
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 11px;
  color: #7c3aed;
}

.child {
  height: auto;
  background: #3b82f6;
  color: white;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
}

.info {
  margin-top: 12px;
  padding: 8px;
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
  font-size: 12px;
  color: #1e40af;
}`;

const defaultHTML = `<div class="parent">
  <div class="child">
    <strong>height: auto</strong><br>
    段落 1: 这是一些示例内容文本。<br>
    段落 2: 高度由内容自动撑开。<br>
    段落 3: 添加更多内容，高度会增加。
  </div>
</div>
<div class="info">块级元素默认 height: auto，高度随内容增长。</div>`;

const presets = [
  {
    label: '自动高度 (auto)',
    css: `.parent { height: auto; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; max-width: 400px; margin: 0 auto; position: relative; }
.parent::before { content: "父: height: auto"; position: absolute; top: -20px; left: 0; font-size: 11px; color: #7c3aed; }
.child { height: auto; background: #3b82f6; color: white; padding: 16px; border-radius: 8px; font-size: 14px; }
.info { margin-top: 12px; padding: 8px; background: #eff6ff; border-left: 3px solid #3b82f6; font-size: 12px; color: #1e40af; }`,
  },
  {
    label: '固定高度 200px',
    css: `.parent { height: auto; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; max-width: 400px; margin: 0 auto; position: relative; }
.parent::before { content: "父: height: auto"; position: absolute; top: -20px; left: 0; font-size: 11px; color: #7c3aed; }
.child { height: 200px; overflow: auto; background: #3b82f6; color: white; padding: 16px; border-radius: 8px; font-size: 14px; }
.info { margin-top: 12px; padding: 8px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<div class="parent">
  <div class="child">
    <strong>height: 200px</strong><br>
    段落 1: 固定高度。<br>段落 2: 内容溢出时需要处理 overflow。<br>段落 3: 更多内容...<br>段落 4: 更多内容...<br>段落 5: 更多内容...<br>段落 6: 更多内容...<br>段落 7: 更多内容...
  </div>
</div>
<div class="info">固定高度: 内容溢出时需要处理 overflow</div>`,
  },
  {
    label: '百分比高度 (有父高度)',
    css: `/* 父元素有明确高度时，百分比才生效 */
.parent { height: 300px; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; max-width: 400px; margin: 0 auto; position: relative; }
.parent::before { content: "父: height: 300px"; position: absolute; top: -20px; left: 0; font-size: 11px; color: #7c3aed; }
.child { height: 75%; background: #3b82f6; color: white; padding: 16px; border-radius: 8px; font-size: 14px; overflow: auto; }
.info { margin-top: 12px; padding: 8px; background: #dcfce7; border-left: 3px solid #22c55e; font-size: 12px; color: #166534; }`,
    html: `<div class="parent">
  <div class="child"><strong>height: 75%</strong><br>父元素 300px x 75% = 225px</div>
</div>
<div class="info">父元素有明确高度 (300px) 时，百分比生效: 300 x 75% = 225px</div>`,
  },
  {
    label: 'min/max 限制',
    css: `.parent { height: auto; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; max-width: 400px; margin: 0 auto; position: relative; }
.parent::before { content: "父: height: auto"; position: absolute; top: -20px; left: 0; font-size: 11px; color: #7c3aed; }
.child { height: auto; min-height: 100px; max-height: 200px; overflow: auto; background: #3b82f6; color: white; padding: 16px; border-radius: 8px; font-size: 14px; }
.info { margin-top: 12px; padding: 8px; background: #faf5ff; border-left: 3px solid #8b5cf6; font-size: 12px; color: #6b21a8; }`,
    html: `<div class="parent">
  <div class="child">
    <strong>min-height: 100px; max-height: 200px</strong><br>
    段落 1: 高度被限制。<br>段落 2: 在 100px-200px 之间。<br>段落 3: 超出 max 会触发滚动。<br>段落 4: 更多内容...<br>段落 5: 更多内容...<br>段落 6: 更多内容...
  </div>
</div>
<div class="info">高度约束: clamp(100px, 内容高度, 200px)</div>`,
  },
];

export function HeightCalcDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={360}
    />
  );
}
