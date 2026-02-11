'use client';

import { useState } from 'react';

type KeywordType = 'initial' | 'inherit' | 'unset' | 'revert' | 'revert-layer';
type PropertyType = 'color' | 'border';

interface PropertyConfig {
  name: string;
  inherited: boolean;
  initialValue: string;
  parentValue: string;
}

const PROPERTIES: Record<PropertyType, PropertyConfig> = {
  color: {
    name: 'color',
    inherited: true,
    initialValue: 'black',
    parentValue: 'blue',
  },
  border: {
    name: 'border',
    inherited: false,
    initialValue: 'none',
    parentValue: '2px solid green',
  },
};

const KEYWORDS: Array<{ value: KeywordType; label: string }> = [
  { value: 'initial', label: 'initial' },
  { value: 'inherit', label: 'inherit' },
  { value: 'unset', label: 'unset' },
  { value: 'revert', label: 'revert' },
  { value: 'revert-layer', label: 'revert-layer' },
];

function computeValue(
  keyword: KeywordType,
  property: PropertyConfig
): { specified: string; computed: string; explanation: string } {
  switch (keyword) {
    case 'initial':
      return {
        specified: 'initial',
        computed: property.initialValue,
        explanation: `使用属性的初始值：${property.initialValue}`,
      };
    case 'inherit':
      return {
        specified: 'inherit',
        computed: property.parentValue,
        explanation: `继承父元素的计算值：${property.parentValue}`,
      };
    case 'unset':
      if (property.inherited) {
        return {
          specified: 'unset',
          computed: property.parentValue,
          explanation: `继承属性，等同于 inherit：${property.parentValue}`,
        };
      } else {
        return {
          specified: 'unset',
          computed: property.initialValue,
          explanation: `非继承属性，等同于 initial：${property.initialValue}`,
        };
      }
    case 'revert':
      return {
        specified: 'revert',
        computed: property.inherited ? property.parentValue : property.initialValue,
        explanation: `回退到用户代理样式或继承值`,
      };
    case 'revert-layer':
      return {
        specified: 'revert-layer',
        computed: property.inherited ? property.parentValue : property.initialValue,
        explanation: `回退到上一层级样式`,
      };
  }
}

export function CSSKeywordDemo() {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordType>('initial');
  const [selectedProperty, setSelectedProperty] = useState<PropertyType>('color');

  const property = PROPERTIES[selectedProperty];
  const result = computeValue(selectedKeyword, property);

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
        <p className="text-sm text-purple-900 dark:text-purple-200">
          <strong>CSS 全局关键字：</strong>
          所有 CSS 属性都接受这些全局关键字，它们控制值的继承和重置行为。
        </p>
      </div>

      {/* Property Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          选择属性类型
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProperty('color')}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              selectedProperty === 'color'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            color (继承属性)
          </button>
          <button
            onClick={() => setSelectedProperty('border')}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              selectedProperty === 'border'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            border (非继承属性)
          </button>
        </div>
      </div>

      {/* Keyword Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          选择关键字
        </label>
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedKeyword(value)}
              className={`px-4 py-2 rounded-lg border-2 font-mono text-sm transition-all ${
                selectedKeyword === value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-secondary hover:bg-secondary/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual DOM Structure */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          DOM 结构与样式流
        </div>
        <div className="relative">
          {/* Parent */}
          <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
              父元素 (Parent)
            </div>
            <div className="text-sm font-mono space-y-1">
              <div>
                <span className="text-muted-foreground">{property.name}:</span>{' '}
                <span className="text-foreground font-semibold">{property.parentValue}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
              计算值：{property.parentValue}
            </div>

            {/* Arrow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary">
                <path
                  d="M12 4L12 20M12 20L6 14M12 20L18 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Child */}
            <div className="mt-8 p-4 border-2 border-primary rounded-lg bg-primary/10">
              <div className="text-xs font-semibold text-primary mb-2">
                子元素 (Child)
              </div>
              <div className="text-sm font-mono space-y-1">
                <div>
                  <span className="text-muted-foreground">{property.name}:</span>{' '}
                  <span className="text-foreground font-semibold">{selectedKeyword}</span>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-xs">
                  <span className="text-muted-foreground">指定值：</span>
                  <span className="font-mono font-semibold text-foreground">
                    {result.specified}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">计算值：</span>
                  <span className="font-mono font-semibold text-primary">
                    {result.computed}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="text-xs font-semibold text-foreground mb-2">
          解析过程
        </div>
        <p className="text-sm text-muted-foreground">
          {result.explanation}
        </p>
      </div>

      {/* Reference Table */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          关键字行为对照表
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left border border-border font-semibold">关键字</th>
                <th className="p-2 text-left border border-border font-semibold">继承属性</th>
                <th className="p-2 text-left border border-border font-semibold">非继承属性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">initial</td>
                <td className="p-2 border border-border text-muted-foreground">→ 初始值</td>
                <td className="p-2 border border-border text-muted-foreground">→ 初始值</td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">inherit</td>
                <td className="p-2 border border-border text-muted-foreground">→ 父元素计算值</td>
                <td className="p-2 border border-border text-muted-foreground">→ 父元素计算值</td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">unset</td>
                <td className="p-2 border border-border text-muted-foreground">→ 父元素计算值</td>
                <td className="p-2 border border-border text-muted-foreground">→ 初始值</td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">revert</td>
                <td className="p-2 border border-border text-muted-foreground">→ 用户代理样式</td>
                <td className="p-2 border border-border text-muted-foreground">→ 用户代理样式</td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">revert-layer</td>
                <td className="p-2 border border-border text-muted-foreground">→ 上一层样式</td>
                <td className="p-2 border border-border text-muted-foreground">→ 上一层样式</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          CSS 代码
        </div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono text-gray-100">
            <code>{`.parent {
  ${property.name}: ${property.parentValue};
}

.child {
  ${property.name}: ${selectedKeyword};
  /* 计算值: ${result.computed} */
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
