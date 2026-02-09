import type { LucideIcon } from 'lucide-react';
import { BookOpen, Layout, Palette, Type, Sparkles } from 'lucide-react';
import type { LocaleText } from '@/lib/i18n';

// ============================================================
// 状态类型
// ============================================================

export type ModuleStatus = 'current' | 'locked' | 'completed';

// ============================================================
// 章节数据（Section = 章内小节）
// ============================================================

export interface Section {
  id: string;
  number: string;
  title: LocaleText;
  summary: string;
  keyPoints: string[];
  specId?: string; // 对应的 W3C 规范锚点 ID
}

// ============================================================
// 章节定义（Module = 一个学习章节，对应 CSS2 的一章）
// ============================================================

export interface Module {
  id: string;
  number: number;
  title: LocaleText;
  description: string;
  status: ModuleStatus;
  specs: string[];
  specUrl: string;
  css2Chapters?: number[]; // 对应的 CSS2 章节编号
  keyConcept?: {
    title: string;
    content: string;
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
  description: string;
  moduleIds: string[];
}

// ============================================================
// 阶段数据（基于 CSS2 章节依赖链）
// ============================================================

export const stages: Stage[] = [
  {
    id: 'fundamentals',
    title: { zh: '语言基础', en: 'Fundamentals' },
    icon: BookOpen,
    description: 'CSS 语言的核心机制与规则',
    moduleIds: ['intro', 'syntax', 'selectors', 'cascade'],
  },
  {
    id: 'box-layout',
    title: { zh: '盒子与布局', en: 'Box & Layout' },
    icon: Layout,
    description: '从盒模型到完整的布局系统',
    moduleIds: ['media', 'box-model', 'visual-formatting', 'sizing'],
  },
  {
    id: 'visual',
    title: { zh: '视觉表现', en: 'Visual' },
    icon: Palette,
    description: '视觉效果、颜色、背景与装饰',
    moduleIds: ['visual-effects', 'generated-content', 'colors-backgrounds'],
  },
  {
    id: 'typography',
    title: { zh: '排版', en: 'Typography' },
    icon: Type,
    description: '字体选择与文本排版',
    moduleIds: ['fonts', 'text'],
  },
  {
    id: 'dynamics',
    title: { zh: '动态与前沿', en: 'Dynamics & Modern' },
    icon: Sparkles,
    description: '变换、动画与现代 CSS 新特性',
    moduleIds: ['transforms', 'modern'],
  },
];

// ============================================================
// 全部章节数据（按 CSS2 章节顺序排列）
// ============================================================

export const modules: Record<string, Module> = {
  // ──────────────────────────────────────────────
  // 阶段 1：语言基础
  // ──────────────────────────────────────────────

  intro: {
    id: 'intro',
    number: 1,
    title: { zh: 'CSS 概论', en: 'Introduction to CSS' },
    description: 'CSS 的设计理念、处理模型与基本概念',
    status: 'locked',
    specs: [],
    specUrl: 'https://www.w3.org/TR/CSS22/intro.html',
    css2Chapters: [1, 2, 3],
    keyConcept: {
      title: '为什么从这里开始？',
      content:
        'CSS2 第 2 章介绍了 CSS 的设计原则和处理模型——浏览器如何从源文档到最终渲染。理解这些基础概念，才能明白后续所有规则「为什么」是这样设计的。',
    },
    sections: [],
  },

  syntax: {
    id: 'syntax',
    number: 2,
    title: { zh: '语法、值与单位', en: 'Syntax, Values & Units' },
    description: 'CSS 解析规则、数据类型、值语法与单位系统',
    status: 'current',
    specs: ['css-values-3', 'css-values-4'],
    specUrl: 'https://www.w3.org/TR/css-values-3/',
    css2Chapters: [4],
    keyConcept: {
      title: '核心概念',
      content:
        'CSS 不只是「属性: 值」的罗列——它有严谨的语法规则和类型系统。理解 CSS 的解析规则、值语法和单位体系，才能真正看懂规范文档，并理解浏览器为什么会忽略某些声明。',
    },
    sections: [
      {
        id: 'syntax-overview',
        number: '1',
        title: { zh: 'CSS 语法与词法分析', en: 'CSS Syntax & Tokenization' },
        specId: 'syntax',
        summary:
          '你写的 CSS 代码对浏览器来说只是一长串字符。浏览器要理解它，第一步就是「词法分析」（Tokenization）——像读句子先拆成一个个词语一样，把原始文本拆成一个个有意义的最小单元，叫做 Token。比如看到 color，浏览器识别出这是一个「标识符」（IDENT token）；看到 16px，识别出这是一个「带单位的数值」（DIMENSION token）；看到 {，识别出这是一个「左花括号」。这些 Token 组合起来，才构成规则集、声明、at-rule 等更高层的语法结构。理解 Token 是理解 CSS 解析的起点——浏览器为什么忽略某些写法、为什么空格在某些位置不能省略，都跟 Token 的拆分规则有关。',
        keyPoints: [
          '浏览器解析 CSS 分两步：① 词法分析（Tokenization）把文本拆成 Token 序列 → ② 语法分析把 Token 组合成规则树',
          'Token 就像自然语言中的「词」——是 CSS 语法的最小意义单位，不能再拆分',
          '主要 Token 类型：IDENT（标识符，如 color、flex）、HASH（# 开头，如 #main）、STRING（引号包裹的字符串）、NUMBER（纯数值）、DIMENSION（数值+单位，如 16px、2em）、PERCENTAGE（百分比）、FUNCTION（函数名+左括号，如 rgb(）、ATKEYWORD（@ 开头，如 @media）',
          '标点 Token：冒号 : 分隔属性名和值、分号 ; 结束声明、花括号 {} 包裹声明块、逗号 , 分隔选择器列表',
          'CSS 样式表 = 语句序列：规则集（ruleset = 选择器 + 声明块）和 at-rule（以 @ 开头的特殊规则）',
          '声明 = 属性名（IDENT）+ 冒号 + 属性值（一个或多个 Token）+ 可选的 !important + 分号',
          '注释 /* ... */ 被当作一个整体 Token，不影响解析其他内容',
          '规范 CSS2 §4.1.1 完整定义了所有 Token 类型及其匹配规则',
        ],
      },
      {
        id: 'parsing-errors',
        number: '2',
        title: { zh: '解析错误与容错', en: 'Error Handling & Recovery' },
        specId: 'parsing-errors',
        summary:
          'CSS 的容错设计是其最重要的特性之一，也是 CSS 能够持续演进的基础。当浏览器遇到不认识的属性名、无效的属性值、或完全看不懂的语法时，它不会像 JavaScript 那样报错中止——而是按照精确的规则跳过出错部分，继续解析后面的内容。这意味着你可以放心使用新特性：不支持的浏览器会自动忽略它，不影响其他样式。',
        keyPoints: [
          '无效的属性名或值 → 忽略整条声明，其他声明不受影响',
          '无法识别的选择器 → 忽略整个规则集（包括其中所有声明）',
          '花括号 {}、圆括号 ()、方括号 [] 必须配对——浏览器靠配对来判断跳过的范围',
          '字符串中的引号必须配对，否则后续内容可能被吞掉',
          '@import 之后出现的 @import 会被忽略',
          '这种「前向兼容」设计是渐进增强的基础：新属性（如 container-type）在旧浏览器中被安全忽略',
          '参见 CSS2 §4.2 和 §4.3.8（unsupported values）',
        ],
      },
      {
        id: 'value-definition',
        number: '3',
        title: { zh: '值定义语法', en: 'Value Definition Syntax' },
        specId: 'value-defs',
        summary:
          '每个 CSS 属性都有一个「值定义」，用一套专门的符号描述它接受什么样的值。这套符号是阅读 CSS 规范的钥匙——学会它，你就能自己查阅任何属性的合法取值，而不需要依赖二手资料。例如 border 属性的值定义是 <line-width> || <line-style> || <color>，表示三部分都可选、顺序任意。',
        keyPoints: [
          '尖括号 <type> 表示一个数据类型占位符：<length>、<color>、<string>、<integer> 等',
          '不带引号的字面关键字（如 auto、none、inherit）表示必须原样书写',
          '组合符号：空格（必须按序全部出现）、&&（全部出现，顺序任意）、||（出现一个或多个，顺序任意）、|（选其一）',
          '数量符号：?（0或1次）、*（0次或多次）、+（1次或多次）、{A,B}（A到B次）、#（逗号分隔的列表）',
          '优先级从低到高：| < || < && < 空格，可用方括号 [] 分组',
          '例：background-position: [ left | center | right ] || [ top | center | bottom ]',
        ],
      },
      {
        id: 'textual-values',
        number: '4',
        title: { zh: '关键字、字符串与 URL', en: 'Keywords, Strings & URLs' },
        specId: 'textual-values',
        summary:
          'CSS 中的文本值分几类：关键字（如 auto、inherit）是语言预定义的固定词；自定义标识符（如类名、动画名）遵循标识符命名规则；字符串用引号包裹；URL 用 url() 函数。理解它们的语法边界，能避免很多「为什么不生效」的困惑。',
        keyPoints: [
          'CSS 关键字不需要引号，如 display: flex 中 flex 是关键字',
          'CSS 大小写不敏感（属性名和关键字），但引用 HTML 的 class/id 时要注意 HTML 的大小写敏感性',
          '标识符命名规则：可包含字母、数字、-、_；不能以数字开头，不能以单个连字符开头',
          '字符串用单引号或双引号包裹（必须配对），字符串中的换行需要用 \\ 转义',
          'URL 语法两种形式：url("path/to/file") 或 url(path/to/file)（无引号时空格和括号需转义）',
          'CSS 全局关键字 initial、inherit、unset、revert 每个属性都可使用',
          'custom-ident 不能与 CSS 全局关键字重名（如 animation-name 不能叫 inherit）',
        ],
      },
      {
        id: 'characters-escaping',
        number: '5',
        title: { zh: '字符、转义与编码', en: 'Characters, Escaping & Encoding' },
        specId: 'characters',
        summary:
          'CSS 使用 Unicode 字符集。当需要在标识符或字符串中使用特殊字符（如引号、反斜杠、中文）时，可以通过反斜杠转义。CSS2 还定义了 @charset 规则来声明样式表的字符编码，不过在 UTF-8 普及的今天这个规则已经很少需要手动使用。',
        keyPoints: [
          '反斜杠 + 1-6 位十六进制数：\\26 表示 &（U+0026），\\4e2d 表示 中',
          '十六进制转义后如果紧跟合法的十六进制字符，需要加一个空格分隔：\\26 B 才是 &B',
          '反斜杠 + 任意非十六进制字符：直接转义，如 \\\\ 表示 \\，\\" 表示 "',
          '标识符中可以用转义写任意字符，比如类名 .\\31 a 匹配 class="1a"（因为 1a 不是合法标识符）',
          '@charset "UTF-8"; 必须是样式表的第一条语句（甚至前面不能有注释）',
          '实践中：确保文件保存为 UTF-8 编码，通常不需要手动写 @charset',
          '参见 CSS2 §4.1.3（characters and case）和 §4.4（style sheet representation）',
        ],
      },
      {
        id: 'vendor-extensions',
        number: '6',
        title: { zh: '厂商前缀与扩展', en: 'Vendor-Specific Extensions' },
        specId: 'escaping',
        summary:
          'CSS 预留了一个扩展机制：以连字符开头的标识符（如 -webkit-transform）属于厂商专有扩展（vendor-specific extensions），不在标准规范中定义。这个机制让浏览器厂商可以提前实验性地实现新特性，而不会与未来的标准属性名冲突。但滥用厂商前缀曾带来严重的兼容性问题，现在浏览器厂商已经改用「标志位」来控制实验性特性。',
        keyPoints: [
          '格式：以 - 或 _ 开头的属性名和属性值为厂商扩展',
          '常见前缀：-webkit-（Chrome/Safari）、-moz-（Firefox）、-ms-（IE/Edge Legacy）、-o-（旧 Opera）',
          '规范保证：以 - 开头的标识符永远不会成为标准属性名，所以不会产生命名冲突',
          '现代实践：大多数前缀已不需要——浏览器现在通过 flag 控制实验性特性，稳定后去掉前缀',
          '仍需前缀的少数属性：-webkit-line-clamp、-webkit-text-fill-color、-webkit-appearance 等',
          '书写顺序：带前缀的声明放前面，标准声明放最后（层叠覆盖原则）',
          '参见 CSS2 §4.1.2.1 Vendor-specific extensions',
        ],
      },
      {
        id: 'numeric-values',
        number: '7',
        title: { zh: '数值数据类型', en: 'Numeric Data Types' },
        specId: 'numeric-types',
        summary:
          'CSS 有严格的数值类型层次。从最基本的整数和小数，到带单位的维度值（dimension），再到百分比——每种属性只接受特定的数值类型。写错类型（比如给 z-index 写 10px）会导致整条声明被忽略。理解类型系统能帮你理解为什么某些值「明明看起来对，却不生效」。',
        keyPoints: [
          '<integer>：整数（正或负），如 z-index: 3、column-count: 2',
          '<number>：整数或小数，如 opacity: 0.5、line-height: 1.5、flex-grow: 2',
          '<dimension> = 数值 + 单位，是 <length>、<angle>、<time>、<frequency>、<resolution> 的上层类型',
          '<percentage> = 数值 + %，参照基准因属性而异：width/margin/padding → 包含块宽度；font-size → 父元素字号；line-height → 自身字号；vertical-align → 自身 line-height',
          '百分比不能在所有属性中使用——只有值定义中包含 <percentage> 的属性才接受百分比',
          '0 在长度上下文中可以省略单位（如 margin: 0），但在其他上下文中不行（如 rotate(0deg) 不能写 rotate(0)）',
          '科学记数法合法：1e2 = 100、1.5e-3 = 0.0015',
          '参见 CSS2 §4.3.1、§4.3.3 和 css-values-3 §4',
        ],
      },
      {
        id: 'length-units',
        number: '8',
        title: { zh: '长度单位', en: 'Length Units' },
        specId: 'lengths',
        summary:
          '长度是 CSS 中最常用的数据类型。CSS 长度单位分为「相对单位」（相对于字号、视口等动态参照）和「绝对单位」（固定物理尺寸）。选择合适的单位直接影响布局的灵活性和响应式效果。',
        keyPoints: [
          '字体相对单位：em（当前元素字号）、rem（根元素字号）、ex（x 字高）、ch（"0" 字宽）',
          'em 的参照因属性而异：font-size 中的 em 相对于父元素字号，其他属性中相对于自身字号',
          '视口单位：vw（视口宽1%）、vh（视口高1%）、vmin（取 vw/vh 小值）、vmax（取大值）',
          '动态视口单位（Level 4）：dvh/dvw（动态视口）、svh/svw（最小视口）、lvh/lvw（最大视口），适配移动端地址栏收起/展开',
          '容器查询单位（Level 4）：cqw/cqh（容器宽高的 1%）、cqi/cqb（容器行内/块方向的 1%），配合 container-type 使用',
          '绝对单位换算：1in = 2.54cm = 25.4mm = 72pt = 6pc = 96px',
          'px 不是物理像素——它是「参考像素」（reference pixel），约等于 1/96 英寸。在 2x Retina 屏上，1 CSS px = 2 物理像素',
          '参见 CSS2 §4.3.2、css-values-3 §5、css-values-4 §6',
        ],
      },
      {
        id: 'other-value-types',
        number: '9',
        title: { zh: '其他值类型', en: 'Other Value Types' },
        specId: 'color-units',
        summary:
          '除了数值和长度，CSS 还定义了颜色、时间、角度、分辨率等多种值类型。CSS2 中还定义了计数器（counter）这一特殊类型，用于自动编号。这些类型各有自己的单位和取值规则。',
        keyPoints: [
          '<color>：命名颜色（red）、十六进制（#ff0066、#f06）、函数（rgb()、hsl()）、CSS4 新增 oklch()、color-mix()',
          '<time>：s（秒）、ms（毫秒），用于 transition-duration、animation-duration 等',
          '<angle>：deg（度）、rad（弧度）、grad（梯度）、turn（圈），用于 rotate()、linear-gradient() 方向等',
          '<resolution>：dpi、dpcm、dppx，用于 @media 的分辨率查询',
          '<frequency>：Hz、kHz，CSS2 定义但实际很少使用',
          'counter() / counters()：引用 CSS 计数器的值，配合 counter-reset 和 counter-increment 实现自动编号',
          '参见 CSS2 §4.3.5-4.3.7、css-values-3 §6-7',
        ],
      },
      {
        id: 'math-functions',
        number: '10',
        title: { zh: '数学函数', en: 'Mathematical Functions' },
        specId: 'calc-notation',
        summary:
          'calc() 及其扩展函数让 CSS 值可以进行数学运算，打破了「一个值只能是一个固定量」的限制。这是实现真正灵活的响应式布局的重要工具——可以在不同单位之间做运算，让浏览器在渲染时动态计算最终值。',
        keyPoints: [
          'calc()：混合不同单位运算，如 width: calc(100% - 2rem) 让浏览器在布局时计算最终值',
          'calc() 中 + 和 - 两侧必须有空格（防止与正负号混淆），* 和 / 不要求',
          'calc() 有类型检查：length + length 合法，length + time 非法（10px + 5s 会被忽略）',
          'min() / max()：取最小或最大值，如 width: min(100%, 800px) 实现最大宽度约束',
          'clamp(min, val, max)：等价于 max(min, min(val, max))，如 font-size: clamp(1rem, 2.5vw, 2rem)',
          'CSS4 新增数学函数：round()、mod()、rem()、abs()、sign()、sin()、cos()、tan()、sqrt()、pow()、log()、exp()',
          '参见 css-values-3 §8、css-values-4 §10',
        ],
      },
    ],
  },

  selectors: {
    id: 'selectors',
    number: 3,
    title: { zh: '选择器', en: 'Selectors' },
    description: '从简单选择器到复杂组合，精确定位元素',
    status: 'locked',
    specs: ['selectors-3', 'selectors-4'],
    specUrl: 'https://www.w3.org/TR/selectors-3/',
    css2Chapters: [5],
    sections: [],
  },

  cascade: {
    id: 'cascade',
    number: 4,
    title: { zh: '层叠与继承', en: 'Cascading & Inheritance' },
    description: '层叠规则、来源优先级、特异性、继承、CSS 变量与层叠层',
    status: 'completed',
    specs: ['css-cascade-4', 'css-cascade-5', 'css-variables-1'],
    specUrl: 'https://www.w3.org/TR/css-cascade-4/',
    css2Chapters: [6],
    keyConcept: {
      title: '核心概念',
      content:
        'CSS 的 "C" 代表 Cascading（层叠）。当多条规则试图为同一个元素/属性设置值时，层叠机制决定哪条规则胜出。理解层叠是掌握 CSS 的关键。',
    },
    sections: [
      {
        id: 'intro',
        number: '1',
        title: { zh: '简介', en: 'Introduction' },
        summary: 'CSS 通过属性来控制文档的渲染。每个属性有名称、值域和行为定义。',
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
        summary:
          '@import 规则允许从其他样式表导入规则。导入的样式表被视为在 @import 位置展开。',
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
        summary: '简写属性允许同时设置多个相关属性的值。未指定的子属性会被重置为初始值。',
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
        summary:
          '从声明值到实际值的完整流程：declared → cascaded → specified → computed → used → actual',
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
        summary:
          '确定哪些声明适用于哪些元素。声明必须来自适用的样式表、匹配的选择器、有效的语法。',
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
        summary: '当多个声明作用于同一属性时，按来源、重要性、特异性、顺序决定最终值。',
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
        summary:
          '当层叠没有结果时，通过继承或初始值确定属性值。可以使用 initial、inherit、unset、revert 关键字。',
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
    description: '媒体类型、媒体特性与响应式设计基础',
    status: 'locked',
    specs: [],
    specUrl: 'https://www.w3.org/TR/mediaqueries-4/',
    css2Chapters: [7],
    sections: [],
  },

  'box-model': {
    id: 'box-model',
    number: 6,
    title: { zh: '盒模型', en: 'Box Model' },
    description: '盒子的四个区域、margin/padding/border、逻辑属性',
    status: 'current',
    specs: ['css-box-3', 'css-box-4', 'css-logical-1'],
    specUrl: 'https://www.w3.org/TR/css-box-3/',
    css2Chapters: [8],
    keyConcept: {
      title: '核心概念',
      content:
        '每个 CSS 元素都会生成一个矩形的盒子。这个盒子由四个区域组成：content（内容）、padding（内边距）、border（边框）、margin（外边距）。理解盒模型是掌握 CSS 布局的第一步。',
    },
    sections: [
      {
        id: 'intro',
        number: '1',
        title: { zh: '简介', en: 'Introduction' },
        specId: 'intro',
        summary:
          'CSS 将元素树转换为一组盒子，每个盒子有矩形的内容区域，以及可选的 padding、border 和 margin 区域。',
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
        summary:
          '每个盒子有 content area 及可选的 padding、border、margin 区域。各区域大小由对应属性控制，margin 可以为负值。',
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
        summary:
          'Margin 在 border edge 外围提供盒子之间的间距。支持 margin-top/right/bottom/left 和 margin 简写。',
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
        summary:
          'Padding 在 content edge 和 padding edge 之间提供间距。支持 padding-top/right/bottom/left 和 padding 简写。',
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
        summary:
          'Border 填充 border area，用于可视化标记盒子的边缘。边框属性包括宽度、样式和颜色，定义在 css-backgrounds-3 中。',
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
    description: 'display、格式化上下文、Normal Flow、浮动、定位、Flexbox、Grid',
    status: 'locked',
    specs: ['css-display-3', 'css-position-3', 'css-flexbox-1', 'css-grid-1', 'css-grid-2', 'css-multicol-1'],
    specUrl: 'https://www.w3.org/TR/css-display-3/',
    css2Chapters: [9],
    sections: [],
  },

  sizing: {
    id: 'sizing',
    number: 8,
    title: { zh: '尺寸计算与对齐', en: 'Sizing & Alignment' },
    description: 'width/height 计算规则、包含块、内在尺寸、盒对齐',
    status: 'locked',
    specs: ['css-align-3'],
    specUrl: 'https://www.w3.org/TR/css-align-3/',
    css2Chapters: [10],
    sections: [],
  },

  // ──────────────────────────────────────────────
  // 阶段 3：视觉表现
  // ──────────────────────────────────────────────

  'visual-effects': {
    id: 'visual-effects',
    number: 9,
    title: { zh: '视觉效果', en: 'Visual Effects' },
    description: 'overflow、裁剪、visibility',
    status: 'locked',
    specs: [],
    specUrl: 'https://www.w3.org/TR/CSS22/visufx.html',
    css2Chapters: [11],
    sections: [],
  },

  'generated-content': {
    id: 'generated-content',
    number: 10,
    title: { zh: '生成内容与列表', en: 'Generated Content & Lists' },
    description: '::before/::after、计数器、列表样式',
    status: 'locked',
    specs: [],
    specUrl: 'https://www.w3.org/TR/CSS22/generate.html',
    css2Chapters: [12],
    sections: [],
  },

  'colors-backgrounds': {
    id: 'colors-backgrounds',
    number: 11,
    title: { zh: '颜色与背景', en: 'Colors & Backgrounds' },
    description: '颜色模型、色彩空间、背景属性、渐变、圆角、阴影',
    status: 'locked',
    specs: ['css-color-4', 'css-color-5', 'css-backgrounds-3', 'css-images-3'],
    specUrl: 'https://www.w3.org/TR/css-color-4/',
    css2Chapters: [14],
    sections: [],
  },

  // ──────────────────────────────────────────────
  // 阶段 4：排版
  // ──────────────────────────────────────────────

  fonts: {
    id: 'fonts',
    number: 12,
    title: { zh: '字体', en: 'Fonts' },
    description: '字体选择、@font-face、字体匹配算法',
    status: 'locked',
    specs: ['css-fonts-4'],
    specUrl: 'https://www.w3.org/TR/css-fonts-4/',
    css2Chapters: [15],
    sections: [],
  },

  text: {
    id: 'text',
    number: 13,
    title: { zh: '文本与书写模式', en: 'Text & Writing Modes' },
    description: '文本属性、装饰、对齐、断行规则、书写方向',
    status: 'locked',
    specs: ['css-text-3', 'css-text-decor-3', 'css-writing-modes-4'],
    specUrl: 'https://www.w3.org/TR/css-text-3/',
    css2Chapters: [16],
    sections: [],
  },

  // ──────────────────────────────────────────────
  // 阶段 5：动态与前沿
  // ──────────────────────────────────────────────

  transforms: {
    id: 'transforms',
    number: 14,
    title: { zh: '变换、过渡与动画', en: 'Transforms, Transitions & Animations' },
    description: '2D/3D 变换、过渡效果、关键帧动画、缓动函数',
    status: 'locked',
    specs: ['css-transforms-1', 'css-transforms-2', 'css-transitions-1', 'css-animations-1', 'css-easing-1'],
    specUrl: 'https://www.w3.org/TR/css-transforms-1/',
    sections: [],
  },

  modern: {
    id: 'modern',
    number: 15,
    title: { zh: '现代 CSS 新特性', en: 'Modern CSS' },
    description: '容器查询、CSS 嵌套、@scope、content-visibility',
    status: 'locked',
    specs: ['css-contain-2'],
    specUrl: 'https://www.w3.org/TR/css-contain-2/',
    sections: [],
  },
};

// ============================================================
// CSS2.2 章节映射
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

/** 获取某个章节关联的 CSS2 规范名列表 */
export function getCSS2SpecNames(mod: Module): string[] {
  if (!mod.css2Chapters) return [];
  return mod.css2Chapters
    .filter((ch) => CSS2_CHAPTER_MAP[ch])
    .map((ch) => CSS2_CHAPTER_MAP[ch].specName);
}

// ============================================================
// 工具函数
// ============================================================

/** 获取所有章节的有序列表 */
export function getModuleList(): Module[] {
  return Object.values(modules).sort((a, b) => a.number - b.number);
}

/** 获取单个章节 */
export function getModule(slug: string): Module | undefined {
  return modules[slug];
}

/** 获取所有有效 slug（用于 generateStaticParams） */
export function getAllModuleSlugs(): string[] {
  return Object.keys(modules);
}

/** 获取章节的上一个/下一个章节 */
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

/** 获取某个阶段下的章节列表 */
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
