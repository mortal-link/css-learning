'use client';

import { useState } from 'react';

type MaskType = 'linear-gradient' | 'radial-gradient' | 'circle' | 'ellipse';
type MaskRepeat = 'repeat' | 'no-repeat' | 'space' | 'round';

export function MaskDemo() {
  const [maskType, setMaskType] = useState<MaskType>('linear-gradient');
  const [maskSize, setMaskSize] = useState(100);
  const [maskPositionX, setMaskPositionX] = useState(50);
  const [maskPositionY, setMaskPositionY] = useState(50);
  const [maskRepeat, setMaskRepeat] = useState<MaskRepeat>('no-repeat');

  const getMaskImage = (): string => {
    switch (maskType) {
      case 'linear-gradient':
        return 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
      case 'radial-gradient':
        return 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)';
      case 'circle':
        return 'radial-gradient(circle, black 40%, transparent 50%)';
      case 'ellipse':
        return 'radial-gradient(ellipse, black 40%, transparent 50%)';
      default:
        return 'none';
    }
  };

  const applyPreset = (type: MaskType, size?: number, repeat?: MaskRepeat) => {
    setMaskType(type);
    if (size !== undefined) setMaskSize(size);
    if (repeat !== undefined) setMaskRepeat(repeat);
  };

  const maskStyle = {
    WebkitMaskImage: getMaskImage(),
    maskImage: getMaskImage(),
    WebkitMaskSize: `${maskSize}%`,
    maskSize: `${maskSize}%`,
    WebkitMaskPosition: `${maskPositionX}% ${maskPositionY}%`,
    maskPosition: `${maskPositionX}% ${maskPositionY}%`,
    WebkitMaskRepeat: maskRepeat,
    maskRepeat: maskRepeat,
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden bg-muted">
        <div className="relative h-80 flex items-center justify-center p-8">
          <div
            className="w-full max-w-md aspect-square transition-all duration-300"
            style={{
              ...maskStyle,
              background:
                'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
            }}
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('linear-gradient', 100, 'no-repeat')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          渐变遮罩
        </button>
        <button
          onClick={() => applyPreset('radial-gradient', 100, 'no-repeat')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          径向渐变
        </button>
        <button
          onClick={() => applyPreset('circle', 100, 'no-repeat')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          圆形遮罩
        </button>
        <button
          onClick={() => applyPreset('circle', 30, 'repeat')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          重复圆点
        </button>
        <button
          onClick={() => applyPreset('ellipse', 80, 'no-repeat')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          椭圆遮罩
        </button>
        <button
          onClick={() => applyPreset('linear-gradient', 100, 'no-repeat')}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Mask Type Selector */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">遮罩类型</label>
          <div className="flex flex-wrap gap-2">
            {(['linear-gradient', 'radial-gradient', 'circle', 'ellipse'] as MaskType[]).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setMaskType(type)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    maskType === type
                      ? 'bg-purple-500 text-white dark:bg-purple-600'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>

        {/* Mask Size */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-12 text-right font-mono">
              {maskSize}%
            </span>
            <input
              type="range"
              min={10}
              max={200}
              step={5}
              value={maskSize}
              onChange={(e) => setMaskSize(Number(e.target.value))}
              className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
            />
            <span className="text-xs w-20 text-muted-foreground">遮罩大小</span>
          </div>
        </div>

        {/* Mask Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-12 text-right font-mono">
              {maskPositionX}%
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={maskPositionX}
              onChange={(e) => setMaskPositionX(Number(e.target.value))}
              className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
            />
            <span className="text-xs w-20 text-muted-foreground">位置 X</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-12 text-right font-mono">
              {maskPositionY}%
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={maskPositionY}
              onChange={(e) => setMaskPositionY(Number(e.target.value))}
              className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
            />
            <span className="text-xs w-20 text-muted-foreground">位置 Y</span>
          </div>
        </div>

        {/* Mask Repeat */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">重复方式</label>
          <div className="flex flex-wrap gap-2">
            {(['repeat', 'no-repeat', 'space', 'round'] as MaskRepeat[]).map((repeat) => (
              <button
                key={repeat}
                onClick={() => setMaskRepeat(repeat)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  maskRepeat === repeat
                    ? 'bg-purple-500 text-white dark:bg-purple-600'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {repeat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {`-webkit-mask-image: ${getMaskImage()};\nmask-image: ${getMaskImage()};\n-webkit-mask-size: ${maskSize}%;\nmask-size: ${maskSize}%;\n-webkit-mask-position: ${maskPositionX}% ${maskPositionY}%;\nmask-position: ${maskPositionX}% ${maskPositionY}%;\n-webkit-mask-repeat: ${maskRepeat};\nmask-repeat: ${maskRepeat};`}
        </code>
      </div>
    </div>
  );
}
