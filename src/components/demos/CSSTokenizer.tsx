'use client';

import { useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';

interface Token {
  type: string;
  value: string;
  color: string;
}

const TOKEN_COLORS: Record<string, string> = {
  IDENT: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  HASH: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  STRING: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  NUMBER: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  PERCENTAGE: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DIMENSION: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  FUNCTION: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  ATKEYWORD: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  COLON: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  SEMICOLON: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  LBRACE: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  RBRACE: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  COMMA: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  WHITESPACE: '',
  COMMENT: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500 italic',
  DELIM: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  LPAREN: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  RPAREN: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

/** 简易 CSS tokenizer（基于 CSS2 §4.1.1） */
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    // Whitespace
    const ws = input.slice(i).match(/^[ \t\r\n\f]+/);
    if (ws) {
      tokens.push({ type: 'WHITESPACE', value: ws[0], color: TOKEN_COLORS.WHITESPACE });
      i += ws[0].length;
      continue;
    }

    // Comment
    if (input[i] === '/' && input[i + 1] === '*') {
      const end = input.indexOf('*/', i + 2);
      const val = end >= 0 ? input.slice(i, end + 2) : input.slice(i);
      tokens.push({ type: 'COMMENT', value: val, color: TOKEN_COLORS.COMMENT });
      i += val.length;
      continue;
    }

    // String
    if (input[i] === '"' || input[i] === "'") {
      const quote = input[i];
      let j = i + 1;
      while (j < input.length && input[j] !== quote) {
        if (input[j] === '\\') j++;
        j++;
      }
      const val = input.slice(i, j + 1);
      tokens.push({ type: 'STRING', value: val, color: TOKEN_COLORS.STRING });
      i = j + 1;
      continue;
    }

    // Hash (#xxx)
    if (input[i] === '#') {
      const m = input.slice(i).match(/^#[a-zA-Z0-9_-]+/);
      if (m) {
        tokens.push({ type: 'HASH', value: m[0], color: TOKEN_COLORS.HASH });
        i += m[0].length;
        continue;
      }
    }

    // At-keyword
    if (input[i] === '@') {
      const m = input.slice(i).match(/^@[a-zA-Z_-][a-zA-Z0-9_-]*/);
      if (m) {
        tokens.push({ type: 'ATKEYWORD', value: m[0], color: TOKEN_COLORS.ATKEYWORD });
        i += m[0].length;
        continue;
      }
    }

    // Number / Percentage / Dimension
    const numMatch = input.slice(i).match(/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
    if (numMatch) {
      const numVal = numMatch[0];
      const rest = input.slice(i + numVal.length);
      if (rest[0] === '%') {
        tokens.push({ type: 'PERCENTAGE', value: numVal + '%', color: TOKEN_COLORS.PERCENTAGE });
        i += numVal.length + 1;
      } else {
        const unitMatch = rest.match(/^[a-zA-Z_-][a-zA-Z0-9_-]*/);
        if (unitMatch) {
          tokens.push({ type: 'DIMENSION', value: numVal + unitMatch[0], color: TOKEN_COLORS.DIMENSION });
          i += numVal.length + unitMatch[0].length;
        } else {
          tokens.push({ type: 'NUMBER', value: numVal, color: TOKEN_COLORS.NUMBER });
          i += numVal.length;
        }
      }
      continue;
    }

    // Ident or Function
    const identMatch = input.slice(i).match(/^-?[a-zA-Z_][a-zA-Z0-9_-]*/);
    if (identMatch) {
      const val = identMatch[0];
      if (input[i + val.length] === '(') {
        tokens.push({ type: 'FUNCTION', value: val + '(', color: TOKEN_COLORS.FUNCTION });
        i += val.length + 1;
      } else {
        tokens.push({ type: 'IDENT', value: val, color: TOKEN_COLORS.IDENT });
        i += val.length;
      }
      continue;
    }

    // Punctuation
    const punct: Record<string, string> = {
      ':': 'COLON', ';': 'SEMICOLON', '{': 'LBRACE', '}': 'RBRACE',
      ',': 'COMMA', '(': 'LPAREN', ')': 'RPAREN',
    };
    if (punct[input[i]]) {
      const type = punct[input[i]];
      tokens.push({ type, value: input[i], color: TOKEN_COLORS[type] });
      i++;
      continue;
    }

    // Delim (catch-all)
    tokens.push({ type: 'DELIM', value: input[i], color: TOKEN_COLORS.DELIM });
    i++;
  }

  return tokens;
}

const PREVIEW_HTML = `<div class="preview-root">
  <h1 class="title">Hello CSS</h1>
  <p>This is a <strong>paragraph</strong> with <a href="#">a link</a>.</p>
  <div class="container">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </div>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
  </ul>
  <button class="btn">Button</button>
</div>`;

const DEFAULT_CSS = `.preview-root {
  font-family: system-ui, sans-serif;
  padding: 16px;
}

h1.title {
  color: rgb(59, 130, 246);
  font-size: 1.5em;
  margin: 0 0 0.5em;
}

.container {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.card {
  padding: 12px 16px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 14px;
}

.btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`;

const EXAMPLES = [
  {
    label: '基础样式',
    value: DEFAULT_CSS,
  },
  {
    label: 'Flexbox 布局',
    value: `.preview-root { font-family: system-ui, sans-serif; padding: 16px; }
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.card {
  flex: 1 1 120px;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
}`,
  },
  {
    label: '@media 响应式',
    value: `.preview-root { font-family: system-ui, sans-serif; padding: 16px; }
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.card {
  padding: 12px;
  background: #e0f2fe;
  border-radius: 8px;
  text-align: center;
}
@media (max-width: 400px) {
  .container {
    grid-template-columns: 1fr;
  }
}`,
  },
  {
    label: '动画效果',
    value: `.preview-root { font-family: system-ui, sans-serif; padding: 16px; }
h1.title {
  background: linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #3b82f6);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s ease infinite;
  font-size: 2em;
}
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.btn {
  padding: 10px 24px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}`,
  },
];

/** Split tokens into lines, preserving structure */
function tokensByLine(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const t of tokens) {
    if (t.type === 'WHITESPACE') {
      // Split whitespace on newlines
      const parts = t.value.split('\n');
      if (parts.length === 1) {
        // No newline — keep as inline space
        lines[lines.length - 1].push(t);
      } else {
        // First part: trailing space on current line (ignore)
        // Remaining parts: each creates a new line, with leading space as indent
        for (let i = 1; i < parts.length; i++) {
          lines.push([]);
          if (parts[i].length > 0) {
            lines[lines.length - 1].push({ type: 'WHITESPACE', value: parts[i], color: '' });
          }
        }
      }
    } else {
      lines[lines.length - 1].push(t);
    }
  }
  return lines;
}

/** Inline token text colors (no background, for code-like view) */
const TOKEN_TEXT_COLORS: Record<string, string> = {
  IDENT: 'text-blue-600 dark:text-blue-400',
  HASH: 'text-purple-600 dark:text-purple-400',
  STRING: 'text-green-600 dark:text-green-400',
  NUMBER: 'text-amber-600 dark:text-amber-400',
  PERCENTAGE: 'text-amber-600 dark:text-amber-400',
  DIMENSION: 'text-orange-600 dark:text-orange-400',
  FUNCTION: 'text-cyan-600 dark:text-cyan-400',
  ATKEYWORD: 'text-rose-600 dark:text-rose-400',
  COLON: 'text-gray-500 dark:text-gray-400',
  SEMICOLON: 'text-gray-500 dark:text-gray-400',
  LBRACE: 'text-gray-600 dark:text-gray-300',
  RBRACE: 'text-gray-600 dark:text-gray-300',
  COMMA: 'text-gray-500 dark:text-gray-400',
  COMMENT: 'text-gray-400 dark:text-gray-500 italic',
  DELIM: 'text-gray-500 dark:text-gray-400',
  LPAREN: 'text-gray-500 dark:text-gray-400',
  RPAREN: 'text-gray-500 dark:text-gray-400',
  WHITESPACE: '',
};

/** Tab type for right panel */
type TabId = 'preview' | 'tokens';

export function CSSTokenizer() {
  const [css, setCss] = useState(DEFAULT_CSS);
  const [activeTab, setActiveTab] = useState<TabId>('preview');
  const [hoveredToken, setHoveredToken] = useState<{ type: string; index: number } | null>(null);
  const { theme } = useTheme();

  const tokens = tokenize(css);
  const lines = useMemo(() => tokensByLine(tokens), [tokens]);
  const visibleTokens = tokens.filter((t) => t.type !== 'WHITESPACE');
  const stats = {
    total: visibleTokens.length,
    types: new Set(visibleTokens.map((t) => t.type)).size,
  };

  // Count tokens by type for legend
  const typeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of visibleTokens) {
      map[t.type] = (map[t.type] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [visibleTokens]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCss(value ?? '');
  }, []);

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'preview', label: '实时预览' },
    { id: 'tokens', label: '词法分析', count: stats.total },
  ];

  return (
    <div className="space-y-3">
      {/* Quick examples */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => setCss(ex.value)}
            className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Editor + Preview: side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Monaco Editor */}
        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border-b text-xs text-muted-foreground">
            <span className="font-medium">CSS 源码</span>
            <span className="ml-auto">{stats.total} tokens / {stats.types} 种类型</span>
          </div>
          <Editor
            height="280px"
            defaultLanguage="css"
            value={css}
            onChange={handleEditorChange}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              tabSize: 2,
              padding: { top: 8 },
            }}
          />
        </div>

        {/* Right panel: preview + tokens tabs */}
        <div className="border rounded-md overflow-hidden flex flex-col">
          {/* Tab bar */}
          <div className="flex items-center border-b bg-muted/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 text-[10px] opacity-60">({tab.count})</span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 min-h-0">
            {activeTab === 'preview' ? (
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css.replace(/</g, '\\3c ')}</style></head><body>${PREVIEW_HTML}</body></html>`}
                className="w-full bg-white"
                style={{ height: 280 }}
                sandbox="allow-same-origin"
                title="CSS Preview"
              />
            ) : (
              <div className="flex flex-col" style={{ height: 280 }}>
                {/* Token type legend */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 px-3 pt-2 pb-1.5 border-b text-[10px]">
                  {typeCounts.map(([type, count]) => (
                    <span
                      key={type}
                      className={`font-mono ${TOKEN_TEXT_COLORS[type] || ''} ${
                        hoveredToken?.type === type ? 'font-bold' : ''
                      }`}
                    >
                      {type}
                      <span className="opacity-50 ml-0.5">{count}</span>
                    </span>
                  ))}
                </div>

                {/* Code-like token view */}
                <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-5">
                  {lines.map((lineTokens, lineIdx) => (
                    <div key={lineIdx} className="flex">
                      {/* Line number */}
                      <span className="w-6 flex-shrink-0 text-right mr-3 text-[10px] text-muted-foreground/50 select-none">
                        {lineIdx + 1}
                      </span>
                      {/* Tokens */}
                      <div className="flex flex-wrap">
                        {lineTokens.length === 0 && (
                          <span className="invisible">.</span>
                        )}
                        {lineTokens.map((token, tIdx) => {
                          if (token.type === 'WHITESPACE') {
                            return (
                              <span key={tIdx} className="whitespace-pre">
                                {token.value}
                              </span>
                            );
                          }
                          const isHovered = hoveredToken?.type === token.type && hoveredToken?.index === lineIdx * 1000 + tIdx;
                          const isSameType = hoveredToken?.type === token.type;
                          return (
                            <span
                              key={tIdx}
                              className={`
                                ${TOKEN_TEXT_COLORS[token.type] || ''}
                                ${isSameType ? 'underline decoration-1 underline-offset-2' : ''}
                                ${isHovered ? 'rounded px-0.5 -mx-0.5 bg-primary/10' : ''}
                                cursor-default transition-colors
                              `}
                              onMouseEnter={() => setHoveredToken({ type: token.type, index: lineIdx * 1000 + tIdx })}
                              onMouseLeave={() => setHoveredToken(null)}
                              title={`${token.type}: ${token.value}`}
                            >
                              {token.value}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hovered token info bar */}
                <div className="px-3 py-1 border-t bg-muted/30 text-[10px] text-muted-foreground min-h-[24px] flex items-center gap-2">
                  {hoveredToken ? (
                    <>
                      <Badge variant="outline" className={`text-[9px] py-0 h-4 font-mono ${TOKEN_COLORS[hoveredToken.type] || ''}`}>
                        {hoveredToken.type}
                      </Badge>
                      <span className="opacity-60">鼠标悬停查看 token 类型</span>
                    </>
                  ) : (
                    <span className="opacity-60">将鼠标移到右侧代码上查看每个 token 的类型 — 相同类型会高亮</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
