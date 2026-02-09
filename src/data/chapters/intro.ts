import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';

export const sections: Section[] = [
  {
    id: 'css-overview',
    number: '1',
    title: { zh: 'CSS 是什么', en: 'What is CSS?' },
    specId: 'html-tutorial',
    summary:
      'CSS（Cascading Style Sheets，层叠样式表）是一种样式语言，用于描述结构化文档（如 HTML、XML）的视觉呈现。它的核心设计理念是将文档的内容结构与视觉表现分离——HTML 负责「说什么」，CSS 负责「怎么看起来」。CSS 通过选择器定位元素，通过属性-值对（如 color: red）声明样式规则，并通过层叠机制解决多个来源的样式冲突。样式表有三个来源：作者样式表（网站开发者编写）、用户样式表（浏览网页的用户提供）、用户代理样式表（浏览器内置的默认样式）。CSS 可以内嵌在 HTML 的 <style> 标签中，也可以通过 <link> 引用外部样式表文件。',
    keyPoints: [
      'CSS 将文档结构与视觉呈现分离，让同一份 HTML 可以用不同样式表呈现不同外观',
      '样式规则由「选择器 + 声明块」组成，例如 h1 { color: red; font-size: 2em; }',
      '三种样式表来源：作者（网站开发者）、用户（浏览网页的人）、用户代理（浏览器默认样式）',
      'CSS 可以应用于任何结构化文档格式，不仅限于 HTML——XML 文档同样可以用 CSS 渲染',
      '外部样式表通过 <link rel="stylesheet" href="style.css"> 引入，实现样式复用和集中维护',
      'CSS 属性有继承性——某些属性（如 color、font-family）会自动从父元素传递给子元素',
    ],
  },
  {
    id: 'design-principles',
    number: '2',
    title: { zh: '设计原则', en: 'Design Principles' },
    specId: 'design-principles',
    summary:
      'CSS 的设计遵循一套核心原则，这些原则确保了 CSS 能够持续演进而不破坏现有内容。最重要的是「前向兼容」——浏览器遇到不认识的 CSS 语法时会跳过而非报错，这让新特性可以安全添加而不影响旧浏览器。「层叠机制」让来自多个来源的样式规则可以共存并有序解决冲突。「继承机制」减少重复声明，让样式自然传播。「用户控制」原则确保用户可以覆盖作者样式以满足无障碍需求（如强制高对比度）。CSS 还强调平台独立性、网络性能、简洁性和灵活性——既要足够简单让人类阅读和编写，又要足够强大支持丰富的视觉表现。',
    keyPoints: [
      '前向兼容：CSS2 浏览器能理解 CSS1，CSS1 浏览器会忽略 CSS2 的新特性而不会崩溃',
      '后向兼容：旧浏览器忽略不认识的属性/值，新浏览器仍支持旧语法（除非明确废弃）',
      '层叠机制：多个来源（作者/用户/UA）的样式规则按优先级、特异性、顺序解决冲突',
      '继承机制：某些属性（color、font-family 等）自动从父元素传给子元素，减少重复',
      '用户控制：用户可以提供个人样式表，并用 !important 覆盖作者样式（无障碍需求）',
      '平台独立性：同一份样式表可应用于不同设备（屏幕、打印、语音），通过 @media 适配',
      '简洁性：CSS 语法人类可读可写，属性尽量独立，通常只有一种方式实现某个效果',
      '网络性能：相比图片/音频，样式表体积小、可复用、减少网络连接',
    ],
  },
  {
    id: 'processing-model',
    number: '3',
    title: { zh: '处理模型', en: 'Processing Model' },
    specId: 'processing-model',
    summary:
      'CSS 的处理模型描述了浏览器如何从源文档到最终渲染的完整流程。第一步，解析源文档（HTML/XML）生成文档树（document tree），树中的每个节点是一个元素。第二步，根据目标媒体类型（屏幕/打印/语音等）获取所有适用的样式表。第三步，为文档树中的每个元素的每个属性计算值（通过层叠、继承、初始值确定）。第四步，应用格式化算法生成格式化结构（formatting structure）——它类似文档树但可能不同（如 display: none 的元素不生成盒子，列表元素会生成额外的项目符号）。第五步，将格式化结构渲染到 Canvas（渲染表面）。Canvas 是抽象的无限平面，实际渲染发生在有限区域内（屏幕视口、打印页面等）。',
    keyPoints: [
      '处理流程：解析文档 → 获取样式表 → 计算属性值 → 生成格式化结构 → 渲染到 Canvas',
      '文档树（document tree）：源文档解析后的元素层次结构，每个元素是一个节点',
      '格式化结构（formatting structure）：用于渲染的结构，可能与文档树不同（display: none 不生成盒子，::before 生成额外内容）',
      'Canvas（画布）：渲染目标表面，每个维度无限大，但实际渲染在有限区域（视口/页面）',
      '媒体类型决定格式化算法：屏幕用视觉格式化模型（盒子、布局），语音用听觉模型',
      '属性值计算依赖层叠、继承、初始值三个机制，最终每个元素/属性都有确定的值',
      'CSS 不修改文档树——生成内容（::before）不会反馈到文档解析器重新解析',
    ],
  },
  {
    id: 'css-history',
    number: '4',
    title: { zh: 'CSS 的演进', en: 'CSS Evolution' },
    specId: 'css2.2-v-css2',
    summary:
      'CSS 的演进经历了从单体规范到模块化的转变。CSS1（1996）定义了基础样式属性，CSS2（1998）大幅扩展了功能（定位、媒体类型、表格），但实现复杂导致浏览器差异大。CSS2.1（2011）是 CSS2 的勘误版，移除了未实现的特性，修正了与实际浏览器行为不一致的定义。CSS2.2 在 CSS2.1 基础上进一步修正错误。CSS3 不再是单一规范——它被拆分为独立的模块（Selectors、Values、Cascade、Flexbox、Grid 等），每个模块独立演进、独立发版。这种模块化设计让新特性可以更快标准化，不必等待整个规范完成。CSS Snapshot（如 CSS 2023、CSS 2024）是对某个时间点所有稳定 CSS 特性的快照汇总。规范成熟度分级：WD（工作草案）→ CR（候选推荐）→ PR（提议推荐）→ REC（正式推荐）。',
    keyPoints: [
      'CSS1 (1996) → CSS2 (1998) → CSS2.1 (2011) → CSS2.2 (2017)',
      'CSS2.1 移除了 CSS2 中未被浏览器实现的特性，修正与实际行为不符的定义',
      'CSS3 不是单一规范——它是一组独立模块的集合（Selectors Level 3、Cascade Level 4 等）',
      '模块化的好处：新特性可以独立演进和发布，不必等待整个「CSS3」完成',
      'CSS Snapshot（如 CSS 2023）：某个时间点所有稳定 CSS 特性的快照汇总',
      '规范成熟度：WD（工作草案）→ CR（候选推荐）→ PR（提议推荐）→ REC（正式推荐）',
      'CSS2.2 是 CSS2.1 的继任者，被后续 CSS3 模块引用为基础规范',
    ],
  },
  {
    id: 'reading-specs',
    number: '5',
    title: { zh: '如何阅读 CSS 规范', en: 'Reading CSS Specifications' },
    specId: 'reading',
    summary:
      'CSS 规范是 CSS 的权威定义，但对初学者不够友好。规范的主要读者是浏览器开发者和 CSS 作者。学会阅读规范可以让你理解属性的精确行为、解决二手资料的模糊性、预判浏览器差异。规范通常包括：介绍章节（设计理念）、语法定义（如何解析）、属性定义（每个属性的取值和计算规则）、算法描述（如何计算布局）。属性定义表格是规范的核心部分，包含属性名、合法值、初始值、适用元素、是否继承、百分比如何计算、计算值如何得出。值定义语法用符号描述属性接受什么值（如 <length> | auto 表示长度或 auto 关键字）。规范区分「规范性」内容（必须实现）和「信息性」内容（示例、注释）。实用建议：从 MDN 等二手资料入手，遇到疑问再查规范；关注属性定义表格和值语法；浏览器行为与规范不符时，优先以规范为准判断是否为 bug。',
    keyPoints: [
      '规范读者：浏览器开发者（实现）和 CSS 作者（理解精确行为）',
      '规范结构：介绍 → 语法定义 → 属性定义 → 算法描述 → 附录',
      '属性定义表格包含：Value（值语法）、Initial（初始值）、Applies to（适用元素）、Inherited（是否继承）、Percentages（百分比计算）、Computed value（计算值规则）',
      '值定义语法：<type>（数据类型）、|（选其一）、||（出现一个或多个）、&&（全部出现任意顺序）、?（可选）、*（0次或多次）',
      '规范性 vs 信息性：规范性内容是必须实现的行为，信息性内容是示例和解释',
      '实用建议：从 MDN 出发 → 遇到疑问查规范 → 关注属性定义表和值语法',
      'CSS2.2 属性定义在 §1.4.2 详细说明了表格各字段的含义',
    ],
  },
  {
    id: 'core-terminology',
    number: '6',
    title: { zh: '核心术语', en: 'Core Terminology' },
    specId: 'defs',
    summary:
      'CSS 有一套严谨的术语体系，理解这些术语是阅读规范的基础。属性（property）是 CSS 控制渲染的参数，如 color、margin。值（value）是属性被赋予的数据，如 red、10px。声明（declaration）是属性-值对，如 color: red。规则集（rule set）由选择器和声明块组成，如 h1 { color: red; }。样式表（style sheet）是一系列规则集和 at-rule 的集合。选择器（selector）定位文档树中的元素。元素（element）是文档的语法构成单元（如 HTML 的 <p>）。盒子（box）是 CSS 格式化模型中的渲染单元——一个元素可能生成零个、一个或多个盒子。替换元素（replaced element）的内容在 CSS 格式化模型之外（如 <img>、<video>），非替换元素的内容由 CSS 渲染（如 <p>、<div>）。文档树（document tree）是源文档解析后的元素层次结构。',
    keyPoints: [
      '属性（property）：CSS 的渲染参数，如 color、display、margin',
      '值（value）：属性被赋予的数据，如 red、block、10px',
      '声明（declaration）：属性: 值 对，如 color: red',
      '规则集（rule set）：选择器 + 声明块，如 h1 { color: red; margin: 0; }',
      '样式表（style sheet）：规则集和 at-rule 的集合',
      '选择器（selector）：定位元素的模式，如 h1、.class、#id、div > p',
      '元素（element）：文档的语法单元（HTML/XML 标签）',
      '盒子（box）：CSS 格式化模型的渲染单元，一个元素可能生成 0/1/多个盒子',
      '替换元素（replaced element）：内容在 CSS 之外，如 <img>、<video>、<iframe>',
      '非替换元素（non-replaced element）：内容由 CSS 渲染，如 <p>、<div>、<span>',
    ],
  },
];

export const anchors: Record<string, string> = {
  // §1 css-overview
  'html-tutorial': 'css-overview',
  'xml-tutorial': 'css-overview',
  // §2 design-principles
  'design-principles': 'design-principles',
  // §3 processing-model
  'processing-model': 'processing-model',
  'the-canvas': 'processing-model',
  'canvas': 'processing-model',
  'addressing': 'processing-model',
  // §4 css-history
  'css2.2-v-css2': 'css-history',
  'q1.0': 'css-history',
  // §5 reading-specs
  'reading': 'reading-specs',
  'organization': 'reading-specs',
  'doc-language': 'reading-specs',
  'property-defs': 'reading-specs',
  'shorthand': 'reading-specs',
  'notes-and-examples': 'reading-specs',
  'images-and-longdesc': 'reading-specs',
  // §6 core-terminology
  'defs': 'core-terminology',
  'conformance': 'core-terminology',
  'doctree': 'core-terminology',
  'root': 'core-terminology',
  'errors': 'core-terminology',
  'text-css': 'core-terminology',
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'style sheet': {
    zh: '样式表',
    description: '一组 CSS 规则的集合，用于指定文档的呈现方式。样式表可以来自作者、用户或用户代理。',
    sectionRef: 'intro#css-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#style-sheet',
  },
  'canvas': {
    zh: '画布',
    description: 'CSS 渲染的目标空间。Canvas 在每个维度上都是无限的，但渲染通常发生在有限区域内（如视口或页面）。',
    sectionRef: 'intro#processing-model',
    css2Url: 'https://www.w3.org/TR/CSS22/intro.html#the-canvas',
  },
  'document tree': {
    zh: '文档树',
    description: '源文档解析后的元素层次结构。文档树中的每个元素（除根元素外）有且仅有一个父元素。',
    sectionRef: 'intro#core-terminology',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#doctree',
  },
  'element tree': {
    zh: '元素树',
    description: '文档树的同义词。强调树的节点是元素（element）。',
    sectionRef: 'intro#core-terminology',
  },
  'box tree': {
    zh: '盒子树',
    description: 'CSS 格式化模型生成的盒子层次结构。与文档树类似但可能不同——display: none 不生成盒子，::before 生成额外盒子。',
    sectionRef: 'intro#processing-model',
  },
  'formatting structure': {
    zh: '格式化结构',
    description: '从文档树生成的用于渲染的结构。可能包含比文档树更多或更少的信息（如生成内容、display: none）。',
    sectionRef: 'intro#processing-model',
    css2Url: 'https://www.w3.org/TR/CSS22/intro.html#processing-model',
  },
  'replaced element': {
    zh: '替换元素',
    description: '内容在 CSS 格式化模型之外的元素，如 <img>、<video>、<iframe>。通常有固有尺寸（intrinsic dimensions）。',
    sectionRef: 'intro#core-terminology',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#replaced-element',
  },
  'non-replaced element': {
    zh: '非替换元素',
    description: '内容由 CSS 渲染的元素，如 <p>、<div>、<span>。内容是文档树的一部分。',
    sectionRef: 'intro#core-terminology',
  },
  'property': {
    zh: '属性',
    description: 'CSS 定义的用于控制渲染的参数，如 color、display、margin。每个属性有名称、值域和行为定义。',
    sectionRef: 'intro#core-terminology',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#property',
  },
  'initial containing block': {
    zh: '初始包含块',
    description: '根元素的包含块，尺寸通常等于视口（屏幕）或页面（打印）。',
    sectionRef: 'intro#processing-model',
  },
  'author': {
    zh: '作者',
    description: '编写文档和样式表的人或工具。作者样式表通常通过 <link> 或 <style> 关联到文档。',
    sectionRef: 'intro#css-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#author',
  },
  'user': {
    zh: '用户',
    description: '浏览文档的人。用户可以提供个人样式表（user style sheet）来覆盖作者样式。',
    sectionRef: 'intro#css-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#user',
  },
  'user agent': {
    zh: '用户代理',
    description: '解释文档和样式表的程序，通常指浏览器。用户代理提供默认样式表（user agent style sheet）。',
    sectionRef: 'intro#css-overview',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#user-agent',
  },
  'intrinsic dimensions': {
    zh: '固有尺寸',
    description: '元素自身定义的宽度、高度和宽高比（如图片的原始像素尺寸），不由 CSS 强加。',
    sectionRef: 'intro#core-terminology',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#intrinsic',
  },
};
