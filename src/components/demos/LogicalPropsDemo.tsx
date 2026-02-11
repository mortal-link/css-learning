'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type WritingMode = 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = 'px',
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <Badge variant="secondary">
          {value}
          {unit}
        </Badge>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

export function LogicalPropsDemo() {
  const [writingMode, setWritingMode] = useState<WritingMode>('horizontal-tb');
  const [marginInline, setMarginInline] = useState(20);
  const [marginBlock, setMarginBlock] = useState(30);
  const [paddingInline, setPaddingInline] = useState(16);
  const [paddingBlock, setPaddingBlock] = useState(12);
  const [borderInline, setBorderInline] = useState(3);

  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'English (LTR)':
        setWritingMode('horizontal-tb');
        setMarginInline(20);
        setMarginBlock(30);
        setPaddingInline(16);
        setPaddingBlock(12);
        setBorderInline(3);
        break;
      case 'Arabic (RTL)':
        setWritingMode('horizontal-tb');
        setMarginInline(24);
        setMarginBlock(20);
        setPaddingInline(20);
        setPaddingBlock(10);
        setBorderInline(2);
        break;
      case 'Japanese (vertical)':
        setWritingMode('vertical-rl');
        setMarginInline(16);
        setMarginBlock(24);
        setPaddingInline(12);
        setPaddingBlock(16);
        setBorderInline(4);
        break;
    }
  };

  // Map logical properties to physical properties based on writing mode
  const getPhysicalProps = () => {
    switch (writingMode) {
      case 'horizontal-tb':
        return {
          marginLeft: `${marginInline}px`,
          marginRight: `${marginInline}px`,
          marginTop: `${marginBlock}px`,
          marginBottom: `${marginBlock}px`,
          paddingLeft: `${paddingInline}px`,
          paddingRight: `${paddingInline}px`,
          paddingTop: `${paddingBlock}px`,
          paddingBottom: `${paddingBlock}px`,
          borderLeft: `${borderInline}px solid`,
          borderRight: `${borderInline}px solid`,
        };
      case 'vertical-rl':
      case 'vertical-lr':
        return {
          marginTop: `${marginInline}px`,
          marginBottom: `${marginInline}px`,
          marginLeft: `${marginBlock}px`,
          marginRight: `${marginBlock}px`,
          paddingTop: `${paddingInline}px`,
          paddingBottom: `${paddingInline}px`,
          paddingLeft: `${paddingBlock}px`,
          paddingRight: `${paddingBlock}px`,
          borderTop: `${borderInline}px solid`,
          borderBottom: `${borderInline}px solid`,
        };
    }
  };

  const physicalProps = getPhysicalProps();

  const generateLogicalCSS = (): string => {
    return [
      `writing-mode: ${writingMode};`,
      `margin-inline: ${marginInline}px;`,
      `margin-block: ${marginBlock}px;`,
      `padding-inline: ${paddingInline}px;`,
      `padding-block: ${paddingBlock}px;`,
      `border-inline: ${borderInline}px solid;`,
    ].join('\n');
  };

  const generatePhysicalCSS = (): string => {
    const lines = [`writing-mode: ${writingMode};`];
    if (writingMode === 'horizontal-tb') {
      lines.push(
        `margin: ${marginBlock}px ${marginInline}px;`,
        `padding: ${paddingBlock}px ${paddingInline}px;`,
        `border-left: ${borderInline}px solid;`,
        `border-right: ${borderInline}px solid;`
      );
    } else {
      lines.push(
        `margin: ${marginInline}px ${marginBlock}px;`,
        `padding: ${paddingInline}px ${paddingBlock}px;`,
        `border-top: ${borderInline}px solid;`,
        `border-bottom: ${borderInline}px solid;`
      );
    }
    return lines.join('\n');
  };

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Writing Mode Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">书写模式 (writing-mode)</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setWritingMode('horizontal-tb')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              writingMode === 'horizontal-tb'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            horizontal-tb
          </button>
          <button
            onClick={() => setWritingMode('vertical-rl')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              writingMode === 'vertical-rl'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            vertical-rl
          </button>
          <button
            onClick={() => setWritingMode('vertical-lr')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              writingMode === 'vertical-lr'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            vertical-lr
          </button>
        </div>
      </div>

      {/* Logical Properties Controls */}
      <div className="space-y-3">
        <label className="text-sm font-medium">逻辑属性控制</label>
        <div className="grid md:grid-cols-2 gap-4">
          <Slider
            label="margin-inline (内联方向)"
            value={marginInline}
            onChange={setMarginInline}
            min={0}
            max={60}
            unit="px"
          />
          <Slider
            label="margin-block (块方向)"
            value={marginBlock}
            onChange={setMarginBlock}
            min={0}
            max={60}
            unit="px"
          />
          <Slider
            label="padding-inline"
            value={paddingInline}
            onChange={setPaddingInline}
            min={0}
            max={40}
            unit="px"
          />
          <Slider
            label="padding-block"
            value={paddingBlock}
            onChange={setPaddingBlock}
            min={0}
            max={40}
            unit="px"
          />
          <Slider
            label="border-inline"
            value={borderInline}
            onChange={setBorderInline}
            min={0}
            max={10}
            unit="px"
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">预设方案</label>
        <div className="flex flex-wrap gap-2">
          {['English (LTR)', 'Arabic (RTL)', 'Japanese (vertical)'].map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">可视化预览</label>
        <div className="bg-muted/30 rounded-lg p-8 overflow-auto">
          <div
            style={{
              writingMode: writingMode,
              marginInline: `${marginInline}px`,
              marginBlock: `${marginBlock}px`,
              paddingInline: `${paddingInline}px`,
              paddingBlock: `${paddingBlock}px`,
              borderInlineWidth: `${borderInline}px`,
              borderInlineStyle: 'solid',
              borderInlineColor: 'hsl(var(--primary))',
            }}
            className="bg-blue-500/10 inline-block max-w-full"
          >
            <div className="bg-background p-4 text-sm">
              示例文本内容 Example Text Content
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          蓝色边框 = border-inline / 蓝色背景区域 = padding / 外部空白 = margin
        </p>
      </div>

      {/* Property Mapping */}
      <div className="space-y-2">
        <label className="text-sm font-medium">逻辑属性 → 物理属性映射</label>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">逻辑属性 (Logical)</p>
            <div className="space-y-1 text-xs font-mono">
              <div className="text-blue-600 dark:text-blue-400">margin-inline: {marginInline}px</div>
              <div className="text-blue-600 dark:text-blue-400">margin-block: {marginBlock}px</div>
              <div className="text-green-600 dark:text-green-400">padding-inline: {paddingInline}px</div>
              <div className="text-green-600 dark:text-green-400">padding-block: {paddingBlock}px</div>
              <div className="text-purple-600 dark:text-purple-400">border-inline: {borderInline}px</div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">
              物理属性 (Physical) - {writingMode}
            </p>
            <div className="space-y-1 text-xs font-mono text-muted-foreground">
              {writingMode === 'horizontal-tb' ? (
                <>
                  <div>margin-left/right: {marginInline}px</div>
                  <div>margin-top/bottom: {marginBlock}px</div>
                  <div>padding-left/right: {paddingInline}px</div>
                  <div>padding-top/bottom: {paddingBlock}px</div>
                  <div>border-left/right: {borderInline}px</div>
                </>
              ) : (
                <>
                  <div>margin-top/bottom: {marginInline}px</div>
                  <div>margin-left/right: {marginBlock}px</div>
                  <div>padding-top/bottom: {paddingInline}px</div>
                  <div>padding-left/right: {paddingBlock}px</div>
                  <div>border-top/bottom: {borderInline}px</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="space-y-3">
        <label className="text-sm font-medium">CSS 代码</label>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">逻辑属性（推荐，自动适配书写方向）</p>
          <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
            <code className="text-foreground">{generateLogicalCSS()}</code>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">物理属性（传统方式，需手动适配）</p>
          <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
            <code className="text-foreground">{generatePhysicalCSS()}</code>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-lg p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">逻辑属性的优势：</strong>
          使用逻辑属性（inline/block）而不是物理属性（left/right/top/bottom）可以让样式自动适应不同的书写模式和方向，
          无需为 RTL（从右到左）或垂直文本编写额外的 CSS。这对于国际化应用特别有用。
        </p>
      </div>
    </div>
  );
}
