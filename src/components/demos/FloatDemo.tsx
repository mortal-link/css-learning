'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type FloatValue = 'none' | 'left' | 'right'
type ClearValue = 'none' | 'left' | 'right' | 'both'

interface Preset {
  name: string
  float: FloatValue
  clear: ClearValue
  showClearfix: boolean
}

const presets: Preset[] = [
  { name: '图文环绕', float: 'left', clear: 'none', showClearfix: false },
  { name: '多列浮动', float: 'left', clear: 'none', showClearfix: false },
  { name: '清除浮动', float: 'left', clear: 'both', showClearfix: false },
  { name: 'BFC包含', float: 'left', clear: 'none', showClearfix: true },
]

export function FloatDemo() {
  const [float, setFloat] = useState<FloatValue>('none')
  const [clear, setClear] = useState<ClearValue>('none')
  const [showClearfix, setShowClearfix] = useState(false)

  const handlePreset = (preset: Preset) => {
    setFloat(preset.float)
    setClear(preset.clear)
    setShowClearfix(preset.showClearfix)
  }

  const getCSSCode = () => {
    const lines: string[] = []

    // Floated element
    lines.push('.floated-box {')
    lines.push(`  float: ${float};`)
    if (float !== 'none') {
      lines.push('  width: 120px;')
      lines.push('  height: 120px;')
      lines.push('  margin: 0 15px 10px 0;')
    }
    lines.push('}')

    // Clear element
    if (clear !== 'none') {
      lines.push('')
      lines.push('.clear-element {')
      lines.push(`  clear: ${clear};`)
      lines.push('}')
    }

    // Clearfix
    if (showClearfix) {
      lines.push('')
      lines.push('.container {')
      lines.push('  overflow: auto; /* 建立 BFC */')
      lines.push('  /* 或使用 ::after 伪元素清除浮动 */')
      lines.push('}')
    }

    return lines.join('\n')
  }

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

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Float Control */}
        <div className="space-y-2">
          <div className="text-sm font-medium">float 属性</div>
          <div className="flex flex-col gap-2">
            {(['none', 'left', 'right'] as FloatValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setFloat(value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  float === value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Control */}
        <div className="space-y-2">
          <div className="text-sm font-medium">clear 属性</div>
          <div className="flex flex-col gap-2">
            {(['none', 'left', 'right', 'both'] as ClearValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setClear(value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  clear === value
                    ? 'bg-green-500 text-white dark:bg-green-600'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Clearfix Toggle */}
        <div className="space-y-2">
          <div className="text-sm font-medium">容器处理</div>
          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
            <input
              type="checkbox"
              id="clearfix"
              checked={showClearfix}
              onChange={(e) => setShowClearfix(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <label htmlFor="clearfix" className="text-sm">
              BFC 包含浮动
            </label>
          </div>
          <div className="text-xs text-muted-foreground p-2 bg-background rounded">
            启用后容器会扩展以包含浮动元素（解决高度塌陷）
          </div>
        </div>
      </div>

      {/* Visual Container */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化效果</div>
        <div
          className={`p-4 bg-muted/30 rounded-lg border-2 ${
            showClearfix
              ? 'border-green-500 dark:border-green-400 overflow-auto'
              : 'border-dashed border-border'
          }`}
        >
          {showClearfix && (
            <div className="text-xs text-green-600 dark:text-green-400 mb-2">
              ✓ 容器建立了 BFC，包含浮动元素
            </div>
          )}

          {/* Floated Box */}
          <div
            className={`${
              float === 'none' ? '' : `float-${float}`
            } w-[120px] h-[120px] bg-blue-500 dark:bg-blue-600 rounded flex items-center justify-center text-white font-medium text-sm transition-all duration-300 ${
              float !== 'none' ? 'mr-4 mb-2' : 'mb-4'
            }`}
          >
            浮动元素
            <br />
            float: {float}
          </div>

          {/* Text Content */}
          <p className="text-sm text-foreground leading-relaxed">
            这是一段环绕文本内容。当元素设置 float 属性后，它会脱离正常文档流，
            向左或向右浮动，直到它的外边缘碰到包含框或另一个浮动元素的边缘。
            文本和行内元素会环绕浮动元素排列。这是实现图文混排的经典方式。
            浮动元素虽然脱离了文档流，但仍会影响周围内容的布局。
            需要注意的是，浮动元素的父容器可能会发生高度塌陷问题。
          </p>

          {/* Clear Element */}
          {clear !== 'none' && (
            <div
              className={`clear-${clear} mt-4 p-3 bg-green-500 dark:bg-green-600 text-white rounded text-sm`}
            >
              清除浮动元素 (clear: {clear})
              <div className="text-xs mt-1 opacity-90">
                此元素不允许其{' '}
                {clear === 'both' ? '任意' : clear === 'left' ? '左' : '右'}
                侧出现浮动元素
              </div>
            </div>
          )}
        </div>

        {/* Collapse Warning */}
        {float !== 'none' && !showClearfix && (
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              ⚠️ 高度塌陷：容器没有包含浮动元素的高度。启用"BFC 包含浮动"可解决此问题。
            </p>
          </div>
        )}
      </div>

      {/* Behavior Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
            Float 特性
          </div>
          <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <li>• 元素脱离文档流</li>
            <li>• 文本和行内元素环绕</li>
            <li>• 可能导致父容器高度塌陷</li>
            <li>• 块级元素变为"收缩包裹"</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            清除浮动方案
          </div>
          <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
            <li>• clear 属性：阻止元素旁边浮动</li>
            <li>• BFC 容器：包含浮动元素高度</li>
            <li>• ::after 伪元素清除法</li>
            <li>• overflow: hidden/auto</li>
          </ul>
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
          💡 浮动最初是为了实现图文环绕效果。浮动元素会脱离文档流，但文本和行内元素会环绕它排列。
          由于浮动元素脱离了文档流，可能导致父容器高度塌陷，需要使用清除浮动技术（clearfix）来解决。
        </p>
      </div>
    </div>
  )
}
