'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = 'px',
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <Badge variant="secondary">
          {value}
          {unit}
        </Badge>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

export function PaddingDemo() {
  const [paddingTop, setPaddingTop] = useState(20);
  const [paddingRight, setPaddingRight] = useState(20);
  const [paddingBottom, setPaddingBottom] = useState(20);
  const [paddingLeft, setPaddingLeft] = useState(20);

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '均匀 20px':
        setPaddingTop(20);
        setPaddingRight(20);
        setPaddingBottom(20);
        setPaddingLeft(20);
        break;
      case '上下 40px':
        setPaddingTop(40);
        setPaddingRight(20);
        setPaddingBottom(40);
        setPaddingLeft(20);
        break;
      case '左右 20px':
        setPaddingTop(10);
        setPaddingRight(20);
        setPaddingBottom(10);
        setPaddingLeft(20);
        break;
      case '不对称':
        setPaddingTop(40);
        setPaddingRight(60);
        setPaddingBottom(20);
        setPaddingLeft(40);
        break;
    }
  };

  const generateShorthand = (): string => {
    if (
      paddingTop === paddingRight &&
      paddingRight === paddingBottom &&
      paddingBottom === paddingLeft
    ) {
      return `padding: ${paddingTop}px;`;
    }
    if (paddingTop === paddingBottom && paddingRight === paddingLeft) {
      return `padding: ${paddingTop}px ${paddingRight}px;`;
    }
    if (paddingRight === paddingLeft) {
      return `padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px;`;
    }
    return `padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;`;
  };

  const generateLonghand = (): string => {
    return [
      `padding-top: ${paddingTop}px;`,
      `padding-right: ${paddingRight}px;`,
      `padding-bottom: ${paddingBottom}px;`,
      `padding-left: ${paddingLeft}px;`,
    ].join('\n');
  };

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <Slider
          label="padding-top"
          value={paddingTop}
          onChange={setPaddingTop}
          min={0}
          max={80}
          unit="px"
        />
        <Slider
          label="padding-right"
          value={paddingRight}
          onChange={setPaddingRight}
          min={0}
          max={80}
          unit="px"
        />
        <Slider
          label="padding-bottom"
          value={paddingBottom}
          onChange={setPaddingBottom}
          min={0}
          max={80}
          unit="px"
        />
        <Slider
          label="padding-left"
          value={paddingLeft}
          onChange={setPaddingLeft}
          min={0}
          max={80}
          unit="px"
        />
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['均匀 20px', '上下 40px', '左右 20px', '不对称'].map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">可视化预览</label>
        <div className="bg-muted/30 rounded-lg p-8 border-2 border-dashed border-muted-foreground/25">
          <div
            style={{
              paddingTop: `${paddingTop}px`,
              paddingRight: `${paddingRight}px`,
              paddingBottom: `${paddingBottom}px`,
              paddingLeft: `${paddingLeft}px`,
            }}
            className="bg-green-500/20 dark:bg-green-500/30 border-2 border-green-600 dark:border-green-400 relative"
          >
            {/* Padding indicators */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-mono text-green-700 dark:text-green-300"
              style={{ marginTop: `${paddingTop / 2 - 8}px` }}
            >
              {paddingTop}
            </div>
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-mono text-green-700 dark:text-green-300"
              style={{ marginRight: `${paddingRight / 2 - 8}px` }}
            >
              {paddingRight}
            </div>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-mono text-green-700 dark:text-green-300"
              style={{ marginBottom: `${paddingBottom / 2 - 8}px` }}
            >
              {paddingBottom}
            </div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-mono text-green-700 dark:text-green-300"
              style={{ marginLeft: `${paddingLeft / 2 - 8}px` }}
            >
              {paddingLeft}
            </div>

            {/* Content area */}
            <div className="bg-blue-500/20 dark:bg-blue-500/30 border-2 border-blue-600 dark:border-blue-400 p-6 text-center">
              <span className="text-sm font-medium text-foreground">内容区域 (Content Area)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          绿色区域 = padding（内边距） / 蓝色区域 = content（内容）
        </p>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-3">
        <label className="text-sm font-medium">CSS 代码</label>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">简写形式 (Shorthand)</p>
          <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
            <code className="text-foreground">{generateShorthand()}</code>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">完整形式 (Longhand)</p>
          <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
            <code className="text-foreground">{generateLonghand()}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
