'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Preset {
  name: string
  columns: string
  rows: string
  containerWidth: number
}

const presets: Preset[] = [
  { name: '等分三列', columns: '1fr 1fr 1fr', rows: 'auto', containerWidth: 100 },
  { name: '12列网格', columns: 'repeat(12, 1fr)', rows: 'auto', containerWidth: 100 },
  { name: 'repeat+auto-fill', columns: 'repeat(auto-fill, minmax(100px, 1fr))', rows: 'auto', containerWidth: 100 },
  { name: 'minmax响应式', columns: 'repeat(3, minmax(80px, 1fr))', rows: 'minmax(60px, auto)', containerWidth: 60 },
]

export function GridTemplateDemo() {
  const [columns, setColumns] = useState('1fr 2fr 1fr')
  const [rows, setRows] = useState('auto')
  const [containerWidth, setContainerWidth] = useState(100)

  const handlePreset = (preset: Preset) => {
    setColumns(preset.columns)
    setRows(preset.rows)
    setContainerWidth(preset.containerWidth)
  }

  const getCSSCode = () => {
    return `.container {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: 12px;
  width: ${containerWidth}%;
}`
  }

  // Determine track visualization
  const getTrackInfo = () => {
    if (columns.includes('1fr 1fr 1fr')) return '3 等宽轨道 (各占 1fr)'
    if (columns.includes('1fr 2fr 1fr')) return '3 轨道 (比例 1:2:1)'
    if (columns.includes('repeat(12')) return '12 等宽轨道'
    if (columns.includes('auto-fill')) return 'auto-fill: 自动填充尽可能多的列'
    if (columns.includes('minmax')) return 'minmax(): 设定最小和最大尺寸'
    return '自定义轨道配置'
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

      {/* Columns Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">grid-template-columns</label>
        <input
          type="text"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          placeholder="例如: 1fr 2fr 1fr"
          className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background font-mono"
        />
        <div className="text-xs text-muted-foreground">
          支持: px, fr, %, minmax(), repeat(), auto-fill, auto-fit
        </div>
      </div>

      {/* Rows Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">grid-template-rows</label>
        <input
          type="text"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          placeholder="例如: auto auto"
          className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background font-mono"
        />
      </div>

      {/* Container Width Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">容器宽度 (调整以观察响应式行为)</label>
          <Badge variant="secondary" className="font-mono text-xs">
            {containerWidth}%
          </Badge>
        </div>
        <input
          type="range"
          min="40"
          max="100"
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
        />
      </div>

      {/* Track Info */}
      <div className="px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-200 dark:border-purple-800">
        <div className="text-xs font-medium text-purple-900 dark:text-purple-200">
          轨道解析: {getTrackInfo()}
        </div>
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化轨道大小</div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <div
            style={{
              width: `${containerWidth}%`,
              display: 'grid',
              gridTemplateColumns: columns,
              gridTemplateRows: rows,
              gap: '12px',
            }}
          >
            {gridItems.map((num) => (
              <div
                key={num}
                className="bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 text-white rounded-md p-3 flex items-center justify-center font-semibold shadow-md transition-all"
                style={{ minHeight: '60px' }}
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
        <p><strong className="text-foreground">fr 单元:</strong> 表示可用空间的分数，1fr 1fr 表示两列等分剩余空间。</p>
        <p><strong className="text-foreground">minmax(min, max):</strong> 定义尺寸范围，例如 minmax(100px, 1fr) 表示最小 100px，最大占据 1fr。</p>
        <p><strong className="text-foreground">repeat(count, size):</strong> 重复定义轨道，例如 repeat(3, 1fr) 等同于 1fr 1fr 1fr。</p>
        <p><strong className="text-foreground">auto-fill vs auto-fit:</strong> auto-fill 填充尽可能多的列（可能留空），auto-fit 则收缩空列。</p>
      </div>
    </div>
  )
}
