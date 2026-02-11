'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

interface Preset {
  name: string
  position: PositionType
  top: number
  left: number
}

const presets: Preset[] = [
  { name: '默认', position: 'static', top: 0, left: 0 },
  { name: '右下偏移', position: 'relative', top: 20, left: 30 },
  { name: '右上角', position: 'absolute', top: 0, left: 200 },
  { name: '居中', position: 'absolute', top: 60, left: 120 },
]

const explanations: Record<PositionType, string> = {
  static: '默认定位方式。元素按照正常文档流布局，top/left/right/bottom 属性无效。这是所有元素的默认值。',
  relative: '相对定位。元素相对于其正常位置偏移，但原本占据的空间仍然保留（灰色虚线框显示原始位置）。不会影响其他元素的布局。',
  absolute: '绝对定位。元素相对于最近的已定位祖先元素（position 不为 static）定位，脱离文档流，不占据空间。这里相对于蓝色父元素的左上角定位。',
  fixed: '固定定位。元素相对于浏览器视口定位，滚动页面时位置不变。脱离文档流。常用于固定导航栏、返回顶部按钮等。',
  sticky: '粘性定位。元素在跨越特定阈值前表现为 relative，之后表现为 fixed。常用于滚动时固定表头。需要指定 top/left/right/bottom 至少一个值。',
}

export function PositionDemo() {
  const [position, setPosition] = useState<PositionType>('static')
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  const handlePreset = (preset: Preset) => {
    setPosition(preset.position)
    setTop(preset.top)
    setLeft(preset.left)
  }

  const positionTypes: PositionType[] = ['static', 'relative', 'absolute', 'fixed', 'sticky']

  const getChildStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '80px',
      height: '80px',
    }

    if (position === 'static') {
      return {
        ...base,
        position: 'static',
        marginTop: '20px',
        marginLeft: '20px',
      }
    }

    if (position === 'relative') {
      return {
        ...base,
        position: 'relative',
        top: `${top}px`,
        left: `${left}px`,
        marginTop: '20px',
        marginLeft: '20px',
      }
    }

    if (position === 'absolute') {
      return {
        ...base,
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
      }
    }

    // For fixed and sticky, show simplified representation
    return {
      ...base,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }

  const getGhostStyle = (): React.CSSProperties => {
    return {
      width: '80px',
      height: '80px',
      marginTop: '20px',
      marginLeft: '20px',
    }
  }

  const getCSSCode = () => {
    const parentCSS = `.parent {\n  position: relative;\n}`

    if (position === 'static') {
      return `${parentCSS}\n\n.child {\n  position: static;\n  /* top/left 无效 */\n}`
    }

    if (position === 'relative') {
      return `${parentCSS}\n\n.child {\n  position: relative;\n  top: ${top}px;\n  left: ${left}px;\n}`
    }

    if (position === 'absolute') {
      return `${parentCSS}\n\n.child {\n  position: absolute;\n  top: ${top}px;\n  left: ${left}px;\n}`
    }

    if (position === 'fixed') {
      return `${parentCSS}\n\n.child {\n  position: fixed;\n  top: ${top}px;\n  left: ${left}px;\n  /* 相对于视口定位 */\n}`
    }

    return `${parentCSS}\n\n.child {\n  position: sticky;\n  top: ${top}px;\n  /* 滚动时粘在顶部 */\n}`
  }

  return (
    <div className="space-y-4">
      {/* Preset Scenarios */}
      <div className="flex flex-wrap gap-2">
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

      {/* Position Type Selector */}
      <div className="space-y-2">
        <div className="text-sm font-medium">定位类型</div>
        <div className="flex flex-wrap gap-2">
          {positionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setPosition(type)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                position === type
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Offset Controls */}
      {position !== 'static' && (
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">top 偏移</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {top}px
              </Badge>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={top}
              onChange={(e) => setTop(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">left 偏移</label>
              <Badge variant="secondary" className="font-mono text-xs">
                {left}px
              </Badge>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={left}
              onChange={(e) => setLeft(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 dark:bg-blue-900"
            />
          </div>
        </div>
      )}

      {/* Visual Container */}
      <div className="relative w-full h-[300px] bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
        {/* Parent Element */}
        <div
          className={`relative w-[80%] h-[200px] rounded transition-colors ${
            position === 'absolute'
              ? 'border-2 border-blue-500 dark:border-blue-400 bg-blue-100/60 dark:bg-blue-950/40'
              : 'border-2 border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
          }`}
        >
          {/* Parent Label */}
          <div className="absolute -top-3 left-3 px-2 bg-background text-xs font-medium text-blue-600 dark:text-blue-400">
            父元素 (position: relative)
          </div>

          {/* Ghost Outline for Relative Position */}
          {position === 'relative' && (
            <div
              style={getGhostStyle()}
              className="absolute border-2 border-dashed border-muted-foreground/50 rounded opacity-60"
            />
          )}

          {/* Child Element */}
          <div
            style={getChildStyle()}
            className="bg-rose-400 dark:bg-rose-500 rounded shadow-md flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
          >
            子元素
          </div>

          {/* Special Note for Fixed/Sticky */}
          {(position === 'fixed' || position === 'sticky') && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-md border">
                {position === 'fixed' ? '相对于视口定位' : '滚动时粘性定位'}
              </div>
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

      {/* Explanation */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">
            {position.toUpperCase()}:
          </span>{' '}
          {explanations[position]}
        </div>
      </div>
    </div>
  )
}
