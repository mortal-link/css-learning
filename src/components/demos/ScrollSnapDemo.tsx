'use client';

import { useState } from 'react';

type SnapType = 'none' | 'x mandatory' | 'x proximity' | 'y mandatory' | 'y proximity';
type SnapAlign = 'start' | 'center' | 'end';
type SnapStop = 'normal' | 'always';

export function ScrollSnapDemo() {
  const [snapType, setSnapType] = useState<SnapType>('x mandatory');
  const [snapAlign, setSnapAlign] = useState<SnapAlign>('center');
  const [snapStop, setSnapStop] = useState<SnapStop>('normal');
  const [scrollPadding, setScrollPadding] = useState(0);

  const presets = [
    { name: '图片轮播', snapType: 'x mandatory' as SnapType, align: 'center' as SnapAlign, stop: 'always' as SnapStop, padding: 0 },
    { name: '全屏滚动', snapType: 'y mandatory' as SnapType, align: 'start' as SnapAlign, stop: 'always' as SnapStop, padding: 0 },
    { name: '渐进增强', snapType: 'x proximity' as SnapType, align: 'center' as SnapAlign, stop: 'normal' as SnapStop, padding: 20 },
  ];

  const isHorizontal = snapType.startsWith('x');
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][i],
    label: `项目 ${i + 1}`,
  }));

  const generateCSS = () => {
    return `.scroll-container {
  scroll-snap-type: ${snapType};
  scroll-padding: ${scrollPadding}px;
  overflow: ${isHorizontal ? 'auto' : 'auto'};
}

.scroll-item {
  scroll-snap-align: ${snapAlign};
  scroll-snap-stop: ${snapStop};
}`;
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
                setSnapType(preset.snapType);
                setSnapAlign(preset.align);
                setSnapStop(preset.stop);
                setScrollPadding(preset.padding);
              }}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* scroll-snap-type Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          scroll-snap-type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(['none', 'x mandatory', 'x proximity', 'y mandatory', 'y proximity'] as SnapType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSnapType(type)}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                snapType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* scroll-snap-align Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          scroll-snap-align
        </label>
        <div className="flex gap-2">
          {(['start', 'center', 'end'] as SnapAlign[]).map((align) => (
            <button
              key={align}
              onClick={() => setSnapAlign(align)}
              className={`px-4 py-2 rounded transition-colors ${
                snapAlign === align
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>

      {/* scroll-snap-stop Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          scroll-snap-stop
        </label>
        <div className="flex gap-2">
          {(['normal', 'always'] as SnapStop[]).map((stop) => (
            <button
              key={stop}
              onClick={() => setSnapStop(stop)}
              className={`px-4 py-2 rounded transition-colors ${
                snapStop === stop
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {stop}
            </button>
          ))}
        </div>
      </div>

      {/* scroll-padding Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          scroll-padding: {scrollPadding}px
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={scrollPadding}
          onChange={(e) => setScrollPadding(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Scroll Container Preview */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          滚动容器预览 {snapType !== 'none' && '(滚动试试)'}
        </label>
        <div
          className="border border-border rounded-lg overflow-auto bg-muted/50"
          style={{
            scrollSnapType: snapType,
            scrollPadding: `${scrollPadding}px`,
            ...(isHorizontal
              ? { display: 'flex', flexDirection: 'row', height: '300px' }
              : { height: '400px' }),
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 flex items-center justify-center rounded-lg m-2"
              style={{
                scrollSnapAlign: snapAlign,
                scrollSnapStop: snapStop,
                backgroundColor: item.color,
                ...(isHorizontal
                  ? { width: '280px', height: 'calc(100% - 16px)' }
                  : { width: 'calc(100% - 16px)', height: '350px' }),
              }}
            >
              <div className="text-white text-center">
                <div className="text-4xl font-bold">{item.label}</div>
                <div className="text-sm mt-2 opacity-80">scroll-snap-align: {snapAlign}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Snap Points Visualization */}
      <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">对齐点可视化</p>
        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          {snapAlign === 'start' && '↓ 项目开始边对齐容器开始边'}
          {snapAlign === 'center' && '↓ 项目中心对齐容器中心'}
          {snapAlign === 'end' && '↓ 项目结束边对齐容器结束边'}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Scroll Snap 说明</p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li><strong>mandatory</strong>: 滚动必须停在对齐点</li>
          <li><strong>proximity</strong>: 滚动接近对齐点时才吸附</li>
          <li><strong>scroll-snap-stop: always</strong> 防止跳过对齐点</li>
          <li><strong>scroll-padding</strong> 为对齐点添加偏移</li>
        </ul>
      </div>

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
