'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 原生嵌套语法 */
.parent {
  color: #1a1a1a;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;

  & .child {
    margin: 8px 0;
    padding: 8px;
    background: #eff6ff;
    border-radius: 4px;
  }

  &:hover {
    border-color: #3b82f6;
  }
}`;

const defaultHTML = `<div class="parent">
  父元素 (hover 试试)
  <div class="child">子元素 1</div>
  <div class="child">子元素 2</div>
</div>`;

const presets = [
  {
    label: '基础嵌套',
    css: `.parent {
  color: #1a1a1a;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;

  & .child {
    margin: 8px 0;
    padding: 8px;
    background: #eff6ff;
    border-radius: 4px;
  }

  &:hover {
    border-color: #3b82f6;
  }
}`,
  },
  {
    label: '伪类嵌套',
    css: `.button {
  display: inline-block;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    background: #1d4ed8;
    transform: translateY(0);
  }

  &::before {
    content: "\\2192 ";
  }
}`,
    html: `<span class="button">点击我</span>`,
  },
  {
    label: '媒体查询嵌套',
    css: `.container {
  width: 100%;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 14px;

  @media (min-width: 400px) {
    padding: 2rem;
    background: #e0f2fe;
  }
}

.container .title {
  font-size: 16px;
  font-weight: bold;
}`,
    html: `<div class="container">
  <div class="title">响应式容器</div>
  <p>调整窗口大小查看媒体查询嵌套效果。当容器宽度 >= 400px 时背景色变化。</p>
</div>`,
  },
  {
    label: '深层嵌套',
    css: `.card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;

  & .header {
    background: #f1f5f9;
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;

    & .title {
      font-weight: bold;
      font-size: 16px;
      color: #1e293b;

      &:hover {
        color: #3b82f6;
      }
    }
  }

  & .body {
    padding: 12px;
    font-size: 14px;
    color: #475569;
  }
}`,
    html: `<div class="card">
  <div class="header">
    <div class="title">卡片标题 (hover)</div>
  </div>
  <div class="body">卡片内容区域</div>
</div>`,
  },
];

export function NestingDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={220}
    />
  );
}
