'use client';

import { useState } from 'react';

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
        {value}
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

export function VariableFontDemo() {
  const [wght, setWght] = useState(400);
  const [wdth, setWdth] = useState(100);
  const [ital, setItal] = useState(0);
  const [slnt, setSlnt] = useState(0);

  const applyPreset = (preset: 'thin' | 'normal' | 'bold' | 'wide' | 'italic') => {
    switch (preset) {
      case 'thin':
        setWght(200);
        setWdth(100);
        setItal(0);
        setSlnt(0);
        break;
      case 'normal':
        setWght(400);
        setWdth(100);
        setItal(0);
        setSlnt(0);
        break;
      case 'bold':
        setWght(700);
        setWdth(100);
        setItal(0);
        setSlnt(0);
        break;
      case 'wide':
        setWght(400);
        setWdth(150);
        setItal(0);
        setSlnt(0);
        break;
      case 'italic':
        setWght(400);
        setWdth(100);
        setItal(1);
        setSlnt(-12);
        break;
    }
  };

  const fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}, 'slnt' ${slnt}`;

  const textStyle: React.CSSProperties = {
    fontVariationSettings: fontVariationSettings,
    fontWeight: wght,
    fontStretch: `${wdth}%`,
  };

  const generateCSS = () => {
    const parts: string[] = [];

    // font-variation-settings (low-level)
    parts.push(`/* 低级语法（font-variation-settings）*/`);
    parts.push(`font-variation-settings: ${fontVariationSettings};`);

    parts.push(``);

    // High-level properties
    parts.push(`/* 高级属性（推荐使用）*/`);
    parts.push(`font-weight: ${wght};`);
    parts.push(`font-stretch: ${wdth}%;`);
    if (slnt !== 0) {
      parts.push(`font-style: oblique ${Math.abs(slnt)}deg;`);
    }

    return parts.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-8 flex items-center justify-center overflow-x-auto">
        <p
          className="text-4xl font-medium text-foreground transition-all duration-300 whitespace-nowrap"
          style={textStyle}
        >
          Variable Fonts 可变字体
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('thin')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          极细
        </button>
        <button
          onClick={() => applyPreset('normal')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          标准
        </button>
        <button
          onClick={() => applyPreset('bold')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          粗黑
        </button>
        <button
          onClick={() => applyPreset('wide')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          宽体
        </button>
        <button
          onClick={() => applyPreset('italic')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          斜体
        </button>
      </div>

      {/* Variable Font Axes Controls */}
      <div className="space-y-4">
        <div className="text-sm font-medium mb-2">可变字体轴（Variable Font Axes）</div>

        {/* Weight Axis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">wght（字重）</span>
            <span className="text-xs font-mono bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
              100-900
            </span>
          </div>
          <Slider
            label="字重"
            value={wght}
            onChange={setWght}
            min={100}
            max={900}
            step={1}
          />
        </div>

        {/* Width Axis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">wdth（宽度）</span>
            <span className="text-xs font-mono bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
              50-200
            </span>
          </div>
          <Slider
            label="宽度"
            value={wdth}
            onChange={setWdth}
            min={50}
            max={200}
            step={1}
          />
        </div>

        {/* Italic Axis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">ital（斜体）</span>
            <span className="text-xs font-mono bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
              0-1
            </span>
          </div>
          <Slider
            label="斜体"
            value={ital}
            onChange={setItal}
            min={0}
            max={1}
            step={0.1}
          />
        </div>

        {/* Slant Axis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">slnt（倾斜角度）</span>
            <span className="text-xs font-mono bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
              -15 to 0
            </span>
          </div>
          <Slider
            label="倾斜角度"
            value={slnt}
            onChange={setSlnt}
            min={-15}
            max={0}
            step={1}
          />
        </div>
      </div>

      {/* Axis Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { axis: 'wght', name: '字重', desc: '控制字体的粗细程度，从极细（100）到极粗（900）。' },
          { axis: 'wdth', name: '宽度', desc: '控制字体的宽窄比例，从紧缩（50）到扩展（200）。' },
          { axis: 'ital', name: '斜体', desc: '控制是否使用真斜体，0 为正常，1 为斜体。' },
          { axis: 'slnt', name: '倾斜', desc: '控制字体的倾斜角度，通常为负值（向右倾斜）。' },
        ].map((item) => (
          <div
            key={item.axis}
            className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-3 space-y-1"
          >
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono font-bold text-primary">{item.axis}</code>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateCSS()}
        </pre>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10 p-4">
        <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
          💡 关于可变字体
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
          <p>
            可变字体（Variable Fonts）允许一个字体文件包含多个变体（字重、宽度、斜体等），
            通过调整轴参数即可实现不同的样式效果。
          </p>
          <p className="mt-2">
            推荐使用高级属性（font-weight、font-stretch）而非 font-variation-settings，
            因为高级属性语义更清晰且更易维护。
          </p>
        </div>
      </div>
    </div>
  );
}
