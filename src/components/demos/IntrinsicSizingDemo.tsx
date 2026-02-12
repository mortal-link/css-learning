'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box {
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  font-size: 14px;
}

.label {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 4px;
  font-family: monospace;
}

.auto { width: auto; background: #dbeafe; border: 2px solid #3b82f6; }
.min { width: min-content; background: #dcfce7; border: 2px solid #22c55e; }
.max { width: max-content; background: #fef9c3; border: 2px solid #eab308; }
.fit { width: fit-content; background: #fce7f3; border: 2px solid #ec4899; }`;

const defaultHTML = `<div class="label">width: auto</div>
<div class="box auto">这是一段示例文本内容，用于演示不同内在尺寸关键字的效果。</div>

<div class="label">width: min-content</div>
<div class="box min">这是一段示例文本内容，用于演示不同内在尺寸关键字的效果。</div>

<div class="label">width: max-content</div>
<div class="box max">这是一段示例文本内容，用于演示不同内在尺寸关键字的效果。</div>

<div class="label">width: fit-content</div>
<div class="box fit">这是一段示例文本内容，用于演示不同内在尺寸关键字的效果。</div>`;

const presets = [
  {
    label: '长文本对比',
    css: `.box { padding: 12px; margin-bottom: 12px; border-radius: 6px; font-size: 14px; }
.label { font-size: 11px; color: #64748b; margin-bottom: 4px; font-family: monospace; }
.auto { width: auto; background: #dbeafe; border: 2px solid #3b82f6; }
.min { width: min-content; background: #dcfce7; border: 2px solid #22c55e; }
.max { width: max-content; background: #fef9c3; border: 2px solid #eab308; }
.fit { width: fit-content; background: #fce7f3; border: 2px solid #ec4899; }`,
  },
  {
    label: '短文本对比',
    css: `.box { padding: 12px; margin-bottom: 12px; border-radius: 6px; font-size: 14px; }
.label { font-size: 11px; color: #64748b; margin-bottom: 4px; font-family: monospace; }
.auto { width: auto; background: #dbeafe; border: 2px solid #3b82f6; }
.min { width: min-content; background: #dcfce7; border: 2px solid #22c55e; }
.max { width: max-content; background: #fef9c3; border: 2px solid #eab308; }
.fit { width: fit-content; background: #fce7f3; border: 2px solid #ec4899; }`,
    html: `<div class="label">width: auto</div>
<div class="box auto">短文本</div>
<div class="label">width: min-content</div>
<div class="box min">短文本</div>
<div class="label">width: max-content</div>
<div class="box max">短文本</div>
<div class="label">width: fit-content</div>
<div class="box fit">短文本</div>`,
  },
  {
    label: 'Grid 中的内在尺寸',
    css: `.grid { display: grid; grid-template-columns: min-content max-content fit-content(200px); gap: 12px; }
.cell { padding: 12px; border-radius: 6px; font-size: 13px; }
.cell:nth-child(3n+1) { background: #dcfce7; border: 2px solid #22c55e; }
.cell:nth-child(3n+2) { background: #fef9c3; border: 2px solid #eab308; }
.cell:nth-child(3n+3) { background: #fce7f3; border: 2px solid #ec4899; }
.label { font-size: 11px; color: #64748b; margin-bottom: 8px; font-family: monospace; }`,
    html: `<div class="label">grid-template-columns: min-content max-content fit-content(200px)</div>
<div class="grid">
  <div class="cell">min-content 列</div>
  <div class="cell">max-content 列</div>
  <div class="cell">fit-content(200px) 这段文本会受限于200px</div>
</div>`,
  },
  {
    label: 'fit-content 带数值',
    css: `.box { padding: 12px; margin-bottom: 12px; border-radius: 6px; font-size: 14px; }
.label { font-size: 11px; color: #64748b; margin-bottom: 4px; font-family: monospace; }
.fit-200 { width: fit-content; max-width: 200px; background: #e0e7ff; border: 2px solid #6366f1; }
.fit-300 { width: fit-content; max-width: 300px; background: #fce7f3; border: 2px solid #ec4899; }
.fit-full { width: fit-content; background: #dcfce7; border: 2px solid #22c55e; }`,
    html: `<div class="label">fit-content (max-width: 200px)</div>
<div class="box fit-200">这段文本的宽度限制在200px以内，超出会换行。</div>
<div class="label">fit-content (max-width: 300px)</div>
<div class="box fit-300">这段文本的宽度限制在300px以内，超出会换行。</div>
<div class="label">fit-content (无限制)</div>
<div class="box fit-full">短文本不受限</div>`,
  },
];

export function IntrinsicSizingDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
