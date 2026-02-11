'use client';

import { useState, useRef, useEffect, useCallback, type CSSProperties } from 'react';

type AlignItems = 'baseline' | 'stretch' | 'center' | 'flex-start' | 'flex-end';
type BaselineType = 'first baseline' | 'last baseline';

/** 测量文本基线相对于容器顶部的 y 位置 */
function measureBaseline(container: HTMLElement, item: HTMLElement): number | null {
  // 找到 item 内的第一个文本节点对应的 span
  const textEl = item.querySelector('[data-baseline-text]') as HTMLElement | null;
  if (!textEl) return null;
  const containerRect = container.getBoundingClientRect();
  const textRect = textEl.getBoundingClientRect();
  // 基线约在文本底部往上 ~15% 字体高度处(近似)
  const fontSize = parseFloat(getComputedStyle(textEl).fontSize);
  return textRect.bottom - containerRect.top - fontSize * 0.18;
}

/** 测量合成基线(border-edge bottom) */
function measureSynthesizedBaseline(container: HTMLElement, item: HTMLElement): number | null {
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  // Flex/Grid items synthesize from border edge bottom
  return itemRect.bottom - containerRect.top;
}

/** 水平参考线组件 */
function ReferenceLine({ y, color, label, dashed = true }: {
  y: number;
  color: string;
  label?: string;
  dashed?: boolean;
}) {
  return (
    <div
      className="absolute left-0 right-0 pointer-events-none"
      style={{ top: y, zIndex: 20 }}
    >
      <div
        className="w-full"
        style={{
          borderTop: `2px ${dashed ? 'dashed' : 'solid'} ${color}`,
        }}
      />
      {label && (
        <span
          className="absolute right-1 text-xs font-bold px-1 rounded"
          style={{
            color,
            top: -16,
            backgroundColor: 'rgba(255,255,255,0.9)',
            fontSize: '11px',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Panel 1: Flex Baseline Alignment ────────────────────────────
function FlexBaselinePanel() {
  const [alignItems, setAlignItems] = useState<AlignItems>('baseline');
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [baselineY, setBaselineY] = useState<number | null>(null);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    if (alignItems !== 'baseline') { setBaselineY(null); return; }
    // 取第一个有文本的 item 的基线
    for (const item of itemRefs.current) {
      if (!item) continue;
      const y = measureBaseline(containerRef.current, item);
      if (y != null) { setBaselineY(y); return; }
    }
    setBaselineY(null);
  }, [alignItems]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const items: { label: string; fontSize: string; padding: string; extra?: CSSProperties }[] = [
    { label: '大字 Ag', fontSize: '28px', padding: '8px 16px' },
    { label: 'Normal text', fontSize: '16px', padding: '8px 16px' },
    { label: '小字 xy', fontSize: '13px', padding: '8px 16px' },
    { label: '高盒子', fontSize: '16px', padding: '32px 16px' },
    { label: '图片替代', fontSize: '14px', padding: '8px 12px', extra: { minHeight: 64 } },
  ];
  const colors = [
    { bg: '#dbeafe', border: '#3b82f6', text: '#1e3a5f' },
    { bg: '#dcfce7', border: '#22c55e', text: '#14532d' },
    { bg: '#fef9c3', border: '#eab308', text: '#713f12' },
    { bg: '#fce7f3', border: '#ec4899', text: '#831843' },
    { bg: '#e0e7ff', border: '#6366f1', text: '#312e81' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-gray-700">align-items:</span>
        {(['baseline', 'stretch', 'center', 'flex-start', 'flex-end'] as AlignItems[]).map((v) => (
          <button
            key={v}
            onClick={() => setAlignItems(v)}
            className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
              alignItems === v
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div
          ref={containerRef}
          className="relative rounded-lg p-5"
          style={{
            display: 'flex',
            alignItems,
            gap: 16,
            minHeight: 180,
            background: '#f8fafc',
            border: '2px solid #c4b5fd',
          }}
        >
          {baselineY != null && (
            <ReferenceLine y={baselineY} color="#ef4444" label="baseline" />
          )}

          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="rounded-md flex-shrink-0"
              style={{
                background: colors[i].bg,
                border: `2px solid ${colors[i].border}`,
                padding: item.padding,
                color: colors[i].text,
                ...item.extra,
              }}
            >
              <span
                data-baseline-text
                className="font-bold whitespace-nowrap"
                style={{ fontSize: item.fontSize }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {alignItems === 'baseline' && (
          <p className="text-sm text-red-600 mt-3 text-center font-medium">
            ↑ 红色虚线 = 所有项目共享的 alphabetic baseline
          </p>
        )}
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono leading-relaxed">
        <pre>{`.flex-container {\n  display: flex;\n  align-items: ${alignItems};\n}`}</pre>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-blue-900 mb-1">说明</p>
        {alignItems === 'baseline' ? (
          <p>
            <strong>baseline</strong> 对齐：所有 flex 项的文本基线（字母如 x 坐在的线）对齐在同一位置。
            不同字号的文本底部对齐到同一条基线上，而非按盒子的顶部或底部对齐。
          </p>
        ) : (
          <p>
            当前 <code className="bg-blue-100 px-1 rounded">{alignItems}</code>：
            {alignItems === 'stretch' ? '项目在交叉轴方向拉伸填满容器（默认行为）' :
             alignItems === 'center' ? '项目在交叉轴上居中对齐' :
             alignItems === 'flex-start' ? '项目对齐到交叉轴起始边' : '项目对齐到交叉轴结束边'}。
            切换到 <code className="bg-blue-100 px-1 rounded">baseline</code> 查看基线参考线。
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Panel 2: Synthesized Baselines ──────────────────────────────
function SynthesizedPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textItemRef = useRef<HTMLDivElement>(null);
  const emptyItemRef = useRef<HTMLDivElement>(null);
  const overflowItemRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ textY: number | null; emptyY: number | null; overflowY: number | null }>({
    textY: null, emptyY: null, overflowY: null,
  });

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const c = containerRef.current;
    setLines({
      textY: textItemRef.current ? measureBaseline(c, textItemRef.current) : null,
      emptyY: emptyItemRef.current ? measureSynthesizedBaseline(c, emptyItemRef.current) : null,
      overflowY: overflowItemRef.current ? measureSynthesizedBaseline(c, overflowItemRef.current) : null,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const scenarios = [
    {
      title: '有文本内容',
      subtitle: '自然基线',
      ref: textItemRef,
      color: '#22c55e',
      bgColor: '#dcfce7',
      borderColor: '#4ade80',
      lineY: lines.textY,
      lineLabel: 'alphabetic baseline',
      edge: '文本字形基线',
      hasText: true,
    },
    {
      title: '空盒子（无文本）',
      subtitle: '合成基线',
      ref: emptyItemRef,
      color: '#f97316',
      bgColor: '#fff7ed',
      borderColor: '#fb923c',
      lineY: lines.emptyY,
      lineLabel: 'border-edge bottom',
      edge: 'border 底边（Flex 项）',
      hasText: false,
    },
    {
      title: 'overflow: hidden',
      subtitle: '合成基线',
      ref: overflowItemRef,
      color: '#a855f7',
      bgColor: '#faf5ff',
      borderColor: '#c084fc',
      lineY: lines.overflowY,
      lineLabel: 'border-edge bottom',
      edge: 'border 底边（滚动容器）',
      hasText: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div
          ref={containerRef}
          className="relative rounded-lg p-6"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 32,
            justifyContent: 'center',
            minHeight: 160,
            background: '#f8fafc',
            border: '2px solid #c4b5fd',
          }}
        >
          {/* Reference lines for each scenario */}
          {scenarios.map((s, i) =>
            s.lineY != null ? (
              <ReferenceLine key={i} y={s.lineY} color={s.color} label={s.lineLabel} />
            ) : null
          )}

          {/* Item 1: has text */}
          <div
            ref={textItemRef}
            className="rounded-md text-center"
            style={{
              background: scenarios[0].bgColor,
              border: `2px solid ${scenarios[0].borderColor}`,
              padding: '12px 20px',
            }}
          >
            <span data-baseline-text className="text-lg font-bold" style={{ color: '#14532d' }}>
              文字 Ag
            </span>
          </div>

          {/* Item 2: empty */}
          <div
            ref={emptyItemRef}
            className="rounded-md flex items-center justify-center"
            style={{
              background: scenarios[1].bgColor,
              border: `2px solid ${scenarios[1].borderColor}`,
              width: 80,
              height: 80,
            }}
          >
            <span className="text-xs font-semibold" style={{ color: '#9a3412' }}>空盒子</span>
          </div>

          {/* Item 3: overflow hidden */}
          <div
            ref={overflowItemRef}
            className="rounded-md overflow-hidden"
            style={{
              background: scenarios[2].bgColor,
              border: `2px solid ${scenarios[2].borderColor}`,
              width: 80,
              height: 80,
            }}
          >
            <p className="text-xs p-2 font-semibold" style={{ color: '#581c87' }}>overflow: hidden 内容被隐藏...</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          {scenarios.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-0 border-t-2 border-dashed" style={{ borderColor: s.color }} />
              <span className="text-sm" style={{ color: s.color }}>
                <strong>{s.title}</strong>：{s.edge}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-amber-900 mb-2">合成基线规则（CSS Align 3 §9.1）</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-amber-200">
              <th className="py-1 pr-3 font-semibold">格式化上下文</th>
              <th className="py-1 font-semibold">合成基线使用的边缘</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-amber-100">
              <td className="py-1.5 pr-3">行内级盒 (inline-level)</td>
              <td className="py-1.5"><code className="bg-amber-100 px-1 rounded">margin edge</code></td>
            </tr>
            <tr className="border-b border-amber-100">
              <td className="py-1.5 pr-3">表格单元格 (table cell)</td>
              <td className="py-1.5"><code className="bg-amber-100 px-1 rounded">content edge</code></td>
            </tr>
            <tr>
              <td className="py-1.5 pr-3">Flex / Grid 项</td>
              <td className="py-1.5"><code className="bg-amber-100 px-1 rounded">border edge</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Panel 3: First vs Last Baseline ─────────────────────────────
function FirstLastPanel() {
  const [baselineType, setBaselineType] = useState<BaselineType>('first baseline');
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineY, setLineY] = useState<number | null>(null);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const c = containerRef.current;
    // For first baseline: measure first text line of first item
    // For last baseline: measure last text line of first multi-line item
    if (baselineType === 'first baseline') {
      for (const item of itemRefs.current) {
        if (!item) continue;
        const y = measureBaseline(c, item);
        if (y != null) { setLineY(y); return; }
      }
    } else {
      // last baseline: find last text span
      for (const item of itemRefs.current) {
        if (!item) continue;
        const lastSpan = item.querySelector('[data-last-baseline]') as HTMLElement | null;
        if (!lastSpan) continue;
        const containerRect = c.getBoundingClientRect();
        const textRect = lastSpan.getBoundingClientRect();
        const fontSize = parseFloat(getComputedStyle(lastSpan).fontSize);
        setLineY(textRect.bottom - containerRect.top - fontSize * 0.18);
        return;
      }
    }
    setLineY(null);
  }, [baselineType]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const lineColor = baselineType === 'first baseline' ? '#ef4444' : '#3b82f6';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-gray-700">align-items:</span>
        {(['first baseline', 'last baseline'] as BaselineType[]).map((v) => (
          <button
            key={v}
            onClick={() => setBaselineType(v)}
            className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
              baselineType === v
                ? (v === 'first baseline' ? 'bg-red-500' : 'bg-blue-500') + ' text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div
          ref={containerRef}
          className="relative rounded-lg p-5"
          style={{
            display: 'flex',
            alignItems: baselineType,
            gap: 16,
            minHeight: 180,
            background: '#f8fafc',
            border: '2px solid #c4b5fd',
          }}
        >
          {lineY != null && (
            <ReferenceLine y={lineY} color={lineColor} label={baselineType} />
          )}

          {/* Single line item */}
          <div
            ref={(el) => { itemRefs.current[0] = el; }}
            className="rounded-md flex-shrink-0"
            style={{ background: '#dcfce7', border: '2px solid #22c55e', padding: '10px 16px', color: '#14532d' }}
          >
            <span data-baseline-text data-last-baseline className="text-base font-bold">
              单行文本
            </span>
          </div>

          {/* Multi-line item */}
          <div
            ref={(el) => { itemRefs.current[1] = el; }}
            className="rounded-md"
            style={{ background: '#dbeafe', border: '2px solid #3b82f6', padding: '10px 16px', maxWidth: 160, color: '#1e3a5f' }}
          >
            <p className="text-base leading-7 font-semibold">
              <span data-baseline-text>第一行文字在这里,</span>
              <br />
              <span>第二行文字在这里,</span>
              <br />
              <span data-last-baseline>第三行文字结束。</span>
            </p>
          </div>

          {/* Another multi-line item */}
          <div
            ref={(el) => { itemRefs.current[2] = el; }}
            className="rounded-md"
            style={{ background: '#fef9c3', border: '2px solid #eab308', padding: '10px 16px', maxWidth: 150, color: '#713f12' }}
          >
            <p className="text-base leading-7 font-semibold">
              <span data-baseline-text>另一个多行盒子,</span>
              <br />
              <span data-last-baseline>包含两行文字。</span>
            </p>
          </div>
        </div>

        <p className="text-sm mt-3 text-center font-medium" style={{ color: lineColor }}>
          ↑ {baselineType === 'first baseline' ? '红色虚线 = first baseline（首行文本基线）' : '蓝色虚线 = last baseline（末行文本基线）'}
        </p>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono leading-relaxed">
        <pre>{`.flex-container {\n  display: flex;\n  align-items: ${baselineType};\n}`}</pre>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-blue-900 mb-1">说明</p>
        {baselineType === 'first baseline' ? (
          <p>
            <strong>first baseline</strong>：取每个项目 <em>首行文本</em> 的 alphabetic baseline，
            然后在同一水平线上对齐。这是 <code className="bg-blue-100 px-1 rounded">baseline</code> 的默认行为。
          </p>
        ) : (
          <p>
            <strong>last baseline</strong>：取每个项目 <em>末行文本</em> 的 alphabetic baseline，
            然后在同一水平线上对齐。适用于需要底部文本对齐的场景，如表格行。
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Panel 4: Baseline Sharing Groups ────────────────────────────
function SharingGroupPanel() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [line1Y, setLine1Y] = useState<number | null>(null);
  const [line2Y, setLine2Y] = useState<number | null>(null);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const c = containerRef.current;
    // Measure first item in each "line"
    if (line1Ref.current) {
      const y = measureBaseline(c, line1Ref.current);
      setLine1Y(y);
    }
    if (line2Ref.current) {
      const y = measureBaseline(c, line2Ref.current);
      setLine2Y(y);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        {/* Use two separate flex rows to guarantee line separation */}
        <div ref={containerRef} className="relative space-y-4">
          {/* Flex line 1 */}
          <div className="relative rounded-lg p-4" style={{
            display: 'flex', alignItems: 'baseline', gap: 12,
            background: '#fef2f2', border: '2px solid #fca5a5',
          }}>
            {line1Y != null && (
              <ReferenceLine y={line1Y} color="#ef4444" label="Line 1 baseline" />
            )}
            <div ref={line1Ref} className="rounded-md" style={{ background: '#fee2e2', border: '2px solid #ef4444', padding: '8px 14px', color: '#7f1d1d' }}>
              <span data-baseline-text className="text-2xl font-bold">行1-A</span>
            </div>
            <div className="rounded-md" style={{ background: '#fee2e2', border: '2px solid #ef4444', padding: '8px 14px', color: '#7f1d1d' }}>
              <span data-baseline-text className="text-base font-bold">行1-B</span>
            </div>
            <div className="rounded-md" style={{ background: '#fee2e2', border: '2px solid #ef4444', padding: '8px 14px', color: '#7f1d1d' }}>
              <span data-baseline-text className="text-sm font-bold">行1-C</span>
            </div>
            <span className="absolute top-1 right-2 text-xs text-red-400 font-semibold">Flex Line 1（基线共享组 1）</span>
          </div>

          {/* Flex line 2 */}
          <div className="relative rounded-lg p-4" style={{
            display: 'flex', alignItems: 'baseline', gap: 12,
            background: '#f0fdf4', border: '2px solid #86efac',
          }}>
            {line2Y != null && (
              <ReferenceLine y={line2Y} color="#22c55e" label="Line 2 baseline" />
            )}
            <div ref={line2Ref} className="rounded-md" style={{ background: '#dcfce7', border: '2px solid #16a34a', padding: '8px 14px', color: '#14532d' }}>
              <span data-baseline-text className="text-xl font-bold">行2-A</span>
            </div>
            <div className="rounded-md" style={{ background: '#dcfce7', border: '2px solid #16a34a', padding: '8px 14px', color: '#14532d' }}>
              <span data-baseline-text className="text-base font-bold">行2-B</span>
            </div>
            <div className="rounded-md" style={{ background: '#dcfce7', border: '2px solid #16a34a', padding: '8px 14px', color: '#14532d' }}>
              <span data-baseline-text className="text-lg font-bold">行2-C</span>
            </div>
            <span className="absolute top-1 right-2 text-xs text-green-500 font-semibold">Flex Line 2（基线共享组 2）</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-0 border-t-2 border-dashed border-red-500" />
            <span className="text-sm text-red-600 font-medium">第一行基线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-0 border-t-2 border-dashed border-green-500" />
            <span className="text-sm text-green-600 font-medium">第二行基线</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono leading-relaxed">
        <pre>{`.flex-container {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n/* 同一 flex line 内的项组成一个 baseline-sharing group */\n/* 不同 flex line 之间基线独立，互不影响 */`}</pre>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-green-900 mb-2">基线共享组规则（CSS Align 3 §9.2）</p>
        <ul className="space-y-1.5 list-disc list-inside">
          <li><strong>同一 flex line</strong> 内的项目组成一个 baseline-sharing group，基线对齐只在组内发生</li>
          <li>不同 flex line 之间的项目 <strong>不会相互影响</strong>，各自有独立的 baseline</li>
          <li>兼容条件：相同 block flow direction + 相同 baseline preference，或两者均相反</li>
          <li>Grid 布局中同理：同一行/列的项目共享对齐上下文</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export function BaselineAlignmentDemo() {
  const [panel, setPanel] = useState<'flex' | 'synthesized' | 'first-last' | 'sharing'>('flex');

  const tabs = [
    { id: 'flex' as const, label: 'Flex 基线对齐' },
    { id: 'synthesized' as const, label: '合成基线' },
    { id: 'first-last' as const, label: '首尾基线' },
    { id: 'sharing' as const, label: '基线共享组' },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Tab Bar */}
      <div className="flex gap-1.5 p-1 bg-gray-100 rounded-lg flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPanel(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              panel === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {panel === 'flex' && <FlexBaselinePanel />}
      {panel === 'synthesized' && <SynthesizedPanel />}
      {panel === 'first-last' && <FirstLastPanel />}
      {panel === 'sharing' && <SharingGroupPanel />}
    </div>
  );
}
