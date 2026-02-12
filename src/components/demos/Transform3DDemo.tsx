'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 3D 变换 */
.scene {
  perspective: 800px;
  perspective-origin: 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: #f8fafc;
  border-radius: 8px;
}
.card-wrapper {
  width: 150px;
  height: 200px;
  transform-style: preserve-3d;
}
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  backface-visibility: visible;
}
.front {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transform: rotateX(30deg) rotateY(45deg);
}
.back {
  background: linear-gradient(135deg, #f97316, #ef4444);
  transform: rotateX(30deg) rotateY(45deg) rotateY(180deg);
}
.label {
  text-align: center;
  font-size: 12px;
  font-family: monospace;
  color: #64748b;
  margin-top: 12px;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="scene">
  <div class="card-wrapper">
    <div class="face front">CSS<br><span style="font-size:14px;font-weight:normal">3D</span></div>
    <div class="face back">背面<br><span style="font-size:14px;font-weight:normal">BACK</span></div>
  </div>
</div>
<div class="label">
  perspective: 800px<br>
  transform: rotateX(30deg) rotateY(45deg)
</div>`;

const presets = [
  {
    label: '旋转立方',
  },
  {
    label: '翻转卡片',
    css: `.scene {
  perspective: 1000px; perspective-origin: 50% 50%;
  display: flex; justify-content: center; align-items: center;
  height: 300px; background: #f8fafc; border-radius: 8px;
}
.card-wrapper {
  width: 150px; height: 200px; transform-style: preserve-3d;
}
.face {
  position: absolute; width: 100%; height: 100%; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  backface-visibility: hidden;
}
.front {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transform: rotateY(180deg);
}
.back {
  background: linear-gradient(135deg, #f97316, #ef4444);
  transform: rotateY(180deg) rotateY(180deg);
}
.label { text-align: center; font-size: 12px; font-family: monospace; color: #64748b; margin-top: 12px; line-height: 1.6; }`,
    html: `<div class="scene">
  <div class="card-wrapper">
    <div class="face front">正面</div>
    <div class="face back">背面</div>
  </div>
</div>
<div class="label">
  rotateY(180deg) + backface-visibility: hidden<br>
  正面被翻转隐藏，背面显示
</div>`,
  },
  {
    label: '倾斜视角',
    css: `.scene {
  perspective: 600px; perspective-origin: 50% 0%;
  display: flex; justify-content: center; align-items: center;
  height: 300px; background: #f8fafc; border-radius: 8px;
}
.card-wrapper {
  width: 150px; height: 200px; transform-style: preserve-3d;
}
.face {
  position: absolute; width: 100%; height: 100%; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  backface-visibility: visible;
}
.front {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transform: rotateX(60deg) translateZ(-50px);
}
.back {
  background: linear-gradient(135deg, #f97316, #ef4444);
  transform: rotateX(60deg) translateZ(-50px) rotateY(180deg);
}
.label { text-align: center; font-size: 12px; font-family: monospace; color: #64748b; margin-top: 12px; line-height: 1.6; }`,
    html: `<div class="scene">
  <div class="card-wrapper">
    <div class="face front">CSS</div>
    <div class="face back">背面</div>
  </div>
</div>
<div class="label">
  perspective: 600px | perspective-origin: 50% 0%<br>
  rotateX(60deg) translateZ(-50px)
</div>`,
  },
  {
    label: '3D翻页',
    css: `.scene {
  perspective: 1500px; perspective-origin: 0% 50%;
  display: flex; justify-content: center; align-items: center;
  height: 300px; background: #f8fafc; border-radius: 8px;
}
.card-wrapper {
  width: 150px; height: 200px; transform-style: preserve-3d;
}
.face {
  position: absolute; width: 100%; height: 100%; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  backface-visibility: visible;
}
.front {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transform: rotateY(120deg);
}
.back {
  background: linear-gradient(135deg, #f97316, #ef4444);
  transform: rotateY(120deg) rotateY(180deg);
}
.label { text-align: center; font-size: 12px; font-family: monospace; color: #64748b; margin-top: 12px; line-height: 1.6; }`,
    html: `<div class="scene">
  <div class="card-wrapper">
    <div class="face front">CSS</div>
    <div class="face back">背面</div>
  </div>
</div>
<div class="label">
  perspective: 1500px | origin: 0% 50%<br>
  rotateY(120deg) — 翻页效果
</div>`,
  },
  {
    label: '动画旋转',
    css: `@keyframes spin3d {
  from { transform: rotateX(0) rotateY(0); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}
.scene {
  perspective: 800px; perspective-origin: 50% 50%;
  display: flex; justify-content: center; align-items: center;
  height: 300px; background: #f8fafc; border-radius: 8px;
}
.card-wrapper {
  width: 150px; height: 200px; transform-style: preserve-3d;
  animation: spin3d 4s linear infinite;
}
.face {
  position: absolute; width: 100%; height: 100%; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  backface-visibility: visible;
}
.front { background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
.back { background: linear-gradient(135deg, #f97316, #ef4444); transform: rotateY(180deg); }
.label { text-align: center; font-size: 12px; font-family: monospace; color: #64748b; margin-top: 12px; }`,
    html: `<div class="scene">
  <div class="card-wrapper">
    <div class="face front">CSS</div>
    <div class="face back">背面</div>
  </div>
</div>
<div class="label">animation: spin3d 4s linear infinite</div>`,
  },
];

export function Transform3DDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
