'use client'

import { useState } from 'react'

type RuleStyle = 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge'

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

export function ColumnRuleDemo() {
  const [columnGap, setColumnGap] = useState(30)
  const [ruleWidth, setRuleWidth] = useState(2)
  const [ruleStyle, setRuleStyle] = useState<RuleStyle>('solid')
  const [ruleColor, setRuleColor] = useState('#667eea')

  const sampleText = `多列布局不仅可以设置列数和列宽，还可以通过 column-gap 控制列之间的间隔，通过 column-rule 属性在列之间添加分隔线。column-rule 是一个简写属性，包含 column-rule-width、column-rule-style 和 column-rule-color 三个子属性。这些特性使得多列布局更加美观和易读。`

  const generateCSS = (): string => {
    return `column-count: 3;
column-gap: ${columnGap}px;
column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};`
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '细线分隔':
        setColumnGap(30)
        setRuleWidth(1)
        setRuleStyle('solid')
        setRuleColor('#cbd5e0')
        break
      case '虚线':
        setColumnGap(40)
        setRuleWidth(2)
        setRuleStyle('dashed')
        setRuleColor('#667eea')
        break
      case '粗双线':
        setColumnGap(50)
        setRuleWidth(6)
        setRuleStyle('double')
        setRuleColor('#764ba2')
        break
      case '无间隔':
        setColumnGap(0)
        setRuleWidth(0)
        setRuleStyle('none')
        setRuleColor('#000000')
        break
    }
  }

  const colorPresets = [
    { name: '蓝色', value: '#667eea' },
    { name: '紫色', value: '#764ba2' },
    { name: '灰色', value: '#cbd5e0' },
    { name: '黑色', value: '#000000' },
  ]

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Sliders */}
      <div className="space-y-4">
        <Slider
          label="列间距 (column-gap)"
          value={columnGap}
          onChange={setColumnGap}
          min={0}
          max={60}
          unit="px"
        />

        <Slider
          label="规则线宽度 (column-rule-width)"
          value={ruleWidth}
          onChange={setRuleWidth}
          min={0}
          max={10}
          unit="px"
        />
      </div>

      {/* Rule Style Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">规则线样式 (column-rule-style)</label>
        <div className="flex flex-wrap gap-2">
          {(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'none'] as RuleStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setRuleStyle(style)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                ruleStyle === style
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">规则线颜色 (column-rule-color)</label>
        <div className="flex gap-2 items-center">
          {colorPresets.map((color) => (
            <button
              key={color.value}
              onClick={() => setRuleColor(color.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                ruleColor === color.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {color.name}
            </button>
          ))}
          <input
            type="color"
            value={ruleColor}
            onChange={(e) => setRuleColor(e.target.value)}
            className="w-10 h-8 rounded border cursor-pointer bg-transparent"
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['细线分隔', '虚线', '粗双线', '无间隔'].map((preset) => (
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

      {/* Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预览</label>
        <div
          className="p-4 bg-muted/30 border rounded-lg text-sm leading-relaxed"
          style={{
            columnCount: 3,
            columnGap: `${columnGap}px`,
            columnRuleWidth: `${ruleWidth}px`,
            columnRuleStyle: ruleStyle,
            columnRuleColor: ruleColor,
          }}
        >
          {sampleText}
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS 代码</label>
        <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
          <code className="text-foreground">{generateCSS()}</code>
        </div>
      </div>
    </div>
  )
}
