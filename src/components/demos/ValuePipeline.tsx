'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 值处理流水线: width: 50% (父元素 800px) */
.pipeline {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-family: system-ui;
  padding: 16px;
}
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background: white;
  min-width: 90px;
}
.stage-name { font-size: 11px; color: #64748b; margin-bottom: 2px; }
.stage-zh { font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
.stage-value { font-family: monospace; font-size: 14px; font-weight: bold; color: #2563eb; padding: 4px 8px; background: #eff6ff; border-radius: 4px; }
.arrow { color: #94a3b8; font-size: 18px; }
.note { width: 100%; margin-top: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569; border: 1px solid #e2e8f0; line-height: 1.6; }`;

const defaultHTML = `<div class="pipeline">
  <div class="stage">
    <span class="stage-name">Declared</span>
    <span class="stage-zh">声明值</span>
    <span class="stage-value">50%</span>
  </div>
  <span class="arrow">→</span>
  <div class="stage">
    <span class="stage-name">Cascaded</span>
    <span class="stage-zh">层叠值</span>
    <span class="stage-value">50%</span>
  </div>
  <span class="arrow">→</span>
  <div class="stage">
    <span class="stage-name">Specified</span>
    <span class="stage-zh">指定值</span>
    <span class="stage-value">50%</span>
  </div>
  <span class="arrow">→</span>
  <div class="stage">
    <span class="stage-name">Computed</span>
    <span class="stage-zh">计算值</span>
    <span class="stage-value">50%</span>
  </div>
  <span class="arrow">→</span>
  <div class="stage">
    <span class="stage-name">Used</span>
    <span class="stage-zh">使用值</span>
    <span class="stage-value">400px</span>
  </div>
  <span class="arrow">→</span>
  <div class="stage">
    <span class="stage-name">Actual</span>
    <span class="stage-zh">实际值</span>
    <span class="stage-value">400px</span>
  </div>
</div>
<div class="note">
  <strong>width: 50%</strong> — 百分比在 Computed 阶段保持不变，直到 Used 阶段才根据父元素宽度(800px)计算为 400px。
</div>`;

const presets = [
  {
    label: 'width: 50%',
    css: `.pipeline { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: system-ui; padding: 16px; }
.stage { display: flex; flex-direction: column; align-items: center; padding: 10px 14px; border-radius: 8px; border: 2px solid #e2e8f0; background: white; min-width: 90px; }
.stage-name { font-size: 11px; color: #64748b; margin-bottom: 2px; }
.stage-zh { font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
.stage-value { font-family: monospace; font-size: 14px; font-weight: bold; color: #2563eb; padding: 4px 8px; background: #eff6ff; border-radius: 4px; }
.arrow { color: #94a3b8; font-size: 18px; }
.changed { color: #dc2626; background: #fef2f2; }
.note { width: 100%; margin-top: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569; border: 1px solid #e2e8f0; }`,
    html: `<div class="pipeline">
  <div class="stage"><span class="stage-name">Declared</span><span class="stage-zh">声明值</span><span class="stage-value">50%</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Cascaded</span><span class="stage-zh">层叠值</span><span class="stage-value">50%</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Specified</span><span class="stage-zh">指定值</span><span class="stage-value">50%</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Computed</span><span class="stage-zh">计算值</span><span class="stage-value">50%</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Used</span><span class="stage-zh">使用值</span><span class="stage-value changed">400px</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Actual</span><span class="stage-zh">实际值</span><span class="stage-value">400px</span></div>
</div>
<div class="note">百分比在 Used 阶段才解析：50% of 800px = 400px</div>`,
  },
  {
    label: 'font-size: 1.5em',
    css: `.pipeline { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: system-ui; padding: 16px; }
.stage { display: flex; flex-direction: column; align-items: center; padding: 10px 14px; border-radius: 8px; border: 2px solid #e2e8f0; background: white; min-width: 90px; }
.stage-name { font-size: 11px; color: #64748b; margin-bottom: 2px; }
.stage-zh { font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
.stage-value { font-family: monospace; font-size: 14px; font-weight: bold; color: #2563eb; padding: 4px 8px; background: #eff6ff; border-radius: 4px; }
.arrow { color: #94a3b8; font-size: 18px; }
.changed { color: #dc2626; background: #fef2f2; }
.note { width: 100%; margin-top: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569; border: 1px solid #e2e8f0; }`,
    html: `<div class="pipeline">
  <div class="stage"><span class="stage-name">Declared</span><span class="stage-zh">声明值</span><span class="stage-value">1.5em</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Cascaded</span><span class="stage-zh">层叠值</span><span class="stage-value">1.5em</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Specified</span><span class="stage-zh">指定值</span><span class="stage-value">1.5em</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Computed</span><span class="stage-zh">计算值</span><span class="stage-value changed">24px</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Used</span><span class="stage-zh">使用值</span><span class="stage-value">24px</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Actual</span><span class="stage-zh">实际值</span><span class="stage-value">24px</span></div>
</div>
<div class="note">em 在 Computed 阶段解析：1.5 × 16px(父元素) = 24px</div>`,
  },
  {
    label: 'color 继承',
    css: `.pipeline { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: system-ui; padding: 16px; }
.stage { display: flex; flex-direction: column; align-items: center; padding: 10px 14px; border-radius: 8px; border: 2px solid #e2e8f0; background: white; min-width: 90px; }
.stage-name { font-size: 11px; color: #64748b; margin-bottom: 2px; }
.stage-zh { font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
.stage-value { font-family: monospace; font-size: 14px; font-weight: bold; color: #2563eb; padding: 4px 8px; background: #eff6ff; border-radius: 4px; }
.arrow { color: #94a3b8; font-size: 18px; }
.empty { color: #9ca3af; background: #f1f5f9; font-style: italic; }
.changed { color: #dc2626; background: #fef2f2; }
.note { width: 100%; margin-top: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569; border: 1px solid #e2e8f0; }`,
    html: `<div class="pipeline">
  <div class="stage"><span class="stage-name">Declared</span><span class="stage-zh">声明值</span><span class="stage-value empty">(无)</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Cascaded</span><span class="stage-zh">层叠值</span><span class="stage-value empty">(无)</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Specified</span><span class="stage-zh">指定值</span><span class="stage-value changed">blue</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Computed</span><span class="stage-zh">计算值</span><span class="stage-value changed">rgb(0,0,255)</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Used</span><span class="stage-zh">使用值</span><span class="stage-value">rgb(0,0,255)</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Actual</span><span class="stage-zh">实际值</span><span class="stage-value">rgb(0,0,255)</span></div>
</div>
<div class="note">无声明 → 无层叠值 → Specified 阶段从父元素继承 blue → Computed 阶段转为 rgb</div>`,
  },
  {
    label: 'margin-left: auto',
    css: `.pipeline { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: system-ui; padding: 16px; }
.stage { display: flex; flex-direction: column; align-items: center; padding: 10px 14px; border-radius: 8px; border: 2px solid #e2e8f0; background: white; min-width: 90px; }
.stage-name { font-size: 11px; color: #64748b; margin-bottom: 2px; }
.stage-zh { font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
.stage-value { font-family: monospace; font-size: 14px; font-weight: bold; color: #2563eb; padding: 4px 8px; background: #eff6ff; border-radius: 4px; }
.arrow { color: #94a3b8; font-size: 18px; }
.changed { color: #dc2626; background: #fef2f2; }
.note { width: 100%; margin-top: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569; border: 1px solid #e2e8f0; }`,
    html: `<div class="pipeline">
  <div class="stage"><span class="stage-name">Declared</span><span class="stage-zh">声明值</span><span class="stage-value">auto</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Cascaded</span><span class="stage-zh">层叠值</span><span class="stage-value">auto</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Specified</span><span class="stage-zh">指定值</span><span class="stage-value">auto</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Computed</span><span class="stage-zh">计算值</span><span class="stage-value">auto</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Used</span><span class="stage-zh">使用值</span><span class="stage-value changed">200px</span></div>
  <span class="arrow">→</span>
  <div class="stage"><span class="stage-name">Actual</span><span class="stage-zh">实际值</span><span class="stage-value">200px</span></div>
</div>
<div class="note">auto 在 Used 阶段才解析：容器 1000px - 元素 600px - margin-right 0 = 200px（剩余空间）</div>`,
  },
];

export function ValuePipeline() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
