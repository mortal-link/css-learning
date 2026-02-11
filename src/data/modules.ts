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
import { sections as flexboxSections } from './chapters/flexbox';
import { sections as gridSections } from './chapters/grid';
import { sections as sizingSections } from './chapters/sizing';
import { sections as fontsSections } from './chapters/fonts';
import { sections as textSections } from './chapters/text';
import { sections as visualEffectsSections } from './chapters/visual-effects';
import { sections as generatedContentSections } from './chapters/generated-content';
import { sections as colorsBackgroundsSections } from './chapters/colors-backgrounds';
import { sections as transformsSections } from './chapters/transforms';
import { sections as modernSections } from './chapters/modern';
import { sections as multicolSections } from './chapters/multicol';
import { sections as tablesSections } from './chapters/tables';
// ============================================================
// 状态类型
// ============================================================

export type ModuleStatus = 'current' | 'locked' | 'completed';

// ============================================================
// 教程内容块（TutorialBlock = 结构化教程内容）
// ============================================================

export type TutorialBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; code: string; lang: string; caption?: string }
  | { type: 'tip'; text: string }
  | { type: 'warning'; text: string }
  | { type: 'example'; title: string; code: string; lang?: string; explanation: string }
  | { type: 'list'; items: string[]; ordered?: boolean };

// ============================================================
// 小节数据（Section = 模块内小节）
// ============================================================

export interface Section {
  id: string;
  number: string;
  title: LocaleText;
  summary: LocaleText;
  keyPoints: string[];
  tutorial?: TutorialBlock[]; // 结构化教程内容，存在时替代 keyPoints 渲染
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
    moduleIds: ['media', 'box-model', 'visual-formatting', 'flexbox', 'grid', 'multicol', 'tables', 'sizing'],
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
    sections: cascadeSections,
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
    sections: boxModelSections,
  },

  'visual-formatting': {
    id: 'visual-formatting',
    number: 7,
    title: { zh: '视觉格式化模型', en: 'Visual Formatting Model' },
    description: { zh: 'display、格式化上下文、Normal Flow、浮动、定位', en: 'display, formatting contexts, Normal Flow, floats, positioning' },
    status: 'current',
    specs: ['css-display-3', 'css-position-3'],
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

  flexbox: {
    id: 'flexbox',
    number: 16,
    title: { zh: 'Flexbox 弹性布局', en: 'Flexbox Layout' },
    description: { zh: 'Flex 容器与项目、弹性尺寸计算、主轴与交叉轴对齐', en: 'Flex containers and items, flexible sizing, main and cross axis alignment' },
    status: 'current' as const,
    specs: ['css-flexbox-1'],
    specUrl: 'https://www.w3.org/TR/css-flexbox-1/',
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'Flexbox 是一维布局模型，通过 display: flex 创建弹性容器，子元素成为弹性项目。flex-direction 定义主轴方向，flex-grow/shrink/basis 控制项目如何分配空间。justify-content 和 align-items 提供强大的对齐能力，使得居中、等间距等常见布局模式变得简单直接。',
        en: 'Flexbox is a one-dimensional layout model. Setting display: flex creates a flex container whose children become flex items. flex-direction defines the main axis, while flex-grow/shrink/basis control how items share space. justify-content and align-items provide powerful alignment, making common patterns like centering and equal spacing straightforward.',
      },
    },
    sections: flexboxSections,
  },

  grid: {
    id: 'grid',
    number: 17,
    title: { zh: 'Grid 网格布局', en: 'Grid Layout' },
    description: { zh: '二维网格系统、模板定义、项目放置、子网格', en: 'Two-dimensional grid system, template definitions, item placement, subgrid' },
    status: 'current' as const,
    specs: ['css-grid-1', 'css-grid-2'],
    specUrl: 'https://www.w3.org/TR/css-grid-1/',
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS Grid 是二维布局系统，通过 display: grid 创建网格容器。grid-template-rows/columns 定义行列轨道，支持 fr 弹性单位、repeat()、minmax() 等强大语法。网格项目可通过 grid-row/column 精确放置到任意单元格或区域。CSS Grid Level 2 引入子网格(subgrid)，允许嵌套网格继承父级轨道尺寸。',
        en: 'CSS Grid is a two-dimensional layout system. Setting display: grid creates a grid container. grid-template-rows/columns define row and column tracks with powerful syntax including fr flexible units, repeat(), and minmax(). Grid items can be precisely placed into any cell or area via grid-row/column. CSS Grid Level 2 introduces subgrid, allowing nested grids to inherit parent track sizes.',
      },
    },
    sections: gridSections,
  },

  multicol: {
    id: 'multicol',
    number: 18,
    title: { zh: '多列布局', en: 'Multi-column Layout' },
    description: { zh: '多列容器、列宽与列数、列间距与列规则、列跨越', en: 'Multi-column containers, column width and count, gaps and rules, column spanning' },
    status: 'current' as const,
    specs: ['css-multicol-1'],
    specUrl: 'https://www.w3.org/TR/css-multicol-1/',
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: '多列布局将块级容器的内容分为多列显示,类似报纸排版。column-count 和 column-width 控制列的数量和宽度,浏览器自动平衡内容在各列之间的分配。column-span 允许元素跨越所有列,column-rule 在列间添加可视分隔线。',
        en: 'Multi-column layout splits block container content into multiple columns, similar to newspaper layouts. column-count and column-width control column number and width, with browsers automatically balancing content across columns. column-span allows elements to span all columns, and column-rule adds visual separators between columns.',
      },
    },
    sections: multicolSections,
  },

  tables: {
    id: 'tables',
    number: 19,
    title: { zh: '表格布局', en: 'Table Layout' },
    description: { zh: 'CSS 表格模型、边框模型、表格布局算法', en: 'CSS table model, border models, table layout algorithms' },
    status: 'current' as const,
    specs: [],
    specUrl: 'https://www.w3.org/TR/CSS22/tables.html',
    css2Chapters: [17],
    keyConcept: {
      title: { zh: '核心概念', en: 'Core Concept' },
      content: {
        zh: 'CSS 表格模型基于 HTML 表格结构,通过 display: table 等值将任意元素转换为表格布局。表格有两种边框模型:分离边框(border-collapse: separate)和折叠边框(border-collapse: collapse),各有不同的渲染和冲突解决规则。表格宽度可通过 table-layout: fixed 实现固定布局或默认的自动布局。',
        en: 'The CSS table model is based on HTML table structure, converting any element into table layout via display: table etc. Tables have two border models: separated (border-collapse: separate) and collapsed (border-collapse: collapse), each with different rendering and conflict resolution rules. Table width can use fixed layout (table-layout: fixed) or the default auto layout.',
      },
    },
    sections: tablesSections,
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
    specs: ['css-overflow-3', 'css-masking-1', 'filter-effects-1', 'compositing-1', 'css-shapes-1'],
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
    description: { zh: '容器查询、CSS 嵌套、@scope、content-visibility、滚动吸附、CSS UI', en: 'Container queries, CSS nesting, @scope, content-visibility, Scroll Snap, CSS UI' },
    status: 'current',
    specs: ['css-contain-2', 'css-contain-3', 'css-nesting-1', 'css-cascade-5', 'css-cascade-6', 'css-scroll-snap-1', 'css-ui-4'],
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
