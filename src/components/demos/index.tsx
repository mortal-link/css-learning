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

/** demo 注册表：moduleId → sectionId → Component */
export const demoRegistry: Record<string, Record<string, ComponentType>> = {
  cascade: {
    cascading: SpecificityCalculator,
  },
  'box-model': {
    'box-model': BoxModelVisualizer,
  },
  syntax: {
    'syntax-overview': CSSTokenizer,
    'numeric-values': CSSValueParser,
    'length-units': UnitConverter,
  },
};

/** 获取某个模块某个章节的 demo 组件 */
export function getDemoComponent(
  moduleId: string,
  sectionId: string
): ComponentType | null {
  return demoRegistry[moduleId]?.[sectionId] ?? null;
}
