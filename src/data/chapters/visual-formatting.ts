import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '简介', en: 'Introduction to the visual formatting model' },
    summary: { zh: 'CSS 视觉格式化模型定义了盒子如何根据文档树生成并布局。模型基于包含块(containing block)的概念,但不指定格式化的每个方面。', en: 'The CSS visual formatting model defines how boxes are generated and laid out based on the document tree. The model is based on the concept of containing blocks, but does not specify every aspect of formatting.' },
    keyPoints: [
      '每个元素根据盒模型生成零个或多个盒子',
      '盒子的布局由以下因素决定:盒子尺寸和类型、定位方案(常规流/浮动/绝对定位)、文档树中元素之间的关系、外部信息(视口大小、图片固有尺寸等)',
      '本章定义的属性适用于连续媒体(continuous media)和分页媒体(paged media),但 margin 属性在分页媒体中含义不同',
      '画布(canvas)是文档渲染的无限表面;视口(viewport)是用户代理提供的可视区域,当视口小于画布时应提供滚动机制',
      '每个画布最多对应一个视口,但用户代理可以渲染到多个画布(即同一文档的不同视图)',
      '脱离流(out-of-flow)的元素包括:浮动元素、绝对定位元素和根元素;不脱离流的元素称为流内(in-flow)元素',
      '匿名盒子(anonymous box)在需要时自动生成,用于满足格式化模型的结构要求;匿名盒子继承包含它的非匿名盒子的可继承属性,不可继承属性取初始值',
      '视觉格式化模型不指定格式化的所有方面(如字母间距算法),符合规范的用户代理可能在这些方面有不同行为',
    ],
  },
  {
    id: 'display',
    number: '2',
    title: { zh: 'display 属性', en: 'Controlling box generation' },
    summary: { zh: 'display 属性决定元素生成的盒子类型。CSS 2.2 定义了 block、inline、inline-block、none、list-item 等值;CSS3 将其扩展为二维系统(外部显示类型 + 内部显示类型)。', en: 'The display property determines the type of box an element generates. CSS 2.2 defined values like block, inline, inline-block, none, and list-item; CSS3 extended it into a two-dimensional system (outer display type + inner display type).' },
    keyPoints: [
      'block: 生成块级盒子(block-level box),参与块格式化上下文(BFC)',
      'inline: 生成行内盒子(inline box),参与行内格式化上下文(IFC)',
      'inline-block: 生成行内级块容器(inline-level block container),对外是行内盒子,对内建立 BFC',
      'none: 元素不生成任何盒子,后代元素也不生成盒子,元素及其内容完全从格式化结构中移除;与 visibility: hidden 不同,后者仍生成不可见的盒子',
      'list-item: 生成块级主体盒子(principal box)和标记盒子(marker box)',
      'CSS3 display 拆分为外部显示类型 display-outside(block/inline)和内部显示类型 display-inside(flow/flow-root/flex/grid/table)的二值组合',
      'display: flow-root 生成块级盒子并建立新的 BFC,是触发 BFC 的最直接方式(替代 overflow: hidden 等 hack)',
      'display: contents 使元素自身不生成盒子,但其子元素和伪元素仍正常生成盒子,如同子元素直接替代了该元素在文档树中的位置',
      'display: run-in 生成游离盒子(run-in box),如果后面紧跟块盒子则合并到该块盒子开头作为行内内容',
      'display、position、float 三者相互影响:若 display 为 none 则忽略 position/float;若 position 为 absolute/fixed 则 float 计算为 none 且 display 按转换表调整;若 float 非 none 则 display 按转换表调整为 block 等值',
    ],
  },
  {
    id: 'positioning-schemes',
    number: '3',
    title: { zh: '定位方案', en: 'Positioning schemes' },
    summary: { zh: 'CSS 2.2 中有三种定位方案:常规流(Normal flow)、浮动(Floats)和绝对定位(Absolute positioning)。盒子根据 position、float 和 display 属性参与不同的定位方案。', en: 'CSS 2.2 has three positioning schemes: Normal flow, Floats, and Absolute positioning. Boxes participate in different positioning schemes based on the position, float, and display properties.' },
    keyPoints: [
      'Normal flow: 包括块级盒子的块格式化(block formatting)、行内级盒子的行内格式化(inline formatting)以及相对定位(relative positioning)',
      'Floats: 盒子先按常规流布局,然后从流中取出并向左或向右移动,后续内容沿浮动盒子一侧排列',
      'Absolute positioning: 盒子完全从常规流中移除,相对于包含块定位,不影响兄弟元素的布局',
      'position 属性值:static(常规流,inset 属性不生效)、relative(常规流+视觉偏移,不影响后续元素位置)、absolute(脱离常规流)、fixed(脱离常规流,相对视口固定)',
      'CSS3 新增 position: sticky — 粘性定位元素在常规流中布局,当滚动到 inset 属性指定的阈值时固定在最近滚动容器的可视区域(scrollport)内',
      'sticky 定位的约束范围是其包含块:元素不会超出包含块的边界,当包含块滚出可视区域时 sticky 元素随之离开',
      'CSS3 引入 inset 简写属性(top/right/bottom/left 的简写)以及逻辑方向属性 inset-block-start/end、inset-inline-start/end',
      'display/position/float 三属性互相约束(详见 CSS2.2 §9.7):position: absolute/fixed 强制 float 计算为 none;float 非 none 时,display 的行内值(如 inline)被转换为对应块值(如 block)',
      '所有 position 非 static 的元素称为定位元素(positioned element),会为后代建立绝对定位包含块',
    ],
  },
  {
    id: 'normal-flow',
    number: '4',
    title: { zh: '常规流', en: 'Normal flow' },
    summary: { zh: '常规流中的盒子属于某个格式化上下文(formatting context),可以是块格式化上下文(BFC)或行内格式化上下文(IFC)。块级盒子参与 BFC,行内级盒子参与 IFC。', en: 'Boxes in normal flow belong to a formatting context, which can be a block formatting context (BFC) or an inline formatting context (IFC). Block-level boxes participate in BFC, and inline-level boxes participate in IFC.' },
    keyPoints: [
      '块格式化上下文(BFC):块级盒子在其中垂直排列,每个盒子的左外边缘紧贴包含块的左边缘(RTL 时右边缘),相邻 margin 会折叠',
      '行内格式化上下文(IFC):行内盒子在其中水平排列,形成行盒(line box);由不包含块级盒子的块容器盒子建立',
      '块级盒子(block-level box):display 为 block、list-item 或 table 的盒子,参与 BFC',
      '块容器盒子(block container box):只包含块级盒子或只包含行内级盒子(建立 IFC)的盒子;非替换 inline-block 和非替换 table-cell 也是块容器但不是块级盒子',
      '块盒子(block box):既是块级盒子又是块容器盒子;display: block 的非替换元素生成块盒子',
      '匿名块盒子(anonymous block box):当块容器同时包含块级内容和行内内容时,行内内容被包裹在自动生成的匿名块盒子中,以确保块容器只包含同类型的子盒子',
      '匿名行内盒子(anonymous inline box):块容器中直接包含的文本(不在行内元素中)会被当作匿名行内元素处理;根据 white-space 属性折叠后为空的匿名行内盒子不会生成',
      'position: relative 让盒子先按常规流布局,然后相对于其常规位置偏移(不影响后续元素布局);若 left/right 均非 auto 则产生过约束,由 direction 决定保留哪个值',
      'BFC 建立条件:根元素、浮动元素、绝对定位元素、inline-block、table-cell、table-caption、overflow 非 visible 的块盒子;CSS3 新增 display: flow-root 可直接建立 BFC',
      'BFC 独立性:BFC 内部布局不影响外部,外部布局不影响内部;BFC 包含浮动元素(解决高度塌陷),阻止与外部元素的 margin 折叠',
    ],
  },
  {
    id: 'floats',
    number: '5',
    title: { zh: '浮动', en: 'Floats' },
    summary: { zh: '浮动盒子通过 float 属性从常规流中移出,向左或向右移动直到碰到包含块边缘或另一个浮动盒子。浮动盒子不在常规流中,但仍然影响行盒的布局。', en: 'Floated boxes are removed from normal flow via the float property and moved left or right until they touch the containing block edge or another floated box. Floated boxes are not in normal flow but still affect the layout of line boxes.' },
    keyPoints: [
      'float: left 或 right 使盒子成为浮动盒子,脱离常规流',
      '浮动盒子向左/右移动,直到其外边缘碰到包含块边缘或另一个浮动盒子的外边缘',
      '浮动盒子会使后续行盒缩短,为浮动腾出空间',
      'clear 属性指定元素的哪一侧不允许有浮动盒子,会向下移动直到清除浮动',
      'clear 值:none(默认)、left(左侧清除)、right(右侧清除)、both(两侧都清除)',
      '浮动元素会生成块级盒子,无论其 display 值是什么(除了 none)',
      '浮动不会影响绝对定位元素的布局',
      '父元素高度塌陷问题:浮动子元素不参与父元素高度计算,可通过建立 BFC 或清除浮动解决',
      '浮动盒子的精确定位遵循 9 条规则:不能超出包含块边缘、不能与同侧先前浮动重叠、左右浮动不互相重叠、尽可能高、尽可能靠左/右等',
      '浮动盒子的 margin 永远不会与相邻盒子的 margin 折叠',
    ],
  },
  {
    id: 'absolute-positioning',
    number: '6',
    title: { zh: '绝对定位', en: 'Absolute positioning' },
    summary: { zh: '绝对定位模型中,盒子从常规流中完全移除,相对于包含块定位。包含块由最近的 positioned 祖先元素(position 非 static)确定。', en: 'In the absolute positioning model, boxes are completely removed from normal flow and positioned relative to a containing block. The containing block is determined by the nearest positioned ancestor element (position other than static).' },
    keyPoints: [
      'position: absolute 使盒子脱离常规流,相对于包含块定位',
      'position: fixed 是绝对定位的特例,包含块始终是视口(viewport)',
      '绝对定位盒子不影响后续兄弟元素的布局',
      '包含块确定规则:最近的 position 非 static 的祖先元素;如果没有,则为初始包含块(initial containing block)',
      'top、right、bottom、left 属性指定盒子相对于包含块的偏移',
      '如果 top/bottom 或 left/right 同时指定,且 height/width 为 auto,则尺寸由偏移值计算',
      '绝对定位元素会生成块级盒子(display 的行内值被转换为对应的块值)',
      '绝对定位盒子为其常规流子元素和绝对定位(非 fixed)后代建立新的包含块',
      'CSS3 引入内缩修正包含块(inset-modified containing block):由 inset 属性从包含块向内收缩定义的区域,决定绝对定位盒子的可用空间和对齐参照',
    ],
  },
  {
    id: 'stacking-context',
    number: '7',
    title: { zh: '层叠上下文与绘制顺序', en: 'Layered presentation' },
    summary: { zh: 'CSS 假设画布是无限的,但实际渲染时需要确定绘制顺序。层叠上下文(stacking context)定义了元素在 Z 轴的绘制顺序,z-index 属性控制盒子在层叠上下文中的层级。', en: 'CSS assumes an infinite canvas, but the rendering order must be determined during actual rendering. The stacking context defines the rendering order of elements on the Z-axis, and the z-index property controls the level of boxes within the stacking context.' },
    keyPoints: [
      '层叠上下文是三维概念,盒子在 Z 轴上分层绘制',
      'z-index 只对定位元素(position 非 static)有效,控制其在当前层叠上下文中的层级',
      'z-index: auto 表示盒子在当前层叠上下文的层级为 0,不建立新的层叠上下文',
      'z-index 为整数时,该值是层级,且盒子建立新的局部层叠上下文',
      '层叠上下文嵌套:子元素的 z-index 只在父层叠上下文内比较',
      '同一层叠上下文内的绘制顺序(从后到前):背景和边框 → 负 z-index 子层叠上下文 → 块级后代 → 浮动元素 → 行内后代 → z-index: 0 或 auto 的定位后代 → 正 z-index 子层叠上下文',
      '建立层叠上下文的条件(CSS2):根元素、z-index 非 auto 的定位元素',
      'CSS3 扩展:opacity < 1、transform/filter/perspective、will-change、contain: paint/layout 等属性也会建立层叠上下文',
      '浮动元素的内容按仿佛建立了新层叠上下文的方式堆叠,但浮动元素实际参与父层叠上下文;浮动元素渲染在非定位流内块之前、流内行内内容之后',
    ],
  },
  {
    id: 'inline-formatting',
    number: '8',
    title: { zh: '行内格式化详解', en: 'Inline formatting context details' },
    summary: { zh: '行内格式化上下文(IFC)中,盒子从包含块顶部开始水平排列。行盒(line box)的高度由 line-height 和 vertical-align 共同决定,足以包含所有盒子。', en: 'In an inline formatting context (IFC), boxes are arranged horizontally starting from the top of the containing block. The height of a line box is determined by line-height and vertical-align, sufficient to contain all boxes.' },
    keyPoints: [
      '行盒(line box):IFC 中每一行形成的矩形区域,从包含块的一边延伸到另一边',
      '行盒高度计算:由 line-height 属性和 vertical-align 属性决定,足以包含该行所有盒子',
      'line-height 指定行盒的最小高度,由基线之间的距离(对于非替换行内元素)或 content height + 上下半行距确定',
      'vertical-align 控制行内盒子在行盒中的垂直对齐:baseline(基线对齐)、top、bottom、middle、text-top、text-bottom、sub、super 或长度/百分比',
      '行内盒子宽度总和小于行盒宽度时,水平分布由 text-align 决定',
      '行内盒子宽度总和大于行盒宽度时,会拆分为多个行内盒子分布在多个行盒中',
      '原子行内级盒子(atomic inline-level box):inline-block、inline-table 及替换行内元素作为不可分割的整体参与 IFC,不能在内部断行',
      '空白符处理由 white-space 属性控制',
      '双向文本(bidirectional text)布局由 direction 和 unicode-bidi 属性控制',
      '不包含文本、保留空白、非零 margin/padding/border 的行内元素、流内内容,且不以保留换行符结尾的行盒视为零高度行盒,不影响其内部元素的定位',
    ],
  },
];

export const anchors: Record<string, string> = {
  'display-prop': 'display',
  'block-formatting': 'normal-flow',
  'inline-formatting': 'inline-formatting',
  'floats': 'floats',
  'float-position': 'floats',
  'flow-control': 'floats',
  'absolute-positioning': 'absolute-positioning',
  'fixed-positioning': 'absolute-positioning',
  'choose-position': 'positioning-schemes',
  'positioning-scheme': 'positioning-schemes',
  'dis-pos-flo': 'display',
  'comparison': 'positioning-schemes',
  'normal-flow': 'normal-flow',
  'block-level': 'normal-flow',
  'inline-level': 'inline-formatting',
  'direction': 'inline-formatting',
  'layers': 'stacking-context',
  'propdef-z-index': 'stacking-context',
  'x43': 'stacking-context',
};

// ============================================================
// 属性定义(CSS2.2 Ch9 Visual Formatting Model)
// ============================================================

const VIS = 'https://www.w3.org/TR/CSS22/visuren.html';
const DISPLAY3 = 'https://www.w3.org/TR/css-display-3/';
const POSITION3 = 'https://www.w3.org/TR/css-position-3/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ── display ──
  'display': {
    zh: '显示类型',
    value: 'inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | none | inherit',
    initial: 'inline',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '见下文',
    css2Url: `${VIS}#propdef-display`,
    css3Url: `${DISPLAY3}#propdef-display`,
    sectionRef: 'visual-formatting#display',
  },

  // ── position ──
  'position': {
    zh: '定位方案',
    value: 'static | relative | absolute | fixed | inherit',
    initial: 'static',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-position`,
    css3Url: `${POSITION3}#propdef-position`,
    sectionRef: 'visual-formatting#positioning-schemes',
  },

  // ── top / right / bottom / left ──
  'top': {
    zh: '顶部偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的高度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-top`,
    css3Url: `${POSITION3}#propdef-top`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },
  'right': {
    zh: '右侧偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-right`,
    css3Url: `${POSITION3}#propdef-right`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },
  'bottom': {
    zh: '底部偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的高度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-bottom`,
    css3Url: `${POSITION3}#propdef-bottom`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },
  'left': {
    zh: '左侧偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-left`,
    css3Url: `${POSITION3}#propdef-left`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },

  // ── float ──
  'float': {
    zh: '浮动',
    value: 'left | right | none | inherit',
    initial: 'none',
    appliesTo: '所有元素(但某些元素的计算值可能为 none)',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-float`,
    css3Url: 'https://www.w3.org/TR/css-page-floats-3/#propdef-float',
    sectionRef: 'visual-formatting#floats',
  },

  // ── clear ──
  'clear': {
    zh: '清除浮动',
    value: 'none | left | right | both | inherit',
    initial: 'none',
    appliesTo: '块级元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-clear`,
    css3Url: 'https://www.w3.org/TR/css-page-floats-3/#propdef-clear',
    sectionRef: 'visual-formatting#floats',
  },

  // ── z-index ──
  'z-index': {
    zh: '层叠层级',
    value: 'auto | <integer> | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-z-index`,
    css3Url: `${POSITION3}#propdef-z-index`,
    sectionRef: 'visual-formatting#stacking-context',
  },

  // ── vertical-align ──
  'vertical-align': {
    zh: '垂直对齐',
    value: 'baseline | sub | super | top | text-top | middle | bottom | text-bottom | <percentage> | <length> | inherit',
    initial: 'baseline',
    appliesTo: '行内级元素和 table-cell 元素',
    inherited: false,
    percentages: "相对于元素自身的 line-height",
    computedValue: '对于百分比和长度值,为绝对长度;否则为指定值',
    css2Url: `${VIS}#propdef-vertical-align`,
    css3Url: 'https://www.w3.org/TR/css-inline-3/#propdef-vertical-align',
    sectionRef: 'visual-formatting#inline-formatting',
  },

  // ── inset (CSS3 shorthand) ──
  'inset': {
    zh: '内缩简写',
    value: '<\'top\'>{1,4}',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块对应方向的尺寸',
    computedValue: '各子属性的计算值',
    css2Url: `${VIS}#propdef-top`,
    css3Url: `${POSITION3}#propdef-inset`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },

  // ── line-height ──
  'line-height': {
    zh: '行高',
    value: 'normal | <number> | <length> | <percentage> | inherit',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于元素自身的 font-size',
    computedValue: '对于长度和百分比值,为绝对长度;否则为指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-line-height',
    css3Url: 'https://www.w3.org/TR/css-inline-3/#propdef-line-height',
    sectionRef: 'visual-formatting#inline-formatting',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'visual formatting model': {
    zh: '视觉格式化模型',
    description:
      'CSS 如何将文档树转换为视觉呈现的规则集合,包括盒子生成、定位方案、格式化上下文等概念。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html',
  },
  'containing block': {
    zh: '包含块',
    description:
      '元素盒子定位和尺寸计算的参照物。对于 static/relative 定位,是最近的块容器祖先的 content box;对于 absolute 定位,是最近的 positioned 祖先的 padding box;对于 fixed 定位,是视口。',
    sectionRef: 'visual-formatting#absolute-positioning',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#containing-block-details',
  },
  'block formatting context': {
    zh: '块格式化上下文(BFC)',
    description:
      '块级盒子参与的布局环境。在 BFC 中,盒子从包含块顶部开始垂直排列,相邻 margin 会折叠。BFC 是独立的渲染区域,内部布局不影响外部。根元素、float、绝对定位、inline-block、overflow 非 visible 等会创建新的 BFC。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-formatting',
    specUrl: 'https://www.w3.org/TR/css-display-3/#block-formatting-context',
  },
  'inline formatting context': {
    zh: '行内格式化上下文(IFC)',
    description:
      '行内级盒子参与的布局环境。在 IFC 中,盒子从包含块顶部开始水平排列,形成行盒(line box)。行盒的高度由 line-height 和 vertical-align 决定,宽度为包含块的宽度。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-formatting',
    specUrl: 'https://www.w3.org/TR/css-display-3/#inline-formatting-context',
  },
  'normal flow': {
    zh: '常规流',
    description:
      '不进行浮动或绝对定位的默认布局方式。常规流包括块级盒子的块格式化、行内级盒子的行内格式化以及相对定位。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#normal-flow',
  },
  'float': {
    zh: '浮动',
    description:
      '浮动盒子通过 float 属性从常规流中取出,向左或向右移动直到碰到包含块边缘或另一个浮动盒子。浮动元素不在常规流中,但会影响行盒布局(行盒会缩短为浮动腾出空间)。',
    sectionRef: 'visual-formatting#floats',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#floats',
  },
  'block-level element': {
    zh: '块级元素',
    description:
      'display 计算值为 block、list-item 或 table 的元素,生成块级盒子(block-level box)。块级盒子参与块格式化上下文(BFC)。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-boxes',
  },
  'inline-level element': {
    zh: '行内级元素',
    description:
      'display 计算值为 inline、inline-block 或 inline-table 的元素,生成行内级盒子(inline-level box)。行内级盒子参与行内格式化上下文(IFC)。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-boxes',
  },
  'block container box': {
    zh: '块容器盒子',
    description:
      '只包含块级盒子或只包含行内级盒子(并建立 IFC)的盒子。块容器盒子要么建立 BFC(用于其块级子元素),要么建立 IFC(用于其行内级子元素)。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-boxes',
  },
  'block box': {
    zh: '块盒子',
    description:
      '既是块级盒子又是块容器盒子的盒子。display: block 的非替换元素会生成块盒子。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-boxes',
  },
  'inline box': {
    zh: '行内盒子',
    description:
      '既是行内级盒子又参与其包含 IFC 的盒子。display: inline 的非替换元素会生成行内盒子。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-boxes',
  },
  'line box': {
    zh: '行盒',
    description:
      '行内格式化上下文中,每一行形成的矩形区域。行盒从包含块的一边延伸到另一边,高度由 line-height 和 vertical-align 共同决定,足以包含该行的所有行内盒子。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-formatting',
  },
  'stacking context': {
    zh: '层叠上下文',
    description:
      '三维渲染概念,定义了元素在 Z 轴的绘制顺序。根元素建立根层叠上下文;z-index 非 auto 的定位元素建立局部层叠上下文。CSS3 中,opacity < 1、transform、filter 等也会建立层叠上下文。子元素的 z-index 只在父层叠上下文内比较。',
    sectionRef: 'visual-formatting#stacking-context',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#z-index',
    specUrl: 'https://www.w3.org/TR/css-position-3/#stacking-context',
  },
  'positioned element': {
    zh: '定位元素',
    description:
      'position 计算值不是 static 的元素。包括 relative(相对定位)、absolute(绝对定位)、fixed(固定定位)和 sticky(粘性定位,CSS3)。',
    sectionRef: 'visual-formatting#positioning-schemes',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#positioned-element',
  },
  'replaced element': {
    zh: '替换元素',
    description:
      '内容不由 CSS 格式化模型控制的元素,如 img、input、textarea、select、object 等。替换元素有固有尺寸(intrinsic dimensions),如图片的原始宽高。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#replaced-element',
  },
  'block-start': {
    zh: '块起始方向',
    description: '逻辑方向,在水平书写模式下等于 top。代替物理方向 top/bottom,支持不同书写模式。',
    sectionRef: 'visual-formatting#block-formatting',
  },
  'block-end': {
    zh: '块结束方向',
    description: '逻辑方向,在水平书写模式下等于 bottom。与 block-start 相对。',
    sectionRef: 'visual-formatting#block-formatting',
  },
  'inline-start': {
    zh: '行内起始方向',
    description: '逻辑方向,在 LTR 水平书写模式下等于 left。文本流开始的一侧。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'inline-end': {
    zh: '行内结束方向',
    description: '逻辑方向,在 LTR 水平书写模式下等于 right。文本流结束的一侧。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'inline': {
    zh: '行内方向',
    description: '与文本书写方向平行的轴。在水平书写模式中是水平方向。逻辑属性中用于替代 left/right。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'block-level': {
    zh: '块级',
    description: '参与块级格式化上下文的元素或框。block-level element 的简称,由 display 值为 block、list-item、table 等产生。',
    sectionRef: 'visual-formatting#block-formatting',
  },
  'inline-level': {
    zh: '行内级',
    description: '参与行内格式化上下文的元素或框。inline-level element 的简称,由 display 值为 inline、inline-block、inline-table 等产生。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'static-position rectangle': {
    zh: '静态位置矩形',
    description: 'position: static 时元素在正常流中本应占据的位置矩形。用于确定 absolute 定位元素在未指定偏移时的默认位置。',
    sectionRef: 'visual-formatting#positioning',
  },
  'inset': {
    zh: '内缩',
    description: '定位属性的简写(top/right/bottom/left),也指 CSS Shapes 中的 inset() 函数。在逻辑属性中表示内缩偏移。',
    sectionRef: 'visual-formatting#positioning',
  },
  'anonymous box': {
    zh: '匿名盒子',
    description:
      '没有对应元素的盒子,由格式化模型在需要时自动生成。分为匿名块盒子和匿名行内盒子。匿名盒子继承包含它的非匿名盒子的可继承属性,不可继承属性取初始值。百分比值解析时跳过匿名盒子,参照最近的非匿名祖先。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#anonymous-block-level',
    specUrl: 'https://www.w3.org/TR/css-display-3/#anonymous',
  },
  'flow-root': {
    zh: '流根',
    description:
      'display: flow-root 使元素生成块级盒子并建立新的块格式化上下文(BFC)。这是 CSS3 引入的最直接的 BFC 触发方式,无需借助 overflow: hidden 等副作用属性。',
    sectionRef: 'visual-formatting#display',
    specUrl: 'https://www.w3.org/TR/css-display-3/#valdef-display-flow-root',
  },
  'display:contents': {
    zh: '内容显示',
    description:
      'display: contents 使元素本身不生成任何盒子,但其子元素和伪元素仍正常生成盒子。效果类似于将子节点直接提升到父级位置。对替换元素(img、input 等)计算为 display: none。',
    sectionRef: 'visual-formatting#display',
    specUrl: 'https://www.w3.org/TR/css-display-3/#valdef-display-contents',
  },
  'sticky positioning': {
    zh: '粘性定位',
    description:
      'position: sticky 的定位方案。元素在常规流中布局,但当用户滚动时,其位置自动调整以保持在最近滚动容器的可视区域(scrollport)内,约束范围不超出其包含块。inset 属性(top/bottom/left/right)指定触发粘性行为的阈值。',
    sectionRef: 'visual-formatting#positioning-schemes',
    specUrl: 'https://www.w3.org/TR/css-position-3/#sticky-position',
  },
  'viewport': {
    zh: '视口',
    description:
      '用户代理提供的可视区域(窗口或屏幕上的其他查看区域)。连续媒体中每个画布最多一个视口。当视口小于画布时应提供滚动机制。视口尺寸变化时用户代理可能重新布局文档。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#viewport',
  },
  'canvas': {
    zh: '画布',
    description:
      '文档渲染的无限表面。文档在画布上呈现后,通过视口(viewport)展示给用户。一个画布最多对应一个视口,但用户代理可渲染到多个画布。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/intro.html#canvas',
  },
  'run-in': {
    zh: '游离盒子',
    description:
      'display: run-in 生成的盒子。如果后面紧跟一个不建立新 BFC 的块盒子,游离盒子会合并到该块盒子的开头作为行内内容。否则生成匿名块盒子包裹自身和后续行内内容。CSS 2.2 将 run-in 推迟到 CSS3 定义。',
    sectionRef: 'visual-formatting#display',
    specUrl: 'https://www.w3.org/TR/css-display-3/#valdef-display-run-in',
  },
  'margin collapsing': {
    zh: '外边距折叠',
    description:
      '在块格式化上下文中,相邻块级盒子的垂直外边距(margin)会合并为一个外边距,取两者中的较大值(负值时取绝对值较大者)。浮动盒子、绝对定位盒子、inline-block 元素的 margin 不会与相邻元素折叠。建立 BFC 的元素不会与其子元素发生 margin 折叠。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/box.html#collapsing-margins',
  },
  'atomic inline-level box': {
    zh: '原子行内级盒子',
    description:
      '不可分割的行内级盒子,作为单个不透明整体参与行内格式化上下文。包括替换行内元素(如 img)、inline-block 和 inline-table 元素。与行内盒子(inline box)不同,原子行内级盒子不能跨行拆分。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-boxes',
    specUrl: 'https://www.w3.org/TR/css-display-3/#atomic-inline',
  },
};
