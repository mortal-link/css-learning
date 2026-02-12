'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  height: 200px;
  padding: 16px;
  background: linear-gradient(to bottom right, #eff6ff, #f5f3ff);
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: auto;
}

.container p {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
}

.container .long-line {
  white-space: nowrap;
  color: #888;
}

.label {
  margin-top: 8px;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="container">
  <p><strong>段落 1:</strong> 这是一段较长的文本内容，用于演示溢出行为。当容器无法容纳所有内容时，overflow 属性决定了如何处理溢出的部分。</p>
  <p><strong>段落 2:</strong> CSS 的 overflow 属性是控制内容溢出的关键属性。它可以设置为 visible、hidden、scroll、auto 或 clip。</p>
  <p><strong>段落 3:</strong> 不同的 overflow 值会产生不同的视觉效果和交互行为。</p>
  <p><strong>段落 4:</strong> overflow-x 和 overflow-y 可以分别控制水平和垂直方向的溢出。</p>
  <p><strong>段落 5:</strong> 当内容超出容器边界时，可以选择隐藏、滚动或直接显示溢出内容。</p>
  <p class="long-line">这是一行很长很长很长很长很长很长很长很长很长很长很长很长的不换行文本内容，用于测试 overflow-x 的效果。</p>
</div>
<div class="label">overflow: auto;</div>`;

const presets = [
  {
    label: '默认溢出 (visible)',
    css: `.container {
  height: 200px; padding: 16px;
  background: linear-gradient(to bottom right, #eff6ff, #f5f3ff);
  border: 2px solid #e0e0e0; border-radius: 8px;
  overflow: visible;
}
.container p { margin-bottom: 8px; font-size: 14px; line-height: 1.6; }
.container .long-line { white-space: nowrap; color: #888; }
.label { margin-top: 8px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container">
  <p><strong>段落 1:</strong> 这是一段较长的文本内容，用于演示溢出行为。</p>
  <p><strong>段落 2:</strong> CSS 的 overflow 属性是控制内容溢出的关键属性。</p>
  <p><strong>段落 3:</strong> 不同的 overflow 值会产生不同的视觉效果和交互行为。</p>
  <p><strong>段落 4:</strong> overflow-x 和 overflow-y 可以分别控制水平和垂直方向的溢出。</p>
  <p><strong>段落 5:</strong> 当内容超出容器边界时，溢出的内容将直接显示在容器外。</p>
  <p class="long-line">这是一行很长很长很长很长很长很长很长很长的不换行文本，用于测试 overflow-x 的效果。</p>
</div>
<div class="label">overflow: visible; (内容溢出容器可见)</div>`,
  },
  {
    label: '隐藏溢出 (hidden)',
    css: `.container {
  height: 200px; padding: 16px;
  background: linear-gradient(to bottom right, #eff6ff, #f5f3ff);
  border: 2px solid #e0e0e0; border-radius: 8px;
  overflow: hidden;
}
.container p { margin-bottom: 8px; font-size: 14px; line-height: 1.6; }
.container .long-line { white-space: nowrap; color: #888; }
.label { margin-top: 8px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container">
  <p><strong>段落 1:</strong> 这是一段较长的文本内容，用于演示溢出行为。</p>
  <p><strong>段落 2:</strong> CSS 的 overflow 属性是控制内容溢出的关键属性。</p>
  <p><strong>段落 3:</strong> 不同的 overflow 值会产生不同的视觉效果和交互行为。</p>
  <p><strong>段落 4:</strong> overflow-x 和 overflow-y 可以分别控制水平和垂直方向的溢出。</p>
  <p><strong>段落 5:</strong> 当内容超出容器边界时，溢出的内容被裁剪隐藏。</p>
  <p class="long-line">这是一行很长很长很长很长很长很长很长很长的不换行文本，用于测试 overflow-x 的效果。</p>
</div>
<div class="label">overflow: hidden; (溢出内容被裁剪)</div>`,
  },
  {
    label: '滚动条 (scroll)',
    css: `.container {
  height: 200px; padding: 16px;
  background: linear-gradient(to bottom right, #eff6ff, #f5f3ff);
  border: 2px solid #e0e0e0; border-radius: 8px;
  overflow: scroll;
}
.container p { margin-bottom: 8px; font-size: 14px; line-height: 1.6; }
.container .long-line { white-space: nowrap; color: #888; }
.label { margin-top: 8px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container">
  <p><strong>段落 1:</strong> 这是一段较长的文本内容，用于演示溢出行为。</p>
  <p><strong>段落 2:</strong> CSS 的 overflow 属性是控制内容溢出的关键属性。</p>
  <p><strong>段落 3:</strong> 不同的 overflow 值会产生不同的视觉效果和交互行为。</p>
  <p><strong>段落 4:</strong> overflow-x 和 overflow-y 可以分别控制水平和垂直方向的溢出。</p>
  <p><strong>段落 5:</strong> 始终显示滚动条，无论内容是否溢出。</p>
  <p class="long-line">这是一行很长很长很长很长很长很长很长很长的不换行文本，用于测试 overflow-x 的效果。</p>
</div>
<div class="label">overflow: scroll; (始终显示滚动条)</div>`,
  },
  {
    label: '裁剪 (clip)',
    css: `.container {
  height: 200px; padding: 16px;
  background: linear-gradient(to bottom right, #eff6ff, #f5f3ff);
  border: 2px solid #e0e0e0; border-radius: 8px;
  overflow: clip;
}
.container p { margin-bottom: 8px; font-size: 14px; line-height: 1.6; }
.container .long-line { white-space: nowrap; color: #888; }
.label { margin-top: 8px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container">
  <p><strong>段落 1:</strong> 这是一段较长的文本内容，用于演示溢出行为。</p>
  <p><strong>段落 2:</strong> CSS 的 overflow 属性是控制内容溢出的关键属性。</p>
  <p><strong>段落 3:</strong> clip 与 hidden 类似，但不允许程序化滚动。</p>
  <p><strong>段落 4:</strong> overflow-x 和 overflow-y 可以分别控制水平和垂直方向的溢出。</p>
  <p><strong>段落 5:</strong> 当内容超出容器边界时，溢出的内容被裁剪且不可滚动。</p>
  <p class="long-line">这是一行很长很长很长很长很长很长很长很长的不换行文本，用于测试 overflow-x 的效果。</p>
</div>
<div class="label">overflow: clip; (裁剪且不可滚动)</div>`,
  },
  {
    label: 'X/Y 分别控制',
    css: `.container {
  height: 200px; padding: 16px;
  background: linear-gradient(to bottom right, #eff6ff, #f5f3ff);
  border: 2px solid #e0e0e0; border-radius: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
}
.container p { margin-bottom: 8px; font-size: 14px; line-height: 1.6; }
.container .long-line { white-space: nowrap; color: #888; }
.label { margin-top: 8px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container">
  <p><strong>段落 1:</strong> 这是一段较长的文本内容，用于演示溢出行为。</p>
  <p><strong>段落 2:</strong> CSS 的 overflow 属性是控制内容溢出的关键属性。</p>
  <p><strong>段落 3:</strong> 可以分别设置水平和垂直方向的溢出行为。</p>
  <p><strong>段落 4:</strong> 水平方向可以滚动，垂直方向被隐藏。</p>
  <p class="long-line">这是一行很长很长很长很长很长很长很长很长的不换行文本，可以水平滚动查看完整内容。</p>
</div>
<div class="label">overflow-x: scroll; overflow-y: hidden;</div>`,
  },
];

export function OverflowDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
