'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.preview {
  min-height: 200px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  background-color: #ffffff;
  border: 2px dashed #e0e0e0;
}

.preview h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.preview p {
  font-size: 14px;
  opacity: 0.8;
}`;

const defaultHTML = `<div class="preview">
  <div style="text-align: center;">
    <h3>CSS 样式预览</h3>
    <p>前景色与背景的组合效果展示</p>
  </div>
</div>`;

const presets = [
  {
    label: '明亮',
    css: `.preview {
  min-height: 200px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  background-color: #ffffff;
}
.preview h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.preview p { font-size: 14px; opacity: 0.8; }`,
  },
  {
    label: '暗色',
    css: `.preview {
  min-height: 200px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f0f0f0;
  background-color: #1a1a1a;
}
.preview h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.preview p { font-size: 14px; opacity: 0.8; }`,
  },
  {
    label: '渐变背景',
    css: `.preview {
  min-height: 200px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.preview h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.preview p { font-size: 14px; opacity: 0.8; }`,
  },
  {
    label: '条纹图案',
    css: `.preview {
  min-height: 200px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d3748;
  background-color: #f7fafc;
  background-image: repeating-linear-gradient(
    45deg,
    transparent, transparent 10px,
    rgba(0,0,0,.05) 10px, rgba(0,0,0,.05) 20px
  );
}
.preview h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.preview p { font-size: 14px; opacity: 0.8; }`,
  },
  {
    label: '彩虹背景',
    css: `.preview {
  min-height: 200px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-image: linear-gradient(
    90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3
  );
}
.preview h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; text-shadow: 0 1px 3px rgba(0,0,0,0.3); }
.preview p { font-size: 14px; opacity: 0.9; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }`,
  },
];

export function ForegroundBgDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={260}
    />
  );
}
