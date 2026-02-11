'use client';

import { useState } from 'react';

interface PropertyInfo {
  name: string;
  description: string;
  prefixes: Array<'-webkit-' | '-moz-' | '-ms-' | ''>;
  browserSupport: {
    chrome: string;
    firefox: string;
    safari: string;
    edge: string;
  };
  exampleValue: string;
}

const PREFIXED_PROPERTIES: Record<string, PropertyInfo> = {
  'user-select': {
    name: 'user-select',
    description: '控制用户是否可以选择文本',
    prefixes: ['-webkit-', '-moz-', '-ms-', ''],
    browserSupport: {
      chrome: '✓ 需要 -webkit-',
      firefox: '✓ 需要 -moz-',
      safari: '✓ 需要 -webkit-',
      edge: '✓ 需要 -ms-',
    },
    exampleValue: 'none',
  },
  'appearance': {
    name: 'appearance',
    description: '控制元素的原生外观',
    prefixes: ['-webkit-', '-moz-', ''],
    browserSupport: {
      chrome: '✓ 需要 -webkit-',
      firefox: '✓ 需要 -moz-',
      safari: '✓ 需要 -webkit-',
      edge: '✓ 标准支持',
    },
    exampleValue: 'none',
  },
  'backdrop-filter': {
    name: 'backdrop-filter',
    description: '对元素背后区域应用滤镜效果',
    prefixes: ['-webkit-', ''],
    browserSupport: {
      chrome: '✓ 需要 -webkit-',
      firefox: '✓ 标准支持',
      safari: '✓ 需要 -webkit-',
      edge: '✓ 标准支持',
    },
    exampleValue: 'blur(10px)',
  },
  'box-decoration-break': {
    name: 'box-decoration-break',
    description: '控制元素片段的渲染方式',
    prefixes: ['-webkit-', ''],
    browserSupport: {
      chrome: '✓ 需要 -webkit-',
      firefox: '✓ 标准支持',
      safari: '✓ 需要 -webkit-',
      edge: '✓ 需要 -webkit-',
    },
    exampleValue: 'clone',
  },
  'text-fill-color': {
    name: 'text-fill-color',
    description: '设置文本填充颜色',
    prefixes: ['-webkit-'],
    browserSupport: {
      chrome: '✓ 需要 -webkit-',
      firefox: '✓ 需要 -webkit-',
      safari: '✓ 需要 -webkit-',
      edge: '✓ 需要 -webkit-',
    },
    exampleValue: 'transparent',
  },
};

export function VendorPrefixDemo() {
  const [selectedProperty, setSelectedProperty] = useState('user-select');
  const [autoprefixerMode, setAutoprefixerMode] = useState(false);

  const property = PREFIXED_PROPERTIES[selectedProperty];

  const generateCSS = () => {
    if (autoprefixerMode) {
      // Show autoprefixer output with all prefixes
      return property.prefixes
        .map((prefix) => `  ${prefix}${property.name}: ${property.exampleValue};`)
        .join('\n');
    } else {
      // Show only standard property
      return `  ${property.name}: ${property.exampleValue};`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded">
        <p className="text-sm text-indigo-900 dark:text-indigo-200">
          <strong>浏览器供应商前缀：</strong>
          当 CSS 特性处于实验阶段时，浏览器使用前缀（-webkit-, -moz-, -ms-）来实现。
          成熟后会移除前缀，支持标准属性名。
        </p>
      </div>

      {/* Property Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          选择 CSS 属性
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.keys(PREFIXED_PROPERTIES).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedProperty(key)}
              className={`p-3 text-left rounded-lg border-2 transition-all ${
                selectedProperty === key
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary hover:bg-secondary/80'
              }`}
            >
              <div className="font-mono text-sm font-semibold text-foreground">
                {key}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {PREFIXED_PROPERTIES[key].description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Autoprefixer Toggle */}
      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
        <button
          onClick={() => setAutoprefixerMode(!autoprefixerMode)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            autoprefixerMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              autoprefixerMode ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
        <div>
          <div className="text-sm font-medium text-foreground">
            Autoprefixer 模式
          </div>
          <div className="text-xs text-muted-foreground">
            {autoprefixerMode ? '自动添加所有必需的前缀' : '仅显示标准属性'}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          需要的浏览器前缀
        </div>
        <div className="space-y-2">
          {property.prefixes.map((prefix) => (
            <div
              key={prefix || 'standard'}
              className="flex items-center gap-2 p-2 bg-muted/50 rounded border border-border"
            >
              <div className="w-24 font-mono text-sm font-semibold text-primary">
                {prefix || '(标准)'}
              </div>
              <div className="font-mono text-sm text-foreground">
                {prefix}{property.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browser Support */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          浏览器兼容性
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-lg">🌐</div>
              <div className="text-xs font-semibold text-foreground">Chrome</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {property.browserSupport.chrome}
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-lg">🦊</div>
              <div className="text-xs font-semibold text-foreground">Firefox</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {property.browserSupport.firefox}
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-lg">🧭</div>
              <div className="text-xs font-semibold text-foreground">Safari</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {property.browserSupport.safari}
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-lg">📊</div>
              <div className="text-xs font-semibold text-foreground">Edge</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {property.browserSupport.edge}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          {autoprefixerMode ? '输出 CSS（带前缀）' : '输入 CSS（标准属性）'}
        </div>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg border border-border">
          <pre className="text-sm font-mono text-gray-100">
            <code>{`.element {
${generateCSS()}
}`}</code>
          </pre>
        </div>
      </div>

      {/* Prefix Reference */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          常见前缀参考
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left font-semibold text-foreground">前缀</th>
                <th className="p-2 text-left font-semibold text-foreground">浏览器引擎</th>
                <th className="p-2 text-left font-semibold text-foreground">代表浏览器</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">-webkit-</td>
                <td className="p-2 text-muted-foreground">WebKit / Blink</td>
                <td className="p-2 text-muted-foreground">Chrome, Safari, Edge</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">-moz-</td>
                <td className="p-2 text-muted-foreground">Gecko</td>
                <td className="p-2 text-muted-foreground">Firefox</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">-ms-</td>
                <td className="p-2 text-muted-foreground">Trident</td>
                <td className="p-2 text-muted-foreground">IE, 旧版 Edge</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 font-mono text-primary">-o-</td>
                <td className="p-2 text-muted-foreground">Presto</td>
                <td className="p-2 text-muted-foreground">旧版 Opera</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-500 rounded-lg">
        <div className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
          最佳实践建议
        </div>
        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
          <li>• 使用 Autoprefixer 等工具自动添加前缀，避免手动维护</li>
          <li>• 标准属性写在最后，让它覆盖带前缀的版本</li>
          <li>• 定期检查 caniuse.com，移除不再需要的前缀</li>
          <li>• 使用 browserslist 配置目标浏览器，精确控制前缀</li>
        </ul>
      </div>
    </div>
  );
}
