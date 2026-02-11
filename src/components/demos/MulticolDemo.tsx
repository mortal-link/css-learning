'use client'

import { useState } from 'react'

type ColumnMode = 'count' | 'width' | 'shorthand'

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '',
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  )
}

export function MulticolDemo() {
  const [columnMode, setColumnMode] = useState<ColumnMode>('count')
  const [columnCount, setColumnCount] = useState(3)
  const [columnWidth, setColumnWidth] = useState(200)

  const sampleText = `CSS 多列布局模块定义了一种多列布局方式，可以将内容像报纸一样排列成多列。这种布局方式非常适合展示大量文本内容，能够提升阅读体验。通过设置 column-count 或 column-width 属性，可以控制列的数量或宽度。浏览器会自动将内容流入到各个列中，并在列之间进行平衡。多列布局还支持列间隔、列规则线等特性，让布局更加灵活美观。`

  const generateCSS = (): string => {
    switch (columnMode) {
      case 'count':
        return `column-count: ${columnCount};`
      case 'width':
        return `column-width: ${columnWidth}px;`
      case 'shorthand':
        return `columns: ${columnCount} ${columnWidth}px;`
    }
  }

  const getColumnStyle = () => {
    switch (columnMode) {
      case 'count':
        return { columnCount }
      case 'width':
        return { columnWidth: `${columnWidth}px` }
      case 'shorthand':
        return { columns: `${columnCount} ${columnWidth}px` }
    }
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '2列':
        setColumnMode('count')
        setColumnCount(2)
        break
      case '3列':
        setColumnMode('count')
        setColumnCount(3)
        break
      case '自动列宽':
        setColumnMode('width')
        setColumnWidth(200)
        break
      case '固定列宽':
        setColumnMode('width')
        setColumnWidth(150)
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Column Mode Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">布局模式</label>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'count', label: 'column-count' },
            { value: 'width', label: 'column-width' },
            { value: 'shorthand', label: 'columns 简写' },
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => setColumnMode(mode.value as ColumnMode)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                columnMode === mode.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {(columnMode === 'count' || columnMode === 'shorthand') && (
          <Slider
            label="列数量"
            value={columnCount}
            onChange={setColumnCount}
            min={1}
            max={6}
          />
        )}

        {(columnMode === 'width' || columnMode === 'shorthand') && (
          <Slider
            label="列宽度"
            value={columnWidth}
            onChange={setColumnWidth}
            min={100}
            max={400}
            unit="px"
          />
        )}
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['2列', '3列', '自动列宽', '固定列宽'].map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预览</label>
        <div
          className="p-4 bg-muted/30 border rounded-lg text-sm leading-relaxed relative"
          style={{
            ...getColumnStyle(),
            columnGap: '20px',
            columnRule: '1px solid hsl(var(--border))',
          }}
        >
          {sampleText}
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS 代码</label>
        <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code className="text-foreground">{generateCSS()}</code>
        </div>
      </div>
    </div>
  )
}
