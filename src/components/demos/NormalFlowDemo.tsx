'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Element {
  id: number
  type: 'block' | 'inline'
  content: string
}

export function NormalFlowDemo() {
  const [elements, setElements] = useState<Element[]>([
    { id: 1, type: 'block', content: '块级元素 A' },
    { id: 2, type: 'inline', content: '行内元素 1' },
    { id: 3, type: 'inline', content: '行内元素 2' },
    { id: 4, type: 'block', content: '块级元素 B' },
    { id: 5, type: 'inline', content: '行内元素 3' },
  ])

  const toggleElementType = (id: number) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, type: el.type === 'block' ? 'inline' : 'block' }
          : el
      )
    )
  }

  const addElement = (type: 'block' | 'inline') => {
    const newId = Math.max(...elements.map((e) => e.id), 0) + 1
    const content = type === 'block' ? `块级元素 ${newId}` : `行内元素 ${newId}`
    setElements((prev) => [...prev, { id: newId, type, content }])
  }

  const removeElement = (id: number) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
  }

  const getCSSCode = () => {
    return `.container {
  /* 正常流布局（默认） */
}

.block-element {
  display: block;
  /* 块级格式化上下文 (BFC) */
  /* - 垂直方向堆叠 */
  /* - 宽度默认 100% */
}

.inline-element {
  display: inline;
  /* 行内格式化上下文 (IFC) */
  /* - 水平方向排列 */
  /* - 遇边界自动换行 */
}`
  }

  return (
    <div className="space-y-4">
      {/* Add Element Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground mr-2">添加元素:</span>
        <button
          onClick={() => addElement('block')}
          className="px-3 py-1.5 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          + 块级元素
        </button>
        <button
          onClick={() => addElement('inline')}
          className="px-3 py-1.5 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
        >
          + 行内元素
        </button>
      </div>

      {/* Visual Container */}
      <div className="space-y-2">
        <div className="text-sm font-medium">正常流布局可视化</div>
        <div className="min-h-[300px] p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <div className="text-xs text-muted-foreground mb-3">
            蓝色 = 块级元素（垂直堆叠），绿色 = 行内元素（水平排列）
          </div>

          <div className="space-y-0">
            {elements.map((element) => (
              <div
                key={element.id}
                className={`${
                  element.type === 'block'
                    ? 'block w-full my-2'
                    : 'inline-block mx-1 my-1'
                } transition-all duration-300`}
              >
                <div
                  className={`${
                    element.type === 'block'
                      ? 'bg-blue-500 dark:bg-blue-600'
                      : 'bg-green-500 dark:bg-green-600'
                  } text-white rounded px-3 py-2 text-sm font-medium flex items-center justify-between gap-2`}
                >
                  <span>{element.content}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleElementType(element.id)}
                      className="px-2 py-0.5 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors"
                      title={`切换为 ${element.type === 'block' ? 'inline' : 'block'}`}
                    >
                      {element.type === 'block' ? '→ inline' : '→ block'}
                    </button>
                    <button
                      onClick={() => removeElement(element.id)}
                      className="px-2 py-0.5 text-xs bg-red-500/50 hover:bg-red-500/70 rounded transition-colors"
                      title="删除"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {elements.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                点击上方按钮添加元素
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flow Direction Indicators */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-blue-500 text-white border-blue-500">
              BFC
            </Badge>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              块级格式化上下文
            </span>
          </div>
          <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <li>↓ 垂直方向堆叠</li>
            <li>↔ 宽度默认填充父容器</li>
            <li>✓ 可设置 width/height</li>
            <li>✓ 所有 margin/padding 生效</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-green-500 text-white border-green-500">
              IFC
            </Badge>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              行内格式化上下文
            </span>
          </div>
          <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
            <li>→ 水平方向排列</li>
            <li>↵ 遇到边界自动换行</li>
            <li>✗ width/height 无效</li>
            <li>⚠ 仅水平 margin/padding 影响布局</li>
          </ul>
        </div>
      </div>

      {/* Element Statistics */}
      <div className="p-3 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-500 text-white">
              {elements.filter((e) => e.type === 'block').length}
            </Badge>
            <span className="text-muted-foreground">块级元素</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500 text-white">
              {elements.filter((e) => e.type === 'inline').length}
            </Badge>
            <span className="text-muted-foreground">行内元素</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{elements.length}</Badge>
            <span className="text-muted-foreground">总计</span>
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
          💡 正常流（Normal Flow）是 CSS 默认的布局方式。块级元素在 BFC 中垂直堆叠，行内元素在 IFC 中水平排列。
          当行内元素遇到容器边界时会自动换行，形成多个行框（line box）。
        </p>
      </div>
    </div>
  )
}
