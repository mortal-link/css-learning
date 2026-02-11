'use client';

import { useState } from 'react';

type ShapeType = 'circle' | 'ellipse' | 'polygon' | 'inset';

export function CSSShapeDemo() {
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const [circleRadius, setCircleRadius] = useState(50);
  const [ellipseRx, setEllipseRx] = useState(50);
  const [ellipseRy, setEllipseRy] = useState(40);
  const [polygonPoints, setPolygonPoints] = useState('0 0, 100% 0, 100% 100%');
  const [insetTop, setInsetTop] = useState(20);
  const [insetRight, setInsetRight] = useState(20);
  const [insetBottom, setInsetBottom] = useState(20);
  const [insetLeft, setInsetLeft] = useState(20);
  const [shapeMargin, setShapeMargin] = useState(20);

  const getShapeOutside = (): string => {
    switch (shapeType) {
      case 'circle':
        return `circle(${circleRadius}%)`;
      case 'ellipse':
        return `ellipse(${ellipseRx}% ${ellipseRy}%)`;
      case 'polygon':
        return `polygon(${polygonPoints})`;
      case 'inset':
        return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%)`;
      default:
        return 'none';
    }
  };

  const applyPreset = (type: ShapeType, preset?: string) => {
    setShapeType(type);
    switch (preset) {
      case 'circle':
        setCircleRadius(50);
        setShapeMargin(20);
        break;
      case 'ellipse':
        setEllipseRx(50);
        setEllipseRy(40);
        setShapeMargin(20);
        break;
      case 'triangle':
        setPolygonPoints('0 0, 100% 0, 100% 100%');
        setShapeMargin(15);
        break;
      case 'hexagon':
        setPolygonPoints('0 50%, 25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%');
        setShapeMargin(20);
        break;
      case 'arrow':
        setPolygonPoints('0 0, 75% 0, 100% 50%, 75% 100%, 0 100%');
        setShapeMargin(15);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden bg-muted">
        <div className="relative p-8">
          <div
            className="float-left w-48 h-48 mr-6 mb-4 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 transition-all duration-300"
            style={{
              shapeOutside: getShapeOutside(),
              shapeMargin: `${shapeMargin}px`,
              clipPath: getShapeOutside(),
            }}
          />
          <p className="text-sm leading-relaxed text-foreground">
            CSS Shapes 允许你定义非矩形的形状，让文本能够环绕这些形状流动。shape-outside
            属性用于定义浮动元素的形状，使得行内内容可以围绕该形状进行排列。这是一个强大的特性，可以创建更加有趣和动态的页面布局。
            你可以使用 circle()、ellipse()、polygon() 和 inset()
            等函数来定义各种形状。配合
            shape-margin 属性，可以控制文本与形状边缘之间的间距，从而实现更精细的布局控制。
            在现代网页设计中，CSS Shapes 为设计师提供了更大的创作自由度，使得页面布局不再局限于传统的矩形盒模型。
            通过合理运用这一特性，可以创造出更具视觉吸引力的网页效果。
          </p>
          <div className="clear-both"></div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('circle', 'circle')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          圆形环绕
        </button>
        <button
          onClick={() => applyPreset('ellipse', 'ellipse')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          椭圆环绕
        </button>
        <button
          onClick={() => {
            setShapeType('polygon');
            applyPreset('polygon', 'triangle');
          }}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          三角形
        </button>
        <button
          onClick={() => {
            setShapeType('polygon');
            applyPreset('polygon', 'hexagon');
          }}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          六边形
        </button>
        <button
          onClick={() => {
            setShapeType('polygon');
            applyPreset('polygon', 'arrow');
          }}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          箭头
        </button>
        <button
          onClick={() => applyPreset('circle', 'circle')}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Shape Type Selector */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">形状类型</label>
          <div className="flex flex-wrap gap-2">
            {(['circle', 'ellipse', 'polygon', 'inset'] as ShapeType[]).map((type) => (
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
        {shapeType === 'circle' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-12 text-right font-mono">
              {circleRadius}%
            </span>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={circleRadius}
              onChange={(e) => setCircleRadius(Number(e.target.value))}
              className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
            />
            <span className="text-xs w-20 text-muted-foreground">半径</span>
          </div>
        )}

        {shapeType === 'ellipse' && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {ellipseRx}%
              </span>
              <input
                type="range"
                min={20}
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
                min={20}
                max={100}
                step={5}
                value={ellipseRy}
                onChange={(e) => setEllipseRy(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-20 text-muted-foreground">垂直半径</span>
            </div>
          </>
        )}

        {shapeType === 'polygon' && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">多边形顶点坐标</label>
            <input
              type="text"
              value={polygonPoints}
              onChange={(e) => setPolygonPoints(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-md font-mono"
              placeholder="例如: 0 0, 100% 0, 100% 100%"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setPolygonPoints('0 0, 100% 0, 100% 100%')}
                className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              >
                三角形
              </button>
              <button
                onClick={() => setPolygonPoints('0 50%, 25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%')}
                className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              >
                六边形
              </button>
              <button
                onClick={() => setPolygonPoints('50% 0, 100% 50%, 50% 100%, 0 50%')}
                className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              >
                菱形
              </button>
            </div>
          </div>
        )}

        {shapeType === 'inset' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 text-right font-mono">
                {insetTop}%
              </span>
              <input
                type="range"
                min={0}
                max={40}
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
                max={40}
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
                max={40}
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
                max={40}
                step={5}
                value={insetLeft}
                onChange={(e) => setInsetLeft(Number(e.target.value))}
                className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
              />
              <span className="text-xs w-16 text-muted-foreground">左</span>
            </div>
          </div>
        )}

        {/* Shape Margin */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-12 text-right font-mono">
            {shapeMargin}px
          </span>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={shapeMargin}
            onChange={(e) => setShapeMargin(Number(e.target.value))}
            className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
          />
          <span className="text-xs w-20 text-muted-foreground">形状边距</span>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {`shape-outside: ${getShapeOutside()};\nshape-margin: ${shapeMargin}px;\nfloat: left;`}
        </code>
      </div>
    </div>
  );
}
