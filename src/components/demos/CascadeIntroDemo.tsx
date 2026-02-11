'use client';

import { useState } from 'react';

type ValueStage = 'declared' | 'cascaded' | 'specified' | 'computed' | 'used' | 'actual';

interface StageInfo {
  id: ValueStage;
  title: string;
  description: string;
  example: string;
}

const STAGES: StageInfo[] = [
  {
    id: 'declared',
    title: '声明值 (Declared Value)',
    description: '所有适用于该元素的样式声明',
    example: 'color: red (author), color: blue (user)',
  },
  {
    id: 'cascaded',
    title: '层叠值 (Cascaded Value)',
    description: '通过层叠规则（优先级、来源、特异性）解决冲突后的值',
    example: 'color: red (author wins)',
  },
  {
    id: 'specified',
    title: '指定值 (Specified Value)',
    description: '层叠值或继承值或初始值',
    example: 'color: red (cascaded) / font-size: 16px (inherited)',
  },
  {
    id: 'computed',
    title: '计算值 (Computed Value)',
    description: '解析相对值（如 em → px），但不进行布局计算',
    example: 'font-size: 16px, width: 50% (未计算)',
  },
  {
    id: 'used',
    title: '使用值 (Used Value)',
    description: '布局后的绝对值（百分比转换为像素）',
    example: 'width: 400px (50% of 800px)',
  },
  {
    id: 'actual',
    title: '实际值 (Actual Value)',
    description: '浏览器调整后的最终值（亚像素、字体可用性）',
    example: 'width: 400px (rounded)',
  },
];

const PROPERTIES = [
  { id: 'color', name: 'color', inherits: true },
  { id: 'font-size', name: 'font-size', inherits: true },
  { id: 'width', name: 'width', inherits: false },
  { id: 'margin', name: 'margin', inherits: false },
];

const PRESETS = [
  { name: '颜色层叠', property: 'color', hasDeclaration: true },
  { name: '字号继承', property: 'font-size', hasDeclaration: false },
  { name: '宽度计算', property: 'width', hasDeclaration: true },
  { name: '无声明', property: 'margin', hasDeclaration: false },
];

export function CascadeIntroDemo() {
  const [selectedProperty, setSelectedProperty] = useState('color');
  const [hasDeclaration, setHasDeclaration] = useState(true);
  const [activeStage, setActiveStage] = useState<ValueStage>('declared');

  const currentProperty = PROPERTIES.find((p) => p.id === selectedProperty);
  const isCascading = hasDeclaration;
  const isInheritable = currentProperty?.inherits ?? false;

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setSelectedProperty(preset.property);
    setHasDeclaration(preset.hasDeclaration);
    setActiveStage('declared');
  };

  const getStageValue = (stage: ValueStage): string => {
    if (selectedProperty === 'color') {
      if (!hasDeclaration) {
        if (stage === 'declared') return '(无声明)';
        if (stage === 'cascaded') return '(无层叠值)';
        if (stage === 'specified') return 'black (继承自父元素)';
        if (stage === 'computed') return 'rgb(0, 0, 0)';
        if (stage === 'used') return 'rgb(0, 0, 0)';
        if (stage === 'actual') return 'rgb(0, 0, 0)';
      }
      if (stage === 'declared') return 'red (author), blue (user)';
      if (stage === 'cascaded') return 'red (author wins)';
      if (stage === 'specified') return 'red';
      if (stage === 'computed') return 'rgb(255, 0, 0)';
      if (stage === 'used') return 'rgb(255, 0, 0)';
      if (stage === 'actual') return 'rgb(255, 0, 0)';
    }

    if (selectedProperty === 'font-size') {
      if (!hasDeclaration) {
        if (stage === 'declared') return '(无声明)';
        if (stage === 'cascaded') return '(无层叠值)';
        if (stage === 'specified') return '16px (继承自父元素)';
        if (stage === 'computed') return '16px';
        if (stage === 'used') return '16px';
        if (stage === 'actual') return '16px';
      }
      if (stage === 'declared') return '1.5em';
      if (stage === 'cascaded') return '1.5em';
      if (stage === 'specified') return '1.5em';
      if (stage === 'computed') return '24px (1.5 × 16px)';
      if (stage === 'used') return '24px';
      if (stage === 'actual') return '24px';
    }

    if (selectedProperty === 'width') {
      if (!hasDeclaration) {
        if (stage === 'declared') return '(无声明)';
        if (stage === 'cascaded') return '(无层叠值)';
        if (stage === 'specified') return 'auto (初始值)';
        if (stage === 'computed') return 'auto';
        if (stage === 'used') return '800px (内容宽度)';
        if (stage === 'actual') return '800px';
      }
      if (stage === 'declared') return '50%';
      if (stage === 'cascaded') return '50%';
      if (stage === 'specified') return '50%';
      if (stage === 'computed') return '50%';
      if (stage === 'used') return '400px (50% of 800px)';
      if (stage === 'actual') return '400px';
    }

    if (selectedProperty === 'margin') {
      if (stage === 'declared') return '(无声明)';
      if (stage === 'cascaded') return '(无层叠值)';
      if (stage === 'specified') return '0 (初始值)';
      if (stage === 'computed') return '0px';
      if (stage === 'used') return '0px';
      if (stage === 'actual') return '0px';
    }

    return '(未知)';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-6 bg-background/50 rounded-lg border border-border">
      {/* Property Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">选择属性</h3>
        <div className="flex flex-wrap gap-2">
          {PROPERTIES.map((prop) => (
            <button
              key={prop.id}
              onClick={() => setSelectedProperty(prop.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedProperty === prop.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {prop.name}
              {prop.inherits && <span className="ml-1 text-xs opacity-75">(继承)</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Declaration Toggle */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">声明状态</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setHasDeclaration(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              hasDeclaration
                ? 'bg-green-600 text-white'
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
          >
            有声明 (层叠路径)
          </button>
          <button
            onClick={() => setHasDeclaration(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !hasDeclaration
                ? 'bg-orange-600 text-white'
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
          >
            无声明 (默认路径)
          </button>
        </div>
      </div>

      {/* Value Processing Pipeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">值处理流程</h3>
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Stages */}
          <div className="space-y-4">
            {STAGES.map((stage, idx) => {
              const isActive = stage.id === activeStage;
              const isPassed = STAGES.findIndex((s) => s.id === activeStage) > idx;
              const value = getStageValue(stage.id);

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`relative w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md'
                      : isPassed
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-400'
                      : 'bg-muted/30 border-border hover:border-foreground/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : isPassed
                          ? 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{stage.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{stage.description}</p>
                      <div className="p-2 bg-background/80 rounded border border-border">
                        <code className="text-xs font-mono text-foreground">{value}</code>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Type Explanation */}
      <div
        className={`p-4 rounded-lg border-2 ${
          isCascading
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
            : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
        }`}
      >
        <h4 className="text-sm font-semibold mb-2">
          {isCascading ? '层叠路径 (Cascading)' : '默认路径 (Defaulting)'}
        </h4>
        <p className="text-xs text-muted-foreground">
          {isCascading
            ? '有声明时，通过层叠规则（优先级、来源、特异性）解决冲突，从声明值 → 层叠值 → 指定值。'
            : isInheritable
            ? '无声明时，可继承属性从父元素继承，直接跳到指定值阶段。'
            : '无声明时，不可继承属性使用初始值 (initial value)，直接跳到指定值阶段。'}
        </p>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">CSS 代码示例</h3>
        <div className="p-4 bg-muted/50 rounded-md border border-border font-mono text-sm">
          <div className="space-y-2">
            <div className="text-muted-foreground">/* 父元素 */</div>
            <div>
              .parent {'{'} color: black; font-size: 16px; width: 800px; {'}'}
            </div>
            <div className="text-muted-foreground mt-3">/* 子元素 */</div>
            <div>
              .child {'{'}
              {hasDeclaration && (
                <>
                  <br />
                  {'  '}
                  <span className="text-foreground font-semibold">
                    {selectedProperty}:{' '}
                    {selectedProperty === 'color'
                      ? 'red'
                      : selectedProperty === 'font-size'
                      ? '1.5em'
                      : selectedProperty === 'width'
                      ? '50%'
                      : '10px'}
                    ;
                  </span>
                </>
              )}
              <br />
              {'  '}
              <span className="text-muted-foreground">
                /* {!hasDeclaration && '无声明，'}最终 {selectedProperty}: {getStageValue('actual')} */
              </span>
              <br />
              {'}'}
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">预设示例</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-4 py-3 rounded-lg border border-border bg-background hover:border-foreground/50 transition-colors text-sm font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 className="text-sm font-semibold mb-2 text-foreground">关键概念</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • <strong>层叠 (Cascading)</strong>: 有多个声明时，通过规则解决冲突
          </li>
          <li>
            • <strong>继承 (Inheritance)</strong>: 无声明时，可继承属性从父元素获取值
          </li>
          <li>
            • <strong>初始值 (Initial)</strong>: 无声明且不可继承时，使用规范定义的默认值
          </li>
          <li>
            • <strong>计算值 (Computed)</strong>: 解析相对单位（em、%），但不依赖布局
          </li>
          <li>
            • <strong>使用值 (Used)</strong>: 布局后的绝对值（百分比转换为像素）
          </li>
        </ul>
      </div>
    </div>
  );
}
