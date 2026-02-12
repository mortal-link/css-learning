'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #f59e0b;
  margin: 8px;
  box-sizing: content-box;
  background-color: #dbeafe;
  position: relative;
}

.box::after {
  content: 'content 200×100';
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 12px;
  color: #2563eb;
  font-family: monospace;
}

.label {
  font-size: 11px;
  color: #666;
  margin-top: 8px;
  font-family: monospace;
}`;

const defaultHTML = `<div style="background: #fff7ed; padding: 12px; border: 1px dashed #fb923c;">
  <span style="font-size:10px;color:#ea580c;font-family:monospace;">margin 区域</span>
  <div class="box"></div>
  <div class="label">
    content-box: width = 内容宽度<br>
    总宽度 = width + padding×2 + border×2 = 200 + 32 + 4 = 236px
  </div>
</div>`;

const presets = [
  {
    label: '默认',
    css: `.box {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #f59e0b;
  margin: 8px;
  box-sizing: content-box;
  background-color: #dbeafe;
}
.box::after {
  content: 'content-box: width=内容宽度';
  display: flex; align-items: center; justify-content: center;
  height: 100%; font-size: 12px; color: #2563eb; font-family: monospace;
}
.label { font-size: 11px; color: #666; margin-top: 8px; font-family: monospace; }`,
  },
  {
    label: '无内边距',
    css: `.box {
  width: 200px;
  height: 100px;
  padding: 0;
  border: 1px solid #f59e0b;
  margin: 16px;
  box-sizing: content-box;
  background-color: #dbeafe;
}
.box::after {
  content: '无 padding，border 紧贴内容';
  display: flex; align-items: center; justify-content: center;
  height: 100%; font-size: 12px; color: #2563eb; font-family: monospace;
}
.label { font-size: 11px; color: #666; margin-top: 8px; font-family: monospace; }`,
  },
  {
    label: '不对称',
    css: `.box {
  width: 200px;
  height: 100px;
  padding: 8px 24px;
  border-top: 4px solid #f59e0b;
  border-bottom: 4px solid #f59e0b;
  border-left: 1px solid #f59e0b;
  border-right: 1px solid #f59e0b;
  margin: 0 20px 32px 20px;
  box-sizing: content-box;
  background-color: #dbeafe;
}
.box::after {
  content: '不对称 padding 和 border';
  display: flex; align-items: center; justify-content: center;
  height: 100%; font-size: 12px; color: #2563eb; font-family: monospace;
}
.label { font-size: 11px; color: #666; margin-top: 8px; font-family: monospace; }`,
  },
  {
    label: 'border-box',
    css: `.box {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #f59e0b;
  margin: 8px;
  box-sizing: border-box;
  background-color: #dcfce7;
}
.box::after {
  content: 'border-box: width=总宽度 (含padding+border)';
  display: flex; align-items: center; justify-content: center;
  height: 100%; font-size: 11px; color: #16a34a; font-family: monospace;
}
.label { font-size: 11px; color: #666; margin-top: 8px; font-family: monospace; }`,
  },
];

export function BoxModelVisualizer() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={260} />;
}
