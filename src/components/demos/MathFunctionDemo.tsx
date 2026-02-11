'use client';

import { useState } from 'react';

interface PresetPattern {
  name: string;
  description: string;
  functions: {
    calc?: string;
    min?: string;
    max?: string;
    clamp?: string;
  };
}

const PRESETS: PresetPattern[] = [
  {
    name: '流式排版',
    description: '字体大小随视口缩放，但有上下限',
    functions: {
      clamp: 'clamp(16px, 2vw, 24px)',
    },
  },
  {
    name: '响应式间距',
    description: '间距自适应，最小保持可读性',
    functions: {
      max: 'max(20px, 5%)',
    },
  },
  {
    name: '固定偏移',
    description: '百分比布局减去固定值',
    functions: {
      calc: 'calc(100% - 40px)',
    },
  },
  {
    name: '容器宽度限制',
    description: '不超过容器的 90% 或 1200px',
    functions: {
      min: 'min(90%, 1200px)',
    },
  },
];

export function MathFunctionDemo() {
  const [containerSize, setContainerSize] = useState(500);
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Calculate function results
  const calcResult = (containerSize - 40);
  const minResult = Math.min(containerSize * 0.9, 1200);
  const maxResult = Math.max(20, containerSize * 0.05);
  const clampResult = Math.max(16, Math.min(containerSize * 0.02, 24));

  const calculateValue = (func: string): number => {
    if (func.startsWith('calc')) {
      const match = func.match(/calc\((\d+)%\s*-\s*(\d+)px\)/);
      if (match) {
        const percent = parseInt(match[1]);
        const offset = parseInt(match[2]);
        return (containerSize * percent) / 100 - offset;
      }
      return calcResult;
    } else if (func.startsWith('min')) {
      const match = func.match(/min\((\d+)%,\s*(\d+)px\)/);
      if (match) {
        const percent = parseInt(match[1]);
        const max = parseInt(match[2]);
        return Math.min((containerSize * percent) / 100, max);
      }
      return minResult;
    } else if (func.startsWith('max')) {
      const match = func.match(/max\((\d+)px,\s*(\d+)%\)/);
      if (match) {
        const min = parseInt(match[1]);
        const percent = parseInt(match[2]);
        return Math.max(min, (containerSize * percent) / 100);
      }
      return maxResult;
    } else if (func.startsWith('clamp')) {
      const match = func.match(/clamp\((\d+)px,\s*(\d+)vw,\s*(\d+)px\)/);
      if (match) {
        const min = parseInt(match[1]);
        const preferred = parseInt(match[2]);
        const max = parseInt(match[3]);
        // Simulate vw (treat container as viewport for demo)
        const vwValue = (containerSize * preferred) / 100;
        return Math.max(min, Math.min(vwValue, max));
      }
      return clampResult;
    }
    return 0;
  };

  const currentPreset = PRESETS[selectedPreset];
  const activeFunctions = Object.entries(currentPreset.functions);

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded">
        <p className="text-sm text-emerald-900 dark:text-emerald-200">
          <strong>CSS 数学函数：</strong>
          calc()、min()、max() 和 clamp() 允许在 CSS 中执行动态计算，
          创建真正响应式和灵活的布局。
        </p>
      </div>

      {/* Container Size Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">容器宽度</label>
          <span className="text-sm font-mono text-primary font-semibold">
            {containerSize}px
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="800"
          value={containerSize}
          onChange={(e) => setContainerSize(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>200px</span>
          <span>800px</span>
        </div>
      </div>

      {/* Preset Patterns */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">响应式模式</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPreset(idx)}
              className={`p-3 text-left rounded-lg border-2 transition-all ${
                selectedPreset === idx
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary hover:bg-secondary/80'
              }`}
            >
              <div className="text-sm font-semibold text-foreground">{preset.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">实时计算结果</div>
        <div className="space-y-3">
          {activeFunctions.map(([funcName, funcValue]) => {
            const result = calculateValue(funcValue);
            const percentage = (result / containerSize) * 100;

            return (
              <div key={funcName} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-primary font-semibold">{funcName}()</span>
                  <span className="text-muted-foreground">{result.toFixed(2)}px</span>
                </div>
                <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 flex items-center justify-end pr-2 transition-all duration-300"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  >
                    <span className="text-xs text-white font-semibold">
                      {result.toFixed(0)}px
                    </span>
                  </div>
                  {/* Container reference line */}
                  <div className="absolute inset-y-0 right-0 w-0.5 bg-border" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  {funcValue}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Functions Comparison */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">四大函数对比</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* calc() */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-500">
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
              calc()
            </div>
            <div className="space-y-2">
              <div className="text-xs text-blue-800 dark:text-blue-300">
                calc(100% - 40px)
              </div>
              <div className="h-6 bg-blue-200 dark:bg-blue-800 rounded">
                <div
                  className="h-full bg-blue-500 rounded transition-all"
                  style={{ width: `${(calcResult / containerSize) * 100}%` }}
                />
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-400 font-mono">
                = {calcResult.toFixed(2)}px
              </div>
            </div>
          </div>

          {/* min() */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-500">
            <div className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">
              min()
            </div>
            <div className="space-y-2">
              <div className="text-xs text-green-800 dark:text-green-300">
                min(90%, 1200px)
              </div>
              <div className="h-6 bg-green-200 dark:bg-green-800 rounded">
                <div
                  className="h-full bg-green-500 rounded transition-all"
                  style={{ width: `${(minResult / containerSize) * 100}%` }}
                />
              </div>
              <div className="text-xs text-green-700 dark:text-green-400 font-mono">
                = {minResult.toFixed(2)}px
              </div>
            </div>
          </div>

          {/* max() */}
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-500">
            <div className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-2">
              max()
            </div>
            <div className="space-y-2">
              <div className="text-xs text-orange-800 dark:text-orange-300">
                max(20px, 5%)
              </div>
              <div className="h-6 bg-orange-200 dark:bg-orange-800 rounded">
                <div
                  className="h-full bg-orange-500 rounded transition-all"
                  style={{ width: `${(maxResult / containerSize) * 100}%` }}
                />
              </div>
              <div className="text-xs text-orange-700 dark:text-orange-400 font-mono">
                = {maxResult.toFixed(2)}px
              </div>
            </div>
          </div>

          {/* clamp() */}
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-500">
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
              clamp()
            </div>
            <div className="space-y-2">
              <div className="text-xs text-purple-800 dark:text-purple-300">
                clamp(16px, 2vw, 24px)
              </div>
              <div className="h-6 bg-purple-200 dark:bg-purple-800 rounded">
                <div
                  className="h-full bg-purple-500 rounded transition-all"
                  style={{ width: `${(clampResult / containerSize) * 100}%` }}
                />
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-400 font-mono">
                = {clampResult.toFixed(2)}px
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">CSS 代码</div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono text-gray-100">
            <code>{`.container {
  width: ${containerSize}px;
}

.element {
  /* ${currentPreset.name} */
${activeFunctions
  .map(([funcName, funcValue]) => `  ${funcName === 'calc' ? 'width' : funcName === 'min' ? 'max-width' : funcName === 'max' ? 'min-width' : 'font-size'}: ${funcValue};`)
  .join('\n')}
  /* 计算结果: ${activeFunctions.map(([, funcValue]) => calculateValue(funcValue).toFixed(2) + 'px').join(', ')} */
}`}</code>
          </pre>
        </div>
      </div>

      {/* Function Reference */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">函数特性对比</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left border border-border font-semibold">函数</th>
                <th className="p-2 text-left border border-border font-semibold">用途</th>
                <th className="p-2 text-left border border-border font-semibold">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">calc()</td>
                <td className="p-2 border border-border text-muted-foreground">
                  混合单位计算
                </td>
                <td className="p-2 border border-border font-mono text-xs">
                  calc(100% - 20px)
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">min()</td>
                <td className="p-2 border border-border text-muted-foreground">
                  取最小值，设置上限
                </td>
                <td className="p-2 border border-border font-mono text-xs">
                  min(90%, 1200px)
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">max()</td>
                <td className="p-2 border border-border text-muted-foreground">
                  取最大值，设置下限
                </td>
                <td className="p-2 border border-border font-mono text-xs">
                  max(20px, 2%)
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono text-primary">clamp()</td>
                <td className="p-2 border border-border text-muted-foreground">
                  限制在范围内
                </td>
                <td className="p-2 border border-border font-mono text-xs">
                  clamp(16px, 2vw, 24px)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-500 rounded-lg">
        <div className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">
          实用技巧
        </div>
        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
          <li>• clamp() = max(MIN, min(VAL, MAX)) 的简写</li>
          <li>• min() 用于限制最大值（如容器宽度）</li>
          <li>• max() 用于限制最小值（如保持可读性）</li>
          <li>• calc() 中运算符两侧必须有空格：calc(100% - 20px) ✓</li>
        </ul>
      </div>
    </div>
  );
}
