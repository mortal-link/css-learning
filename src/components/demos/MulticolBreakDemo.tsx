'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}

.card {
  break-inside: avoid;
  break-before: auto;
  break-after: auto;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.card h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card p {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}`;

const defaultHTML = `<div class="container">
  <div class="card">
    <h4>卡片 1</h4>
    <p>这是第一张卡片的内容。在多列布局中，卡片可能会被分割到不同的列。</p>
  </div>
  <div class="card">
    <h4>卡片 2</h4>
    <p>这是第二张卡片的内容。使用 break-inside: avoid 可以防止卡片被分割。</p>
  </div>
  <div class="card">
    <h4>卡片 3</h4>
    <p>这是第三张卡片的内容。break-before 和 break-after 控制元素前后的断列行为。</p>
  </div>
  <div class="card">
    <h4>卡片 4</h4>
    <p>这是第四张卡片的内容。合理使用这些属性可以让布局更加美观。</p>
  </div>
</div>`;

const presets = [
  {
    label: '避免断列',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}

.card {
  break-inside: avoid;
  break-before: auto;
  break-after: auto;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}
.card h4 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 12px; color: #64748b; line-height: 1.5; }`,
  },
  {
    label: '自动断列',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}

.card {
  break-inside: auto;
  break-before: auto;
  break-after: auto;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}
.card h4 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 12px; color: #64748b; line-height: 1.5; }`,
  },
  {
    label: '强制新列',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}

.card {
  break-inside: auto;
  break-before: column;
  break-after: auto;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}
.card h4 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 12px; color: #64748b; line-height: 1.5; }`,
  },
  {
    label: 'avoid-column',
    css: `.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}

.card {
  break-inside: avoid-column;
  break-before: auto;
  break-after: auto;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}
.card h4 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 12px; color: #64748b; line-height: 1.5; }`,
  },
];

export function MulticolBreakDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
