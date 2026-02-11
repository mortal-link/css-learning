'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type Preset = {
  name: string
  color: string
  backgroundColor: string
  backgroundImage: string
  backgroundPosition: string
  backgroundSize: string
}

const presets: Preset[] = [
  {
    name: '明亮',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    backgroundImage: 'none',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  {
    name: '暗色',
    color: '#f0f0f0',
    backgroundColor: '#1a1a1a',
    backgroundImage: 'none',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  {
    name: '渐变',
    color: '#ffffff',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  {
    name: '图案',
    color: '#2d3748',
    backgroundColor: '#f7fafc',
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.05) 10px, rgba(0,0,0,.05) 20px)',
    backgroundPosition: 'top left',
    backgroundSize: 'auto',
  },
]

const gradientPresets = [
  { name: '无', value: 'none' },
  { name: '紫色渐变', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: '蓝色渐变', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' },
  { name: '彩虹渐变', value: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)' },
  { name: '径向渐变', value: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, #d97706 100%)' },
  { name: '条纹图案', value: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)' },
]

const positionPresets = [
  { name: '中心', value: 'center' },
  { name: '左上', value: 'top left' },
  { name: '右上', value: 'top right' },
  { name: '左下', value: 'bottom left' },
  { name: '右下', value: 'bottom right' },
]

const sizePresets = [
  { name: '覆盖', value: 'cover' },
  { name: '包含', value: 'contain' },
  { name: '自动', value: 'auto' },
  { name: '50%', value: '50%' },
  { name: '100px', value: '100px' },
]

export function ForegroundBgDemo() {
  const [color, setColor] = useState('#1a1a1a')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [backgroundImage, setBackgroundImage] = useState('none')
  const [backgroundPosition, setBackgroundPosition] = useState('center')
  const [backgroundSize, setBackgroundSize] = useState('cover')

  const handlePreset = (preset: Preset) => {
    setColor(preset.color)
    setBackgroundColor(preset.backgroundColor)
    setBackgroundImage(preset.backgroundImage)
    setBackgroundPosition(preset.backgroundPosition)
    setBackgroundSize(preset.backgroundSize)
  }

  const getCSSCode = () => {
    const lines = [
      `color: ${color};`,
      `background-color: ${backgroundColor};`,
    ]

    if (backgroundImage !== 'none') {
      lines.push(`background-image: ${backgroundImage};`)
      lines.push(`background-position: ${backgroundPosition};`)
      lines.push(`background-size: ${backgroundSize};`)
    }

    return `.element {\n  ${lines.join('\n  ')}\n}`
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

      {/* Color Controls */}
      <div className="space-y-3 p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">文字颜色 (color)</label>
            <Badge variant="secondary" className="font-mono text-xs">
              {color}
            </Badge>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-8 rounded border border-border cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-2 py-1 text-sm rounded border border-border bg-background"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">背景颜色 (background-color)</label>
            <Badge variant="secondary" className="font-mono text-xs">
              {backgroundColor}
            </Badge>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-12 h-8 rounded border border-border cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="flex-1 px-2 py-1 text-sm rounded border border-border bg-background"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">背景图像 (background-image)</label>
          <div className="flex flex-wrap gap-2">
            {gradientPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setBackgroundImage(preset.value)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  backgroundImage === preset.value
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {backgroundImage !== 'none' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">背景位置 (background-position)</label>
              <div className="flex flex-wrap gap-2">
                {positionPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setBackgroundPosition(preset.value)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      backgroundPosition === preset.value
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
              <label className="text-sm font-medium">背景尺寸 (background-size)</label>
              <div className="flex flex-wrap gap-2">
                {sizePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setBackgroundSize(preset.value)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      backgroundSize === preset.value
                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                        : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">实时预览</div>
        <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/10 dark:bg-muted/5">
          <div
            className="min-h-[200px] rounded-lg p-6 flex items-center justify-center transition-all duration-300"
            style={{
              color,
              backgroundColor,
              backgroundImage: backgroundImage !== 'none' ? backgroundImage : undefined,
              backgroundPosition,
              backgroundSize,
            }}
          >
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">CSS 样式预览</h3>
              <p className="text-sm opacity-80">
                前景色与背景的组合效果展示
              </p>
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
