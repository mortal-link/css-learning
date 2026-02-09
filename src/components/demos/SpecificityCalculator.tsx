'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

// ============================================================
// CSS 选择器特异性计算器
// ============================================================

interface SpecificityResult {
  a: number; // ID selectors
  b: number; // Class, attribute, pseudo-class selectors
  c: number; // Type, pseudo-element selectors
  details: string[];
}

/** 计算 CSS 选择器的特异性 (a, b, c) 三元组 */
function calculateSpecificity(selector: string): SpecificityResult {
  let a = 0;
  let b = 0;
  let c = 0;
  const details: string[] = [];

  // 去除多余空白
  let s = selector.trim();
  if (!s) return { a, b, c, details };

  // 移除 :not() / :is() / :has() / :where() 的外壳，但保留内容
  // :where() 不贡献特异性
  s = s.replace(/:where\(([^)]*)\)/g, ' ');

  // :not() / :is() / :has() 取其参数中最高特异性的选择器
  // 简化处理：将伪类函数内容展开
  s = s.replace(/:(?:not|is|has)\(([^)]*)\)/g, ' $1 ');

  // 移除 ::pseudo-elements 前先计数
  const pseudoElements = s.match(/::[a-zA-Z-]+/g) || [];
  c += pseudoElements.length;
  pseudoElements.forEach((pe) => details.push(`${pe} → type (c)`));
  s = s.replace(/::[a-zA-Z-]+/g, '');

  // 计算 ID 选择器
  const ids = s.match(/#[a-zA-Z_-][\w-]*/g) || [];
  a += ids.length;
  ids.forEach((id) => details.push(`${id} → ID (a)`));
  s = s.replace(/#[a-zA-Z_-][\w-]*/g, '');

  // 计算属性选择器 [...]
  const attrs = s.match(/\[[^\]]+\]/g) || [];
  b += attrs.length;
  attrs.forEach((attr) => details.push(`${attr} → class/attr (b)`));
  s = s.replace(/\[[^\]]+\]/g, '');

  // 计算伪类选择器 :pseudo-class（排除已处理的伪元素和函数型）
  const pseudoClasses = s.match(/:[a-zA-Z-]+(?!\()/g) || [];
  b += pseudoClasses.length;
  pseudoClasses.forEach((pc) => details.push(`${pc} → class (b)`));
  s = s.replace(/:[a-zA-Z-]+/g, '');

  // 计算类选择器 .class
  const classes = s.match(/\.[a-zA-Z_-][\w-]*/g) || [];
  b += classes.length;
  classes.forEach((cls) => details.push(`${cls} → class (b)`));
  s = s.replace(/\.[a-zA-Z_-][\w-]*/g, '');

  // 计算类型选择器（元素名），排除 * 通配符和组合器
  const remaining = s.replace(/[>+~*,]/g, ' ').trim();
  const types = remaining.split(/\s+/).filter((t) => /^[a-zA-Z][\w-]*$/.test(t));
  c += types.length;
  types.forEach((t) => details.push(`${t} → type (c)`));

  return { a, b, c, details };
}

const examples = [
  { selector: '*', label: '通配符' },
  { selector: 'div', label: '类型' },
  { selector: 'div p', label: '后代' },
  { selector: '.card', label: '类' },
  { selector: 'div.card', label: '类型+类' },
  { selector: '#main', label: 'ID' },
  { selector: '#main .card p', label: '混合' },
  { selector: 'a:hover', label: '伪类' },
  { selector: 'p::first-line', label: '伪元素' },
  { selector: 'div > p.highlight:first-child', label: '复杂' },
];

export function SpecificityCalculator() {
  const [input, setInput] = useState('div#main .card > p.highlight:hover');
  const result = calculateSpecificity(input);

  const digitClass = (value: number, type: 'a' | 'b' | 'c') => {
    const colors = {
      a: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 border-red-200 dark:border-red-800',
      b: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      c: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    };
    return `${colors[type]} ${value > 0 ? 'font-bold' : 'opacity-50'}`;
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">输入 CSS 选择器</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例如：div#main .card > p:hover"
          className="w-full px-3 py-2 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Result */}
      <div className="flex items-center justify-center gap-1 py-4">
        <span className="text-sm text-muted-foreground mr-2">特异性：</span>
        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 text-xl font-mono ${digitClass(result.a, 'a')}`}>
          {result.a}
        </span>
        <span className="text-muted-foreground text-lg font-light">,</span>
        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 text-xl font-mono ${digitClass(result.b, 'b')}`}>
          {result.b}
        </span>
        <span className="text-muted-foreground text-lg font-light">,</span>
        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 text-xl font-mono ${digitClass(result.c, 'c')}`}>
          {result.c}
        </span>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-200 dark:bg-red-900" /> a = ID
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-amber-200 dark:bg-amber-900" /> b = Class / Attr / 伪类
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-200 dark:bg-blue-900" /> c = Type / 伪元素
        </span>
      </div>

      {/* Details */}
      {result.details.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs font-medium mb-2 text-muted-foreground">解析明细</p>
          <div className="flex flex-wrap gap-1.5">
            {result.details.map((d, i) => (
              <Badge key={i} variant="outline" className="text-xs font-mono">
                {d}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div>
        <p className="text-xs font-medium mb-2 text-muted-foreground">快速尝试</p>
        <div className="flex flex-wrap gap-1.5">
          {examples.map((ex) => (
            <button
              key={ex.selector}
              onClick={() => setInput(ex.selector)}
              className="px-2 py-1 text-xs rounded-md border bg-background hover:bg-accent transition-colors font-mono"
            >
              {ex.selector}
              <span className="text-muted-foreground ml-1 font-sans">({ex.label})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
