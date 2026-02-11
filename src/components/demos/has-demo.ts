/**
 * Demo existence check — usable in both server and client components.
 * Keys must be kept in sync with demoRegistry in index.tsx.
 */
const DEMO_SECTIONS: Record<string, Set<string>> = {
  intro: new Set(['css-overview', 'design-principles', 'processing-model', 'css-history', 'reading-specs', 'core-terminology']),
  cascade: new Set(['cascading', 'value-stages', 'filtering', 'defaulting', 'intro', 'at-import', 'shorthand']),
  'box-model': new Set(['box-model', 'margins', 'paddings', 'borders', 'intro', 'margin-collapsing', 'logical-properties']),
  syntax: new Set(['syntax-overview', 'numeric-values', 'length-units', 'parsing-errors', 'value-definition', 'textual-values', 'characters-escaping', 'vendor-extensions', 'other-value-types', 'math-functions']),
  selectors: new Set(['selector-overview', 'specificity-calculation', 'simple-selectors', 'combinators', 'pseudo-classes', 'logical-pseudo-classes', 'pseudo-elements', 'selector-performance']),
  'colors-backgrounds': new Set(['gradients', 'color-values', 'foreground-background', 'borders-decoration', 'shadows-effects']),
  transforms: new Set(['transforms-2d', 'easing', 'transforms-3d', 'transitions', 'animations']),
  'visual-formatting': new Set(['stacking-context', 'positioning-schemes', 'intro', 'display', 'normal-flow', 'floats', 'absolute-positioning', 'inline-formatting']),
  'visual-effects': new Set(['filters', 'overflow', 'clipping', 'visibility', 'opacity', 'masking', 'shapes']),
  flexbox: new Set(['flex-container', 'flex-items', 'flex-flow', 'flex-sizing', 'flex-alignment']),
  grid: new Set(['grid-container', 'grid-template', 'grid-placement', 'grid-auto', 'grid-alignment', 'grid-subgrid']),
  multicol: new Set(['multicol-basics', 'column-gaps-rules', 'column-spanning', 'multicol-overflow']),
  tables: new Set(['table-model', 'table-visual', 'table-borders', 'table-layout-algo']),
  modern: new Set(['container-queries', 'css-nesting', 'cascade-layers', 'scope', 'content-visibility', 'scroll-snap', 'css-ui']),
  sizing: new Set(['containing-block', 'baseline-alignment', 'width-calculation', 'height-calculation', 'alignment', 'intrinsic-sizing']),
  text: new Set(['text-indent-align', 'decoration', 'transform-spacing', 'white-space', 'writing-modes']),
  fonts: new Set(['font-family-selection', 'intro', 'font-properties', 'font-face', 'variable-fonts']),
  'generated-content': new Set(['counters', 'pseudo-elements', 'content-property', 'quotes', 'lists']),
  media: new Set(['media-queries', 'intro', 'media-types', 'media-features', 'responsive-design']),
};

export function hasDemo(moduleId: string, sectionId: string): boolean {
  return DEMO_SECTIONS[moduleId]?.has(sectionId) ?? false;
}
