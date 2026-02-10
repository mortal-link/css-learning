// ============================================================
// Locale JSON imports (static, SSG-compatible)
// ============================================================

import zhUI from '@/locales/zh/ui.json';
import enUI from '@/locales/en/ui.json';

// ============================================================
// Types
// ============================================================

/** Backward-compatible inline bilingual text */
export interface LocaleText {
  zh: string;
  en: string;
}

/** Supported locales */
export type Locale = 'zh' | 'en';

/** All supported locales with metadata */
export const SUPPORTED_LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

/** Default locale */
export const DEFAULT_LOCALE: Locale = 'zh';

// ============================================================
// Locale data registry
// ============================================================

type LocaleMessages = Record<string, string>;

interface LocaleBundle {
  ui: LocaleMessages;
  modules?: LocaleMessages;
  stages?: LocaleMessages;
  sections?: Record<string, LocaleMessages>;
  glossary?: LocaleMessages;
  properties?: LocaleMessages;
}

const localeData: Record<Locale, LocaleBundle> = {
  zh: {
    ui: zhUI as LocaleMessages,
  },
  en: {
    ui: enUI as LocaleMessages,
  },
};

/** Register additional locale data (called during module loading) */
export function registerLocaleData(
  locale: Locale,
  namespace: keyof LocaleBundle,
  data: LocaleMessages | Record<string, LocaleMessages>,
) {
  if (namespace === 'sections') {
    if (!localeData[locale].sections) localeData[locale].sections = {};
    Object.assign(localeData[locale].sections!, data);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (localeData[locale] as any)[namespace] = data;
  }
}

// ============================================================
// Key-based lookup
// ============================================================

/**
 * Look up a translation key.
 * Supports dot-notation: 'ui.heroTitle' → localeData[locale].ui.heroTitle
 * Falls back to zh if key missing in requested locale.
 */
function lookupKey(key: string, locale: Locale): string | undefined {
  const dotIndex = key.indexOf('.');
  if (dotIndex === -1) return undefined;

  const namespace = key.substring(0, dotIndex);
  const rest = key.substring(dotIndex + 1);

  // Handle sections namespace: 'sections.intro.title' → sections['intro']['title']
  if (namespace === 'sections') {
    const secondDot = rest.indexOf('.');
    if (secondDot === -1) return undefined;
    const chapterKey = rest.substring(0, secondDot);
    const field = rest.substring(secondDot + 1);
    const sections = localeData[locale]?.sections;
    if (sections && sections[chapterKey]) {
      return sections[chapterKey][field];
    }
    // Fallback to zh
    if (locale !== 'zh') {
      const zhSections = localeData.zh?.sections;
      if (zhSections && zhSections[chapterKey]) {
        return zhSections[chapterKey][field];
      }
    }
    return undefined;
  }

  const bundle = localeData[locale]?.[namespace as keyof LocaleBundle];
  if (bundle && typeof bundle === 'object' && !Array.isArray(bundle)) {
    const value = (bundle as LocaleMessages)[rest];
    if (value !== undefined) return value;
  }

  // Fallback to zh
  if (locale !== 'zh') {
    const zhBundle = localeData.zh?.[namespace as keyof LocaleBundle];
    if (zhBundle && typeof zhBundle === 'object' && !Array.isArray(zhBundle)) {
      const value = (zhBundle as LocaleMessages)[rest];
      if (value !== undefined) return value;
    }
  }

  return undefined;
}

// ============================================================
// Overloaded t() function
// ============================================================

/**
 * Translation function — supports both styles:
 *
 *   t('ui.heroTitle', locale)   — key-based (new)
 *   t({ zh: '...', en: '...' }, locale) — inline LocaleText (legacy)
 */
export function t(keyOrText: string | LocaleText, locale: Locale = DEFAULT_LOCALE): string {
  // Legacy: inline LocaleText object
  if (typeof keyOrText === 'object' && keyOrText !== null) {
    return keyOrText[locale] ?? keyOrText.zh ?? '';
  }

  // New: key-based lookup
  const result = lookupKey(keyOrText, locale);
  if (result !== undefined) return result;

  // Return the key itself as fallback (helps debugging)
  return keyOrText;
}
