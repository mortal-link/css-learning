'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Preset {
  name: string
  autoRows: number
  autoCols: number
  autoFlow: 'row' | 'column' | 'dense'
  itemCount: number
}

const presets: Preset[] = [
  { name: '自动行', autoRows: 80, autoCols: 100, autoFlow: 'row', itemCount: 8 },
  { name: '自动列', autoRows: 80, autoCols: 100, autoFlow: 'column', itemCount: 8 },
  { name: '密集填充', autoRows: 60, autoCols: 100, autoFlow: 'dense', itemCount: 12 },
]

export function GridAutoDemo() {
  const [autoRows, setAutoRows] = useState(80)
  const [autoCols, setAutoCols] = useState(100)
  const [autoFlow, setAutoFlow] = useState<'row' | 'column' | 'dense'>('row')
  const [itemCount, setItemCount] = useState(8)

  const handlePreset = (preset: Preset) => {
    setAutoRows(preset.autoRows)
    setAutoCols(preset.autoCols)
    setAutoFlow(preset.autoFlow)
    setItemCount(preset.itemCount)
  }

  const getCSSCode = () => {
    return `.container {
  display: grid;
  /* 显式网格: 3 列 × 2 行 */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 80px);

  /* 隐式轨道尺寸 */
  grid-auto-rows: ${autoRows}px;
  grid-auto-columns: ${autoCols}px;

  /* 自动放置算法 */
  grid-auto-flow: ${autoFlow};
  gap: 12px;
}`
  }

  // Generate items with some spanning different sizes for dense mode
  const getItemSize = (index: number) => {
    if (autoFlow === 'dense') {
      // Create varied sizes for dense packing demo
      if (index === 2) return { colSpan: 2, rowSpan: 1 }
      if (index === 5) return { colSpan: 1, rowSpan: 2 }
      if (index === 8) return { colSpan: 2, rowSpan: 2 }
    }
    return { colSpan: 1, rowSpan: 1 }
  }

  const isImplicit = (index: number) => {
    // Items beyond 6 (3 cols × 2 rows) are in implicit grid
    return index >= 6
  }

  const gridItems = Array.from({ length: itemCount }, (_, i) => i + 1)

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(preset)}
            className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Grid Auto Flow */}
      <div className="space-y-2">
        <div className="text-sm font-medium">grid-auto-flow</div>
        <div className="flex gap-2">
          {(['row', 'column', 'dense'] as const).map((flow) => (
            <button
              key={flow}
              onClick={() => setAutoFlow(flow)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                autoFlow === flow
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {flow}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          {autoFlow === 'row' && 'row: 按行填充，优先填满每一行'}
          {autoFlow === 'column' && 'column: 按列填充，优先填满每一列'}
          {autoFlow === 'dense' && 'dense: 密集填充，尝试填补前面的空隙'}
        </div>
      </div>

      {/* Auto Rows Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">grid-auto-rows</label>
          <Badge variant="secondary" className="font-mono text-xs">
            {autoRows}px
          </Badge>
        </div>
        <input
          type="range"
          min="40"
          max="120"
          value={autoRows}
          onChange={(e) => setAutoRows(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
        />
      </div>

      {/* Auto Columns Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">grid-auto-columns</label>
          <Badge variant="secondary" className="font-mono text-xs">
            {autoCols}px
          </Badge>
        </div>
        <input
          type="range"
          min="60"
          max="150"
          value={autoCols}
          onChange={(e) => setAutoCols(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
        />
      </div>

      {/* Item Count */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">网格项数量</label>
          <Badge variant="secondary" className="font-mono text-xs">
            {itemCount}
          </Badge>
        </div>
        <input
          type="range"
          min="6"
          max="15"
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
        />
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">网格预览</div>
        <div className="p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border overflow-auto">
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 80px)',
              gridAutoRows: `${autoRows}px`,
              gridAutoColumns: `${autoCols}px`,
              gridAutoFlow: autoFlow,
            }}
          >
            {gridItems.map((num) => {
              const size = getItemSize(num - 1)
              const implicit = isImplicit(num - 1)

              return (
                <div
                  key={num}
                  style={{
                    gridColumn: size.colSpan > 1 ? `span ${size.colSpan}` : undefined,
                    gridRow: size.rowSpan > 1 ? `span ${size.rowSpan}` : undefined,
                  }}
                  className={`rounded-md p-3 flex flex-col items-center justify-center font-semibold text-lg shadow-md transition-all ${
                    implicit
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 text-white'
                      : 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 text-white'
                  }`}
                >
                  <div>{num}</div>
                  {implicit && (
                    <div className="text-xs mt-1 opacity-90">隐式</div>
                  )}
                  {(size.colSpan > 1 || size.rowSpan > 1) && (
                    <div className="text-xs mt-1 opacity-90">
                      span {size.colSpan}×{size.rowSpan}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <span>显式网格 (3×2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-400 to-orange-600"></div>
              <span>隐式网格</span>
            </div>
          </div>
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
      <div className="space-y-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        <p><strong className="text-foreground">显式 vs 隐式网格:</strong> grid-template-* 定义显式网格（蓝色），超出部分自动创建隐式轨道（橙色）。</p>
        <p><strong className="text-foreground">grid-auto-rows/columns:</strong> 控制隐式轨道的尺寸。</p>
        <p><strong className="text-foreground">grid-auto-flow:</strong> row 按行填充，column 按列填充，dense 尝试填补空隙（适合不同尺寸的项）。</p>
      </div>
    </div>
  )
}
