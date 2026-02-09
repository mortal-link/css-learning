'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type CSSProperty = 'color' | 'fontSize' | 'background'
type Origin = 'ua' | 'user' | 'author'

interface Declaration {
  property: CSSProperty
  value: string
  important: boolean
}

const defaultDeclarations: Record<Origin, Declaration[]> = {
  ua: [
    { property: 'color', value: '#000000', important: false },
    { property: 'fontSize', value: '16px', important: false },
    { property: 'background', value: '#ffffff', important: false }
  ],
  user: [
    { property: 'color', value: '#0066cc', important: false },
    { property: 'fontSize', value: '18px', important: false },
    { property: 'background', value: '#f0f0f0', important: false }
  ],
  author: [
    { property: 'color', value: '#ff6600', important: false },
    { property: 'fontSize', value: '20px', important: false },
    { property: 'background', value: '#fff3e0', important: false }
  ]
}

const propertyLabels: Record<CSSProperty, string> = {
  color: '文字颜色',
  fontSize: '字体大小',
  background: '背景色'
}

export function CascadeOriginDemo() {
  const [declarations, setDeclarations] = useState(defaultDeclarations)

  const updateDeclaration = (
    origin: Origin,
    property: CSSProperty,
    field: 'value' | 'important',
    newValue: string | boolean
  ) => {
    setDeclarations(prev => ({
      ...prev,
      [origin]: prev[origin].map(decl =>
        decl.property === property ? { ...decl, [field]: newValue } : decl
      )
    }))
  }

  const calculateWinner = (property: CSSProperty): { origin: Origin; value: string; reason: string } => {
    const ua = declarations.ua.find(d => d.property === property)!
    const user = declarations.user.find(d => d.property === property)!
    const author = declarations.author.find(d => d.property === property)!

    // Check for !important declarations (reversed priority)
    if (ua.important || user.important || author.important) {
      // UA !important wins over User !important wins over Author !important
      if (ua.important) return { origin: 'ua', value: ua.value, reason: '浏览器默认 !important 优先级最高' }
      if (user.important) return { origin: 'user', value: user.value, reason: '用户样式 !important 优先级次高' }
      if (author.important) return { origin: 'author', value: author.value, reason: '作者样式 !important 优先级最低（在 !important 规则中）' }
    }

    // Normal cascade (Author > User > UA)
    if (author.value) return { origin: 'author', value: author.value, reason: '作者样式优先级最高（正常情况）' }
    if (user.value) return { origin: 'user', value: user.value, reason: '用户样式优先级次高' }
    return { origin: 'ua', value: ua.value, reason: '浏览器默认样式优先级最低' }
  }

  const winners = {
    color: calculateWinner('color'),
    fontSize: calculateWinner('fontSize'),
    background: calculateWinner('background')
  }

  const originLabels: Record<Origin, string> = {
    ua: '浏览器默认',
    user: '用户样式',
    author: '作者样式'
  }

  const originColors: Record<Origin, string> = {
    ua: 'bg-blue-100 border-blue-300 dark:bg-blue-950 dark:border-blue-800',
    user: 'bg-green-100 border-green-300 dark:bg-green-950 dark:border-green-800',
    author: 'bg-orange-100 border-orange-300 dark:bg-orange-950 dark:border-orange-800'
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* Preview Element */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="text-xs text-muted-foreground mb-2">预览效果</div>
        <p
          className="rounded border-2 border-dashed border-primary/20 p-4 text-center font-medium transition-all"
          style={{
            color: winners.color.value,
            fontSize: winners.fontSize.value,
            background: winners.background.value
          }}
        >
          这是一个示例段落
        </p>
      </div>

      {/* Origin Panels */}
      <div className="space-y-3">
        {(['ua', 'user', 'author'] as const).map(origin => (
          <div key={origin} className={`rounded-lg border-2 p-3 ${originColors[origin]}`}>
            <div className="font-medium text-sm mb-2 flex items-center gap-2">
              <span>{originLabels[origin]}</span>
              <Badge variant="outline" className="text-xs">
                {origin === 'ua' ? 'UA' : origin === 'user' ? 'User' : 'Author'}
              </Badge>
            </div>
            <div className="space-y-2">
              {declarations[origin].map(decl => (
                <div key={decl.property} className="flex items-center gap-2 text-xs">
                  <span className="w-16 text-muted-foreground">{propertyLabels[decl.property]}</span>
                  <input
                    type={decl.property === 'fontSize' ? 'text' : 'color'}
                    value={decl.value}
                    onChange={e => updateDeclaration(origin, decl.property, 'value', e.target.value)}
                    className="flex-1 px-2 py-1 rounded border bg-background text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <label className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={decl.important}
                      onChange={e => updateDeclaration(origin, decl.property, 'important', e.target.checked)}
                      className="w-3 h-3"
                    />
                    <span className="text-xs">!important</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="font-medium text-sm">最终结果</div>
        {(['color', 'fontSize', 'background'] as const).map(prop => {
          const winner = winners[prop]
          return (
            <div key={prop} className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-16 text-muted-foreground">{propertyLabels[prop]}</span>
                <code className="flex-1 px-2 py-1 rounded bg-background font-mono border">
                  {winner.value}
                </code>
                <Badge variant="secondary" className="text-xs">
                  {originLabels[winner.origin]}
                </Badge>
              </div>
              <div className="text-muted-foreground italic pl-16">{winner.reason}</div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
        <div className="font-medium mb-1">层叠顺序说明</div>
        <div>• 正常情况：作者样式 &gt; 用户样式 &gt; 浏览器默认</div>
        <div>• !important 情况：浏览器默认 !important &gt; 用户样式 !important &gt; 作者样式 !important</div>
      </div>
    </div>
  )
}
