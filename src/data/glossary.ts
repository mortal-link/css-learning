/**
 * CSS 术语表
 *
 * 用于 SpecLink 组件：当规范原文中的粗体术语 **term** 在此表中有记录时，
 * 点击会弹出 Popover 显示中文翻译、简要解释和相关链接。
 *
 * key: 术语原文（小写），匹配时忽略大小写
 */

import { glossaryTerms as introTerms } from './chapters/intro';
import { glossaryTerms as syntaxTerms } from './chapters/syntax';
import { glossaryTerms as selectorsTerms } from './chapters/selectors';
import { glossaryTerms as cascadeTerms } from './chapters/cascade';
import { glossaryTerms as mediaTerms } from './chapters/media';
import { glossaryTerms as boxModelTerms } from './chapters/box-model';
import { glossaryTerms as commonTerms } from './chapters/common';
import { glossaryTerms as visualFormattingTerms } from './chapters/visual-formatting';
import { glossaryTerms as visualEffectsTerms } from './chapters/visual-effects';
import { glossaryTerms as sizingTerms } from './chapters/sizing';
import { glossaryTerms as fontsTerms } from './chapters/fonts';
import { glossaryTerms as textTerms } from './chapters/text';
import { glossaryTerms as generatedContentTerms } from './chapters/generated-content';
import { glossaryTerms as colorsBackgroundsTerms } from './chapters/colors-backgrounds';
import { glossaryTerms as transformsTerms } from './chapters/transforms';
import { glossaryTerms as modernTerms } from './chapters/modern';

export interface GlossaryEntry {
  /** 中文翻译 */
  zh: string;
  /** 简要解释（1-2 句话） */
  description: string;
  /** 相关的站内 section（moduleId#sectionId），可选 */
  sectionRef?: string;
  /** CSS2.1 规范 URL，可选 */
  css2Url?: string;
  /** CSS3/最新规范 URL，可选 */
  specUrl?: string;
}

export const glossary: Record<string, GlossaryEntry> = {
  ...introTerms,
  ...syntaxTerms,
  ...selectorsTerms,
  ...cascadeTerms,
  ...mediaTerms,
  ...boxModelTerms,
  ...commonTerms,
  ...visualFormattingTerms,
  ...visualEffectsTerms,
  ...sizingTerms,
  ...fontsTerms,
  ...textTerms,
  ...generatedContentTerms,
  ...colorsBackgroundsTerms,
  ...transformsTerms,
  ...modernTerms,
};

export function lookupGlossary(term: string): GlossaryEntry | null {
  const key = term.toLowerCase().trim();
  return glossary[key] ?? null;
}
