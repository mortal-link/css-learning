'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type PseudoElementType = 'before' | 'after' | 'first-line' | 'first-letter' | 'selection' | 'marker'

interface PseudoElement {
  type: PseudoElementType
  label: string
  description: string
}

const pseudoElements: PseudoElement[] = [
  { type: 'before', label: '::before', description: '在元素内容前插入' },
  { type: 'after', label: '::after', description: '在元素内容后插入' },
  { type: 'first-line', label: '::first-line', description: '首行样式' },
  { type: 'first-letter', label: '::first-letter', description: '首字母样式' },
  { type: 'selection', label: '::selection', description: '选中文本样式' },
  { type: 'marker', label: '::marker', description: '列表标记样式' },
]

const presets = [
  { name: '装饰引号', active: new Set<PseudoElementType>(['before', 'after']) },
  { name: '首字下沉', active: new Set<PseudoElementType>(['first-letter']) },
  { name: '自定义选中', active: new Set<PseudoElementType>(['selection']) },
  { name: '列表标记', active: new Set<PseudoElementType>(['marker']) },
]

export function PseudoElementSelectorDemo() {
  const [activeElements, setActiveElements] = useState<Set<PseudoElementType>>(new Set())

  const toggleElement = (type: PseudoElementType) => {
    setActiveElements((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  const applyPreset = (preset: typeof presets[0]) => {
    setActiveElements(new Set(preset.active))
  }

  const clearAll = () => {
    setActiveElements(new Set())
  }

  const getTextStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {}

    if (activeElements.has('first-line')) {
      // Can't directly style with inline styles, will use classes
    }

    return style
  }

  const getCSSCode = () => {
    const codes: string[] = []

    if (activeElements.has('before')) {
      codes.push(`p::before {\n  content: "❝";\n  color: #3b82f6;\n  font-size: 2em;\n  margin-right: 0.25em;\n}`)
    }

    if (activeElements.has('after')) {
      codes.push(`p::after {\n  content: "❞";\n  color: #3b82f6;\n  font-size: 2em;\n  margin-left: 0.25em;\n}`)
    }

    if (activeElements.has('first-line')) {
      codes.push(`p::first-line {\n  font-weight: bold;\n  color: #8b5cf6;\n  text-transform: uppercase;\n}`)
    }

    if (activeElements.has('first-letter')) {
      codes.push(`p::first-letter {\n  font-size: 3em;\n  font-weight: bold;\n  color: #ef4444;\n  float: left;\n  line-height: 0.8;\n  margin-right: 0.1em;\n}`)
    }

    if (activeElements.has('selection')) {
      codes.push(`p::selection {\n  background-color: #fbbf24;\n  color: #000;\n}`)
    }

    if (activeElements.has('marker')) {
      codes.push(`li::marker {\n  content: "✓ ";\n  color: #10b981;\n  font-size: 1.2em;\n}`)
    }

    return codes.length > 0 ? codes.join('\n\n') : '/* 选择伪元素以查看 CSS 代码 */'
  }

  return (
    <div className="space-y-4">
      {/* Preset Buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">预设样式</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            清除全部
          </button>
        </div>
      </div>

      {/* Pseudo-element Toggle Buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">伪元素（可多选）</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {pseudoElements.map((element) => (
            <button
              key={element.type}
              onClick={() => toggleElement(element.type)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                activeElements.has(element.type)
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="font-mono">{element.label}</div>
              <div className="text-xs opacity-80 mt-0.5">{element.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Pseudo-elements */}
      {activeElements.size > 0 && (
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">已激活：</span>
          <div className="flex flex-wrap gap-2">
            {Array.from(activeElements).map((type) => (
              <Badge key={type} variant="secondary" className="font-mono text-xs">
                ::{type}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Visual Preview - Paragraph */}
      <div className="space-y-2">
        <div className="text-sm font-medium">段落示例</div>
        <div className="p-4 bg-background rounded-lg border-2 border-border">
          <p
            className={`text-base leading-relaxed ${
              activeElements.has('selection') ? 'selection:bg-amber-300 selection:text-black' : ''
            }`}
            style={getTextStyle()}
          >
            <span className="relative">
              {activeElements.has('before') && (
                <span className="text-blue-500 text-3xl mr-1 absolute -left-6 top-0">❝</span>
              )}
              {activeElements.has('first-letter') && (
                <span className="float-left text-5xl font-bold text-red-500 leading-[0.8] mr-1">
                  C
                </span>
              )}
              <span className={activeElements.has('first-line') ? 'font-bold text-purple-600 uppercase' : ''}>
                SS 层叠样式表是一种用于描述 HTML 文档样式的语言。
              </span>
              它可以控制网页的布局、颜色、字体等视觉表现。通过 CSS，我们可以将内容与表现分离，使网页更易于维护和修改。伪元素是 CSS 中强大的功能，允许我们选择和样式化元素的特定部分。
              {activeElements.has('after') && (
                <span className="text-blue-500 text-3xl ml-1">❞</span>
              )}
            </span>
          </p>
          {activeElements.has('selection') && (
            <div className="mt-3 text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
              💡 提示：选中上方文本以查看自定义的 ::selection 样式
            </div>
          )}
        </div>
      </div>

      {/* Visual Preview - List (for ::marker) */}
      {activeElements.has('marker') && (
        <div className="space-y-2">
          <div className="text-sm font-medium">列表示例（::marker）</div>
          <div className="p-4 bg-background rounded-lg border-2 border-border">
            <ul className="space-y-2">
              {['第一项内容', '第二项内容', '第三项内容'].map((item, index) => (
                <li
                  key={index}
                  className="ml-6"
                  style={{
                    listStyleType: 'none',
                    position: 'relative',
                  }}
                >
                  <span
                    className="absolute left-[-1.5em] text-green-600 text-xl"
                    style={{ content: '"✓ "' }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium">CSS 代码</div>
        <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
          <code>{getCSSCode()}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground space-y-2">
          <p>
            <strong>伪元素</strong>允许你选择和样式化元素的特定部分，而不需要添加额外的 HTML 标记。使用双冒号 :: 语法（单冒号 : 在 CSS2 中也支持）。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div>• <strong>::before / ::after</strong> — 插入内容，需要 content 属性</div>
            <div>• <strong>::first-line</strong> — 只能用于块级元素</div>
            <div>• <strong>::first-letter</strong> — 首字符样式，常用于首字下沉</div>
            <div>• <strong>::selection</strong> — 用户选中文本的样式</div>
            <div>• <strong>::marker</strong> — 列表项标记样式（CSS3）</div>
          </div>
        </div>
      </div>
    </div>
  )
}
