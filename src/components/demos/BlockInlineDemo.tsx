'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type ElementType = 'block' | 'inline' | 'inline-block'

export function BlockInlineDemo() {
  const [elementType, setElementType] = useState<ElementType>('block')
  const [width, setWidth] = useState(150)
  const [height, setHeight] = useState(80)
  const [paddingH, setPaddingH] = useState(20)
  const [paddingV, setPaddingV] = useState(10)
  const [marginH, setMarginH] = useState(15)
  const [marginV, setMarginV] = useState(10)

  const getElementStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: elementType,
      paddingLeft: `${paddingH}px`,
      paddingRight: `${paddingH}px`,
      paddingTop: `${paddingV}px`,
      paddingBottom: `${paddingV}px`,
      marginLeft: `${marginH}px`,
      marginRight: `${marginH}px`,
      marginTop: `${marginV}px`,
      marginBottom: `${marginV}px`,
    }

    if (elementType !== 'inline') {
      base.width = `${width}px`
      base.height = `${height}px`
    }

    return base
  }

  const getCSSCode = () => {
    const lines = ['.element {', `  display: ${elementType};`]

    if (elementType !== 'inline') {
      lines.push(`  width: ${width}px;`)
      lines.push(`  height: ${height}px;`)
    } else {
      lines.push('  /* width/height 对 inline 无效 */')
    }

    lines.push(`  padding: ${paddingV}px ${paddingH}px;`)
    lines.push(`  margin: ${marginV}px ${marginH}px;`)

    if (elementType === 'inline') {
      lines.push('  /* 垂直方向 padding/margin 不影响布局 */')
    }

    lines.push('}')
    return lines.join('\n')
  }

  const canSetSize = elementType !== 'inline'

  return (
    <div className="space-y-4">
      {/* Element Type Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">元素类型</div>
        <div className="flex flex-wrap gap-2">
          {(['block', 'inline', 'inline-block'] as ElementType[]).map((type) => (
            <button
              key={type}
              onClick={() => setElementType(type)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                elementType === type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Size Controls */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm font-medium mb-2">尺寸控制</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">宽度 (width)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {canSetSize ? `${width}px` : '无效'}
              </Badge>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              disabled={!canSetSize}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900 disabled:opacity-30 disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">高度 (height)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {canSetSize ? `${height}px` : '无效'}
              </Badge>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              disabled={!canSetSize}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900 disabled:opacity-30 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Padding Controls */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm font-medium mb-2">内边距 (padding)</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">水平 padding</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {paddingH}px
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={paddingH}
              onChange={(e) => setPaddingH(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">垂直 padding</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {paddingV}px {elementType === 'inline' ? '(视觉)' : ''}
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={paddingV}
              onChange={(e) => setPaddingV(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
            />
          </div>
        </div>

        {/* Margin Controls */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg md:col-span-2">
          <div className="text-sm font-medium mb-2">外边距 (margin)</div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">水平 margin</label>
                <Badge variant="secondary" className="font-mono text-xs">
                  {marginH}px
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={marginH}
                onChange={(e) => setMarginH(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-orange-900"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">垂直 margin</label>
                <Badge variant="secondary" className="font-mono text-xs">
                  {marginV}px {elementType === 'inline' ? '(无效)' : ''}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={marginV}
                onChange={(e) => setMarginV(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-orange-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化效果</div>
        <div className="min-h-[250px] p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <div className="text-xs text-muted-foreground mb-4">
            蓝色区域 = 内容 + padding，橙色边框 = margin
          </div>

          <div className="flex flex-wrap items-start">
            <div className="text-xs text-muted-foreground inline">
              这是一些文本内容，
            </div>
            <div
              style={getElementStyle()}
              className="bg-blue-500 dark:bg-blue-600 text-white rounded font-medium text-sm border-2 border-orange-500 dark:border-orange-400 transition-all duration-300 inline-flex items-center justify-center"
            >
              {elementType}
            </div>
            <div className="text-xs text-muted-foreground inline">
              ，后面还有更多文本内容展示元素的行为。
            </div>
          </div>

          {/* Behavior Summary */}
          <div className="mt-4 p-3 bg-background rounded border border-border space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">当前行为</Badge>
              <span className="text-xs text-foreground">
                {elementType === 'block' && '独占一行，宽度 100%（或设置值）'}
                {elementType === 'inline' && '与文本同行，宽高由内容决定'}
                {elementType === 'inline-block' && '与文本同行，但可设置宽高'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>✓ 水平 padding/margin: 总是生效</div>
              <div className={elementType === 'inline' ? 'text-orange-600 dark:text-orange-400' : ''}>
                {elementType === 'inline'
                  ? '⚠ 垂直 padding: 仅视觉效果，不影响布局'
                  : '✓ 垂直 padding: 影响布局'}
              </div>
              <div className={elementType === 'inline' ? 'text-red-600 dark:text-red-400' : ''}>
                {elementType === 'inline'
                  ? '✗ 垂直 margin: 完全无效'
                  : '✓ 垂直 margin: 正常生效'}
              </div>
            </div>
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
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 {elementType === 'block' && 'block 元素独占一行，所有盒模型属性都正常生效。'}
          {elementType === 'inline' && 'inline 元素只能设置水平方向的 margin/padding，垂直方向的 margin 无效，padding 仅有视觉效果不影响布局。'}
          {elementType === 'inline-block' && 'inline-block 结合两者优点：像 inline 一样水平排列，像 block 一样可设置所有盒模型属性。'}
        </p>
      </div>
    </div>
  )
}
