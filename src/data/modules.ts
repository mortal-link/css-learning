import type { LucideIcon } from 'lucide-react';
import { BookOpen, Layout, Palette, Type, Sparkles } from 'lucide-react';
import type { LocaleText } from '@/lib/i18n';

import { sections as introSections } from './chapters/intro';
import { sections as syntaxSections } from './chapters/syntax';
import { sections as selectorsSections } from './chapters/selectors';
import { sections as cascadeSections } from './chapters/cascade';
import { sections as mediaSections } from './chapters/media';
import { sections as boxModelSections } from './chapters/box-model';
import { sections as visualFormattingSections } from './chapters/visual-formatting';
import { sections as sizingSections } from './chapters/sizing';
import { sections as fontsSections } from './chapters/fonts';
import { sections as textSections } from './chapters/text';
import { sections as visualEffectsSections } from './chapters/visual-effects';
import { sections as generatedContentSections } from './chapters/generated-content';
import { sections as colorsBackgroundsSections } from './chapters/colors-backgrounds';
import { sections as transformsSections } from './chapters/transforms';
import { sections as modernSections } from './chapters/modern';
// ============================================================
// 状态类型
// ============================================================

export type ModuleStatus = 'current' | 'locked' | 'completed';

// ============================================================
// 小节数据（Section = 模块内小节）
// ============================================================

export interface Section {
  id: string;
  number: string;
  title: LocaleText;
  summary: LocaleText;
  keyPoints: string[];
  specId?: string; // 对应的 W3C 规范锚点 ID
}

// ============================================================
// 模块定义（Module = 一个学习模块，对应 CSS2 的一章）
// ============================================================

export interface Module {
  id: string;
  number: number;
  title: LocaleText;
  description: LocaleText;
  status: ModuleStatus;
  specs: string[];
  specUrl: string;
  css2Chapters?: number[]; // 对应的 CSS2 原始章号
  keyConcept?: {
    title: LocaleText;
    content: LocaleText;
  };
  sections: Section[];
}

// ============================================================
// 阶段定义
// ============================================================

export interface Stage {
  id: string;
  title: LocaleText;
  icon: LucideIcon;
  description: LocaleText;
  moduleIds: string[];
}

// ============================================================
// 阶段数据（基于 CSS2 模块依赖链）
// ============================================================

export const stages: Stage[] = [
  {
    id: 'fundamentals',
    title: { zh: '语言基础', en: 'Fundamentals' },
    icon: BookOpen,
    description: { zh: 'CSS 语言的核心机制与规则', en: 'Core mechanisms and rules of CSS language' },
    moduleIds: ['intro', 'syntax', 'selectors', 'cascade'],
  },
  {
    id: 'box-layout',
    title: { zh: '盒子与布局', en: 'Box & Layout' },
    icon: Layout,
    description: { zh: '从盒模型到完整的布局系统', en: 'From box model to complete layout system' },
    moduleIds: ['media', 'box-model', 'visual-formatting', 'sizing'],
  },
  {
    id: 'visual',
    title: { zh: '视觉表现', en: 'Visual' },
    icon: Palette,
    description: { zh: '视觉效果、颜色、背景与装饰', en: 'Visual effects, colors, backgrounds and decorations' },
    moduleIds: ['visual-effects', 'generated-content', 'colors-backgrounds'],
  },
  {
    id: 'typography',
    title: { zh: '排版', en: 'Typography' },
    icon: Type,
    description: { zh: '字体选择与文本排版', en: 'Font selection and text typography' },
    moduleIds: ['fonts', 'text'],
  },
  {
    id: 'dynamics',
    title: { zh: '动态与前沿', en: 'Dynamics & Modern' },
    icon: Sparkles,
    description: { zh: '变换、动画与现代 CSS 新特性', en: 'Transforms, animations and modern CSS features' },
    moduleIds: ['transforms', 'modern'],
  },
];

// ============================================================
// 全部模块数据（按 CSS2 章号顺序排列）
// ============================================================

export const modules: Record<string, Module> = {
  // ──────────────────────────────────────────────
  // 阶段 1：语言基础
  // ──────────────────────────────────────────────

  intro: {
    id: 'intro',
    number: 1,
    title: { zh: 'CSS 概论', en: 'Introduction to CSS' },
    description: { zh: 'CSS 的设计理念、处理模型与基本概念', en: 'CSS design principles, processing model and core concepts' },
    status: 'completed',
    specs: [],
    specUrl: 'https://www.w3.org/TR/CSS22/intro.html',
    css2Chapters: [1, 2, 3],
    keyConcept: {
      title: { zh: '为什么从这里开始？', en: 'Why Start Here?' },
      content: {
        zh: 'CSS2 第 2 章介绍了 CSS 的设计原则和处理模型——浏览器如何从源文档到最终渲染。理解这些基础概念，才能明白后续所有规则「为什么」是这样设计的。',
        en: 'CSS2 Chapter 2 introduces CSS design principles and processing model—how browsers transform source documents to final rendering. Understanding these foundational concepts is essential to grasp why all subsequent rules are designed the way they are.',
      },
    },
    sections: introSections,
  },

  syntax: {
    id: 'syntax',
    number: 2,
    title: { zh: '语法、值与单位', en: 'Syntax, Values & Units' },
    description: { zh: 'CSS 解析规则、数据类型、值语法与单位系统', en: 'CSS parsing rules, data types, value syntax and unit system' },
    status: 'current',
    specs: ['css-values-3', 'css-values-4'],
    specUrl: 'https://www.w3.org/TR/css-values-3/',
    css2Chapters: [4],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 不只是「属性: 值」的罗列——它有严谨的语法规则和类型系统。理解 CSS 的解析规则、值语法和单位体系，才能真正看懂规范文档，并理解浏览器为什么会忽略某些声明。',
        en: 'CSS is more than just listing "property: value"—it has rigorous syntax rules and a type system. Understanding CSS parsing rules, value syntax, and unit system is essential to read specifications and understand why browsers ignore certain declarations.',
      },
    },
    sections: syntaxSections,
  },

  selectors: {
    id: 'selectors',
    number: 3,
    title: { zh: '选择器', en: 'Selectors' },
    description: { zh: '从简单选择器到复杂组合，精确定位元素', en: 'From simple to complex selectors, precisely targeting elements' },
    status: 'current',
    specs: ['selectors-3', 'selectors-4'],
    specUrl: 'https://www.w3.org/TR/selectors-3/',
    css2Chapters: [5],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '选择器是 CSS 的核心——它决定样式规则应用到哪些元素上。从简单的类型选择器到复杂的关系选择器，从伪类到伪元素，选择器系统提供了强大而精确的元素匹配能力。理解选择器的特异性计算和浏览器的匹配机制，是掌握 CSS 的关键。',
        en: 'Selectors are the core of CSS—they determine which elements style rules apply to. From simple type selectors to complex relational selectors, from pseudo-classes to pseudo-elements, the selector system provides powerful and precise element matching capabilities. Understanding selector specificity calculation and browser matching mechanisms is key to mastering CSS.',
      },
    },
    sections: selectorsSections,
  },

  cascade: {
    id: 'cascade',
    number: 4,
    title: { zh: '层叠与继承', en: 'Cascading & Inheritance' },
    description: { zh: '层叠规则、来源优先级、特异性、继承、CSS 变量与层叠层', en: 'Cascade rules, origin priority, specificity, inheritance, CSS variables and cascade layers' },
    status: 'completed',
    specs: ['css-cascade-4', 'css-cascade-5', 'css-variables-1'],
    specUrl: 'https://www.w3.org/TR/css-cascade-4/',
    css2Chapters: [6],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 的 "C" 代表 Cascading（层叠）。当多条规则试图为同一个元素/属性设置值时，层叠机制决定哪条规则胜出。理解层叠是掌握 CSS 的关键。',
        en: 'The "C" in CSS stands for Cascading. When multiple rules attempt to set values for the same element/property, the cascade mechanism determines which rule wins. Understanding the cascade is key to mastering CSS.',
      },
    },
    sections: [
      {
        id: 'intro',
        number: '1',
        title: { zh: '简介', en: 'Introduction' },
        summary: { zh: 'CSS 通过属性来控制文档的渲染。每个属性有名称、值域和行为定义。', en: 'CSS controls document rendering through properties. Each property has a name, value range, and behavior definition.' },
        keyPoints: [
          'CSS 属性定义了元素的视觉表现',
          '层叠机制解决多个规则冲突的问题',
          '继承机制让某些属性值从父元素传递到子元素',
        ],
      },
      {
        id: 'at-import',
        number: '2',
        title: { zh: '导入样式表', en: '@import' },
        summary: {
          zh: '@import 规则允许从其他样式表导入规则。导入的样式表被视为在 @import 位置展开。',
          en: '@import rule allows importing rules from other stylesheets. The imported stylesheet is treated as expanded at the @import location.',
        },
        keyPoints: [
          '@import 必须在样式表最前面（除了 @charset）',
          '可以添加媒体查询条件',
          '支持 supports() 条件判断',
        ],
      },
      {
        id: 'shorthand',
        number: '3',
        title: { zh: '简写属性', en: 'Shorthand Properties' },
        summary: { zh: '简写属性允许同时设置多个相关属性的值。未指定的子属性会被重置为初始值。', en: 'Shorthand properties allow setting multiple related property values at once. Unspecified sub-properties are reset to initial values.' },
        keyPoints: [
          '简写属性会重置所有子属性',
          'all 属性可以重置几乎所有属性',
          '使用简写时要注意意外重置',
        ],
      },
      {
        id: 'value-stages',
        number: '4',
        title: { zh: '值的处理', en: 'Value Processing' },
        summary: {
          zh: '从声明值到实际值的完整流程：declared → cascaded → specified → computed → used → actual',
          en: 'Complete flow from declared value to actual value: declared → cascaded → specified → computed → used → actual',
        },
        keyPoints: [
          'Declared Value: 所有适用的声明值',
          'Cascaded Value: 层叠后的获胜值',
          'Specified Value: 默认处理后的值',
          'Computed Value: 继承传递的值',
          'Used Value: 布局计算后的值',
          'Actual Value: 渲染时的最终值',
        ],
      },
      {
        id: 'filtering',
        number: '5',
        title: { zh: '过滤', en: 'Filtering' },
        summary: {
          zh: '确定哪些声明适用于哪些元素。声明必须来自适用的样式表、匹配的选择器、有效的语法。',
          en: 'Determines which declarations apply to which elements. Declarations must come from applicable stylesheets, matching selectors, and valid syntax.',
        },
        keyPoints: [
          '样式表必须当前适用于文档',
          '条件规则（@media, @supports）必须匹配',
          '选择器必须匹配元素',
          '声明语法必须有效',
        ],
      },
      {
        id: 'cascading',
        number: '6',
        title: { zh: '层叠', en: 'Cascading' },
        summary: { zh: '当多个声明作用于同一属性时，按来源、重要性、特异性、顺序决定最终值。', en: 'When multiple declarations apply to the same property, the final value is determined by origin, importance, specificity, and order.' },
        keyPoints: [
          '来源优先级：Transition > !important UA > !important User > !important Author > Animation > Author > User > UA',
          '特异性：(ID, Class, Type) 三元组比较',
          '顺序：后声明的优先',
        ],
      },
      {
        id: 'defaulting',
        number: '7',
        title: { zh: '默认值', en: 'Defaulting' },
        summary: {
          zh: '当层叠没有结果时，通过继承或初始值确定属性值。可以使用 initial、inherit、unset、revert 关键字。',
          en: 'When cascade produces no result, property values are determined through inheritance or initial values. Keywords initial, inherit, unset, and revert are available.',
        },
        keyPoints: [
          'initial: 使用属性的初始值',
          'inherit: 强制继承父元素的值',
          'unset: 继承属性用 inherit，否则用 initial',
          'revert: 回滚到上一个来源的值',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 阶段 2：盒子与布局
  // ──────────────────────────────────────────────

  media: {
    id: 'media',
    number: 5,
    title: { zh: '媒体查询', en: 'Media Queries' },
    description: { zh: '媒体类型、媒体特性与响应式设计基础', en: 'Media types, media features and responsive design fundamentals' },
    status: 'current',
    specs: ['mediaqueries-4', 'mediaqueries-5'],
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/',
    css2Chapters: [7],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '媒体查询允许根据设备特性（如视口宽度、分辨率、色彩方案）有条件地应用样式。它是响应式设计的核心机制，使同一份 CSS 能够适配不同设备和环境。',
        en: 'Media queries allow conditional application of styles based on device characteristics (such as viewport width, resolution, color scheme). It is the core mechanism of responsive design, enabling one CSS to adapt to different devices and environments.',
      },
    },
    sections: mediaSections,
  },

  'box-model': {
    id: 'box-model',
    number: 6,
    title: { zh: '盒模型', en: 'Box Model' },
    description: { zh: '盒子的四个区域、margin/padding/border、逻辑属性', en: 'Four box areas, margin/padding/border, logical properties' },
    status: 'current',
    specs: ['css-box-3', 'css-box-4', 'css-logical-1'],
    specUrl: 'https://www.w3.org/TR/css-box-3/',
    css2Chapters: [8],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '每个 CSS 元素都会生成一个矩形的盒子。这个盒子由四个区域组成：content（内容）、padding（内边距）、border（边框）、margin（外边距）。理解盒模型是掌握 CSS 布局的第一步。',
        en: 'Every CSS element generates a rectangular box. This box consists of four areas: content, padding, border, and margin. Understanding the box model is the first step to mastering CSS layout.',
      },
    },
    sections: [
      {
        id: 'intro',
        number: '1',
        title: { zh: '简介', en: 'Introduction' },
        specId: 'intro',
        summary: {
          zh: 'CSS 将元素树转换为一组盒子，每个盒子有矩形的内容区域，以及可选的 padding、border 和 margin 区域。',
          en: 'CSS transforms the element tree into a set of boxes, each with a rectangular content area and optional padding, border, and margin areas.',
        },
        keyPoints: [
          '元素树（element tree）被转换为盒子树（box tree）',
          '每个盒子有 content、padding、border、margin 四个区域',
          'sizing 属性决定内容区域大小，box styling 属性决定其他区域大小',
          '本模块仅定义物理方向（top/right/bottom/left）的属性，逻辑方向属性在 css-logical-1 中定义',
        ],
      },
      {
        id: 'box-model',
        number: '2',
        title: { zh: '盒模型', en: 'The CSS Box Model' },
        specId: 'box-model',
        summary: {
          zh: '每个盒子有 content area 及可选的 padding、border、margin 区域。各区域大小由对应属性控制，margin 可以为负值。',
          en: 'Each box has a content area and optional padding, border, and margin areas. Each area size is controlled by corresponding properties; margin can be negative.',
        },
        keyPoints: [
          'content、padding、border 的背景由 background 属性控制',
          'margin 始终是透明的',
          '四种边缘：content edge（内边缘）、padding edge、border edge、margin edge（外边缘）',
          '四种盒子：content-box、padding-box、border-box、margin-box',
          'box-edge 关键字可用于 transform-box、background-clip 等属性',
        ],
      },
      {
        id: 'margins',
        number: '3',
        title: { zh: '外边距', en: 'Margins' },
        specId: 'margins',
        summary: {
          zh: 'Margin 在 border edge 外围提供盒子之间的间距。支持 margin-top/right/bottom/left 和 margin 简写。',
          en: 'Margin provides spacing between boxes outside the border edge. Supports margin-top/right/bottom/left and margin shorthand.',
        },
        keyPoints: [
          'margin 初始值为 0，不可继承',
          '允许负值（但可能有实现限制）',
          '百分比相对于包含块的逻辑宽度',
          '不适用于 internal table elements',
          'block layout 中相邻的 margin 会发生折叠（collapsing）',
          '简写 margin 的 1-4 个值分别对应不同方向的写法',
        ],
      },
      {
        id: 'paddings',
        number: '4',
        title: { zh: '内边距', en: 'Padding' },
        specId: 'paddings',
        summary: {
          zh: 'Padding 在 content edge 和 padding edge 之间提供间距。支持 padding-top/right/bottom/left 和 padding 简写。',
          en: 'Padding provides spacing between content edge and padding edge. Supports padding-top/right/bottom/left and padding shorthand.',
        },
        keyPoints: [
          'padding 初始值为 0，不可继承',
          '不允许负值',
          '百分比相对于包含块的逻辑宽度',
          '背景默认绘制到 padding edge，可通过 background-origin/background-clip 调整',
          '简写 padding 的值语法与 margin 相同',
        ],
      },
      {
        id: 'borders',
        number: '5',
        title: { zh: '边框', en: 'Borders' },
        specId: 'borders',
        summary: {
          zh: 'Border 填充 border area，用于可视化标记盒子的边缘。边框属性包括宽度、样式和颜色，定义在 css-backgrounds-3 中。',
          en: 'Border fills the border area, used to visually mark the edges of boxes. Border properties including width, style, and color are defined in css-backgrounds-3.',
        },
        keyPoints: [
          '边框属性（width、style、color）定义在 CSS Backgrounds and Borders 模块中',
          '逻辑方向的边框属性定义在 css-logical-1 中',
          'border area 位于 padding edge 和 border edge 之间',
        ],
      },
    ],
  },

  'visual-formatting': {
    id: 'visual-formatting',
    number: 7,
    title: { zh: '视觉格式化模型', en: 'Visual Formatting Model' },
    description: { zh: 'display、格式化上下文、Normal Flow、浮动、定位、Flexbox、Grid', en: 'display, formatting contexts, Normal Flow, floats, positioning, Flexbox, Grid' },
    status: 'current',
    specs: ['css-display-3', 'css-position-3', 'css-flexbox-1', 'css-grid-1', 'css-grid-2', 'css-multicol-1'],
    specUrl: 'https://www.w3.org/TR/css-display-3/',
    css2Chapters: [9],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 视觉格式化模型定义了盒子如何根据文档树生成和布局。三种定位方案（常规流、浮动、绝对定位）决定了盒子在画布上的位置。理解 BFC、IFC 和层叠上下文是掌握 CSS 布局的关键。',
        en: 'The CSS visual formatting model defines how boxes are generated and laid out based on the document tree. Three positioning schemes (normal flow, floats, absolute positioning) determine box positions on the canvas. Understanding BFC, IFC, and stacking contexts is key to mastering CSS layout.',
      },
    },
    sections: visualFormattingSections,
  },

  sizing: {
    id: 'sizing',
    number: 8,
    title: { zh: '尺寸计算与对齐', en: 'Sizing & Alignment' },
    description: { zh: 'width/height 计算规则、包含块、内在尺寸、盒对齐', en: 'width/height calculation rules, containing blocks, intrinsic sizing, box alignment' },
    status: 'current',
    specs: ['css-sizing-3', 'css-sizing-4', 'css-align-3'],
    specUrl: 'https://www.w3.org/TR/css-sizing-3/',
    css2Chapters: [10],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '包含块决定元素尺寸和位置的计算基准。CSS 为不同类型的元素定义了详细的宽度和高度计算规则。CSS3 引入了内在尺寸关键字（min-content、max-content、fit-content）和 aspect-ratio 属性，使得响应式设计更加灵活。Box Alignment 模块提供了统一的对齐属性系统。',
        en: 'The containing block determines the reference for calculating element size and position. CSS defines detailed width and height calculation rules for different element types. CSS3 introduces intrinsic sizing keywords (min-content, max-content, fit-content) and aspect-ratio property, making responsive design more flexible. The Box Alignment module provides a unified alignment property system.',
      },
    },
    sections: sizingSections,
  },

  // ──────────────────────────────────────────────
  // 阶段 3：视觉表现
  // ──────────────────────────────────────────────

  'visual-effects': {
    id: 'visual-effects',
    number: 9,
    title: { zh: '视觉效果', en: 'Visual Effects' },
    description: { zh: 'overflow、裁剪、visibility、滤镜、混合模式', en: 'overflow, clipping, visibility, filters, blend modes' },
    status: 'current',
    specs: ['css-overflow-3', 'css-masking-1', 'filter-effects-1', 'compositing-1'],
    specUrl: 'https://www.w3.org/TR/CSS22/visufx.html',
    css2Chapters: [11],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 视觉效果控制元素内容的溢出处理、裁剪区域和可见性。CSS3 扩展了滤镜效果、混合模式和遮罩功能，使得丰富的视觉效果可以纯 CSS 实现。',
        en: 'CSS visual effects control overflow handling, clipping regions, and visibility of element content. CSS3 extends filter effects, blend modes, and masking capabilities, enabling rich visual effects with pure CSS.',
      },
    },
    sections: visualEffectsSections,
  },

  'generated-content': {
    id: 'generated-content',
    number: 10,
    title: { zh: '生成内容与列表', en: 'Generated Content & Lists' },
    description: { zh: '::before/::after、计数器、列表样式', en: '::before/::after, counters, list styles' },
    status: 'current',
    specs: ['css-content-3', 'css-lists-3'],
    specUrl: 'https://www.w3.org/TR/CSS22/generate.html',
    css2Chapters: [12],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 可以通过 ::before 和 ::after 伪元素插入生成内容，结合 content 属性和 CSS 计数器实现自动编号。列表样式属性控制列表标记的外观和位置。',
        en: 'CSS can insert generated content via ::before and ::after pseudo-elements, combined with the content property and CSS counters for automatic numbering. List style properties control the appearance and position of list markers.',
      },
    },
    sections: generatedContentSections,
  },

  'colors-backgrounds': {
    id: 'colors-backgrounds',
    number: 11,
    title: { zh: '颜色与背景', en: 'Colors & Backgrounds' },
    description: { zh: '颜色模型、色彩空间、背景属性、渐变、圆角、阴影', en: 'Color models, color spaces, background properties, gradients, border-radius, shadows' },
    status: 'current',
    specs: ['css-color-4', 'css-color-5', 'css-backgrounds-3', 'css-images-3'],
    specUrl: 'https://www.w3.org/TR/css-color-4/',
    css2Chapters: [14],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 颜色从 CSS2 的命名色和十六进制扩展到 CSS3/4 的 RGB、HSL、Lab、LCH 等多种色彩空间。背景属性支持多层背景、渐变、圆角和阴影，是视觉设计的核心工具。',
        en: 'CSS color evolved from CSS2 named colors and hex to CSS3/4 multiple color spaces including RGB, HSL, Lab, LCH. Background properties support multiple backgrounds, gradients, border-radius, and shadows, serving as core tools for visual design.',
      },
    },
    sections: colorsBackgroundsSections,
  },

  // ──────────────────────────────────────────────
  // 阶段 4：排版
  // ──────────────────────────────────────────────

  fonts: {
    id: 'fonts',
    number: 12,
    title: { zh: '字体', en: 'Fonts' },
    description: { zh: '字体选择、@font-face、字体匹配算法', en: 'Font selection, @font-face, font matching algorithm' },
    status: 'current',
    specs: ['css-fonts-4'],
    specUrl: 'https://www.w3.org/TR/css-fonts-4/',
    css2Chapters: [15],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '字体是排版的基础。CSS 通过 font-family 指定字体族，@font-face 加载自定义字体，字体匹配算法在可用字体中选择最佳匹配。CSS3 引入了可变字体、font-display 等现代特性。',
        en: 'Fonts are the foundation of typography. CSS specifies font families via font-family, loads custom fonts with @font-face, and uses font matching algorithms to select the best match from available fonts. CSS3 introduces modern features like variable fonts and font-display.',
      },
    },
    sections: fontsSections,
  },

  text: {
    id: 'text',
    number: 13,
    title: { zh: '文本与书写模式', en: 'Text & Writing Modes' },
    description: { zh: '文本属性、装饰、对齐、断行规则、书写方向', en: 'Text properties, decoration, alignment, line-breaking rules, writing directions' },
    status: 'current',
    specs: ['css-text-3', 'css-text-decor-3', 'css-writing-modes-4'],
    specUrl: 'https://www.w3.org/TR/css-text-3/',
    css2Chapters: [16],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '文本排版涵盖对齐、缩进、间距、换行、装饰等属性。CSS3 扩展了书写模式支持，使垂直排版和双向文本处理成为可能，对国际化至关重要。',
        en: 'Text typography covers properties for alignment, indentation, spacing, line breaking, and decoration. CSS3 extends writing mode support, enabling vertical typography and bidirectional text handling, crucial for internationalization.',
      },
    },
    sections: textSections,
  },

  // ──────────────────────────────────────────────
  // 阶段 5：动态与前沿
  // ──────────────────────────────────────────────

  transforms: {
    id: 'transforms',
    number: 14,
    title: { zh: '变换、过渡与动画', en: 'Transforms, Transitions & Animations' },
    description: { zh: '2D/3D 变换、过渡效果、关键帧动画、缓动函数', en: '2D/3D transforms, transitions, keyframe animations, easing functions' },
    status: 'current',
    specs: ['css-transforms-1', 'css-transforms-2', 'css-transitions-1', 'css-animations-1', 'css-easing-1'],
    specUrl: 'https://www.w3.org/TR/css-transforms-1/',
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 变换允许对元素进行平移、旋转、缩放和倾斜操作。过渡为属性变化添加平滑动画效果。@keyframes 动画支持多步骤复杂动画序列。缓动函数控制动画的时间节奏。',
        en: 'CSS transforms allow translation, rotation, scaling, and skewing of elements. Transitions add smooth animation effects to property changes. @keyframes animations support multi-step complex animation sequences. Easing functions control animation timing.',
      },
    },
    sections: transformsSections,
  },

  modern: {
    id: 'modern',
    number: 15,
    title: { zh: '现代 CSS 新特性', en: 'Modern CSS' },
    description: { zh: '容器查询、CSS 嵌套、@scope、content-visibility', en: 'Container queries, CSS nesting, @scope, content-visibility' },
    status: 'current',
    specs: ['css-contain-2', 'css-contain-3', 'css-nesting-1', 'css-cascade-5', 'css-cascade-6'],
    specUrl: 'https://www.w3.org/TR/css-contain-3/',
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '现代 CSS 引入了容器查询、CSS 嵌套、级联层和作用域等特性，使得组件化开发更加灵活。content-visibility 和 contain 属性则为大型页面提供了显著的渲染性能优化。',
        en: 'Modern CSS introduces container queries, CSS nesting, cascade layers, and scoping features, making component-based development more flexible. The content-visibility and contain properties provide significant rendering performance optimizations for large pages.',
      },
    },
    sections: modernSections,
  },
};

// ============================================================
// CSS2.2 章号映射
// ============================================================

export const CSS2_CHAPTER_MAP: Record<number, { specName: string; url: string }> = {
  1: { specName: 'css22-ch1', url: 'https://www.w3.org/TR/CSS22/about.html' },
  2: { specName: 'css22-ch2', url: 'https://www.w3.org/TR/CSS22/intro.html' },
  3: { specName: 'css22-ch3', url: 'https://www.w3.org/TR/CSS22/conform.html' },
  4: { specName: 'css22-ch4', url: 'https://www.w3.org/TR/CSS22/syndata.html' },
  5: { specName: 'css22-ch5', url: 'https://www.w3.org/TR/CSS22/selector.html' },
  6: { specName: 'css22-ch6', url: 'https://www.w3.org/TR/CSS22/cascade.html' },
  7: { specName: 'css22-ch7', url: 'https://www.w3.org/TR/CSS22/media.html' },
  8: { specName: 'css22-ch8', url: 'https://www.w3.org/TR/CSS22/box.html' },
  9: { specName: 'css22-ch9', url: 'https://www.w3.org/TR/CSS22/visuren.html' },
  10: { specName: 'css22-ch10', url: 'https://www.w3.org/TR/CSS22/visudet.html' },
  11: { specName: 'css22-ch11', url: 'https://www.w3.org/TR/CSS22/visufx.html' },
  12: { specName: 'css22-ch12', url: 'https://www.w3.org/TR/CSS22/generate.html' },
  14: { specName: 'css22-ch14', url: 'https://www.w3.org/TR/CSS22/colors.html' },
  15: { specName: 'css22-ch15', url: 'https://www.w3.org/TR/CSS22/fonts.html' },
  16: { specName: 'css22-ch16', url: 'https://www.w3.org/TR/CSS22/text.html' },
};

/** 获取某个模块关联的 CSS2 规范名列表 */
export function getCSS2SpecNames(mod: Module): string[] {
  if (!mod.css2Chapters) return [];
  return mod.css2Chapters
    .filter((ch) => CSS2_CHAPTER_MAP[ch])
    .map((ch) => CSS2_CHAPTER_MAP[ch].specName);
}

// ============================================================
// 工具函数
// ============================================================

/** 获取所有模块的有序列表 */
export function getModuleList(): Module[] {
  return Object.values(modules).sort((a, b) => a.number - b.number);
}

/** 获取单个模块 */
export function getModule(slug: string): Module | undefined {
  return modules[slug];
}

/** 获取所有有效 slug（用于 generateStaticParams） */
export function getAllModuleSlugs(): string[] {
  return Object.keys(modules);
}

/** 获取模块的上一个/下一个模块 */
export function getAdjacentModules(slug: string): {
  prev: Module | null;
  next: Module | null;
} {
  const list = getModuleList();
  const index = list.findIndex((m) => m.id === slug);
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}

/** 获取某个阶段下的模块列表 */
export function getStageModules(stage: Stage): Module[] {
  return stage.moduleIds.map((id) => modules[id]).filter(Boolean);
}

/** 统计数据 */
export function getStats() {
  const list = getModuleList();
  const totalSpecs = new Set(list.flatMap((m) => m.specs)).size;
  const totalModules = list.length;
  return { totalSpecs, totalModules };
}
