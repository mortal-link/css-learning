'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Layer {
  id: number;
  name: string;
  rule: string;
  color: string;
}

const INITIAL_LAYERS: Layer[] = [
  { id: 1, name: 'reset', rule: '.btn { color: gray; }', color: 'gray' },
  { id: 2, name: 'base', rule: '.btn { color: blue; }', color: 'blue' },
  { id: 3, name: 'theme', rule: '.btn { color: purple; }', color: 'purple' },
  { id: 4, name: '(未分层)', rule: '.btn { color: red; }', color: 'red' },
];

interface Preset {
  name: string;
  layers: Layer[];
}

const PRESETS: Preset[] = [
  {
    name: '默认顺序',
    layers: [
      { id: 1, name: 'reset', rule: '.btn { color: gray; }', color: 'gray' },
      { id: 2, name: 'base', rule: '.btn { color: blue; }', color: 'blue' },
      { id: 3, name: 'theme', rule: '.btn { color: purple; }', color: 'purple' },
      { id: 4, name: '(未分层)', rule: '.btn { color: red; }', color: 'red' },
    ],
  },
  {
    name: '逆序',
    layers: [
      { id: 1, name: 'theme', rule: '.btn { color: purple; }', color: 'purple' },
      { id: 2, name: 'base', rule: '.btn { color: blue; }', color: 'blue' },
      { id: 3, name: 'reset', rule: '.btn { color: gray; }', color: 'gray' },
      { id: 4, name: '(未分层)', rule: '.btn { color: red; }', color: 'red' },
    ],
  },
  {
    name: '未分层优先',
    layers: [
      { id: 1, name: 'reset', rule: '.btn { color: gray; }', color: 'gray' },
      { id: 2, name: 'base', rule: '.btn { color: blue; }', color: 'blue' },
      { id: 3, name: '(未分层)', rule: '.btn { color: orange; }', color: 'orange' },
    ],
  },
];

function determineWinner(layers: Layer[]): Layer {
  // Unlayered styles always win
  const unlayered = layers.find((l) => l.name === '(未分层)');
  if (unlayered) return unlayered;

  // Otherwise, the last layer wins
  return layers[layers.length - 1];
}

export function CascadeLayerDemo() {
  const [layers, setLayers] = useState<Layer[]>(INITIAL_LAYERS);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLayers = [...layers];
    [newLayers[index - 1], newLayers[index]] = [newLayers[index], newLayers[index - 1]];
    setLayers(newLayers);
  };

  const moveDown = (index: number) => {
    if (index === layers.length - 1) return;
    const newLayers = [...layers];
    [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
    setLayers(newLayers);
  };

  const applyPreset = (preset: Preset) => {
    setLayers(preset.layers);
  };

  const winner = determineWinner(layers);

  return (
    <div className="space-y-6">
      {/* Preview Box */}
      <div className="rounded-lg border-2 border-border overflow-hidden">
        <div
          className="h-40 flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: winner.color }}
        >
          <div className="text-center space-y-2">
            <div
              className="text-4xl font-bold"
              style={{ color: winner.color === 'yellow' ? '#000' : '#fff' }}
            >
              .btn 元素
            </div>
            <Badge className="bg-white/20 text-white">
              当前颜色: {winner.color}
            </Badge>
          </div>
        </div>
      </div>

      {/* Layer Stack */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">层叠层顺序（从低到高）</h3>
          <div className="text-xs text-muted-foreground">层级越高，优先级越高</div>
        </div>
        <div className="space-y-2">
          {layers.map((layer, index) => {
            const isWinner = layer.id === winner.id;
            const isUnlayered = layer.name === '(未分层)';
            return (
              <div
                key={layer.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isWinner
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-border bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-xs bg-secondary hover:bg-secondary/80 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="上移"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === layers.length - 1}
                      className="p-1 text-xs bg-secondary hover:bg-secondary/80 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="下移"
                    >
                      ▼
                    </button>
                  </div>
                  <div
                    className="w-2 h-16 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isUnlayered ? 'default' : 'outline'}
                        className={isUnlayered ? 'bg-orange-500 text-white' : ''}
                      >
                        @layer {layer.name}
                      </Badge>
                      {isWinner && (
                        <Badge className="bg-green-500 text-white">生效</Badge>
                      )}
                    </div>
                    <code className="text-sm font-mono text-foreground">{layer.rule}</code>
                  </div>
                  <div className="text-xs text-muted-foreground w-16 text-right">
                    层级 {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cascade Rules Explanation */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-3">@layer 规则：</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔝</span>
            <span className="font-semibold text-orange-600 dark:text-orange-400">未分层样式</span>
            <span className="text-muted-foreground">— 优先级最高</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">层叠层</span>
            <span className="text-muted-foreground">— 后声明的层优先级更高</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⬇️</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">同层内</span>
            <span className="text-muted-foreground">— 按优先级和源顺序决定</span>
          </div>
        </div>
      </div>

      {/* Winner Explanation */}
      <div className="rounded-lg border border-green-500 bg-green-500/10 p-4">
        <div className="text-xs text-muted-foreground mb-2">当前生效规则：</div>
        <div className="space-y-2">
          <div className="font-mono text-sm text-foreground">
            <span className="text-purple-600 dark:text-purple-400">
              @layer {winner.name}
            </span>
            {' { '}
            {winner.rule}
            {' }'}
          </div>
          <div className="text-xs text-muted-foreground">
            {winner.name === '(未分层)'
              ? '未分层样式优先级最高，覆盖所有 @layer 规则'
              : `因为 ${winner.name} 层在声明顺序中位置最后`}
          </div>
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
        <code className="text-sm font-mono text-foreground space-y-2 block">
          <div className="text-blue-600 dark:text-blue-400">
            @layer {layers.filter((l) => l.name !== '(未分层)').map((l) => l.name).join(', ')};
          </div>
          {layers.map((layer) => (
            <div key={layer.id} className="ml-0">
              {layer.name === '(未分层)' ? (
                <div>{layer.rule}</div>
              ) : (
                <div>
                  <span className="text-purple-600 dark:text-purple-400">@layer {layer.name}</span>
                  {' { '}
                  {layer.rule}
                  {' }'}
                </div>
              )}
            </div>
          ))}
        </code>
      </div>
    </div>
  );
}
