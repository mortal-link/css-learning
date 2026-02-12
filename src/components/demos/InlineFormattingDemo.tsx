'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 行内格式化模型 */
.line-box {
  line-height: 1.8;
  border: 2px solid #a78bfa;
  background: rgba(167, 139, 250, 0.05);
  padding: 8px 12px;
  margin: 16px;
  position: relative;
}
.line-box-label {
  position: absolute;
  top: -10px;
  left: 8px;
  background: white;
  padding: 0 6px;
  font-size: 11px;
  color: #7c3aed;
  font-weight: 500;
}

.text-1 {
  font-size: 16px;
  color: #334155;
  background: rgba(59, 130, 246, 0.1);
  border-bottom: 2px solid #3b82f6;
}
.text-2 {
  font-size: 24px;
  font-weight: bold;
  color: #e11d48;
  background: rgba(225, 29, 72, 0.1);
  border-bottom: 2px solid #e11d48;
  vertical-align: baseline;
}
.text-3 {
  font-size: 16px;
  color: #334155;
  background: rgba(34, 197, 94, 0.1);
  border-bottom: 2px solid #22c55e;
}

.baseline-note {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #dc2626;
  text-align: right;
}

.legend {
  margin: 12px 16px;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  color: #475569;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.legend-color {
  width: 16px;
  height: 12px;
  border-radius: 2px;
}

.info {
  margin: 8px 16px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="line-box">
  <span class="line-box-label">行框 (Line Box)</span>
  <span class="text-1">普通文本</span>
  <span class="text-2">重点内容</span>
  <span class="text-3">后续文字</span>
  <span class="baseline-note">← 基线 (baseline)</span>
</div>
<div class="legend">
  <span class="legend-item"><span class="legend-color" style="border:2px solid #a78bfa;"></span> 行框</span>
  <span class="legend-item"><span class="legend-color" style="background:rgba(59,130,246,0.1);border-bottom:2px solid #3b82f6;"></span> 文本1</span>
  <span class="legend-item"><span class="legend-color" style="background:rgba(225,29,72,0.1);border-bottom:2px solid #e11d48;"></span> 文本2</span>
  <span class="legend-item"><span class="legend-color" style="background:rgba(34,197,94,0.1);border-bottom:2px solid #22c55e;"></span> 文本3</span>
</div>
<div class="info">
  行内格式化：每个行内元素生成一个行内框。行框高度由 line-height 决定，元素通过 vertical-align 控制垂直对齐。
</div>`;

const presets = [
  {
    label: '默认基线',
  },
  {
    label: '大小混排',
    css: `.line-box {
  line-height: 1.8; border: 2px solid #a78bfa; background: rgba(167,139,250,0.05);
  padding: 8px 12px; margin: 16px; position: relative;
}
.line-box-label { position: absolute; top: -10px; left: 8px; background: white; padding: 0 6px; font-size: 11px; color: #7c3aed; }
.text-1 { font-size: 14px; color: #334155; background: rgba(59,130,246,0.1); border-bottom: 2px solid #3b82f6; }
.text-2 { font-size: 32px; font-weight: bold; color: #e11d48; background: rgba(225,29,72,0.1); border-bottom: 2px solid #e11d48; vertical-align: baseline; }
.text-3 { font-size: 14px; color: #334155; background: rgba(34,197,94,0.1); border-bottom: 2px solid #22c55e; }
.info { margin: 8px 16px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }`,
    html: `<div class="line-box">
  <span class="line-box-label">行框 (Line Box)</span>
  <span class="text-1">小号文字</span>
  <span class="text-2">大号文字</span>
  <span class="text-3">小号文字</span>
</div>
<div class="info">大小混排时，行框高度由最大字号的行内框决定。所有元素默认在基线上对齐。</div>`,
  },
  {
    label: 'vertical-align',
    css: `.line-box {
  line-height: 2; border: 2px solid #a78bfa; background: rgba(167,139,250,0.05);
  padding: 8px 12px; margin: 16px; position: relative;
}
.line-box-label { position: absolute; top: -10px; left: 8px; background: white; padding: 0 6px; font-size: 11px; color: #7c3aed; }
.text-1 { font-size: 16px; color: #334155; background: rgba(59,130,246,0.1); }
.text-top { font-size: 12px; color: #0369a1; background: rgba(3,105,161,0.1); vertical-align: top; }
.text-mid { font-size: 12px; color: #7c3aed; background: rgba(124,58,237,0.1); vertical-align: middle; }
.text-bot { font-size: 12px; color: #b45309; background: rgba(180,83,9,0.1); vertical-align: bottom; }
.text-sup { font-size: 10px; color: #dc2626; background: rgba(220,38,38,0.1); vertical-align: super; }
.text-sub { font-size: 10px; color: #16a34a; background: rgba(22,163,74,0.1); vertical-align: sub; }
.info { margin: 8px 16px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }`,
    html: `<div class="line-box">
  <span class="line-box-label">vertical-align 对齐</span>
  <span class="text-1">基准</span>
  <span class="text-top">top</span>
  <span class="text-mid">middle</span>
  <span class="text-bot">bottom</span>
  <span class="text-sup">super</span>
  <span class="text-sub">sub</span>
</div>
<div class="info">vertical-align 控制行内元素在行框内的垂直对齐方式。常用值：baseline(默认)、top、middle、bottom、super、sub。</div>`,
  },
  {
    label: '行高撑开',
    css: `.line-box {
  line-height: 3;
  border: 2px solid #a78bfa;
  background: rgba(167,139,250,0.05);
  padding: 8px 12px;
  margin: 16px;
  position: relative;
}
.line-box-label { position: absolute; top: -10px; left: 8px; background: white; padding: 0 6px; font-size: 11px; color: #7c3aed; }
.text-1 { font-size: 16px; color: #334155; background: rgba(59,130,246,0.1); border-bottom: 2px solid #3b82f6; }
.info { margin: 8px 16px; padding: 10px; background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 6px; font-size: 13px; color: #5b21b6; line-height: 1.6; }`,
    html: `<div class="line-box">
  <span class="line-box-label">line-height: 3</span>
  <span class="text-1">文本内容</span>
</div>
<div class="info">
  line-height: 3 = font-size × 3。<br>
  leading（行距）= line-height - font-size，平分为上下两个 half-leading。<br>
  此例：16px × 3 = 48px 行框高度，leading = 48 - 16 = 32px，每侧 half-leading = 16px。
</div>`,
  },
];

export function InlineFormattingDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
