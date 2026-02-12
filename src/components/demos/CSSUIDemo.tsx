'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* accent-color: 表单控件强调色 */
input[type="checkbox"],
input[type="radio"],
input[type="range"],
progress {
  accent-color: #3b82f6;
}

/* caret-color: 文本光标颜色 */
input[type="text"], textarea {
  caret-color: #ef4444;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
  margin: 4px 0;
}

/* user-select */
.no-select {
  user-select: none;
  background: #fef3c7;
  padding: 8px;
  border-radius: 4px;
  font-size: 13px;
  margin: 8px 0;
}

/* resize */
.resizable {
  resize: both;
  overflow: auto;
  border: 2px dashed #94a3b8;
  padding: 12px;
  min-height: 60px;
  border-radius: 4px;
  font-size: 13px;
}

label { font-size: 14px; margin-right: 12px; }
.section { margin: 12px 0; }
.section-title { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }`;

const defaultHTML = `<div class="section">
  <div class="section-title">accent-color (强调色)</div>
  <label><input type="checkbox" checked> 复选框</label>
  <label><input type="checkbox"> 复选框 2</label>
  <label><input type="radio" name="demo" checked> 单选 A</label>
  <label><input type="radio" name="demo"> 单选 B</label>
  <br><br>
  <input type="range" style="width:100%">
  <progress value="70" max="100" style="width:100%"></progress>
</div>

<div class="section">
  <div class="section-title">caret-color (光标颜色)</div>
  <input type="text" placeholder="点击输入，观察红色光标">
</div>

<div class="section">
  <div class="section-title">user-select: none</div>
  <div class="no-select">尝试选择这段文本（无法选择）</div>
</div>

<div class="section">
  <div class="section-title">resize: both</div>
  <div class="resizable">拖动右下角调整大小</div>
</div>`;

const presets = [
  {
    label: '蓝色强调',
    css: `input[type="checkbox"], input[type="radio"], input[type="range"], progress { accent-color: #3b82f6; }
input[type="text"], textarea { caret-color: #3b82f6; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; width: 100%; font-size: 14px; margin: 4px 0; }
.no-select { user-select: none; background: #fef3c7; padding: 8px; border-radius: 4px; font-size: 13px; margin: 8px 0; }
.resizable { resize: both; overflow: auto; border: 2px dashed #94a3b8; padding: 12px; min-height: 60px; border-radius: 4px; font-size: 13px; }
label { font-size: 14px; margin-right: 12px; }
.section { margin: 12px 0; }
.section-title { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }`,
  },
  {
    label: '紫色强调',
    css: `input[type="checkbox"], input[type="radio"], input[type="range"], progress { accent-color: #8b5cf6; }
input[type="text"], textarea { caret-color: #8b5cf6; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; width: 100%; font-size: 14px; margin: 4px 0; }
.no-select { user-select: none; background: #fef3c7; padding: 8px; border-radius: 4px; font-size: 13px; margin: 8px 0; }
.resizable { resize: both; overflow: auto; border: 2px dashed #94a3b8; padding: 12px; min-height: 60px; border-radius: 4px; font-size: 13px; }
label { font-size: 14px; margin-right: 12px; }
.section { margin: 12px 0; }
.section-title { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }`,
  },
  {
    label: '绿色强调',
    css: `input[type="checkbox"], input[type="radio"], input[type="range"], progress { accent-color: #10b981; }
input[type="text"], textarea { caret-color: #10b981; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; width: 100%; font-size: 14px; margin: 4px 0; }
.no-select { user-select: none; background: #fef3c7; padding: 8px; border-radius: 4px; font-size: 13px; margin: 8px 0; }
.resizable { resize: vertical; overflow: auto; border: 2px dashed #94a3b8; padding: 12px; min-height: 60px; border-radius: 4px; font-size: 13px; }
label { font-size: 14px; margin-right: 12px; }
.section { margin: 12px 0; }
.section-title { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }`,
  },
  {
    label: 'user-select: all',
    css: `input[type="checkbox"], input[type="radio"], input[type="range"], progress { accent-color: #3b82f6; }
input[type="text"], textarea { caret-color: #ef4444; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; width: 100%; font-size: 14px; margin: 4px 0; }
.no-select { user-select: all; background: #dcfce7; padding: 8px; border-radius: 4px; font-size: 13px; margin: 8px 0; }
.resizable { resize: none; overflow: auto; border: 2px dashed #94a3b8; padding: 12px; min-height: 60px; border-radius: 4px; font-size: 13px; }
label { font-size: 14px; margin-right: 12px; }
.section { margin: 12px 0; }
.section-title { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }`,
  },
];

export function CSSUIDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={420}
    />
  );
}
