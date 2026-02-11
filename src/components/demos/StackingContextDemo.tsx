'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface LayerState {
  zIndex: number | 'auto'
  createsContext: boolean
  name: string
  label: string
  colorClass: string
  darkColorClass: string
}

type Preset = '默认' | '反转' | '嵌套上下文' | '相同层级'

const initialLayers: LayerState[] = [
  { zIndex: 1, createsContext: false, name: 'layer-a', label: '层 A', colorClass: 'bg-rose-400/80', darkColorClass: 'dark:bg-rose-600/80' },
  { zIndex: 2, createsContext: false, name: 'layer-b', label: '层 B', colorClass: 'bg-blue-400/80', darkColorClass: 'dark:bg-blue-600/80' },
  { zIndex: 3, createsContext: false, name: 'layer-c', label: '层 C', colorClass: 'bg-green-400/80', darkColorClass: 'dark:bg-green-600/80' },
  { zIndex: 'auto', createsContext: false, name: 'layer-d', label: '层 D', colorClass: 'bg-amber-400/80', darkColorClass: 'dark:bg-amber-600/80' },
]

export function StackingContextDemo() {
  const [layers, setLayers] = useState<LayerState[]>(initialLayers)

  const updateLayer = (index: number, updates: Partial<LayerState>) => {
    setLayers(prev => prev.map((layer, i) => i === index ? { ...layer, ...updates } : layer))
  }

  const applyPreset = (preset: Preset) => {
    switch (preset) {
      case '默认':
        setLayers([
          { ...initialLayers[0], zIndex: 1, createsContext: false },
          { ...initialLayers[1], zIndex: 2, createsContext: false },
          { ...initialLayers[2], zIndex: 3, createsContext: false },
          { ...initialLayers[3], zIndex: 'auto', createsContext: false },
        ])
        break
      case '反转':
        setLayers([
          { ...initialLayers[0], zIndex: 3, createsContext: false },
          { ...initialLayers[1], zIndex: 2, createsContext: false },
          { ...initialLayers[2], zIndex: 1, createsContext: false },
          { ...initialLayers[3], zIndex: 0, createsContext: false },
        ])
        break
      case '嵌套上下文':
        setLayers([
          { ...initialLayers[0], zIndex: 1, createsContext: true },
          { ...initialLayers[1], zIndex: 2, createsContext: false },
          { ...initialLayers[2], zIndex: 3, createsContext: true },
          { ...initialLayers[3], zIndex: 'auto', createsContext: false },
        ])
        break
      case '相同层级':
        setLayers([
          { ...initialLayers[0], zIndex: 0, createsContext: false },
          { ...initialLayers[1], zIndex: 0, createsContext: false },
          { ...initialLayers[2], zIndex: 0, createsContext: false },
          { ...initialLayers[3], zIndex: 0, createsContext: false },
        ])
        break
    }
  }

  const getPaintOrder = () => {
    return [...layers]
      .map((layer, originalIndex) => ({ ...layer, originalIndex }))
      .sort((a, b) => {
        const aZ = a.zIndex === 'auto' ? 0 : a.zIndex
        const bZ = b.zIndex === 'auto' ? 0 : b.zIndex
        if (aZ !== bZ) return aZ - bZ
        return a.originalIndex - b.originalIndex
      })
  }

  const getExplanation = () => {
    const contextLayers = layers.filter(l => l.createsContext)
    if (contextLayers.length > 0) {
      const names = contextLayers.map(l => l.label).join('、')
      return `${names} 通过 opacity/transform 建立了新的层叠上下文，其内部元素的 z-index 只在该上下文内生效，不会与外部元素比较。`
    }

    const sameZ = layers.filter(l => l.zIndex === layers[0].zIndex).length === layers.length
    if (sameZ) {
      return '所有层级的 z-index 相同，此时按照 HTML 文档顺序绘制（后出现的元素在上方）。'
    }

    return 'z-index 值越大，元素在层叠顺序中越靠上。position 属性必须非 static 才能使 z-index 生效。'
  }

  const getCSSCode = () => {
    return layers.map(layer => {
      const lines = [
        `.${layer.name} {`,
        '  position: relative;',
        `  z-index: ${layer.zIndex};`
      ]

      if (layer.createsContext) {
        lines.push('  opacity: 0.99; /* 建立层叠上下文 */')
      }

      lines.push('}')
      return lines.join('\n')
    }).join('\n\n')
  }

  const paintOrder = getPaintOrder()

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground mr-2">预设场景:</span>
        {(['默认', '反转', '嵌套上下文', '相同层级'] as Preset[]).map(preset => (
          <button
            key={preset}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visual Stacking Area */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">视觉堆叠效果</h3>
          <div className="relative w-full h-[280px] bg-muted/50 rounded-lg border-2 border-border overflow-hidden">
            {layers.map((layer, index) => {
              const style: React.CSSProperties = {
                zIndex: layer.zIndex === 'auto' ? 'auto' : layer.zIndex,
                opacity: layer.createsContext ? 0.99 : 1,
                transform: layer.createsContext ? 'translateZ(0)' : undefined,
              }

              return (
                <div
                  key={layer.name}
                  className={`absolute w-40 h-32 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-lg ${layer.colorClass} ${layer.darkColorClass}`}
                  style={{
                    ...style,
                    left: `${20 + index * 30}px`,
                    top: `${20 + index * 35}px`,
                  }}
                >
                  <div className="text-center">
                    <div>{layer.label}</div>
                    <div className="text-sm mt-1">z: {layer.zIndex}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">图层控制</h3>
          <div className="space-y-4">
            {layers.map((layer, index) => (
              <div key={layer.name} className="p-4 rounded-lg border border-border bg-background">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">{layer.label}</span>
                  <Badge variant="outline" className="text-xs">
                    z-index: {layer.zIndex}
                  </Badge>
                </div>

                {/* Z-index Slider */}
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">z-index 值</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="-5"
                      max="10"
                      value={layer.zIndex === 'auto' ? 0 : layer.zIndex}
                      onChange={(e) => updateLayer(index, { zIndex: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      onClick={() => updateLayer(index, { zIndex: 'auto' })}
                      className={`px-2 py-1 text-xs rounded ${
                        layer.zIndex === 'auto'
                          ? 'bg-blue-500 dark:bg-blue-600 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      auto
                    </button>
                  </div>
                </div>

                {/* Context Toggle */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`context-${index}`}
                    checked={layer.createsContext}
                    onChange={(e) => updateLayer(index, { createsContext: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label htmlFor={`context-${index}`} className="text-sm text-foreground">
                    建立层叠上下文
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paint Order Display */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">绘制顺序（从后到前）</h3>
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg border border-border">
          {paintOrder.map((layer, index) => (
            <div key={layer.name} className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {index + 1}. {layer.label} (z: {layer.zIndex})
              </Badge>
              {index < paintOrder.length - 1 && (
                <span className="text-muted-foreground">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 {getExplanation()}
        </p>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">生成的 CSS 代码</h3>
        <pre className="p-4 bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg overflow-x-auto text-xs">
          <code>{getCSSCode()}</code>
        </pre>
      </div>
    </div>
  )
}
