'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.box {
  color: red;
  font-size: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  hypergalactic-glow: 42px;     /* unknown — ignored */
  container-type: inline-size;
  quantum-position: entangled;   /* unknown — ignored */
  border-radius: 12px;
  future-awesome: true;          /* unknown — ignored */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  background: #fffbe6;
  border: 2px solid #e5e7eb;
}
.box .item {
  padding: 8px 16px;
  background: #e0f2fe;
  border-radius: 6px;
  font-weight: 600;
}`;

const defaultHTML = `<div class="box">
  <div class="item">Hello CSS!</div>
  <div class="item">有效属性正常渲染</div>
  <div class="item">未知属性被安全忽略</div>
</div>
<p style="margin-top:16px; font-size:13px; color:#666;">
  上方样式中包含 3 个虚构属性 (hypergalactic-glow, quantum-position, future-awesome)，<br>
  浏览器会安全跳过它们，不影响其他有效规则的渲染。
</p>`;

const presets = [
  {
    label: '包含未知属性',
    css: `.box {
  color: red;
  font-size: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  hypergalactic-glow: 42px;     /* unknown — ignored */
  container-type: inline-size;
  quantum-position: entangled;   /* unknown — ignored */
  border-radius: 12px;
  future-awesome: true;          /* unknown — ignored */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  background: #fffbe6;
  border: 2px solid #e5e7eb;
}
.box .item {
  padding: 8px 16px;
  background: #e0f2fe;
  border-radius: 6px;
  font-weight: 600;
}`,
  },
  {
    label: '仅有效属性',
    css: `.box {
  color: red;
  font-size: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  container-type: inline-size;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  background: #fffbe6;
  border: 2px solid #e5e7eb;
}
.box .item {
  padding: 8px 16px;
  background: #e0f2fe;
  border-radius: 6px;
  font-weight: 600;
}
/* 移除了未知属性 — 渲染结果完全相同 */`,
  },
  {
    label: '渐进增强',
    css: `.box {
  /* 基础样式 — 所有浏览器 */
  display: block;
  padding: 20px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  /* 增强样式 — 支持的浏览器 */
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  background: linear-gradient(135deg, #fffbe6, #e0f2fe);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.box .item {
  padding: 8px 16px;
  background: white;
  border-radius: 6px;
  font-weight: 600;
  border: 1px solid #e5e7eb;
}`,
  },
  {
    label: '全部无效',
    css: `.box {
  quantum-glow: 10px;
  hyper-color: magenta;
  future-layout: grid-5d;
  ai-style: beautiful;
  padding: 20px;
  border: 2px dashed #999;
  border-radius: 8px;
  color: #333;
}
.box .item {
  padding: 8px 16px;
}
/* 仅 padding/border/border-radius/color 有效，其余全部被忽略 */`,
  },
];

export function ForwardCompatDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
