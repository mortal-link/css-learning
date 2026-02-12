'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* !important 与层叠优先级 */
.box {
  width: 200px;
  height: 120px;
  margin: 16px auto;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* 元素选择器 - 优先级 (0,0,0,1) */
div { background-color: gray; }

/* 类选择器 - 优先级 (0,0,1,0) */
.box { background-color: blue; }

/* ID 选择器 - 优先级 (0,1,0,0) */
#demo { background-color: green; }

.rules {
  max-width: 500px;
  margin: 16px auto 0;
  font-size: 13px;
  font-family: monospace;
}
.rule {
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 6px;
  border: 2px solid transparent;
}
.rule.winner {
  border-color: #22c55e;
  background: #f0fdf4;
}
.rule .selector { color: #7c3aed; }
.rule .prop { color: #2563eb; }
.rule .val { font-weight: 600; }
.rule .imp { color: #dc2626; }
.rule .spec { float: right; color: #64748b; font-size: 11px; }

.note {
  max-width: 500px;
  margin: 16px auto 0;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  color: #475569;
  line-height: 1.8;
}`;

const defaultHTML = `<div class="box" id="demo">示例盒子</div>
<div class="rules">
  <div class="rule"><span class="selector">div</span> { <span class="prop">background</span>: <span class="val">gray</span>; } <span class="spec">(0,0,0,1)</span></div>
  <div class="rule"><span class="selector">.box</span> { <span class="prop">background</span>: <span class="val">blue</span>; } <span class="spec">(0,0,1,0)</span></div>
  <div class="rule winner"><span class="selector">#demo</span> { <span class="prop">background</span>: <span class="val">green</span>; } <span class="spec">(0,1,0,0) ✓</span></div>
</div>
<div class="note">
  正常层叠：ID 选择器优先级最高 → 绿色生效。<br>
  优先级顺序：内联 > ID > 类 > 元素
</div>`;

const presets = [
  {
    label: '正常层叠',
  },
  {
    label: '!important 覆盖',
    css: `.box {
  width: 200px; height: 120px; margin: 16px auto;
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: bold; color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
/* 类选择器 + !important */
.box { background-color: red !important; }
/* ID 选择器 */
#demo { background-color: green; }
.rules { max-width: 500px; margin: 16px auto 0; font-size: 13px; font-family: monospace; }
.rule { padding: 8px 12px; margin-bottom: 4px; border-radius: 6px; border: 2px solid transparent; }
.rule.winner { border-color: #22c55e; background: #f0fdf4; }
.rule .selector { color: #7c3aed; }
.rule .prop { color: #2563eb; }
.rule .val { font-weight: 600; }
.rule .imp { color: #dc2626; font-weight: bold; }
.rule .spec { float: right; color: #64748b; font-size: 11px; }
.note { max-width: 500px; margin: 16px auto 0; padding: 10px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; font-size: 13px; color: #b91c1c; line-height: 1.8; }`,
    html: `<div class="box" id="demo">示例盒子</div>
<div class="rules">
  <div class="rule winner"><span class="selector">.box</span> { <span class="prop">background</span>: <span class="val">red</span> <span class="imp">!important</span>; } <span class="spec">(0,0,1,0) ✓</span></div>
  <div class="rule"><span class="selector">#demo</span> { <span class="prop">background</span>: <span class="val">green</span>; } <span class="spec">(0,1,0,0)</span></div>
</div>
<div class="note">
  !important 覆盖了 ID 选择器。即使 .box 优先级更低，!important 使其胜出。
</div>`,
  },
  {
    label: '!important 对决',
    css: `.box {
  width: 200px; height: 120px; margin: 16px auto;
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: bold; color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
div { background-color: orange !important; }
.box { background-color: red !important; }
#demo { background-color: blue !important; }
.rules { max-width: 500px; margin: 16px auto 0; font-size: 13px; font-family: monospace; }
.rule { padding: 8px 12px; margin-bottom: 4px; border-radius: 6px; border: 2px solid transparent; }
.rule.winner { border-color: #22c55e; background: #f0fdf4; }
.rule .selector { color: #7c3aed; }
.rule .prop { color: #2563eb; }
.rule .val { font-weight: 600; }
.rule .imp { color: #dc2626; font-weight: bold; }
.rule .spec { float: right; color: #64748b; font-size: 11px; }
.note { max-width: 500px; margin: 16px auto 0; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.8; }`,
    html: `<div class="box" id="demo">示例盒子</div>
<div class="rules">
  <div class="rule"><span class="selector">div</span> { <span class="prop">background</span>: <span class="val">orange</span> <span class="imp">!important</span>; } <span class="spec">(0,0,0,1)</span></div>
  <div class="rule"><span class="selector">.box</span> { <span class="prop">background</span>: <span class="val">red</span> <span class="imp">!important</span>; } <span class="spec">(0,0,1,0)</span></div>
  <div class="rule winner"><span class="selector">#demo</span> { <span class="prop">background</span>: <span class="val">blue</span> <span class="imp">!important</span>; } <span class="spec">(0,1,0,0) ✓</span></div>
</div>
<div class="note">
  当多个规则都有 !important 时，再按优先级比较。ID 选择器优先级最高 → 蓝色胜出。
</div>`,
  },
];

export function ImportantDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
