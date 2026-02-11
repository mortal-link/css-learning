'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Declaration {
  id: string
  property: string
  value: string
  isValid: boolean
  enabled: boolean
  description: string
}

const INITIAL_DECLARATIONS: Declaration[] = [
  {
    id: '1',
    property: 'color',
    value: 'red',
    isValid: true,
    enabled: true,
    description: '标准属性 - 文字颜色',
  },
  {
    id: '2',
    property: 'font-size',
    value: '20px',
    isValid: true,
    enabled: true,
    description: '标准属性 - 字体大小',
  },
  {
    id: '3',
    property: 'display',
    value: 'flex',
    isValid: true,
    enabled: true,
    description: '标准属性 - 弹性布局',
  },
  {
    id: '4',
    property: 'hypergalactic-glow',
    value: '42px',
    isValid: false,
    enabled: true,
    description: '未知属性 - 浏览器将安全忽略',
  },
  {
    id: '5',
    property: 'container-type',
    value: 'inline-size',
    isValid: true,
    enabled: true,
    description: '现代属性 - 容器查询',
  },
  {
    id: '6',
    property: 'quantum-position',
    value: 'entangled',
    isValid: false,
    enabled: true,
    description: '虚构属性 - 安全降级',
  },
  {
    id: '7',
    property: 'border-radius',
    value: '12px',
    isValid: true,
    enabled: true,
    description: '标准属性 - 圆角边框',
  },
  {
    id: '8',
    property: 'future-awesome',
    value: 'true',
    isValid: false,
    enabled: true,
    description: '未定义属性 - 被跳过',
  },
  {
    id: '9',
    property: 'box-shadow',
    value: '0 4px 8px rgba(0,0,0,0.1)',
    isValid: true,
    enabled: true,
    description: '标准属性 - 阴影效果',
  },
  {
    id: '10',
    property: 'animation-duration',
    value: '2s',
    isValid: true,
    enabled: false,
    description: '标准属性 - 动画时长',
  },
]

export function ForwardCompatDemo() {
  const [declarations, setDeclarations] = useState<Declaration[]>(INITIAL_DECLARATIONS)

  const toggleDeclaration = (id: string) => {
    setDeclarations((prev) =>
      prev.map((decl) => (decl.id === id ? { ...decl, enabled: !decl.enabled } : decl))
    )
  }

  const appliedDeclarations = declarations.filter((d) => d.enabled && d.isValid)
  const skippedDeclarations = declarations.filter((d) => d.enabled && !d.isValid)
  const enabledDeclarations = declarations.filter((d) => d.enabled)

  // Build inline styles from valid declarations
  const previewStyles: React.CSSProperties = {}
  appliedDeclarations.forEach((decl) => {
    previewStyles[decl.property as keyof React.CSSProperties] = decl.value as any
  })

  const stats = {
    total: enabledDeclarations.length,
    applied: appliedDeclarations.length,
    skipped: skippedDeclarations.length,
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">CSS 前向兼容性演示</h3>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">已启用声明:</span>
          <Badge variant="outline">{stats.total}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">已应用:</span>
          <Badge className="bg-green-500">{stats.applied}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">已跳过:</span>
          <Badge variant="secondary">{stats.skipped}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Declarations List */}
        <div>
          <h4 className="text-sm font-semibold mb-3">CSS 声明列表</h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {declarations.map((decl) => (
              <button
                key={decl.id}
                onClick={() => toggleDeclaration(decl.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  decl.enabled
                    ? decl.isValid
                      ? 'bg-green-50 border-green-300 hover:border-green-400'
                      : 'bg-orange-50 border-orange-300 hover:border-orange-400'
                    : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono font-semibold text-gray-900">
                        {decl.property}
                      </code>
                      <span className="text-xs text-gray-500">:</span>
                      <code className="text-sm font-mono text-blue-600">{decl.value}</code>
                    </div>
                    <p className="text-xs text-gray-600">{decl.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {decl.enabled ? (
                      decl.isValid ? (
                        <Badge className="bg-green-500 text-xs">✓ 应用</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-200 text-orange-800 text-xs">
                          ⚠ 跳过
                        </Badge>
                      )
                    ) : (
                      <Badge variant="outline" className="text-xs">已禁用</Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 点击任意声明可启用/禁用</p>
        </div>

        {/* Preview */}
        <div>
          <h4 className="text-sm font-semibold mb-3">实时预览</h4>
          <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50 min-h-[300px]">
            <div
              style={previewStyles}
              className="bg-white p-6 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-2">Hello CSS!</h2>
              <p className="mb-3">
                这个元素应用了所有<strong>有效</strong>的 CSS 声明。
              </p>
              <p className="text-sm">
                未知属性被安全忽略，不会影响页面渲染。
              </p>
            </div>
          </div>

          {/* Applied styles code */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">实际应用的样式</h4>
            <div className="border rounded-lg bg-gray-900 text-gray-100 p-3 overflow-auto max-h-[200px]">
              <pre className="text-xs font-mono leading-relaxed">
                {appliedDeclarations.length > 0 ? (
                  `.element {{\n${appliedDeclarations
                    .map((d) => `  ${d.property}: ${d.value};`)
                    .join('\n')}\n}}`
                ) : (
                  '/* 没有应用任何样式 */'
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h4 className="text-sm font-semibold mb-2">🔮 前向兼容性原理</h4>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>CSS 的容错机制：</strong>当浏览器遇到无法识别的属性时，会安全地忽略该声明，
            继续处理其他有效的样式规则。
          </p>
          <p>
            <strong>为什么重要：</strong>这使得开发者可以使用最新的 CSS 特性，同时为旧浏览器提供优雅降级。
            新特性在支持的浏览器中生效，不支持的浏览器会跳过而不报错。
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-blue-200">
            <div>
              <p className="font-semibold text-green-700">✓ 有效属性</p>
              <p className="text-xs mt-1">浏览器能识别并应用到元素上</p>
            </div>
            <div>
              <p className="font-semibold text-orange-700">⚠ 未知属性</p>
              <p className="text-xs mt-1">浏览器安全忽略，不影响其他样式</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
