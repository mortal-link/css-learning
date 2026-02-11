'use client';

import { useState } from 'react';

interface ParsedRule {
  type: 'valid' | 'invalid';
  text: string;
  error?: string;
}

const PRESETS = [
  {
    name: '缺少分号',
    code: `.box {
  color: red
  background: blue;
  padding: 10px;
}`,
  },
  {
    name: '未知属性',
    code: `.box {
  color: red;
  bakground: blue;
  padding: 10px;
}`,
  },
  {
    name: '未闭合括号',
    code: `.box {
  color: red;
  background: blue;
  padding: 10px;

.other {
  margin: 5px;
}`,
  },
  {
    name: '无效值',
    code: `.box {
  color: redd;
  width: 100pixels;
  display: flexbox;
}`,
  },
];

function parseCSS(code: string): ParsedRule[] {
  const rules: ParsedRule[] = [];
  const lines = code.split('\n');

  let inRule = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    // Check for opening brace
    if (line.includes('{')) {
      braceCount++;
      inRule = true;
      rules.push({ type: 'valid', text: line });
      continue;
    }

    // Check for closing brace
    if (line.includes('}')) {
      braceCount--;
      inRule = false;
      rules.push({ type: 'valid', text: line });
      continue;
    }

    if (inRule) {
      // Check for missing semicolon
      if (!line.endsWith(';') && !line.endsWith('{') && !line.endsWith('}')) {
        rules.push({
          type: 'invalid',
          text: line,
          error: '缺少分号'
        });
        continue;
      }

      // Check for unknown properties
      const propMatch = line.match(/^\s*([a-z-]+)\s*:/i);
      if (propMatch) {
        const prop = propMatch[1];
        const knownProps = ['color', 'background', 'padding', 'margin', 'width', 'height', 'display', 'position', 'font-size', 'border'];
        if (!knownProps.includes(prop)) {
          rules.push({
            type: 'invalid',
            text: line,
            error: '未知属性'
          });
          continue;
        }

        // Check for invalid values
        const valueMatch = line.match(/:\s*(.+?);/);
        if (valueMatch) {
          const value = valueMatch[1];
          if (prop === 'color' && !value.match(/^(red|blue|green|#[0-9a-f]{3,6}|rgb|hsl)/i)) {
            rules.push({
              type: 'invalid',
              text: line,
              error: '无效的颜色值'
            });
            continue;
          }
          if (prop === 'width' && value.includes('pixels')) {
            rules.push({
              type: 'invalid',
              text: line,
              error: '无效的单位（应为 px）'
            });
            continue;
          }
          if (prop === 'display' && value === 'flexbox') {
            rules.push({
              type: 'invalid',
              text: line,
              error: '无效值（应为 flex）'
            });
            continue;
          }
        }
      }

      rules.push({ type: 'valid', text: line });
    } else {
      rules.push({ type: 'valid', text: line });
    }
  }

  // Check for unclosed braces
  if (braceCount > 0) {
    rules.push({
      type: 'invalid',
      text: '/* 规则块未闭合 */',
      error: '缺少 }'
    });
  }

  return rules;
}

export function ParsingErrorDemo() {
  const [cssCode, setCssCode] = useState(PRESETS[0].code);
  const parsedRules = parseCSS(cssCode);

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded">
        <p className="text-sm text-amber-900 dark:text-amber-200">
          <strong>CSS 错误恢复模型：</strong>
          当浏览器遇到无法解析的 CSS 时，它会跳过无效的声明或规则，继续解析后续的有效内容。
          这种容错机制确保部分错误不会导致整个样式表失效。
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => setCssCode(preset.code)}
            className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          输入 CSS 代码
        </label>
        <textarea
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
          className="w-full h-40 p-4 font-mono text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="输入 CSS 代码..."
        />
      </div>

      {/* Parsed Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          浏览器解析结果
        </div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono">
            {parsedRules.map((rule, idx) => (
              <div key={idx} className="leading-relaxed">
                {rule.type === 'valid' ? (
                  <span className="text-green-400">{rule.text}</span>
                ) : (
                  <span className="relative">
                    <span className="text-red-400 line-through">{rule.text}</span>
                    <span className="ml-2 text-xs text-red-300">
                      ← {rule.error}
                    </span>
                  </span>
                )}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* Error Summary */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          错误类型说明
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">缺少分号</div>
            <div className="text-xs text-muted-foreground">
              每个声明必须以分号结尾，否则后续声明会被跳过
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">未知属性</div>
            <div className="text-xs text-muted-foreground">
              浏览器无法识别的属性会被忽略，不影响其他声明
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">未闭合括号</div>
            <div className="text-xs text-muted-foreground">
              缺少闭合括号会导致整个规则块及后续内容被跳过
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">无效值</div>
            <div className="text-xs text-muted-foreground">
              属性值不符合规范时，该声明会被忽略
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
