'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const STEPS = [
  {
    id: 0,
    title: '解析文档',
    subtitle: 'Parse Document',
    description: '浏览器读取 HTML 源码，构建 DOM 树（文档对象模型）',
    detail: 'HTML 解析器将字符流转换为 token，然后构建成树形结构。每个元素、属性和文本节点都成为 DOM 树的一部分。',
  },
  {
    id: 1,
    title: '获取样式表',
    subtitle: 'Fetch Stylesheets',
    description: '收集所有 CSS 规则：外部样式表、<style> 标签、内联样式',
    detail: '浏览器从多个来源收集样式：link 标签引用的外部 CSS、页面内的 style 标签、元素的 style 属性。按照 CSS 规范解析成规则集。',
  },
  {
    id: 2,
    title: '计算属性值',
    subtitle: 'Compute Values',
    description: '通过层叠、继承和默认值，为每个元素计算最终的样式属性值',
    detail: '应用层叠规则（优先级、来源、特异性）、处理继承（从父元素继承可继承属性）、填充默认值，最终得到每个元素的计算样式。',
  },
  {
    id: 3,
    title: '生成格式化结构',
    subtitle: 'Build Box Tree',
    description: '根据 display 属性生成盒模型树（部分元素不生成盒子）',
    detail: '每个 display 值决定元素如何生成盒子。display:none 不生成盒子，display:block 生成块盒，display:flex 生成弹性容器。伪元素也在此阶段生成。',
  },
  {
    id: 4,
    title: '渲染到 Canvas',
    subtitle: 'Paint & Composite',
    description: '布局计算位置和尺寸，绘制像素，合成图层，最终显示在屏幕上',
    detail: '布局阶段计算每个盒子的几何信息（位置、大小）。绘制阶段填充像素（背景、边框、文字、阴影等）。合成阶段将多个图层组合，输出到屏幕。',
  },
]

const EXAMPLE_HTML = `<div style="color: red">
  <p>Hello CSS!</p>
  <span style="display: none">
    Hidden
  </span>
</div>`

const EXAMPLE_CSS = `.div {
  color: red;
  font-size: 16px;
}

.p {
  /* 继承 color: red */
  display: block;
}

.span {
  display: none;
  /* 不生成盒子 */
}`

export function ProcessingModelDemo() {
  const [activeStep, setActiveStep] = useState(0)

  const currentStep = STEPS[activeStep]

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">CSS 处理模型可视化</h3>

      {/* Pipeline Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-4">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`relative flex-1 px-3 py-3 rounded-lg border-2 transition-all text-left ${
                  activeStep === step.id
                    ? 'bg-blue-500 text-white border-blue-600 shadow-lg scale-105'
                    : activeStep > step.id
                    ? 'bg-green-50 text-green-800 border-green-300 hover:border-green-400'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeStep === step.id
                        ? 'bg-white text-blue-500'
                        : activeStep > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {activeStep > step.id ? '✓' : step.id + 1}
                  </div>
                  <span className="font-semibold text-xs">{step.title}</span>
                </div>
                <p className="text-[10px] opacity-80 ml-8">{step.subtitle}</p>
              </button>
              {idx < STEPS.length - 1 && (
                <div className="flex-shrink-0 px-2">
                  <div
                    className={`h-0.5 w-4 ${
                      activeStep > step.id ? 'bg-green-400' : 'bg-gray-300'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left: Description */}
        <div>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-500">步骤 {activeStep + 1}</Badge>
              <h4 className="font-bold text-gray-900">{currentStep.title}</h4>
            </div>
            <p className="text-sm text-gray-700 mb-3">{currentStep.description}</p>
            <div className="text-xs text-gray-600 leading-relaxed border-t border-blue-200 pt-3">
              {currentStep.detail}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一步
            </button>
            <button
              onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))}
              disabled={activeStep === STEPS.length - 1}
              className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              下一步 →
            </button>
          </div>
        </div>

        {/* Right: Visual representation */}
        <div>
          <h4 className="text-sm font-semibold mb-3">当前阶段可视化</h4>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[280px]">
            {activeStep === 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-3">HTML 源码:</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs leading-relaxed">
                  <pre>{EXAMPLE_HTML}</pre>
                </div>
                <div className="mt-4 p-3 bg-white rounded border border-gray-200">
                  <p className="text-xs font-semibold mb-2">DOM 树结构:</p>
                  <div className="pl-2 text-xs font-mono space-y-1">
                    <div>└─ div</div>
                    <div className="pl-4">├─ p</div>
                    <div className="pl-8">└─ "Hello CSS!"</div>
                    <div className="pl-4">└─ span</div>
                    <div className="pl-8">└─ "Hidden"</div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <p className="text-xs text-gray-600 mb-3">收集到的样式规则:</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs leading-relaxed">
                  <pre>{EXAMPLE_CSS}</pre>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-xs">
                    ✓ 从 <code className="bg-white px-1 rounded">style</code> 属性收集内联样式
                  </p>
                  <p className="text-xs mt-1">
                    ✓ 从 <code className="bg-white px-1 rounded">&lt;style&gt;</code> 标签收集嵌入样式
                  </p>
                  <p className="text-xs mt-1">
                    ✓ 从外部 <code className="bg-white px-1 rounded">.css</code> 文件收集样式表
                  </p>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <p className="text-xs text-gray-600 mb-3">计算后的属性值:</p>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border-2 border-blue-300">
                    <p className="text-xs font-semibold mb-2">&lt;div&gt; 的计算样式:</p>
                    <div className="text-xs font-mono space-y-1">
                      <div>color: <span className="text-red-600">red</span> (内联样式)</div>
                      <div>font-size: <span className="text-blue-600">16px</span> (默认值)</div>
                      <div>display: <span className="text-blue-600">block</span> (默认值)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border-2 border-green-300">
                    <p className="text-xs font-semibold mb-2">&lt;p&gt; 的计算样式:</p>
                    <div className="text-xs font-mono space-y-1">
                      <div>color: <span className="text-red-600">red</span> (继承自 div)</div>
                      <div>font-size: <span className="text-blue-600">16px</span> (继承自 div)</div>
                      <div>display: <span className="text-blue-600">block</span> (默认值)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border-2 border-orange-300">
                    <p className="text-xs font-semibold mb-2">&lt;span&gt; 的计算样式:</p>
                    <div className="text-xs font-mono space-y-1">
                      <div>display: <span className="text-gray-600">none</span> (内联样式)</div>
                      <div className="text-xs text-gray-500 mt-2">
                        ⚠ display:none → 不会生成盒子
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <p className="text-xs text-gray-600 mb-3">生成的盒模型树:</p>
                <div className="p-4 bg-white rounded border border-gray-200">
                  <div className="space-y-3">
                    <div className="p-3 border-2 border-blue-400 rounded bg-blue-50">
                      <p className="text-xs font-semibold mb-1">
                        Block Box <span className="font-mono text-gray-600">&lt;div&gt;</span>
                      </p>
                      <p className="text-xs text-gray-600">display: block → 生成块级盒子</p>
                    </div>
                    <div className="ml-6 p-3 border-2 border-green-400 rounded bg-green-50">
                      <p className="text-xs font-semibold mb-1">
                        Block Box <span className="font-mono text-gray-600">&lt;p&gt;</span>
                      </p>
                      <p className="text-xs text-gray-600">display: block → 生成块级盒子</p>
                    </div>
                    <div className="ml-6 p-3 border-2 border-dashed border-gray-400 rounded bg-gray-100">
                      <p className="text-xs font-semibold mb-1 text-gray-500">
                        No Box <span className="font-mono">&lt;span&gt;</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        display: none → <strong>不生成盒子</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-amber-50 rounded border border-amber-200 text-xs">
                  💡 只有生成盒子的元素才会参与后续的布局和渲染
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div>
                <p className="text-xs text-gray-600 mb-3">最终渲染结果:</p>
                <div className="border-2 border-green-500 rounded-lg p-4 bg-white">
                  <div style={{ color: 'red', fontSize: '16px' }}>
                    <p style={{ display: 'block', margin: '0 0 8px 0' }}>Hello CSS!</p>
                    <span style={{ display: 'none' }}>Hidden</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-green-600 font-bold">✓</span>
                    <div>
                      <strong>布局:</strong> 计算盒子的位置和尺寸
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-green-600 font-bold">✓</span>
                    <div>
                      <strong>绘制:</strong> 填充背景、边框、文字等像素
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-green-600 font-bold">✓</span>
                    <div>
                      <strong>合成:</strong> 将图层合并输出到屏幕
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200 text-xs">
                    注意: <code className="bg-white px-1 rounded">display:none</code> 的元素
                    不显示在最终页面上
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-purple-50 rounded border border-purple-200">
        <h4 className="text-sm font-semibold mb-2">🔄 完整处理流程</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            从 HTML 源码到屏幕像素，CSS 处理模型经历 5 个主要阶段。每个阶段都是后续阶段的基础，
            最终形成我们看到的网页视觉效果。
          </p>
          <p className="text-xs text-gray-600 mt-2">
            💡 提示: 理解这个流程有助于优化性能（减少重排/重绘）和调试样式问题（定位在哪个阶段出错）
          </p>
        </div>
      </div>
    </div>
  )
}
