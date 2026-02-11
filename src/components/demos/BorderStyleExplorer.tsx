'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type BorderStyle =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

interface StyleInfo {
  value: BorderStyle;
  label: string;
  description: string;
}

const BORDER_STYLES: StyleInfo[] = [
  {
    value: 'none',
    label: 'none',
    description: '无边框。与 hidden 类似，但在表格边框冲突解析中优先级较低。',
  },
  {
    value: 'hidden',
    label: 'hidden',
    description: '无边框。与 none 类似，但在表格边框冲突解析中优先级较高。',
  },
  {
    value: 'dotted',
    label: 'dotted',
    description: '点线边框。一系列圆点组成。',
  },
  {
    value: 'dashed',
    label: 'dashed',
    description: '虚线边框。一系列短线段组成。',
  },
  {
    value: 'solid',
    label: 'solid',
    description: '实线边框。单条实线。',
  },
  {
    value: 'double',
    label: 'double',
    description: '双线边框。两条平行实线，线宽之和等于 border-width 值。',
  },
  {
    value: 'groove',
    label: 'groove',
    description: '凹槽边框。显示为雕刻进页面的效果（3D 效果）。',
  },
  {
    value: 'ridge',
    label: 'ridge',
    description: '垄状边框。与 groove 相反，显示为凸出页面的效果。',
  },
  {
    value: 'inset',
    label: 'inset',
    description: '内嵌边框。使元素看起来像嵌入页面中（3D 效果）。',
  },
  {
    value: 'outset',
    label: 'outset',
    description: '外凸边框。与 inset 相反，使元素看起来凸出页面。',
  },
];

export function BorderStyleExplorer() {
  const [selectedStyle, setSelectedStyle] = useState<BorderStyle>('solid');

  const selectedInfo = BORDER_STYLES.find((s) => s.value === selectedStyle);

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Grid Display */}
      <div className="space-y-3">
        <label className="text-sm font-medium">所有边框样式</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {BORDER_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => setSelectedStyle(style.value)}
              className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                selectedStyle === style.value
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-border hover:border-muted-foreground/50 hover:bg-muted/50'
              }`}
            >
              <div
                className="w-full h-20 bg-background rounded"
                style={{
                  borderWidth: '4px',
                  borderStyle: style.value,
                  borderColor: 'hsl(var(--foreground))',
                }}
              />
              <span className="text-xs font-mono font-medium">{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Style Preview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">当前选中</label>
          <Badge variant="secondary">{selectedStyle}</Badge>
        </div>
        <div className="bg-muted/30 rounded-lg p-12 flex items-center justify-center">
          <div
            className="w-64 h-40 bg-background rounded-lg shadow-lg flex items-center justify-center"
            style={{
              borderWidth: '8px',
              borderStyle: selectedStyle,
              borderColor: 'hsl(var(--primary))',
            }}
          >
            <span className="text-lg font-medium text-muted-foreground">border-style: {selectedStyle}</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      {selectedInfo && (
        <div className="space-y-2">
          <label className="text-sm font-medium">说明</label>
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedInfo.description}</p>
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS 代码</label>
        <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code className="text-foreground">border-style: {selectedStyle};</code>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-lg p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">提示：</strong>
          3D 效果样式（groove、ridge、inset、outset）的显示效果取决于 border-color 和背景色。
          在深色主题下可能不太明显。双线样式（double）要求 border-width 至少为 3px 才能看到效果。
        </p>
      </div>
    </div>
  );
}
