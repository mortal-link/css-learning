'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-60px); }
}

.box {
  width: 120px;
  height: 120px;
  margin: 80px auto 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 8px 24px rgba(59,130,246,0.3);

  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

.label {
  text-align: center;
  font-size: 12px;
  color: #64748b;
  font-family: monospace;
  margin-top: 8px;
}`;

const defaultHTML = `<div class="box">CSS</div>
<div class="label">animation: bounce 1s ease infinite</div>`;

const presets = [
  {
    label: '弹跳',
    css: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-60px); }
}
.box {
  width: 120px; height: 120px; margin: 80px auto 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 24px rgba(59,130,246,0.3);
  animation: bounce 1s ease 0s 3 normal none running;
}
.label { text-align: center; font-size: 12px; color: #64748b; font-family: monospace; margin-top: 8px; }`,
    html: `<div class="box">CSS</div>
<div class="label">bounce | 1s | ease | 3次</div>`,
  },
  {
    label: '旋转',
    css: `@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.box {
  width: 120px; height: 120px; margin: 60px auto 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 24px rgba(59,130,246,0.3);
  animation: rotate 2s linear infinite;
}
.label { text-align: center; font-size: 12px; color: #64748b; font-family: monospace; margin-top: 8px; }`,
    html: `<div class="box">CSS</div>
<div class="label">rotate | 2s | linear | infinite</div>`,
  },
  {
    label: '脉冲',
    css: `@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}
.box {
  width: 120px; height: 120px; margin: 60px auto 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 24px rgba(59,130,246,0.3);
  animation: pulse 1.5s ease-in-out infinite alternate;
}
.label { text-align: center; font-size: 12px; color: #64748b; font-family: monospace; margin-top: 8px; }`,
    html: `<div class="box">CSS</div>
<div class="label">pulse | 1.5s | ease-in-out | alternate</div>`,
  },
  {
    label: '摇晃',
    css: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
.box {
  width: 120px; height: 120px; margin: 60px auto 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 24px rgba(59,130,246,0.3);
  animation: shake 0.5s ease-in-out 0s 2;
}
.label { text-align: center; font-size: 12px; color: #64748b; font-family: monospace; margin-top: 8px; }`,
    html: `<div class="box">CSS</div>
<div class="label">shake | 0.5s | ease-in-out | 2次</div>`,
  },
  {
    label: '淡入滑出',
    css: `@keyframes slideFade {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.box {
  width: 120px; height: 120px; margin: 60px auto 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 24px; font-weight: bold;
  box-shadow: 0 8px 24px rgba(59,130,246,0.3);
  animation: slideFade 1s ease-out both;
}
.label { text-align: center; font-size: 12px; color: #64748b; font-family: monospace; margin-top: 8px; }`,
    html: `<div class="box">CSS</div>
<div class="label">slideFade | 1s | ease-out | fill-mode: both</div>`,
  },
];

export function AnimationDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
