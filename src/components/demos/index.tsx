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

const BaselineAlignmentDemo = dynamic(
  () => import('./BaselineAlignmentDemo').then((m) => m.BaselineAlignmentDemo),
  { ssr: false }
) as ComponentType;

const CSSToggleDemo = dynamic(
  () => import('./CSSToggleDemo').then((m) => m.CSSToggleDemo),
  { ssr: false }
) as ComponentType;

const ForwardCompatDemo = dynamic(
  () => import('./ForwardCompatDemo').then((m) => m.ForwardCompatDemo),
  { ssr: false }
) as ComponentType;

const ProcessingModelDemo = dynamic(
  () => import('./ProcessingModelDemo').then((m) => m.ProcessingModelDemo),
  { ssr: false }
) as ComponentType;

const CSSTimelineDemo = dynamic(
  () => import('./CSSTimelineDemo').then((m) => m.CSSTimelineDemo),
  { ssr: false }
) as ComponentType;

const PropertyDefDemo = dynamic(
  () => import('./PropertyDefDemo').then((m) => m.PropertyDefDemo),
  { ssr: false }
) as ComponentType;

const TerminologyDemo = dynamic(
  () => import('./TerminologyDemo').then((m) => m.TerminologyDemo),
  { ssr: false }
) as ComponentType;

// --- Corrected demos for mismatched sections ---

const CascadeIntroDemo = dynamic(
  () => import('./CascadeIntroDemo').then((m) => m.CascadeIntroDemo),
  { ssr: false }
) as ComponentType;

const AtImportDemo = dynamic(
  () => import('./AtImportDemo').then((m) => m.AtImportDemo),
  { ssr: false }
) as ComponentType;

const ShorthandDemo = dynamic(
  () => import('./ShorthandDemo').then((m) => m.ShorthandDemo),
  { ssr: false }
) as ComponentType;

const BoxModelIntroDemo = dynamic(
  () => import('./BoxModelIntroDemo').then((m) => m.BoxModelIntroDemo),
  { ssr: false }
) as ComponentType;

// --- Batch 1: cascade + box-model + selectors ---

const SpecificityBattle = dynamic(
  () => import('./SpecificityBattle').then((m) => m.SpecificityBattle),
  { ssr: false }
) as ComponentType;

const ImportantDemo = dynamic(
  () => import('./ImportantDemo').then((m) => m.ImportantDemo),
  { ssr: false }
) as ComponentType;

const CascadeLayerDemo = dynamic(
  () => import('./CascadeLayerDemo').then((m) => m.CascadeLayerDemo),
  { ssr: false }
) as ComponentType;

const PaddingDemo = dynamic(
  () => import('./PaddingDemo').then((m) => m.PaddingDemo),
  { ssr: false }
) as ComponentType;

const BorderDemo = dynamic(
  () => import('./BorderDemo').then((m) => m.BorderDemo),
  { ssr: false }
) as ComponentType;

const BorderStyleExplorer = dynamic(
  () => import('./BorderStyleExplorer').then((m) => m.BorderStyleExplorer),
  { ssr: false }
) as ComponentType;

const MarginCollapseVisualizer = dynamic(
  () => import('./MarginCollapseVisualizer').then((m) => m.MarginCollapseVisualizer),
  { ssr: false }
) as ComponentType;

const LogicalPropsDemo = dynamic(
  () => import('./LogicalPropsDemo').then((m) => m.LogicalPropsDemo),
  { ssr: false }
) as ComponentType;

const SimpleSelectorDemo = dynamic(
  () => import('./SimpleSelectorDemo').then((m) => m.SimpleSelectorDemo),
  { ssr: false }
) as ComponentType;

const CombinatorDemo = dynamic(
  () => import('./CombinatorDemo').then((m) => m.CombinatorDemo),
  { ssr: false }
) as ComponentType;

const PseudoClassDemo = dynamic(
  () => import('./PseudoClassDemo').then((m) => m.PseudoClassDemo),
  { ssr: false }
) as ComponentType;

const LogicalPseudoDemo = dynamic(
  () => import('./LogicalPseudoDemo').then((m) => m.LogicalPseudoDemo),
  { ssr: false }
) as ComponentType;

const PseudoElementSelectorDemo = dynamic(
  () => import('./PseudoElementSelectorDemo').then((m) => m.PseudoElementSelectorDemo),
  { ssr: false }
) as ComponentType;

const SelectorPerfDemo = dynamic(
  () => import('./SelectorPerfDemo').then((m) => m.SelectorPerfDemo),
  { ssr: false }
) as ComponentType;

// --- Batch 2: syntax + visual-formatting ---

const ParsingErrorDemo = dynamic(
  () => import('./ParsingErrorDemo').then((m) => m.ParsingErrorDemo),
  { ssr: false }
) as ComponentType;

const ValueSyntaxDemo = dynamic(
  () => import('./ValueSyntaxDemo').then((m) => m.ValueSyntaxDemo),
  { ssr: false }
) as ComponentType;

const CSSKeywordDemo = dynamic(
  () => import('./CSSKeywordDemo').then((m) => m.CSSKeywordDemo),
  { ssr: false }
) as ComponentType;

const CSSEscapeDemo = dynamic(
  () => import('./CSSEscapeDemo').then((m) => m.CSSEscapeDemo),
  { ssr: false }
) as ComponentType;

const VendorPrefixDemo = dynamic(
  () => import('./VendorPrefixDemo').then((m) => m.VendorPrefixDemo),
  { ssr: false }
) as ComponentType;

const CSSFunctionDemo = dynamic(
  () => import('./CSSFunctionDemo').then((m) => m.CSSFunctionDemo),
  { ssr: false }
) as ComponentType;

const MathFunctionDemo = dynamic(
  () => import('./MathFunctionDemo').then((m) => m.MathFunctionDemo),
  { ssr: false }
) as ComponentType;

const DisplayValueDemo = dynamic(
  () => import('./DisplayValueDemo').then((m) => m.DisplayValueDemo),
  { ssr: false }
) as ComponentType;

const BlockInlineDemo = dynamic(
  () => import('./BlockInlineDemo').then((m) => m.BlockInlineDemo),
  { ssr: false }
) as ComponentType;

const NormalFlowDemo = dynamic(
  () => import('./NormalFlowDemo').then((m) => m.NormalFlowDemo),
  { ssr: false }
) as ComponentType;

const FloatDemo = dynamic(
  () => import('./FloatDemo').then((m) => m.FloatDemo),
  { ssr: false }
) as ComponentType;

const AbsolutePositionDemo = dynamic(
  () => import('./AbsolutePositionDemo').then((m) => m.AbsolutePositionDemo),
  { ssr: false }
) as ComponentType;

const InlineFormattingDemo = dynamic(
  () => import('./InlineFormattingDemo').then((m) => m.InlineFormattingDemo),
  { ssr: false }
) as ComponentType;

// --- Batch 3: colors-backgrounds + transforms + visual-effects ---

const ForegroundBgDemo = dynamic(
  () => import('./ForegroundBgDemo').then((m) => m.ForegroundBgDemo),
  { ssr: false }
) as ComponentType;

const BorderImageDemo = dynamic(
  () => import('./BorderImageDemo').then((m) => m.BorderImageDemo),
  { ssr: false }
) as ComponentType;

const ShadowBuilder = dynamic(
  () => import('./ShadowBuilder').then((m) => m.ShadowBuilder),
  { ssr: false }
) as ComponentType;

const Transform3DDemo = dynamic(
  () => import('./Transform3DDemo').then((m) => m.Transform3DDemo),
  { ssr: false }
) as ComponentType;

const TransitionDemo = dynamic(
  () => import('./TransitionDemo').then((m) => m.TransitionDemo),
  { ssr: false }
) as ComponentType;

const AnimationDemo = dynamic(
  () => import('./AnimationDemo').then((m) => m.AnimationDemo),
  { ssr: false }
) as ComponentType;

const OverflowDemo = dynamic(
  () => import('./OverflowDemo').then((m) => m.OverflowDemo),
  { ssr: false }
) as ComponentType;

const ClipPathDemo = dynamic(
  () => import('./ClipPathDemo').then((m) => m.ClipPathDemo),
  { ssr: false }
) as ComponentType;

const VisibilityDemo = dynamic(
  () => import('./VisibilityDemo').then((m) => m.VisibilityDemo),
  { ssr: false }
) as ComponentType;

const OpacityBlendDemo = dynamic(
  () => import('./OpacityBlendDemo').then((m) => m.OpacityBlendDemo),
  { ssr: false }
) as ComponentType;

const MaskDemo = dynamic(
  () => import('./MaskDemo').then((m) => m.MaskDemo),
  { ssr: false }
) as ComponentType;

const CSSShapeDemo = dynamic(
  () => import('./CSSShapeDemo').then((m) => m.CSSShapeDemo),
  { ssr: false }
) as ComponentType;

// --- Batch 4: text + fonts + generated-content + media ---

const TextDecorationDemo = dynamic(
  () => import('./TextDecorationDemo').then((m) => m.TextDecorationDemo),
  { ssr: false }
) as ComponentType;

const TextTransformDemo = dynamic(
  () => import('./TextTransformDemo').then((m) => m.TextTransformDemo),
  { ssr: false }
) as ComponentType;

const WhiteSpaceDemo = dynamic(
  () => import('./WhiteSpaceDemo').then((m) => m.WhiteSpaceDemo),
  { ssr: false }
) as ComponentType;

const WritingModeDemo = dynamic(
  () => import('./WritingModeDemo').then((m) => m.WritingModeDemo),
  { ssr: false }
) as ComponentType;

const FontBasicsDemo = dynamic(
  () => import('./FontBasicsDemo').then((m) => m.FontBasicsDemo),
  { ssr: false }
) as ComponentType;

const FontPropertyDemo = dynamic(
  () => import('./FontPropertyDemo').then((m) => m.FontPropertyDemo),
  { ssr: false }
) as ComponentType;

const FontFaceDemo = dynamic(
  () => import('./FontFaceDemo').then((m) => m.FontFaceDemo),
  { ssr: false }
) as ComponentType;

const VariableFontDemo = dynamic(
  () => import('./VariableFontDemo').then((m) => m.VariableFontDemo),
  { ssr: false }
) as ComponentType;

const PseudoElementDemo = dynamic(
  () => import('./PseudoElementDemo').then((m) => m.PseudoElementDemo),
  { ssr: false }
) as ComponentType;

const ContentPropertyDemo = dynamic(
  () => import('./ContentPropertyDemo').then((m) => m.ContentPropertyDemo),
  { ssr: false }
) as ComponentType;

const QuotesDemo = dynamic(
  () => import('./QuotesDemo').then((m) => m.QuotesDemo),
  { ssr: false }
) as ComponentType;

const ListStyleDemo = dynamic(
  () => import('./ListStyleDemo').then((m) => m.ListStyleDemo),
  { ssr: false }
) as ComponentType;

const MediaIntroDemo = dynamic(
  () => import('./MediaIntroDemo').then((m) => m.MediaIntroDemo),
  { ssr: false }
) as ComponentType;

const MediaTypeDemo = dynamic(
  () => import('./MediaTypeDemo').then((m) => m.MediaTypeDemo),
  { ssr: false }
) as ComponentType;

const MediaFeatureDemo = dynamic(
  () => import('./MediaFeatureDemo').then((m) => m.MediaFeatureDemo),
  { ssr: false }
) as ComponentType;

const ResponsiveDemo = dynamic(
  () => import('./ResponsiveDemo').then((m) => m.ResponsiveDemo),
  { ssr: false }
) as ComponentType;

// --- Batch 5: flexbox + grid ---

const FlexContainerDemo = dynamic(
  () => import('./FlexContainerDemo').then((m) => m.FlexContainerDemo),
  { ssr: false }
) as ComponentType;

const FlexItemDemo = dynamic(
  () => import('./FlexItemDemo').then((m) => m.FlexItemDemo),
  { ssr: false }
) as ComponentType;

const FlexFlowDemo = dynamic(
  () => import('./FlexFlowDemo').then((m) => m.FlexFlowDemo),
  { ssr: false }
) as ComponentType;

const FlexSizingDemo = dynamic(
  () => import('./FlexSizingDemo').then((m) => m.FlexSizingDemo),
  { ssr: false }
) as ComponentType;

const FlexAlignDemo = dynamic(
  () => import('./FlexAlignDemo').then((m) => m.FlexAlignDemo),
  { ssr: false }
) as ComponentType;

const GridContainerDemo = dynamic(
  () => import('./GridContainerDemo').then((m) => m.GridContainerDemo),
  { ssr: false }
) as ComponentType;

const GridTemplateDemo = dynamic(
  () => import('./GridTemplateDemo').then((m) => m.GridTemplateDemo),
  { ssr: false }
) as ComponentType;

const GridPlacementDemo = dynamic(
  () => import('./GridPlacementDemo').then((m) => m.GridPlacementDemo),
  { ssr: false }
) as ComponentType;

const GridAutoDemo = dynamic(
  () => import('./GridAutoDemo').then((m) => m.GridAutoDemo),
  { ssr: false }
) as ComponentType;

const GridAlignDemo = dynamic(
  () => import('./GridAlignDemo').then((m) => m.GridAlignDemo),
  { ssr: false }
) as ComponentType;

const SubgridDemo = dynamic(
  () => import('./SubgridDemo').then((m) => m.SubgridDemo),
  { ssr: false }
) as ComponentType;

// --- Batch 6: multicol + tables + modern + sizing ---

const MulticolDemo = dynamic(
  () => import('./MulticolDemo').then((m) => m.MulticolDemo),
  { ssr: false }
) as ComponentType;

const ColumnRuleDemo = dynamic(
  () => import('./ColumnRuleDemo').then((m) => m.ColumnRuleDemo),
  { ssr: false }
) as ComponentType;

const ColumnSpanDemo = dynamic(
  () => import('./ColumnSpanDemo').then((m) => m.ColumnSpanDemo),
  { ssr: false }
) as ComponentType;

const MulticolBreakDemo = dynamic(
  () => import('./MulticolBreakDemo').then((m) => m.MulticolBreakDemo),
  { ssr: false }
) as ComponentType;

const TableModelDemo = dynamic(
  () => import('./TableModelDemo').then((m) => m.TableModelDemo),
  { ssr: false }
) as ComponentType;

const TableLayoutDemo = dynamic(
  () => import('./TableLayoutDemo').then((m) => m.TableLayoutDemo),
  { ssr: false }
) as ComponentType;

const TableBorderDemo = dynamic(
  () => import('./TableBorderDemo').then((m) => m.TableBorderDemo),
  { ssr: false }
) as ComponentType;

const TableAlgoDemo = dynamic(
  () => import('./TableAlgoDemo').then((m) => m.TableAlgoDemo),
  { ssr: false }
) as ComponentType;

const NestingDemo = dynamic(
  () => import('./NestingDemo').then((m) => m.NestingDemo),
  { ssr: false }
) as ComponentType;

const CascadeLayerOrderDemo = dynamic(
  () => import('./CascadeLayerOrderDemo').then((m) => m.CascadeLayerOrderDemo),
  { ssr: false }
) as ComponentType;

const ScopingDemo = dynamic(
  () => import('./ScopingDemo').then((m) => m.ScopingDemo),
  { ssr: false }
) as ComponentType;

const ContentVisibilityDemo = dynamic(
  () => import('./ContentVisibilityDemo').then((m) => m.ContentVisibilityDemo),
  { ssr: false }
) as ComponentType;

const ScrollSnapDemo = dynamic(
  () => import('./ScrollSnapDemo').then((m) => m.ScrollSnapDemo),
  { ssr: false }
) as ComponentType;

const CSSUIDemo = dynamic(
  () => import('./CSSUIDemo').then((m) => m.CSSUIDemo),
  { ssr: false }
) as ComponentType;

const WidthCalcDemo = dynamic(
  () => import('./WidthCalcDemo').then((m) => m.WidthCalcDemo),
  { ssr: false }
) as ComponentType;

const HeightCalcDemo = dynamic(
  () => import('./HeightCalcDemo').then((m) => m.HeightCalcDemo),
  { ssr: false }
) as ComponentType;

const BoxAlignmentDemo = dynamic(
  () => import('./BoxAlignmentDemo').then((m) => m.BoxAlignmentDemo),
  { ssr: false }
) as ComponentType;

const IntrinsicSizingDemo = dynamic(
  () => import('./IntrinsicSizingDemo').then((m) => m.IntrinsicSizingDemo),
  { ssr: false }
) as ComponentType;

/** demo 注册表：moduleId → sectionId → Component */
export const demoRegistry: Record<string, Record<string, ComponentType>> = {
  intro: {
    'css-overview': CSSToggleDemo,
    'design-principles': ForwardCompatDemo,
    'processing-model': ProcessingModelDemo,
    'css-history': CSSTimelineDemo,
    'reading-specs': PropertyDefDemo,
    'core-terminology': TerminologyDemo,
  },
  cascade: {
    cascading: SpecificityCalculator,
    'value-stages': ValuePipeline,
    filtering: CascadeOriginDemo,
    defaulting: InheritanceDemo,
    intro: CascadeIntroDemo,
    'at-import': AtImportDemo,
    shorthand: ShorthandDemo,
  },
  'box-model': {
    'box-model': BoxModelVisualizer,
    margins: MarginCollapseDemo,
    paddings: PaddingDemo,
    borders: BorderDemo,
    intro: BoxModelIntroDemo,
    'margin-collapsing': MarginCollapseVisualizer,
    'logical-properties': LogicalPropsDemo,
  },
  syntax: {
    'syntax-overview': CSSTokenizer,
    'numeric-values': CSSValueParser,
    'length-units': UnitConverter,
    'parsing-errors': ParsingErrorDemo,
    'value-definition': ValueSyntaxDemo,
    'textual-values': CSSKeywordDemo,
    'characters-escaping': CSSEscapeDemo,
    'vendor-extensions': VendorPrefixDemo,
    'other-value-types': CSSFunctionDemo,
    'math-functions': MathFunctionDemo,
  },
  selectors: {
    'selector-overview': SelectorMatcher,
    'specificity-calculation': SpecificityCalculator,
    'simple-selectors': SimpleSelectorDemo,
    combinators: CombinatorDemo,
    'pseudo-classes': PseudoClassDemo,
    'logical-pseudo-classes': LogicalPseudoDemo,
    'pseudo-elements': PseudoElementSelectorDemo,
    'selector-performance': SelectorPerfDemo,
  },
  'colors-backgrounds': {
    gradients: GradientBuilder,
    'color-values': ColorSpaceExplorer,
    'foreground-background': ForegroundBgDemo,
    'borders-decoration': BorderImageDemo,
    'shadows-effects': ShadowBuilder,
  },
  'visual-effects': {
    filters: FilterPlayground,
    overflow: OverflowDemo,
    clipping: ClipPathDemo,
    visibility: VisibilityDemo,
    opacity: OpacityBlendDemo,
    masking: MaskDemo,
    shapes: CSSShapeDemo,
  },
  transforms: {
    'transforms-2d': TransformPlayground,
    easing: EasingVisualizer,
    'transforms-3d': Transform3DDemo,
    transitions: TransitionDemo,
    animations: AnimationDemo,
  },
  'visual-formatting': {
    'stacking-context': StackingContextDemo,
    'positioning-schemes': PositionDemo,
    intro: DisplayValueDemo,
    display: BlockInlineDemo,
    'normal-flow': NormalFlowDemo,
    floats: FloatDemo,
    'absolute-positioning': AbsolutePositionDemo,
    'inline-formatting': InlineFormattingDemo,
  },
  sizing: {
    'containing-block': ContainingBlockDemo,
    'baseline-alignment': BaselineAlignmentDemo,
    'width-calculation': WidthCalcDemo,
    'height-calculation': HeightCalcDemo,
    alignment: BoxAlignmentDemo,
    'intrinsic-sizing': IntrinsicSizingDemo,
  },
  flexbox: {
    'flex-container': FlexContainerDemo,
    'flex-items': FlexItemDemo,
    'flex-flow': FlexFlowDemo,
    'flex-sizing': FlexSizingDemo,
    'flex-alignment': FlexAlignDemo,
  },
  grid: {
    'grid-container': GridContainerDemo,
    'grid-template': GridTemplateDemo,
    'grid-placement': GridPlacementDemo,
    'grid-auto': GridAutoDemo,
    'grid-alignment': GridAlignDemo,
    'grid-subgrid': SubgridDemo,
  },
  multicol: {
    'multicol-basics': MulticolDemo,
    'column-gaps-rules': ColumnRuleDemo,
    'column-spanning': ColumnSpanDemo,
    'multicol-overflow': MulticolBreakDemo,
  },
  tables: {
    'table-model': TableModelDemo,
    'table-visual': TableLayoutDemo,
    'table-borders': TableBorderDemo,
    'table-layout-algo': TableAlgoDemo,
  },
  modern: {
    'container-queries': ContainerQueryDemo,
    'css-nesting': NestingDemo,
    'cascade-layers': CascadeLayerOrderDemo,
    scope: ScopingDemo,
    'content-visibility': ContentVisibilityDemo,
    'scroll-snap': ScrollSnapDemo,
    'css-ui': CSSUIDemo,
  },
  text: {
    'text-indent-align': TextLayoutDemo,
    decoration: TextDecorationDemo,
    'transform-spacing': TextTransformDemo,
    'white-space': WhiteSpaceDemo,
    'writing-modes': WritingModeDemo,
  },
  fonts: {
    'font-family-selection': FontStackDemo,
    intro: FontBasicsDemo,
    'font-properties': FontPropertyDemo,
    'font-face': FontFaceDemo,
    'variable-fonts': VariableFontDemo,
  },
  'generated-content': {
    counters: CounterDemo,
    'pseudo-elements': PseudoElementDemo,
    'content-property': ContentPropertyDemo,
    quotes: QuotesDemo,
    lists: ListStyleDemo,
  },
  media: {
    'media-queries': MediaQueryTester,
    intro: MediaIntroDemo,
    'media-types': MediaTypeDemo,
    'media-features': MediaFeatureDemo,
    'responsive-design': ResponsiveDemo,
  },
};

/** 获取某个模块某个小节的 demo 组件 */
export function getDemoComponent(
  moduleId: string,
  sectionId: string
): ComponentType | null {
  return demoRegistry[moduleId]?.[sectionId] ?? null;
}
