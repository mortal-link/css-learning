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

type BorderStyle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

const BORDER_STYLES: { value: BorderStyle; label: string }[] = [
  { value: 'solid', label: '实线' },
  { value: 'dashed', label: '虚线' },
  { value: 'dotted', label: '点线' },
  { value: 'double', label: '双线' },
  { value: 'groove', label: '凹槽' },
  { value: 'ridge', label: '凸起' },
  { value: 'inset', label: '内嵌' },
  { value: 'outset', label: '外凸' },
];

const COLOR_PRESETS = [
  { name: '黑色', value: '#000000' },
  { name: '蓝色', value: '#3b82f6' },
  { name: '红色', value: '#ef4444' },
  { name: '绿色', value: '#22c55e' },
  { name: '紫色', value: '#a855f7' },
  { name: '橙色', value: '#f97316' },
];

export function BorderDemo() {
  const [borderWidth, setBorderWidth] = useState(4);
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('solid');
  const [borderColor, setBorderColor] = useState('#3b82f6');
  const [borderRadius, setBorderRadius] = useState(8);

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '基础边框':
        setBorderWidth(2);
        setBorderStyle('solid');
        setBorderColor('#000000');
        setBorderRadius(0);
        break;
      case '圆角卡片':
        setBorderWidth(1);
        setBorderStyle('solid');
        setBorderColor('#e5e7eb');
        setBorderRadius(12);
        break;
      case '虚线':
        setBorderWidth(3);
        setBorderStyle('dashed');
        setBorderColor('#3b82f6');
        setBorderRadius(8);
        break;
      case '双线':
        setBorderWidth(6);
        setBorderStyle('double');
        setBorderColor('#a855f7');
        setBorderRadius(0);
        break;
      case '圆形':
        setBorderWidth(4);
        setBorderStyle('solid');
        setBorderColor('#ef4444');
        setBorderRadius(50);
        break;
    }
  };

  const generateCSS = (): string => {
    const lines = [
      `border-width: ${borderWidth}px;`,
      `border-style: ${borderStyle};`,
      `border-color: ${borderColor};`,
    ];
    if (borderRadius > 0) {
      lines.push(`border-radius: ${borderRadius}%;`);
    }
    return lines.join('\n');
  };

  const generateShorthand = (): string => {
    let css = `border: ${borderWidth}px ${borderStyle} ${borderColor};`;
    if (borderRadius > 0) {
      css += `\nborder-radius: ${borderRadius}%;`;
    }
    return css;
  };

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Controls */}
      <div className="space-y-4">
        <Slider
          label="border-width"
          value={borderWidth}
          onChange={setBorderWidth}
          min={0}
          max={20}
          unit="px"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">border-style</label>
          <div className="grid grid-cols-4 gap-2">
            {BORDER_STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => setBorderStyle(style.value)}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  borderStyle === style.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">border-color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-16 h-10 rounded border cursor-pointer bg-transparent"
            />
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBorderColor(color.value)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    borderColor === color.value
                      ? 'border-foreground scale-110'
                      : 'border-muted-foreground/25'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <Slider
          label="border-radius"
          value={borderRadius}
          onChange={setBorderRadius}
          min={0}
          max={50}
          unit="%"
        />
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['基础边框', '圆角卡片', '虚线', '双线', '圆形'].map((preset) => (
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
        <label className="text-sm font-medium">实时预览</label>
        <div className="bg-muted/30 rounded-lg p-12 flex items-center justify-center">
          <div
            style={{
              width: '200px',
              height: '200px',
              borderWidth: `${borderWidth}px`,
              borderStyle: borderStyle,
              borderColor: borderColor,
              borderRadius: `${borderRadius}%`,
              backgroundColor: 'hsl(var(--background))',
            }}
            className="flex items-center justify-center shadow-lg"
          >
            <span className="text-sm text-muted-foreground">示例元素</span>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-3">
        <label className="text-sm font-medium">CSS 代码</label>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">简写形式 (Shorthand)</p>
          <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
            <code className="text-foreground">{generateShorthand()}</code>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">完整形式 (Longhand)</p>
          <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
            <code className="text-foreground">{generateCSS()}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
