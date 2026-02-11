'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type PseudoCategory = 'user-action' | 'ui-state' | 'structural' | 'none'

const categories = [
  { type: 'user-action' as PseudoCategory, label: '用户交互', examples: ':hover, :focus, :active' },
  { type: 'ui-state' as PseudoCategory, label: 'UI 状态', examples: ':checked, :disabled, :valid' },
  { type: 'structural' as PseudoCategory, label: '结构伪类', examples: ':first-child, :last-child, :nth-child' },
]

export function PseudoClassDemo() {
  const [selectedCategory, setSelectedCategory] = useState<PseudoCategory>('none')
  const [isChecked, setIsChecked] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [activeStates, setActiveStates] = useState<Set<string>>(new Set())

  const handleMouseEnter = (id: string) => {
    setActiveStates((prev) => new Set(prev).add(`${id}:hover`))
  }

  const handleMouseLeave = (id: string) => {
    setActiveStates((prev) => {
      const next = new Set(prev)
      next.delete(`${id}:hover`)
      return next
    })
  }

  const handleFocus = (id: string) => {
    setActiveStates((prev) => new Set(prev).add(`${id}:focus`))
  }

  const handleBlur = (id: string) => {
    setActiveStates((prev) => {
      const next = new Set(prev)
      next.delete(`${id}:focus`)
      return next
    })
  }

  const getActiveClasses = () => {
    const classes: string[] = []

    if (activeStates.has('button:hover')) classes.push('button:hover')
    if (activeStates.has('link:hover')) classes.push('a:hover')
    if (activeStates.has('button:focus')) classes.push('button:focus')
    if (activeStates.has('input:focus')) classes.push('input:focus')
    if (isChecked) classes.push('input:checked')
    if (isDisabled) classes.push('button:disabled')
    if (inputValue && inputValue.length >= 3) classes.push('input:valid')
    if (inputValue && inputValue.length < 3) classes.push('input:invalid')

    return classes
  }

  const getExplanation = (): string => {
    switch (selectedCategory) {
      case 'user-action':
        return '用户交互伪类：响应用户的操作行为。:hover 鼠标悬停时触发，:focus 元素获得焦点时触发，:active 元素被激活（如点击）时触发。这些伪类常用于提供视觉反馈。'
      case 'ui-state':
        return 'UI 状态伪类：根据表单元素的状态匹配。:checked 匹配被选中的复选框或单选按钮，:disabled 匹配被禁用的元素，:valid 和 :invalid 根据表单验证结果匹配。'
      case 'structural':
        return '结构伪类：根据元素在 DOM 树中的位置匹配。:first-child 匹配父元素的第一个子元素，:last-child 匹配最后一个，:nth-child(n) 可以匹配特定位置或模式的子元素。'
      default:
        return '选择一个伪类类别来查看交互效果。尝试与下方的元素交互以激活不同的伪类状态。'
    }
  }

  const getCSSCode = () => {
    const activeClasses = getActiveClasses()
    if (activeClasses.length === 0) {
      return '/* 与元素交互以查看伪类效果 */'
    }

    return activeClasses.map((cls) => {
      switch (cls) {
        case 'button:hover':
          return `button:hover {\n  background-color: #3b82f6;\n  transform: scale(1.05);\n}`
        case 'a:hover':
          return `a:hover {\n  color: #2563eb;\n  text-decoration: underline;\n}`
        case 'button:focus':
          return `button:focus {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}`
        case 'input:focus':
          return `input:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}`
        case 'input:checked':
          return `input:checked {\n  background-color: #3b82f6;\n  border-color: #3b82f6;\n}`
        case 'button:disabled':
          return `button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}`
        case 'input:valid':
          return `input:valid {\n  border-color: #10b981;\n}`
        case 'input:invalid':
          return `input:invalid {\n  border-color: #ef4444;\n}`
        default:
          return ''
      }
    }).join('\n\n')
  }

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">伪类类别</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.type}
              onClick={() => setSelectedCategory(category.type)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedCategory === category.type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div>{category.label}</div>
              <div className="text-xs opacity-80 mt-0.5">{category.examples}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="text-sm font-medium mb-3">交互元素 — 尝试悬停、聚焦、点击</div>

        {/* Button - User Action */}
        <div className="flex items-center gap-3">
          <button
            onMouseEnter={() => handleMouseEnter('button')}
            onMouseLeave={() => handleMouseLeave('button')}
            onFocus={() => handleFocus('button')}
            onBlur={() => handleBlur('button')}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              isDisabled
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                : activeStates.has('button:hover')
                ? 'bg-blue-500 text-white scale-105 shadow-lg'
                : 'bg-blue-400 text-white'
            } ${
              activeStates.has('button:focus')
                ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                : ''
            }`}
          >
            按钮
          </button>
          <div className="flex gap-2 text-xs">
            {activeStates.has('button:hover') && (
              <Badge variant="default">:hover</Badge>
            )}
            {activeStates.has('button:focus') && (
              <Badge variant="default">:focus</Badge>
            )}
            {isDisabled && (
              <Badge variant="secondary">:disabled</Badge>
            )}
          </div>
        </div>

        {/* Link - User Action */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            onMouseEnter={() => handleMouseEnter('link')}
            onMouseLeave={() => handleMouseLeave('link')}
            className={`text-blue-600 dark:text-blue-400 transition-all ${
              activeStates.has('link:hover') ? 'underline text-blue-700 dark:text-blue-300' : ''
            }`}
          >
            链接元素
          </a>
          <div className="flex gap-2 text-xs">
            {activeStates.has('link:hover') && (
              <Badge variant="default">:hover</Badge>
            )}
          </div>
        </div>

        {/* Checkbox - UI State */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 accent-blue-500"
            />
            <span className="text-sm">复选框</span>
          </label>
          <div className="flex gap-2 text-xs">
            {isChecked && (
              <Badge variant="default">:checked</Badge>
            )}
          </div>
        </div>

        {/* Text Input - UI State & Focus */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="输入至少 3 个字符"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => handleFocus('input')}
            onBlur={() => handleBlur('input')}
            className={`w-full px-3 py-2 rounded-md border-2 transition-all ${
              activeStates.has('input:focus')
                ? 'border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
                : inputValue && inputValue.length >= 3
                ? 'border-green-500'
                : inputValue
                ? 'border-red-500'
                : 'border-border'
            } bg-background`}
          />
          <div className="flex gap-2 text-xs">
            {activeStates.has('input:focus') && (
              <Badge variant="default">:focus</Badge>
            )}
            {inputValue && inputValue.length >= 3 && (
              <Badge variant="default" className="bg-green-600">:valid</Badge>
            )}
            {inputValue && inputValue.length < 3 && (
              <Badge variant="default" className="bg-red-600">:invalid</Badge>
            )}
          </div>
        </div>

        {/* Structural - List */}
        {selectedCategory === 'structural' && (
          <div className="space-y-2 mt-4">
            <div className="text-sm font-medium">列表（结构伪类）</div>
            <ul className="space-y-1">
              {['第一项', '第二项', '第三项', '最后一项'].map((item, index, arr) => (
                <li
                  key={index}
                  className={`px-3 py-2 rounded ${
                    index === 0
                      ? 'bg-blue-100 dark:bg-blue-950/50 border-l-4 border-blue-500'
                      : index === arr.length - 1
                      ? 'bg-purple-100 dark:bg-purple-950/50 border-l-4 border-purple-500'
                      : index % 2 === 1
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <div className="flex gap-1 text-xs">
                      {index === 0 && <Badge variant="default" className="bg-blue-500">:first-child</Badge>}
                      {index === arr.length - 1 && <Badge variant="default" className="bg-purple-500">:last-child</Badge>}
                      {index % 2 === 1 && index !== arr.length - 1 && <Badge variant="secondary">:nth-child(even)</Badge>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disabled Toggle */}
        <div className="pt-3 border-t border-border">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
              className="w-4 h-4"
            />
            <span>禁用按钮（测试 :disabled）</span>
          </label>
        </div>
      </div>

      {/* Active Pseudo-classes Status */}
      <div className="p-3 bg-muted/30 rounded-lg">
        <div className="text-sm font-medium mb-2">当前激活的伪类</div>
        <div className="flex flex-wrap gap-2">
          {getActiveClasses().length > 0 ? (
            getActiveClasses().map((cls) => (
              <Badge key={cls} variant="secondary" className="font-mono text-xs">
                {cls}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">与上方元素交互以激活伪类</span>
          )}
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium">CSS 代码</div>
        <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
          <code>{getCSSCode()}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground">
          {getExplanation()}
        </div>
      </div>
    </div>
  )
}
