'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.wrapper {
  container-type: inline-size;
  container-name: card;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
}

.product {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.product-img {
  width: 100%;
  height: 100px;
  border-radius: 6px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.product-title { font-size: 14px; font-weight: 600; }
.product-desc { font-size: 12px; color: #64748b; display: none; }
.product-price { font-size: 14px; font-weight: 700; color: #ef4444; }
.product-btn { display: none; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }

@container card (min-width: 350px) {
  .product { flex-direction: row; gap: 16px; }
  .product-img { width: 120px; height: 120px; flex-shrink: 0; }
  .product-title { font-size: 16px; }
  .product-desc { display: block; }
}

@container card (min-width: 500px) {
  .product { padding: 24px; gap: 20px; }
  .product-img { width: 160px; height: 160px; font-size: 3rem; }
  .product-title { font-size: 20px; }
  .product-desc { font-size: 14px; }
  .product-price { font-size: 18px; }
  .product-btn { display: inline-block; }
}`;

const defaultHTML = `<div class="wrapper">
  <div class="product">
    <div class="product-img">&#128230;</div>
    <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
      <div class="product-title">CSS 容器查询示例</div>
      <div class="product-desc">容器查询让组件能够根据其容器的尺寸来调整自身的样式。这是一种更加模块化的响应式设计方法。</div>
      <div class="product-price">&#165; 99.00</div>
      <button class="product-btn">了解更多</button>
    </div>
  </div>
</div>`;

const presets = [
  {
    label: '紧凑 (窄容器)',
    css: `.wrapper {
  container-type: inline-size;
  container-name: card;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  padding: 16px;
  width: 280px;
}
.product { display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #f8fafc; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.product-img { width: 100%; height: 100px; border-radius: 6px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; }
.product-title { font-size: 14px; font-weight: 600; }
.product-desc { font-size: 12px; color: #64748b; display: none; }
.product-price { font-size: 14px; font-weight: 700; color: #ef4444; }
.product-btn { display: none; }
@container card (min-width: 350px) { .product { flex-direction: row; } .product-img { width: 120px; height: 120px; flex-shrink: 0; } .product-desc { display: block; } }
@container card (min-width: 500px) { .product { padding: 24px; } .product-img { width: 160px; height: 160px; } .product-btn { display: inline-block; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; } }`,
  },
  {
    label: '标准 (中等容器)',
    css: `.wrapper {
  container-type: inline-size;
  container-name: card;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  padding: 16px;
  width: 420px;
}
.product { display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #f8fafc; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.product-img { width: 100%; height: 100px; border-radius: 6px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; }
.product-title { font-size: 14px; font-weight: 600; }
.product-desc { font-size: 12px; color: #64748b; display: none; }
.product-price { font-size: 14px; font-weight: 700; color: #ef4444; }
.product-btn { display: none; }
@container card (min-width: 350px) { .product { flex-direction: row; gap: 16px; } .product-img { width: 120px; height: 120px; flex-shrink: 0; } .product-title { font-size: 16px; } .product-desc { display: block; } }
@container card (min-width: 500px) { .product { padding: 24px; gap: 20px; } .product-img { width: 160px; height: 160px; font-size: 3rem; } .product-btn { display: inline-block; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; } }`,
  },
  {
    label: '宽松 (全宽容器)',
    css: `.wrapper {
  container-type: inline-size;
  container-name: card;
  border: 2px dashed #a78bfa;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
}
.product { display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #f8fafc; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.product-img { width: 100%; height: 100px; border-radius: 6px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; }
.product-title { font-size: 14px; font-weight: 600; }
.product-desc { font-size: 12px; color: #64748b; display: none; }
.product-price { font-size: 14px; font-weight: 700; color: #ef4444; }
.product-btn { display: none; }
@container card (min-width: 350px) { .product { flex-direction: row; gap: 16px; } .product-img { width: 120px; height: 120px; flex-shrink: 0; } .product-title { font-size: 16px; } .product-desc { display: block; } }
@container card (min-width: 500px) { .product { padding: 24px; gap: 20px; } .product-img { width: 160px; height: 160px; font-size: 3rem; } .product-title { font-size: 20px; } .product-desc { font-size: 14px; } .product-price { font-size: 18px; } .product-btn { display: inline-block; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; } }`,
  },
];

export function ContainerQueryDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
