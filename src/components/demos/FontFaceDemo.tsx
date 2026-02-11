'use client';

import { useState } from 'react';

type FontFormat = 'woff2' | 'woff' | 'ttf';
type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

const fontFormatLabels: Record<FontFormat, string> = {
  'woff2': 'WOFF2 (推荐)',
  'woff': 'WOFF',
  'ttf': 'TrueType',
};

const fontDisplayLabels: Record<FontDisplay, string> = {
  'auto': '自动',
  'block': '阻塞',
  'swap': '交换',
  'fallback': '后备',
  'optional': '可选',
};

const fontDisplayDescriptions: Record<FontDisplay, string> = {
  'auto': '浏览器默认行为（通常类似 block）',
  'block': '短暂阻塞期，显示不可见文本，字体加载后替换',
  'swap': '立即显示后备字体，字体加载后交换',
  'fallback': '极短阻塞期，有交换期限制，超时使用后备字体',
  'optional': '极短阻塞期，根据连接速度决定是否使用，无强制交换',
};

export function FontFaceDemo() {
  const [fontFamilyName, setFontFamilyName] = useState('MyCustomFont');
  const [format, setFormat] = useState<FontFormat>('woff2');
  const [fontWeightMin, setFontWeightMin] = useState(400);
  const [fontWeightMax, setFontWeightMax] = useState(700);
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [fontDisplay, setFontDisplay] = useState<FontDisplay>('swap');

  const applyPreset = (preset: 'basic' | 'variable' | 'italic') => {
    switch (preset) {
      case 'basic':
        setFontFamilyName('MyFont');
        setFormat('woff2');
        setFontWeightMin(400);
        setFontWeightMax(400);
        setFontStyle('normal');
        setFontDisplay('swap');
        break;
      case 'variable':
        setFontFamilyName('MyVariableFont');
        setFormat('woff2');
        setFontWeightMin(100);
        setFontWeightMax(900);
        setFontStyle('normal');
        setFontDisplay('swap');
        break;
      case 'italic':
        setFontFamilyName('MyItalicFont');
        setFormat('woff2');
        setFontWeightMin(400);
        setFontWeightMax(400);
        setFontStyle('italic');
        setFontDisplay('fallback');
        break;
    }
  };

  const generateFontFaceCSS = () => {
    const weightRange = fontWeightMin === fontWeightMax
      ? `${fontWeightMin}`
      : `${fontWeightMin} ${fontWeightMax}`;

    return `@font-face {
  font-family: '${fontFamilyName}';
  src: url('/fonts/${fontFamilyName}.${format}') format('${format}');
  font-weight: ${weightRange};
  font-style: ${fontStyle};
  font-display: ${fontDisplay};
}`;
  };

  // Timeline visualization for font-display
  const getTimeline = () => {
    switch (fontDisplay) {
      case 'block':
        return [
          { phase: '阻塞期', duration: '3s', color: 'bg-red-500' },
          { phase: '交换期', duration: '∞', color: 'bg-green-500' },
        ];
      case 'swap':
        return [
          { phase: '交换期', duration: '∞', color: 'bg-green-500' },
        ];
      case 'fallback':
        return [
          { phase: '阻塞期', duration: '0.1s', color: 'bg-red-500' },
          { phase: '交换期', duration: '3s', color: 'bg-green-500' },
          { phase: '失败期', duration: '∞', color: 'bg-gray-500' },
        ];
      case 'optional':
        return [
          { phase: '阻塞期', duration: '0.1s', color: 'bg-red-500' },
          { phase: '可选期', duration: '根据网速', color: 'bg-yellow-500' },
        ];
      case 'auto':
      default:
        return [
          { phase: '浏览器决定', duration: 'varies', color: 'bg-blue-500' },
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('basic')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          基础字体
        </button>
        <button
          onClick={() => applyPreset('variable')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          可变字体
        </button>
        <button
          onClick={() => applyPreset('italic')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          斜体字体
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Font Family Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-family（字体名称）</label>
          <input
            type="text"
            value={fontFamilyName}
            onChange={(e) => setFontFamilyName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="输入字体名称"
          />
        </div>

        {/* Font Format */}
        <div className="space-y-2">
          <label className="text-sm font-medium">src format（字体格式）</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(fontFormatLabels) as FontFormat[]).map((key) => (
              <button
                key={key}
                onClick={() => setFormat(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  format === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {fontFormatLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Font Weight Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-weight（字重范围）</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">最小值: {fontWeightMin}</span>
              <input
                type="range"
                min={100}
                max={900}
                step={100}
                value={fontWeightMin}
                onChange={(e) => setFontWeightMin(Math.min(Number(e.target.value), fontWeightMax))}
                className="w-full h-1.5 accent-purple-500 dark:accent-purple-400"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">最大值: {fontWeightMax}</span>
              <input
                type="range"
                min={100}
                max={900}
                step={100}
                value={fontWeightMax}
                onChange={(e) => setFontWeightMax(Math.max(Number(e.target.value), fontWeightMin))}
                className="w-full h-1.5 accent-purple-500 dark:accent-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Font Style */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-style（字体样式）</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFontStyle('normal')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                fontStyle === 'normal'
                  ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              normal
            </button>
            <button
              onClick={() => setFontStyle('italic')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                fontStyle === 'italic'
                  ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              italic
            </button>
          </div>
        </div>

        {/* Font Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium">font-display（显示策略）</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(Object.keys(fontDisplayLabels) as FontDisplay[]).map((key) => (
              <button
                key={key}
                onClick={() => setFontDisplay(key)}
                className={`px-3 py-2 text-xs rounded transition-colors text-left ${
                  fontDisplay === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                <div className="font-mono font-bold">{fontDisplayLabels[key]}</div>
                <div className="text-[9px] opacity-80 mt-0.5 leading-tight">
                  {key}
                </div>
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground p-3 bg-muted/30 dark:bg-muted/20 rounded border border-border/50">
            {fontDisplayDescriptions[fontDisplay]}
          </div>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="space-y-2">
        <label className="text-sm font-medium">font-display 加载时间线</label>
        <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-4">
          <div className="flex items-center gap-2">
            {getTimeline().map((segment, index) => (
              <div key={index} className="flex-1">
                <div className={`${segment.color} h-8 rounded flex items-center justify-center`}>
                  <span className="text-xs font-medium text-white">{segment.phase}</span>
                </div>
                <div className="text-[10px] text-center text-muted-foreground mt-1">
                  {segment.duration}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="inline-block w-3 h-3 bg-red-500 rounded mt-0.5" />
              <span>阻塞期：显示不可见文本</span>
            </div>
            <div className="flex items-start gap-2 mt-1">
              <span className="inline-block w-3 h-3 bg-green-500 rounded mt-0.5" />
              <span>交换期：字体加载后替换</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 @font-face CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateFontFaceCSS()}
        </pre>
      </div>
    </div>
  );
}
