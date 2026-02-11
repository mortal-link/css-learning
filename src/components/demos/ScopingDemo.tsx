'use client';

import { useState } from 'react';

type Preset = {
  name: string;
  scopeRoot: string;
  scopeLimit: string;
};

export function ScopingDemo() {
  const [scopeRoot, setScopeRoot] = useState('.card');
  const [scopeLimit, setScopeLimit] = useState('.header');

  const presets: Preset[] = [
    { name: '组件作用域', scopeRoot: '.card', scopeLimit: '.header' },
    { name: '嵌套限制', scopeRoot: '.container', scopeLimit: '.footer' },
    { name: '无限制', scopeRoot: '.wrapper', scopeLimit: '' },
  ];

  const generateCSS = () => {
    if (scopeLimit) {
      return `@scope (${scopeRoot}) to (${scopeLimit}) {
  .target {
    background: lightblue;
    padding: 1rem;
  }
}`;
    } else {
      return `@scope (${scopeRoot}) {
  .target {
    background: lightblue;
    padding: 1rem;
  }
}`;
    }
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
                setScopeRoot(preset.scopeRoot);
                setScopeLimit(preset.scopeLimit);
              }}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scope Root Input */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          作用域根选择器 (scope root)
        </label>
        <input
          type="text"
          value={scopeRoot}
          onChange={(e) => setScopeRoot(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded bg-background text-foreground font-mono"
          placeholder=".card"
        />
      </div>

      {/* Scope Limit Input */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          作用域限制选择器 (scope limit) - 可选
        </label>
        <input
          type="text"
          value={scopeLimit}
          onChange={(e) => setScopeLimit(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded bg-background text-foreground font-mono"
          placeholder=".header"
        />
      </div>

      {/* DOM Tree Visualization */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          DOM 树可视化
        </label>
        <div className="border border-border rounded-lg p-4 bg-muted/50 font-mono text-sm space-y-2">
          <div className="text-gray-500">body</div>
          <div className="ml-4 p-2 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 rounded">
            <span className="font-bold text-green-700 dark:text-green-300">{scopeRoot}</span>
            <span className="text-green-600 dark:text-green-400 ml-2">← 作用域开始</span>
            <div className="ml-4 mt-2 space-y-2">
              {scopeLimit && (
                <div className="p-2 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded">
                  <span className="font-bold text-red-700 dark:text-red-300">{scopeLimit}</span>
                  <span className="text-red-600 dark:text-red-400 ml-2">← 作用域限制</span>
                  <div className="ml-4 mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
                    .target (超出作用域)
                  </div>
                </div>
              )}
              <div className="p-2 bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 rounded">
                <span className="font-bold text-blue-700 dark:text-blue-300">.target</span>
                <span className="text-blue-600 dark:text-blue-400 ml-2">← 在作用域内</span>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 rounded">
                <span className="font-bold text-blue-700 dark:text-blue-300">.target</span>
                <span className="text-blue-600 dark:text-blue-400 ml-2">← 在作用域内</span>
              </div>
            </div>
          </div>
          <div className="ml-4 p-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
            .target (作用域外)
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-muted-foreground">作用域根</span>
        </div>
        {scopeLimit && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-muted-foreground">作用域限制</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-muted-foreground">在作用域内（样式生效）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-muted-foreground">在作用域外（样式不生效）</span>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">@scope 规则说明</p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li><strong>作用域根 (root)</strong>: 定义样式作用域的起始边界</li>
          <li><strong>作用域限制 (limit)</strong>: 定义样式作用域的结束边界（可选）</li>
          <li>只有在作用域根内部且不在限制范围内的元素会受到样式影响</li>
          <li>适用于组件级样式隔离，避免样式泄漏</li>
        </ul>
      </div>

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          生成的 CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {generateCSS()}
        </pre>
      </div>
    </div>
  );
}
