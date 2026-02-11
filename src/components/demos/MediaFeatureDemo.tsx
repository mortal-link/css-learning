'use client';

import { useState, useEffect } from 'react';

interface MediaFeature {
  name: string;
  label: string;
  category: string;
  value: string;
  query: string;
}

export function MediaFeatureDemo() {
  const [features, setFeatures] = useState<MediaFeature[]>([]);
  const [simulatedWidth, setSimulatedWidth] = useState(1024);
  const [simulatedColorScheme, setSimulatedColorScheme] = useState<'light' | 'dark'>('light');
  const [simulatedMotion, setSimulatedMotion] = useState<'no-preference' | 'reduce'>('no-preference');

  useEffect(() => {
    const detectFeatures = () => {
      const w = window;
      const detected: MediaFeature[] = [
        // Viewport
        {
          name: 'width',
          label: '视口宽度',
          category: 'viewport',
          value: `${simulatedWidth}px`,
          query: `(width: ${simulatedWidth}px)`,
        },
        {
          name: 'height',
          label: '视口高度',
          category: 'viewport',
          value: `${w.innerHeight}px`,
          query: `(height: ${w.innerHeight}px)`,
        },
        {
          name: 'aspect-ratio',
          label: '宽高比',
          category: 'viewport',
          value: `${Math.round((simulatedWidth / w.innerHeight) * 100) / 100}`,
          query: `(aspect-ratio: ${simulatedWidth}/${w.innerHeight})`,
        },
        {
          name: 'orientation',
          label: '方向',
          category: 'viewport',
          value: simulatedWidth > w.innerHeight ? 'landscape' : 'portrait',
          query: `(orientation: ${simulatedWidth > w.innerHeight ? 'landscape' : 'portrait'})`,
        },
        // Display Quality
        {
          name: 'resolution',
          label: '分辨率',
          category: 'display',
          value: `${w.devicePixelRatio}dppx`,
          query: `(resolution: ${w.devicePixelRatio}dppx)`,
        },
        {
          name: 'color',
          label: '颜色位深',
          category: 'display',
          value: w.matchMedia('(color)').matches ? '8位/通道' : '不支持',
          query: '(color)',
        },
        {
          name: 'color-gamut',
          label: '色域',
          category: 'display',
          value: w.matchMedia('(color-gamut: p3)').matches ? 'p3' : w.matchMedia('(color-gamut: rec2020)').matches ? 'rec2020' : 'srgb',
          query: `(color-gamut: ${w.matchMedia('(color-gamut: p3)').matches ? 'p3' : 'srgb'})`,
        },
        // User Preferences
        {
          name: 'prefers-color-scheme',
          label: '首选配色方案',
          category: 'preferences',
          value: simulatedColorScheme,
          query: `(prefers-color-scheme: ${simulatedColorScheme})`,
        },
        {
          name: 'prefers-reduced-motion',
          label: '减少动画',
          category: 'preferences',
          value: simulatedMotion === 'reduce' ? 'reduce' : 'no-preference',
          query: `(prefers-reduced-motion: ${simulatedMotion})`,
        },
        {
          name: 'prefers-contrast',
          label: '对比度偏好',
          category: 'preferences',
          value: w.matchMedia('(prefers-contrast: high)').matches ? 'high' : w.matchMedia('(prefers-contrast: low)').matches ? 'low' : 'no-preference',
          query: w.matchMedia('(prefers-contrast: high)').matches ? '(prefers-contrast: high)' : '(prefers-contrast: no-preference)',
        },
        // Interaction
        {
          name: 'hover',
          label: '悬停能力',
          category: 'interaction',
          value: w.matchMedia('(hover: hover)').matches ? 'hover' : 'none',
          query: w.matchMedia('(hover: hover)').matches ? '(hover: hover)' : '(hover: none)',
        },
        {
          name: 'pointer',
          label: '指针精度',
          category: 'interaction',
          value: w.matchMedia('(pointer: fine)').matches ? 'fine' : w.matchMedia('(pointer: coarse)').matches ? 'coarse' : 'none',
          query: w.matchMedia('(pointer: fine)').matches ? '(pointer: fine)' : '(pointer: coarse)',
        },
      ];

      setFeatures(detected);
    };

    detectFeatures();
  }, [simulatedWidth, simulatedColorScheme, simulatedMotion]);

  const categories = [
    { id: 'viewport', label: '视口特性', color: 'blue' },
    { id: 'display', label: '显示质量', color: 'green' },
    { id: 'preferences', label: '用户偏好', color: 'purple' },
    { id: 'interaction', label: '交互能力', color: 'orange' },
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    switch (cat?.color) {
      case 'blue':
        return 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30 text-blue-700 dark:text-blue-300';
      case 'green':
        return 'bg-green-500/10 dark:bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-300';
      case 'purple':
        return 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30 text-purple-700 dark:text-purple-300';
      case 'orange':
        return 'bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/30 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-muted/50 dark:bg-muted/30 border-border text-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/30 dark:bg-muted/20">
        <div className="text-sm font-semibold text-foreground mb-3">模拟设置</div>

        {/* Width Simulation */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            模拟宽度: {simulatedWidth}px
          </label>
          <input
            type="range"
            min={320}
            max={1920}
            value={simulatedWidth}
            onChange={(e) => setSimulatedWidth(Number(e.target.value))}
            className="w-full h-1.5 accent-blue-500"
          />
        </div>

        {/* Color Scheme Simulation */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">配色方案</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSimulatedColorScheme('light')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                simulatedColorScheme === 'light'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              浅色模式
            </button>
            <button
              onClick={() => setSimulatedColorScheme('dark')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                simulatedColorScheme === 'dark'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              深色模式
            </button>
          </div>
        </div>

        {/* Motion Simulation */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">动画偏好</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSimulatedMotion('no-preference')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                simulatedMotion === 'no-preference'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              正常动画
            </button>
            <button
              onClick={() => setSimulatedMotion('reduce')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                simulatedMotion === 'reduce'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              减少动画
            </button>
          </div>
        </div>
      </div>

      {/* Features by Category */}
      {categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <div className="text-sm font-semibold text-foreground">{category.label}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features
              .filter((f) => f.category === category.id)
              .map((feature) => (
                <div
                  key={feature.name}
                  className={`rounded-lg border p-4 ${getCategoryColor(category.id)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">{feature.label}</div>
                    <div className="text-xs font-mono opacity-70">{feature.name}</div>
                  </div>
                  <div className="text-lg font-bold mb-2">{feature.value}</div>
                  <div className="text-xs font-mono opacity-80 bg-black/10 dark:bg-white/10 rounded px-2 py-1">
                    @media {feature.query}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">媒体特性查询示例：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {`/* 宽度查询 */
@media (min-width: 768px) { /* ... */ }

/* 暗色模式查询 */
@media (prefers-color-scheme: dark) { /* ... */ }

/* 减少动画查询 */
@media (prefers-reduced-motion: reduce) { /* ... */ }

/* 高分辨率屏幕查询 */
@media (min-resolution: 2dppx) { /* ... */ }

/* 组合查询 */
@media (min-width: 768px) and (prefers-color-scheme: dark) { /* ... */ }`}
        </pre>
      </div>
    </div>
  );
}
