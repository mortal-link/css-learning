'use client';

import { useState } from 'react';

type ContentType = 'string' | 'attr' | 'url' | 'counter' | 'quote' | 'none';

export function ContentPropertyDemo() {
  const [activeTab, setActiveTab] = useState<ContentType>('string');
  const [stringContent, setStringContent] = useState('Hello, CSS!');
  const [attrName, setAttrName] = useState('data-label');
  const [attrValue, setAttrValue] = useState('标签内容');
  const [counterValue, setCounterValue] = useState(3);
  const [quoteStyle, setQuoteStyle] = useState<'open-close' | 'nested'>('open-close');

  const generateCSS = () => {
    switch (activeTab) {
      case 'string':
        return `.element::before {
  content: "${stringContent}";
}`;
      case 'attr':
        return `.element::before {
  content: attr(${attrName});
}`;
      case 'url':
        return `.element::before {
  content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="%233b82f6"/></svg>');
}`;
      case 'counter':
        return `.element {
  counter-increment: item;
}
.element::before {
  content: counter(item) ". ";
}`;
      case 'quote':
        return `.element::before {
  content: ${quoteStyle === 'open-close' ? 'open-quote' : 'open-quote open-quote'};
}
.element::after {
  content: ${quoteStyle === 'open-close' ? 'close-quote' : 'close-quote close-quote'};
}`;
      case 'none':
        return `.element::before {
  content: none;
}`;
      default:
        return '';
    }
  };

  const applyPreset = (preset: ContentType) => {
    setActiveTab(preset);
    switch (preset) {
      case 'string':
        setStringContent('✓ 完成');
        break;
      case 'attr':
        setAttrName('data-label');
        setAttrValue('新标签');
        break;
      case 'counter':
        setCounterValue(5);
        break;
      case 'quote':
        setQuoteStyle('nested');
        break;
    }
  };

  const renderPreview = () => {
    switch (activeTab) {
      case 'string':
        return (
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-semibold">{stringContent}</span>
            <span className="text-foreground">元素内容</span>
          </div>
        );
      case 'attr':
        return (
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-semibold">{attrValue}</span>
            <span className="text-foreground">元素内容</span>
          </div>
        );
      case 'url':
        return (
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="#3b82f6" />
            </svg>
            <span className="text-foreground">元素内容</span>
          </div>
        );
      case 'counter':
        return (
          <div className="space-y-2">
            {Array.from({ length: counterValue }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-purple-500 font-semibold">{i + 1}.</span>
                <span className="text-foreground">列表项 {i + 1}</span>
              </div>
            ))}
          </div>
        );
      case 'quote':
        return (
          <div className="text-foreground">
            <span className="text-gray-500 text-2xl">
              {quoteStyle === 'open-close' ? '"' : '""'}
            </span>
            <span className="mx-2">引用的内容</span>
            <span className="text-gray-500 text-2xl">
              {quoteStyle === 'open-close' ? '"' : '""'}
            </span>
          </div>
        );
      case 'none':
        return <div className="text-foreground text-muted-foreground">无伪元素内容</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {[
          { id: 'string' as ContentType, label: '字符串' },
          { id: 'attr' as ContentType, label: 'attr()' },
          { id: 'url' as ContentType, label: 'url()' },
          { id: 'counter' as ContentType, label: 'counter()' },
          { id: 'quote' as ContentType, label: 'quote' },
          { id: 'none' as ContentType, label: 'none' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-8 min-h-[150px] flex items-center justify-center">
        {renderPreview()}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {activeTab === 'string' && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">字符串内容</label>
            <input
              type="text"
              value={stringContent}
              onChange={(e) => setStringContent(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md"
              placeholder="输入内容"
            />
          </div>
        )}

        {activeTab === 'attr' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">属性名称</label>
              <input
                type="text"
                value={attrName}
                onChange={(e) => setAttrName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md font-mono"
                placeholder="data-label"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">属性值（预览用）</label>
              <input
                type="text"
                value={attrValue}
                onChange={(e) => setAttrValue(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md"
                placeholder="标签内容"
              />
            </div>
          </div>
        )}

        {activeTab === 'url' && (
          <div className="text-sm text-muted-foreground">
            <p>使用 url() 可以插入图像作为内容。示例展示了一个 SVG 图标。</p>
          </div>
        )}

        {activeTab === 'counter' && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              计数器数量: {counterValue}
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={counterValue}
              onChange={(e) => setCounterValue(Number(e.target.value))}
              className="w-full h-1.5 accent-purple-500"
            />
          </div>
        )}

        {activeTab === 'quote' && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">引号样式</label>
            <div className="flex gap-2">
              <button
                onClick={() => setQuoteStyle('open-close')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  quoteStyle === 'open-close'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                单层引号
              </button>
              <button
                onClick={() => setQuoteStyle('nested')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  quoteStyle === 'nested'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                嵌套引号
              </button>
            </div>
          </div>
        )}

        {activeTab === 'none' && (
          <div className="text-sm text-muted-foreground">
            <p>使用 content: none 可以移除伪元素的内容。</p>
          </div>
        )}
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('string')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          字符串示例
        </button>
        <button
          onClick={() => applyPreset('attr')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          属性示例
        </button>
        <button
          onClick={() => applyPreset('counter')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          计数器示例
        </button>
        <button
          onClick={() => applyPreset('quote')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          引号示例
        </button>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">{generateCSS()}</pre>
      </div>
    </div>
  );
}
