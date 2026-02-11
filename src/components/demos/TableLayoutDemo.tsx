'use client'

import { useState } from 'react'

type TableLayout = 'auto' | 'fixed'
type CaptionSide = 'top' | 'bottom'

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

export function TableLayoutDemo() {
  const [tableLayout, setTableLayout] = useState<TableLayout>('auto')
  const [captionSide, setCaptionSide] = useState<CaptionSide>('top')
  const [borderSpacing, setBorderSpacing] = useState(5)

  const tableData = [
    { name: '短', age: '25', description: '短文本' },
    { name: '中等长度的名字', age: '30', description: '这是一段中等长度的描述文本' },
    { name: '非常非常长的名字示例', age: '28', description: '这是一段非常非常长的描述文本，用于演示表格布局算法如何处理内容' },
  ]

  const generateCSS = (): string => {
    return `table {
  table-layout: ${tableLayout};
  caption-side: ${captionSide};
  border-spacing: ${borderSpacing}px;
}`
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '自动布局':
        setTableLayout('auto')
        setCaptionSide('top')
        setBorderSpacing(5)
        break
      case '固定布局':
        setTableLayout('fixed')
        setCaptionSide('top')
        setBorderSpacing(5)
        break
      case '标题位置':
        setTableLayout('auto')
        setCaptionSide('bottom')
        setBorderSpacing(8)
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Table Layout Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">table-layout</label>
        <div className="flex gap-2">
          {(['auto', 'fixed'] as TableLayout[]).map((layout) => (
            <button
              key={layout}
              onClick={() => setTableLayout(layout)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tableLayout === layout
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {layout === 'auto' ? 'auto (自动)' : 'fixed (固定)'}
            </button>
          ))}
        </div>
      </div>

      {/* Caption Side Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">caption-side</label>
        <div className="flex gap-2">
          {(['top', 'bottom'] as CaptionSide[]).map((side) => (
            <button
              key={side}
              onClick={() => setCaptionSide(side)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                captionSide === side
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {side === 'top' ? 'top (顶部)' : 'bottom (底部)'}
            </button>
          ))}
        </div>
      </div>

      {/* Border Spacing Slider */}
      <Slider
        label="border-spacing"
        value={borderSpacing}
        onChange={setBorderSpacing}
        min={0}
        max={20}
        unit="px"
      />

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['自动布局', '固定布局', '标题位置'].map((preset) => (
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
            className="w-full border border-border"
            style={{
              tableLayout,
              borderSpacing: `${borderSpacing}px`,
              captionSide,
            }}
          >
            <caption className="py-2 text-sm font-semibold">用户信息表</caption>
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left text-sm font-semibold">姓名</th>
                <th className="border border-border p-2 text-left text-sm font-semibold">年龄</th>
                <th className="border border-border p-2 text-left text-sm font-semibold">描述</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-border p-2 text-sm">{row.name}</td>
                  <td className="border border-border p-2 text-sm">{row.age}</td>
                  <td className="border border-border p-2 text-sm">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded text-sm">
        <p className="text-blue-900 dark:text-blue-100">
          💡 <strong>区别：</strong>auto 会根据所有单元格内容计算列宽，fixed 仅根据第一行确定列宽（性能更好）。
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
