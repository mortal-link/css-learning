'use client'

import { useState } from 'react'

type DisplayMode = 'html-table' | 'css-table' | 'anonymous-box'

export function TableModelDemo() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('html-table')

  const generateCSS = (): string => {
    switch (displayMode) {
      case 'html-table':
        return `/* 使用原生 HTML 表格元素 */
table { display: table; }
tr { display: table-row; }
td { display: table-cell; }`
      case 'css-table':
        return `.table { display: table; }
.row { display: table-row; }
.cell { display: table-cell; }`
      case 'anonymous-box':
        return `/* 缺少中间层时浏览器自动生成匿名盒子 */
.table { display: table; }
.cell { display: table-cell; }
/* 浏览器自动插入 table-row 匿名盒子 */`
    }
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'HTML表格':
        setDisplayMode('html-table')
        break
      case 'CSS表格布局':
        setDisplayMode('css-table')
        break
      case '匿名盒子':
        setDisplayMode('anonymous-box')
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Display Mode Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">表格模式</label>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'html-table', label: 'HTML 表格' },
            { value: 'css-table', label: 'CSS 表格布局' },
            { value: 'anonymous-box', label: '匿名盒子生成' },
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => setDisplayMode(mode.value as DisplayMode)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                displayMode === mode.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['HTML表格', 'CSS表格布局', '匿名盒子'].map((preset) => (
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
        <div className="p-4 bg-muted/30 border rounded-lg">
          {displayMode === 'html-table' && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left text-sm font-semibold">姓名</th>
                  <th className="border border-border p-2 text-left text-sm font-semibold">年龄</th>
                  <th className="border border-border p-2 text-left text-sm font-semibold">城市</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 text-sm">张三</td>
                  <td className="border border-border p-2 text-sm">28</td>
                  <td className="border border-border p-2 text-sm">北京</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 text-sm">李四</td>
                  <td className="border border-border p-2 text-sm">32</td>
                  <td className="border border-border p-2 text-sm">上海</td>
                </tr>
              </tbody>
            </table>
          )}

          {displayMode === 'css-table' && (
            <div className="table w-full border-collapse">
              <div className="table-row-group">
                <div className="table-row bg-muted">
                  <div className="table-cell border border-border p-2 text-sm font-semibold">姓名</div>
                  <div className="table-cell border border-border p-2 text-sm font-semibold">年龄</div>
                  <div className="table-cell border border-border p-2 text-sm font-semibold">城市</div>
                </div>
              </div>
              <div className="table-row-group">
                <div className="table-row">
                  <div className="table-cell border border-border p-2 text-sm">张三</div>
                  <div className="table-cell border border-border p-2 text-sm">28</div>
                  <div className="table-cell border border-border p-2 text-sm">北京</div>
                </div>
                <div className="table-row">
                  <div className="table-cell border border-border p-2 text-sm">李四</div>
                  <div className="table-cell border border-border p-2 text-sm">32</div>
                  <div className="table-cell border border-border p-2 text-sm">上海</div>
                </div>
              </div>
            </div>
          )}

          {displayMode === 'anonymous-box' && (
            <div className="space-y-3">
              <div className="table w-full border-collapse">
                <div className="table-cell border border-border p-2 text-sm bg-yellow-50 dark:bg-yellow-950/30">
                  姓名
                </div>
                <div className="table-cell border border-border p-2 text-sm bg-yellow-50 dark:bg-yellow-950/30">
                  年龄
                </div>
                <div className="table-cell border border-border p-2 text-sm bg-yellow-50 dark:bg-yellow-950/30">
                  城市
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded text-xs">
                <p className="text-blue-900 dark:text-blue-100">
                  ⚠️ 注意：这些 table-cell 元素之间缺少 table-row 父元素。浏览器会自动生成匿名的 table-row 盒子来包裹它们。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded text-sm">
        <p className="text-blue-900 dark:text-blue-100">
          💡 <strong>表格模型：</strong>表格由多层盒子组成（table → row-group → row → cell）。当某层缺失时，浏览器会自动生成匿名盒子。
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
