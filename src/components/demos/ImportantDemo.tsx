'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface CSSRule {
  id: number;
  selector: string;
  property: string;
  value: string;
  important: boolean;
  specificity: number; // simplified: 1=element, 10=class, 100=id, 1000=inline
}

const INITIAL_RULES: CSSRule[] = [
  { id: 1, selector: '.box', property: 'color', value: 'blue', important: false, specificity: 10 },
  { id: 2, selector: '#box', property: 'color', value: 'green', important: false, specificity: 100 },
  { id: 3, selector: 'div', property: 'color', value: 'gray', important: false, specificity: 1 },
  { id: 4, selector: 'style=""', property: 'color', value: 'purple', important: false, specificity: 1000 },
];

interface Preset {
  name: string;
  rules: CSSRule[];
}

const PRESETS: Preset[] = [
  {
    name: '正常层叠',
    rules: [
      { id: 1, selector: '.box', property: 'color', value: 'blue', important: false, specificity: 10 },
      { id: 2, selector: '#box', property: 'color', value: 'green', important: false, specificity: 100 },
      { id: 3, selector: 'div', property: 'color', value: 'gray', important: false, specificity: 1 },
      { id: 4, selector: 'style=""', property: 'color', value: 'purple', important: false, specificity: 1000 },
    ],
  },
  {
    name: '!important 覆盖',
    rules: [
      { id: 1, selector: '.box', property: 'color', value: 'red', important: true, specificity: 10 },
      { id: 2, selector: '#box', property: 'color', value: 'green', important: false, specificity: 100 },
      { id: 3, selector: 'style=""', property: 'color', value: 'purple', important: false, specificity: 1000 },
    ],
  },
  {
    name: '!important 对决',
    rules: [
      { id: 1, selector: 'div', property: 'color', value: 'orange', important: true, specificity: 1 },
      { id: 2, selector: '.box', property: 'color', value: 'red', important: true, specificity: 10 },
      { id: 3, selector: '#box', property: 'color', value: 'blue', important: true, specificity: 100 },
    ],
  },
];

function determineWinner(rules: CSSRule[]): CSSRule {
  // First, separate important and normal rules
  const importantRules = rules.filter((r) => r.important);
  const normalRules = rules.filter((r) => !r.important);

  // If there are important rules, find the one with highest specificity
  if (importantRules.length > 0) {
    return importantRules.reduce((prev, current) =>
      current.specificity > prev.specificity ? current : prev
    );
  }

  // Otherwise, find the normal rule with highest specificity
  return normalRules.reduce((prev, current) =>
    current.specificity > prev.specificity ? current : prev
  );
}

export function ImportantDemo() {
  const [rules, setRules] = useState<CSSRule[]>(INITIAL_RULES);

  const toggleImportant = (id: number) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, important: !rule.important } : rule))
    );
  };

  const applyPreset = (preset: Preset) => {
    setRules(preset.rules);
  };

  const winner = determineWinner(rules);

  const getSpecificityLabel = (spec: number): string => {
    if (spec === 1000) return '(1,0,0,0)';
    if (spec === 100) return '(0,1,0,0)';
    if (spec === 10) return '(0,0,1,0)';
    if (spec === 1) return '(0,0,0,1)';
    return '(0,0,0,0)';
  };

  return (
    <div className="space-y-6">
      {/* Preview Box */}
      <div className="rounded-lg border-2 border-border overflow-hidden">
        <div
          className="h-40 flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: winner.value }}
        >
          <div className="text-center space-y-2">
            <div
              className="text-4xl font-bold"
              style={{ color: winner.value === 'yellow' ? '#000' : '#fff' }}
            >
              示例盒子
            </div>
            <Badge className="bg-white/20 text-white">
              当前颜色: {winner.value}
            </Badge>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">CSS 规则列表</h3>
        <div className="space-y-2">
          {rules.map((rule) => {
            const isWinner = rule.id === winner.id;
            return (
              <div
                key={rule.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isWinner
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-border bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 font-mono text-sm">
                    <span className="text-purple-600 dark:text-purple-400">{rule.selector}</span>
                    {' { '}
                    <span className="text-blue-600 dark:text-blue-400">{rule.property}</span>
                    {': '}
                    <span className="text-foreground font-semibold">{rule.value}</span>
                    {rule.important && (
                      <span className="text-red-600 dark:text-red-400"> !important</span>
                    )}
                    {' }'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {getSpecificityLabel(rule.specificity)}
                    </Badge>
                    <button
                      onClick={() => toggleImportant(rule.id)}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        rule.important
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {rule.important ? '!important' : '普通'}
                    </button>
                    {isWinner && (
                      <Badge className="bg-green-500 text-white">生效</Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cascade Order Explanation */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-3">层叠顺序（从高到低）：</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">1️⃣</span>
            <span className="font-semibold text-red-600 dark:text-red-400">!important</span>
            <span className="text-muted-foreground">— 最高优先级</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">2️⃣</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">优先级</span>
            <span className="text-muted-foreground">— 内联 &gt; ID &gt; 类 &gt; 元素</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">3️⃣</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">源顺序</span>
            <span className="text-muted-foreground">— 后定义的规则覆盖先定义的</span>
          </div>
        </div>
      </div>

      {/* Winner Explanation */}
      <div className="rounded-lg border border-green-500 bg-green-500/10 p-4">
        <div className="text-xs text-muted-foreground mb-2">当前生效规则：</div>
        <div className="font-mono text-sm text-foreground">
          <span className="text-purple-600 dark:text-purple-400">{winner.selector}</span>
          {' { '}
          <span className="text-blue-600 dark:text-blue-400">{winner.property}</span>
          {': '}
          <span className="font-semibold">{winner.value}</span>
          {winner.important && (
            <span className="text-red-600 dark:text-red-400"> !important</span>
          )}
          {' }'}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {winner.important
            ? `因为使用了 !important，且优先级为 ${getSpecificityLabel(winner.specificity)}`
            : `因为优先级最高 ${getSpecificityLabel(winner.specificity)}`}
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">预设场景</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
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

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">CSS 代码：</div>
        <code className="text-sm font-mono text-foreground space-y-1 block">
          {rules.map((rule) => (
            <div key={rule.id}>
              <span className="text-purple-600 dark:text-purple-400">{rule.selector}</span>
              {' { '}
              <span className="text-blue-600 dark:text-blue-400">{rule.property}</span>
              {': '}
              <span>{rule.value}</span>
              {rule.important && <span className="text-red-600 dark:text-red-400"> !important</span>}
              {'; }'}
            </div>
          ))}
        </code>
      </div>
    </div>
  );
}
