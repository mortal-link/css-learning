import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'text-indent-align',
    number: '1',
    title: { zh: '缩进与对齐', en: 'Indentation and Alignment' },
    specId: 'text-indent-align',
    summary:
      'text-indent 控制块容器首行的缩进量,text-align 控制行内内容的水平对齐方式。CSS3 新增 text-align-last 和 text-justify 提供更精细的对齐控制。',
    keyPoints: [
      'text-indent 可使用长度或百分比,支持负值实现悬挂缩进',
      'text-align 支持 left/right/center/justify 四种基本对齐',
      'CSS3: text-align-last 单独控制最后一行的对齐',
      'CSS3: text-justify 控制 justify 对齐的具体算法',
      '继承性:text-indent 和 text-align 均可继承',
    ],
  },
  {
    id: 'decoration',
    number: '2',
    title: { zh: '文本装饰', en: 'Text Decoration' },
    specId: 'decoration',
    summary:
      'text-decoration 为文本添加下划线、上划线、删除线等装饰线。CSS3 将其拆分为多个子属性,支持装饰线的颜色、样式、粗细等精细控制。',
    keyPoints: [
      'CSS2: text-decoration 支持 underline/overline/line-through/blink',
      'CSS3: 拆分为 text-decoration-line/color/style/thickness 子属性',
      'text-underline-offset 控制下划线与文本的距离',
      'text-underline-position 控制下划线的绘制位置',
      'text-decoration 不可继承,但装饰会应用到所有后代内联元素',
    ],
  },
  {
    id: 'transform-spacing',
    number: '3',
    title: { zh: '变换与间距', en: 'Transform and Spacing' },
    specId: 'transform-spacing',
    summary:
      'text-transform 控制文本大小写转换,letter-spacing 和 word-spacing 控制字符和单词间距。CSS3 新增断行和连字符控制。',
    keyPoints: [
      'text-transform: capitalize/uppercase/lowercase/none',
      'letter-spacing 控制字符间距,word-spacing 控制单词间距',
      'CSS3: word-break 控制单词内断行规则(CJK vs 拉丁文)',
      'CSS3: overflow-wrap(word-wrap) 控制长单词是否可断行',
      'CSS3: hyphens 控制是否自动插入连字符',
    ],
  },
  {
    id: 'white-space',
    number: '4',
    title: { zh: '空白处理', en: 'White Space Handling' },
    specId: 'white-space',
    summary:
      'white-space 属性控制如何处理元素内的空白字符和换行。CSS3 提供更细粒度的 white-space-collapse 和 text-wrap 属性。',
    keyPoints: [
      'normal: 合并空白,自动换行',
      'pre: 保留空白和换行,不自动换行',
      'nowrap: 合并空白,不自动换行',
      'pre-wrap: 保留空白和换行,自动换行',
      'pre-line: 保留换行但合并其他空白,自动换行',
      'CSS3: tab-size 控制制表符的显示宽度',
    ],
  },
  {
    id: 'writing-modes',
    number: '5',
    title: { zh: '书写模式', en: 'Writing Modes' },
    specId: 'writing-modes',
    summary:
      'CSS3 书写模式模块定义了文本的排版方向和布局流。支持横排、竖排以及从右到左的书写系统,并提供逻辑属性映射到物理属性的机制。',
    keyPoints: [
      'writing-mode 控制块流方向和行内方向(横排/竖排)',
      'text-orientation 控制字符在垂直文本中的方向',
      'direction 和 unicode-bidi 控制双向文本(如阿拉伯文/希伯来文)',
      '逻辑属性(inline-start/block-end)自动映射到物理属性(left/top/right/bottom)',
      '垂直文本排版对中日韩语言至关重要',
    ],
  },
];

export const anchors: Record<string, string> = {
  'indentation': 'text-indent-align',
  'alignment': 'text-indent-align',
  'text-align-prop': 'text-indent-align',
  'decoration': 'decoration',
  'lining-striking-props': 'decoration',
  'caps-prop': 'transform-spacing',
  'spacing-props': 'transform-spacing',
  'white-space-prop': 'white-space',
  'white-space-processing': 'white-space',
  'writing-mode': 'writing-modes',
  'bidi': 'writing-modes',
  'propdef-text-indent': 'text-indent-align',
  'propdef-text-align': 'text-indent-align',
  'propdef-text-decoration': 'decoration',
  'propdef-text-transform': 'transform-spacing',
  'propdef-letter-spacing': 'transform-spacing',
  'propdef-word-spacing': 'transform-spacing',
  'propdef-white-space': 'white-space',
};

// ============================================================
// 属性定义 (CSS2.2 Ch16 Text + CSS3 扩展)
// ============================================================

const TEXT = 'https://www.w3.org/TR/CSS22/text.html';
const TEXT3 = 'https://www.w3.org/TR/css-text-3/';
const TEXT_DECOR3 = 'https://www.w3.org/TR/css-text-decor-3/';
const WRITING_MODES4 = 'https://www.w3.org/TR/css-writing-modes-4/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ── CSS3 新增属性:text-align 扩展 ──
  'text-align-last': {
    zh: '最后一行对齐',
    value: 'auto | start | end | left | right | center | justify',
    initial: 'auto',
    appliesTo: '块级容器',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#text-indent-align',
  },
  'text-justify': {
    zh: '对齐算法',
    value: 'auto | inter-word | inter-character | none',
    initial: 'auto',
    appliesTo: '块级容器和内联盒',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#text-indent-align',
  },

  // ── CSS3 新增属性:text-decoration 拆分 ──
  'text-decoration-line': {
    zh: '文本装饰线',
    value: 'none | [ underline || overline || line-through || blink ]',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT_DECOR3,
    sectionRef: 'text#decoration',
  },
  'text-decoration-color': {
    zh: '文本装饰色',
    value: '<color>',
    initial: 'currentcolor',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '计算后的颜色值',
    css2Url: '',
    css3Url: TEXT_DECOR3,
    sectionRef: 'text#decoration',
  },
  'text-decoration-style': {
    zh: '文本装饰样式',
    value: 'solid | double | dotted | dashed | wavy',
    initial: 'solid',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT_DECOR3,
    sectionRef: 'text#decoration',
  },
  'text-decoration-thickness': {
    zh: '文本装饰粗细',
    value: 'auto | from-font | <length> | <percentage>',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: '相对于元素字体大小',
    computedValue: '指定值(百分比转为绝对长度)',
    css2Url: '',
    css3Url: TEXT_DECOR3,
    sectionRef: 'text#decoration',
  },
  'text-underline-offset': {
    zh: '下划线偏移',
    value: 'auto | <length> | <percentage>',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于元素字体大小',
    computedValue: '指定值(百分比转为绝对长度)',
    css2Url: '',
    css3Url: TEXT_DECOR3,
    sectionRef: 'text#decoration',
  },
  'text-underline-position': {
    zh: '下划线位置',
    value: 'auto | from-font | [ under || [ left | right ] ]',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT_DECOR3,
    sectionRef: 'text#decoration',
  },

  // ── CSS3 新增属性:断行与连字符 ──
  'word-break': {
    zh: '单词断行',
    value: 'normal | break-all | keep-all | break-word',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#transform-spacing',
  },
  'overflow-wrap': {
    zh: '溢出换行',
    value: 'normal | break-word | anywhere',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#transform-spacing',
  },
  'word-wrap': {
    zh: '单词换行(别名)',
    value: 'normal | break-word',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#transform-spacing',
  },
  'hyphens': {
    zh: '连字符',
    value: 'none | manual | auto',
    initial: 'manual',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#transform-spacing',
  },

  // ── CSS3 新增属性:white-space 细化 ──
  'white-space-collapse': {
    zh: '空白折叠',
    value: 'collapse | preserve | preserve-breaks | preserve-spaces | break-spaces',
    initial: 'collapse',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#white-space',
  },
  'text-wrap': {
    zh: '文本换行',
    value: 'wrap | nowrap | balance | stable | pretty',
    initial: 'wrap',
    appliesTo: '块级容器和内联盒',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#white-space',
  },
  'tab-size': {
    zh: '制表符宽度',
    value: '<number> | <length>',
    initial: '8',
    appliesTo: '块级容器',
    inherited: true,
    percentages: null,
    computedValue: '指定值(长度转为绝对值)',
    css2Url: '',
    css3Url: TEXT3,
    sectionRef: 'text#white-space',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'text decoration': {
    zh: '文本装饰',
    description: '为文本添加的视觉装饰线,如下划线、上划线、删除线等。CSS3 允许精细控制装饰线的颜色、样式、粗细和位置。',
    sectionRef: 'text#decoration',
    css2Url: `${TEXT}#propdef-text-decoration`,
    specUrl: TEXT_DECOR3,
  },
  'writing mode': {
    zh: '书写模式',
    description: '定义文本的排版方向(横排/竖排)和块流方向。支持中日韩竖排、阿拉伯文从右到左等多种书写系统。',
    sectionRef: 'text#writing-modes',
    specUrl: WRITING_MODES4,
  },
  'logical property': {
    zh: '逻辑属性',
    description: '基于书写模式的相对方向属性(如 inline-start/block-end),自动映射到物理属性(left/top/right/bottom)。使 CSS 适配不同书写方向。',
    sectionRef: 'text#writing-modes',
    specUrl: 'https://www.w3.org/TR/css-logical-1/',
  },
  'white space': {
    zh: '空白字符',
    description: 'HTML 中的空格、制表符、换行符等。white-space 属性控制如何处理这些字符(保留/合并/换行)。',
    sectionRef: 'text#white-space',
    css2Url: `${TEXT}#propdef-white-space`,
    specUrl: TEXT3,
  },
  'hyphenation': {
    zh: '连字符断字',
    description: '在单词内适当位置插入连字符并换行,避免行尾出现过长单词。hyphens 属性控制是否自动断字。',
    sectionRef: 'text#transform-spacing',
    specUrl: TEXT3,
  },
  'line breaking': {
    zh: '断行规则',
    description: '决定文本如何在行尾换行。不同语言有不同规则:CJK 字符间可断行,拉丁文需在单词边界断行。word-break 和 overflow-wrap 控制断行行为。',
    sectionRef: 'text#transform-spacing',
    specUrl: TEXT3,
  },
  'text alignment': {
    zh: '文本对齐',
    description: '控制行内内容在行框内的水平对齐方式。text-align 支持 left/right/center/justify 四种基本对齐,justify 会调整字符间距使行两端对齐。',
    sectionRef: 'text#text-indent-align',
    css2Url: `${TEXT}#propdef-text-align`,
    specUrl: TEXT3,
  },
  'bidi': {
    zh: '双向文本',
    description: '混合从左到右(如英文)和从右到左(如阿拉伯文)书写方向的文本。Unicode 双向算法和 direction/unicode-bidi 属性共同处理双向文本排版。',
    sectionRef: 'text#writing-modes',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#propdef-direction',
    specUrl: WRITING_MODES4,
  },
  'text indent': {
    zh: '文本缩进',
    description: '块容器首行文本的水平偏移量。text-indent 可使用长度或百分比,支持负值实现悬挂缩进(首行突出,其余行缩进)。',
    sectionRef: 'text#text-indent-align',
    css2Url: `${TEXT}#propdef-text-indent`,
    specUrl: TEXT3,
  },
  'letter spacing': {
    zh: '字符间距',
    description: '字符之间的额外空间。letter-spacing 增加或减少字符间距,常用于标题或品牌文字的视觉调整。',
    sectionRef: 'text#transform-spacing',
    css2Url: `${TEXT}#propdef-letter-spacing`,
    specUrl: TEXT3,
  },
  'word spacing': {
    zh: '单词间距',
    description: '单词(空格分隔的标记)之间的额外空间。word-spacing 调整单词间距,影响 justify 对齐的拉伸效果。',
    sectionRef: 'text#transform-spacing',
    css2Url: `${TEXT}#propdef-word-spacing`,
    specUrl: TEXT3,
  },
};
