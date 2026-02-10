import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '简介', en: 'Introduction to Fonts' },
    specId: 'intro',
    summary: {
      zh: '字体是 CSS 视觉呈现的核心组成部分。CSS 提供了丰富的字体控制能力，从字体族选择到字体变体。',
      en: 'Fonts are a core component of CSS visual presentation. CSS provides rich font control capabilities, from font family selection to font variants.',
    },
    keyPoints: [
      '字体属性控制文本的视觉呈现',
      'CSS2 定义了基本字体属性（font-family、font-style、font-weight、font-size 等）',
      'CSS3 大幅扩展了字体能力（@font-face、可变字体、字体特性等）',
      '字体匹配算法确保在理想字体不可用时的优雅降级',
    ],
  },
  {
    id: 'font-family-selection',
    number: '2',
    title: { zh: '字体族选择', en: 'Font Family Selection' },
    specId: 'font-family-prop',
    summary: {
      zh: 'font-family 属性指定元素使用的字体列表。浏览器按顺序查找可用字体，最后回退到通用字体族。',
      en: 'The font-family property specifies a list of fonts for an element. The browser searches for available fonts in order, ultimately falling back to a generic font family.',
    },
    keyPoints: [
      'font-family 支持字体名列表，按优先级从高到低排列',
      '字体名包含空格或特殊字符时需要用引号包裹',
      '通用字体族（CSS2）：serif、sans-serif、monospace、cursive、fantasy',
      '通用字体族（CSS3 扩展）：system-ui、ui-serif、ui-sans-serif、ui-monospace、emoji、math、fangsong',
      '字体匹配算法会根据字体属性（style、weight、size）查找最佳匹配',
      '使用 local() 可以引用用户系统上已安装的字体',
    ],
  },
  {
    id: 'font-properties',
    number: '3',
    title: { zh: '字体属性', en: 'Font Properties' },
    specId: 'font-styling',
    summary: {
      zh: 'CSS 提供了一组属性来控制字体的风格、变体、粗细和大小。font 简写属性可以同时设置多个字体属性。',
      en: 'CSS provides a set of properties to control font style, variant, weight, and size. The font shorthand property can set multiple font properties simultaneously.',
    },
    keyPoints: [
      'font-style：控制字体风格（normal、italic、oblique）',
      'font-variant：控制小型大写字母（normal、small-caps，CSS3 大幅扩展）',
      'font-weight：控制字体粗细（normal、bold、数值 100-900）',
      'font-size：控制字体大小（绝对/相对关键字、长度、百分比）',
      'font 简写：可以同时设置 style、variant、weight、size、line-height 和 family',
      'font 简写还支持系统字体关键字（caption、icon、menu 等）',
      'CSS3 新增：font-stretch（宽度变体）、font-optical-sizing（光学尺寸）、font-synthesis（字体合成）',
    ],
  },
  {
    id: 'font-face',
    number: '4',
    title: { zh: '@font-face', en: 'Web Fonts' },
    specId: 'font-face-rule',
    summary: {
      zh: '@font-face 规则允许开发者加载自定义字体，使网页不再局限于用户系统字体。',
      en: 'The @font-face rule allows developers to load custom fonts, freeing web pages from being limited to user system fonts.',
    },
    keyPoints: [
      '@font-face 定义一个字体族名称和字体资源的映射',
      'src 描述符指定字体文件位置：url()（网络）、local()（本地系统）',
      'format() 函数声明字体格式（woff2、woff、truetype、opentype 等）',
      'unicode-range 描述符限制字体的字符范围（字体子集化）',
      'font-display 描述符控制字体加载期间的显示行为（auto、block、swap、fallback、optional）',
      'font-display: swap 最常用，立即显示后备字体，加载完成后替换',
      '描述符还包括 font-style、font-weight、font-stretch，用于匹配算法',
    ],
  },
  {
    id: 'variable-fonts',
    number: '5',
    title: { zh: '可变字体', en: 'Variable Fonts' },
    specId: 'font-variation-settings-def',
    summary: {
      zh: 'CSS3 引入的可变字体技术允许一个字体文件包含多个变体（粗细、宽度、倾斜等），通过插值实现精细控制。',
      en: 'Variable font technology introduced in CSS3 allows a single font file to contain multiple variations (weight, width, slant, etc.), enabling fine-grained control through interpolation.',
    },
    keyPoints: [
      '可变字体使用 font-variation-settings 属性控制变体轴',
      '注册轴：wght（粗细）、wdth（宽度）、slnt（倾斜）、ital（斜体）、opsz（光学尺寸）',
      '自定义轴使用 4 个大写字母标识（如 GRAD、CASL）',
      '高级属性 font-weight、font-stretch 等会自动映射到对应的变体轴',
      '可变字体减少文件数量，提升性能，提供更精细的排版控制',
      '使用 @font-face 的 font-variation-settings 描述符定义支持的轴范围',
    ],
  },
];

export const anchors: Record<string, string> = {
  'font-family-prop': 'font-family-selection',
  'font-styling': 'font-properties',
  'small-caps': 'font-properties',
  'font-boldness': 'font-properties',
  'font-size-props': 'font-properties',
  'font-shorthand': 'font-properties',
  'algorithm': 'font-family-selection',
  'propdef-font-family': 'font-family-selection',
  'propdef-font-style': 'font-properties',
  'propdef-font-variant': 'font-properties',
  'propdef-font-weight': 'font-properties',
  'propdef-font-size': 'font-properties',
  'propdef-font': 'font-properties',
  'font-face-rule': 'font-face',
  'font-variation-settings-def': 'variable-fonts',
};

// ============================================================
// 属性定义（CSS2 Ch15 Fonts + CSS3 Fonts Level 4）
// ============================================================

const CSS22_FONTS = 'https://www.w3.org/TR/CSS22/fonts.html';
const CSS3_FONTS = 'https://www.w3.org/TR/css-fonts-4/';
const CSS3_FONTS_5 = 'https://www.w3.org/TR/css-fonts-5/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // font-stretch (CSS3 新属性，CSS2 中无)
  'font-stretch': {
    zh: '字体宽度',
    value: 'normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于字体的正常宽度',
    computedValue: '关键字或百分比值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-display (CSS3 新属性，用于 @font-face)
  'font-display': {
    zh: '字体显示策略',
    value: 'auto | block | swap | fallback | optional',
    initial: 'auto',
    appliesTo: '@font-face 规则',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-face',
  },

  // font-optical-sizing (CSS3 新属性)
  'font-optical-sizing': {
    zh: '光学尺寸',
    value: 'auto | none',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS_5,
    sectionRef: 'fonts#font-properties',
  },

  // font-synthesis (CSS3 新属性)
  'font-synthesis': {
    zh: '字体合成',
    value: 'none | [ weight || style || small-caps ]',
    initial: 'weight style small-caps',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-variation-settings (CSS3 可变字体)
  'font-variation-settings': {
    zh: '字体变体设置',
    value: 'normal | [ <string> <number> ]#',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#variable-fonts',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'font family': {
    zh: '字体族',
    description: '一组具有相同设计风格的字体集合。例如 Helvetica 字体族包含多个字重和样式变体。',
    sectionRef: 'fonts#font-family-selection',
    css2Url: `${CSS22_FONTS}#font-family-prop`,
    specUrl: CSS3_FONTS,
  },
  'generic font family': {
    zh: '通用字体族',
    description: '浏览器定义的字体类别（serif、sans-serif、monospace 等），用作字体匹配的最后回退选项，确保文本始终可读。',
    sectionRef: 'fonts#font-family-selection',
    css2Url: `${CSS22_FONTS}#generic-font-families`,
    specUrl: CSS3_FONTS,
  },
  'web font': {
    zh: 'Web 字体',
    description: '通过网络加载的自定义字体，使用 @font-face 规则定义。Web 字体让网页不受用户系统字体限制。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  '@font-face': {
    zh: '@font-face 规则',
    description: '用于定义自定义字体的 CSS at-rule。指定字体名称、字体文件位置和字体描述符（weight、style 等）。',
    sectionRef: 'fonts#font-face',
    css2Url: `${CSS22_FONTS}#font-descriptions`,
    specUrl: CSS3_FONTS,
  },
  'variable font': {
    zh: '可变字体',
    description: 'OpenType 1.8 引入的字体技术，允许一个字体文件包含多个变体轴（粗细、宽度等），通过插值实现连续变化。',
    sectionRef: 'fonts#variable-fonts',
    specUrl: CSS3_FONTS,
  },
  'font matching': {
    zh: '字体匹配',
    description: '浏览器根据 font-family、font-style、font-weight 等属性查找最佳可用字体的算法。匹配失败时回退到通用字体族。',
    sectionRef: 'fonts#font-family-selection',
    css2Url: `${CSS22_FONTS}#algorithm`,
    specUrl: CSS3_FONTS,
  },
};
