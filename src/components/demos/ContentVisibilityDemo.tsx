'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.scroll-container {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.item {
  content-visibility: visible;
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}

.item h4 {
  font-weight: 600;
  margin-bottom: 4px;
}

.item p {
  color: #64748b;
  font-size: 13px;
}`;

const defaultHTML = `<div class="scroll-container">
  <div class="item"><h4>列表项 1</h4><p>这是第 1 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 2</h4><p>这是第 2 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 3</h4><p>这是第 3 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 4</h4><p>这是第 4 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 5</h4><p>这是第 5 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 6</h4><p>这是第 6 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 7</h4><p>这是第 7 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
  <div class="item"><h4>列表项 8</h4><p>这是第 8 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。</p></div>
</div>`;

const presets = [
  {
    label: 'visible (默认)',
    css: `.scroll-container { height: 300px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; }
.item { content-visibility: visible; padding: 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
.item h4 { font-weight: 600; margin-bottom: 4px; }
.item p { color: #64748b; font-size: 13px; }`,
  },
  {
    label: 'auto (跳过屏幕外)',
    css: `/* auto: 仅渲染视口内的内容，跳过屏幕外元素 */
.scroll-container { height: 300px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; }
.item {
  content-visibility: auto;
  contain-intrinsic-size: auto 80px;
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}
.item h4 { font-weight: 600; margin-bottom: 4px; }
.item p { color: #64748b; font-size: 13px; }`,
  },
  {
    label: 'hidden (隐藏内容)',
    css: `/* hidden: 完全跳过渲染，但保留元素本身 */
.scroll-container { height: 300px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; }
.item { padding: 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
.item h4 { font-weight: 600; margin-bottom: 4px; }
.item p { color: #64748b; font-size: 13px; }
.item:nth-child(n+4) {
  content-visibility: hidden;
  border: 2px dashed #f97316;
  background: #fff7ed;
}`,
  },
  {
    label: '自定义占位尺寸',
    css: `/* contain-intrinsic-size 为跳过的内容指定占位尺寸 */
.scroll-container { height: 300px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; }
.item {
  content-visibility: auto;
  contain-intrinsic-size: auto 120px;
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}
.item h4 { font-weight: 600; margin-bottom: 4px; }
.item p { color: #64748b; font-size: 13px; }`,
  },
];

export function ContentVisibilityDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={360}
    />
  );
}
