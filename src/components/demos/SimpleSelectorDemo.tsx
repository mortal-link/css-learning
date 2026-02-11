'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type SelectorType = 'type' | 'class' | 'id' | 'universal' | 'attribute' | 'none'

interface Element {
  tag: string
  id?: string
  classes?: string[]
  attributes?: Record<string, string>
  content: string
}

const htmlElements: Element[] = [
  { tag: 'div', id: 'main', classes: ['container'], content: '主容器' },
  { tag: 'div', classes: ['highlight', 'box'], attributes: { 'data-type': 'content' }, content: '高亮框' },
  { tag: 'p', classes: ['text'], content: '段落文本' },
  { tag: 'span', content: '行内元素' },
  { tag: 'div', classes: ['box'], attributes: { 'data-type': 'sidebar' }, content: '侧边栏' },
  { tag: 'p', id: 'footer', content: '页脚段落' },
]

const selectorButtons = [
  { type: 'type' as SelectorType, label: '类型选择器 (div)', syntax: 'div' },
  { type: 'class' as SelectorType, label: '类选择器 (.highlight)', syntax: '.highlight' },
  { type: 'id' as SelectorType, label: 'ID 选择器 (#main)', syntax: '#main' },
  { type: 'universal' as SelectorType, label: '通用选择器 (*)', syntax: '*' },
  { type: 'attribute' as SelectorType, label: '属性选择器 ([data-type])', syntax: '[data-type]' },
]

export function SimpleSelectorDemo() {
  const [selectedSelector, setSelectedSelector] = useState<SelectorType>('none')

  const isElementMatched = (element: Element): boolean => {
    switch (selectedSelector) {
      case 'type':
        return element.tag === 'div'
      case 'class':
        return element.classes?.includes('highlight') ?? false
      case 'id':
        return element.id === 'main'
      case 'universal':
        return true
      case 'attribute':
        return element.attributes?.['data-type'] !== undefined
      case 'none':
        return false
      default:
        return false
    }
  }

  const matchCount = htmlElements.filter(isElementMatched).length

  const getCurrentSyntax = (): string => {
    const button = selectorButtons.find((b) => b.type === selectedSelector)
    return button?.syntax ?? 'none'
  }

  const getExplanation = (): string => {
    switch (selectedSelector) {
      case 'type':
        return '类型选择器：根据元素标签名匹配。这里匹配所有 <div> 元素。'
      case 'class':
        return '类选择器：匹配具有指定 class 属性的元素。使用 . 前缀，这里匹配 class="highlight" 的元素。'
      case 'id':
        return 'ID 选择器：匹配具有指定 id 属性的元素。使用 # 前缀，id 应该在文档中唯一。'
      case 'universal':
        return '通用选择器：匹配文档中的所有元素。常用于重置样式或应用全局样式。'
      case 'attribute':
        return '属性选择器：匹配具有指定属性的元素。这里匹配所有带有 data-type 属性的元素。'
      default:
        return '选择一个选择器类型来查看匹配效果。'
    }
  }

  const renderElement = (element: Element, index: number) => {
    const matched = isElementMatched(element)
    const classStr = element.classes?.join(' ') ?? ''
    const attrStr = element.attributes
      ? Object.entries(element.attributes)
          .map(([key, val]) => `${key}="${val}"`)
          .join(' ')
      : ''

    return (
      <div
        key={index}
        className={`p-3 rounded-md border-2 transition-all duration-300 ${
          matched
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 shadow-md'
            : 'border-border bg-muted/30'
        }`}
      >
        <div className="font-mono text-xs">
          <span className="text-purple-600 dark:text-purple-400">&lt;{element.tag}</span>
          {element.id && (
            <span className="text-amber-600 dark:text-amber-400"> id="{element.id}"</span>
          )}
          {classStr && (
            <span className="text-green-600 dark:text-green-400"> class="{classStr}"</span>
          )}
          {attrStr && (
            <span className="text-cyan-600 dark:text-cyan-400"> {attrStr}</span>
          )}
          <span className="text-purple-600 dark:text-purple-400">&gt;</span>
        </div>
        <div className="mt-2 text-sm text-foreground">{element.content}</div>
        <div className="font-mono text-xs text-purple-600 dark:text-purple-400">
          &lt;/{element.tag}&gt;
        </div>
        {matched && (
          <div className="mt-2 pt-2 border-t border-blue-300 dark:border-blue-700">
            <Badge variant="default" className="text-xs bg-blue-500 dark:bg-blue-600">
              匹配
            </Badge>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selector Type Buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">选择器类型</div>
        <div className="flex flex-wrap gap-2">
          {selectorButtons.map((button) => (
            <button
              key={button.type}
              onClick={() => setSelectedSelector(button.type)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedSelector === button.type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {button.label}
            </button>
          ))}
          <button
            onClick={() => setSelectedSelector('none')}
            className="px-3 py-2 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            清除
          </button>
        </div>
      </div>

      {/* Match Count */}
      {selectedSelector !== 'none' && (
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">匹配元素：</span>
          <Badge variant="secondary" className="font-mono text-sm">
            {matchCount} 个
          </Badge>
          <span className="text-sm text-muted-foreground">/ {htmlElements.length} 个元素</span>
        </div>
      )}

      {/* HTML Elements Display */}
      <div className="space-y-2">
        <div className="text-sm font-medium">HTML 文档</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {htmlElements.map((element, index) => renderElement(element, index))}
        </div>
      </div>

      {/* CSS Code Output */}
      {selectedSelector !== 'none' && (
        <div className="space-y-2">
          <div className="text-sm font-medium">CSS 选择器</div>
          <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-sm overflow-x-auto">
            <code>{getCurrentSyntax()} {'{\n  /* 样式规则 */\n}'}</code>
          </pre>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground">
          {getExplanation()}
        </div>
      </div>
    </div>
  )
}
