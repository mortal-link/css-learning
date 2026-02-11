'use client';

import { useState } from 'react';

type ViewMode = 'nested' | 'expanded' | 'split';

export function NestingDemo() {
  const [nestedCSS, setNestedCSS] = useState(`.parent {
  color: red;

  &:hover {
    color: blue;
  }

  .child {
    margin: 10px;
  }
}`);
  const [viewMode, setViewMode] = useState<ViewMode>('split');

  const presets = [
    {
      name: '基础嵌套',
      code: `.parent {
  color: red;

  &:hover {
    color: blue;
  }

  .child {
    margin: 10px;
  }
}`,
    },
    {
      name: '伪类嵌套',
      code: `.button {
  background: blue;

  &:hover {
    background: darkblue;
  }

  &:active {
    background: navy;
  }

  &::before {
    content: "→ ";
  }
}`,
    },
    {
      name: '媒体查询嵌套',
      code: `.container {
  width: 100%;
  padding: 1rem;

  @media (min-width: 768px) {
    width: 750px;
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    width: 960px;
  }
}`,
    },
    {
      name: '深层嵌套',
      code: `.card {
  border: 1px solid #ccc;

  .header {
    background: #f5f5f5;

    .title {
      font-weight: bold;

      &:hover {
        color: blue;
      }
    }
  }
}`,
    },
  ];

  const expandNested = (css: string): string => {
    // Simple expansion logic for demonstration
    const lines = css.split('\n');
    let expanded = '';
    let parentSelectors: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('.') && trimmed.includes('{')) {
        const selector = trimmed.replace('{', '').trim();
        if (selector.startsWith('&')) {
          const pseudo = selector.substring(1);
          expanded += `${parentSelectors.join(' ')}${pseudo} {\n`;
        } else {
          parentSelectors.push(selector);
          expanded += `${parentSelectors.join(' ')} {\n`;
        }
      } else if (trimmed.startsWith('&')) {
        const pseudo = trimmed.substring(1).replace('{', '').trim();
        expanded += `${parentSelectors.join(' ')}${pseudo} {\n`;
      } else if (trimmed.startsWith('@media')) {
        expanded += `${line}\n`;
      } else if (trimmed === '}') {
        expanded += `}\n`;
        if (parentSelectors.length > 0) {
          parentSelectors.pop();
        }
      } else {
        expanded += `${line}\n`;
      }
    });

    return expanded;
  };

  const expandedCSS = expandNested(nestedCSS);

  const highlightNested = (code: string) => {
    return code.split('\n').map((line, i) => {
      const isNested = line.trim().startsWith('&') ||
                      (line.trim().startsWith('.') && i > 0) ||
                      line.trim().startsWith('@media');
      return (
        <div key={i} className={isNested ? 'text-cyan-400' : 'text-gray-100'}>
          {line || ' '}
        </div>
      );
    });
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
              onClick={() => setNestedCSS(preset.code)}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          视图模式
        </label>
        <div className="flex gap-2">
          {(['nested', 'expanded', 'split'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {mode === 'nested' ? '嵌套视图' : mode === 'expanded' ? '展开视图' : '对比视图'}
            </button>
          ))}
        </div>
      </div>

      {/* CSS Input */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          嵌套 CSS 输入
        </label>
        <textarea
          value={nestedCSS}
          onChange={(e) => setNestedCSS(e.target.value)}
          className="w-full h-48 px-3 py-2 border border-border rounded bg-background text-foreground font-mono text-sm"
          placeholder="输入嵌套 CSS..."
        />
      </div>

      {/* CSS Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {viewMode === 'nested' ? '嵌套 CSS' : viewMode === 'expanded' ? '展开后的 CSS' : 'CSS 对比'}
        </label>

        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2">嵌套语法：</div>
              <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono h-64">
                {highlightNested(nestedCSS)}
              </pre>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">展开后：</div>
              <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono h-64">
                {expandedCSS}
              </pre>
            </div>
          </div>
        ) : (
          <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            {viewMode === 'nested' ? highlightNested(nestedCSS) : expandedCSS}
          </pre>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">CSS 嵌套规则</p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">&</code> 符号代表父选择器</li>
          <li>嵌套的选择器会自动与父选择器组合</li>
          <li>支持伪类、伪元素和媒体查询嵌套</li>
          <li>嵌套可以减少重复代码，提高可读性</li>
        </ul>
      </div>
    </div>
  );
}
