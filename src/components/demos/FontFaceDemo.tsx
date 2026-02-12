'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* @font-face 声明示例 */

/* 基础用法 */
/*
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
*/

.example {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}
.example h3 {
  font-size: 14px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 8px;
}
.example pre {
  font-family: monospace;
  font-size: 12px;
  background: #f8fafc;
  padding: 12px;
  border-radius: 4px;
  white-space: pre-wrap;
  line-height: 1.6;
}

.timeline {
  display: flex;
  gap: 4px;
  margin-top: 16px;
}
.phase {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
.phase-block { background: #ef4444; }
.phase-swap  { background: #22c55e; }
.phase-fail  { background: #6b7280; }
.phase-auto  { background: #3b82f6; }
.phase-label { font-size: 11px; color: #666; text-align: center; margin-top: 4px; }`;

const defaultHTML = `<div class="example">
  <h3>基础 @font-face</h3>
  <pre>@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}</pre>
</div>

<div class="example">
  <h3>font-display: swap 加载时间线</h3>
  <div class="timeline">
    <div class="phase phase-swap">交换期（无限）</div>
  </div>
  <div class="phase-label">立即显示后备字体，加载完成后交换</div>
</div>`;

const presets = [
  {
    label: '基础字体',
    css: `.example { border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
.example h3 { font-size: 14px; font-weight: 700; color: #3b82f6; margin-bottom: 8px; }
.example pre { font-family: monospace; font-size: 12px; background: #f8fafc; padding: 12px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6; }
.timeline { display: flex; gap: 4px; margin-top: 16px; }
.phase { flex: 1; padding: 10px; border-radius: 4px; text-align: center; color: white; font-size: 12px; font-weight: 600; }
.phase-swap  { background: #22c55e; }
.phase-label { font-size: 11px; color: #666; text-align: center; margin-top: 4px; }`,
    html: `<div class="example">
  <h3>基础 @font-face（单一字重）</h3>
  <pre>@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}</pre>
</div>
<div class="example">
  <h3>font-display: swap</h3>
  <div class="timeline"><div class="phase phase-swap">交换期（无限）</div></div>
  <div class="phase-label">立即显示后备字体，字体加载完成后交换</div>
</div>`,
  },
  {
    label: '可变字体',
    css: `.example { border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
.example h3 { font-size: 14px; font-weight: 700; color: #3b82f6; margin-bottom: 8px; }
.example pre { font-family: monospace; font-size: 12px; background: #f8fafc; padding: 12px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6; }`,
    html: `<div class="example">
  <h3>可变字体 @font-face（字重范围）</h3>
  <pre>@font-face {
  font-family: 'MyVariableFont';
  src: url('/fonts/MyVariableFont.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* 使用 */
h1 { font-family: 'MyVariableFont'; font-weight: 700; }
p  { font-family: 'MyVariableFont'; font-weight: 400; }</pre>
</div>`,
  },
  {
    label: 'font-display 对比',
    css: `.timeline { display: flex; gap: 4px; margin-bottom: 6px; }
.phase { flex: 1; padding: 8px 4px; border-radius: 4px; text-align: center; color: white; font-size: 11px; font-weight: 600; }
.phase-block { background: #ef4444; }
.phase-swap  { background: #22c55e; }
.phase-fail  { background: #6b7280; }
.phase-auto  { background: #3b82f6; }
.phase-opt   { background: #f59e0b; }
.group { margin-bottom: 16px; }
.group h3 { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
.desc { font-size: 12px; color: #666; margin-top: 4px; }`,
    html: `<div class="group"><h3>block</h3><div class="timeline"><div class="phase phase-block">阻塞期 3s</div><div class="phase phase-swap">交换期 (无限)</div></div><div class="desc">短暂隐藏文本，加载后替换</div></div>
<div class="group"><h3>swap</h3><div class="timeline"><div class="phase phase-swap">交换期 (无限)</div></div><div class="desc">立即显示后备字体，加载后交换</div></div>
<div class="group"><h3>fallback</h3><div class="timeline"><div class="phase phase-block" style="flex:0.2">阻塞 0.1s</div><div class="phase phase-swap" style="flex:1">交换期 3s</div><div class="phase phase-fail">失败 (后备)</div></div><div class="desc">极短阻塞，限时交换，超时使用后备</div></div>
<div class="group"><h3>optional</h3><div class="timeline"><div class="phase phase-block" style="flex:0.2">阻塞 0.1s</div><div class="phase phase-opt">可选期 (根据网速)</div></div><div class="desc">极短阻塞，根据网速决定是否使用</div></div>`,
  },
  {
    label: '多格式回退',
    css: `.example { border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
.example h3 { font-size: 14px; font-weight: 700; color: #3b82f6; margin-bottom: 8px; }
.example pre { font-family: monospace; font-size: 12px; background: #f8fafc; padding: 12px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6; }
.note { font-size: 12px; color: #666; border-left: 3px solid #3b82f6; padding-left: 10px; margin-top: 12px; }`,
    html: `<div class="example">
  <h3>多格式 src 回退</h3>
  <pre>@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2'),
       url('/fonts/MyFont.woff') format('woff'),
       url('/fonts/MyFont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}</pre>
</div>
<div class="note">
  <p><strong>推荐格式：</strong>WOFF2 压缩率最高、兼容性最好，应作为首选。</p>
</div>`,
  },
];

export function FontFaceDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
