'use client'

import { useState } from 'react'

type ColumnSpan = 'none' | 'all'
type ColumnFill = 'auto' | 'balance'

export function ColumnSpanDemo() {
  const [columnSpan, setColumnSpan] = useState<ColumnSpan>('all')
  const [columnFill, setColumnFill] = useState<ColumnFill>('balance')

  const headingText = '多列布局中的跨列标题'
  const beforeText = `在多列布局中，有时我们需要让某个元素横跨所有列，比如文章标题或分节标题。`
  const afterText = `column-span 属性可以实现这一效果。当设置为 all 时，元素会横跨所有列，打破列的流动。这对于创建杂志风格的布局非常有用。同时，column-fill 属性控制内容如何在各列之间分布。balance 会尽量让各列高度相等，而 auto 则按顺序填充，可能导致列高度不均。balance-all 会在所有列容器中保持平衡。`

  const generateCSS = (): string => {
    return `.container {
  column-count: 3;
  column-gap: 20px;
  column-fill: ${columnFill};
}

.heading {
  column-span: ${columnSpan};
  font-weight: bold;
  padding: 8px 0;
}`
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '标题跨列':
        setColumnSpan('all')
        setColumnFill('balance')
        break
      case '均衡填充':
        setColumnSpan('all')
        setColumnFill('balance')
        break
      case '自动填充':
        setColumnSpan('all')
        setColumnFill('auto')
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Column Span Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium">column-span</label>
        <div className="flex gap-2">
          {(['none', 'all'] as ColumnSpan[]).map((span) => (
            <button
              key={span}
              onClick={() => setColumnSpan(span)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                columnSpan === span
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {span === 'none' ? 'none (不跨列)' : 'all (跨所有列)'}
            </button>
          ))}
        </div>
      </div>

      {/* Column Fill Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">column-fill</label>
        <div className="flex gap-2 flex-wrap">
          {(['auto', 'balance'] as ColumnFill[]).map((fill) => (
            <button
              key={fill}
              onClick={() => setColumnFill(fill)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                columnFill === fill
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {fill}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['标题跨列', '均衡填充', '自动填充'].map((preset) => (
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
          className="p-4 bg-muted/30 border rounded-lg text-sm leading-relaxed"
          style={{
            columnCount: 3,
            columnGap: '20px',
            columnFill: columnFill,
            columnRule: '1px solid hsl(var(--border))',
          }}
        >
          <p className="mb-2">{beforeText}</p>
          <h3
            className="font-bold py-2 my-2 bg-primary/10 px-2 rounded"
            style={{
              columnSpan: columnSpan,
            }}
          >
            {headingText}
          </h3>
          <p>{afterText}</p>
        </div>
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
