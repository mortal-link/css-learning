'use client';

import { useState } from 'react';

interface SubProperty {
  name: string;
  value: string;
  reset: boolean;
}

const SHORTHAND_PROPERTIES = [
  {
    id: 'margin',
    name: 'margin',
    example: '10px 20px',
    subproperties: [
      { name: 'margin-top', value: '10px', reset: false },
      { name: 'margin-right', value: '20px', reset: false },
      { name: 'margin-bottom', value: '10px', reset: false },
      { name: 'margin-left', value: '20px', reset: false },
    ],
  },
  {
    id: 'padding',
    name: 'padding',
    example: '15px',
    subproperties: [
      { name: 'padding-top', value: '15px', reset: false },
      { name: 'padding-right', value: '15px', reset: false },
      { name: 'padding-bottom', value: '15px', reset: false },
      { name: 'padding-left', value: '15px', reset: false },
    ],
  },
  {
    id: 'background',
    name: 'background',
    example: 'blue',
    subproperties: [
      { name: 'background-color', value: 'blue', reset: false },
      { name: 'background-image', value: 'none', reset: true },
      { name: 'background-position', value: '0% 0%', reset: true },
      { name: 'background-size', value: 'auto', reset: true },
      { name: 'background-repeat', value: 'repeat', reset: true },
      { name: 'background-attachment', value: 'scroll', reset: true },
      { name: 'background-origin', value: 'padding-box', reset: true },
      { name: 'background-clip', value: 'border-box', reset: true },
    ],
  },
  {
    id: 'border',
    name: 'border',
    example: '2px solid red',
    subproperties: [
      { name: 'border-width', value: '2px', reset: false },
      { name: 'border-style', value: 'solid', reset: false },
      { name: 'border-color', value: 'red', reset: false },
      { name: 'border-image', value: 'none', reset: true },
    ],
  },
  {
    id: 'font',
    name: 'font',
    example: '16px Arial',
    subproperties: [
      { name: 'font-size', value: '16px', reset: false },
      { name: 'font-family', value: 'Arial', reset: false },
      { name: 'font-style', value: 'normal', reset: true },
      { name: 'font-variant', value: 'normal', reset: true },
      { name: 'font-weight', value: 'normal', reset: true },
      { name: 'line-height', value: 'normal', reset: true },
    ],
  },
  {
    id: 'animation',
    name: 'animation',
    example: 'slide 1s ease',
    subproperties: [
      { name: 'animation-name', value: 'slide', reset: false },
      { name: 'animation-duration', value: '1s', reset: false },
      { name: 'animation-timing-function', value: 'ease', reset: false },
      { name: 'animation-delay', value: '0s', reset: true },
      { name: 'animation-iteration-count', value: '1', reset: true },
      { name: 'animation-direction', value: 'normal', reset: true },
      { name: 'animation-fill-mode', value: 'none', reset: true },
      { name: 'animation-play-state', value: 'running', reset: true },
    ],
  },
  {
    id: 'all',
    name: 'all',
    example: 'unset',
    subproperties: [
      { name: 'color', value: 'unset', reset: false },
      { name: 'background', value: 'unset', reset: false },
      { name: 'border', value: 'unset', reset: false },
      { name: 'margin', value: 'unset', reset: false },
      { name: '(所有属性...)', value: 'unset', reset: false },
    ],
  },
];

const PRESETS = [
  { name: 'margin展开', shorthand: 'margin' },
  { name: 'background陷阱', shorthand: 'background' },
  { name: 'border重置', shorthand: 'border' },
  { name: 'all属性', shorthand: 'all' },
];

export function ShorthandDemo() {
  const [selectedShorthand, setSelectedShorthand] = useState('background');
  const [customValue, setCustomValue] = useState('');
  const [showTrap, setShowTrap] = useState(false);

  const currentShorthand = SHORTHAND_PROPERTIES.find((p) => p.id === selectedShorthand);

  const applyPreset = (shorthand: string) => {
    setSelectedShorthand(shorthand);
    setCustomValue('');
    setShowTrap(shorthand === 'background');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-6 bg-background/50 rounded-lg border border-border">
      {/* Shorthand Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">选择简写属性</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SHORTHAND_PROPERTIES.map((prop) => (
            <button
              key={prop.id}
              onClick={() => {
                setSelectedShorthand(prop.id);
                setCustomValue('');
                setShowTrap(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedShorthand === prop.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {prop.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shorthand Value Input */}
      {currentShorthand && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">简写属性值</h3>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
            <code className="text-sm font-mono text-foreground">
              <span className="text-blue-600 dark:text-blue-400">{currentShorthand.name}</span>:{' '}
              <input
                type="text"
                value={customValue || currentShorthand.example}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder={currentShorthand.example}
                className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-border min-w-[200px]"
              />
              ;
            </code>
          </div>
        </div>
      )}

      {/* Expanded Sub-properties */}
      {currentShorthand && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">展开为子属性</h3>
          <div className="space-y-2">
            {currentShorthand.subproperties.map((sub, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  sub.reset
                    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400'
                    : 'bg-green-50 dark:bg-green-900/20 border-green-400'
                }`}
              >
                <code className="text-sm font-mono">
                  <span className="text-muted-foreground">{sub.name}</span>:{' '}
                  <span className="text-foreground font-semibold">{sub.value}</span>;
                  {sub.reset && (
                    <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">
                      (重置为初始值)
                    </span>
                  )}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The "Hidden Reset" Trap Demo */}
      {selectedShorthand === 'background' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">⚠ 简写属性陷阱示例</h3>
            <button
              onClick={() => setShowTrap(!showTrap)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showTrap ? '隐藏' : '显示'}
            </button>
          </div>
          {showTrap && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500">
              <h4 className="text-sm font-semibold mb-3 text-foreground">
                常见错误：background 重置 background-image
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-border font-mono">
                  <div className="text-green-600 dark:text-green-400">
                    /* 第一步：设置背景图 */
                  </div>
                  <div>.element {'{'}</div>
                  <div className="pl-4">
                    background-image: url('pattern.png');{' '}
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>{'}'}</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-border font-mono">
                  <div className="text-red-600 dark:text-red-400">
                    /* 第二步：设置背景色 — 陷阱！ */
                  </div>
                  <div>.element {'{'}</div>
                  <div className="pl-4">background: blue; {/* 重置了所有子属性！ */}</div>
                  <div className="pl-4 text-red-600 dark:text-red-400">
                    /* background-image 被重置为 none ✗ */
                  </div>
                  <div>{'}'}</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-border font-mono">
                  <div className="text-green-600 dark:text-green-400">
                    /* 正确做法：使用具体的子属性 */
                  </div>
                  <div>.element {'{'}</div>
                  <div className="pl-4">background-image: url('pattern.png');</div>
                  <div className="pl-4">
                    background-color: blue; <span className="text-green-600">✓</span>
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CSS Code Output */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">CSS 代码</h3>
        <div className="p-4 bg-muted/50 rounded-md border border-border font-mono text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">/* 使用简写属性 */</div>
            <div>.element {'{'}</div>
            <div className="pl-4">
              <span className="text-blue-600 dark:text-blue-400">{currentShorthand?.name}</span>:{' '}
              <span className="text-foreground font-semibold">
                {customValue || currentShorthand?.example}
              </span>
              ;
            </div>
            <div>{'}'}</div>
            <div className="text-muted-foreground mt-4">/* 等价于展开的子属性 */</div>
            <div>.element {'{'}</div>
            {currentShorthand?.subproperties.map((sub, idx) => (
              <div key={idx} className="pl-4">
                <span className="text-muted-foreground">{sub.name}</span>:{' '}
                <span className="text-foreground">{sub.value}</span>;
                {sub.reset && <span className="text-orange-600"> /* 重置 */</span>}
              </div>
            ))}
            <div>{'}'}</div>
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
              onClick={() => applyPreset(preset.shorthand)}
              className="px-4 py-3 rounded-lg border border-border bg-background hover:border-foreground/50 transition-colors text-sm font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 className="text-sm font-semibold mb-2 text-foreground">简写属性关键概念</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • <strong>隐式重置</strong>: 简写属性会重置所有子属性，即使未显式指定
          </li>
          <li>
            • <strong>Reset-only 属性</strong>: 如 border-image 只能通过 border 重置，不能设置
          </li>
          <li>
            • <strong>all 属性</strong>: 特殊简写，重置除 direction 和 unicode-bidi 外的所有属性
          </li>
          <li>
            • <strong>顺序无关</strong>: 大多数简写属性的值顺序灵活（margin 例外）
          </li>
          <li>
            • <strong>最佳实践</strong>: 优先使用具体子属性，避免意外重置已设置的值
          </li>
        </ul>
      </div>
    </div>
  );
}
