'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Specificity {
  a: number; // inline styles
  b: number; // IDs
  c: number; // classes, attributes, pseudo-classes
  d: number; // elements, pseudo-elements
}

function parseSelector(selector: string): Specificity {
  const spec: Specificity = { a: 0, b: 0, c: 0, d: 0 };

  // Handle inline style attribute
  if (selector.includes('style=')) {
    spec.a = 1;
    return spec;
  }

  // Remove strings to avoid false matches
  const cleaned = selector.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '');

  // Count IDs
  spec.b = (cleaned.match(/#[\w-]+/g) || []).length;

  // Count classes, attributes, and pseudo-classes
  spec.c =
    (cleaned.match(/\.[\w-]+/g) || []).length + // classes
    (cleaned.match(/\[[^\]]+\]/g) || []).length + // attributes
    (cleaned.match(/:(?!not|where|is|has)[\w-]+/g) || []).length; // pseudo-classes (excluding structural)

  // Count elements and pseudo-elements
  spec.d =
    (cleaned.match(/(?:^|[\s>+~])(?!not|where|is|has)[a-z][\w-]*/gi) || []).length + // elements
    (cleaned.match(/::[\w-]+/g) || []).length; // pseudo-elements

  return spec;
}

function compareSpecificity(spec1: Specificity, spec2: Specificity): number {
  if (spec1.a !== spec2.a) return spec1.a - spec2.a;
  if (spec1.b !== spec2.b) return spec1.b - spec2.b;
  if (spec1.c !== spec2.c) return spec1.c - spec2.c;
  return spec1.d - spec2.d;
}

function formatSpecificity(spec: Specificity): string {
  return `(${spec.a},${spec.b},${spec.c},${spec.d})`;
}

interface PresetBattle {
  name: string;
  selector1: string;
  selector2: string;
}

const PRESET_BATTLES: PresetBattle[] = [
  { name: 'ID vs 类', selector1: '#id', selector2: '.class.class.class' },
  { name: '后代 vs 类', selector1: 'div p', selector2: '.container' },
  { name: 'style vs ID', selector1: 'style=""', selector2: '#header' },
  { name: '复杂选择器', selector1: 'div.class#id', selector2: '.nav .item:hover' },
  { name: '伪类对决', selector1: 'a:hover', selector2: '.link' },
  { name: '属性选择器', selector1: '[type="text"]', selector2: 'input.field' },
];

export function SpecificityBattle() {
  const [selector1, setSelector1] = useState('#id');
  const [selector2, setSelector2] = useState('.class.class.class');

  const spec1 = parseSelector(selector1);
  const spec2 = parseSelector(selector2);
  const comparison = compareSpecificity(spec1, spec2);

  const applyPreset = (preset: PresetBattle) => {
    setSelector1(preset.selector1);
    setSelector2(preset.selector2);
  };

  const getBarWidth = (spec: Specificity): number => {
    const total = spec.a * 1000 + spec.b * 100 + spec.c * 10 + spec.d;
    const maxTotal = Math.max(
      spec1.a * 1000 + spec1.b * 100 + spec1.c * 10 + spec1.d,
      spec2.a * 1000 + spec2.b * 100 + spec2.c * 10 + spec2.d,
      1
    );
    return (total / maxTotal) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">选择器 A</label>
          <input
            type="text"
            value={selector1}
            onChange={(e) => setSelector1(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="输入 CSS 选择器"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">选择器 B</label>
          <input
            type="text"
            value={selector2}
            onChange={(e) => setSelector2(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="输入 CSS 选择器"
          />
        </div>
      </div>

      {/* Specificity Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`p-4 rounded-lg border-2 transition-colors ${
            comparison > 0
              ? 'border-green-500 bg-green-500/10'
              : comparison < 0
              ? 'border-red-500 bg-red-500/10'
              : 'border-yellow-500 bg-yellow-500/10'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <code className="text-sm font-mono text-foreground truncate">{selector1}</code>
            {comparison > 0 && (
              <Badge className="bg-green-500 text-white">获胜</Badge>
            )}
            {comparison === 0 && (
              <Badge className="bg-yellow-500 text-white">平局</Badge>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{formatSpecificity(spec1)}</div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec1.a}</div>
                <div className="text-muted-foreground">内联</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec1.b}</div>
                <div className="text-muted-foreground">ID</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec1.c}</div>
                <div className="text-muted-foreground">类</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec1.d}</div>
                <div className="text-muted-foreground">元素</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg border-2 transition-colors ${
            comparison < 0
              ? 'border-green-500 bg-green-500/10'
              : comparison > 0
              ? 'border-red-500 bg-red-500/10'
              : 'border-yellow-500 bg-yellow-500/10'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <code className="text-sm font-mono text-foreground truncate">{selector2}</code>
            {comparison < 0 && (
              <Badge className="bg-green-500 text-white">获胜</Badge>
            )}
            {comparison === 0 && (
              <Badge className="bg-yellow-500 text-white">平局</Badge>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{formatSpecificity(spec2)}</div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec2.a}</div>
                <div className="text-muted-foreground">内联</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec2.b}</div>
                <div className="text-muted-foreground">ID</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec2.c}</div>
                <div className="text-muted-foreground">类</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{spec2.d}</div>
                <div className="text-muted-foreground">元素</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">优先级对比</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-muted-foreground w-24 truncate">
              {selector1}
            </code>
            <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  comparison > 0 ? 'bg-green-500' : comparison < 0 ? 'bg-red-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${getBarWidth(spec1)}%` }}
              />
            </div>
            <Badge variant="outline" className="w-20 justify-center">
              {formatSpecificity(spec1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-muted-foreground w-24 truncate">
              {selector2}
            </code>
            <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  comparison < 0 ? 'bg-green-500' : comparison > 0 ? 'bg-red-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${getBarWidth(spec2)}%` }}
              />
            </div>
            <Badge variant="outline" className="w-20 justify-center">
              {formatSpecificity(spec2)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">预设对决</h3>
        <div className="flex flex-wrap gap-2">
          {PRESET_BATTLES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Result Explanation */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">结果说明：</div>
        <div className="text-sm text-foreground">
          {comparison > 0 && `选择器 A 优先级更高 ${formatSpecificity(spec1)} > ${formatSpecificity(spec2)}`}
          {comparison < 0 && `选择器 B 优先级更高 ${formatSpecificity(spec2)} > ${formatSpecificity(spec1)}`}
          {comparison === 0 && `两个选择器优先级相同，后定义的规则将生效`}
        </div>
      </div>
    </div>
  );
}
