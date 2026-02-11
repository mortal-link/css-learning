'use client'

import { useState, useEffect, useCallback } from 'react'

type EasingPreset = {
  name: string
  label: string
  value: string
  bezier?: [number, number, number, number]
  steps?: { count: number; position: 'end' | 'start' }
}

const EASING_PRESETS: EasingPreset[] = [
  { name: 'linear', label: 'Linear', value: 'linear', bezier: [0, 0, 1, 1] },
  { name: 'ease', label: 'Ease', value: 'ease', bezier: [0.25, 0.1, 0.25, 1] },
  { name: 'ease-in', label: 'Ease In', value: 'ease-in', bezier: [0.42, 0, 1, 1] },
  { name: 'ease-out', label: 'Ease Out', value: 'ease-out', bezier: [0, 0, 0.58, 1] },
  { name: 'ease-in-out', label: 'Ease In-Out', value: 'ease-in-out', bezier: [0.42, 0, 0.58, 1] },
  { name: 'steps-4', label: 'Steps(4)', value: 'steps(4, end)', steps: { count: 4, position: 'end' } },
  { name: 'steps-8', label: 'Steps(8)', value: 'steps(8, end)', steps: { count: 8, position: 'end' } },
]

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const oneMinusT = 1 - t
  return (
    Math.pow(oneMinusT, 3) * p0 +
    3 * Math.pow(oneMinusT, 2) * t * p1 +
    3 * oneMinusT * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3
  )
}

function generateBezierPath(bezier: [number, number, number, number], width: number, height: number, samples = 50): string {
  const [x1, y1, x2, y2] = bezier
  const points: [number, number][] = []

  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const x = cubicBezier(t, 0, x1, x2, 1)
    const y = cubicBezier(t, 0, y1, y2, 1)

    // Map to SVG coordinates (invert Y axis)
    const svgX = x * width
    const svgY = height - y * height
    points.push([svgX, svgY])
  }

  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
}

function generateStepsPath(count: number, position: 'end' | 'start', width: number, height: number): string {
  const stepWidth = width / count
  const stepHeight = height / count
  let path = `M 0 ${height}`

  for (let i = 0; i < count; i++) {
    const x = (i + (position === 'end' ? 1 : 0)) * stepWidth
    const y = height - (i + 1) * stepHeight

    if (position === 'end') {
      path += ` L ${x} ${height - i * stepHeight} L ${x} ${y}`
    } else {
      path += ` L ${(i + 1) * stepWidth} ${y} L ${(i + 1) * stepWidth} ${height - (i + 1) * stepHeight}`
    }
  }

  path += ` L ${width} 0`
  return path
}

export function EasingVisualizer() {
  const [selectedEasing, setSelectedEasing] = useState<EasingPreset>(EASING_PRESETS[1])
  const [animationKey, setAnimationKey] = useState(0)
  const [comparisonEasings] = useState<EasingPreset[]>([
    EASING_PRESETS[0], // linear
    EASING_PRESETS[2], // ease-in
    EASING_PRESETS[4], // ease-in-out
  ])

  const svgWidth = 280
  const svgHeight = 200
  const padding = 20

  const playAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
  }, [])

  useEffect(() => {
    playAnimation()
  }, [selectedEasing, playAnimation])

  const renderCurve = (easing: EasingPreset) => {
    if (easing.bezier) {
      return generateBezierPath(easing.bezier, svgWidth - padding * 2, svgHeight - padding * 2, 50)
    } else if (easing.steps) {
      return generateStepsPath(easing.steps.count, easing.steps.position, svgWidth - padding * 2, svgHeight - padding * 2)
    }
    return ''
  }

  const getCssOutput = () => {
    const lines = [`animation-timing-function: ${selectedEasing.value};`]
    if (selectedEasing.bezier) {
      const [x1, y1, x2, y2] = selectedEasing.bezier
      lines.push(`/* cubic-bezier(${x1}, ${y1}, ${x2}, ${y2}) */`)
    }
    return lines.join('\n')
  }

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg border border-border">
      {/* Preset Selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">选择缓动函数</h3>
        <div className="flex flex-wrap gap-2">
          {EASING_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setSelectedEasing(preset)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedEasing.name === preset.name
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Curve Display */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">缓动曲线</h3>
        <div className="bg-muted/50 rounded-lg p-4 flex justify-center">
          <svg
            width={svgWidth}
            height={svgHeight}
            className="border border-border bg-background"
          >
            {/* Grid lines */}
            <g stroke="currentColor" strokeWidth="0.5" opacity="0.2">
              {[0.25, 0.5, 0.75].map((ratio) => (
                <g key={ratio}>
                  <line
                    x1={padding + ratio * (svgWidth - padding * 2)}
                    y1={padding}
                    x2={padding + ratio * (svgWidth - padding * 2)}
                    y2={svgHeight - padding}
                  />
                  <line
                    x1={padding}
                    y1={padding + ratio * (svgHeight - padding * 2)}
                    x2={svgWidth - padding}
                    y2={padding + ratio * (svgHeight - padding * 2)}
                  />
                </g>
              ))}
            </g>

            {/* Axes */}
            <g stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} />
              <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} />
            </g>

            {/* Curve */}
            <g transform={`translate(${padding}, ${padding})`}>
              <path
                d={renderCurve(selectedEasing)}
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Labels */}
            <text x={svgWidth / 2} y={svgHeight - 3} textAnchor="middle" className="text-xs fill-muted-foreground">
              时间 →
            </text>
            <text x={8} y={svgHeight / 2} textAnchor="middle" className="text-xs fill-muted-foreground" transform={`rotate(-90, 8, ${svgHeight / 2})`}>
              进度 ↑
            </text>
          </svg>
        </div>
      </div>

      {/* Animation Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">动画预览</h3>
          <button
            onClick={playAnimation}
            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            播放
          </button>
        </div>
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="relative h-12 bg-muted rounded-full overflow-hidden">
            <style key={`anim-${animationKey}`}>
              {`
                @keyframes move-${animationKey} {
                  from { left: 0; }
                  to { left: calc(100% - 3rem); }
                }
                .ball-${animationKey} {
                  animation: move-${animationKey} 1.5s ${selectedEasing.value} forwards;
                }
              `}
            </style>
            <div
              className={`ball-${animationKey} absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full shadow-lg`}
            />
          </div>
        </div>
      </div>

      {/* Comparison Mode */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">对比模式</h3>
        <div className="space-y-3">
          {comparisonEasings.map((easing, index) => (
            <div key={easing.name} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{easing.label}</span>
                <span className="text-xs text-muted-foreground">{easing.value}</span>
              </div>
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <style key={`comp-${animationKey}-${index}`}>
                  {`
                    @keyframes comp-move-${animationKey}-${index} {
                      from { left: 0; }
                      to { left: calc(100% - 2rem); }
                    }
                    .comp-ball-${animationKey}-${index} {
                      animation: comp-move-${animationKey}-${index} 1.5s ${easing.value} forwards;
                    }
                  `}
                </style>
                <div
                  className={`comp-ball-${animationKey}-${index} absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-md ${
                    index === 0 ? 'bg-gray-500 dark:bg-gray-400' : index === 1 ? 'bg-green-500 dark:bg-green-600' : 'bg-purple-500 dark:bg-purple-600'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Output */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">CSS 代码</h3>
        <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{getCssOutput()}</code>
        </pre>
      </div>
    </div>
  )
}
