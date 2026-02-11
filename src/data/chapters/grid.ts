import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'grid-container',
    number: '1',
    title: { zh: 'Grid 容器与格式化上下文', en: 'Grid Containers & Formatting Context' },
    summary: { zh: 'display: grid 或 inline-grid 使元素成为网格容器(grid container),并为其内容建立网格格式化上下文(grid formatting context)。网格容器的子元素成为网格项目(grid item),在二维网格中排列。', en: 'display: grid or inline-grid makes an element a grid container and establishes a grid formatting context for its contents. Children of the grid container become grid items, arranged in a two-dimensional grid.' },
    keyPoints: [
      'display: grid 生成块级网格容器,display: inline-grid 生成行内级网格容器',
      '网格容器为其内容建立独立的网格格式化上下文(grid formatting context),子元素成为网格项目并参与网格布局',
      '网格项目包括网格容器的直接子元素和匿名网格项目(由连续文本节点包裹而成);绝对定位的子元素不是网格项目但其包含块由网格定义',
      '网格容器不是块容器(block container),因此 float、clear 对网格项目不生效;vertical-align 对网格项目不生效',
      '匿名网格项目:网格容器中直接包含的文本会被包裹在匿名网格项目中;只包含空白符的匿名网格项目不会渲染(不占据网格单元)',
      '网格格式化上下文与块格式化上下文的区别:网格项目是二维布局,可以跨越多个行和列;margin 不折叠;z-index 对非定位的网格项目也生效',
      '网格容器的 margin、border、padding 正常工作,但不参与网格布局;网格项目放置在网格容器的 content box 内',
      'order 属性影响网格项目的自动放置顺序和绘制顺序,但不影响非视觉媒体的顺序(如屏幕阅读器)',
      'display: grid 与 display: flex 的比较:grid 强制二维对齐,flex 专注于单轴;grid 使用自顶向下的布局方法,flex 使用自底向上的方法;grid 允许显式重叠项目',
      '绝对定位的网格容器子元素以网格区域作为包含块,但不参与网格布局,不影响网格轨道尺寸',
    ],
    tutorial: [
      { type: 'heading', text: '什么是 Grid 容器?' },
      { type: 'paragraph', text: '任何元素只要设置了 `display: grid` 或 `display: inline-grid`,就变成了**网格容器**。网格容器会为其内容建立一个**网格格式化上下文**(Grid Formatting Context),在这个上下文中,子元素按照二维网格的规则排列,形成行和列的结构。' },
      { type: 'paragraph', text: 'Grid 是 CSS 中唯一真正的二维布局系统。与 Flexbox(单轴)和块布局(垂直堆叠)不同,Grid 同时控制行和列两个维度,可以精确定位每个项目在网格中的位置。' },

      { type: 'heading', text: '`display: grid` vs `display: inline-grid`' },
      { type: 'code', lang: 'css', caption: '两种网格容器的声明方式', code: `/* 块级网格容器:独占一行,宽度默认填满父元素 */\n.page-layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n}\n\n/* 行内级网格容器:与周围内容并排,宽度由内容决定 */\n.icon-grid {\n  display: inline-grid;\n  grid-template-columns: repeat(3, 32px);\n}` },
      { type: 'example', title: '块级与行内级网格容器的区别', lang: 'html', code: `<!-- 块级:两个网格各占一行 -->\n<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">\n  <div>列1</div><div>列2</div>\n</div>\n<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">\n  <div>列A</div><div>列B</div>\n</div>\n\n<!-- 行内级:两个网格在同一行 -->\n段落中嵌入 <span style="display: inline-grid; grid-template-columns: 20px 20px;"><span>🔴</span><span>🟢</span></span> 一个网格`, explanation: '`display: grid` 生成的容器在外部是**块级盒子**,独占一行,宽度默认 100%。`display: inline-grid` 生成的容器在外部是**行内级盒子**,可以和文本、其他行内元素并排,宽度由内容决定。但两者的**内部布局完全一样**,都是网格布局。' },
      { type: 'tip', text: '绝大多数情况下使用 `display: grid`(页面布局、卡片列表、表单)。只有当你需要在行内文本流中嵌入一个小网格(如图标组、徽章组)时,才用 `display: inline-grid`。' },

      { type: 'heading', text: 'Grid 格式化上下文:哪些规则被改变了?' },
      { type: 'paragraph', text: '网格容器创建的格式化上下文(Grid FC)与块格式化上下文(BFC)有本质区别。在 Grid FC 中,许多传统 CSS 布局机制被禁用或改变了行为。' },
      { type: 'list', items: [
        '**`float` 和 `clear` 完全失效**:网格项目不会浮动,即使显式设置 `float: left` 也会被忽略',
        '**`vertical-align` 无效**:网格项目使用 `align-items` 和 `align-self` 控制对齐',
        '**`column-*` 属性被忽略**:多列布局属性在网格容器上不生效',
        '**`::first-line` 和 `::first-letter` 不适用**:这些伪元素只适用于块容器',
        '**margin 不折叠**:网格项目之间、网格项目与容器之间的 margin 永远不会折叠'
      ] },
      { type: 'warning', text: '如果你在网格容器内给子元素设置了 `float`,它不会报错,但也不会有任何效果。从传统布局迁移到 Grid 时,直接删掉 `float`,用 `grid-column` 和 `grid-row` 来控制位置。' },

      { type: 'heading', text: '匿名网格项目' },
      { type: 'paragraph', text: '网格容器的直接子元素自动成为网格项目。但如果容器中直接包含**裸文本**(不被任何元素包裹的文本节点),这些文本会被自动包裹在**匿名网格项目**中参与布局。' },
      { type: 'example', title: '文本节点如何变成匿名网格项目', lang: 'html', code: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">\n  Hello\n  <span>World</span>\n  CSS Grid\n</div>\n\n<!-- 等价于 -->\n<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">\n  <anonymous>Hello</anonymous>\n  <span>World</span>\n  <anonymous>CSS Grid</anonymous>\n</div>`, explanation: '上例产生 3 个网格项目:匿名项目 "Hello"、`<span>` 元素、匿名项目 "CSS Grid"。每段连续的非空白文本构成一个独立的匿名网格项目。但**纯空白文本**(只有空格、换行)会被忽略,不产生匿名项目。匿名网格项目无法直接被 CSS 选择器选中,所以最好把文本包裹在元素中。' },

      { type: 'heading', text: 'Grid vs Flexbox:什么时候用哪个?' },
      { type: 'paragraph', text: 'Grid 和 Flexbox 是互补的布局系统,各有适用场景。理解它们的设计哲学差异有助于选择合适的工具。' },
      { type: 'list', items: [
        '**维度**:Grid 是二维布局(同时控制行和列),Flexbox 是一维布局(主轴方向)',
        '**设计方向**:Grid 是自顶向下(先定义网格结构,再放置项目),Flexbox 是自底向上(基于内容尺寸分配空间)',
        '**对齐控制**:Grid 强制对齐(所有项目按网格线对齐),Flexbox 灵活对齐(项目可以有不同尺寸)',
        '**重叠项目**:Grid 允许显式重叠(通过 z-index),Flexbox 项目不能重叠',
        '**适用场景**:Grid 适合整体页面布局、复杂的二维结构;Flexbox 适合组件内部布局、导航栏、按钮组'
      ] },
      { type: 'tip', text: '经验法则:需要同时控制行和列时用 Grid;只需要控制一个方向(横向或纵向)时用 Flexbox。两者可以嵌套使用——外层用 Grid 定义页面结构,内层用 Flexbox 排列组件内容。' },

      { type: 'heading', text: '绝对定位子元素与网格容器' },
      { type: 'paragraph', text: '网格容器中的绝对定位子元素(`position: absolute` 或 `fixed`)**不是网格项目**,不参与网格布局。但如果网格容器自身是定位元素(`position` 不是 `static`),它会成为这些绝对定位子元素的**包含块**。' },
      { type: 'code', lang: 'html', caption: '绝对定位子元素相对于网格容器定位', code: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); position: relative; height: 300px;">\n  <div>网格项目 1</div>\n  <div>网格项目 2</div>\n  <div>网格项目 3</div>\n  <!-- 这个不参与网格布局,但相对于网格容器定位 -->\n  <div style="position: absolute; top: 20px; right: 20px;">\n    悬浮徽标\n  </div>\n</div>` },
      { type: 'example', title: '绝对定位元素使用网格线作为偏移边缘', lang: 'css', code: `.grid-container {\n  display: grid;\n  grid-template-columns: [start] 1fr [middle] 1fr [end];\n  position: relative;\n}\n\n.overlay {\n  position: absolute;\n  /* 可以引用网格线名称 */\n  left: middle;  /* 从 middle 线开始 */\n  right: end;    /* 到 end 线结束 */\n}`, explanation: '绝对定位的网格容器子元素可以使用网格线名称或索引作为 `top`/`right`/`bottom`/`left` 的偏移边缘。这提供了一种强大的方式来精确定位覆盖层、悬浮元素等。' },
    ] as TutorialBlock[],
  },
  {
    id: 'grid-template',
    number: '2',
    title: { zh: '网格模板定义', en: 'Defining the Grid Template' },
    summary: { zh: 'grid-template-rows 和 grid-template-columns 定义显式网格(explicit grid)的行和列。轨道列表(track listing)支持固定尺寸、fr 单位(弹性因子)、minmax()、repeat() 等函数,以及命名网格线。', en: 'grid-template-rows and grid-template-columns define the rows and columns of the explicit grid. Track listings support fixed sizes, fr units (flexible factors), minmax(), repeat() functions, and named grid lines.' },
    keyPoints: [
      'grid-template-rows/columns 的轨道列表语法:长度、百分比、auto、fr 单位、minmax()、fit-content()、repeat() 的组合,中间可插入命名网格线 [name]',
      'fr 单位(flexible length):表示网格容器中可用空间的一份。1fr 1fr 表示两列平分可用空间;2fr 1fr 表示第一列占 2/3,第二列占 1/3',
      'minmax(min, max) 函数:定义轨道尺寸范围。min 为最小值,max 为最大值。minmax(100px, 1fr) 表示最小 100px,最大占据可用空间',
      'repeat() 函数:重复轨道模式。repeat(3, 100px) 等价于 100px 100px 100px;repeat(2, [line] 100px) 定义重复的命名线',
      'auto-fill 和 auto-fit:用于 repeat() 的自动重复。repeat(auto-fill, 100px) 自动填充尽可能多的轨道;auto-fit 会折叠空轨道为 0',
      'grid-template-areas 通过 ASCII 图形定义命名网格区域。每个字符串是一行,每个单词是一个区域。区域必须形成矩形。点号(.)表示空单元格',
      '命名网格线:在轨道列表中用 [name] 定义。一条线可以有多个名字 [name1 name2]。区域名自动生成 name-start 和 name-end 线名',
      'grid-template 简写属性:支持 rows / columns 或完整的模板语法(结合 grid-template-areas)',
      'grid-template: none 重置所有模板属性为初始值',
      'auto 轨道尺寸:基于内容,等价于 minmax(auto, auto)。作为最大值时表示 max-content;作为最小值时表示最小内容尺寸(min-content 或最小宽度)',
      '百分比解析:相对于网格容器的 content box 对应维度。如果容器尺寸不确定,百分比轨道视为 auto',
      'fit-content(limit) 函数:等价于 minmax(auto, max-content) 但限制最大值为 limit。用于创建基于内容但有上限的轨道',
    ],
    tutorial: [
      { type: 'heading', text: '基础语法:定义行和列' },
      { type: 'paragraph', text: '网格布局的第一步是定义网格的结构——有多少行、多少列、每个轨道有多宽/高。`grid-template-rows` 和 `grid-template-columns` 就是用来完成这项工作的。' },
      { type: 'code', lang: 'css', caption: '最简单的网格:固定尺寸的行和列', code: `.grid {\n  display: grid;\n  /* 3 列:200px、300px、200px */\n  grid-template-columns: 200px 300px 200px;\n  /* 2 行:100px、150px */\n  grid-template-rows: 100px 150px;\n}` },
      { type: 'paragraph', text: '轨道列表中的每个值定义一个轨道的尺寸。可以使用任何长度单位(`px`、`em`、`%`)、`auto`(根据内容自动调整)或 `fr` 单位(弹性空间分配)。' },

      { type: 'heading', text: 'fr 单位:弹性空间分配' },
      { type: 'paragraph', text: '`fr`(fraction,分数)单位是 Grid 最强大的特性之一。它表示**网格容器中可用空间的一份**。可用空间是容器尺寸减去固定尺寸轨道、gap 后剩余的空间。' },
      { type: 'example', title: 'fr 单位的空间分配逻辑', lang: 'css', code: `.grid {\n  display: grid;\n  width: 800px;\n  /* 第一列固定 200px,剩余 600px 按 1:2 分配 */\n  grid-template-columns: 200px 1fr 2fr;\n  /* 结果:200px + 200px(1/3 × 600px) + 400px(2/3 × 600px) */\n}`, explanation: '`1fr 1fr` 表示两列平分可用空间(各 50%)。`1fr 2fr 1fr` 表示三列按 1:2:1 的比例分配可用空间(分别占 25%、50%、25%)。`fr` 只对可用空间生效,固定尺寸轨道和 `gap` 会先被扣除。' },
      { type: 'tip', text: '`fr` 和百分比的区别:`1fr 1fr` 会考虑 `gap`,两列真正平分可用空间;`50% 50%` 不考虑 `gap`,如果有间距会溢出。绝大多数场景下用 `fr` 比百分比更合理。' },

      { type: 'heading', text: 'minmax() 函数:弹性但有界限的轨道' },
      { type: 'paragraph', text: '`minmax(min, max)` 定义一个轨道的最小和最大尺寸。轨道尺寸会在这个范围内根据内容和可用空间调整。这对响应式布局非常有用。' },
      { type: 'code', lang: 'css', caption: '最小 100px,最大占据可用空间', code: `.grid {\n  display: grid;\n  /* 三列都至少 100px,但可以根据空间扩展 */\n  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);\n}` },
      { type: 'example', title: 'minmax() 的实际应用:侧边栏布局', lang: 'css', code: `.layout {\n  display: grid;\n  /* 侧边栏最少 200px,最多 300px;主内容区占据剩余空间 */\n  grid-template-columns: minmax(200px, 300px) 1fr;\n}`, explanation: '侧边栏宽度在 200px~300px 之间浮动。当容器宽度很小时,侧边栏保持 200px 最小宽度;当容器宽度很大时,侧边栏最多占 300px,主内容区占据剩余所有空间。' },

      { type: 'heading', text: 'repeat() 函数:避免重复书写' },
      { type: 'paragraph', text: '当有多个相同尺寸的轨道时,用 `repeat()` 可以避免重复书写。语法是 `repeat(重复次数, 轨道模式)`。' },
      { type: 'code', lang: 'css', caption: 'repeat() 的基本用法', code: `/* 6 个等宽列 */\ngrid-template-columns: repeat(6, 1fr);\n/* 等价于 */\ngrid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;\n\n/* 重复复杂模式 */\ngrid-template-columns: repeat(3, 100px 200px);\n/* 等价于 */\ngrid-template-columns: 100px 200px 100px 200px 100px 200px;` },
      { type: 'tip', text: '`repeat()` 中可以包含多个轨道,形成重复的模式。`repeat(2, 1fr 2fr)` 会产生 4 列:1fr 2fr 1fr 2fr。' },

      { type: 'heading', text: 'auto-fill vs auto-fit:响应式列数' },
      { type: 'paragraph', text: '`repeat()` 的重复次数可以用 `auto-fill` 或 `auto-fit` 代替,让浏览器根据容器宽度自动决定创建多少列。这是实现响应式网格的核心技巧。' },
      { type: 'example', title: 'auto-fill:尽可能多地填充轨道', lang: 'css', code: `.grid {\n  display: grid;\n  /* 每列至少 200px,最多占据可用空间,自动创建尽可能多的列 */\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 20px;\n}`, explanation: '容器宽度 1000px 时,可以放下 4 列(每列约 240px);容器宽度 600px 时,只能放 2 列(每列约 290px)。**即使某些列是空的,`auto-fill` 也会创建它们**,只是不可见。' },
      { type: 'example', title: 'auto-fit:折叠空轨道', lang: 'css', code: `.grid {\n  display: grid;\n  /* 与 auto-fill 类似,但空列会被折叠为 0 宽度 */\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}`, explanation: '如果网格中只有 2 个项目,`auto-fill` 可能创建 5 列(3 列空的但占位),`auto-fit` 只创建 2 列(空列被折叠)。**`auto-fit` 让现有项目平分所有可用空间**,适合项目数量不固定的场景。' },
      { type: 'warning', text: '`auto-fill` 和 `auto-fit` 的区别只在有空轨道时才体现。如果项目刚好填满所有轨道,两者行为完全一致。' },

      { type: 'heading', text: '命名网格线' },
      { type: 'paragraph', text: '在轨道列表中可以用 `[名称]` 语法给网格线命名。之后放置网格项目时,可以用名称代替数字索引,代码更易读。' },
      { type: 'code', lang: 'css', caption: '为网格线命名', code: `.grid {\n  display: grid;\n  grid-template-columns: [start] 200px [content-start] 1fr [content-end] 200px [end];\n  /* 网格线索引:1(start) 2(content-start) 3(content-end) 4(end) */\n}\n\n.item {\n  /* 使用线名定位 */\n  grid-column: content-start / content-end;\n}` },
      { type: 'tip', text: '一条网格线可以有多个名字:`[main-start sidebar-end]`。同一个名字也可以出现在多条线上,引用时会选择距离起点最近的那条。' },

      { type: 'heading', text: 'grid-template-areas:ASCII 艺术布局' },
      { type: 'paragraph', text: '`grid-template-areas` 提供了一种可视化的方式定义网格布局。你用字符串"画"出布局,每个区域用同一个名字,点号 `.` 表示空单元格。' },
      { type: 'example', title: '经典的圣杯布局', lang: 'css', code: `.page {\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-rows: 80px 1fr 60px;\n  grid-template-areas:\n    "header header  header"\n    "sidebar content ads"\n    "footer footer  footer";\n}\n\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.content { grid-area: content; }\n.ads     { grid-area: ads; }\n.footer  { grid-area: footer; }`, explanation: '每个字符串代表一行,字符串中的单词代表区域。同名的单元格会合并成一个矩形区域。**区域必须是矩形**,不能是 L 形或不连续的形状。区域名自动生成 `header-start`、`header-end` 等网格线名。' },
      { type: 'warning', text: '`grid-template-areas` 定义的区域必须形成矩形。如果你写了 `"a a b" "a c c"`,浏览器会认为语法错误,因为区域 `a` 不是矩形。' },

      { type: 'heading', text: 'grid-template 简写' },
      { type: 'paragraph', text: '`grid-template` 可以一次性设置 `grid-template-rows`、`grid-template-columns` 和 `grid-template-areas`。最常见的语法是 `rows / columns`。' },
      { type: 'code', lang: 'css', caption: 'grid-template 简写语法', code: `/* 基础简写:rows / columns */\ngrid-template: 100px 200px / 1fr 2fr;\n/* 等价于 */\ngrid-template-rows: 100px 200px;\ngrid-template-columns: 1fr 2fr;\n\n/* 结合 areas 的完整语法 */\ngrid-template:\n  "header header" 80px\n  "sidebar content" 1fr\n  "footer footer" 60px\n  / 200px 1fr;\n/* 每行末尾可以跟行高,最后一行的 / 后面是列宽 */` },

      { type: 'heading', text: 'auto、fit-content() 和其他轨道尺寸' },
      { type: 'paragraph', text: '`auto` 轨道尺寸根据内容自动调整,等价于 `minmax(auto, auto)`。作为最大值时是 `max-content`(内容的理想尺寸),作为最小值时是内容的最小尺寸。' },
      { type: 'code', lang: 'css', caption: 'fit-content() 限制内容尺寸上限', code: `.grid {\n  display: grid;\n  /* 第一列根据内容调整,但最大 300px */\n  grid-template-columns: fit-content(300px) 1fr;\n}` },
      { type: 'example', title: 'fit-content() 的实际效果', lang: 'html', code: `<!-- 如果第一列内容很短,列宽收缩到内容宽度 -->\n<!-- 如果第一列内容很长,列宽最大 300px,内容换行 -->`, explanation: '`fit-content(limit)` 等价于 `minmax(auto, max-content)` 但限制最大值为 `limit`。它常用于创建"根据内容调整但不能无限宽"的列,比如表格的第一列。' },

      { type: 'heading', text: '实战:响应式卡片网格' },
      { type: 'code', lang: 'css', caption: '不用媒体查询的响应式网格', code: `.card-grid {\n  display: grid;\n  /* 每张卡片至少 250px,自动调整列数,卡片平分可用空间 */\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  padding: 20px;\n}\n\n.card {\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n}` },
      { type: 'paragraph', text: '这个模式是 Grid 布局的"杀手级应用"。容器宽度 1200px 时显示 4 列,800px 时显示 3 列,600px 时显示 2 列,400px 时显示 1 列——完全自动,无需任何媒体查询。' },
    ] as TutorialBlock[],
  },
  {
    id: 'grid-placement',
    number: '3',
    title: { zh: '网格项目放置', en: 'Placing Grid Items' },
    summary: { zh: 'grid-row-start/end 和 grid-column-start/end 属性通过网格线索引或名称显式放置网格项目。span 关键字指定跨越的轨道数。grid-area 可以通过区域名或四条线一次性指定位置。', en: 'grid-row-start/end and grid-column-start/end properties explicitly place grid items via grid line indices or names. The span keyword specifies the number of tracks to span. grid-area can specify position via area name or four lines at once.' },
    keyPoints: [
      'grid-row-start/end 和 grid-column-start/end:通过整数索引(正数从起点计数,负数从终点倒数)或命名线指定网格线',
      '网格线索引从 1 开始。第一条线是 1,最后一条线是 -1。索引 0 无效',
      'span <integer>:指定跨越的轨道数。grid-column-start: 2; grid-column-end: span 3 表示从第 2 条线开始跨越 3 列',
      'span <name>:跨越到指定名称的下一条线。如果有多条同名线,选择距离起点最近的那条',
      'grid-row 和 grid-column 简写:语法为 <start> / <end>。省略 <end> 时默认为 span 1',
      'grid-area 简写:语法为 <row-start> / <column-start> / <row-end> / <column-end> 或单个区域名',
      '命名区域放置:grid-area: header 自动查找 header-start 和 header-end 线(由 grid-template-areas 或显式命名线定义)',
      '自动放置:省略或使用 auto 时,网格项目由自动放置算法确定位置',
      '过约束解析:如果 start、end 和 span 都指定且冲突,span 被忽略',
      '超出显式网格的放置:引用不存在的网格线索引或名称会创建隐式网格轨道',
      '重叠项目:多个网格项目可以放置到同一网格区域,通过 z-index 控制层叠顺序(即使项目未定位,z-index 也生效)',
      '绝对定位的网格项目:通过网格线定义包含块的偏移边缘。如果只指定一条线,使用该线作为起点,包含块延伸到网格容器的对应边缘',
    ],
    tutorial: [
      { type: 'heading', text: '基于线的放置:grid-row-start/end 和 grid-column-start/end' },
      { type: 'paragraph', text: '网格项目的位置由它所占据的**网格线**决定。`grid-row-start` 和 `grid-row-end` 定义项目在垂直方向的起止线,`grid-column-start` 和 `grid-column-end` 定义水平方向的起止线。' },
      { type: 'code', lang: 'css', caption: '用整数索引指定网格线', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(3, 100px);\n}\n\n.item {\n  /* 从第 2 条列线到第 4 条列线(占据第 2、3 列) */\n  grid-column-start: 2;\n  grid-column-end: 4;\n  /* 从第 1 条行线到第 3 条行线(占据第 1、2 行) */\n  grid-row-start: 1;\n  grid-row-end: 3;\n}` },
      { type: 'paragraph', text: '**网格线编号从 1 开始**。4 列的网格有 5 条列线(1、2、3、4、5),3 行的网格有 4 条行线。理解这一点是掌握 Grid 放置的关键。' },

      { type: 'heading', text: '负数索引:从终点倒数' },
      { type: 'paragraph', text: 'Grid 支持负数索引,从网格的终点向起点倒数。`-1` 是最后一条线,`-2` 是倒数第二条,以此类推。这对于"占满到末尾"的布局非常有用。' },
      { type: 'example', title: '负数索引的实际应用', lang: 'css', code: `.full-width {\n  /* 从第一条线到最后一条线,横跨整个网格宽度 */\n  grid-column: 1 / -1;\n}\n\n.last-two-columns {\n  /* 占据最后两列 */\n  grid-column: -3 / -1;\n}`, explanation: '负数索引让你不用关心网格到底有多少列。`grid-column: 1 / -1` 在 3 列、4 列、10 列的网格中都表示"占满整行",无需硬编码列数。' },
      { type: 'tip', text: '索引 0 是无效的。网格线编号只有正数(从起点数)和负数(从终点倒数)两种。' },

      { type: 'heading', text: 'span 关键字:跨越指定数量的轨道' },
      { type: 'paragraph', text: '有时候你只关心项目的起点和它跨越多少个轨道,而不关心终点线的具体编号。`span` 关键字就是用来表达"跨越 N 个轨道"的。' },
      { type: 'code', lang: 'css', caption: 'span 的两种用法', code: `/* 从第 2 条线开始,跨越 3 列 */\ngrid-column-start: 2;\ngrid-column-end: span 3;  /* 等价于 grid-column-end: 5 */\n\n/* 跨越 2 列,到第 5 条线结束 */\ngrid-column-start: span 2;  /* 等价于 grid-column-start: 3 */\ngrid-column-end: 5;` },
      { type: 'example', title: 'span 与命名线结合', lang: 'css', code: `.grid {\n  grid-template-columns: [start] 1fr [middle] 1fr [end];\n}\n\n.item {\n  /* 从 start 线开始,跨越到下一个 middle 线 */\n  grid-column: start / span middle;\n}`, explanation: '`span <name>` 表示"跨越到下一个名为 `<name>` 的线"。如果有多条同名线,浏览器会选择距离起点最近的那条。' },

      { type: 'heading', text: 'grid-row 和 grid-column 简写' },
      { type: 'paragraph', text: '`grid-row` 和 `grid-column` 是简写属性,语法是 `<start> / <end>`。如果省略 `<end>`,默认为 `span 1`(占据一个轨道)。' },
      { type: 'code', lang: 'css', caption: '简写语法更简洁', code: `/* 完整写法 */\ngrid-row-start: 2;\ngrid-row-end: 4;\ngrid-column-start: 1;\ngrid-column-end: 3;\n\n/* 简写 */\ngrid-row: 2 / 4;\ngrid-column: 1 / 3;\n\n/* 省略 end,默认 span 1 */\ngrid-row: 2;      /* 等价于 grid-row: 2 / 3 */\ngrid-column: 1;   /* 等价于 grid-column: 1 / 2 */` },

      { type: 'heading', text: 'grid-area 简写:四条线或区域名' },
      { type: 'paragraph', text: '`grid-area` 是最终极的简写,可以一次性指定四条线:`<row-start> / <column-start> / <row-end> / <column-end>`。注意顺序是**先行后列**,而且是**先 start 后 end**交替出现。' },
      { type: 'code', lang: 'css', caption: 'grid-area 的四值语法', code: `/* 完整写法 */\ngrid-row: 2 / 4;\ngrid-column: 1 / 3;\n\n/* grid-area 一行搞定 */\ngrid-area: 2 / 1 / 4 / 3;\n/*         行起 列起 行止 列止 */` },
      { type: 'warning', text: '`grid-area` 的四值语法顺序容易记错。记住口诀:**行列行列**(row-start, column-start, row-end, column-end)。和 CSS 的"上右下左"习惯不同,这里是行列交替。' },

      { type: 'heading', text: '命名区域放置' },
      { type: 'paragraph', text: '如果你用 `grid-template-areas` 定义了命名区域,可以直接用区域名给项目定位。浏览器会自动查找 `区域名-start` 和 `区域名-end` 这两条线。' },
      { type: 'example', title: '区域名放置', lang: 'css', code: `.grid {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar content"\n    "footer footer";\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: 80px 1fr 60px;\n}\n\n.header {\n  grid-area: header;  /* 自动匹配 header-start 和 header-end 线 */\n}\n\n.sidebar {\n  grid-area: sidebar;\n}`, explanation: '`grid-area: header` 等价于 `grid-row: header-start / header-end; grid-column: header-start / header-end`。这些线名由 `grid-template-areas` 自动生成。' },

      { type: 'heading', text: '网格项目重叠与 z-index' },
      { type: 'paragraph', text: 'Grid 允许多个项目放置到同一个网格区域,形成重叠。与传统布局不同,**即使网格项目没有设置 `position`,`z-index` 也能控制它们的层叠顺序**。' },
      { type: 'code', lang: 'css', caption: '创建重叠的网格项目', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 100px);\n}\n\n.background {\n  grid-area: 1 / 1 / 3 / 3;  /* 占据左上 2×2 区域 */\n  background: lightblue;\n  z-index: 1;\n}\n\n.foreground {\n  grid-area: 2 / 2 / 4 / 4;  /* 占据右下 2×2 区域,与 background 重叠 */\n  background: coral;\n  z-index: 2;  /* 显示在 background 上方 */\n}` },
      { type: 'tip', text: '默认情况下,后声明的元素(HTML 中靠后的)显示在上层。通过 `z-index` 可以打破这个顺序。网格项目自动创建层叠上下文,无需 `position: relative`。' },

      { type: 'heading', text: '超出显式网格的放置:隐式网格生成' },
      { type: 'paragraph', text: '如果你引用了不存在的网格线(比如网格只有 3 列,你却用 `grid-column: 5 / 7`),浏览器不会报错,而是自动创建**隐式网格轨道**来容纳这个项目。' },
      { type: 'example', title: '隐式轨道的创建', lang: 'css', code: `.grid {\n  display: grid;\n  grid-template-columns: 100px 100px 100px;  /* 显式定义 3 列 */\n  grid-auto-columns: 50px;  /* 隐式列宽 50px */\n}\n\n.item {\n  grid-column: 5 / 7;  /* 引用第 5-7 线,超出显式网格 */\n  /* 浏览器会自动创建第 4、5 列(各 50px 宽) */\n}`, explanation: '显式网格定义了前 3 列,项目需要第 4、5 列,浏览器自动创建它们。隐式轨道的尺寸由 `grid-auto-rows` 和 `grid-auto-columns` 决定。' },

      { type: 'heading', text: '实战:杂志式布局' },
      { type: 'code', lang: 'css', caption: '复杂的多跨度布局', code: `.magazine {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(4, 150px);\n  gap: 20px;\n}\n\n.feature {\n  /* 大标题:横跨 4 列、2 行 */\n  grid-column: 1 / 5;\n  grid-row: 1 / 3;\n}\n\n.ad {\n  /* 广告:右侧 2 列、2 行 */\n  grid-column: 5 / 7;\n  grid-row: 1 / 3;\n}\n\n.article-1 {\n  grid-column: 1 / 3;\n  grid-row: 3 / 5;\n}\n\n.article-2 {\n  grid-column: 3 / 5;\n  grid-row: 3 / 5;\n}\n\n.article-3 {\n  grid-column: 5 / 7;\n  grid-row: 3 / 5;\n}` },
      { type: 'paragraph', text: '这种布局用浮动或定位实现会非常复杂,但用 Grid 的线基础放置,逻辑清晰、代码简洁。每个项目精确占据它应该占据的单元格,无需计算百分比或调整 margin。' },
    ] as TutorialBlock[],
  },
  {
    id: 'grid-auto',
    number: '4',
    title: { zh: '隐式网格与自动放置', en: 'Implicit Grid & Auto-placement' },
    summary: { zh: '隐式网格(implicit grid)由 grid-auto-rows/columns 定义,用于容纳放置在显式网格外的项目。grid-auto-flow 控制自动放置算法的方向和密集度。grid 简写合并所有网格属性。', en: 'The implicit grid is defined by grid-auto-rows/columns to accommodate items placed outside the explicit grid. grid-auto-flow controls the direction and density of the auto-placement algorithm. The grid shorthand combines all grid properties.' },
    keyPoints: [
      'grid-auto-rows 和 grid-auto-columns:定义隐式轨道的尺寸。可以是轨道尺寸列表,按顺序循环应用',
      '隐式网格生成:当网格项目放置在显式网格范围外,或自动放置需要更多轨道时,自动创建隐式轨道',
      'grid-auto-flow 值:row(默认,按行自动放置)、column(按列自动放置)、dense(密集打包,尽可能填充空洞)、row dense、column dense',
      '自动放置算法:从第一个空单元格开始,按 grid-auto-flow 指定的方向查找足够大的空区域放置项目',
      'dense 打包:自动放置项目时允许乱序填充早期空洞,可能导致视觉顺序与源顺序不一致(影响可访问性)',
      'grid 简写语法:<grid-template> 或 <grid-auto-flow> [<grid-auto-rows> [/ <grid-auto-columns>]]',
      'grid 简写的模板语法:支持 "area1 area2" / columns 形式定义区域和列,也支持在区域字符串后加行尺寸',
      'grid: auto-flow / 1fr 1fr:隐式行,显式两列。grid: auto-flow dense 100px / 1fr 2fr:密集打包,隐式行高 100px,两列',
      '显式 vs 隐式网格:显式网格由 grid-template-* 定义;隐式网格由 grid-auto-* 定义。网格线编号覆盖两者(显式在前,隐式在后)',
      '自动放置与 order:order 属性影响自动放置的顺序,order 值小的项目先放置',
      '固定与自动位置混合:部分指定位置的项目(如只指定 column)仍参与自动放置算法,仅在约束的维度搜索',
    ],
    tutorial: [
      { type: 'heading', text: '显式网格 vs 隐式网格' },
      { type: 'paragraph', text: '**显式网格**是你通过 `grid-template-rows` 和 `grid-template-columns` 明确定义的轨道。**隐式网格**是当项目放置在显式网格之外,或自动放置算法需要更多空间时,浏览器自动创建的轨道。' },
      { type: 'example', title: '隐式网格的触发场景', lang: 'css', code: `.grid {\n  display: grid;\n  grid-template-columns: 100px 100px;  /* 显式定义 2 列 */\n  /* 没有定义行,所有行都是隐式的 */\n}\n\n/* 8 个网格项目,2 列布局,需要 4 行 */\n/* 第 1-4 行都是隐式行,高度由内容决定 */`, explanation: '如果只定义了列而没定义行,所有行都是隐式的。反之亦然。隐式轨道的默认尺寸是 `auto`(根据内容调整)。' },

      { type: 'heading', text: 'grid-auto-rows 和 grid-auto-columns:控制隐式轨道尺寸' },
      { type: 'paragraph', text: '用 `grid-auto-rows` 和 `grid-auto-columns` 可以指定隐式轨道的尺寸,避免它们高度/宽度不一致。' },
      { type: 'code', lang: 'css', caption: '统一隐式行高', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);  /* 显式 3 列 */\n  grid-auto-rows: 150px;  /* 所有隐式行高度 150px */\n}\n\n/* 无论有多少项目,每行都是 150px 高 */` },
      { type: 'example', title: '多尺寸隐式轨道模式', lang: 'css', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  /* 隐式行交替使用 100px 和 200px */\n  grid-auto-rows: 100px 200px;\n}\n\n/* 第 1 行 100px,第 2 行 200px,第 3 行 100px,第 4 行 200px... */`, explanation: '`grid-auto-rows` 可以接受多个值,形成重复的尺寸模式。浏览器会循环应用这些尺寸到隐式轨道。' },

      { type: 'heading', text: 'grid-auto-flow:控制自动放置方向' },
      { type: 'paragraph', text: '当网格项目没有显式指定位置时,浏览器的**自动放置算法**决定它们的位置。`grid-auto-flow` 控制算法的搜索方向。' },
      { type: 'code', lang: 'css', caption: 'grid-auto-flow 的三个基础值', code: `/* 默认值:按行放置,从左到右填满一行后换到下一行 */\ngrid-auto-flow: row;\n\n/* 按列放置,从上到下填满一列后换到下一列 */\ngrid-auto-flow: column;\n\n/* 密集打包(稍后详解) */\ngrid-auto-flow: dense;` },
      { type: 'example', title: 'row vs column 的视觉差异', lang: 'html', code: `<!-- grid-auto-flow: row (默认) -->\n<!-- 项目排列:1 2 3 -->\n<!--         4 5 6 -->\n\n<!-- grid-auto-flow: column -->\n<!-- 项目排列:1 3 5 -->\n<!--         2 4 6 -->`, explanation: '`row` 沿着行的方向填充(水平优先),`column` 沿着列的方向填充(垂直优先)。绝大多数场景用默认的 `row` 即可。' },

      { type: 'heading', text: 'dense 打包:填充空洞但打乱顺序' },
      { type: 'paragraph', text: '`dense` 关键字让自动放置算法**回填早期的空洞**。当某些项目跨越多个轨道时,可能产生空洞,`dense` 会尝试用后续项目填充这些空洞。' },
      { type: 'code', lang: 'css', caption: 'dense 打包的使用', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-flow: row dense;  /* row + dense */\n}\n\n.wide {\n  grid-column: span 2;  /* 某些项目跨 2 列 */\n}` },
      { type: 'example', title: 'dense 的效果演示', lang: 'html', code: `<!-- 没有 dense:项目 1(宽2) 2(宽1) 3(宽2) 4(宽1) -->\n<!-- 排列:1 1 2 -->\n<!--      3 3 . -->\n<!--      4 . . -->\n\n<!-- 使用 dense:自动放置算法会把项目 4 提前填到第 1 行末尾 -->\n<!-- 排列:1 1 2 -->\n<!--      3 3 4 -->`, explanation: '`dense` 让布局更紧凑,但**视觉顺序可能与 HTML 源顺序不一致**,这会影响键盘导航和屏幕阅读器用户的体验。除非你明确需要紧凑布局(如图片墙),否则慎用。' },
      { type: 'warning', text: '使用 `dense` 会导致视觉顺序与 DOM 顺序不一致,影响可访问性。键盘用户按 Tab 键的焦点顺序仍然是 DOM 顺序,但视觉上会跳来跳去,造成困惑。' },

      { type: 'heading', text: '自动放置算法的工作原理' },
      { type: 'paragraph', text: '理解自动放置算法的步骤有助于预测项目的位置。算法按以下顺序处理项目:' },
      { type: 'list', items: [
        '**步骤 1**:放置显式定位的项目(同时指定了 row 和 column 的项目)',
        '**步骤 2**:放置部分定位的项目(只指定了 row 或只指定了 column 的项目)',
        '**步骤 3**:放置完全自动的项目(没有指定任何位置的项目)',
        '**步骤 4**:如果没有足够的显式轨道,创建隐式轨道来容纳所有项目'
      ] },
      { type: 'paragraph', text: '在步骤 3 中,算法从第一个空单元格开始,按 `grid-auto-flow` 指定的方向逐个搜索足够大的空区域。如果是 `dense` 模式,每次放置都从第一个空单元格重新搜索;否则,只向前搜索,不回头。' },

      { type: 'heading', text: '混合显式和自动放置' },
      { type: 'paragraph', text: '你可以给某些项目指定固定位置,让其他项目自动放置到剩余空间。这种混合模式非常灵活。' },
      { type: 'code', lang: 'css', caption: '混合放置示例', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: 100px;\n}\n\n.fixed {\n  /* 这个项目固定在第 2 行、第 3-4 列 */\n  grid-row: 2;\n  grid-column: 3 / 5;\n}\n\n/* 其他项目自动放置,会避开 .fixed 占据的区域 */` },

      { type: 'heading', text: 'order 属性影响自动放置顺序' },
      { type: 'paragraph', text: '`order` 属性不仅影响绘制顺序,还影响自动放置算法处理项目的顺序。`order` 值小的项目先被放置。' },
      { type: 'code', lang: 'css', caption: '用 order 改变放置顺序', code: `.item-1 { order: 2; }\n.item-2 { order: 1; }\n.item-3 { order: 3; }\n\n/* 自动放置顺序:item-2 → item-1 → item-3 */` },
      { type: 'warning', text: '`order` 只改变视觉顺序和自动放置顺序,不改变 DOM 顺序。键盘导航和屏幕阅读器仍然按 DOM 顺序工作。' },

      { type: 'heading', text: 'grid 简写属性' },
      { type: 'paragraph', text: '`grid` 是终极简写属性,可以一次性设置 `grid-template-*` 和 `grid-auto-*` 的所有属性。它有多种语法形式。' },
      { type: 'code', lang: 'css', caption: 'grid 简写的常见形式', code: `/* 形式 1:grid-template 简写 */\ngrid: 100px 200px / 1fr 2fr;\n/* 等价于 */\ngrid-template-rows: 100px 200px;\ngrid-template-columns: 1fr 2fr;\n\n/* 形式 2:auto-flow 语法 */\ngrid: auto-flow / 1fr 1fr;\n/* 等价于 */\ngrid-auto-flow: row;\ngrid-template-columns: 1fr 1fr;\n/* (隐式行,显式列) */\n\n/* 形式 3:auto-flow dense + 隐式轨道尺寸 */\ngrid: auto-flow dense 100px / 1fr 2fr;\n/* 等价于 */\ngrid-auto-flow: row dense;\ngrid-auto-rows: 100px;\ngrid-template-columns: 1fr 2fr;` },

      { type: 'heading', text: '实战:瀑布流(Masonry-like)布局' },
      { type: 'code', lang: 'css', caption: '使用 dense 打包的紧凑图片墙', code: `.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  grid-auto-rows: 100px;  /* 每行高度单位 */\n  grid-auto-flow: dense;  /* 紧凑打包 */\n  gap: 10px;\n}\n\n.gallery-item {\n  /* 某些图片占 1 行,某些占 2-3 行 */\n}\n\n.tall {\n  grid-row: span 2;\n}\n\n.extra-tall {\n  grid-row: span 3;\n}` },
      { type: 'paragraph', text: '这个布局会自动调整列数(响应式),并通过 `dense` 打包尽可能填充空洞。不同高度的图片会自然地拼接在一起,形成类似瀑布流的效果。注意:这不是真正的瀑布流(列高不平衡的那种),但视觉上已经很接近了。' },
      { type: 'tip', text: '如果你需要真正的瀑布流(每列独立堆叠,自动填充到最短列),目前需要用 JavaScript 或等待 CSS Masonry 规范(仍在草案阶段)。Grid + `dense` 是目前最接近的纯 CSS 方案。' },
    ] as TutorialBlock[],
  },
  {
    id: 'grid-alignment',
    number: '5',
    title: { zh: 'Grid 对齐与间距', en: 'Grid Alignment & Spacing' },
    summary: { zh: 'Box Alignment 属性在网格中控制轨道和项目的对齐。justify-items/self 控制行内轴对齐,align-items/self 控制块轴对齐。gap 属性(原 grid-gap)定义轨道间距。', en: 'Box Alignment properties control track and item alignment in the grid. justify-items/self control inline-axis alignment, align-items/self control block-axis alignment. The gap property (formerly grid-gap) defines track spacing.' },
    keyPoints: [
      'justify-items/justify-self:控制网格项目在其网格区域内的行内轴(水平,LTR 时)对齐。值:start、end、center、stretch(默认)',
      'align-items/align-self:控制网格项目在其网格区域内的块轴(垂直)对齐。值:start、end、center、stretch、baseline',
      'place-items 简写:<align-items> <justify-items>。单值时两轴相同。place-items: center 使项目在两个方向居中',
      'place-self 简写:<align-self> <justify-self>。单值时两轴相同',
      'justify-content/align-content:当网格总尺寸小于网格容器时,控制网格轨道在容器内的对齐和分布。值:start、end、center、stretch、space-between、space-around、space-evenly',
      'place-content 简写:<align-content> <justify-content>。单值时两轴相同',
      'row-gap 和 column-gap(原 grid-row-gap、grid-column-gap):定义行和列之间的间距(gutter)。接受长度或百分比',
      'gap 简写:<row-gap> <column-gap>。单值时行列间距相同。gap: 20px 等价于 row-gap: 20px; column-gap: 20px',
      '间距(gutters)行为:插入在轨道之间,不出现在边缘;间距类似于额外的固定尺寸轨道,但不能放置项目;百分比间距相对于容器的对应维度',
      'stretch 对齐:网格项目默认拉伸以填充网格区域。如果项目有固定尺寸(width/height),拉伸不生效',
      'baseline 对齐:将网格项目的基线对齐。第一行项目对齐 first baseline,其他行对齐 last baseline',
      'auto margins:网格项目的 auto margin 吸收额外空间,可用于对齐(类似 flex)。auto margin 优先于 justify-self/align-self',
      'Grid 对齐 vs Flex 对齐:justify-items 对 flex 容器不适用(无效);grid 中 align-items 默认是 stretch,flex 中也是 stretch',
    ],
    tutorial: [
      { type: 'heading', text: '理解 Grid 的两个对齐维度' },
      { type: 'paragraph', text: 'Grid 有两个对齐维度:**行内轴**(inline axis,在 LTR 语言中是水平方向)和**块轴**(block axis,垂直方向)。对齐属性分为两类:控制**项目在网格区域内**的对齐(`justify-items/self`、`align-items/self`),以及控制**整个网格在容器内**的对齐(`justify-content`、`align-content`)。' },
      { type: 'tip', text: '记住规律:`justify-*` 控制行内轴(水平),`align-*` 控制块轴(垂直)。`*-items` 应用于容器(影响所有项目),`*-self` 应用于单个项目(覆盖容器设置)。' },

      { type: 'heading', text: 'justify-items 和 justify-self:行内轴对齐' },
      { type: 'paragraph', text: '`justify-items` 设置在网格容器上,控制所有网格项目在其网格区域内的行内轴对齐。`justify-self` 设置在单个项目上,覆盖容器的设置。' },
      { type: 'code', lang: 'css', caption: 'justify-items 的值', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  \n  /* start:项目对齐到网格区域的起始边(左侧,LTR 时) */\n  justify-items: start;\n  \n  /* end:对齐到结束边(右侧) */\n  /* justify-items: end; */\n  \n  /* center:水平居中 */\n  /* justify-items: center; */\n  \n  /* stretch(默认):拉伸填充整个网格区域宽度 */\n  /* justify-items: stretch; */\n}` },
      { type: 'example', title: '单个项目覆盖容器设置', lang: 'css', code: `.grid {\n  justify-items: start;  /* 所有项目左对齐 */\n}\n\n.special-item {\n  justify-self: center;  /* 这个项目单独居中 */\n}`, explanation: '`justify-self` 让你精确控制单个项目的对齐,而不影响其他项目。这在卡片布局、表单设计中非常有用。' },

      { type: 'heading', text: 'align-items 和 align-self:块轴对齐' },
      { type: 'paragraph', text: '`align-items` 和 `align-self` 控制块轴(垂直)对齐,用法与 `justify-*` 完全对称。' },
      { type: 'code', lang: 'css', caption: 'align-items 的值', code: `.grid {\n  display: grid;\n  grid-template-rows: repeat(3, 150px);\n  \n  /* start:项目对齐到网格区域的顶部 */\n  align-items: start;\n  \n  /* end:对齐到底部 */\n  /* align-items: end; */\n  \n  /* center:垂直居中 */\n  /* align-items: center; */\n  \n  /* stretch(默认):拉伸填充整个网格区域高度 */\n  /* align-items: stretch; */\n  \n  /* baseline:基线对齐(文本底部对齐) */\n  /* align-items: baseline; */\n}` },
      { type: 'warning', text: 'stretch 对齐只在项目没有固定尺寸时生效。如果你给项目设置了 `width: 100px`,`justify-items: stretch` 不会覆盖这个宽度。要让 stretch 生效,移除固定尺寸或使用 `width: auto`。' },

      { type: 'heading', text: 'place-items 和 place-self 简写' },
      { type: 'paragraph', text: '`place-items` 和 `place-self` 是简写属性,一次性设置两个轴的对齐。语法是 `<align-*> <justify-*>`,如果只写一个值,两个轴使用相同的对齐。' },
      { type: 'code', lang: 'css', caption: 'place-items 的实用简写', code: `/* 两个轴都居中(最常用) */\nplace-items: center;\n/* 等价于 */\nalign-items: center;\njustify-items: center;\n\n/* 垂直居中,水平 start */\nplace-items: center start;\n\n/* 单个项目的简写 */\n.item {\n  place-self: end center;  /* 底部,水平居中 */\n}` },

      { type: 'heading', text: 'justify-content 和 align-content:网格轨道的分布' },
      { type: 'paragraph', text: '当网格的总尺寸**小于容器尺寸**时(比如网格宽 600px,但容器宽 800px),`justify-content` 和 `align-content` 控制整个网格在容器内的位置和轨道之间的分布。' },
      { type: 'code', lang: 'css', caption: 'justify-content 的分布值', code: `.container {\n  display: grid;\n  grid-template-columns: 100px 100px 100px;  /* 总宽 300px */\n  width: 600px;  /* 容器宽 600px,有 300px 剩余空间 */\n  \n  /* start:网格靠左,剩余空间在右侧 */\n  justify-content: start;\n  \n  /* end:网格靠右 */\n  /* justify-content: end; */\n  \n  /* center:网格居中 */\n  /* justify-content: center; */\n  \n  /* space-between:首尾轨道贴边,中间轨道均分剩余空间 */\n  /* justify-content: space-between; */\n  \n  /* space-around:每个轨道两侧有相等空间(首尾轨道外侧空间是中间的一半) */\n  /* justify-content: space-around; */\n  \n  /* space-evenly:所有间隙相等(包括首尾) */\n  /* justify-content: space-evenly; */\n}` },
      { type: 'example', title: 'space-* 值的区别', lang: 'html', code: `<!-- space-between: |列1___列2___列3| (首尾无空隙) -->\n<!-- space-around:  _|列1___列2___列3|_ (首尾空隙是中间的一半) -->\n<!-- space-evenly: __|列1__列2__列3__ (所有空隙相等) -->`, explanation: '`space-between` 适合需要"两端对齐"的布局,`space-evenly` 适合需要"均匀分布"的布局。`space-around` 介于两者之间。' },

      { type: 'heading', text: 'place-content 简写' },
      { type: 'paragraph', text: '`place-content` 一次性设置 `align-content` 和 `justify-content`。' },
      { type: 'code', lang: 'css', caption: 'place-content 居中整个网格', code: `.container {\n  display: grid;\n  grid-template-columns: 200px 200px;\n  grid-template-rows: 100px 100px;\n  width: 600px;\n  height: 400px;\n  \n  /* 网格在容器中垂直和水平都居中 */\n  place-content: center;\n}` },

      { type: 'heading', text: 'gap、row-gap、column-gap:轨道间距' },
      { type: 'paragraph', text: '`gap`(以前叫 `grid-gap`)定义网格轨道之间的间距。间距插入在轨道之间,不出现在容器边缘。' },
      { type: 'code', lang: 'css', caption: 'gap 的基本用法', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  \n  /* 行列间距都是 20px */\n  gap: 20px;\n  \n  /* 等价于 */\n  /* row-gap: 20px; */\n  /* column-gap: 20px; */\n}\n\n/* 行列间距不同 */\n.grid-2 {\n  gap: 10px 20px;  /* 行间距 10px,列间距 20px */\n}` },
      { type: 'tip', text: '`gap` 是现代 CSS 的通用属性,Flexbox、Grid、多列布局都支持。老代码中可能看到 `grid-gap`、`grid-row-gap`、`grid-column-gap`,它们已经被标准化为 `gap`、`row-gap`、`column-gap`(无前缀)。' },

      { type: 'heading', text: '间距的行为特性' },
      { type: 'list', items: [
        '**间距只出现在轨道之间**,不出现在容器边缘。3 列网格有 2 个列间距,4 行网格有 3 个行间距',
        '**间距类似于固定尺寸的轨道**,但不能放置项目。计算 `fr` 单位时,间距会先被扣除',
        '**百分比间距**相对于容器的对应维度。`row-gap: 5%` 相对于容器高度,`column-gap: 10%` 相对于容器宽度',
        '**间距不会 collapse**,即使相邻的两个间距也会累加(不像 margin 那样折叠)'
      ] },

      { type: 'heading', text: 'stretch vs 固定尺寸' },
      { type: 'paragraph', text: '网格项目默认 `justify-items: stretch` 和 `align-items: stretch`,会拉伸填充整个网格区域。但如果项目有固定尺寸,拉伸不会覆盖固定尺寸。' },
      { type: 'code', lang: 'css', caption: 'stretch 的生效条件', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  justify-items: stretch;  /* 默认值 */\n}\n\n.item-auto {\n  /* width: auto (默认),stretch 生效,宽度 = 200px */\n}\n\n.item-fixed {\n  width: 100px;  /* 固定宽度,stretch 不生效,宽度 = 100px */\n}` },

      { type: 'heading', text: 'auto margin 的对齐技巧' },
      { type: 'paragraph', text: '网格项目可以使用 `auto` margin 来吸收额外空间,实现对齐。`auto` margin 的优先级高于 `justify-self` 和 `align-self`。' },
      { type: 'example', title: '用 margin 居中项目', lang: 'css', code: `.item {\n  /* 水平居中 */\n  margin-left: auto;\n  margin-right: auto;\n  \n  /* 垂直居中 */\n  margin-top: auto;\n  margin-bottom: auto;\n  \n  /* 或者简写 */\n  margin: auto;  /* 水平和垂直都居中 */\n}`, explanation: '`margin: auto` 在 Grid 中的行为类似 Flexbox,会让项目在网格区域内居中。这种方法比 `place-self: center` 更灵活,因为你可以单独控制某一个方向。' },

      { type: 'heading', text: 'baseline 对齐' },
      { type: 'paragraph', text: '`baseline` 对齐让网格项目的文本基线对齐,常用于表单标签、卡片标题等需要文本对齐的场景。' },
      { type: 'code', lang: 'css', caption: 'baseline 对齐示例', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: baseline;  /* 第一行项目的基线对齐 */\n}\n\n/* 即使项目有不同的 padding、font-size,文本底部也会对齐 */` },
      { type: 'warning', text: '`baseline` 对齐只对包含文本的项目有意义。如果项目是图片或空 div,baseline 退化为 `start` 对齐。' },

      { type: 'heading', text: '实战:Grid 完美居中' },
      { type: 'code', lang: 'css', caption: '用 Grid 实现水平垂直居中', code: `.container {\n  display: grid;\n  place-items: center;  /* 项目在网格区域内居中 */\n  /* 如果容器有固定高度,这是最简单的居中方案 */\n  height: 100vh;\n}\n\n.centered-content {\n  /* 不需要任何额外样式,自动居中 */\n}` },
      { type: 'paragraph', text: '这是 Grid 最优雅的应用之一。只需 `place-items: center`,就能让内容在任何尺寸的容器中完美居中,无需计算、无需 transform、无需 absolute。' },

      { type: 'tip', text: 'Grid 居中 vs Flexbox 居中:Grid 的 `place-items: center` 更简洁(一行搞定),Flexbox 需要 `justify-content: center` + `align-items: center` 两行。但 Flexbox 更适合多个项目的居中分布。' },
    ] as TutorialBlock[],
  },
  {
    id: 'grid-subgrid',
    number: '6',
    title: { zh: '子网格', en: 'Subgrid' },
    summary: { zh: '子网格(subgrid)是 CSS Grid Level 2 的特性,允许网格项目继承父网格的轨道定义。通过 grid-template-rows/columns: subgrid 启用,使嵌套网格的项目与父网格对齐。', en: 'Subgrid is a CSS Grid Level 2 feature that allows a grid item to inherit the track definition from its parent grid. Enabled via grid-template-rows/columns: subgrid, it aligns nested grid items with the parent grid.' },
    keyPoints: [
      'grid-template-rows: subgrid 或 grid-template-columns: subgrid:使网格项目成为子网格,继承父网格在该轴的轨道定义',
      '子网格轴:可以只在一个轴使用 subgrid,另一轴定义独立网格;也可以两轴都使用 subgrid',
      '轨道继承:子网格继承父网格在子网格区域内的轨道尺寸和网格线名。子网格项目参与父网格的轨道尺寸计算',
      '命名线继承:子网格继承父网格的命名网格线。子网格可以定义自己的命名线,不影响父网格',
      '子网格的子网格:子网格可以嵌套,孙网格可以继承祖先网格的轨道',
      '子网格用例:表单标签对齐、卡片网格内部对齐、复杂布局中的跨层对齐',
      '子网格 gap:子网格默认继承父网格的 gap;也可以指定自己的 gap,但这会影响项目放置和对齐',
      '子网格与自动放置:子网格项目的自动放置仅在子网格的范围内,使用父网格的线编号',
      'subgrid 关键字位置:放在 grid-template-rows/columns 中,可选后跟命名线列表为子网格添加额外命名线',
      '子网格限制:子网格必须是网格项目(父元素是网格容器)。如果父元素不是网格容器,subgrid 值计算为 none',
    ],
    tutorial: [
      { type: 'heading', text: '什么问题需要 subgrid 来解决?' },
      { type: 'paragraph', text: '在 subgrid 出现之前,嵌套网格是**独立的**。父网格定义外层布局,子网格定义内层布局,两者的轨道完全不关联。这导致一个常见问题:子网格内的元素无法与父网格的元素对齐。' },
      { type: 'example', title: '没有 subgrid 的对齐困境', lang: 'css', code: `/* 父网格:卡片列表,3 列 */\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n/* 每张卡片内部也是网格(标题、内容、按钮) */\n.card {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}\n\n/* 问题:每张卡片的标题高度不同,按钮位置参差不齐 */\n/* 卡片 A 的按钮在底部 200px,卡片 B 的按钮在底部 150px */`, explanation: '因为每张卡片是独立的网格,它们的行高由各自的内容决定。即使我们希望所有卡片的按钮在同一水平线上,也无法实现——除非用 JavaScript 或固定高度。subgrid 正是为了解决这类"跨层对齐"问题而生。' },

      { type: 'heading', text: 'subgrid 基础语法' },
      { type: 'paragraph', text: '让一个网格项目成为子网格的方法很简单:把 `grid-template-rows` 或 `grid-template-columns` 的值设为 `subgrid`。这个项目就会继承父网格在该轴的轨道定义。' },
      { type: 'code', lang: 'css', caption: '单轴 subgrid', code: `.parent {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n}\n\n.child {\n  display: grid;\n  grid-column: 1 / 3;  /* 占据父网格的前 2 列 */\n  \n  /* 继承父网格的列定义(在这个区域内是 2 列) */\n  grid-template-columns: subgrid;\n  \n  /* 行轴自己定义 */\n  grid-template-rows: auto 1fr auto;\n}` },
      { type: 'paragraph', text: '现在 `.child` 的列轨道与父网格完全同步。`.child` 内的项目会对齐到父网格的列线,实现跨层对齐。' },

      { type: 'heading', text: '单轴 vs 双轴 subgrid' },
      { type: 'paragraph', text: '你可以只在一个轴使用 `subgrid`,另一个轴定义独立的网格;也可以两个轴都使用 `subgrid`,完全继承父网格的结构。' },
      { type: 'code', lang: 'css', caption: '双轴 subgrid', code: `.parent {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(4, 100px);\n}\n\n.child {\n  display: grid;\n  grid-column: 1 / 3;\n  grid-row: 2 / 4;\n  \n  /* 列和行都继承父网格 */\n  grid-template-columns: subgrid;\n  grid-template-rows: subgrid;\n}\n\n/* .child 内部现在有 2 列(继承父网格的第 1-2 列)、2 行(继承父网格的第 2-3 行) */` },
      { type: 'tip', text: '大多数场景下只需要单轴 subgrid。比如卡片列表,列对齐用 subgrid,行高度每张卡片自己决定。双轴 subgrid 适合更复杂的表格或嵌套布局。' },

      { type: 'heading', text: '轨道和线名继承' },
      { type: 'paragraph', text: '子网格继承父网格在其区域内的**轨道尺寸**和**网格线名**。这意味着父网格的命名线在子网格中仍然有效。' },
      { type: 'code', lang: 'css', caption: '继承命名线', code: `.parent {\n  display: grid;\n  grid-template-columns: [start] 1fr [middle] 1fr [end];\n}\n\n.child {\n  display: grid;\n  grid-column: start / end;  /* 跨越整个父网格宽度 */\n  grid-template-columns: subgrid;\n}\n\n.grandchild {\n  /* 可以使用父网格的线名 */\n  grid-column: start / middle;\n}` },
      { type: 'paragraph', text: '子网格也可以定义自己的命名线,语法是 `subgrid [line-name-list]`。这些线名只在子网格内有效,不会影响父网格。' },
      { type: 'code', lang: 'css', caption: '子网格添加自己的线名', code: `.child {\n  grid-template-columns: subgrid [child-start] [child-middle] [child-end];\n  /* 继承父网格的轨道,同时给每条线添加子网格专用的名字 */\n}` },

      { type: 'heading', text: 'subgrid 与内容尺寸计算' },
      { type: 'paragraph', text: 'subgrid 的强大之处在于**子网格项目参与父网格的轨道尺寸计算**。如果父网格的某列是 `auto` 或 `1fr`,浏览器会考虑所有子网格项目的内容来计算这一列的最终尺寸。' },
      { type: 'example', title: 'subgrid 如何影响父网格轨道尺寸', lang: 'css', code: `.parent {\n  display: grid;\n  grid-template-columns: auto 1fr auto;  /* 第 1、3 列根据内容调整 */\n}\n\n.child {\n  display: grid;\n  grid-column: 1 / -1;\n  grid-template-columns: subgrid;\n}\n\n.grandchild-wide {\n  grid-column: 3;  /* 在父网格的第 3 列 */\n  /* 如果这个元素很宽,父网格的第 3 列会扩展以容纳它 */\n}`, explanation: '即使 `.grandchild-wide` 嵌套在两层网格内,它的宽度仍然会影响父网格第 3 列的尺寸。这就是 subgrid 的"穿透"能力——内容可以跨层影响布局。' },

      { type: 'heading', text: '用例 1:表单标签对齐' },
      { type: 'paragraph', text: 'subgrid 最经典的应用场景是表单。你希望所有标签右对齐,所有输入框左对齐,即使标签和输入框在不同的 `<fieldset>` 中。' },
      { type: 'code', lang: 'css', caption: '表单标签完美对齐', code: `.form {\n  display: grid;\n  grid-template-columns: auto 1fr;  /* 标签列 auto,输入列占据剩余空间 */\n  gap: 10px 20px;\n}\n\n.fieldset {\n  display: grid;\n  grid-column: 1 / -1;  /* 跨越两列 */\n  grid-template-columns: subgrid;  /* 继承父网格的列定义 */\n}\n\n/* 现在 fieldset 内的 label 和 input 会自动对齐到父网格的列 */`, explanation: '每个 `fieldset` 内部的标签都会对齐到父网格的第 1 列,输入框都对齐到第 2 列。即使有多个 `fieldset`,对齐也是一致的。' },

      { type: 'heading', text: '用例 2:卡片网格内部对齐' },
      { type: 'paragraph', text: '卡片列表是 subgrid 的另一个杀手级应用。你希望所有卡片的标题、内容、按钮在各自的行上对齐,即使每张卡片的内容长度不同。' },
      { type: 'code', lang: 'css', caption: '卡片网格行对齐', code: `.card-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 1fr auto;  /* 标题 auto,内容 1fr,按钮 auto */\n  gap: 20px;\n}\n\n.card {\n  display: grid;\n  grid-row: 1 / -1;  /* 每张卡片跨越所有行 */\n  grid-template-rows: subgrid;  /* 继承父网格的行定义 */\n}\n\n.card-title   { grid-row: 1; }\n.card-content { grid-row: 2; }\n.card-button  { grid-row: 3; }\n\n/* 所有卡片的按钮都在第 3 行,自动底部对齐 */` },
      { type: 'paragraph', text: '这个布局在没有 subgrid 之前几乎无法用纯 CSS 实现(除非固定高度或用 Flexbox hack)。subgrid 让它变得简单而优雅。' },

      { type: 'heading', text: 'subgrid 的 gap 继承' },
      { type: 'paragraph', text: '子网格默认继承父网格的 `gap`。你也可以给子网格指定自己的 `gap`,但这可能导致对齐不一致。' },
      { type: 'code', lang: 'css', caption: 'gap 继承与覆盖', code: `.parent {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n}\n\n.child {\n  display: grid;\n  grid-template-columns: subgrid;\n  /* 默认继承 gap: 20px */\n}\n\n.child-custom-gap {\n  display: grid;\n  grid-template-columns: subgrid;\n  gap: 10px;  /* 覆盖父网格的 gap */\n  /* 这可能导致子网格项目与父网格项目的对齐出现偏移 */\n}` },
      { type: 'warning', text: '覆盖 gap 会破坏对齐。除非你有特殊需求,否则让子网格继承父网格的 gap。' },

      { type: 'heading', text: '浏览器支持情况' },
      { type: 'paragraph', text: 'subgrid 是 CSS Grid Level 2 的特性,浏览器支持如下:' },
      { type: 'list', items: [
        '**Firefox**:完全支持(自 Firefox 71,2019 年 12 月)',
        '**Safari**:完全支持(自 Safari 16,2022 年 9 月)',
        '**Chrome/Edge**:完全支持(自 Chrome 117,2023 年 9 月)',
        '**移动浏览器**:iOS Safari 16+、Chrome Android 117+、Firefox Android 79+ 支持'
      ] },
      { type: 'paragraph', text: '截至 2024 年,subgrid 已经在所有主流浏览器中得到支持,可以放心使用。对于老浏览器,可以用 `@supports` 提供降级方案。' },
      { type: 'code', lang: 'css', caption: '渐进增强策略', code: `.card {\n  display: grid;\n  grid-template-rows: auto 1fr auto;  /* 降级:独立网格 */\n}\n\n@supports (grid-template-rows: subgrid) {\n  .card {\n    grid-template-rows: subgrid;  /* 增强:使用 subgrid */\n  }\n}` },

      { type: 'heading', text: '嵌套子网格' },
      { type: 'paragraph', text: 'subgrid 可以嵌套。子网格的子网格(孙网格)可以继续使用 `subgrid`,继承祖先网格的轨道。' },
      { type: 'code', lang: 'css', caption: '三层嵌套 subgrid', code: `.grandparent {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n}\n\n.parent {\n  display: grid;\n  grid-column: 1 / 5;  /* 占据祖先网格的前 4 列 */\n  grid-template-columns: subgrid;\n}\n\n.child {\n  display: grid;\n  grid-column: 2 / 4;  /* 占据父网格的第 2-3 列(即祖先网格的第 2-3 列) */\n  grid-template-columns: subgrid;  /* 继承祖先网格的列定义 */\n}` },
      { type: 'tip', text: '嵌套 subgrid 让复杂布局变得可能,但也增加了理解难度。除非必要,尽量控制在 2 层以内。' },

      { type: 'heading', text: '实战:对齐的产品卡片网格' },
      { type: 'code', lang: 'css', caption: '完整的 subgrid 卡片布局', code: `.product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  grid-template-rows: auto auto 1fr auto auto;  /* 图片、标题、描述、价格、按钮 */\n  gap: 30px 20px;\n}\n\n.product-card {\n  display: grid;\n  grid-row: 1 / -1;  /* 跨越所有 5 行 */\n  grid-template-rows: subgrid;  /* 继承父网格的行定义 */\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.product-image  { grid-row: 1; }\n.product-title  { grid-row: 2; padding: 15px 15px 0; }\n.product-desc   { grid-row: 3; padding: 0 15px; }\n.product-price  { grid-row: 4; padding: 0 15px; font-weight: bold; }\n.product-button { grid-row: 5; margin: 15px; }` },
      { type: 'paragraph', text: '这个布局确保了所有产品卡片的结构完全对齐:所有图片在同一高度,所有标题在同一高度,所有按钮在同一高度。即使某些产品描述很长、某些很短,布局也不会错乱。这就是 subgrid 的威力。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {
  'grid-containers': 'grid-container',
  'grid-items': 'grid-container',
  'track-sizing': 'grid-template',
  'fr-unit': 'grid-template',
  'repeat-notation': 'grid-template',
  'auto-repeat': 'grid-template',
  'line-placement': 'grid-placement',
  'grid-placement-property': 'grid-placement',
  'common-uses': 'grid-placement',
  'auto-placement-algo': 'grid-auto',
  'implicit-grids': 'grid-auto',
  'alignment': 'grid-alignment',
  'gutters': 'grid-alignment',
  'subgrids': 'grid-subgrid',
  'grid-model': 'grid-container',
  'grid-definition': 'grid-template',
  'placement': 'grid-placement',
  'auto-placement': 'grid-auto',
  'grid-align': 'grid-alignment',
  'overlapping-items': 'grid-placement',
};

// ============================================================
// 属性定义(CSS Grid Layout)
// ============================================================

const GRID1 = 'https://www.w3.org/TR/css-grid-1/';
const GRID2 = 'https://www.w3.org/TR/css-grid-2/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ── grid-template-rows ──
  'grid-template-rows': {
    zh: '网格模板行',
    value: 'none | <track-list> | <auto-track-list> | subgrid <line-name-list>?',
    initial: 'none',
    appliesTo: '网格容器',
    inherited: false,
    percentages: '相对于网格容器的块尺寸',
    computedValue: '指定值,百分比按指定值,长度值绝对化',
    css2Url: '',
    css3Url: `${GRID2}#propdef-grid-template-rows`,
    sectionRef: 'grid#grid-template',
  },

  // ── grid-template-columns ──
  'grid-template-columns': {
    zh: '网格模板列',
    value: 'none | <track-list> | <auto-track-list> | subgrid <line-name-list>?',
    initial: 'none',
    appliesTo: '网格容器',
    inherited: false,
    percentages: '相对于网格容器的行内尺寸',
    computedValue: '指定值,百分比按指定值,长度值绝对化',
    css2Url: '',
    css3Url: `${GRID2}#propdef-grid-template-columns`,
    sectionRef: 'grid#grid-template',
  },

  // ── grid-template-areas ──
  'grid-template-areas': {
    zh: '网格模板区域',
    value: 'none | <string>+',
    initial: 'none',
    appliesTo: '网格容器',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-template-areas`,
    sectionRef: 'grid#grid-template',
  },

  // ── grid-template ──
  'grid-template': {
    zh: '网格模板简写',
    value: 'none | [ <\'grid-template-rows\'> / <\'grid-template-columns\'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?',
    initial: 'none',
    appliesTo: '网格容器',
    inherited: false,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-template`,
    sectionRef: 'grid#grid-template',
  },

  // ── grid-auto-rows ──
  'grid-auto-rows': {
    zh: '自动行尺寸',
    value: '<track-size>+',
    initial: 'auto',
    appliesTo: '网格容器',
    inherited: false,
    percentages: '相对于网格容器的块尺寸',
    computedValue: '指定值,百分比按指定值,长度值绝对化',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-auto-rows`,
    sectionRef: 'grid#grid-auto',
  },

  // ── grid-auto-columns ──
  'grid-auto-columns': {
    zh: '自动列尺寸',
    value: '<track-size>+',
    initial: 'auto',
    appliesTo: '网格容器',
    inherited: false,
    percentages: '相对于网格容器的行内尺寸',
    computedValue: '指定值,百分比按指定值,长度值绝对化',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-auto-columns`,
    sectionRef: 'grid#grid-auto',
  },

  // ── grid-auto-flow ──
  'grid-auto-flow': {
    zh: '自动放置流',
    value: '[ row | column ] || dense',
    initial: 'row',
    appliesTo: '网格容器',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-auto-flow`,
    sectionRef: 'grid#grid-auto',
  },

  // ── grid ──
  'grid': {
    zh: '网格简写',
    value: '<\'grid-template\'> | <\'grid-template-rows\'> / [ auto-flow && dense? ] <\'grid-auto-columns\'>? | [ auto-flow && dense? ] <\'grid-auto-rows\'>? / <\'grid-template-columns\'>',
    initial: '见各子属性',
    appliesTo: '网格容器',
    inherited: false,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid`,
    sectionRef: 'grid#grid-auto',
  },

  // ── grid-row-start ──
  'grid-row-start': {
    zh: '网格行起点',
    value: '<grid-line>',
    initial: 'auto',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-row-start`,
    sectionRef: 'grid#grid-placement',
  },

  // ── grid-row-end ──
  'grid-row-end': {
    zh: '网格行终点',
    value: '<grid-line>',
    initial: 'auto',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-row-end`,
    sectionRef: 'grid#grid-placement',
  },

  // ── grid-column-start ──
  'grid-column-start': {
    zh: '网格列起点',
    value: '<grid-line>',
    initial: 'auto',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-column-start`,
    sectionRef: 'grid#grid-placement',
  },

  // ── grid-column-end ──
  'grid-column-end': {
    zh: '网格列终点',
    value: '<grid-line>',
    initial: 'auto',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-column-end`,
    sectionRef: 'grid#grid-placement',
  },

  // ── grid-row ──
  'grid-row': {
    zh: '网格行简写',
    value: '<grid-line> [ / <grid-line> ]?',
    initial: '见各子属性',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-row`,
    sectionRef: 'grid#grid-placement',
  },

  // ── grid-column ──
  'grid-column': {
    zh: '网格列简写',
    value: '<grid-line> [ / <grid-line> ]?',
    initial: '见各子属性',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-column`,
    sectionRef: 'grid#grid-placement',
  },

  // ── grid-area ──
  'grid-area': {
    zh: '网格区域简写',
    value: '<grid-line> [ / <grid-line> ]{0,3}',
    initial: '见各子属性',
    appliesTo: '网格项目和绝对定位的网格容器子元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${GRID1}#propdef-grid-area`,
    sectionRef: 'grid#grid-placement',
  },

  // ── row-gap ──
  'row-gap': {
    zh: '行间距',
    value: 'normal | <length-percentage>',
    initial: 'normal',
    appliesTo: '多列容器、flex 容器、grid 容器',
    inherited: false,
    percentages: '相对于容器的块尺寸',
    computedValue: '指定关键字或绝对长度',
    css2Url: '',
    css3Url: `${GRID1}#propdef-row-gap`,
    sectionRef: 'grid#grid-alignment',
  },

  // ── column-gap ──
  'column-gap': {
    zh: '列间距',
    value: 'normal | <length-percentage>',
    initial: 'normal',
    appliesTo: '多列容器、flex 容器、grid 容器',
    inherited: false,
    percentages: '相对于容器的行内尺寸',
    computedValue: '指定关键字或绝对长度',
    css2Url: '',
    css3Url: `${GRID1}#propdef-column-gap`,
    sectionRef: 'grid#grid-alignment',
  },

  // ── gap ──
  'gap': {
    zh: '间距简写',
    value: '<\'row-gap\'> <\'column-gap\'>?',
    initial: '见各子属性',
    appliesTo: '多列容器、flex 容器、grid 容器',
    inherited: false,
    percentages: '见各子属性',
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: `${GRID1}#propdef-gap`,
    sectionRef: 'grid#grid-alignment',
  },

  // Note: justify-items, align-items, justify-self, align-self are defined in Box Alignment
  // We add grid-specific references here for place-* shorthands

  // ── place-items ──
  'place-items': {
    zh: '放置项目简写',
    value: '<\'align-items\'> <\'justify-items\'>?',
    initial: '见各子属性',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-place-items',
    sectionRef: 'grid#grid-alignment',
  },

  // ── place-self ──
  'place-self': {
    zh: '自身放置简写',
    value: '<\'align-self\'> <\'justify-self\'>?',
    initial: '见各子属性',
    appliesTo: '块级盒子、绝对定位盒子、grid 项目',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-place-self',
    sectionRef: 'grid#grid-alignment',
  },

  // ── place-content ──
  'place-content': {
    zh: '内容放置简写',
    value: '<\'align-content\'> <\'justify-content\'>?',
    initial: '见各子属性',
    appliesTo: '块容器、flex 容器、grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '见各子属性',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-place-content',
    sectionRef: 'grid#grid-alignment',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'grid container': {
    zh: '网格容器',
    description:
      'display 值为 grid 或 inline-grid 的元素。网格容器为其内容建立网格格式化上下文,其子元素成为网格项目。',
    sectionRef: 'grid#grid-container',
    specUrl: `${GRID1}#grid-container`,
  },
  'grid item': {
    zh: '网格项目',
    description:
      '网格容器的直接子元素(包括文本节点生成的匿名盒子)。网格项目参与网格布局,可以跨越多个网格单元格。',
    sectionRef: 'grid#grid-container',
    specUrl: `${GRID1}#grid-item`,
  },
  'grid formatting context': {
    zh: '网格格式化上下文',
    description:
      '网格容器建立的独立布局环境。在网格格式化上下文中,网格项目按照网格定义排列,支持二维对齐和显式重叠。',
    sectionRef: 'grid#grid-container',
    specUrl: `${GRID1}#grid-formatting-context`,
  },
  'grid line': {
    zh: '网格线',
    description:
      '网格的水平和垂直分隔线。网格线可以通过数字索引(正数或负数)或命名引用。网格项目通过网格线定义其位置。',
    sectionRef: 'grid#grid-placement',
    specUrl: `${GRID1}#grid-line`,
  },
  'grid track': {
    zh: '网格轨道',
    description:
      '网格的行或列,即两条相邻网格线之间的空间。轨道由轨道尺寸函数(如长度、fr、minmax())定义。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#grid-track`,
  },
  'grid cell': {
    zh: '网格单元格',
    description:
      '网格行和网格列的交点,是网格中最小的单位。网格项目占据一个或多个网格单元格。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#grid-cell`,
  },
  'grid area': {
    zh: '网格区域',
    description:
      '一个或多个相邻网格单元格组成的矩形区域。网格区域由四条网格线界定,可以通过 grid-template-areas 命名或通过线坐标引用。',
    sectionRef: 'grid#grid-placement',
    specUrl: `${GRID1}#grid-area`,
  },
  'explicit grid': {
    zh: '显式网格',
    description:
      '通过 grid-template-rows、grid-template-columns 和 grid-template-areas 显式定义的网格轨道和区域。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#explicit-grid`,
  },
  'implicit grid': {
    zh: '隐式网格',
    description:
      '当网格项目放置在显式网格外时,自动生成的网格轨道。隐式轨道的尺寸由 grid-auto-rows 和 grid-auto-columns 定义。',
    sectionRef: 'grid#grid-auto',
    specUrl: `${GRID1}#implicit-grid`,
  },
  'grid template': {
    zh: '网格模板',
    description:
      '通过 grid-template-rows、grid-template-columns 和 grid-template-areas 定义的显式网格结构,包括轨道尺寸、命名线和命名区域。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#grid-template`,
  },
  'track listing': {
    zh: '轨道列表',
    description:
      'grid-template-rows 或 grid-template-columns 的值语法,由轨道尺寸、命名线、repeat() 函数等组成的列表。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#track-listing`,
  },
  'fr unit': {
    zh: 'fr 单位',
    description:
      '弹性长度单位,表示网格容器可用空间的一份。1fr 1fr 2fr 表示三列分别占 1/4、1/4、2/4 的可用空间。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#fr-unit`,
  },
  'minmax()': {
    zh: 'minmax() 函数',
    description:
      '定义轨道尺寸范围的函数,语法为 minmax(min, max)。轨道尺寸在 min 和 max 之间,由内容和可用空间决定。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#valdef-grid-template-columns-minmax`,
  },
  'repeat()': {
    zh: 'repeat() 函数',
    description:
      '重复轨道模式的函数,语法为 repeat(count, track-list)。count 可以是整数或 auto-fill/auto-fit 关键字。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#funcdef-repeat`,
  },
  'named grid line': {
    zh: '命名网格线',
    description:
      '通过 [name] 语法在轨道列表中定义的网格线名称。一条线可以有多个名字,同一个名字可以出现在多条线上。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#named-lines`,
  },
  'named grid area': {
    zh: '命名网格区域',
    description:
      '通过 grid-template-areas 定义的区域名称。区域名自动生成 name-start 和 name-end 网格线名。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#named-areas`,
  },
  'auto-placement': {
    zh: '自动放置',
    description:
      '未显式指定位置的网格项目由自动放置算法确定位置。算法的方向和打包模式由 grid-auto-flow 控制。',
    sectionRef: 'grid#grid-auto',
    specUrl: `${GRID1}#auto-placement`,
  },
  'sparse packing': {
    zh: '稀疏打包',
    description:
      '自动放置算法的默认模式(grid-auto-flow: row 或 column)。按源顺序放置项目,不回填早期空洞。',
    sectionRef: 'grid#grid-auto',
    specUrl: `${GRID1}#grid-auto-flow-property`,
  },
  'dense packing': {
    zh: '密集打包',
    description:
      '自动放置算法的密集模式(grid-auto-flow: dense)。允许乱序填充早期空洞,可能导致视觉顺序与源顺序不一致。',
    sectionRef: 'grid#grid-auto',
    specUrl: `${GRID1}#grid-auto-flow-property`,
  },
  'subgrid': {
    zh: '子网格',
    description:
      '通过 grid-template-rows: subgrid 或 grid-template-columns: subgrid 使网格项目继承父网格轨道定义的特性。子网格项目参与父网格的轨道尺寸计算。CSS Grid Level 2。',
    sectionRef: 'grid#grid-subgrid',
    specUrl: `${GRID2}#subgrids`,
  },
  'grid span': {
    zh: '网格跨度',
    description:
      '网格项目占据的轨道数,通过 span <integer> 或 span <name> 语法指定。span 3 表示跨越 3 个轨道。',
    sectionRef: 'grid#grid-placement',
    specUrl: `${GRID1}#grid-placement-span-int`,
  },
  'gutter': {
    zh: '间距',
    description:
      '网格轨道之间的空隙,由 row-gap 和 column-gap 定义。间距类似于额外的固定尺寸轨道,但不能放置项目。',
    sectionRef: 'grid#grid-alignment',
    specUrl: `${GRID1}#gutters`,
  },
  'auto-fill': {
    zh: 'auto-fill',
    description:
      'repeat() 函数的关键字,自动填充尽可能多的轨道。repeat(auto-fill, 100px) 根据容器尺寸创建轨道,即使某些轨道为空。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#valdef-repeat-auto-fill`,
  },
  'auto-fit': {
    zh: 'auto-fit',
    description:
      'repeat() 函数的关键字,类似 auto-fill 但折叠空轨道为 0。用于创建响应式布局,空轨道不占据空间。',
    sectionRef: 'grid#grid-template',
    specUrl: `${GRID1}#valdef-repeat-auto-fit`,
  },
};
