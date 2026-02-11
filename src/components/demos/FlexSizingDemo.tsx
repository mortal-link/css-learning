'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface FlexItem {
  id: number
  grow: number
  shrink: number
  basis: number | 'auto'
  color: string
}

interface Preset {
  name: string
  items: Omit<FlexItem, 'id' | 'color'>[]
}

const presets: Preset[] = [
  {
    name: '等分空间',
    items: [
      { grow: 1, shrink: 1, basis: 0 },
      { grow: 1, shrink: 1, basis: 0 },
      { grow: 1, shrink: 1, basis: 0 },
    ],
  },
  {
    name: '固定+弹性',
    items: [
      { grow: 0, shrink: 0, basis: 100 },
      { grow: 1, shrink: 1, basis: 0 },
      { grow: 0, shrink: 0, basis: 80 },
    ],
  },
  {
    name: '不收缩',
    items: [
      { grow: 0, shrink: 0, basis: 150 },
      { grow: 0, shrink: 0, basis: 150 },
      { grow: 0, shrink: 0, basis: 150 },
    ],
  },
  {
    name: 'flex: 1',
    items: [
      { grow: 1, shrink: 1, basis: 'auto' },
      { grow: 1, shrink: 1, basis: 'auto' },
      { grow: 1, shrink: 1, basis: 'auto' },
    ],
  },
]

const colors = [
  'from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700',
  'from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-700',
  'from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700',
]

export function FlexSizingDemo() {
  const [items, setItems] = useState<FlexItem[]>([
    { id: 1, grow: 1, shrink: 1, basis: 0, color: colors[0] },
    { id: 2, grow: 1, shrink: 1, basis: 0, color: colors[1] },
    { id: 3, grow: 1, shrink: 1, basis: 0, color: colors[2] },
  ])

  const handlePreset = (preset: Preset) => {
    setItems(
      preset.items.map((item, index) => ({
        id: index + 1,
        ...item,
        color: colors[index % colors.length],
      }))
    )
  }

  const updateItem = (id: number, field: keyof FlexItem, value: number | 'auto') => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const getFlexShorthand = (item: FlexItem) => {
    return `flex: ${item.grow} ${item.shrink} ${item.basis === 'auto' ? 'auto' : `${item.basis}px`}`
  }

  const getCSSCode = () => {
    let code = `.container {\n  display: flex;\n}\n`

    items.forEach((item, index) => {
      code += `\n.item-${index + 1} {\n  ${getFlexShorthand(item)};\n}`
    })

    return code
  }

  return (
    <div className="space-y-4">
      {/* Preset Scenarios */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(preset)}
            className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Per-Item Controls */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="p-3 bg-muted/30 dark:bg-muted/20 rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">项目 {item.id}</div>
              <Badge variant="outline" className="font-mono text-xs">
                {getFlexShorthand(item)}
              </Badge>
            </div>

            {/* flex-grow */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>flex-grow (扩展)</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {item.grow}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={item.grow}
                onChange={(e) => updateItem(item.id, 'grow', Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-purple-200 dark:bg-purple-900"
              />
            </div>

            {/* flex-shrink */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>flex-shrink (收缩)</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {item.shrink}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={item.shrink}
                onChange={(e) => updateItem(item.id, 'shrink', Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
              />
            </div>

            {/* flex-basis */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>flex-basis (基准)</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => updateItem(item.id, 'basis', 'auto')}
                    className={`px-2 py-0.5 text-xs rounded ${
                      item.basis === 'auto'
                        ? 'bg-green-500 text-white dark:bg-green-600'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    auto
                  </button>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {item.basis === 'auto' ? 'auto' : `${item.basis}px`}
                  </Badge>
                </div>
              </div>
              {item.basis !== 'auto' && (
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="10"
                  value={item.basis}
                  onChange={(e) => updateItem(item.id, 'basis', Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Container */}
      <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
        <div className="text-xs text-muted-foreground text-center mb-4">
          容器宽度: 400px（观察空间如何分配）
        </div>
        <div
          className="flex border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 gap-2"
          style={{ width: '400px', margin: '0 auto' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`h-20 bg-gradient-to-br ${item.color} rounded flex flex-col items-center justify-center text-white font-bold shadow-md transition-all duration-300`}
              style={{
                flexGrow: item.grow,
                flexShrink: item.shrink,
                flexBasis: item.basis === 'auto' ? 'auto' : `${item.basis}px`,
              }}
            >
              <div className="text-lg">{item.id}</div>
              <div className="text-[10px] opacity-80 text-center px-1">
                {item.grow}/{item.shrink}/{item.basis === 'auto' ? 'auto' : item.basis}
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
          {' '}flex 是 flex-grow、flex-shrink 和 flex-basis 的简写。
          <strong> flex-grow</strong> 控制项目如何分配剩余空间（比例），
          <strong> flex-shrink</strong> 控制空间不足时如何收缩（比例），
          <strong> flex-basis</strong> 设置项目的初始主轴尺寸。
          常见值：flex: 1 = 1 1 auto（等比例扩展收缩），flex: 1 1 0 = 等分可用空间。
        </div>
      </div>
    </div>
  )
}
