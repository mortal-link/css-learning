'use client';

import { useState } from 'react';

type WritingModeValue = 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | 'sideways-rl' | 'sideways-lr';
type TextOrientationValue = 'mixed' | 'upright' | 'sideways';
type DirectionValue = 'ltr' | 'rtl';

const writingModeLabels: Record<WritingModeValue, string> = {
  'horizontal-tb': '横向（从上到下）',
  'vertical-rl': '竖向（从右到左）',
  'vertical-lr': '竖向（从左到右）',
  'sideways-rl': '侧向（从右到左）',
  'sideways-lr': '侧向（从左到右）',
};

const orientationLabels: Record<TextOrientationValue, string> = {
  'mixed': '混合',
  'upright': '直立',
  'sideways': '侧向',
};

const directionLabels: Record<DirectionValue, string> = {
  'ltr': '从左到右',
  'rtl': '从右到左',
};

export function WritingModeDemo() {
  const [writingMode, setWritingMode] = useState<WritingModeValue>('horizontal-tb');
  const [textOrientation, setTextOrientation] = useState<TextOrientationValue>('mixed');
  const [direction, setDirection] = useState<DirectionValue>('ltr');

  const applyPreset = (preset: 'english' | 'chinese' | 'japanese' | 'arabic') => {
    switch (preset) {
      case 'english':
        setWritingMode('horizontal-tb');
        setTextOrientation('mixed');
        setDirection('ltr');
        break;
      case 'chinese':
        setWritingMode('vertical-rl');
        setTextOrientation('upright');
        setDirection('ltr');
        break;
      case 'japanese':
        setWritingMode('vertical-rl');
        setTextOrientation('mixed');
        setDirection('ltr');
        break;
      case 'arabic':
        setWritingMode('horizontal-tb');
        setTextOrientation('mixed');
        setDirection('rtl');
        break;
    }
  };

  const textStyle: React.CSSProperties = {
    writingMode: writingMode,
    textOrientation: textOrientation,
    direction: direction,
  };

  // Generate flow direction indicator
  const getFlowArrow = () => {
    if (writingMode === 'horizontal-tb') {
      return direction === 'ltr' ? '→' : '←';
    } else if (writingMode.includes('vertical-rl') || writingMode === 'sideways-rl') {
      return '↓';
    } else {
      return '↓';
    }
  };

  const generateCSS = () => {
    const parts: string[] = [];
    parts.push(`writing-mode: ${writingMode};`);
    if (writingMode.includes('vertical') || writingMode.includes('sideways')) {
      parts.push(`text-orientation: ${textOrientation};`);
    }
    parts.push(`direction: ${direction};`);
    return parts.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('english')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          英文横排
        </button>
        <button
          onClick={() => applyPreset('chinese')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          中文竖排
        </button>
        <button
          onClick={() => applyPreset('japanese')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          日文竖排
        </button>
        <button
          onClick={() => applyPreset('arabic')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          阿拉伯文
        </button>
      </div>

      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-8 overflow-auto">
        <div className="flex items-start justify-center min-h-[300px]">
          <div className="relative">
            <div
              className="text-lg leading-loose text-foreground transition-all duration-500 max-w-[600px]"
              style={textStyle}
            >
              <p className="mb-4">
                CSS Writing Modes
              </p>
              <p className="mb-4">
                CSS 书写模式演示
              </p>
              <p className="mb-4">
                日本語のテキスト
              </p>
              <p>
                مرحبا بك (Arabic)
              </p>
            </div>
            {/* Flow direction indicator */}
            <div className="absolute -top-8 left-0 flex items-center gap-2 text-sm text-primary">
              <span>文字流向</span>
              <span className="text-2xl font-bold">{getFlowArrow()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Writing Mode */}
        <div className="space-y-2">
          <label className="text-sm font-medium">writing-mode（书写模式）</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(Object.keys(writingModeLabels) as WritingModeValue[]).map((key) => (
              <button
                key={key}
                onClick={() => setWritingMode(key)}
                className={`px-3 py-2 text-xs rounded transition-colors text-left ${
                  writingMode === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                <div className="font-mono">{key}</div>
                <div className="text-[10px] opacity-80 mt-1">{writingModeLabels[key]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Orientation */}
        <div className="space-y-2">
          <label className="text-sm font-medium">text-orientation（文本方向）</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(orientationLabels) as TextOrientationValue[]).map((key) => (
              <button
                key={key}
                onClick={() => setTextOrientation(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  textOrientation === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {key} ({orientationLabels[key]})
              </button>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div className="space-y-2">
          <label className="text-sm font-medium">direction（方向）</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(directionLabels) as DirectionValue[]).map((key) => (
              <button
                key={key}
                onClick={() => setDirection(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  direction === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {key} ({directionLabels[key]})
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
