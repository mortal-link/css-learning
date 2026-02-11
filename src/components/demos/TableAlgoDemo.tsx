'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type TableLayout = 'auto' | 'fixed'
type DataSize = 'small' | 'large' | 'mixed'

export function TableAlgoDemo() {
  const [tableLayout, setTableLayout] = useState<TableLayout>('auto')
  const [dataSize, setDataSize] = useState<DataSize>('small')

  const getTableData = () => {
    switch (dataSize) {
      case 'small':
        return [
          { col1: '短', col2: '文本', col3: '数据' },
          { col1: '小', col2: '内容', col3: '示例' },
        ]
      case 'large':
        return [
          { col1: '这是一段非常长的文本内容', col2: '大量数据演示', col3: '更多详细信息在这里' },
          { col1: '长文本会影响计算', col2: '自动布局需要扫描所有行', col3: '固定布局只看第一行' },
          { col1: '性能差异在大表格中明显', col2: '数据越多差异越大', col3: '固定布局渲染更快' },
        ]
      case 'mixed':
        return [
          { col1: '短', col2: '这是一段很长的描述文本', col3: '中' },
          { col1: '非常非常长的内容', col2: '小', col3: '中等长度文本' },
        ]
    }
  }

  const getSteps = (): string[] => {
    if (tableLayout === 'auto') {
      return [
        '扫描所有行和列',
        '计算每个单元格的最小/最大宽度',
        '考虑所有内容后确定列宽',
        '分配剩余空间',
        '渲染表格',
      ]
    } else {
      return ['只扫描第一行', '根据第一行确定列宽', '忽略后续行内容', '直接渲染表格']
    }
  }

  const generateCSS = (): string => {
    return `table {
  table-layout: ${tableLayout};
}

/* ${tableLayout === 'auto' ? 'auto: 浏览器扫描所有内容计算列宽（较慢但精确）' : 'fixed: 仅根据第一行确定列宽（快速但可能溢出）'} */`
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '少量数据':
        setTableLayout('auto')
        setDataSize('small')
        break
      case '大量数据':
        setTableLayout('fixed')
        setDataSize('large')
        break
      case '混合宽度':
        setTableLayout('auto')
        setDataSize('mixed')
        break
    }
  }

  const tableData = getTableData()
  const steps = getSteps()

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Table Layout Toggle */}
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
              {layout}
            </button>
          ))}
        </div>
      </div>

      {/* Data Size Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">数据规模</label>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'small', label: '少量数据' },
            { value: 'large', label: '大量数据' },
            { value: 'mixed', label: '混合宽度' },
          ].map((size) => (
            <button
              key={size.value}
              onClick={() => setDataSize(size.value as DataSize)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                dataSize === size.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Steps */}
      <div className="space-y-2">
        <label className="text-sm font-medium">算法步骤</label>
        <div className="p-4 bg-muted/30 border rounded-lg space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">
                {index + 1}
              </Badge>
              <span className="text-sm text-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['少量数据', '大量数据', '混合宽度'].map((preset) => (
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
            className="w-full border-collapse"
            style={{
              tableLayout,
            }}
          >
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left text-sm font-semibold">
                  列 1 {tableLayout === 'fixed' && '⭐'}
                </th>
                <th className="border border-border p-2 text-left text-sm font-semibold">
                  列 2 {tableLayout === 'fixed' && '⭐'}
                </th>
                <th className="border border-border p-2 text-left text-sm font-semibold">
                  列 3 {tableLayout === 'fixed' && '⭐'}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-border p-2 text-sm">{row.col1}</td>
                  <td className="border border-border p-2 text-sm">{row.col2}</td>
                  <td className="border border-border p-2 text-sm">{row.col3}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {tableLayout === 'fixed' && (
            <p className="mt-2 text-xs text-muted-foreground">
              ⭐ fixed 模式下，只有第一行（表头）的内容影响列宽
            </p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded text-sm">
        <p className="text-blue-900 dark:text-blue-100 mb-2">
          <strong>💡 性能对比：</strong>
        </p>
        <ul className="text-blue-900 dark:text-blue-100 space-y-1 text-xs ml-4">
          <li>
            • <strong>auto：</strong>精确但慢，适合小表格或内容优先场景
          </li>
          <li>
            • <strong>fixed：</strong>快速但可能溢出，适合大表格或已知列宽场景
          </li>
        </ul>
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
