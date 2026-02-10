/**
 * Demo existence check — usable in both server and client components.
 * Keys must be kept in sync with demoRegistry in index.tsx.
 */
const DEMO_SECTIONS: Record<string, Set<string>> = {
  cascade: new Set(['cascading', 'value-stages', 'filtering', 'defaulting']),
  'box-model': new Set(['box-model', 'margins']),
  syntax: new Set(['syntax-overview', 'numeric-values', 'length-units']),
  selectors: new Set(['selector-overview', 'specificity-calculation']),
  'colors-backgrounds': new Set(['gradients', 'color-values']),
  transforms: new Set(['transforms-2d', 'easing']),
  'visual-formatting': new Set(['stacking-context', 'positioning-schemes']),
  'visual-effects': new Set(['filters']),
  modern: new Set(['container-queries']),
  sizing: new Set(['containing-block']),
  text: new Set(['text-indent-align']),
  fonts: new Set(['font-family-selection']),
  'generated-content': new Set(['counters']),
  media: new Set(['media-queries']),
};

export function hasDemo(moduleId: string, sectionId: string): boolean {
  return DEMO_SECTIONS[moduleId]?.has(sectionId) ?? false;
}
