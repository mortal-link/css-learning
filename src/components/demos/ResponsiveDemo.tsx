'use client';

import { useState } from 'react';

type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'widescreen';

interface Viewport {
  name: ViewportSize;
  label: string;
  width: number;
  icon: string;
}

const VIEWPORTS: Viewport[] = [
  { name: 'mobile', label: '手机', width: 375, icon: '📱' },
  { name: 'tablet', label: '平板', width: 768, icon: '📱' },
  { name: 'desktop', label: '桌面', width: 1024, icon: '💻' },
  { name: 'widescreen', label: '宽屏', width: 1440, icon: '🖥️' },
];

export function ResponsiveDemo() {
  const [selectedViewport, setSelectedViewport] = useState<ViewportSize>('desktop');
  const [customWidth, setCustomWidth] = useState(1024);
  const [useCustom, setUseCustom] = useState(false);

  const currentWidth = useCustom
    ? customWidth
    : VIEWPORTS.find((v) => v.name === selectedViewport)?.width || 1024;

  const getLayoutColumns = () => {
    if (currentWidth < 576) return 1;
    if (currentWidth < 768) return 1;
    if (currentWidth < 1024) return 2;
    return 3;
  };

  const showNavFull = currentWidth >= 768;
  const fontSize = currentWidth < 576 ? 14 : currentWidth < 1024 ? 16 : 18;

  const generateCSS = () => {
    return `/* 移动优先的响应式设计 */

/* 基础样式（手机） */
.container {
  width: 100%;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.nav {
  display: none; /* 隐藏导航，显示汉堡菜单 */
}

.font-size {
  font-size: 14px;
}

/* 平板（≥768px） */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }

  .nav {
    display: flex; /* 显示完整导航 */
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .font-size {
    font-size: 16px;
  }
}

/* 桌面（≥1024px） */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .font-size {
    font-size: 18px;
    line-height: 1.6;
  }
}

/* 宽屏（≥1440px） */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
    padding: 3rem;
  }
}`;
  };

  return (
    <div className="space-y-6">
      {/* Viewport Selector */}
      <div className="space-y-3">
        <label className="text-sm text-muted-foreground block">选择视口大小</label>
        <div className="flex flex-wrap gap-2">
          {VIEWPORTS.map((viewport) => (
            <button
              key={viewport.name}
              onClick={() => {
                setSelectedViewport(viewport.name);
                setUseCustom(false);
              }}
              className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
                selectedViewport === viewport.name && !useCustom
                  ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80'
              }`}
            >
              <span>{viewport.icon}</span>
              <span>{viewport.label}</span>
              <span className="text-xs opacity-70">({viewport.width}px)</span>
            </button>
          ))}
        </div>

        {/* Custom Width Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="w-4 h-4 accent-blue-500"
              id="custom-width"
            />
            <label htmlFor="custom-width" className="text-sm text-muted-foreground cursor-pointer">
              自定义宽度: {customWidth}px
            </label>
          </div>
          {useCustom && (
            <input
              type="range"
              min={320}
              max={1920}
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
              className="w-full h-1.5 accent-blue-500"
            />
          )}
        </div>
      </div>

      {/* Preview Container */}
      <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-4">
        <div className="flex justify-center">
          <div
            className="border-2 border-border rounded-lg overflow-hidden bg-background shadow-lg transition-all duration-300"
            style={{ width: `${Math.min(currentWidth, 1200)}px`, maxWidth: '100%' }}
          >
            {/* Header/Nav */}
            <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
              <div className="font-bold" style={{ fontSize: `${fontSize}px` }}>
                网站 Logo
              </div>
              {showNavFull ? (
                <div className="flex gap-4 text-sm">
                  <span>首页</span>
                  <span>关于</span>
                  <span>服务</span>
                  <span>联系</span>
                </div>
              ) : (
                <div className="text-2xl">☰</div>
              )}
            </div>

            {/* Main Content */}
            <div className="p-4" style={{ fontSize: `${fontSize}px` }}>
              {/* Hero Section */}
              <div
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-lg p-6 mb-4"
                style={{
                  padding: currentWidth < 576 ? '1rem' : '1.5rem',
                }}
              >
                <div className="font-bold mb-2" style={{ fontSize: `${fontSize * 1.5}px` }}>
                  响应式布局示例
                </div>
                <p className="text-muted-foreground text-sm">
                  当前宽度: {currentWidth}px
                </p>
              </div>

              {/* Grid Layout */}
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${getLayoutColumns()}, 1fr)`,
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-muted/50 dark:bg-muted/30 border border-border flex items-center justify-center"
                  >
                    <span className="text-sm text-muted-foreground">项目 {i + 1}</span>
                  </div>
                ))}
              </div>

              {/* Info Section */}
              <div className="mt-4 p-4 bg-muted/50 dark:bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• 列数: {getLayoutColumns()}</div>
                  <div>• 导航: {showNavFull ? '完整' : '汉堡菜单'}</div>
                  <div>• 字体大小: {fontSize}px</div>
                  <div>
                    • 断点:{' '}
                    {currentWidth < 576
                      ? '移动'
                      : currentWidth < 768
                      ? '小平板'
                      : currentWidth < 1024
                      ? '平板'
                      : '桌面'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Rules */}
      <div className="rounded-lg border border-border bg-muted/50 dark:bg-muted/30 p-4">
        <div className="text-xs text-muted-foreground mb-2">当前激活的样式规则：</div>
        <div className="space-y-1 text-sm font-mono text-foreground">
          <div>✓ 基础样式（所有设备）</div>
          {currentWidth >= 768 && <div>✓ 平板样式 (min-width: 768px)</div>}
          {currentWidth >= 1024 && <div>✓ 桌面样式 (min-width: 1024px)</div>}
          {currentWidth >= 1440 && <div>✓ 宽屏样式 (min-width: 1440px)</div>}
        </div>
      </div>

      {/* Design Patterns Info */}
      <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/20 p-4">
        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
          响应式设计模式
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
          <div>• 流式布局（Fluid Grids）：使用百分比和 fr 单位</div>
          <div>• 弹性图片（Flexible Images）：max-width: 100%</div>
          <div>• 媒体查询（Media Queries）：断点适配</div>
          <div>• 移动优先（Mobile First）：从小屏开始设计</div>
          <div>• 容器查询（Container Queries）：基于容器尺寸的样式</div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">响应式 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
          {generateCSS()}
        </pre>
      </div>
    </div>
  );
}
