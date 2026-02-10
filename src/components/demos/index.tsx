'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// ============================================================
// Demo 组件注册表
// 按 moduleId -> sectionId 映射到对应的交互 demo
// ============================================================

const SpecificityCalculator = dynamic(
  () => import('./SpecificityCalculator').then((m) => m.SpecificityCalculator),
  { ssr: false }
) as ComponentType;

const BoxModelVisualizer = dynamic(
  () => import('./BoxModelVisualizer').then((m) => m.BoxModelVisualizer),
  { ssr: false }
) as ComponentType;

const CSSTokenizer = dynamic(
  () => import('./CSSTokenizer').then((m) => m.CSSTokenizer),
  { ssr: false }
) as ComponentType;

const CSSValueParser = dynamic(
  () => import('./CSSValueParser').then((m) => m.CSSValueParser),
  { ssr: false }
) as ComponentType;

const UnitConverter = dynamic(
  () => import('./UnitConverter').then((m) => m.UnitConverter),
  { ssr: false }
) as ComponentType;

const ValuePipeline = dynamic(
  () => import('./ValuePipeline').then((m) => m.ValuePipeline),
  { ssr: false }
) as ComponentType;

const SelectorMatcher = dynamic(
  () => import('./SelectorMatcher').then((m) => m.SelectorMatcher),
  { ssr: false }
) as ComponentType;

const CascadeOriginDemo = dynamic(
  () => import('./CascadeOriginDemo').then((m) => m.CascadeOriginDemo),
  { ssr: false }
) as ComponentType;

const InheritanceDemo = dynamic(
  () => import('./InheritanceDemo').then((m) => m.InheritanceDemo),
  { ssr: false }
) as ComponentType;

const MarginCollapseDemo = dynamic(
  () => import('./MarginCollapseDemo').then((m) => m.MarginCollapseDemo),
  { ssr: false }
) as ComponentType;

const TransformPlayground = dynamic(
  () => import('./TransformPlayground').then((m) => m.TransformPlayground),
  { ssr: false }
) as ComponentType;

const GradientBuilder = dynamic(
  () => import('./GradientBuilder').then((m) => m.GradientBuilder),
  { ssr: false }
) as ComponentType;

const StackingContextDemo = dynamic(
  () => import('./StackingContextDemo').then((m) => m.StackingContextDemo),
  { ssr: false }
) as ComponentType;

const EasingVisualizer = dynamic(
  () => import('./EasingVisualizer').then((m) => m.EasingVisualizer),
  { ssr: false }
) as ComponentType;

const PositionDemo = dynamic(
  () => import('./PositionDemo').then((m) => m.PositionDemo),
  { ssr: false }
) as ComponentType;

const ContainerQueryDemo = dynamic(
  () => import('./ContainerQueryDemo').then((m) => m.ContainerQueryDemo),
  { ssr: false }
) as ComponentType;

const FilterPlayground = dynamic(
  () => import('./FilterPlayground').then((m) => m.FilterPlayground),
  { ssr: false }
) as ComponentType;

const ColorSpaceExplorer = dynamic(
  () => import('./ColorSpaceExplorer').then((m) => m.ColorSpaceExplorer),
  { ssr: false }
) as ComponentType;

const ContainingBlockDemo = dynamic(
  () => import('./ContainingBlockDemo').then((m) => m.ContainingBlockDemo),
  { ssr: false }
) as ComponentType;

const TextLayoutDemo = dynamic(
  () => import('./TextLayoutDemo').then((m) => m.TextLayoutDemo),
  { ssr: false }
) as ComponentType;

const FontStackDemo = dynamic(
  () => import('./FontStackDemo').then((m) => m.FontStackDemo),
  { ssr: false }
) as ComponentType;

const CounterDemo = dynamic(
  () => import('./CounterDemo').then((m) => m.CounterDemo),
  { ssr: false }
) as ComponentType;

const MediaQueryTester = dynamic(
  () => import('./MediaQueryTester').then((m) => m.MediaQueryTester),
  { ssr: false }
) as ComponentType;

/** demo 注册表：moduleId → sectionId → Component */
export const demoRegistry: Record<string, Record<string, ComponentType>> = {
  cascade: {
    cascading: SpecificityCalculator,
    'value-stages': ValuePipeline,
    filtering: CascadeOriginDemo,
    defaulting: InheritanceDemo,
  },
  'box-model': {
    'box-model': BoxModelVisualizer,
    margins: MarginCollapseDemo,
  },
  syntax: {
    'syntax-overview': CSSTokenizer,
    'numeric-values': CSSValueParser,
    'length-units': UnitConverter,
  },
  selectors: {
    'selector-overview': SelectorMatcher,
    'specificity-calculation': SpecificityCalculator,
  },
  'colors-backgrounds': {
    gradients: GradientBuilder,
    'color-values': ColorSpaceExplorer,
  },
  'visual-effects': {
    filters: FilterPlayground,
  },
  transforms: {
    'transforms-2d': TransformPlayground,
    easing: EasingVisualizer,
  },
  'visual-formatting': {
    'stacking-context': StackingContextDemo,
    'positioning-schemes': PositionDemo,
  },
  sizing: {
    'containing-block': ContainingBlockDemo,
  },
  modern: {
    'container-queries': ContainerQueryDemo,
  },
  text: {
    'text-indent-align': TextLayoutDemo,
  },
  fonts: {
    'font-family-selection': FontStackDemo,
  },
  'generated-content': {
    counters: CounterDemo,
  },
  media: {
    'media-queries': MediaQueryTester,
  },
};

/** 获取某个模块某个小节的 demo 组件 */
export function getDemoComponent(
  moduleId: string,
  sectionId: string
): ComponentType | null {
  return demoRegistry[moduleId]?.[sectionId] ?? null;
}
