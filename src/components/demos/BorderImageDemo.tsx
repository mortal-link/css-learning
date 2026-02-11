'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type Preset = {
  name: string
  source: string
  slice: [number, number, number, number]
  fill: boolean
  width: string
  outset: string
  repeat: string
}

const presets: Preset[] = [
  {
    name: '渐变边框',
    source: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
    slice: [30, 30, 30, 30],
    fill: false,
    width: '20px',
    outset: '0',
    repeat: 'stretch',
  },
  {
    name: '条纹边框',
    source: 'repeating-linear-gradient(45deg, #667eea 0px, #667eea 10px, #764ba2 10px, #764ba2 20px)',
    slice: [20, 20, 20, 20],
    fill: false,
    width: '15px',
    outset: '0',
    repeat: 'repeat',
  },
  {
    name: '圆角渐变',
    source: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    slice: [50, 50, 50, 50],
    fill: false,
    width: '25px',
    outset: '0',
    repeat: 'round',
  },
]

const gradientPresets = [
  { name: '粉红渐变', value: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)' },
  { name: '蓝紫渐变', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: '彩虹渐变', value: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #9400d3)' },
  { name: '条纹图案', value: 'repeating-linear-gradient(45deg, #667eea 0px, #667eea 10px, #764ba2 10px, #764ba2 20px)' },
]

const repeatOptions = [
  { name: 'stretch', label: '拉伸' },
  { name: 'repeat', label: '重复' },
  { name: 'round', label: '环绕' },
  { name: 'space', label: '间隔' },
]

export function BorderImageDemo() {
  const [source, setSource] = useState('linear-gradient(45deg, #f093fb 0%, #f5576c 100%)')
  const [sliceTop, setSliceTop] = useState(30)
  const [sliceRight, setSliceRight] = useState(30)
  const [sliceBottom, setSliceBottom] = useState(30)
  const [sliceLeft, setSliceLeft] = useState(30)
  const [fill, setFill] = useState(false)
  const [width, setWidth] = useState('20')
  const [outset, setOutset] = useState('0')
  const [repeat, setRepeat] = useState('stretch')

  const handlePreset = (preset: Preset) => {
    setSource(preset.source)
    setSliceTop(preset.slice[0])
    setSliceRight(preset.slice[1])
    setSliceBottom(preset.slice[2])
    setSliceLeft(preset.slice[3])
    setFill(preset.fill)
    setWidth(preset.width.replace('px', ''))
    setOutset(preset.outset.replace('px', ''))
    setRepeat(preset.repeat)
  }

  const getCSSCode = () => {
    const sliceValue = `${sliceTop} ${sliceRight} ${sliceBottom} ${sliceLeft}${fill ? ' fill' : ''}`
    const widthValue = `${width}px`
    const outsetValue = outset === '0' ? '0' : `${outset}px`

    return `.element {\n  border: 20px solid transparent;\n  border-image-source: ${source};\n  border-image-slice: ${sliceValue};\n  border-image-width: ${widthValue};\n  border-image-outset: ${outsetValue};\n  border-image-repeat: ${repeat};\n  \n  /* 简写形式 */\n  border-image: ${source} ${sliceValue} / ${widthValue} / ${outsetValue} ${repeat};\n}`
  }

  return (
    <div className="space-y-4">
      {/* Preset Buttons */}
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

      {/* Controls */}
      <div className="space-y-3 p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium">边框图像源 (border-image-source)</label>
          <div className="flex flex-wrap gap-2">
            {gradientPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSource(preset.value)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  source === preset.value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">切片 (border-image-slice)</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={fill}
                  onChange={(e) => setFill(e.target.checked)}
                  className="rounded cursor-pointer"
                />
                <span>fill</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">上 (top)</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {sliceTop}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliceTop}
                onChange={(e) => setSliceTop(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">右 (right)</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {sliceRight}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliceRight}
                onChange={(e) => setSliceRight(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">下 (bottom)</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {sliceBottom}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliceBottom}
                onChange={(e) => setSliceBottom(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">左 (left)</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {sliceLeft}
                </Badge>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliceLeft}
                onChange={(e) => setSliceLeft(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">边框宽度 (border-image-width)</label>
            <Badge variant="secondary" className="font-mono text-xs">
              {width}px
            </Badge>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">边框偏移 (border-image-outset)</label>
            <Badge variant="secondary" className="font-mono text-xs">
              {outset}px
            </Badge>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={outset}
            onChange={(e) => setOutset(e.target.value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">重复方式 (border-image-repeat)</label>
          <div className="flex flex-wrap gap-2">
            {repeatOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => setRepeat(option.name)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  repeat === option.name
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">实时预览</div>
        <div className="flex justify-center items-center p-8 bg-muted/10 dark:bg-muted/5 rounded-lg">
          <div
            className="w-[200px] h-[200px] bg-white dark:bg-gray-800 flex items-center justify-center text-center transition-all duration-300"
            style={{
              border: '20px solid transparent',
              borderImageSource: source,
              borderImageSlice: `${sliceTop} ${sliceRight} ${sliceBottom} ${sliceLeft}${fill ? ' fill' : ''}`,
              borderImageWidth: `${width}px`,
              borderImageOutset: outset === '0' ? '0' : `${outset}px`,
              borderImageRepeat: repeat,
            }}
          >
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              边框图像<br />预览区域
            </div>
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
    </div>
  )
}
