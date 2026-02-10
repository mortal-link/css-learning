/**
 * CSS 属性注册表
 *
 * 用于 SpecLink 组件：当规范原文中出现属性引用（如 #propdef-margin 锚点
 * 或加粗的 **margin-top**）时，弹出结构化属性元数据卡片。
 *
 * 数据来源：CSS2.2 规范属性定义表
 */

import { propertyTerms as cascadeProperties } from './chapters/cascade';
import { propertyTerms as boxModelProperties } from './chapters/box-model';
import { propertyTerms as commonProperties } from './chapters/common';
import { propertyTerms as visualFormattingProperties } from './chapters/visual-formatting';
import { propertyTerms as visualEffectsProperties } from './chapters/visual-effects';
import { propertyTerms as sizingProperties } from './chapters/sizing';
import { propertyTerms as fontsProperties } from './chapters/fonts';
import { propertyTerms as textProperties } from './chapters/text';
import { propertyTerms as generatedContentProperties } from './chapters/generated-content';
import { propertyTerms as colorsBackgroundsProperties } from './chapters/colors-backgrounds';
import { propertyTerms as transformsProperties } from './chapters/transforms';
import { propertyTerms as modernProperties } from './chapters/modern';

export interface PropertyEntry {
  /** 中文属性名 */
  zh: string;
  /** 值语法，如 "<margin-width>{1,4} | inherit" */
  value: string;
  /** 初始值 */
  initial: string;
  /** 适用元素 */
  appliesTo: string;
  /** 是否继承 */
  inherited: boolean;
  /** 百分比解释，null 表示 N/A */
  percentages: string | null;
  /** 计算值 */
  computedValue: string;
  /** CSS2 规范 URL */
  css2Url: string;
  /** CSS3 规范 URL */
  css3Url?: string;
  /** 站内 section 引用 "moduleId#sectionId" */
  sectionRef?: string;
}

export const properties: Record<string, PropertyEntry> = {
  ...cascadeProperties,
  ...boxModelProperties,
  ...commonProperties,
  ...visualFormattingProperties,
  ...visualEffectsProperties,
  ...sizingProperties,
  ...fontsProperties,
  ...textProperties,
  ...generatedContentProperties,
  ...colorsBackgroundsProperties,
  ...transformsProperties,
  ...modernProperties,
};

/**
 * 查询属性注册表
 * 大小写不敏感，支持带引号的属性名（如 'margin'）
 */
export function lookupProperty(name: string): PropertyEntry | null {
  const key = name.toLowerCase().trim().replace(/^'|'$/g, '');
  return properties[key] ?? null;
}
