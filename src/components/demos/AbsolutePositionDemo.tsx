'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
}
.container-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: white;
  padding: 0 6px;
  font-size: 12px;
  color: #3b82f6;
  font-weight: 500;
}
.corner { position: absolute; font-size: 10px; color: #94a3b8; }
.corner.tl { top: 4px; left: 4px; }
.corner.tr { top: 4px; right: 4px; }
.corner.bl { bottom: 4px; left: 4px; }
.corner.br { bottom: 4px; right: 4px; }
.absolute-box {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 100px;
  height: 80px;
  background: #f43f5e;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.note {
  margin-top: 12px;
  padding: 10px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 6px;
  font-size: 13px;
  color: #0369a1;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="container">
  <span class="container-label">包含块 (position: relative)</span>
  <span class="corner tl">0,0</span>
  <span class="corner tr">100%,0</span>
  <span class="corner bl">0,100%</span>
  <span class="corner br">100%,100%</span>
  <div class="absolute-box">绝对定位</div>
</div>
<div class="note">
  绝对定位的元素相对于其包含块（最近的 positioned 祖先）的四个边进行定位。
</div>`;

const presets = [
  {
    label: '百分比偏移',
    css: `.container {
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
}
.container-label {
  position: absolute; top: -10px; left: 12px;
  background: white; padding: 0 6px; font-size: 12px; color: #3b82f6;
}
.corner { position: absolute; font-size: 10px; color: #94a3b8; }
.corner.tl { top: 4px; left: 4px; }
.corner.tr { top: 4px; right: 4px; }
.corner.bl { bottom: 4px; left: 4px; }
.corner.br { bottom: 4px; right: 4px; }
.absolute-box {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 100px;
  height: 80px;
  background: #f43f5e;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`,
  },
  {
    label: '像素偏移',
    css: `.container {
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
}
.container-label {
  position: absolute; top: -10px; left: 12px;
  background: white; padding: 0 6px; font-size: 12px; color: #3b82f6;
}
.corner { position: absolute; font-size: 10px; color: #94a3b8; }
.corner.tl { top: 4px; left: 4px; }
.corner.tr { top: 4px; right: 4px; }
.corner.bl { bottom: 4px; left: 4px; }
.corner.br { bottom: 4px; right: 4px; }
.absolute-box {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 120px;
  height: 80px;
  background: #8b5cf6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`,
    html: `<div class="container">
  <span class="container-label">包含块 (position: relative)</span>
  <span class="corner tl">0,0</span>
  <span class="corner tr">100%,0</span>
  <span class="corner bl">0,100%</span>
  <span class="corner br">100%,100%</span>
  <div class="absolute-box">右上角定位</div>
</div>`,
  },
  {
    label: '拉伸填充',
    css: `.container {
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
}
.container-label {
  position: absolute; top: -10px; left: 12px;
  background: white; padding: 0 6px; font-size: 12px; color: #3b82f6;
}
.absolute-box {
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  /* 不设置 width/height，通过对边拉伸 */
  background: rgba(244, 63, 94, 0.15);
  border: 2px dashed #f43f5e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #e11d48;
}`,
    html: `<div class="container">
  <span class="container-label">包含块 (position: relative)</span>
  <div class="absolute-box">同时指定 top+bottom+left+right 拉伸元素</div>
</div>
<div style="margin-top:12px;padding:10px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;font-size:13px;color:#b91c1c;">
  同时指定对边（top + bottom 或 left + right）且不设置 width/height 时，元素会被拉伸填充。
</div>`,
  },
  {
    label: '居中定位',
    css: `.container {
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
}
.container-label {
  position: absolute; top: -10px; left: 12px;
  background: white; padding: 0 6px; font-size: 12px; color: #3b82f6;
}
.absolute-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 80px;
  background: #10b981;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`,
    html: `<div class="container">
  <span class="container-label">包含块 (position: relative)</span>
  <div class="absolute-box">绝对居中</div>
</div>
<div style="margin-top:12px;padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;font-size:13px;color:#166534;">
  top: 50% + left: 50% + transform: translate(-50%, -50%) 实现完美居中。
</div>`,
  },
];

export function AbsolutePositionDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
