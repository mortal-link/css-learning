'use client';

import { useState } from 'react';

type FunctionType = 'calc' | 'min' | 'max' | 'clamp' | 'var' | 'env' | 'url';

interface FunctionConfig {
  name: string;
  description: string;
  syntax: string;
}

const FUNCTIONS: Record<FunctionType, FunctionConfig> = {
  calc: {
    name: 'calc()',
    description: '执行数学计算，可混合不同单位',
    syntax: 'calc(expression)',
  },
  min: {
    name: 'min()',
    description: '返回一组值中的最小值',
    syntax: 'min(value1, value2, ...)',
  },
  max: {
    name: 'max()',
    description: '返回一组值中的最大值',
    syntax: 'max(value1, value2, ...)',
  },
  clamp: {
    name: 'clamp()',
    description: '将值限制在最小值和最大值之间',
    syntax: 'clamp(min, preferred, max)',
  },
  var: {
    name: 'var()',
    description: '引用 CSS 自定义属性（CSS 变量）',
    syntax: 'var(--custom-property, fallback)',
  },
  env: {
    name: 'env()',
    description: '引用用户代理定义的环境变量',
    syntax: 'env(variable-name)',
  },
  url: {
    name: 'url()',
    description: '引用外部资源（图片、字体等）',
    syntax: 'url(path)',
  },
};

export function CSSFunctionDemo() {
  const [selectedFunction, setSelectedFunction] = useState<FunctionType>('calc');

  // calc() state
  const [calcValue1, setCalcValue1] = useState(100);
  const [calcOperator, setCalcOperator] = useState<'+' | '-' | '*' | '/'>('-');
  const [calcValue2, setCalcValue2] = useState(20);

  // min/max state
  const [minMaxValues, setMinMaxValues] = useState<number[]>([300, 200, 400]);

  // clamp state
  const [clampMin, setClampMin] = useState(200);
  const [clampPreferred, setClampPreferred] = useState(50);
  const [clampMax, setClampMax] = useState(600);
  const [containerWidth, setContainerWidth] = useState(500);

  // var state
  const [customPropValue, setCustomPropValue] = useState('#3b82f6');

  const calculateCalc = () => {
    switch (calcOperator) {
      case '+':
        return calcValue1 + calcValue2;
      case '-':
        return calcValue1 - calcValue2;
      case '*':
        return calcValue1 * calcValue2;
      case '/':
        return calcValue2 !== 0 ? calcValue1 / calcValue2 : 0;
    }
  };

  const calculateMin = () => Math.min(...minMaxValues);
  const calculateMax = () => Math.max(...minMaxValues);

  const calculateClamp = () => {
    const preferred = (containerWidth * clampPreferred) / 100;
    return Math.max(clampMin, Math.min(preferred, clampMax));
  };

  const renderFunctionContent = () => {
    switch (selectedFunction) {
      case 'calc':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 items-center">
              <div>
                <label className="text-xs text-muted-foreground">值 1</label>
                <input
                  type="number"
                  value={calcValue1}
                  onChange={(e) => setCalcValue1(Number(e.target.value))}
                  className="w-full p-2 bg-background border border-border rounded font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">运算符</label>
                <select
                  value={calcOperator}
                  onChange={(e) => setCalcOperator(e.target.value as any)}
                  className="w-full p-2 bg-background border border-border rounded font-mono text-sm"
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">*</option>
                  <option value="/">/</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">值 2</label>
                <input
                  type="number"
                  value={calcValue2}
                  onChange={(e) => setCalcValue2(Number(e.target.value))}
                  className="w-full p-2 bg-background border border-border rounded font-mono text-sm"
                />
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="text-xs text-muted-foreground mb-1">计算结果</div>
              <div className="text-2xl font-mono font-bold text-primary">
                {calculateCalc().toFixed(2)}px
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm">
              width: calc({calcValue1}px {calcOperator} {calcValue2}px);
            </div>
          </div>
        );

      case 'min':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {minMaxValues.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-16">值 {idx + 1}</span>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const newVals = [...minMaxValues];
                      newVals[idx] = Number(e.target.value);
                      setMinMaxValues(newVals);
                    }}
                    className="flex-1 p-2 bg-background border border-border rounded font-mono text-sm"
                  />
                  <span className="text-sm text-muted-foreground">px</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
              <div className="text-xs text-green-700 dark:text-green-300 mb-1">
                最小值（获胜者）
              </div>
              <div className="text-2xl font-mono font-bold text-green-700 dark:text-green-300">
                {calculateMin()}px
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm">
              width: min({minMaxValues.map((v) => `${v}px`).join(', ')});
            </div>
          </div>
        );

      case 'max':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {minMaxValues.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-16">值 {idx + 1}</span>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const newVals = [...minMaxValues];
                      newVals[idx] = Number(e.target.value);
                      setMinMaxValues(newVals);
                    }}
                    className="flex-1 p-2 bg-background border border-border rounded font-mono text-sm"
                  />
                  <span className="text-sm text-muted-foreground">px</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-500">
              <div className="text-xs text-orange-700 dark:text-orange-300 mb-1">
                最大值（获胜者）
              </div>
              <div className="text-2xl font-mono font-bold text-orange-700 dark:text-orange-300">
                {calculateMax()}px
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm">
              width: max({minMaxValues.map((v) => `${v}px`).join(', ')});
            </div>
          </div>
        );

      case 'clamp':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">最小值 (px)</label>
                <input
                  type="number"
                  value={clampMin}
                  onChange={(e) => setClampMin(Number(e.target.value))}
                  className="w-full p-2 bg-background border border-border rounded font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">偏好值 (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={clampPreferred}
                  onChange={(e) => setClampPreferred(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-right text-muted-foreground">{clampPreferred}%</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">最大值 (px)</label>
                <input
                  type="number"
                  value={clampMax}
                  onChange={(e) => setClampMax(Number(e.target.value))}
                  className="w-full p-2 bg-background border border-border rounded font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  容器宽度: {containerWidth}px
                </label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  value={containerWidth}
                  onChange={(e) => setContainerWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-500">
              <div className="text-xs text-purple-700 dark:text-purple-300 mb-1">
                限制后的值
              </div>
              <div className="text-2xl font-mono font-bold text-purple-700 dark:text-purple-300">
                {calculateClamp().toFixed(2)}px
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm">
              width: clamp({clampMin}px, {clampPreferred}%, {clampMax}px);
            </div>
          </div>
        );

      case 'var':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">自定义属性值</label>
              <input
                type="color"
                value={customPropValue}
                onChange={(e) => setCustomPropValue(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded cursor-pointer"
              />
            </div>
            <div
              className="h-24 rounded-lg border-2 border-border flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: customPropValue }}
            >
              使用自定义属性的元素
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm space-y-1">
              <div>:root {'{'}</div>
              <div>  --primary-color: {customPropValue};</div>
              <div>{'}'}</div>
              <div className="mt-2">.element {'{'}</div>
              <div>  background: var(--primary-color);</div>
              <div>{'}'}</div>
            </div>
          </div>
        );

      case 'env':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-500">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                env() 用于访问用户代理定义的环境变量，常用于处理安全区域（safe area insets）
                在有刘海屏的移动设备上。
              </p>
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm space-y-1">
              <div>{'/* 适配 iPhone 刘海屏 */'}</div>
              <div>.header {'{'}</div>
              <div>  padding-top: env(safe-area-inset-top);</div>
              <div>{'}'}</div>
              <div className="mt-2">.footer {'{'}</div>
              <div>  padding-bottom: env(safe-area-inset-bottom);</div>
              <div>{'}'}</div>
            </div>
            <div className="text-xs text-muted-foreground">
              常用环境变量：safe-area-inset-top, safe-area-inset-right,
              safe-area-inset-bottom, safe-area-inset-left
            </div>
          </div>
        );

      case 'url':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-500">
              <p className="text-sm text-green-900 dark:text-green-200">
                url() 函数用于引用外部资源，如图片、字体文件等。路径可以是相对路径或绝对路径。
              </p>
            </div>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm space-y-1">
              <div>{'/* 背景图片 */'}</div>
              <div>.banner {'{'}</div>
              <div>  background-image: url('/images/hero.jpg');</div>
              <div>{'}'}</div>
              <div className="mt-2">{'/* 自定义字体 */'}</div>
              <div>@font-face {'{'}</div>
              <div>  font-family: 'CustomFont';</div>
              <div>  src: url('/fonts/custom.woff2');</div>
              <div>{'}'}</div>
              <div className="mt-2">{'/* CSS 遮罩 */'}</div>
              <div>.icon {'{'}</div>
              <div>  mask-image: url('/icons/star.svg');</div>
              <div>{'}'}</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 rounded">
        <p className="text-sm text-cyan-900 dark:text-cyan-200">
          <strong>CSS 函数：</strong>
          CSS 提供了多种内置函数，用于动态计算值、引用变量、处理资源等。
        </p>
      </div>

      {/* Function Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">选择函数</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.keys(FUNCTIONS) as FunctionType[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedFunction(key)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedFunction === key
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary hover:bg-secondary/80'
              }`}
            >
              <div className="font-mono text-sm font-semibold text-primary">
                {FUNCTIONS[key].name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Function Details */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="text-lg font-semibold text-foreground mb-1">
          {FUNCTIONS[selectedFunction].name}
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {FUNCTIONS[selectedFunction].description}
        </p>
        <code className="text-xs font-mono text-foreground bg-background px-2 py-1 rounded">
          {FUNCTIONS[selectedFunction].syntax}
        </code>
      </div>

      {/* Interactive Content */}
      {renderFunctionContent()}
    </div>
  );
}
