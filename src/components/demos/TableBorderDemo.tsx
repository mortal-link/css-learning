'use client'

import { useState } from 'react'

type BorderCollapse = 'separate' | 'collapse'
type EmptyCells = 'show' | 'hide'

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '',
  disabled = false,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className={`text-muted-foreground ${disabled ? 'opacity-50' : ''}`}>{label}</span>
        <span className={`font-medium ${disabled ? 'opacity-50' : ''}`}>
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
        disabled={disabled}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  )
}

export function TableBorderDemo() {
  const [borderCollapse, setBorderCollapse] = useState<BorderCollapse>('separate')
  const [borderSpacing, setBorderSpacing] = useState(8)
  const [emptyCells, setEmptyCells] = useState<EmptyCells>('show')

  const generateCSS = (): string => {
    let css = `table {
  border-collapse: ${borderCollapse};`

    if (borderCollapse === 'separate') {
      css += `
  border-spacing: ${borderSpacing}px;
  empty-cells: ${emptyCells};`
    }

    css += `
}`

    if (borderCollapse === 'collapse') {
      css += `

/* 边框冲突解决优先级：
   cell > row > row-group > col > col-group > table */`
    }

    return css
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '分离边框':
        setBorderCollapse('separate')
        setBorderSpacing(8)
        setEmptyCells('show')
        break
      case '合并边框':
        setBorderCollapse('collapse')
        setEmptyCells('show')
        break
      case '冲突解决':
        setBorderCollapse('collapse')
        setEmptyCells('show')
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Border Collapse Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">border-collapse</label>
        <div className="flex gap-2">
          {(['separate', 'collapse'] as BorderCollapse[]).map((collapse) => (
            <button
              key={collapse}
              onClick={() => setBorderCollapse(collapse)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                borderCollapse === collapse
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {collapse === 'separate' ? 'separate (分离)' : 'collapse (合并)'}
            </button>
          ))}
        </div>
      </div>

      {/* Border Spacing Slider (only for separate) */}
      <Slider
        label="border-spacing"
        value={borderSpacing}
        onChange={setBorderSpacing}
        min={0}
        max={20}
        unit="px"
        disabled={borderCollapse === 'collapse'}
      />

      {/* Empty Cells Selector (only for separate) */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          empty-cells
          {borderCollapse === 'collapse' && (
            <span className="ml-2 text-xs text-muted-foreground">(仅在 separate 模式下生效)</span>
          )}
        </label>
        <div className="flex gap-2">
          {(['show', 'hide'] as EmptyCells[]).map((value) => (
            <button
              key={value}
              onClick={() => setEmptyCells(value)}
              disabled={borderCollapse === 'collapse'}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                emptyCells === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              } ${borderCollapse === 'collapse' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {value === 'show' ? 'show (显示)' : 'hide (隐藏)'}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['分离边框', '合并边框', '冲突解决'].map((preset) => (
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
        <div className="p-4 bg-muted/30 border rounded-lg overflow-x-auto">
          <table
            className="w-full"
            style={{
              borderCollapse,
              borderSpacing: borderCollapse === 'separate' ? `${borderSpacing}px` : undefined,
              emptyCells: borderCollapse === 'separate' ? emptyCells : undefined,
            }}
          >
            <thead>
              <tr>
                <th className="border-2 border-blue-500 p-2 text-left text-sm font-semibold bg-blue-50 dark:bg-blue-950/30">
                  标题 1
                </th>
                <th className="border-4 border-red-500 p-2 text-left text-sm font-semibold bg-red-50 dark:bg-red-950/30">
                  标题 2
                </th>
                <th className="border-2 border-green-500 p-2 text-left text-sm font-semibold bg-green-50 dark:bg-green-950/30">
                  标题 3
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-purple-500 p-2 text-sm">单元格 1</td>
                <td className="border-4 border-orange-500 p-2 text-sm">单元格 2</td>
                <td className="border-2 border-pink-500 p-2 text-sm"></td>
              </tr>
              <tr>
                <td className="border-3 border-yellow-500 p-2 text-sm">单元格 4</td>
                <td className="border-2 border-cyan-500 p-2 text-sm"></td>
                <td className="border-2 border-indigo-500 p-2 text-sm">单元格 6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded text-sm">
        <p className="text-blue-900 dark:text-blue-100">
          💡 <strong>边框冲突：</strong>在 collapse 模式下，相邻单元格的边框会合并。冲突时优先级为：cell &gt; row &gt; row-group &gt; col &gt; col-group &gt; table
        </p>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS 代码</label>
        <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
          <code className="text-foreground">{generateCSS()}</code>
        </div>
      </div>
    </div>
  )
}
