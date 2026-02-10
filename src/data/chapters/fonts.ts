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
      '所有字体属性均可继承，子元素默认沿用父元素的字体设置',
      '字体匹配以字符为单位进行——同一元素中不同字符可能使用不同字体',
      'CSS 中的"字体族"是复合概念，一个族包含多个字面（face），按 style/weight/stretch 区分',
      '字体分类无统一标准，italic/oblique/cursive 等术语在不同字体族中含义可能不同',
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
      '匹配顺序：先匹配 font-style，再匹配 font-weight，最后匹配 font-size',
      '通用字体族名称是关键字，不能加引号；与 inherit/default 同名的字体名必须加引号',
      '当某字符在当前字体中无字形时，浏览器会自动尝试列表中的下一个字体（逐字符回退）',
      '不同平台（Windows/macOS/Linux）的默认字体映射不同，建议始终提供通用字体族作为兜底',
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
      'font-size-adjust 用于在回退字体时保持 x 字高比例一致，改善可读性',
      'CSS3 扩展 font-variant 为多个子属性：font-variant-ligatures、font-variant-caps、font-variant-numeric、font-variant-east-asian',
      'font 简写会将未显式指定的子属性重置为初始值；font-size 和 font-family 是必填项',
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
      'WOFF2 是推荐的 Web 字体格式，压缩率最高（比 WOFF 1.0 小约 30%）',
      '跨域加载字体受同源策略限制，需服务器设置 CORS 头（Access-Control-Allow-Origin）',
      'CSS Font Loading API（FontFace / FontFaceSet）允许 JavaScript 精确控制字体加载时机和状态',
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
      '应优先使用高级属性（font-weight 等）而非 font-variation-settings，因为高级属性可独立级联且支持合成',
      'font-feature-settings 控制 OpenType 特性（连字、数字形式等），同理应优先使用 font-variant-* 子属性',
      '可变字体支持命名实例（named instances），预设常用的轴值组合，类似传统字体族中的 Regular/Bold 等',
      '轴值超出字体支持范围时会被钳制（clamp）到最近的有效值',
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
  // ---- CSS2 基本字体属性 ----

  // font-family
  'font-family': {
    zh: '字体族',
    value: '[ <family-name> | <generic-family> ] [, [ <family-name> | <generic-family> ] ]* | inherit',
    initial: '取决于用户代理',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${CSS22_FONTS}#propdef-font-family`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-family-selection',
  },

  // font-style
  'font-style': {
    zh: '字体风格',
    value: 'normal | italic | oblique | oblique <angle>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定关键字，oblique 含计算后的角度值',
    css2Url: `${CSS22_FONTS}#propdef-font-style`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-variant
  'font-variant': {
    zh: '字体变体',
    value: 'normal | small-caps（CSS2）；CSS3 扩展为简写属性',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${CSS22_FONTS}#propdef-font-variant`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-weight
  'font-weight': {
    zh: '字体粗细',
    value: 'normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | <number [1,1000]>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '数值（normal 为 400，bold 为 700；bolder/lighter 根据继承值计算）',
    css2Url: `${CSS22_FONTS}#propdef-font-weight`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-size
  'font-size': {
    zh: '字体大小',
    value: '<absolute-size> | <relative-size> | <length-percentage [0,∞]>',
    initial: 'medium',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于父元素的字体大小',
    computedValue: '绝对长度',
    css2Url: `${CSS22_FONTS}#propdef-font-size`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font（简写）
  'font': {
    zh: '字体简写',
    value: '[ [ <font-style> || <font-variant> || <font-weight> ]? <font-size> [ / <line-height> ]? <font-family> ] | caption | icon | menu | message-box | small-caption | status-bar',
    initial: '见各子属性',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: `${CSS22_FONTS}#propdef-font`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // ---- CSS3 新增属性 ----

  // font-size-adjust
  'font-size-adjust': {
    zh: '字体大小调整',
    value: 'none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number [0,∞]> ]',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定关键字或数值',
    css2Url: '',
    css3Url: CSS3_FONTS_5,
    sectionRef: 'fonts#font-properties',
  },

  // font-feature-settings
  'font-feature-settings': {
    zh: '字体特性设置',
    value: 'normal | [ <feature-tag-value> ]#',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#variable-fonts',
  },

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
  'font stack': {
    zh: '字体栈',
    description: 'font-family 属性中按优先级排列的字体名称列表。浏览器从左到右依次查找可用字体，最后一项通常是通用字体族。',
    sectionRef: 'fonts#font-family-selection',
    specUrl: CSS3_FONTS,
  },
  'system fonts': {
    zh: '系统字体',
    description: '通过 font 简写关键字（caption、icon、menu、message-box、small-caption、status-bar）访问的操作系统 UI 字体。',
    sectionRef: 'fonts#font-properties',
    css2Url: `${CSS22_FONTS}#propdef-font`,
    specUrl: CSS3_FONTS,
  },
  'font-size-adjust': {
    zh: '字体大小调整',
    description: '用于在回退字体时保持 x 字高（或其他度量）与首选字体一致的属性，避免因字体切换导致的可读性变化。',
    sectionRef: 'fonts#font-properties',
    specUrl: CSS3_FONTS_5,
  },
  'font feature': {
    zh: '字体特性',
    description: 'OpenType/TrueType 字体中定义的高级排版功能，如连字（liga）、小型大写（smcp）、表格数字（tnum）等，通过 font-feature-settings 或 font-variant-* 启用。',
    sectionRef: 'fonts#variable-fonts',
    specUrl: CSS3_FONTS,
  },
  'opentype': {
    zh: 'OpenType 字体格式',
    description: '由 Microsoft 和 Adobe 联合开发的字体格式标准，支持丰富的排版特性（连字、替代字形等）和可变字体技术。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'woff2': {
    zh: 'WOFF2 字体格式',
    description: 'Web Open Font Format 2.0，专为 Web 优化的字体压缩格式。相比 WOFF 1.0 体积缩小约 30%，是现代 Web 字体的推荐格式。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'font subsetting': {
    zh: '字体子集化',
    description: '仅包含页面实际使用的字符的字体文件裁剪技术，配合 unicode-range 描述符可大幅减少字体下载体积。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'unicode-range': {
    zh: 'Unicode 范围',
    description: '@font-face 描述符，指定字体覆盖的 Unicode 码点范围。浏览器仅在页面包含该范围内的字符时才下载对应字体文件。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'font-display': {
    zh: '字体显示策略',
    description: '@font-face 描述符，控制字体加载期间的渲染行为。定义阻塞期、交换期和失败期三个阶段的显示策略。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'composite font': {
    zh: '复合字体',
    description: '由多个 @font-face 规则通过相同 font-family 名称和不同 unicode-range 组合而成的虚拟字体，可为不同字符范围使用不同物理字体。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'ex unit': {
    zh: 'ex 单位',
    description: '相对长度单位，等于当前字体中小写字母 x 的高度（x-height）。当字体无法确定 x-height 时，通常取 0.5em。',
    sectionRef: 'fonts#font-properties',
    css2Url: `${CSS22_FONTS}#font-size-props`,
    specUrl: CSS3_FONTS,
  },
  'ch unit': {
    zh: 'ch 单位',
    description: '相对长度单位，等于当前字体中字符 "0"（U+0030）的前进宽度。常用于设置等宽字体的列宽。',
    sectionRef: 'fonts#font-properties',
    specUrl: CSS3_FONTS,
  },
};
