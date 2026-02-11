'use client';

import { useState } from 'react';

type TextTransformValue = 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'full-width';

const transformLabelMap: Record<TextTransformValue, string> = {
  'none': '无转换',
  'uppercase': '大写',
  'lowercase': '小写',
  'capitalize': '首字母大写',
  'full-width': '全角',
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

export function TextTransformDemo() {
  const [transform, setTransform] = useState<TextTransformValue>('none');
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [textIndent, setTextIndent] = useState(0);

  const applyPreset = (preset: 'title' | 'spacing' | 'indent') => {
    switch (preset) {
      case 'title':
        setTransform('uppercase');
        setLetterSpacing(2);
        setWordSpacing(8);
        setTextIndent(0);
        break;
      case 'spacing':
        setTransform('none');
        setLetterSpacing(5);
        setWordSpacing(15);
        setTextIndent(0);
        break;
      case 'indent':
        setTransform('none');
        setLetterSpacing(0);
        setWordSpacing(0);
        setTextIndent(32);
        break;
    }
  };

  const textStyle: React.CSSProperties = {
    textTransform: transform,
    letterSpacing: `${letterSpacing}px`,
    wordSpacing: `${wordSpacing}px`,
    textIndent: `${textIndent}px`,
  };

  const generateCSS = () => {
    const parts: string[] = [];
    if (transform !== 'none') {
      parts.push(`text-transform: ${transform};`);
    }
    if (letterSpacing !== 0) {
      parts.push(`letter-spacing: ${letterSpacing}px;`);
    }
    if (wordSpacing !== 0) {
      parts.push(`word-spacing: ${wordSpacing}px;`);
    }
    if (textIndent !== 0) {
      parts.push(`text-indent: ${textIndent}px;`);
    }
    return parts.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-6">
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-foreground transition-all duration-300" style={textStyle}>
            CSS text properties control the transformation and spacing of text content.
            文本属性控制着文字的转换和间距效果。
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground transition-all duration-300" style={textStyle}>
            This demo showcases various text transformation and spacing options available in CSS.
            本演示展示了 CSS 中各种文本转换和间距选项的效果。
          </p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('title')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          大写标题
        </button>
        <button
          onClick={() => applyPreset('spacing')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          字间距
        </button>
        <button
          onClick={() => applyPreset('indent')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark-bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          首行缩进
        </button>
        <button
          onClick={() => {
            setTransform('none');
            setLetterSpacing(0);
            setWordSpacing(0);
            setTextIndent(0);
          }}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Text Transform */}
        <div className="space-y-2">
          <label className="text-sm font-medium">文本转换</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(transformLabelMap) as TextTransformValue[]).map((key) => (
              <button
                key={key}
                onClick={() => setTransform(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  transform === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {transformLabelMap[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          <Slider
            label="字符间距"
            value={letterSpacing}
            onChange={setLetterSpacing}
            min={-5}
            max={20}
            step={0.5}
            unit="px"
          />
          <Slider
            label="单词间距"
            value={wordSpacing}
            onChange={setWordSpacing}
            min={-5}
            max={30}
            step={1}
            unit="px"
          />
          <Slider
            label="首行缩进"
            value={textIndent}
            onChange={setTextIndent}
            min={0}
            max={100}
            step={2}
            unit="px"
          />
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateCSS() || '/* 默认样式 */'}
        </pre>
      </div>
    </div>
  );
}
