'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type CombinatorType = 'descendant' | 'child' | 'adjacent' | 'general' | 'none'

interface TreeNode {
  id: string
  tag: string
  content: string
  children?: TreeNode[]
}

const domTree: TreeNode = {
  id: 'root',
  tag: 'div',
  content: 'container',
  children: [
    {
      id: 'header',
      tag: 'header',
      content: 'header',
      children: [
        { id: 'h1', tag: 'h1', content: 'Title' },
        { id: 'nav', tag: 'nav', content: 'nav' },
      ],
    },
    {
      id: 'main',
      tag: 'main',
      content: 'main',
      children: [
        { id: 'h2', tag: 'h2', content: 'Heading' },
        {
          id: 'section',
          tag: 'section',
          content: 'section',
          children: [
            { id: 'p1', tag: 'p', content: 'Paragraph 1' },
            { id: 'p2', tag: 'p', content: 'Paragraph 2' },
          ],
        },
        { id: 'p3', tag: 'p', content: 'Paragraph 3' },
      ],
    },
    { id: 'footer', tag: 'footer', content: 'footer' },
  ],
}

const presets = [
  { name: 'div p', type: 'descendant' as CombinatorType, description: '所有后代 <p>' },
  { name: 'main > p', type: 'child' as CombinatorType, description: '直接子元素 <p>' },
  { name: 'h2 + section', type: 'adjacent' as CombinatorType, description: '紧邻的兄弟' },
  { name: 'h2 ~ p', type: 'general' as CombinatorType, description: '之后的所有兄弟 <p>' },
]

const combinatorButtons = [
  { type: 'descendant' as CombinatorType, label: '后代 (space)', syntax: 'div p', symbol: ' ' },
  { type: 'child' as CombinatorType, label: '子元素 (>)', syntax: 'main > p', symbol: '>' },
  { type: 'adjacent' as CombinatorType, label: '相邻兄弟 (+)', syntax: 'h2 + section', symbol: '+' },
  { type: 'general' as CombinatorType, label: '通用兄弟 (~)', syntax: 'h2 ~ p', symbol: '~' },
]

export function CombinatorDemo() {
  const [selectedCombinator, setSelectedCombinator] = useState<CombinatorType>('none')

  const getMatchedIds = (): Set<string> => {
    const matched = new Set<string>()

    switch (selectedCombinator) {
      case 'descendant':
        // div p - all <p> descendants of div
        matched.add('p1')
        matched.add('p2')
        matched.add('p3')
        break
      case 'child':
        // main > p - direct <p> children of main
        matched.add('p3')
        break
      case 'adjacent':
        // h2 + section - section immediately after h2
        matched.add('section')
        break
      case 'general':
        // h2 ~ p - all <p> siblings after h2
        matched.add('p3')
        break
    }

    return matched
  }

  const matchedIds = getMatchedIds()

  const getExplanation = (): string => {
    switch (selectedCombinator) {
      case 'descendant':
        return '后代选择器（空格）：匹配第一个元素内部的所有指定元素，无论嵌套层级有多深。这里 "div p" 匹配 div 内的所有 <p> 元素。'
      case 'child':
        return '子选择器（>）：只匹配第一个元素的直接子元素。这里 "main > p" 只匹配 main 的直接子元素 <p>，不包括 section 内的 <p>。'
      case 'adjacent':
        return '相邻兄弟选择器（+）：匹配紧接在第一个元素之后的元素，且它们有相同的父元素。这里 "h2 + section" 匹配紧跟在 h2 后面的 section。'
      case 'general':
        return '通用兄弟选择器（~）：匹配第一个元素之后的所有指定兄弟元素。这里 "h2 ~ p" 匹配 h2 之后的所有同级 <p> 元素。'
      default:
        return '选择一个组合器类型来查看元素关系匹配效果。'
    }
  }

  const getCurrentSyntax = (): string => {
    const button = combinatorButtons.find((b) => b.type === selectedCombinator)
    return button?.syntax ?? ''
  }

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const matched = matchedIds.has(node.id)
    const indent = level * 24

    return (
      <div key={node.id} style={{ marginLeft: `${indent}px` }}>
        <div
          className={`inline-block px-3 py-2 rounded-md border-2 transition-all duration-300 mb-2 ${
            matched
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 shadow-md'
              : 'border-border bg-muted/30'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm">
              <span className="text-purple-600 dark:text-purple-400">&lt;{node.tag}&gt;</span>
              <span className="text-foreground mx-2">{node.content}</span>
            </span>
            {matched && (
              <Badge variant="default" className="text-xs bg-blue-500 dark:bg-blue-600">
                匹配
              </Badge>
            )}
          </div>
        </div>

        {node.children && (
          <div className="relative">
            {level < 2 && (
              <div
                className="absolute left-2 top-0 bottom-0 w-0.5 bg-border"
                style={{ left: `${indent + 12}px` }}
              />
            )}
            {node.children.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const handlePreset = (preset: typeof presets[0]) => {
    setSelectedCombinator(preset.type)
  }

  return (
    <div className="space-y-4">
      {/* Preset Scenarios */}
      <div className="space-y-2">
        <div className="text-sm font-medium">示例选择器</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePreset(preset)}
              className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
            >
              <span className="font-mono">{preset.name}</span>
              <span className="text-muted-foreground ml-2">— {preset.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Combinator Type Buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">组合器类型</div>
        <div className="flex flex-wrap gap-2">
          {combinatorButtons.map((button) => (
            <button
              key={button.type}
              onClick={() => setSelectedCombinator(button.type)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedCombinator === button.type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {button.label}
            </button>
          ))}
          <button
            onClick={() => setSelectedCombinator('none')}
            className="px-3 py-2 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            清除
          </button>
        </div>
      </div>

      {/* Match Count */}
      {selectedCombinator !== 'none' && (
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">匹配元素：</span>
          <Badge variant="secondary" className="font-mono text-sm">
            {matchedIds.size} 个
          </Badge>
        </div>
      )}

      {/* DOM Tree Display */}
      <div className="space-y-2">
        <div className="text-sm font-medium">DOM 树结构</div>
        <div className="p-4 bg-muted/20 rounded-lg border border-border overflow-x-auto">
          {renderTreeNode(domTree)}
        </div>
      </div>

      {/* CSS Code Output */}
      {selectedCombinator !== 'none' && (
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
