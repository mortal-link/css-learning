'use client'

import { useState } from 'react'

interface Preset {
  name: string
  useSubgrid: boolean
}

const presets: Preset[] = [
  { name: '卡片对齐', useSubgrid: true },
  { name: '表单对齐', useSubgrid: true },
  { name: '无子网格对比', useSubgrid: false },
]

export function SubgridDemo() {
  const [useSubgrid, setUseSubgrid] = useState(true)
  const [currentPreset, setCurrentPreset] = useState(0)

  const handlePreset = (index: number) => {
    setCurrentPreset(index)
    setUseSubgrid(presets[index].useSubgrid)
  }

  const getCSSCode = () => {
    if (useSubgrid) {
      return `.parent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 16px;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;

  /* 子网格继承父网格的列轨道 */
  /* 使卡片内容跨行对齐 */
}`
    }

    return `.parent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 16px;
}

.card {
  /* 无 subgrid，每个卡片独立布局 */
  /* 内容不会跨卡片对齐 */
}`
  }

  const cards = [
    {
      title: '基础套餐',
      description: '适合个人用户使用的入门方案',
      price: '¥99',
      features: ['5GB 存储空间', '基础支持', '单用户'],
    },
    {
      title: '专业套餐',
      description: '为小团队设计的专业解决方案，包含更多功能和存储空间',
      price: '¥299',
      features: ['50GB 存储空间', '优先支持', '最多 10 用户', '高级功能'],
    },
    {
      title: '企业套餐',
      description: '企业级方案',
      price: '¥999',
      features: ['无限存储', '7×24 支持', '无限用户'],
    },
  ]

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset, index) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(index)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              currentPreset === index
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Subgrid Toggle */}
      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
        <input
          type="checkbox"
          id="use-subgrid"
          checked={useSubgrid}
          onChange={(e) => setUseSubgrid(e.target.checked)}
          className="w-4 h-4 rounded"
        />
        <label htmlFor="use-subgrid" className="text-sm font-medium cursor-pointer">
          启用 subgrid (观察卡片内容对齐差异)
        </label>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>子网格 (subgrid):</strong> 允许网格项目继承父网格的轨道，使嵌套网格的内容能够与父网格的其他项目对齐。
          {useSubgrid ? ' 开启后，注意卡片标题、内容、价格、特性列表如何在水平方向对齐。' : ' 关闭后，每个卡片独立布局，无法跨卡片对齐。'}
        </p>
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">价格卡片对比</div>
        <div
          className="grid gap-4 p-4 bg-muted/30 rounded-lg"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-2 transition-all ${
                useSubgrid
                  ? 'border-green-400 dark:border-green-600'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              style={
                useSubgrid
                  ? {
                      display: 'grid',
                      gridTemplateRows: 'subgrid',
                      gridRow: 'span 4',
                      gap: '12px',
                    }
                  : {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }
              }
            >
              {/* Header */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                <p className="text-xs text-muted-foreground min-h-[2.5rem]">{card.description}</p>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {card.price}
              </div>

              {/* Features */}
              <ul className="space-y-2 text-sm text-muted-foreground">
                {card.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="mt-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors text-sm">
                选择方案
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Lines Visualization */}
      {useSubgrid && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-xs text-green-900 dark:text-green-200">
            <strong>✓ 子网格已启用:</strong> 注意卡片的标题区、价格、特性列表、按钮在垂直方向上如何对齐。
            即使内容长度不同，子网格也能保持一致的视觉节奏。
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div className="space-y-2">
        <div className="text-sm font-medium">CSS 代码</div>
        <pre className="p-3 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 rounded-lg text-xs overflow-x-auto">
          <code>{getCSSCode()}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="space-y-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        <p><strong className="text-foreground">grid-template-rows: subgrid:</strong> 子元素继承父网格的行轨道定义。</p>
        <p><strong className="text-foreground">grid-template-columns: subgrid:</strong> 子元素继承父网格的列轨道定义。</p>
        <p><strong className="text-foreground">grid-row: span N:</strong> 子网格需要跨越足够多的轨道来容纳其内容。</p>
        <p><strong className="text-foreground">应用场景:</strong> 卡片布局、表单对齐、数据表格等需要跨组件对齐的场景。</p>
        <p className="pt-2 text-amber-700 dark:text-amber-400">
          <strong>⚠️ 浏览器支持:</strong> subgrid 是较新特性，需要 Firefox 71+, Safari 16+, Chrome 117+。
        </p>
      </div>
    </div>
  )
}
