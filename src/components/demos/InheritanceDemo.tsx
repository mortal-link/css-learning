'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export function InheritanceDemo() {
  const [selectedProperty, setSelectedProperty] = useState<string>('color')
  const [parentValue, setParentValue] = useState<string>('blue')
  const [childKeyword, setChildKeyword] = useState<string>('inherit')

  const inheritedProperties = [
    { name: 'color', label: '文字颜色 (color)', values: ['blue', 'red', 'green', '#333'], initial: 'black' },
    { name: 'font-size', label: '字体大小 (font-size)', values: ['16px', '20px', '24px', '14px'], initial: '16px' },
    { name: 'font-family', label: '字体族 (font-family)', values: ['serif', 'sans-serif', 'monospace', 'cursive'], initial: 'serif' },
    { name: 'line-height', label: '行高 (line-height)', values: ['1.5', '2', '1.2', '1'], initial: 'normal' },
    { name: 'text-align', label: '文本对齐 (text-align)', values: ['left', 'center', 'right', 'justify'], initial: 'left' },
  ]

  const nonInheritedProperties = [
    { name: 'margin', label: '外边距 (margin)', values: ['0', '10px', '20px', '30px'], initial: '0' },
    { name: 'padding', label: '内边距 (padding)', values: ['0', '10px', '20px', '30px'], initial: '0' },
    { name: 'border', label: '边框 (border)', values: ['none', '1px solid black', '2px dashed red', '3px dotted blue'], initial: 'none' },
    { name: 'background', label: '背景 (background)', values: ['transparent', '#f0f0f0', '#ffe', '#e0f0ff'], initial: 'transparent' },
    { name: 'width', label: '宽度 (width)', values: ['auto', '100px', '200px', '300px'], initial: 'auto' },
  ]

  const allProperties = [...inheritedProperties, ...nonInheritedProperties]
  const currentProperty = allProperties.find(p => p.name === selectedProperty)!
  const isInherited = inheritedProperties.some(p => p.name === selectedProperty)

  const keywords = [
    { value: 'inherit', label: 'inherit (继承父元素)', desc: '继承父元素的值' },
    { value: 'initial', label: 'initial (初始值)', desc: '使用 CSS 规范定义的初始值' },
    { value: 'unset', label: 'unset (重置)', desc: '可继承属性=inherit，否则=initial' },
    { value: 'revert', label: 'revert (还原)', desc: '还原到浏览器默认样式' },
  ]

  const getEffectiveValue = () => {
    if (childKeyword === 'inherit') {
      return parentValue
    }
    if (childKeyword === 'initial') {
      return currentProperty.initial
    }
    if (childKeyword === 'unset') {
      return isInherited ? parentValue : currentProperty.initial
    }
    if (childKeyword === 'revert') {
      return currentProperty.initial // Simplified: treat as initial
    }
    return isInherited ? parentValue : currentProperty.initial
  }

  const effectiveValue = getEffectiveValue()

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">CSS 继承可视化</h3>

      {/* Property Selection */}
      <div className="mb-6">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold">可继承属性</h4>
            <Badge variant="default" className="bg-green-500">默认继承</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {inheritedProperties.map(prop => (
              <button
                key={prop.name}
                onClick={() => {
                  setSelectedProperty(prop.name)
                  setParentValue(prop.values[0])
                }}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  selectedProperty === prop.name
                    ? 'bg-green-500 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                }`}
              >
                {prop.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold">不可继承属性</h4>
            <Badge variant="secondary">默认不继承</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {nonInheritedProperties.map(prop => (
              <button
                key={prop.name}
                onClick={() => {
                  setSelectedProperty(prop.name)
                  setParentValue(prop.values[0])
                }}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  selectedProperty === prop.name
                    ? 'bg-gray-600 text-white border-gray-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {prop.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parent Value Control */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h4 className="text-sm font-semibold mb-2">父元素 - {currentProperty.label}</h4>
        <div className="flex flex-wrap gap-2">
          {currentProperty.values.map(value => (
            <button
              key={value}
              onClick={() => setParentValue(value)}
              className={`px-3 py-1 text-sm rounded border transition-colors ${
                parentValue === value
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword Control */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h4 className="text-sm font-semibold mb-2">子元素 - 关键字设置</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.map(kw => (
            <button
              key={kw.value}
              onClick={() => setChildKeyword(kw.value)}
              className={`px-3 py-1 text-sm rounded border transition-colors ${
                childKeyword === kw.value
                  ? 'bg-purple-500 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
              }`}
              title={kw.desc}
            >
              {kw.label}
            </button>
          ))}
        </div>
      </div>

      {/* DOM Tree Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">DOM 树可视化</h4>
        <div className="relative pl-8">
          {/* Parent Node */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">&lt;div&gt;</code>
              <span className="text-xs text-gray-600">父元素</span>
            </div>
            <div className="ml-6 p-3 bg-blue-50 border-2 border-blue-300 rounded">
              <div className="text-xs text-gray-600 mb-1">
                {currentProperty.name}: <strong>{parentValue}</strong>
              </div>
              <div
                className="text-sm p-2 bg-white rounded"
                style={{ [currentProperty.name]: parentValue } as React.CSSProperties}
              >
                这是父元素的内容
              </div>
            </div>
          </div>

          {/* Connecting Line */}
          <div className="absolute left-4 top-8 bottom-12 w-px bg-gray-300"></div>
          <div className="absolute left-4 top-1/2 w-4 h-px bg-gray-300"></div>

          {/* Child Node */}
          <div className="ml-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">&lt;p&gt;</code>
              <span className="text-xs text-gray-600">子元素</span>
            </div>
            <div className={`ml-6 p-3 border-2 rounded ${
              isInherited && childKeyword === 'inherit' ? 'bg-green-50 border-green-300' :
              childKeyword === 'initial' ? 'bg-orange-50 border-orange-300' :
              'bg-gray-50 border-gray-300'
            }`}>
              <div className="text-xs text-gray-600 mb-1">
                {currentProperty.name}: <strong>{childKeyword}</strong>
                <span className="ml-2 text-purple-600">
                  → 计算值: <strong>{effectiveValue}</strong>
                </span>
              </div>
              <div
                className="text-sm p-2 bg-white rounded"
                style={{ [currentProperty.name]: effectiveValue } as React.CSSProperties}
              >
                这是子元素的内容
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-blue-50 rounded border border-blue-200">
        <h4 className="text-sm font-semibold mb-2">说明</h4>
        <div className="text-sm text-gray-700 space-y-1">
          {isInherited ? (
            <>
              <p>✅ <strong>{currentProperty.name}</strong> 是<strong className="text-green-600">可继承属性</strong></p>
              <p>• 子元素默认会继承父元素的值</p>
              <p>• 当前：{childKeyword === 'inherit' ? '子元素继承了父元素的值' :
                childKeyword === 'initial' ? `子元素使用初始值 (${currentProperty.initial})` :
                childKeyword === 'unset' ? '子元素继承了父元素的值 (可继承属性)' :
                '子元素使用浏览器默认值'}</p>
            </>
          ) : (
            <>
              <p>❌ <strong>{currentProperty.name}</strong> 是<strong className="text-red-600">不可继承属性</strong></p>
              <p>• 子元素默认不会继承父元素的值</p>
              <p>• 当前：{childKeyword === 'inherit' ? '使用 inherit 强制继承父元素的值' :
                childKeyword === 'initial' ? `子元素使用初始值 (${currentProperty.initial})` :
                childKeyword === 'unset' ? `子元素使用初始值 (${currentProperty.initial}) (不可继承属性)` :
                '子元素使用浏览器默认值'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
