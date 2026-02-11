'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Preset {
  name: string
  minWidth: 'auto' | '0'
  useAutoMargin: boolean
  itemWidths: number[]
}

const presets: Preset[] = [
  { name: '默认项目', minWidth: 'auto', useAutoMargin: false, itemWidths: [60, 80, 100] },
  { name: 'min-width问题', minWidth: 'auto', useAutoMargin: false, itemWidths: [200, 200, 200] },
  { name: 'auto边距居中', minWidth: '0', useAutoMargin: true, itemWidths: [80, 80, 80] },
  { name: '间距分配', minWidth: '0', useAutoMargin: false, itemWidths: [60, 60, 60] },
]

export function FlexItemDemo() {
  const [minWidth, setMinWidth] = useState<'auto' | '0'>('auto')
  const [useAutoMargin, setUseAutoMargin] = useState(false)
  const [highlightOverflow, setHighlightOverflow] = useState(false)

  const handlePreset = (preset: Preset) => {
    setMinWidth(preset.minWidth)
    setUseAutoMargin(preset.useAutoMargin)
    setHighlightOverflow(preset.name === 'min-width问题')
  }

  const getCSSCode = () => {
    let code = `.container {
  display: flex;
}

.item {`

    if (minWidth === '0') {
      code += '\n  min-width: 0;'
    }

    if (useAutoMargin) {
      code += '\n  margin: auto; /* 自动边距居中 */'
    }

    code += '\n}'

    return code
  }

  return (
    <div className="space-y-4">
      {/* Preset Scenarios */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(preset)}
            className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-3 p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
        <div className="space-y-2">
          <div className="text-sm font-medium">min-width 设置</div>
          <div className="flex gap-2">
            {(['auto', '0'] as const).map((value) => (
              <button
                key={value}
                onClick={() => setMinWidth(value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  minWidth === value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                min-width: {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoMargin"
            checked={useAutoMargin}
            onChange={(e) => setUseAutoMargin(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="autoMargin" className="text-sm font-medium cursor-pointer">
            使用 margin: auto（居中项目）
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="highlight"
            checked={highlightOverflow}
            onChange={(e) => setHighlightOverflow(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="highlight" className="text-sm font-medium cursor-pointer">
            显示溢出问题
          </label>
        </div>
      </div>

      {/* Visual Container */}
      <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
        <div
          className="flex border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 gap-2 overflow-hidden"
          style={{ width: '100%', maxWidth: '400px' }}
        >
          {/* Item 1 */}
          <div
            className={`h-16 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700 rounded flex items-center justify-center text-white font-bold shadow-md flex-shrink ${
              highlightOverflow ? 'flex-shrink-0' : ''
            }`}
            style={{
              minWidth: minWidth === '0' ? 0 : 'auto',
              width: highlightOverflow ? '200px' : '80px',
              margin: useAutoMargin ? 'auto' : undefined,
            }}
          >
            <span className="text-xs px-2">项目 1</span>
          </div>

          {/* Item 2 */}
          <div
            className={`h-16 bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-700 rounded flex items-center justify-center text-white font-bold shadow-md flex-shrink ${
              highlightOverflow ? 'flex-shrink-0' : ''
            }`}
            style={{
              minWidth: minWidth === '0' ? 0 : 'auto',
              width: highlightOverflow ? '200px' : '120px',
              margin: useAutoMargin ? 'auto' : undefined,
            }}
          >
            <span className="text-xs px-2 truncate">项目 2 长文本</span>
          </div>

          {/* Item 3 */}
          <div
            className={`h-16 bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700 rounded flex items-center justify-center text-white font-bold shadow-md flex-shrink ${
              highlightOverflow ? 'flex-shrink-0' : ''
            }`}
            style={{
              minWidth: minWidth === '0' ? 0 : 'auto',
              width: highlightOverflow ? '200px' : '60px',
              margin: useAutoMargin ? 'auto' : undefined,
            }}
          >
            <span className="text-xs px-2">3</span>
          </div>
        </div>

        {highlightOverflow && (
          <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
            ⚠️ 容器宽度不足，项目溢出！设置 min-width: 0 允许收缩。
          </div>
        )}
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium">CSS 代码</div>
        <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-xs overflow-x-auto">
          <code>{getCSSCode()}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="bg-muted/50 dark:bg-muted/30 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">说明：</span>
          {' '}Flex 项目默认 min-width: auto，这意味着项目不会收缩到小于其内容的尺寸。
          当容器空间不足时，设置 min-width: 0 允许项目收缩并应用 flex-shrink。
          {' '}使用 margin: auto 可以在主轴或交叉轴上实现自动居中和间距分配。
        </div>
      </div>
    </div>
  )
}
