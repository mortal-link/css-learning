'use client'

import { useState, useEffect, useCallback } from 'react'

interface MediaQueryResult {
  query: string
  label: string
  matches: boolean
}

export function MediaQueryTester() {
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)
  const [colorScheme, setColorScheme] = useState('light')
  const [orientation, setOrientation] = useState('portrait')
  const [presetResults, setPresetResults] = useState<MediaQueryResult[]>([])
  const [customQuery, setCustomQuery] = useState('')
  const [customResult, setCustomResult] = useState<{ matches: boolean; error?: string } | null>(null)

  const presetQueries: Omit<MediaQueryResult, 'matches'>[] = [
    { query: '(min-width: 640px)', label: 'SM 断点' },
    { query: '(min-width: 768px)', label: 'MD 断点' },
    { query: '(min-width: 1024px)', label: 'LG 断点' },
    { query: '(min-width: 1280px)', label: 'XL 断点' },
    { query: '(prefers-color-scheme: dark)', label: '深色模式' },
    { query: '(prefers-reduced-motion: reduce)', label: '减少动画' },
    { query: '(orientation: portrait)', label: '竖屏' },
    { query: '(hover: hover)', label: '支持悬停' },
    { query: '(pointer: fine)', label: '精确指针' },
  ]

  const quickFillPresets = [
    { label: '手机', query: '(max-width: 639px)' },
    { label: '平板', query: '(min-width: 640px) and (max-width: 1023px)' },
    { label: '桌面', query: '(min-width: 1024px)' },
    { label: '高分屏', query: '(min-resolution: 2dppx)' },
  ]

  const updateEnvironment = useCallback(() => {
    setViewportWidth(window.innerWidth)
    setViewportHeight(window.innerHeight)
    setDevicePixelRatio(window.devicePixelRatio)

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setColorScheme(darkModeQuery.matches ? 'dark' : 'light')

    const orientationQuery = window.matchMedia('(orientation: portrait)')
    setOrientation(orientationQuery.matches ? 'portrait' : 'landscape')

    const results = presetQueries.map(preset => ({
      ...preset,
      matches: window.matchMedia(preset.query).matches,
    }))
    setPresetResults(results)
  }, [])

  const testCustomQuery = useCallback(() => {
    if (!customQuery.trim()) {
      setCustomResult(null)
      return
    }

    try {
      const mediaQuery = window.matchMedia(customQuery)
      setCustomResult({ matches: mediaQuery.matches })
    } catch (error) {
      setCustomResult({ matches: false, error: '无效的媒体查询语法' })
    }
  }, [customQuery])

  useEffect(() => {
    updateEnvironment()
    window.addEventListener('resize', updateEnvironment)

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleColorSchemeChange = () => updateEnvironment()
    darkModeQuery.addEventListener('change', handleColorSchemeChange)

    return () => {
      window.removeEventListener('resize', updateEnvironment)
      darkModeQuery.removeEventListener('change', handleColorSchemeChange)
    }
  }, [updateEnvironment])

  useEffect(() => {
    testCustomQuery()
  }, [customQuery, testCustomQuery])

  return (
    <div className="space-y-6">
      {/* Current Environment Info */}
      <div className="rounded-lg border border-border bg-background p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          当前环境信息
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">视口宽度</div>
            <div className="text-xl font-mono text-foreground">
              {viewportWidth} px
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">视口高度</div>
            <div className="text-xl font-mono text-foreground">
              {viewportHeight} px
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">设备像素比</div>
            <div className="text-xl font-mono text-foreground">
              {devicePixelRatio}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">颜色方案</div>
            <div className="text-xl font-mono text-foreground">
              {colorScheme}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">方向</div>
            <div className="text-xl font-mono text-foreground">
              {orientation}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Media Queries */}
      <div className="rounded-lg border border-border bg-background p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          预设媒体查询
        </h3>
        <div className="space-y-3">
          {presetResults.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md bg-muted/50"
            >
              <div className="flex-1">
                <code className="text-sm font-mono text-foreground">
                  {result.query}
                </code>
                <span className="ml-3 text-sm text-muted-foreground">
                  {result.label}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.matches
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}
              >
                {result.matches ? '匹配' : '不匹配'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Query Tester */}
      <div className="rounded-lg border border-border bg-background p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          自定义媒体查询测试
        </h3>

        {/* Quick Fill Presets */}
        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-2">快速填充:</div>
          <div className="flex flex-wrap gap-2">
            {quickFillPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => setCustomQuery(preset.query)}
                className="px-3 py-1 text-sm rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input and Test */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="输入媒体查询，例如: (min-width: 800px)"
              className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={testCustomQuery}
              className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              测试
            </button>
          </div>

          {/* Result */}
          {customResult && (
            <div
              className={`p-4 rounded-md ${
                customResult.error
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : customResult.matches
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
              }`}
            >
              {customResult.error ? (
                <div className="font-medium">{customResult.error}</div>
              ) : (
                <div className="font-medium">
                  {customResult.matches
                    ? '✓ 当前环境匹配此媒体查询'
                    : '✗ 当前环境不匹配此媒体查询'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-lg border border-border bg-background p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          媒体查询说明
        </h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            媒体查询（Media Query）允许根据设备特性应用不同的 CSS 样式。
            使用 <code className="px-2 py-1 bg-muted rounded text-foreground">window.matchMedia()</code> API
            可以在 JavaScript 中检测媒体查询的匹配状态。
          </p>

          <div>
            <div className="font-medium text-foreground mb-2">CSS 示例:</div>
            <pre className="p-4 bg-muted/50 rounded-md overflow-x-auto">
              <code className="text-xs text-foreground">
{`/* 小屏幕样式 */
@media (max-width: 639px) {
  .container {
    padding: 1rem;
  }
}

/* 中等屏幕样式 */
@media (min-width: 640px) and (max-width: 1023px) {
  .container {
    padding: 2rem;
  }
}

/* 大屏幕样式 */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}`}
              </code>
            </pre>
          </div>

          <div>
            <div className="font-medium text-foreground mb-2">JavaScript 示例:</div>
            <pre className="p-4 bg-muted/50 rounded-md overflow-x-auto">
              <code className="text-xs text-foreground">
{`// 检测媒体查询
const mql = window.matchMedia('(min-width: 640px)');
console.log(mql.matches); // true 或 false

// 监听变化
mql.addEventListener('change', (e) => {
  if (e.matches) {
    console.log('现在是宽屏');
  } else {
    console.log('现在是窄屏');
  }
});`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
