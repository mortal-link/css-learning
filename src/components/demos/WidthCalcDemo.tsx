'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* Block auto 宽度：填满父容器 */
.parent {
  width: 400px;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto;
  position: relative;
}
.parent::before {
  content: "父容器: 400px";
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 11px;
  color: #7c3aed;
}

.child {
  width: auto;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}

.formula {
  margin-top: 12px;
  padding: 8px;
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
  font-size: 12px;
  color: #92400e;
  border-radius: 0 4px 4px 0;
}`;

const defaultHTML = `<div class="parent">
  <div class="child">width: auto (填满父容器)</div>
</div>
<div class="formula">
  公式: 可用宽度 = 父容器宽度 - margin - border - padding
</div>`;

const presets = [
  {
    label: 'auto (默认)',
    css: `.parent { width: 400px; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; margin: 0 auto; position: relative; }
.parent::before { content: "父容器: 400px"; position: absolute; top: -20px; left: 0; font-size: 11px; color: #7c3aed; }
.child { width: auto; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 14px; }
.formula { margin-top: 12px; padding: 8px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
  },
  {
    label: '百分比 75%',
    css: `.parent { width: 400px; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; margin: 0 auto; position: relative; }
.parent::before { content: "父容器: 400px"; position: absolute; top: -20px; left: 0; font-size: 11px; color: #7c3aed; }
.child { width: 75%; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 14px; }
.formula { margin-top: 12px; padding: 8px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<div class="parent">
  <div class="child">width: 75%</div>
</div>
<div class="formula">实际宽度 = 父容器 content-box 宽度 x 75%</div>`,
  },
  {
    label: 'content-box vs border-box',
    css: `.parent { width: 400px; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; margin: 0 auto; }
.box { padding: 20px; border: 5px solid #94a3b8; margin-bottom: 12px; border-radius: 4px; font-size: 13px; text-align: center; font-weight: 600; }
.content-box { box-sizing: content-box; width: 200px; background: #dbeafe; }
.border-box { box-sizing: border-box; width: 200px; background: #dcfce7; }
.formula { padding: 8px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<div class="parent">
  <div class="box content-box">content-box: 200px<br>(总宽 = 200 + 20*2 + 5*2 = 250px)</div>
  <div class="box border-box">border-box: 200px<br>(总宽 = 200px, 内容 = 150px)</div>
</div>
<div class="formula">content-box: width = 内容区 | border-box: width = 内容 + padding + border</div>`,
  },
  {
    label: 'min/max 约束',
    css: `.parent { width: 100%; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; margin: 0 auto; }
.child { width: 100%; min-width: 200px; max-width: 400px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 14px; }
.formula { margin-top: 12px; padding: 8px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<div class="parent">
  <div class="child">width: 100%; min: 200px; max: 400px</div>
</div>
<div class="formula">实际宽度 = clamp(200px, 可用宽度, 400px)</div>`,
  },
  {
    label: 'calc() 计算',
    css: `.parent { width: 100%; border: 2px dashed #a78bfa; border-radius: 8px; padding: 16px; margin: 0 auto; }
.child { width: calc(100% - 80px); background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 14px; }
.formula { margin-top: 12px; padding: 8px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e; }`,
    html: `<div class="parent">
  <div class="child">width: calc(100% - 80px)</div>
</div>
<div class="formula">calc() 允许混合单位动态计算宽度</div>`,
  },
];

export function WidthCalcDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={240}
    />
  );
}
