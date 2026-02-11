'use client';

import { useState } from 'react';

type LayoutMode = 'flexbox' | 'grid' | 'block';
type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export function BoxAlignmentDemo() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('flexbox');
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('center');
  const [alignItems, setAlignItems] = useState<AlignItems>('center');

  const presets = [
    { name: '居中对齐', layout: 'flexbox' as LayoutMode, justify: 'center' as JustifyContent, align: 'center' as AlignItems },
    { name: '分散对齐', layout: 'flexbox' as LayoutMode, justify: 'space-between' as JustifyContent, align: 'stretch' as AlignItems },
    { name: '起始对齐', layout: 'grid' as LayoutMode, justify: 'start' as JustifyContent, align: 'start' as AlignItems },
  ];

  const justifyOptions: JustifyContent[] = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'];
  const alignOptions: AlignItems[] = ['start', 'center', 'end', 'stretch', 'baseline'];

  const getContainerStyle = () => {
    const base: React.CSSProperties = {
      display: layoutMode === 'block' ? 'block' : layoutMode === 'flexbox' ? 'flex' : 'grid',
      padding: '2rem',
      border: '2px dashed rgb(147, 51, 234)',
      borderRadius: '0.5rem',
      minHeight: '300px',
      gap: '1rem',
    };

    if (layoutMode === 'flexbox') {
      return {
        ...base,
        justifyContent,
        alignItems,
      };
    } else if (layoutMode === 'grid') {
      return {
        ...base,
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyItems: justifyContent === 'start' ? 'start' : justifyContent === 'center' ? 'center' : 'end',
        alignItems,
      };
    } else {
      return base;
    }
  };

  const items = [
    { size: 'large', height: 80, label: '大' },
    { size: 'medium', height: 60, label: '中' },
    { size: 'small', height: 40, label: '小' },
  ];

  const generateCSS = () => {
    if (layoutMode === 'flexbox') {
      return `.container {
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: 1rem;
}`;
    } else if (layoutMode === 'grid') {
      const justifyItems = justifyContent === 'start' ? 'start' : justifyContent === 'center' ? 'center' : 'end';
      return `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: ${justifyItems};
  align-items: ${alignItems};
  gap: 1rem;
}`;
    } else {
      return `.container {
  display: block;
  /* Block layout has limited alignment options */
  text-align: ${justifyContent === 'center' ? 'center' : justifyContent === 'end' ? 'right' : 'left'};
}`;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg">
      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          预设样式
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setLayoutMode(preset.layout);
                setJustifyContent(preset.justify);
                setAlignItems(preset.align);
              }}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Mode */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          布局上下文
        </label>
        <div className="flex gap-2">
          {(['flexbox', 'grid', 'block'] as LayoutMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setLayoutMode(mode)}
              className={`px-4 py-2 rounded transition-colors ${
                layoutMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {mode === 'flexbox' ? 'Flexbox' : mode === 'grid' ? 'Grid' : 'Block'}
            </button>
          ))}
        </div>
      </div>

      {/* justify-content / justify-items */}
      {layoutMode !== 'block' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {layoutMode === 'grid' ? 'justify-items (主轴对齐)' : 'justify-content (主轴分布)'}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {justifyOptions.map((value) => (
              <button
                key={value}
                onClick={() => setJustifyContent(value)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  justifyContent === value
                    ? 'bg-purple-500 text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* align-items */}
      {layoutMode !== 'block' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            align-items (交叉轴对齐)
          </label>
          <div className="flex gap-2 flex-wrap">
            {alignOptions.map((value) => (
              <button
                key={value}
                onClick={() => setAlignItems(value)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  alignItems === value
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Visual Demo */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          对齐效果预览
        </label>
        <div
          style={getContainerStyle()}
          className="bg-purple-50 dark:bg-purple-950"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
              style={{
                width: layoutMode === 'grid' ? '80px' : '100px',
                height: alignItems === 'stretch' && layoutMode !== 'block' ? '100%' : `${item.height}px`,
                minHeight: alignItems === 'stretch' ? '80px' : 'auto',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Alignment Axes Explanation */}
      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
          对齐轴说明
        </p>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          {layoutMode === 'flexbox' && (
            <>
              <p><strong>主轴 (Main Axis)</strong>: justify-content 控制项目在主轴上的分布</p>
              <p><strong>交叉轴 (Cross Axis)</strong>: align-items 控制项目在交叉轴上的对齐</p>
            </>
          )}
          {layoutMode === 'grid' && (
            <>
              <p><strong>行内轴 (Inline Axis)</strong>: justify-items 控制项目在行内轴的对齐</p>
              <p><strong>块轴 (Block Axis)</strong>: align-items 控制项目在块轴的对齐</p>
            </>
          )}
          {layoutMode === 'block' && (
            <p>Block 布局的对齐选项有限，主要通过 text-align 和 margin 实现</p>
          )}
        </div>
      </div>

      {/* Shorthand Properties */}
      {layoutMode !== 'block' && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            简写属性
          </p>
          <div className="text-gray-700 dark:text-gray-300 space-y-1 font-mono text-xs">
            <div>place-items: {alignItems} {layoutMode === 'grid' ? (justifyContent === 'start' ? 'start' : justifyContent === 'center' ? 'center' : 'end') : 'center'};</div>
            {layoutMode === 'flexbox' && (
              <div>place-content: {alignItems} {justifyContent};</div>
            )}
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          生成的 CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {generateCSS()}
        </pre>
      </div>
    </div>
  );
}
