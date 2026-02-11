import type { Section, TutorialBlock } from '../modules';
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
    tutorial: [
      { type: 'heading', text: '什么是媒体查询' },
      { type: 'paragraph', text: '媒体查询(Media Queries)是 CSS3 引入的强大特性,允许我们根据设备的特性有条件地应用样式。想象一下,你的网站需要在手机、平板和电脑上都能完美显示 — 媒体查询就是实现这一目标的关键技术。' },
      { type: 'code', code: `/* 最简单的媒体查询示例 */
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}`, lang: 'css', caption: '当屏幕宽度小于等于 768px 时应用样式' },
      { type: 'heading', text: '媒体查询的历史演进' },
      { type: 'paragraph', text: 'CSS2 最初引入了媒体类型(media types)的概念,如 screen(屏幕)、print(打印)、handheld(手持设备)等。但随着设备种类爆炸式增长,这种简单分类已经不够用了。CSS3 的媒体查询引入了更细粒度的媒体特性(media features),如宽度、高度、分辨率等。' },
      { type: 'list', items: [
        'CSS2.1: 引入基本媒体类型,如 @media screen、@media print',
        'CSS3 Media Queries Level 3: 引入媒体特性查询,支持 min-width、max-width 等',
        'Media Queries Level 4: 增加范围语法(如 width >= 768px)、用户偏好查询',
        'Media Queries Level 5: 引入脚本特性、自定义媒体查询等前沿特性'
      ] },
      { type: 'heading', text: '为什么媒体查询如此重要' },
      { type: 'paragraph', text: '在移动互联网时代,用户可能通过手机、平板、笔记本或台式机访问你的网站。如果没有媒体查询,你需要为每种设备创建独立的网站版本 — 这显然不现实。媒体查询让"一次编写,到处运行"成为可能。' },
      { type: 'example', title: '响应式设计实例', code: `/* 移动优先设计 */
.card {
  width: 100%;
  margin-bottom: 20px;
}

/* 平板及以上屏幕 */
@media (min-width: 768px) {
  .card {
    width: 48%;
    display: inline-block;
  }
}

/* 桌面屏幕 */
@media (min-width: 1200px) {
  .card {
    width: 32%;
  }
}`, lang: 'css', explanation: '这个例子展示了如何让卡片布局在不同屏幕尺寸下自适应:手机上单列,平板上两列,桌面上三列。' },
      { type: 'tip', text: '媒体查询不仅能检测屏幕尺寸,还能检测用户偏好(如深色模式)、设备能力(如触摸屏)、环境条件(如打印)等,是构建可访问、响应式网站的基石。' },
      { type: 'heading', text: '媒体查询的应用场景' },
      { type: 'list', items: [
        '响应式布局:根据视口宽度调整栅格系统、导航菜单、图片尺寸',
        '打印样式:隐藏导航栏、调整字体大小、添加页面页脚',
        '深色模式:通过 prefers-color-scheme 检测用户系统偏好',
        '无障碍适配:通过 prefers-reduced-motion 为动画敏感用户禁用动画',
        '高分辨率屏幕:通过 resolution 查询为 Retina 屏幕提供高清图片'
      ] },
      { type: 'code', code: `/* 打印样式示例 */
@media print {
  nav, footer, .no-print {
    display: none;
  }

  body {
    font-size: 12pt;
    color: black;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #f0f0f0;
  }
}`, lang: 'css', caption: '媒体查询的两个实用场景' },
      { type: 'warning', text: '避免过度依赖具体设备宽度(如 iPhone 6 的 375px)设置断点。应该根据内容需求来决定断点位置,这样的设计更具通用性和未来兼容性。' },
      { type: 'paragraph', text: '接下来,我们将深入学习媒体类型、媒体特性和媒体查询的语法规则,帮助你掌握这一响应式设计的核心技术。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '媒体类型的起源与演变' },
      { type: 'paragraph', text: 'CSS2 最初设想了一个多样化的输出设备世界:屏幕、打印机、盲文设备、语音合成器等。于是定义了 10 种媒体类型,试图为每种设备类别提供专门的样式支持。' },
      { type: 'list', items: [
        '**all** — 适用于所有设备(默认值)',
        '**screen** — 彩色计算机屏幕',
        '**print** — 打印预览和打印输出',
        '**aural**(后改为 **speech**) — 语音合成器',
        '**braille** — 盲文触觉反馈设备',
        '**handheld** — 手持设备(小屏幕、有限带宽)',
        '**projection** — 投影仪',
        '**tty** — 固定间距字符网格的终端设备',
        '**tv** — 电视类设备(低分辨率、无滚动)',
        '**embossed** — 盲文打印机'
      ] },
      { type: 'paragraph', text: '然而现实很快打脸了这种理想化分类。智能手机既是"手持设备"又有高分辨率"屏幕",平板电脑可能横屏也可能竖屏,智能电视支持触摸和滚动……设备边界越来越模糊。' },
      { type: 'heading', text: 'CSS3 的大清洗:仅保留 4 种核心类型' },
      { type: 'paragraph', text: 'Media Queries Level 4 规范做出了务实选择,废弃了大部分媒体类型,仅保留真正有用的 4 种:' },
      { type: 'code', code: `/* 现代 CSS 中的媒体类型 */
@media all { }        /* 所有设备(通常省略不写) */
@media screen { }     /* 屏幕设备(桌面、手机、平板等) */
@media print { }      /* 打印 */
@media speech { }     /* 语音合成器(无障碍) */`, lang: 'css', caption: 'CSS3 保留的四种媒体类型' },
      { type: 'warning', text: '如果你在现代代码中看到 handheld、projection、tv 等媒体类型,它们已经被废弃。浏览器会将 handheld 等同于 all,导致预期行为失效。' },
      { type: 'heading', text: '使用 @media 规则指定媒体类型' },
      { type: 'paragraph', text: '@media 规则是在 CSS 中应用媒体类型的主要方式。你可以为特定媒体类型定义专门的样式块:' },
      { type: 'code', code: `/* 屏幕显示样式 */
@media screen {
  body {
    font-family: -apple-system, sans-serif;
    background: #f5f5f5;
  }
}

/* 打印样式 */
@media print {
  body {
    font-family: Georgia, serif;
    background: white;
    color: black;
  }

  nav, .no-print {
    display: none; /* 打印时隐藏导航 */
  }
}`, lang: 'css', caption: '为不同媒体类型定义样式' },
      { type: 'heading', text: '通过 <link> 元素条件加载样式表' },
      { type: 'paragraph', text: '你可以在 HTML 中使用 `media` 属性来条件加载样式表,只有当媒体类型匹配时才会下载和应用该 CSS 文件:' },
      { type: 'code', code: `<!-- 主样式表(所有设备) -->
<link rel="stylesheet" href="main.css">

<!-- 打印专用样式表 -->
<link rel="stylesheet" href="print.css" media="print">

<!-- 屏幕专用样式表 -->
<link rel="stylesheet" href="screen.css" media="screen">`, lang: 'html', caption: '使用 media 属性条件加载样式表' },
      { type: 'tip', text: '即使 media 属性不匹配,浏览器仍会下载该样式表,只是不会应用它。这个属性主要用于组织代码,而非优化性能。' },
      { type: 'heading', text: '使用 @import 导入带媒体条件的样式' },
      { type: 'paragraph', text: '@import 规则也支持媒体条件,可以在导入时指定媒体类型或更复杂的媒体查询:' },
      { type: 'code', code: `/* 导入打印样式 */
@import url("print-layout.css") print;

/* 导入屏幕样式并结合媒体特性 */
@import url("mobile.css") screen and (max-width: 768px);

/* 导入所有媒体类型的基础样式 */
@import url("base.css") all;`, lang: 'css', caption: '@import 结合媒体条件' },
      { type: 'warning', text: '@import 会阻塞渲染,影响页面加载性能。生产环境中推荐使用构建工具合并 CSS 文件,或使用 <link> 标签。' },
      { type: 'heading', text: '实战:完整的打印样式表示例' },
      { type: 'example', title: '打印友好的网页样式', code: `@media print {
  /* 隐藏不需要打印的元素 */
  nav, header, footer, .sidebar, .ad, .comment-form {
    display: none !important;
  }

  /* 优化打印版式 */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: black;
    background: white;
  }

  /* 移除背景图 */
  * {
    background-image: none !important;
  }

  /* 显示链接 URL */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.9em;
    color: #666;
  }

  /* 避免分页打断 */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }

  img {
    max-width: 100%;
    page-break-inside: avoid;
  }
}`, lang: 'css', explanation: '这个打印样式表做了以下优化:隐藏导航和广告、调整字体为打印友好的尺寸、显示链接的实际 URL、避免标题和图片被分页打断。打印网页时用户会获得清晰、节省纸张的输出。' },
      { type: 'paragraph', text: '虽然媒体类型的种类减少了,但它们仍是媒体查询的基础。接下来我们将学习更强大的媒体特性,它们才是现代响应式设计的核心。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '媒体特性:比媒体类型更精确的控制' },
      { type: 'paragraph', text: '如果说媒体类型是粗粒度的设备分类,那么媒体特性就是细粒度的设备能力检测。媒体特性让你可以查询视口宽度、屏幕分辨率、颜色深度、用户偏好等具体信息,从而实现真正精准的响应式设计。' },
      { type: 'heading', text: '视口尺寸特性:响应式设计的基石' },
      { type: 'paragraph', text: '最常用的媒体特性就是视口尺寸查询。`width` 和 `height` 用于查询视口的当前宽度和高度,通常结合 `min-` 和 `max-` 前缀使用:' },
      { type: 'code', code: `/* 视口宽度至少 768px */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 视口宽度最多 767px */
@media (max-width: 767px) {
  .mobile-menu {
    display: block;
  }
}

/* 视口高度至少 600px */
@media (min-height: 600px) {
  .full-height-hero {
    height: 100vh;
  }
}`, lang: 'css', caption: '常见的尺寸特性查询' },
      { type: 'tip', text: '推荐使用 `min-width` 而非 `max-width` 来实现移动优先设计,这样基础样式适用于小屏幕,逐步增强到大屏幕,代码更易维护。' },
      { type: 'heading', text: '显示特性:适配不同屏幕形态' },
      { type: 'paragraph', text: '现代设备有各种屏幕形态:竖屏手机、横屏平板、超宽显示器、方形折叠屏……显示特性帮助你适配这些差异:' },
      { type: 'code', code: `/* 横屏模式 */
@media (orientation: landscape) {
  .video-player {
    width: 100vw;
    height: 56.25vw; /* 16:9 比例 */
  }
}

/* 竖屏模式 */
@media (orientation: portrait) {
  .sidebar {
    width: 100%;
    height: auto;
  }
}

/* 宽高比至少 16:9 */
@media (min-aspect-ratio: 16/9) {
  .widescreen-layout {
    display: flex;
  }
}

/* 高分辨率屏幕(Retina 等) */
@media (min-resolution: 2dppx) {
  .logo {
    background-image: url('logo@2x.png');
    background-size: 200px 50px;
  }
}`, lang: 'css', caption: '显示特性查询示例' },
      { type: 'heading', text: '颜色特性:适配不同色彩能力' },
      { type: 'paragraph', text: '颜色特性让你检测设备的色彩支持能力。`color` 查询每个颜色分量的位数,`color-gamut` 检测色域范围,`monochrome` 检测单色设备:' },
      { type: 'code', code: `/* 设备支持彩色显示(每分量至少 1 位) */
@media (color) {
  .color-photo {
    display: block;
  }
}

/* 设备支持广色域(P3 或更宽) */
@media (color-gamut: p3) {
  .vibrant-gradient {
    background: linear-gradient(to right,
      color(display-p3 1 0 0),
      color(display-p3 0 0 1)
    );
  }
}

/* 单色设备 */
@media (monochrome) {
  img {
    filter: grayscale(100%);
  }
}`, lang: 'css', caption: '颜色特性查询' },
      { type: 'heading', text: '交互特性:区分触摸和鼠标设备' },
      { type: 'paragraph', text: '交互特性是现代响应式设计的关键。`hover` 检测主要输入设备是否支持悬停,`pointer` 检测指针精度:' },
      { type: 'example', title: '为触摸和鼠标设备优化交互', code: `/* 支持悬停的设备(鼠标) */
@media (hover: hover) {
  .button:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
}

/* 不支持悬停的设备(触摸屏) */
@media (hover: none) {
  .button {
    /* 增大触摸目标 */
    min-height: 44px;
    padding: 12px 24px;
  }
}

/* 精确指针设备(鼠标、触控笔) */
@media (pointer: fine) {
  .clickable {
    cursor: pointer;
  }
}

/* 粗糙指针设备(手指触摸) */
@media (pointer: coarse) {
  .clickable {
    /* 增大点击区域 */
    min-width: 44px;
    min-height: 44px;
  }
}`, lang: 'css', explanation: '触摸设备用户无法"悬停"在元素上,需要更大的触摸目标(至少 44×44px)。鼠标用户可以享受悬停效果和更精细的交互。使用交互特性可以为两类用户提供最佳体验。' },
      { type: 'heading', text: '用户偏好特性:尊重用户的选择' },
      { type: 'paragraph', text: '现代操作系统允许用户设置偏好,如深色模式、减少动画等。CSS 可以通过用户偏好特性检测这些设置并做出响应:' },
      { type: 'code', code: `/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
    --link: #58a6ff;
  }
}

/* 浅色模式 */
@media (prefers-color-scheme: light) {
  :root {
    --bg: #ffffff;
    --text: #24292f;
    --link: #0969da;
  }
}

/* 用户偏好减少动画(前庭障碍、晕动症) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 用户偏好高对比度 */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
    font-weight: bold;
  }
}`, lang: 'css', caption: '响应用户偏好设置' },
      { type: 'warning', text: '`prefers-reduced-motion: reduce` 是无障碍访问的重要特性,忽略它可能导致前庭障碍用户感到眩晕或恶心。务必为关键动画提供降级方案。' },
      { type: 'heading', text: 'Level 4 范围语法:更直观的查询方式' },
      { type: 'paragraph', text: 'Media Queries Level 4 引入了范围语法,使用比较运算符(`<`、`<=`、`>`、`>=`)代替 `min-` 和 `max-` 前缀,代码更加直观:' },
      { type: 'code', code: `/* 传统语法 */
@media (min-width: 400px) and (max-width: 1000px) {
  /* ... */
}

/* Level 4 范围语法(等价) */
@media (400px <= width <= 1000px) {
  /* ... */
}

/* 宽度大于 1200px */
@media (width > 1200px) {
  /* ... */
}

/* 高度小于 800px */
@media (height < 800px) {
  /* ... */
}`, lang: 'css', caption: '范围语法对比' },
      { type: 'tip', text: '范围语法在现代浏览器中支持良好(Chrome 104+、Safari 16.4+、Firefox 102+)。如果需要支持旧浏览器,仍需使用传统的 min-/max- 前缀语法。' },
      { type: 'paragraph', text: '媒体特性提供了丰富的查询能力,让你能够精准地适配各种设备和用户偏好。接下来我们将学习如何组合这些特性构建复杂的媒体查询。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '媒体查询的完整语法结构' },
      { type: 'paragraph', text: '媒体查询的语法看起来可能有点复杂,但理解了它的结构后就会发现非常灵活。完整语法包括可选的修饰符(not/only)、媒体类型和媒体特性条件:' },
      { type: 'code', code: `/* 完整语法模式 */
@media [not|only] media-type [and (media-feature)] {
  /* CSS 规则 */
}

/* 实例 */
@media screen and (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}`, lang: 'css', caption: '媒体查询的基本语法结构' },
      { type: 'paragraph', text: '让我们逐个解析各个组成部分的含义和用法。' },
      { type: 'heading', text: '逻辑运算符 and:组合多个条件' },
      { type: 'paragraph', text: '`and` 运算符用于组合多个条件,只有当所有条件都满足时,样式才会应用。这是构建精确查询的关键:' },
      { type: 'code', code: `/* 同时满足:屏幕设备 + 宽度至少 768px + 横屏 */
@media screen and (min-width: 768px) and (orientation: landscape) {
  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}

/* 同时满足:宽度 768-1024px + 高分辨率屏幕 */
@media (min-width: 768px) and (max-width: 1024px) and (min-resolution: 2dppx) {
  .image {
    background-image: url('medium@2x.jpg');
  }
}`, lang: 'css', caption: '使用 and 组合多个条件' },
      { type: 'heading', text: '逻辑运算符 or(逗号):任一条件匹配即可' },
      { type: 'paragraph', text: 'CSS 没有 `or` 关键字,而是使用逗号分隔多个媒体查询。只要其中任何一个查询匹配,样式就会应用:' },
      { type: 'code', code: `/* 满足任一条件:宽度 >= 1200px 或横屏平板 */
@media (min-width: 1200px),
       (min-width: 768px) and (orientation: landscape) {
  .sidebar {
    display: block;
  }
}

/* 满足任一条件:打印 或 单色屏幕 */
@media print, (monochrome) {
  img {
    filter: grayscale(100%);
  }
}`, lang: 'css', caption: '使用逗号实现 OR 逻辑' },
      { type: 'tip', text: '逗号分隔的媒体查询会被独立解析,如果其中一个查询语法错误,只会导致该查询失效,不影响其他查询。' },
      { type: 'heading', text: '逻辑运算符 not:条件取反' },
      { type: 'paragraph', text: '`not` 运算符对整个媒体查询取反。注意:使用 `not` 时**必须指定媒体类型**,否则语法无效:' },
      { type: 'code', code: `/* 正确:非屏幕设备(如打印) */
@media not screen {
  .interactive-widget {
    display: none;
  }
}

/* 正确:屏幕设备但不支持悬停(如触摸屏) */
@media not all and (hover: hover) {
  .tooltip {
    display: none;
  }
}

/* 错误:not 必须指定媒体类型 */
@media not (hover: hover) {  /* 无效! */
  /* ... */
}`, lang: 'css', caption: 'not 运算符的正确用法' },
      { type: 'warning', text: '`not` 会对**整个**媒体查询取反,而不是单个条件。例如 `not screen and (color)` 的意思是"不是(彩色屏幕)",而不是"屏幕但不是彩色"。' },
      { type: 'heading', text: 'only 关键字:向后兼容的技巧' },
      { type: 'paragraph', text: '`only` 关键字用于向旧版浏览器隐藏媒体查询。旧浏览器(IE8 及更早)会在遇到不认识的媒体类型时忽略整个样式表,利用这一点可以避免旧浏览器错误应用样式:' },
      { type: 'code', code: `/* 旧浏览器会将 'only screen' 当作未知媒体类型而忽略 */
@media only screen and (min-width: 768px) {
  .modern-layout {
    display: grid;
  }
}

/* 现代浏览器会忽略 only,正常处理查询 */`, lang: 'css', caption: 'only 关键字用于向后兼容' },
      { type: 'tip', text: '现代开发中通常不需要 `only` 关键字了,因为 IE8 及更早版本的市场份额已接近零。除非明确需要支持这些古老浏览器,否则可以省略 `only`。' },
      { type: 'heading', text: 'Level 4 范围语法:更简洁的表达方式' },
      { type: 'paragraph', text: 'Media Queries Level 4 引入了范围语法,使用数学比较运算符代替 min-/max- 前缀,代码可读性更强:' },
      { type: 'example', title: '范围语法对比', code: `/* 传统语法:宽度 400-1000px */
@media (min-width: 400px) and (max-width: 1000px) {
  .content { padding: 20px; }
}

/* Level 4 范围语法(等价) */
@media (400px <= width <= 1000px) {
  .content { padding: 20px; }
}

/* 宽度大于 1200px */
@media (width > 1200px) {
  .wide-layout { display: flex; }
}

/* 高度在 600px 到 900px 之间 */
@media (600px < height < 900px) {
  .tall-content { display: block; }
}

/* 混合使用 */
@media (width >= 768px) and (height >= 600px) {
  .full-ui { display: grid; }
}`, lang: 'css', explanation: '范围语法更接近自然语言表达,特别是在查询一个范围时,一行代码就能表达传统语法需要 and 组合的两个条件。浏览器支持:Chrome 104+、Firefox 102+、Safari 16.4+。' },
      { type: 'heading', text: '复杂查询示例:组合多种技术' },
      { type: 'paragraph', text: '实际项目中,你可能需要组合多个条件、运算符和范围查询来实现精确控制:' },
      { type: 'code', code: `/* 复杂示例 1:平板横屏或桌面,且支持悬停 */
@media ((768px <= width < 1024px) and (orientation: landscape)),
       (width >= 1024px) {
  @media (hover: hover) {
    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
  }
}

/* 复杂示例 2:高分辨率屏幕,深色模式,宽度 >= 768px */
@media (min-resolution: 2dppx) and
       (prefers-color-scheme: dark) and
       (min-width: 768px) {
  .hero-image {
    background-image: url('hero-dark@2x.webp');
  }
}`, lang: 'css', caption: '组合多种媒体查询技术' },
      { type: 'heading', text: '嵌套 @media 规则(CSS Nesting)' },
      { type: 'paragraph', text: 'CSS Nesting 允许在选择器内部嵌套 @media 规则,让媒体查询更贴近相关样式,提高代码组织性:' },
      { type: 'code', code: `.card {
  padding: 10px;
  background: white;

  /* 嵌套媒体查询 */
  @media (min-width: 768px) {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
    color: #f0f0f0;
  }
}`, lang: 'css', caption: 'CSS Nesting 中的媒体查询' },
      { type: 'tip', text: 'CSS Nesting 在现代浏览器中已原生支持(Chrome 112+、Safari 16.5+、Firefox 117+)。如需支持旧浏览器,可使用 PostCSS 等工具转译。' },
      { type: 'paragraph', text: '掌握了媒体查询语法后,你就能构建高度灵活、精确适配的响应式样式。接下来我们将学习如何将这些技术应用到实际的响应式设计中。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '响应式设计的三大支柱' },
      { type: 'paragraph', text: '响应式网页设计(Responsive Web Design, RWD)由 Ethan Marcotte 在 2010 年提出,它基于三大核心技术:流式网格布局(Fluid Grid)、灵活图片(Flexible Images)和媒体查询(Media Queries)。这三者结合,让一个网站能够在手机、平板、电脑上都提供优质体验。' },
      { type: 'heading', text: 'viewport meta 标签:响应式的前提' },
      { type: 'paragraph', text: '在移动设备上,浏览器默认会使用一个虚拟视口(通常 980px),然后缩小显示整个页面。这会导致响应式设计失效。`viewport` meta 标签告诉浏览器使用设备的实际宽度:' },
      { type: 'code', code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <!-- 关键的 viewport 设置 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>响应式网页</title>
</head>`, lang: 'html', caption: 'viewport meta 标签是响应式设计的必需品' },
      { type: 'list', items: [
        '**width=device-width** — 视口宽度等于设备宽度(而非默认的 980px)',
        '**initial-scale=1** — 初始缩放比例为 1:1,不放大也不缩小',
        '可选:**maximum-scale=5** — 限制最大缩放倍数(注意:禁用缩放会影响无障碍访问)',
        '可选:**user-scalable=yes** — 允许用户缩放(默认值,不要设为 no)'
      ] },
      { type: 'warning', text: '永远不要使用 `user-scalable=no` 或 `maximum-scale=1` 来禁用用户缩放,这会严重伤害视力障碍用户的体验,违反 WCAG 无障碍指南。' },
      { type: 'heading', text: '移动优先 vs 桌面优先:两种设计哲学' },
      { type: 'paragraph', text: '响应式设计有两种主流策略,它们影响你如何编写媒体查询和组织代码:' },
      { type: 'example', title: '移动优先(Mobile First)', code: `/* 基础样式:针对小屏幕(手机) */
.container {
  width: 100%;
  padding: 10px;
}

.nav {
  flex-direction: column;
}

/* 逐步增强:平板及以上 */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .nav {
    flex-direction: row;
  }
}

/* 继续增强:桌面 */
@media (min-width: 1200px) {
  .container {
    padding: 40px;
  }
}`, lang: 'css', explanation: '移动优先从最简单的布局开始(单列、小字号),然后在更大屏幕上逐步增强功能。使用 `min-width` 媒体查询。优势:代码更简洁,性能更好(移动设备下载更少 CSS),强制你优先考虑核心内容。' },
      { type: 'example', title: '桌面优先(Desktop First)', code: `/* 基础样式:针对大屏幕(桌面) */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

.nav {
  display: flex;
  flex-direction: row;
}

/* 逐步适配:平板及以下 */
@media (max-width: 1199px) {
  .container {
    padding: 20px;
  }
}

/* 继续适配:手机 */
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 10px;
  }

  .nav {
    flex-direction: column;
  }
}`, lang: 'css', explanation: '桌面优先从复杂布局开始,然后在小屏幕上逐步简化。使用 `max-width` 媒体查询。适合既有桌面网站迁移,但通常导致移动设备加载不必要的样式。' },
      { type: 'tip', text: '现代开发推荐移动优先策略,因为移动流量已超过桌面,且移动优先能强制你聚焦核心功能,避免臃肿设计。' },
      { type: 'heading', text: '断点设置:基于内容而非设备' },
      { type: 'paragraph', text: '常见的断点值(320px、768px、1024px 等)来自早期 iPhone 和 iPad 的尺寸。但现在设备尺寸千差万别,盲目使用这些"魔法数字"是不明智的。更好的做法是根据内容需求设置断点:' },
      { type: 'code', code: `/* 不推荐:基于特定设备 */
@media (min-width: 375px) { /* iPhone 6 宽度 */ }
@media (min-width: 768px) { /* iPad 竖屏宽度 */ }

/* 推荐:基于内容需求 */
@media (min-width: 30em) {
  /* 当文本行长度合适时,从单列切换到双列 */
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 60em) {
  /* 当空间足够时,显示侧边栏 */
  .layout {
    grid-template-columns: 250px 1fr;
  }
}`, lang: 'css', caption: '使用 em 单位的内容驱动断点' },
      { type: 'tip', text: '使用 `em` 单位设置断点(而非 `px`)有个好处:当用户调整浏览器默认字号时,断点也会相应调整,布局始终与文字大小匹配。计算方法:768px ÷ 16px = 48em。' },
      { type: 'heading', text: '弹性布局:使用相对单位和现代布局' },
      { type: 'paragraph', text: '响应式设计的核心是避免固定宽度。使用相对单位(百分比、em、rem、vw/vh)和现代布局技术(Flexbox、Grid)让布局自然流动:' },
      { type: 'code', code: `/* 流式宽度 */
.container {
  width: 90%;              /* 相对于父元素 */
  max-width: 1200px;       /* 限制最大宽度 */
  margin: 0 auto;
}

/* Flexbox 弹性布局 */
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;         /* 最小 300px,自动伸缩 */
}

/* Grid 响应式布局 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* 视口单位 */
.hero {
  height: 100vh;           /* 视口高度的 100% */
  width: 100vw;            /* 视口宽度的 100% */
}`, lang: 'css', caption: '使用相对单位和弹性布局' },
      { type: 'heading', text: '灵活图片:适配不同屏幕' },
      { type: 'paragraph', text: '图片是响应式设计的一大挑战。最基本的技巧是设置 `max-width: 100%`,让图片不超出容器:' },
      { type: 'code', code: `/* 基础:防止图片溢出 */
img {
  max-width: 100%;
  height: auto;            /* 保持宽高比 */
}

/* object-fit 控制图片裁剪方式 */
.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;       /* 覆盖容器,裁剪多余部分 */
}

/* srcset 提供多分辨率图片 */
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         800px"
  alt="响应式图片">

/* picture 元素:不同断点使用不同图片 */
<picture>
  <source media="(min-width: 1200px)" srcset="wide.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="响应式图片">
</picture>`, lang: 'css', caption: '响应式图片技术' },
      { type: 'heading', text: '容器查询:下一代响应式设计' },
      { type: 'paragraph', text: '传统媒体查询基于视口(整个浏览器窗口)宽度,但组件的布局往往应该基于其容器宽度。CSS Container Queries 解决了这个问题:' },
      { type: 'code', code: `/* 定义容器 */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

/* 基于容器宽度查询 */
@container sidebar (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* 不指定容器名,查询最近的容器 */
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    padding: 20px;
  }
}`, lang: 'css', caption: 'Container Queries 基于容器而非视口' },
      { type: 'tip', text: 'Container Queries 在现代浏览器中已广泛支持(Chrome 105+、Safari 16+、Firefox 110+),是构建真正可复用组件的关键技术。' },
      { type: 'heading', text: '实战:完整的响应式布局示例' },
      { type: 'example', title: '移动优先的响应式页面布局', code: `/* 移动基础样式(小屏幕) */
.page {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.header {
  background: #333;
  color: white;
  padding: 1rem;
}

.nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.main {
  padding: 1rem;
}

.sidebar {
  background: #f0f0f0;
  padding: 1rem;
}

/* 平板及以上(768px+) */
@media (min-width: 48em) {
  .page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav ul {
    flex-direction: row;
    justify-content: center;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
  }
}

/* 桌面(1200px+) */
@media (min-width: 75em) {
  .page {
    padding: 3rem;
  }

  .content {
    grid-template-columns: 1fr 350px;
    gap: 3rem;
  }
}`, lang: 'css', explanation: '这个示例展示了完整的移动优先响应式布局:手机上单列垂直堆叠,导航垂直排列;平板上引入网格布局,导航水平排列;桌面上进一步增大间距和侧边栏宽度。所有宽度使用相对单位,布局自然流动。' },
      { type: 'paragraph', text: '响应式设计不是一套固定公式,而是一种设计思维:让内容适应设备,而非强迫设备适应内容。掌握媒体查询、弹性布局和灵活图片这三大支柱,你就能构建适配任何屏幕的现代网站。' },
    ] as TutorialBlock[],
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
