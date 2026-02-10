import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'containing-block',
    number: '1',
    title: { zh: '包含块', en: 'Containing Block Definition' },
    summary: { zh: '包含块是 CSS 布局中的核心概念，它决定了元素的尺寸和位置的计算基准。', en: 'The containing block is a core concept in CSS layout, determining the reference frame for calculating element dimensions and positions.' },
    keyPoints: [
      '包含块的确定规则取决于元素的定位方式',
      'static/relative 定位：最近块级祖先的内容边界',
      'absolute 定位：最近非 static 祖先的内边距边界',
      'fixed 定位：视口或页面区域',
      '包含块决定百分比宽高和偏移属性的计算基准',
    ],
    specId: 'containing-block-details',
  },
  {
    id: 'width-calculation',
    number: '2',
    title: { zh: '宽度计算', en: 'Width Calculation' },
    summary: { zh: 'CSS 中元素的宽度计算规则因元素类型和定位方式而异，理解这些规则对于精确控制布局至关重要。', en: 'Width calculation rules in CSS vary by element type and positioning method, and understanding these rules is crucial for precise layout control.' },
    keyPoints: [
      '行内非替换元素的 width 属性不适用',
      '块级元素的水平尺寸必须满足包含块宽度等式',
      'auto width 会填充可用空间',
      'margin: auto 可实现水平居中',
      'min-width/max-width 约束最终宽度',
      'CSS3 内在尺寸：min-content, max-content, fit-content',
    ],
    specId: 'Computing_widths_and_margins',
  },
  {
    id: 'height-calculation',
    number: '3',
    title: { zh: '高度计算', en: 'Height Calculation' },
    summary: { zh: 'CSS 中元素的高度计算规则与宽度计算类似，但在处理 auto 值和百分比值时有重要区别。', en: 'Height calculation rules in CSS are similar to width calculation, but have important differences when handling auto values and percentage values.' },
    keyPoints: [
      '行内非替换元素的高度由 line-height 决定',
      'auto height 取决于子元素的内容高度',
      '百分比高度需要包含块有明确高度',
      'line-height 控制行内元素的行高',
      'min-height/max-height 约束最终高度',
    ],
    specId: 'Computing_heights_and_margins',
  },
  {
    id: 'alignment',
    number: '4',
    title: { zh: '盒对齐', en: 'Box Alignment' },
    summary: { zh: 'CSS Box Alignment Module Level 3 提供了统一的对齐属性，适用于 Flexbox、Grid、Block 等多种布局模式。', en: 'CSS Box Alignment Module Level 3 provides unified alignment properties applicable to multiple layout modes including Flexbox, Grid, and Block.' },
    keyPoints: [
      'justify-content: 主轴方向的空间分配',
      'align-items: 交叉轴方向的默认对齐',
      'align-self: 单个元素的交叉轴对齐',
      'align-content: 多行内容的交叉轴分布',
      'place-items/place-self/place-content: 简写属性',
    ],
  },
  {
    id: 'intrinsic-sizing',
    number: '5',
    title: { zh: '内在尺寸', en: 'Intrinsic Sizing' },
    summary: { zh: 'CSS3 引入了基于内容的尺寸关键字和宽高比控制，使得响应式设计更加灵活和强大。', en: 'CSS3 introduced content-based sizing keywords and aspect ratio control, making responsive design more flexible and powerful.' },
    keyPoints: [
      'min-content: 不溢出的最小可能尺寸',
      'max-content: 不换行时的尺寸',
      'fit-content: 在 min-content 和 max-content 之间智能选择',
      'aspect-ratio: 定义元素的首选宽高比',
      'box-sizing: 控制 width/height 是否包含 padding 和 border',
    ],
  },
];

// 保留原始详细内容作为注释或未来使用
/*
旧版详细内容结构（已废弃）:
  {
    id: 'containing-block',
    title: '包含块',
    titleEn: 'Containing Block Definition',
    content: `
*/

export const anchors: Record<string, string> = {
  'containing-block-details': 'containing-block',
  'Computing_widths_and_margins': 'width-calculation',
  'Computing_heights_and_margins': 'height-calculation',
  'the-width-property': 'width-calculation',
  'the-height-property': 'height-calculation',
  'min-max-widths': 'width-calculation',
  'min-max-heights': 'height-calculation',
  'line-height': 'height-calculation',
  'propdef-width': 'width-calculation',
  'propdef-height': 'height-calculation',
  'propdef-min-width': 'width-calculation',
  'propdef-max-width': 'width-calculation',
  'propdef-min-height': 'height-calculation',
  'propdef-max-height': 'height-calculation',
  'propdef-line-height': 'height-calculation',
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'containing block': {
    zh: '包含块',
    description:
      '包含块是用于计算元素尺寸和位置的参照矩形区域。包含块的确定规则取决于元素的定位方式：static 和 relative 定位元素的包含块是最近块级祖先的内容区域；absolute 定位元素的包含块是最近非 static 定位祖先的内边距区域；fixed 定位元素的包含块是视口。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#containing-block-details',
    sectionRef: 'sizing#containing-block',
  },
  'intrinsic size': {
    zh: '内在尺寸',
    description:
      '内在尺寸是元素基于其内容的自然尺寸，不考虑外部约束。CSS3 引入了 min-content（不溢出的最小尺寸）、max-content（不换行时的尺寸）和 fit-content（两者之间的智能折中）等关键字来表示不同类型的内在尺寸。',
    specUrl: 'https://www.w3.org/TR/css-sizing-3/#intrinsic-sizes',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'extrinsic size': {
    zh: '外在尺寸',
    description:
      '外在尺寸是由外部因素决定的元素尺寸，而非元素的内容。外部因素包括包含块的尺寸、显式的 width/height 值、min-width/max-width 约束等。外在尺寸与内在尺寸相对，两者共同决定元素的最终尺寸。',
    specUrl: 'https://www.w3.org/TR/css-sizing-3/#extrinsic-sizes',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'auto sizing': {
    zh: '自动尺寸',
    description:
      '自动尺寸是指 width 或 height 属性值为 auto 时的尺寸计算行为。auto 的具体行为取决于元素类型和布局上下文：对于块级元素，auto 宽度会填充包含块；auto 高度会适应内容。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#the-width-property',
    sectionRef: 'sizing#width-calculation',
  },
  'aspect ratio': {
    zh: '宽高比',
    description:
      '宽高比是元素宽度与高度的比例关系。CSS3 引入了 aspect-ratio 属性来为元素定义首选的宽高比。当只指定一个维度时，另一个维度会根据宽高比自动计算，这对于响应式媒体内容和防止布局偏移（CLS）非常有用。',
    specUrl: 'https://www.w3.org/TR/css-sizing-4/#aspect-ratio',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'box alignment': {
    zh: '盒对齐',
    description:
      '盒对齐是 CSS Box Alignment Module Level 3 提供的一套统一的对齐属性系统，适用于 Flexbox、Grid、Block 和 Table 等多种布局模式。核心属性包括：justify-content（主轴分布）、align-items（交叉轴对齐）、align-self（单个元素对齐）、align-content（多行分布）。',
    specUrl: 'https://www.w3.org/TR/css-align-3/',
    sectionRef: 'sizing#alignment',
  },
  'definite': {
    zh: '确定的',
    description:
      '尺寸值已确定(非 auto、非内容依赖)的状态。确定尺寸可以直接计算,无需依赖内容或布局。',
    sectionRef: 'sizing#sizing-model',
  },
  'content-based minimum size': {
    zh: '基于内容的最小尺寸',
    description:
      'Flex/Grid 项目的自动最小尺寸,确保项目不会缩小到无法显示其内容。可通过 min-width: 0 覆盖。',
    sectionRef: 'sizing#sizing-model',
  },
  'specified size suggestion': {
    zh: '指定尺寸建议',
    description:
      '尺寸算法中由 width/height 属性显式指定的目标尺寸。在 Flex/Grid 布局中作为弹性计算的参考输入。',
    sectionRef: 'sizing#sizing-model',
  },
  'transferred size suggestion': {
    zh: '传递尺寸建议',
    description:
      '通过宽高比(aspect-ratio)从另一轴传递过来的尺寸建议。用于保持元素的固有比例。',
    sectionRef: 'sizing#sizing-model',
  },
  'content size suggestion': {
    zh: '内容尺寸建议',
    description:
      '由元素内容本身决定的尺寸建议,即 min-content 或 max-content 尺寸。',
    sectionRef: 'sizing#sizing-model',
  },
  'stretch': {
    zh: '拉伸',
    description:
      '对齐属性的值之一。使项目在交叉轴方向拉伸填满容器(减去 margin)。Flexbox 交叉轴的默认对齐方式。',
    sectionRef: 'sizing#sizing-model',
  },
};

export const propertyTerms: Record<string, PropertyEntry> = {
  width: {
    zh: '宽度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格行、行组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-width',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-width',
    sectionRef: 'sizing#width-calculation',
  },
  height: {
    zh: '高度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格列、列组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的高度（如果包含块高度不明确，则视为 auto）',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-height',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-height',
    sectionRef: 'sizing#height-calculation',
  },
  'min-width': {
    zh: '最小宽度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格行、行组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-widths',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-min-width',
    sectionRef: 'sizing#width-calculation',
  },
  'max-width': {
    zh: '最大宽度',
    value: '<length> | <percentage> | none | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'none',
    appliesTo: '除行内非替换元素、表格行、行组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '百分比、none 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-widths',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-max-width',
    sectionRef: 'sizing#width-calculation',
  },
  'min-height': {
    zh: '最小高度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格列、列组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的高度（如果包含块高度不明确，则视为 auto）',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-heights',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-min-height',
    sectionRef: 'sizing#height-calculation',
  },
  'max-height': {
    zh: '最大高度',
    value: '<length> | <percentage> | none | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'none',
    appliesTo: '除行内非替换元素、表格列、列组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的高度（如果包含块高度不明确，则视为 none）',
    computedValue: '百分比、none 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-heights',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-max-height',
    sectionRef: 'sizing#height-calculation',
  },
  'aspect-ratio': {
    zh: '宽高比',
    value: 'auto | <ratio> | auto <ratio>',
    initial: 'auto',
    appliesTo: '除行内非替换元素和内部 ruby 或表格盒外的所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字或 <ratio>',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-sizing-4/#aspect-ratio',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'align-self': {
    zh: '自身对齐',
    value: 'auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>',
    initial: 'auto',
    appliesTo: 'flex 项、grid 项和绝对定位盒',
    inherited: false,
    percentages: null,
    computedValue: 'auto 计算为父元素的 align-items 值；其他值按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#align-self-property',
    sectionRef: 'sizing#alignment',
  },
  'align-content': {
    zh: '内容对齐',
    value: 'normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>',
    initial: 'normal',
    appliesTo: '块级容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#align-content-property',
    sectionRef: 'sizing#alignment',
  },
  'place-items': {
    zh: '放置项',
    value: '<align-items> <justify-items>?',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#place-items-property',
    sectionRef: 'sizing#alignment',
  },
  'place-content': {
    zh: '放置内容',
    value: '<align-content> <justify-content>?',
    initial: 'normal',
    appliesTo: '块级容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#place-content-property',
    sectionRef: 'sizing#alignment',
  },
  'box-sizing': {
    zh: '盒尺寸',
    value: 'content-box | border-box',
    initial: 'content-box',
    appliesTo: '接受 width 或 height 的所有元素',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/box.html',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#box-sizing',
    sectionRef: 'sizing#intrinsic-sizing',
  },
};
