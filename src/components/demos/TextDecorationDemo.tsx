'use client';

import { useState } from 'react';

type DecorationLine = 'none' | 'underline' | 'overline' | 'line-through' | 'combined';
type DecorationStyle = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';

const lineMap: Record<DecorationLine, string> = {
  'none': 'none',
  'underline': 'underline',
  'overline': 'overline',
  'line-through': 'line-through',
  'combined': 'underline overline',
};

const lineLabelMap: Record<DecorationLine, string> = {
  'none': '无',
  'underline': '下划线',
  'overline': '上划线',
  'line-through': '删除线',
  'combined': '组合',
};

const styleLabelMap: Record<DecorationStyle, string> = {
  'solid': '实线',
  'double': '双线',
  'dotted': '点状',
  'dashed': '虚线',
  'wavy': '波浪',
};

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-16 text-right font-mono">
        {value}{unit}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
      />
      <span className="text-xs w-20 truncate text-muted-foreground">{label}</span>
    </div>
  );
}

export function TextDecorationDemo() {
  const [line, setLine] = useState<DecorationLine>('underline');
  const [style, setStyle] = useState<DecorationStyle>('solid');
  const [color, setColor] = useState('#6366f1');
  const [thickness, setThickness] = useState(2);
  const [underlineOffset, setUnderlineOffset] = useState(4);

  const applyPreset = (preset: 'underline' | 'line-through' | 'wavy' | 'combined') => {
    switch (preset) {
      case 'underline':
        setLine('underline');
        setStyle('solid');
        setColor('#6366f1');
        setThickness(2);
        setUnderlineOffset(4);
        break;
      case 'line-through':
        setLine('line-through');
        setStyle('solid');
        setColor('#ef4444');
        setThickness(2);
        setUnderlineOffset(4);
        break;
      case 'wavy':
        setLine('underline');
        setStyle('wavy');
        setColor('#ec4899');
        setThickness(2);
        setUnderlineOffset(6);
        break;
      case 'combined':
        setLine('combined');
        setStyle('double');
        setColor('#8b5cf6');
        setThickness(3);
        setUnderlineOffset(5);
        break;
    }
  };

  const decorationStyle: React.CSSProperties = {
    textDecorationLine: lineMap[line],
    textDecorationStyle: style,
    textDecorationColor: color,
    textDecorationThickness: `${thickness}px`,
    textUnderlineOffset: `${underlineOffset}px`,
  };

  const generateCSS = () => {
    const parts: string[] = [];
    if (line !== 'none') {
      parts.push(`text-decoration-line: ${lineMap[line]};`);
      parts.push(`text-decoration-style: ${style};`);
      parts.push(`text-decoration-color: ${color};`);
      parts.push(`text-decoration-thickness: ${thickness}px;`);
      if (line === 'underline' || line === 'combined') {
        parts.push(`text-underline-offset: ${underlineOffset}px;`);
      }
    }
    return parts.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-8 flex items-center justify-center">
        <p
          className="text-3xl font-medium text-foreground transition-all duration-300"
          style={decorationStyle}
        >
          文本装饰效果演示 Text Decoration Demo
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('underline')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          下划线
        </button>
        <button
          onClick={() => applyPreset('line-through')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          删除线
        </button>
        <button
          onClick={() => applyPreset('wavy')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          波浪线
        </button>
        <button
          onClick={() => applyPreset('combined')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          装饰组合
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Line Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">装饰线类型</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(lineMap) as DecorationLine[]).map((key) => (
              <button
                key={key}
                onClick={() => setLine(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  line === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {lineLabelMap[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Style Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">装饰线样式</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(styleLabelMap) as DecorationStyle[]).map((key) => (
              <button
                key={key}
                onClick={() => setStyle(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  style === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {styleLabelMap[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">装饰线颜色</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 rounded border cursor-pointer bg-transparent"
            />
            <span className="text-sm font-mono text-muted-foreground">{color}</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          <Slider
            label="线条粗细"
            value={thickness}
            onChange={setThickness}
            min={1}
            max={8}
            step={0.5}
            unit="px"
          />
          <Slider
            label="下划线偏移"
            value={underlineOffset}
            onChange={setUnderlineOffset}
            min={0}
            max={20}
            step={1}
            unit="px"
          />
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateCSS() || '/* 无装饰 */'}
        </pre>
      </div>
    </div>
  );
}
