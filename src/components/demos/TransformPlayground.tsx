'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
}

.box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  transition: transform 0.5s ease;
}

.box:hover {
  transform: rotate(45deg);
}

.label {
  text-align: center;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}

.hint {
  text-align: center;
  font-size: 11px;
  color: #aaa;
  margin-top: 4px;
}`;

const defaultHTML = `<div class="demo">
  <div class="box">悬停旋转</div>
</div>
<div class="label">transform: rotate(45deg)</div>
<div class="hint">鼠标悬停查看效果</div>`;

const presets = [
  {
    label: '旋转 rotate',
    css: `.demo { display: flex; justify-content: center; align-items: center; padding: 48px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.box {
  width: 120px; height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 14px;
  transition: transform 0.5s ease;
}
.box:hover { transform: rotate(180deg); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }
.hint { text-align: center; font-size: 11px; color: #aaa; margin-top: 4px; }`,
    html: `<div class="demo"><div class="box">旋转 180&deg;</div></div>
<div class="label">transform: rotate(180deg)</div>
<div class="hint">鼠标悬停查看效果</div>`,
  },
  {
    label: '缩放 scale',
    css: `.demo { display: flex; justify-content: center; align-items: center; padding: 48px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.box {
  width: 120px; height: 120px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 14px;
  transition: transform 0.5s ease;
}
.box:hover { transform: scale(1.5); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }
.hint { text-align: center; font-size: 11px; color: #aaa; margin-top: 4px; }`,
    html: `<div class="demo"><div class="box">放大 1.5x</div></div>
<div class="label">transform: scale(1.5)</div>
<div class="hint">鼠标悬停查看效果</div>`,
  },
  {
    label: '位移 translate',
    css: `.demo { display: flex; justify-content: center; align-items: center; padding: 48px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.box {
  width: 120px; height: 120px;
  background: linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 14px;
  transition: transform 0.5s ease;
}
.box:hover { transform: translate(60px, -30px); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }
.hint { text-align: center; font-size: 11px; color: #aaa; margin-top: 4px; }`,
    html: `<div class="demo"><div class="box">位移</div></div>
<div class="label">transform: translate(60px, -30px)</div>
<div class="hint">鼠标悬停查看效果</div>`,
  },
  {
    label: '倾斜 skew',
    css: `.demo { display: flex; justify-content: center; align-items: center; padding: 48px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.box {
  width: 120px; height: 120px;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 14px;
  transition: transform 0.5s ease;
}
.box:hover { transform: skew(15deg, 5deg); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }
.hint { text-align: center; font-size: 11px; color: #aaa; margin-top: 4px; }`,
    html: `<div class="demo"><div class="box">倾斜</div></div>
<div class="label">transform: skew(15deg, 5deg)</div>
<div class="hint">鼠标悬停查看效果</div>`,
  },
  {
    label: '组合变换',
    css: `.demo { display: flex; justify-content: center; align-items: center; padding: 48px; background: #f0f0f0; border-radius: 8px; margin-bottom: 12px; }
.box {
  width: 120px; height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 13px; text-align: center;
  transition: transform 0.6s ease;
}
.box:hover { transform: rotate(45deg) scale(1.2) translate(20px, -10px); }
.label { text-align: center; font-size: 12px; color: #888; font-family: monospace; }
.hint { text-align: center; font-size: 11px; color: #aaa; margin-top: 4px; }`,
    html: `<div class="demo"><div class="box">组合变换</div></div>
<div class="label">transform: rotate(45deg) scale(1.2) translate(20px, -10px)</div>
<div class="hint">鼠标悬停查看效果</div>`,
  },
];

export function TransformPlayground() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={280}
    />
  );
}
