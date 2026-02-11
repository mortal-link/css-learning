'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Preset {
  name: string
  display: 'grid' | 'inline-grid'
  columns: string
  rows: string
  gap: number
}

const presets: Preset[] = [
  { name: '2列', display: 'grid', columns: '1fr 1fr', rows: 'auto', gap: 16 },
  { name: '3列', display: 'grid', columns: '1fr 1fr 1fr', rows: 'auto', gap: 16 },
  { name: '自定义', display: 'grid', columns: '100px 200px 1fr', rows: '80px auto', gap: 20 },
]

export function GridContainerDemo() {
  const [display, setDisplay] = useState<'grid' | 'inline-grid'>('grid')
  const [columns, setColumns] = useState('1fr 1fr 1fr')
  const [rows, setRows] = useState('auto')
  const [gap, setGap] = useState(16)

  const handlePreset = (preset: Preset) => {
    setDisplay(preset.display)
    setColumns(preset.columns)
    setRows(preset.rows)
    setGap(preset.gap)
  }

  const getCSSCode = () => {
    return `.container {
  display: ${display};
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: ${gap}px;
}`
  }

  // Generate grid items
  const gridItems = Array.from({ length: 6 }, (_, i) => i + 1)

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

      {/* Display Type */}
      <div className="space-y-2">
        <div className="text-sm font-medium">显示类型</div>
        <div className="flex gap-2">
          <button
            onClick={() => setDisplay('grid')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              display === 'grid'
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            grid
          </button>
          <button
            onClick={() => setDisplay('inline-grid')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              display === 'inline-grid'
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            inline-grid
          </button>
        </div>
      </div>

      {/* Grid Template Columns */}
      <div className="space-y-2">
        <label className="text-sm font-medium">grid-template-columns</label>
        <input
          type="text"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          placeholder="例如: 1fr 1fr 1fr"
          className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background"
        />
      </div>

      {/* Grid Template Rows */}
      <div className="space-y-2">
        <label className="text-sm font-medium">grid-template-rows</label>
        <input
          type="text"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          placeholder="例如: auto auto"
          className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background"
        />
      </div>

      {/* Gap Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">gap</label>
          <Badge variant="secondary" className="font-mono text-xs">
            {gap}px
          </Badge>
        </div>
        <input
          type="range"
          min="0"
          max="40"
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
        />
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化预览</div>
        <div className="relative p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border overflow-auto">
          <div
            style={{
              display,
              gridTemplateColumns: columns,
              gridTemplateRows: rows,
              gap: `${gap}px`,
              position: 'relative',
            }}
            className="relative"
          >
            {/* Grid line numbers overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{ position: 'absolute' }}>
                {/* This would need dynamic calculation based on actual grid */}
              </svg>
            </div>

            {/* Grid items */}
            {gridItems.map((num) => (
              <div
                key={num}
                className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:dark:to-blue-700 text-white rounded-md p-4 flex items-center justify-center font-semibold text-lg shadow-md"
                style={{ minHeight: '60px' }}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Display type indicator */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-background/90 rounded text-xs text-muted-foreground border border-border">
            display: {display}
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
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-500">
        <div className="text-xs leading-relaxed text-blue-900 dark:text-blue-200">
          <strong>grid vs inline-grid:</strong> grid 创建块级网格容器，inline-grid 创建行内级网格容器。
          grid-template-columns 和 grid-template-rows 定义网格轨道的尺寸，gap 设置网格项之间的间距。
        </div>
      </div>
    </div>
  )
}
