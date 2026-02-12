'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 移动优先的响应式布局 */

/* 基础样式（手机） */
.header {
  background: #1e40af;
  color: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo { font-weight: bold; font-size: 16px; }
.hamburger { font-size: 20px; cursor: pointer; }
.nav { display: none; }

.hero {
  background: linear-gradient(135deg, #dbeafe, #e9d5ff);
  padding: 20px 16px;
}
.hero h1 { font-size: 20px; font-weight: bold; margin-bottom: 8px; }
.hero p { font-size: 13px; color: #4b5563; }

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 16px;
}
.card {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}
.card .num { font-size: 24px; font-weight: bold; color: #3b82f6; }
.card .label { font-size: 12px; color: #6b7280; margin-top: 4px; }

.status {
  padding: 8px 16px;
  font-size: 12px;
  color: #666;
  background: #f1f5f9;
  font-family: monospace;
}

/* 平板 (>= 480px) */
@media (min-width: 480px) {
  .nav { display: flex; gap: 16px; font-size: 14px; }
  .hamburger { display: none; }
  .hero h1 { font-size: 24px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 桌面 (>= 700px) */
@media (min-width: 700px) {
  .hero { padding: 30px 24px; }
  .hero h1 { font-size: 28px; }
  .hero p { font-size: 15px; }
  .grid { grid-template-columns: repeat(3, 1fr); padding: 24px; }
}`;

const defaultHTML = `<div class="header">
  <div class="logo">网站 Logo</div>
  <nav class="nav">
    <span>首页</span>
    <span>关于</span>
    <span>服务</span>
    <span>联系</span>
  </nav>
  <div class="hamburger">&#9776;</div>
</div>

<div class="hero">
  <h1>响应式布局示例</h1>
  <p>调整窗口宽度观察布局变化 -- 导航、网格列数、间距都会自适应。</p>
</div>

<div class="grid">
  <div class="card"><div class="num">1</div><div class="label">项目一</div></div>
  <div class="card"><div class="num">2</div><div class="label">项目二</div></div>
  <div class="card"><div class="num">3</div><div class="label">项目三</div></div>
  <div class="card"><div class="num">4</div><div class="label">项目四</div></div>
  <div class="card"><div class="num">5</div><div class="label">项目五</div></div>
  <div class="card"><div class="num">6</div><div class="label">项目六</div></div>
</div>

<div class="status">
  基础(1列) | >= 480px(2列+导航) | >= 700px(3列+大间距)
</div>`;

const presets = [
  {
    label: '移动优先',
    css: `.header { background: #1e40af; color: white; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-weight: bold; font-size: 16px; }
.hamburger { font-size: 20px; }
.nav { display: none; }
.hero { background: linear-gradient(135deg, #dbeafe, #e9d5ff); padding: 20px 16px; }
.hero h1 { font-size: 20px; font-weight: bold; margin-bottom: 8px; }
.hero p { font-size: 13px; color: #4b5563; }
.grid { display: grid; grid-template-columns: 1fr; gap: 8px; padding: 16px; }
.card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; text-align: center; }
.card .num { font-size: 24px; font-weight: bold; color: #3b82f6; }
.card .label { font-size: 12px; color: #6b7280; margin-top: 4px; }
.status { padding: 8px 16px; font-size: 12px; color: #666; background: #f1f5f9; font-family: monospace; }

@media (min-width: 480px) {
  .nav { display: flex; gap: 16px; font-size: 14px; }
  .hamburger { display: none; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 700px) {
  .hero { padding: 30px 24px; }
  .hero h1 { font-size: 28px; }
  .grid { grid-template-columns: repeat(3, 1fr); padding: 24px; }
}`,
  },
  {
    label: '弹性图片',
    css: `.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 16px;
}
.img-box {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 6px;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #3b82f6;
  font-weight: 600;
}
/* 弹性图片核心规则 */
img { max-width: 100%; height: auto; }

@media (min-width: 400px) { .gallery { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 600px) { .gallery { grid-template-columns: repeat(3, 1fr); } }

.note { padding: 12px 16px; font-size: 12px; color: #666; background: #f1f5f9; }`,
    html: `<div class="gallery">
  <div class="img-box">图片 1</div>
  <div class="img-box">图片 2</div>
  <div class="img-box">图片 3</div>
  <div class="img-box">图片 4</div>
  <div class="img-box">图片 5</div>
  <div class="img-box">图片 6</div>
</div>
<div class="note">弹性图片：使用 max-width: 100% 确保图片不会溢出容器。</div>`,
  },
  {
    label: '流式布局',
    css: `.container {
  max-width: 100%;
  padding: 16px;
}
.fluid-box {
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  padding: 5%;
  margin-bottom: 12px;
  font-size: 14px;
}
.two-col {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.col {
  flex: 1 1 200px;
  min-width: 0;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 6px;
  padding: 16px;
  font-size: 13px;
}
.note { font-size: 12px; color: #666; margin-top: 12px; }`,
    html: `<div class="container">
  <div class="fluid-box">
    <strong>流式布局：</strong>使用百分比和 flex 实现自适应宽度。padding 使用 5%，随容器宽度缩放。
  </div>
  <div class="two-col">
    <div class="col"><strong>左栏</strong><br>flex: 1 1 200px 使列在窄屏时自动堆叠。</div>
    <div class="col"><strong>右栏</strong><br>最小宽度 200px，小于此值时换行。</div>
  </div>
  <div class="note">流式布局不需要媒体查询 -- 使用弹性单位自然适配。</div>
</div>`,
  },
  {
    label: '设计模式总结',
    css: `.pattern {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
}
.pattern h3 { font-size: 14px; font-weight: 700; color: #3b82f6; margin-bottom: 4px; }
.pattern p { font-size: 12px; color: #666; }
.pattern code { font-size: 11px; background: #f1f5f9; padding: 2px 6px; border-radius: 3px; }`,
    html: `<div class="pattern">
  <h3>流式布局 Fluid Grids</h3>
  <p>使用百分比和 <code>fr</code> 单位替代固定像素</p>
</div>
<div class="pattern">
  <h3>弹性图片 Flexible Images</h3>
  <p>使用 <code>max-width: 100%</code> 约束图片宽度</p>
</div>
<div class="pattern">
  <h3>媒体查询 Media Queries</h3>
  <p>在断点处调整布局: <code>@media (min-width: 768px)</code></p>
</div>
<div class="pattern">
  <h3>移动优先 Mobile First</h3>
  <p>先写手机样式，用 <code>min-width</code> 逐步增强</p>
</div>
<div class="pattern">
  <h3>容器查询 Container Queries</h3>
  <p>基于容器而非视口尺寸: <code>@container (min-width: 400px)</code></p>
</div>`,
  },
];

export function ResponsiveDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={480}
    />
  );
}
