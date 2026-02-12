'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  border: 20px solid transparent;
  border-image-source: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  border-image-slice: 30;
  border-image-width: 20px;
  border-image-outset: 0;
  border-image-repeat: stretch;
}

.label {
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="box">边框图像预览</div>
<div class="label">border-image: linear-gradient(...) 30 / 20px / 0 stretch</div>`;

const presets = [
  {
    label: '渐变边框',
    css: `.box {
  width: 200px; height: 200px; margin: 20px auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  border: 20px solid transparent;
  border-image-source: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  border-image-slice: 30;
  border-image-width: 20px;
  border-image-repeat: stretch;
}
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box">渐变边框</div>
<div class="label">border-image-repeat: stretch</div>`,
  },
  {
    label: '条纹边框',
    css: `.box {
  width: 200px; height: 200px; margin: 20px auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  border: 20px solid transparent;
  border-image-source: repeating-linear-gradient(45deg, #667eea 0px, #667eea 10px, #764ba2 10px, #764ba2 20px);
  border-image-slice: 20;
  border-image-width: 15px;
  border-image-repeat: repeat;
}
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box">条纹边框</div>
<div class="label">border-image-repeat: repeat</div>`,
  },
  {
    label: '彩虹边框',
    css: `.box {
  width: 200px; height: 200px; margin: 20px auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  border: 20px solid transparent;
  border-image-source: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #9400d3);
  border-image-slice: 30;
  border-image-width: 20px;
  border-image-repeat: round;
}
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box">彩虹边框</div>
<div class="label">border-image-repeat: round</div>`,
  },
  {
    label: 'Fill 填充',
    css: `.box {
  width: 200px; height: 200px; margin: 20px auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #fff;
  border: 20px solid transparent;
  border-image-source: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-image-slice: 50 fill;
  border-image-width: 25px;
  border-image-repeat: round;
}
.label { text-align: center; margin-top: 12px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box">Fill 模式</div>
<div class="label">border-image-slice: 50 fill</div>`,
  },
  {
    label: 'Outset 偏移',
    css: `.box {
  width: 200px; height: 200px; margin: 40px auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: #333;
  border: 20px solid transparent;
  border-image-source: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  border-image-slice: 30;
  border-image-width: 20px;
  border-image-outset: 15px;
  border-image-repeat: stretch;
}
.label { text-align: center; margin-top: 28px; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="box">Outset 偏移</div>
<div class="label">border-image-outset: 15px</div>`,
  },
];

export function BorderImageDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
