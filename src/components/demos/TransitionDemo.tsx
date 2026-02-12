'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 过渡 (Transition) */
.stage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background: #f8fafc;
  border-radius: 8px;
}
.box {
  width: 120px;
  height: 120px;
  background: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);

  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
.box:hover {
  width: 180px;
  height: 160px;
  background: #a855f7;
  transform: translate(40px, 0) rotate(15deg);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}
.info {
  margin-top: 12px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.6;
}
.code {
  margin-top: 8px;
  padding: 10px;
  background: #f1f5f9;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  color: #334155;
  white-space: pre;
  line-height: 1.5;
}`;

const defaultHTML = `<div class="stage">
  <div class="box">Hover</div>
</div>
<div class="info">
  鼠标悬停触发过渡。transition: all 0.5s ease 0s — 所有属性以 ease 缓动在 0.5s 内完成过渡。
</div>
<div class="code">transition: all 0.5s ease 0s;

/* 等价于 */
transition-property: all;
transition-duration: 0.5s;
transition-timing-function: ease;
transition-delay: 0s;</div>`;

const presets = [
  {
    label: '大小变化',
  },
  {
    label: '颜色渐变',
    css: `.stage {
  display: flex; justify-content: center; align-items: center;
  height: 250px; background: #f8fafc; border-radius: 8px;
}
.box {
  width: 120px; height: 120px;
  background: #3b82f6; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px; font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: background-color 0.6s ease-in-out;
}
.box:hover {
  background: #ef4444;
}
.info { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }
.code { margin-top: 8px; padding: 10px; background: #f1f5f9; border-radius: 6px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre; line-height: 1.5; }`,
    html: `<div class="stage">
  <div class="box">Hover</div>
</div>
<div class="info">
  仅过渡 background-color 属性，使用 ease-in-out 缓动，持续 0.6s。其他属性变化会立即生效。
</div>
<div class="code">transition: background-color 0.6s ease-in-out;</div>`,
  },
  {
    label: '弹性移动',
    css: `.stage {
  display: flex; justify-content: center; align-items: center;
  height: 250px; background: #f8fafc; border-radius: 8px;
}
.box {
  width: 120px; height: 120px;
  background: #3b82f6; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px; font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.box:hover {
  transform: translateX(80px) rotate(15deg);
}
.info { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }
.code { margin-top: 8px; padding: 10px; background: #f1f5f9; border-radius: 6px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre; line-height: 1.5; }`,
    html: `<div class="stage">
  <div class="box">Hover</div>
</div>
<div class="info">
  使用 cubic-bezier(0.68, -0.55, 0.265, 1.55)（Back 缓动），产生弹性回弹效果。
</div>
<div class="code">transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);</div>`,
  },
  {
    label: '组合过渡',
    css: `.stage {
  display: flex; justify-content: center; align-items: center;
  height: 250px; background: #f8fafc; border-radius: 8px;
}
.box {
  width: 120px; height: 120px;
  background: #3b82f6; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px; font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: all 0.8s ease-in-out 0.1s;
}
.box:hover {
  width: 180px;
  height: 160px;
  background: #a855f7;
  transform: translate(40px, 0) rotate(15deg);
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(168,85,247,0.4);
}
.info { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }
.code { margin-top: 8px; padding: 10px; background: #f1f5f9; border-radius: 6px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre; line-height: 1.5; }`,
    html: `<div class="stage">
  <div class="box">Hover</div>
</div>
<div class="info">
  组合效果：all 属性 + 0.1s 延迟 + 0.8s 持续时间 + ease-in-out。尺寸、颜色、圆角、位移同时过渡。
</div>
<div class="code">transition: all 0.8s ease-in-out 0.1s;

/* 变化的属性 */
width: 120px → 180px
height: 120px → 160px
background: blue → purple
border-radius: 12px → 50%
transform: translate + rotate</div>`,
  },
  {
    label: '多属性分离',
    css: `.stage {
  display: flex; justify-content: center; align-items: center;
  height: 250px; background: #f8fafc; border-radius: 8px;
}
.box {
  width: 120px; height: 120px;
  background: #3b82f6; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px; font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition:
    background-color 0.3s ease,
    transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    border-radius 0.8s ease-in-out,
    box-shadow 0.4s ease;
}
.box:hover {
  background: #ef4444;
  transform: scale(1.2) rotate(10deg);
  border-radius: 50%;
  box-shadow: 0 12px 40px rgba(239,68,68,0.4);
}
.info { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.6; }
.code { margin-top: 8px; padding: 10px; background: #f1f5f9; border-radius: 6px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre; line-height: 1.5; }`,
    html: `<div class="stage">
  <div class="box">Hover</div>
</div>
<div class="info">
  为不同属性指定不同的过渡参数：颜色快速变化(0.3s)，变换弹性运动(0.5s)，圆角缓慢变化(0.8s)。
</div>
<div class="code">transition:
  background-color 0.3s ease,
  transform 0.5s cubic-bezier(...),
  border-radius 0.8s ease-in-out,
  box-shadow 0.4s ease;</div>`,
  },
];

export function TransitionDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={380}
    />
  );
}
