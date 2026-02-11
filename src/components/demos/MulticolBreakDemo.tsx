'use client'

import { useState } from 'react'

type BreakInside = 'auto' | 'avoid' | 'avoid-column'
type BreakBeforeAfter = 'auto' | 'column' | 'avoid'

export function MulticolBreakDemo() {
  const [breakInside, setBreakInside] = useState<BreakInside>('avoid')
  const [breakBefore, setBreakBefore] = useState<BreakBeforeAfter>('auto')
  const [breakAfter, setBreakAfter] = useState<BreakBeforeAfter>('auto')

  const cards = [
    { title: '卡片 1', content: '这是第一张卡片的内容。在多列布局中，卡片可能会被分割到不同的列。' },
    { title: '卡片 2', content: '这是第二张卡片的内容。使用 break-inside: avoid 可以防止卡片被分割。' },
    { title: '卡片 3', content: '这是第三张卡片的内容。break-before 和 break-after 控制元素前后的断列行为。' },
    { title: '卡片 4', content: '这是第四张卡片的内容。合理使用这些属性可以让布局更加美观。' },
  ]

  const generateCSS = (): string => {
    return `.container {
  column-count: 3;
  column-gap: 20px;
}

.card {
  break-inside: ${breakInside};
  break-before: ${breakBefore};
  break-after: ${breakAfter};
}`
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '自动断列':
        setBreakInside('auto')
        setBreakBefore('auto')
        setBreakAfter('auto')
        break
      case '避免断列':
        setBreakInside('avoid')
        setBreakBefore('auto')
        setBreakAfter('auto')
        break
      case '强制断列':
        setBreakInside('auto')
        setBreakBefore('column')
        setBreakAfter('auto')
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Break Inside Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">break-inside</label>
        <div className="flex gap-2 flex-wrap">
          {(['auto', 'avoid', 'avoid-column'] as BreakInside[]).map((value) => (
            <button
              key={value}
              onClick={() => setBreakInside(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                breakInside === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Break Before Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">break-before</label>
        <div className="flex gap-2 flex-wrap">
          {(['auto', 'column', 'avoid'] as BreakBeforeAfter[]).map((value) => (
            <button
              key={value}
              onClick={() => setBreakBefore(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                breakBefore === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Break After Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">break-after</label>
        <div className="flex gap-2 flex-wrap">
          {(['auto', 'column', 'avoid'] as BreakBeforeAfter[]).map((value) => (
            <button
              key={value}
              onClick={() => setBreakAfter(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                breakAfter === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['自动断列', '避免断列', '强制断列'].map((preset) => (
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
          className="p-4 bg-muted/30 border rounded-lg text-sm"
          style={{
            columnCount: 3,
            columnGap: '20px',
            columnRule: '1px solid hsl(var(--border))',
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="mb-3 p-3 bg-background border rounded shadow-sm"
              style={{
                breakInside: breakInside,
                breakBefore: breakBefore,
                breakAfter: breakAfter,
              }}
            >
              <h4 className="font-semibold mb-1">{card.title}</h4>
              <p className="text-xs text-muted-foreground">{card.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded text-sm">
        <p className="text-blue-900 dark:text-blue-100">
          💡 <strong>提示：</strong>当卡片被分割到不同列时，边框会显示断裂效果。使用 avoid 可以防止分割。
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
