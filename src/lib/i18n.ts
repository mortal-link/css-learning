/** 双语文本 */
export interface LocaleText {
  zh: string;
  en: string;
}

/** 支持的语言 */
export type Locale = 'zh' | 'en';

/** 默认语言 */
export const DEFAULT_LOCALE: Locale = 'zh';

/** 获取当前语言的文本 */
export function t(text: LocaleText, locale: Locale = DEFAULT_LOCALE): string {
  return text[locale];
}
