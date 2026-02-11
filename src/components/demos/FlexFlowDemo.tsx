'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

interface ItemOrder {
  id: number
  order: number
  color: string
}

const initialItems: ItemOrder[] = [
  { id: 1, order: 0, color: 'from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700' },
  { id: 2, order: 0, color: 'from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-700' },
  { id: 3, order: 0, color: 'from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700' },
  { id: 4, order: 0, color: 'from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-700' },
  { id: 5, order: 0, color: 'from-red-400 to-rose-500 dark:from-red-600 dark:to-rose-700' },
  { id: 6, order: 0, color: 'from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-700' },
]

export function FlexFlowDemo() {
  const [direction, setDirection] = useState<FlexDirection>('row')
  const [wrap, setWrap] = useState<FlexWrap>('wrap')
  const [items, setItems] = useState<ItemOrder[]>(initialItems)
  const [showOrderControls, setShowOrderControls] = useState(false)

  const updateItemOrder = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, order: item.order + delta } : item))
    )
  }

  const resetOrders = () => {
    setItems((prev) => prev.map((item) => ({ ...item, order: 0 })))
  }

  const getCSSCode = () => {
    let code = `.container {
  display: flex;
  flex-flow: ${direction} ${wrap};
}`

    const hasCustomOrder = items.some((item) => item.order !== 0)
    if (hasCustomOrder) {
      code += '\n\n/* 自定义顺序 */'
      items
        .filter((item) => item.order !== 0)
        .forEach((item) => {
          code += `\n.item-${item.id} { order: ${item.order}; }`
        })
    }

    return code
  }

  return (
    <div className="space-y-4">
      {/* Direction Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">flex-direction</div>
        <div className="grid grid-cols-2 gap-2">
          {(['row', 'row-reverse', 'column', 'column-reverse'] as FlexDirection[]).map((dir) => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                direction === dir
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              {dir}
            </button>
          ))}
        </div>
      </div>

      {/* Wrap Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">flex-wrap</div>
        <div className="grid grid-cols-3 gap-2">
          {(['nowrap', 'wrap', 'wrap-reverse'] as FlexWrap[]).map((w) => (
            <button
              key={w}
              onClick={() => setWrap(w)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                wrap === w
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Order Controls Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showOrder"
          checked={showOrderControls}
          onChange={(e) => setShowOrderControls(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="showOrder" className="text-sm font-medium cursor-pointer">
          显示 order 属性控制
        </label>
        {showOrderControls && (
          <button
            onClick={resetOrders}
            className="ml-auto px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80"
          >
            重置顺序
          </button>
        )}
      </div>

      {/* Order Controls */}
      {showOrderControls && (
        <div className="grid grid-cols-3 gap-2 p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-1">
              <span className="text-xs w-12">项目 {item.id}:</span>
              <button
                onClick={() => updateItemOrder(item.id, -1)}
                className="w-6 h-6 flex items-center justify-center rounded bg-muted hover:bg-muted/80 text-xs"
              >
                −
              </button>
              <Badge variant="secondary" className="font-mono text-xs min-w-[2rem] justify-center">
                {item.order}
              </Badge>
              <button
                onClick={() => updateItemOrder(item.id, 1)}
                className="w-6 h-6 flex items-center justify-center rounded bg-muted hover:bg-muted/80 text-xs"
              >
                +
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Visual Container */}
      <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
        <div
          className="flex border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 gap-2"
          style={{
            flexDirection: direction,
            flexWrap: wrap,
            minHeight: direction.includes('column') ? '400px' : 'auto',
            maxWidth: direction.includes('column') ? '300px' : '100%',
          }}
        >
          {[...items]
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div
                key={item.id}
                className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}
                style={{ order: item.order }}
              >
                <div className="text-center">
                  <div className="text-lg">{item.id}</div>
                  {item.order !== 0 && (
                    <div className="text-[10px] opacity-80">order:{item.order}</div>
                  )}
                </div>
              </div>
            ))}
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
      <div className="bg-muted/50 dark:bg-muted/30 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">说明：</span>
          {' '}flex-flow 是 flex-direction 和 flex-wrap 的简写属性。
          {direction.includes('row') ? '行方向时项目横向排列' : '列方向时项目纵向排列'}
          {direction.includes('reverse') && '，reverse 反转排列顺序'}。
          {wrap === 'nowrap' && ' nowrap 不换行，项目可能溢出或收缩。'}
          {wrap === 'wrap' && ' wrap 允许换行，项目在新行继续排列。'}
          {wrap === 'wrap-reverse' && ' wrap-reverse 反向换行，新行出现在上方/左侧。'}
          {' '}order 属性可以改变项目的视觉顺序，默认值为 0。
        </div>
      </div>
    </div>
  )
}
