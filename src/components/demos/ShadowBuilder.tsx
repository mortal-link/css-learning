'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type ShadowType = 'box' | 'text'

type Shadow = {
  x: number
  y: number
  blur: number
  spread?: number
  color: string
  inset?: boolean
}

type Preset = {
  name: string
  type: ShadowType
  shadows: Shadow[]
}

const presets: Preset[] = [
  {
    name: '卡片阴影',
    type: 'box',
    shadows: [
      { x: 0, y: 2, blur: 8, spread: 0, color: 'rgba(0, 0, 0, 0.1)', inset: false },
      { x: 0, y: 4, blur: 16, spread: 0, color: 'rgba(0, 0, 0, 0.06)', inset: false },
    ],
  },
  {
    name: '悬浮效果',
    type: 'box',
    shadows: [
      { x: 0, y: 10, blur: 30, spread: -5, color: 'rgba(0, 0, 0, 0.2)', inset: false },
    ],
  },
  {
    name: '内阴影',
    type: 'box',
    shadows: [
      { x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0, 0, 0, 0.15)', inset: true },
    ],
  },
  {
    name: '多层阴影',
    type: 'box',
    shadows: [
      { x: 0, y: 1, blur: 2, spread: 0, color: 'rgba(0, 0, 0, 0.06)', inset: false },
      { x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0, 0, 0, 0.08)', inset: false },
      { x: 0, y: 4, blur: 8, spread: 0, color: 'rgba(0, 0, 0, 0.1)', inset: false },
    ],
  },
  {
    name: '霓虹文字',
    type: 'text',
    shadows: [
      { x: 0, y: 0, blur: 10, color: '#ff00de', inset: false },
      { x: 0, y: 0, blur: 20, color: '#00d4ff', inset: false },
      { x: 0, y: 0, blur: 30, color: '#ff00de', inset: false },
    ],
  },
]

const colorPresets = [
  { name: '黑色', value: 'rgba(0, 0, 0, 0.2)' },
  { name: '灰色', value: 'rgba(100, 100, 100, 0.3)' },
  { name: '蓝色', value: 'rgba(59, 130, 246, 0.5)' },
  { name: '紫色', value: 'rgba(139, 92, 246, 0.5)' },
  { name: '粉色', value: 'rgba(236, 72, 153, 0.5)' },
  { name: '霓虹蓝', value: '#00d4ff' },
  { name: '霓虹粉', value: '#ff00de' },
]

export function ShadowBuilder() {
  const [type, setType] = useState<ShadowType>('box')
  const [shadows, setShadows] = useState<Shadow[]>([
    { x: 0, y: 4, blur: 8, spread: 0, color: 'rgba(0, 0, 0, 0.15)', inset: false },
  ])

  const handlePreset = (preset: Preset) => {
    setType(preset.type)
    setShadows(preset.shadows)
  }

  const updateShadow = (index: number, updates: Partial<Shadow>) => {
    const newShadows = [...shadows]
    newShadows[index] = { ...newShadows[index], ...updates }
    setShadows(newShadows)
  }

  const addShadow = () => {
    if (type === 'box') {
      setShadows([...shadows, { x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0, 0, 0, 0.1)', inset: false }])
    } else {
      setShadows([...shadows, { x: 0, y: 2, blur: 4, color: 'rgba(0, 0, 0, 0.5)' }])
    }
  }

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((_, i) => i !== index))
    }
  }

  const getCSSCode = () => {
    const property = type === 'box' ? 'box-shadow' : 'text-shadow'
    const shadowStrings = shadows.map((shadow) => {
      if (type === 'box') {
        return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
      } else {
        return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`
      }
    })

    return `.element {\n  ${property}: ${shadowStrings.join(',\n    ')};\n}`
  }

  const getPreviewStyle = () => {
    const shadowStrings = shadows.map((shadow) => {
      if (type === 'box') {
        return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
      } else {
        return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`
      }
    })

    if (type === 'box') {
      return { boxShadow: shadowStrings.join(', ') }
    } else {
      return { textShadow: shadowStrings.join(', ') }
    }
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

      {/* Type Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setType('box')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            type === 'box'
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
          }`}
        >
          盒阴影 (box-shadow)
        </button>
        <button
          onClick={() => setType('text')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            type === 'text'
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
          }`}
        >
          文字阴影 (text-shadow)
        </button>
      </div>

      {/* Shadow Layers */}
      <div className="space-y-3">
        {shadows.map((shadow, index) => (
          <div key={index} className="p-3 bg-muted/30 dark:bg-muted/20 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">阴影层 {index + 1}</span>
              <div className="flex items-center gap-2">
                {type === 'box' && (
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shadow.inset || false}
                      onChange={(e) => updateShadow(index, { inset: e.target.checked })}
                      className="rounded cursor-pointer"
                    />
                    <span>inset</span>
                  </label>
                )}
                {shadows.length > 1 && (
                  <button
                    onClick={() => removeShadow(index)}
                    className="px-2 py-1 text-xs rounded bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                  >
                    删除
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">X 偏移</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {shadow.x}px
                  </Badge>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadow.x}
                  onChange={(e) => updateShadow(index, { x: Number(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Y 偏移</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {shadow.y}px
                  </Badge>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadow.y}
                  onChange={(e) => updateShadow(index, { y: Number(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">模糊半径</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {shadow.blur}px
                  </Badge>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={shadow.blur}
                  onChange={(e) => updateShadow(index, { blur: Number(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
                />
              </div>

              {type === 'box' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">扩展半径</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {shadow.spread}px
                    </Badge>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={shadow.spread}
                    onChange={(e) => updateShadow(index, { spread: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium">颜色</div>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => updateShadow(index, { color: preset.value })}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      shadow.color === preset.value
                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                        : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={shadow.color}
                onChange={(e) => updateShadow(index, { color: e.target.value })}
                className="w-full px-2 py-1.5 text-xs rounded border border-border bg-background font-mono"
                placeholder="rgba(0, 0, 0, 0.2)"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Shadow Button */}
      <button
        onClick={addShadow}
        className="w-full px-4 py-2 text-sm rounded-md bg-green-500/10 hover:bg-green-500/20 dark:bg-green-500/20 dark:hover:bg-green-500/30 text-green-700 dark:text-green-300 transition-colors"
      >
        + 添加阴影层
      </button>

      {/* Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">实时预览</div>
        <div className="flex justify-center items-center p-12 bg-muted/10 dark:bg-muted/5 rounded-lg">
          {type === 'box' ? (
            <div
              className="w-[200px] h-[150px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300"
              style={getPreviewStyle()}
            >
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                盒阴影预览
              </div>
            </div>
          ) : (
            <div
              className="text-5xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300"
              style={getPreviewStyle()}
            >
              文字阴影
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
    </div>
  )
}
