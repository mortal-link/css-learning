'use client';

import { useState } from 'react';

type FontStyleValue = 'normal' | 'italic' | 'oblique';
type FontWeightName = 'normal' | 'bold';
type FontSizeKeyword = 'small' | 'medium' | 'large' | 'x-large';
type FontStretchValue = 'condensed' | 'normal' | 'expanded';

const fontStyleLabels: Record<FontStyleValue, string> = {
  'normal': '正常',
  'italic': '斜体',
  'oblique': '倾斜',
};

const fontWeightLabels: Record<number | FontWeightName, string> = {
  'normal': '正常 (400)',
  'bold': '粗体 (700)',
  100: '极细',
  300: '细体',
  400: '正常',
  500: '中等',
  600: '半粗',
  700: '粗体',
  900: '特粗',
};

const fontSizeKeywordLabels: Record<FontSizeKeyword, string> = {
  'small': '小',
  'medium': '中',
  'large': '大',
  'x-large': '特大',
};

const fontStretchLabels: Record<FontStretchValue, string> = {
  'condensed': '紧缩',
  'normal': '正常',
  'expanded': '扩展',
};

const fontStretchValues: Record<FontStretchValue, string> = {
  'condensed': 'condensed',
  'normal': 'normal',
  'expanded': 'expanded',
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
      <span className="text-xs w-24 truncate text-muted-foreground">{label}</span>
    </div>
  );
}

export function FontPropertyDemo() {
  const [fontStyle, setFontStyle] = useState<FontStyleValue>('normal');
  const [obliqueAngle, setObliqueAngle] = useState(14);
  const [fontWeight, setFontWeight] = useState(400);
  const [fontSizePx, setFontSizePx] = useState(32);
  const [fontStretch, setFontStretch] = useState<FontStretchValue>('normal');

  const applyPreset = (preset: 'body' | 'heading' | 'italic' | 'light') => {
    switch (preset) {
      case 'body':
        setFontStyle('normal');
        setFontWeight(400);
        setFontSizePx(16);
        setFontStretch('normal');
        break;
      case 'heading':
        setFontStyle('normal');
        setFontWeight(700);
        setFontSizePx(32);
        setFontStretch('normal');
        break;
      case 'italic':
        setFontStyle('italic');
        setFontWeight(400);
        setFontSizePx(20);
        setFontStretch('normal');
        break;
      case 'light':
        setFontStyle('normal');
        setFontWeight(300);
        setFontSizePx(18);
        setFontStretch('condensed');
        break;
    }
  };

  const fontStyleValue = fontStyle === 'oblique' ? `oblique ${obliqueAngle}deg` : fontStyle;

  const textStyle: React.CSSProperties = {
    fontStyle: fontStyleValue,
    fontWeight: fontWeight,
    fontSize: `${fontSizePx}px`,
    fontStretch: fontStretchValues[fontStretch],
  };

  const generateCSS = () => {
    const parts: string[] = [];

    // Longhand properties
    parts.push(`/* 单独属性 */`);
    if (fontStyle === 'oblique') {
      parts.push(`font-style: oblique ${obliqueAngle}deg;`);
    } else {
      parts.push(`font-style: ${fontStyle};`);
    }
    parts.push(`font-weight: ${fontWeight};`);
    parts.push(`font-size: ${fontSizePx}px;`);
    parts.push(`font-stretch: ${fontStretchValues[fontStretch]};`);

    // Shorthand
    parts.push(``);
    parts.push(`/* 简写形式 */`);
    const styleStr = fontStyle === 'oblique' ? `oblique ${obliqueAngle}deg` : fontStyle;
    parts.push(`font: ${styleStr} ${fontWeight} ${fontSizePx}px/${fontSizePx * 1.5}px Arial, sans-serif;`);

    return parts.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-8 flex items-center justify-center">
        <p
          className="text-foreground transition-all duration-300"
          style={textStyle}
        >
          字体属性演示 Font Properties Demo
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('body')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          正文
        </button>
        <button
          onClick={() => applyPreset('heading')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          标题
        </button>
        <button
          onClick={() => applyPreset('italic')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          斜体
        </button>
        <button
          onClick={() => applyPreset('light')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          轻细体
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Font Style */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-style（字体样式）</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(fontStyleLabels) as FontStyleValue[]).map((key) => (
              <button
                key={key}
                onClick={() => setFontStyle(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  fontStyle === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {fontStyleLabels[key]}
              </button>
            ))}
          </div>
          {fontStyle === 'oblique' && (
            <Slider
              label="倾斜角度"
              value={obliqueAngle}
              onChange={setObliqueAngle}
              min={0}
              max={20}
              step={1}
              unit="°"
            />
          )}
        </div>

        {/* Font Weight */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-weight（字重）</label>
          <Slider
            label="字重"
            value={fontWeight}
            onChange={setFontWeight}
            min={100}
            max={900}
            step={100}
          />
          <div className="flex gap-2 flex-wrap">
            {[100, 300, 400, 500, 600, 700, 900].map((weight) => (
              <button
                key={weight}
                onClick={() => setFontWeight(weight)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  fontWeight === weight
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted dark:bg-muted/50 dark:hover:bg-muted'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-size（字体大小）</label>
          <Slider
            label="大小"
            value={fontSizePx}
            onChange={setFontSizePx}
            min={12}
            max={72}
            step={2}
            unit="px"
          />
        </div>

        {/* Font Stretch */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-stretch（字体宽度）</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(fontStretchLabels) as FontStretchValue[]).map((key) => (
              <button
                key={key}
                onClick={() => setFontStretch(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  fontStretch === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {fontStretchLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateCSS()}
        </pre>
      </div>
    </div>
  );
}
