'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

// Slider helper component
function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = ''
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
      <span className="text-xs text-muted-foreground w-12 text-right font-mono">
        {value}{unit}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-current"
      />
      <span className="text-xs w-20 truncate">{label}</span>
    </div>
  );
}

type TransformOrigin = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const originMap: Record<TransformOrigin, string> = {
  'center': 'center center',
  'top-left': 'top left',
  'top-right': 'top right',
  'bottom-left': 'bottom left',
  'bottom-right': 'bottom right',
};

const originLabelMap: Record<TransformOrigin, string> = {
  'center': '中心',
  'top-left': '左上',
  'top-right': '右上',
  'bottom-left': '左下',
  'bottom-right': '右下',
};

export function TransformPlayground() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [origin, setOrigin] = useState<TransformOrigin>('center');

  const transformString = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale}) skew(${skewX}deg, ${skewY}deg)`;

  const applyPreset = (preset: 'default' | 'rotate' | 'scale' | 'combo') => {
    switch (preset) {
      case 'default':
        setTranslateX(0);
        setTranslateY(0);
        setRotate(0);
        setScale(1);
        setSkewX(0);
        setSkewY(0);
        setOrigin('center');
        break;
      case 'rotate':
        setTranslateX(0);
        setTranslateY(0);
        setRotate(45);
        setScale(1);
        setSkewX(0);
        setSkewY(0);
        break;
      case 'scale':
        setTranslateX(0);
        setTranslateY(0);
        setRotate(0);
        setScale(1.5);
        setSkewX(0);
        setSkewY(0);
        break;
      case 'combo':
        setTranslateX(30);
        setTranslateY(-20);
        setRotate(30);
        setScale(1.2);
        setSkewX(10);
        setSkewY(0);
        break;
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card dark:bg-card">
      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => applyPreset('default')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          默认
        </button>
        <button
          onClick={() => applyPreset('rotate')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          旋转
        </button>
        <button
          onClick={() => applyPreset('scale')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          缩放
        </button>
        <button
          onClick={() => applyPreset('combo')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          组合
        </button>
      </div>

      {/* Visual Container */}
      <div className="flex justify-center items-center p-8 bg-muted/20 dark:bg-muted/10 rounded-lg">
        <div className="relative w-[300px] h-[300px] border-2 border-dashed border-muted-foreground/30 dark:border-muted-foreground/30 flex items-center justify-center">
          {/* Ghost outline */}
          <div className="absolute w-[120px] h-[120px] border-2 border-muted-foreground/20 dark:border-muted-foreground/20 rounded bg-muted/10 dark:bg-muted/10" />

          {/* Transform target */}
          <div
            className="absolute w-[120px] h-[120px] bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded shadow-lg flex items-center justify-center text-white text-3xl font-bold transition-transform duration-300"
            style={{
              transform: transformString,
              transformOrigin: originMap[origin],
            }}
          >
            CSS
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Translate */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
              平移
            </Badge>
          </div>
          <Slider
            label="X 轴平移"
            value={translateX}
            onChange={setTranslateX}
            min={-100}
            max={100}
            unit="px"
          />
          <Slider
            label="Y 轴平移"
            value={translateY}
            onChange={setTranslateY}
            min={-100}
            max={100}
            unit="px"
          />
        </div>

        {/* Rotate */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
              旋转
            </Badge>
          </div>
          <Slider
            label="旋转角度"
            value={rotate}
            onChange={setRotate}
            min={-180}
            max={180}
            unit="°"
          />
        </div>

        {/* Scale */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
              缩放
            </Badge>
          </div>
          <Slider
            label="缩放比例"
            value={scale}
            onChange={setScale}
            min={0.1}
            max={3}
            step={0.1}
            unit="x"
          />
        </div>

        {/* Skew */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30">
              倾斜
            </Badge>
          </div>
          <Slider
            label="X 轴倾斜"
            value={skewX}
            onChange={setSkewX}
            min={-45}
            max={45}
            unit="°"
          />
          <Slider
            label="Y 轴倾斜"
            value={skewY}
            onChange={setSkewY}
            min={-45}
            max={45}
            unit="°"
          />
        </div>

        {/* Transform Origin */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-pink-500/10 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30">
              变换原点
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(originMap) as TransformOrigin[]).map((key) => (
              <button
                key={key}
                onClick={() => setOrigin(key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  origin === key
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {originLabelMap[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">生成的 CSS 代码</div>
        <pre className="bg-muted/50 dark:bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code>{`transform: ${transformString};\ntransform-origin: ${originMap[origin]};`}</code>
        </pre>
      </div>
    </div>
  );
}
