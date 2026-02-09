'use client';

import { useState } from 'react';

// ============================================================
// CSS 盒模型可视化器
// ============================================================

interface BoxValues {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  borderTop: number;
  borderRight: number;
  borderBottom: number;
  borderLeft: number;
  width: number;
  height: number;
  boxSizing: 'content-box' | 'border-box';
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 60,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-7 text-right font-mono">{value}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-current"
      />
      <span className="text-xs w-20 truncate">{label}</span>
    </div>
  );
}

const presets: { name: string; values: Partial<BoxValues> }[] = [
  {
    name: '默认',
    values: { marginTop: 8, marginRight: 8, marginBottom: 8, marginLeft: 8, paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16, borderTop: 2, borderRight: 2, borderBottom: 2, borderLeft: 2, width: 200, height: 100, boxSizing: 'content-box' },
  },
  {
    name: '无内边距',
    values: { marginTop: 16, marginRight: 16, marginBottom: 16, marginLeft: 16, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, borderTop: 1, borderRight: 1, borderBottom: 1, borderLeft: 1, width: 200, height: 100, boxSizing: 'content-box' },
  },
  {
    name: '不对称',
    values: { marginTop: 0, marginRight: 20, marginBottom: 32, marginLeft: 20, paddingTop: 8, paddingRight: 24, paddingBottom: 8, paddingLeft: 24, borderTop: 4, borderRight: 1, borderBottom: 4, borderLeft: 1, width: 200, height: 100, boxSizing: 'content-box' },
  },
  {
    name: 'border-box',
    values: { marginTop: 8, marginRight: 8, marginBottom: 8, marginLeft: 8, paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16, borderTop: 2, borderRight: 2, borderBottom: 2, borderLeft: 2, width: 200, height: 100, boxSizing: 'border-box' },
  },
];

export function BoxModelVisualizer() {
  const [values, setValues] = useState<BoxValues>({
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderTop: 2,
    borderRight: 2,
    borderBottom: 2,
    borderLeft: 2,
    width: 200,
    height: 100,
    boxSizing: 'content-box',
  });

  const set = (key: keyof BoxValues) => (v: number) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  // 计算实际尺寸
  const isContentBox = values.boxSizing === 'content-box';
  let contentW: number, contentH: number;
  if (isContentBox) {
    contentW = values.width;
    contentH = values.height;
  } else {
    contentW = Math.max(0, values.width - values.paddingLeft - values.paddingRight - values.borderLeft - values.borderRight);
    contentH = Math.max(0, values.height - values.paddingTop - values.paddingBottom - values.borderTop - values.borderBottom);
  }

  const paddingBoxW = contentW + values.paddingLeft + values.paddingRight;
  const paddingBoxH = contentH + values.paddingTop + values.paddingBottom;
  const borderBoxW = paddingBoxW + values.borderLeft + values.borderRight;
  const borderBoxH = paddingBoxH + values.borderTop + values.borderBottom;
  const marginBoxW = borderBoxW + values.marginLeft + values.marginRight;
  const marginBoxH = borderBoxH + values.marginTop + values.marginBottom;

  // 可视化用的缩放因子，让图形适配容器
  const maxVisualWidth = 360;
  const scale = Math.min(1, maxVisualWidth / Math.max(marginBoxW, 1));
  const vw = (n: number) => Math.round(n * scale);

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="flex gap-1.5 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => setValues((prev) => ({ ...prev, ...p.values }))}
            className="px-2 py-1 text-xs rounded-md border bg-background hover:bg-accent transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Visual Box */}
      <div className="flex justify-center py-4 overflow-x-auto">
        <div
          className="relative"
          style={{ width: vw(marginBoxW), height: vw(marginBoxH) }}
        >
          {/* Margin area */}
          <div
            className="absolute inset-0 bg-orange-100 dark:bg-orange-950/40"
            title="margin"
          >
            <span className="absolute top-0.5 left-1 text-[10px] text-orange-500 dark:text-orange-400 font-mono">margin</span>
          </div>
          {/* Border area */}
          <div
            className="absolute bg-amber-200 dark:bg-amber-900/50"
            style={{
              top: vw(values.marginTop),
              left: vw(values.marginLeft),
              width: vw(borderBoxW),
              height: vw(borderBoxH),
            }}
            title="border"
          >
            <span className="absolute top-0.5 left-1 text-[10px] text-amber-700 dark:text-amber-400 font-mono">border</span>
          </div>
          {/* Padding area */}
          <div
            className="absolute bg-green-100 dark:bg-green-950/40"
            style={{
              top: vw(values.marginTop + values.borderTop),
              left: vw(values.marginLeft + values.borderLeft),
              width: vw(paddingBoxW),
              height: vw(paddingBoxH),
            }}
            title="padding"
          >
            <span className="absolute top-0.5 left-1 text-[10px] text-green-600 dark:text-green-400 font-mono">padding</span>
          </div>
          {/* Content area */}
          <div
            className="absolute bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center"
            style={{
              top: vw(values.marginTop + values.borderTop + values.paddingTop),
              left: vw(values.marginLeft + values.borderLeft + values.paddingLeft),
              width: vw(contentW),
              height: vw(contentH),
            }}
            title="content"
          >
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono text-center leading-tight">
              content
              <br />
              {contentW}×{contentH}
            </span>
          </div>
        </div>
      </div>

      {/* Size Info */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-muted/50 rounded p-2">
          <span className="text-muted-foreground">content-box: </span>
          <span className="font-mono font-medium">{contentW} × {contentH}</span>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <span className="text-muted-foreground">border-box: </span>
          <span className="font-mono font-medium">{borderBoxW} × {borderBoxH}</span>
        </div>
      </div>

      {/* box-sizing toggle */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium">box-sizing:</label>
        <button
          onClick={() => setValues((prev) => ({ ...prev, boxSizing: prev.boxSizing === 'content-box' ? 'border-box' : 'content-box' }))}
          className={`px-2 py-1 text-xs rounded-md border transition-colors ${values.boxSizing === 'content-box' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
        >
          content-box
        </button>
        <button
          onClick={() => setValues((prev) => ({ ...prev, boxSizing: prev.boxSizing === 'border-box' ? 'content-box' : 'border-box' }))}
          className={`px-2 py-1 text-xs rounded-md border transition-colors ${values.boxSizing === 'border-box' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
        >
          border-box
        </button>
        <span className="text-xs text-muted-foreground ml-2">
          width/height = {isContentBox ? 'content' : 'border + padding + content'}
        </span>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
        <div>
          <p className="text-xs font-medium mb-1 text-orange-600 dark:text-orange-400">Margin</p>
          <Slider label="top" value={values.marginTop} onChange={set('marginTop')} min={-20} />
          <Slider label="right" value={values.marginRight} onChange={set('marginRight')} min={-20} />
          <Slider label="bottom" value={values.marginBottom} onChange={set('marginBottom')} min={-20} />
          <Slider label="left" value={values.marginLeft} onChange={set('marginLeft')} min={-20} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1 text-green-600 dark:text-green-400">Padding</p>
          <Slider label="top" value={values.paddingTop} onChange={set('paddingTop')} />
          <Slider label="right" value={values.paddingRight} onChange={set('paddingRight')} />
          <Slider label="bottom" value={values.paddingBottom} onChange={set('paddingBottom')} />
          <Slider label="left" value={values.paddingLeft} onChange={set('paddingLeft')} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1 text-amber-700 dark:text-amber-400">Border</p>
          <Slider label="top" value={values.borderTop} onChange={set('borderTop')} max={20} />
          <Slider label="right" value={values.borderRight} onChange={set('borderRight')} max={20} />
          <Slider label="bottom" value={values.borderBottom} onChange={set('borderBottom')} max={20} />
          <Slider label="left" value={values.borderLeft} onChange={set('borderLeft')} max={20} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1 text-blue-600 dark:text-blue-400">Size</p>
          <Slider label="width" value={values.width} onChange={set('width')} max={400} />
          <Slider label="height" value={values.height} onChange={set('height')} max={300} />
        </div>
      </div>
    </div>
  );
}
