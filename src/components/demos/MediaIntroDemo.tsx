'use client';

import { useState, useRef, useEffect } from 'react';

interface Breakpoint {
  name: string;
  min: number;
  max: number;
  color: string;
  label: string;
}

const BREAKPOINTS: Breakpoint[] = [
  { name: 'mobile', min: 0, max: 576, color: '#ef4444', label: '手机' },
  { name: 'tablet', min: 576, max: 768, color: '#f59e0b', label: '平板' },
  { name: 'laptop', min: 768, max: 1024, color: '#10b981', label: '笔记本' },
  { name: 'desktop', min: 1024, max: 9999, color: '#3b82f6', label: '桌面' },
];

export function MediaIntroDemo() {
  const [containerWidth, setContainerWidth] = useState(800);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeBreakpoint = BREAKPOINTS.find(
    (bp) => containerWidth >= bp.min && containerWidth < bp.max
  ) || BREAKPOINTS[BREAKPOINTS.length - 1];

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = Math.max(300, Math.min(1200, e.clientX - rect.left));
    setContainerWidth(Math.round(newWidth));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const generateMediaQuery = () => {
    if (activeBreakpoint.name === 'mobile') {
      return `@media (max-width: ${BREAKPOINTS[1].min - 1}px) {
  /* 手机样式 */
}`;
    } else if (activeBreakpoint.name === 'desktop') {
      return `@media (min-width: ${activeBreakpoint.min}px) {
  /* 桌面样式 */
}`;
    } else {
      return `@media (min-width: ${activeBreakpoint.min}px) and (max-width: ${activeBreakpoint.max - 1}px) {
  /* ${activeBreakpoint.label}样式 */
}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Breakpoint Indicator Bar */}
      <div className="relative h-12 rounded-lg overflow-hidden border border-border">
        <div className="flex h-full">
          {BREAKPOINTS.map((bp, i) => (
            <div
              key={bp.name}
              className="relative flex items-center justify-center text-white font-medium text-xs transition-opacity"
              style={{
                backgroundColor: bp.color,
                width: i === BREAKPOINTS.length - 1 ? '25%' : '25%',
                opacity: bp.name === activeBreakpoint.name ? 1 : 0.4,
              }}
            >
              <div className="text-center">
                <div className="font-bold">{bp.label}</div>
                <div className="text-[10px] opacity-90">
                  {i === BREAKPOINTS.length - 1 ? `≥${bp.min}px` : `${bp.min}-${bp.max}px`}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Active Indicator */}
        <div
          className="absolute top-0 left-0 h-full border-2 border-white transition-all pointer-events-none"
          style={{
            left: `${(BREAKPOINTS.findIndex((bp) => bp.name === activeBreakpoint.name) * 25)}%`,
            width: '25%',
          }}
        />
      </div>

      {/* Resizable Container */}
      <div className="relative" ref={containerRef}>
        <div className="text-sm text-muted-foreground mb-2 flex items-center justify-between">
          <span>拖动右侧边缘调整宽度</span>
          <span className="font-mono font-bold" style={{ color: activeBreakpoint.color }}>
            {containerWidth}px - {activeBreakpoint.label}
          </span>
        </div>

        <div
          className="relative border-2 rounded-lg overflow-hidden transition-colors"
          style={{
            width: `${containerWidth}px`,
            borderColor: activeBreakpoint.color,
            maxWidth: '100%',
          }}
        >
          {/* Preview Content */}
          <div
            className="p-6 transition-all"
            style={{ backgroundColor: `${activeBreakpoint.color}15` }}
          >
            <div className="space-y-4">
              <div
                className="font-bold text-xl"
                style={{ color: activeBreakpoint.color }}
              >
                {activeBreakpoint.label}视图
              </div>
              <div className="text-foreground text-sm">
                当前容器宽度为 <span className="font-mono font-bold">{containerWidth}px</span>
              </div>
              <div className="grid gap-2" style={{
                gridTemplateColumns: containerWidth < 576 ? '1fr' : containerWidth < 768 ? 'repeat(2, 1fr)' : containerWidth < 1024 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'
              }}>
                {Array.from({ length: containerWidth < 576 ? 2 : containerWidth < 768 ? 4 : containerWidth < 1024 ? 6 : 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded bg-white/50 dark:bg-black/20 flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-white/50 dark:hover:bg-white/20 transition-colors"
            style={{ backgroundColor: isDragging ? 'rgba(255,255,255,0.5)' : 'transparent' }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-white/80 rounded-full" />
          </div>
        </div>
      </div>

      {/* Width Slider */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          容器宽度: {containerWidth}px
        </label>
        <input
          type="range"
          min={300}
          max={1200}
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="w-full h-1.5"
          style={{ accentColor: activeBreakpoint.color }}
        />
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setContainerWidth(375)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          手机 (375px)
        </button>
        <button
          onClick={() => setContainerWidth(768)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          平板 (768px)
        </button>
        <button
          onClick={() => setContainerWidth(1024)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          笔记本 (1024px)
        </button>
        <button
          onClick={() => setContainerWidth(1440)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          桌面 (1440px)
        </button>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">当前激活的媒体查询：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {generateMediaQuery()}
        </pre>
      </div>
    </div>
  );
}
