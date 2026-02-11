'use client'

import { useState } from 'react'

type PositionValue = 'static' | 'relative' | 'absolute'

interface Preset {
  name: string
  parentPosition: PositionValue
  childPosition: PositionValue
  childTop: number
  childLeft: number
}

const presets: Preset[] = [
  { name: '默认', parentPosition: 'static', childPosition: 'static', childTop: 0, childLeft: 0 },
  { name: '相对定位', parentPosition: 'relative', childPosition: 'relative', childTop: 20, childLeft: 20 },
  { name: '绝对定位', parentPosition: 'relative', childPosition: 'absolute', childTop: 20, childLeft: 20 },
  { name: '穿透查找', parentPosition: 'static', childPosition: 'absolute', childTop: 30, childLeft: 30 },
]

export function ContainingBlockDemo() {
  const [parentPosition, setParentPosition] = useState<PositionValue>('static')
  const [childPosition, setChildPosition] = useState<PositionValue>('static')
  const [childTop, setChildTop] = useState(0)
  const [childLeft, setChildLeft] = useState(0)

  const applyPreset = (preset: Preset) => {
    setParentPosition(preset.parentPosition)
    setChildPosition(preset.childPosition)
    setChildTop(preset.childTop)
    setChildLeft(preset.childLeft)
  }

  // Determine which element is the containing block
  const getContainingBlock = (): 'grandparent' | 'parent' => {
    if (childPosition === 'static' || childPosition === 'relative') {
      return 'parent' // Content box of parent
    }
    if (childPosition === 'absolute') {
      return parentPosition === 'static' ? 'grandparent' : 'parent'
    }
    return 'parent'
  }

  const containingBlock = getContainingBlock()

  const getExplanation = (): string => {
    if (childPosition === 'static' || childPosition === 'relative') {
      return '子元素是 static/relative，包含块是最近的块容器祖先的内容区域（父元素）'
    }
    if (childPosition === 'absolute' && parentPosition !== 'static') {
      return '子元素是 absolute，包含块是最近的 position 非 static 的祖先的内边距区域（父元素）'
    }
    if (childPosition === 'absolute' && parentPosition === 'static') {
      return '父元素是 static，所以 absolute 子元素的包含块向上查找到祖父元素或视口'
    }
    return ''
  }

  const getCSSCode = (): string => {
    let code = `/* 祖父元素 */\nposition: static;\n\n`
    code += `/* 父元素 */\nposition: ${parentPosition};\n\n`
    code += `/* 子元素 */\nposition: ${childPosition};\n`
    if (childPosition === 'absolute') {
      code += `top: ${childTop}px;\nleft: ${childLeft}px;`
    } else if (childPosition === 'relative' && (childTop > 0 || childLeft > 0)) {
      code += `top: ${childTop}px;\nleft: ${childLeft}px;`
    }
    return code
  }

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1.5 text-sm rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-background hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Visualization Area */}
      <div className="relative">
        {/* Grandparent */}
        <div
          className={`relative bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-6 ${
            containingBlock === 'grandparent'
              ? 'border-4 border-amber-400 dark:border-amber-500 animate-pulse'
              : ''
          }`}
          style={{ minHeight: '350px' }}
        >
          <div className="absolute top-2 left-2 text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded">
            祖父元素 (static)
          </div>
          {containingBlock === 'grandparent' && (
            <div className="absolute top-2 right-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-1 rounded border-2 border-amber-400 dark:border-amber-500">
              📦 包含块
            </div>
          )}

          {/* Parent */}
          <div
            className={`relative mt-8 bg-blue-50 dark:bg-blue-950 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-6 ${
              containingBlock === 'parent'
                ? 'border-4 border-dashed border-amber-400 dark:border-amber-500'
                : ''
            }`}
            style={{
              position: parentPosition,
              minHeight: '220px',
            }}
          >
            <div className="absolute top-2 left-2 text-xs font-mono text-blue-700 dark:text-blue-300 bg-background px-2 py-1 rounded">
              父元素 ({parentPosition})
            </div>
            {containingBlock === 'parent' && (
              <div className="absolute top-2 right-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-1 rounded border-2 border-amber-400 dark:border-amber-500">
                📦 包含块
              </div>
            )}

            {/* Child */}
            <div
              className="bg-rose-100 dark:bg-rose-950 border-2 border-rose-400 dark:border-rose-600 rounded w-16 h-16 flex items-center justify-center text-xs font-mono text-rose-700 dark:text-rose-300"
              style={{
                position: childPosition,
                top: childPosition === 'absolute' || childPosition === 'relative' ? `${childTop}px` : undefined,
                left: childPosition === 'absolute' || childPosition === 'relative' ? `${childLeft}px` : undefined,
              }}
            >
              子元素
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
        {/* Parent Position */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            父元素 position:
          </label>
          <div className="flex gap-2">
            {(['static', 'relative'] as PositionValue[]).map((pos) => (
              <button
                key={pos}
                onClick={() => setParentPosition(pos)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  parentPosition === pos
                    ? 'bg-blue-500 text-white'
                    : 'bg-background text-foreground border border-border hover:bg-muted'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Child Position */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            子元素 position:
          </label>
          <div className="flex gap-2">
            {(['static', 'relative', 'absolute'] as PositionValue[]).map((pos) => (
              <button
                key={pos}
                onClick={() => setChildPosition(pos)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  childPosition === pos
                    ? 'bg-rose-500 text-white'
                    : 'bg-background text-foreground border border-border hover:bg-muted'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Offset Controls */}
        {(childPosition === 'absolute' || childPosition === 'relative') && (
          <div className="space-y-3 pt-2 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                top: {childTop}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={childTop}
                onChange={(e) => setChildTop(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                left: {childLeft}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={childLeft}
                onChange={(e) => setChildLeft(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-400 dark:border-amber-500 rounded">
        <p className="text-sm text-amber-900 dark:text-amber-100 font-medium">
          💡 {getExplanation()}
        </p>
      </div>

      {/* CSS Code */}
      <div className="p-4 bg-slate-900 dark:bg-slate-950 rounded-lg border border-border">
        <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap">
          {getCSSCode()}
        </pre>
      </div>
    </div>
  )
}
