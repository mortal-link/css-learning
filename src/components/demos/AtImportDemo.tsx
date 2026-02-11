'use client';

import { useState } from 'react';

interface ImportRule {
  id: string;
  syntax: string;
  description: string;
  enabled: boolean;
  valid: boolean;
  position: number;
  condition?: string;
  layer?: string;
}

const INITIAL_IMPORTS: ImportRule[] = [
  {
    id: '1',
    syntax: "@import url('base.css');",
    description: '基础样式（URL 函数语法）',
    enabled: true,
    valid: true,
    position: 1,
  },
  {
    id: '2',
    syntax: "@import 'theme.css';",
    description: '主题样式（字符串语法）',
    enabled: true,
    valid: true,
    position: 2,
  },
  {
    id: '3',
    syntax: "@import url('mobile.css') (max-width: 768px);",
    description: '移动端样式（媒体查询条件）',
    enabled: true,
    valid: true,
    position: 3,
    condition: 'media query',
  },
  {
    id: '4',
    syntax: "@import url('modern.css') supports(display: grid);",
    description: '现代布局样式（supports() 条件）',
    enabled: true,
    valid: true,
    position: 4,
    condition: 'supports',
  },
  {
    id: '5',
    syntax: "@import url('layer.css') layer(components);",
    description: '组件层样式（层叠层导入）',
    enabled: true,
    valid: true,
    position: 5,
    layer: 'components',
  },
];

const PRESETS = [
  { name: '基础导入', scenario: 'basic' },
  { name: '条件导入', scenario: 'conditional' },
  { name: '层叠层导入', scenario: 'layer' },
  { name: '错误位置', scenario: 'invalid' },
];

export function AtImportDemo() {
  const [imports, setImports] = useState<ImportRule[]>(INITIAL_IMPORTS);
  const [hasRulesBefore, setHasRulesBefore] = useState(false);
  const [showTree, setShowTree] = useState(true);

  const toggleImport = (id: string) => {
    setImports((prev) =>
      prev.map((imp) => (imp.id === id ? { ...imp, enabled: !imp.enabled } : imp))
    );
  };

  const applyPreset = (scenario: string) => {
    switch (scenario) {
      case 'basic':
        setImports([INITIAL_IMPORTS[0], INITIAL_IMPORTS[1]]);
        setHasRulesBefore(false);
        break;
      case 'conditional':
        setImports([INITIAL_IMPORTS[2], INITIAL_IMPORTS[3]]);
        setHasRulesBefore(false);
        break;
      case 'layer':
        setImports([INITIAL_IMPORTS[4]]);
        setHasRulesBefore(false);
        break;
      case 'invalid':
        setImports(INITIAL_IMPORTS);
        setHasRulesBefore(true);
        break;
      default:
        setImports(INITIAL_IMPORTS);
        setHasRulesBefore(false);
    }
  };

  const areImportsValid = !hasRulesBefore;
  const enabledImports = imports.filter((imp) => imp.enabled);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-6 bg-background/50 rounded-lg border border-border">
      {/* Position Rule Warning */}
      <div
        className={`p-4 rounded-lg border-2 ${
          areImportsValid
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
            : 'bg-red-50 dark:bg-red-900/20 border-red-500'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{areImportsValid ? '✓' : '✗'}</span>
          <h4 className="font-semibold text-sm">
            {areImportsValid ? '位置规则：正确' : '位置规则：错误'}
          </h4>
        </div>
        <p className="text-xs text-muted-foreground">
          {areImportsValid
            ? '@import 规则必须出现在所有其他 CSS 规则之前（@charset 和 @layer 除外）。'
            : '⚠ @import 规则之前有其他样式规则，这些 @import 将被忽略！'}
        </p>
        <div className="mt-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hasRulesBefore}
              onChange={(e) => setHasRulesBefore(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <span>在 @import 之前添加其他规则（测试无效场景）</span>
          </label>
        </div>
      </div>

      {/* Import Rules List */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">@import 规则列表</h3>
        <div className="space-y-2">
          {imports.map((imp) => (
            <div
              key={imp.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                imp.enabled
                  ? areImportsValid
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-400'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-400'
                  : 'bg-muted/30 border-border opacity-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={imp.enabled}
                  onChange={() => toggleImport(imp.id)}
                  className="mt-1 w-4 h-4 rounded border-border"
                />
                <div className="flex-1 min-w-0">
                  <code className="text-sm font-mono text-foreground block mb-1">
                    {imp.syntax}
                  </code>
                  <p className="text-xs text-muted-foreground mb-2">{imp.description}</p>
                  {imp.condition && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      条件: {imp.condition}
                    </span>
                  )}
                  {imp.layer && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ml-2">
                      层: {imp.layer}
                    </span>
                  )}
                  {imp.enabled && !areImportsValid && (
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                      ⚠ 此规则将被浏览器忽略（位置错误）
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dependency Tree */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">样式表依赖树</h3>
          <button
            onClick={() => setShowTree(!showTree)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showTree ? '隐藏' : '显示'}
          </button>
        </div>
        {showTree && (
          <div className="p-4 bg-muted/50 rounded-lg border border-border font-mono text-sm">
            <div className="space-y-1">
              {hasRulesBefore && (
                <div className="text-red-600 dark:text-red-400 mb-2">
                  /* ⚠ 其他规则在前，@import 被忽略 */
                </div>
              )}
              <div className="text-foreground font-semibold">main.css</div>
              {areImportsValid ? (
                <>
                  {enabledImports.map((imp, idx) => (
                    <div key={imp.id} className="pl-4">
                      <span className="text-muted-foreground">├─</span>{' '}
                      <span className="text-green-600 dark:text-green-400">
                        {imp.syntax.match(/'([^']+)'|"([^"]+)"/)?.[1] || 'stylesheet'}
                      </span>
                      {imp.condition && (
                        <span className="text-blue-600 dark:text-blue-400 ml-2 text-xs">
                          ({imp.condition})
                        </span>
                      )}
                      {imp.layer && (
                        <span className="text-purple-600 dark:text-purple-400 ml-2 text-xs">
                          [layer: {imp.layer}]
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="pl-4 text-muted-foreground">└─ (其他样式规则)</div>
                </>
              ) : (
                <>
                  <div className="pl-4 text-muted-foreground">└─ (其他样式规则)</div>
                  <div className="pl-4 text-red-600 dark:text-red-400 line-through opacity-50">
                    {enabledImports.map((imp) => (
                      <div key={imp.id}>
                        ✗{' '}
                        {imp.syntax.match(/'([^']+)'|"([^"]+)"/)?.[1] || 'stylesheet'} (被忽略)
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS Code Output */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">CSS 代码</h3>
        <div className="p-4 bg-muted/50 rounded-md border border-border font-mono text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">/* main.css */</div>
            {hasRulesBefore && (
              <>
                <div className="text-foreground">
                  body {'{'} margin: 0; {'}'}
                </div>
                <div className="text-muted-foreground my-2">
                  /* ⚠ @import 必须在此规则之前 */
                </div>
              </>
            )}
            {imports.map((imp) => (
              <div
                key={imp.id}
                className={
                  imp.enabled
                    ? areImportsValid
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400 line-through'
                    : 'text-muted-foreground line-through opacity-50'
                }
              >
                {imp.syntax}
              </div>
            ))}
            {!hasRulesBefore && (
              <>
                <div className="text-muted-foreground my-2">/* 其他样式规则 */</div>
                <div className="text-foreground">
                  body {'{'} margin: 0; {'}'}
                </div>
              </>
            )}
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
              onClick={() => applyPreset(preset.scenario)}
              className="px-4 py-3 rounded-lg border border-border bg-background hover:border-foreground/50 transition-colors text-sm font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold mb-2 text-foreground">@import 规则要点</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • <strong>位置规则</strong>: 必须在所有样式规则之前（@charset 和 @layer 除外）
          </li>
          <li>
            • <strong>语法</strong>: url() 函数或字符串
          </li>
          <li>
            • <strong>媒体查询</strong>: @import url() (max-width: 768px);
          </li>
          <li>
            • <strong>特性查询</strong>: @import url() supports(display: grid);
          </li>
          <li>
            • <strong>层叠层</strong>: @import url() layer(layer-name);
          </li>
          <li>
            • <strong>性能</strong>: @import 会阻塞渲染，推荐使用 {'<link>'} 标签
          </li>
        </ul>
      </div>
    </div>
  );
}
