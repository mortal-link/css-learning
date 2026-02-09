'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';

type UnitCategory = 'absolute' | 'font-relative' | 'viewport-relative';

interface UnitInfo {
  name: string;
  fullName: string;
  category: UnitCategory;
  toPx: (value: number, ctx: ConversionContext) => number;
}

interface ConversionContext {
  rootFontSize: number;    // html font-size in px (default 16)
  parentFontSize: number;  // parent element font-size in px (default 16)
  viewportWidth: number;   // px
  viewportHeight: number;  // px
}

const UNITS: Record<string, UnitInfo> = {
  px: { name: 'px', fullName: 'Pixels', category: 'absolute', toPx: (v) => v },
  cm: { name: 'cm', fullName: 'Centimeters', category: 'absolute', toPx: (v) => v * 96 / 2.54 },
  mm: { name: 'mm', fullName: 'Millimeters', category: 'absolute', toPx: (v) => v * 96 / 25.4 },
  in: { name: 'in', fullName: 'Inches', category: 'absolute', toPx: (v) => v * 96 },
  pt: { name: 'pt', fullName: 'Points', category: 'absolute', toPx: (v) => v * 96 / 72 },
  pc: { name: 'pc', fullName: 'Picas', category: 'absolute', toPx: (v) => v * 96 / 6 },
  em: { name: 'em', fullName: 'Em (parent)', category: 'font-relative', toPx: (v, c) => v * c.parentFontSize },
  rem: { name: 'rem', fullName: 'Root Em', category: 'font-relative', toPx: (v, c) => v * c.rootFontSize },
  vw: { name: 'vw', fullName: 'Viewport Width', category: 'viewport-relative', toPx: (v, c) => v * c.viewportWidth / 100 },
  vh: { name: 'vh', fullName: 'Viewport Height', category: 'viewport-relative', toPx: (v, c) => v * c.viewportHeight / 100 },
  vmin: { name: 'vmin', fullName: 'Viewport Min', category: 'viewport-relative', toPx: (v, c) => v * Math.min(c.viewportWidth, c.viewportHeight) / 100 },
  vmax: { name: 'vmax', fullName: 'Viewport Max', category: 'viewport-relative', toPx: (v, c) => v * Math.max(c.viewportWidth, c.viewportHeight) / 100 },
};

const CATEGORY_LABELS: Record<UnitCategory, string> = {
  absolute: '绝对单位',
  'font-relative': '字体相对单位',
  'viewport-relative': '视口相对单位',
};

const CATEGORY_COLORS: Record<UnitCategory, string> = {
  absolute: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'font-relative': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'viewport-relative': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
};

function formatNum(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return '—';
  if (Math.abs(n) < 0.001 && n !== 0) return n.toExponential(2);
  // Avoid excessive decimals
  const str = n.toPrecision(6);
  return parseFloat(str).toString();
}

export function UnitConverter() {
  const [value, setValue] = useState('16');
  const [fromUnit, setFromUnit] = useState('px');
  const [rootFontSize, setRootFontSize] = useState(16);
  const [parentFontSize, setParentFontSize] = useState(16);
  const previewRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const ctx: ConversionContext = useMemo(() => ({
    rootFontSize,
    parentFontSize,
    viewportWidth: viewport.width,
    viewportHeight: viewport.height,
  }), [rootFontSize, parentFontSize, viewport]);

  const numValue = parseFloat(value);
  const pxValue = useMemo(() => {
    if (Number.isNaN(numValue)) return NaN;
    const info = UNITS[fromUnit];
    return info ? info.toPx(numValue, ctx) : NaN;
  }, [numValue, fromUnit, ctx]);

  const conversions = useMemo(() => {
    if (Number.isNaN(pxValue)) return [];
    return Object.entries(UNITS).map(([unit, info]) => {
      // Convert from px to target unit: inverse of toPx
      // We solve: info.toPx(result, ctx) = pxValue
      // For linear conversions, result = pxValue / info.toPx(1, ctx)
      const oneUnit = info.toPx(1, ctx);
      const converted = oneUnit === 0 ? NaN : pxValue / oneUnit;
      return { unit, info, converted };
    });
  }, [pxValue, ctx]);

  // Clamp preview width
  const previewPx = Number.isNaN(pxValue) ? 0 : Math.min(Math.max(pxValue, 0), 600);

  return (
    <div className="space-y-4">
      {/* Input row */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">数值</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-28 px-3 py-2 text-sm font-mono border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">单位</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(UNITS).map(([key, info]) => (
              <option key={key} value={key}>
                {info.name} ({info.fullName})
              </option>
            ))}
          </select>
        </div>
        {!Number.isNaN(pxValue) && (
          <div className="text-sm text-muted-foreground">
            = <span className="font-mono font-medium text-foreground">{formatNum(pxValue)}px</span>
          </div>
        )}
      </div>

      {/* Context settings */}
      <details className="text-xs">
        <summary className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
          转换上下文设置
        </summary>
        <div className="mt-2 flex flex-wrap gap-4 pl-4">
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground">Root font-size:</span>
            <input
              type="number"
              value={rootFontSize}
              onChange={(e) => setRootFontSize(Number(e.target.value) || 16)}
              className="w-16 px-2 py-1 text-xs font-mono border rounded bg-background"
            />
            <span className="text-muted-foreground">px</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground">Parent font-size:</span>
            <input
              type="number"
              value={parentFontSize}
              onChange={(e) => setParentFontSize(Number(e.target.value) || 16)}
              className="w-16 px-2 py-1 text-xs font-mono border rounded bg-background"
            />
            <span className="text-muted-foreground">px</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground">Viewport:</span>
            <input
              type="number"
              value={viewport.width}
              onChange={(e) => setViewport((v) => ({ ...v, width: Number(e.target.value) || 1920 }))}
              className="w-16 px-2 py-1 text-xs font-mono border rounded bg-background"
            />
            <span className="text-muted-foreground">x</span>
            <input
              type="number"
              value={viewport.height}
              onChange={(e) => setViewport((v) => ({ ...v, height: Number(e.target.value) || 1080 }))}
              className="w-16 px-2 py-1 text-xs font-mono border rounded bg-background"
            />
          </label>
        </div>
      </details>

      {/* Visual preview bar */}
      {!Number.isNaN(pxValue) && pxValue > 0 && (
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">实时预览 ({formatNum(pxValue)}px)</div>
          <div className="relative h-8 bg-muted rounded-md overflow-hidden">
            <div
              ref={previewRef}
              className="absolute inset-y-0 left-0 bg-primary/20 border-r-2 border-primary transition-all duration-200"
              style={{ width: `${Math.min((previewPx / 600) * 100, 100)}%` }}
            />
            <div className="absolute inset-0 flex items-center px-3">
              <span className="text-xs font-mono text-foreground/70">
                {formatNum(numValue)}{fromUnit}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0px</span>
            <span>600px</span>
          </div>
        </div>
      )}

      {/* Conversion table */}
      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto] text-xs">
          {/* Group by category */}
          {(['absolute', 'font-relative', 'viewport-relative'] as UnitCategory[]).map((cat) => {
            const items = conversions.filter((c) => c.info.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="contents">
                <div className="col-span-3 px-3 py-1.5 bg-muted/50 font-medium text-muted-foreground border-b">
                  {CATEGORY_LABELS[cat]}
                </div>
                {items.map(({ unit, info, converted }) => (
                  <div key={unit} className={`contents ${unit === fromUnit ? 'bg-primary/5' : ''}`}>
                    <div className={`px-3 py-1.5 border-b flex items-center gap-2 ${unit === fromUnit ? 'bg-primary/5' : ''}`}>
                      <Badge variant="outline" className={`text-[10px] ${CATEGORY_COLORS[cat]}`}>
                        {info.name}
                      </Badge>
                    </div>
                    <div className={`px-3 py-1.5 border-b font-mono text-right ${unit === fromUnit ? 'bg-primary/5 font-medium' : ''}`}>
                      {formatNum(converted)}
                    </div>
                    <div className={`px-3 py-1.5 border-b text-muted-foreground ${unit === fromUnit ? 'bg-primary/5' : ''}`}>
                      {info.fullName}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
