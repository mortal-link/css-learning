'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'

interface SelectorPart {
  text: string
  type: 'element' | 'class' | 'id' | 'combinator'
}

const presets = [
  {
    name: '高效选择器',
    selector: '.btn-primary',
    description: '直接类选择器，最快',
    isEfficient: true
  },
  {
    name: '中等效率',
    selector: 'nav > ul li',
    description: '简洁的结构',
    isEfficient: true
  },
  {
    name: '低效选择器',
    selector: 'div div div div a',
    description: '过深嵌套，慢',
    isEfficient: false
  },
  {
    name: '通用选择器',
    selector: 'div * a',
    description: '包含通配符，慢',
    isEfficient: false
  },
]

export function SelectorPerfDemo() {
  const [selector, setSelector] = useState('.btn-primary')
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const parseSelector = (sel: string): SelectorPart[] => {
    const parts: SelectorPart[] = []
    const tokens = sel.trim().split(/(\s+|>|\+|~)/).filter((t) => t.trim())

    for (const token of tokens) {
      const trimmed = token.trim()
      if (!trimmed) continue

      if (trimmed === '>' || trimmed === '+' || trimmed === '~' || trimmed === ' ') {
        parts.push({ text: trimmed, type: 'combinator' })
      } else if (trimmed.startsWith('#')) {
        parts.push({ text: trimmed, type: 'id' })
      } else if (trimmed.startsWith('.')) {
        parts.push({ text: trimmed, type: 'class' })
      } else if (trimmed === '*') {
        parts.push({ text: trimmed, type: 'element' })
      } else {
        parts.push({ text: trimmed, type: 'element' })
      }
    }

    return parts
  }

  const selectorParts = parseSelector(selector)
  const totalSteps = selectorParts.filter((p) => p.type !== 'combinator').length

  const startAnimation = () => {
    setCurrentStep(-1)
    setIsAnimating(true)
    let step = 0

    const interval = setInterval(() => {
      setCurrentStep(step)
      step++

      if (step >= totalSteps) {
        clearInterval(interval)
        setTimeout(() => {
          setIsAnimating(false)
          setCurrentStep(-1)
        }, 1500)
      }
    }, 800)
  }

  const handlePreset = (preset: typeof presets[0]) => {
    setSelector(preset.selector)
    setCustomInput('')
    setCurrentStep(-1)
  }

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      setSelector(customInput.trim())
      setCurrentStep(-1)
    }
  }

  const getStepDescription = (): string => {
    if (currentStep === -1) return '点击"开始动画"查看浏览器如何从右向左匹配选择器'

    const relevantParts = selectorParts.filter((p) => p.type !== 'combinator').reverse()
    const currentPart = relevantParts[currentStep]

    if (currentStep === 0) {
      return `步骤 1：从最右边的选择器 "${currentPart?.text}" 开始，找到所有匹配的元素（关键选择器）`
    } else if (currentStep === totalSteps - 1) {
      return `步骤 ${currentStep + 1}：验证最左边的选择器 "${currentPart?.text}"，完成匹配`
    } else {
      return `步骤 ${currentStep + 1}：向左移动，验证选择器 "${currentPart?.text}"`
    }
  }

  const analyzeEfficiency = (): { level: string; color: string; advice: string } => {
    const hasUniversal = selector.includes('*')
    const depth = selectorParts.filter((p) => p.type !== 'combinator').length
    const hasId = selectorParts.some((p) => p.type === 'id')

    if (hasUniversal) {
      return {
        level: '低效',
        color: 'text-red-600 dark:text-red-400',
        advice: '避免使用通配符 *，它会匹配所有元素，性能开销大。',
      }
    }

    if (depth > 4) {
      return {
        level: '低效',
        color: 'text-red-600 dark:text-red-400',
        advice: '选择器层级过深（>4层），增加匹配复杂度。建议使用更具体的类名。',
      }
    }

    if (hasId) {
      return {
        level: '高效',
        color: 'text-green-600 dark:text-green-400',
        advice: 'ID 选择器非常快，浏览器可以直接定位元素。',
      }
    }

    if (depth <= 2) {
      return {
        level: '高效',
        color: 'text-green-600 dark:text-green-400',
        advice: '简洁的选择器，匹配快速。这是推荐的做法。',
      }
    }

    return {
      level: '中等',
      color: 'text-amber-600 dark:text-amber-400',
      advice: '选择器效率一般，可以考虑简化。',
    }
  }

  const efficiency = analyzeEfficiency()

  return (
    <div className="space-y-4">
      {/* Custom Input */}
      <div className="space-y-2">
        <div className="text-sm font-medium">自定义选择器</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
            placeholder="输入 CSS 选择器，如 div.container ul li a"
            className="flex-1 px-3 py-2 rounded-md border-2 border-border bg-background text-sm"
          />
          <button
            onClick={handleCustomSubmit}
            className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            应用
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">预设示例</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePreset(preset)}
              className={`px-3 py-2 text-left rounded-md transition-colors ${
                selector === preset.selector
                  ? 'bg-blue-100 dark:bg-blue-950/50 border-2 border-blue-500'
                  : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm">{preset.selector}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{preset.description}</div>
                </div>
                <Badge
                  variant={preset.isEfficient ? 'default' : 'secondary'}
                  className={preset.isEfficient ? 'bg-green-600' : 'bg-red-600'}
                >
                  {preset.isEfficient ? '高效' : '低效'}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Selector Display */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="text-sm font-medium mb-2">当前选择器</div>
        <div className="font-mono text-lg mb-3 flex flex-wrap items-center gap-1">
          {selectorParts.map((part, index) => {
            const nonCombinatorIndex = selectorParts
              .slice(0, index + 1)
              .filter((p) => p.type !== 'combinator').length - 1
            const isActive =
              isAnimating &&
              part.type !== 'combinator' &&
              nonCombinatorIndex === totalSteps - currentStep - 1

            return (
              <span
                key={index}
                className={`transition-all duration-300 ${
                  part.type === 'combinator'
                    ? 'text-muted-foreground mx-1'
                    : isActive
                    ? 'bg-blue-500 text-white px-2 py-1 rounded shadow-lg scale-110'
                    : 'text-foreground'
                }`}
              >
                {part.text === ' ' ? '␣' : part.text}
              </span>
            )
          })}
        </div>

        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className={`w-full px-4 py-2 text-sm rounded-md transition-colors ${
            isAnimating
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAnimating ? '匹配中...' : '开始动画'}
        </button>
      </div>

      {/* Animation Steps */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm font-medium mb-2">匹配过程（从右向左）</div>
        <div className="text-sm text-blue-900 dark:text-blue-100">
          {getStepDescription()}
        </div>
        {currentStep >= 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-blue-200 dark:bg-blue-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 dark:bg-blue-400 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-blue-700 dark:text-blue-300">
              {currentStep + 1}/{totalSteps}
            </span>
          </div>
        )}
      </div>

      {/* Efficiency Analysis */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-sm font-medium">性能评估</div>
          <Badge variant="secondary" className={efficiency.color}>
            {efficiency.level}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">{efficiency.advice}</div>
      </div>

      {/* Why Right-to-Left */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">为什么从右向左匹配？</p>
          <p>
            浏览器从<strong>最右边的选择器</strong>（关键选择器）开始匹配，然后向左验证。这种方式可以快速排除不匹配的元素：
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>如果右边的选择器不匹配，立即放弃，无需检查左边</li>
            <li>减少了需要检查的元素数量</li>
            <li>相比从左向右，避免了大量无效的 DOM 遍历</li>
          </ul>
          <p className="mt-2 pt-2 border-t border-border">
            <strong>优化建议：</strong>让最右边的选择器（关键选择器）尽可能具体，如使用类或 ID，避免使用通配符或过于宽泛的元素选择器。
          </p>
        </div>
      </div>
    </div>
  )
}
