'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type DisplayValue = 'block' | 'inline' | 'inline-block' | 'none' | 'flex' | 'grid'

interface Preset {
  name: string
  display: DisplayValue
}

const presets: Preset[] = [
  { name: '块级', display: 'block' },
  { name: '行内', display: 'inline' },
  { name: '行内块', display: 'inline-block' },
  { name: '隐藏', display: 'none' },
]

const explanations: Record<DisplayValue, string> = {
  block: '块级元素独占一行，宽度默认为父元素的 100%，可以设置宽高、内外边距。常见块级元素：div、p、h1-h6。',
  inline: '行内元素不独占一行，宽度由内容决定，设置 width/height 无效，只能设置水平方向的 padding 和 margin。常见行内元素：span、a、strong。',
  'inline-block': '行内块元素结合了行内和块级特性：像行内元素一样水平排列，但可以像块级元素一样设置宽高。常用于创建水平菜单、按钮组。',
  none: '元素完全隐藏，不占据任何空间，也不参与布局。与 visibility: hidden 不同，后者隐藏元素但仍占据空间。',
  flex: '弹性盒子布局。元素本身表现为块级元素，其子元素按照 flex 布局规则排列。用于创建灵活的响应式布局。',
  grid: '网格布局。元素本身表现为块级元素，其子元素按照网格系统排列。用于创建二维布局结构。',
}

export function DisplayValueDemo() {
  const [display, setDisplay] = useState<DisplayValue>('block')
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(100)

  const handlePreset = (preset: Preset) => {
    setDisplay(preset.display)
  }

  const displayValues: DisplayValue[] = ['block', 'inline', 'inline-block', 'none', 'flex', 'grid']

  const getElementStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display,
    }

    // inline elements ignore width/height
    if (display !== 'inline' && display !== 'none') {
      base.width = `${width}px`
      base.height = `${height}px`
    }

    return base
  }

  const getCSSCode = () => {
    const lines = ['.element {', `  display: ${display};`]

    if (display !== 'inline' && display !== 'none') {
      lines.push(`  width: ${width}px;`)
      lines.push(`  height: ${height}px;`)
    }

    if (display === 'inline') {
      lines.push('  /* width/height 无效 */')
    }

    lines.push('}')
    return lines.join('\n')
  }

  const showSizeControls = display !== 'inline' && display !== 'none'

  return (
    <div className="space-y-4">
      {/* Preset Scenarios */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground mr-2">预设场景:</span>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(preset)}
            className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Display Value Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">display 属性值</div>
        <div className="flex flex-wrap gap-2">
          {displayValues.map((value) => (
            <button
              key={value}
              onClick={() => setDisplay(value)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                display === value
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Size Controls */}
      {showSizeControls && (
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">宽度 (width)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {width}px
              </Badge>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">高度 (height)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {height}px
              </Badge>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>
        </div>
      )}

      {/* Visual Container */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化效果</div>
        <div className="min-h-[300px] p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <div className="text-xs text-muted-foreground mb-3">
            容器内包含三个元素，中间元素应用 display 属性：
          </div>

          <div className="flex flex-wrap items-start gap-2">
            <div className="w-24 h-16 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
              前置元素
            </div>

            {display !== 'none' && (
              <div
                style={getElementStyle()}
                className="bg-blue-500 dark:bg-blue-600 text-white rounded flex items-center justify-center text-sm font-medium transition-all duration-300"
              >
                {display === 'flex' || display === 'grid' ? (
                  <div className="w-full h-full flex items-center justify-center gap-2 p-2">
                    <div className="w-8 h-8 bg-white/30 rounded"></div>
                    <div className="w-8 h-8 bg-white/30 rounded"></div>
                    <div className="w-8 h-8 bg-white/30 rounded"></div>
                  </div>
                ) : (
                  `display: ${display}`
                )}
              </div>
            )}

            {display === 'none' && (
              <div className="w-24 h-16 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-xs text-muted-foreground">
                已隐藏
              </div>
            )}

            <div className="w-24 h-16 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
              后置元素
            </div>
          </div>

          {/* Behavior Indicators */}
          <div className="mt-4 p-3 bg-background rounded border border-border">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {display === 'block' && '独占一行'}
                  {display === 'inline' && '与其他元素同行'}
                  {display === 'inline-block' && '与其他元素同行，但可设置尺寸'}
                  {display === 'none' && '不占据空间'}
                  {display === 'flex' && '块级容器，子元素弹性布局'}
                  {display === 'grid' && '块级容器，子元素网格布局'}
                </Badge>
              </div>
              <div className="text-muted-foreground">
                {showSizeControls ? '✓ 可设置 width/height' : '✗ width/height 无效'}
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
          💡 {explanations[display]}
        </p>
      </div>
    </div>
  )
}
