'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface ColorStop {
  color: string
  position: number
}

type GradientType = 'linear' | 'radial' | 'conic'
type RadialShape = 'circle' | 'ellipse'

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '',
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  )
}

export function GradientBuilder() {
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState(135)
  const [radialShape, setRadialShape] = useState<RadialShape>('circle')
  const [conicFrom, setConicFrom] = useState(0)
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ])

  const generateGradientCSS = (): string => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(', ')

    switch (gradientType) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${stops})`
      case 'radial':
        return `radial-gradient(${radialShape}, ${stops})`
      case 'conic':
        return `conic-gradient(from ${conicFrom}deg, ${stops})`
    }
  }

  const addColorStop = () => {
    if (colorStops.length >= 5) return
    const newPosition = Math.round(
      colorStops.reduce((sum, stop) => sum + stop.position, 0) / colorStops.length
    )
    setColorStops([
      ...colorStops,
      { color: '#ffffff', position: Math.min(newPosition, 100) },
    ])
  }

  const removeColorStop = (index: number) => {
    if (colorStops.length <= 2) return
    setColorStops(colorStops.filter((_, i) => i !== index))
  }

  const updateColorStop = (
    index: number,
    field: keyof ColorStop,
    value: string | number
  ) => {
    const updated = [...colorStops]
    updated[index] = { ...updated[index], [field]: value }
    setColorStops(updated)
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '日落':
        setGradientType('linear')
        setAngle(135)
        setColorStops([
          { color: '#ff6b6b', position: 0 },
          { color: '#feca57', position: 50 },
          { color: '#ee5a6f', position: 100 },
        ])
        break
      case '海洋':
        setGradientType('linear')
        setAngle(180)
        setColorStops([
          { color: '#667eea', position: 0 },
          { color: '#48c6ef', position: 100 },
        ])
        break
      case '森林':
        setGradientType('radial')
        setRadialShape('ellipse')
        setColorStops([
          { color: '#134e5e', position: 0 },
          { color: '#71b280', position: 100 },
        ])
        break
      case '紫霞':
        setGradientType('linear')
        setAngle(45)
        setColorStops([
          { color: '#8e2de2', position: 0 },
          { color: '#4a00e0', position: 100 },
        ])
        break
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Gradient Type Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">渐变类型</label>
        <div className="flex gap-2">
          {(['linear', 'radial', 'conic'] as GradientType[]).map((type) => (
            <button
              key={type}
              onClick={() => setGradientType(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                gradientType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {type === 'linear' && '线性渐变'}
              {type === 'radial' && '径向渐变'}
              {type === 'conic' && '锥形渐变'}
            </button>
          ))}
        </div>
      </div>

      {/* Type-specific Controls */}
      <div className="space-y-4">
        {gradientType === 'linear' && (
          <Slider
            label="渐变角度"
            value={angle}
            onChange={setAngle}
            min={0}
            max={360}
            unit="deg"
          />
        )}

        {gradientType === 'radial' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">形状</label>
            <div className="flex gap-2">
              {(['circle', 'ellipse'] as RadialShape[]).map((shape) => (
                <button
                  key={shape}
                  onClick={() => setRadialShape(shape)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    radialShape === shape
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {shape === 'circle' ? '圆形' : '椭圆'}
                </button>
              ))}
            </div>
          </div>
        )}

        {gradientType === 'conic' && (
          <Slider
            label="起始角度"
            value={conicFrom}
            onChange={setConicFrom}
            min={0}
            max={360}
            unit="deg"
          />
        )}
      </div>

      {/* Color Stops */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">颜色节点</label>
          <Badge variant="secondary">{colorStops.length}/5</Badge>
        </div>

        <div className="space-y-2">
          {colorStops.map((stop, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                className="w-12 h-10 rounded border cursor-pointer bg-transparent"
              />
              <div className="flex-1">
                <Slider
                  label={`位置 ${index + 1}`}
                  value={stop.position}
                  onChange={(value) => updateColorStop(index, 'position', value)}
                  min={0}
                  max={100}
                  unit="%"
                />
              </div>
              <button
                onClick={() => removeColorStop(index)}
                disabled={colorStops.length <= 2}
                className="px-3 py-2 text-sm font-medium rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                删除
              </button>
            </div>
          ))}
        </div>

        {colorStops.length < 5 && (
          <button
            onClick={addColorStop}
            className="w-full px-4 py-2 text-sm font-medium rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors"
          >
            + 添加颜色节点
          </button>
        )}
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['日落', '海洋', '森林', '紫霞'].map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Gradient Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预览</label>
        <div
          className="w-full h-[180px] rounded-lg border shadow-sm"
          style={{ background: generateGradientCSS() }}
        />
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS 代码</label>
        <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code className="text-foreground">background: {generateGradientCSS()};</code>
        </div>
      </div>
    </div>
  )
}
