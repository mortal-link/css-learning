'use client';

import { useState } from 'react';

type MediaType = 'all' | 'screen' | 'print' | 'speech';

interface MediaTypeInfo {
  name: MediaType | 'deprecated';
  label: string;
  description: string;
  example: string;
}

const MEDIA_TYPES: MediaTypeInfo[] = [
  {
    name: 'all',
    label: 'all',
    description: '适用于所有设备',
    example: '@media all { /* 所有设备样式 */ }',
  },
  {
    name: 'screen',
    label: 'screen',
    description: '用于屏幕设备（电脑、平板、手机等）',
    example: '@media screen { /* 屏幕设备样式 */ }',
  },
  {
    name: 'print',
    label: 'print',
    description: '用于打印预览和打印页面',
    example: '@media print { /* 打印样式 */ }',
  },
  {
    name: 'speech',
    label: 'speech',
    description: '用于语音合成器和屏幕阅读器',
    example: '@media speech { /* 语音合成器样式 */ }',
  },
];

const DEPRECATED_TYPES = [
  { name: 'tty', label: 'tty（已弃用）', description: '电传打字机和终端' },
  { name: 'tv', label: 'tv（已弃用）', description: '电视设备' },
  { name: 'projection', label: 'projection（已弃用）', description: '投影仪' },
  { name: 'handheld', label: 'handheld（已弃用）', description: '手持设备' },
  { name: 'braille', label: 'braille（已弃用）', description: '盲文设备' },
  { name: 'embossed', label: 'embossed（已弃用）', description: '盲文打印机' },
  { name: 'aural', label: 'aural（已弃用）', description: '语音合成器' },
];

export function MediaTypeDemo() {
  const [selectedType, setSelectedType] = useState<MediaType>('screen');

  const renderPreview = () => {
    switch (selectedType) {
      case 'all':
        return (
          <div className="space-y-4">
            <div className="text-lg font-semibold text-foreground">通用样式示例</div>
            <p className="text-foreground">
              这些样式将应用于所有媒体类型，包括屏幕、打印和语音合成器。
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 rounded border border-blue-500/30">
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  屏幕显示
                </div>
              </div>
              <div className="p-4 bg-green-500/10 dark:bg-green-500/20 rounded border border-green-500/30">
                <div className="text-sm font-medium text-green-700 dark:text-green-300">
                  打印输出
                </div>
              </div>
            </div>
          </div>
        );
      case 'screen':
        return (
          <div className="space-y-4">
            <div className="text-lg font-semibold text-foreground">屏幕视图</div>
            <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-lg border border-border">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">网页内容</div>
                <p className="text-foreground/80">
                  这是针对屏幕优化的视图，包含丰富的颜色、阴影和交互效果。
                </p>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg shadow-lg" />
                  <div className="w-12 h-12 bg-purple-500 rounded-lg shadow-lg" />
                  <div className="w-12 h-12 bg-pink-500 rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'print':
        return (
          <div className="space-y-4">
            <div className="text-lg font-semibold text-foreground">打印预览</div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-border">
              <div className="space-y-2 text-black dark:text-white">
                <div className="text-2xl font-serif font-bold">文档标题</div>
                <p className="text-sm leading-relaxed">
                  这是针对打印优化的视图。移除了背景色、阴影和装饰效果，使用更适合打印的字体和布局。文字更清晰，节省墨水。
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-400 border-t pt-2 mt-4">
                  页脚信息 - 打印日期: {new Date().toLocaleDateString('zh-CN')}
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              💡 打印样式通常会隐藏导航、侧边栏等非必要元素
            </div>
          </div>
        );
      case 'speech':
        return (
          <div className="space-y-4">
            <div className="text-lg font-semibold text-foreground">语音合成器视图</div>
            <div className="p-6 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg border border-amber-500/30">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🔊</div>
                  <div>
                    <div className="font-semibold text-foreground">语音输出优化</div>
                    <div className="text-sm text-muted-foreground">
                      为屏幕阅读器优化的内容结构
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-foreground">
                  <p>• 清晰的标题层级</p>
                  <p>• 语义化的 HTML 结构</p>
                  <p>• 有意义的 alt 文本</p>
                  <p>• 可朗读的内容顺序</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              💡 语音样式可以控制音量、语速、停顿等属性
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Media Type Buttons */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">选择媒体类型</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {MEDIA_TYPES.map((type) => (
            <button
              key={type.name}
              onClick={() => setSelectedType(type.name as MediaType)}
              className={`p-4 text-left rounded-lg border transition-colors ${
                selectedType === type.name
                  ? 'bg-primary text-primary-foreground border-primary dark:bg-primary dark:text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 border-border dark:bg-secondary dark:hover:bg-secondary/80'
              }`}
            >
              <div className="font-mono text-sm font-bold">{type.label}</div>
              <div className="text-xs opacity-80 mt-1">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-8">
        {renderPreview()}
      </div>

      {/* Media Query Explanation */}
      <div className="rounded-lg border border-border bg-muted/50 dark:bg-muted/30 p-4">
        <div className="text-xs text-muted-foreground mb-2">当前媒体类型说明：</div>
        <div className="text-sm text-foreground">
          {MEDIA_TYPES.find((t) => t.name === selectedType)?.description}
        </div>
      </div>

      {/* Deprecated Types */}
      <div>
        <div className="text-sm text-muted-foreground mb-2">已弃用的媒体类型</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DEPRECATED_TYPES.map((type) => (
            <div
              key={type.name}
              className="p-3 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border opacity-50"
            >
              <div className="font-mono text-xs line-through">{type.label}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{type.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">CSS 示例代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {MEDIA_TYPES.find((t) => t.name === selectedType)?.example}
        </pre>
      </div>
    </div>
  );
}
