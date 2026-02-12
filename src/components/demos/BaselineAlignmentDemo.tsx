'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.flex-container {
  display: flex;
  align-items: baseline;
  gap: 16px;
  min-height: 160px;
  padding: 20px;
  background: #f8fafc;
  border: 2px solid #c4b5fd;
  border-radius: 8px;
}

.item-1 {
  font-size: 28px;
  font-weight: bold;
  padding: 8px 16px;
  background: #dbeafe;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  color: #1e3a5f;
}

.item-2 {
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  background: #dcfce7;
  border: 2px solid #22c55e;
  border-radius: 6px;
  color: #14532d;
}

.item-3 {
  font-size: 13px;
  font-weight: bold;
  padding: 8px 16px;
  background: #fef9c3;
  border: 2px solid #eab308;
  border-radius: 6px;
  color: #713f12;
}

.item-4 {
  font-size: 16px;
  font-weight: bold;
  padding: 32px 16px;
  background: #fce7f3;
  border: 2px solid #ec4899;
  border-radius: 6px;
  color: #831843;
}`;

const defaultHTML = `<div class="flex-container">
  <div class="item-1">大字 Ag</div>
  <div class="item-2">Normal text</div>
  <div class="item-3">小字 xy</div>
  <div class="item-4">高盒子</div>
</div>`;

const presets = [
  {
    label: 'baseline 对齐',
    css: `.flex-container {
  display: flex;
  align-items: baseline;
  gap: 16px;
  min-height: 160px;
  padding: 20px;
  background: #f8fafc;
  border: 2px solid #c4b5fd;
  border-radius: 8px;
}
.item-1 { font-size: 28px; font-weight: bold; padding: 8px 16px; background: #dbeafe; border: 2px solid #3b82f6; border-radius: 6px; color: #1e3a5f; }
.item-2 { font-size: 16px; font-weight: bold; padding: 8px 16px; background: #dcfce7; border: 2px solid #22c55e; border-radius: 6px; color: #14532d; }
.item-3 { font-size: 13px; font-weight: bold; padding: 8px 16px; background: #fef9c3; border: 2px solid #eab308; border-radius: 6px; color: #713f12; }
.item-4 { font-size: 16px; font-weight: bold; padding: 32px 16px; background: #fce7f3; border: 2px solid #ec4899; border-radius: 6px; color: #831843; }`,
  },
  {
    label: 'center 对齐',
    css: `.flex-container {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 160px;
  padding: 20px;
  background: #f8fafc;
  border: 2px solid #c4b5fd;
  border-radius: 8px;
}
.item-1 { font-size: 28px; font-weight: bold; padding: 8px 16px; background: #dbeafe; border: 2px solid #3b82f6; border-radius: 6px; color: #1e3a5f; }
.item-2 { font-size: 16px; font-weight: bold; padding: 8px 16px; background: #dcfce7; border: 2px solid #22c55e; border-radius: 6px; color: #14532d; }
.item-3 { font-size: 13px; font-weight: bold; padding: 8px 16px; background: #fef9c3; border: 2px solid #eab308; border-radius: 6px; color: #713f12; }
.item-4 { font-size: 16px; font-weight: bold; padding: 32px 16px; background: #fce7f3; border: 2px solid #ec4899; border-radius: 6px; color: #831843; }`,
  },
  {
    label: 'stretch 拉伸',
    css: `.flex-container {
  display: flex;
  align-items: stretch;
  gap: 16px;
  min-height: 160px;
  padding: 20px;
  background: #f8fafc;
  border: 2px solid #c4b5fd;
  border-radius: 8px;
}
.item-1 { font-size: 28px; font-weight: bold; padding: 8px 16px; background: #dbeafe; border: 2px solid #3b82f6; border-radius: 6px; color: #1e3a5f; }
.item-2 { font-size: 16px; font-weight: bold; padding: 8px 16px; background: #dcfce7; border: 2px solid #22c55e; border-radius: 6px; color: #14532d; }
.item-3 { font-size: 13px; font-weight: bold; padding: 8px 16px; background: #fef9c3; border: 2px solid #eab308; border-radius: 6px; color: #713f12; }
.item-4 { font-size: 16px; font-weight: bold; padding: 32px 16px; background: #fce7f3; border: 2px solid #ec4899; border-radius: 6px; color: #831843; }`,
  },
  {
    label: 'flex-start 顶部对齐',
    css: `.flex-container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-height: 160px;
  padding: 20px;
  background: #f8fafc;
  border: 2px solid #c4b5fd;
  border-radius: 8px;
}
.item-1 { font-size: 28px; font-weight: bold; padding: 8px 16px; background: #dbeafe; border: 2px solid #3b82f6; border-radius: 6px; color: #1e3a5f; }
.item-2 { font-size: 16px; font-weight: bold; padding: 8px 16px; background: #dcfce7; border: 2px solid #22c55e; border-radius: 6px; color: #14532d; }
.item-3 { font-size: 13px; font-weight: bold; padding: 8px 16px; background: #fef9c3; border: 2px solid #eab308; border-radius: 6px; color: #713f12; }
.item-4 { font-size: 16px; font-weight: bold; padding: 32px 16px; background: #fce7f3; border: 2px solid #ec4899; border-radius: 6px; color: #831843; }`,
  },
];

export function BaselineAlignmentDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={240}
    />
  );
}
