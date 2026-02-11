'use client'

import { useState, useEffect } from 'react'

export function ContainerQueryDemo() {
  const [containerWidth, setContainerWidth] = useState(600)

  // Inject styles for @container queries
  useEffect(() => {
    const styleId = 'cqd-styles'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .cqd-container {
        container-type: inline-size;
        container-name: product-card;
      }

      .cqd-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background: hsl(var(--background));
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      @media (prefers-color-scheme: dark) {
        .cqd-card {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      }

      .cqd-image {
        width: 100%;
        height: 120px;
        border-radius: 6px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        flex-shrink: 0;
      }

      .cqd-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .cqd-title {
        font-size: 14px;
        font-weight: 600;
        color: hsl(var(--foreground));
      }

      .cqd-description {
        font-size: 12px;
        color: hsl(var(--muted-foreground));
        line-height: 1.5;
        display: none;
      }

      .cqd-price {
        font-size: 14px;
        font-weight: 700;
        color: #ef4444;
      }

      @media (prefers-color-scheme: dark) {
        .cqd-price {
          color: #f87171;
        }
      }

      .cqd-button {
        display: none;
        padding: 8px 16px;
        background: #3b82f6;
        color: white;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
        align-self: flex-start;
      }

      .cqd-button:hover {
        background: #2563eb;
      }

      /* Container Query Breakpoints */
      @container product-card (min-width: 300px) {
        .cqd-card {
          flex-direction: row;
          gap: 16px;
        }

        .cqd-image {
          width: 120px;
          height: 120px;
        }

        .cqd-title {
          font-size: 16px;
        }

        .cqd-description {
          display: block;
        }
      }

      @container product-card (min-width: 500px) {
        .cqd-card {
          padding: 24px;
          gap: 20px;
        }

        .cqd-image {
          width: 160px;
          height: 160px;
          font-size: 3rem;
        }

        .cqd-title {
          font-size: 20px;
        }

        .cqd-description {
          font-size: 14px;
        }

        .cqd-price {
          font-size: 18px;
          margin-top: 4px;
        }

        .cqd-button {
          display: block;
          margin-top: 8px;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  const getBreakpoint = () => {
    if (containerWidth >= 500) return 'spacious'
    if (containerWidth >= 300) return 'standard'
    return 'compact'
  }

  const breakpoint = getBreakpoint()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            容器宽度控制
          </label>
          <span className="text-sm font-mono text-primary font-semibold">
            {containerWidth}px
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="800"
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>200px</span>
          <span>800px</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>容器查询 vs 媒体查询：</strong>
          容器查询根据<strong>容器宽度</strong>响应，而媒体查询根据<strong>视口宽度</strong>响应。
          这使得组件可以真正独立于页面布局进行样式调整。
        </p>
      </div>

      {/* Resizable Container */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          响应式容器
        </div>
        <div
          className="cqd-container border-2 border-dashed border-primary/30 rounded-lg p-4 transition-all duration-300"
          style={{ width: `${containerWidth}px` }}
        >
          <div className="cqd-card">
            <div className="cqd-image">
              📦
            </div>
            <div className="cqd-content">
              <h3 className="cqd-title">CSS 容器查询示例</h3>
              <p className="cqd-description">
                容器查询让组件能够根据其容器的尺寸来调整自身的样式。
                这是一种更加模块化和组件化的响应式设计方法。
              </p>
              <div className="cqd-price">¥ 99.00</div>
              <button className="cqd-button">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoint Indicators */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          当前断点状态
        </div>
        <div className="flex gap-3">
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              breakpoint === 'compact'
                ? 'bg-orange-500 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            紧凑 (&lt; 300px)
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              breakpoint === 'standard'
                ? 'bg-blue-500 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            标准 (300-500px)
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              breakpoint === 'spacious'
                ? 'bg-green-500 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            宽松 (&gt; 500px)
          </div>
        </div>
      </div>

      {/* Active CSS Code */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          激活的容器查询规则
        </div>
        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono">
            <code>{`/* 基础样式 (始终激活) */
.cqd-container {
  container-type: inline-size;
  container-name: product-card;
}

.cqd-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}${breakpoint === 'standard' || breakpoint === 'spacious' ? `

/* 标准布局 (≥ 300px) */
@container product-card (min-width: 300px) {
  .cqd-card {
    flex-direction: row;
    gap: 16px;
  }
  .cqd-image {
    width: 120px;
    height: 120px;
  }
  .cqd-description {
    display: block;
  }
}` : ''}${breakpoint === 'spacious' ? `

/* 宽松布局 (≥ 500px) */
@container product-card (min-width: 500px) {
  .cqd-card {
    padding: 24px;
    gap: 20px;
  }
  .cqd-image {
    width: 160px;
    height: 160px;
  }
  .cqd-button {
    display: block;
  }
}` : ''}`}</code>
          </pre>
        </div>
      </div>

      {/* Explanation */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          工作原理
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">1. 容器定义：</strong>
            通过 <code className="px-1.5 py-0.5 bg-muted rounded">container-type: inline-size</code> 将元素声明为查询容器。
          </p>
          <p>
            <strong className="text-foreground">2. 查询规则：</strong>
            使用 <code className="px-1.5 py-0.5 bg-muted rounded">@container (min-width: XXpx)</code> 定义样式断点。
          </p>
          <p>
            <strong className="text-foreground">3. 响应式布局：</strong>
            子元素根据容器宽度（而非视口宽度）自动调整布局和样式。
          </p>
          <p className="pt-2 text-xs italic text-muted-foreground">
            提示：尝试调整滑块，观察卡片布局如何根据容器宽度变化！
          </p>
        </div>
      </div>
    </div>
  )
}
