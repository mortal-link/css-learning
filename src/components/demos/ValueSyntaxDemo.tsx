'use client';

import { useState } from 'react';

interface Multiplier {
  symbol: string;
  name: string;
  description: string;
  pattern: string;
  validExamples: string[];
  invalidExamples: string[];
}

const MULTIPLIERS: Multiplier[] = [
  {
    symbol: '?',
    name: '可选（0 或 1 次）',
    description: '该值可以出现 0 次或 1 次',
    pattern: '<length>?',
    validExamples: ['', '10px', '2em'],
    invalidExamples: ['10px 20px', '10px 20px 30px'],
  },
  {
    symbol: '*',
    name: '零或多次',
    description: '该值可以出现 0 次或多次',
    pattern: '<length>*',
    validExamples: ['', '10px', '10px 20px', '10px 20px 30px'],
    invalidExamples: [],
  },
  {
    symbol: '+',
    name: '一或多次',
    description: '该值必须至少出现 1 次，可以多次',
    pattern: '<length>+',
    validExamples: ['10px', '10px 20px', '10px 20px 30px 40px'],
    invalidExamples: [''],
  },
  {
    symbol: '#',
    name: '逗号分隔',
    description: '该值可以多次出现，用逗号分隔',
    pattern: '<length>#',
    validExamples: ['10px', '10px, 20px', '10px, 20px, 30px'],
    invalidExamples: ['', '10px 20px'],
  },
  {
    symbol: '{A,B}',
    name: '次数范围',
    description: '该值必须出现 A 到 B 次',
    pattern: '<length>{1,4}',
    validExamples: ['10px', '10px 20px', '10px 20px 30px', '10px 20px 30px 40px'],
    invalidExamples: ['', '10px 20px 30px 40px 50px'],
  },
  {
    symbol: '!',
    name: '必需值',
    description: '该值是必需的，不能省略',
    pattern: '<color>!',
    validExamples: ['red', '#ff0000', 'rgb(255, 0, 0)'],
    invalidExamples: [''],
  },
];

export function ValueSyntaxDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = MULTIPLIERS[selectedIndex];

  const checkValidity = (example: string, isValid: boolean) => {
    return (
      <div
        className={`p-3 rounded-md border ${
          isValid
            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
            : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {isValid ? '✓' : '✗'}
          </span>
          <code className="text-sm font-mono">
            {example === '' ? '(空)' : example}
          </code>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>CSS 值定义语法：</strong>
          CSS 规范使用特殊符号（乘法器）来定义属性值可以出现的次数和组合方式。
          理解这些符号有助于正确使用 CSS 属性。
        </p>
      </div>

      {/* Multiplier Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          选择乘法器
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MULTIPLIERS.map((mult, idx) => (
            <button
              key={mult.symbol}
              onClick={() => setSelectedIndex(idx)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedIndex === idx
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary hover:bg-secondary/80'
              }`}
            >
              <div className="text-lg font-mono font-bold text-primary">
                {mult.symbol}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {mult.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Multiplier Details */}
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-mono font-bold text-primary">
              {selected.symbol}
            </span>
            <span className="text-lg font-semibold text-foreground">
              {selected.name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {selected.description}
          </p>
          <div className="p-3 bg-background rounded border border-border">
            <div className="text-xs text-muted-foreground mb-1">语法示例</div>
            <code className="text-sm font-mono text-foreground font-semibold">
              {selected.pattern}
            </code>
          </div>
        </div>

        {/* Valid Examples */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            有效示例
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selected.validExamples.map((example, idx) => (
              <div key={idx}>
                {checkValidity(example, true)}
              </div>
            ))}
          </div>
        </div>

        {/* Invalid Examples */}
        {selected.invalidExamples.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="text-red-600 dark:text-red-400">✗</span>
              无效示例
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selected.invalidExamples.map((example, idx) => (
                <div key={idx}>
                  {checkValidity(example, false)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Real-world Examples */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          实际应用示例
        </div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono text-gray-100">
            <code>{`/* margin 属性：<length>{1,4} */
margin: 10px;                /* 1 个值 */
margin: 10px 20px;           /* 2 个值 */
margin: 10px 20px 30px 40px; /* 4 个值 */

/* background-image 属性：<image># */
background-image: url(a.jpg);
background-image: url(a.jpg), url(b.jpg);
background-image: url(a.jpg), linear-gradient(...);

/* animation-name 属性：<single-animation-name># */
animation-name: fadeIn;
animation-name: fadeIn, slideUp;
animation-name: fadeIn, slideUp, bounce;`}</code>
          </pre>
        </div>
      </div>

      {/* Combination Table */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          乘法器组合
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left font-semibold text-foreground">组合</th>
                <th className="p-2 text-left font-semibold text-foreground">含义</th>
                <th className="p-2 text-left font-semibold text-foreground">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">*</td>
                <td className="p-2 text-muted-foreground">0 或多次，用空格分隔</td>
                <td className="p-2 font-mono text-xs">&lt;length&gt;*</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">+</td>
                <td className="p-2 text-muted-foreground">1 或多次，用空格分隔</td>
                <td className="p-2 font-mono text-xs">&lt;length&gt;+</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">#</td>
                <td className="p-2 text-muted-foreground">1 或多次，用逗号分隔</td>
                <td className="p-2 font-mono text-xs">&lt;length&gt;#</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">#{'{1,4}'}</td>
                <td className="p-2 text-muted-foreground">1 到 4 次，用逗号分隔</td>
                <td className="p-2 font-mono text-xs">&lt;length&gt;#{'{1,4}'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
