'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type Scenario = 'siblings' | 'parent-child' | 'empty';

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

export function MarginCollapseVisualizer() {
  const [scenario, setScenario] = useState<Scenario>('siblings');
  const [marginTop, setMarginTop] = useState(40);
  const [marginBottom, setMarginBottom] = useState(30);

  const collapsedMargin = Math.max(marginTop, marginBottom);

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      {/* Scenario Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">场景选择</label>
        <div className="flex gap-2">
          <button
            onClick={() => setScenario('siblings')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              scenario === 'siblings'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            相邻兄弟元素
          </button>
          <button
            onClick={() => setScenario('parent-child')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              scenario === 'parent-child'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            父子元素
          </button>
          <button
            onClick={() => setScenario('empty')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              scenario === 'empty'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            空块元素
          </button>
        </div>
      </div>

      {/* Siblings Scenario */}
      {scenario === 'siblings' && (
        <div className="space-y-4">
          <div className="space-y-3">
            <Slider
              label="第一个元素的 margin-bottom"
              value={marginBottom}
              onChange={setMarginBottom}
              min={0}
              max={80}
              unit="px"
            />
            <Slider
              label="第二个元素的 margin-top"
              value={marginTop}
              onChange={setMarginTop}
              min={0}
              max={80}
              unit="px"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">可视化效果</label>
            <div className="bg-muted/30 rounded-lg p-6 space-y-0">
              {/* First Box */}
              <div className="relative">
                <div className="bg-blue-500 text-white p-4 rounded">
                  <span className="text-sm font-medium">第一个元素</span>
                </div>
                {/* Bottom margin visualization */}
                {marginBottom > 0 && (
                  <div
                    style={{ height: `${marginBottom}px` }}
                    className="bg-blue-300/30 border-y-2 border-dashed border-blue-400 relative"
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono bg-background px-2 py-1 rounded border text-blue-600 dark:text-blue-400">
                      margin-bottom: {marginBottom}px
                    </span>
                  </div>
                )}
              </div>

              {/* Collapsed margin indicator */}
              <div
                style={{ height: `${collapsedMargin}px` }}
                className="bg-red-500/20 border-y-2 border-red-500 relative"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 py-1.5 rounded border-2 border-red-500">
                  <p className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                    实际间距: {collapsedMargin}px
                  </p>
                </div>
              </div>

              {/* Second Box */}
              <div className="relative">
                {/* Top margin visualization */}
                {marginTop > 0 && (
                  <div
                    style={{ height: `${marginTop}px` }}
                    className="bg-green-300/30 border-y-2 border-dashed border-green-400 relative"
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono bg-background px-2 py-1 rounded border text-green-600 dark:text-green-400">
                      margin-top: {marginTop}px
                    </span>
                  </div>
                )}
                <div className="bg-green-500 text-white p-4 rounded">
                  <span className="text-sm font-medium">第二个元素</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">折叠规则：</strong>
                相邻元素的 margin-bottom ({marginBottom}px) 和 margin-top ({marginTop}px)
                会折叠为较大的值 {collapsedMargin}px，而不是相加。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Parent-Child Scenario */}
      {scenario === 'parent-child' && (
        <div className="space-y-4">
          <div className="space-y-3">
            <Slider
              label="父元素的 margin-top"
              value={marginTop}
              onChange={setMarginTop}
              min={0}
              max={80}
              unit="px"
            />
            <Slider
              label="子元素的 margin-top"
              value={marginBottom}
              onChange={setMarginBottom}
              min={0}
              max={80}
              unit="px"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">可视化效果</label>
            <div className="bg-muted/30 rounded-lg p-6">
              {/* Collapsed margin above parent */}
              <div
                style={{ height: `${collapsedMargin}px` }}
                className="bg-red-500/20 border-y-2 border-red-500 relative mb-0"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 py-1.5 rounded border-2 border-red-500">
                  <p className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                    实际间距: {collapsedMargin}px
                  </p>
                </div>
              </div>

              {/* Parent box */}
              <div className="border-4 border-blue-500 bg-blue-500/10 p-6 rounded-lg">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-3">
                  父元素 (margin-top: {marginTop}px)
                </div>

                {/* Child box */}
                <div className="bg-green-500 text-white p-4 rounded">
                  <span className="text-sm font-medium">子元素 (margin-top: {marginBottom}px)</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">折叠规则：</strong>
                当父元素没有 border、padding 或内容将它们分隔开时，父元素的 margin-top ({marginTop}px)
                会与第一个子元素的 margin-top ({marginBottom}px) 折叠，取较大值 {collapsedMargin}px。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty Block Scenario */}
      {scenario === 'empty' && (
        <div className="space-y-4">
          <div className="space-y-3">
            <Slider
              label="空元素的 margin-top"
              value={marginTop}
              onChange={setMarginTop}
              min={0}
              max={80}
              unit="px"
            />
            <Slider
              label="空元素的 margin-bottom"
              value={marginBottom}
              onChange={setMarginBottom}
              min={0}
              max={80}
              unit="px"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">可视化效果</label>
            <div className="bg-muted/30 rounded-lg p-6 space-y-0">
              {/* Before element */}
              <div className="bg-blue-500 text-white p-4 rounded">
                <span className="text-sm font-medium">前一个元素</span>
              </div>

              {/* Empty element with collapsed margins */}
              <div
                style={{ height: `${collapsedMargin}px` }}
                className="bg-red-500/20 border-y-2 border-red-500 relative"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 py-1.5 rounded border-2 border-red-500 text-center">
                  <p className="text-xs font-mono font-bold text-red-600 dark:text-red-400 mb-1">
                    空元素（高度为0）
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    margin-top: {marginTop}px<br />
                    margin-bottom: {marginBottom}px<br />
                    实际占用: {collapsedMargin}px
                  </p>
                </div>
              </div>

              {/* After element */}
              <div className="bg-green-500 text-white p-4 rounded">
                <span className="text-sm font-medium">后一个元素</span>
              </div>
            </div>

            <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">折叠规则：</strong>
                如果一个块元素是空的（没有 border、padding、内容、height 或 min-height），
                它的 margin-top ({marginTop}px) 和 margin-bottom ({marginBottom}px)
                会折叠成一个 margin，取较大值 {collapsedMargin}px。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS 参考代码</label>
        <div className="bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto whitespace-pre">
          <code className="text-foreground">
            {scenario === 'siblings' &&
              `.element1 {\n  margin-bottom: ${marginBottom}px;\n}\n\n.element2 {\n  margin-top: ${marginTop}px;\n}\n\n/* 实际间距: ${collapsedMargin}px (取较大值) */`}
            {scenario === 'parent-child' &&
              `.parent {\n  margin-top: ${marginTop}px;\n  /* 无 border、padding 或内容分隔 */\n}\n\n.child {\n  margin-top: ${marginBottom}px;\n}\n\n/* 折叠后的 margin: ${collapsedMargin}px */`}
            {scenario === 'empty' &&
              `.empty-element {\n  /* 空元素，无 height、border、padding、内容 */\n  margin-top: ${marginTop}px;\n  margin-bottom: ${marginBottom}px;\n}\n\n/* 实际占用空间: ${collapsedMargin}px */`}
          </code>
        </div>
      </div>
    </div>
  );
}
