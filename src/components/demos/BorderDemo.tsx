'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box {
  width: 200px;
  height: 200px;
  border: 4px solid #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #64748b;
  background: white;
  margin: 20px auto;
}`;

const defaultHTML = `<div class="box">示例元素</div>`;

const presets = [
  {
    label: '基础边框',
    css: `.box {
  width: 200px; height: 200px;
  border: 2px solid #000;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #64748b; background: white; margin: 20px auto;
}`,
  },
  {
    label: '圆角卡片',
    css: `.box {
  width: 200px; height: 200px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #64748b; background: white; margin: 20px auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`,
  },
  {
    label: '虚线',
    css: `.box {
  width: 200px; height: 200px;
  border: 3px dashed #3b82f6;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #64748b; background: white; margin: 20px auto;
}`,
  },
  {
    label: '双线',
    css: `.box {
  width: 200px; height: 200px;
  border: 6px double #a855f7;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #64748b; background: white; margin: 20px auto;
}`,
  },
  {
    label: '圆形',
    css: `.box {
  width: 200px; height: 200px;
  border: 4px solid #ef4444;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #64748b; background: white; margin: 20px auto;
}`,
  },
  {
    label: '多样式边框',
    css: `.box {
  width: 200px; height: 200px;
  border-top: 4px solid #ef4444;
  border-right: 4px dashed #22c55e;
  border-bottom: 4px dotted #3b82f6;
  border-left: 4px double #a855f7;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: #64748b; background: white; margin: 20px auto;
  text-align: center; line-height: 1.4;
}`,
    html: `<div class="box">四边不同<br>border-style</div>`,
  },
];

export function BorderDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={280} />;
}
