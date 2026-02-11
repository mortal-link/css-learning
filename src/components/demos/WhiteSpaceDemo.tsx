'use client';

import { useState } from 'react';

type WhiteSpaceValue = 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';

const whitespaceLabels: Record<WhiteSpaceValue, string> = {
  'normal': 'normal',
  'nowrap': 'nowrap',
  'pre': 'pre',
  'pre-wrap': 'pre-wrap',
  'pre-line': 'pre-line',
  'break-spaces': 'break-spaces',
};

const whitespaceDescriptions: Record<WhiteSpaceValue, string> = {
  'normal': '合并空格，自动换行',
  'nowrap': '合并空格，不换行',
  'pre': '保留空格和换行，不自动换行',
  'pre-wrap': '保留空格和换行，自动换行',
  'pre-line': '合并空格，保留换行，自动换行',
  'break-spaces': '保留空格（行尾），保留换行，自动换行',
};

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-12 text-right font-mono">
        {value}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-purple-500 dark:accent-purple-400"
      />
      <span className="text-xs w-24 truncate text-muted-foreground">{label}</span>
    </div>
  );
}

export function WhiteSpaceDemo() {
  const [selectedValue, setSelectedValue] = useState<WhiteSpaceValue>('normal');
  const [tabSize, setTabSize] = useState(4);

  // Sample text with multiple spaces, tabs, and newlines
  const sampleText = `这是一段    包含多个空格    的文本。
这是第二行\t包含制表符\t的内容。
The   quick   brown   fox   jumps.

This is a new paragraph after empty line.`;

  const behaviors = [
    { feature: '合并空格', values: { normal: '✓', nowrap: '✓', pre: '✗', 'pre-wrap': '✗', 'pre-line': '✓', 'break-spaces': '✗' } },
    { feature: '保留换行', values: { normal: '✗', nowrap: '✗', pre: '✓', 'pre-wrap': '✓', 'pre-line': '✓', 'break-spaces': '✓' } },
    { feature: '自动换行', values: { normal: '✓', nowrap: '✗', pre: '✗', 'pre-wrap': '✓', 'pre-line': '✓', 'break-spaces': '✓' } },
  ];

  return (
    <div className="space-y-6">
      {/* Value Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">white-space 值</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(Object.keys(whitespaceLabels) as WhiteSpaceValue[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedValue(key)}
              className={`px-3 py-2 text-xs rounded transition-colors text-left ${
                selectedValue === key
                  ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
              }`}
            >
              <div className="font-mono font-bold">{whitespaceLabels[key]}</div>
              <div className="text-[10px] opacity-80 mt-1">{whitespaceDescriptions[key]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Size Control */}
      <div className="space-y-2">
        <label className="text-sm font-medium">tab-size 设置</label>
        <Slider
          label="制表符宽度"
          value={tabSize}
          onChange={setTabSize}
          min={2}
          max={8}
          step={1}
        />
      </div>

      {/* Preview with All Values */}
      <div className="space-y-3">
        <label className="text-sm font-medium">效果对比（同一文本内容）</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(Object.keys(whitespaceLabels) as WhiteSpaceValue[]).map((value) => (
            <div
              key={value}
              className={`rounded-lg border p-3 transition-all ${
                selectedValue === value
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-border bg-muted/20 dark:bg-muted/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <code className="text-xs font-mono font-bold text-primary">{whitespaceLabels[value]}</code>
                {selectedValue === value && (
                  <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded">当前</span>
                )}
              </div>
              <div
                className="text-xs leading-relaxed text-foreground border border-border/50 rounded p-2 bg-background/50 overflow-x-auto"
                style={{
                  whiteSpace: value,
                  tabSize: tabSize,
                  maxWidth: '100%',
                }}
              >
                {sampleText}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavior Comparison Table */}
      <div className="space-y-2">
        <label className="text-sm font-medium">行为对比表</label>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 bg-muted/50 dark:bg-muted/30">特性</th>
                {(Object.keys(whitespaceLabels) as WhiteSpaceValue[]).map((key) => (
                  <th
                    key={key}
                    className={`p-2 text-center font-mono ${
                      selectedValue === key
                        ? 'bg-primary/20 dark:bg-primary/30 text-primary font-bold'
                        : 'bg-muted/30 dark:bg-muted/20'
                    }`}
                  >
                    {whitespaceLabels[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {behaviors.map((row, idx) => (
                <tr key={idx} className="border-b border-border/50">
                  <td className="p-2 bg-muted/20 dark:bg-muted/10 font-medium">{row.feature}</td>
                  {(Object.keys(whitespaceLabels) as WhiteSpaceValue[]).map((key) => (
                    <td
                      key={key}
                      className={`p-2 text-center ${
                        selectedValue === key
                          ? 'bg-primary/10 dark:bg-primary/20'
                          : 'bg-background'
                      }`}
                    >
                      {row.values[key] === '✓' ? (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground">
          {`white-space: ${selectedValue};\ntab-size: ${tabSize};`}
        </pre>
      </div>
    </div>
  );
}
