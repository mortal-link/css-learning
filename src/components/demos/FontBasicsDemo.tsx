'use client';

import { useState } from 'react';

type FontFamily = 'serif' | 'sans-serif' | 'monospace' | 'cursive';

const fontFamilyMap: Record<FontFamily, string> = {
  'serif': 'Georgia, serif',
  'sans-serif': 'Arial, sans-serif',
  'monospace': '"Courier New", monospace',
  'cursive': 'cursive',
};

const fontFamilyLabels: Record<FontFamily, string> = {
  'serif': '衬线体',
  'sans-serif': '无衬线体',
  'monospace': '等宽字体',
  'cursive': '手写体',
};

const terms = [
  { name: 'cap-height', label: '大写字母高度', color: 'text-red-500', top: '15%' },
  { name: 'x-height', label: 'x 字高', color: 'text-blue-500', top: '40%' },
  { name: 'baseline', label: '基线', color: 'text-green-600', top: '68%' },
  { name: 'ascender', label: '上伸部', color: 'text-purple-500', top: '8%' },
  { name: 'descender', label: '下伸部', color: 'text-orange-500', top: '78%' },
];

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-16 text-right font-mono">
        {value}px
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

export function FontBasicsDemo() {
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const [fontSize, setFontSize] = useState(80);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        {/* Font Family Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">字体类型</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(fontFamilyMap) as FontFamily[]).map((key) => (
              <button
                key={key}
                onClick={() => setFontFamily(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  fontFamily === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {fontFamilyLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="space-y-2">
          <Slider
            label="字体大小"
            value={fontSize}
            onChange={setFontSize}
            min={40}
            max={120}
            step={5}
          />
        </div>
      </div>

      {/* Visual Display with Annotations */}
      <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-8 overflow-x-auto">
        <div className="relative inline-block min-w-full">
          <div
            className="text-foreground font-bold transition-all duration-300 relative"
            style={{
              fontFamily: fontFamilyMap[fontFamily],
              fontSize: `${fontSize}px`,
              lineHeight: '1.5',
            }}
          >
            <span className="relative inline-block">
              Typography
            </span>
          </div>

          {/* Annotation Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Ascender line */}
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-purple-500 dark:border-purple-400" style={{ top: '8%' }}>
              <span className="absolute right-0 text-[10px] text-purple-500 dark:text-purple-400 bg-background px-1 -top-2">
                ascender
              </span>
            </div>

            {/* Cap height line */}
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-red-500 dark:border-red-400" style={{ top: '15%' }}>
              <span className="absolute right-0 text-[10px] text-red-500 dark:text-red-400 bg-background px-1 -top-2">
                cap-height
              </span>
            </div>

            {/* X-height line */}
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-blue-500 dark:border-blue-400" style={{ top: '40%' }}>
              <span className="absolute right-0 text-[10px] text-blue-500 dark:text-blue-400 bg-background px-1 -top-2">
                x-height
              </span>
            </div>

            {/* Baseline */}
            <div className="absolute left-0 right-0 border-t-2 border-solid border-green-600 dark:border-green-500" style={{ top: '68%' }}>
              <span className="absolute right-0 text-[10px] text-green-600 dark:text-green-500 bg-background px-1 -top-2 font-bold">
                baseline
              </span>
            </div>

            {/* Descender line */}
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-orange-500 dark:border-orange-400" style={{ top: '78%' }}>
              <span className="absolute right-0 text-[10px] text-orange-500 dark:text-orange-400 bg-background px-1 -top-2">
                descender
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Term Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { term: 'baseline', label: '基线 (Baseline)', desc: '字母坐落的基准线，大多数字母底部对齐于此。' },
          { term: 'x-height', label: 'x 字高 (X-height)', desc: '小写字母 x 的高度，不包括上伸部和下伸部。' },
          { term: 'cap-height', label: '大写字母高度 (Cap-height)', desc: '大写字母从基线到顶部的高度。' },
          { term: 'ascender', label: '上伸部 (Ascender)', desc: '小写字母中超出 x 字高的部分，如 b, d, h。' },
          { term: 'descender', label: '下伸部 (Descender)', desc: '字母中低于基线的部分，如 g, p, y。' },
        ].map((item) => (
          <div
            key={item.term}
            className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-3 space-y-1"
          >
            <div className="font-mono text-xs font-bold text-primary">{item.term}</div>
            <div className="text-sm font-medium">{item.label}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">字体排版基础</div>
        <div className="text-xs text-foreground leading-relaxed">
          <p>字体排版学（Typography）涉及多个关键概念。基线（baseline）是所有字母对齐的基准线。
          x 字高（x-height）决定了小写字母的视觉大小。大写字母高度（cap-height）定义了大写字母的高度。
          上伸部（ascender）和下伸部（descender）分别指字母超出 x 字高和基线的部分。</p>
        </div>
      </div>
    </div>
  );
}
