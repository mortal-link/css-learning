import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '媒体查询简介', en: 'Introduction to Media Queries' },
    summary: { zh: 'CSS 媒体查询允许根据设备特性(如屏幕尺寸、分辨率、颜色能力等)应用不同的样式规则,是响应式设计的核心技术。', en: 'CSS media queries allow applying different style rules based on device characteristics (such as screen size, resolution, color capabilities, etc.), and are the core technology of responsive design.' },
    keyPoints: [
      '媒体查询使得同一份 HTML 文档可以在不同设备上呈现不同外观',
      'CSS2 引入了媒体类型(media types)的概念,如 screen、print',
      'CSS3 媒体查询(Media Queries Level 4)扩展了媒体特性(media features)',
      '现代响应式设计完全依赖媒体查询来适配多种设备',
    ],
  },
  {
    id: 'media-types',
    number: '2',
    title: { zh: '媒体类型', en: 'Media Types' },
    summary: { zh: '媒体类型定义了样式表适用的输出设备类别。CSS2 定义了多种媒体类型,但 CSS3 中大部分已被废弃,仅保留核心类型。', en: 'Media types define the category of output device for which a style sheet is intended. CSS2 defined multiple media types, but most have been deprecated in CSS3, retaining only core types.' },
    keyPoints: [
      'CSS2 定义的媒体类型:all、screen、print、aural(后改为speech)、braille、handheld、projection、tty、tv、embossed',
      'CSS3 Media Queries Level 4 仅保留:all、screen、print、speech',
      '其他媒体类型如 handheld、projection 等已废弃,因为现代设备边界模糊',
      '@media 规则用于指定媒体类型:@media screen { ... }',
      '<link> 元素的 media 属性:&lt;link rel="stylesheet" media="print" href="print.css"&gt;',
      '@import 规则的媒体条件:@import url("mobile.css") screen and (max-width: 768px)',
    ],
  },
  {
    id: 'media-features',
    number: '3',
    title: { zh: '媒体特性', en: 'Media Features' },
    summary: { zh: '媒体特性描述了用户代理、输出设备或环境的具体特征。CSS3 引入了丰富的媒体特性用于精确控制样式应用条件。', en: 'Media features describe specific characteristics of the user agent, output device, or environment. CSS3 introduced rich media features for precise control of style application conditions.' },
    keyPoints: [
      '视口尺寸特性:width、height、min-width、max-width、min-height、max-height',
      '显示特性:aspect-ratio、orientation(portrait/landscape)、resolution、scan',
      '颜色特性:color、color-index、color-gamut、monochrome',
      '交互特性:hover(设备主要输入机制是否支持悬停)、pointer(指针精度:none/coarse/fine)、any-hover、any-pointer',
      '用户偏好特性:prefers-color-scheme(dark/light)、prefers-reduced-motion、prefers-contrast、prefers-reduced-transparency',
      '环境特性:display-mode(fullscreen/standalone/minimal-ui/browser)、inverted-colors',
      '所有媒体特性都可以添加 min-/max- 前缀进行范围查询',
      'Level 4 引入范围语法:@media (400px <= width <= 1000px)',
    ],
  },
  {
    id: 'media-queries',
    number: '4',
    title: { zh: '媒体查询语法', en: 'Media Query Syntax' },
    summary: { zh: '媒体查询使用逻辑运算符组合媒体类型和媒体特性,形成复杂的条件表达式来精确控制样式应用。', en: 'Media queries use logical operators to combine media types and media features, forming complex conditional expressions for precise control of style application.' },
    keyPoints: [
      '基本语法:@media [not|only] media-type [and (media-feature)] { CSS-rules }',
      '逻辑运算符 and:组合多个条件,所有条件都必须满足',
      '逻辑运算符 or(逗号分隔):多个查询之一匹配即可',
      '逻辑运算符 not:对整个查询取反,必须指定媒体类型',
      'only 关键字:用于隐藏旧浏览器不支持的媒体查询',
      'CSS3 范围语法:使用比较运算符 <、<=、>、>=',
      '示例:@media screen and (min-width: 768px) and (max-width: 1024px) { ... }',
      '示例(范围语法):@media (768px <= width <= 1024px) { ... }',
      '嵌套@media 规则在 CSS Nesting 中得到支持',
    ],
  },
  {
    id: 'responsive-design',
    number: '5',
    title: { zh: '响应式设计基础', en: 'Responsive Design Basics' },
    summary: { zh: '响应式网页设计(Responsive Web Design, RWD)使用媒体查询、弹性布局和灵活图片技术,让网页能够适应不同设备和屏幕尺寸。', en: 'Responsive Web Design (RWD) uses media queries, flexible layouts, and flexible images to enable web pages to adapt to different devices and screen sizes.' },
    keyPoints: [
      'viewport meta 标签:&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;',
      '移动优先(Mobile First):从小屏幕开始设计,使用 min-width 逐步增强',
      '桌面优先(Desktop First):从大屏幕开始,使用 max-width 逐步适配小屏',
      '断点(Breakpoints):切换布局的关键宽度值,常见:320px、768px、1024px、1440px',
      '内容断点优先:根据内容需求而非具体设备宽度来设置断点',
      '弹性布局:使用 Flexbox、Grid 和相对单位(em、rem、%、vw/vh)',
      '灵活图片:max-width: 100%、object-fit、srcset/picture 元素',
      '容器查询(Container Queries):CSS Containment Level 3 引入,基于容器而非视口查询',
    ],
  },
];

export const anchors: Record<string, string> = {
  'media-types': 'media-types',
  'media-groups': 'media-types',
  'at-media-rule': 'media-queries',
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'media type': {
    zh: '媒体类型',
    description: '定义样式表适用的输出设备类别,如 screen(屏幕)、print(打印)、speech(语音合成器)。CSS2 定义了多种媒体类型,但 CSS3 Media Queries Level 4 中大部分已被废弃,仅保留 all、screen、print、speech 四种核心类型。',
    sectionRef: 'media#media-types',
    css2Url: 'https://www.w3.org/TR/CSS22/media.html#media-types',
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/#media-types',
  },
  'media query': {
    zh: '媒体查询',
    description: '使用媒体类型和媒体特性的逻辑组合来定义样式应用条件的表达式。媒体查询是响应式网页设计的核心技术,允许根据设备特性(如屏幕宽度、分辨率、颜色能力、用户偏好等)应用不同的 CSS 规则。语法:@media [not|only] media-type [and (media-feature)] { CSS-rules }。',
    sectionRef: 'media#media-queries',
    css2Url: 'https://www.w3.org/TR/CSS22/media.html',
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/',
  },
  'media feature': {
    zh: '媒体特性',
    description: '描述用户代理、输出设备或环境的具体特征的查询条件。CSS3 Media Queries 引入了丰富的媒体特性,包括:视口尺寸(width、height)、显示特性(orientation、resolution)、颜色能力(color、color-gamut)、交互能力(hover、pointer)、用户偏好(prefers-color-scheme、prefers-reduced-motion)等。媒体特性通常用括号包裹,可以使用比较运算符或 min-/max- 前缀进行范围查询。',
    sectionRef: 'media#media-features',
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/#mq-features',
  },
  'responsive design': {
    zh: '响应式设计',
    description: '响应式网页设计(Responsive Web Design, RWD)是一种网页设计方法,使网页能够根据访问设备的屏幕尺寸、平台和方向自动调整布局和内容呈现。核心技术包括:媒体查询(根据设备特性应用不同样式)、弹性布局(使用 Flexbox、Grid 和相对单位)、灵活图片(使用 max-width、srcset 等技术)。响应式设计避免了为不同设备创建多个版本网站的需求。',
    sectionRef: 'media#responsive-design',
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/',
  },
  'viewport': {
    zh: '视口',
    description: '浏览器中用于显示网页内容的可视区域。在移动设备上,视口概念尤为重要,因为物理屏幕尺寸与 CSS 像素尺寸可能不同。viewport meta 标签用于控制移动浏览器的视口行为,典型设置:&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;,使视口宽度等于设备宽度,初始缩放比例为 1:1。媒体查询中的 width 和 height 特性查询的就是视口尺寸。',
    sectionRef: 'media#responsive-design',
    specUrl: 'https://www.w3.org/TR/css-device-adapt/#viewport-meta',
  },
  'breakpoint': {
    zh: '断点',
    description: '在响应式设计中,断点是触发布局改变的特定视口宽度(或其他媒体特性)值。在断点处,网页布局会通过媒体查询切换到不同的样式规则,以适应不同屏幕尺寸。常见断点值示例:320px(小型手机)、768px(平板竖屏)、1024px(平板横屏/小型笔记本)、1440px(桌面显示器)。现代最佳实践建议基于内容需求而非特定设备来设置断点,采用"内容断点优先"策略。',
    sectionRef: 'media#responsive-design',
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/',
  },
};
