'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultHTML = `<div class="perf-demo">
  <div class="selector-box good">
    <div class="label">.btn-primary</div>
    <div class="desc">直接类选择器 — 最快</div>
    <div class="steps">匹配步骤: 1步（直接查找类名）</div>
    <div class="badge green">高效</div>
  </div>
  <div class="selector-box medium">
    <div class="label">nav > ul li</div>
    <div class="desc">3层嵌套 — 中等</div>
    <div class="steps">匹配: li → ul(父) → nav(祖父)</div>
    <div class="badge yellow">中等</div>
  </div>
  <div class="selector-box bad">
    <div class="label">div div div div a</div>
    <div class="desc">5层嵌套 — 过深</div>
    <div class="steps">匹配: a → div → div → div → div</div>
    <div class="badge red">低效</div>
  </div>
  <div class="note">
    <strong>浏览器从右向左匹配选择器</strong><br>
    关键选择器（最右）决定初始候选集，然后逐步向左验证
  </div>
</div>`;

const defaultCSS = `.perf-demo { padding: 12px; font-family: sans-serif; }
.selector-box { padding: 12px; margin: 8px 0; border-radius: 8px; border: 2px solid; position: relative; }
.good { border-color: #22c55e; background: #f0fdf4; }
.medium { border-color: #f59e0b; background: #fffbeb; }
.bad { border-color: #ef4444; background: #fef2f2; }
.label { font-family: monospace; font-size: 16px; font-weight: bold; margin-bottom: 4px; }
.desc { font-size: 13px; color: #555; }
.steps { font-size: 11px; color: #888; margin-top: 4px; font-family: monospace; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; color: white; margin-top: 6px; }
.green { background: #22c55e; }
.yellow { background: #f59e0b; }
.red { background: #ef4444; }
.note { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`;

const presets = [
  {
    label: '高效选择器',
    css: `.perf-demo { padding: 12px; font-family: sans-serif; }
.selector-box { padding: 16px; margin: 8px 0; border-radius: 8px; border: 2px solid #22c55e; background: #f0fdf4; }
.label { font-family: monospace; font-size: 18px; font-weight: bold; color: #166534; }
.desc { font-size: 13px; color: #555; margin-top: 4px; }
.note { margin-top: 12px; padding: 10px; background: #dcfce7; border: 1px solid #86efac; border-radius: 6px; font-size: 12px; color: #166534; }`,
    html: `<div class="perf-demo">
  <div class="selector-box"><div class="label">.btn-primary</div><div class="desc">直接类选择器，浏览器通过哈希表直接查找，O(1) 复杂度</div></div>
  <div class="selector-box"><div class="label">#header</div><div class="desc">ID 选择器，唯一标识，最快的选择器类型</div></div>
  <div class="selector-box"><div class="label">[type="submit"]</div><div class="desc">属性选择器，单步匹配，性能良好</div></div>
  <div class="note"><strong>建议：</strong>关键选择器（最右）使用类名或 ID，避免标签名和通配符</div>
</div>`,
  },
  {
    label: '低效选择器',
    css: `.perf-demo { padding: 12px; font-family: sans-serif; }
.selector-box { padding: 16px; margin: 8px 0; border-radius: 8px; border: 2px solid #ef4444; background: #fef2f2; }
.label { font-family: monospace; font-size: 18px; font-weight: bold; color: #991b1b; }
.desc { font-size: 13px; color: #555; margin-top: 4px; }
.arrow { font-size: 12px; font-family: monospace; color: #dc2626; margin-top: 4px; }
.note { margin-top: 12px; padding: 10px; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; font-size: 12px; color: #991b1b; }`,
    html: `<div class="perf-demo">
  <div class="selector-box"><div class="label">div div div div a</div><div class="desc">过深嵌套，每个 a 元素都要向上验证 4 层</div><div class="arrow">a → div? → div? → div? → div?</div></div>
  <div class="selector-box"><div class="label">div * a</div><div class="desc">通配符 * 匹配任意元素，大量无效检查</div><div class="arrow">a → *(任何) → div?</div></div>
  <div class="selector-box"><div class="label">body div ul li a</div><div class="desc">从 body 开始的超长链，严重影响性能</div></div>
  <div class="note"><strong>避免：</strong>超过 3 层嵌套、通配符 *、从 body/html 开始的选择器</div>
</div>`,
  },
  {
    label: '匹配方向演示',
    css: `.perf-demo { padding: 12px; font-family: sans-serif; }
.step { display: flex; align-items: center; gap: 8px; padding: 8px; margin: 4px 0; border-radius: 6px; font-size: 13px; }
.step-num { width: 24px; height: 24px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; flex-shrink: 0; }
.selector-display { font-family: monospace; font-size: 18px; text-align: center; padding: 12px; background: #f8fafc; border-radius: 8px; margin: 8px 0; letter-spacing: 2px; }
.highlight { color: #ef4444; font-weight: bold; }
.dim { color: #94a3b8; }
.note { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; color: #1e40af; }`,
    html: `<div class="perf-demo">
  <div class="selector-display"><span class="dim">div</span> <span class="dim">></span> <span class="dim">ul</span> <span class="highlight">li.active</span></div>
  <div class="step"><div class="step-num">1</div>找到所有 <code style="font-weight:bold;color:#ef4444">li.active</code>（关键选择器）</div>
  <div class="step"><div class="step-num">2</div>检查每个 li.active 的父元素是否是 <code style="color:#f59e0b">ul</code></div>
  <div class="step"><div class="step-num">3</div>检查 ul 的父元素是否是 <code style="color:#22c55e">div</code></div>
  <div class="note">从右向左：先用关键选择器快速缩小候选集，再逐步验证祖先</div>
</div>`,
  },
  {
    label: '优化建议',
    css: `.perf-demo { padding: 12px; font-family: sans-serif; }
.row { display: flex; gap: 12px; margin: 8px 0; align-items: stretch; }
.card { flex: 1; padding: 12px; border-radius: 8px; font-size: 12px; }
.bad-card { background: #fef2f2; border: 2px solid #fca5a5; }
.good-card { background: #f0fdf4; border: 2px solid #86efac; }
.card-title { font-weight: bold; margin-bottom: 6px; font-size: 13px; }
.bad-card .card-title { color: #dc2626; }
.good-card .card-title { color: #16a34a; }
code { font-family: monospace; background: rgba(0,0,0,0.05); padding: 1px 4px; border-radius: 2px; }
.arrow-center { display: flex; align-items: center; font-size: 20px; color: #666; }`,
    html: `<div class="perf-demo">
  <div class="row"><div class="card bad-card"><div class="card-title">避免</div><code>div div a</code></div><div class="arrow-center">→</div><div class="card good-card"><div class="card-title">推荐</div><code>.nav-link</code></div></div>
  <div class="row"><div class="card bad-card"><div class="card-title">避免</div><code>ul > li > a</code></div><div class="arrow-center">→</div><div class="card good-card"><div class="card-title">推荐</div><code>.menu-item a</code></div></div>
  <div class="row"><div class="card bad-card"><div class="card-title">避免</div><code>div * span</code></div><div class="arrow-center">→</div><div class="card good-card"><div class="card-title">推荐</div><code>.text-highlight</code></div></div>
</div>`,
  },
];

export function SelectorPerfDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={360} />;
}
