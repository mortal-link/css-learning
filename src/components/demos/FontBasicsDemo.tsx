'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo {
  position: relative;
  font-family: Georgia, serif;
  font-size: 80px;
  font-weight: bold;
  line-height: 1.5;
  padding: 20px 0;
}
.lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.line {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 2px dashed;
}
.line span {
  position: absolute;
  right: 0;
  top: -10px;
  font-size: 11px;
  font-weight: normal;
  padding: 0 4px;
  background: white;
}
.l-ascender  { top: 12%; border-color: #a855f7; }
.l-ascender span { color: #a855f7; }
.l-cap       { top: 20%; border-color: #ef4444; }
.l-cap span  { color: #ef4444; }
.l-xheight   { top: 45%; border-color: #3b82f6; }
.l-xheight span { color: #3b82f6; }
.l-baseline  { top: 68%; border-color: #16a34a; border-style: solid; }
.l-baseline span { color: #16a34a; font-weight: bold; }
.l-descender { top: 82%; border-color: #f97316; }
.l-descender span { color: #f97316; }

.terms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px;
}
.term {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px;
}
.term code { color: #3b82f6; font-size: 12px; font-weight: bold; }
.term .label { font-size: 13px; font-weight: 600; margin: 4px 0; }
.term .desc { font-size: 12px; color: #666; }`;

const defaultHTML = `<div class="demo">
  <span>Typography</span>
  <div class="lines">
    <div class="line l-ascender"><span>ascender</span></div>
    <div class="line l-cap"><span>cap-height</span></div>
    <div class="line l-xheight"><span>x-height</span></div>
    <div class="line l-baseline"><span>baseline</span></div>
    <div class="line l-descender"><span>descender</span></div>
  </div>
</div>

<div class="terms">
  <div class="term"><code>baseline</code><div class="label">基线</div><div class="desc">字母坐落的基准线，大多数字母底部对齐于此。</div></div>
  <div class="term"><code>x-height</code><div class="label">x 字高</div><div class="desc">小写字母 x 的高度，不包括上伸部和下伸部。</div></div>
  <div class="term"><code>cap-height</code><div class="label">大写字母高度</div><div class="desc">大写字母从基线到顶部的高度。</div></div>
  <div class="term"><code>ascender</code><div class="label">上伸部</div><div class="desc">小写字母中超出 x 字高的部分，如 b, d, h。</div></div>
  <div class="term"><code>descender</code><div class="label">下伸部</div><div class="desc">字母中低于基线的部分，如 g, p, y。</div></div>
</div>`;

const presets = [
  {
    label: '衬线体',
    css: `.demo {
  position: relative;
  font-family: Georgia, serif;
  font-size: 80px;
  font-weight: bold;
  line-height: 1.5;
  padding: 20px 0;
}
.lines { position: absolute; inset: 0; pointer-events: none; }
.line { position: absolute; left: 0; right: 0; border-top: 2px dashed; }
.line span { position: absolute; right: 0; top: -10px; font-size: 11px; font-weight: normal; padding: 0 4px; background: white; }
.l-ascender  { top: 12%; border-color: #a855f7; } .l-ascender span { color: #a855f7; }
.l-cap       { top: 20%; border-color: #ef4444; } .l-cap span  { color: #ef4444; }
.l-xheight   { top: 45%; border-color: #3b82f6; } .l-xheight span { color: #3b82f6; }
.l-baseline  { top: 68%; border-color: #16a34a; border-style: solid; } .l-baseline span { color: #16a34a; font-weight: bold; }
.l-descender { top: 82%; border-color: #f97316; } .l-descender span { color: #f97316; }
.terms { display: none; }`,
  },
  {
    label: '无衬线体',
    css: `.demo {
  position: relative;
  font-family: Arial, sans-serif;
  font-size: 80px;
  font-weight: bold;
  line-height: 1.5;
  padding: 20px 0;
}
.lines { position: absolute; inset: 0; pointer-events: none; }
.line { position: absolute; left: 0; right: 0; border-top: 2px dashed; }
.line span { position: absolute; right: 0; top: -10px; font-size: 11px; font-weight: normal; padding: 0 4px; background: white; }
.l-ascender  { top: 12%; border-color: #a855f7; } .l-ascender span { color: #a855f7; }
.l-cap       { top: 20%; border-color: #ef4444; } .l-cap span  { color: #ef4444; }
.l-xheight   { top: 45%; border-color: #3b82f6; } .l-xheight span { color: #3b82f6; }
.l-baseline  { top: 68%; border-color: #16a34a; border-style: solid; } .l-baseline span { color: #16a34a; font-weight: bold; }
.l-descender { top: 82%; border-color: #f97316; } .l-descender span { color: #f97316; }
.terms { display: none; }`,
  },
  {
    label: '等宽字体',
    css: `.demo {
  position: relative;
  font-family: 'Courier New', monospace;
  font-size: 80px;
  font-weight: bold;
  line-height: 1.5;
  padding: 20px 0;
}
.lines { position: absolute; inset: 0; pointer-events: none; }
.line { position: absolute; left: 0; right: 0; border-top: 2px dashed; }
.line span { position: absolute; right: 0; top: -10px; font-size: 11px; font-weight: normal; padding: 0 4px; background: white; }
.l-ascender  { top: 12%; border-color: #a855f7; } .l-ascender span { color: #a855f7; }
.l-cap       { top: 20%; border-color: #ef4444; } .l-cap span  { color: #ef4444; }
.l-xheight   { top: 45%; border-color: #3b82f6; } .l-xheight span { color: #3b82f6; }
.l-baseline  { top: 68%; border-color: #16a34a; border-style: solid; } .l-baseline span { color: #16a34a; font-weight: bold; }
.l-descender { top: 82%; border-color: #f97316; } .l-descender span { color: #f97316; }
.terms { display: none; }`,
  },
  {
    label: '术语说明',
    css: `.demo { display: none; }
.lines { display: none; }
.terms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.term { border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; }
.term code { color: #3b82f6; font-size: 12px; font-weight: bold; }
.term .label { font-size: 13px; font-weight: 600; margin: 4px 0; }
.term .desc { font-size: 12px; color: #666; }`,
  },
];

export function FontBasicsDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={400}
    />
  );
}
