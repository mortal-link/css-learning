'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type ContainingBlockType = 'relative' | 'absolute' | 'fixed'

export function AbsolutePositionDemo() {
  const [top, setTop] = useState(20)
  const [right, setRight] = useState(20)
  const [bottom, setBottom] = useState(20)
  const [left, setLeft] = useState(20)
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(80)
  const [containingBlock, setContainingBlock] = useState<ContainingBlockType>('relative')
  const [usePercentage, setUsePercentage] = useState(true)

  const getAbsoluteStyle = (): React.CSSProperties => {
    const unit = usePercentage ? '%' : 'px'
    return {
      position: 'absolute',
      top: `${top}${unit}`,
      right: `${right}${unit}`,
      bottom: `${bottom}${unit}`,
      left: `${left}${unit}`,
      width: `${width}px`,
      height: `${height}px`,
    }
  }

  const getCSSCode = () => {
    const unit = usePercentage ? '%' : 'px'
    return `.containing-block {
  position: ${containingBlock};
  /* 建立包含块 */
}

.absolute-element {
  position: absolute;
  top: ${top}${unit};
  right: ${right}${unit};
  bottom: ${bottom}${unit};
  left: ${left}${unit};
  width: ${width}px;
  height: ${height}px;
}`
  }

  const resetOffsets = () => {
    setTop(20)
    setRight(20)
    setBottom(20)
    setLeft(20)
  }

  return (
    <div className="space-y-4">
      {/* Containing Block Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">包含块 (Containing Block)</div>
        <div className="flex flex-wrap gap-2">
          {(['relative', 'absolute', 'fixed'] as ContainingBlockType[]).map((type) => (
            <button
              key={type}
              onClick={() => setContainingBlock(type)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                containingBlock === type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              position: {type}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
        <span className="text-sm font-medium">偏移单位:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setUsePercentage(true)}
            className={`px-3 py-1 text-sm rounded ${
              usePercentage
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            百分比 (%)
          </button>
          <button
            onClick={() => setUsePercentage(false)}
            className={`px-3 py-1 text-sm rounded ${
              !usePercentage
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            像素 (px)
          </button>
        </div>
        <button
          onClick={resetOffsets}
          className="ml-auto px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80"
        >
          重置偏移
        </button>
      </div>

      {/* Offset Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Top/Bottom */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">top 偏移</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {top}{usePercentage ? '%' : 'px'}
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={top}
              onChange={(e) => setTop(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">bottom 偏移</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {bottom}{usePercentage ? '%' : 'px'}
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bottom}
              onChange={(e) => setBottom(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>
        </div>

        {/* Left/Right */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">left 偏移</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {left}{usePercentage ? '%' : 'px'}
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={left}
              onChange={(e) => setLeft(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">right 偏移</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {right}{usePercentage ? '%' : 'px'}
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={right}
              onChange={(e) => setRight(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
            />
          </div>
        </div>
      </div>

      {/* Width/Height Controls */}
      <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">宽度 (width)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {width}px
              </Badge>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-orange-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">高度 (height)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {height}px
              </Badge>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-orange-900"
            />
          </div>
        </div>
      </div>

      {/* Visual Container */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化效果</div>
        <div className="relative w-full h-[400px] bg-muted/30 rounded-lg border-2 border-dashed border-border p-4">
          {/* Viewport indicator for fixed positioning */}
          {containingBlock === 'fixed' && (
            <div className="absolute inset-0 border-4 border-purple-500 dark:border-purple-400 rounded-lg pointer-events-none">
              <div className="absolute -top-6 left-2 text-xs font-medium text-purple-600 dark:text-purple-400 bg-background px-2">
                视口 (Viewport) - fixed 定位的参照
              </div>
            </div>
          )}

          {/* Containing Block */}
          <div
            className={`relative w-[80%] h-[300px] mx-auto border-2 rounded transition-colors ${
              containingBlock === 'relative'
                ? 'border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : containingBlock === 'absolute'
                ? 'border-green-500 dark:border-green-400 bg-green-50/50 dark:bg-green-950/30'
                : 'border-purple-500 dark:border-purple-400 bg-purple-50/50 dark:bg-purple-950/30'
            }`}
            style={{ position: containingBlock }}
          >
            {/* Containing Block Label */}
            <div className={`absolute -top-3 left-3 px-2 bg-background text-xs font-medium ${
              containingBlock === 'relative'
                ? 'text-blue-600 dark:text-blue-400'
                : containingBlock === 'absolute'
                ? 'text-green-600 dark:text-green-400'
                : 'text-purple-600 dark:text-purple-400'
            }`}>
              包含块 (position: {containingBlock})
            </div>

            {/* Coordinate Indicators */}
            <div className="absolute top-1 left-1 text-[10px] text-muted-foreground bg-background/80 px-1 rounded">
              0,0
            </div>
            <div className="absolute top-1 right-1 text-[10px] text-muted-foreground bg-background/80 px-1 rounded">
              100%,0
            </div>
            <div className="absolute bottom-1 left-1 text-[10px] text-muted-foreground bg-background/80 px-1 rounded">
              0,100%
            </div>
            <div className="absolute bottom-1 right-1 text-[10px] text-muted-foreground bg-background/80 px-1 rounded">
              100%,100%
            </div>

            {/* Absolutely Positioned Element */}
            <div
              style={getAbsoluteStyle()}
              className="bg-rose-500 dark:bg-rose-600 text-white rounded shadow-lg flex flex-col items-center justify-center text-xs font-medium transition-all duration-300"
            >
              <div>绝对定位</div>
              <div className="text-[10px] mt-1 opacity-90">
                {width} × {height}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
            定位规则
          </div>
          <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <li>• 相对于包含块的四个边定位</li>
            <li>• 完全脱离文档流</li>
            <li>• 不占据空间，不影响其他元素</li>
            <li>• 可使用负值偏移</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            包含块查找
          </div>
          <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
            <li>• 向上查找最近的 positioned 祖先</li>
            <li>• positioned = relative/absolute/fixed/sticky</li>
            <li>• 如无 positioned 祖先，则为初始包含块</li>
            <li>• fixed 总是相对于视口</li>
          </ul>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium">CSS 代码</div>
        <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-xs overflow-x-auto">
          <code>{getCSSCode()}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 绝对定位的元素相对于其包含块的四个边进行定位。包含块由最近的 position 不为 static 的祖先元素确定。
          如果没有这样的祖先，则相对于初始包含块（通常是视口）。同时指定对边（如 top + bottom）可以拉伸元素。
        </p>
      </div>
    </div>
  )
}
