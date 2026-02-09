/**
 * Demo existence check — usable in both server and client components.
 * Keys must be kept in sync with demoRegistry in index.tsx.
 */
const DEMO_SECTIONS: Record<string, Set<string>> = {
  cascade: new Set(['cascading', 'value-stages']),
  'box-model': new Set(['box-model']),
  syntax: new Set(['syntax-overview', 'numeric-values', 'length-units']),
  selectors: new Set(['selector-overview', 'specificity-calculation']),
};

export function hasDemo(moduleId: string, sectionId: string): boolean {
  return DEMO_SECTIONS[moduleId]?.has(sectionId) ?? false;
}
