'use client';

import { useState } from 'react';

type ShapeType = 'circle' | 'ellipse' | 'inset' | 'polygon';
type PolygonPreset = 'triangle' | 'pentagon' | 'star' | 'arrow' | 'hexagon';

export function ClipPathDemo() {
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const [circleRadius, setCircleRadius] = useState(50);
  const [circlePosX, setCirclePosX] = useState(50);
  const [circlePosY, setCirclePosY] = useState(50);
  const [ellipseRx, setEllipseRx] = useState(50);
  const [ellipseRy, setEllipseRy] = useState(35);
  const [ellipsePosX, setEllipsePosX] = useState(50);
  const [ellipsePosY, setEllipsePosY] = useState(50);
  const [insetTop, setInsetTop] = useState(10);
  const [insetRight, setInsetRight] = useState(10);
  const [insetBottom, setInsetBottom] = useState(10);
  const [insetLeft, setInsetLeft] = useState(10);
  const [insetRound, setInsetRound] = useState(0);
  const [polygonPreset, setPolygonPreset] = useState<PolygonPreset>('triangle');

  const getPolygonPath = (preset: PolygonPreset): string => {
    const polygons: Record<PolygonPreset, string> = {
      triangle: '50% 0%, 0% 100%, 100% 100%',
      pentagon: '50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%',
      star: '50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%',
      arrow: '40% 0%, 40% 20%, 100% 20%, 100% 30%, 40% 30%, 40% 100%, 0% 50%',
      hexagon: '25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%',
    };
    return polygons[preset];
  };

  const getClipPath = (): string => {
    switch (shapeType) {
      case 'circle':
        return `circle(${circleRadius}% at ${circlePosX}% ${circlePosY}%)`;
      case 'ellipse':
        return `ellipse(${ellipseRx}% ${ellipseRy}% at ${ellipsePosX}% ${ellipsePosY}%)`;
      case 'inset':
        return insetRound > 0
          ? `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}% round ${insetRound}%)`
          : `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%)`;
      case 'polygon':
        return `polygon(${getPolygonPath(polygonPreset)})`;
      default:
        return 'none';
    }
  };

  const applyPreset = (
    shape: ShapeType,
    preset?: PolygonPreset,
    params?: Record<string, number>
  ) => {
    setShapeType(shape);
    if (preset) setPolygonPreset(preset);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        switch (key) {
          case 'circleRadius':
            setCircleRadius(value);
            break;
          case 'ellipseRx':
            setEllipseRx(value);
            break;
          case 'ellipseRy':
            setEllipseRy(value);
            break;
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden bg-muted">
        <div className="relative h-80 flex items-center justify-center p-8">
          <div
            className="w-full max-w-md aspect-square transition-all duration-300"
            style={{
              clipPath: getClipPath(),
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            }}
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('circle', undefined, { circleRadius: 50 })}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          圆形
        </button>
        <button
          onClick={() => applyPreset('ellipse', undefined, { ellipseRx: 50, ellipseRy: 35 })}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          椭圆
        </button>
        <button
          onClick={() => applyPreset('polygon', 'triangle')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          三角形
        </button>
        <button
          onClick={() => applyPreset('polygon', 'star')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          星形
        </button>
        <button
          onClick={() => applyPreset('polygon', 'arrow')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          箭头
        </button>
        <button
          onClick={() => applyPreset('circle', undefined, { circleRadius: 50 })}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Shape Type Selector */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">形状类型</label>
        <div className="flex flex-wrap gap-2">
          {(['circle', 'ellipse', 'inset', 'polygon'] as ShapeType[]).map((type) => (
            <button
              key={type}
              onClick={() => setShapeType(type)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                shapeType === type
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Shape-specific Controls */}
      <div className="space-y-4">
        {shapeType === 'circle' && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {circleRadius}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={circleRadius}
                onChange={(e) => setCircleRadius(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">半径</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {circlePosX}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={circlePosX}
                onChange={(e) => setCirclePosX(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">位置 X</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {circlePosY}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={circlePosY}
                onChange={(e) => setCirclePosY(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">位置 Y</span>
            </div>
          </>
        )}

        {shapeType === 'ellipse' && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {ellipseRx}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={ellipseRx}
                onChange={(e) => setEllipseRx(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">水平半径</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {ellipseRy}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={ellipseRy}
                onChange={(e) => setEllipseRy(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">垂直半径</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {ellipsePosX}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={ellipsePosX}
                onChange={(e) => setEllipsePosX(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">位置 X</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {ellipsePosY}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={ellipsePosY}
                onChange={(e) => setEllipsePosY(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">位置 Y</span>
            </div>
          </>
        )}

        {shapeType === 'inset' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                  {insetTop}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={insetTop}
                  onChange={(e) => setInsetTop(Number(e.target.value))}
                  className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
                />
                <span className="text-xs w-16 text-muted-foreground">上</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                  {insetRight}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={insetRight}
                  onChange={(e) => setInsetRight(Number(e.target.value))}
                  className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
                />
                <span className="text-xs w-16 text-muted-foreground">右</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                  {insetBottom}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={insetBottom}
                  onChange={(e) => setInsetBottom(Number(e.target.value))}
                  className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
                />
                <span className="text-xs w-16 text-muted-foreground">下</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                  {insetLeft}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={insetLeft}
                  onChange={(e) => setInsetLeft(Number(e.target.value))}
                  className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
                />
                <span className="text-xs w-16 text-muted-foreground">左</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {insetRound}%
              </span>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={insetRound}
                onChange={(e) => setInsetRound(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">圆角</span>
            </div>
          </>
        )}

        {shapeType === 'polygon' && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">多边形预设</label>
            <div className="flex flex-wrap gap-2">
              {(['triangle', 'pentagon', 'hexagon', 'star', 'arrow'] as PolygonPreset[]).map(
                (preset) => (
                  <button
                    key={preset}
                    onClick={() => setPolygonPreset(preset)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      polygonPreset === preset
                        ? 'bg-purple-500 text-white dark:bg-purple-600'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {preset}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <code className="text-sm font-mono text-foreground break-all">
          clip-path: {getClipPath()};
        </code>
      </div>
    </div>
  );
}
