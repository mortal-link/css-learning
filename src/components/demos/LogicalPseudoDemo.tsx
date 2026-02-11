'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type LogicalType = 'is' | 'where' | 'not' | 'has' | 'none'

interface ListItem {
  id: string
  tag: string
  classes: string[]
  attributes?: Record<string, string>
  content: string
  children?: Array<{ tag: string; content: string }>
}

const listItems: ListItem[] = [
  { id: '1', tag: 'li', classes: ['important'], content: '重要项目', attributes: { 'data-priority': 'high' } },
  { id: '2', tag: 'li', classes: ['normal'], content: '普通项目' },
  { id: '3', tag: 'li', classes: ['important', 'urgent'], content: '紧急项目', attributes: { 'data-priority': 'high' } },
  { id: '4', tag: 'li', classes: ['completed'], content: '已完成', attributes: { 'data-status': 'done' } },
  { id: '5', tag: 'li', classes: ['normal'], content: '普通项目', children: [{ tag: 'span', content: '有子元素' }] },
  { id: '6', tag: 'li', classes: ['important'], content: '重要项目' },
]

const logicalSelectors = [
  { type: 'is' as LogicalType, label: ':is()', syntax: ':is(.important, .urgent)' },
  { type: 'where' as LogicalType, label: ':where()', syntax: ':where(.important, .urgent)' },
  { type: 'not' as LogicalType, label: ':not()', syntax: ':not(.completed)' },
  { type: 'has' as LogicalType, label: ':has()', syntax: ':has(span)' },
]

export function LogicalPseudoDemo() {
  const [selectedType, setSelectedType] = useState<LogicalType>('none')

  const isItemMatched = (item: ListItem): boolean => {
    switch (selectedType) {
      case 'is':
        // :is(.important, .urgent) - matches if element has ANY of these classes
        return item.classes.includes('important') || item.classes.includes('urgent')
      case 'where':
        // :where(.important, .urgent) - same matching but specificity is 0
        return item.classes.includes('important') || item.classes.includes('urgent')
      case 'not':
        // :not(.completed) - matches elements that DON'T have this class
        return !item.classes.includes('completed')
      case 'has':
        // :has(span) - matches elements that have a span child
        return item.children !== undefined && item.children.some((child) => child.tag === 'span')
      case 'none':
        return false
      default:
        return false
    }
  }

  const matchCount = listItems.filter(isItemMatched).length

  const getSpecificity = (): string => {
    switch (selectedType) {
      case 'is':
        return '(0, 1, 0) — 使用参数中最高的特异性（这里是 .important 的类选择器）'
      case 'where':
        return '(0, 0, 0) — 特异性始终为 0，不影响优先级计算'
      case 'not':
        return '(0, 1, 0) — 使用参数的特异性（这里是 .completed 的类选择器）'
      case 'has':
        return '(0, 1, 0) — 使用参数的特异性（这里是 span 的类型选择器，但因为在 :has() 中计为 0,1,0）'
      default:
        return ''
    }
  }

  const getExplanation = (): string => {
    switch (selectedType) {
      case 'is':
        return ':is() 伪类：匹配参数列表中任意一个选择器。等价于将多个选择器用逗号分隔，但更简洁。特异性等于参数列表中最高的特异性。例如 :is(.important, .urgent) 匹配所有 .important 或 .urgent 元素。'
      case 'where':
        return ':where() 伪类：功能与 :is() 相同，但特异性始终为 0。这在编写可被轻松覆盖的基础样式时很有用。例如 :where(.important, .urgent) 匹配相同元素，但优先级更低。'
      case 'not':
        return ':not() 伪类：匹配不符合参数选择器的元素，用于排除特定元素。特异性等于参数的特异性。例如 :not(.completed) 匹配所有没有 .completed 类的元素。'
      case 'has':
        return ':has() 伪类：根据元素的后代来选择父元素，也称为"父选择器"。例如 li:has(span) 匹配包含 <span> 子元素的 <li> 元素。这是 CSS 中少数可以向上选择的方式。'
      default:
        return '选择一个逻辑伪类来查看匹配效果和特异性差异。'
    }
  }

  const getCurrentSyntax = (): string => {
    const selector = logicalSelectors.find((s) => s.type === selectedType)
    return selector?.syntax ?? ''
  }

  const renderListItem = (item: ListItem) => {
    const matched = isItemMatched(item)

    return (
      <li
        key={item.id}
        className={`p-3 rounded-md border-2 transition-all duration-300 ${
          matched
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 shadow-md'
            : 'border-border bg-muted/30'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="font-mono text-xs text-muted-foreground mb-1">
              &lt;{item.tag}
              {item.classes.length > 0 && (
                <span className="text-green-600 dark:text-green-400">
                  {' '}
                  class="{item.classes.join(' ')}"
                </span>
              )}
              {item.attributes && Object.entries(item.attributes).map(([key, val]) => (
                <span key={key} className="text-cyan-600 dark:text-cyan-400">
                  {' '}
                  {key}="{val}"
                </span>
              ))}
              &gt;
            </div>
            <div className="text-sm text-foreground">{item.content}</div>
            {item.children && (
              <div className="mt-2 ml-4 text-xs text-muted-foreground">
                {item.children.map((child, idx) => (
                  <div key={idx} className="font-mono">
                    &lt;{child.tag}&gt;{child.content}&lt;/{child.tag}&gt;
                  </div>
                ))}
              </div>
            )}
          </div>
          {matched && (
            <Badge variant="default" className="bg-blue-500 dark:bg-blue-600 shrink-0">
              匹配
            </Badge>
          )}
        </div>
      </li>
    )
  }

  return (
    <div className="space-y-4">
      {/* Logical Selector Buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">逻辑伪类</div>
        <div className="flex flex-wrap gap-2">
          {logicalSelectors.map((selector) => (
            <button
              key={selector.type}
              onClick={() => setSelectedType(selector.type)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedType === selector.type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="font-mono">{selector.label}</div>
              <div className="text-xs opacity-80 mt-0.5">{selector.syntax}</div>
            </button>
          ))}
          <button
            onClick={() => setSelectedType('none')}
            className="px-3 py-2 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            清除
          </button>
        </div>
      </div>

      {/* Match Count and Specificity */}
      {selectedType !== 'none' && (
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">匹配元素：</span>
            <Badge variant="secondary" className="font-mono text-sm">
              {matchCount} 个
            </Badge>
            <span className="text-sm text-muted-foreground">/ {listItems.length} 个元素</span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="text-xs">
              <span className="font-semibold text-amber-900 dark:text-amber-100">特异性：</span>
              <span className="text-amber-800 dark:text-amber-200 ml-2">{getSpecificity()}</span>
            </div>
          </div>
        </div>
      )}

      {/* List Items Display */}
      <div className="space-y-2">
        <div className="text-sm font-medium">元素列表</div>
        <ul className="space-y-2">
          {listItems.map((item) => renderListItem(item))}
        </ul>
      </div>

      {/* CSS Code Output */}
      {selectedType !== 'none' && (
        <div className="space-y-2">
          <div className="text-sm font-medium">CSS 选择器</div>
          <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-sm overflow-x-auto">
            <code>
              {'li'}
              {getCurrentSyntax()} {' {\n  /* 样式规则 */\n  background-color: lightblue;\n}'}
            </code>
          </pre>
        </div>
      )}

      {/* Comparison Table */}
      {(selectedType === 'is' || selectedType === 'where') && (
        <div className="p-3 bg-muted/30 rounded-lg border border-border">
          <div className="text-sm font-medium mb-2">:is() 与 :where() 对比</div>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>• <strong>匹配逻辑：</strong>完全相同，都匹配参数列表中的任意选择器</div>
            <div>• <strong>特异性：</strong>:is() 使用参数中最高的特异性，:where() 始终为 0</div>
            <div>• <strong>使用场景：</strong>:is() 用于正常样式，:where() 用于易被覆盖的基础样式</div>
          </div>
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
