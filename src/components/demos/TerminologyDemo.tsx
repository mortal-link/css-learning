'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type HoveredPart =
  | 'selector'
  | 'property'
  | 'value'
  | 'declaration'
  | 'declaration-block'
  | 'rule-set'
  | null

type PartInfo = {
  title: string
  description: string
  color: string
}

export function TerminologyDemo() {
  const [hoveredPart, setHoveredPart] = useState<HoveredPart>(null)
  const [displayNone, setDisplayNone] = useState<boolean>(false)

  const partInfos: Record<string, PartInfo> = {
    selector: {
      title: '选择器 (Selector)',
      description: '指定要应用样式的 HTML 元素。可以是元素名、类名、ID 或更复杂的选择器。',
      color: 'border-blue-500 bg-blue-50',
    },
    property: {
      title: '属性 (Property)',
      description: 'CSS 属性名，定义要修改的样式特征（如颜色、字体大小等）。',
      color: 'border-green-500 bg-green-50',
    },
    value: {
      title: '值 (Value)',
      description: '分配给属性的具体值，定义样式的外观。',
      color: 'border-purple-500 bg-purple-50',
    },
    declaration: {
      title: '声明 (Declaration)',
      description: '属性和值的组合，形如 property: value。多个声明用分号分隔。',
      color: 'border-orange-500 bg-orange-50',
    },
    'declaration-block': {
      title: '声明块 (Declaration Block)',
      description: '用花括号 {} 包裹的一组声明。包含要应用到选择器的所有样式。',
      color: 'border-pink-500 bg-pink-50',
    },
    'rule-set': {
      title: '规则集 (Rule Set)',
      description: '完整的 CSS 规则，由选择器和声明块组成。也称为"样式规则"。',
      color: 'border-indigo-500 bg-indigo-50',
    },
  }

  const currentInfo = hoveredPart ? partInfos[hoveredPart] : null

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">CSS 术语可视化</h3>

      {/* CSS Rule Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">CSS 规则解析（悬停查看各部分）</h4>
        <div
          className={`p-6 rounded-lg border-2 transition-all ${
            hoveredPart === 'rule-set'
              ? 'border-indigo-500 bg-indigo-50 shadow-lg'
              : 'border-gray-300 bg-gray-50'
          }`}
          onMouseEnter={() => setHoveredPart('rule-set')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <div className="font-mono text-lg space-y-2">
            {/* Selector */}
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded border-2 transition-all cursor-pointer ${
                  hoveredPart === 'selector'
                    ? 'border-blue-500 bg-blue-100 shadow-md'
                    : 'border-transparent hover:border-blue-300 hover:bg-blue-50'
                }`}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredPart('selector')
                }}
              >
                h1
              </span>
              <span
                className={`px-2 py-1 rounded border-2 transition-all ${
                  hoveredPart === 'declaration-block'
                    ? 'border-pink-500 bg-pink-100'
                    : ''
                }`}
              >
                {'{'}
              </span>
            </div>

            {/* Declaration 1 */}
            <div
              className={`pl-8 flex items-center gap-2 ${
                hoveredPart === 'declaration-block' ? 'opacity-100' : ''
              }`}
            >
              <div
                className={`flex items-center gap-2 px-2 py-1 rounded border-2 transition-all cursor-pointer ${
                  hoveredPart === 'declaration'
                    ? 'border-orange-500 bg-orange-100 shadow-md'
                    : 'border-transparent hover:border-orange-300 hover:bg-orange-50'
                }`}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredPart('declaration')
                }}
              >
                <span
                  className={`px-1 rounded border-2 transition-all ${
                    hoveredPart === 'property'
                      ? 'border-green-500 bg-green-100'
                      : 'border-transparent hover:border-green-300 hover:bg-green-50'
                  }`}
                  onMouseEnter={(e) => {
                    e.stopPropagation()
                    setHoveredPart('property')
                  }}
                >
                  color
                </span>
                <span>:</span>
                <span
                  className={`px-1 rounded border-2 transition-all ${
                    hoveredPart === 'value'
                      ? 'border-purple-500 bg-purple-100'
                      : 'border-transparent hover:border-purple-300 hover:bg-purple-50'
                  }`}
                  onMouseEnter={(e) => {
                    e.stopPropagation()
                    setHoveredPart('value')
                  }}
                >
                  red
                </span>
                <span>;</span>
              </div>
            </div>

            {/* Declaration 2 */}
            <div className="pl-8 flex items-center gap-2">
              <span
                className={`px-1 rounded border-2 transition-all ${
                  hoveredPart === 'property'
                    ? 'border-green-500 bg-green-100'
                    : 'border-transparent hover:border-green-300 hover:bg-green-50'
                }`}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredPart('property')
                }}
              >
                font-size
              </span>
              <span>:</span>
              <span
                className={`px-1 rounded border-2 transition-all ${
                  hoveredPart === 'value'
                    ? 'border-purple-500 bg-purple-100'
                    : 'border-transparent hover:border-purple-300 hover:bg-purple-50'
                }`}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredPart('value')
                }}
              >
                2em
              </span>
              <span>;</span>
            </div>

            {/* Closing Brace */}
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded border-2 transition-all ${
                  hoveredPart === 'declaration-block'
                    ? 'border-pink-500 bg-pink-100'
                    : ''
                }`}
              >
                {'}'}
              </span>
            </div>
          </div>
        </div>

        {/* Explanation Panel */}
        {currentInfo ? (
          <div className={`mt-4 p-5 rounded-lg border-2 shadow-sm ${currentInfo.color}`}>
            <h5 className="text-base font-bold text-gray-800 mb-2">
              {currentInfo.title}
            </h5>
            <p className="text-sm text-gray-700">{currentInfo.description}</p>
          </div>
        ) : (
          <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              将鼠标悬停在 CSS 规则的不同部分上，查看术语解释
            </p>
          </div>
        )}
      </div>

      {/* Element → Box Visualization */}
      <div className="mt-8 pt-8 border-t-2 border-gray-200">
        <h4 className="text-sm font-semibold mb-3">元素 (Element) → 盒子 (Box) 的关系</h4>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700 mb-2">
            <strong>核心概念：</strong>HTML 元素生成 CSS 盒子。一个元素可以生成 0 个、1 个或多个盒子。
          </p>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={displayNone}
                onChange={(e) => setDisplayNone(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                对 &lt;p&gt; 应用 <code className="px-1 bg-white rounded">display: none</code>
              </span>
            </label>
            <Badge variant="secondary">
              {displayNone ? '生成 0 个盒子' : '生成 1 个盒子'}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DOM Tree */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
            <h5 className="text-sm font-semibold mb-3 text-gray-700">DOM 树（文档结构）</h5>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <code>&lt;div&gt;</code>
                <Badge variant="outline" className="text-xs">元素</Badge>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <code>&lt;p&gt;</code>
                  <Badge variant="outline" className="text-xs">元素</Badge>
                  {displayNone && (
                    <Badge className="text-xs bg-red-500">display: none</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <code>&lt;span&gt;</code>
                  <Badge variant="outline" className="text-xs">元素</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <code>&lt;img&gt;</code>
                  <Badge variant="outline" className="text-xs">元素</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Box Tree */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-300">
            <h5 className="text-sm font-semibold mb-3 text-gray-700">盒树（渲染结构）</h5>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span>div 盒子</span>
                <Badge className="text-xs bg-green-600">block</Badge>
              </div>
              <div className="ml-6 space-y-2">
                {!displayNone && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span>p 盒子</span>
                    <Badge className="text-xs bg-green-600">block</Badge>
                  </div>
                )}
                {displayNone && (
                  <div className="flex items-center gap-2 opacity-50">
                    <div className="w-3 h-3 rounded bg-gray-400"></div>
                    <span className="line-through">p 盒子</span>
                    <Badge className="text-xs bg-gray-400">不生成</Badge>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span>span 盒子</span>
                  <Badge className="text-xs bg-blue-600">inline</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span>img 盒子</span>
                  <Badge className="text-xs bg-purple-600">replaced</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pseudo-element Example */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h5 className="text-sm font-semibold mb-3 text-gray-700">
            伪元素生成额外的盒子
          </h5>
          <div className="space-y-3">
            <div className="font-mono text-sm bg-white p-3 rounded border border-gray-300">
              <div>h2::before {'{'}</div>
              <div className="pl-4">content: "★ ";</div>
              <div className="pl-4">color: gold;</div>
              <div>{'}'}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Badge variant="outline" className="mb-2">DOM 结构</Badge>
                <div className="text-sm">
                  只有 1 个 <code>&lt;h2&gt;</code> 元素
                </div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="flex-1">
                <Badge className="mb-2 bg-purple-600">渲染盒子</Badge>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>::before 伪元素盒子</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>h2 主盒子</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    生成了 2 个盒子！
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-200">
        <p className="text-sm text-gray-700">
          <strong>关键区别：</strong>元素是 HTML 文档结构的一部分，而盒子是 CSS 用于布局和渲染的视觉容器。CSS 样式应用到盒子上，而不是直接应用到元素上。
        </p>
      </div>
    </div>
  )
}
