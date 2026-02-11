'use client';

import { useState } from 'react';

const PRESETS = [
  { name: '数字开头', input: '1foo', description: 'class="1foo"' },
  { name: '特殊字符@', input: 'my@class', description: 'class="my@class"' },
  { name: '空格', input: 'my class', description: 'class="my class"' },
  { name: '冒号', input: 'col:12', description: 'class="col:12"' },
  { name: '方括号', input: 'data[value]', description: 'class="data[value]"' },
  { name: 'Unicode', input: '测试类名', description: 'class="测试类名"' },
];

function escapeCSS(input: string): string {
  if (!input) return '';

  // Use CSS.escape if available
  if (typeof CSS !== 'undefined' && CSS.escape) {
    return CSS.escape(input);
  }

  // Fallback manual escape
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const code = char.charCodeAt(0);

    // First character is digit
    if (i === 0 && char >= '0' && char <= '9') {
      result += '\\3' + char + ' ';
      continue;
    }

    // Special characters that need escaping
    if ('!"#$%&\'()*+,./:;<=>?@[\\]^`{|}~'.includes(char) || char === ' ') {
      result += '\\' + char;
      continue;
    }

    // Non-ASCII characters (optional escape)
    if (code > 127) {
      result += '\\' + code.toString(16) + ' ';
      continue;
    }

    result += char;
  }

  return result;
}

function generateSelector(input: string, type: 'class' | 'id'): string {
  if (!input) return '';
  const escaped = escapeCSS(input);
  return type === 'class' ? `.${escaped}` : `#${escaped}`;
}

export function CSSEscapeDemo() {
  const [input, setInput] = useState('1foo');
  const [selectorType, setSelectorType] = useState<'class' | 'id'>('class');

  const escapedSelector = generateSelector(input, selectorType);

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded">
        <p className="text-sm text-orange-900 dark:text-orange-200">
          <strong>CSS 转义规则：</strong>
          当类名或 ID 包含特殊字符、数字开头或空格时，必须在 CSS 选择器中进行转义。
          使用 CSS.escape() API 可以自动处理转义。
        </p>
      </div>

      {/* Selector Type Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          选择器类型
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectorType('class')}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              selectorType === 'class'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            .class
          </button>
          <button
            onClick={() => setSelectorType('id')}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
              selectorType === 'id'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            #id
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          输入 {selectorType === 'class' ? '类名' : 'ID'}
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 font-mono text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={`输入${selectorType === 'class' ? '类名' : 'ID'}...`}
        />
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          常见场景
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setInput(preset.input)}
              className="p-3 text-left rounded-lg border border-border bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="text-sm font-semibold text-foreground">
                {preset.name}
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-1">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Original */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            HTML 属性值（原始）
          </div>
          <code className="text-sm font-mono text-foreground font-semibold">
            {selectorType === 'class' ? 'class' : 'id'}="{input || '(空)'}"
          </code>
        </div>

        {/* Escaped */}
        <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
          <div className="text-xs font-semibold text-primary mb-2">
            CSS 选择器（转义后）
          </div>
          <code className="text-lg font-mono text-foreground font-bold break-all">
            {escapedSelector || '(空)'}
          </code>
        </div>

        {/* CSS.escape() output */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-500">
          <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
            CSS.escape() 输出
          </div>
          <code className="text-sm font-mono text-foreground font-semibold break-all">
            {input ? escapeCSS(input) : '(空)'}
          </code>
        </div>
      </div>

      {/* Escape Rules */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          转义规则说明
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">
              数字开头
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              使用 Unicode 码点转义
            </div>
            <div className="text-xs font-mono">
              <span className="text-red-500">1</span>foo →{' '}
              <span className="text-green-600">\31</span> foo
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">
              特殊字符
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              在字符前加反斜杠
            </div>
            <div className="text-xs font-mono">
              my<span className="text-red-500">@</span>class →{' '}
              my<span className="text-green-600">\@</span>class
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">
              空格
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              转义为 \20 或 \\(空格)
            </div>
            <div className="text-xs font-mono">
              my<span className="text-red-500"> </span>class →{' '}
              my<span className="text-green-600">\ </span>class
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="text-xs font-semibold text-foreground mb-1">
              Unicode 字符
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              可选转义（不强制）
            </div>
            <div className="text-xs font-mono">
              <span className="text-red-500">测</span>试 →{' '}
              <span className="text-green-600">\6d4b</span> \8bd5
            </div>
          </div>
        </div>
      </div>

      {/* CSS Example */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          CSS 代码示例
        </div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono text-gray-100">
            <code>{`/* HTML */
<div ${selectorType}="${input || 'example'}">内容</div>

/* CSS */
${escapedSelector || '(空)'} {
  color: red;
  font-weight: bold;
}`}</code>
          </pre>
        </div>
      </div>

      {/* JavaScript Example */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          JavaScript API 使用
        </div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono text-gray-100">
            <code>{`// 使用 CSS.escape() API
const className = "${input || 'example'}";
const selector = "." + CSS.escape(className);
// 结果: ${escapedSelector || '(空)'}

// 然后可以安全地用于 querySelector
document.querySelector(selector);`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
