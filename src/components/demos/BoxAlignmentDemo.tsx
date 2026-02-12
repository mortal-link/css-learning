'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 250px;
  padding: 1rem;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  background: #faf5ff;
}

.item {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.item:nth-child(1) { width: 80px; height: 80px; }
.item:nth-child(2) { width: 80px; height: 60px; }
.item:nth-child(3) { width: 80px; height: 40px; }`;

const defaultHTML = `<div class="container">
  <div class="item">大</div>
  <div class="item">中</div>
  <div class="item">小</div>
</div>`;

const presets = [
  {
    label: 'Flex 居中',
    css: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 250px;
  padding: 1rem;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  background: #faf5ff;
}
.item { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; font-weight: bold; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.item:nth-child(1) { width: 80px; height: 80px; }
.item:nth-child(2) { width: 80px; height: 60px; }
.item:nth-child(3) { width: 80px; height: 40px; }`,
  },
  {
    label: 'Flex space-between',
    css: `.container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  min-height: 250px;
  padding: 1rem;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  background: #faf5ff;
}
.item { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; font-weight: bold; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex: 1; }
.item:nth-child(1) { min-height: 80px; }
.item:nth-child(2) { min-height: 60px; }
.item:nth-child(3) { min-height: 40px; }`,
  },
  {
    label: 'Grid 居中',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  gap: 1rem;
  min-height: 250px;
  padding: 1rem;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  background: #faf5ff;
}
.item { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; font-weight: bold; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.item:nth-child(1) { width: 80px; height: 80px; }
.item:nth-child(2) { width: 80px; height: 60px; }
.item:nth-child(3) { width: 80px; height: 40px; }`,
  },
  {
    label: 'Grid start 对齐',
    css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: start;
  align-items: start;
  gap: 1rem;
  min-height: 250px;
  padding: 1rem;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  background: #faf5ff;
}
.item { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; font-weight: bold; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.item:nth-child(1) { width: 80px; height: 80px; }
.item:nth-child(2) { width: 80px; height: 60px; }
.item:nth-child(3) { width: 80px; height: 40px; }`,
  },
  {
    label: 'space-evenly',
    css: `.container {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  gap: 1rem;
  min-height: 250px;
  padding: 1rem;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  background: #faf5ff;
}
.item { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; font-weight: bold; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.item:nth-child(1) { width: 80px; height: 80px; }
.item:nth-child(2) { width: 80px; height: 60px; }
.item:nth-child(3) { width: 80px; height: 40px; }`,
  },
];

export function BoxAlignmentDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
