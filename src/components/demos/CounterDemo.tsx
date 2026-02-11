'use client';

import { useState } from 'react';

export function CounterDemo() {
  const [resetValue, setResetValue] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const [numberingStyle, setNumberingStyle] = useState<'decimal' | 'upper-alpha' | 'upper-roman' | 'lower-alpha'>('decimal');
  const [nestingDepth, setNestingDepth] = useState(1);
  const [separator, setSeparator] = useState('.');

  const level1Items = ['概述', '基础', '进阶', '实践'];
  const level2Items = ['定义', '语法', '示例'];
  const level3Items = ['要点一', '要点二'];

  const presets = [
    { name: '简单编号', depth: 1, style: 'decimal' as const, increment: 1, reset: 0, sep: '.' },
    { name: '大纲编号', depth: 3, style: 'decimal' as const, increment: 1, reset: 0, sep: '.' },
    { name: '罗马编号', depth: 1, style: 'upper-roman' as const, increment: 1, reset: 0, sep: '.' },
    { name: '字母编号', depth: 2, style: 'upper-alpha' as const, increment: 1, reset: 0, sep: '.' },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setNestingDepth(preset.depth);
    setNumberingStyle(preset.style);
    setIncrementValue(preset.increment);
    setResetValue(preset.reset);
    setSeparator(preset.sep);
  };

  const generateStyles = () => {
    if (nestingDepth === 1) {
      return `
.cd-list {
  counter-reset: cd-counter ${resetValue};
  list-style: none;
}
.cd-list > li {
  counter-increment: cd-counter ${incrementValue};
}
.cd-list > li::before {
  content: counter(cd-counter, ${numberingStyle}) ". ";
  font-weight: bold;
  color: rgb(59, 130, 246);
  margin-right: 0.5rem;
}
@media (prefers-color-scheme: dark) {
  .cd-list > li::before {
    color: rgb(96, 165, 250);
  }
}`;
    } else if (nestingDepth === 2) {
      const level2Style = numberingStyle === 'upper-alpha' ? 'lower-alpha' : numberingStyle;
      return `
.cd-list {
  counter-reset: cd-counter ${resetValue};
  list-style: none;
}
.cd-list > li {
  counter-increment: cd-counter ${incrementValue};
}
.cd-list > li::before {
  content: counters(cd-counter, "${separator}", ${numberingStyle}) ". ";
  font-weight: bold;
  color: rgb(59, 130, 246);
  margin-right: 0.5rem;
}
.cd-list .cd-list-nested {
  counter-reset: cd-counter-nested 0;
  list-style: none;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}
.cd-list-nested > li {
  counter-increment: cd-counter-nested 1;
}
.cd-list-nested > li::before {
  content: counter(cd-counter, ${numberingStyle}) "${separator}" counter(cd-counter-nested, ${level2Style}) ". ";
  font-weight: 600;
  color: rgb(59, 130, 246);
  margin-right: 0.5rem;
}
@media (prefers-color-scheme: dark) {
  .cd-list > li::before,
  .cd-list-nested > li::before {
    color: rgb(96, 165, 250);
  }
}`;
    } else {
      const level2Style = numberingStyle === 'upper-alpha' ? 'lower-alpha' : numberingStyle;
      const level3Style = 'decimal';
      return `
.cd-list {
  counter-reset: cd-counter ${resetValue};
  list-style: none;
}
.cd-list > li {
  counter-increment: cd-counter ${incrementValue};
}
.cd-list > li::before {
  content: counters(cd-counter, "${separator}", ${numberingStyle}) ". ";
  font-weight: bold;
  color: rgb(59, 130, 246);
  margin-right: 0.5rem;
}
.cd-list .cd-list-nested {
  counter-reset: cd-counter-nested 0;
  list-style: none;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}
.cd-list-nested > li {
  counter-increment: cd-counter-nested 1;
}
.cd-list-nested > li::before {
  content: counter(cd-counter, ${numberingStyle}) "${separator}" counter(cd-counter-nested, ${level2Style}) ". ";
  font-weight: 600;
  color: rgb(59, 130, 246);
  margin-right: 0.5rem;
}
.cd-list-nested .cd-list-nested-3 {
  counter-reset: cd-counter-nested-3 0;
  list-style: none;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}
.cd-list-nested-3 > li {
  counter-increment: cd-counter-nested-3 1;
}
.cd-list-nested-3 > li::before {
  content: counter(cd-counter, ${numberingStyle}) "${separator}" counter(cd-counter-nested, ${level2Style}) "${separator}" counter(cd-counter-nested-3, ${level3Style}) ". ";
  font-weight: 500;
  color: rgb(59, 130, 246);
  margin-right: 0.5rem;
}
@media (prefers-color-scheme: dark) {
  .cd-list > li::before,
  .cd-list-nested > li::before,
  .cd-list-nested-3 > li::before {
    color: rgb(96, 165, 250);
  }
}`;
    }
  };

  const styleContent = generateStyles();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
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
                onClick={() => applyPreset(preset)}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Reset */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            counter-reset 起始值: {resetValue}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={resetValue}
            onChange={(e) => setResetValue(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Counter Increment */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            counter-increment 增量: {incrementValue}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={incrementValue}
            onChange={(e) => setIncrementValue(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Numbering Style */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            编号样式
          </label>
          <div className="flex flex-wrap gap-2">
            {(['decimal', 'upper-alpha', 'upper-roman', 'lower-alpha'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setNumberingStyle(style)}
                className={`px-4 py-2 rounded transition-colors ${
                  numberingStyle === style
                    ? 'bg-blue-500 text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {style === 'decimal' && '数字 (1, 2, 3)'}
                {style === 'upper-alpha' && '大写字母 (A, B, C)'}
                {style === 'upper-roman' && '大写罗马 (I, II, III)'}
                {style === 'lower-alpha' && '小写字母 (a, b, c)'}
              </button>
            ))}
          </div>
        </div>

        {/* Nesting Depth */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            嵌套层级
          </label>
          <div className="flex gap-2">
            {[1, 2, 3].map((depth) => (
              <button
                key={depth}
                onClick={() => setNestingDepth(depth)}
                className={`px-4 py-2 rounded transition-colors ${
                  nestingDepth === depth
                    ? 'bg-blue-500 text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {depth} 级
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        {nestingDepth > 1 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              嵌套分隔符
            </label>
            <input
              type="text"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              maxLength={3}
              className="px-3 py-2 border border-border rounded bg-background text-foreground"
            />
          </div>
        )}

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            实时预览
          </label>
          <div className="border border-border rounded-lg p-6 bg-muted/50">
            <ul className="cd-list">
              {level1Items.map((item, i) => (
                <li key={i} className="mb-3 text-foreground">
                  {item}
                  {nestingDepth >= 2 && (
                    <ul className="cd-list-nested">
                      {level2Items.map((subItem, j) => (
                        <li key={j} className="mb-2 text-foreground">
                          {subItem}
                          {nestingDepth >= 3 && (
                            <ul className="cd-list-nested-3">
                              {level3Items.map((subSubItem, k) => (
                                <li key={k} className="mb-1 text-muted-foreground">
                                  {subSubItem}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CSS Code Output */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            生成的 CSS 代码
          </label>
          <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {styleContent}
          </pre>
        </div>
      </div>
    </>
  );
}
