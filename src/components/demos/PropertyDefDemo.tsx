'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type PropertyData = {
  name: string
  label: string
  value: string
  initial: string
  appliesTo: string
  inherited: string
  percentages: string
  computed: string
}

type FieldInfo = {
  title: string
  description: string
  example: string
}

export function PropertyDefDemo() {
  const [selectedProperty, setSelectedProperty] = useState<string>('color')
  const [hoveredField, setHoveredField] = useState<string | null>(null)

  const properties: PropertyData[] = [
    {
      name: 'color',
      label: 'color (文字颜色)',
      value: '<color>',
      initial: 'canvastext',
      appliesTo: '所有元素',
      inherited: '是',
      percentages: '不适用',
      computed: '计算后的颜色值',
    },
    {
      name: 'margin',
      label: 'margin (外边距)',
      value: '<length> | <percentage> | auto',
      initial: '0',
      appliesTo: '所有元素（除 display: table-* 外）',
      inherited: '否',
      percentages: '相对于包含块的宽度',
      computed: '百分比或绝对长度，或 auto',
    },
    {
      name: 'display',
      label: 'display (显示类型)',
      value: 'block | inline | flex | grid | none | ...',
      initial: 'inline',
      appliesTo: '所有元素',
      inherited: '否',
      percentages: '不适用',
      computed: '指定值，除非元素是浮动或绝对定位',
    },
    {
      name: 'font-family',
      label: 'font-family (字体族)',
      value: '<family-name> | <generic-family>',
      initial: '取决于用户代理',
      appliesTo: '所有元素',
      inherited: '是',
      percentages: '不适用',
      computed: '指定值',
    },
    {
      name: 'width',
      label: 'width (宽度)',
      value: '<length> | <percentage> | auto | min-content | ...',
      initial: 'auto',
      appliesTo: '除非替换行内元素、表格行、行组外的所有元素',
      inherited: '否',
      percentages: '相对于包含块的宽度',
      computed: '百分比、auto 或绝对长度',
    },
  ]

  const fieldInfos: Record<string, FieldInfo> = {
    value: {
      title: 'Value（值语法）',
      description: '定义该属性可接受的值类型和语法。使用 CSS 值定义语法表示法。',
      example: '<color> 表示颜色值，| 表示"或"，* 表示 0 次或多次',
    },
    initial: {
      title: 'Initial（初始值）',
      description: 'CSS 规范为该属性定义的初始值。当没有指定值且不继承时使用。',
      example: 'color 的初始值是 canvastext（画布文本颜色）',
    },
    appliesTo: {
      title: 'Applies to（适用元素）',
      description: '该属性可以应用到哪些类型的元素上。',
      example: '有些属性只对块级元素有效，有些对所有元素都有效',
    },
    inherited: {
      title: 'Inherited（是否继承）',
      description: '子元素是否会自动继承父元素的该属性值。',
      example: '"是" 表示子元素默认继承父元素的值；"否" 表示不继承',
    },
    percentages: {
      title: 'Percentages（百分比参照）',
      description: '当值为百分比时，它相对于什么来计算。',
      example: 'margin: 10% 相对于包含块的宽度（注意不是高度！）',
    },
    computed: {
      title: 'Computed value（计算值）',
      description: '继承传递给子元素的值。可能与指定值不同。',
      example: 'em 单位会被计算为绝对像素值后再继承',
    },
  }

  const currentProperty = properties.find(p => p.name === selectedProperty)!
  const currentFieldInfo = hoveredField ? fieldInfos[hoveredField] : null

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">CSS 属性定义表解读</h3>

      {/* Property Selector */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">选择一个属性</h4>
        <div className="flex flex-wrap gap-2">
          {properties.map(prop => (
            <button
              key={prop.name}
              onClick={() => setSelectedProperty(prop.name)}
              className={`px-4 py-2 text-sm rounded border transition-all ${
                selectedProperty === prop.name
                  ? 'bg-blue-500 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              {prop.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Definition Table */}
      <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300">
        <table className="w-full">
          <tbody>
            <tr
              className={`border-b border-gray-200 transition-colors cursor-pointer ${
                hoveredField === 'value'
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredField('value')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <td className="py-3 px-4 font-semibold text-sm text-gray-700 bg-gray-50 w-32">
                Value
              </td>
              <td className="py-3 px-4 text-sm font-mono text-gray-800">
                {currentProperty.value}
              </td>
            </tr>

            <tr
              className={`border-b border-gray-200 transition-colors cursor-pointer ${
                hoveredField === 'initial'
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredField('initial')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <td className="py-3 px-4 font-semibold text-sm text-gray-700 bg-gray-50">
                Initial
              </td>
              <td className="py-3 px-4 text-sm font-mono text-gray-800">
                {currentProperty.initial}
              </td>
            </tr>

            <tr
              className={`border-b border-gray-200 transition-colors cursor-pointer ${
                hoveredField === 'appliesTo'
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredField('appliesTo')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <td className="py-3 px-4 font-semibold text-sm text-gray-700 bg-gray-50">
                Applies to
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {currentProperty.appliesTo}
              </td>
            </tr>

            <tr
              className={`border-b border-gray-200 transition-colors cursor-pointer ${
                hoveredField === 'inherited'
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredField('inherited')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <td className="py-3 px-4 font-semibold text-sm text-gray-700 bg-gray-50">
                Inherited
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                <Badge
                  className={
                    currentProperty.inherited === '是'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }
                >
                  {currentProperty.inherited}
                </Badge>
              </td>
            </tr>

            <tr
              className={`border-b border-gray-200 transition-colors cursor-pointer ${
                hoveredField === 'percentages'
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredField('percentages')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <td className="py-3 px-4 font-semibold text-sm text-gray-700 bg-gray-50">
                Percentages
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {currentProperty.percentages}
              </td>
            </tr>

            <tr
              className={`transition-colors cursor-pointer ${
                hoveredField === 'computed'
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredField('computed')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <td className="py-3 px-4 font-semibold text-sm text-gray-700 bg-gray-50">
                Computed value
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {currentProperty.computed}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Explanation Panel */}
      {currentFieldInfo ? (
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 shadow-sm">
          <h4 className="text-base font-bold text-blue-900 mb-2">
            这意味着什么？
          </h4>
          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-semibold text-gray-800 mb-1">
                {currentFieldInfo.title}
              </h5>
              <p className="text-sm text-gray-700">
                {currentFieldInfo.description}
              </p>
            </div>
            <div className="pt-3 border-t border-blue-200">
              <h5 className="text-xs font-semibold text-gray-700 mb-1">
                示例
              </h5>
              <p className="text-sm text-gray-600 italic">
                {currentFieldInfo.example}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            将鼠标悬停在表格的任意行上，查看该字段的详细说明
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
        <p className="text-sm text-gray-700">
          <strong>提示：</strong>CSS 规范使用标准化的属性定义表来描述每个属性的行为。理解这些字段能帮助你准确预测 CSS 属性的表现。
        </p>
      </div>
    </div>
  )
}
