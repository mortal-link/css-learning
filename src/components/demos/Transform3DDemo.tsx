'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

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
        className="flex-1 h-1.5 accent-current"
      />
      <span className="text-xs w-20 truncate">{label}</span>
    </div>
  );
}

export function Transform3DDemo() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);
  const [perspective, setPerspective] = useState(800);
  const [translateZ, setTranslateZ] = useState(0);
  const [perspectiveOriginX, setPerspectiveOriginX] = useState(50);
  const [perspectiveOriginY, setPerspectiveOriginY] = useState(50);
  const [preserveStyle, setPreserveStyle] = useState(true);
  const [backfaceVisible, setBackfaceVisible] = useState(true);

  const applyPreset = (preset: 'default' | 'flip' | 'cube' | 'tilt' | 'flip-page') => {
    switch (preset) {
      case 'default':
        setRotateX(0);
        setRotateY(0);
        setRotateZ(0);
        setPerspective(800);
        setTranslateZ(0);
        setPerspectiveOriginX(50);
        setPerspectiveOriginY(50);
        setPreserveStyle(true);
        setBackfaceVisible(true);
        break;
      case 'flip':
        setRotateX(0);
        setRotateY(180);
        setRotateZ(0);
        setPerspective(1000);
        setTranslateZ(0);
        setPerspectiveOriginX(50);
        setPerspectiveOriginY(50);
        setPreserveStyle(true);
        setBackfaceVisible(false);
        break;
      case 'cube':
        setRotateX(30);
        setRotateY(45);
        setRotateZ(0);
        setPerspective(1200);
        setTranslateZ(0);
        setPerspectiveOriginX(50);
        setPerspectiveOriginY(50);
        setPreserveStyle(true);
        setBackfaceVisible(true);
        break;
      case 'tilt':
        setRotateX(60);
        setRotateY(0);
        setRotateZ(0);
        setPerspective(600);
        setTranslateZ(-50);
        setPerspectiveOriginX(50);
        setPerspectiveOriginY(0);
        setPreserveStyle(true);
        setBackfaceVisible(true);
        break;
      case 'flip-page':
        setRotateX(0);
        setRotateY(120);
        setRotateZ(0);
        setPerspective(1500);
        setTranslateZ(0);
        setPerspectiveOriginX(0);
        setPerspectiveOriginY(50);
        setPreserveStyle(true);
        setBackfaceVisible(true);
        break;
    }
  };

  const transformString = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px)`;

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
          onClick={() => applyPreset('flip')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          翻转卡片
        </button>
        <button
          onClick={() => applyPreset('cube')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          旋转立方
        </button>
        <button
          onClick={() => applyPreset('tilt')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          倾斜视角
        </button>
        <button
          onClick={() => applyPreset('flip-page')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          3D翻页
        </button>
      </div>

      {/* Visual Container */}
      <div className="flex justify-center items-center p-8 bg-muted/20 dark:bg-muted/10 rounded-lg overflow-hidden">
        <div
          className="relative w-[300px] h-[300px] flex items-center justify-center"
          style={{
            perspective: `${perspective}px`,
            perspectiveOrigin: `${perspectiveOriginX}% ${perspectiveOriginY}%`,
          }}
        >
          <div
            className="w-[150px] h-[200px] relative"
            style={{
              transformStyle: preserveStyle ? 'preserve-3d' : 'flat',
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-lg shadow-xl flex items-center justify-center text-white text-2xl font-bold"
              style={{
                transform: transformString,
                backfaceVisibility: backfaceVisible ? 'visible' : 'hidden',
              }}
            >
              <div className="text-center">
                <div>CSS</div>
                <div className="text-sm font-normal mt-1">3D</div>
              </div>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-lg shadow-xl flex items-center justify-center text-white text-2xl font-bold"
              style={{
                transform: `${transformString} rotateY(180deg)`,
                backfaceVisibility: backfaceVisible ? 'visible' : 'hidden',
              }}
            >
              <div className="text-center">
                <div>背面</div>
                <div className="text-sm font-normal mt-1">BACK</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Rotation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
              3D 旋转
            </Badge>
          </div>
          <Slider
            label="X 轴旋转"
            value={rotateX}
            onChange={setRotateX}
            min={0}
            max={360}
            unit="°"
          />
          <Slider
            label="Y 轴旋转"
            value={rotateY}
            onChange={setRotateY}
            min={0}
            max={360}
            unit="°"
          />
          <Slider
            label="Z 轴旋转"
            value={rotateZ}
            onChange={setRotateZ}
            min={0}
            max={360}
            unit="°"
          />
        </div>

        {/* Perspective */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
              透视
            </Badge>
          </div>
          <Slider
            label="透视距离"
            value={perspective}
            onChange={setPerspective}
            min={100}
            max={2000}
            step={50}
            unit="px"
          />
          <Slider
            label="Z 轴位移"
            value={translateZ}
            onChange={setTranslateZ}
            min={-200}
            max={200}
            step={10}
            unit="px"
          />
        </div>

        {/* Perspective Origin */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
              透视原点
            </Badge>
          </div>
          <Slider
            label="X 轴位置"
            value={perspectiveOriginX}
            onChange={setPerspectiveOriginX}
            min={0}
            max={100}
            unit="%"
          />
          <Slider
            label="Y 轴位置"
            value={perspectiveOriginY}
            onChange={setPerspectiveOriginY}
            min={0}
            max={100}
            unit="%"
          />
        </div>

        {/* Transform Style & Backface */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30">
              3D 属性
            </Badge>
          </div>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={preserveStyle}
                onChange={(e) => setPreserveStyle(e.target.checked)}
                className="rounded"
              />
              <span className="text-muted-foreground">preserve-3d</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={backfaceVisible}
                onChange={(e) => setBackfaceVisible(e.target.checked)}
                className="rounded"
              />
              <span className="text-muted-foreground">显示背面</span>
            </label>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">生成的 CSS 代码</div>
        <pre className="bg-muted/50 dark:bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code>{`.container {
  perspective: ${perspective}px;
  perspective-origin: ${perspectiveOriginX}% ${perspectiveOriginY}%;
}

.element {
  transform: ${transformString};
  transform-style: ${preserveStyle ? 'preserve-3d' : 'flat'};
  backface-visibility: ${backfaceVisible ? 'visible' : 'hidden'};
}`}</code>
        </pre>
      </div>
    </div>
  );
}
