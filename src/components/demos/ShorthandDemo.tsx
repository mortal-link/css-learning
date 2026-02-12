'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 简写属性: background: blue 展开为 8 个子属性 */
.demo { font-family: system-ui; padding: 16px; }
.shorthand {
  font-family: monospace;
  font-size: 14px;
  padding: 12px;
  background: #eff6ff;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  margin-bottom: 12px;
}
.expanded {
  font-family: monospace;
  font-size: 13px;
  line-height: 1.8;
}
.sub {
  padding: 6px 12px;
  margin: 3px 0;
  border-radius: 4px;
}
.sub.set { background: #dcfce7; border-left: 3px solid #22c55e; }
.sub.reset { background: #fff7ed; border-left: 3px solid #f97316; }
.reset-label { color: #9a3412; font-size: 12px; font-style: italic; }`;

const defaultHTML = `<div class="demo">
  <div class="shorthand">
    <strong>background</strong>: blue;
  </div>
  <div class="expanded">
    <div class="sub set">background-color: <strong>blue</strong></div>
    <div class="sub reset">background-image: <strong>none</strong> <span class="reset-label">(重置为初始值)</span></div>
    <div class="sub reset">background-position: <strong>0% 0%</strong> <span class="reset-label">(重置)</span></div>
    <div class="sub reset">background-size: <strong>auto</strong> <span class="reset-label">(重置)</span></div>
    <div class="sub reset">background-repeat: <strong>repeat</strong> <span class="reset-label">(重置)</span></div>
    <div class="sub reset">background-attachment: <strong>scroll</strong> <span class="reset-label">(重置)</span></div>
    <div class="sub reset">background-origin: <strong>padding-box</strong> <span class="reset-label">(重置)</span></div>
    <div class="sub reset">background-clip: <strong>border-box</strong> <span class="reset-label">(重置)</span></div>
  </div>
</div>`;

const presets = [
  {
    label: 'margin 展开',
    css: `.demo { font-family: system-ui; padding: 16px; }
.shorthand { font-family: monospace; font-size: 14px; padding: 12px; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; margin-bottom: 12px; }
.expanded { font-family: monospace; font-size: 13px; line-height: 1.8; }
.sub { padding: 6px 12px; margin: 3px 0; border-radius: 4px; }
.sub.set { background: #dcfce7; border-left: 3px solid #22c55e; }
.note { margin-top: 12px; font-size: 13px; color: #1e40af; padding: 10px; background: #eff6ff; border-radius: 6px; }`,
    html: `<div class="demo">
  <div class="shorthand"><strong>margin</strong>: 10px 20px;</div>
  <div class="expanded">
    <div class="sub set">margin-top: <strong>10px</strong></div>
    <div class="sub set">margin-right: <strong>20px</strong></div>
    <div class="sub set">margin-bottom: <strong>10px</strong></div>
    <div class="sub set">margin-left: <strong>20px</strong></div>
  </div>
  <div class="note">margin 的值按 上/右/下/左 (顺时针) 分配。2 个值 = 上下 / 左右。</div>
</div>`,
  },
  {
    label: 'background 陷阱',
    css: `.demo { font-family: system-ui; padding: 16px; }
.code { font-family: monospace; font-size: 13px; padding: 12px; border-radius: 6px; margin: 8px 0; line-height: 1.8; }
.code-ok { background: #f0fdf4; border: 1px solid #bbf7d0; }
.code-bad { background: #fef2f2; border: 1px solid #fecaca; }
.code-fix { background: #eff6ff; border: 1px solid #bfdbfe; }
.ok { color: #16a34a; }
.bad { color: #dc2626; }
.comment { color: #64748b; font-style: italic; }
.warning { margin-top: 12px; padding: 10px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; font-size: 13px; color: #991b1b; }`,
    html: `<div class="demo">
  <div class="code code-ok">
    <span class="comment">/* 第一步：设置背景图 */</span><br>
    .element { background-image: url('pattern.png'); } <span class="ok">OK</span>
  </div>
  <div class="code code-bad">
    <span class="comment">/* 第二步：用简写设置背景色 — 陷阱！ */</span><br>
    .element { background: blue; } <span class="bad">background-image 被重置为 none!</span>
  </div>
  <div class="code code-fix">
    <span class="comment">/* 正确做法：用子属性 */</span><br>
    .element { background-color: blue; } <span class="ok">不影响 background-image</span>
  </div>
  <div class="warning"><strong>陷阱：</strong>简写属性会重置所有未显式指定的子属性为初始值！</div>
</div>`,
  },
  {
    label: 'border 展开',
    css: `.demo { font-family: system-ui; padding: 16px; }
.shorthand { font-family: monospace; font-size: 14px; padding: 12px; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; margin-bottom: 12px; }
.expanded { font-family: monospace; font-size: 13px; line-height: 1.8; }
.sub { padding: 6px 12px; margin: 3px 0; border-radius: 4px; }
.sub.set { background: #dcfce7; border-left: 3px solid #22c55e; }
.sub.reset { background: #fff7ed; border-left: 3px solid #f97316; }
.reset-label { color: #9a3412; font-size: 12px; font-style: italic; }`,
    html: `<div class="demo">
  <div class="shorthand"><strong>border</strong>: 2px solid red;</div>
  <div class="expanded">
    <div class="sub set">border-width: <strong>2px</strong></div>
    <div class="sub set">border-style: <strong>solid</strong></div>
    <div class="sub set">border-color: <strong>red</strong></div>
    <div class="sub reset">border-image: <strong>none</strong> <span class="reset-label">(重置为初始值)</span></div>
  </div>
</div>`,
  },
  {
    label: 'all 属性',
    css: `.demo { font-family: system-ui; padding: 16px; }
.shorthand { font-family: monospace; font-size: 14px; padding: 12px; background: #f3e8ff; border: 2px solid #9333ea; border-radius: 8px; margin-bottom: 12px; }
.expanded { font-family: monospace; font-size: 13px; line-height: 1.8; }
.sub { padding: 6px 12px; margin: 3px 0; border-radius: 4px; background: #faf5ff; border-left: 3px solid #9333ea; }
.note { margin-top: 12px; font-size: 13px; color: #6b21a8; padding: 10px; background: #faf5ff; border-radius: 6px; }`,
    html: `<div class="demo">
  <div class="shorthand"><strong>all</strong>: unset;</div>
  <div class="expanded">
    <div class="sub">color: <strong>unset</strong></div>
    <div class="sub">background: <strong>unset</strong></div>
    <div class="sub">border: <strong>unset</strong></div>
    <div class="sub">margin: <strong>unset</strong></div>
    <div class="sub">padding: <strong>unset</strong></div>
    <div class="sub">font: <strong>unset</strong></div>
    <div class="sub">(所有属性...): <strong>unset</strong></div>
  </div>
  <div class="note"><strong>all</strong> 是特殊简写，重置除 direction 和 unicode-bidi 外的所有 CSS 属性。常用值：unset, initial, revert。</div>
</div>`,
  },
  {
    label: 'font 展开',
    css: `.demo { font-family: system-ui; padding: 16px; }
.shorthand { font-family: monospace; font-size: 14px; padding: 12px; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; margin-bottom: 12px; }
.expanded { font-family: monospace; font-size: 13px; line-height: 1.8; }
.sub { padding: 6px 12px; margin: 3px 0; border-radius: 4px; }
.sub.set { background: #dcfce7; border-left: 3px solid #22c55e; }
.sub.reset { background: #fff7ed; border-left: 3px solid #f97316; }
.reset-label { color: #9a3412; font-size: 12px; font-style: italic; }
.preview { margin-top: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; }`,
    html: `<div class="demo">
  <div class="shorthand"><strong>font</strong>: italic bold 16px/1.5 Arial;</div>
  <div class="expanded">
    <div class="sub set">font-style: <strong>italic</strong></div>
    <div class="sub set">font-weight: <strong>bold</strong></div>
    <div class="sub set">font-size: <strong>16px</strong></div>
    <div class="sub set">line-height: <strong>1.5</strong></div>
    <div class="sub set">font-family: <strong>Arial</strong></div>
    <div class="sub reset">font-variant: <strong>normal</strong> <span class="reset-label">(重置)</span></div>
    <div class="sub reset">font-stretch: <strong>normal</strong> <span class="reset-label">(重置)</span></div>
  </div>
  <div class="preview" style="font: italic bold 16px/1.5 Arial;">
    预览效果: font: italic bold 16px/1.5 Arial
  </div>
</div>`,
  },
];

export function ShorthandDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
