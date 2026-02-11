import type { Section, TutorialBlock } from '../modules';
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
    tutorial: [
      { type: 'heading', text: '为什么需要容器查询？' },
      { type: 'paragraph', text: '传统的响应式设计依赖**媒体查询**(Media Queries)，根据**视口尺寸**调整样式。但在组件化开发中，这个模式有个致命缺陷：组件不知道自己被放在了多大的空间里。一个卡片组件可能在宽屏侧边栏里只有 300px，也可能在主内容区占满 1000px——但媒体查询只能看到整个视口是 1920px，无法针对组件的实际可用空间做调整。' },
      { type: 'paragraph', text: '**容器查询**(Container Queries)解决了这个问题：它允许组件根据**父容器的尺寸**而非视口尺寸来调整样式。这是真正的"组件级响应式"——组件自己决定如何在不同尺寸下展现，而不依赖全局的断点设置。' },

      { type: 'heading', text: '声明查询容器：container-type' },
      { type: 'paragraph', text: '要使用容器查询，首先需要将某个元素声明为**查询容器**。这通过 `container-type` 属性完成。一旦某个元素成为查询容器，它的子元素就可以通过 `@container` 规则查询这个容器的尺寸。' },
      { type: 'code', lang: 'css', caption: 'container-type 的三个值', code: `/* 容器尺寸由外部决定，子元素可查询宽度和高度 */\n.sidebar {\n  container-type: size;\n}\n\n/* 只允许查询内联轴（通常是宽度）尺寸，最常用 */\n.card-wrapper {\n  container-type: inline-size;\n}\n\n/* 默认值：不是查询容器 */\n.normal {\n  container-type: normal;\n}` },
      { type: 'warning', text: '`container-type: size` 会在宽度**和**高度两个方向建立尺寸包含(size containment)。这意味着容器的高度不能由子元素内容撑开——你必须显式设置高度。大多数情况下，你应该用 `inline-size`（只包含内联轴，通常是宽度），这样高度仍可由内容自动撑开。' },

      { type: 'heading', text: '查询容器：@container 规则' },
      { type: 'paragraph', text: '声明了查询容器后，子元素可以通过 `@container` 规则根据容器尺寸应用样式。语法与媒体查询几乎一致，但查询的是**最近的祖先查询容器**的尺寸，而非视口。' },
      { type: 'example', title: '卡片组件的容器查询', lang: 'css', code: `.card-wrapper {\n  container-type: inline-size;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n/* 当容器宽度 ≥ 400px 时，切换到横向布局 */\n@container (min-width: 400px) {\n  .card {\n    flex-direction: row;\n    gap: 20px;\n  }\n  \n  .card__image {\n    width: 200px;\n  }\n}\n\n/* 容器宽度 ≥ 600px 时，进一步调整 */\n@container (min-width: 600px) {\n  .card__title {\n    font-size: 1.5rem;\n  }\n}`, explanation: '这个卡片组件会根据**自己的容器**宽度调整布局：小于 400px 时是竖向排列，400px 以上变为横向。无论这个卡片被放在窄侧边栏还是宽主内容区，它都能自适应。这是用媒体查询无法实现的——媒体查询只能看到整个页面宽度。' },

      { type: 'heading', text: '命名查询容器：container-name' },
      { type: 'paragraph', text: '默认情况下，`@container` 查询**最近的祖先查询容器**。但如果页面有多层嵌套的查询容器，你可以用 `container-name` 给容器命名，然后在 `@container` 中指定要查询哪个容器。' },
      { type: 'code', lang: 'css', caption: '命名查询容器', code: `.sidebar {\n  container-type: inline-size;\n  container-name: sidebar;\n}\n\n.article {\n  container-type: inline-size;\n  container-name: article;\n}\n\n/* 查询名为 sidebar 的容器 */\n@container sidebar (max-width: 300px) {\n  .widget {\n    font-size: 0.875rem;\n  }\n}\n\n/* 查询名为 article 的容器 */\n@container article (min-width: 800px) {\n  .content {\n    column-count: 2;\n  }\n}` },
      { type: 'tip', text: '`container` 简写属性可以同时设置 `container-name` 和 `container-type`：`container: sidebar / inline-size;` 等同于 `container-name: sidebar; container-type: inline-size;`。' },

      { type: 'heading', text: '容器查询单位：cqw, cqh, cqi, cqb' },
      { type: 'paragraph', text: '容器查询引入了一组新的长度单位，相对于**查询容器的尺寸**计算。这些单位让你可以基于容器尺寸设置字号、间距、尺寸等属性，实现真正流畅的缩放。' },
      { type: 'list', items: [
        '`cqw` (container query width): 查询容器宽度的 1%',
        '`cqh` (container query height): 查询容器高度的 1%',
        '`cqi` (container query inline-size): 容器内联轴尺寸的 1%（横排文本中等于 cqw）',
        '`cqb` (container query block-size): 容器块轴尺寸的 1%（横排文本中等于 cqh）',
        '`cqmin`: cqi 和 cqb 中较小的那个',
        '`cqmax`: cqi 和 cqb 中较大的那个'
      ] },
      { type: 'example', title: '用容器单位实现流畅缩放的标题', lang: 'css', code: `.card-wrapper {\n  container-type: inline-size;\n}\n\n.card__title {\n  /* 标题大小随容器宽度缩放\n     容器 400px → 标题 16px\n     容器 600px → 标题 24px */\n  font-size: clamp(1rem, 4cqi, 2rem);\n}\n\n.card__body {\n  /* 内边距也随容器缩放 */\n  padding: 2cqi;\n  gap: 1cqi;\n}`, explanation: '容器单位让组件的字号、间距能够平滑地随容器尺寸缩放，无需写大量的 `@container` 断点。`4cqi` 表示"容器宽度的 4%"，`clamp()` 限制了最小最大值，避免过小或过大。' },

      { type: 'heading', text: '容器样式查询：style()' },
      { type: 'paragraph', text: '除了查询容器的**尺寸**，CSS 容器查询还支持查询容器的**样式**——具体来说，是自定义属性(CSS 变量)的值。这让你可以基于容器的"状态"或"主题"来调整子元素样式。' },
      { type: 'example', title: '根据容器的主题变量切换样式', lang: 'css', code: `.theme-container {\n  container-type: inline-size;\n  --theme: light;\n}\n\n.theme-container[data-theme="dark"] {\n  --theme: dark;\n}\n\n/* 当容器的 --theme 变量为 dark 时 */\n@container style(--theme: dark) {\n  .card {\n    background: #1a1a1a;\n    color: #fff;\n  }\n}`, explanation: '容器样式查询让你可以把"主题"、"状态"等信息存储在容器的自定义属性中，子元素通过 `@container style()` 查询这些属性来调整样式。这比类名切换更语义化，也更灵活。' },
      { type: 'warning', text: '容器样式查询目前(2026年)的浏览器支持度不如尺寸查询。在生产环境使用前务必检查兼容性。尺寸查询已经在所有现代浏览器中稳定支持。' },

      { type: 'heading', text: '组合条件查询' },
      { type: 'paragraph', text: '`@container` 支持用 `and`、`or`、`not` 组合多个查询条件，语法与媒体查询相同。' },
      { type: 'code', lang: 'css', caption: '组合容器查询条件', code: `/* 宽度在 400px 到 800px 之间 */\n@container (min-width: 400px) and (max-width: 800px) {\n  .card { /* ... */ }\n}\n\n/* 宽度 ≥ 600px 且纵横比接近正方形 */\n@container (min-width: 600px) and (aspect-ratio > 0.9) {\n  .card { /* ... */ }\n}\n\n/* 宽度 < 400px 或容器主题是 dark */\n@container (max-width: 400px), style(--theme: dark) {\n  .card { /* ... */ }\n}` },

      { type: 'heading', text: '容器查询 vs 媒体查询：何时用哪个？' },
      { type: 'list', items: [
        '**用容器查询**：组件内部布局（卡片、列表项、侧边栏小部件）——组件需要适应不同的父容器尺寸',
        '**用媒体查询**：全局布局切换（单列/双列/三列、侧边栏显示/隐藏）——依赖设备屏幕尺寸的决策',
        '**用容器查询**：可复用组件库——组件不知道会被放在哪里，必须自适应',
        '**用媒体查询**：视口相关的特性（横竖屏、hover 能力、色彩方案）——这些是设备级别的属性'
      ] },
      { type: 'tip', text: '实践中，容器查询和媒体查询常常配合使用：媒体查询控制页面级的布局切换（如响应式侧边栏），容器查询控制组件内部的细节调整（如卡片的横竖排列）。' },

      { type: 'heading', text: '性能注意事项' },
      { type: 'paragraph', text: '容器查询在性能上与媒体查询相当——浏览器已经对容器查询做了充分优化。但有一点需要注意：声明 `container-type: size` 或 `inline-size` 会使元素建立**包含上下文**(containment)，这意味着容器的布局与外部隔离，浏览器可以独立优化容器内部的渲染。' },
      { type: 'warning', text: '不要把 `<body>` 或顶层容器设为查询容器——这会限制页面的布局能力。容器查询的最佳实践是：在组件的**包裹层**声明 `container-type`，让组件内部可以查询这个包裹层的尺寸。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '原生 CSS 嵌套终于来了' },
      { type: 'paragraph', text: 'Sass 和 Less 让嵌套语法流行了十多年，现在这个特性终于成为原生 CSS 的一部分。原生 CSS 嵌套让你可以在规则内部直接嵌套其他规则，减少选择器重复，让样式的层级结构更清晰。最重要的是——**无需任何构建工具**，直接在浏览器中运行。' },

      { type: 'heading', text: '基础嵌套：& 选择器' },
      { type: 'paragraph', text: '`&` 符号代表**父选择器**。在嵌套规则中，`&` 会被替换为外层规则的选择器。这是嵌套语法的核心机制。' },
      { type: 'example', title: '导航链接的嵌套样式', lang: 'css', code: `/* 传统写法：重复 .nav-link */\n.nav-link {\n  color: #333;\n  padding: 8px 16px;\n  text-decoration: none;\n}\n\n.nav-link:hover {\n  color: #0066cc;\n  background: #f0f0f0;\n}\n\n.nav-link.active {\n  color: #fff;\n  background: #0066cc;\n}\n\n/* 嵌套写法：简洁清晰 */\n.nav-link {\n  color: #333;\n  padding: 8px 16px;\n  text-decoration: none;\n  \n  &:hover {\n    color: #0066cc;\n    background: #f0f0f0;\n  }\n  \n  &.active {\n    color: #fff;\n    background: #0066cc;\n  }\n}`, explanation: '嵌套写法把所有相关的样式规则组织在一起，层级关系一目了然。`&:hover` 会被解析为 `.nav-link:hover`，`&.active` 会被解析为 `.nav-link.active`。' },

      { type: 'heading', text: '子元素嵌套' },
      { type: 'paragraph', text: '嵌套不仅可以组合选择器，还可以直接嵌套子元素、后代元素的规则。' },
      { type: 'code', lang: 'css', caption: '卡片组件的嵌套结构', code: `.card {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 20px;\n  \n  /* 直接写子元素选择器（隐含 & 前缀） */\n  .card-title {\n    font-size: 1.25rem;\n    margin-bottom: 12px;\n  }\n  \n  /* 等同于写 & .card-body */\n  .card-body {\n    color: #666;\n    line-height: 1.6;\n  }\n  \n  /* 直接子元素选择器 */\n  > .card-footer {\n    margin-top: 16px;\n    padding-top: 16px;\n    border-top: 1px solid #eee;\n  }\n}` },
      { type: 'tip', text: '以类名、ID、标签名等开头的嵌套选择器会**自动加上 `&` 前缀和一个空格**，等同于后代选择器。`.card { .title {...} }` 解析为 `.card .title`。如果想要**直接连接**（如 `.card.featured`），必须显式写 `&.featured`。' },

      { type: 'heading', text: '& 的多种用法' },
      { type: 'paragraph', text: '`&` 不仅可以放在选择器开头，还可以出现在选择器的任何位置，实现各种组合模式。' },
      { type: 'code', lang: 'css', caption: '& 的灵活应用', code: `.button {\n  padding: 8px 16px;\n  border: 1px solid currentColor;\n  \n  /* & 在开头：伪类 */\n  &:hover { opacity: 0.8; }\n  \n  /* & 在开头：修饰类 */\n  &.primary { background: blue; color: white; }\n  \n  /* & 在中间：父元素状态影响当前元素 */\n  .dark-theme & {\n    border-color: #666;\n  }\n  /* → .dark-theme .button */\n  \n  /* & 在末尾：后缀匹配 */\n  [data-theme="dark"] & {\n    color: white;\n  }\n  /* → [data-theme="dark"] .button */\n  \n  /* 复杂组合：与其他元素并列时 */\n  .sidebar & {\n    width: 100%;\n  }\n  /* → .sidebar .button */\n}` },
      { type: 'example', title: '实用案例：响应式修饰符', lang: 'css', code: `.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  \n  /* 小屏时修改容器 */\n  @media (max-width: 768px) {\n    & {\n      padding: 0 16px;\n    }\n  }\n  \n  /* 打印时修改容器 */\n  @media print {\n    & {\n      max-width: 100%;\n    }\n  }\n}`, explanation: '在嵌套的 `@media` 规则中，用 `& { ... }` 来引用父选择器本身。这比把整个规则写两遍简洁得多。' },

      { type: 'heading', text: '嵌套条件规则' },
      { type: 'paragraph', text: 'CSS 嵌套不仅支持样式规则的嵌套，还支持直接嵌套 `@media`、`@container`、`@supports` 等条件规则。这让响应式样式和特性检测的代码可以紧贴相关的选择器，不需要在文件末尾单独写一大堆媒体查询。' },
      { type: 'example', title: '响应式卡片：嵌套媒体查询', lang: 'css', code: `.card {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  \n  /* 桌面端：横向排列 */\n  @media (min-width: 768px) {\n    flex-direction: row;\n    gap: 24px;\n  }\n  \n  .card-image {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n    \n    /* 桌面端：固定宽度 */\n    @media (min-width: 768px) {\n      width: 300px;\n      aspect-ratio: auto;\n    }\n  }\n  \n  .card-content {\n    flex: 1;\n    \n    /* 支持容器查询时使用更灵活的布局 */\n    @supports (container-type: inline-size) {\n      container-type: inline-size;\n    }\n  }\n}`, explanation: '把媒体查询和特性检测直接嵌套在相关选择器内部，让响应式逻辑和基础样式紧密关联，代码更易维护。不需要在文件底部翻找"这个元素的响应式规则在哪"。' },

      { type: 'heading', text: '相对选择器的隐式 &' },
      { type: 'paragraph', text: '以**相对选择器**（`>`、`+`、`~`）开头的嵌套规则会自动加上 `&` 前缀。这是一个语法糖，让子元素、兄弟元素的选择更简洁。' },
      { type: 'code', lang: 'css', caption: '相对选择器的简写', code: `.list {\n  list-style: none;\n  \n  /* 直接子元素 */\n  > li {\n    padding: 8px 0;\n  }\n  /* 等同于 & > li，解析为 .list > li */\n  \n  /* 相邻兄弟元素 */\n  + .footer {\n    margin-top: 24px;\n  }\n  /* 等同于 & + .footer，解析为 .list + .footer */\n}` },
      { type: 'warning', text: '注意区分：`.card { > .title }` 是**直接子元素**（`.card > .title`），`.card { .title }` 是**任意后代**（`.card .title`）。虽然只差一个 `>`，但选择器的含义完全不同。' },

      { type: 'heading', text: '特异性计算：:is() 包裹' },
      { type: 'paragraph', text: '原生 CSS 嵌套在计算特异性时，会把包含多个选择器的 `&` 用 `:is()` 包裹。这意味着特异性取**参数列表中最高的那个**。这与 Sass 的行为略有不同（Sass 是简单的字符串替换）。' },
      { type: 'example', title: '特异性陷阱示例', lang: 'css', code: `/* 选择器列表（用逗号分隔） */\n.foo, #bar {\n  color: red;\n  \n  & .baz {\n    color: blue;\n  }\n}\n\n/* 解析为：*/\n:is(.foo, #bar) .baz { color: blue; }\n\n/* :is(.foo, #bar) 的特异性 = max(0,1,0, 1,0,0) = 1,0,0（ID选择器）\n   所以整个规则的特异性是 (1,0,1)，而不是 (0,1,1)\n   这意味着即使你只匹配 .foo .baz，特异性也等同于 #bar .baz */`, explanation: '如果父选择器是用逗号分隔的选择器列表，嵌套后的特异性会取列表中**最高特异性**的那个。这可能导致意外的覆盖行为。解决方案：避免在高特异性选择器（ID、多个类）中使用嵌套，或者把高特异性选择器单独写。' },
      { type: 'tip', text: '实践建议：在组件级样式中，尽量用单一的类选择器作为根，避免选择器列表。这样特异性更可预测，也更符合 BEM 等命名规范。' },

      { type: 'heading', text: '多层嵌套：适可而止' },
      { type: 'paragraph', text: 'CSS 嵌套支持无限层级，但这不意味着你应该嵌套很深。过度嵌套会导致：(1) 生成的选择器特异性过高，难以覆盖；(2) 样式与 HTML 结构强耦合，改动 HTML 就要改 CSS；(3) 代码难以阅读和维护。' },
      { type: 'warning', text: '**最佳实践**：嵌套深度不超过 **3 层**。如果发现自己在写第 4、5 层嵌套，说明组件的粒度划分有问题——应该拆分成更小的独立组件，或者用扁平化的类名（如 BEM）。' },
      { type: 'code', lang: 'css', caption: '❌ 过度嵌套（不推荐）', code: `.page {\n  .sidebar {\n    .widget {\n      .widget-header {\n        .widget-title {\n          /* 生成的选择器：\n             .page .sidebar .widget .widget-header .widget-title\n             特异性 (0,5,0)，几乎不可能被覆盖 */\n          font-size: 1.25rem;\n        }\n      }\n    }\n  }\n}` },
      { type: 'code', lang: 'css', caption: '✅ 合理的嵌套深度', code: `.widget {\n  border: 1px solid #ddd;\n  \n  .widget-header {\n    padding: 12px;\n    border-bottom: 1px solid #eee;\n  }\n  \n  .widget-title {\n    font-size: 1.25rem;\n    margin: 0;\n  }\n}\n/* 或者用扁平化的 BEM 命名，完全不嵌套 */\n.widget { /* ... */ }\n.widget__header { /* ... */ }\n.widget__title { /* ... */ }` },

      { type: 'heading', text: '原生嵌套 vs Sass/Less：差异' },
      { type: 'list', items: [
        '**特异性计算不同**：原生嵌套用 `:is()` 包裹选择器列表，特异性取最高值；Sass 是简单的字符串替换',
        '**无 @nest 规则**：早期草案有 `@nest` 语法，现已移除。原生 CSS 直接支持嵌套，无需额外关键字',
        '**无嵌套属性简写**：Sass 支持 `font: { size: 14px; weight: bold; }`，原生 CSS 不支持',
        '**性能更好**：原生嵌套由浏览器直接解析，无需构建步骤，开发体验更流畅',
        '**兼容性**：需要现代浏览器支持。如果要兼容旧浏览器，仍然需要 Sass/PostCSS 编译'
      ] },

      { type: 'heading', text: '实用模式：主题切换' },
      { type: 'example', title: '用嵌套实现主题样式', lang: 'css', code: `.button {\n  padding: 8px 16px;\n  border: 1px solid currentColor;\n  background: white;\n  color: #333;\n  \n  /* 暗色主题 */\n  [data-theme="dark"] & {\n    background: #1a1a1a;\n    color: #fff;\n    border-color: #444;\n  }\n  \n  /* 高对比度模式 */\n  @media (prefers-contrast: high) {\n    border-width: 2px;\n    font-weight: bold;\n  }\n  \n  /* 组合：暗色 + 高对比度 */\n  [data-theme="dark"] & {\n    @media (prefers-contrast: high) {\n      border-color: white;\n    }\n  }\n}`, explanation: '通过 `[data-theme="dark"] &` 把 `&` 放在选择器末尾，实现"当祖先元素有某个状态时，当前元素的样式调整"。这种模式在主题切换、国际化样式等场景中非常有用。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '级联层解决了什么问题？' },
      { type: 'paragraph', text: '在大型项目中，样式冲突是永恒的痛点。第三方 UI 库、重置样式、工具类、组件样式、用户自定义——它们的优先级该如何安排？传统 CSS 只能靠**特异性**(specificity)和**顺序**(source order)来解决，这导致两个问题：(1) 为了覆盖样式，不得不写更高特异性的选择器，陷入"特异性军备竞赛"；(2) 加载顺序敏感，样式表的引入顺序影响结果，难以维护。' },
      { type: 'paragraph', text: '**级联层**(Cascade Layers)提供了一个新的优先级维度：你可以显式声明"这一批样式应该比那一批优先级低"，而不用管它们的选择器特异性。层与层之间的优先级**完全由声明顺序决定**，与选择器无关。这让大型项目的样式架构更加清晰可控。' },

      { type: 'heading', text: '基础用法：@layer 规则' },
      { type: 'paragraph', text: '用 `@layer` 规则把一组样式包裹在一个命名的层中。层的声明顺序决定优先级——**后声明的层优先级更高**。' },
      { type: 'example', title: '定义三个层：重置、组件、工具', lang: 'css', code: `/* 声明层的顺序 */\n@layer reset, components, utilities;\n\n/* reset 层：最低优先级 */\n@layer reset {\n  * {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n}\n\n/* components 层：中等优先级 */\n@layer components {\n  .button {\n    padding: 8px 16px;\n    background: blue;\n    color: white;\n  }\n}\n\n/* utilities 层：最高优先级 */\n@layer utilities {\n  .mt-0 { margin-top: 0 !important; }\n  .p-4  { padding: 1rem; }\n}`, explanation: '优先级从低到高：`reset` < `components` < `utilities`。即使 `reset` 中的选择器是 `* { margin: 0 }`（特异性 0,0,1），`utilities` 中的 `.mt-0`（特异性 0,1,0）也会覆盖它——因为 `utilities` 层在后面声明。**层的顺序胜过选择器特异性**。' },
      { type: 'tip', text: '`@layer reset, components, utilities;` 这行**预先声明**了层的顺序，后续可以在任何地方向这些层添加规则。这行声明非常重要——它应该放在样式表最开头，明确整个项目的层级架构。' },

      { type: 'heading', text: '未分层样式的特殊优先级' },
      { type: 'paragraph', text: '没有被 `@layer` 包裹的样式称为**未分层样式**(unlayered styles)。未分层样式的优先级**高于所有层**——无论这些层在哪里声明。这是一个重要的逃生舱：你可以用未分层样式来覆盖任何层中的规则。' },
      { type: 'code', lang: 'css', caption: '未分层样式的优先级', code: `@layer base {\n  .button { background: blue; }\n}\n\n@layer utilities {\n  .button { background: green; }\n}\n\n/* 未分层：优先级最高 */\n.button {\n  background: red;\n}\n\n/* 结果：.button 的背景是 red\n   优先级：unlayered > utilities > base\n   即使 unlayered 写在前面，它仍然胜出 */` },
      { type: 'warning', text: '未分层样式的高优先级是有意设计的，目的是让开发者的**自定义样式**能够覆盖框架和库的分层样式。但这也意味着：如果你在项目中混用了分层和未分层样式，未分层的会"穿透"所有层。最佳实践：**要么全部分层，要么明确哪些是未分层的覆盖样式**。' },

      { type: 'heading', text: '向已有层追加规则' },
      { type: 'paragraph', text: '同一个层可以在多个地方定义。所有同名层的规则会合并到一起，优先级由**第一次声明该层时**的顺序决定。' },
      { type: 'code', lang: 'css', caption: '多次定义同一层', code: `@layer reset, components;\n\n@layer reset {\n  body { margin: 0; }\n}\n\n@layer components {\n  .card { padding: 20px; }\n}\n\n/* 后面再次向 reset 层添加规则 */\n@layer reset {\n  h1 { font-size: 2rem; }\n}\n\n/* reset 层现在包含 body 和 h1 的规则\n   但它的优先级仍然低于 components */` },
      { type: 'tip', text: '这个特性让你可以把同一个层的规则分散到多个文件中。比如把 `components` 层的规则分别放在 `button.css`、`card.css`、`form.css` 中，只要它们都写 `@layer components { ... }`，就会合并到同一个层。' },

      { type: 'heading', text: '嵌套层：点号命名法' },
      { type: 'paragraph', text: '层可以嵌套，用点号(`.`)表示层级关系。嵌套层可以帮助你组织复杂的样式架构，把相关的层分组。' },
      { type: 'example', title: '框架的分层架构', lang: 'css', code: `/* 预先声明层的树状结构 */\n@layer framework {\n  @layer reset, layout, components, utilities;\n}\n\n/* 或者用点号一次性声明 */\n@layer framework.reset,\n       framework.layout,\n       framework.components,\n       framework.utilities;\n\n/* 向嵌套层添加规则 */\n@layer framework.reset {\n  * { box-sizing: border-box; }\n}\n\n@layer framework.components {\n  .button { /* ... */ }\n}\n\n/* 也可以用嵌套语法 */\n@layer framework {\n  @layer components {\n    .card { /* ... */ }\n  }\n}`, explanation: '嵌套层的优先级计算：先比较顶层(`framework` vs 其他顶层)，再比较子层(`reset` vs `components`)。`framework.utilities` > `framework.components` > `framework.reset`。嵌套层可以让框架作者组织清晰的内部结构，同时让使用者能够在框架层之上或之间插入自己的层。' },

      { type: 'heading', text: '!important 在层中的反转' },
      { type: 'paragraph', text: '这是级联层最反直觉的特性：当使用 `!important` 时，层的优先级顺序**完全反转**。先声明的层反而优先级最高。' },
      { type: 'code', lang: 'css', caption: '!important 反转层的顺序', code: `@layer A, B, C;\n\n@layer A {\n  .text { color: red; }\n  .important-text { color: red !important; }\n}\n\n@layer B {\n  .text { color: green; }\n  .important-text { color: green !important; }\n}\n\n@layer C {\n  .text { color: blue; }\n  .important-text { color: blue !important; }\n}\n\n/* 普通声明：C > B > A\n   .text 最终是 blue\n\n   !important 声明：A > B > C（反转！）\n   .important-text 最终是 red */`, explanation: '为什么反转？这是有意设计的：`!important` 的初衷是让**早期的、基础的规则**能够"锁定"某些值，防止被后来的规则覆盖。反转后，基础层(如 `reset`)的 `!important` 优先级最高，可以保护重要的默认值。' },
      { type: 'warning', text: '`!important` 的反转行为很容易搞混。记住：**普通规则：后声明的层胜出；`!important` 规则：先声明的层胜出**。实践中，尽量避免在层中使用 `!important`，除非你在编写基础重置层，需要保护某些不可覆盖的值。' },

      { type: 'heading', text: '匿名层' },
      { type: 'paragraph', text: '`@layer` 可以不指定名称，创建**匿名层**。匿名层参与层级排序，但无法从外部向它追加规则。' },
      { type: 'code', lang: 'css', caption: '匿名层的使用场景', code: `@layer reset, vendor, components;\n\n/* 把第三方库的样式隔离到匿名层 */\n@layer {\n  /* 这里粘贴第三方库的 CSS */\n  .vendor-widget { /* ... */ }\n}\n\n/* 匿名层的优先级在 reset 之后、components 之前\n   但你无法从外部再向这个匿名层添加规则 */` },
      { type: 'tip', text: '匿名层的典型用途：隔离第三方代码。把不受你控制的第三方 CSS 包裹在匿名层中，它的优先级就固定了，不会干扰你的分层架构。' },

      { type: 'heading', text: '@import 与层' },
      { type: 'paragraph', text: '`@import` 规则可以直接把外部样式表导入到指定的层中，语法是 `@import url layer(layer-name)`。' },
      { type: 'code', lang: 'css', caption: '导入外部样式表到层', code: `/* 预先声明层顺序 */\n@layer reset, theme, components;\n\n/* 把 normalize.css 导入到 reset 层 */\n@import url("normalize.css") layer(reset);\n\n/* 把主题文件导入到 theme 层 */\n@import url("theme.css") layer(theme);\n\n/* 把组件库导入到 components 层 */\n@import url("ui-library.css") layer(components);\n\n/* 后续添加自己的规则 */\n@layer components {\n  /* 覆盖 ui-library 的样式 */\n  .button { /* ... */ }\n}` },
      { type: 'tip', text: '用 `@import layer()` 可以把整个第三方库放入你的层级体系，控制它的优先级。这比直接 `@import` 好得多——直接导入的样式是未分层的，优先级会高于所有层。' },

      { type: 'heading', text: 'revert-layer 关键字' },
      { type: 'paragraph', text: '`revert-layer` 是一个新的 CSS 关键字，作用是**回退到下一层的声明**。如果当前层覆盖了某个属性，`revert-layer` 可以"撤销"这次覆盖，回退到下层的值。' },
      { type: 'example', title: 'revert-layer 的使用', lang: 'css', code: `@layer base, theme, overrides;\n\n@layer base {\n  .button {\n    background: gray;\n    color: white;\n  }\n}\n\n@layer theme {\n  .button {\n    background: blue;\n    /* color 继承 base 层的 white */\n  }\n}\n\n@layer overrides {\n  .button.secondary {\n    /* 回退到 theme 层的 background 值 */\n    background: revert-layer;\n    /* 如果 theme 层没设置，继续回退到 base 层 */\n  }\n}`, explanation: '`revert-layer` 让你可以在高层"撤销"某个属性的覆盖，回退到下层的值。这在主题系统中很有用：默认主题在一个层，自定义主题在另一个层，某些组件需要"恢复"默认主题的值时用 `revert-layer`。' },

      { type: 'heading', text: '实用架构示例：完整的分层策略' },
      { type: 'example', title: '一个现代 Web 应用的层架构', lang: 'css', code: `/* 1. 预先声明所有层的顺序（最重要的一步！） */\n@layer reset,\n       vendor,\n       theme.tokens,\n       theme.base,\n       layout,\n       components,\n       utilities,\n       overrides;\n\n/* 2. 导入外部依赖 */\n@import "normalize.css" layer(reset);\n@import "third-party-ui.css" layer(vendor);\n\n/* 3. 定义设计令牌 */\n@layer theme.tokens {\n  :root {\n    --color-primary: #0066cc;\n    --spacing-unit: 8px;\n  }\n}\n\n/* 4. 基础主题 */\n@layer theme.base {\n  body {\n    font-family: system-ui;\n    line-height: 1.5;\n  }\n}\n\n/* 5. 布局系统 */\n@layer layout {\n  .container { max-width: 1200px; }\n  .grid { display: grid; }\n}\n\n/* 6. 组件样式 */\n@layer components {\n  .button { /* ... */ }\n  .card { /* ... */ }\n}\n\n/* 7. 工具类 */\n@layer utilities {\n  .sr-only { position: absolute; /* ... */ }\n}\n\n/* 8. 特殊覆盖（未分层，优先级最高） */\n.debug-mode .card {\n  outline: 2px solid red;\n}`, explanation: '这是一个生产级的分层架构。优先级从低到高：重置 → 第三方库 → 主题(令牌/基础) → 布局 → 组件 → 工具类 → 覆盖。这个结构确保：(1) 第三方库的样式不会意外覆盖你的组件；(2) 工具类可以覆盖组件的默认样式；(3) 未分层的覆盖样式可以用于调试和特殊场景。' },

      { type: 'heading', text: '与其他 CSS 特性的交互' },
      { type: 'list', items: [
        '**级联层 vs 特异性**：层的优先级**优先于**特异性。同层内才比较特异性',
        '**级联层 vs 来源**：来源(user-agent < user < author)的优先级**高于**层。层只在同一来源内排序',
        '**级联层 vs !important**：层内的 `!important` 反转层的顺序；跨来源的 `!important` 仍然遵循来源优先级',
        '**级联层 vs @scope**：层和作用域可以组合使用，层的优先级在作用域就近原则之前判定',
        '**级联层 vs 行内样式**：行内样式(`style` 属性)的优先级仍然高于所有层'
      ] },

      { type: 'heading', text: '何时使用级联层？' },
      { type: 'list', items: [
        '✅ **大型项目**：多个团队、多个样式来源，需要明确的优先级架构',
        '✅ **组件库作者**：让用户可以轻松覆盖库的默认样式，无需写高特异性选择器',
        '✅ **渐进迁移**：把遗留样式放在低优先级层，新代码放在高优先级层，逐步重构',
        '✅ **主题系统**：基础主题、品牌主题、用户自定义主题分别放在不同层',
        '❌ **小型项目**：层级架构的收益小于复杂度成本，简单项目用传统方式即可'
      ] },

      { type: 'warning', text: '级联层是强大的工具，但也引入了新的复杂度。**不要过早优化**——如果你的项目还没遇到"样式冲突难以管理"的痛点，可能还不需要级联层。先用好选择器特异性和命名规范(BEM),确实遇到瓶颈了再引入级联层。' },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '作用域：组件样式的边界' },
      { type: 'paragraph', text: 'CSS 的全局性是一把双刃剑：一方面，样式可以被继承和复用；另一方面，样式之间容易发生意外冲突。**作用域**(Scoping)提供了一种方式，让你可以限制样式的作用范围——"这些样式只在这个组件内生效，不影响外部，也不被外部轻易覆盖"。' },
      { type: 'paragraph', text: '`@scope` 规则定义了一个**作用域根**(scope root)，作用域内的选择器会自动限制在这个根元素的后代范围内。这比手动给每个选择器加前缀要优雅得多，也比 Shadow DOM 要轻量——不需要创建独立的 DOM 树。' },

      { type: 'heading', text: '基础用法：限定选择器范围' },
      { type: 'paragraph', text: '`@scope` 最基础的用法是限定选择器只匹配某个元素的后代。语法是 `@scope (scope-root) { rules }`。' },
      { type: 'example', title: '卡片组件的作用域样式', lang: 'css', code: `/* 传统写法：手动加前缀 */\n.card { /* ... */ }\n.card .title { font-size: 1.25rem; }\n.card .content { color: #666; }\n.card .footer { border-top: 1px solid #eee; }\n\n/* 作用域写法：自动限定范围 */\n@scope (.card) {\n  .title { font-size: 1.25rem; }\n  .content { color: #666; }\n  .footer { border-top: 1px solid #eee; }\n  \n  /* 这些选择器只匹配 .card 内部的元素\n     .title → .card .title\n     但特异性仍然是 (0,1,0)，不是 (0,2,0) */\n}`, explanation: '`@scope (.card)` 把所有内部的选择器限制在 `.card` 元素的后代范围内。但与传统的后代选择器不同，**作用域不增加特异性**——`.title` 的特异性仍然是 (0,1,0)，而不是 `.card .title` 的 (0,2,0)。这让样式更容易被覆盖。' },

      { type: 'heading', text: ':scope 伪类' },
      { type: 'paragraph', text: '`:scope` 伪类匹配**作用域根本身**。在 `@scope` 规则内部，`:scope` 就是你在 `@scope(...)` 中指定的那个选择器。' },
      { type: 'code', lang: 'css', caption: '用 :scope 选择作用域根', code: `@scope (.card) {\n  /* 选择 .card 本身 */\n  :scope {\n    border: 1px solid #ddd;\n    padding: 20px;\n  }\n  \n  /* 选择 .card 内的 .title */\n  .title {\n    margin-bottom: 12px;\n  }\n  \n  /* 选择 .card 的直接子元素 .header */\n  :scope > .header {\n    font-weight: bold;\n  }\n}` },
      { type: 'tip', text: '`:scope` 在 `@scope` 之外也可以用：在 DOM API 中（如 `element.querySelector(":scope > .child")`），`:scope` 匹配调用方法的元素。但在普通 CSS 中不使用 `@scope` 时，`:scope` 等同于 `:root`。' },

      { type: 'heading', text: 'Donut Scope：排除内部区域' },
      { type: 'paragraph', text: '`@scope` 最强大的特性之一是 `to` 子句，它可以**排除**某个子树，创建"甜甜圈作用域"(donut scope)——样式作用于外层区域，但不影响内部的某个区域。' },
      { type: 'example', title: '卡片内嵌套卡片：避免样式泄漏', lang: 'html', code: `<div class="card">\n  <h2 class="title">外层卡片标题</h2>\n  \n  <div class="card">\n    <h2 class="title">内层卡片标题</h2>\n  </div>\n</div>\n\n<style>\n/* 只样式化外层 .card，不影响内部嵌套的 .card */\n@scope (.card) to (.card) {\n  .title {\n    font-size: 1.5rem;\n    color: blue;\n  }\n}\n\n/* 结果：外层标题是蓝色 1.5rem，\n        内层标题不受影响（保持默认样式） */\n</style>`, explanation: '`@scope (.card) to (.card)` 的意思是："从 `.card` 开始作用，到遇见**下一个** `.card` 时停止"。内层嵌套的 `.card` 及其后代不在作用域内，不受影响。这解决了嵌套组件的样式泄漏问题——不需要写复杂的 `:not()` 选择器或改类名。' },
      { type: 'code', lang: 'css', caption: '典型的 donut scope 模式', code: `/* 文章样式，但不影响内部的代码块和引用 */\n@scope (.article) to (.code-block, blockquote) {\n  p { line-height: 1.8; }\n  a { color: blue; }\n}\n\n/* 表单样式，但不影响嵌套的子表单 */\n@scope (.form) to (.form) {\n  label { display: block; }\n  input { width: 100%; }\n}` },

      { type: 'heading', text: 'Scoping Proximity：就近优先原则' },
      { type: 'paragraph', text: '当多个 `@scope` 规则的选择器匹配同一个元素时，CSS 引入了一个新的级联规则：**距离作用域根更近的规则优先级更高**。这称为"作用域就近原则"(scoping proximity)。' },
      { type: 'example', title: '嵌套主题：内层主题覆盖外层', lang: 'html', code: `<div class="theme-light">\n  <p class="text">外层：浅色主题</p>\n  \n  <div class="theme-dark">\n    <p class="text">内层：深色主题</p>\n  </div>\n</div>\n\n<style>\n@scope (.theme-light) {\n  .text { color: #333; background: #fff; }\n}\n\n@scope (.theme-dark) {\n  .text { color: #fff; background: #1a1a1a; }\n}\n\n/* 两个作用域的选择器特异性相同(0,1,0)\n   但内层 .text 距离 .theme-dark 更近（1层），\n   比距离 .theme-light（2层）更近，\n   所以 .theme-dark 的样式胜出 */\n</style>`, explanation: '就近原则让嵌套主题、嵌套组件的样式覆盖变得自然——内层的样式自动覆盖外层，无需提高特异性。这是 `@scope` 的核心价值：**基于 DOM 距离的优先级**，而不是选择器特异性的"军备竞赛"。' },
      { type: 'warning', text: '就近原则只在**作用域之间**比较。如果一个规则在作用域内，另一个在作用域外（或在不同的级联层），仍然按传统的层叠规则（层 > 特异性 > 顺序）判定。作用域就近原则是级联的一个新步骤，在层和特异性之后、源顺序之前。' },

      { type: 'heading', text: '内联 <style> 中的隐式作用域' },
      { type: 'paragraph', text: '当 `@scope` 规则出现在**内联 `<style>` 标签**中且没有指定作用域根时，作用域根**隐式为 `<style>` 的父元素**。这让组件化的 HTML 变得非常简洁。' },
      { type: 'code', lang: 'html', caption: 'Web Components 风格的作用域组件', code: `<div class="card">\n  <style>\n    /* 无需写 @scope (.card)，隐式以父 div 为作用域根 */\n    @scope {\n      h2 { font-size: 1.25rem; }\n      p { color: #666; }\n      button { background: blue; }\n    }\n  </style>\n  \n  <h2>卡片标题</h2>\n  <p>卡片内容</p>\n  <button>操作</button>\n</div>\n\n<!-- 这个 <style> 只影响它的父 div 及其后代 -->` },
      { type: 'tip', text: '这个特性让你可以把样式和 HTML 结构紧密绑定，实现类似 Vue/Svelte 的"单文件组件"体验，但不需要任何构建工具。样式自动限定在组件范围内，不会泄漏到全局。' },

      { type: 'heading', text: '@scope 与 @layer 的组合' },
      { type: 'paragraph', text: '`@scope` 和 `@layer` 可以组合使用。层的优先级在作用域就近原则**之前**判定——先比较层，层相同再比较作用域距离，作用域距离相同再比较特异性。' },
      { type: 'code', lang: 'css', caption: '层与作用域的组合', code: `@layer base, overrides;\n\n@layer base {\n  @scope (.card) {\n    .title { color: blue; }\n  }\n}\n\n@layer overrides {\n  @scope (.container) {\n    .title { color: red; }\n  }\n}\n\n/* 如果 .title 同时在 .card 和 .container 内：\n   1. 先比较层：overrides > base\n   2. overrides 胜出，.title 是 red\n   作用域距离不影响结果 */` },

      { type: 'heading', text: '@scope vs Shadow DOM' },
      { type: 'list', items: [
        '**@scope**：轻量级，只限制 CSS 选择器的匹配范围，不改变 DOM 结构',
        '**Shadow DOM**：重量级，创建完全隔离的 DOM 树，样式和事件都隔离',
        '**@scope**：样式仍然可以从外部被继承（如 `font-family`、`color`）',
        '**Shadow DOM**：默认完全隔离，需要显式穿透（CSS 变量、`::part`）',
        '**@scope**：适用于常规组件化开发，保持 DOM 的扁平性',
        '**Shadow DOM**：适用于 Web Components、需要严格隔离的第三方小部件'
      ] },

      { type: 'heading', text: '实用案例：样式重置的作用域限定' },
      { type: 'example', title: '只在编辑器组件内重置样式', lang: 'css', code: `/* 全局样式重置可能影响整个页面\n   用 @scope 限定只在富文本编辑器内重置 */\n@scope (.rich-editor) {\n  /* 重置编辑区的默认样式 */\n  h1, h2, h3, h4, h5, h6 {\n    margin: 0;\n    font-weight: normal;\n    font-size: inherit;\n  }\n  \n  p {\n    margin: 0;\n  }\n  \n  ul, ol {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n  }\n  \n  /* 这些重置只在 .rich-editor 内生效\n     不会影响页面其他地方的标题和列表 */\n}`, explanation: '把样式重置限定在特定组件内，避免影响全局。这在集成第三方组件、富文本编辑器、代码编辑器等需要特殊样式环境的场景中非常有用。' },

      { type: 'heading', text: '浏览器支持与降级' },
      { type: 'paragraph', text: '`@scope` 是较新的特性，截至 2026 年已在主流现代浏览器中支持，但仍需注意兼容性。不支持 `@scope` 的浏览器会忽略整个 `@scope` 块。' },
      { type: 'code', lang: 'css', caption: '提供降级方案', code: `/* 降级方案：传统的后代选择器 */\n.card .title { color: blue; }\n.card .content { color: #666; }\n\n/* 现代浏览器：使用作用域 */\n@supports (selector(:scope)) {\n  @scope (.card) {\n    .title { color: blue; }\n    .content { color: #666; }\n  }\n}` },
      { type: 'tip', text: '用 `@supports (selector(:scope))` 检测浏览器是否支持 `@scope`。支持的浏览器使用作用域版本（特异性更低，更易覆盖），不支持的浏览器使用传统后代选择器版本。' },

      { type: 'heading', text: '何时使用 @scope？' },
      { type: 'list', items: [
        '✅ **组件库开发**：限定组件样式范围，防止样式泄漏到外部或受外部污染',
        '✅ **嵌套组件**：同类型组件嵌套时，内层不受外层样式影响（donut scope）',
        '✅ **主题切换**：内层主题自动覆盖外层主题，利用就近原则',
        '✅ **局部样式重置**：在特定区域应用重置样式，不影响全局',
        '✅ **降低特异性**：需要易于覆盖的样式时，用 `@scope` 避免特异性累加',
        '❌ **全局样式**：基础排版、重置样式等全局性样式不需要作用域',
        '❌ **过度隔离**：不是每个元素都需要作用域，只在确实有隔离需求时使用'
      ] },
    ] as TutorialBlock[],
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
    tutorial: [
      { type: 'heading', text: '渲染性能的根本瓶颈' },
      { type: 'paragraph', text: '现代网页越来越复杂：长文章、无限滚动列表、复杂的数据表格——这些内容可能包含成百上千个 DOM 节点。浏览器的渲染管线需要对**每一个节点**进行样式计算、布局、绘制，即使这些内容在视口之外，用户根本看不到。' },
      { type: 'paragraph', text: '**content-visibility** 和 **contain** 两个属性提供了根本性的性能优化：告诉浏览器"这部分内容现在不需要渲染"或"这部分内容是独立的，不影响页面其他部分"。浏览器可以跳过大量的计算，将首屏渲染时间从秒级降到毫秒级。' },

      { type: 'heading', text: 'content-visibility: auto — 神奇的性能提升' },
      { type: 'paragraph', text: '`content-visibility: auto` 是一个近乎"免费"的性能优化：加一行 CSS，页面渲染速度可能提升 5-10 倍。它的工作原理是：**跳过视口外元素的渲染工作**。' },
      { type: 'example', title: '长列表的性能优化', lang: 'css', code: `.article-list {\n  /* 列表容器 */\n}\n\n.article-item {\n  /* 每个文章项都可能包含几百个 DOM 节点：\n     标题、摘要、标签、作者信息、封面图等 */\n  content-visibility: auto;\n  contain-intrinsic-size: 0 500px;\n  /* 告诉浏览器：视口外的文章不需要渲染,\n     占位高度约 500px */\n}\n\n/* 结果：\n   - 首屏只渲染可见的 5-10 篇文章\n   - 其余文章跳过样式计算、布局、绘制\n   - 初始渲染时间从 2000ms 降到 200ms */`, explanation: '`content-visibility: auto` 让浏览器对视口外的元素进行"懒渲染"。当元素进入视口时，浏览器才执行渲染工作。这对长列表、分页内容、标签页内容等场景效果显著——用户不会立即看到的内容，不需要提前付出渲染成本。' },

      { type: 'heading', text: 'contain-intrinsic-size：占位尺寸' },
      { type: 'paragraph', text: '`content-visibility: auto` 有一个问题：未渲染的元素高度为 0，会导致滚动条跳动。`contain-intrinsic-size` 提供一个**估计尺寸**，浏览器用这个尺寸作为元素的占位高度，直到元素真正渲染。' },
      { type: 'code', lang: 'css', caption: 'contain-intrinsic-size 的使用', code: `.list-item {\n  content-visibility: auto;\n  \n  /* 估计高度：200px（不需要非常精确） */\n  contain-intrinsic-size: 0 200px;\n  \n  /* 或者分别设置宽高 */\n  contain-intrinsic-width: auto 300px;\n  contain-intrinsic-height: auto 200px;\n}` },
      { type: 'warning', text: '`contain-intrinsic-size` 的值不需要精确——它只是一个粗略估计，用于滚动条计算。实际渲染时，浏览器会用真实尺寸替换。如果估计值和实际值差异很大，可能导致滚动时略微跳动，但不影响正确性。宁可估计偏大（避免频繁触发渲染），也不要估计太小。' },
      { type: 'tip', text: '`contain-intrinsic-size` 的 `auto` 关键字让浏览器"记住"上次渲染的真实尺寸。语法：`contain-intrinsic-size: auto 200px` 表示"如果有缓存的真实尺寸就用它，否则用 200px"。这让滚动体验更流畅。' },

      { type: 'heading', text: 'content-visibility 的三个值' },
      { type: 'list', items: [
        '**`visible`(默认)**：正常渲染，无优化',
        '**`auto`**：视口外跳过渲染，视口内正常渲染（推荐）',
        '**`hidden`**：始终跳过渲染，但保留渲染状态（类似 `display: none`，但更快）'
      ] },
      { type: 'code', lang: 'css', caption: 'content-visibility: hidden 的使用场景', code: `/* 隐藏但保留渲染状态的标签页内容 */\n.tab-content {\n  content-visibility: hidden;\n}\n\n.tab-content.active {\n  content-visibility: visible;\n}\n\n/* 相比 display: none 的优势：\n   - 切换更快（不需要重新布局）\n   - 保留焦点状态、动画状态等\n   - 仍然可以被搜索（Cmd+F）到 */` },

      { type: 'heading', text: 'contain 属性：包含优化' },
      { type: 'paragraph', text: '`contain` 属性告诉浏览器："这个元素是独立的，它的内部布局/样式/绘制不影响外部，外部也不影响它"。浏览器可以将这个元素作为独立的渲染单元，大幅减少重排/重绘的范围。' },
      { type: 'paragraph', text: '`contain` 有四种包含类型，可以单独使用或组合：' },

      { type: 'heading', text: '1. Layout Containment（布局包含）' },
      { type: 'code', lang: 'css', caption: 'contain: layout', code: `.sidebar {\n  contain: layout;\n  /* 告诉浏览器：\n     - .sidebar 内部的布局变化不影响外部\n     - .sidebar 建立独立的格式化上下文\n     - 浮动不会逃逸，margin 不会折叠 */\n}` },
      { type: 'paragraph', text: '**效果**：元素建立独立的格式化上下文（类似 BFC）。内部布局的任何改变（添加/删除子元素、改变尺寸）都不会导致外部重新布局。' },

      { type: 'heading', text: '2. Paint Containment（绘制包含）' },
      { type: 'code', lang: 'css', caption: 'contain: paint', code: `.card {\n  contain: paint;\n  /* 告诉浏览器：\n     - .card 的内容绘制被裁剪到边框盒\n     - 子元素不能溢出到 .card 外部可见\n     - .card 建立新的层叠上下文 */\n}` },
      { type: 'paragraph', text: '**效果**：(1) 内容被裁剪到元素的边框盒（类似 `overflow: hidden`）；(2) 元素成为绝对/固定定位子元素的包含块；(3) 建立新的层叠上下文和格式化上下文。' },

      { type: 'heading', text: '3. Size Containment（尺寸包含）' },
      { type: 'code', lang: 'css', caption: 'contain: size', code: `.container {\n  contain: size;\n  /* 告诉浏览器：\n     - .container 的尺寸不依赖子元素\n     - 计算尺寸时，假设容器是空的\n     - 必须显式设置 width 和 height */\n  width: 300px;\n  height: 400px;\n}` },
      { type: 'warning', text: '**危险**：`contain: size` 会让元素的尺寸完全不受子元素影响。如果内容超出容器尺寸会溢出（且可能被裁剪）。**实践中很少单独使用 `size`**，因为它要求你总是显式设置尺寸，失去了 CSS 的灵活性。容器查询需要 `size` 或 `inline-size` 包含。' },

      { type: 'heading', text: '4. Style Containment（样式包含）' },
      { type: 'code', lang: 'css', caption: 'contain: style', code: `.article {\n  contain: style;\n  /* 告诉浏览器：\n     - .article 内的计数器不影响外部\n     - quotes 嵌套深度独立计算 */\n}` },
      { type: 'paragraph', text: '**效果**：将 CSS 计数器(counters)和 quotes 嵌套限制在元素子树内，防止泄漏到外部。这是最轻量的包含类型，性能收益最小。' },

      { type: 'heading', text: 'contain 的组合值' },
      { type: 'code', lang: 'css', caption: 'contain 的简写', code: `/* 组合多种包含 */\n.widget {\n  contain: layout paint;\n  /* 布局和绘制都包含，但尺寸仍由内容决定 */\n}\n\n/* contain: content = layout + paint + style */\n.component {\n  contain: content;\n  /* 推荐用于组件：隔离布局和绘制，尺寸仍然灵活 */\n}\n\n/* contain: strict = layout + paint + style + size */\n.fixed-box {\n  contain: strict;\n  width: 300px;\n  height: 300px;\n  /* 完全隔离，但必须显式设置尺寸 */\n}` },
      { type: 'tip', text: '**最佳实践**：大多数场景用 `contain: content`（不含 `size`）。它提供了布局和绘制隔离的性能收益，同时保持尺寸的灵活性。只有在需要容器查询或尺寸完全固定的场景才用 `contain: size` 或 `strict`。' },

      { type: 'heading', text: '性能实测：数字说话' },
      { type: 'example', title: '一个 1000 项列表的性能对比', lang: 'css', code: `/* ❌ 无优化：首屏渲染 3000ms */\n.list-item {\n  /* 每个项目包含复杂的 DOM 结构 */\n}\n\n/* ✅ 添加 content-visibility：首屏渲染 300ms（提升 10 倍） */\n.list-item {\n  content-visibility: auto;\n  contain-intrinsic-size: 0 400px;\n}\n\n/* ✅✅ 再加上 contain：首屏渲染 200ms（提升 15 倍） */\n.list-item {\n  content-visibility: auto;\n  contain-intrinsic-size: 0 400px;\n  contain: layout paint;\n}`, explanation: '真实测试表明，`content-visibility: auto` 单独就能带来 5-10 倍的性能提升。再加上 `contain` 进一步隔离渲染范围，可以达到 10-20 倍的提升。这对于内容密集型网站（博客、新闻、电商）是巨大的用户体验改善。' },

      { type: 'heading', text: '适用场景' },
      { type: 'list', items: [
        '✅ **长列表**：社交媒体信息流、商品列表、评论区',
        '✅ **分页内容**：博客文章、新闻列表、搜索结果',
        '✅ **标签页**：隐藏的标签内容用 `content-visibility: hidden`',
        '✅ **手风琴/折叠面板**：折叠状态用 `content-visibility: hidden`',
        '✅ **复杂组件**：数据表格、图表、富文本编辑器的单元格/区域',
        '❌ **首屏内容**：不要对立即可见的内容使用（会延迟渲染）',
        '❌ **关键交互元素**：导航栏、按钮、表单等需要立即响应的元素'
      ] },

      { type: 'heading', text: '注意事项与陷阱' },
      { type: 'warning', text: '**无障碍问题**：`content-visibility: auto` 的元素在视口外时，屏幕阅读器**无法访问**其内容（类似 `display: none`）。如果内容需要被辅助技术完整访问（如长文档的目录跳转），不要使用 `content-visibility`。' },
      { type: 'warning', text: '**搜索问题**：浏览器的页内搜索(Cmd+F/Ctrl+F)在某些浏览器中可能无法搜索到未渲染的内容。现代浏览器在不断改进，但这仍是一个潜在的可用性问题。' },
      { type: 'warning', text: '**滚动跳动**：如果 `contain-intrinsic-size` 估计值与实际尺寸相差太大，滚动时会跳动。解决方案：(1) 尽量精确估计；(2) 使用 `auto` 关键字让浏览器缓存真实尺寸；(3) 对尺寸相近的内容分组使用。' },

      { type: 'heading', text: '与其他性能优化的对比' },
      { type: 'list', items: [
        '**content-visibility vs 虚拟滚动(Virtual Scrolling)**：虚拟滚动需要 JS 库和复杂的状态管理，`content-visibility` 只需一行 CSS，更简单但控制粒度较粗',
        '**content-visibility vs 懒加载(Lazy Loading)**：懒加载是"内容不在 DOM 中"，`content-visibility` 是"内容在 DOM 中但跳过渲染"。后者对 SEO 和无障碍更友好',
        '**contain vs will-change**：`will-change` 是"提前告知浏览器某个属性将变化"，`contain` 是"隔离元素的渲染"。两者目标不同，可以组合使用',
        '**contain vs transform: translateZ(0)**：后者是老旧的"硬件加速 hack"，`contain` 是标准化的性能优化，效果更好且语义清晰'
      ] },

      { type: 'heading', text: '推荐的性能优化套餐' },
      { type: 'code', lang: 'css', caption: '通用的高性能列表项', code: `.list-item {\n  /* 视口外跳过渲染 */\n  content-visibility: auto;\n  \n  /* 提供占位高度 */\n  contain-intrinsic-size: auto 300px;\n  \n  /* 隔离布局和绘制 */\n  contain: layout paint style;\n  \n  /* 结果：\n     - 首屏渲染提速 10 倍+\n     - 滚动流畅（占位高度防止跳动）\n     - 内部布局变化不影响外部（contain） */\n}` },
      { type: 'tip', text: '这三个属性是"黄金组合"：`content-visibility: auto`（懒渲染）+ `contain-intrinsic-size`（占位）+ `contain: layout paint`（隔离）。几乎适用于所有列表/网格场景，性能提升显著且副作用最小。' },
    ] as TutorialBlock[],
  },
  {
    id: 'scroll-snap',
    number: '6',
    title: { zh: '滚动吸附', en: 'Scroll Snap' },
    summary: {
      zh: 'CSS Scroll Snap 模块定义滚动容器的吸附行为,使滚动操作精确停靠在指定位置,提供类似轮播图的原生体验。',
      en: 'The CSS Scroll Snap module defines snap behavior for scroll containers, making scroll operations land precisely at specified positions for native carousel-like experiences.',
    },
    keyPoints: [
      'scroll-snap-type: 在滚动容器上声明吸附方向(x/y/both/block/inline)和严格程度(mandatory/proximity)',
      'mandatory: 滚动结束后必须停在吸附点;proximity: 仅在接近吸附点时才吸附,否则正常停止',
      'scroll-snap-align: 在子元素上声明吸附对齐方式 — start、end、center、none,可分别设置 block 和 inline 方向',
      'scroll-padding: 在滚动容器上设置吸附区域的内缩,类似于 padding 但仅影响吸附点计算(不影响实际布局)',
      'scroll-margin: 在吸附目标元素上设置外扩距离,调整元素的有效吸附位置',
      'scroll-snap-stop: normal(可跳过吸附点)或 always(每个吸附点都必须停留,不可快速滑过)',
      'Scroll Snap 与触摸滑动、鼠标滚轮、键盘导航和程序化滚动(scrollTo)均兼容',
      '嵌套滚动容器各自独立管理吸附行为,子容器的吸附不影响父容器',
      '常见用例:轮播图、分页滚动、图库浏览、全屏分段页面',
      '结合 scroll-behavior: smooth 可实现带动画的平滑吸附效果',
    ],
    tutorial: [
      { type: 'heading', text: '原生的轮播图和分页滚动' },
      { type: 'paragraph', text: '在 Scroll Snap 之前，实现轮播图、图片画廊、全屏分页等"吸附式滚动"效果需要大量 JavaScript：监听滚动事件、计算位置、调用 `scrollTo()` 、处理惯性滚动……代码复杂、性能差、体验不够原生。' },
      { type: 'paragraph', text: '**CSS Scroll Snap** 把吸附滚动变成了纯 CSS 特性。你只需要声明"这是一个滚动容器，这些是吸附点"，浏览器会自动处理所有细节：触摸手势、鼠标滚轮、键盘导航、惯性滚动——全部支持，体验完全原生。' },

      { type: 'heading', text: '基础用法：scroll-snap-type' },
      { type: 'paragraph', text: '在**滚动容器**上设置 `scroll-snap-type` 来启用吸附行为。语法是 `scroll-snap-type: <axis> <strictness>`，指定吸附方向和严格程度。' },
      { type: 'example', title: '横向滚动的图片画廊', lang: 'css', code: `.gallery {\n  /* 启用横向滚动 */\n  display: flex;\n  overflow-x: auto;\n  \n  /* 启用吸附：x 轴方向，强制吸附 */\n  scroll-snap-type: x mandatory;\n  \n  /* 隐藏滚动条（可选） */\n  scrollbar-width: none;\n}\n\n.gallery::-webkit-scrollbar {\n  display: none;\n}\n\n.gallery img {\n  /* 每张图片都是吸附点：居中对齐 */\n  scroll-snap-align: center;\n  \n  /* 固定宽度，防止收缩 */\n  flex: 0 0 80vw;\n  height: 60vh;\n  object-fit: cover;\n}`, explanation: '这就是一个完整的图片画廊：横向滚动，每张图片居中吸附。用户滑动时，滚动会自动停在最近的图片中心，体验类似 iOS 照片 App。**完全不需要 JavaScript**。' },

      { type: 'heading', text: 'scroll-snap-type 的值详解' },
      { type: 'code', lang: 'css', caption: '吸附方向', code: `/* x: 横向吸附（水平滚动） */\nscroll-snap-type: x mandatory;\n\n/* y: 纵向吸附（垂直滚动） */\nscroll-snap-type: y mandatory;\n\n/* both: 横向和纵向都吸附（二维滚动，少见） */\nscroll-snap-type: both mandatory;\n\n/* inline: 内联轴吸附（横排文本中等于 x） */\nscroll-snap-type: inline mandatory;\n\n/* block: 块轴吸附（横排文本中等于 y） */\nscroll-snap-type: block mandatory;` },
      { type: 'code', lang: 'css', caption: '吸附严格程度', code: `/* mandatory: 强制吸附 — 滚动结束后必须停在吸附点 */\nscroll-snap-type: x mandatory;\n/* 适合：轮播图、全屏分页 */\n\n/* proximity: 就近吸附 — 只在接近吸附点时才吸附 */\nscroll-snap-type: x proximity;\n/* 适合：商品列表、卡片网格 */\n\n/* none: 禁用吸附（默认值） */\nscroll-snap-type: none;` },
      { type: 'tip', text: '**mandatory vs proximity**：`mandatory` 确保滚动永远停在吸附点上，适合每个项目都很重要的场景（轮播图、全屏页面）。`proximity` 更宽松，只在"差不多到了"时才吸附，适合内容连续的场景（长列表），避免强制吸附打断自然滚动。' },

      { type: 'heading', text: 'scroll-snap-align：定义吸附点' },
      { type: 'paragraph', text: '在**子元素**上设置 `scroll-snap-align` 来声明该元素是一个吸附点，以及吸附时如何对齐。' },
      { type: 'code', lang: 'css', caption: 'scroll-snap-align 的三个值', code: `/* start: 吸附时元素的起始边与容器的起始边对齐 */\n.item { scroll-snap-align: start; }\n/* 横向滚动时，元素左边贴容器左边\n   纵向滚动时，元素顶边贴容器顶边 */\n\n/* center: 吸附时元素居中 */\n.item { scroll-snap-align: center; }\n/* 元素的中心与容器的中心对齐 */\n\n/* end: 吸附时元素的结束边与容器的结束边对齐 */\n.item { scroll-snap-align: end; }\n/* 横向滚动时，元素右边贴容器右边\n   纵向滚动时，元素底边贴容器底边 */\n\n/* none: 不是吸附点（跳过该元素） */\n.item { scroll-snap-align: none; }` },
      { type: 'example', title: '对比三种对齐方式', lang: 'css', code: `/* 新闻列表：顶部对齐，像翻页一样 */\n.news-list {\n  scroll-snap-type: y mandatory;\n}\n.news-item {\n  scroll-snap-align: start;\n  height: 100vh;\n}\n\n/* 图片画廊：居中对齐，突出当前图片 */\n.gallery {\n  scroll-snap-type: x mandatory;\n}\n.gallery img {\n  scroll-snap-align: center;\n}\n\n/* 时间轴：底部对齐（少见） */\n.timeline {\n  scroll-snap-type: y mandatory;\n}\n.timeline-item {\n  scroll-snap-align: end;\n}`, explanation: '`start` 适合全屏分页（每页从顶部开始）；`center` 适合画廊（突出当前项）；`end` 较少用，适合"向上翻"的场景。' },

      { type: 'heading', text: 'scroll-padding：调整吸附区域' },
      { type: 'paragraph', text: '`scroll-padding` 设置在**容器**上，定义吸附区域的内缩。它像 `padding` 一样设置四个方向的值，但**不影响布局**，只影响吸附点的计算。' },
      { type: 'example', title: '固定头部下的滚动吸附', lang: 'css', code: `.page {\n  scroll-snap-type: y mandatory;\n  \n  /* 顶部有 80px 高的固定导航栏\n     吸附时预留 80px 空间，避免内容被遮挡 */\n  scroll-padding-top: 80px;\n}\n\n.section {\n  scroll-snap-align: start;\n  min-height: 100vh;\n}\n\n/* 结果：滚动到某个 section 时，\n   它的顶边会停在距容器顶部 80px 的位置，\n   正好在固定头部下方 */`, explanation: '`scroll-padding` 的典型用途是配合固定头部/底部。不设置 `scroll-padding` 时，吸附的内容可能被固定元素遮挡。设置后，吸附会自动"避开"这些固定元素。' },
      { type: 'tip', text: '`scroll-padding` 支持四个方向：`scroll-padding-top/right/bottom/left`，也支持简写 `scroll-padding: 1em 2em`。它只影响吸附计算，不改变容器的实际 padding，也不影响滚动条的范围。' },

      { type: 'heading', text: 'scroll-margin：调整元素的吸附位置' },
      { type: 'paragraph', text: '`scroll-margin` 设置在**子元素**上，给元素的吸附位置添加外扩空间。效果与 `scroll-padding` 相反：`scroll-padding` 是容器内缩，`scroll-margin` 是元素外扩。' },
      { type: 'code', lang: 'css', caption: 'scroll-margin 的使用', code: `.gallery {\n  scroll-snap-type: x mandatory;\n}\n\n.gallery img {\n  scroll-snap-align: center;\n  \n  /* 给吸附点添加 20px 的左右外扩\n     吸附时图片实际居中位置会外移 20px */\n  scroll-margin: 0 20px;\n}` },
      { type: 'tip', text: '`scroll-margin` 和 `scroll-padding` 可以组合使用，分别从元素和容器两侧调整吸附位置。实践中，`scroll-padding` 更常用（配合固定头部），`scroll-margin` 用于微调个别元素的吸附位置。' },

      { type: 'heading', text: 'scroll-snap-stop：强制停留' },
      { type: 'paragraph', text: '`scroll-snap-stop` 控制用户快速滑动时，是否可以"跳过"中间的吸附点。默认值 `normal` 允许跳过，`always` 强制每个吸附点都停留。' },
      { type: 'example', title: '轮播图：不能跳过幻灯片', lang: 'css', code: `.carousel {\n  scroll-snap-type: x mandatory;\n}\n\n.carousel-item {\n  scroll-snap-align: center;\n  \n  /* 强制每个幻灯片都停留，不能快速滑过 */\n  scroll-snap-stop: always;\n}`, explanation: '用户快速滑动时，浏览器默认会根据惯性让滚动"飞"过多个吸附点，最终停在一个较远的位置。`scroll-snap-stop: always` 强制滚动在**每一个**吸附点停下，不能跳过。这适合轮播图、教程步骤等需要逐个查看的场景。' },
      { type: 'warning', text: '`scroll-snap-stop: always` 会禁用惯性滚动的"飞跃"效果，让滚动变得"粘滞"。只在确实需要逐个浏览的场景使用，否则会降低滚动的流畅感。大多数场景用默认的 `normal` 即可。' },

      { type: 'heading', text: '结合 scroll-behavior: smooth' },
      { type: 'paragraph', text: '`scroll-behavior: smooth` 让滚动带动画效果。结合 Scroll Snap，可以实现"平滑滑动 + 精确吸附"的丝滑体验。' },
      { type: 'code', lang: 'css', caption: '丝滑的滚动体验', code: `.container {\n  scroll-snap-type: y mandatory;\n  scroll-behavior: smooth;  /* 所有滚动都带动画 */\n}\n\n.section {\n  scroll-snap-align: start;\n}` },
      { type: 'tip', text: '配合 JavaScript 的 `element.scrollIntoView({ behavior: "smooth" })`，可以实现"点击导航 → 平滑滚动 → 精确吸附"的完整体验。' },

      { type: 'heading', text: '实用案例合集' },
      { type: 'example', title: '1. 全屏分页网站', lang: 'css', code: `body {\n  scroll-snap-type: y mandatory;\n  overflow-y: scroll;\n  height: 100vh;\n}\n\nsection {\n  scroll-snap-align: start;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* 鼠标滚轮滚动一下 → 切换到下一页 */`, explanation: '类似 fullPage.js 的效果，但完全用 CSS 实现。每个 `<section>` 占满整个视口，滚动时强制吸附到页面顶部。' },
      { type: 'example', title: '2. 横向卡片滚动', lang: 'css', code: `.card-container {\n  display: flex;\n  gap: 16px;\n  overflow-x: auto;\n  scroll-snap-type: x proximity;  /* 就近吸附，不强制 */\n  padding: 20px;\n}\n\n.card {\n  scroll-snap-align: center;\n  flex: 0 0 300px;\n  height: 200px;\n}\n\n/* 滚动时卡片会吸附到居中位置，但不强制 */`, explanation: '`proximity` 模式让吸附更自然：如果滚动位置接近卡片中心，就吸附；否则正常停止。适合商品列表、卡片网格等内容连续的场景。' },
      { type: 'example', title: '3. 图片轮播（触摸友好）', lang: 'css', code: `.carousel {\n  display: flex;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scroll-behavior: smooth;\n  \n  /* 隐藏滚动条 */\n  -webkit-overflow-scrolling: touch;  /* iOS 惯性滚动 */\n  scrollbar-width: none;\n}\n\n.carousel::-webkit-scrollbar {\n  display: none;\n}\n\n.carousel img {\n  scroll-snap-align: start;\n  scroll-snap-stop: always;  /* 不能跳过 */\n  flex: 0 0 100%;\n  object-fit: cover;\n}`, explanation: '经典的移动端图片轮播：每张图占满容器宽度，左对齐吸附，强制逐个浏览。触摸手势、滚轮、键盘方向键都支持。' },

      { type: 'heading', text: '嵌套滚动容器' },
      { type: 'paragraph', text: 'Scroll Snap 支持嵌套：父容器和子容器可以各自独立设置吸附行为，互不影响。滚动子容器时，父容器的吸附不会触发。' },
      { type: 'code', lang: 'css', caption: '嵌套滚动的画廊', code: `/* 外层：纵向滚动的分类 */\n.gallery-sections {\n  scroll-snap-type: y mandatory;\n  overflow-y: auto;\n}\n\n.section {\n  scroll-snap-align: start;\n}\n\n/* 内层：每个分类内横向滚动的图片 */\n.section-images {\n  scroll-snap-type: x mandatory;\n  overflow-x: auto;\n}\n\n.section-images img {\n  scroll-snap-align: center;\n}\n\n/* 用户可以：\n   - 纵向滚动切换分类（外层吸附）\n   - 横向滚动浏览分类内的图片（内层吸附）\n   两者独立工作，互不干扰 */` },

      { type: 'heading', text: '兼容性与降级' },
      { type: 'paragraph', text: 'Scroll Snap 在所有现代浏览器（Chrome/Firefox/Safari/Edge）中已稳定支持。不支持的旧浏览器会忽略 `scroll-snap-*` 属性，降级为普通滚动——功能受损但不会崩溃。' },
      { type: 'tip', text: '不需要 JavaScript polyfill。Scroll Snap 是渐进增强的典范：不支持的浏览器仍然可以滚动，只是没有吸附效果。现代浏览器享受原生的丝滑体验。' },

      { type: 'heading', text: '性能优势' },
      { type: 'paragraph', text: 'CSS Scroll Snap 比 JavaScript 实现的吸附滚动性能好得多：(1) 浏览器原生实现，不需要监听滚动事件；(2) 不阻塞主线程，滚动流畅度接近原生应用；(3) 自动处理触摸惯性、滚轮加速等细节，体验更自然；(4) 代码简洁，易于维护。' },

      { type: 'heading', text: '常见陷阱' },
      { type: 'warning', text: '**陷阱 1：忘记设置容器的 `overflow`**。`scroll-snap-type` 必须在**滚动容器**上设置，即 `overflow: auto` 或 `overflow: scroll` 的元素。如果容器不可滚动，吸附不会生效。' },
      { type: 'warning', text: '**陷阱 2：子元素宽度/高度不足**。如果子元素的总尺寸小于容器，根本不会产生滚动，吸附也无从谈起。确保内容超出容器才会滚动。' },
      { type: 'warning', text: '**陷阱 3：`mandatory` 模式下没有明确的吸附点**。如果容器内没有任何子元素设置 `scroll-snap-align`，强制吸附会导致滚动"卡住"或行为异常。至少要有一个吸附点。' },
    ] as TutorialBlock[],
  },
  {
    id: 'css-ui',
    number: '7',
    title: { zh: 'CSS 用户界面', en: 'CSS User Interface' },
    summary: {
      zh: 'CSS 用户界面模块定义了与用户交互相关的属性:光标样式、文本插入符、元素轮廓、调整大小和用户选择控制。',
      en: 'The CSS User Interface module defines properties related to user interaction: cursor styles, text carets, element outlines, resizing, and user selection control.',
    },
    keyPoints: [
      'cursor: 设置鼠标指针样式 — auto、default、pointer、text、move、not-allowed、grab/grabbing、zoom-in/zoom-out 等,支持 url() 自定义光标图片',
      'caret-color: 设置文本输入插入符(光标)的颜色,auto(自动适配)或任意 <color> 值',
      'caret-shape: 设置插入符形状 — auto、bar(竖线)、block(方块)、underscore(下划线)',
      'outline: 轮廓线绘制在 border 外部,不占布局空间,不影响盒子尺寸;outline-width/style/color 和 outline 简写',
      'outline-offset: 设置轮廓线与 border edge 的距离,可以为负值(向内收缩)',
      'resize: 控制元素是否可由用户手动调整大小 — none、both、horizontal、vertical、block、inline;通常需要 overflow 不为 visible',
      'user-select: 控制用户是否可以选择元素文本 — auto、text、none、all、contain',
      'appearance: 控制元素是否使用平台原生外观 — none(移除原生样式)、auto(浏览器默认)',
      'pointer-events: 控制元素是否响应鼠标/触摸事件 — auto、none(事件穿透到下方元素)',
      'touch-action: 控制触摸设备上的手势行为 — auto、none、pan-x、pan-y、pinch-zoom、manipulation',
      'accent-color: 设置表单控件(checkbox、radio、range、progress)的强调色',
    ],
    tutorial: [
      { type: 'heading', text: 'UI 交互属性的重要性' },
      { type: 'paragraph', text: 'CSS 不仅控制元素的视觉外观，还控制用户如何与页面交互：鼠标指针的形状、能否选择文本、能否调整元素大小、表单控件的焦点样式……这些属性统称为 **CSS UI 模块**。掌握它们，才能打造真正精致的用户体验。' },

      { type: 'heading', text: 'cursor：鼠标指针样式' },
      { type: 'paragraph', text: '`cursor` 属性改变鼠标指针在元素上的形状，是最直观的交互反馈。正确使用 `cursor` 可以让用户立即理解元素的功能。' },
      { type: 'code', lang: 'css', caption: '常用的 cursor 值', code: `/* 默认箭头 */\n.normal { cursor: default; }\n\n/* 手型指针（可点击） */\n.button { cursor: pointer; }\n\n/* 文本选择光标 */\n.text { cursor: text; }\n\n/* 移动（拖拽） */\n.draggable { cursor: move; }\n\n/* 抓手（可拖拽的内容） */\n.pan-area { cursor: grab; }\n.pan-area:active { cursor: grabbing; }\n\n/* 禁止（不可操作） */\n.disabled { cursor: not-allowed; }\n\n/* 等待（加载中） */\n.loading { cursor: wait; }\n\n/* 放大/缩小 */\n.zoomable { cursor: zoom-in; }\n\n/* 尺寸调整（各个方向） */\n.resize-handle { cursor: nwse-resize; }  /* 西北-东南 */` },
      { type: 'example', title: '自定义光标图片', lang: 'css', code: `/* 使用自定义图片作为光标 */\n.custom-cursor {\n  cursor: url('cursor.png') 4 12, pointer;\n  /* url('cursor.png'): 光标图片路径\n     4 12: 热点坐标（图片中哪个点是真正的点击位置）\n     pointer: 降级方案（图片加载失败时使用） */\n}\n\n/* 实用案例：画图应用的画笔光标 */\n.canvas {\n  cursor: url('pencil.cur'), crosshair;\n}`, explanation: '自定义光标常用于游戏、绘图应用、地图交互等需要特殊视觉反馈的场景。光标图片建议：(1) 尺寸不超过 32×32 像素；(2) 格式用 PNG 或 CUR；(3) 始终提供降级方案。' },
      { type: 'tip', text: '`cursor: pointer` 不是万能的！只给**真正可点击**的元素（链接、按钮、可交互区域）设置手型指针。不要给普通的 `<div>` 或装饰性元素设置，会误导用户。' },

      { type: 'heading', text: 'outline：焦点轮廓' },
      { type: 'paragraph', text: '`outline` 绘制在元素 `border` 外部的轮廓线，**不占据布局空间**。它最重要的用途是表示键盘焦点——当用户用 Tab 键导航时，焦点元素会显示轮廓。' },
      { type: 'code', lang: 'css', caption: 'outline 的基础用法', code: `/* outline 简写：宽度 样式 颜色 */\n.focused {\n  outline: 2px solid blue;\n}\n\n/* 单独设置 */\n.custom-outline {\n  outline-width: 3px;\n  outline-style: dashed;\n  outline-color: orange;\n  \n  /* outline-offset: 轮廓线与边框的距离 */\n  outline-offset: 4px;  /* 向外扩展 4px */\n}\n\n/* 移除轮廓（谨慎！） */\n.no-outline {\n  outline: none;\n}` },
      { type: 'warning', text: '**无障碍警告**：永远不要全局移除 `outline`！`outline: none` 会让键盘用户完全看不到焦点位置，导致无法使用 Tab 键导航。如果你觉得默认的 `outline` 不好看，用 `:focus-visible` 自定义样式，而不是完全移除。' },
      { type: 'example', title: '更好的焦点样式', lang: 'css', code: `/* ❌ 糟糕的做法：全局移除 outline */\n* { outline: none; }\n\n/* ✅ 正确的做法：只在鼠标点击时移除，键盘导航时保留 */\n:focus {\n  outline: 2px solid #0066cc;\n  outline-offset: 2px;\n}\n\n/* :focus-visible 只在键盘导航时触发 */\n:focus:not(:focus-visible) {\n  outline: none;\n}\n\n:focus-visible {\n  outline: 3px solid #0066cc;\n  outline-offset: 2px;\n}`, explanation: '`:focus-visible` 是现代的焦点样式方案：鼠标点击时不显示轮廓，键盘导航时显示。这兼顾了视觉美观（不干扰鼠标用户）和无障碍（保留键盘用户的焦点指示）。' },
      { type: 'tip', text: '`outline-offset` 可以是**负值**，让轮廓向内收缩。`outline-offset: -2px` 可以实现"内边框"效果，不占据额外空间。' },

      { type: 'heading', text: 'user-select：文本选择控制' },
      { type: 'paragraph', text: '`user-select` 控制用户能否选中元素的文本内容。默认情况下，所有文本都可以被选中，但在某些场景下，你可能想禁止或改变选择行为。' },
      { type: 'code', lang: 'css', caption: 'user-select 的值', code: `/* auto: 默认值，文本可以被选中 */\n.normal { user-select: auto; }\n\n/* text: 强制文本可选（即使在特殊元素中） */\n.selectable { user-select: text; }\n\n/* none: 禁止选择文本 */\n.no-select { user-select: none; }\n\n/* all: 点击即选中整个元素的文本 */\n.select-all { user-select: all; }\n\n/* contain: 选择范围不能超出元素边界 */\n.contained { user-select: contain; }` },
      { type: 'example', title: 'user-select 的实用场景', lang: 'css', code: `/* 按钮文字不应该被选中 */\nbutton {\n  user-select: none;\n}\n\n/* 代码块：点击即全选 */\npre code {\n  user-select: all;\n}\n\n/* 拖拽手柄：禁止选择（避免拖拽时误选文本） */\n.drag-handle {\n  user-select: none;\n  cursor: move;\n}\n\n/* 表单标签：可选择（方便复制） */\nlabel {\n  user-select: text;\n}`, explanation: '`user-select: none` 适用于 UI 控件（按钮、工具栏图标、拖拽手柄）。`user-select: all` 适用于代码片段、API 密钥、单行命令等希望一键复制的内容。' },
      { type: 'warning', text: '不要滥用 `user-select: none`！禁止选择文本会降低可用性——用户无法复制有用的信息。只在**确实不应该被选中**的 UI 元素上使用（按钮、图标、拖拽区域）。' },

      { type: 'heading', text: 'pointer-events：事件穿透' },
      { type: 'paragraph', text: '`pointer-events` 控制元素是否响应鼠标/触摸事件。设为 `none` 时，元素对指针事件"透明"，点击会穿透到下方元素。' },
      { type: 'example', title: '遮罩层中的可交互区域', lang: 'css', code: `/* 半透明遮罩层 */\n.overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  \n  /* 遮罩层不响应事件，点击穿透 */\n  pointer-events: none;\n}\n\n/* 遮罩层中的对话框：恢复事件响应 */\n.dialog {\n  pointer-events: auto;\n}`, explanation: '这个模式很有用：遮罩层覆盖整个页面，但设为 `pointer-events: none` 让点击穿透，只有对话框本身响应点击。这比 JavaScript 处理事件传播简单得多。' },
      { type: 'tip', text: '`pointer-events: none` 的元素也无法获得键盘焦点，`:hover` 和 `:active` 状态也不会触发。它是完全的"事件隔离"。' },

      { type: 'heading', text: 'caret-color 与 caret-shape：输入光标' },
      { type: 'paragraph', text: '`caret-color` 设置文本输入框中闪烁光标（插入符）的颜色。`caret-shape` 设置光标的形状。这两个属性可以统一品牌的输入体验。' },
      { type: 'code', lang: 'css', caption: '自定义输入光标', code: `/* 改变光标颜色以匹配品牌色 */\ninput, textarea {\n  caret-color: #0066cc;\n}\n\n/* 暗色主题：浅色光标 */\n[data-theme="dark"] input {\n  caret-color: white;\n}\n\n/* 改变光标形状（较新特性，支持度较低） */\ninput {\n  caret-shape: block;  /* 方块（类似 Vim）*/\n}`, explanation: '`caret-color` 是微妙但有效的品牌化细节。大多数浏览器默认的黑色光标在浅色输入框中很明显，但在某些颜色主题下会不协调。自定义光标颜色可以让输入体验更统一。' },

      { type: 'heading', text: 'resize：用户调整大小' },
      { type: 'paragraph', text: '`resize` 允许用户手动拖拽调整元素大小，就像 `<textarea>` 默认可以调整一样。' },
      { type: 'code', lang: 'css', caption: 'resize 的使用', code: `/* 默认：textarea 可以双向调整 */\ntextarea {\n  resize: both;\n}\n\n/* 只允许垂直调整 */\ntextarea {\n  resize: vertical;\n}\n\n/* 禁止调整 */\ntextarea {\n  resize: none;\n}\n\n/* 把可调整能力赋予其他元素 */\n.resizable-panel {\n  resize: horizontal;\n  overflow: auto;  /* 必需！resize 需要 overflow 不为 visible */\n  border: 1px solid #ddd;\n  min-width: 200px;\n  max-width: 600px;\n}`, explanation: '`resize` 需要配合 `overflow: auto` 或 `overflow: hidden` 使用（`overflow: visible` 时不生效）。可以用 `min-width/max-width` 限制调整范围。' },
      { type: 'tip', text: '实用场景：可调整大小的侧边栏、分栏布局、代码编辑器的面板。`resize` 提供了纯 CSS 的大小调整能力，无需 JavaScript 监听拖拽。' },

      { type: 'heading', text: 'appearance：移除原生样式' },
      { type: 'paragraph', text: '`appearance` 控制元素是否使用平台原生的外观。`appearance: none` 可以移除浏览器默认的样式，让你完全自定义表单控件的外观。' },
      { type: 'example', title: '自定义 checkbox 和 radio', lang: 'css', code: `/* 移除原生样式 */\ninput[type="checkbox"],\ninput[type="radio"] {\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  \n  /* 现在可以完全自定义样式 */\n  width: 20px;\n  height: 20px;\n  border: 2px solid #ccc;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\ninput[type="checkbox"]:checked {\n  background: #0066cc;\n  border-color: #0066cc;\n  background-image: url('data:image/svg+xml,...');  /* 勾选图标 */\n}\n\ninput[type="radio"] {\n  border-radius: 50%;\n}\n\ninput[type="radio"]:checked {\n  background: #0066cc;\n  box-shadow: inset 0 0 0 3px white;\n}`, explanation: '`appearance: none` 是自定义表单控件的第一步。移除原生样式后，你可以用 `background`、`border`、`::before`/`::after` 完全重绘控件。注意加浏览器前缀以确保兼容性。' },
      { type: 'warning', text: '移除 `appearance` 后，你需要自己实现所有的视觉状态：`:hover`、`:focus`、`:checked`、`:disabled`。别忘了无障碍：保留焦点样式，确保键盘可操作。' },

      { type: 'heading', text: 'accent-color：一行 CSS 的表单美化' },
      { type: 'paragraph', text: '`accent-color` 是最新的表单美化属性：一行 CSS 就能改变 checkbox、radio、range、progress 等控件的主题色，**无需移除原生样式**。' },
      { type: 'example', title: 'accent-color 的魔力', lang: 'css', code: `/* 全局设置表单控件的强调色 */\n:root {\n  accent-color: #0066cc;\n}\n\n/* 所有 checkbox、radio、range、progress 自动应用品牌色！ */\ninput[type="checkbox"],\ninput[type="radio"],\ninput[type="range"],\nprogress {\n  /* 不需要任何额外样式 */\n}\n\n/* 暗色主题 */\n[data-theme="dark"] {\n  accent-color: #66b3ff;\n}`, explanation: '`accent-color` 是"懒人福音"：不需要复杂的自定义样式，浏览器会自动调整控件的主色调和对比度，保持原生的交互体验和无障碍特性。唯一的缺点是控制粒度较粗——如果你需要完全自定义外观，还是要用 `appearance: none`。' },
      { type: 'tip', text: '`accent-color` 会自动处理对比度：如果你的强调色太浅，浏览器会调整文本/图标颜色以确保可读性。这比手动计算对比度简单得多。' },

      { type: 'heading', text: 'touch-action：触摸手势控制' },
      { type: 'paragraph', text: '`touch-action` 控制触摸设备上的手势行为。默认情况下，浏览器会处理双指缩放、拖拽滚动等手势，但在某些场景下（如地图、画布、游戏），你可能想禁用浏览器的默认手势，实现自定义交互。' },
      { type: 'code', lang: 'css', caption: 'touch-action 的值', code: `/* 禁用所有触摸手势（自定义处理） */\n.canvas {\n  touch-action: none;\n}\n\n/* 只允许横向平移 */\n.carousel {\n  touch-action: pan-x;\n}\n\n/* 只允许纵向平移 */\n.scroll-area {\n  touch-action: pan-y;\n}\n\n/* 允许平移和缩放 */\n.zoomable-image {\n  touch-action: pan-x pan-y pinch-zoom;\n}\n\n/* manipulation: 禁用双击放大（减少点击延迟） */\nbutton {\n  touch-action: manipulation;\n}` },
      { type: 'tip', text: '`touch-action: manipulation` 可以移除移动浏览器的 300ms 点击延迟（为了检测双击放大）。在按钮、链接等明确的点击目标上设置，可以让点击响应更快。现代浏览器已经优化了大部分场景，但在某些老设备上仍有效。' },

      { type: 'heading', text: '实用组合：可拖拽的面板' },
      { type: 'example', title: '完整的拖拽面板样式', lang: 'css', code: `.draggable-panel {\n  position: absolute;\n  border: 1px solid #ccc;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n  \n  /* 拖拽手柄 */\n  cursor: move;\n  touch-action: none;  /* 触摸设备上禁用浏览器手势 */\n  user-select: none;   /* 拖拽时禁止选择文本 */\n}\n\n.draggable-panel:focus {\n  outline: 2px solid #0066cc;\n  outline-offset: 2px;\n}\n\n.draggable-panel__resize-handle {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  width: 20px;\n  height: 20px;\n  cursor: nwse-resize;\n  background: linear-gradient(135deg, transparent 50%, #ccc 50%);\n}`, explanation: '这个面板结合了多个 UI 属性：`cursor: move` 表示可拖拽，`touch-action: none` 禁用触摸手势以支持自定义拖拽，`user-select: none` 防止拖拽时选中文本，`outline` 保留键盘焦点指示。' },

      { type: 'heading', text: '无障碍最佳实践' },
      { type: 'list', items: [
        '**永远保留 `outline` 或提供等效的焦点指示**：用 `:focus-visible` 优化，但不要完全移除',
        '**不要禁用文本选择**：除非是纯 UI 控件（按钮、图标），否则保持文本可选',
        '**自定义表单控件要实现完整状态**：`:focus`、`:hover`、`:disabled`、`:checked`',
        '**`pointer-events: none` 的元素无法被键盘访问**：确保关键功能不依赖鼠标',
        '**`cursor` 要准确反映功能**：可点击的用 `pointer`，可拖拽的用 `move`，禁用的用 `not-allowed`'
      ] },
    ] as TutorialBlock[],
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
const SCROLL_SNAP = 'https://www.w3.org/TR/css-scroll-snap-1/';
const CSS_UI = 'https://www.w3.org/TR/css-ui-4/';
const CSS22_UI = 'https://www.w3.org/TR/CSS22/ui.html';

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

  // ── Scroll Snap ──
  'scroll-snap-type': {
    zh: '滚动吸附类型',
    value: 'none | [ x | y | block | inline | both ] [ mandatory | proximity ]?',
    initial: 'none',
    appliesTo: '滚动容器',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: SCROLL_SNAP,
    sectionRef: 'modern#scroll-snap',
  },
  'scroll-snap-align': {
    zh: '滚动吸附对齐',
    value: '[ none | start | end | center ]{1,2}',
    initial: 'none',
    appliesTo: '滚动容器的子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: SCROLL_SNAP,
    sectionRef: 'modern#scroll-snap',
  },
  'scroll-snap-stop': {
    zh: '滚动吸附停止',
    value: 'normal | always',
    initial: 'normal',
    appliesTo: '滚动容器的子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: SCROLL_SNAP,
    sectionRef: 'modern#scroll-snap',
  },
  'scroll-padding': {
    zh: '滚动内边距',
    value: '[ auto | <length-percentage> ]{1,4}',
    initial: 'auto',
    appliesTo: '滚动容器',
    inherited: false,
    percentages: '相对于滚动容器的对应维度',
    computedValue: '指定值，百分比计算为绝对长度',
    css2Url: '',
    css3Url: SCROLL_SNAP,
    sectionRef: 'modern#scroll-snap',
  },
  'scroll-margin': {
    zh: '滚动外边距',
    value: '<length>{1,4}',
    initial: '0',
    appliesTo: '滚动容器的子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: SCROLL_SNAP,
    sectionRef: 'modern#scroll-snap',
  },

  // ── CSS UI ──
  'cursor': {
    zh: '光标',
    value: '[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out ] ]',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: CSS22_UI,
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'caret-color': {
    zh: '插入符颜色',
    value: 'auto | <color>',
    initial: 'auto',
    appliesTo: '可编辑元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'caret-shape': {
    zh: '插入符形状',
    value: 'auto | bar | block | underscore',
    initial: 'auto',
    appliesTo: '可编辑元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'outline': {
    zh: '轮廓',
    value: "[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]",
    initial: '见各子属性',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: CSS22_UI,
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'outline-offset': {
    zh: '轮廓偏移',
    value: '<length>',
    initial: '0',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值，计算为绝对长度',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'resize': {
    zh: '调整大小',
    value: 'none | both | horizontal | vertical | block | inline',
    initial: 'none',
    appliesTo: '生成块容器或内联块容器的元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'user-select': {
    zh: '用户选择',
    value: 'auto | text | none | contain | all',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'appearance': {
    zh: '外观',
    value: 'none | auto',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
  },
  'pointer-events': {
    zh: '指针事件',
    value: 'auto | none',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/SVG11/interact.html#PointerEventsProperty',
    sectionRef: 'modern#css-ui',
  },
  'touch-action': {
    zh: '触摸动作',
    value: 'auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/pointerevents3/#the-touch-action-css-property',
    sectionRef: 'modern#css-ui',
  },
  'accent-color': {
    zh: '强调色',
    value: 'auto | <color>',
    initial: 'auto',
    appliesTo: '表单控件元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS_UI,
    sectionRef: 'modern#css-ui',
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
    sectionRef: 'grid#grid-container',
    specUrl: 'https://www.w3.org/TR/css-grid-2/',
  },
  'row': {
    zh: '行',
    description:
      '网格布局中的水平轨道。grid-template-rows 定义显式行,内容溢出时会产生隐式行。',
    sectionRef: 'grid#grid-template',
  },
  'column': {
    zh: '列',
    description:
      '网格布局中的垂直轨道。grid-template-columns 定义显式列。也指 column-count/column-width 的多列布局。',
    sectionRef: 'grid#grid-template',
  },
  'columns': {
    zh: '多列',
    description:
      'CSS 多列布局(Multi-column Layout),通过 column-count 或 column-width 将内容分成多列显示。',
    sectionRef: 'multicol#multicol-basics',
  },
  'flex-start': {
    zh: '弹性起点',
    description:
      'Flex 对齐值。项目在主轴/交叉轴的起始端对齐。对于 LTR 布局的主轴,起点在左侧。',
    sectionRef: 'flexbox#flex-alignment',
    specUrl: 'https://www.w3.org/TR/css-flexbox-1/',
  },
  'flex-end': {
    zh: '弹性终点',
    description:
      'Flex 对齐值。项目在主轴/交叉轴的末尾端对齐。对于 LTR 布局的主轴,终点在右侧。',
    sectionRef: 'flexbox#flex-alignment',
    specUrl: 'https://www.w3.org/TR/css-flexbox-1/',
  },
  'start': {
    zh: '起点',
    description:
      '逻辑对齐值。根据书写方向和布局方向确定的起始位置,是 flex-start 的通用替代。',
    sectionRef: 'flexbox#flex-alignment',
  },
  'end': {
    zh: '终点',
    description:
      '逻辑对齐值。根据书写方向和布局方向确定的结束位置,是 flex-end 的通用替代。',
    sectionRef: 'flexbox#flex-alignment',
  },
  'center': {
    zh: '居中',
    description:
      '对齐属性的值之一。将项目在对应轴方向居中放置。常用于 justify-content、align-items 等属性。',
    sectionRef: 'flexbox#flex-alignment',
  },

  // ── Scroll Snap ──
  'scroll snap': {
    zh: '滚动吸附',
    description:
      '使滚动操作精确停靠在指定位置的机制。通过 scroll-snap-type 在滚动容器上启用,通过 scroll-snap-align 在子元素上设置吸附点。',
    sectionRef: 'modern#scroll-snap',
    specUrl: SCROLL_SNAP,
  },
  'snap point': {
    zh: '吸附点',
    description:
      '滚动容器中定义的停靠位置。由子元素的 scroll-snap-align 属性定义。滚动操作结束时,容器会吸附到最近的吸附点。',
    sectionRef: 'modern#scroll-snap',
    specUrl: SCROLL_SNAP,
  },
  'scroll container': {
    zh: '滚动容器',
    description:
      '具有滚动能力的元素(overflow 不为 visible)。可以通过 scroll-snap-type 启用滚动吸附行为。',
    sectionRef: 'modern#scroll-snap',
    specUrl: SCROLL_SNAP,
  },
  'mandatory snap': {
    zh: '强制吸附',
    description:
      'scroll-snap-type 的 mandatory 值。滚动结束后必须停在吸附点上,即使用户没有滚动到吸附点附近。',
    sectionRef: 'modern#scroll-snap',
    specUrl: SCROLL_SNAP,
  },
  'proximity snap': {
    zh: '近距吸附',
    description:
      'scroll-snap-type 的 proximity 值。仅在滚动位置接近吸附点时才吸附,否则正常停止在用户松手的位置。',
    sectionRef: 'modern#scroll-snap',
    specUrl: SCROLL_SNAP,
  },

  // ── CSS UI ──
  'outline': {
    zh: '轮廓线',
    description:
      '绘制在元素 border 外部的线条,不占用布局空间,不影响元素尺寸。常用于表示焦点状态。可通过 outline-offset 调整与边框的距离。',
    sectionRef: 'modern#css-ui',
    specUrl: CSS_UI,
  },
  'user-select': {
    zh: '用户选择',
    description:
      '控制用户是否可以选择元素的文本内容。none 禁止选择,text 允许选择,all 点击即选中整个元素,contain 限制选择不超出元素边界。',
    sectionRef: 'modern#css-ui',
    specUrl: CSS_UI,
  },
  'pointer-events': {
    zh: '指针事件',
    description:
      '控制元素是否响应鼠标和触摸事件。none 值使元素对指针事件"透明",事件会穿透到下方元素。',
    sectionRef: 'modern#css-ui',
    specUrl: CSS_UI,
  },
  'touch-action': {
    zh: '触摸动作',
    description:
      '控制触摸设备上的手势行为。可以禁用或限制特定方向的平移、缩放等手势,用于自定义触摸交互。',
    sectionRef: 'modern#css-ui',
    specUrl: 'https://www.w3.org/TR/pointerevents3/',
  },
};
