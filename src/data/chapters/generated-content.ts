import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'pseudo-elements',
    number: '1',
    title: { zh: '伪元素', en: 'Pseudo-elements' },
    summary:
      'CSS 伪元素允许在文档树之外创建抽象元素。::before 和 ::after 是最常用的伪元素,通过 content 属性生成内容。',
    keyPoints: [
      '::before 在元素内容之前插入生成内容',
      '::after 在元素内容之后插入生成内容',
      'content 属性控制生成的内容',
      'CSS3 扩展了伪元素系统,新增 ::marker、::placeholder、::selection 等',
      '伪元素使用双冒号(::)语法,以区别于伪类(:)',
    ],
  },
  {
    id: 'content-property',
    number: '2',
    title: { zh: 'content 属性', en: 'The content property' },
    summary:
      'content 属性定义伪元素生成的内容。支持字符串、URI、attr() 函数、计数器、引号等多种值类型。',
    keyPoints: [
      '字符串值直接插入文本内容',
      'url() 插入外部资源(图片、音频等)',
      'attr() 获取元素属性值作为内容',
      'counter() 和 counters() 插入计数器值',
      'open-quote、close-quote 插入引号',
      'normal 值表示伪元素不生成内容',
      'none 值表示伪元素完全不生成',
      'CSS3 扩展了 image()、element() 等新函数',
    ],
  },
  {
    id: 'quotes',
    number: '3',
    title: { zh: '引号', en: 'Quotation marks' },
    summary:
      'quotes 属性定义嵌套引号的样式。配合 content 属性的 open-quote 和 close-quote 值,可以自动处理多层嵌套的引号。',
    keyPoints: [
      'quotes 属性定义引号对列表,支持多层嵌套',
      'open-quote 插入当前嵌套层级的开引号',
      'close-quote 插入当前嵌套层级的闭引号',
      'no-open-quote 和 no-close-quote 调整嵌套层级但不插入引号',
      '引号样式随语言和文化习惯而异',
      '浏览器会自动追踪引号嵌套深度',
    ],
  },
  {
    id: 'counters',
    number: '4',
    title: { zh: '计数器', en: 'Automatic counters and numbering' },
    summary:
      'CSS 计数器系统允许自动生成和管理数字序列。counter-reset 初始化计数器,counter-increment 递增计数器,counter()/counters() 函数输出计数器值。',
    keyPoints: [
      'counter-reset 创建或重置计数器',
      'counter-increment 递增(或递减)计数器',
      'counter() 函数输出单个计数器值',
      'counters() 函数输出嵌套计数器的层级序列(如 1.2.3)',
      '计数器支持多种数字格式(十进制、罗马数字、字母等)',
      '计数器遵循文档树的结构和层叠规则',
      '一个元素可以同时操作多个计数器',
    ],
  },
  {
    id: 'lists',
    number: '5',
    title: { zh: '列表样式', en: 'Lists' },
    summary:
      '列表样式属性控制列表项标记的类型、位置和图片。list-style 简写属性整合了 list-style-type、list-style-position 和 list-style-image。',
    keyPoints: [
      'list-style-type 定义标记类型(disc、circle、square、decimal 等)',
      'list-style-image 使用图片作为标记',
      'list-style-position 控制标记位置(inside 或 outside)',
      'list-style 简写可同时设置三个子属性',
      'CSS Lists Level 3 引入 ::marker 伪元素,可直接样式化标记盒',
      '标记盒(marker box)是特殊的生成内容',
    ],
  },
];

export const anchors: Record<string, string> = {
  'before-after-content': 'pseudo-elements',
  'generated-text': 'content-property',
  'quotes': 'quotes',
  'counters': 'counters',
  'lists': 'lists',
  'propdef-content': 'content-property',
  'propdef-quotes': 'quotes',
  'propdef-counter-reset': 'counters',
  'propdef-counter-increment': 'counters',
  'propdef-list-style': 'lists',
  'propdef-list-style-type': 'lists',
  'propdef-list-style-image': 'lists',
  'propdef-list-style-position': 'lists',
};

// ============================================================
// 属性定义（CSS2.2 Ch12 Generated Content）
// ============================================================

// 所有 CSS2 生成内容相关属性已在 common.ts 中定义:
// - content
// - quotes
// - counter-increment
// - counter-reset
// - list-style
// - list-style-type
// - list-style-image
// - list-style-position

// CSS3 新增属性(如果有)可在此定义
export const propertyTerms: Record<string, PropertyEntry> = {};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'pseudo-element': {
    zh: '伪元素',
    description:
      '不存在于文档树中的抽象元素,由 CSS 创建。常见的伪元素包括 ::before、::after、::first-line、::first-letter 等。伪元素使用双冒号(::)语法。',
    sectionRef: 'generated-content#pseudo-elements',
    css2Url: 'https://www.w3.org/TR/CSS22/generate.html#before-after-content',
    specUrl: 'https://www.w3.org/TR/css-pseudo-4/',
  },
  'generated content': {
    zh: '生成内容',
    description:
      '由 CSS 而非文档源码生成的内容。通过 ::before 和 ::after 伪元素配合 content 属性创建。生成内容可以包含文本、图片、计数器、引号等。',
    sectionRef: 'generated-content#content-property',
    css2Url: 'https://www.w3.org/TR/CSS22/generate.html#content',
    specUrl: 'https://www.w3.org/TR/css-content-3/',
  },
  'counter': {
    zh: '计数器',
    description:
      'CSS 维护的自动编号系统。通过 counter-reset 初始化、counter-increment 递增、counter()/counters() 输出。常用于章节编号、列表序号等场景。',
    sectionRef: 'generated-content#counters',
    css2Url: 'https://www.w3.org/TR/CSS22/generate.html#counters',
    specUrl: 'https://www.w3.org/TR/css-lists-3/#counters',
  },
  'marker box': {
    zh: '标记盒',
    description:
      '列表项自动生成的标记区域,包含列表标记(如圆点、数字)。CSS Lists Level 3 引入 ::marker 伪元素,允许直接样式化标记盒的内容和外观。',
    sectionRef: 'generated-content#lists',
    css2Url: 'https://www.w3.org/TR/CSS22/generate.html#lists',
    specUrl: 'https://www.w3.org/TR/css-lists-3/#marker-pseudo-element',
  },
};
