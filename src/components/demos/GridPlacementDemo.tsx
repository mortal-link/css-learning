'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Preset {
  name: string
  columnStart: string
  columnEnd: string
  rowStart: string
  rowEnd: string
}

const presets: Preset[] = [
  { name: '跨两列', columnStart: '1', columnEnd: '3', rowStart: '1', rowEnd: '2' },
  { name: '跨两行', columnStart: '2', columnEnd: '3', rowStart: '1', rowEnd: '3' },
  { name: '大区块', columnStart: '1', columnEnd: '4', rowStart: '2', rowEnd: '4' },
  { name: 'grid-area', columnStart: '2', columnEnd: '4', rowStart: '3', rowEnd: '5' },
]

export function GridPlacementDemo() {
  const [selectedItem, setSelectedItem] = useState(1)
  const [columnStart, setColumnStart] = useState('1')
  const [columnEnd, setColumnEnd] = useState('2')
  const [rowStart, setRowStart] = useState('1')
  const [rowEnd, setRowEnd] = useState('2')
  const [useSpan, setUseSpan] = useState(false)

  const handlePreset = (preset: Preset) => {
    setColumnStart(preset.columnStart)
    setColumnEnd(preset.columnEnd)
    setRowStart(preset.rowStart)
    setRowEnd(preset.rowEnd)
  }

  const getCSSCode = () => {
    if (useSpan) {
      const colSpan = parseInt(columnEnd) - parseInt(columnStart)
      const rowSpan = parseInt(rowEnd) - parseInt(rowStart)
      return `.item-${selectedItem} {
  grid-column: ${columnStart} / span ${colSpan};
  grid-row: ${rowStart} / span ${rowSpan};
}`
    }

    return `.item-${selectedItem} {
  grid-column-start: ${columnStart};
  grid-column-end: ${columnEnd};
  grid-row-start: ${rowStart};
  grid-row-end: ${rowEnd};

  /* 或简写为: */
  grid-column: ${columnStart} / ${columnEnd};
  grid-row: ${rowStart} / ${rowEnd};

  /* 或使用 grid-area: */
  grid-area: ${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd};
}`
  }

  const getItemStyle = (itemNum: number) => {
    if (itemNum !== selectedItem) {
      return {}
    }

    return {
      gridColumnStart: columnStart,
      gridColumnEnd: columnEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowEnd,
    }
  }

  const gridItems = Array.from({ length: 9 }, (_, i) => i + 1)

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

      {/* Item Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">选择网格项进行定位</div>
        <div className="flex flex-wrap gap-2">
          {gridItems.map((num) => (
            <button
              key={num}
              onClick={() => setSelectedItem(num)}
              className={`w-10 h-10 rounded-md transition-colors font-semibold ${
                selectedItem === num
                  ? 'bg-rose-500 text-white dark:bg-rose-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Placement Controls */}
      <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium">grid-column-start</label>
          <input
            type="text"
            value={columnStart}
            onChange={(e) => setColumnStart(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">grid-column-end</label>
          <input
            type="text"
            value={columnEnd}
            onChange={(e) => setColumnEnd(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">grid-row-start</label>
          <input
            type="text"
            value={rowStart}
            onChange={(e) => setRowStart(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">grid-row-end</label>
          <input
            type="text"
            value={rowEnd}
            onChange={(e) => setRowEnd(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background"
          />
        </div>
      </div>

      {/* Span Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="use-span"
          checked={useSpan}
          onChange={(e) => setUseSpan(e.target.checked)}
          className="w-4 h-4 rounded"
        />
        <label htmlFor="use-span" className="text-sm font-medium cursor-pointer">
          使用 span 关键字显示代码
        </label>
      </div>

      {/* Visual Preview with Grid Lines */}
      <div className="space-y-2">
        <div className="text-sm font-medium">4×4 网格 (带行号)</div>
        <div className="relative p-4 bg-muted/30 rounded-lg">
          <div
            className="relative grid gap-2"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(4, 80px)',
            }}
          >
            {/* Grid line numbers */}
            <div className="absolute -left-6 top-0 flex flex-col justify-around h-full text-xs text-muted-foreground font-mono">
              {[1, 2, 3, 4, 5].map(num => (
                <div key={num} className="h-0 flex items-center">{num}</div>
              ))}
            </div>
            <div className="absolute left-0 -top-6 flex justify-around w-full text-xs text-muted-foreground font-mono">
              {[1, 2, 3, 4, 5].map(num => (
                <div key={num} className="w-0 flex justify-center">{num}</div>
              ))}
            </div>

            {/* Grid items */}
            {gridItems.map((num) => (
              <div
                key={num}
                style={getItemStyle(num)}
                className={`rounded-md p-3 flex items-center justify-center font-semibold text-lg shadow-md transition-all cursor-pointer ${
                  num === selectedItem
                    ? 'bg-gradient-to-br from-rose-400 to-rose-600 dark:from-rose-500 dark:to-rose-700 text-white z-10 ring-4 ring-rose-300 dark:ring-rose-800'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setSelectedItem(num)}
              >
                {num}
              </div>
            ))}
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
        <p><strong className="text-foreground">网格线编号:</strong> 从 1 开始，4 列网格有 5 条垂直网格线，4 行网格有 5 条水平网格线。</p>
        <p><strong className="text-foreground">span 关键字:</strong> grid-column: 1 / span 2 表示从第 1 条线开始，跨越 2 列。</p>
        <p><strong className="text-foreground">grid-area 简写:</strong> grid-area: row-start / col-start / row-end / col-end。</p>
      </div>
    </div>
  )
}
