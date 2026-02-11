import type { Section } from '../modules';
import type { TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '简介', en: 'Introduction to Fonts' },
    specId: 'intro',
    summary: {
      zh: '字体是 CSS 视觉呈现的核心组成部分。CSS 提供了丰富的字体控制能力，从字体族选择到字体变体。',
      en: 'Fonts are a core component of CSS visual presentation. CSS provides rich font control capabilities, from font family selection to font variants.',
    },
    keyPoints: [
      '字体属性控制文本的视觉呈现',
      'CSS2 定义了基本字体属性（font-family、font-style、font-weight、font-size 等）',
      'CSS3 大幅扩展了字体能力（@font-face、可变字体、字体特性等）',
      '字体匹配算法确保在理想字体不可用时的优雅降级',
      '所有字体属性均可继承，子元素默认沿用父元素的字体设置',
      '字体匹配以字符为单位进行——同一元素中不同字符可能使用不同字体',
      'CSS 中的"字体族"是复合概念，一个族包含多个字面（face），按 style/weight/stretch 区分',
      '字体分类无统一标准，italic/oblique/cursive 等术语在不同字体族中含义可能不同',
    ],
    tutorial: [
      { type: 'heading', text: '字体：CSS 排版的基石' },
      {
        type: 'paragraph',
        text: '字体不仅仅是文字的外观——它影响可读性、品牌识别度和用户体验。CSS 的字体系统从 CSS2 的基础属性发展到 CSS3 的 Web 字体和可变字体，经历了巨大的演变。',
      },
      {
        type: 'paragraph',
        text: 'CSS2 定义了五个核心字体属性：font-family（字体族）、font-style（风格）、font-weight（粗细）、font-size（大小）和 font-variant（变体）。这些属性共同决定了文本的视觉呈现。',
      },
      {
        type: 'code',
        lang: 'css',
        code: `/* CSS2 基础字体设置 */
p {
  font-family: Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
}

h1 {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 2em;
  font-weight: 700;
}`,
        caption: '使用基础字体属性控制文本外观',
      },
      { type: 'heading', text: 'CSS3 的革命性扩展' },
      {
        type: 'paragraph',
        text: 'CSS3 引入了 @font-face 规则，让 Web 开发者可以加载自定义字体，不再受限于用户系统上安装的字体。这彻底改变了 Web 排版的面貌。',
      },
      {
        type: 'code',
        lang: 'css',
        code: `/* 加载自定义 Web 字体 */
@font-face {
  font-family: 'MyCustomFont';
  src: url('fonts/custom-font.woff2') format('woff2'),
       url('fonts/custom-font.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'MyCustomFont', system-ui, sans-serif;
}`,
        caption: '@font-face 让网页使用任意字体成为可能',
      },
      {
        type: 'tip',
        text: 'font-display: swap 是最常用的策略，它让浏览器先显示后备字体，加载完成后再替换为自定义字体，避免"不可见文本闪烁"（FOIT）问题。',
      },
      { type: 'heading', text: '字体继承：一次设置，全局生效' },
      {
        type: 'paragraph',
        text: '所有字体属性都是可继承的。这意味着你可以在根元素设置基础字体，所有子元素会自动继承这些设置，除非被显式覆盖。',
      },
      {
        type: 'example',
        title: '字体继承示例',
        code: `/* 在根元素设置基础字体 */
html {
  font-family: system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

/* 标题覆盖字体族 */
h1, h2, h3 {
  font-family: Georgia, serif;
}

/* 代码块覆盖为等宽字体 */
code, pre {
  font-family: 'Courier New', monospace;
}`,
        explanation: '通过继承机制，你只需在顶层设置一次字体，整个文档树都会应用这个设置。',
      },
      { type: 'heading', text: '字体匹配：逐字符回退' },
      {
        type: 'paragraph',
        text: 'CSS 的字体匹配是以字符为单位进行的。当某个字符在当前字体中找不到对应的字形（glyph）时，浏览器会自动尝试 font-family 列表中的下一个字体。',
      },
      {
        type: 'code',
        lang: 'css',
        code: `/* 中英文混排的字体栈 */
body {
  font-family:
    'PingFang SC',        /* 中文优先使用苹方 */
    'Microsoft YaHei',    /* Windows 回退到微软雅黑 */
    'Helvetica Neue',     /* 英文使用 Helvetica */
    Arial,                /* 英文回退到 Arial */
    sans-serif;           /* 最后回退到系统无衬线字体 */
}`,
        caption: '字体栈确保在不同平台上都有合适的字体',
      },
      {
        type: 'warning',
        text: '同一个元素中的不同字符可能最终使用不同的物理字体。例如，在上面的例子中，中文可能用"苹方"，英文可能用"Helvetica"，这是完全正常的。',
      },
      {
        type: 'list',
        items: [
          '字体属性全部可继承，可在根元素统一设置',
          'CSS2 定义了 5 个核心字体属性',
          'CSS3 引入 @font-face 支持自定义 Web 字体',
          '字体匹配以字符为单位，支持自动回退',
          '可变字体技术让一个文件包含多种变体',
          'font-display 控制字体加载期间的显示策略',
        ],
      },
      {
        type: 'tip',
        text: '现代浏览器支持系统字体关键字（system-ui、ui-sans-serif 等），使用这些关键字可以让网页自动匹配用户操作系统的原生字体。',
      },
    ] as TutorialBlock[],
  },
  {
    id: 'font-family-selection',
    number: '2',
    title: { zh: '字体族选择', en: 'Font Family Selection' },
    specId: 'font-family-prop',
    summary: {
      zh: 'font-family 属性指定元素使用的字体列表。浏览器按顺序查找可用字体，最后回退到通用字体族。',
      en: 'The font-family property specifies a list of fonts for an element. The browser searches for available fonts in order, ultimately falling back to a generic font family.',
    },
    keyPoints: [
      'font-family 支持字体名列表，按优先级从高到低排列',
      '字体名包含空格或特殊字符时需要用引号包裹',
      '通用字体族（CSS2）：serif、sans-serif、monospace、cursive、fantasy',
      '通用字体族（CSS3 扩展）：system-ui、ui-serif、ui-sans-serif、ui-monospace、emoji、math、fangsong',
      '字体匹配算法会根据字体属性（style、weight、size）查找最佳匹配',
      '使用 local() 可以引用用户系统上已安装的字体',
      '匹配顺序：先匹配 font-style，再匹配 font-weight，最后匹配 font-size',
      '通用字体族名称是关键字，不能加引号；与 inherit/default 同名的字体名必须加引号',
      '当某字符在当前字体中无字形时，浏览器会自动尝试列表中的下一个字体（逐字符回退）',
      '不同平台（Windows/macOS/Linux）的默认字体映射不同，建议始终提供通用字体族作为兜底',
    ],
    tutorial: [
      { type: 'heading', text: '字体族列表:优先级与回退' },
      { type: 'paragraph', text: '`font-family` 接受一个逗号分隔的字体名列表。浏览器从左到右尝试每个字体,直到找到一个可用的。列表末尾应该始终放一个**通用字体族**作为最后的兜底。' },
      { type: 'code', code: 'body {\n  font-family:\n    "Helvetica Neue",  /* 首选:macOS 上的优质无衬线字体 */\n    Arial,             /* 回退:Windows 上的替代 */\n    "PingFang SC",     /* 中文:苹果苹方 */\n    "Microsoft YaHei", /* 中文:微软雅黑 */\n    sans-serif;        /* 通用字体族:最后兜底 */\n}', lang: 'css', caption: '典型的中英文混排字体栈' },
      { type: 'heading', text: '通用字体族' },
      { type: 'list', items: [
        '**CSS2**: `serif`(衬线)、`sans-serif`(无衬线)、`monospace`(等宽)、`cursive`(手写)、`fantasy`(装饰)',
        '**CSS3 新增**: `system-ui`(系统 UI 字体)、`ui-serif`、`ui-sans-serif`、`ui-monospace`、`emoji`、`math`、`fangsong`(仿宋)',
      ] },
      { type: 'example', title: '使用 system-ui 匹配原生界面', code: '.ui-text {\n  font-family: system-ui, sans-serif;\n}\n\n/* 等宽字体用于代码 */\ncode, pre {\n  font-family: ui-monospace, "Cascadia Code", "Fira Code", monospace;\n}', lang: 'css', explanation: '`system-ui` 会自动匹配操作系统的原生 UI 字体——macOS 用 San Francisco,Windows 用 Segoe UI,Android 用 Roboto。' },
      { type: 'heading', text: '字体名称规则' },
      { type: 'paragraph', text: '包含空格或特殊字符的字体名必须用引号包裹。通用字体族是关键字,**不能加引号**。如果字体名与 CSS 关键字同名(如 `inherit`、`default`),必须用引号。' },
      { type: 'code', code: '/* 正确写法 */\np { font-family: "Times New Roman", serif; }\np { font-family: Arial, sans-serif; }\n\n/* 错误写法 */\np { font-family: "sans-serif"; } /* 通用字体族不加引号! */\np { font-family: Times New Roman; } /* 含空格的字体名需要引号! */', lang: 'css', caption: '引号的使用规则' },
      { type: 'heading', text: '字体匹配算法' },
      { type: 'paragraph', text: '浏览器的字体匹配是逐字符进行的。对于列表中的每个字体,先匹配 `font-style`,再匹配 `font-weight`,最后匹配 `font-size`。如果某个字符在当前字体中没有对应字形,浏览器会自动尝试下一个字体。' },
      { type: 'warning', text: '不同操作系统预装的字体完全不同。Windows 有 Arial、Segoe UI;macOS 有 Helvetica Neue、San Francisco;Linux 依发行版而异。**永远不要假设用户有某个特定字体**,始终提供充足的回退。' },
      { type: 'tip', text: '使用 `local()` 可以引用用户系统上已安装的字体,这在 @font-face 中很有用——如果用户已经有这个字体,就不必下载 Web 字体了。' },
    ] as TutorialBlock[],
  },
  {
    id: 'font-properties',
    number: '3',
    title: { zh: '字体属性', en: 'Font Properties' },
    specId: 'font-styling',
    summary: {
      zh: 'CSS 提供了一组属性来控制字体的风格、变体、粗细和大小。font 简写属性可以同时设置多个字体属性。',
      en: 'CSS provides a set of properties to control font style, variant, weight, and size. The font shorthand property can set multiple font properties simultaneously.',
    },
    keyPoints: [
      'font-style：控制字体风格（normal、italic、oblique）',
      'font-variant：控制小型大写字母（normal、small-caps，CSS3 大幅扩展）',
      'font-weight：控制字体粗细（normal、bold、数值 100-900）',
      'font-size：控制字体大小（绝对/相对关键字、长度、百分比）',
      'font 简写：可以同时设置 style、variant、weight、size、line-height 和 family',
      'font 简写还支持系统字体关键字（caption、icon、menu 等）',
      'CSS3 新增：font-stretch（宽度变体）、font-optical-sizing（光学尺寸）、font-synthesis（字体合成）',
      'font-size-adjust 用于在回退字体时保持 x 字高比例一致，改善可读性',
      'CSS3 扩展 font-variant 为多个子属性：font-variant-ligatures、font-variant-caps、font-variant-numeric、font-variant-east-asian',
      'font 简写会将未显式指定的子属性重置为初始值；font-size 和 font-family 是必填项',
    ],
    tutorial: [
      { type: 'heading', text: 'font-style:正体、斜体与倾斜' },
      { type: 'paragraph', text: '`font-style` 控制字体的风格。`italic` 使用字体设计师专门绘制的斜体变体,`oblique` 则是通过算法倾斜正体字形。两者视觉上类似,但 italic 通常有独特的字形设计。' },
      { type: 'code', code: 'em { font-style: italic; }    /* 斜体(专门设计的变体) */\n.slanted { font-style: oblique; } /* 倾斜(算法生成) */\n\n/* CSS3 支持指定倾斜角度 */\n.custom { font-style: oblique 12deg; }', lang: 'css', caption: 'italic 和 oblique 的区别' },
      { type: 'heading', text: 'font-weight:字重控制' },
      { type: 'paragraph', text: '`font-weight` 控制字体粗细,支持关键字(`normal`=400、`bold`=700)和数值(100-900)。CSS3 扩展为支持 1-1000 的任意数值,配合可变字体可以实现无级调节。' },
      { type: 'code', code: '.thin { font-weight: 100; }     /* 极细 */\n.light { font-weight: 300; }    /* 细体 */\n.regular { font-weight: 400; }  /* 正常(normal) */\n.medium { font-weight: 500; }   /* 中等 */\n.semibold { font-weight: 600; } /* 半粗 */\n.bold { font-weight: 700; }     /* 粗体(bold) */\n.black { font-weight: 900; }    /* 极粗 */\n\n/* bolder/lighter 相对于父元素的字重计算 */\nstrong { font-weight: bolder; }', lang: 'css', caption: '常用字重值' },
      { type: 'heading', text: 'font-size:字号设置' },
      { type: 'paragraph', text: '`font-size` 控制字体大小,支持绝对关键字、相对关键字、长度和百分比。它是 `em`、`ex` 等相对单位的计算基准,在整个字体系统中起到锚定作用。' },
      { type: 'example', title: '字号设置的多种方式', code: 'body { font-size: 16px; }        /* 绝对长度 */\nh1 { font-size: 2em; }            /* 相对于父元素:32px */\n.small { font-size: 0.875rem; }   /* 相对于根元素:14px */\n.tiny { font-size: smaller; }     /* 相对关键字:小一号 */\n.big { font-size: x-large; }      /* 绝对关键字 */\n.responsive { font-size: clamp(1rem, 2.5vw, 2rem); } /* 响应式字号 */', lang: 'css', explanation: '推荐使用 `rem` 作为主要字号单位——它相对于根元素,不受嵌套层级影响,便于全局缩放。' },
      { type: 'heading', text: 'font 简写属性' },
      { type: 'paragraph', text: '`font` 简写可以同时设置 style、variant、weight、size、line-height 和 family。但要注意:它会将未指定的子属性**重置为初始值**,且 `font-size` 和 `font-family` 是必填的。' },
      { type: 'code', code: '/* font 简写语法 */\np {\n  font: italic small-caps bold 16px/1.5 Georgia, serif;\n  /*     style  variant   weight size/line-height family */\n}\n\n/* 系统字体关键字 */\n.system { font: menu; }   /* 使用操作系统菜单字体 */\n.caption { font: caption; } /* 使用操作系统标题字体 */', lang: 'css', caption: 'font 简写的完整语法' },
      { type: 'warning', text: '`font` 简写会重置所有未指定的子属性!如果你只想改字号,用 `font-size` 而不是 `font`。否则你之前设置的 `font-weight`、`font-style` 等都会被重置为初始值。' },
      { type: 'heading', text: 'CSS3 扩展属性' },
      { type: 'list', items: [
        '`font-stretch`: 控制字体宽度变体(condensed/expanded),需要字体本身支持',
        '`font-optical-sizing`: 让字体根据大小自动微调笔画(需要可变字体)',
        '`font-synthesis`: 控制浏览器是否自动合成粗体/斜体(当字体缺少对应变体时)',
        '`font-size-adjust`: 在回退字体时保持 x 字高一致,改善可读性',
        '`font-variant-*`: 一组子属性控制 OpenType 特性——连字、小型大写、数字形式等',
      ] },
      { type: 'tip', text: '如果你的设计稿使用了一个只有 Regular 和 Bold 的字体,但代码中用了 `font-weight: 600`,浏览器会自动"合成"一个半粗版本。`font-synthesis: none` 可以禁止这种合成,避免渲染质量问题。' },
    ] as TutorialBlock[],
  },
  {
    id: 'font-face',
    number: '4',
    title: { zh: '@font-face', en: 'Web Fonts' },
    specId: 'font-face-rule',
    summary: {
      zh: '@font-face 规则允许开发者加载自定义字体，使网页不再局限于用户系统字体。',
      en: 'The @font-face rule allows developers to load custom fonts, freeing web pages from being limited to user system fonts.',
    },
    keyPoints: [
      '@font-face 定义一个字体族名称和字体资源的映射',
      'src 描述符指定字体文件位置：url()（网络）、local()（本地系统）',
      'format() 函数声明字体格式（woff2、woff、truetype、opentype 等）',
      'unicode-range 描述符限制字体的字符范围（字体子集化）',
      'font-display 描述符控制字体加载期间的显示行为（auto、block、swap、fallback、optional）',
      'font-display: swap 最常用，立即显示后备字体，加载完成后替换',
      '描述符还包括 font-style、font-weight、font-stretch，用于匹配算法',
      'WOFF2 是推荐的 Web 字体格式，压缩率最高（比 WOFF 1.0 小约 30%）',
      '跨域加载字体受同源策略限制，需服务器设置 CORS 头（Access-Control-Allow-Origin）',
      'CSS Font Loading API（FontFace / FontFaceSet）允许 JavaScript 精确控制字体加载时机和状态',
    ],
    tutorial: [
      { type: 'heading', text: '@font-face:自定义 Web 字体' },
      { type: 'paragraph', text: '`@font-face` 规则让你可以加载任意字体文件,使网页不再受限于用户系统上安装的字体。这彻底改变了 Web 排版的面貌。' },
      { type: 'code', code: '@font-face {\n  font-family: "MyFont";                          /* 自定义名称 */\n  src: local("My Font"),                           /* 先检查本地 */\n       url("myfont.woff2") format("woff2"),        /* 优先 WOFF2 */\n       url("myfont.woff") format("woff");          /* 回退 WOFF */\n  font-weight: 400;                                /* 匹配条件 */\n  font-style: normal;\n  font-display: swap;                              /* 加载策略 */\n  unicode-range: U+0000-00FF;                      /* 字符范围 */\n}', lang: 'css', caption: '@font-face 的完整语法' },
      { type: 'heading', text: 'font-display:控制加载体验' },
      { type: 'paragraph', text: '`font-display` 描述符定义了字体加载期间的显示策略,直接影响用户体验。' },
      { type: 'list', items: [
        '`swap`: 立即显示后备字体,加载完成后替换。**最常用**,避免不可见文本(FOIT)',
        '`block`: 短暂隐藏文本(最多 3 秒),然后显示后备字体。适合图标字体',
        '`fallback`: 极短阻塞期(~100ms),之后若未加载完成则使用后备字体,不再替换',
        '`optional`: 由浏览器决定是否使用 Web 字体。适合非关键字体,最佳性能',
        '`auto`: 浏览器默认策略(通常类似 block)',
      ] },
      { type: 'heading', text: 'unicode-range:字体子集化' },
      { type: 'paragraph', text: '`unicode-range` 限制字体覆盖的字符范围。浏览器只在页面包含该范围内的字符时才下载字体文件,大幅减少不必要的网络请求。' },
      { type: 'example', title: '按语言分割字体', code: '/* 拉丁字符用一个字体文件 */\n@font-face {\n  font-family: "Noto";\n  src: url("noto-latin.woff2") format("woff2");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153;\n}\n\n/* CJK 字符用另一个字体文件(体积大得多) */\n@font-face {\n  font-family: "Noto";\n  src: url("noto-cjk.woff2") format("woff2");\n  unicode-range: U+4E00-9FFF, U+3400-4DBF;\n}', lang: 'css', explanation: '同一个 font-family 名称可以对应多个 @font-face 规则,浏览器按 unicode-range 按需下载。' },
      { type: 'warning', text: '跨域加载字体受同源策略限制。CDN 上的字体需要服务器设置 `Access-Control-Allow-Origin` 头,否则浏览器会拒绝加载。' },
      { type: 'tip', text: 'WOFF2 是目前推荐的 Web 字体格式,压缩率比 WOFF 高约 30%。现代浏览器全部支持 WOFF2,可以只提供这一种格式。' },
    ] as TutorialBlock[],
  },
  {
    id: 'variable-fonts',
    number: '5',
    title: { zh: '可变字体', en: 'Variable Fonts' },
    specId: 'font-variation-settings-def',
    summary: {
      zh: 'CSS3 引入的可变字体技术允许一个字体文件包含多个变体（粗细、宽度、倾斜等），通过插值实现精细控制。',
      en: 'Variable font technology introduced in CSS3 allows a single font file to contain multiple variations (weight, width, slant, etc.), enabling fine-grained control through interpolation.',
    },
    keyPoints: [
      '可变字体使用 font-variation-settings 属性控制变体轴',
      '注册轴：wght（粗细）、wdth（宽度）、slnt（倾斜）、ital（斜体）、opsz（光学尺寸）',
      '自定义轴使用 4 个大写字母标识（如 GRAD、CASL）',
      '高级属性 font-weight、font-stretch 等会自动映射到对应的变体轴',
      '可变字体减少文件数量，提升性能，提供更精细的排版控制',
      '使用 @font-face 的 font-variation-settings 描述符定义支持的轴范围',
      '应优先使用高级属性（font-weight 等）而非 font-variation-settings，因为高级属性可独立级联且支持合成',
      'font-feature-settings 控制 OpenType 特性（连字、数字形式等），同理应优先使用 font-variant-* 子属性',
      '可变字体支持命名实例（named instances），预设常用的轴值组合，类似传统字体族中的 Regular/Bold 等',
      '轴值超出字体支持范围时会被钳制（clamp）到最近的有效值',
    ],
    tutorial: [
      { type: 'heading', text: '什么是可变字体?' },
      { type: 'paragraph', text: '传统字体需要为每种粗细/宽度/风格提供独立的文件(Regular.woff2、Bold.woff2、Italic.woff2...)。**可变字体**(Variable Font)将所有变体压缩在一个文件中,通过**变体轴**实现无级调节——从极细到极粗、从窄体到宽体,一个文件搞定。' },
      { type: 'code', code: '/* 一个可变字体文件覆盖所有字重 */\n@font-face {\n  font-family: "Inter Variable";\n  src: url("Inter-Variable.woff2") format("woff2-variations");\n  font-weight: 100 900; /* 字重范围 */\n  font-style: normal;\n}\n\n/* 使用任意字重值 */\n.thin { font-weight: 150; }    /* 精确到个位数 */\n.medium { font-weight: 550; }  /* 传统字体做不到 */\n.heavy { font-weight: 850; }', lang: 'css', caption: '可变字体的字重连续变化' },
      { type: 'heading', text: '注册轴与自定义轴' },
      { type: 'paragraph', text: 'OpenType 定义了 5 个**注册轴**(标准化的),字体设计师还可以定义**自定义轴**。' },
      { type: 'list', items: [
        '`wght`(weight): 字重,对应 `font-weight`',
        '`wdth`(width): 宽度,对应 `font-stretch`',
        '`slnt`(slant): 倾斜角度,对应 `font-style: oblique`',
        '`ital`(italic): 斜体开关(0/1),对应 `font-style: italic`',
        '`opsz`(optical size): 光学尺寸,对应 `font-optical-sizing`',
        '自定义轴使用 4 个大写字母标识,如 `GRAD`(等级)、`CASL`(手写风格)',
      ] },
      { type: 'heading', text: 'font-variation-settings' },
      { type: 'code', code: '/* 低级控制:直接设置轴值 */\n.custom {\n  font-variation-settings:\n    "wght" 650,   /* 字重 */\n    "wdth" 80,    /* 宽度 */\n    "CASL" 1;     /* 自定义轴:手写风格 */\n}\n\n/* 高级属性(推荐):自动映射到对应轴 */\n.better {\n  font-weight: 650;\n  font-stretch: 80%;\n}', lang: 'css', caption: '低级 vs 高级属性' },
      { type: 'example', title: '可变字体动画', code: '.hover-weight {\n  font-weight: 400;\n  transition: font-weight 0.3s ease;\n}\n.hover-weight:hover {\n  font-weight: 700; /* 鼠标悬停时平滑加粗 */\n}', lang: 'css', explanation: '可变字体支持字重的平滑过渡动画——这在传统字体中不可能实现,因为 400 和 700 之间没有中间状态。' },
      { type: 'warning', text: '应优先使用高级属性(`font-weight` 等)而非 `font-variation-settings`,因为高级属性可以独立级联,而 `font-variation-settings` 是一个整体值——修改一个轴会覆盖所有其他轴的设置。' },
      { type: 'heading', text: 'OpenType 特性' },
      { type: 'paragraph', text: '`font-feature-settings` 控制 OpenType 字体中的高级排版特性,如连字、小型大写、表格数字等。同样推荐使用 `font-variant-*` 子属性替代。' },
      { type: 'code', code: '/* 低级方式 */\n.features { font-feature-settings: "liga" 1, "tnum" 1; }\n\n/* 推荐:高级属性 */\n.ligatures { font-variant-ligatures: common-ligatures; }\n.tabular { font-variant-numeric: tabular-nums; }\n.small-caps { font-variant-caps: small-caps; }', lang: 'css', caption: '开启 OpenType 特性的两种方式' },
      { type: 'tip', text: '可变字体文件通常比所有静态变体的总体积小得多。一个覆盖 9 种字重的可变字体文件约 200-300KB,而 9 个独立的静态字体文件可能需要 1-2MB。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {
  'font-family-prop': 'font-family-selection',
  'font-styling': 'font-properties',
  'small-caps': 'font-properties',
  'font-boldness': 'font-properties',
  'font-size-props': 'font-properties',
  'font-shorthand': 'font-properties',
  'algorithm': 'font-family-selection',
  'propdef-font-family': 'font-family-selection',
  'propdef-font-style': 'font-properties',
  'propdef-font-variant': 'font-properties',
  'propdef-font-weight': 'font-properties',
  'propdef-font-size': 'font-properties',
  'propdef-font': 'font-properties',
  'font-face-rule': 'font-face',
  'font-variation-settings-def': 'variable-fonts',
};

// ============================================================
// 属性定义（CSS2 Ch15 Fonts + CSS3 Fonts Level 4）
// ============================================================

const CSS22_FONTS = 'https://www.w3.org/TR/CSS22/fonts.html';
const CSS3_FONTS = 'https://www.w3.org/TR/css-fonts-4/';
const CSS3_FONTS_5 = 'https://www.w3.org/TR/css-fonts-5/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ---- CSS2 基本字体属性 ----

  // font-family
  'font-family': {
    zh: '字体族',
    value: '[ <family-name> | <generic-family> ] [, [ <family-name> | <generic-family> ] ]* | inherit',
    initial: '取决于用户代理',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${CSS22_FONTS}#propdef-font-family`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-family-selection',
  },

  // font-style
  'font-style': {
    zh: '字体风格',
    value: 'normal | italic | oblique | oblique <angle>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定关键字，oblique 含计算后的角度值',
    css2Url: `${CSS22_FONTS}#propdef-font-style`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-variant
  'font-variant': {
    zh: '字体变体',
    value: 'normal | small-caps（CSS2）；CSS3 扩展为简写属性',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${CSS22_FONTS}#propdef-font-variant`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-weight
  'font-weight': {
    zh: '字体粗细',
    value: 'normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | <number [1,1000]>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '数值（normal 为 400，bold 为 700；bolder/lighter 根据继承值计算）',
    css2Url: `${CSS22_FONTS}#propdef-font-weight`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-size
  'font-size': {
    zh: '字体大小',
    value: '<absolute-size> | <relative-size> | <length-percentage [0,∞]>',
    initial: 'medium',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于父元素的字体大小',
    computedValue: '绝对长度',
    css2Url: `${CSS22_FONTS}#propdef-font-size`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font（简写）
  'font': {
    zh: '字体简写',
    value: '[ [ <font-style> || <font-variant> || <font-weight> ]? <font-size> [ / <line-height> ]? <font-family> ] | caption | icon | menu | message-box | small-caption | status-bar',
    initial: '见各子属性',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: `${CSS22_FONTS}#propdef-font`,
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // ---- CSS3 新增属性 ----

  // font-size-adjust
  'font-size-adjust': {
    zh: '字体大小调整',
    value: 'none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number [0,∞]> ]',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定关键字或数值',
    css2Url: '',
    css3Url: CSS3_FONTS_5,
    sectionRef: 'fonts#font-properties',
  },

  // font-feature-settings
  'font-feature-settings': {
    zh: '字体特性设置',
    value: 'normal | [ <feature-tag-value> ]#',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#variable-fonts',
  },

  // font-stretch (CSS3 新属性，CSS2 中无)
  'font-stretch': {
    zh: '字体宽度',
    value: 'normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于字体的正常宽度',
    computedValue: '关键字或百分比值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-display (CSS3 新属性，用于 @font-face)
  'font-display': {
    zh: '字体显示策略',
    value: 'auto | block | swap | fallback | optional',
    initial: 'auto',
    appliesTo: '@font-face 规则',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-face',
  },

  // font-optical-sizing (CSS3 新属性)
  'font-optical-sizing': {
    zh: '光学尺寸',
    value: 'auto | none',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS_5,
    sectionRef: 'fonts#font-properties',
  },

  // font-synthesis (CSS3 新属性)
  'font-synthesis': {
    zh: '字体合成',
    value: 'none | [ weight || style || small-caps ]',
    initial: 'weight style small-caps',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#font-properties',
  },

  // font-variation-settings (CSS3 可变字体)
  'font-variation-settings': {
    zh: '字体变体设置',
    value: 'normal | [ <string> <number> ]#',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: CSS3_FONTS,
    sectionRef: 'fonts#variable-fonts',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'font family': {
    zh: '字体族',
    description: '一组具有相同设计风格的字体集合。例如 Helvetica 字体族包含多个字重和样式变体。',
    sectionRef: 'fonts#font-family-selection',
    css2Url: `${CSS22_FONTS}#font-family-prop`,
    specUrl: CSS3_FONTS,
  },
  'generic font family': {
    zh: '通用字体族',
    description: '浏览器定义的字体类别（serif、sans-serif、monospace 等），用作字体匹配的最后回退选项，确保文本始终可读。',
    sectionRef: 'fonts#font-family-selection',
    css2Url: `${CSS22_FONTS}#generic-font-families`,
    specUrl: CSS3_FONTS,
  },
  'web font': {
    zh: 'Web 字体',
    description: '通过网络加载的自定义字体，使用 @font-face 规则定义。Web 字体让网页不受用户系统字体限制。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  '@font-face': {
    zh: '@font-face 规则',
    description: '用于定义自定义字体的 CSS at-rule。指定字体名称、字体文件位置和字体描述符（weight、style 等）。',
    sectionRef: 'fonts#font-face',
    css2Url: `${CSS22_FONTS}#font-descriptions`,
    specUrl: CSS3_FONTS,
  },
  'variable font': {
    zh: '可变字体',
    description: 'OpenType 1.8 引入的字体技术，允许一个字体文件包含多个变体轴（粗细、宽度等），通过插值实现连续变化。',
    sectionRef: 'fonts#variable-fonts',
    specUrl: CSS3_FONTS,
  },
  'font matching': {
    zh: '字体匹配',
    description: '浏览器根据 font-family、font-style、font-weight 等属性查找最佳可用字体的算法。匹配失败时回退到通用字体族。',
    sectionRef: 'fonts#font-family-selection',
    css2Url: `${CSS22_FONTS}#algorithm`,
    specUrl: CSS3_FONTS,
  },
  'font stack': {
    zh: '字体栈',
    description: 'font-family 属性中按优先级排列的字体名称列表。浏览器从左到右依次查找可用字体，最后一项通常是通用字体族。',
    sectionRef: 'fonts#font-family-selection',
    specUrl: CSS3_FONTS,
  },
  'system fonts': {
    zh: '系统字体',
    description: '通过 font 简写关键字（caption、icon、menu、message-box、small-caption、status-bar）访问的操作系统 UI 字体。',
    sectionRef: 'fonts#font-properties',
    css2Url: `${CSS22_FONTS}#propdef-font`,
    specUrl: CSS3_FONTS,
  },
  'font-size-adjust': {
    zh: '字体大小调整',
    description: '用于在回退字体时保持 x 字高（或其他度量）与首选字体一致的属性，避免因字体切换导致的可读性变化。',
    sectionRef: 'fonts#font-properties',
    specUrl: CSS3_FONTS_5,
  },
  'font feature': {
    zh: '字体特性',
    description: 'OpenType/TrueType 字体中定义的高级排版功能，如连字（liga）、小型大写（smcp）、表格数字（tnum）等，通过 font-feature-settings 或 font-variant-* 启用。',
    sectionRef: 'fonts#variable-fonts',
    specUrl: CSS3_FONTS,
  },
  'opentype': {
    zh: 'OpenType 字体格式',
    description: '由 Microsoft 和 Adobe 联合开发的字体格式标准，支持丰富的排版特性（连字、替代字形等）和可变字体技术。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'woff2': {
    zh: 'WOFF2 字体格式',
    description: 'Web Open Font Format 2.0，专为 Web 优化的字体压缩格式。相比 WOFF 1.0 体积缩小约 30%，是现代 Web 字体的推荐格式。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'font subsetting': {
    zh: '字体子集化',
    description: '仅包含页面实际使用的字符的字体文件裁剪技术，配合 unicode-range 描述符可大幅减少字体下载体积。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'unicode-range': {
    zh: 'Unicode 范围',
    description: '@font-face 描述符，指定字体覆盖的 Unicode 码点范围。浏览器仅在页面包含该范围内的字符时才下载对应字体文件。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'font-display': {
    zh: '字体显示策略',
    description: '@font-face 描述符，控制字体加载期间的渲染行为。定义阻塞期、交换期和失败期三个阶段的显示策略。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'composite font': {
    zh: '复合字体',
    description: '由多个 @font-face 规则通过相同 font-family 名称和不同 unicode-range 组合而成的虚拟字体，可为不同字符范围使用不同物理字体。',
    sectionRef: 'fonts#font-face',
    specUrl: CSS3_FONTS,
  },
  'ex unit': {
    zh: 'ex 单位',
    description: '相对长度单位，等于当前字体中小写字母 x 的高度（x-height）。当字体无法确定 x-height 时，通常取 0.5em。',
    sectionRef: 'fonts#font-properties',
    css2Url: `${CSS22_FONTS}#font-size-props`,
    specUrl: CSS3_FONTS,
  },
  'ch unit': {
    zh: 'ch 单位',
    description: '相对长度单位，等于当前字体中字符 "0"（U+0030）的前进宽度。常用于设置等宽字体的列宽。',
    sectionRef: 'fonts#font-properties',
    specUrl: CSS3_FONTS,
  },
};
