'use client';

import { useState } from 'react';

type OverflowValue = 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';

export function OverflowDemo() {
  const [overflowX, setOverflowX] = useState<OverflowValue>('auto');
  const [overflowY, setOverflowY] = useState<OverflowValue>('auto');
  const [contentAmount, setContentAmount] = useState(3);

  const applyPreset = (x: OverflowValue, y: OverflowValue, amount?: number) => {
    setOverflowX(x);
    setOverflowY(y);
    if (amount !== undefined) setContentAmount(amount);
  };

  const generateContent = () => {
    const items = [];
    for (let i = 0; i < contentAmount; i++) {
      items.push(
        <div key={i} className="mb-2">
          <strong>段落 {i + 1}:</strong> 这是一段较长的文本内容，用于演示溢出行为。当容器无法容纳所有内容时，overflow 属性决定了如何处理溢出的部分。CSS 的 overflow 属性是控制内容溢出的关键属性。
        </div>
      );
    }
    return items;
  };

  const getCSS = () => {
    const css = [];
    if (overflowX === overflowY) {
      css.push(`overflow: ${overflowX};`);
    } else {
      css.push(`overflow-x: ${overflowX};`);
      css.push(`overflow-y: ${overflowY};`);
    }
    return css.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div
          className="relative h-64 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
          style={{
            overflowX,
            overflowY,
          }}
        >
          <div className="space-y-2 text-sm">
            {generateContent()}
            <div className="whitespace-nowrap text-muted-foreground">
              这是一行很长很长很长很长很长很长很长很长很长很长很长很长的不换行文本内容，用于测试 overflow-x 的效果。
            </div>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('visible', 'visible', 3)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          默认溢出
        </button>
        <button
          onClick={() => applyPreset('hidden', 'hidden', 5)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          隐藏溢出
        </button>
        <button
          onClick={() => applyPreset('scroll', 'scroll', 5)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          滚动条
        </button>
        <button
          onClick={() => applyPreset('auto', 'auto', 5)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          自动
        </button>
        <button
          onClick={() => applyPreset('clip', 'clip', 5)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          裁剪
        </button>
        <button
          onClick={() => applyPreset('auto', 'auto', 3)}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">overflow-x</label>
          <div className="flex flex-wrap gap-2">
            {(['visible', 'hidden', 'scroll', 'auto', 'clip'] as OverflowValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setOverflowX(value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  overflowX === value
                    ? 'bg-purple-500 text-white dark:bg-purple-600'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">overflow-y</label>
          <div className="flex flex-wrap gap-2">
            {(['visible', 'hidden', 'scroll', 'auto', 'clip'] as OverflowValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setOverflowY(value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  overflowY === value
                    ? 'bg-purple-500 text-white dark:bg-purple-600'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-8 text-right font-mono">
              {contentAmount}
            </span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={contentAmount}
              onChange={(e) => setContentAmount(Number(e.target.value))}
              className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
            />
            <span className="text-xs w-24 text-muted-foreground">内容数量</span>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <code className="text-sm font-mono text-foreground whitespace-pre-wrap">{getCSS()}</code>
      </div>
    </div>
  );
}
