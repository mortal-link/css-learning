'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 继承演示: color 是可继承属性 */
.parent {
  color: blue;
  font-size: 18px;
  font-family: Georgia, serif;
  line-height: 1.6;
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
}
.child {
  /* color, font-size, font-family, line-height 都从父元素继承 */
  padding: 12px;
  margin-top: 8px;
  background: #eff6ff;
  border-radius: 6px;
}
.label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
  font-family: system-ui;
}`;

const defaultHTML = `<div class="parent">
  <div class="label">父元素 — color: blue; font-size: 18px; font-family: Georgia</div>
  这是父元素的文字 (蓝色 Georgia 18px)
  <div class="child">
    <div class="label">子元素 — 无 color/font 声明，全部继承</div>
    这是子元素的文字 (继承了蓝色 Georgia 18px)
  </div>
</div>`;

const presets = [
  {
    label: '可继承属性',
    css: `.parent { color: blue; font-size: 18px; font-family: Georgia, serif; padding: 16px; border: 2px solid #ddd; border-radius: 8px; }
.child { padding: 12px; margin-top: 8px; background: #eff6ff; border-radius: 6px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; font-family: system-ui; }`,
    html: `<div class="parent">
  <div class="label">父: color: blue; font-size: 18px</div>
  父元素文字 (蓝色, 18px)
  <div class="child">
    <div class="label">子: 未声明 color/font-size → 继承</div>
    子元素文字 (继承蓝色, 18px)
  </div>
</div>`,
  },
  {
    label: '不可继承属性',
    css: `.parent { padding: 20px; border: 3px solid #e74c3c; border-radius: 8px; background: #fdf2f2; margin: 10px; }
.child { padding: 12px; margin-top: 8px; background: #f8fafc; border-radius: 6px; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
.note { margin-top: 12px; font-size: 13px; color: #92400e; padding: 8px; background: #fffbeb; border-radius: 4px; }`,
    html: `<div class="parent">
  <div class="label">父: border: 3px solid red; padding: 20px; background: pink;</div>
  父元素内容
  <div class="child">
    <div class="label">子: 未声明 border/padding/background → 不继承</div>
    子元素没有红色边框、没有 20px padding、没有粉色背景
  </div>
</div>
<div class="note">border, padding, margin, background 等盒模型属性不可继承，子元素使用初始值。</div>`,
  },
  {
    label: 'inherit 关键字',
    css: `.parent { padding: 16px; border: 3px solid #3b82f6; border-radius: 8px; background: #eff6ff; }
.child { padding: 12px; margin-top: 8px; border: inherit; border-radius: inherit; background: inherit; }
.label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
.note { margin-top: 12px; font-size: 13px; color: #166534; padding: 8px; background: #f0fdf4; border-radius: 4px; }`,
    html: `<div class="parent">
  <div class="label">父: border: 3px solid blue; background: lightblue;</div>
  父元素内容
  <div class="child">
    <div class="label">子: border: inherit; background: inherit; (强制继承)</div>
    子元素现在也有蓝色边框和浅蓝背景了！
  </div>
</div>
<div class="note"><strong>inherit</strong> 关键字可以强制不可继承属性从父元素继承值。</div>`,
  },
  {
    label: 'initial / unset / revert',
    css: `.demo { font-family: system-ui; padding: 16px; }
.box { padding: 12px; margin: 8px 0; border-radius: 6px; border: 1px solid #e2e8f0; }
.box-inherit { color: inherit; }
.box-initial { color: initial; }
.box-unset { color: unset; }
.parent { color: #dc2626; padding: 16px; border: 2px solid #ddd; border-radius: 8px; }
.label { font-size: 11px; color: #64748b; margin-bottom: 2px; }
.kw { font-family: monospace; font-weight: bold; }
table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 16px; }
th, td { padding: 8px 12px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; }`,
    html: `<div class="demo">
  <div class="parent">
    <div class="label">父元素: color: red</div>
    <div class="box box-inherit"><span class="kw">inherit</span> → 继承父元素 = 红色</div>
    <div class="box box-initial"><span class="kw">initial</span> → CSS 初始值 = 黑色 (canvastext)</div>
    <div class="box box-unset"><span class="kw">unset</span> → color 可继承 → 等同 inherit = 红色</div>
  </div>
  <table>
    <tr><th>关键字</th><th>可继承属性</th><th>不可继承属性</th></tr>
    <tr><td>inherit</td><td>继承父值</td><td>继承父值</td></tr>
    <tr><td>initial</td><td>CSS 初始值</td><td>CSS 初始值</td></tr>
    <tr><td>unset</td><td>= inherit</td><td>= initial</td></tr>
    <tr><td>revert</td><td>浏览器默认</td><td>浏览器默认</td></tr>
  </table>
</div>`,
  },
];

export function InheritanceDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
