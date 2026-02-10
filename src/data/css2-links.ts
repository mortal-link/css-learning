/**
 * CSS2 相对路径 → 站内路由映射
 *
 * CSS2 规范中的相对链接（如 selector.html、cascade.html#at-import）
 * 映射到站内的 moduleId，用于 SpecLink 组件的站内导航。
 */

import { anchors as introAnchors } from './chapters/intro';
import { anchors as syntaxAnchors } from './chapters/syntax';
import { anchors as selectorsAnchors } from './chapters/selectors';
import { anchors as cascadeAnchors } from './chapters/cascade';
import { anchors as mediaAnchors } from './chapters/media';
import { anchors as boxModelAnchors } from './chapters/box-model';
import { anchors as visualFormattingAnchors } from './chapters/visual-formatting';
import { anchors as sizingAnchors } from './chapters/sizing';
import { anchors as visualEffectsAnchors } from './chapters/visual-effects';
import { anchors as generatedContentAnchors } from './chapters/generated-content';
import { anchors as colorsBackgroundsAnchors } from './chapters/colors-backgrounds';
import { anchors as fontsAnchors } from './chapters/fonts';
import { anchors as textAnchors } from './chapters/text';
import { anchors as transformsAnchors } from './chapters/transforms';
import { anchors as modernAnchors } from './chapters/modern';

/** CSS2 文件名 → 站内 moduleId */
export const CSS2_FILE_TO_MODULE: Record<string, string> = {
  'about.html': 'intro',
  'intro.html': 'intro',
  'conform.html': 'intro',
  'syndata.html': 'syntax',
  'selector.html': 'selectors',
  'cascade.html': 'cascade',
  'media.html': 'media',
  'box.html': 'box-model',
  'visuren.html': 'visual-formatting',
  'visudet.html': 'sizing',
  'visufx.html': 'visual-effects',
  'generate.html': 'generated-content',
  'colors.html': 'colors-backgrounds',
  'fonts.html': 'fonts',
  'text.html': 'text',
  'tables.html': 'visual-formatting', // CSS2 Ch17 tables → merged into visual-formatting
  'ui.html': 'visual-effects', // CSS2 Ch18 UI → merged into visual-effects
  'aural.html': 'media', // CSS2 Ch19 aural → merged into media
  'page.html': 'visual-formatting', // CSS2 Ch13 paged media → visual-formatting
  'grammar.html': 'syntax', // Appendix G grammar → syntax
  'Overview.html': 'intro', // CSS2 overview → intro
  'refs.html': '', // references page, no mapping
  'propidx.html': '', // property index, no mapping
  'indexlist.html': '', // index list, no mapping
  'sample.html': '', // sample stylesheet, no mapping
  'changes.html': '', // changelog, no mapping
};

/** 常见参考文献 → 外部 URL */
export const BIBREF_URLS: Record<string, string> = {
  // ── CSS Specifications ──
  'CSS2': 'https://www.w3.org/TR/CSS2/',
  'CSS22': 'https://www.w3.org/TR/CSS22/',
  'CSS21': 'https://www.w3.org/TR/CSS21/',
  'CSS-2017': 'https://www.w3.org/TR/CSS/',
  'CSS-VALUES-3': 'https://www.w3.org/TR/css-values-3/',
  'CSS-VALUES-4': 'https://www.w3.org/TR/css-values-4/',
  'CSS-CASCADE-3': 'https://www.w3.org/TR/css-cascade-3/',
  'CSS-CASCADE-4': 'https://www.w3.org/TR/css-cascade-4/',
  'CSS-CASCADE-5': 'https://www.w3.org/TR/css-cascade-5/',
  'CSS-SYNTAX-3': 'https://www.w3.org/TR/css-syntax-3/',
  'SELECTORS-3': 'https://www.w3.org/TR/selectors-3/',
  'SELECTORS-4': 'https://www.w3.org/TR/selectors-4/',
  'CSS-BOX-3': 'https://www.w3.org/TR/css-box-3/',
  'CSS-DISPLAY-3': 'https://www.w3.org/TR/css-display-3/',
  'CSS-DISPLAY-4': 'https://www.w3.org/TR/css-display-4/',
  'CSS-COLOR-4': 'https://www.w3.org/TR/css-color-4/',
  'CSS-COLOR-5': 'https://www.w3.org/TR/css-color-5/',
  'CSS3COLOR': 'https://www.w3.org/TR/css-color-3/',
  'CSS-IMAGES-3': 'https://www.w3.org/TR/css-images-3/',
  'CSS3-IMAGES': 'https://www.w3.org/TR/css-images-3/',
  'CSS-BACKGROUNDS-3': 'https://www.w3.org/TR/css-backgrounds-3/',
  'CSS3BG': 'https://www.w3.org/TR/css-backgrounds-3/',
  'CSS3-BACKGROUND': 'https://www.w3.org/TR/css-backgrounds-3/',
  'CSS-FONTS-3': 'https://www.w3.org/TR/css-fonts-3/',
  'CSS-FONTS-4': 'https://www.w3.org/TR/css-fonts-4/',
  'CSS3-FONTS': 'https://www.w3.org/TR/css-fonts-4/',
  'CSS-TEXT-3': 'https://www.w3.org/TR/css-text-3/',
  'CSS3TEXT': 'https://www.w3.org/TR/css-text-3/',
  'CSS-TEXT-DECOR-3': 'https://www.w3.org/TR/css-text-decor-3/',
  'CSS3-TEXT-DECOR': 'https://www.w3.org/TR/css-text-decor-3/',
  'CSS-FLEXBOX-1': 'https://www.w3.org/TR/css-flexbox-1/',
  'CSS3-FLEXBOX': 'https://www.w3.org/TR/css-flexbox-1/',
  'CSS-GRID-1': 'https://www.w3.org/TR/css-grid-1/',
  'CSS-GRID-2': 'https://www.w3.org/TR/css-grid-2/',
  'CSS-ALIGN-3': 'https://www.w3.org/TR/css-align-3/',
  'CSS3-ALIGN': 'https://www.w3.org/TR/css-align-3/',
  'CSS-WRITING-MODES-4': 'https://www.w3.org/TR/css-writing-modes-4/',
  'CSS3-WRITING-MODES': 'https://www.w3.org/TR/css-writing-modes-4/',
  'CSS-BREAK-3': 'https://www.w3.org/TR/css-break-3/',
  'CSS3-BREAK': 'https://www.w3.org/TR/css-break-3/',
  'CSS-SIZING-3': 'https://www.w3.org/TR/css-sizing-3/',
  'CSS3-SIZING': 'https://www.w3.org/TR/css-sizing-3/',
  'CSS-PSEUDO-4': 'https://www.w3.org/TR/css-pseudo-4/',
  'CSS-INLINE-3': 'https://www.w3.org/TR/css-inline-3/',
  'CSS-OVERFLOW-3': 'https://www.w3.org/TR/css-overflow-3/',
  'CSS-MULTICOL-1': 'https://www.w3.org/TR/css-multicol-1/',
  'CSS-MULTICOL-2': 'https://www.w3.org/TR/css-multicol-2/',
  'CSS3COL': 'https://www.w3.org/TR/css-multicol-1/',
  'CSS-PAGE-3': 'https://www.w3.org/TR/css-page-3/',
  'CSS3PAGE': 'https://www.w3.org/TR/css-page-3/',
  'CSS-LOGICAL-1': 'https://www.w3.org/TR/css-logical-1/',
  'CSS-CONDITIONAL-3': 'https://www.w3.org/TR/css-conditional-3/',
  'CSS3-CONDITIONAL': 'https://www.w3.org/TR/css-conditional-3/',
  'CSS-RUBY-1': 'https://www.w3.org/TR/css-ruby-1/',
  'CSS-SPEECH-1': 'https://www.w3.org/TR/css-speech-1/',
  'CSS-REGIONS-1': 'https://www.w3.org/TR/css-regions-1/',
  'CSS3-EXCLUSIONS': 'https://www.w3.org/TR/css3-exclusions/',
  'CSS-CONTAIN-1': 'https://www.w3.org/TR/css-contain-1/',
  'CSS-CONTAIN-2': 'https://www.w3.org/TR/css-contain-2/',
  'CSS-POSITION-3': 'https://www.w3.org/TR/css-position-3/',
  'CSS-TRANSFORMS-1': 'https://www.w3.org/TR/css-transforms-1/',
  'CSS-ANIMATIONS-1': 'https://www.w3.org/TR/css-animations-1/',
  'CSS3-ANIMATIONS': 'https://www.w3.org/TR/css-animations-1/',
  'CSS3-TRANSITIONS': 'https://www.w3.org/TR/css-transitions-1/',
  'CSS-MASKING': 'https://www.w3.org/TR/css-masking-1/',
  'CSS-FONT-LOADING-3': 'https://www.w3.org/TR/css-font-loading/',
  'CSS-NAMESPACES-3': 'https://www.w3.org/TR/css-namespaces-3/',
  'CSS3NAMESPACE': 'https://www.w3.org/TR/css-namespaces-3/',
  'CSS3UI': 'https://www.w3.org/TR/css-ui-4/',
  'CSS3LIST': 'https://www.w3.org/TR/css-lists-3/',
  'CSS3BOX': 'https://www.w3.org/TR/css-box-3/',
  'CSS3SYN': 'https://www.w3.org/TR/css-syntax-3/',
  'CSS3SEL': 'https://www.w3.org/TR/selectors-3/',
  'CSS3CASCADE': 'https://www.w3.org/TR/css-cascade-3/',
  'SELECT': 'https://www.w3.org/TR/selectors-4/',
  'FILTER-EFFECTS-1': 'https://www.w3.org/TR/filter-effects-1/',
  'WEB-ANIMATIONS': 'https://www.w3.org/TR/web-animations-1/',
  'CSSSTYLEATTR': 'https://www.w3.org/TR/css-style-attr/',
  'MEDIAQ': 'https://www.w3.org/TR/mediaqueries-4/',

  // ── Web Platform ──
  'HTML': 'https://html.spec.whatwg.org/',
  'HTML4': 'https://www.w3.org/TR/html401/',
  'HTML401': 'https://www.w3.org/TR/html401/',
  'HTML5': 'https://www.w3.org/TR/html5/',
  'DOM': 'https://dom.spec.whatwg.org/',
  'CSSOM': 'https://www.w3.org/TR/cssom-1/',
  'CSSOM-VIEW': 'https://www.w3.org/TR/cssom-view-1/',
  'INFRA': 'https://infra.spec.whatwg.org/',
  'URL': 'https://url.spec.whatwg.org/',
  'QUIRKS': 'https://quirks.spec.whatwg.org/',
  'FULLSCREEN': 'https://fullscreen.spec.whatwg.org/',
  'SVG11': 'https://www.w3.org/TR/SVG11/',
  'SVG2': 'https://www.w3.org/TR/SVG2/',
  'MATHML': 'https://www.w3.org/TR/MathML3/',
  'MATH30': 'https://www.w3.org/TR/MathML3/',
  'XHTML': 'https://www.w3.org/TR/xhtml1/',
  'Compositing': 'https://www.w3.org/TR/compositing-1/',
  'SMIL': 'https://www.w3.org/TR/SMIL3/',
  'SMIL3': 'https://www.w3.org/TR/SMIL3/',
  'SMIL10': 'https://www.w3.org/TR/SMIL/',
  'SMIL-ANIMATION': 'https://www.w3.org/TR/smil-animation/',

  // ── XML / Internationalization ──
  'XML10': 'https://www.w3.org/TR/xml/',
  'XML11': 'https://www.w3.org/TR/xml11/',
  'XML-NAMES': 'https://www.w3.org/TR/xml-names/',
  'XMLNAMESPACES': 'https://www.w3.org/TR/xml-names/',
  'XMLID': 'https://www.w3.org/TR/xml-id/',
  'ITS20': 'https://www.w3.org/TR/its20/',
  'CHARMOD-NORM': 'https://www.w3.org/TR/charmod-norm/',
  'ISO8879': 'https://www.iso.org/standard/16387.html',
  'ISO10646': 'https://www.iso.org/standard/76835.html',
  'ISO15924': 'https://www.unicode.org/iso15924/',

  // ── Unicode ──
  'UNICODE': 'https://www.unicode.org/versions/latest/',
  'UAX9': 'https://www.unicode.org/reports/tr9/',
  'UAX11': 'https://www.unicode.org/reports/tr11/',
  'UAX14': 'https://www.unicode.org/reports/tr14/',
  'UAX15': 'https://www.unicode.org/reports/tr15/',
  'UAX24': 'https://www.unicode.org/reports/tr24/',
  'UAX29': 'https://www.unicode.org/reports/tr29/',
  'UAX44': 'https://www.unicode.org/reports/tr44/',
  'UAX50': 'https://www.unicode.org/reports/tr50/',
  'UTR50': 'https://www.unicode.org/reports/tr50/',
  'UTN22': 'https://www.unicode.org/notes/tn22/',
  'UTS51': 'https://www.unicode.org/reports/tr51/',
  'BCP47': 'https://www.rfc-editor.org/info/bcp47',

  // ── Fonts / Typography ──
  'OPENTYPE': 'https://docs.microsoft.com/en-us/typography/opentype/spec/',
  'OPEN-FONT-FORMAT': 'https://www.iso.org/standard/52136.html',
  'TRUETYPE': 'https://developer.apple.com/fonts/TrueType-Reference-Manual/',
  'AAT-FEATURES': 'https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html',
  'OPENTYPE-FEATURES': 'https://docs.microsoft.com/en-us/typography/opentype/spec/featurelist',
  'GRAPHITE': 'https://graphite.sil.org/',
  'IFT': 'https://www.w3.org/TR/IFT/',
  'JLREQ': 'https://www.w3.org/TR/jlreq/',
  'CLREQ': 'https://www.w3.org/TR/clreq/',
  'TYPOGRAPHY': 'https://www.w3.org/TR/typography/',

  // ── Color / Graphics ──
  'SRGB': 'https://www.w3.org/Graphics/Color/sRGB',
  'Display-P3': 'https://www.color.org/chardata/rgb/DisplayP3.xalter',
  'Rec.2020': 'https://www.itu.int/rec/R-REC-BT.2020/',
  'CIELAB': 'https://en.wikipedia.org/wiki/CIELAB_color_space',
  'Oklab': 'https://bottosson.github.io/posts/oklab/',
  'ICC': 'https://www.color.org/specification/ICC.1-2022-05.pdf',
  'COLORIMETRY': 'https://cie.co.at/publications/colorimetry-4th-edition',

  // ── RFCs ──
  'RFC2045': 'https://www.rfc-editor.org/rfc/rfc2045',
  'RFC2119': 'https://www.rfc-editor.org/rfc/rfc2119',
  'RFC2318': 'https://www.rfc-editor.org/rfc/rfc2318',
  'RFC2616': 'https://www.rfc-editor.org/rfc/rfc2616',
  'RFC3986': 'https://www.rfc-editor.org/rfc/rfc3986',
  'RFC4647': 'https://www.rfc-editor.org/rfc/rfc4647',
  'RFC5646': 'https://www.rfc-editor.org/rfc/rfc5646',
  'RFC6694': 'https://www.rfc-editor.org/rfc/rfc6694',
  'RFC6919': 'https://www.rfc-editor.org/rfc/rfc6919',
  'RFC8081': 'https://www.rfc-editor.org/rfc/rfc8081',

  // ── Accessibility ──
  'WCAG20': 'https://www.w3.org/TR/WCAG20/',
  'WCAG21': 'https://www.w3.org/TR/WCAG21/',
  'UAAG10': 'https://www.w3.org/TR/UAAG10/',

  // ── Image Formats ──
  'JPEG': 'https://www.w3.org/Graphics/JPEG/',
  'PNG': 'https://www.w3.org/TR/png/',
  'TIFF': 'https://www.iso.org/standard/34342.html',
};

/**
 * CSS2 细粒度锚点 → 站内 section id 降级映射
 *
 * CSS2 原文中的锚点粒度比我们的 section 更细，例如 `#ignore` 是 Ch4 中的
 * 一个定义，但我们没有对应的 section，需要降级到最近的父 section。
 *
 * 格式: { [moduleId]: { [css2Anchor]: sectionId } }
 */
export const ANCHOR_TO_SECTION: Record<string, Record<string, string>> = {
  intro: introAnchors,
  syntax: syntaxAnchors,
  selectors: selectorsAnchors,
  cascade: cascadeAnchors,
  media: mediaAnchors,
  'box-model': boxModelAnchors,
  'visual-formatting': visualFormattingAnchors,
  sizing: sizingAnchors,
  'visual-effects': visualEffectsAnchors,
  'generated-content': generatedContentAnchors,
  'colors-backgrounds': colorsBackgroundsAnchors,
  fonts: fontsAnchors,
  text: textAnchors,
  transforms: transformsAnchors,
  modern: modernAnchors,
};

/**
 * 将 CSS2 锚点降级为站内 section id
 */
export function degradeAnchor(moduleId: string, anchor: string): string | null {
  return ANCHOR_TO_SECTION[moduleId]?.[anchor] ?? null;
}

/**
 * 解析 CSS2 相对 URL 为站内信息
 * @returns { moduleId, anchor } 或 null（无法映射）
 */
export function resolveCSS2Link(url: string): { moduleId: string; anchor?: string } | null {
  // 拆分 path#anchor
  const [path, anchor] = url.split('#');
  // 规范化：去掉 ./ 前缀
  const fileName = (path || '').replace(/^\.\//, '');

  // 纯锚点（#anchor）→ 当前页面内
  if (!fileName && anchor) {
    return null; // 由调用方处理
  }

  const moduleId = CSS2_FILE_TO_MODULE[fileName];
  if (!moduleId) return null;

  return { moduleId, anchor };
}

/**
 * 将 CSS2 相对 URL 转为 W3C 完整 URL
 */
export function toCSS2ExternalUrl(url: string): string {
  return `https://www.w3.org/TR/CSS22/${url}`;
}

/**
 * 获取参考文献的外部 URL
 */
export function getBibrefUrl(ref: string): string | null {
  // 尝试直接匹配
  const upper = ref.toUpperCase();
  if (BIBREF_URLS[upper]) return BIBREF_URLS[upper];

  // 尝试去掉 - 匹配
  const normalized = upper.replace(/-/g, '');
  for (const [key, url] of Object.entries(BIBREF_URLS)) {
    if (key.replace(/-/g, '') === normalized) return url;
  }

  return null;
}
