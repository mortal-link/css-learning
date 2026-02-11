'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type VerticalAlignValue = 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom' | 'sub' | 'super'

interface Preset {
  name: string
  fontSize1: number
  fontSize2: number
  fontSize3: number
  lineHeight: number
  verticalAlign: VerticalAlignValue
}

const presets: Preset[] = [
  { name: '默认基线', fontSize1: 16, fontSize2: 16, fontSize3: 16, lineHeight: 1.5, verticalAlign: 'baseline' },
  { name: '大小混排', fontSize1: 14, fontSize2: 24, fontSize3: 14, lineHeight: 1.8, verticalAlign: 'baseline' },
  { name: '上标下标', fontSize1: 16, fontSize2: 12, fontSize3: 16, lineHeight: 1.5, verticalAlign: 'super' },
  { name: '行高撑开', fontSize1: 16, fontSize2: 16, fontSize3: 16, lineHeight: 3, verticalAlign: 'baseline' },
]

export function InlineFormattingDemo() {
  const [fontSize1, setFontSize1] = useState(16)
  const [fontSize2, setFontSize2] = useState(24)
  const [fontSize3, setFontSize3] = useState(16)
  const [lineHeight, setLineHeight] = useState(1.8)
  const [verticalAlign, setVerticalAlign] = useState<VerticalAlignValue>('baseline')
  const [showAnnotations, setShowAnnotations] = useState(true)

  const handlePreset = (preset: Preset) => {
    setFontSize1(preset.fontSize1)
    setFontSize2(preset.fontSize2)
    setFontSize3(preset.fontSize3)
    setLineHeight(preset.lineHeight)
    setVerticalAlign(preset.verticalAlign)
  }

  const getCSSCode = () => {
    return `.line-box {
  line-height: ${lineHeight};
  /* line-height 决定行框高度 */
}

.text-1 {
  font-size: ${fontSize1}px;
  vertical-align: baseline;
}

.text-2 {
  font-size: ${fontSize2}px;
  vertical-align: ${verticalAlign};
  /* 调整基线对齐方式 */
}

.text-3 {
  font-size: ${fontSize3}px;
  vertical-align: baseline;
}`
  }

  const calculateLineBoxHeight = () => {
    const maxFontSize = Math.max(fontSize1, fontSize2, fontSize3)
    return maxFontSize * lineHeight
  }

  const calculateHalfLeading = (fontSize: number) => {
    const leading = fontSize * lineHeight - fontSize
    return leading / 2
  }

  const verticalAlignOptions: VerticalAlignValue[] = [
    'baseline',
    'top',
    'middle',
    'bottom',
    'text-top',
    'text-bottom',
    'sub',
    'super',
  ]

  return (
    <div className="space-y-4">
      {/* Preset Scenarios */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground mr-2">预设场景:</span>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(preset)}
            className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Font Size Controls */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm font-medium mb-2">字体大小 (font-size)</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">文本 1</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {fontSize1}px
              </Badge>
            </div>
            <input
              type="range"
              min="12"
              max="32"
              value={fontSize1}
              onChange={(e) => setFontSize1(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">文本 2 (重点)</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {fontSize2}px
              </Badge>
            </div>
            <input
              type="range"
              min="12"
              max="36"
              value={fontSize2}
              onChange={(e) => setFontSize2(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-rose-200 dark:bg-rose-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">文本 3</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {fontSize3}px
              </Badge>
            </div>
            <input
              type="range"
              min="12"
              max="32"
              value={fontSize3}
              onChange={(e) => setFontSize3(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-200 dark:bg-green-900"
            />
          </div>
        </div>

        {/* Line Height & Vertical Align */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm font-medium mb-2">行高与对齐</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">line-height</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {lineHeight.toFixed(1)}
              </Badge>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-purple-200 dark:bg-purple-900"
            />
            <div className="text-xs text-muted-foreground">
              行框高度: {calculateLineBoxHeight().toFixed(0)}px
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">vertical-align (文本 2)</div>
            <div className="grid grid-cols-2 gap-1">
              {verticalAlignOptions.map((value) => (
                <button
                  key={value}
                  onClick={() => setVerticalAlign(value)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    verticalAlign === value
                      ? 'bg-rose-500 text-white dark:bg-rose-600'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Annotations Toggle */}
      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
        <input
          type="checkbox"
          id="annotations"
          checked={showAnnotations}
          onChange={(e) => setShowAnnotations(e.target.checked)}
          className="w-4 h-4 rounded border-border"
        />
        <label htmlFor="annotations" className="text-sm font-medium">
          显示注解（基线、内容区、半行距）
        </label>
      </div>

      {/* Visual Line Box */}
      <div className="space-y-2">
        <div className="text-sm font-medium">行内格式化可视化</div>
        <div className="p-6 bg-muted/30 rounded-lg border-2 border-dashed border-border overflow-x-auto">
          <div className="relative inline-block min-w-full">
            {/* Line Box Container */}
            <div
              className="relative border-2 border-purple-500 dark:border-purple-400 bg-purple-50/30 dark:bg-purple-950/20"
              style={{
                lineHeight: lineHeight,
                height: `${calculateLineBoxHeight()}px`,
              }}
            >
              {/* Line Box Label */}
              <div className="absolute -top-6 left-0 text-xs font-medium text-purple-600 dark:text-purple-400">
                行框 (Line Box) - {calculateLineBoxHeight().toFixed(0)}px
              </div>

              {/* Baseline Reference */}
              {showAnnotations && (
                <div
                  className="absolute left-0 right-0 border-t-2 border-dashed border-red-500 dark:border-red-400"
                  style={{
                    bottom: `${fontSize1 * 0.2}px`, // Approximate baseline position
                  }}
                >
                  <span className="absolute right-0 -top-4 text-xs text-red-600 dark:text-red-400 bg-background px-1">
                    基线 (Baseline)
                  </span>
                </div>
              )}

              {/* Inline Elements */}
              <div className="relative flex items-baseline gap-2 px-2">
                {/* Text 1 */}
                <span className="relative inline-block" style={{ fontSize: `${fontSize1}px` }}>
                  {showAnnotations && (
                    <>
                      <span
                        className="absolute inset-0 border border-blue-400 dark:border-blue-500 bg-blue-200/20 dark:bg-blue-800/20"
                        style={{
                          top: `-${calculateHalfLeading(fontSize1)}px`,
                          bottom: `-${calculateHalfLeading(fontSize1)}px`,
                        }}
                      ></span>
                      <span className="absolute -top-5 left-0 text-[9px] text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        half-leading: {calculateHalfLeading(fontSize1).toFixed(1)}px
                      </span>
                    </>
                  )}
                  <span className="relative z-10 text-foreground">普通文本</span>
                </span>

                {/* Text 2 (Highlighted with vertical-align) */}
                <span
                  className="relative inline-block font-bold text-rose-600 dark:text-rose-400"
                  style={{
                    fontSize: `${fontSize2}px`,
                    verticalAlign: verticalAlign,
                  }}
                >
                  {showAnnotations && (
                    <>
                      <span
                        className="absolute inset-0 border border-rose-400 dark:border-rose-500 bg-rose-200/20 dark:bg-rose-800/20"
                        style={{
                          top: `-${calculateHalfLeading(fontSize2)}px`,
                          bottom: `-${calculateHalfLeading(fontSize2)}px`,
                        }}
                      ></span>
                      <span className="absolute -top-5 left-0 text-[9px] text-rose-600 dark:text-rose-400 whitespace-nowrap">
                        half-leading: {calculateHalfLeading(fontSize2).toFixed(1)}px
                      </span>
                    </>
                  )}
                  <span className="relative z-10">重点内容</span>
                </span>

                {/* Text 3 */}
                <span className="relative inline-block" style={{ fontSize: `${fontSize3}px` }}>
                  {showAnnotations && (
                    <>
                      <span
                        className="absolute inset-0 border border-green-400 dark:border-green-500 bg-green-200/20 dark:bg-green-800/20"
                        style={{
                          top: `-${calculateHalfLeading(fontSize3)}px`,
                          bottom: `-${calculateHalfLeading(fontSize3)}px`,
                        }}
                      ></span>
                      <span className="absolute -top-5 left-0 text-[9px] text-green-600 dark:text-green-400 whitespace-nowrap">
                        half-leading: {calculateHalfLeading(fontSize3).toFixed(1)}px
                      </span>
                    </>
                  )}
                  <span className="relative z-10 text-foreground">后续文字</span>
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          {showAnnotations && (
            <div className="mt-6 p-3 bg-background rounded border border-border space-y-2">
              <div className="text-xs font-medium">图例说明:</div>
              <div className="grid md:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-500 dark:border-purple-400"></div>
                  <span>行框 (Line Box)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-dashed border-red-500 dark:border-red-400"></div>
                  <span>基线 (Baseline)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-blue-400 dark:border-blue-500 bg-blue-200/20 dark:bg-blue-800/20"></div>
                  <span>内容区 + 半行距</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-rose-400 dark:border-rose-500 bg-rose-200/20 dark:bg-rose-800/20"></div>
                  <span>对齐调整元素</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Concept Explanation */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
            内容区 (Content Area)
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            由字体度量决定的区域，包含字符的字形。不同字体的内容区高度可能不同。
          </div>
        </div>

        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
            行高 (Line Height)
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            行框的高度。leading = line-height - font-size，平分为上下两个 half-leading。
          </div>
        </div>

        <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">
            基线 (Baseline)
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            默认的垂直对齐参考线。大多数字母"坐"在基线上，下伸部分（如 g、p）延伸到基线下方。
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
          💡 行内格式化中，每个行内元素生成一个行内框。行框的高度由 line-height 决定，元素通过 vertical-align 控制垂直对齐。
          leading（行距）是 line-height 减去 font-size 的差值，平分为上下两个 half-leading 分布在内容区的上下。
        </p>
      </div>
    </div>
  )
}
