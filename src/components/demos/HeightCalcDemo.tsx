'use client';

import { useState } from 'react';

type Scenario = 'auto' | 'fixed' | 'percentage-fixed' | 'percentage-auto' | 'min-max';

export function HeightCalcDemo() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('auto');
  const [contentAmount, setContentAmount] = useState(3);
  const [parentHeightMode, setParentHeightMode] = useState<'auto' | 'fixed'>('auto');

  const presets = [
    { name: '自动高度', scenario: 'auto' as Scenario, content: 3, parentMode: 'auto' as const },
    { name: '固定高度', scenario: 'fixed' as Scenario, content: 3, parentMode: 'auto' as const },
    { name: '百分比高度', scenario: 'percentage-fixed' as Scenario, content: 3, parentMode: 'fixed' as const },
    { name: 'min/max限制', scenario: 'min-max' as Scenario, content: 5, parentMode: 'auto' as const },
  ];

  const scenarios = {
    auto: {
      name: '自动高度 (auto)',
      description: '高度由内容撑开',
      css: 'height: auto;',
      childHeight: 'auto',
      note: '块级元素默认高度，随内容增长',
    },
    fixed: {
      name: '固定高度',
      description: '指定固定高度值',
      css: 'height: 200px;',
      childHeight: '200px',
      note: '内容溢出时需要处理 overflow',
    },
    'percentage-fixed': {
      name: '百分比高度（有父高度）',
      description: '父元素有明确高度时，百分比才生效',
      css: 'height: 75%;',
      childHeight: '75%',
      note: '父元素: height: 300px → 子元素: 225px',
    },
    'percentage-auto': {
      name: '百分比高度（无父高度）',
      description: '父元素 height: auto 时，百分比失效',
      css: 'height: 75%;',
      childHeight: 'auto',
      note: '父元素 auto → 百分比被忽略 → 回退到 auto',
    },
    'min-max': {
      name: 'min/max 限制',
      description: '高度约束在指定范围内',
      css: 'height: auto;\nmin-height: 150px;\nmax-height: 300px;',
      childHeight: 'auto',
      note: '内容高度被限制在 150px ~ 300px 之间',
    },
  };

  const currentScenario = scenarios[selectedScenario];
  const contentLines = Array.from({ length: contentAmount }, (_, i) => `段落 ${i + 1}: 这是一些示例内容文本。`);

  const getChildStyle = () => {
    const base = {
      padding: '1rem',
      backgroundColor: 'rgb(59, 130, 246)',
      color: 'white',
      borderRadius: '0.5rem',
      overflow: 'auto',
    };

    if (selectedScenario === 'auto') {
      return { ...base, height: 'auto' };
    } else if (selectedScenario === 'fixed') {
      return { ...base, height: '200px' };
    } else if (selectedScenario === 'percentage-fixed') {
      return { ...base, height: '75%' };
    } else if (selectedScenario === 'percentage-auto') {
      return { ...base, height: '75%' }; // Won't work without parent height
    } else if (selectedScenario === 'min-max') {
      return { ...base, height: 'auto', minHeight: '150px', maxHeight: '300px' };
    }
    return base;
  };

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg">
      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          预设样式
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setSelectedScenario(preset.scenario);
                setContentAmount(preset.content);
                setParentHeightMode(preset.parentMode);
              }}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          高度计算场景
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(Object.keys(scenarios) as Scenario[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`px-3 py-2 rounded text-sm transition-colors text-left ${
                selectedScenario === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {scenarios[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Amount Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          内容数量: {contentAmount} 段
        </label>
        <input
          type="range"
          min="1"
          max="8"
          value={contentAmount}
          onChange={(e) => setContentAmount(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Parent Height Mode (for percentage demo) */}
      {(selectedScenario === 'percentage-fixed' || selectedScenario === 'percentage-auto') && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            父容器高度模式
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setParentHeightMode('auto');
                setSelectedScenario('percentage-auto');
              }}
              className={`px-4 py-2 rounded transition-colors ${
                parentHeightMode === 'auto'
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              auto (百分比失效)
            </button>
            <button
              onClick={() => {
                setParentHeightMode('fixed');
                setSelectedScenario('percentage-fixed');
              }}
              className={`px-4 py-2 rounded transition-colors ${
                parentHeightMode === 'fixed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              300px (百分比生效)
            </button>
          </div>
        </div>
      )}

      {/* Scenario Description */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
          {currentScenario.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {currentScenario.description}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {currentScenario.note}
        </p>
      </div>

      {/* Visual Demo */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          高度计算可视化
        </label>
        <div className="border border-border rounded-lg p-6 bg-muted/50">
          {/* Parent Container */}
          <div
            className="border-2 border-dashed border-purple-400 dark:border-purple-600 rounded-lg p-4 relative mx-auto"
            style={{
              height: parentHeightMode === 'fixed' ? '300px' : 'auto',
              maxWidth: '500px',
            }}
          >
            <div className="absolute -top-6 left-0 text-xs text-purple-600 dark:text-purple-400 font-mono">
              父容器: height: {parentHeightMode === 'fixed' ? '300px' : 'auto'}
            </div>

            {/* Child Box */}
            <div style={getChildStyle()}>
              <div className="font-bold mb-2">目标元素</div>
              <div className="text-sm space-y-1">
                {contentLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          生成的 CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`.parent {\n  height: ${parentHeightMode === 'fixed' ? '300px' : 'auto'};\n}\n\n.child {\n  ${currentScenario.css.split('\n').join('\n  ')}\n}`}
        </pre>
      </div>
    </div>
  );
}
