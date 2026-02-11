'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const HTML_CONTENT = `<div class="page">
  <h1 class="heading">欢迎来到 CSS 世界</h1>
  <p class="paragraph">
    CSS（层叠样式表）将<strong>内容</strong>与<strong>表现</strong>分离，
    让我们可以用同一份 HTML 创建完全不同的视觉效果。
  </p>
  <a href="#" class="link">了解更多</a>
  <ul class="list">
    <li>可维护性更强</li>
    <li>样式可复用</li>
    <li>加载速度更快</li>
  </ul>
</div>`

const THEMES = {
  simple: {
    name: '简约主题',
    css: `.page {
  font-family: system-ui, sans-serif;
  padding: 20px;
  max-width: 600px;
  line-height: 1.6;
}

.heading {
  color: #2563eb;
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 600;
}

.paragraph {
  color: #374151;
  margin-bottom: 16px;
}

.link {
  color: #2563eb;
  text-decoration: none;
  border-bottom: 1px solid #2563eb;
}

.list {
  list-style: disc;
  padding-left: 24px;
  color: #4b5563;
}`,
    styles: {
      page: { fontFamily: 'system-ui, sans-serif', padding: '20px', maxWidth: '600px', lineHeight: '1.6' },
      heading: { color: '#2563eb', fontSize: '24px', marginBottom: '12px', fontWeight: '600' },
      paragraph: { color: '#374151', marginBottom: '16px' },
      link: { color: '#2563eb', textDecoration: 'none', borderBottom: '1px solid #2563eb' },
      list: { listStyle: 'disc', paddingLeft: '24px', color: '#4b5563' },
    },
  },
  colorful: {
    name: '彩色主题',
    css: `.page {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  padding: 24px;
  max-width: 600px;
  background: linear-gradient(135deg, #fef3c7, #fce7f3);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.heading {
  color: #db2777;
  font-size: 28px;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(219, 39, 119, 0.2);
  font-weight: 700;
}

.paragraph {
  color: #7c3aed;
  margin-bottom: 20px;
  font-size: 16px;
}

.link {
  color: #059669;
  text-decoration: underline;
  font-weight: 600;
}

.list {
  list-style: square;
  padding-left: 28px;
  color: #ea580c;
  font-weight: 500;
}`,
    styles: {
      page: {
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        padding: '24px',
        maxWidth: '600px',
        background: 'linear-gradient(135deg, #fef3c7, #fce7f3)',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      heading: { color: '#db2777', fontSize: '28px', marginBottom: '16px', textShadow: '2px 2px 4px rgba(219, 39, 119, 0.2)', fontWeight: '700' },
      paragraph: { color: '#7c3aed', marginBottom: '20px', fontSize: '16px' },
      link: { color: '#059669', textDecoration: 'underline', fontWeight: '600' },
      list: { listStyle: 'square', paddingLeft: '28px', color: '#ea580c', fontWeight: '500' },
    },
  },
  dark: {
    name: '暗色主题',
    css: `.page {
  font-family: 'Courier New', monospace;
  padding: 24px;
  max-width: 600px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
}

.heading {
  color: #60a5fa;
  font-size: 26px;
  margin-bottom: 14px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.paragraph {
  color: #d1d5db;
  margin-bottom: 18px;
  line-height: 1.7;
}

.link {
  color: #34d399;
  text-decoration: none;
  border-bottom: 1px dashed #34d399;
}

.list {
  list-style: circle;
  padding-left: 26px;
  color: #9ca3af;
  line-height: 1.8;
}`,
    styles: {
      page: {
        fontFamily: "'Courier New', monospace",
        padding: '24px',
        maxWidth: '600px',
        background: '#1f2937',
        border: '1px solid #374151',
        borderRadius: '8px',
      },
      heading: { color: '#60a5fa', fontSize: '26px', marginBottom: '14px', fontWeight: '700', letterSpacing: '-0.5px' },
      paragraph: { color: '#d1d5db', marginBottom: '18px', lineHeight: '1.7' },
      link: { color: '#34d399', textDecoration: 'none', borderBottom: '1px dashed #34d399' },
      list: { listStyle: 'circle', paddingLeft: '26px', color: '#9ca3af', lineHeight: '1.8' },
    },
  },
}

const UNSTYLED_STYLES = {
  page: {},
  heading: {},
  paragraph: {},
  link: { color: '#0000EE', textDecoration: 'underline' }, // browser default blue
  list: {},
}

export function CSSToggleDemo() {
  const [cssEnabled, setCssEnabled] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof THEMES>('simple')

  const currentTheme = THEMES[selectedTheme]
  const activeStyles = cssEnabled ? currentTheme.styles : UNSTYLED_STYLES

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">内容与表现分离演示</h3>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCssEnabled(!cssEnabled)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              cssEnabled
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-400 text-white hover:bg-gray-500'
            }`}
          >
            {cssEnabled ? '✓ 启用 CSS' : '✗ 禁用 CSS'}
          </button>
          <Badge variant={cssEnabled ? 'default' : 'secondary'}>
            {cssEnabled ? '样式已应用' : '仅显示原始内容'}
          </Badge>
        </div>

        {cssEnabled && (
          <div>
            <h4 className="text-sm font-semibold mb-2">选择主题</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                    selectedTheme === themeKey
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {THEMES[themeKey].name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview and Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Preview */}
        <div>
          <h4 className="text-sm font-semibold mb-2">预览效果</h4>
          <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
            <div style={activeStyles.page}>
              <h1 style={activeStyles.heading}>欢迎来到 CSS 世界</h1>
              <p style={activeStyles.paragraph}>
                CSS（层叠样式表）将<strong>内容</strong>与<strong>表现</strong>分离，
                让我们可以用同一份 HTML 创建完全不同的视觉效果。
              </p>
              <a href="#" style={activeStyles.link} onClick={(e) => e.preventDefault()}>
                了解更多
              </a>
              <ul style={activeStyles.list}>
                <li>可维护性更强</li>
                <li>样式可复用</li>
                <li>加载速度更快</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code */}
        <div>
          <h4 className="text-sm font-semibold mb-2">
            {cssEnabled ? 'CSS 规则' : 'HTML 源码（无样式）'}
          </h4>
          <div className="border rounded-lg bg-gray-900 text-gray-100 p-4 overflow-auto max-h-[340px]">
            <pre className="text-xs font-mono leading-relaxed">
              {cssEnabled ? currentTheme.css : HTML_CONTENT}
            </pre>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h4 className="text-sm font-semibold mb-2">💡 核心概念</h4>
        <div className="text-sm text-gray-700 space-y-1">
          {cssEnabled ? (
            <>
              <p>• 同一份 HTML 内容，应用不同的 CSS 样式，呈现出完全不同的视觉效果</p>
              <p>• 这就是<strong>内容与表现分离</strong>的威力——HTML 负责结构，CSS 负责样式</p>
              <p>• 切换主题只需更换 CSS 文件，无需修改 HTML 代码</p>
            </>
          ) : (
            <>
              <p>• 禁用 CSS 后，看到的是浏览器默认样式（Times New Roman、蓝色链接等）</p>
              <p>• 内容依然完整可读，这证明 HTML 承载了所有语义信息</p>
              <p>• CSS 的作用是<strong>增强表现</strong>，而非定义内容本身</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
