'use client'

import { useState } from 'react'

type AlignValue = 'start' | 'end' | 'center' | 'stretch'
type JustifyContentValue = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type AlignContentValue = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'stretch'

export function GridAlignDemo() {
  const [justifyItems, setJustifyItems] = useState<AlignValue>('stretch')
  const [alignItems, setAlignItems] = useState<AlignValue>('stretch')
  const [justifyContent, setJustifyContent] = useState<JustifyContentValue>('start')
  const [alignContent, setAlignContent] = useState<AlignContentValue>('start')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [justifySelf, setJustifySelf] = useState<AlignValue>('stretch')
  const [alignSelf, setAlignSelf] = useState<AlignValue>('stretch')

  const getCSSCode = () => {
    let code = `.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 80px);
  gap: 12px;

  /* 项目对齐 (所有项目) */
  justify-items: ${justifyItems};
  align-items: ${alignItems};

  /* 内容对齐 (整个网格) */
  justify-content: ${justifyContent};
  align-content: ${alignContent};
}`

    if (selectedItem !== null) {
      code += `\n\n.item-${selectedItem} {
  /* 单个项目对齐覆盖 */
  justify-self: ${justifySelf};
  align-self: ${alignSelf};
}`
    }

    return code
  }

  const gridItems = Array.from({ length: 9 }, (_, i) => i + 1)

  const getItemStyle = (itemNum: number) => {
    if (itemNum === selectedItem) {
      return {
        justifySelf,
        alignSelf,
      }
    }
    return {}
  }

  return (
    <div className="space-y-4">
      {/* Container Alignment Controls */}
      <div className="space-y-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm font-semibold text-blue-900 dark:text-blue-200">
          容器对齐 (影响所有项目)
        </div>

        {/* justify-items */}
        <div className="space-y-2">
          <div className="text-xs font-medium">justify-items (水平对齐项目)</div>
          <div className="flex gap-2 flex-wrap">
            {(['start', 'end', 'center', 'stretch'] as AlignValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setJustifyItems(value)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  justifyItems === value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* align-items */}
        <div className="space-y-2">
          <div className="text-xs font-medium">align-items (垂直对齐项目)</div>
          <div className="flex gap-2 flex-wrap">
            {(['start', 'end', 'center', 'stretch'] as AlignValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setAlignItems(value)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  alignItems === value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* justify-content */}
        <div className="space-y-2">
          <div className="text-xs font-medium">justify-content (水平对齐网格)</div>
          <div className="flex gap-2 flex-wrap">
            {(['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'] as JustifyContentValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setJustifyContent(value)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  justifyContent === value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* align-content */}
        <div className="space-y-2">
          <div className="text-xs font-medium">align-content (垂直对齐网格)</div>
          <div className="flex gap-2 flex-wrap">
            {(['start', 'end', 'center', 'space-between', 'space-around', 'stretch'] as AlignContentValue[]).map((value) => (
              <button
                key={value}
                onClick={() => setAlignContent(value)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  alignContent === value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Per-item Alignment */}
      {selectedItem !== null && (
        <div className="space-y-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-sm font-semibold text-purple-900 dark:text-purple-200">
            项目 {selectedItem} 单独对齐 (覆盖容器设置)
          </div>

          {/* justify-self */}
          <div className="space-y-2">
            <div className="text-xs font-medium">justify-self</div>
            <div className="flex gap-2 flex-wrap">
              {(['start', 'end', 'center', 'stretch'] as AlignValue[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setJustifySelf(value)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    justifySelf === value
                      ? 'bg-purple-500 text-white dark:bg-purple-600'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* align-self */}
          <div className="space-y-2">
            <div className="text-xs font-medium">align-self</div>
            <div className="flex gap-2 flex-wrap">
              {(['start', 'end', 'center', 'stretch'] as AlignValue[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setAlignSelf(value)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    alignSelf === value
                      ? 'bg-purple-500 text-white dark:bg-purple-600'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelectedItem(null)}
            className="px-3 py-1.5 text-xs rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            取消选择
          </button>
        </div>
      )}

      {/* Visual Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">可视化预览 (点击项目进行单独对齐)</div>
        <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed border-border overflow-auto">
          <div
            className="inline-grid gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded"
            style={{
              gridTemplateColumns: 'repeat(3, 100px)',
              gridTemplateRows: 'repeat(3, 80px)',
              justifyItems,
              alignItems,
              justifyContent,
              alignContent,
              minHeight: '300px',
            }}
          >
            {gridItems.map((num) => (
              <div
                key={num}
                style={getItemStyle(num)}
                onClick={() => setSelectedItem(num === selectedItem ? null : num)}
                className={`rounded-md p-2 flex items-center justify-center font-semibold shadow-md transition-all cursor-pointer ${
                  num === selectedItem
                    ? 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 text-white ring-4 ring-purple-300 dark:ring-purple-800'
                    : 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white hover:scale-105'
                }`}
              >
                {num}
              </div>
            ))}
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
      <div className="space-y-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        <p><strong className="text-foreground">justify-* vs align-*:</strong> justify 控制水平方向，align 控制垂直方向。</p>
        <p><strong className="text-foreground">*-items vs *-content:</strong> items 对齐网格项目在其单元格内的位置，content 对齐整个网格在容器内的位置。</p>
        <p><strong className="text-foreground">*-self:</strong> 单个项目可以用 justify-self 和 align-self 覆盖容器的 justify-items 和 align-items。</p>
      </div>
    </div>
  )
}
