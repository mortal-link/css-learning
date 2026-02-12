'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 特异性比较: 哪个选择器赢？ */
.demo { font-family: system-ui; padding: 16px; }

/* 特异性 (0,0,1) — 类型选择器 */
p { color: blue; }

/* 特异性 (0,1,0) — 类选择器 */
.highlight { color: green; }

/* 特异性 (1,0,0) — ID 选择器 */
#main { color: red; }

.result {
  margin-top: 16px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.8;
  border: 1px solid #e2e8f0;
}
.result code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}
.win { color: #16a34a; font-weight: bold; }
.lose { color: #9ca3af; text-decoration: line-through; }`;

const defaultHTML = `<div class="demo">
  <p id="main" class="highlight">这段文字是什么颜色？</p>
</div>

<div class="result">
  <strong>特异性计算：</strong><br>
  <span class="lose"><code>p</code> → (0,0,1) — 类型选择器</span><br>
  <span class="lose"><code>.highlight</code> → (0,1,0) — 类选择器</span><br>
  <span class="win"><code>#main</code> → (1,0,0) — ID 选择器 ← 胜出！</span><br><br>
  <strong>规则：</strong>a (ID) > b (类/属性/伪类) > c (类型/伪元素)<br>
  同级比较数量，高级别一个胜过低级别任意多个。
</div>`;

const presets = [
  {
    label: 'ID > 类 > 类型',
    css: `p { color: blue; font-size: 18px; }
.highlight { color: green; font-size: 18px; }
#main { color: red; font-size: 18px; }
.result { margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; line-height: 1.8; border: 1px solid #e2e8f0; }
.result code { background: #e2e8f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
.win { color: #16a34a; font-weight: bold; }
.lose { color: #9ca3af; text-decoration: line-through; }`,
    html: `<p id="main" class="highlight">这段文字是红色 (#main 胜出)</p>
<div class="result">
  <span class="lose"><code>p</code> → (0,0,1)</span><br>
  <span class="lose"><code>.highlight</code> → (0,1,0)</span><br>
  <span class="win"><code>#main</code> → (1,0,0) ← 胜出</span>
</div>`,
  },
  {
    label: '多类 vs 单ID',
    css: `.a.b.c.d.e.f.g.h.i.j { color: blue; font-size: 18px; }
#solo { color: red; font-size: 18px; }
.result { margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; line-height: 1.8; border: 1px solid #e2e8f0; }
.result code { background: #e2e8f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
.win { color: #16a34a; font-weight: bold; }
.lose { color: #9ca3af; text-decoration: line-through; }`,
    html: `<p id="solo" class="a b c d e f g h i j">10 个类 vs 1 个 ID，谁赢？</p>
<div class="result">
  <span class="lose"><code>.a.b.c.d.e.f.g.h.i.j</code> → (0,10,0)</span><br>
  <span class="win"><code>#solo</code> → (1,0,0) ← 1 个 ID 胜过 10 个类！</span>
</div>`,
  },
  {
    label: ':is() / :where() 区别',
    css: `:where(.box) p { color: blue; font-size: 18px; }
:is(.box) p { color: red; font-size: 18px; }
.result { margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; line-height: 1.8; border: 1px solid #e2e8f0; }
.result code { background: #e2e8f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
.win { color: #16a34a; font-weight: bold; }
.zero { color: #d97706; font-weight: bold; }`,
    html: `<div class="box"><p>这段文字用 :is() 还是 :where()？</p></div>
<div class="result">
  <span class="zero"><code>:where(.box) p</code> → (0,0,1) — :where() 特异性为 0！</span><br>
  <span class="win"><code>:is(.box) p</code> → (0,1,1) — :is() 取参数最高特异性</span><br><br>
  <strong>关键：</strong>:where() 永远不增加特异性，:is() 取参数中最高的。
</div>`,
  },
  {
    label: '后来居上',
    css: `.text { color: blue; font-size: 18px; }
.text { color: red; font-size: 18px; }
.result { margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; line-height: 1.8; border: 1px solid #e2e8f0; }
.result code { background: #e2e8f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
.win { color: #16a34a; font-weight: bold; }
.lose { color: #9ca3af; text-decoration: line-through; }`,
    html: `<p class="text">特异性相同时，后出现的规则获胜</p>
<div class="result">
  <span class="lose"><code>.text { color: blue; }</code> → (0,1,0) — 先出现</span><br>
  <span class="win"><code>.text { color: red; }</code> → (0,1,0) — 后出现 ← 胜出</span><br><br>
  <strong>规则：</strong>特异性相同时，源码中后出现的声明获胜（后来居上）。
</div>`,
  },
];

export function SpecificityCalculator() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
