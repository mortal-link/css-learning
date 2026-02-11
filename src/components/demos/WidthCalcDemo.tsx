'use client';

import { useState } from 'react';

type Scenario = 'block-auto' | 'percentage' | 'content-box' | 'border-box' | 'min-max' | 'shrink-to-fit' | 'flex-basis' | 'grid-fr' | 'intrinsic' | 'calc';

export function WidthCalcDemo() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('block-auto');
  const [parentWidth, setParentWidth] = useState(400);

  const scenarios = [
    {
      id: 'block-auto' as Scenario,
      name: 'Block auto 宽度',
      description: '块级元素默认宽度为 100%（填满父容器）',
      css: 'width: auto;',
      formula: '可用宽度 = 父容器宽度 - margin - border - padding',
      computed: parentWidth,
    },
    {
      id: 'percentage' as Scenario,
      name: '百分比宽度',
      description: '相对于父容器的 content-box 宽度',
      css: 'width: 75%;',
      formula: '实际宽度 = 父容器宽度 × 75%',
      computed: parentWidth * 0.75,
    },
    {
      id: 'content-box' as Scenario,
      name: 'content-box',
      description: 'width 仅包含内容区域（默认）',
      css: 'width: 300px;\nbox-sizing: content-box;\npadding: 20px;\nborder: 10px;',
      formula: '总宽度 = 300 + 20×2 + 10×2 = 360px',
      computed: 360,
    },
    {
      id: 'border-box' as Scenario,
      name: 'border-box',
      description: 'width 包含 padding 和 border',
      css: 'width: 300px;\nbox-sizing: border-box;\npadding: 20px;\nborder: 10px;',
      formula: '总宽度 = 300px\n内容宽度 = 300 - 20×2 - 10×2 = 240px',
      computed: 300,
    },
    {
      id: 'min-max' as Scenario,
      name: 'min-width/max-width',
      description: '宽度约束范围',
      css: 'width: 100%;\nmin-width: 200px;\nmax-width: 400px;',
      formula: `实际宽度 = clamp(200px, ${parentWidth}px, 400px) = ${Math.min(Math.max(200, parentWidth), 400)}px`,
      computed: Math.min(Math.max(200, parentWidth), 400),
    },
    {
      id: 'shrink-to-fit' as Scenario,
      name: 'Shrink-to-fit',
      description: '收缩适配内容（浮动、绝对定位、inline-block）',
      css: 'display: inline-block;\nwidth: auto;',
      formula: 'min(max-content, max(min-content, 可用宽度))',
      computed: 180,
    },
    {
      id: 'flex-basis' as Scenario,
      name: 'Flex basis',
      description: 'Flex 项目的初始主轴尺寸',
      css: 'flex-basis: 200px;\nflex-grow: 1;',
      formula: 'flex-basis + (剩余空间 × flex-grow / 总 grow)',
      computed: 200 + (parentWidth - 600) / 3,
    },
    {
      id: 'grid-fr' as Scenario,
      name: 'Grid fr 单位',
      description: 'Grid 轨道的弹性单位',
      css: 'grid-template-columns: 1fr 2fr;',
      formula: `1fr = ${parentWidth}/3 = ${(parentWidth / 3).toFixed(0)}px`,
      computed: parentWidth / 3,
    },
    {
      id: 'intrinsic' as Scenario,
      name: '内在尺寸',
      description: 'min-content / max-content / fit-content',
      css: 'width: fit-content;',
      formula: 'min(max-content, max(min-content, 可用宽度))',
      computed: 220,
    },
    {
      id: 'calc' as Scenario,
      name: 'calc() 计算',
      description: '动态计算宽度',
      css: 'width: calc(100% - 80px);',
      formula: `${parentWidth} - 80 = ${parentWidth - 80}px`,
      computed: parentWidth - 80,
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenario)!;

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg">
      {/* Scenario Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          宽度计算场景
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`px-3 py-2 rounded text-sm transition-colors text-left ${
                selectedScenario === scenario.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Parent Width Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          父容器宽度: {parentWidth}px
        </label>
        <input
          type="range"
          min="200"
          max="600"
          step="10"
          value={parentWidth}
          onChange={(e) => setParentWidth(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Scenario Description */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
          {currentScenario.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {currentScenario.description}
        </p>
        <div className="bg-blue-100 dark:bg-blue-900 rounded p-3 font-mono text-xs">
          {currentScenario.css}
        </div>
      </div>

      {/* Visual Calculation */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          宽度计算可视化
        </label>
        <div className="border border-border rounded-lg p-6 bg-muted/50">
          {/* Parent Container */}
          <div
            className="border-2 border-dashed border-purple-400 dark:border-purple-600 rounded-lg p-4 relative"
            style={{ width: `${parentWidth}px`, margin: '0 auto' }}
          >
            <div className="absolute -top-6 left-0 text-xs text-purple-600 dark:text-purple-400 font-mono">
              父容器: {parentWidth}px
            </div>

            {/* Child Box */}
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-4 text-white relative"
              style={{
                width: selectedScenario === 'block-auto' ? '100%' :
                       selectedScenario === 'percentage' ? '75%' :
                       `${currentScenario.computed}px`,
                maxWidth: selectedScenario === 'min-max' ? '400px' : 'none',
                minWidth: selectedScenario === 'min-max' ? '200px' : 'auto',
              }}
            >
              <div className="text-center font-bold">目标元素</div>
              <div className="text-center text-sm mt-1">
                计算宽度: {currentScenario.computed.toFixed(1)}px
              </div>

              {/* Dimension Markers */}
              <div className="absolute -bottom-8 left-0 right-0">
                <div className="flex items-center justify-center">
                  <div className="border-t-2 border-blue-500 flex-1"></div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mx-2 font-mono bg-background px-2 rounded">
                    {currentScenario.computed.toFixed(1)}px
                  </div>
                  <div className="border-t-2 border-blue-500 flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
          计算公式
        </p>
        <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
          {currentScenario.formula}
        </pre>
      </div>

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`.child {\n  ${currentScenario.css.split('\n').join('\n  ')}\n}`}
        </pre>
      </div>
    </div>
  );
}
