'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'

const justifyLabels: Record<JustifyContent, string> = {
  'flex-start': '起点',
  'flex-end': '终点',
  'center': '居中',
  'space-between': '两端',
  'space-around': '环绕',
  'space-evenly': '均分',
}

const alignItemsLabels: Record<AlignItems, string> = {
  'stretch': '拉伸',
  'flex-start': '起点',
  'flex-end': '终点',
  'center': '居中',
  'baseline': '基线',
}

const alignContentLabels: Record<AlignContent, string> = {
  'flex-start': '起点',
  'flex-end': '终点',
  'center': '居中',
  'space-between': '两端',
  'space-around': '环绕',
  'stretch': '拉伸',
}

export function FlexAlignDemo() {
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start')
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch')
  const [alignContent, setAlignContent] = useState<AlignContent>('flex-start')
  const [gap, setGap] = useState(8)
  const [showWrapped, setShowWrapped] = useState(false)

  const getCSSCode = () => {
    return `.container {
  display: flex;
  ${showWrapped ? 'flex-wrap: wrap;\n  ' : ''}justify-content: ${justifyContent};
  align-items: ${alignItems};${showWrapped ? `\n  align-content: ${alignContent};` : ''}
  gap: ${gap}px;
}`
  }

  return (
    <div className="space-y-4">
      {/* Wrap Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showWrapped"
          checked={showWrapped}
          onChange={(e) => setShowWrapped(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="showWrapped" className="text-sm font-medium cursor-pointer">
          显示多行换行效果（启用 align-content）
        </label>
      </div>

      {/* justify-content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">justify-content</div>
          <Badge variant="outline" className="text-xs">主轴对齐</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(justifyLabels) as JustifyContent[]).map((value) => (
            <button
              key={value}
              onClick={() => setJustifyContent(value)}
              className={`px-2 py-1.5 text-xs rounded-md transition-colors ${
                justifyContent === value
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              {justifyLabels[value]}
            </button>
          ))}
        </div>
      </div>

      {/* align-items */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">align-items</div>
          <Badge variant="outline" className="text-xs">交叉轴对齐</Badge>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {(Object.keys(alignItemsLabels) as AlignItems[]).map((value) => (
            <button
              key={value}
              onClick={() => setAlignItems(value)}
              className={`px-2 py-1.5 text-xs rounded-md transition-colors ${
                alignItems === value
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              {alignItemsLabels[value]}
            </button>
          ))}
        </div>
      </div>

      {/* align-content (only when wrapped) */}
      {showWrapped && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">align-content</div>
            <Badge variant="outline" className="text-xs">多行对齐</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(alignContentLabels) as AlignContent[]).map((value) => (
              <button
                key={value}
                onClick={() => setAlignContent(value)}
                className={`px-2 py-1.5 text-xs rounded-md transition-colors ${
                  alignContent === value
                    ? 'bg-green-500 text-white dark:bg-green-600'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {alignContentLabels[value]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gap Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">gap 间距</label>
          <Badge variant="secondary" className="font-mono text-xs">
            {gap}px
          </Badge>
        </div>
        <input
          type="range"
          min="0"
          max="32"
          step="4"
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-200 dark:bg-orange-900"
        />
      </div>

      {/* Visual Container */}
      <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
        <div
          className="flex border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4"
          style={{
            justifyContent,
            alignItems,
            alignContent: showWrapped ? alignContent : undefined,
            gap: `${gap}px`,
            flexWrap: showWrapped ? 'wrap' : 'nowrap',
            minHeight: '250px',
            maxWidth: showWrapped ? '350px' : '100%',
          }}
        >
          {/* Items with varying heights for alignment demo */}
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
            1
          </div>
          <div className="w-16 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
            2
          </div>
          <div className="w-16 h-12 bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
            3
          </div>
          <div className="w-16 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
            4
          </div>
          {showWrapped && (
            <>
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-rose-500 dark:from-red-600 dark:to-rose-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
                5
              </div>
              <div className="w-16 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
                6
              </div>
              <div className="w-16 h-14 bg-gradient-to-br from-pink-400 to-rose-500 dark:from-pink-600 dark:to-rose-700 rounded flex items-end justify-center text-white font-bold shadow-md flex-shrink-0 pb-1">
                7
              </div>
            </>
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
        <div className="text-xs leading-relaxed text-muted-foreground space-y-1">
          <div>
            <span className="font-semibold text-foreground">justify-content：</span>
            控制项目在主轴上的对齐方式。space-between 两端对齐，space-around 环绕分布，space-evenly 均匀分布。
          </div>
          <div>
            <span className="font-semibold text-foreground">align-items：</span>
            控制项目在交叉轴上的对齐方式。stretch 拉伸填满容器高度，baseline 按文本基线对齐。
          </div>
          {showWrapped && (
            <div>
              <span className="font-semibold text-foreground">align-content：</span>
              仅在多行时生效，控制行与行之间在交叉轴上的分布。类似 justify-content 但作用于行。
            </div>
          )}
          <div>
            <span className="font-semibold text-foreground">gap：</span>
            设置项目之间的间距，替代 margin 方案，更简洁高效。
          </div>
        </div>
      </div>
    </div>
  )
}
