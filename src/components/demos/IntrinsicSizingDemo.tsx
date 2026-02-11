'use client';

import { useState } from 'react';

type SizingKeyword = 'auto' | 'min-content' | 'max-content' | 'fit-content' | 'fit-content-value';

export function IntrinsicSizingDemo() {
  const [selectedKeyword, setSelectedKeyword] = useState<SizingKeyword>('max-content');
  const [fitContentValue, setFitContentValue] = useState(300);
  const [contentMode, setContentMode] = useState<'short' | 'long' | 'mixed'>('mixed');

  const presets = [
    { name: '短文本', keyword: 'max-content' as SizingKeyword, content: 'short' as const },
    { name: '长文本', keyword: 'min-content' as SizingKeyword, content: 'long' as const },
    { name: '混合内容', keyword: 'fit-content' as SizingKeyword, content: 'mixed' as const },
  ];

  const content = {
    short: '短文本',
    long: '这是一段很长的文本内容，用于演示不同的内在尺寸关键字如何影响元素宽度。',
    mixed: (
      <>
        <span style={{ display: 'inline-block', width: '60px', height: '40px', background: '#3b82f6', borderRadius: '4px', marginRight: '8px' }}></span>
        混合文本和元素
        <span style={{ display: 'inline-block', width: '80px', height: '40px', background: '#10b981', borderRadius: '4px', marginLeft: '8px' }}></span>
      </>
    ),
  };

  const keywords = [
    {
      id: 'auto' as SizingKeyword,
      name: 'auto',
      description: '默认行为（块级元素填充可用宽度）',
      css: 'width: auto;',
    },
    {
      id: 'min-content' as SizingKeyword,
      name: 'min-content',
      description: '最小内容宽度（最长单词或不可断行元素）',
      css: 'width: min-content;',
    },
    {
      id: 'max-content' as SizingKeyword,
      name: 'max-content',
      description: '最大内容宽度（内容不换行时的宽度）',
      css: 'width: max-content;',
    },
    {
      id: 'fit-content' as SizingKeyword,
      name: 'fit-content',
      description: '适应内容宽度 = min(max-content, max(min-content, 可用宽度))',
      css: 'width: fit-content;',
    },
    {
      id: 'fit-content-value' as SizingKeyword,
      name: 'fit-content(value)',
      description: '适应内容但不超过指定值',
      css: `width: fit-content(${fitContentValue}px);`,
    },
  ];

  const currentKeyword = keywords.find((k) => k.id === selectedKeyword)!;

  const getBoxStyle = () => {
    const base: React.CSSProperties = {
      padding: '1rem',
      backgroundColor: 'rgb(59, 130, 246)',
      color: 'white',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
    };

    if (selectedKeyword === 'auto') {
      return { ...base, width: 'auto' };
    } else if (selectedKeyword === 'min-content') {
      return { ...base, width: 'min-content' };
    } else if (selectedKeyword === 'max-content') {
      return { ...base, width: 'max-content' };
    } else if (selectedKeyword === 'fit-content') {
      return { ...base, width: 'fit-content' };
    } else {
      return { ...base, width: `fit-content(${fitContentValue}px)` };
    }
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
              onClick={() => {
                setSelectedKeyword(preset.keyword);
                setContentMode(preset.content);
              }}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sizing Keyword Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          内在尺寸关键字
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {keywords.map((keyword) => (
            <button
              key={keyword.id}
              onClick={() => setSelectedKeyword(keyword.id)}
              className={`px-3 py-2 rounded text-sm transition-colors text-left ${
                selectedKeyword === keyword.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {keyword.name}
            </button>
          ))}
        </div>
      </div>

      {/* fit-content(value) Control */}
      {selectedKeyword === 'fit-content-value' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            fit-content 最大值: {fitContentValue}px
          </label>
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={fitContentValue}
            onChange={(e) => setFitContentValue(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Content Mode */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          内容类型
        </label>
        <div className="flex gap-2">
          {(['short', 'long', 'mixed'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setContentMode(mode)}
              className={`px-4 py-2 rounded transition-colors ${
                contentMode === mode
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {mode === 'short' ? '短文本' : mode === 'long' ? '长文本' : '混合内容'}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword Description */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
          {currentKeyword.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {currentKeyword.description}
        </p>
      </div>

      {/* Side-by-side Comparison */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          内在尺寸对比
        </label>
        <div className="border border-border rounded-lg p-6 bg-muted/50 space-y-4">
          {/* auto */}
          <div>
            <div className="text-xs text-muted-foreground mb-1 font-mono">width: auto;</div>
            <div style={{ ...getBoxStyle(), width: 'auto' }}>
              {content[contentMode]}
            </div>
          </div>

          {/* min-content */}
          <div>
            <div className="text-xs text-muted-foreground mb-1 font-mono">width: min-content;</div>
            <div style={{ ...getBoxStyle(), width: 'min-content' }}>
              {content[contentMode]}
            </div>
          </div>

          {/* max-content */}
          <div>
            <div className="text-xs text-muted-foreground mb-1 font-mono">width: max-content;</div>
            <div style={{ ...getBoxStyle(), width: 'max-content' }}>
              {content[contentMode]}
            </div>
          </div>

          {/* fit-content */}
          <div>
            <div className="text-xs text-muted-foreground mb-1 font-mono">width: fit-content;</div>
            <div style={{ ...getBoxStyle(), width: 'fit-content' }}>
              {content[contentMode]}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Keyword Demo */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          当前选中: {currentKeyword.name}
        </label>
        <div className="border border-border rounded-lg p-6 bg-muted/50">
          <div style={getBoxStyle()}>
            {content[contentMode]}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 border-t-2 border-blue-400"></div>
            <div className="font-mono">计算宽度</div>
            <div className="flex-1 border-t-2 border-blue-400"></div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-sm">
        <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          内在尺寸计算规则
        </p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li><strong>min-content</strong>: 最窄可能宽度（不溢出）</li>
          <li><strong>max-content</strong>: 内容自然宽度（不换行）</li>
          <li><strong>fit-content</strong>: 介于 min-content 和 max-content 之间，受可用宽度限制</li>
          <li><strong>fit-content(value)</strong>: fit-content 的行为，但不超过指定值</li>
        </ul>
      </div>

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          生成的 CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`.element {\n  ${currentKeyword.css}\n}`}
        </pre>
      </div>
    </div>
  );
}
