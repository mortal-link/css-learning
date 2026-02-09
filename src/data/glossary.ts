/**
 * CSS 术语表
 *
 * 用于 SpecLink 组件：当规范原文中的粗体术语 **term** 在此表中有记录时，
 * 点击会弹出 Popover 显示中文翻译、简要解释和相关链接。
 *
 * key: 术语原文（小写），匹配时忽略大小写
 */

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
  // ── Ch 02: Syntax, Values & Units ──

  'forward-compatible parsing': {
    zh: '前向兼容解析',
    description: 'CSS 的核心设计：浏览器遇到不认识的语法时跳过而非报错，使得新特性可以安全添加到旧浏览器不会崩溃。',
    sectionRef: 'syntax#parsing-errors',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#parsing-errors',
    specUrl: 'https://www.w3.org/TR/css-syntax-3/#error-handling',
  },
  'tokenization': {
    zh: '词法分析',
    description: '将 CSS 原始文本拆分为一个个最小有意义单元（Token）的过程，是浏览器解析 CSS 的第一步。',
    sectionRef: 'syntax#syntax-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#tokenization',
    specUrl: 'https://www.w3.org/TR/css-syntax-3/#tokenization',
  },
  'identifiers': {
    zh: '标识符',
    description: 'CSS 中的命名单元，如属性名、类名、关键字等。可包含字母、数字、连字符和下划线，不能以数字开头。',
    sectionRef: 'syntax#textual-values',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#value-def-identifier',
    specUrl: 'https://www.w3.org/TR/css-values-3/#identifiers',
  },
  'identifier': {
    zh: '标识符',
    description: 'CSS 中的命名单元，如属性名、类名、关键字等。可包含字母、数字、连字符和下划线，不能以数字开头。',
    sectionRef: 'syntax#textual-values',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#value-def-identifier',
  },
  'at-keyword': {
    zh: 'At 关键字',
    description: '以 @ 字符开头的标识符（如 @media、@import），用于引入特殊规则（at-rule）。',
    sectionRef: 'syntax#syntax-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#at-rules',
    specUrl: 'https://www.w3.org/TR/css-syntax-3/#at-rules',
  },
  'at-rule': {
    zh: 'At 规则',
    description: '以 at-keyword 开头的特殊 CSS 语句，如 @import、@media、@font-face、@keyframes。',
    sectionRef: 'syntax#syntax-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#at-rules',
    specUrl: 'https://www.w3.org/TR/css-syntax-3/#at-rules',
  },
  'declaration': {
    zh: '声明',
    description: 'CSS 中的「属性名: 属性值」对，是样式规则的最小单位。例如 color: red 就是一条声明。',
    sectionRef: 'syntax#syntax-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#declaration',
    specUrl: 'https://www.w3.org/TR/css-syntax-3/#declaration',
  },
  'declaration block': {
    zh: '声明块',
    description: '花括号 {} 包裹的一组声明，通常跟在选择器后面组成规则集。',
    sectionRef: 'syntax#syntax-overview',
  },
  'rule set': {
    zh: '规则集',
    description: '选择器 + 声明块的组合，是 CSS 最常见的结构。例如 h1 { color: red; }。',
    sectionRef: 'syntax#syntax-overview',
  },
  'block': {
    zh: '块',
    description: '以左花括号 { 开始、右花括号 } 结束的内容区域。声明块、@media 的内容都是块。',
    sectionRef: 'syntax#syntax-overview',
  },
  'statement': {
    zh: '语句',
    description: 'CSS 样式表由语句序列组成，语句分为两类：规则集（ruleset）和 at-rule。',
    sectionRef: 'syntax#syntax-overview',
  },
  'ignore': {
    zh: '忽略',
    description: '当浏览器遇到无法识别的 CSS 语法时，会按照规则跳过（忽略）该部分，继续解析后续内容。',
    sectionRef: 'syntax#parsing-errors',
  },
  'ignored': {
    zh: '被忽略',
    description: '浏览器遇到无效语法时跳过该声明或规则，不影响其他样式的解析和应用。',
    sectionRef: 'syntax#parsing-errors',
  },
  'value definition syntax': {
    zh: '值定义语法',
    description: '规范中用来描述每个 CSS 属性接受什么值的专用符号系统，包括组合符（&&、||、|）和数量符（?、*、+、#）。',
    sectionRef: 'syntax#value-definition',
    css2Url: 'https://www.w3.org/TR/CSS22/about.html#value-defs',
    specUrl: 'https://www.w3.org/TR/css-values-3/#value-defs',
  },
  'keywords': {
    zh: '关键字',
    description: 'CSS 预定义的固定值，如 auto、none、inherit、initial，不需要引号。',
    sectionRef: 'syntax#textual-values',
  },
  'css-wide keywords': {
    zh: 'CSS 全局关键字',
    description: 'initial、inherit、unset、revert——这四个关键字可用于所有 CSS 属性。',
    sectionRef: 'syntax#textual-values',
    specUrl: 'https://www.w3.org/TR/css-values-3/#common-keywords',
  },
  'vendor-specific extensions': {
    zh: '厂商前缀扩展',
    description: '以连字符开头的标识符（如 -webkit-transform），属于浏览器厂商的私有扩展，不在标准规范中定义。',
    sectionRef: 'syntax#vendor-extensions',
    css2Url: 'https://www.w3.org/TR/CSS22/syndata.html#vendor-keywords',
  },

  // ── Ch 04: Cascade & Inheritance ──

  'cascading': {
    zh: '层叠',
    description: '当多条规则试图设置同一元素的同一属性时，层叠机制按来源、重要性、特异性和顺序决定最终值。',
    sectionRef: 'cascade#cascading',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#cascade',
    specUrl: 'https://www.w3.org/TR/css-cascade-4/#cascading',
  },
  'specificity': {
    zh: '特异性（优先级）',
    description: '选择器的权重三元组 (ID, Class, Type)，用于在层叠中比较同一来源、同一重要性的声明的优先级。',
    sectionRef: 'cascade#cascading',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#specificity',
    specUrl: 'https://www.w3.org/TR/selectors-4/#specificity',
  },
  'inheritance': {
    zh: '继承',
    description: '某些 CSS 属性（如 color、font-size）会自动从父元素传递到子元素，无需显式声明。',
    sectionRef: 'cascade#defaulting',
    css2Url: 'https://www.w3.org/TR/CSS22/cascade.html#inheritance',
    specUrl: 'https://www.w3.org/TR/css-cascade-4/#inheriting',
  },
  'specified value': {
    zh: '指定值',
    description: '经过层叠和默认处理后确定的属性值。如果层叠有结果就用层叠值，否则用继承值或初始值。',
    sectionRef: 'cascade#value-stages',
  },
  'computed value': {
    zh: '计算值',
    description: '将指定值中的相对值（如 em、百分比）转换为绝对值的结果。计算值是继承时传递给子元素的值。',
    sectionRef: 'cascade#value-stages',
  },
  'used value': {
    zh: '使用值',
    description: '将计算值应用到布局后的最终值。例如 width: 50% 在包含块宽度 800px 时，使用值为 400px。',
    sectionRef: 'cascade#value-stages',
  },
  'shorthand property': {
    zh: '简写属性',
    description: '同时设置多个相关属性的简写形式，如 margin、background、border。注意简写会重置所有子属性。',
    sectionRef: 'cascade#shorthand',
  },

  // ── Ch 06: Box Model ──

  'content area': {
    zh: '内容区域',
    description: '盒模型最内层的矩形区域，包含元素的实际内容（文本、图片等），大小由 width/height 属性控制。',
    sectionRef: 'box-model#box-model',
  },
  'padding area': {
    zh: '内边距区域',
    description: '内容区域和边框之间的空间，由 padding 属性控制。背景会延伸到内边距区域。',
    sectionRef: 'box-model#paddings',
  },
  'border area': {
    zh: '边框区域',
    description: '内边距和外边距之间的区域，由 border 属性控制宽度、样式和颜色。',
    sectionRef: 'box-model#borders',
  },
  'margin area': {
    zh: '外边距区域',
    description: '盒子最外层的透明区域，用于创建元素之间的间距。margin 可以为负值。',
    sectionRef: 'box-model#margins',
  },
  'margin collapsing': {
    zh: '外边距折叠',
    description: '垂直方向上相邻的 margin 会合并为一个（取较大值），而非叠加。这是 block layout 的特殊行为。',
    sectionRef: 'box-model#margins',
  },

  // ── 通用术语 ──

  'user agent': {
    zh: '用户代理（浏览器）',
    description: '解释和渲染文档的程序，通常指浏览器。UA 样式表是浏览器内置的默认样式。',
  },
  'author': {
    zh: '作者（开发者）',
    description: '创建文档和样式表的人，即网页开发者。作者样式表是开发者编写的 CSS。',
  },
  'user': {
    zh: '用户',
    description: '浏览文档的人。用户可以通过浏览器设置自定义样式表，但优先级通常低于作者样式表。',
  },
};

/**
 * 查找术语（忽略大小写）
 */
export function lookupGlossary(term: string): GlossaryEntry | null {
  const key = term.toLowerCase().trim();
  return glossary[key] ?? null;
}
