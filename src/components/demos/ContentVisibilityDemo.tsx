'use client';

import { useState } from 'react';

type ItemStatus = 'rendered' | 'skipped';

export function ContentVisibilityDemo() {
  const [contentVisibility, setContentVisibility] = useState<'visible' | 'auto' | 'hidden'>('visible');
  const [containIntrinsicSize, setContainIntrinsicSize] = useState(100);

  const presets = [
    { name: '默认渲染', visibility: 'visible' as const, size: 100 },
    { name: '自动可见性', visibility: 'auto' as const, size: 100 },
    { name: '设置固有尺寸', visibility: 'auto' as const, size: 200 },
  ];

  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `列表项 ${i + 1}`,
    content: `这是第 ${i + 1} 个列表项的内容。包含一些示例文本来展示 content-visibility 的效果。`,
    status: (contentVisibility === 'auto' && i > 5 && i < 15) ? 'skipped' as ItemStatus : 'rendered' as ItemStatus,
  }));

  const renderedCount = items.filter((i) => i.status === 'rendered').length;
  const skippedCount = items.filter((i) => i.status === 'skipped').length;

  const generateCSS = () => {
    return `.list-item {
  content-visibility: ${contentVisibility};${contentVisibility === 'auto' ? `
  contain-intrinsic-size: auto ${containIntrinsicSize}px;` : ''}
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
                setContentVisibility(preset.visibility);
                setContainIntrinsicSize(preset.size);
              }}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* content-visibility Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          content-visibility
        </label>
        <div className="flex gap-2">
          {(['visible', 'auto', 'hidden'] as const).map((value) => (
            <button
              key={value}
              onClick={() => setContentVisibility(value)}
              className={`px-4 py-2 rounded transition-colors ${
                contentVisibility === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* contain-intrinsic-size Control */}
      {contentVisibility === 'auto' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            contain-intrinsic-size: {containIntrinsicSize}px
          </label>
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={containIntrinsicSize}
            onChange={(e) => setContainIntrinsicSize(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">{renderedCount}</div>
          <div className="text-sm text-green-600 dark:text-green-400">已渲染项</div>
        </div>
        <div className="bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{skippedCount}</div>
          <div className="text-sm text-orange-600 dark:text-orange-400">跳过渲染项</div>
        </div>
      </div>

      {/* Scrollable List Preview */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          滚动列表预览
        </label>
        <div className="border border-border rounded-lg h-80 overflow-y-auto bg-muted/50 p-4 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all ${
                item.status === 'rendered'
                  ? 'bg-white dark:bg-gray-800 border-green-300 dark:border-green-700'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700'
              }`}
              style={{
                minHeight: contentVisibility === 'auto' && item.status === 'skipped' ? `${containIntrinsicSize}px` : 'auto',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-foreground">{item.title}</div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    item.status === 'rendered'
                      ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
                      : 'bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300'
                  }`}
                >
                  {item.status === 'rendered' ? '已渲染' : '跳过'}
                </div>
              </div>
              {item.status === 'rendered' && (
                <p className="text-sm text-muted-foreground">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">content-visibility 说明</p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li><strong>visible</strong>: 正常渲染（默认）</li>
          <li><strong>auto</strong>: 仅渲染视口内和附近的内容，跳过屏幕外元素</li>
          <li><strong>hidden</strong>: 跳过渲染但保留布局空间</li>
          <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">contain-intrinsic-size</code> 为跳过的内容指定占位尺寸</li>
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
