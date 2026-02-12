'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  gap: 12px;
  padding: 12px;
  height: 260px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}

.scroll-item {
  flex-shrink: 0;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  scroll-snap-align: center;
  scroll-snap-stop: normal;
}

.scroll-item:nth-child(1) { background: #3b82f6; }
.scroll-item:nth-child(2) { background: #10b981; }
.scroll-item:nth-child(3) { background: #f59e0b; }
.scroll-item:nth-child(4) { background: #ef4444; }
.scroll-item:nth-child(5) { background: #8b5cf6; }
.scroll-item:nth-child(6) { background: #ec4899; }`;

const defaultHTML = `<div class="scroll-container">
  <div class="scroll-item">项目 1</div>
  <div class="scroll-item">项目 2</div>
  <div class="scroll-item">项目 3</div>
  <div class="scroll-item">项目 4</div>
  <div class="scroll-item">项目 5</div>
  <div class="scroll-item">项目 6</div>
</div>`;

const presets = [
  {
    label: '图片轮播 (x mandatory)',
    css: `.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 12px;
  padding: 12px;
  height: 260px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}
.scroll-item {
  flex-shrink: 0;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}
.scroll-item:nth-child(1) { background: #3b82f6; }
.scroll-item:nth-child(2) { background: #10b981; }
.scroll-item:nth-child(3) { background: #f59e0b; }
.scroll-item:nth-child(4) { background: #ef4444; }
.scroll-item:nth-child(5) { background: #8b5cf6; }
.scroll-item:nth-child(6) { background: #ec4899; }`,
  },
  {
    label: '全屏滚动 (y mandatory)',
    css: `.scroll-container {
  display: block;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  height: 260px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}
.scroll-item {
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
.scroll-item:nth-child(1) { background: #3b82f6; }
.scroll-item:nth-child(2) { background: #10b981; }
.scroll-item:nth-child(3) { background: #f59e0b; }
.scroll-item:nth-child(4) { background: #ef4444; }
.scroll-item:nth-child(5) { background: #8b5cf6; }
.scroll-item:nth-child(6) { background: #ec4899; }`,
  },
  {
    label: 'proximity (渐进吸附)',
    css: `/* proximity: 接近对齐点时才吸附 */
.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-padding: 20px;
  gap: 12px;
  padding: 12px;
  height: 260px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}
.scroll-item {
  flex-shrink: 0;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  scroll-snap-align: center;
  scroll-snap-stop: normal;
}
.scroll-item:nth-child(1) { background: #3b82f6; }
.scroll-item:nth-child(2) { background: #10b981; }
.scroll-item:nth-child(3) { background: #f59e0b; }
.scroll-item:nth-child(4) { background: #ef4444; }
.scroll-item:nth-child(5) { background: #8b5cf6; }
.scroll-item:nth-child(6) { background: #ec4899; }`,
  },
  {
    label: 'snap-align: start',
    css: `.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 12px;
  padding: 12px;
  height: 260px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}
.scroll-item {
  flex-shrink: 0;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  scroll-snap-align: start;
}
.scroll-item:nth-child(1) { background: #3b82f6; }
.scroll-item:nth-child(2) { background: #10b981; }
.scroll-item:nth-child(3) { background: #f59e0b; }
.scroll-item:nth-child(4) { background: #ef4444; }
.scroll-item:nth-child(5) { background: #8b5cf6; }
.scroll-item:nth-child(6) { background: #ec4899; }`,
  },
];

export function ScrollSnapDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
