'use client';

import { useState } from 'react';

interface Layer {
  id: string;
  name: string;
  rule: string;
  color: string;
}

export function CascadeLayerOrderDemo() {
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', name: 'base', rule: 'color: blue;', color: 'blue' },
    { id: '2', name: 'theme', rule: 'color: green;', color: 'green' },
    { id: '3', name: 'utilities', rule: 'color: red;', color: 'red' },
  ]);

  const presets = [
    {
      name: '默认顺序',
      layers: [
        { id: '1', name: 'base', rule: 'color: blue;', color: 'blue' },
        { id: '2', name: 'theme', rule: 'color: green;', color: 'green' },
        { id: '3', name: 'utilities', rule: 'color: red;', color: 'red' },
      ],
    },
    {
      name: '反转顺序',
      layers: [
        { id: '3', name: 'utilities', rule: 'color: red;', color: 'red' },
        { id: '2', name: 'theme', rule: 'color: green;', color: 'green' },
        { id: '1', name: 'base', rule: 'color: blue;', color: 'blue' },
      ],
    },
    {
      name: '无层vs有层',
      layers: [
        { id: '1', name: 'base', rule: 'color: blue;', color: 'blue' },
        { id: '2', name: 'theme', rule: 'color: green;', color: 'green' },
        { id: '4', name: 'unlayered', rule: 'color: purple;', color: 'purple' },
      ],
    },
  ];

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

  const winningLayer = layers[layers.length - 1];

  const generateCSS = () => {
    return `@layer ${layers.map((l) => l.name).join(', ')};

${layers.map((layer) => `@layer ${layer.name} {
  .target { ${layer.rule} }
}`).join('\n\n')}`;
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
              onClick={() => setLayers(preset.layers)}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Stack Visualization */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          层叠层顺序（从低到高）
        </label>
        <div className="space-y-2">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className="border border-border rounded-lg p-4 bg-muted/50 flex items-center justify-between"
              style={{ borderLeft: `4px solid ${layer.color}` }}
            >
              <div className="flex-1">
                <div className="font-bold text-foreground">{layer.name}</div>
                <div className="text-sm text-muted-foreground font-mono">{layer.rule}</div>
                <div className="text-xs text-muted-foreground mt-1">优先级: {index + 1}</div>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === layers.length - 1}
                  className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          实时预览
        </label>
        <div className="border border-border rounded-lg p-8 bg-muted/50 text-center">
          <div
            className="inline-block px-8 py-4 text-2xl font-bold rounded-lg"
            style={{
              color: winningLayer.color,
              border: `3px solid ${winningLayer.color}`,
              backgroundColor: `${winningLayer.color}15`,
            }}
          >
            目标元素
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            获胜的层: <span className="font-bold" style={{ color: winningLayer.color }}>{winningLayer.name}</span>
          </div>
        </div>
      </div>

      {/* Priority Explanation */}
      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">优先级顺序</p>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          <div className="font-mono text-xs bg-amber-100 dark:bg-amber-900 p-2 rounded">
            无层样式 &gt; {layers.map((l, i) => `${l.name}${i < layers.length - 1 ? ' > ' : ''}`)}
          </div>
          <p>后声明的层具有更高的优先级。无层样式（unlayered）优先级最高。</p>
        </div>
      </div>

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          生成的 CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {generateCSS()}
        </pre>
      </div>
    </div>
  );
}
