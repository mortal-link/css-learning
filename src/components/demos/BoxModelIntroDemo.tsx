'use client';

import { useState } from 'react';

type BoxSizing = 'content-box' | 'border-box';
type DisplayMode = 'block' | 'none' | 'list-item';

const PRESETS = [
  {
    name: '标准盒模型',
    boxSizing: 'content-box' as BoxSizing,
    display: 'block' as DisplayMode,
    width: 200,
    padding: 20,
    border: 5,
    margin: 10,
  },
  {
    name: '替代盒模型',
    boxSizing: 'border-box' as BoxSizing,
    display: 'block' as DisplayMode,
    width: 200,
    padding: 20,
    border: 5,
    margin: 10,
  },
  {
    name: '列表项多盒',
    boxSizing: 'content-box' as BoxSizing,
    display: 'list-item' as DisplayMode,
    width: 200,
    padding: 15,
    border: 2,
    margin: 8,
  },
  {
    name: 'display:none',
    boxSizing: 'content-box' as BoxSizing,
    display: 'none' as DisplayMode,
    width: 200,
    padding: 20,
    border: 5,
    margin: 10,
  },
];

export function BoxModelIntroDemo() {
  const [boxSizing, setBoxSizing] = useState<BoxSizing>('content-box');
  const [display, setDisplay] = useState<DisplayMode>('block');
  const [width, setWidth] = useState(200);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(5);
  const [margin, setMargin] = useState(10);
  const [activeArea, setActiveArea] = useState<string | null>(null);

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setBoxSizing(preset.boxSizing);
    setDisplay(preset.display);
    setWidth(preset.width);
    setPadding(preset.padding);
    setBorder(preset.border);
    setMargin(preset.margin);
    setActiveArea(null);
  };

  const contentWidth = width;
  const contentHeight = 100;

  const innerWidth = boxSizing === 'content-box' ? contentWidth : contentWidth - 2 * padding - 2 * border;
  const totalWidth = boxSizing === 'content-box' ? contentWidth + 2 * padding + 2 * border : contentWidth;
  const totalWidthWithMargin = totalWidth + 2 * margin;
  const totalHeight = contentHeight + 2 * padding + 2 * border;

  const boxCount = display === 'none' ? 0 : display === 'list-item' ? 2 : 1;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-6 bg-background/50 rounded-lg border border-border">
      {/* Display Mode */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">display 属性（盒子生成）</h3>
        <div className="flex gap-2">
          {(['block', 'list-item', 'none'] as DisplayMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setDisplay(mode)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                display === mode
                  ? 'bg-purple-600 text-white'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {mode}
              {mode === 'list-item' && <span className="ml-1 text-xs opacity-75">(2盒)</span>}
              {mode === 'none' && <span className="ml-1 text-xs opacity-75">(0盒)</span>}
            </button>
          ))}
        </div>
        <div
          className={`p-3 rounded-lg border ${
            boxCount === 0
              ? 'bg-red-50 dark:bg-red-900/20 border-red-400'
              : boxCount === 2
              ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-400'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
          }`}
        >
          <p className="text-xs">
            {boxCount === 0 && '⚠ display: none → 不生成盒子，不参与布局和渲染'}
            {boxCount === 1 && '✓ display: block → 生成 1 个块级盒子'}
            {boxCount === 2 && '✓ display: list-item → 生成 2 个盒子（主盒 + 标记盒）'}
          </p>
        </div>
      </div>

      {/* Box Sizing Toggle */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">box-sizing 模式</h3>
        <div className="flex gap-2">
          {(['content-box', 'border-box'] as BoxSizing[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setBoxSizing(mode)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                boxSizing === mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {mode === 'content-box' ? '标准盒模型' : '替代盒模型'}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Box Model */}
      {display !== 'none' && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">盒模型可视化</h3>
          <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
            {/* Margin */}
            <div
              className="relative flex items-center justify-center transition-all"
              style={{
                padding: `${margin}px`,
                backgroundColor: activeArea === 'margin' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.15)',
                border: '2px dashed rgba(251, 191, 36, 0.5)',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setActiveArea('margin')}
              onMouseLeave={() => setActiveArea(null)}
            >
              {/* Border */}
              <div
                className="relative flex items-center justify-center transition-all"
                style={{
                  padding: `${border}px`,
                  backgroundColor: activeArea === 'border' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.15)',
                  border: `${border}px solid rgba(34, 197, 94, 0.5)`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActiveArea('border')}
                onMouseLeave={() => setActiveArea(null)}
              >
                {/* Padding */}
                <div
                  className="relative flex items-center justify-center transition-all"
                  style={{
                    padding: `${padding}px`,
                    backgroundColor: activeArea === 'padding' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)',
                    border: '2px dashed rgba(59, 130, 246, 0.5)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setActiveArea('padding')}
                  onMouseLeave={() => setActiveArea(null)}
                >
                  {/* Content */}
                  <div
                    className="relative flex items-center justify-center transition-all font-mono text-xs font-semibold"
                    style={{
                      width: `${innerWidth}px`,
                      height: `${contentHeight}px`,
                      backgroundColor: activeArea === 'content' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.15)',
                      border: '2px solid rgba(168, 85, 247, 0.5)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setActiveArea('content')}
                    onMouseLeave={() => setActiveArea(null)}
                  >
                    Content
                    <br />
                    {innerWidth} × {contentHeight}px
                  </div>
                </div>
              </div>
              {/* Margin label */}
              <div className="absolute -top-2 left-2 text-xs font-semibold text-orange-700 dark:text-orange-400 bg-white dark:bg-gray-900 px-1 rounded">
                margin: {margin}px
              </div>
            </div>
          </div>

          {/* Area Labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                activeArea === 'content'
                  ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500'
                  : 'bg-purple-50 dark:bg-purple-900/20 border-purple-300'
              }`}
              onMouseEnter={() => setActiveArea('content')}
              onMouseLeave={() => setActiveArea(null)}
            >
              <span className="font-semibold">Content</span>
              <div className="text-muted-foreground">{innerWidth} × {contentHeight}px</div>
            </div>
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                activeArea === 'padding'
                  ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-300'
              }`}
              onMouseEnter={() => setActiveArea('padding')}
              onMouseLeave={() => setActiveArea(null)}
            >
              <span className="font-semibold">Padding</span>
              <div className="text-muted-foreground">{padding}px</div>
            </div>
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                activeArea === 'border'
                  ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                  : 'bg-green-50 dark:bg-green-900/20 border-green-300'
              }`}
              onMouseEnter={() => setActiveArea('border')}
              onMouseLeave={() => setActiveArea(null)}
            >
              <span className="font-semibold">Border</span>
              <div className="text-muted-foreground">{border}px</div>
            </div>
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                activeArea === 'margin'
                  ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-500'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-300'
              }`}
              onMouseEnter={() => setActiveArea('margin')}
              onMouseLeave={() => setActiveArea(null)}
            >
              <span className="font-semibold">Margin</span>
              <div className="text-muted-foreground">{margin}px</div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      {display !== 'none' && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">调整尺寸</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Width: {width}px
              </label>
              <input
                type="range"
                min="100"
                max="400"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Padding: {padding}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Border: {border}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={border}
                onChange={(e) => setBorder(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Margin: {margin}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Size Calculator */}
      {display !== 'none' && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">尺寸计算</h3>
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
              <div>
                <div className="text-xs text-muted-foreground mb-2">内容区域</div>
                <div className="text-foreground font-semibold">
                  {innerWidth} × {contentHeight}px
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  {boxSizing === 'content-box' ? 'width 指定值' : '总宽度（含 padding + border）'}
                </div>
                <div className="text-foreground font-semibold">{width}px</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">总宽度（不含 margin）</div>
                <div className="text-foreground font-semibold">
                  {totalWidth}px
                  {boxSizing === 'content-box' && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({contentWidth} + {2 * padding} + {2 * border})
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">总占用空间（含 margin）</div>
                <div className="text-foreground font-semibold">
                  {totalWidthWithMargin}px
                  <span className="text-xs text-muted-foreground ml-2">
                    ({totalWidth} + {2 * margin})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">CSS 代码</h3>
        <div className="p-4 bg-muted/50 rounded-md border border-border font-mono text-sm">
          <div className="space-y-1">
            <div>.element {'{'}</div>
            <div className="pl-4">
              <span className="text-muted-foreground">display:</span>{' '}
              <span className="text-foreground font-semibold">{display}</span>;
              {display === 'none' && (
                <span className="text-red-600 dark:text-red-400 ml-2">/* 不生成盒子 */</span>
              )}
            </div>
            {display !== 'none' && (
              <>
                <div className="pl-4">
                  <span className="text-muted-foreground">box-sizing:</span>{' '}
                  <span className="text-foreground font-semibold">{boxSizing}</span>;
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">width:</span>{' '}
                  <span className="text-foreground font-semibold">{width}px</span>;
                  {boxSizing === 'border-box' && (
                    <span className="text-blue-600 dark:text-blue-400 ml-2">
                      /* 包含 padding + border */
                    </span>
                  )}
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">padding:</span>{' '}
                  <span className="text-foreground font-semibold">{padding}px</span>;
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">border:</span>{' '}
                  <span className="text-foreground font-semibold">{border}px solid</span>;
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">margin:</span>{' '}
                  <span className="text-foreground font-semibold">{margin}px</span>;
                </div>
              </>
            )}
            <div>{'}'}</div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">预设示例</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-4 py-3 rounded-lg border border-border bg-background hover:border-foreground/50 transition-colors text-sm font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold mb-2 text-foreground">盒模型关键概念</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • <strong>元素树 → 盒树</strong>: 一个元素可生成 0 个、1 个或多个盒子
          </li>
          <li>
            • <strong>四个区域</strong>: content → padding → border → margin（由内向外）
          </li>
          <li>
            • <strong>content-box (标准)</strong>: width 指定内容区宽度
          </li>
          <li>
            • <strong>border-box (替代)</strong>: width 包含 padding + border
          </li>
          <li>
            • <strong>margin</strong>: 外边距不计入盒子宽度，但影响总占用空间
          </li>
          <li>
            • <strong>display: none</strong>: 不生成盒子，完全不参与布局和渲染
          </li>
        </ul>
      </div>
    </div>
  );
}
