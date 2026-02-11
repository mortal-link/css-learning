'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type DisplayType = 'flex' | 'inline-flex'
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

interface Preset {
  name: string
  display: DisplayType
  direction: FlexDirection
}

const presets: Preset[] = [
  { name: '行排列', display: 'flex', direction: 'row' },
  { name: '列排列', display: 'flex', direction: 'column' },
  { name: '反向行', display: 'flex', direction: 'row-reverse' },
  { name: '行内flex', display: 'inline-flex', direction: 'row' },
]

export function FlexContainerDemo() {
  const [display, setDisplay] = useState<DisplayType>('flex')
  const [direction, setDirection] = useState<FlexDirection>('row')

  const handlePreset = (preset: Preset) => {
    setDisplay(preset.display)
    setDirection(preset.direction)
  }

  const isRow = direction === 'row' || direction === 'row-reverse'
  const isReverse = direction.includes('reverse')

  const getCSSCode = () => {
    return `.container {
  display: ${display};
  flex-direction: ${direction};
}`
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

      {/* Display Type Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">显示类型</div>
        <div className="flex flex-wrap gap-2">
          {(['flex', 'inline-flex'] as DisplayType[]).map((type) => (
            <button
              key={type}
              onClick={() => setDisplay(type)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                display === type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Flex Direction Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">flex-direction</div>
        <div className="flex flex-wrap gap-2">
          {(['row', 'row-reverse', 'column', 'column-reverse'] as FlexDirection[]).map((dir) => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
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

      {/* Visual Container */}
      <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6 space-y-4">
        <div className="text-xs text-muted-foreground text-center">
          {display === 'flex' ? 'flex 容器占据整行宽度' : 'inline-flex 容器根据内容收缩'}
        </div>

        <div className="flex items-start gap-2">
          {display === 'inline-flex' && (
            <div className="inline-block px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm">
              前面文本
            </div>
          )}

          <div
            className={`${
              display === 'flex' ? 'flex' : 'inline-flex'
            } border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 gap-2 relative`}
            style={{
              flexDirection: direction,
            }}
          >
            {/* Main Axis Label */}
            <div
              className={`absolute text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 ${
                isRow
                  ? 'left-1/2 -translate-x-1/2 -top-6'
                  : 'left-full ml-4 top-1/2 -translate-y-1/2'
              }`}
            >
              <span>主轴</span>
              <span className="text-base">
                {isRow ? (isReverse ? '←' : '→') : isReverse ? '↑' : '↓'}
              </span>
            </div>

            {/* Cross Axis Label */}
            <div
              className={`absolute text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1 ${
                isRow
                  ? 'left-full ml-4 top-1/2 -translate-y-1/2'
                  : 'left-1/2 -translate-x-1/2 -top-6'
              }`}
            >
              <span>交叉轴</span>
              <span className="text-base">
                {isRow ? '↓' : '→'}
              </span>
            </div>

            {/* Flex Items */}
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`${
                  isRow ? 'w-16 h-16' : 'w-24 h-12'
                } bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700 rounded flex items-center justify-center text-white font-bold shadow-md`}
              >
                {num}
              </div>
            ))}
          </div>

          {display === 'inline-flex' && (
            <div className="inline-block px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm">
              后面文本
            </div>
          )}
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
          {display === 'flex'
            ? ' flex 容器会独占一行，表现为块级元素。'
            : ' inline-flex 容器根据内容大小收缩，可以与其他行内元素并排。'}
          {' '}主轴方向由 flex-direction 控制，
          {isRow ? '行方向时子项横向排列' : '列方向时子项纵向排列'}
          {isReverse && '，reverse 会反转排列顺序'}。
        </div>
      </div>
    </div>
  )
}
