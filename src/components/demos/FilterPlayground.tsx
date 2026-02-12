'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.preview {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background:
    linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  margin-bottom: 12px;
}

.preview .title {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.shapes {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
}

.shapes div {
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(4px);
}

.shapes .circle { border-radius: 50%; }
.shapes .square { border-radius: 8px; }

.label {
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="preview">
  <div class="title">CSS Filters</div>
</div>
<div class="shapes">
  <div class="circle"></div>
  <div class="square"></div>
  <div class="circle"></div>
</div>
<div class="label">filter: none;</div>`;

const presets = [
  {
    label: '模糊',
    css: `.preview {
  height: 200px; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  filter: blur(5px);
}
.preview .title { font-size: 36px; font-weight: 700; color: #fff; }
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="preview"><div class="title">CSS Filters</div></div>
<div class="label">filter: blur(5px);</div>`,
  },
  {
    label: '黑白',
    css: `.preview {
  height: 200px; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  filter: grayscale(100%);
}
.preview .title { font-size: 36px; font-weight: 700; color: #fff; }
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="preview"><div class="title">CSS Filters</div></div>
<div class="label">filter: grayscale(100%);</div>`,
  },
  {
    label: '复古',
    css: `.preview {
  height: 200px; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  filter: sepia(80%) contrast(120%) brightness(90%);
}
.preview .title { font-size: 36px; font-weight: 700; color: #fff; }
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="preview"><div class="title">CSS Filters</div></div>
<div class="label">filter: sepia(80%) contrast(120%) brightness(90%);</div>`,
  },
  {
    label: '霓虹',
    css: `.preview {
  height: 200px; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  filter: hue-rotate(180deg) saturate(200%) brightness(120%);
}
.preview .title { font-size: 36px; font-weight: 700; color: #fff; }
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="preview"><div class="title">CSS Filters</div></div>
<div class="label">filter: hue-rotate(180deg) saturate(200%) brightness(120%);</div>`,
  },
  {
    label: '反相',
    css: `.preview {
  height: 200px; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  filter: invert(100%);
}
.preview .title { font-size: 36px; font-weight: 700; color: #fff; }
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="preview"><div class="title">CSS Filters</div></div>
<div class="label">filter: invert(100%);</div>`,
  },
];

export function FilterPlayground() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
