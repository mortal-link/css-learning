'use client';

import { useState } from 'react';

interface FilterState {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
  opacity: number;
}

const DEFAULT_FILTERS: FilterState = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  saturate: 100,
  sepia: 0,
  opacity: 100,
};

interface FilterSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

function FilterSlider({ label, value, onChange, min, max, step, unit }: FilterSliderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-16 text-right font-mono">
        {value}
        {unit}
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

export function FilterPlayground() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const updateFilter = (key: keyof FilterState, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: FilterState) => {
    setFilters(preset);
  };

  const generateFilterString = () => {
    const parts: string[] = [];
    if (filters.blur > 0) parts.push(`blur(${filters.blur}px)`);
    if (filters.brightness !== 100) parts.push(`brightness(${filters.brightness}%)`);
    if (filters.contrast !== 100) parts.push(`contrast(${filters.contrast}%)`);
    if (filters.grayscale > 0) parts.push(`grayscale(${filters.grayscale}%)`);
    if (filters.hueRotate > 0) parts.push(`hue-rotate(${filters.hueRotate}deg)`);
    if (filters.invert > 0) parts.push(`invert(${filters.invert}%)`);
    if (filters.saturate !== 100) parts.push(`saturate(${filters.saturate}%)`);
    if (filters.sepia > 0) parts.push(`sepia(${filters.sepia}%)`);
    if (filters.opacity !== 100) parts.push(`opacity(${filters.opacity}%)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  };

  const filterStyle = {
    filter: generateFilterString(),
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div
          className="relative h-52 flex items-center justify-center transition-all duration-300"
          style={{
            ...filterStyle,
            background: `
              linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%),
              radial-gradient(circle at 30% 50%, #4facfe 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, #00f2fe 0%, transparent 50%)
            `,
            backgroundBlendMode: 'screen, normal, normal',
          }}
        >
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-white drop-shadow-lg">CSS Filters</div>
            <div className="text-3xl">🎨 ✨ 🌈</div>
            <div className="flex gap-4 justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm"></div>
              <div className="w-12 h-12 bg-white/30 rounded-lg backdrop-blur-sm"></div>
              <div className="w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset(DEFAULT_FILTERS)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          默认
        </button>
        <button
          onClick={() => applyPreset({ ...DEFAULT_FILTERS, blur: 5 })}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          模糊
        </button>
        <button
          onClick={() => applyPreset({ ...DEFAULT_FILTERS, grayscale: 100 })}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          黑白
        </button>
        <button
          onClick={() =>
            applyPreset({ ...DEFAULT_FILTERS, sepia: 80, contrast: 120, brightness: 90 })
          }
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          复古
        </button>
        <button
          onClick={() =>
            applyPreset({ ...DEFAULT_FILTERS, hueRotate: 180, saturate: 200, brightness: 120 })
          }
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          霓虹
        </button>
        <button
          onClick={() => applyPreset(DEFAULT_FILTERS)}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FilterSlider
          label="模糊"
          value={filters.blur}
          onChange={(v) => updateFilter('blur', v)}
          min={0}
          max={20}
          step={0.5}
          unit="px"
        />
        <FilterSlider
          label="亮度"
          value={filters.brightness}
          onChange={(v) => updateFilter('brightness', v)}
          min={0}
          max={300}
          step={5}
          unit="%"
        />
        <FilterSlider
          label="对比度"
          value={filters.contrast}
          onChange={(v) => updateFilter('contrast', v)}
          min={0}
          max={300}
          step={5}
          unit="%"
        />
        <FilterSlider
          label="灰度"
          value={filters.grayscale}
          onChange={(v) => updateFilter('grayscale', v)}
          min={0}
          max={100}
          step={5}
          unit="%"
        />
        <FilterSlider
          label="色相旋转"
          value={filters.hueRotate}
          onChange={(v) => updateFilter('hueRotate', v)}
          min={0}
          max={360}
          step={5}
          unit="deg"
        />
        <FilterSlider
          label="反相"
          value={filters.invert}
          onChange={(v) => updateFilter('invert', v)}
          min={0}
          max={100}
          step={5}
          unit="%"
        />
        <FilterSlider
          label="饱和度"
          value={filters.saturate}
          onChange={(v) => updateFilter('saturate', v)}
          min={0}
          max={300}
          step={5}
          unit="%"
        />
        <FilterSlider
          label="褐色"
          value={filters.sepia}
          onChange={(v) => updateFilter('sepia', v)}
          min={0}
          max={100}
          step={5}
          unit="%"
        />
        <FilterSlider
          label="不透明度"
          value={filters.opacity}
          onChange={(v) => updateFilter('opacity', v)}
          min={0}
          max={100}
          step={5}
          unit="%"
        />
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <code className="text-sm font-mono text-foreground break-all">
          filter: {generateFilterString()};
        </code>
      </div>
    </div>
  );
}
