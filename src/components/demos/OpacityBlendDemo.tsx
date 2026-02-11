'use client';

import { useState } from 'react';

type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

export function OpacityBlendDemo() {
  const [opacity, setOpacity] = useState(0.75);
  const [blendMode, setBlendMode] = useState<BlendMode>('normal');
  const [topColor, setTopColor] = useState('#667eea');
  const [bottomColor, setBottomColor] = useState('#f093fb');

  const colorPresets = [
    { name: '蓝色', value: '#667eea' },
    { name: '紫色', value: '#764ba2' },
    { name: '粉色', value: '#f093fb' },
    { name: '红色', value: '#ff6b6b' },
    { name: '橙色', value: '#ff8c42' },
    { name: '黄色', value: '#ffd93d' },
    { name: '绿色', value: '#6bcf7f' },
    { name: '青色', value: '#4facfe' },
  ];

  const applyPreset = (mode: BlendMode, op: number, top: string, bottom: string) => {
    setBlendMode(mode);
    setOpacity(op);
    setTopColor(top);
    setBottomColor(bottom);
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden bg-muted">
        <div className="relative h-80 flex items-center justify-center">
          {/* Bottom Layer */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: bottomColor }}
          >
            <div className="text-white text-2xl font-bold drop-shadow-lg">底层元素</div>
          </div>

          {/* Top Layer with Blend Mode */}
          <div
            className="absolute inset-12 flex items-center justify-center rounded-lg transition-all duration-300"
            style={{
              backgroundColor: topColor,
              opacity,
              mixBlendMode: blendMode,
            }}
          >
            <div className="text-white text-2xl font-bold drop-shadow-lg">顶层元素</div>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('multiply', 0.8, '#667eea', '#f093fb')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          正片叠底
        </button>
        <button
          onClick={() => applyPreset('screen', 0.8, '#667eea', '#f093fb')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          滤色
        </button>
        <button
          onClick={() => applyPreset('overlay', 0.8, '#667eea', '#f093fb')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          叠加
        </button>
        <button
          onClick={() => applyPreset('difference', 0.9, '#ff6b6b', '#4facfe')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          差值
        </button>
        <button
          onClick={() => applyPreset('hue', 0.8, '#ffd93d', '#764ba2')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          色相
        </button>
        <button
          onClick={() => applyPreset('normal', 0.75, '#667eea', '#f093fb')}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Opacity Slider */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-12 text-right font-mono">
              {opacity.toFixed(2)}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
            />
            <span className="text-xs w-20 text-muted-foreground">不透明度</span>
          </div>
        </div>

        {/* Blend Mode Selector */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">混合模式</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(
              [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
              ] as BlendMode[]
            ).map((mode) => (
              <button
                key={mode}
                onClick={() => setBlendMode(mode)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  blendMode === mode
                    ? 'bg-purple-500 text-white dark:bg-purple-600'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">顶层颜色</label>
            <div className="flex gap-2 mb-2">
              <input
                type="color"
                value={topColor}
                onChange={(e) => setTopColor(e.target.value)}
                className="w-12 h-12 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={topColor}
                onChange={(e) => setTopColor(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-secondary border border-border rounded-md font-mono"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setTopColor(preset.value)}
                  className="w-8 h-8 rounded-md border-2 border-border hover:border-purple-500 transition-colors"
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">底层颜色</label>
            <div className="flex gap-2 mb-2">
              <input
                type="color"
                value={bottomColor}
                onChange={(e) => setBottomColor(e.target.value)}
                className="w-12 h-12 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={bottomColor}
                onChange={(e) => setBottomColor(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-secondary border border-border rounded-md font-mono"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setBottomColor(preset.value)}
                  className="w-8 h-8 rounded-md border-2 border-border hover:border-purple-500 transition-colors"
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {`opacity: ${opacity.toFixed(2)};\nmix-blend-mode: ${blendMode};`}
        </code>
      </div>
    </div>
  );
}
