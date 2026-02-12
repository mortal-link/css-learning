'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 16px;
  padding: 16px;
  background: #f0fdf4;
  border: 2px solid #10b981;
  border-radius: 8px;
}
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4;
  gap: 8px;
  background: #fff;
  border: 2px solid #86efac;
  border-radius: 8px;
  padding: 12px;
}
.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #166534;
}
.card-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}
.card-price {
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
}
.card-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`;

const defaultHTML = `<div class="label">subgrid: 卡片内容跨卡片对齐 (标题、描述、价格、按钮)</div>
<div class="parent">
  <div class="card">
    <div class="card-title">基础套餐</div>
    <div class="card-desc">适合个人用户</div>
    <div class="card-price">&yen;99</div>
    <div class="card-btn">选择方案</div>
  </div>
  <div class="card">
    <div class="card-title">专业套餐</div>
    <div class="card-desc">为小团队设计的专业解决方案，包含更多功能和存储空间</div>
    <div class="card-price">&yen;299</div>
    <div class="card-btn">选择方案</div>
  </div>
  <div class="card">
    <div class="card-title">企业套餐</div>
    <div class="card-desc">企业级方案</div>
    <div class="card-price">&yen;999</div>
    <div class="card-btn">选择方案</div>
  </div>
</div>`;

const presets = [
  {
    label: '卡片对齐 (subgrid)',
    css: defaultCSS,
    html: defaultHTML,
  },
  {
    label: '无 subgrid 对比',
    css: `.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background: #fff1f2;
  border: 2px solid #fca5a5;
  border-radius: 8px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  border: 2px solid #fca5a5;
  border-radius: 8px;
  padding: 12px;
}
.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #991b1b;
}
.card-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}
.card-price {
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
}
.card-btn {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin-top: auto;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">无 subgrid: 每个卡片独立布局，内容无法跨卡片对齐</div>
<div class="parent">
  <div class="card">
    <div class="card-title">基础套餐</div>
    <div class="card-desc">适合个人用户</div>
    <div class="card-price">&yen;99</div>
    <div class="card-btn">选择方案</div>
  </div>
  <div class="card">
    <div class="card-title">专业套餐</div>
    <div class="card-desc">为小团队设计的专业解决方案，包含更多功能和存储空间</div>
    <div class="card-price">&yen;299</div>
    <div class="card-btn">选择方案</div>
  </div>
  <div class="card">
    <div class="card-title">企业套餐</div>
    <div class="card-desc">企业级方案</div>
    <div class="card-price">&yen;999</div>
    <div class="card-btn">选择方案</div>
  </div>
</div>`,
  },
  {
    label: '表单对齐 (subgrid)',
    css: `.form-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 12px;
  padding: 16px;
  background: #f0fdf4;
  border: 2px solid #10b981;
  border-radius: 8px;
  max-width: 400px;
}
.form-row {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 2;
  align-items: center;
}
label {
  font-size: 14px;
  font-weight: 600;
  color: #166534;
  text-align: right;
}
input {
  padding: 6px 10px;
  border: 1px solid #86efac;
  border-radius: 4px;
  font-size: 14px;
}
.note {
  grid-column: 2;
  font-size: 11px;
  color: #666;
  margin-top: -4px;
}
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">subgrid 让表单标签和输入框对齐</div>
<div class="form-grid">
  <div class="form-row">
    <label>用户名</label>
    <input type="text" placeholder="请输入用户名">
  </div>
  <div class="note">3-20 个字符</div>
  <div class="form-row">
    <label>电子邮件</label>
    <input type="email" placeholder="example@mail.com">
  </div>
  <div class="form-row">
    <label>密码</label>
    <input type="password" placeholder="至少 8 位">
  </div>
  <div class="note">包含字母和数字</div>
</div>`,
  },
  {
    label: '列 subgrid',
    css: `.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 16px;
  background: #eff6ff;
  border: 2px solid #3b82f6;
  border-radius: 8px;
}
.span-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 4;
  gap: 8px;
}
.item {
  border-radius: 6px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  min-height: 50px;
}
.header {
  background: #3b82f6;
  grid-column: span 4;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
}
.a { background: #8b5cf6; grid-column: span 2; }
.b { background: #10b981; }
.c { background: #f59e0b; }
.d { background: #ef4444; }
.e { background: #6366f1; grid-column: span 3; }
.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}`,
    html: `<div class="label">列方向 subgrid: 嵌套元素继承父网格的列轨道</div>
<div class="parent">
  <div class="header">Header (span 4)</div>
  <div class="span-item">
    <div class="item a">A (span 2)</div>
    <div class="item b">B</div>
    <div class="item c">C</div>
  </div>
  <div class="span-item">
    <div class="item d">D</div>
    <div class="item e">E (span 3)</div>
  </div>
</div>`,
  },
];

export function SubgridDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={340}
    />
  );
}
