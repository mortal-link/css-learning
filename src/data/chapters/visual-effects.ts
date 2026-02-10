import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

const CSS22 = 'https://www.w3.org/TR/CSS22';

// ============================================================
// 小节数据
// ============================================================

export const sections: Section[] = [
  {
    id: 'overflow',
    number: '1',
    title: { zh: '溢出处理', en: 'Overflow' },
    specId: 'overflow',
    summary: { zh: 'overflow 属性控制当内容超出元素盒子时的表现方式。可以选择显示、隐藏、添加滚动条或自动处理溢出内容。', en: 'The overflow property controls how content behaves when it exceeds the element box. Options include displaying, hiding, adding scrollbars, or automatically handling overflowing content.' },
    keyPoints: [
      'visible: 内容可见，溢出部分不裁剪（默认值）',
      'hidden: 溢出内容被裁剪，不可见且不可滚动',
      'scroll: 始终显示滚动条，允许滚动查看溢出内容',
      'auto: 仅在需要时显示滚动条',
      'overflow 属性会创建块级格式化上下文（BFC）',
      'CSS3 引入 overflow-x 和 overflow-y 分别控制水平和垂直方向',
      'CSS3 overflow: clip 值提供严格裁剪，禁用滚动机制',
    ],
  },
  {
    id: 'clipping',
    number: '2',
    title: { zh: '裁剪', en: 'Clipping' },
    specId: 'clipping',
    summary: { zh: 'CSS2 的 clip 属性允许裁剪绝对定位元素的可见区域，但已被 CSS3 的 clip-path 属性取代。clip-path 提供更强大的裁剪能力，支持多种形状和路径。', en: 'The CSS2 clip property allows clipping the visible region of absolutely positioned elements, but has been replaced by the CSS3 clip-path property. clip-path provides more powerful clipping capabilities, supporting various shapes and paths.' },
    keyPoints: [
      'CSS2 clip: rect() 仅适用于绝对定位元素，已被废弃',
      'CSS3 clip-path 支持基本形状：circle()、ellipse()、polygon()、inset()',
      'clip-path 支持 SVG path 引用，实现复杂裁剪',
      'clip-path 可用于所有元素，不限于绝对定位',
      '裁剪区域外的内容不可见，不响应鼠标事件',
      'clip-path 与 mask 的区别：clip-path 是完全裁剪，mask 支持透明度渐变',
    ],
  },
  {
    id: 'visibility',
    number: '3',
    title: { zh: '可见性', en: 'Visibility' },
    specId: 'visibility',
    summary: { zh: 'visibility 属性控制元素的可见性，但不改变布局。与 display: none 不同，visibility: hidden 的元素仍然占据空间。', en: 'The visibility property controls element visibility without changing layout. Unlike display: none, elements with visibility: hidden still occupy space.' },
    keyPoints: [
      'visible: 元素可见（默认值）',
      'hidden: 元素不可见，但仍占据空间，影响布局',
      'collapse: 用于表格行、列、行组、列组，移除元素并回收空间',
      'collapse 在非表格元素上的行为与 hidden 相同',
      'visibility 属性可继承，子元素可以设置 visible 覆盖父元素的 hidden',
      'visibility: hidden 的元素不响应鼠标事件',
      'visibility 与 display: none 的区别：hidden 占据空间，none 不占据空间',
    ],
  },
  {
    id: 'opacity',
    number: '4',
    title: { zh: '不透明度', en: 'Opacity' },
    specId: 'opacity',
    summary: { zh: 'CSS3 opacity 属性控制元素及其所有子元素的不透明度。opacity 值为 0-1 之间的数字，0 表示完全透明，1 表示完全不透明。', en: 'The CSS3 opacity property controls the opacity of an element and all its children. The opacity value is a number between 0 (fully transparent) and 1 (fully opaque).' },
    keyPoints: [
      'opacity 取值范围：0（完全透明）到 1（完全不透明）',
      'opacity 应用于整个元素及其所有子元素',
      'opacity 创建新的层叠上下文（stacking context）',
      'opacity < 1 时，元素会被提升到独立图层',
      'opacity 与 visibility 的区别：opacity: 0 的元素仍响应鼠标事件',
      'opacity 与 background-color: rgba() 的区别：opacity 影响整个元素，rgba 仅影响背景色',
      'opacity 动画性能较好，可以利用硬件加速',
    ],
  },
  {
    id: 'filters',
    number: '5',
    title: { zh: '滤镜与混合模式', en: 'Filters & Blend Modes' },
    specId: 'filters',
    summary: { zh: 'CSS3 filter 属性提供了丰富的图像滤镜效果，如模糊、亮度、对比度等。backdrop-filter 可以对元素背后的内容应用滤镜。mix-blend-mode 和 background-blend-mode 控制元素和背景的混合模式。', en: 'The CSS3 filter property provides rich image filter effects such as blur, brightness, and contrast. backdrop-filter applies filters to content behind an element. mix-blend-mode and background-blend-mode control blending modes for elements and backgrounds.' },
    keyPoints: [
      'filter 函数：blur()、brightness()、contrast()、drop-shadow()、grayscale()、hue-rotate()、invert()、opacity()、saturate()、sepia()',
      'filter 可以组合多个函数，按顺序应用',
      'backdrop-filter 对元素背后的内容应用滤镜（需要半透明背景）',
      'backdrop-filter 常用于毛玻璃效果（frosted glass）',
      'mix-blend-mode 控制元素与背景的混合模式：multiply、screen、overlay、darken、lighten 等',
      'background-blend-mode 控制背景图片与背景色之间的混合模式',
      'filter 和 backdrop-filter 可能创建新的层叠上下文和包含块',
    ],
  },
];

// ============================================================
// 锚点映射
// ============================================================

export const anchors: Record<string, string> = {
  'overflow': 'overflow',
  'clipping': 'clipping',
  'visibility': 'visibility',
  'opacity': 'opacity',
  'filters': 'filters',
  'propdef-overflow': 'overflow',
  'propdef-visibility': 'visibility',
  'propdef-clip': 'clipping',
  'propdef-clip-path': 'clipping',
  'propdef-opacity': 'opacity',
  'propdef-filter': 'filters',
  'propdef-backdrop-filter': 'filters',
  'propdef-mix-blend-mode': 'filters',
  'propdef-background-blend-mode': 'filters',
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'overflow': {
    zh: '溢出',
    description: '当内容超出元素盒子的边界时发生的现象。overflow 属性控制如何处理溢出内容：显示、隐藏、滚动或自动处理。',
    sectionRef: 'visual-effects#overflow',
    css2Url: `${CSS22}/visufx.html#overflow`,
    specUrl: 'https://www.w3.org/TR/css-overflow-3/',
  },
  'clipping': {
    zh: '裁剪',
    description: '裁剪是将元素的可见区域限制在特定形状或路径内的技术。CSS2 的 clip 属性已被 CSS3 的 clip-path 取代，后者支持更复杂的裁剪形状。',
    sectionRef: 'visual-effects#clipping',
    css2Url: `${CSS22}/visufx.html#clipping`,
    specUrl: 'https://www.w3.org/TR/css-masking-1/',
  },
  'visibility': {
    zh: '可见性',
    description: 'visibility 属性控制元素是否可见。与 display: none 不同，visibility: hidden 的元素仍占据布局空间。',
    sectionRef: 'visual-effects#visibility',
    css2Url: `${CSS22}/visufx.html#visibility`,
    specUrl: 'https://www.w3.org/TR/css-display-3/',
  },
  'opacity': {
    zh: '不透明度',
    description: 'opacity 属性定义元素及其所有子元素的不透明程度，取值 0（完全透明）到 1（完全不透明）。设置 opacity 会创建新的层叠上下文。',
    sectionRef: 'visual-effects#opacity',
    specUrl: 'https://www.w3.org/TR/css-color-4/#transparency',
  },
  'filter': {
    zh: '滤镜',
    description: 'CSS filter 属性对元素应用图像滤镜效果，如模糊、亮度调整、对比度、灰度等。可以组合多个滤镜函数。',
    sectionRef: 'visual-effects#filters',
    specUrl: 'https://www.w3.org/TR/filter-effects-1/',
  },
  'blend mode': {
    zh: '混合模式',
    description: '混合模式定义元素与其背景或下层内容如何混合。mix-blend-mode 控制元素混合，background-blend-mode 控制背景混合。',
    sectionRef: 'visual-effects#filters',
    specUrl: 'https://www.w3.org/TR/compositing-1/',
  },
  'backdrop-filter': {
    zh: '背景滤镜',
    description: 'backdrop-filter 对元素背后的内容应用滤镜效果，常用于实现毛玻璃效果。需要元素背景半透明才能看到效果。',
    sectionRef: 'visual-effects#filters',
    specUrl: 'https://www.w3.org/TR/filter-effects-2/#BackdropFilterProperty',
  },
  'clip-path': {
    zh: '裁剪路径',
    description: 'clip-path 属性使用形状或路径裁剪元素的可见区域。支持基本形状（circle、ellipse、polygon、inset）和 SVG 路径引用。',
    sectionRef: 'visual-effects#clipping',
    specUrl: 'https://www.w3.org/TR/css-masking-1/#the-clip-path',
  },
};

// ============================================================
// 属性表
// ============================================================

export const propertyTerms: Record<string, PropertyEntry> = {
  // NOTE: overflow, visibility, clip, opacity 已在 common.ts 中定义
  // 这里仅定义新属性：overflow-x, overflow-y, clip-path, filter, backdrop-filter, mix-blend-mode

  'overflow-x': {
    zh: '水平溢出处理',
    value: 'visible | hidden | clip | scroll | auto',
    initial: 'visible',
    appliesTo: '块级容器、flex 容器、grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '通常为指定值，visible/clip 在某些情况下计算为 auto/hidden',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-overflow-3/#overflow-properties',
    sectionRef: 'visual-effects#overflow',
  },
  'overflow-y': {
    zh: '垂直溢出处理',
    value: 'visible | hidden | clip | scroll | auto',
    initial: 'visible',
    appliesTo: '块级容器、flex 容器、grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '通常为指定值，visible/clip 在某些情况下计算为 auto/hidden',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-overflow-3/#overflow-properties',
    sectionRef: 'visual-effects#overflow',
  },
  'clip-path': {
    zh: '裁剪路径',
    value: '<clip-source> | [ <basic-shape> || <geometry-box> ] | none',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于除 <defs> 外的容器元素和所有图形元素',
    inherited: false,
    percentages: '相对于引用框的尺寸',
    computedValue: '指定值（<basic-shape> 的值会计算为绝对长度，除非使用百分比）',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-masking-1/#the-clip-path',
    sectionRef: 'visual-effects#clipping',
  },
  'filter': {
    zh: '滤镜',
    value: 'none | <filter-function-list>',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/filter-effects-1/#FilterProperty',
    sectionRef: 'visual-effects#filters',
  },
  'backdrop-filter': {
    zh: '背景滤镜',
    value: 'none | <filter-function-list>',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/filter-effects-2/#BackdropFilterProperty',
    sectionRef: 'visual-effects#filters',
  },
  'mix-blend-mode': {
    zh: '混合模式',
    value: '<blend-mode> | normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/compositing-1/#mix-blend-mode',
    sectionRef: 'visual-effects#filters',
  },
  'background-blend-mode': {
    zh: '背景混合模式',
    value: '<blend-mode>#',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/compositing-1/#background-blend-mode',
    sectionRef: 'visual-effects#filters',
  },
};
