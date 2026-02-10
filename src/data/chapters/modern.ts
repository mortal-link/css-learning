import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'container-queries',
    number: '1',
    title: { zh: '容器查询', en: 'Container Queries' },
    summary: {
      zh: '容器查询允许根据父容器的尺寸（而非视口尺寸）应用样式，实现真正的组件级响应式设计。',
      en: 'Container queries allow applying styles based on parent container dimensions (rather than viewport size), enabling true component-level responsive design.',
    },
    keyPoints: [
      '@container 规则定义基于容器尺寸的查询条件',
      'container-type 将元素声明为查询容器（size | inline-size）',
      'container-name 为容器命名，支持多个查询容器',
      '容器查询相比媒体查询更适合组件化开发',
      '查询条件支持宽度、高度、纵横比等特性',
      '容器查询单位 cqw/cqh/cqi/cqb/cqmin/cqmax 相对于查询容器尺寸计算',
      '容器样式查询（style()）可基于容器的计算样式值应用规则',
      '声明为查询容器的元素必须建立尺寸包含（size containment），不能依赖子元素确定自身尺寸',
      'container 简写属性同时设置 container-name 和 container-type',
      '@container 支持 and/or/not 组合多条件查询',
    ],
  },
  {
    id: 'css-nesting',
    number: '2',
    title: { zh: 'CSS 嵌套', en: 'CSS Nesting' },
    summary: {
      zh: '原生 CSS 嵌套语法允许在规则内部嵌套其他规则，类似于 Sass/Less 预处理器，减少选择器重复。',
      en: 'Native CSS nesting syntax allows nesting rules within other rules, similar to Sass/Less preprocessors, reducing selector repetition.',
    },
    keyPoints: [
      '& 选择器代表父选择器，用于嵌套和组合',
      '可以嵌套规则、媒体查询、容器查询等',
      '嵌套规则的特异性与非嵌套写法完全一致',
      '相比预处理器，原生嵌套无需编译步骤',
      '支持复杂的嵌套组合和条件嵌套',
      '嵌套选择器在特异性计算时会被 :is() 包裹，取参数列表中最高特异性',
      '& 可以出现在选择器的任何位置，不限于开头',
      '支持直接嵌套 @media、@supports、@container 等条件规则',
      '相对选择器（如 > .child）在嵌套中隐含 & 前缀',
      '早期规范中的 @nest 已被移除，当前语法更简洁',
    ],
  },
  {
    id: 'cascade-layers',
    number: '3',
    title: { zh: '级联层', en: 'Cascade Layers' },
    summary: {
      zh: '@layer 规则定义级联层，提供显式的样式优先级分组机制，使大型项目的样式管理更加可控。',
      en: 'The @layer rule defines cascade layers, providing an explicit style priority grouping mechanism that makes style management in large projects more controllable.',
    },
    keyPoints: [
      '@layer 定义命名的级联层，控制样式优先级顺序',
      '层的声明顺序决定优先级，后声明的层优先级更高',
      '未分层的样式（unlayered styles）优先级高于所有层',
      '可以嵌套层，使用点号表示层级关系（如 framework.components）',
      '级联层与 !important、特异性、来源共同参与完整的层叠计算',
      '匿名层（anonymous layer）没有名称，无法从外部追加规则',
      'revert-layer 关键字将属性值回退到下一层级的声明',
      '!important 规则在层中的优先级顺序与普通规则相反——先声明的层优先',
      '@import 可通过 layer() 函数或 layer 关键字将外部样式表分配到指定层',
      '@layer 语句（无花括号）可预先声明层顺序，控制后续规则的优先级',
    ],
  },
  {
    id: 'scope',
    number: '4',
    title: { zh: '作用域', en: 'CSS Scoping' },
    summary: {
      zh: '@scope 规则限制选择器的作用范围，实现样式隔离和"就近优先"的级联逻辑。',
      en: 'The @scope rule limits the scope of selectors, achieving style isolation and "proximity priority" cascade logic.',
    },
    keyPoints: [
      '@scope 定义样式的作用域根（scope root）',
      'to 子句定义作用域边界，排除内部区域（donut scope）',
      '作用域内的选择器自动限制在作用域范围内',
      'Scoping proximity：距离作用域根更近的规则优先级更高',
      '适用于组件样式隔离和局部样式覆盖',
      ':scope 伪类匹配当前作用域根元素，在 @scope 内等同于作用域根',
      '内联 <style> 中的 @scope 无需参数，隐式以父元素为作用域根',
      '作用域不影响选择器特异性，仅在级联的"Scoping proximity"步骤生效',
      '@scope 与 @layer 可组合使用，层级优先级在作用域就近原则之前判定',
      '@scope 提供轻量级样式隔离，相比 Shadow DOM 无需创建独立 DOM 树',
    ],
  },
  {
    id: 'content-visibility',
    number: '5',
    title: { zh: '内容可见性与性能', en: 'Content Visibility & Performance' },
    summary: {
      zh: 'content-visibility 和 contain 属性通过延迟渲染和包含优化，显著提升页面性能。',
      en: 'The content-visibility and contain properties significantly improve page performance through deferred rendering and containment optimization.',
    },
    keyPoints: [
      'content-visibility: auto 延迟渲染视口外的内容',
      'contain 属性将元素与文档其余部分隔离，优化渲染范围',
      'contain-intrinsic-size 为未渲染内容提供占位尺寸',
      'content-visibility: hidden 类似于 display: none 但保留渲染状态',
      '适用于长列表、虚拟滚动和复杂页面的性能优化',
      '包含类型分为四种：size（尺寸）、layout（布局）、style（样式）、paint（绘制）',
      'contain: strict 等同于 size layout paint style，开启全部包含优化',
      'contain: content 等同于 layout paint style，不含尺寸包含，更安全易用',
      'content-visibility: auto 通过 IntersectionObserver 判断元素是否"与用户相关"',
      'paint containment 裁剪元素溢出内容，并使元素建立新的层叠上下文和格式化上下文',
    ],
  },
];

export const anchors: Record<string, string> = {
  // Modern CSS 没有对应的 CSS2 章号，anchors 为空
};

// ============================================================
// 属性定义
// ============================================================

const CONTAIN_2 = 'https://www.w3.org/TR/css-contain-2/';
const CONTAIN_3 = 'https://www.w3.org/TR/css-contain-3/';
const NESTING = 'https://www.w3.org/TR/css-nesting-1/';
const CASCADE_5 = 'https://www.w3.org/TR/css-cascade-5/';
const SCOPE = 'https://www.w3.org/TR/css-cascade-6/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ── Container Queries ──
  'container-type': {
    zh: '容器类型',
    value: 'normal | size | inline-size',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CONTAIN_3,
    sectionRef: 'modern#container-queries',
  },
  'container-name': {
    zh: '容器名称',
    value: 'none | <custom-ident>+',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: 'none 或由 <custom-ident> 组成的列表',
    css2Url: '',
    css3Url: CONTAIN_3,
    sectionRef: 'modern#container-queries',
  },
  'container': {
    zh: '容器（简写）',
    value: '<container-name> [ / <container-type> ]?',
    initial: '见各子属性',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: CONTAIN_3,
    sectionRef: 'modern#container-queries',
  },

  // ── Containment ──
  'contain': {
    zh: '包含',
    value: 'none | strict | content | [ size || layout || style || paint ]',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CONTAIN_2,
    sectionRef: 'modern#content-visibility',
  },
  'content-visibility': {
    zh: '内容可见性',
    value: 'visible | auto | hidden',
    initial: 'visible',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CONTAIN_2,
    sectionRef: 'modern#content-visibility',
  },
  'contain-intrinsic-width': {
    zh: '固有宽度',
    value: 'auto? [ none | <length> ]',
    initial: 'none',
    appliesTo: 'contain: size 或 content-visibility: auto 的元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值，将 <length> 计算为绝对长度',
    css2Url: '',
    css3Url: CONTAIN_2,
    sectionRef: 'modern#content-visibility',
  },
  'contain-intrinsic-height': {
    zh: '固有高度',
    value: 'auto? [ none | <length> ]',
    initial: 'none',
    appliesTo: 'contain: size 或 content-visibility: auto 的元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值，将 <length> 计算为绝对长度',
    css2Url: '',
    css3Url: CONTAIN_2,
    sectionRef: 'modern#content-visibility',
  },
  'contain-intrinsic-size': {
    zh: '固有尺寸（简写）',
    value: '[ auto? [ none | <length> ] ]{1,2}',
    initial: '见各子属性',
    appliesTo: 'contain: size 或 content-visibility: auto 的元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: CONTAIN_2,
    sectionRef: 'modern#content-visibility',
  },

  // ── Performance ──
  'will-change': {
    zh: '将要变化',
    value: 'auto | <animateable-feature>#',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-will-change-1/',
    sectionRef: 'modern#content-visibility',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'container query': {
    zh: '容器查询',
    description:
      '根据父容器尺寸（而非视口尺寸）应用样式的查询机制，通过 @container 规则和 container-type 属性实现组件级响应式设计。',
    sectionRef: 'modern#container-queries',
    specUrl: CONTAIN_3,
  },
  'cascade layer': {
    zh: '级联层',
    description:
      '@layer 定义的样式分层系统，用于显式控制样式优先级顺序。层的声明顺序决定优先级，未分层样式优先级最高。',
    sectionRef: 'modern#cascade-layers',
    specUrl: CASCADE_5,
  },
  'css nesting': {
    zh: 'CSS 嵌套',
    description:
      '原生 CSS 中直接嵌套规则的语法特性，类似于 Sass/Less 预处理器的嵌套写法，使用 & 选择器引用父级。',
    sectionRef: 'modern#css-nesting',
    specUrl: NESTING,
  },
  'scope': {
    zh: '作用域',
    description:
      '@scope 定义的样式作用范围，限制选择器的匹配区域。支持通过 to 子句排除内部区域，实现样式隔离。',
    sectionRef: 'modern#scope',
    specUrl: SCOPE,
  },
  'containment': {
    zh: '包含',
    description:
      'contain 属性将元素与文档其余部分隔离，限制布局、样式、绘制的影响范围，从而优化渲染性能。',
    sectionRef: 'modern#content-visibility',
    specUrl: CONTAIN_2,
  },
  'content-visibility': {
    zh: '内容可见性',
    description:
      '控制元素是否渲染其内容的属性。auto 值会延迟渲染视口外的内容，hidden 值跳过渲染但保留状态。',
    sectionRef: 'modern#content-visibility',
    specUrl: CONTAIN_2,
  },
  'donut scope': {
    zh: '甜甜圈作用域',
    description:
      '@scope 的 to 子句创建的"排除内部"作用域形式，样式作用于外层范围但不影响 to 选择器匹配的内部区域。',
    sectionRef: 'modern#scope',
    specUrl: SCOPE,
  },
  'scoping proximity': {
    zh: '作用域就近原则',
    description:
      '在 @scope 规则中，距离作用域根更近的规则优先级更高，无论特异性如何。这是一种基于 DOM 距离的级联机制。',
    sectionRef: 'modern#scope',
    specUrl: SCOPE,
  },
  'container unit': {
    zh: '容器单位',
    description:
      '相对于查询容器尺寸的长度单位。cqw/cqh 为容器宽高的 1%，cqi/cqb 为内联/块方向的 1%，cqmin/cqmax 取两者较小/较大值。',
    sectionRef: 'modern#container-queries',
    specUrl: CONTAIN_3,
  },
  'container style query': {
    zh: '容器样式查询',
    description:
      '通过 style() 函数查询容器的计算样式值来应用规则的机制，如 @container style(--theme: dark) { ... }。',
    sectionRef: 'modern#container-queries',
    specUrl: CONTAIN_3,
  },
  'size containment': {
    zh: '尺寸包含',
    description:
      'contain: size 使元素在布局时不依赖子元素确定自身尺寸，固有尺寸视为无内容计算。这是容器查询的前提条件之一。',
    sectionRef: 'modern#content-visibility',
    specUrl: CONTAIN_2,
  },
  'layout containment': {
    zh: '布局包含',
    description:
      'contain: layout 使元素建立独立格式化上下文，内部布局变化不影响外部，外部也无法影响内部布局。',
    sectionRef: 'modern#content-visibility',
    specUrl: CONTAIN_2,
  },
  'paint containment': {
    zh: '绘制包含',
    description:
      'contain: paint 裁剪元素溢出内容至边框边缘，建立新的层叠上下文和格式化上下文，优化绘制范围。',
    sectionRef: 'modern#content-visibility',
    specUrl: CONTAIN_2,
  },
  'style containment': {
    zh: '样式包含',
    description:
      'contain: style 将计数器和引号等样式效果限制在元素子树内，防止内部样式副作用泄漏到外部。',
    sectionRef: 'modern#content-visibility',
    specUrl: CONTAIN_2,
  },
  'revert-layer': {
    zh: '层回退',
    description:
      'revert-layer 关键字将属性值回退到当前级联层的下一层声明。若无更低层声明，则回退到上一个来源。',
    sectionRef: 'modern#cascade-layers',
    specUrl: CASCADE_5,
  },
  'anonymous layer': {
    zh: '匿名层',
    description:
      '没有名称的级联层。可通过 @layer { ... } 或 @import ... layer 创建。因无名称，外部无法向其追加规则。',
    sectionRef: 'modern#cascade-layers',
    specUrl: CASCADE_5,
  },
  'nesting selector': {
    zh: '嵌套选择器',
    description:
      '& 符号在 CSS 嵌套中代表父规则的选择器。在特异性计算时等同于 :is() 包裹父选择器，取最高特异性值。',
    sectionRef: 'modern#css-nesting',
    specUrl: NESTING,
  },
  ':scope': {
    zh: '作用域伪类',
    description:
      ':scope 伪类匹配作为选择器匹配参考点的元素。在 @scope 规则内匹配作用域根，在 DOM API 中匹配调用方法的元素。',
    sectionRef: 'modern#scope',
    specUrl: SCOPE,
  },
  'grid': {
    zh: '网格',
    description:
      'CSS Grid 布局系统,通过 display: grid 创建二维网格容器,使用行和列来组织子元素的布局。',
    sectionRef: 'modern#grid-layout',
    specUrl: 'https://www.w3.org/TR/css-grid-2/',
  },
  'row': {
    zh: '行',
    description:
      '网格布局中的水平轨道。grid-template-rows 定义显式行,内容溢出时会产生隐式行。',
    sectionRef: 'modern#grid-layout',
  },
  'column': {
    zh: '列',
    description:
      '网格布局中的垂直轨道。grid-template-columns 定义显式列。也指 column-count/column-width 的多列布局。',
    sectionRef: 'modern#grid-layout',
  },
  'columns': {
    zh: '多列',
    description:
      'CSS 多列布局(Multi-column Layout),通过 column-count 或 column-width 将内容分成多列显示。',
    sectionRef: 'modern#grid-layout',
  },
  'flex-start': {
    zh: '弹性起点',
    description:
      'Flex 对齐值。项目在主轴/交叉轴的起始端对齐。对于 LTR 布局的主轴,起点在左侧。',
    sectionRef: 'modern#flexbox',
    specUrl: 'https://www.w3.org/TR/css-flexbox-1/',
  },
  'flex-end': {
    zh: '弹性终点',
    description:
      'Flex 对齐值。项目在主轴/交叉轴的末尾端对齐。对于 LTR 布局的主轴,终点在右侧。',
    sectionRef: 'modern#flexbox',
    specUrl: 'https://www.w3.org/TR/css-flexbox-1/',
  },
  'start': {
    zh: '起点',
    description:
      '逻辑对齐值。根据书写方向和布局方向确定的起始位置,是 flex-start 的通用替代。',
    sectionRef: 'modern#flexbox',
  },
  'end': {
    zh: '终点',
    description:
      '逻辑对齐值。根据书写方向和布局方向确定的结束位置,是 flex-end 的通用替代。',
    sectionRef: 'modern#flexbox',
  },
  'center': {
    zh: '居中',
    description:
      '对齐属性的值之一。将项目在对应轴方向居中放置。常用于 justify-content、align-items 等属性。',
    sectionRef: 'modern#flexbox',
  },
};
