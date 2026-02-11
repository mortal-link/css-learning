'use client';

import { useState } from 'react';

interface PseudoElementState {
  beforeContent: string;
  beforeColor: string;
  beforeFontSize: number;
  beforeDisplay: boolean;
  afterContent: string;
  afterColor: string;
  afterFontSize: number;
  afterDisplay: boolean;
}

const DEFAULT_STATE: PseudoElementState = {
  beforeContent: '→',
  beforeColor: '#3b82f6',
  beforeFontSize: 20,
  beforeDisplay: true,
  afterContent: '←',
  afterColor: '#8b5cf6',
  afterFontSize: 20,
  afterDisplay: true,
};

export function PseudoElementDemo() {
  const [state, setState] = useState<PseudoElementState>(DEFAULT_STATE);

  const updateState = (key: keyof PseudoElementState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: 'default' | 'decorative' | 'quotes' | 'label' | 'clearfix') => {
    switch (preset) {
      case 'default':
        setState(DEFAULT_STATE);
        break;
      case 'decorative':
        setState({
          beforeContent: '★',
          beforeColor: '#f59e0b',
          beforeFontSize: 24,
          beforeDisplay: true,
          afterContent: '★',
          afterColor: '#f59e0b',
          afterFontSize: 24,
          afterDisplay: true,
        });
        break;
      case 'quotes':
        setState({
          beforeContent: '"',
          beforeColor: '#6b7280',
          beforeFontSize: 32,
          beforeDisplay: true,
          afterContent: '"',
          afterColor: '#6b7280',
          afterFontSize: 32,
          afterDisplay: true,
        });
        break;
      case 'label':
        setState({
          beforeContent: '🏷️',
          beforeColor: '#10b981',
          beforeFontSize: 18,
          beforeDisplay: true,
          afterContent: '✓',
          afterColor: '#10b981',
          afterFontSize: 18,
          afterDisplay: true,
        });
        break;
      case 'clearfix':
        setState({
          beforeContent: '',
          beforeColor: '#3b82f6',
          beforeFontSize: 16,
          beforeDisplay: false,
          afterContent: '',
          afterColor: '#8b5cf6',
          afterFontSize: 16,
          afterDisplay: true,
        });
        break;
    }
  };

  const generateCSS = () => {
    const beforeCSS = state.beforeDisplay
      ? `.target::before {
  content: "${state.beforeContent}";
  color: ${state.beforeColor};
  font-size: ${state.beforeFontSize}px;
  margin-right: 8px;
}`
      : '';

    const afterCSS = state.afterDisplay
      ? `.target::after {
  content: "${state.afterContent}";
  color: ${state.afterColor};
  font-size: ${state.afterFontSize}px;
  margin-left: 8px;
}`
      : '';

    return [beforeCSS, afterCSS].filter(Boolean).join('\n\n');
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-8 flex items-center justify-center min-h-[150px]">
        <div className="relative flex items-center text-foreground">
          {state.beforeDisplay && (
            <span
              style={{
                color: state.beforeColor,
                fontSize: `${state.beforeFontSize}px`,
                marginRight: '8px',
              }}
            >
              {state.beforeContent}
            </span>
          )}
          <span className="text-lg font-medium">目标元素内容</span>
          {state.afterDisplay && (
            <span
              style={{
                color: state.afterColor,
                fontSize: `${state.afterFontSize}px`,
                marginLeft: '8px',
              }}
            >
              {state.afterContent}
            </span>
          )}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('default')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          默认
        </button>
        <button
          onClick={() => applyPreset('decorative')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          装饰符号
        </button>
        <button
          onClick={() => applyPreset('quotes')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          引号包裹
        </button>
        <button
          onClick={() => applyPreset('label')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          图标标签
        </button>
        <button
          onClick={() => applyPreset('clearfix')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          清除浮动
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ::before controls */}
        <div className="space-y-4 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">::before 伪元素</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={state.beforeDisplay}
                onChange={(e) => updateState('beforeDisplay', e.target.checked)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-xs text-muted-foreground">显示</span>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">内容</label>
              <input
                type="text"
                value={state.beforeContent}
                onChange={(e) => updateState('beforeContent', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md"
                placeholder="输入内容"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">颜色</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={state.beforeColor}
                  onChange={(e) => updateState('beforeColor', e.target.value)}
                  className="w-12 h-9 rounded border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={state.beforeColor}
                  onChange={(e) => updateState('beforeColor', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                字体大小: {state.beforeFontSize}px
              </label>
              <input
                type="range"
                min={8}
                max={48}
                step={1}
                value={state.beforeFontSize}
                onChange={(e) => updateState('beforeFontSize', Number(e.target.value))}
                className="w-full h-1.5 accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ::after controls */}
        <div className="space-y-4 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">::after 伪元素</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={state.afterDisplay}
                onChange={(e) => updateState('afterDisplay', e.target.checked)}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-xs text-muted-foreground">显示</span>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">内容</label>
              <input
                type="text"
                value={state.afterContent}
                onChange={(e) => updateState('afterContent', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md"
                placeholder="输入内容"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">颜色</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={state.afterColor}
                  onChange={(e) => updateState('afterColor', e.target.value)}
                  className="w-12 h-9 rounded border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={state.afterColor}
                  onChange={(e) => updateState('afterColor', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                字体大小: {state.afterFontSize}px
              </label>
              <input
                type="range"
                min={8}
                max={48}
                step={1}
                value={state.afterFontSize}
                onChange={(e) => updateState('afterFontSize', Number(e.target.value))}
                className="w-full h-1.5 accent-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateCSS() || '/* 所有伪元素已禁用 */'}
        </pre>
      </div>
    </div>
  );
}
