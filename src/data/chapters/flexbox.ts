import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'flex-container',
    number: '1',
    title: { zh: 'Flex 容器与格式化上下文', en: 'Flex Containers & Formatting Context' },
    summary: { zh: 'display: flex 或 inline-flex 使元素成为 flex 容器,建立 flex 格式化上下文(FFC)。flex 容器为其内容建立新的格式化上下文,子元素成为 flex 项目。', en: 'display: flex or inline-flex makes an element a flex container, establishing a flex formatting context (FFC). A flex container creates a new formatting context for its contents, with child elements becoming flex items.' },
    keyPoints: [
      'display: flex 生成块级 flex 容器,display: inline-flex 生成行内级 flex 容器',
      'flex 容器建立 flex 格式化上下文(flex formatting context),其中 flex 项目按 flex 布局规则排列',
      'flex 容器的子元素(不包括绝对定位元素)自动成为 flex 项目',
      '直接包含在 flex 容器中的文本会被包裹在匿名 flex 项目中',
      'flex 容器不是块容器:float 和 clear 在 flex 容器中不生效,vertical-align 对 flex 项目无效',
      'flex 容器的 column-* 属性不生效',
      '::first-line 和 ::first-letter 伪元素不适用于 flex 容器',
      'flex 容器会为绝对定位子元素建立包含块(如果 position 不是 static)',
    ],
    tutorial: [
      { type: 'heading', text: '什么是 Flex 容器?' },
      { type: 'paragraph', text: '任何 HTML 元素只要设置了 `display: flex` 或 `display: inline-flex`,就变成了一个 **flex 容器**。这个容器会建立一个全新的布局环境——**flex 格式化上下文**(Flex Formatting Context)。在这个环境中,子元素的排列、对齐、空间分配全部由 flex 规则接管,传统的块布局和行内布局规则不再适用。' },
      { type: 'paragraph', text: '理解 flex 容器的关键在于区分它的**外部表现**和**内部布局**。外部表现决定容器自身如何参与父级布局,内部布局决定子元素如何排列。这两者是独立的。' },

      { type: 'heading', text: '`display: flex` vs `display: inline-flex`' },
      { type: 'code', lang: 'css', caption: '两种 flex 容器的声明方式', code: `/* 块级 flex 容器:独占一行,宽度默认填满父元素 */\n.nav {\n  display: flex;\n}\n\n/* 行内级 flex 容器:与周围文本/行内元素并排,宽度由内容决定 */\n.tag-group {\n  display: inline-flex;\n}` },
      { type: 'example', title: '块级与行内级 flex 容器的区别', lang: 'html', code: `<!-- 块级:两个 nav 各占一行 -->\n<nav style="display: flex;">\n  <a href="/">首页</a>\n  <a href="/about">关于</a>\n</nav>\n<nav style="display: flex;">\n  <a href="/blog">博客</a>\n</nav>\n\n<!-- 行内级:两个 tag-group 在同一行 -->\n<span style="display: inline-flex; gap: 4px;">\n  <span>标签A</span><span>标签B</span>\n</span>\n<span style="display: inline-flex; gap: 4px;">\n  <span>标签C</span><span>标签D</span>\n</span>`, explanation: '`display: flex` 生成的容器在外部是**块级盒子**——就像 `<div>` 一样独占一行,宽度默认撑满父容器。`display: inline-flex` 生成的容器在外部是**行内级盒子**——就像 `<span>` 一样可以和其他行内内容并排,宽度由内容决定。但两者的**内部布局完全一样**,子元素都按 flex 规则排列。' },
      { type: 'tip', text: '选择哪一个取决于你希望容器本身如何参与父级布局。大多数情况用 `display: flex`(导航栏、卡片列表、页面布局);当你需要把一组元素嵌入行内文本流中时(如标签组、按钮组),用 `display: inline-flex`。' },

      { type: 'heading', text: 'Flex 格式化上下文:哪些规则被改变了?' },
      { type: 'paragraph', text: 'Flex 容器创建的格式化上下文(FFC)与块格式化上下文(BFC)有本质区别。在 FFC 中,许多传统 CSS 布局机制被禁用或改变了行为。理解这些差异可以避免很多困惑。' },
      { type: 'list', items: [
        '**`float` 和 `clear` 完全失效**:flex 项目不会浮动,即使显式设置 `float: left` 也会被忽略。`clear` 同样无效',
        '**`vertical-align` 无效**:这个属性只对行内盒子和表格单元格有用。在 flex 项目上,改用 `align-items` 或 `align-self`',
        '**`column-*` 属性被忽略**:`column-count`、`column-width` 等多列布局属性在 flex 容器上不生效',
        '**`::first-line` 和 `::first-letter` 不适用**:这两个伪元素只适用于块容器,flex 容器不是块容器',
        '**margin 不折叠**:flex 项目之间、flex 项目与容器之间的 margin 永远不会折叠(这与块布局不同)'
      ] },
      { type: 'warning', text: '如果你在 flex 容器内给子元素设置了 `float`,它不会报错,但也不会有任何效果。这是从传统布局迁移到 flexbox 时最常见的困惑来源。直接删掉 `float`,用 flex 属性来控制布局。' },

      { type: 'heading', text: '匿名 Flex 项目' },
      { type: 'paragraph', text: 'Flex 容器的直接子元素自动成为 flex 项目。但如果容器中直接包含**裸文本**(不被任何元素包裹的文本节点),这些文本会被自动包裹在**匿名 flex 项目**中参与布局。' },
      { type: 'example', title: '文本节点如何变成匿名 flex 项目', lang: 'html', code: `<div style="display: flex; gap: 10px;">\n  Hello\n  <span>World</span>\n  CSS\n</div>\n\n<!-- 等价于 -->\n<div style="display: flex; gap: 10px;">\n  <anonymous>Hello</anonymous>\n  <span>World</span>\n  <anonymous>CSS</anonymous>\n</div>`, explanation: '上例产生 3 个 flex 项目:匿名项目 "Hello"、`<span>` 元素、匿名项目 "CSS"。每段连续的非空白文本构成一个独立的匿名 flex 项目。但**纯空白文本**(只有空格、换行)会被忽略,不产生匿名项目。匿名 flex 项目无法直接被 CSS 选择器选中,所以你不能给它设置样式——这意味着最好把文本包裹在元素中。' },

      { type: 'heading', text: '绝对定位子元素与 Flex 容器' },
      { type: 'paragraph', text: 'Flex 容器中的绝对定位子元素(`position: absolute` 或 `fixed`)**不是 flex 项目**,不参与 flex 布局。但如果 flex 容器自身是定位元素(`position` 不是 `static`),它会成为这些绝对定位子元素的**包含块**。' },
      { type: 'code', lang: 'html', caption: '绝对定位子元素相对于 flex 容器定位', code: `<div style="display: flex; position: relative; height: 200px;">\n  <div>正常 flex 项目</div>\n  <div>正常 flex 项目</div>\n  <!-- 这个不参与 flex 布局,但相对于 flex 容器定位 -->\n  <div style="position: absolute; top: 10px; right: 10px;">\n    悬浮按钮\n  </div>\n</div>` },
      { type: 'tip', text: '实际开发中,经常在 flex 容器上设置 `position: relative`,然后在里面放一个 `position: absolute` 的徽标或关闭按钮。这个绝对定位元素不会影响 flex 布局,但可以精确定位在容器内的任意位置。' },
    ] as TutorialBlock[],
  },
  {
    id: 'flex-items',
    number: '2',
    title: { zh: 'Flex 项目', en: 'Flex Items' },
    summary: { zh: 'flex 容器的每个流内子元素都会成为 flex 项目。flex 项目建立独立的格式化上下文用于其内容,类型由 display 值决定。', en: 'Each in-flow child of a flex container becomes a flex item. Flex items establish an independent formatting context for their contents, with the type determined by their display value.' },
    keyPoints: [
      'flex 容器的流内子元素自动成为 flex 项目并参与 flex 布局',
      '绝对定位的子元素不是 flex 项目,但仍以 flex 容器作为包含块,并可以参与 flex 容器的静态位置计算',
      'flex 项目的 display 值被"块级化":inline 变为 block,inline-table 变为 table 等',
      'flex 项目的 margin 不会与相邻 flex 项目或 flex 容器的 margin 折叠',
      'flex 项目的 margin 为 auto 时可以吸收额外空间,用于对齐',
      'visibility: collapse 在 flex 项目上会使其完全从渲染中移除,但仍占据 flex 布局计算中的交叉轴空间',
      'flex 项目的 min-width 和 min-height 的 auto 值会计算为自动最小尺寸(automatic minimum size),基于内容尺寸和 flex-basis',
      'flex 项目按 order 属性值分组排列,相同 order 值的项目按源文档顺序排列',
      'flex 项目的 z-index 不是 auto 时会创建层叠上下文,即使 position 为 static',
    ],
    tutorial: [
      { type: 'heading', text: '哪些元素会成为 Flex 项目?' },
      { type: 'paragraph', text: 'Flex 容器的每个**流内直接子元素**都会自动成为 flex 项目。"流内"(in-flow)的意思是没有被 `position: absolute/fixed` 移出文档流。注意是**直接子元素**——孙子元素不会成为 flex 项目。' },
      { type: 'code', lang: 'html', caption: '只有直接子元素是 flex 项目', code: `<div style="display: flex;">    <!-- flex 容器 -->\n  <div>我是 flex 项目</div>     <!-- ✅ 直接子元素 -->\n  <span>我也是</span>           <!-- ✅ 行内元素也是 -->\n  裸文本也是                    <!-- ✅ 匿名 flex 项目 -->\n  <div>\n    <p>我不是 flex 项目</p>    <!-- ❌ 我是孙子元素 -->\n  </div>\n</div>` },
      { type: 'list', items: [
        '**是 flex 项目**:`<div>`、`<span>`、`<a>`、`<img>` 等任何流内直接子元素',
        '**是 flex 项目**:直接包含的非空白文本节点(包裹为匿名 flex 项目)',
        '**不是 flex 项目**:`position: absolute` 或 `position: fixed` 的子元素(脱离了文档流)',
        '**不是 flex 项目**:`display: none` 的子元素(不生成盒子)',
        '**不是 flex 项目**:孙子元素(只有直接子元素才算)'
      ] },

      { type: 'heading', text: 'Display 值的"块级化"' },
      { type: 'paragraph', text: '当一个元素成为 flex 项目后,它的 `display` 值会被自动调整——规范称之为**blockification**(块级化)。行内级的 display 值会被提升为对应的块级值,确保每个 flex 项目在内部可以建立完整的格式化上下文。' },
      { type: 'code', lang: 'css', caption: '成为 flex 项目后的 display 值变化', code: `/* 原始 display → 块级化后的 display */\ninline        → block\ninline-block  → block\ninline-table  → table\ninline-flex   → flex\ninline-grid   → grid\n\n/* 这些不变 */\nblock         → block\nflex          → flex\ngrid          → grid` },
      { type: 'tip', text: '这意味着你不需要在 flex 项目上手动设置 `display: block`——它会自动发生。一个 `<span>` 成为 flex 项目后,行为就像 `block` 一样,可以设置宽高。' },

      { type: 'heading', text: 'Flex 项目的 Margin 行为' },
      { type: 'paragraph', text: 'Flex 项目的 margin 有两个与块布局截然不同的特性:第一,**margin 永远不会折叠**;第二,**`margin: auto` 可以吸收剩余空间**。' },
      { type: 'example', title: 'Margin 不折叠 vs 块布局的 margin 折叠', lang: 'html', code: `<!-- 块布局:两个 20px margin 折叠为 20px -->\n<div>\n  <div style="margin-bottom: 20px;">块A</div>\n  <div style="margin-top: 20px;">块B</div>\n  <!-- A和B之间实际间距:20px(折叠) -->\n</div>\n\n<!-- Flex 布局:两个 20px margin 不折叠,总共 40px -->\n<div style="display: flex; flex-direction: column;">\n  <div style="margin-bottom: 20px;">项目A</div>\n  <div style="margin-top: 20px;">项目B</div>\n  <!-- A和B之间实际间距:40px(不折叠) -->\n</div>`, explanation: '在块布局中,相邻块的垂直 margin 会**折叠**(取较大值)。但在 flex 布局中,flex 项目之间的 margin **永远不折叠**,两个 margin 会完整地叠加。这种行为更可预测,但如果你从块布局迁移过来,需要注意间距可能比预期大。' },
      { type: 'example', title: '`margin: auto` 吸收剩余空间', lang: 'html', code: `<nav style="display: flex; padding: 10px;">\n  <a href="/">Logo</a>\n  <a href="/home">首页</a>\n  <a href="/about">关于</a>\n  <!-- margin-left: auto 把"登录"推到最右边 -->\n  <a href="/login" style="margin-left: auto;">登录</a>\n</nav>`, explanation: '当 flex 项目的 margin 设置为 `auto` 时,它会**吸收该方向上所有的剩余空间**。上例中"登录"链接的 `margin-left: auto` 会吞掉左侧所有可用空间,把它推到导航栏最右边。这是实现"左侧几个+右侧几个"布局的最简洁方式,无需任何额外的包裹元素。' },

      { type: 'heading', text: '`min-width: auto` —— 最常见的陷阱' },
      { type: 'paragraph', text: '在块布局中,`min-width` 和 `min-height` 的默认值是 `0`。但在 flex 布局中,flex 项目的默认值是 `auto`,规范称之为**自动最小尺寸**(automatic minimum size)。这意味着 flex 项目默认不会收缩到小于其内容的最小尺寸。' },
      { type: 'example', title: '文本溢出:min-width: auto 的坑', lang: 'css', code: `.sidebar {\n  display: flex;\n  width: 300px;\n}\n\n.sidebar-content {\n  flex: 1;\n  /* 问题:如果内容有一个很长的 URL 或单词,\n     min-width: auto 会阻止收缩,导致溢出 */\n}\n\n/* 解决方案 1:显式设置 min-width */\n.sidebar-content {\n  flex: 1;\n  min-width: 0;  /* 允许收缩到 0 */\n}\n\n/* 解决方案 2:用 overflow 触发 BFC */\n.sidebar-content {\n  flex: 1;\n  overflow: hidden; /* 或 overflow: auto */\n}`, explanation: '当 flex 项目内部有不可断行的长内容(长 URL、`<pre>` 代码块、固定宽度的子元素)时,`min-width: auto` 会阻止项目收缩到小于内容宽度,导致项目溢出容器。**解决方案**:设置 `min-width: 0`(允许无限收缩)或 `overflow: hidden/auto`(建立新的 BFC,裁剪溢出内容)。' },
      { type: 'warning', text: '`min-width: auto` 是 flex 布局中**排名第一的 bug 来源**。症状:flex 项目不收缩、内容溢出容器、文本不截断。每当你遇到 flex 项目"不听话"地溢出时,第一反应应该检查是否需要 `min-width: 0`。在 `flex-direction: column` 的容器中,对应地检查 `min-height: 0`。' },

      { type: 'heading', text: 'Z-index 与层叠上下文' },
      { type: 'paragraph', text: 'Flex 项目有一个特殊能力:即使 `position` 是 `static`,设置 `z-index` 也能创建**层叠上下文**。在普通块布局中,`z-index` 只对定位元素(`position: relative/absolute/fixed`)有效。' },
      { type: 'code', lang: 'css', caption: 'flex 项目的 z-index 不需要 position', code: `.card-stack {\n  display: flex;\n}\n\n.card {\n  /* 不需要 position: relative! */\n  z-index: 1;  /* 在 flex 项目上直接生效,创建层叠上下文 */\n}\n\n.card:hover {\n  z-index: 10; /* 悬停时提升层级 */\n}` },

      { type: 'heading', text: '`visibility: collapse`' },
      { type: 'paragraph', text: '`visibility: collapse` 在 flex 项目上有特殊语义:项目从**渲染中完全移除**(不可见、不可点击),但它在**交叉轴方向仍然占据空间**,不会导致 flex 线的高度/宽度发生变化。这对于需要隐藏某些项目但保持布局稳定的场景(如过滤列表、选项卡切换)有用,但浏览器的实际实现不太统一,实践中建议用其他方式实现类似效果。' },
    ] as TutorialBlock[],
  },
  {
    id: 'flex-flow',
    number: '3',
    title: { zh: '排列方向与换行', en: 'Flex Flow: Direction & Wrapping' },
    summary: { zh: 'flex-direction 定义主轴方向,flex-wrap 控制是否换行。flex-flow 是这两个属性的简写。order 属性控制 flex 项目的视觉顺序。', en: 'flex-direction defines the main axis direction, flex-wrap controls wrapping. flex-flow is a shorthand for these two properties. The order property controls the visual order of flex items.' },
    keyPoints: [
      'flex-direction 决定主轴(main axis)方向:row(水平,默认)、row-reverse、column(垂直)、column-reverse',
      'row 和 row-reverse 使主轴为水平方向,column 和 column-reverse 使主轴为垂直方向',
      'reverse 值会翻转主轴的起点和终点,影响 flex 项目的排列方向和对齐方式',
      'flex-wrap 控制 flex 容器是单行(nowrap,默认)还是多行(wrap、wrap-reverse)',
      'flex-wrap: wrap 允许 flex 项目换行,创建多条 flex 线(flex lines)',
      'flex-wrap: wrap-reverse 使 flex 线的排列方向反转(交叉轴起点和终点互换)',
      'flex-flow 是 flex-direction 和 flex-wrap 的简写,如 flex-flow: row wrap',
      'order 属性改变 flex 项目的视觉顺序,默认值为 0,值越小越靠前',
      'order 只影响视觉呈现和绘制顺序,不改变源文档顺序、语音呈现顺序或 tab 键导航顺序',
      'flex 线(flex line)是 flex 容器中的假想线,flex 项目沿 flex 线排列;单行 flex 容器只有一条 flex 线',
    ],
    tutorial: [
      { type: 'heading', text: '主轴与交叉轴:Flex 布局的坐标系' },
      { type: 'paragraph', text: '理解 flex 布局的第一步是理解它的**坐标系**。Flex 布局有两根轴:**主轴**(main axis)和**交叉轴**(cross axis)。主轴是 flex 项目排列的方向,交叉轴始终与主轴垂直。所有的 flex 属性都围绕这两根轴工作:`justify-content` 控制主轴方向,`align-items` 控制交叉轴方向。' },
      { type: 'paragraph', text: '关键点在于:**主轴不一定是水平的**。`flex-direction` 决定了主轴的方向。当你改变 `flex-direction` 时,所有基于"主轴"和"交叉轴"的属性的作用方向也随之改变。' },

      { type: 'heading', text: '`flex-direction`:定义主轴方向' },
      { type: 'code', lang: 'css', caption: 'flex-direction 的 4 个值及其坐标系', code: `/* row(默认):主轴 → 水平从左到右,交叉轴 ↓ 垂直从上到下 */\n.horizontal {\n  flex-direction: row;\n  /* [项目1] [项目2] [项目3] → */\n}\n\n/* row-reverse:主轴 ← 水平从右到左,交叉轴 ↓ 不变 */\n.horizontal-reverse {\n  flex-direction: row-reverse;\n  /* ← [项目3] [项目2] [项目1] */\n}\n\n/* column:主轴 ↓ 垂直从上到下,交叉轴 → 水平从左到右 */\n.vertical {\n  flex-direction: column;\n  /* [项目1]\n     [项目2]\n     [项目3]\n       ↓      */\n}\n\n/* column-reverse:主轴 ↑ 垂直从下到上,交叉轴 → 不变 */\n.vertical-reverse {\n  flex-direction: column-reverse;\n  /*   ↑\n     [项目3]\n     [项目2]\n     [项目1] */\n}` },
      { type: 'example', title: '切换 flex-direction 如何影响 justify-content', lang: 'css', code: `/* 水平居中 */\n.center-h {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;  /* ← justify 作用于水平主轴 */\n}\n\n/* 垂直居中 */\n.center-v {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  justify-content: center;  /* ← 同样的属性,但现在作用于垂直主轴 */\n}`, explanation: '同一个 `justify-content: center`,在 `flex-direction: row` 中是水平居中,在 `flex-direction: column` 中是垂直居中。理解这一点就理解了 flex 布局的核心:所有对齐属性都基于**轴**,而不是基于"水平/垂直"方向。' },
      { type: 'tip', text: '`row` 和 `row-reverse` 的主轴方向与文档的**书写模式**(writing mode)有关。在从左到右的语言(如中英文)中,`row` 是从左到右;在从右到左的语言(如阿拉伯语)中,`row` 是从右到左。`column` 则始终是从上到下(block flow direction)。' },

      { type: 'heading', text: '`flex-wrap`:单行还是多行?' },
      { type: 'paragraph', text: '默认情况下,flex 容器是**单行**的(`flex-wrap: nowrap`)。所有 flex 项目被强制挤在一条线上——如果空间不够,项目会被收缩(根据 `flex-shrink`),或者溢出容器。设置 `flex-wrap: wrap` 可以创建**多行** flex 容器,允许项目自动换行。' },
      { type: 'code', lang: 'css', caption: '单行 vs 多行 flex 容器', code: `/* 单行(默认):所有项目挤在一行,可能被压缩 */\n.single-line {\n  display: flex;\n  flex-wrap: nowrap;\n  /* [项目1][项目2][项目3][项目4][项目5] 全挤一行 */\n}\n\n/* 多行:放不下自动换行 */\n.multi-line {\n  display: flex;\n  flex-wrap: wrap;\n  /* [项目1][项目2][项目3]\n     [项目4][项目5]         换行了 */\n}\n\n/* 多行反转:行的堆叠方向反转 */\n.multi-line-reverse {\n  display: flex;\n  flex-wrap: wrap-reverse;\n  /* [项目4][项目5]         最后一行在上面\n     [项目1][项目2][项目3]  第一行在下面 */\n}` },
      { type: 'example', title: '用 flex-wrap 实现响应式卡片网格', lang: 'css', code: `.card-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.card {\n  flex: 1 1 300px;\n  /* flex-basis: 300px → 每张卡片至少 300px\n     flex-grow: 1     → 有多余空间时均匀扩展\n     flex-shrink: 1   → 如果一行只能放一张,允许收缩 */\n}`, explanation: '这是 flexbox 实现响应式网格的经典模式。`flex: 1 1 300px` 让卡片最小 300px,有空间就均匀扩展。配合 `flex-wrap: wrap`,宽屏可以一行显示 3-4 张卡片,窄屏自动换行到 2 张或 1 张。无需任何媒体查询!' },
      { type: 'warning', text: '`flex-wrap: wrap-reverse` 只反转**行的堆叠方向**(交叉轴方向),不反转行内项目的顺序。如果需要反转项目顺序,用 `flex-direction: row-reverse`。两者可以组合使用。' },

      { type: 'heading', text: '`flex-flow` 简写属性' },
      { type: 'paragraph', text: '`flex-flow` 是 `flex-direction` 和 `flex-wrap` 的简写,可以同时设置两个值。值的顺序无关紧要,浏览器能根据关键字自动识别。' },
      { type: 'code', lang: 'css', caption: 'flex-flow 常用组合', code: `.horizontal-wrap {\n  flex-flow: row wrap;       /* 最常见:水平排列,可换行 */\n}\n\n.vertical-nowrap {\n  flex-flow: column;         /* 省略 wrap → 默认 nowrap */\n}\n\n.reverse-wrap {\n  flex-flow: row-reverse wrap; /* 从右到左排列,可换行 */\n}` },

      { type: 'heading', text: 'Flex 线(Flex Lines)' },
      { type: 'paragraph', text: 'Flex 线是 flex 容器中的**假想行**(或列)。Flex 项目沿 flex 线排列。单行容器(`nowrap`)只有一条 flex 线,多行容器(`wrap`)可以有多条。每条 flex 线独立进行**主轴方向的空间分配**(`justify-content`)和**交叉轴方向的项目对齐**(`align-items`)。' },
      { type: 'paragraph', text: '`align-content` 控制的是**多条 flex 线之间的间距和对齐**,而 `align-items` 控制的是**每条 flex 线内部项目的对齐**。这是一个重要的区分——`align-content` 只在多行容器中有效。' },

      { type: 'heading', text: '`order`:视觉重排序' },
      { type: 'paragraph', text: '`order` 属性允许你改变 flex 项目的**视觉显示顺序**,而不修改 HTML 源码。默认值是 `0`,值越小的项目越靠前。相同 `order` 值的项目按照它们在 HTML 源码中的顺序排列。' },
      { type: 'example', title: '用 order 实现移动端优先的布局', lang: 'css', code: `.layout {\n  display: flex;\n  flex-direction: column;\n}\n\n/* HTML 顺序:sidebar, main, footer\n   移动端显示顺序:main(重要内容优先), sidebar, footer */\n.main    { order: -1; }  /* 提到最前面 */\n.sidebar { order: 0;  }  /* 默认位置 */\n.footer  { order: 1;  }  /* 放到最后 */\n\n/* 桌面端恢复正常顺序 */\n@media (min-width: 768px) {\n  .layout {\n    flex-direction: row;\n  }\n  .main    { order: 0; }\n  .sidebar { order: -1; }\n  .footer  { order: 1; }\n}`, explanation: '`order` 的一个实用场景:移动端优先显示主要内容(`order: -1` 把它提到最前),桌面端恢复正常侧边栏-内容的顺序。负数也是合法的 `order` 值,会排在默认值 `0` 之前。' },
      { type: 'warning', text: '**无障碍警告**:`order` 只改变视觉呈现,不改变**Tab 键导航顺序**、**屏幕阅读器的朗读顺序**和 **DOM 顺序**。如果视觉顺序和源码顺序差异很大,键盘用户会发现焦点跳来跳去,非常混乱。W3C 规范明确建议:不要用 `order` 来修复逻辑顺序问题,应该修改 HTML 源码。' },
      { type: 'tip', text: '`order` 也影响 flex 项目的**绘制顺序**(painting order)。同一层叠上下文中,`order` 越大的项目越后绘制,可能覆盖 `order` 小的项目(在没有设置 `z-index` 的情况下)。' },
    ] as TutorialBlock[],
  },
  {
    id: 'flex-sizing',
    number: '4',
    title: { zh: '弹性尺寸计算', en: 'Flexibility & Sizing' },
    summary: { zh: 'flex-grow、flex-shrink 和 flex-basis 控制 flex 项目如何分配空间。flex 是这三个属性的简写。flex 布局算法计算 flex 项目的最终尺寸。', en: 'flex-grow, flex-shrink, and flex-basis control how flex items distribute space. flex is a shorthand for these three properties. The flex layout algorithm computes the final sizes of flex items.' },
    keyPoints: [
      'flex-basis 定义 flex 项目在主轴方向上的初始尺寸,默认值为 auto(使用 width/height)',
      'flex-basis 的值可以是长度、百分比(相对于 flex 容器主轴尺寸)、auto 或 content',
      'flex-basis: content 使 flex 项目基于其内容的尺寸(基本同 max-content)',
      'flex-grow 定义 flex 项目的扩展因子,决定如何分配剩余空间,默认值为 0(不扩展)',
      'flex-grow > 0 的 flex 项目会按比例分配 flex 容器的剩余空间',
      'flex-shrink 定义 flex 项目的收缩因子,决定空间不足时如何收缩,默认值为 1',
      'flex-shrink: 0 使 flex 项目不收缩,即使空间不足也保持 flex-basis 尺寸',
      'flex 简写属性接受 1-3 个值:<flex-grow> <flex-shrink>? <flex-basis>?',
      'flex: initial 等同于 flex: 0 1 auto(不扩展,可收缩,基于 width/height)',
      'flex: auto 等同于 flex: 1 1 auto(可扩展可收缩,基于 width/height)',
      'flex: none 等同于 flex: 0 0 auto(不扩展不收缩,基于 width/height)',
      'flex: <number> 等同于 flex: <number> 1 0(常见简写,如 flex: 1 表示平分空间)',
      'flex 算法步骤:生成匿名 flex 项目 → 确定 flex-basis → 收集 flex 项目到 flex 线 → 解析弹性长度 → 确定主轴尺寸 → 确定交叉轴尺寸 → 主轴对齐 → 交叉轴对齐',
      '假想主轴尺寸(hypothetical main size):flex 项目在不考虑弹性的情况下的主轴尺寸,用于弹性计算的起点',
      'flex 项目的最终主轴尺寸受 min-width/min-height 和 max-width/max-height 约束',
    ],
    tutorial: [
      { type: 'heading', text: '空间分配的心智模型' },
      { type: 'paragraph', text: 'Flexbox 的核心使命是**分配空间**。整个弹性计算可以用一句话概括:先看每个 flex 项目"想要"多少空间(`flex-basis`),再看容器里有多少**剩余空间**或**不足空间**,最后按比例分配(`flex-grow`)或吸收(`flex-shrink`)。' },
      { type: 'paragraph', text: '想象一个 600px 宽的 flex 容器,里面有 3 个 flex 项目,每个 `flex-basis: 100px`,总共"想要"300px。容器里还剩 300px 空间。如果三个项目都设置 `flex-grow: 1`,这 300px 会被**等分**,每个得到 100px,最终宽度都是 200px。如果一个 `flex-grow: 2`,另两个 `flex-grow: 1`,那个 `2` 的得到 150px,另两个各得 75px。' },

      { type: 'heading', text: '`flex-basis`:起始尺寸' },
      { type: 'paragraph', text: '`flex-basis` 定义 flex 项目在主轴方向上的**初始尺寸**,是弹性计算的起点。它与 `width`/`height` 的关系容易混淆,规则如下:' },
      { type: 'list', items: [
        '`flex-basis` 的优先级**高于** `width`(在 `flex-direction: row` 时)或 `height`(在 `flex-direction: column` 时)',
        '`flex-basis: auto`(默认值):回退到 `width`/`height` 的值;如果 `width`/`height` 也是 `auto`,则由内容决定',
        '`flex-basis: 0`:忽略内容和 `width`/`height`,从 0 开始分配——这意味着空间完全由 `flex-grow` 比例决定',
        '`flex-basis: content`:始终基于内容的尺寸,不看 `width`/`height`',
        '百分比值:相对于 flex 容器的**主轴内部尺寸**计算'
      ] },
      { type: 'code', lang: 'css', caption: 'flex-basis 的各种取值', code: `.item-px {\n  flex-basis: 200px;   /* 固定起始尺寸 200px */\n  width: 100px;        /* 被 flex-basis 覆盖,不生效 */\n}\n\n.item-auto {\n  flex-basis: auto;    /* 默认:看 width → 看内容 */\n  width: 150px;        /* 生效!因为 flex-basis 是 auto */\n}\n\n.item-zero {\n  flex-basis: 0;       /* 从 0 开始,完全由 flex-grow 决定 */\n}\n\n.item-pct {\n  flex-basis: 50%;     /* 容器主轴尺寸的一半 */\n}` },
      { type: 'warning', text: '当 `flex-basis` 和 `width` 同时存在且 `flex-basis` 不是 `auto` 时,`width` 被完全忽略。但 `min-width` 和 `max-width` 始终生效——它们会约束 flex 项目的最终尺寸,优先级高于 `flex-basis` 和弹性计算的结果。' },

      { type: 'heading', text: '`flex-grow`:分配剩余空间' },
      { type: 'paragraph', text: '当 flex 容器有**剩余空间**(项目的 `flex-basis` 总和 < 容器尺寸)时,`flex-grow` 决定每个项目分到多少。默认值是 `0`——不扩展,保持 `flex-basis` 尺寸。' },
      { type: 'example', title: '理解 flex-grow 的分配公式', lang: 'css', code: `/* 容器宽度: 800px */\n.container { display: flex; width: 800px; }\n\n/* 项目A: basis 100px, grow 1\n   项目B: basis 200px, grow 2\n   项目C: basis 100px, grow 1 */\n\n/* 计算过程:\n   1. 总 basis = 100 + 200 + 100 = 400px\n   2. 剩余空间 = 800 - 400 = 400px\n   3. grow 总和 = 1 + 2 + 1 = 4\n   4. A 得到: 400 × (1/4) = 100px → 最终 100 + 100 = 200px\n      B 得到: 400 × (2/4) = 200px → 最终 200 + 200 = 400px\n      C 得到: 400 × (1/4) = 100px → 最终 100 + 100 = 200px\n*/`, explanation: '`flex-grow` 的公式:**项目额外空间 = 剩余空间 × (该项目的 grow / 所有项目的 grow 总和)**。注意 `flex-grow` 分配的是**剩余空间**,不是总空间。所以 `flex-grow: 2` 的项目不是另一个的两倍宽——它只是在剩余空间中分到了两倍。' },
      { type: 'tip', text: '`flex-grow` 不一定是整数,小数也完全合法。`flex-grow: 0.5` 表示分到剩余空间的一部分。如果只有一个项目 `flex-grow: 0.5`,它会分到剩余空间的 50%(不是全部!)。只有当所有 grow 值的总和 ≥ 1 时,剩余空间才会被完全分配。' },

      { type: 'heading', text: '`flex-shrink`:吸收溢出空间' },
      { type: 'paragraph', text: '当 flex 容器的空间**不足**(项目的 `flex-basis` 总和 > 容器尺寸)时,`flex-shrink` 决定每个项目收缩多少。默认值是 `1`——可收缩。设为 `0` 则该项目拒绝收缩。' },
      { type: 'example', title: '`flex-shrink` 的加权收缩', lang: 'css', code: `/* 容器宽度: 500px */\n.container { display: flex; width: 500px; }\n\n/* 项目A: basis 300px, shrink 1\n   项目B: basis 200px, shrink 2\n   项目C: basis 200px, shrink 1 */\n\n/* 计算过程:\n   1. 总 basis = 300 + 200 + 200 = 700px\n   2. 溢出空间 = 700 - 500 = 200px\n   3. 加权因子 = A(300×1) + B(200×2) + C(200×1)\n              = 300 + 400 + 200 = 900\n   4. A 收缩: 200 × (300/900) = 66.7px → 最终 233.3px\n      B 收缩: 200 × (400/900) = 88.9px → 最终 111.1px\n      C 收缩: 200 × (200/900) = 44.4px → 最终 155.6px\n*/`, explanation: '`flex-shrink` 的计算比 `flex-grow` 复杂:**收缩量按 `flex-shrink × flex-basis` 的加权比例分配**。这意味着 `flex-basis` 大的项目会收缩得更多,即使 `flex-shrink` 值相同。这是合理的——一个 500px 的项目和一个 50px 的项目按相同比例收缩,500px 的应该让出更多空间。' },
      { type: 'tip', text: '设置 `flex-shrink: 0` 可以让项目**拒绝收缩**,保持 `flex-basis` 的尺寸。常见场景:固定宽度的侧边栏(`flex: 0 0 250px`)、图标/头像(`flex-shrink: 0`)等不希望被压缩的元素。' },

      { type: 'heading', text: '`flex` 简写:你应该总是用它' },
      { type: 'paragraph', text: '`flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写。规范**强烈建议**使用简写而非单独设置,因为简写会自动设置合理的默认值(单独设置时容易出错)。' },
      { type: 'code', lang: 'css', caption: '`flex` 简写的 4 个关键字值', code: `/* flex: initial  =  flex: 0 1 auto\n   不扩展, 可收缩, 基于内容/width\n   → 项目保持自然尺寸, 空间不够时收缩 */\n.default { flex: initial; }\n\n/* flex: auto  =  flex: 1 1 auto\n   可扩展, 可收缩, 基于内容/width\n   → 项目在自然尺寸基础上弹性伸缩 */\n.flexible { flex: auto; }\n\n/* flex: none  =  flex: 0 0 auto\n   不扩展, 不收缩, 基于内容/width\n   → 完全固定尺寸, "刚性" 项目 */\n.rigid { flex: none; }\n\n/* flex: 1  =  flex: 1 1 0\n   可扩展, 可收缩, 忽略内容尺寸\n   → 所有项目平分容器空间 */\n.equal-share { flex: 1; }` },
      { type: 'example', title: '经典布局:固定侧边栏 + 弹性内容区', lang: 'css', code: `.layout {\n  display: flex;\n  height: 100vh;\n}\n\n.sidebar {\n  flex: 0 0 250px;    /* 固定 250px, 不扩展不收缩 */\n}\n\n.content {\n  flex: 1;            /* 占据所有剩余空间 */\n  min-width: 0;       /* 防止内容溢出 */\n}\n\n.aside {\n  flex: 0 0 200px;    /* 固定 200px */\n}`, explanation: '`flex: 0 0 250px`(即 `flex: none` + 自定义 basis)创建一个固定宽度的侧边栏。`flex: 1` 让内容区占据所有剩余空间。别忘了给弹性内容区加 `min-width: 0`,防止内部长内容导致溢出。' },
      { type: 'warning', text: '`flex: 1` 和 `flex: auto` 的区别至关重要!`flex: 1` 的 `flex-basis` 是 `0`,所有空间从零开始按 `flex-grow` 比例分配,结果是**等宽**(无视内容量)。`flex: auto` 的 `flex-basis` 是 `auto`,先按内容确定基础尺寸,再把**剩余空间**按比例分配,结果是**内容多的项目更宽**。' },

      { type: 'heading', text: 'Flex 布局算法总览' },
      { type: 'paragraph', text: '浏览器按以下步骤计算 flex 项目的最终尺寸。理解这个算法有助于理解各种"意外"行为:' },
      { type: 'list', ordered: true, items: [
        '**生成 flex 项目**:确定哪些子元素是 flex 项目,为裸文本创建匿名项目',
        '**确定 flex-basis**:计算每个项目的初始主轴尺寸(基于 `flex-basis`、`width`/`height`、内容)',
        '**分配到 flex 线**:如果 `flex-wrap: wrap`,将项目分配到多条 flex 线(每条线尽量塞满)',
        '**计算弹性长度**:算出每条 flex 线的剩余/不足空间,按 `flex-grow`/`flex-shrink` 分配/吸收',
        '**应用 min/max 约束**:如果弹性计算后的尺寸超出 `min-width`/`max-width` 约束,冻结该项目,重新分配剩余空间给其他项目',
        '**确定交叉轴尺寸**:根据 `align-items`/`align-self` 计算项目的交叉轴尺寸(`stretch` 会拉伸)',
        '**主轴对齐**:根据 `justify-content` 分配主轴方向的剩余空间(如果还有的话)',
        '**交叉轴对齐**:根据 `align-items`/`align-self`/`align-content` 确定项目在交叉轴的位置'
      ] },
      { type: 'tip', text: '步骤 5 是很多人忽略的:如果一个项目的弹性计算结果碰到了 `min-width` 或 `max-width` 的限制,它的尺寸会被"冻结"在限制值,剩余空间会重新分配给其他未冻结的项目。这就是为什么有时 `flex-grow` 的实际效果和预期比例不完全一致。' },
    ] as TutorialBlock[],
  },
  {
    id: 'flex-alignment',
    number: '5',
    title: { zh: 'Flex 对齐', en: 'Flex Alignment' },
    summary: { zh: 'justify-content 控制主轴对齐,align-items 和 align-self 控制交叉轴对齐,align-content 控制多行 flex 容器中 flex 线的对齐。auto margin 也可用于对齐。', en: 'justify-content controls main axis alignment, align-items and align-self control cross axis alignment, and align-content controls alignment of flex lines in multi-line flex containers. Auto margins can also be used for alignment.' },
    keyPoints: [
      'justify-content 控制 flex 项目在主轴方向的对齐和空间分配:flex-start(默认)、flex-end、center、space-between、space-around',
      'justify-content: flex-start 使 flex 项目向主轴起点对齐,flex-end 向终点对齐,center 居中',
      'justify-content: space-between 在项目之间平均分配空间,space-around 在项目两侧分配相等空间',
      'align-items 控制 flex 项目在交叉轴方向的对齐:stretch(默认)、flex-start、flex-end、center、baseline',
      'align-items: stretch 使 flex 项目拉伸填充交叉轴(若交叉轴尺寸为 auto)',
      'align-items: baseline 使 flex 项目按第一条基线对齐',
      'align-self 允许单个 flex 项目覆盖 align-items 值,取值同 align-items 加上 auto(默认,继承 align-items)',
      'align-content 控制多行 flex 容器中 flex 线的对齐:stretch(默认)、flex-start、flex-end、center、space-between、space-around',
      'align-content 只在多行 flex 容器(flex-wrap: wrap/wrap-reverse)中生效,单行容器中无效',
      'auto margin 在 flex 布局中会吸收对应方向的所有可用空间,可用于居中(margin: auto)或推挤项目到边缘',
      'margin-left: auto 可使 flex 项目向右推,margin-top: auto 可使项目向下推',
      '如果多个 flex 项目在同一方向有 auto margin,剩余空间会在它们之间平均分配',
    ],
    tutorial: [
      { type: 'heading', text: '对齐属性速查' },
      { type: 'paragraph', text: 'Flex 布局提供了 5 个对齐属性,分别作用于不同维度。理解它们的前提是分清**主轴**和**交叉轴**:' },
      { type: 'list', items: [
        '**`justify-content`**:主轴方向,控制**一行内所有项目**的对齐和空间分配',
        '**`align-items`**:交叉轴方向,控制**一行内所有项目**的对齐(设置在容器上)',
        '**`align-self`**:交叉轴方向,控制**单个项目**的对齐(设置在项目上,覆盖 `align-items`)',
        '**`align-content`**:交叉轴方向,控制**多行之间**的对齐和空间分配(只对多行容器有效)',
        '**`gap`**:同时控制项目之间的主轴间距和交叉轴间距'
      ] },

      { type: 'heading', text: '`justify-content`:主轴方向的空间分配' },
      { type: 'paragraph', text: '`justify-content` 控制 flex 项目在**主轴方向**上如何分配剩余空间。注意:它只在有剩余空间时才有效果——如果项目的 `flex-grow` 已经把空间全部瓜分了,`justify-content` 就没什么可分配的了。' },
      { type: 'code', lang: 'css', caption: 'justify-content 所有值的视觉效果', code: `/* 假设容器 [            ] 里有 3 个项目 ■ */\n\n.flex-start {\n  justify-content: flex-start;\n  /* [■ ■ ■          ] 紧贴主轴起点(默认) */\n}\n\n.flex-end {\n  justify-content: flex-end;\n  /* [          ■ ■ ■] 紧贴主轴终点 */\n}\n\n.center {\n  justify-content: center;\n  /* [     ■ ■ ■     ] 居中 */\n}\n\n.space-between {\n  justify-content: space-between;\n  /* [■      ■      ■] 两端对齐,间距相等 */\n}\n\n.space-around {\n  justify-content: space-around;\n  /* [  ■    ■    ■  ] 每个项目两侧间距相等 */\n  /* 注意:两端间距 = 项目间距的一半 */\n}` },
      { type: 'example', title: '导航栏的三种常见对齐方式', lang: 'css', code: `/* 1. 所有链接居中 */\n.nav-center {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n}\n\n/* 2. Logo 在左,链接在右 */\n.nav-split {\n  display: flex;\n  justify-content: space-between;\n}\n\n/* 3. 链接等间距分布 */\n.nav-even {\n  display: flex;\n  justify-content: space-around;\n}`, explanation: '导航栏是 `justify-content` 的典型应用场景。`space-between` 适合"左 Logo + 右链接"的布局(第一个和最后一个项目紧贴容器边缘);`space-around` 让所有链接均匀分布;`center` + `gap` 适合简单的居中导航。' },
      { type: 'tip', text: '`space-between` 会让第一个和最后一个项目**紧贴容器边缘**,中间项目等间距。如果只有两个项目,它们会被推到容器两端(经典的"左右对齐"效果)。如果只有一个项目,它会被推到主轴起点(等同于 `flex-start`)。' },

      { type: 'heading', text: '`align-items`:交叉轴方向的项目对齐' },
      { type: 'paragraph', text: '`align-items` 设置在 **flex 容器**上,控制所有 flex 项目在**交叉轴**方向的对齐方式。默认值是 `stretch`——这就是为什么 flex 项目默认会拉伸到与最高项目等高。' },
      { type: 'code', lang: 'css', caption: 'align-items 的 5 个值(假设水平方向排列)', code: `/* 假设容器高 200px,项目高度各不相同 */\n\n.stretch {\n  align-items: stretch;\n  /* 所有项目拉伸到 200px 高(前提:项目没有设置固定 height) */\n}\n\n.flex-start {\n  align-items: flex-start;\n  /* 所有项目紧贴顶部,保持自然高度 */\n}\n\n.flex-end {\n  align-items: flex-end;\n  /* 所有项目紧贴底部,保持自然高度 */\n}\n\n.center {\n  align-items: center;\n  /* 所有项目在交叉轴居中,保持自然高度 */\n}\n\n.baseline {\n  align-items: baseline;\n  /* 所有项目按第一行文本的基线对齐 */\n}` },
      { type: 'example', title: '等高卡片:stretch 的典型应用', lang: 'css', code: `.card-list {\n  display: flex;\n  gap: 16px;\n  align-items: stretch; /* 默认值,可以省略 */\n}\n\n.card {\n  flex: 1;\n  /* 不要设置 height! stretch 会让所有卡片等高 */\n  /* 如果设置了 height: auto 或具体值,stretch 不生效 */\n}`, explanation: '`align-items: stretch` 是 flex 布局的"隐藏功能":所有卡片自动等高,高度由内容最多的卡片决定。这在传统 CSS 中需要 JavaScript 或复杂的 hack 才能实现。注意:**如果项目设置了明确的 `height` 值,`stretch` 不会生效**——它只对 `height: auto` 的项目起作用。' },

      { type: 'heading', text: '`align-self`:单个项目的交叉轴对齐' },
      { type: 'paragraph', text: '`align-self` 设置在 **flex 项目**上,允许单个项目覆盖容器的 `align-items` 设置。默认值是 `auto`,继承容器的 `align-items` 值。' },
      { type: 'code', lang: 'css', caption: '用 align-self 让某个项目特殊对齐', code: `.container {\n  display: flex;\n  align-items: flex-start; /* 所有项目靠顶部 */\n  height: 200px;\n}\n\n.special {\n  align-self: flex-end;   /* 这一个项目靠底部 */\n}\n\n.centered {\n  align-self: center;     /* 这一个项目垂直居中 */\n}\n\n.full-height {\n  align-self: stretch;    /* 这一个项目拉伸到容器高度 */\n}` },
      { type: 'tip', text: '`align-self` 的一个实用场景:在一行等高的卡片(`align-items: stretch`)中,让某个按钮或标签靠底部对齐(`align-self: flex-end`)。另一个场景:在顶部对齐的工具栏中让"关闭"按钮垂直居中。' },

      { type: 'heading', text: '`align-content`:多行容器的行间对齐' },
      { type: 'paragraph', text: '当 flex 容器是**多行**的(`flex-wrap: wrap`)且交叉轴方向有剩余空间时,`align-content` 控制多条 flex 线之间如何分配这些空间。它和 `justify-content` 的作用类似,只不过方向是交叉轴,对象是 flex 线(而非单个项目)。' },
      { type: 'code', lang: 'css', caption: 'align-content 控制多行之间的间距', code: `.wrap-container {\n  display: flex;\n  flex-wrap: wrap;\n  height: 400px; /* 必须有明确高度,才能看到效果 */\n}\n\n/* 假设项目换成了 3 行,每行高 80px,总共 240px,剩余 160px */\n\n.stretch    { align-content: stretch; }       /* 默认:行高均匀拉伸填满 */\n.start      { align-content: flex-start; }    /* 所有行紧贴顶部 */\n.end        { align-content: flex-end; }      /* 所有行紧贴底部 */\n.center     { align-content: center; }        /* 所有行居中 */\n.between    { align-content: space-between; } /* 第一行顶部,最后一行底部,间距相等 */\n.around     { align-content: space-around; }  /* 每行上下间距相等 */` },
      { type: 'warning', text: '`align-content` 只在**多行 flex 容器**中生效。如果 `flex-wrap: nowrap`(默认值),容器只有一条 flex 线,`align-content` 完全无效。另外,容器的交叉轴方向必须有**剩余空间**(即容器在交叉轴方向有明确的尺寸,且大于所有 flex 线的总高度),`align-content` 才有可见效果。' },

      { type: 'heading', text: '`align-items` vs `align-content`:区分清楚' },
      { type: 'paragraph', text: '这两个属性名字相似,但作用完全不同:' },
      { type: 'list', items: [
        '**`align-items`**:控制每条 flex 线**内部**项目的交叉轴对齐(项目在行内怎么摆)',
        '**`align-content`**:控制多条 flex 线**之间**的交叉轴间距和位置(行与行怎么摆)',
        '**单行容器**:只有 `align-items` 有效,`align-content` 被忽略',
        '**多行容器**:两者同时生效——先用 `align-content` 确定每行的位置,再用 `align-items` 确定行内项目的位置'
      ] },

      { type: 'heading', text: 'Auto Margins:最强大的对齐技巧' },
      { type: 'paragraph', text: '在 flex 布局中,`margin: auto` 有**超能力**——它会**吸收对应方向上所有的剩余空间**。这是比 `justify-content` 更灵活的对齐方式,因为你可以单独控制某一个项目的位置。' },
      { type: 'example', title: '经典导航栏:左 Logo + 右按钮', lang: 'html', code: `<nav style="display: flex; align-items: center; padding: 0 20px;">\n  <img src="logo.svg" alt="Logo">\n  <a href="/">首页</a>\n  <a href="/about">关于</a>\n  <!-- margin-left: auto 吸收所有左侧空间 -->\n  <button style="margin-left: auto;">登录</button>\n  <button>注册</button>\n</nav>`, explanation: '"登录"按钮的 `margin-left: auto` 会吸收左侧所有剩余空间,把它和后面的"注册"按钮推到导航栏最右边。这比用 `justify-content: space-between` 更灵活,因为你可以在**任意位置**插入分隔点。' },
      { type: 'example', title: '完美居中:一行 CSS', lang: 'css', code: `.container {\n  display: flex;\n  min-height: 100vh;\n}\n\n.centered {\n  margin: auto;\n  /* 水平和垂直都居中!\n     margin-left: auto 吸收左侧空间\n     margin-right: auto 吸收右侧空间\n     margin-top: auto 吸收上方空间\n     margin-bottom: auto 吸收下方空间\n     → 元素被推到正中央 */\n}`, explanation: '这是实现完美居中最简洁的方式。flex 容器 + `margin: auto` = 水平垂直居中。不需要知道元素的宽高,不需要 `transform` hack。' },
      { type: 'warning', text: '当一个 flex 项目有 `auto` margin 时,`justify-content` 和 `align-self` 会被**忽略**(因为 auto margin 先消耗了所有剩余空间,对齐属性没有空间可操作了)。如果你发现 `justify-content` 不生效,检查是否有项目设置了 auto margin。' },

      { type: 'heading', text: '`gap`:现代的项目间距方案' },
      { type: 'paragraph', text: '`gap` 属性(原名 `grid-gap`,后来扩展到 flexbox)提供了一种简洁的方式来设置项目之间的间距。它只在项目**之间**生效,不会影响容器边缘的间距。' },
      { type: 'code', lang: 'css', caption: 'gap 的三种写法', code: `.container {\n  display: flex;\n  flex-wrap: wrap;\n\n  gap: 16px;             /* 行间距和列间距都是 16px */\n  gap: 20px 10px;        /* 行间距 20px,列间距 10px */\n  row-gap: 20px;         /* 只设行间距 */\n  column-gap: 10px;      /* 只设列间距 */\n}` },
      { type: 'example', title: '对比:gap vs margin 实现间距', lang: 'css', code: `/* ❌ 传统方法:用 margin,需要处理边缘 */\n.item {\n  margin-right: 16px;\n  margin-bottom: 16px;\n}\n.item:last-child {\n  margin-right: 0; /* 或用负 margin hack */\n}\n\n/* ✅ 现代方法:用 gap,自动处理边缘 */\n.container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n/* 不需要 .item 上的任何 margin! */`, explanation: '`gap` 的优势:只在项目**之间**添加间距,第一个和最后一个项目旁边没有多余间距。不需要 `:last-child` 选择器或负 margin hack。代码更简洁,意图更清晰。' },
      { type: 'tip', text: '`gap` 和 `justify-content: space-between` 可以配合使用:`gap` 设置**最小间距**,`space-between` 把多余空间均匀分配到间隙中。如果项目正好填满容器,间距就是 `gap` 的值;如果有剩余空间,间距会更大。' },

      { type: 'heading', text: '基线对齐(Baseline Alignment)' },
      { type: 'paragraph', text: '`align-items: baseline` 让所有 flex 项目按照**第一行文本的基线**对齐。这在项目包含不同字号的文本时特别有用——确保文字在视觉上对齐,而不是容器边缘对齐。' },
      { type: 'code', lang: 'html', caption: '基线对齐的典型场景', code: `<div style="display: flex; align-items: baseline; gap: 16px;">\n  <h1 style="font-size: 32px;">标题</h1>\n  <span style="font-size: 14px;">副标题</span>\n  <span style="font-size: 12px; color: gray;">2024-01-01</span>\n</div>\n<!-- 三个元素的文字底部在同一条线上,\n     而不是容器顶部对齐(flex-start)或垂直居中(center) -->` },
      { type: 'tip', text: '基线对齐在表单布局中也很有用:当标签和输入框字号不同时,`align-items: baseline` 确保标签文字和输入框内的文字在同一条基线上,视觉上更和谐。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {
  'flex-containers': 'flex-container',
  'flex-items': 'flex-items',
  'abspos-items': 'flex-items',
  'item-margins': 'flex-items',
  'visibility-collapse': 'flex-items',
  'min-size-auto': 'flex-items',
  'flex-direction-property': 'flex-flow',
  'flex-wrap-property': 'flex-flow',
  'flex-flow-property': 'flex-flow',
  'order-property': 'flex-flow',
  'flex-lines': 'flex-flow',
  'flexibility': 'flex-sizing',
  'flex-property': 'flex-sizing',
  'flex-common': 'flex-sizing',
  'flex-components': 'flex-sizing',
  'flex-grow-property': 'flex-sizing',
  'flex-shrink-property': 'flex-sizing',
  'flex-basis-property': 'flex-sizing',
  'layout-algorithm': 'flex-sizing',
  'resolve-flexible-lengths': 'flex-sizing',
  'definite-sizes': 'flex-sizing',
  'alignment': 'flex-alignment',
  'auto-margins': 'flex-alignment',
  'justify-content-property': 'flex-alignment',
  'align-items-property': 'flex-alignment',
  'align-self-property': 'flex-alignment',
  'align-content-property': 'flex-alignment',
  'flex-baselines': 'flex-alignment',
  'main-alignment': 'flex-alignment',
  'cross-alignment': 'flex-alignment',
};

// ============================================================
// 属性定义(CSS Flexbox Module Level 1)
// ============================================================

const FLEXBOX = 'https://www.w3.org/TR/css-flexbox-1/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ── flex-direction ──
  'flex-direction': {
    zh: '主轴方向',
    value: 'row | row-reverse | column | column-reverse',
    initial: 'row',
    appliesTo: 'flex 容器',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex-direction`,
    sectionRef: 'flexbox#flex-flow',
  },

  // ── flex-wrap ──
  'flex-wrap': {
    zh: '换行控制',
    value: 'nowrap | wrap | wrap-reverse',
    initial: 'nowrap',
    appliesTo: 'flex 容器',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex-wrap`,
    sectionRef: 'flexbox#flex-flow',
  },

  // ── flex-flow ──
  'flex-flow': {
    zh: '排列方向和换行简写',
    value: "<'flex-direction'> || <'flex-wrap'>",
    initial: '见各子属性',
    appliesTo: '见各子属性',
    inherited: false,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex-flow`,
    sectionRef: 'flexbox#flex-flow',
  },

  // ── order ──
  'order': {
    zh: '显示顺序',
    value: '<integer>',
    initial: '0',
    appliesTo: 'flex 项目和绝对定位的 flex 容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定的整数',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-order`,
    sectionRef: 'flexbox#flex-flow',
  },

  // ── flex-grow ──
  'flex-grow': {
    zh: '扩展因子',
    value: '<number [0,∞]>',
    initial: '0',
    appliesTo: 'flex 项目',
    inherited: false,
    percentages: null,
    computedValue: '指定的数值',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex-grow`,
    sectionRef: 'flexbox#flex-sizing',
  },

  // ── flex-shrink ──
  'flex-shrink': {
    zh: '收缩因子',
    value: '<number [0,∞]>',
    initial: '1',
    appliesTo: 'flex 项目',
    inherited: false,
    percentages: null,
    computedValue: '指定的值',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex-shrink`,
    sectionRef: 'flexbox#flex-sizing',
  },

  // ── flex-basis ──
  'flex-basis': {
    zh: '初始主轴尺寸',
    value: "content | <'width'>",
    initial: 'auto',
    appliesTo: 'flex 项目',
    inherited: false,
    percentages: '相对于 flex 容器的内部主轴尺寸',
    computedValue: '指定的关键字或计算后的 <length-percentage> 值',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex-basis`,
    sectionRef: 'flexbox#flex-sizing',
  },

  // ── flex ──
  'flex': {
    zh: '弹性简写',
    value: "none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]",
    initial: '0 1 auto',
    appliesTo: 'flex 项目',
    inherited: false,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-flex`,
    sectionRef: 'flexbox#flex-sizing',
  },

  // ── justify-content ──
  'justify-content': {
    zh: '主轴对齐',
    value: 'flex-start | flex-end | center | space-between | space-around',
    initial: 'flex-start',
    appliesTo: 'flex 容器',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-justify-content`,
    sectionRef: 'flexbox#flex-alignment',
  },

  // ── align-items ──
  'align-items': {
    zh: '交叉轴对齐',
    value: 'flex-start | flex-end | center | baseline | stretch',
    initial: 'stretch',
    appliesTo: 'flex 容器',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-align-items`,
    sectionRef: 'flexbox#flex-alignment',
  },

  // ── align-self ──
  'align-self': {
    zh: '单项交叉轴对齐',
    value: 'auto | flex-start | flex-end | center | baseline | stretch',
    initial: 'auto',
    appliesTo: 'flex 项目',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-align-self`,
    sectionRef: 'flexbox#flex-alignment',
  },

  // ── align-content ──
  'align-content': {
    zh: 'Flex 线对齐',
    value: 'flex-start | flex-end | center | space-between | space-around | stretch',
    initial: 'stretch',
    appliesTo: '多行 flex 容器',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字',
    css2Url: '',
    css3Url: `${FLEXBOX}#propdef-align-content`,
    sectionRef: 'flexbox#flex-alignment',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'flex container': {
    zh: 'flex 容器',
    description:
      'display 值为 flex 或 inline-flex 的元素。flex 容器建立 flex 格式化上下文,其子元素按 flex 布局规则排列。',
    sectionRef: 'flexbox#flex-container',
    specUrl: `${FLEXBOX}#flex-container`,
  },
  'flex item': {
    zh: 'flex 项目',
    description:
      'flex 容器的流内子元素。flex 项目参与 flex 布局,可以扩展或收缩以填充可用空间。',
    sectionRef: 'flexbox#flex-items',
    specUrl: `${FLEXBOX}#flex-item`,
  },
  'flex formatting context': {
    zh: 'flex 格式化上下文',
    description:
      'flex 容器建立的格式化上下文。在 flex 格式化上下文中,flex 项目按 flex 布局算法排列,浮动和清除不生效,margin 不折叠。',
    sectionRef: 'flexbox#flex-container',
    specUrl: `${FLEXBOX}#flex-formatting-context`,
  },
  'main axis': {
    zh: '主轴',
    description:
      'flex 容器的主要维度轴,flex 项目沿主轴排列。主轴方向由 flex-direction 决定:row/row-reverse 为水平,column/column-reverse 为垂直。',
    sectionRef: 'flexbox#flex-flow',
    specUrl: `${FLEXBOX}#main-axis`,
  },
  'cross axis': {
    zh: '交叉轴',
    description:
      '垂直于主轴的轴。如果主轴是水平的,交叉轴就是垂直的,反之亦然。',
    sectionRef: 'flexbox#flex-flow',
    specUrl: `${FLEXBOX}#cross-axis`,
  },
  'main size': {
    zh: '主轴尺寸',
    description:
      'flex 项目或 flex 容器在主轴方向的尺寸。如果主轴是水平的,主轴尺寸就是宽度,如果是垂直的就是高度。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#main-size`,
  },
  'cross size': {
    zh: '交叉轴尺寸',
    description:
      'flex 项目或 flex 容器在交叉轴方向的尺寸。如果交叉轴是垂直的,交叉轴尺寸就是高度,如果是水平的就是宽度。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#cross-size`,
  },
  'flex line': {
    zh: 'flex 线',
    description:
      'flex 容器中的假想线,flex 项目沿 flex 线排列。单行 flex 容器只有一条 flex 线,多行 flex 容器有多条 flex 线。',
    sectionRef: 'flexbox#flex-flow',
    specUrl: `${FLEXBOX}#flex-line`,
  },
  'single-line flex container': {
    zh: '单行 flex 容器',
    description:
      'flex-wrap 为 nowrap 的 flex 容器。单行 flex 容器将所有 flex 项目排列在一条 flex 线上。',
    sectionRef: 'flexbox#flex-flow',
    specUrl: `${FLEXBOX}#single-line-flex-container`,
  },
  'multi-line flex container': {
    zh: '多行 flex 容器',
    description:
      'flex-wrap 为 wrap 或 wrap-reverse 的 flex 容器。多行 flex 容器允许 flex 项目换行到多条 flex 线。',
    sectionRef: 'flexbox#flex-flow',
    specUrl: `${FLEXBOX}#multi-line-flex-container`,
  },
  'flex factor': {
    zh: '弹性因子',
    description:
      'flex-grow(扩展因子)或 flex-shrink(收缩因子)的值。弹性因子决定 flex 项目如何分配剩余空间或如何收缩以适应容器。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#flex-factor`,
  },
  'hypothetical main size': {
    zh: '假想主轴尺寸',
    description:
      'flex 项目在不考虑弹性(flex-grow/flex-shrink)的情况下的主轴尺寸。假想主轴尺寸是弹性计算的起点,基于 flex-basis、内容尺寸和 min/max 约束。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#hypothetical-main-size`,
  },
  'flex base size': {
    zh: 'flex 基础尺寸',
    description:
      '在弹性计算之前,flex 项目在主轴方向的初始尺寸。flex 基础尺寸由 flex-basis 属性决定(或回退到 width/height)。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#flex-base-size`,
  },
  'definite size': {
    zh: '确定尺寸',
    description:
      '可以在不需要执行布局的情况下确定的尺寸。长度值、百分比(如果参照是确定的)和某些 auto 值可以是确定尺寸。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#definite-size`,
  },
  'indefinite size': {
    zh: '不确定尺寸',
    description:
      '不是确定尺寸的尺寸。不确定尺寸需要执行布局才能确定其最终值。',
    sectionRef: 'flexbox#flex-sizing',
    specUrl: `${FLEXBOX}#indefinite-size`,
  },
  'automatic minimum size': {
    zh: '自动最小尺寸',
    description:
      'flex 项目的 min-width 或 min-height 为 auto 时计算得到的最小尺寸。自动最小尺寸通常是内容的最小尺寸(min-content),但受 flex-basis 和溢出行为影响。',
    sectionRef: 'flexbox#flex-items',
    specUrl: `${FLEXBOX}#min-size-auto`,
  },
};
