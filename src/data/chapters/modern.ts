import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'container-queries',
    number: '1',
    title: { zh: '容器查询', en: 'Container Queries' },
    summary:
      '容器查询允许根据父容器的尺寸（而非视口尺寸）应用样式，实现真正的组件级响应式设计。',
    keyPoints: [
      '@container 规则定义基于容器尺寸的查询条件',
      'container-type 将元素声明为查询容器（size | inline-size）',
      'container-name 为容器命名，支持多个查询容器',
      '容器查询相比媒体查询更适合组件化开发',
      '查询条件支持宽度、高度、纵横比等特性',
    ],
  },
  {
    id: 'css-nesting',
    number: '2',
    title: { zh: 'CSS 嵌套', en: 'CSS Nesting' },
    summary:
      '原生 CSS 嵌套语法允许在规则内部嵌套其他规则，类似于 Sass/Less 预处理器，减少选择器重复。',
    keyPoints: [
      '& 选择器代表父选择器，用于嵌套和组合',
      '可以嵌套规则、媒体查询、容器查询等',
      '嵌套规则的特异性与非嵌套写法完全一致',
      '相比预处理器，原生嵌套无需编译步骤',
      '支持复杂的嵌套组合和条件嵌套',
    ],
  },
  {
    id: 'cascade-layers',
    number: '3',
    title: { zh: '级联层', en: 'Cascade Layers' },
    summary:
      '@layer 规则定义级联层，提供显式的样式优先级分组机制，使大型项目的样式管理更加可控。',
    keyPoints: [
      '@layer 定义命名的级联层，控制样式优先级顺序',
      '层的声明顺序决定优先级，后声明的层优先级更高',
      '未分层的样式（unlayered styles）优先级高于所有层',
      '可以嵌套层，使用点号表示层级关系（如 framework.components）',
      '级联层与 !important、特异性、来源共同参与完整的层叠计算',
    ],
  },
  {
    id: 'scope',
    number: '4',
    title: { zh: '作用域', en: 'CSS Scoping' },
    summary:
      '@scope 规则限制选择器的作用范围，实现样式隔离和"就近优先"的级联逻辑。',
    keyPoints: [
      '@scope 定义样式的作用域根（scope root）',
      'to 子句定义作用域边界，排除内部区域（donut scope）',
      '作用域内的选择器自动限制在作用域范围内',
      'Scoping proximity：距离作用域根更近的规则优先级更高',
      '适用于组件样式隔离和局部样式覆盖',
    ],
  },
  {
    id: 'content-visibility',
    number: '5',
    title: { zh: '内容可见性与性能', en: 'Content Visibility & Performance' },
    summary:
      'content-visibility 和 contain 属性通过延迟渲染和包含优化，显著提升页面性能。',
    keyPoints: [
      'content-visibility: auto 延迟渲染视口外的内容',
      'contain 属性将元素与文档其余部分隔离，优化渲染范围',
      'contain-intrinsic-size 为未渲染内容提供占位尺寸',
      'content-visibility: hidden 类似于 display: none 但保留渲染状态',
      '适用于长列表、虚拟滚动和复杂页面的性能优化',
    ],
  },
];

export const anchors: Record<string, string> = {
  // Modern CSS 没有对应的 CSS2 章节，anchors 为空
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
};
