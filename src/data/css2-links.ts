/**
 * CSS2 相对路径 → 站内路由映射
 *
 * CSS2 规范中的相对链接（如 selector.html、cascade.html#at-import）
 * 映射到站内的 moduleId，用于 SpecLink 组件的站内导航。
 */

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
  'grammar.html': 'syntax', // Appendix G grammar → syntax
  'refs.html': '', // references page, no mapping
  'propidx.html': '', // property index, no mapping
  'sample.html': '', // sample stylesheet, no mapping
};

/** 常见参考文献 → 外部 URL */
export const BIBREF_URLS: Record<string, string> = {
  'CSS2': 'https://www.w3.org/TR/CSS2/',
  'CSS22': 'https://www.w3.org/TR/CSS22/',
  'CSS21': 'https://www.w3.org/TR/CSS21/',
  'CSS-VALUES-3': 'https://www.w3.org/TR/css-values-3/',
  'CSS-VALUES-4': 'https://www.w3.org/TR/css-values-4/',
  'CSS-CASCADE-4': 'https://www.w3.org/TR/css-cascade-4/',
  'CSS-CASCADE-5': 'https://www.w3.org/TR/css-cascade-5/',
  'CSS-SYNTAX-3': 'https://www.w3.org/TR/css-syntax-3/',
  'SELECTORS-3': 'https://www.w3.org/TR/selectors-3/',
  'SELECTORS-4': 'https://www.w3.org/TR/selectors-4/',
  'CSS-BOX-3': 'https://www.w3.org/TR/css-box-3/',
  'CSS-DISPLAY-3': 'https://www.w3.org/TR/css-display-3/',
  'CSS-COLOR-4': 'https://www.w3.org/TR/css-color-4/',
  'CSS3COLOR': 'https://www.w3.org/TR/css-color-3/',
  'CSS3-IMAGES': 'https://www.w3.org/TR/css-images-3/',
  'CSS-BACKGROUNDS-3': 'https://www.w3.org/TR/css-backgrounds-3/',
  'CSS-FONTS-4': 'https://www.w3.org/TR/css-fonts-4/',
  'CSS-TEXT-3': 'https://www.w3.org/TR/css-text-3/',
  'CSS-FLEXBOX-1': 'https://www.w3.org/TR/css-flexbox-1/',
  'CSS-GRID-1': 'https://www.w3.org/TR/css-grid-1/',
  'MEDIAQ': 'https://www.w3.org/TR/mediaqueries-4/',
  'HTML4': 'https://www.w3.org/TR/html401/',
  'HTML': 'https://html.spec.whatwg.org/',
  'ISO10646': 'https://www.iso.org/standard/76835.html',
  'UNICODE': 'https://www.unicode.org/versions/latest/',
  'RFC3986': 'https://www.rfc-editor.org/rfc/rfc3986',
  'RFC2318': 'https://www.rfc-editor.org/rfc/rfc2318',
  'SRGB': 'https://www.w3.org/Graphics/Color/sRGB',
  'UAX9': 'https://www.unicode.org/reports/tr9/',
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
  // ── syntax (CSS2 Ch4) ──
  syntax: {
    // §1 syntax-overview 的子锚点
    'tokenization': 'syntax-overview',
    'block': 'syntax-overview',
    'rule-sets': 'syntax-overview',
    'at-rules': 'syntax-overview',
    'declaration': 'syntax-overview',
    'comments': 'syntax-overview',
    // §2 parsing-errors 的子锚点
    'ignore': 'parsing-errors',
    'illegalvalues': 'parsing-errors',
    // §4 textual-values 的子锚点
    'strings': 'textual-values',
    'value-def-identifier': 'textual-values',
    'keywords': 'textual-values',
    'properties': 'textual-values',
    // §5 characters-escaping 的子锚点
    'whitespace': 'characters-escaping',
    'escaped-characters': 'characters-escaping',
    'charset': 'characters-escaping',
    // §6 vendor-extensions 的子锚点
    'vendor-keywords': 'vendor-extensions',
    'vendor-keyword-history': 'vendor-extensions',
    // §7 numeric-values 的子锚点
    'numbers': 'numeric-values',
    'value-def-number': 'numeric-values',
    'value-def-integer': 'numeric-values',
    'percentage-wrt': 'numeric-values',
    // §8 length-units 的子锚点
    'value-def-length': 'length-units',
    'em-width': 'length-units',
    'absolute-lengths': 'length-units',
    // §9 other-value-types 的子锚点
    'value-def-uri': 'other-value-types',
    'value-def-counter': 'other-value-types',
    'value-def-color': 'other-value-types',
    'color-units': 'other-value-types',
  },
  // ── cascade (CSS2 Ch6) ──
  cascade: {
    'cascade': 'cascading',
    'specificity': 'cascading',
    'important-rules': 'cascading',
    'inheritance': 'defaulting',
    'initial-value': 'value-stages',
    'specified-value': 'value-stages',
    'computed-value': 'value-stages',
    'computed-values': 'value-stages',
    'actual-value': 'value-stages',
    'usedValue': 'value-stages',
    'used-value': 'value-stages',
    'at-import': 'at-import',
  },
  // ── box-model (CSS2 Ch8) ──
  'box-model': {
    'box-dimensions': 'box-model',
    'mpb-examples': 'margins',
    'collapsing-margins': 'margins',
    'bidi-box-model': 'box-model',
  },
  // ── intro (CSS2 Ch1-3) ──
  intro: {
    'conformance': 'intro',
    'q1.0': 'intro',
    'the-canvas': 'intro',
    'addressing': 'intro',
    'doctree': 'intro',
    'root': 'intro',
  },
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
  const fileName = path || '';

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
