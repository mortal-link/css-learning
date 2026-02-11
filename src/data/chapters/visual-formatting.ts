import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'intro',
    number: '1',
    title: { zh: '简介', en: 'Introduction to the visual formatting model' },
    summary: { zh: 'CSS 视觉格式化模型定义了盒子如何根据文档树生成并布局。模型基于包含块(containing block)的概念,但不指定格式化的每个方面。', en: 'The CSS visual formatting model defines how boxes are generated and laid out based on the document tree. The model is based on the concept of containing blocks, but does not specify every aspect of formatting.' },
    keyPoints: [
      '每个元素根据盒模型生成零个或多个盒子',
      '盒子的布局由以下因素决定:盒子尺寸和类型、定位方案(常规流/浮动/绝对定位)、文档树中元素之间的关系、外部信息(视口大小、图片固有尺寸等)',
      '本章定义的属性适用于连续媒体(continuous media)和分页媒体(paged media),但 margin 属性在分页媒体中含义不同',
      '画布(canvas)是文档渲染的无限表面;视口(viewport)是用户代理提供的可视区域,当视口小于画布时应提供滚动机制',
      '每个画布最多对应一个视口,但用户代理可以渲染到多个画布(即同一文档的不同视图)',
      '脱离流(out-of-flow)的元素包括:浮动元素、绝对定位元素和根元素;不脱离流的元素称为流内(in-flow)元素',
      '匿名盒子(anonymous box)在需要时自动生成,用于满足格式化模型的结构要求;匿名盒子继承包含它的非匿名盒子的可继承属性,不可继承属性取初始值',
      '视觉格式化模型不指定格式化的所有方面(如字母间距算法),符合规范的用户代理可能在这些方面有不同行为',
    ],
    tutorial: [
      { type: 'heading', text: '什么是视觉格式化模型?' },
      { type: 'paragraph', text: 'CSS 视觉格式化模型(Visual Formatting Model)是 CSS 的核心机制,定义了浏览器如何将 HTML 文档树转换为屏幕上的视觉呈现。它回答了最基本的问题:给定一个 HTML 元素,浏览器应该在哪里、以什么形状、什么大小绘制它?' },
      { type: 'paragraph', text: '这个模型不是单一的算法,而是一套相互关联的规则系统,涵盖盒子生成、定位方案、格式化上下文、层叠顺序等多个方面。理解视觉格式化模型是从"改 CSS 碰运气"进阶到"精确控制布局"的关键。' },

      { type: 'heading', text: '从文档树到视觉呈现:完整流程' },
      { type: 'list', ordered: true, items: [
        '**盒子生成**:每个元素根据 `display` 值生成零个或多个盒子(box)。`<div>` 生成块盒子,`<span>` 生成行内盒子,`display: none` 不生成盒子',
        '**盒子分类**:盒子被分类为块级(block-level)、行内级(inline-level)或原子行内级(atomic inline-level)等,决定了它参与哪种格式化上下文',
        '**定位方案选择**:根据 `position`、`float` 属性,盒子进入三种定位方案之一:常规流(normal flow)、浮动(float)或绝对定位(absolute positioning)',
        '**格式化上下文建立**:容器元素建立格式化上下文(BFC、IFC 等),在其中应用特定的布局规则',
        '**尺寸计算**:基于包含块(containing block)、内容、padding、border、margin 计算盒子的最终尺寸',
        '**位置确定**:在格式化上下文中确定盒子的坐标位置',
        '**层叠排序**:根据层叠上下文(stacking context)和 z-index 确定盒子的 Z 轴绘制顺序',
        '**绘制**:浏览器按确定的顺序将盒子绘制到画布上'
      ] },

      { type: 'heading', text: '画布与视口' },
      { type: 'paragraph', text: '**画布**(canvas)是文档渲染的**理论上无限大**的二维表面。它是抽象概念——你的文档可以任意长、任意宽,不受物理屏幕尺寸限制。**视口**(viewport)是用户实际能看到的窗口——浏览器窗口在桌面端,整个屏幕在移动端。' },
      { type: 'example', title: '画布与视口的关系', lang: 'css', code: `/* 画布:无限大,文档实际占据的空间 */\nbody {\n  width: 2000px;  /* 画布宽度至少 2000px */\n  height: 5000px; /* 画布高度至少 5000px */\n}\n\n/* 视口:浏览器窗口,假设 1920×1080 */\n/* 当画布 > 视口时,浏览器提供滚动条 */\n/* 视口宽度 1920px < 画布宽度 2000px → 水平滚动条\n   视口高度 1080px < 画布高度 5000px → 垂直滚动条 */`, explanation: '画布和视口的关系类似于一幅巨大的画卷和一个固定大小的观察窗。你可以通过滚动来移动观察窗,查看画布的不同部分。CSS 的坐标系统(left、top 等)是相对于画布的,而用户的可见区域是视口。' },
      { type: 'tip', text: '`100vw` 和 `100vh` 单位指的是视口的宽度和高度,而 `100%` 则取决于包含块的尺寸。在移动端,视口概念更复杂,分为布局视口(layout viewport)、视觉视口(visual viewport)和理想视口(ideal viewport)。' },

      { type: 'heading', text: '流内与脱离流' },
      { type: 'paragraph', text: '元素分为**流内**(in-flow)和**脱离流**(out-of-flow)两大类。这是理解 CSS 布局的关键分界线。' },
      { type: 'list', items: [
        '**流内元素**:在常规流中布局的元素,按照文档顺序从上到下、从左到右排列。它们的位置会影响兄弟元素和父元素',
        '**脱离流元素**:从常规流中移除,不再占据原本的空间,不影响兄弟元素布局。包括:浮动元素(`float: left/right`)、绝对定位元素(`position: absolute/fixed`)、根元素(特殊情况)'
      ] },
      { type: 'example', title: '流内 vs 脱离流的对比', lang: 'html', code: `<!-- 流内:元素按顺序排列,每个占据空间 -->\n<div style="background: #eee; padding: 10px;">\n  <div style="background: red; height: 50px;">块A</div>\n  <div style="background: blue; height: 50px;">块B</div>\n  <!-- 父元素高度 = 50 + 50 = 100px -->\n</div>\n\n<!-- 脱离流:浮动元素不占据流内空间 -->\n<div style="background: #eee; padding: 10px;">\n  <div style="float: left; background: red; height: 50px; width: 100px;">浮动A</div>\n  <div style="background: blue; height: 30px;">块B</div>\n  <!-- 父元素高度 = 30px(浮动A不计入!) → 高度塌陷 -->\n</div>`, explanation: '流内元素会"撑起"父容器,父元素的高度会包含所有流内子元素。脱离流元素不占据流内空间,父元素的高度计算会忽略它们,这就是浮动导致"父元素高度塌陷"的根本原因。' },
      { type: 'warning', text: '根元素(`<html>`)在规范中被归类为"脱离流",但这是技术定义——它作为整个文档树的根,不参与任何常规流布局。实际开发中不需要关心这个细节。' },

      { type: 'heading', text: '匿名盒子:看不见的帮手' },
      { type: 'paragraph', text: '有时浏览器需要自动生成一些"幽灵"盒子来满足布局规则的结构要求,这些盒子没有对应的 HTML 元素,称为**匿名盒子**(anonymous box)。分为匿名块盒子和匿名行内盒子。' },
      { type: 'example', title: '匿名块盒子的自动生成', lang: 'html', code: `<div style="background: #eee;">\n  这是一段文本\n  <p>这是一个段落</p>\n  又是一段文本\n</div>\n\n<!-- 浏览器实际处理成: -->\n<div>\n  <anonymous-block>这是一段文本</anonymous-block>\n  <p>这是一个段落</p>\n  <anonymous-block>又是一段文本</anonymous-block>\n</div>`, explanation: '块容器(如 `<div>`)如果同时包含块级子元素(`<p>`)和行内内容(裸文本),CSS 规则要求"块容器只能包含块级盒子或只能包含行内盒子"。浏览器会自动将行内内容包裹在匿名块盒子中,确保结构一致性。' },
      { type: 'tip', text: '你无法用 CSS 选择器选中匿名盒子(因为它们没有对应的元素),所以无法给它们设置样式。匿名盒子会继承父元素的可继承属性(如 `color`、`font`),不可继承属性(如 `background`)则取初始值。' },

      { type: 'heading', text: '包含块:布局的参照系' },
      { type: 'paragraph', text: '**包含块**(containing block)是元素尺寸和位置计算的参照物。它不一定是父元素!包含块的确定规则比较复杂,取决于元素的定位方案:' },
      { type: 'list', items: [
        '**`position: static/relative`**:包含块是最近的块容器祖先的 **content box**',
        '**`position: absolute`**:包含块是最近的 `position` 非 `static` 的祖先的 **padding box**',
        '**`position: fixed`**:包含块是**视口**(viewport)',
        '**根元素**:包含块是**初始包含块**(initial containing block),通常与视口等大'
      ] },
      { type: 'warning', text: '初学者常犯的错误:以为"父元素就是包含块"。实际上 `position: absolute` 的元素会**跳过**所有非定位祖先,直到找到第一个 `position: relative/absolute/fixed` 的祖先。如果没有,包含块就是初始包含块(整个页面)。' },

      { type: 'heading', text: '定位方案三兄弟' },
      { type: 'paragraph', text: 'CSS 提供三种定位方案,每个盒子必定归属其一:' },
      { type: 'list', items: [
        '**常规流**(Normal Flow):默认方案。块级盒子垂直堆叠,行内盒子水平排列。包括相对定位(`position: relative`)——虽然有视觉偏移,但仍占据原本的流内空间',
        '**浮动**(Float):盒子向左或向右移动,直到碰到包含块边缘或另一个浮动盒子。后续行内内容会环绕浮动盒子',
        '**绝对定位**(Absolute Positioning):盒子完全从常规流中移除,相对于包含块定位。包括 `position: absolute` 和 `position: fixed`'
      ] },
      { type: 'code', lang: 'css', caption: '三种定位方案的声明方式', code: `/* 1. 常规流(默认) */\n.normal {\n  position: static; /* 默认值,可省略 */\n}\n\n/* 1b. 相对定位(仍在常规流中) */\n.relative {\n  position: relative;\n  top: 10px;  /* 视觉偏移,不影响其他元素 */\n}\n\n/* 2. 浮动 */\n.floated {\n  float: left;\n}\n\n/* 3. 绝对定位 */\n.absolute {\n  position: absolute;\n  top: 50px;\n  left: 100px;\n}` },

      { type: 'heading', text: '格式化上下文:布局的独立王国' },
      { type: 'paragraph', text: '**格式化上下文**(Formatting Context)是一块独立的渲染区域,有自己的布局规则。最常见的两种是:' },
      { type: 'list', items: [
        '**块格式化上下文**(BFC):块级盒子参与的布局环境。在 BFC 中,盒子垂直排列,margin 会折叠',
        '**行内格式化上下文**(IFC):行内级盒子参与的布局环境。在 IFC 中,盒子水平排列,形成行盒(line box)'
      ] },
      { type: 'paragraph', text: 'BFC 的关键特性是**隔离**:内部布局不影响外部,外部布局不影响内部。它会包含浮动子元素(解决高度塌陷),阻止 margin 折叠,阻止被浮动元素覆盖。后续章节会深入讲解。' },

      { type: 'heading', text: '视觉格式化模型的边界' },
      { type: 'paragraph', text: 'CSS 规范明确指出:视觉格式化模型**不**规定所有方面。有些细节(如字母间距的具体算法、浮动定位的精确数值计算)留给浏览器厂商自行实现,所以不同浏览器可能在边缘情况下表现不一致。这就是为什么跨浏览器测试如此重要。' },
    ] as TutorialBlock[],
  },
  {
    id: 'display',
    number: '2',
    title: { zh: 'display 属性', en: 'Controlling box generation' },
    summary: { zh: 'display 属性决定元素生成的盒子类型。CSS 2.2 定义了 block、inline、inline-block、none、list-item 等值;CSS3 将其扩展为二维系统(外部显示类型 + 内部显示类型)。', en: 'The display property determines the type of box an element generates. CSS 2.2 defined values like block, inline, inline-block, none, and list-item; CSS3 extended it into a two-dimensional system (outer display type + inner display type).' },
    keyPoints: [
      'block: 生成块级盒子(block-level box),参与块格式化上下文(BFC)',
      'inline: 生成行内盒子(inline box),参与行内格式化上下文(IFC)',
      'inline-block: 生成行内级块容器(inline-level block container),对外是行内盒子,对内建立 BFC',
      'none: 元素不生成任何盒子,后代元素也不生成盒子,元素及其内容完全从格式化结构中移除;与 visibility: hidden 不同,后者仍生成不可见的盒子',
      'list-item: 生成块级主体盒子(principal box)和标记盒子(marker box)',
      'CSS3 display 拆分为外部显示类型 display-outside(block/inline)和内部显示类型 display-inside(flow/flow-root/flex/grid/table)的二值组合',
      'display: flow-root 生成块级盒子并建立新的 BFC,是触发 BFC 的最直接方式(替代 overflow: hidden 等 hack)',
      'display: contents 使元素自身不生成盒子,但其子元素和伪元素仍正常生成盒子,如同子元素直接替代了该元素在文档树中的位置',
      'display: run-in 生成游离盒子(run-in box),如果后面紧跟块盒子则合并到该块盒子开头作为行内内容',
      'display、position、float 三者相互影响:若 display 为 none 则忽略 position/float;若 position 为 absolute/fixed 则 float 计算为 none 且 display 按转换表调整;若 float 非 none 则 display 按转换表调整为 block 等值',
    ],
    tutorial: [
      { type: 'heading', text: 'display:盒子生成的总开关' },
      { type: 'paragraph', text: '`display` 属性是 CSS 布局的**总开关**——它决定元素是否生成盒子、生成什么类型的盒子、如何参与父元素的布局、如何组织子元素的布局。理解 `display` 是理解整个 CSS 布局系统的起点。' },
      { type: 'paragraph', text: 'CSS 2.2 定义了一组单值关键字(`block`、`inline` 等),CSS3 将其重新设计为**二维系统**:外部显示类型(元素如何参与父级布局)+ 内部显示类型(元素如何组织子元素)。但为了兼容性,单值写法仍然有效。' },

      { type: 'heading', text: '`display: block` —— 块级盒子' },
      { type: 'paragraph', text: '`display: block` 生成**块级盒子**——独占一行,宽度默认填满父容器,可以设置宽高。典型的块级元素:`<div>`、`<p>`、`<h1>`-`<h6>`、`<ul>`、`<section>` 等。' },
      { type: 'code', lang: 'css', caption: '块级盒子的特征', code: `.block {\n  display: block;\n  /* 特征:\n     1. 独占一行(即使内容很少,后续元素也会换行)\n     2. 宽度默认 100%(填满父容器)\n     3. 可以设置 width、height、padding、margin\n     4. 参与块格式化上下文(BFC)\n     5. 垂直 margin 会与相邻块盒子折叠 */\n}` },
      { type: 'example', title: '将行内元素转为块级', lang: 'css', code: `/* <a> 默认是行内元素,内容决定宽度,不能设置宽高 */\na {\n  /* 转为块级元素 */\n  display: block;\n  width: 200px;      /* 现在可以设置宽度了 */\n  padding: 10px 20px;\n  text-align: center;\n  background: #007bff;\n  color: white;\n  /* 效果:变成了块级按钮,独占一行 */\n}`, explanation: '将 `<a>` 转为 `display: block` 是实现全宽导航链接或卡片式按钮的常用技巧。块级 `<a>` 的整个宽度都可点击,用户体验更好。' },

      { type: 'heading', text: '`display: inline` —— 行内盒子' },
      { type: 'paragraph', text: '`display: inline` 生成**行内盒子**——与周围文本并排,宽度由内容决定,**不能设置宽高**(但可以设置水平 padding/margin)。典型的行内元素:`<span>`、`<a>`、`<strong>`、`<em>`、`<code>` 等。' },
      { type: 'code', lang: 'css', caption: '行内盒子的限制', code: `.inline {\n  display: inline;\n  /* 特征:\n     1. 与周围内容并排(不独占一行)\n     2. 宽度由内容决定\n     3. width、height 无效(被忽略)\n     4. 垂直方向的 padding/margin 不影响布局(不撑开行高)\n     5. 参与行内格式化上下文(IFC) */\n  \n  width: 200px;          /* ❌ 无效! */\n  height: 100px;         /* ❌ 无效! */\n  padding: 10px 20px;    /* ✅ 水平 padding 有效,垂直 padding 视觉可见但不撑开行 */\n  margin: 10px 20px;     /* ✅ 同上 */\n}` },
      { type: 'warning', text: '行内盒子的垂直 padding 和 margin 会"绘制出来"(背景色会扩展),但**不会影响行高**——可能覆盖上下相邻行的内容。如果你需要撑开行高,用 `line-height` 或改用 `inline-block`。' },

      { type: 'heading', text: '`display: inline-block` —— 两全其美' },
      { type: 'paragraph', text: '`inline-block` 是最实用的 `display` 值之一:**对外表现为行内**(与其他元素并排),**对内表现为块级**(可以设置宽高,子元素参与 BFC)。它是行内和块级的混合体。' },
      { type: 'example', title: '经典应用:行内按钮和图标', lang: 'css', code: `/* 按钮组:并排排列,但每个按钮可以设置宽高 */\n.btn {\n  display: inline-block;\n  width: 120px;\n  height: 40px;\n  padding: 0 20px;\n  background: #007bff;\n  color: white;\n  text-align: center;\n  line-height: 40px;\n  border-radius: 4px;\n}\n\n/* HTML: <button class="btn">确定</button> <button class="btn">取消</button>\n   结果:两个按钮在同一行,但都有固定宽高 */`, explanation: '`inline-block` 的典型应用:导航栏的并排链接(每个链接需要 padding 撑开点击区域)、图标与文字对齐、网格布局(CSS Grid 出现前的主流方案)、表单元素的并排排列。' },
      { type: 'tip', text: '`inline-block` 元素之间的**空白符**(HTML 源码中的换行和空格)会被渲染为一个空格的间隙。消除方法:父元素 `font-size: 0` + 子元素恢复 `font-size`,或者 HTML 不换行(丑但有效),或者改用 flexbox/grid。' },

      { type: 'heading', text: '`display: none` —— 完全移除' },
      { type: 'paragraph', text: '`display: none` 使元素**不生成任何盒子**——既不占据空间,也不可见,也不可交互。它与 `visibility: hidden` 的区别至关重要。' },
      { type: 'example', title: 'display: none vs visibility: hidden', lang: 'html', code: `<div style="background: #eee; padding: 10px;">\n  <div style="display: none; background: red; height: 50px;">display: none</div>\n  <div style="background: blue; height: 50px;">正常元素</div>\n</div>\n<!-- 父元素高度 = 50px (红色块不占据空间) -->\n\n<div style="background: #eee; padding: 10px;">\n  <div style="visibility: hidden; background: red; height: 50px;">visibility: hidden</div>\n  <div style="background: blue; height: 50px;">正常元素</div>\n</div>\n<!-- 父元素高度 = 100px (红色块仍占据空间,只是不可见) -->`, explanation: '**`display: none`**:元素及其后代完全从渲染树中移除,不占据空间,不触发事件,屏幕阅读器会忽略。**`visibility: hidden`**:元素不可见但仍占据空间(幽灵盒子),后代可以通过 `visibility: visible` 显示,仍可触发某些事件。' },
      { type: 'tip', text: '切换 `display: none` 会触发**回流**(reflow,浏览器需要重新计算布局),性能开销较大。如果需要频繁显示/隐藏,考虑用 `visibility` 或 `opacity` 配合 `pointer-events: none`。' },

      { type: 'heading', text: 'CSS3 二维 display 系统' },
      { type: 'paragraph', text: 'CSS3 将 `display` 重新设计为**外部显示类型 + 内部显示类型**的组合。外部类型决定元素如何参与父级布局(`block` 或 `inline`),内部类型决定子元素如何布局(`flow`、`flex`、`grid` 等)。' },
      { type: 'code', lang: 'css', caption: '单值写法与双值写法的对应关系', code: `/* CSS 2.2 单值 → CSS3 双值 */\nblock        = block flow\ninline       = inline flow\ninline-block = inline flow-root\nflex         = block flex\ninline-flex  = inline flex\ngrid         = block grid\ninline-grid  = inline grid\ntable        = block table\n\n/* 新增的 CSS3 值 */\nflow-root    = block flow-root  /* 明确建立 BFC */\ncontents     /* 元素自身不生成盒子 */`, explanation: '双值语法让意图更清晰:`display: inline flex` 表示"对外是行内级,对内是 flex 容器"。但浏览器仍然完全支持单值写法,实际开发中单值更常见。' },

      { type: 'heading', text: '`display: flow-root` —— 明确的 BFC' },
      { type: 'paragraph', text: '`flow-root` 是 CSS3 引入的最重要的新值之一:**生成块级盒子并建立新的 BFC**。它是触发 BFC 的最直接、最语义化的方式,替代了 `overflow: hidden` 等副作用明显的 hack。' },
      { type: 'example', title: '用 flow-root 解决浮动高度塌陷', lang: 'css', code: `/* 传统方法:用 overflow 触发 BFC */\n.container-old {\n  overflow: hidden; /* 副作用:裁剪溢出内容 */\n}\n\n/* 现代方法:用 flow-root 明确建立 BFC */\n.container-new {\n  display: flow-root; /* 清晰的语义,无副作用 */\n}\n\n/* 两者效果相同:包含浮动子元素,高度不塌陷 */\n.float-child {\n  float: left;\n  width: 200px;\n  height: 100px;\n}`, explanation: '`flow-root` 的好处:明确的语义(代码意图一目了然)、无副作用(不像 `overflow` 会裁剪内容,不像 `position: absolute` 会改变定位参照)。唯一缺点:IE 不支持,需要 fallback。' },

      { type: 'heading', text: '`display: contents` —— 幽灵元素' },
      { type: 'paragraph', text: '`display: contents` 让元素自身**不生成盒子**,但其子元素和伪元素仍正常生成盒子——就像子元素直接跳过了这个父元素,插入到祖父元素中。这对于需要"去除包装元素"的场景很有用。' },
      { type: 'example', title: 'contents 在 Grid 布局中的应用', lang: 'html', code: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">\n  <div>项目1</div>\n  <div style="display: contents;">\n    <!-- 这个 <div> 不生成盒子,子元素直接参与 grid 布局 -->\n    <div>项目2</div>\n    <div>项目3</div>\n  </div>\n  <div>项目4</div>\n</div>\n<!-- 实际网格项目:项目1、项目2、项目3、项目4(共 4 个,而非 3 个) -->`, explanation: '`contents` 的典型应用:在 Grid/Flexbox 中"拆散"包装元素,让孙子元素直接参与布局。或者在语义 HTML 结构(`<article>` 包含 `<header>` + `<section>`)中实现扁平的视觉布局。' },
      { type: 'warning', text: '`display: contents` 在无障碍方面有争议:一些屏幕阅读器会完全忽略 `contents` 元素的语义角色(如 `<button role="button">`)。在关键的交互元素上慎用。' },

      { type: 'heading', text: 'display、position、float 的相互影响' },
      { type: 'paragraph', text: '这三个属性会相互影响,浏览器会按照优先级规则调整它们的**计算值**。理解这些规则可以避免很多困惑。' },
      { type: 'list', ordered: true, items: [
        '**规则 1**:如果 `display: none`,忽略 `position` 和 `float`(元素不生成盒子,定位和浮动无意义)',
        '**规则 2**:如果 `position: absolute` 或 `fixed`,强制 `float` 计算为 `none`,且 `display` 按表格转换(如 `inline` → `block`,`inline-table` → `table`)',
        '**规则 3**:如果 `float` 不是 `none`,且 `position` 是 `static` 或 `relative`,`display` 按表格转换为块级值',
        '**规则 4**:其他情况,`display` 保持指定值'
      ] },
      { type: 'example', title: '绝对定位会阻止浮动', lang: 'css', code: `.element {\n  float: left;           /* 指定值:left */\n  position: absolute;    /* 绝对定位 */\n  /* 计算值:float 被强制为 none */\n  /* 原因:绝对定位元素脱离文档流,浮动无意义 */\n}\n\n.element2 {\n  display: inline;       /* 指定值:inline */\n  float: left;           /* 浮动 */\n  /* 计算值:display 被转换为 block */\n  /* 原因:浮动元素需要生成块级盒子才能浮动 */\n}`, explanation: '这些转换是自动的,你不需要手动调整。但理解规则可以避免困惑:为什么我设置了 `float` 却不生效?因为元素是绝对定位的。为什么 `<span>` 设置 `float` 后可以设置宽高了?因为 `display` 被自动转为 `block`。' },

      { type: 'heading', text: '其他 display 值' },
      { type: 'list', items: [
        '**`list-item`**:生成块级主体盒子 + 标记盒子(默认是圆点或数字)。`<li>` 的默认值。可以给任何元素加上列表标记',
        '**`table`、`table-row`、`table-cell` 等**:模拟表格布局,可以给非 `<table>` 元素实现表格样式的对齐',
        '**`flex`、`inline-flex`**:创建 flex 容器(详见 Flexbox 章节)',
        '**`grid`、`inline-grid`**:创建 grid 容器(详见 Grid 章节)',
        '**`run-in`**(CSS2.2 推迟到 CSS3,浏览器支持差):让元素"跑进"后续块元素,变成行内内容。实际应用很少'
      ] },

      { type: 'heading', text: '如何选择 display 值?' },
      { type: 'list', items: [
        '**需要独占一行、设置宽高**:用 `block`',
        '**需要与文本并排,不需要宽高**:用 `inline`',
        '**需要与文本并排,但要设置宽高**:用 `inline-block`',
        '**需要完全隐藏且不占空间**:用 `none`',
        '**需要包含浮动子元素、阻止 margin 折叠**:用 `flow-root`(或 `overflow: auto`)',
        '**需要一维弹性布局**:用 `flex`',
        '**需要二维网格布局**:用 `grid`'
      ] },
      { type: 'tip', text: '现代 CSS 布局优先选择 `flex` 和 `grid`,它们比传统的 `block` + `float` 更强大、更直观。但理解 `block`、`inline`、`inline-block` 仍然是基础——它们是所有布局的底层原理。' },
    ] as TutorialBlock[],
  },
  {
    id: 'positioning-schemes',
    number: '3',
    title: { zh: '定位方案', en: 'Positioning schemes' },
    summary: { zh: 'CSS 2.2 中有三种定位方案:常规流(Normal flow)、浮动(Floats)和绝对定位(Absolute positioning)。盒子根据 position、float 和 display 属性参与不同的定位方案。', en: 'CSS 2.2 has three positioning schemes: Normal flow, Floats, and Absolute positioning. Boxes participate in different positioning schemes based on the position, float, and display properties.' },
    keyPoints: [
      'Normal flow: 包括块级盒子的块格式化(block formatting)、行内级盒子的行内格式化(inline formatting)以及相对定位(relative positioning)',
      'Floats: 盒子先按常规流布局,然后从流中取出并向左或向右移动,后续内容沿浮动盒子一侧排列',
      'Absolute positioning: 盒子完全从常规流中移除,相对于包含块定位,不影响兄弟元素的布局',
      'position 属性值:static(常规流,inset 属性不生效)、relative(常规流+视觉偏移,不影响后续元素位置)、absolute(脱离常规流)、fixed(脱离常规流,相对视口固定)',
      'CSS3 新增 position: sticky — 粘性定位元素在常规流中布局,当滚动到 inset 属性指定的阈值时固定在最近滚动容器的可视区域(scrollport)内',
      'sticky 定位的约束范围是其包含块:元素不会超出包含块的边界,当包含块滚出可视区域时 sticky 元素随之离开',
      'CSS3 引入 inset 简写属性(top/right/bottom/left 的简写)以及逻辑方向属性 inset-block-start/end、inset-inline-start/end',
      'display/position/float 三属性互相约束(详见 CSS2.2 §9.7):position: absolute/fixed 强制 float 计算为 none;float 非 none 时,display 的行内值(如 inline)被转换为对应块值(如 block)',
      '所有 position 非 static 的元素称为定位元素(positioned element),会为后代建立绝对定位包含块',
    ],
    tutorial: [
      { type: 'heading', text: '三种定位方案概览' },
      { type: 'paragraph', text: 'CSS 提供三种定位方案,每个盒子必定归属其一。理解这三种方案的本质区别是掌握 CSS 定位的关键。' },
      { type: 'list', items: [
        '**常规流**(Normal Flow):默认方案。元素按照文档顺序排列,块级元素垂直堆叠,行内元素水平排列。包括相对定位——虽然有视觉偏移,但仍占据原本的流内空间',
        '**浮动**(Float):元素先按常规流确定位置,然后从流中"浮起",向左或向右移动,后续内容会环绕它。半脱离流',
        '**绝对定位**(Absolute Positioning):元素完全脱离常规流,相对于包含块定位,不占据流内空间,不影响兄弟元素布局'
      ] },
      { type: 'tip', text: '选择定位方案的核心问题:这个元素应该**占据流内空间**吗?如果是,用常规流或浮动;如果不是(如悬浮按钮、模态框、工具提示),用绝对定位。' },

      { type: 'heading', text: '`position: static` —— 常规流的默认值' },
      { type: 'paragraph', text: '`position: static` 是所有元素的默认值。它让元素参与常规流布局,完全忽略 `top`、`right`、`bottom`、`left`、`z-index` 属性。' },
      { type: 'code', lang: 'css', caption: 'static 定位的行为', code: `.static {\n  position: static; /* 默认值,通常不需要显式声明 */\n  top: 100px;       /* ❌ 无效!static 元素忽略偏移属性 */\n  z-index: 10;      /* ❌ 无效!static 元素不参与层叠上下文 */\n}` },
      { type: 'tip', text: '唯一需要显式写 `position: static` 的场景:覆盖(reset)之前设置的 `position: relative/absolute` 等值。' },

      { type: 'heading', text: '`position: relative` —— 相对定位' },
      { type: 'paragraph', text: '`relative` 定位让元素先按常规流布局,然后相对于其**原本应该在的位置**进行视觉偏移。关键点:元素**仍然占据原本的流内空间**,偏移后留下的"空洞"不会被填补。' },
      { type: 'code', lang: 'css', caption: '相对定位的视觉偏移', code: `.relative {\n  position: relative;\n  top: 20px;    /* 向下偏移 20px(相对于原本位置) */\n  left: 30px;   /* 向右偏移 30px(相对于原本位置) */\n  /* 注意:偏移是视觉效果,不影响后续元素的位置 */\n}` },
      { type: 'example', title: '相对定位不影响兄弟元素', lang: 'html', code: `<div style="background: #eee; padding: 10px;">\n  <div style="background: red; height: 50px;">块A</div>\n  <div style="position: relative; top: 20px; background: blue; height: 50px;">块B(relative)</div>\n  <div style="background: green; height: 50px;">块C</div>\n</div>\n<!-- 块B 向下偏移 20px,但块C 仍然在块B 的原始位置下方,不会上移填补 -->`, explanation: '相对定位的**原始空间**仍然存在。即使块 B 视觉上向下移动了,块 C 依然认为块 B 在原来的位置,所以不会上移。这导致块 B 可能覆盖块 C。' },
      { type: 'list', items: [
        '**用途 1**:微调位置。需要把某个元素稍微往上/下/左/右移动几个像素',
        '**用途 2**:作为绝对定位子元素的**定位参照**(containing block)。最常见的模式:`position: relative` 父元素 + `position: absolute` 子元素',
        '**用途 3**:创建层叠上下文,配合 `z-index` 控制层叠顺序'
      ] },
      { type: 'warning', text: '相对定位的偏移可能导致元素覆盖其他内容。如果 `top` 和 `bottom` 同时设置且冲突,`bottom` 被忽略;如果 `left` 和 `right` 冲突,在 LTR 语言中 `right` 被忽略,在 RTL 语言中 `left` 被忽略。' },

      { type: 'heading', text: '`position: absolute` —— 绝对定位' },
      { type: 'paragraph', text: '`absolute` 定位让元素**完全脱离常规流**,相对于**包含块**定位。元素不占据流内空间,兄弟元素的布局完全不受影响,就像它不存在一样。' },
      { type: 'code', lang: 'css', caption: '绝对定位相对于包含块', code: `.absolute {\n  position: absolute;\n  top: 50px;     /* 距离包含块顶边 50px */\n  right: 30px;   /* 距离包含块右边 30px */\n  /* 元素脱离文档流,不占据原本的空间 */\n}` },
      { type: 'example', title: '绝对定位的包含块确定规则', lang: 'html', code: `<div style="position: static;">           <!-- 非定位元素 -->\n  <div style="position: relative;">       <!-- 定位元素 -->\n    <div style="position: absolute; top: 0; left: 0;">\n      我的包含块是 position: relative 的那个 div\n    </div>\n  </div>\n</div>\n\n<div style="position: static;">           <!-- 非定位元素 -->\n  <div style="position: static;">         <!-- 非定位元素 -->\n    <div style="position: absolute; top: 0; left: 0;">\n      找不到定位祖先,我的包含块是初始包含块(整个页面)\n    </div>\n  </div>\n</div>`, explanation: '绝对定位元素的包含块是**最近的 `position` 非 `static` 的祖先元素**。这个规则导致了最经典的定位模式:**父元素 `position: relative`(仅为建立定位参照,不实际偏移)+ 子元素 `position: absolute`**。如果找不到定位祖先,包含块就是初始包含块(通常是 `<html>` 元素,覆盖整个页面)。' },
      { type: 'example', title: '经典模式:卡片内的悬浮按钮', lang: 'css', code: `.card {\n  position: relative; /* 建立定位参照,自身不偏移 */\n  padding: 20px;\n  border: 1px solid #ddd;\n}\n\n.close-btn {\n  position: absolute;\n  top: 10px;          /* 距离卡片顶部 10px */\n  right: 10px;        /* 距离卡片右边 10px */\n  width: 24px;\n  height: 24px;\n  background: #f00;\n  color: white;\n  border-radius: 50%;\n}`, explanation: '这是绝对定位最常见的应用:在容器的特定位置放置元素(关闭按钮、徽标、角标)。父元素 `position: relative` 不带任何偏移,仅仅是为了成为子元素的定位参照。' },
      { type: 'list', items: [
        '**特性 1**:脱离文档流,不占据空间',
        '**特性 2**:可以用 `top/right/bottom/left` 精确定位到包含块的任意位置',
        '**特性 3**:`display` 值会被"块级化"(如 `inline` → `block`),可以设置宽高',
        '**特性 4**:宽度不再默认填满父元素,而是由内容决定(除非显式设置 `width` 或同时设置 `left` 和 `right`)',
        '**特性 5**:可以通过 `z-index` 控制层叠顺序(创建层叠上下文)'
      ] },
      { type: 'tip', text: '如果同时设置了 `left` 和 `right`,且元素没有显式的 `width`,元素宽度会被拉伸以满足两个约束。同理,同时设置 `top` 和 `bottom` 可以拉伸高度。这是实现"距离四边各 20px"的全屏居中模态框的技巧。' },

      { type: 'heading', text: '`position: fixed` —— 固定定位' },
      { type: 'paragraph', text: '`fixed` 是绝对定位的特殊形式,唯一区别是**包含块始终是视口**(viewport),而不是定位祖先。固定定位元素会"钉"在屏幕的固定位置,不随页面滚动而移动。' },
      { type: 'example', title: '固定在视口底部的按钮', lang: 'css', code: `.back-to-top {\n  position: fixed;\n  bottom: 20px;   /* 距离视口底部 20px */\n  right: 20px;    /* 距离视口右边 20px */\n  width: 50px;\n  height: 50px;\n  background: #007bff;\n  color: white;\n  border-radius: 50%;\n  /* 无论页面滚动到哪里,按钮始终在右下角 */\n}`, explanation: '固定定位的典型应用:返回顶部按钮、固定导航栏、悬浮客服按钮、Cookie 提示条。所有这些元素的共同点:始终可见,不随页面滚动。' },
      { type: 'warning', text: '**陷阱**:如果祖先元素设置了 `transform`、`filter`、`perspective` 或 `will-change` 等属性,`fixed` 元素的包含块会变成**该祖先元素**,而非视口!这是一个常见的 bug 来源——fixed 元素突然不 fixed 了。解决方案:确保 fixed 元素和应用 transform 的元素不在同一个祖先链上。' },

      { type: 'heading', text: '`position: sticky` —— 粘性定位(CSS3)' },
      { type: 'paragraph', text: '`sticky` 是 CSS3 引入的新定位方案,结合了相对定位和固定定位的特性:**元素在常规流中布局,但当滚动到指定阈值时,"粘"在滚动容器的边缘**。' },
      { type: 'code', lang: 'css', caption: '粘性定位的典型用法', code: `.sticky-header {\n  position: sticky;\n  top: 0;  /* 阈值:当元素顶部距离滚动容器顶部 0px 时,开始粘住 */\n  background: white;\n  z-index: 10;\n  /* 向下滚动时,当表头碰到视口顶部,它会停留在那里(像 fixed)\n     向上滚动回原位时,它又恢复常规流位置(像 relative) */\n}` },
      { type: 'example', title: '粘性表头', lang: 'html', code: `<div style="height: 100vh; overflow: auto;">\n  <table>\n    <thead>\n      <tr style="position: sticky; top: 0; background: white;">\n        <th>列1</th><th>列2</th><th>列3</th>\n      </tr>\n    </thead>\n    <tbody>\n      <!-- 100 行数据 -->\n    </tbody>\n  </table>\n</div>\n<!-- 滚动表格时,表头始终停留在容器顶部 -->`, explanation: 'Sticky 定位的工作原理:元素在**滚动容器**(设置了 `overflow: auto/scroll` 的祖先,或视口)中滚动。当元素的边缘(由 `top/bottom/left/right` 指定)碰到容器的对应边缘时,元素"粘住",不再滚动。当滚动回原位时,元素恢复常规流位置。' },
      { type: 'list', items: [
        '**约束 1**:必须指定 `top`、`bottom`、`left` 或 `right` 至少一个,否则 sticky 等同于 relative',
        '**约束 2**:粘性区域受**包含块**限制——元素不会"粘"到包含块外面。当包含块滚出视口,sticky 元素随之离开',
        '**约束 3**:父元素不能设置 `overflow: hidden/auto/scroll`(除非它就是滚动容器),否则 sticky 失效',
        '**约束 4**:父元素不能有固定高度且刚好等于 sticky 元素高度,否则没有"粘"的空间'
      ] },
      { type: 'tip', text: '调试 sticky 不生效的步骤:1) 检查是否设置了 `top/bottom` 等阈值;2) 检查父元素有没有 `overflow: hidden`;3) 检查父元素高度是否足够大;4) 用浏览器开发者工具查看包含块是否正确。' },

      { type: 'heading', text: 'inset 简写属性(CSS3)' },
      { type: 'paragraph', text: '`inset` 是 `top`、`right`、`bottom`、`left` 的简写,类似于 `margin` 的语法。它让定位代码更简洁。' },
      { type: 'code', lang: 'css', caption: 'inset 简写语法', code: `/* 传统写法 */\n.old {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n/* 简写 */\n.new {\n  position: absolute;\n  inset: 0;  /* 四边都是 0 */\n}\n\n/* 不同值 */\n.custom {\n  position: absolute;\n  inset: 10px 20px 30px 40px;  /* 顺序:上 右 下 左(顺时针) */\n  inset: 10px 20px;             /* 上下 10px,左右 20px */\n}` },
      { type: 'tip', text: '`inset: 0` 配合 `margin: auto` 是实现**完美居中**的最简洁方法(定位元素必须有明确的宽高)。CSS3 还引入了逻辑方向属性 `inset-block-start/end` 和 `inset-inline-start/end`,支持不同的书写模式。' },

      { type: 'heading', text: '定位元素的特殊性' },
      { type: 'paragraph', text: '所有 `position` 非 `static` 的元素称为**定位元素**(positioned element),有一些特殊能力:' },
      { type: 'list', items: [
        '**可以使用 `z-index`**:控制层叠顺序(static 元素的 `z-index` 无效)',
        '**作为后代的包含块**:绝对定位的后代元素会以它为参照',
        '**创建层叠上下文**:如果 `z-index` 不是 `auto`(或者是 `fixed`/`sticky` 无论 `z-index` 值)',
        '**`display` 值被块级化**:如果是绝对定位,`inline` → `block` 等'
      ] },

      { type: 'heading', text: '如何选择定位方案?' },
      { type: 'list', items: [
        '**大部分情况**:用常规流(`position: static`,配合 Flexbox/Grid)',
        '**需要微调位置**:用 `position: relative` + 小偏移',
        '**需要脱离文档流,相对于容器定位**(如悬浮按钮):用 `position: absolute`',
        '**需要固定在视口**(如固定导航栏):用 `position: fixed`',
        '**需要滚动时粘住**(如表头):用 `position: sticky`',
        '**需要文字环绕效果**(如图文混排):用 `float`(下节详解)'
      ] },
      { type: 'warning', text: '不要过度使用绝对定位和浮动。现代 CSS 布局应该优先使用 Flexbox 和 Grid——它们更强大、更容易维护、响应式支持更好。绝对定位适合"覆盖层"类的需求,不适合主要的页面布局。' },
    ] as TutorialBlock[],
  },
  {
    id: 'normal-flow',
    number: '4',
    title: { zh: '常规流', en: 'Normal flow' },
    summary: { zh: '常规流中的盒子属于某个格式化上下文(formatting context),可以是块格式化上下文(BFC)或行内格式化上下文(IFC)。块级盒子参与 BFC,行内级盒子参与 IFC。', en: 'Boxes in normal flow belong to a formatting context, which can be a block formatting context (BFC) or an inline formatting context (IFC). Block-level boxes participate in BFC, and inline-level boxes participate in IFC.' },
    keyPoints: [
      '块格式化上下文(BFC):块级盒子在其中垂直排列,每个盒子的左外边缘紧贴包含块的左边缘(RTL 时右边缘),相邻 margin 会折叠',
      '行内格式化上下文(IFC):行内盒子在其中水平排列,形成行盒(line box);由不包含块级盒子的块容器盒子建立',
      '块级盒子(block-level box):display 为 block、list-item 或 table 的盒子,参与 BFC',
      '块容器盒子(block container box):只包含块级盒子或只包含行内级盒子(建立 IFC)的盒子;非替换 inline-block 和非替换 table-cell 也是块容器但不是块级盒子',
      '块盒子(block box):既是块级盒子又是块容器盒子;display: block 的非替换元素生成块盒子',
      '匿名块盒子(anonymous block box):当块容器同时包含块级内容和行内内容时,行内内容被包裹在自动生成的匿名块盒子中,以确保块容器只包含同类型的子盒子',
      '匿名行内盒子(anonymous inline box):块容器中直接包含的文本(不在行内元素中)会被当作匿名行内元素处理;根据 white-space 属性折叠后为空的匿名行内盒子不会生成',
      'position: relative 让盒子先按常规流布局,然后相对于其常规位置偏移(不影响后续元素布局);若 left/right 均非 auto 则产生过约束,由 direction 决定保留哪个值',
      'BFC 建立条件:根元素、浮动元素、绝对定位元素、inline-block、table-cell、table-caption、overflow 非 visible 的块盒子;CSS3 新增 display: flow-root 可直接建立 BFC',
      'BFC 独立性:BFC 内部布局不影响外部,外部布局不影响内部;BFC 包含浮动元素(解决高度塌陷),阻止与外部元素的 margin 折叠',
    ],
    tutorial: [
      { type: 'heading', text: '常规流:CSS 布局的默认规则' },
      { type: 'paragraph', text: '**常规流**(Normal Flow)是 CSS 的默认布局方式——如果不设置 `float` 或 `position: absolute/fixed`,所有元素都在常规流中。常规流遵循文档的自然顺序:块级元素从上到下堆叠,行内元素从左到右排列(在从左到右的语言中)。' },
      { type: 'paragraph', text: '常规流中的盒子参与**格式化上下文**(Formatting Context)——一个独立的渲染区域,有自己的布局规则。最常见的两种是块格式化上下文(BFC)和行内格式化上下文(IFC)。' },

      { type: 'heading', text: '块格式化上下文(BFC)' },
      { type: 'paragraph', text: '**BFC**(Block Formatting Context)是块级盒子参与的布局环境。理解 BFC 是掌握 CSS 布局的关键——它解释了为什么浮动会导致父元素高度塌陷、为什么 margin 有时会折叠、为什么 `overflow: hidden` 能清除浮动。' },
      { type: 'list', items: [
        '**规则 1**:BFC 内的块级盒子**垂直排列**,从包含块顶部开始,一个接一个堆叠',
        '**规则 2**:每个盒子的左外边缘紧贴包含块的左边缘(在 RTL 语言中是右边缘),即使存在浮动',
        '**规则 3**:相邻块级盒子的**垂直 margin 会折叠**(margin collapsing),取较大值',
        '**规则 4**:BFC 是独立的渲染区域——内部布局不影响外部,外部布局不影响内部',
        '**规则 5**:BFC 的高度会包含其内部的浮动元素(这就是 BFC 能"清除浮动"的原理)'
      ] },

      { type: 'heading', text: '如何创建 BFC?' },
      { type: 'paragraph', text: 'BFC 不是某个属性,而是某些 CSS 声明的**副作用**。以下情况会创建新的 BFC:' },
      { type: 'code', lang: 'css', caption: '触发 BFC 的常见方式', code: `/* 1. 根元素(<html>)自动创建 BFC */\n\n/* 2. 浮动元素 */\n.float { float: left; }  /* 或 right */\n\n/* 3. 绝对定位元素 */\n.absolute { position: absolute; }  /* 或 fixed */\n\n/* 4. inline-block 元素 */\n.inline-block { display: inline-block; }\n\n/* 5. 表格单元格和标题 */\n.table-cell { display: table-cell; }\n.table-caption { display: table-caption; }\n\n/* 6. overflow 不是 visible 的块盒子 */\n.overflow { overflow: hidden; }  /* 或 auto, scroll */\n\n/* 7. display: flow-root (CSS3 推荐方式) */\n.flow-root { display: flow-root; }\n\n/* 8. Flex/Grid 项目(flex item / grid item) */\n/* 9. contain: layout/content/paint */\n/* 10. column-span: all */` },
      { type: 'tip', text: '**最佳实践**:优先使用 `display: flow-root` 创建 BFC——它语义清晰,没有副作用。`overflow: hidden/auto` 虽然也能触发 BFC,但会裁剪或添加滚动条,可能不是你想要的。' },

      { type: 'heading', text: 'BFC 的三大应用' },
      { type: 'example', title: '应用 1:清除浮动,解决高度塌陷', lang: 'html', code: `<!-- 问题:浮动子元素不撑开父元素高度 -->\n<div style="background: #eee; border: 2px solid red;">\n  <div style="float: left; width: 200px; height: 100px; background: blue;">浮动子元素</div>\n  <!-- 父元素高度 = 0!浮动子元素"飞出去"了 -->\n</div>\n\n<!-- 解决方案:给父元素创建 BFC -->\n<div style="display: flow-root; background: #eee; border: 2px solid red;">\n  <div style="float: left; width: 200px; height: 100px; background: blue;">浮动子元素</div>\n  <!-- 父元素高度 = 100px,包含了浮动子元素 -->\n</div>`, explanation: 'BFC 会**计算浮动子元素的高度**,所以父元素的高度不会塌陷。这是 `overflow: hidden` 能"清除浮动"的真正原理——它创建了 BFC,而非真的"清除"了什么。' },

      { type: 'example', title: '应用 2:阻止 margin 折叠', lang: 'html', code: `<!-- 问题:相邻块级元素的 margin 折叠 -->\n<div style="background: #eee; padding: 1px;">\n  <div style="background: red; height: 50px; margin: 20px;">块A</div>\n  <div style="background: blue; height: 50px; margin: 20px;">块B</div>\n  <!-- A 和 B 之间的间距 = 20px(折叠),而非 40px -->\n</div>\n\n<!-- 解决方案:把其中一个元素包裹在 BFC 中 -->\n<div style="background: #eee; padding: 1px;">\n  <div style="background: red; height: 50px; margin: 20px;">块A</div>\n  <div style="display: flow-root;">  <!-- 创建 BFC -->\n    <div style="background: blue; height: 50px; margin: 20px;">块B</div>\n  </div>\n  <!-- A 和 B 之间的间距 = 40px(不折叠) -->\n</div>`, explanation: 'BFC 是独立的布局区域,**内部的 margin 不会与外部的 margin 折叠**。通过将其中一个元素包裹在 BFC 容器中,可以阻止 margin 折叠。' },

      { type: 'example', title: '应用 3:阻止被浮动元素覆盖', lang: 'html', code: `<!-- 问题:普通块会被浮动元素覆盖 -->\n<div style="background: #eee; padding: 10px;">\n  <div style="float: left; width: 150px; height: 100px; background: red; opacity: 0.7;">浮动</div>\n  <div style="background: blue; height: 150px;">普通块(被浮动覆盖)</div>\n</div>\n\n<!-- 解决方案:给普通块创建 BFC -->\n<div style="background: #eee; padding: 10px;">\n  <div style="float: left; width: 150px; height: 100px; background: red;">浮动</div>\n  <div style="display: flow-root; background: blue; height: 150px;">BFC 块(不被覆盖)</div>\n</div>`, explanation: 'BFC 区域**不会与浮动盒子重叠**。普通块的文字会环绕浮动元素,但块本身会延伸到浮动元素下方,被覆盖。而 BFC 块会缩小宽度,为浮动元素腾出空间,形成"两列布局"。这是实现自适应两栏布局的经典技巧(在 Flexbox 出现之前)。' },

      { type: 'heading', text: '行内格式化上下文(IFC)' },
      { type: 'paragraph', text: '**IFC**(Inline Formatting Context)是行内级盒子参与的布局环境。当块容器只包含行内级内容(文本、`<span>`、`<a>` 等)时,会创建 IFC。' },
      { type: 'list', items: [
        '**规则 1**:行内盒子水平排列,从包含块顶部开始,一个接一个放置',
        '**规则 2**:当一行放不下时,会换行创建新的**行盒**(line box)',
        '**规则 3**:行盒的宽度由包含块决定,高度由 `line-height` 和 `vertical-align` 共同决定',
        '**规则 4**:行盒内的水平分布由 `text-align` 决定(左对齐、右对齐、居中等)',
        '**规则 5**:行盒内的垂直对齐由 `vertical-align` 决定(基线对齐、顶部对齐等)'
      ] },
      { type: 'tip', text: 'IFC 的详细规则会在"行内格式化详解"章节深入讲解。这里只需要理解:行内内容会形成行盒,行盒是 IFC 中的基本单位。' },

      { type: 'heading', text: '盒子的三层分类' },
      { type: 'paragraph', text: 'CSS 规范定义了三个相关但不同的概念,容易混淆:' },
      { type: 'list', items: [
        '**块级盒子**(block-level box):`display: block/list-item/table` 生成的盒子。特征:**参与 BFC**',
        '**块容器盒子**(block container box):可以包含其他块级盒子或建立 IFC 的盒子。`display: block/inline-block/table-cell` 都会生成块容器',
        '**块盒子**(block box):**既是块级盒子又是块容器盒子**的盒子。`display: block` 的非替换元素生成块盒子'
      ] },
      { type: 'code', lang: 'css', caption: '三种盒子的关系', code: `/* 块盒子 = 块级盒子 + 块容器盒子 */\n.block-box {\n  display: block;        /* 既是块级,又是块容器 */\n}\n\n/* 块级盒子,但不是块容器(替换元素) */\nimg {\n  display: block;        /* 块级,但不包含子元素 → 不是块容器 */\n}\n\n/* 块容器,但不是块级盒子 */\n.inline-block {\n  display: inline-block; /* 行内级,但内部是块容器 */\n}`, explanation: '日常开发中不需要严格区分这三者,但理解它们的定义有助于阅读规范。核心区别:**块级**关注外部表现(参与 BFC),**块容器**关注内部能力(能否包含块级子元素或建立 IFC)。' },

      { type: 'heading', text: 'Margin 折叠详解' },
      { type: 'paragraph', text: 'Margin 折叠(margin collapsing)是 BFC 中最容易出错的特性。**只有垂直方向的 margin 会折叠,水平方向不会**。折叠规则如下:' },
      { type: 'list', items: [
        '**相邻兄弟元素**:上一个元素的 `margin-bottom` 与下一个元素的 `margin-top` 折叠,取较大值',
        '**父元素与第一个/最后一个子元素**:如果父元素没有 border/padding/内容/BFC 隔离,父元素的 `margin-top` 会与第一个子元素的 `margin-top` 折叠',
        '**空元素**:如果元素没有 border/padding/内容/height,其 `margin-top` 和 `margin-bottom` 会折叠为一个',
        '**负 margin**:一正一负时,取两者之和;都是负数时,取绝对值较大者'
      ] },
      { type: 'warning', text: '**不会折叠的情况**:浮动元素、绝对定位元素、`inline-block`、创建 BFC 的元素,它们的 margin 不与任何元素折叠。Flex/Grid 容器内的项目的 margin 也不折叠。' },
      { type: 'example', title: '父子 margin 折叠的坑', lang: 'html', code: `<!-- 期望:父元素与顶部有 20px 间距 -->\n<div style="margin-top: 20px; background: #eee;">\n  <div style="margin-top: 30px; background: blue; height: 50px;">子元素</div>\n</div>\n<!-- 实际:父元素的 margin-top 与子元素的 margin-top 折叠为 30px,\n     父元素紧贴顶部,子元素没有额外的 top margin! -->\n\n<!-- 解决方案 1:父元素创建 BFC -->\n<div style="margin-top: 20px; display: flow-root; background: #eee;">\n  <div style="margin-top: 30px; background: blue; height: 50px;">子元素</div>\n</div>\n\n<!-- 解决方案 2:父元素添加 padding 或 border 隔离 -->\n<div style="margin-top: 20px; padding-top: 1px; background: #eee;">\n  <div style="margin-top: 30px; background: blue; height: 50px;">子元素</div>\n</div>`, explanation: '父子 margin 折叠是初学者最常遇到的问题——给子元素设置 `margin-top`,结果父元素整体向下移动了。原因:父元素没有 border/padding/BFC 隔离,两个 margin 折叠并"溢出"到父元素外面。' },

      { type: 'heading', text: '匿名盒子的生成规则' },
      { type: 'paragraph', text: '当块容器同时包含块级和行内内容时,CSS 要求"块容器只能包含同类型的盒子"。浏览器会自动生成匿名块盒子包裹行内内容。' },
      { type: 'example', title: '匿名块盒子的生成', lang: 'html', code: `<div style="background: #eee;">\n  这是文本\n  <p style="background: red;">这是段落</p>\n  又是文本\n  <p style="background: blue;">又一段落</p>\n</div>\n\n<!-- 浏览器处理为: -->\n<div>\n  <anonymous-block>这是文本</anonymous-block>\n  <p>这是段落</p>\n  <anonymous-block>又是文本</anonymous-block>\n  <p>又一段落</p>\n</div>`, explanation: '匿名块盒子会继承父元素的可继承属性(如 `color`),不可继承属性取初始值。你无法给它设置样式(因为它没有对应的元素)。' },
      { type: 'tip', text: '类似地,块容器中的裸文本会生成**匿名行内盒子**参与 IFC。规范规定:连续的空白符(空格、换行、制表符)会根据 `white-space` 属性折叠,折叠后为空的匿名行内盒子不会生成。' },

      { type: 'heading', text: '相对定位在常规流中的特殊性' },
      { type: 'paragraph', text: '`position: relative` 元素虽然可以偏移,但仍然**参与常规流**——它占据原本的空间,后续元素的位置不受偏移影响。' },
      { type: 'code', lang: 'css', caption: '相对定位的过约束处理', code: `.relative {\n  position: relative;\n  left: 50px;\n  right: 30px;  /* 冲突:left 和 right 不能同时满足 */\n  /* 解决:在 LTR 语言中,忽略 right;在 RTL 语言中,忽略 left */\n}\n\n/* 同理 */\n.relative2 {\n  position: relative;\n  top: 20px;\n  bottom: 10px;  /* 冲突:top 和 bottom 不能同时满足 */\n  /* 解决:忽略 bottom */\n}` },
      { type: 'tip', text: '相对定位的一个隐藏用途:**不偏移,只创建定位上下文**。设置 `position: relative` 但不设置 `top/left` 等,元素位置不变,但它成为了后代绝对定位元素的包含块,也可以使用 `z-index`。' },
    ] as TutorialBlock[],
  },
  {
    id: 'floats',
    number: '5',
    title: { zh: '浮动', en: 'Floats' },
    summary: { zh: '浮动盒子通过 float 属性从常规流中移出,向左或向右移动直到碰到包含块边缘或另一个浮动盒子。浮动盒子不在常规流中,但仍然影响行盒的布局。', en: 'Floated boxes are removed from normal flow via the float property and moved left or right until they touch the containing block edge or another floated box. Floated boxes are not in normal flow but still affect the layout of line boxes.' },
    keyPoints: [
      'float: left 或 right 使盒子成为浮动盒子,脱离常规流',
      '浮动盒子向左/右移动,直到其外边缘碰到包含块边缘或另一个浮动盒子的外边缘',
      '浮动盒子会使后续行盒缩短,为浮动腾出空间',
      'clear 属性指定元素的哪一侧不允许有浮动盒子,会向下移动直到清除浮动',
      'clear 值:none(默认)、left(左侧清除)、right(右侧清除)、both(两侧都清除)',
      '浮动元素会生成块级盒子,无论其 display 值是什么(除了 none)',
      '浮动不会影响绝对定位元素的布局',
      '父元素高度塌陷问题:浮动子元素不参与父元素高度计算,可通过建立 BFC 或清除浮动解决',
      '浮动盒子的精确定位遵循 9 条规则:不能超出包含块边缘、不能与同侧先前浮动重叠、左右浮动不互相重叠、尽可能高、尽可能靠左/右等',
      '浮动盒子的 margin 永远不会与相邻盒子的 margin 折叠',
    ],
    tutorial: [
      { type: 'heading', text: '浮动的本质:半脱离文档流' },
      { type: 'paragraph', text: '`float` 最初是为了实现**文字环绕图片**的效果(类似报纸排版),后来被"滥用"成布局工具。理解浮动的关键:**浮动盒子脱离常规流,但不是完全脱离**——它不占据流内空间,但仍然会影响行内内容的排列。' },
      { type: 'paragraph', text: '浮动盒子的生命周期:先按常规流确定位置,然后从流中"浮起",向左或向右移动,直到碰到包含块边缘或另一个浮动盒子。后续的行内内容会绕过浮动盒子排列。' },

      { type: 'heading', text: '`float: left` 与 `float: right`' },
      { type: 'code', lang: 'css', caption: '浮动的基本语法', code: `.float-left {\n  float: left;   /* 向左浮动 */\n}\n\n.float-right {\n  float: right;  /* 向右浮动 */\n}\n\n.no-float {\n  float: none;   /* 默认值,不浮动 */\n}` },
      { type: 'example', title: '经典应用:图文环绕', lang: 'html', code: `<article style="width: 400px; background: #eee; padding: 10px;">\n  <img src="photo.jpg" style="float: left; width: 150px; height: 150px; margin: 0 10px 10px 0;">\n  <p>这是一段很长的文字。图片向左浮动,文字会环绕图片右侧排列。这就是 float 最初的设计目的——实现报纸杂志那种图文混排的效果。文字会自动避开浮动图片,在它右侧和下方流动...</p>\n</article>`, explanation: '浮动图片"浮"在左上角,后续的文本内容会填充图片右侧和下方的空间。这是浮动的本职工作——**让行内内容环绕块级元素**。' },

      { type: 'heading', text: '浮动的关键特性' },
      { type: 'list', items: [
        '**脱离常规流**:浮动元素不占据流内空间,后续块级元素会"看不见"它,当它不存在一样',
        '**影响行盒**:浮动元素会缩短后续的行盒(line box),使行内内容环绕它',
        '**块级化**:浮动元素会生成块级盒子,即使原本是 `inline`。可以设置宽高',
        '**收缩包裹**:浮动元素的宽度不再默认填满父元素,而是由内容决定(除非显式设置 `width`)',
        '**不能超出包含块**:浮动元素会停在包含块的边缘,不会"浮"到外面去',
        '**不会重叠**:多个浮动元素不会重叠,会依次排列'
      ] },

      { type: 'heading', text: '浮动定位的九条规则' },
      { type: 'paragraph', text: 'CSS 规范定义了 9 条精确的规则,决定浮动盒子的最终位置。理解这些规则可以解释浮动的各种"怪异"行为:' },
      { type: 'list', ordered: true, items: [
        '左浮动盒子的左外边缘不能超出包含块的左边缘(右浮动同理)',
        '左浮动盒子的左边不能超过任何先前的左浮动盒子的右边(不重叠)',
        '右浮动盒子的右边不能超过任何先前的右浮动盒子的左边(不重叠)',
        '浮动盒子的顶部不能高于其在源码中的前一个块级盒子或浮动盒子的顶部(不能"飞"到前面的元素上方)',
        '浮动盒子的顶部不能高于包含它的行盒的顶部(与文本对齐)',
        '左浮动盒子的左边如果有另一个左浮动盒子,它的右边不能超出包含块右边缘',
        '浮动盒子必须尽可能高地放置(在满足前面规则的前提下)',
        '左浮动盒子必须尽可能靠左,右浮动尽可能靠右(在满足前面规则的前提下)',
        '浮动盒子尽可能高优先于尽可能靠左/右'
      ] },
      { type: 'tip', text: '实际开发中不需要背诵这些规则,但当浮动元素的位置和预期不符时,回来查阅这些规则可以找到答案。核心原则:**不重叠 + 尽可能高 + 尽可能靠边**。' },

      { type: 'heading', text: '父元素高度塌陷问题' },
      { type: 'paragraph', text: '浮动最臭名昭著的问题:**浮动子元素不会撑开父元素的高度**。这是因为浮动元素脱离了常规流,父元素在计算高度时会忽略它们。' },
      { type: 'example', title: '高度塌陷演示', lang: 'html', code: `<!-- 问题:父元素高度塌陷为 0 -->\n<div style="background: #eee; border: 2px solid red;">\n  <div style="float: left; width: 200px; height: 100px; background: blue;">浮动子元素</div>\n  <div style="float: left; width: 200px; height: 150px; background: green;">浮动子元素</div>\n  <!-- 父元素高度 = 0,因为两个子元素都浮动了 -->\n  <!-- 红色边框会"塌"成一条线 -->\n</div>`, explanation: '浮动元素像"幽灵"——它们存在,占据视觉空间,但父元素在计算高度时"看不见"它们。这会导致父元素的背景、边框无法包裹浮动子元素。' },

      { type: 'heading', text: '清除浮动的四种方法' },
      { type: 'code', lang: 'css', caption: '方法 1:父元素创建 BFC(推荐)', code: `.container {\n  display: flow-root;  /* 现代方法:明确创建 BFC */\n  /* 或 overflow: hidden;  传统方法,有副作用 */\n  /* 或 overflow: auto;    传统方法,可能出现滚动条 */\n}` },
      { type: 'code', lang: 'css', caption: '方法 2:在浮动元素后添加清除元素', code: `/* HTML: <div class="clearfix"></div> 放在浮动元素后 */\n.clearfix {\n  clear: both;  /* 强制元素下移到所有浮动元素下方 */\n  /* 通常配合 height: 0; visibility: hidden; */\n}` },
      { type: 'code', lang: 'css', caption: '方法 3:伪元素清除浮动(经典 clearfix hack)', code: `.container::after {\n  content: "";\n  display: block;   /* 或 table */\n  clear: both;\n}\n\n/* 完整的 clearfix(兼容旧浏览器) */\n.clearfix::before,\n.clearfix::after {\n  content: "";\n  display: table;\n}\n.clearfix::after {\n  clear: both;\n}` },
      { type: 'code', lang: 'css', caption: '方法 4:父元素也浮动', code: `.container {\n  float: left;  /* 父元素浮动后会包含浮动子元素 */\n  width: 100%;  /* 通常需要显式设置宽度 */\n  /* 缺点:父元素也脱离流了,问题转移到祖父元素 */\n}` },
      { type: 'tip', text: '**现代最佳实践**:用 `display: flow-root`。如果需要兼容旧浏览器,用伪元素 clearfix。避免用父元素浮动(问题链式传递)。' },

      { type: 'heading', text: '`clear` 属性:阻止浮动环绕' },
      { type: 'paragraph', text: '`clear` 属性让元素**拒绝与浮动元素并排**,强制元素下移到所有浮动元素的下方。' },
      { type: 'code', lang: 'css', caption: 'clear 的三个值', code: `.clear-left {\n  clear: left;   /* 左侧不允许有浮动元素 */\n}\n\n.clear-right {\n  clear: right;  /* 右侧不允许有浮动元素 */\n}\n\n.clear-both {\n  clear: both;   /* 两侧都不允许有浮动元素(最常用) */\n}` },
      { type: 'example', title: 'clear 阻止文字环绕', lang: 'html', code: `<div style="width: 400px;">\n  <img src="photo.jpg" style="float: left; width: 150px; height: 150px; margin-right: 10px;">\n  <p>这段文字会环绕图片...</p>\n  <p style="clear: left;">这段文字不会环绕,强制从图片下方开始</p>\n</div>`, explanation: '`clear: left` 让第二个段落下移,直到左侧没有浮动元素。实际效果:第二段不会出现在图片右侧,而是从图片底部下方开始。' },
      { type: 'warning', text: '`clear` 只对**块级元素**有效。行内元素设置 `clear` 无效(但可以先转为 `display: block`)。`clear` 通过增加元素的上 margin 实现下移,而非真的"清除"了浮动。' },

      { type: 'heading', text: '浮动布局的经典模式' },
      { type: 'example', title: '两列布局:固定宽度侧边栏 + 自适应内容', lang: 'css', code: `.sidebar {\n  float: left;\n  width: 250px;\n  background: #f0f0f0;\n}\n\n.content {\n  margin-left: 270px;  /* 侧边栏宽度 + 间距 */\n  /* 或用 overflow: hidden; 创建 BFC,自动避开浮动 */\n}`, explanation: '侧边栏向左浮动,内容区通过 `margin-left` 留出侧边栏的空间。或者给内容区创建 BFC(`overflow: hidden`),让它自动缩小宽度避开浮动侧边栏。' },
      { type: 'example', title: '三列布局:左右固定,中间自适应', lang: 'css', code: `.left {\n  float: left;\n  width: 200px;\n}\n\n.right {\n  float: right;\n  width: 200px;\n}\n\n.center {\n  margin: 0 220px;  /* 左右各留 200px + 20px 间距 */\n  /* 或 overflow: hidden; 创建 BFC */\n}`, explanation: '左栏左浮动,右栏右浮动,中间栏通过 margin 或 BFC 占据剩余空间。注意 HTML 顺序:左栏、右栏、中间栏(或使用负 margin 技巧实现中间栏优先)。' },

      { type: 'heading', text: '浮动的常见陷阱' },
      { type: 'list', items: [
        '**陷阱 1:浮动元素高度不一致**。多个并排浮动时,如果高度不同,后续浮动可能"卡住",无法回到左边缘。解决:每隔 N 个元素插入 `clear: left`',
        '**陷阱 2:浮动元素超出父元素**。浮动元素的 margin 可能导致它超出包含块右边缘。解决:调整宽度计算,或用 `box-sizing: border-box`',
        '**陷阱 3:margin 折叠失效**。浮动元素的 margin 不会与相邻元素折叠,可能导致意外的间距',
        '**陷阱 4:浮动元素遮挡点击**。浮动元素可能覆盖后续内容,阻挡点击。解决:给被覆盖的元素设置 `position: relative`'
      ] },

      { type: 'heading', text: '浮动 vs 现代布局' },
      { type: 'paragraph', text: '浮动最初设计用于图文混排,后来被"黑"成布局工具。但它的缺点很明显:需要清除浮动、高度塌陷、容易出错。现代 CSS 提供了更好的布局方案:' },
      { type: 'list', items: [
        '**Flexbox**:一维布局(行或列),适合导航栏、卡片列表、工具栏',
        '**Grid**:二维布局,适合整体页面结构、复杂网格',
        '**浮动**:仍然是图文混排的最佳方案,其他场景请用 Flex/Grid'
      ] },
      { type: 'tip', text: '**经验法则**:如果你需要文字环绕效果,用 `float`。如果你需要布局(导航栏、侧边栏、网格),用 Flexbox 或 Grid。不要再用浮动做主要布局了——维护成本太高。' },

      { type: 'heading', text: '浮动与定位的交互' },
      { type: 'paragraph', text: '浮动不会影响绝对定位元素,反之亦然。如果元素同时设置了 `float` 和 `position: absolute/fixed`,`float` 的计算值会被强制为 `none`(绝对定位的优先级更高)。' },
      { type: 'code', lang: 'css', caption: '绝对定位会覆盖浮动', code: `.element {\n  float: left;           /* 指定值 */\n  position: absolute;    /* 绝对定位 */\n  /* float 的计算值被强制为 none */\n}` },
    ] as TutorialBlock[],
  },
  {
    id: 'absolute-positioning',
    number: '6',
    title: { zh: '绝对定位', en: 'Absolute positioning' },
    summary: { zh: '绝对定位模型中,盒子从常规流中完全移除,相对于包含块定位。包含块由最近的 positioned 祖先元素(position 非 static)确定。', en: 'In the absolute positioning model, boxes are completely removed from normal flow and positioned relative to a containing block. The containing block is determined by the nearest positioned ancestor element (position other than static).' },
    keyPoints: [
      'position: absolute 使盒子脱离常规流,相对于包含块定位',
      'position: fixed 是绝对定位的特例,包含块始终是视口(viewport)',
      '绝对定位盒子不影响后续兄弟元素的布局',
      '包含块确定规则:最近的 position 非 static 的祖先元素;如果没有,则为初始包含块(initial containing block)',
      'top、right、bottom、left 属性指定盒子相对于包含块的偏移',
      '如果 top/bottom 或 left/right 同时指定,且 height/width 为 auto,则尺寸由偏移值计算',
      '绝对定位元素会生成块级盒子(display 的行内值被转换为对应的块值)',
      '绝对定位盒子为其常规流子元素和绝对定位(非 fixed)后代建立新的包含块',
      'CSS3 引入内缩修正包含块(inset-modified containing block):由 inset 属性从包含块向内收缩定义的区域,决定绝对定位盒子的可用空间和对齐参照',
    ],
    tutorial: [
      { type: 'heading', text: '绝对定位:完全脱离文档流' },
      { type: 'paragraph', text: '绝对定位(`position: absolute`)让元素**完全脱离常规流**——它不占据空间,不影响兄弟元素布局,可以精确定位到任意位置。与浮动的"半脱离"不同,绝对定位是**彻底脱离**。' },
      { type: 'paragraph', text: '理解绝对定位的核心:**包含块**(containing block)。绝对定位元素的位置和尺寸都相对于包含块计算,包含块由最近的**定位祖先**确定。' },

      { type: 'heading', text: '包含块的确定规则' },
      { type: 'paragraph', text: '这是绝对定位最重要的规则:' },
      { type: 'list', ordered: true, items: [
        '从元素的父元素开始,向上遍历祖先链',
        '找到第一个 `position` 不是 `static` 的祖先(即 `relative`、`absolute`、`fixed` 或 `sticky`)',
        '该祖先的 **padding box**(内边距盒子,不含 border)就是包含块',
        '如果找不到定位祖先,包含块是**初始包含块**(通常等于 `<html>` 元素,覆盖整个页面)'
      ] },
      { type: 'example', title: '包含块的查找过程', lang: 'html', code: `<div style="position: static;">               <!-- 非定位,跳过 -->\n  <div style="position: relative; padding: 20px; border: 5px solid red;">  <!-- 定位元素! -->\n    <div style="position: static;">           <!-- 非定位,跳过 -->\n      <div style="position: absolute; top: 0; left: 0;">\n        我的包含块是 position: relative 的那个 div 的 padding box\n        (不包括红色 border)\n      </div>\n    </div>\n  </div>\n</div>`, explanation: '绝对定位元素会**跳过所有非定位祖先**,找到第一个定位祖先作为包含块。这就是为什么经典模式是"父元素 `position: relative` + 子元素 `position: absolute`"——父元素不偏移(没有 top/left 等),只是建立定位参照。' },
      { type: 'warning', text: '包含块是 **padding box**,不是 border box。如果父元素有粗边框,绝对定位元素 `top: 0; left: 0` 会定位在边框内侧(紧贴 padding 边缘),而非边框外侧。' },

      { type: 'heading', text: '偏移属性:top、right、bottom、left' },
      { type: 'paragraph', text: '这四个属性定义绝对定位元素相对于包含块的位置。它们不是"移动距离",而是**边缘之间的距离**:' },
      { type: 'list', items: [
        '`top: 20px`:元素的**上边缘**距离包含块的**上边缘** 20px',
        '`left: 30px`:元素的**左边缘**距离包含块的**左边缘** 30px',
        '`bottom: 10px`:元素的**下边缘**距离包含块的**下边缘** 10px',
        '`right: 40px`:元素的**右边缘**距离包含块的**右边缘** 40px'
      ] },
      { type: 'code', lang: 'css', caption: '四个角的定位', code: `/* 左上角 */\n.top-left {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n/* 右上角 */\n.top-right {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n\n/* 右下角 */\n.bottom-right {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n}\n\n/* 左下角 */\n.bottom-left {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n}\n\n/* 正中央(需要知道元素宽高) */\n.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  /* 或用 margin 负值:margin: -元素高度/2 0 0 -元素宽度/2; */\n}` },

      { type: 'heading', text: '拉伸尺寸:同时设置对立边' },
      { type: 'paragraph', text: '如果同时设置对立的偏移属性(`top` + `bottom` 或 `left` + `right`),且元素没有显式的 `width`/`height`,元素会被**拉伸**以满足两个约束。这是实现"填满包含块"的技巧。' },
      { type: 'example', title: '拉伸填满包含块', lang: 'css', code: `.overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  /* 等价于 inset: 0; */\n  /* 元素宽度 = 包含块宽度 - 0 - 0 = 100%\n     元素高度 = 包含块高度 - 0 - 0 = 100% */\n  background: rgba(0, 0, 0, 0.5);\n}\n\n/* 距离四边各 20px 的内层框 */\n.inner {\n  position: absolute;\n  inset: 20px;  /* 简写 */\n  /* 宽度 = 包含块宽度 - 20 - 20\n     高度 = 包含块高度 - 20 - 20 */\n}`, explanation: '`inset: 0`(即 `top: 0; right: 0; bottom: 0; left: 0`)是最常见的模式——创建覆盖整个包含块的遮罩层、背景层或占位符。配合 `margin: auto` 可以实现完美居中。' },
      { type: 'tip', text: '如果元素有显式的 `width` 或 `height`,拉伸会失败——偏移属性与尺寸属性冲突时,`bottom` 和 `right` 会被忽略(在 LTR 语言中,RTL 语言相反)。' },

      { type: 'heading', text: '完美居中的四种方法' },
      { type: 'code', lang: 'css', caption: '方法 1:已知宽高 + margin 负值', code: `.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 200px;\n  height: 100px;\n  margin-left: -100px;  /* 宽度的一半 */\n  margin-top: -50px;    /* 高度的一半 */\n}` },
      { type: 'code', lang: 'css', caption: '方法 2:已知宽高 + transform', code: `.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  /* 优点:不需要计算具体数值,响应式友好 */\n}` },
      { type: 'code', lang: 'css', caption: '方法 3:已知宽高 + inset + margin auto', code: `.center {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 200px;   /* 必须有明确宽高 */\n  height: 100px;\n  margin: auto;   /* 自动分配剩余空间,实现居中 */\n}` },
      { type: 'code', lang: 'css', caption: '方法 4:Flexbox(最简洁,推荐)', code: `/* 父元素 */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n/* 子元素不需要任何定位 */` },
      { type: 'tip', text: '**推荐顺序**:能用 Flexbox 就用 Flexbox(最简洁)。如果必须用绝对定位,优先用 `transform` 方法(不需要知道宽高)。避免用 margin 负值(需要手动计算)。' },

      { type: 'heading', text: '`position: fixed` 的特殊性' },
      { type: 'paragraph', text: '`fixed` 是绝对定位的特殊形式,唯一区别:**包含块始终是视口**(viewport),而不是定位祖先。固定定位元素"钉"在屏幕固定位置,不随页面滚动。' },
      { type: 'example', title: '固定导航栏', lang: 'css', code: `.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 60px;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  z-index: 1000;\n}\n\n/* 页面内容需要留出导航栏的空间 */\nbody {\n  padding-top: 60px;  /* 避免被固定导航栏遮挡 */\n}`, explanation: '固定导航栏会覆盖在页面内容上方,所以 `<body>` 需要 `padding-top` 留出空间。`left: 0; right: 0` 让导航栏宽度等于视口宽度。' },
      { type: 'warning', text: '**陷阱**:如果祖先元素设置了 `transform`、`filter`、`perspective`、`backdrop-filter` 或 `will-change: transform` 等属性,`fixed` 元素的包含块会变成**该祖先**,而非视口!这是一个常见 bug——固定元素突然不固定了。解决:确保固定元素和应用这些属性的元素不在同一祖先链。' },

      { type: 'heading', text: '绝对定位的尺寸计算' },
      { type: 'paragraph', text: '绝对定位元素的宽度不再默认填满父元素,而是**收缩到内容宽度**(除非显式设置 `width` 或同时设置 `left` 和 `right`)。这与块级元素的"默认宽度 100%"不同。' },
      { type: 'code', lang: 'css', caption: '三种宽度设置方式', code: `/* 方式 1:显式设置 width */\n.absolute1 {\n  position: absolute;\n  width: 300px;\n}\n\n/* 方式 2:同时设置 left 和 right,宽度被拉伸 */\n.absolute2 {\n  position: absolute;\n  left: 50px;\n  right: 50px;\n  /* 宽度 = 包含块宽度 - 50 - 50 */\n}\n\n/* 方式 3:不设置 width/left/right,宽度由内容决定 */\n.absolute3 {\n  position: absolute;\n  /* 宽度 = 内容的最小宽度(收缩包裹) */\n}` },

      { type: 'heading', text: '绝对定位元素的层叠与 z-index' },
      { type: 'paragraph', text: '绝对定位元素会创建层叠上下文(如果 `z-index` 不是 `auto`),可以用 `z-index` 控制绘制顺序。后出现的绝对定位元素默认覆盖先出现的。' },
      { type: 'code', lang: 'css', caption: 'z-index 控制层叠顺序', code: `.tooltip {\n  position: absolute;\n  z-index: 1000;  /* 高层级,覆盖其他内容 */\n}\n\n.modal-overlay {\n  position: fixed;\n  z-index: 9998;  /* 模态框遮罩 */\n}\n\n.modal-content {\n  position: fixed;\n  z-index: 9999;  /* 模态框内容,在遮罩之上 */\n}` },
      { type: 'tip', text: '**z-index 最佳实践**:定义一套全局的层级系统(如:普通内容 0-99,下拉菜单 100-199,对话框 200-299,通知 300-399,调试工具 1000+)。避免 z-index 竞赛(一个 9999,下一个就 99999)。' },

      { type: 'heading', text: '绝对定位的典型应用' },
      { type: 'list', items: [
        '**悬浮按钮、徽标、角标**:定位在容器的角落(`top: 10px; right: 10px`)',
        '**下拉菜单、提示框**:相对于触发元素定位',
        '**模态框、遮罩层**:覆盖整个视口(`position: fixed; inset: 0`)',
        '**图片标注、热区**:在图片上定位文字或交互区域',
        '**自定义表单控件**:如自定义的下拉箭头、清除按钮'
      ] },
      { type: 'example', title: '卡片右上角的关闭按钮', lang: 'css', code: `.card {\n  position: relative;  /* 建立定位参照 */\n  padding: 20px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n}\n\n.close-btn {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 24px;\n  height: 24px;\n  background: #f00;\n  color: white;\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n}` },

      { type: 'heading', text: '绝对定位的常见陷阱' },
      { type: 'list', items: [
        '**陷阱 1:忘记设置定位父元素**。结果:元素相对于整个页面定位,跑到奇怪的位置。解决:给包含元素加 `position: relative`',
        '**陷阱 2:使用百分比偏移**。`top: 50%` 是相对于**包含块高度**的 50%,不是元素自身高度。需要配合 `transform` 或 margin 负值居中',
        '**陷阱 3:z-index 不生效**。原因:可能在不同的层叠上下文中,子元素的 z-index 无法与外部比较',
        '**陷阱 4:固定定位失效**。原因:祖先元素有 `transform` 等属性,改变了包含块',
        '**陷阱 5:遮挡可点击元素**。绝对定位元素可能覆盖其他内容,阻止点击。解决:调整 z-index 或用 `pointer-events: none`'
      ] },

      { type: 'heading', text: '绝对定位 vs Flexbox/Grid' },
      { type: 'paragraph', text: '绝对定位适合"覆盖层"类的需求——元素需要脱离文档流,精确定位到某个位置。**不适合**作为主要的布局工具:' },
      { type: 'list', items: [
        '**用绝对定位**:模态框、工具提示、下拉菜单、悬浮按钮、徽标',
        '**不用绝对定位**:页面布局(用 Grid)、导航栏(用 Flex)、卡片网格(用 Grid/Flex)、表单布局(用 Grid)'
      ] },
      { type: 'warning', text: '不要用绝对定位做整体页面布局——元素脱离流后,页面高度、滚动、响应式都很难处理。绝对定位是"点缀",不是"主菜"。' },
    ] as TutorialBlock[],
  },
  {
    id: 'stacking-context',
    number: '7',
    title: { zh: '层叠上下文与绘制顺序', en: 'Layered presentation' },
    summary: { zh: 'CSS 假设画布是无限的,但实际渲染时需要确定绘制顺序。层叠上下文(stacking context)定义了元素在 Z 轴的绘制顺序,z-index 属性控制盒子在层叠上下文中的层级。', en: 'CSS assumes an infinite canvas, but the rendering order must be determined during actual rendering. The stacking context defines the rendering order of elements on the Z-axis, and the z-index property controls the level of boxes within the stacking context.' },
    keyPoints: [
      '层叠上下文是三维概念,盒子在 Z 轴上分层绘制',
      'z-index 只对定位元素(position 非 static)有效,控制其在当前层叠上下文中的层级',
      'z-index: auto 表示盒子在当前层叠上下文的层级为 0,不建立新的层叠上下文',
      'z-index 为整数时,该值是层级,且盒子建立新的局部层叠上下文',
      '层叠上下文嵌套:子元素的 z-index 只在父层叠上下文内比较',
      '同一层叠上下文内的绘制顺序(从后到前):背景和边框 → 负 z-index 子层叠上下文 → 块级后代 → 浮动元素 → 行内后代 → z-index: 0 或 auto 的定位后代 → 正 z-index 子层叠上下文',
      '建立层叠上下文的条件(CSS2):根元素、z-index 非 auto 的定位元素',
      'CSS3 扩展:opacity < 1、transform/filter/perspective、will-change、contain: paint/layout 等属性也会建立层叠上下文',
      '浮动元素的内容按仿佛建立了新层叠上下文的方式堆叠,但浮动元素实际参与父层叠上下文;浮动元素渲染在非定位流内块之前、流内行内内容之后',
    ],
    tutorial: [
      { type: 'heading', text: '层叠上下文:Z 轴的独立王国' },
      { type: 'paragraph', text: '到目前为止,我们讨论的都是二维布局——元素在水平(X)和垂直(Y)方向的位置。但 CSS 还有第三个维度:**Z 轴**(垂直于屏幕,从后到前)。**层叠上下文**(Stacking Context)定义了元素在 Z 轴的绘制顺序——谁在上面,谁在下面。' },
      { type: 'paragraph', text: '层叠上下文是一个**独立的渲染单元**,内部的 z-index 只在该上下文内部比较,无法跨越边界。这类似于 BFC 在布局上的隔离,层叠上下文在 Z 轴上隔离。' },

      { type: 'heading', text: '什么会创建层叠上下文?' },
      { type: 'paragraph', text: 'CSS2.2 只有两种情况创建层叠上下文,CSS3 大幅扩展了这个列表:' },
      { type: 'code', lang: 'css', caption: 'CSS2.2 创建层叠上下文的条件', code: `/* 1. 根元素(<html>)自动创建根层叠上下文 */\n\n/* 2. z-index 不是 auto 的定位元素 */\n.positioned {\n  position: relative;  /* 或 absolute, fixed */\n  z-index: 1;          /* 任何整数(包括 0 和负数) */\n  /* 创建新的层叠上下文 */\n}\n\n/* 不创建层叠上下文的例子 */\n.no-context {\n  position: relative;\n  z-index: auto;  /* auto 不创建层叠上下文! */\n}` },
      { type: 'code', lang: 'css', caption: 'CSS3 新增的层叠上下文触发条件', code: `/* 3. opacity < 1 */\n.transparent {\n  opacity: 0.99;  /* 任何小于 1 的值 */\n}\n\n/* 4. transform 不是 none */\n.transformed {\n  transform: translateZ(0);  /* 常见的硬件加速 hack */\n}\n\n/* 5. filter 不是 none */\n.filtered {\n  filter: blur(5px);\n}\n\n/* 6. perspective 不是 none */\n.perspective {\n  perspective: 1000px;\n}\n\n/* 7. isolation: isolate */\n.isolated {\n  isolation: isolate;  /* 明确创建层叠上下文 */\n}\n\n/* 8. will-change 包含会创建层叠上下文的属性 */\n.will-change {\n  will-change: opacity, transform;\n}\n\n/* 9. contain: layout/paint */\n.contained {\n  contain: paint;\n}\n\n/* 10. Flex/Grid 项目且 z-index 不是 auto */\n.flex-item {\n  /* 父元素 display: flex */\n  z-index: 1;  /* 即使 position: static 也创建层叠上下文! */\n}` },
      { type: 'warning', text: '很多现代 CSS 属性都会**意外创建层叠上下文**,这是 `z-index` 不生效的常见原因。如果你发现 z-index 调整无效,检查元素或其祖先是否应用了 `transform`、`opacity`、`filter` 等属性。' },

      { type: 'heading', text: 'z-index 的工作原理' },
      { type: 'paragraph', text: '`z-index` 属性控制元素在**当前层叠上下文**中的层级。取值可以是整数(包括负数)或 `auto`:' },
      { type: 'list', items: [
        '**`auto`**(默认):元素的层级为 0,**不创建**新的层叠上下文',
        '**整数**(如 `-1`、`0`、`1`、`999`):元素的层级为该值,**创建**新的层叠上下文',
        '**数字越大越靠前**:z-index 大的元素覆盖 z-index 小的元素',
        '**只对定位元素有效**(CSS2.2 规则):position 必须是 `relative`、`absolute`、`fixed` 或 `sticky`',
        '**Flex/Grid 项目例外**:即使 `position: static`,z-index 也有效(CSS3 扩展)'
      ] },
      { type: 'example', title: 'z-index 的基本使用', lang: 'html', code: `<div style="position: relative;">\n  <div style="position: absolute; top: 20px; left: 20px; width: 100px; height: 100px; background: red; z-index: 1;">红色(z-index: 1)</div>\n  <div style="position: absolute; top: 40px; left: 40px; width: 100px; height: 100px; background: blue; z-index: 2;">蓝色(z-index: 2)</div>\n  <div style="position: absolute; top: 60px; left: 60px; width: 100px; height: 100px; background: green; z-index: 3;">绿色(z-index: 3)</div>\n</div>\n<!-- 绘制顺序:红 → 蓝 → 绿(绿色在最上面) -->`, explanation: '三个绝对定位元素重叠,z-index 决定了谁覆盖谁。`z-index: 3` 的绿色盒子在最上面,`z-index: 1` 的红色盒子在最下面。' },

      { type: 'heading', text: '层叠上下文的嵌套规则' },
      { type: 'paragraph', text: '这是理解 z-index 最关键的概念:**子元素的 z-index 只在父层叠上下文内部比较**。即使子元素的 z-index 很大(如 9999),也无法跳出父层叠上下文,覆盖父上下文之外的元素。' },
      { type: 'example', title: '层叠上下文的隔离', lang: 'html', code: `<div style="position: relative; z-index: 1; background: lightblue; padding: 20px;">\n  父A(z-index: 1)\n  <div style="position: relative; z-index: 9999; background: red; padding: 10px;">\n    子A(z-index: 9999)\n  </div>\n</div>\n\n<div style="position: relative; z-index: 2; background: lightgreen; padding: 20px; margin-top: -50px;">\n  父B(z-index: 2)\n  <div style="position: relative; z-index: -1; background: blue; padding: 10px;">\n    子B(z-index: -1)\n  </div>\n</div>\n\n<!-- 实际绘制顺序:\n     1. 父A 整体(包括子A)\n     2. 父B 整体(包括子B)\n     即使子A 的 z-index 是 9999,仍然在父B 下面!\n-->`, explanation: '父A 的 z-index 是 1,父B 是 2,所以**父B 整体覆盖父A 整体**。子A 虽然 z-index 是 9999,但只在父A 内部有效,无法跳出来覆盖父B。这就是层叠上下文的**封装性**。' },
      { type: 'warning', text: '这是 z-index 最常见的困惑来源:"为什么我的 z-index 调到 99999 还是被覆盖?"答案:因为你的元素在一个 z-index 较低的层叠上下文中。解决方案:调整**父层叠上下文**的 z-index,或者将元素移出该层叠上下文。' },

      { type: 'heading', text: '同一层叠上下文内的绘制顺序' },
      { type: 'paragraph', text: '在同一个层叠上下文中,元素按照以下顺序绘制(从后到前,越靠后越在上面):' },
      { type: 'list', ordered: true, items: [
        '**层叠上下文的背景和边框**(容器自身)',
        '**负 z-index 的子层叠上下文**(z-index < 0 的定位子元素)',
        '**块级盒子**(非定位、非浮动的块级后代,按 DOM 顺序)',
        '**浮动元素**(按 DOM 顺序)',
        '**行内盒子**(非定位的行内后代,按 DOM 顺序)',
        '**z-index: 0 或 auto 的定位后代**(按 DOM 顺序)',
        '**正 z-index 的子层叠上下文**(z-index > 0 的定位子元素,按 z-index 值从小到大)'
      ] },
      { type: 'tip', text: '记忆口诀:**背景 → 负层 → 块 → 浮 → 行 → 零层 → 正层**。同层级内按 DOM 顺序(后出现的覆盖先出现的)。这解释了为什么浮动元素会覆盖普通块级元素,为什么行内内容会覆盖浮动元素的背景。' },

      { type: 'heading', text: '`z-index: auto` vs `z-index: 0`' },
      { type: 'paragraph', text: '这两个值看起来相似,但有本质区别:' },
      { type: 'list', items: [
        '**`z-index: auto`**:层级为 0,**不创建**层叠上下文。子元素的 z-index 与外部元素在同一层叠上下文中比较',
        '**`z-index: 0`**:层级为 0,**创建**新的层叠上下文。子元素的 z-index 被封装在内部,无法与外部比较'
      ] },
      { type: 'example', title: 'auto vs 0 的区别', lang: 'html', code: `<!-- auto:不创建层叠上下文 -->\n<div style="position: relative; z-index: auto;">\n  <div style="position: relative; z-index: 10; background: red;">子元素(z-index: 10)</div>\n</div>\n<div style="position: relative; z-index: 5; background: blue; margin-top: -30px;">外部元素(z-index: 5)</div>\n<!-- 红色子元素(10)覆盖蓝色外部元素(5),因为它们在同一层叠上下文 -->\n\n<!-- 0:创建层叠上下文 -->\n<div style="position: relative; z-index: 0;">\n  <div style="position: relative; z-index: 10; background: red;">子元素(z-index: 10)</div>\n</div>\n<div style="position: relative; z-index: 5; background: blue; margin-top: -30px;">外部元素(z-index: 5)</div>\n<!-- 蓝色外部元素(5)覆盖红色子元素(10)!因为父元素创建了层叠上下文,子元素被封装 -->`, explanation: '`z-index: auto` 不创建隔离,子元素可以"逃出"父元素,与外部元素比较。`z-index: 0` 创建隔离,子元素被封装在父层叠上下文中。' },

      { type: 'heading', text: '调试 z-index 问题的步骤' },
      { type: 'list', ordered: true, items: [
        '**检查元素是否是定位元素**:position 必须不是 static(或者是 Flex/Grid 项目)',
        '**检查祖先是否创建了层叠上下文**:用开发者工具查看祖先的 opacity、transform、filter 等属性',
        '**找到共同的层叠上下文**:两个元素的 z-index 只有在同一层叠上下文中才能比较',
        '**调整正确的 z-index**:如果元素在不同的层叠上下文中,调整**父层叠上下文**的 z-index',
        '**使用 isolation: isolate**:明确创建层叠上下文,避免意外影响'
      ] },
      { type: 'tip', text: '浏览器开发者工具可以显示层叠上下文。Chrome DevTools 的 Layers 面板可以可视化所有层叠上下文和合成层(compositing layers)。' },

      { type: 'heading', text: '`isolation: isolate` —— 明确的层叠上下文' },
      { type: 'paragraph', text: '`isolation: isolate` 是 CSS3 引入的属性,唯一作用是**创建层叠上下文**。它比 `z-index: 0` 更语义化,不会引入额外的层级。' },
      { type: 'code', lang: 'css', caption: '用 isolation 隔离层叠', code: `.component {\n  isolation: isolate;  /* 明确创建层叠上下文,隔离内部 z-index */\n}\n\n/* 等价于 */\n.component-old {\n  position: relative;\n  z-index: 0;  /* 但会引入层级 0,可能影响绘制顺序 */\n}` },
      { type: 'tip', text: '**最佳实践**:如果只是想隔离组件内部的 z-index,用 `isolation: isolate`,而不是 `position: relative; z-index: 0`。前者语义更清晰,无副作用。' },

      { type: 'heading', text: '常见的层叠上下文陷阱' },
      { type: 'list', items: [
        '**陷阱 1:transform 意外创建层叠上下文**。症状:fixed 定位失效、z-index 不按预期工作。解决:将 transform 移到不会影响定位的元素上',
        '**陷阱 2:opacity < 1 创建层叠上下文**。症状:子元素的 z-index 无法跳出父元素。解决:将 opacity 应用到内部包装元素,而非容器',
        '**陷阱 3:Flex/Grid 项目的 z-index**。即使 position: static,z-index 也有效且创建层叠上下文。这是 CSS3 的扩展',
        '**陷阱 4:will-change 提前创建层叠上下文**。`will-change: opacity/transform` 会立即创建层叠上下文,即使动画还没开始'
      ] },

      { type: 'heading', text: '浮动元素的特殊绘制规则' },
      { type: 'paragraph', text: '浮动元素在绘制顺序上有特殊地位:它们在**非定位块级元素之后、行内内容之前**绘制。这就是为什么浮动元素的背景会覆盖普通块级元素,但文字会环绕浮动元素(文字在浮动之后绘制)。' },

      { type: 'heading', text: 'z-index 的最佳实践' },
      { type: 'list', items: [
        '**定义全局层级系统**:普通内容 0-99,下拉菜单 100-199,对话框 200-299,通知 300-399,调试工具 1000+',
        '**避免 z-index 竞赛**:不要为了覆盖而不断加大数字(9999 → 99999 → 999999)',
        '**尽量少用 z-index**:优先用 DOM 顺序控制层叠(后出现的在上面)',
        '**用 isolation 隔离组件**:避免组件内部的 z-index 泄漏到外部',
        '**文档化 z-index 使用**:在 CSS 注释中解释为什么需要这个 z-index 值'
      ] },
    ] as TutorialBlock[],
  },
  {
    id: 'inline-formatting',
    number: '8',
    title: { zh: '行内格式化详解', en: 'Inline formatting context details' },
    summary: { zh: '行内格式化上下文(IFC)中,盒子从包含块顶部开始水平排列。行盒(line box)的高度由 line-height 和 vertical-align 共同决定,足以包含所有盒子。', en: 'In an inline formatting context (IFC), boxes are arranged horizontally starting from the top of the containing block. The height of a line box is determined by line-height and vertical-align, sufficient to contain all boxes.' },
    keyPoints: [
      '行盒(line box):IFC 中每一行形成的矩形区域,从包含块的一边延伸到另一边',
      '行盒高度计算:由 line-height 属性和 vertical-align 属性决定,足以包含该行所有盒子',
      'line-height 指定行盒的最小高度,由基线之间的距离(对于非替换行内元素)或 content height + 上下半行距确定',
      'vertical-align 控制行内盒子在行盒中的垂直对齐:baseline(基线对齐)、top、bottom、middle、text-top、text-bottom、sub、super 或长度/百分比',
      '行内盒子宽度总和小于行盒宽度时,水平分布由 text-align 决定',
      '行内盒子宽度总和大于行盒宽度时,会拆分为多个行内盒子分布在多个行盒中',
      '原子行内级盒子(atomic inline-level box):inline-block、inline-table 及替换行内元素作为不可分割的整体参与 IFC,不能在内部断行',
      '空白符处理由 white-space 属性控制',
      '双向文本(bidirectional text)布局由 direction 和 unicode-bidi 属性控制',
      '不包含文本、保留空白、非零 margin/padding/border 的行内元素、流内内容,且不以保留换行符结尾的行盒视为零高度行盒,不影响其内部元素的定位',
    ],
    tutorial: [
      { type: 'heading', text: '行内格式化上下文:文本的世界' },
      { type: 'paragraph', text: '**行内格式化上下文**(IFC, Inline Formatting Context)是行内级盒子参与的布局环境。当块容器只包含行内级内容(文本、`<span>`、`<a>`、`<img>` 等)时,会创建 IFC。IFC 的布局规则与 BFC 截然不同——元素水平排列,自动换行,形成行盒。' },
      { type: 'paragraph', text: '理解 IFC 的关键概念是**行盒**(line box)——每一行文本形成的矩形区域。行盒是 IFC 中的基本单位,类似于 BFC 中的块盒子。' },

      { type: 'heading', text: '行盒(Line Box)的形成' },
      { type: 'paragraph', text: '行盒是 IFC 中自动生成的矩形区域,包含该行的所有行内盒子。行盒从包含块的左边缘延伸到右边缘(在 LTR 语言中),宽度由包含块决定。' },
      { type: 'list', items: [
        '**宽度**:行盒宽度 = 包含块的宽度(减去浮动元素占据的空间)',
        '**高度**:由 `line-height` 和 `vertical-align` 共同决定,足以包含该行所有盒子',
        '**换行**:当行内盒子的宽度总和超过行盒宽度时,会在合适的断点(空格、连字符等)换行,创建新的行盒',
        '**垂直排列**:多个行盒从包含块顶部开始,垂直堆叠,中间没有间隙(除非设置了 `line-height`)'
      ] },
      { type: 'example', title: '段落中的行盒', lang: 'html', code: `<p style="width: 300px; background: #eee; border: 1px solid #ccc;">\n  这是一段很长的文字,会自动换行。第一行从这里开始,一直到这里结束。第二行从这里开始,一直到这里结束。每一行都是一个独立的行盒。\n</p>\n<!-- 浏览器会自动将文本分成多个行盒:\n     行盒1:[这是一段很长的文字,会自动换行。第一]\n     行盒2:[行从这里开始,一直到这里结束。第二]\n     行盒3:[行从这里开始,一直到这里结束。每一]\n     行盒4:[行都是一个独立的行盒。]\n-->`, explanation: '每个行盒都是一个矩形,宽度等于段落宽度(300px),高度由字体大小和 `line-height` 决定。行盒之间紧密堆叠,形成段落的整体高度。' },

      { type: 'heading', text: 'line-height:行盒的最小高度' },
      { type: 'paragraph', text: '`line-height` 是行内格式化中最重要的属性,它定义了行盒的**最小高度**。理解 line-height 的关键:它不是"行间距",而是"基线之间的距离"。' },
      { type: 'code', lang: 'css', caption: 'line-height 的取值类型', code: `/* 1. 数字(推荐):相对于元素自身的 font-size */\n.text1 {\n  font-size: 16px;\n  line-height: 1.5;   /* 行高 = 16px × 1.5 = 24px */\n}\n\n/* 2. 长度:绝对值 */\n.text2 {\n  font-size: 16px;\n  line-height: 24px;  /* 行高 = 24px */\n}\n\n/* 3. 百分比:相对于元素自身的 font-size */\n.text3 {\n  font-size: 16px;\n  line-height: 150%;  /* 行高 = 16px × 150% = 24px */\n}\n\n/* 4. normal(默认):浏览器决定,通常是 1.2 左右 */\n.text4 {\n  line-height: normal;\n}` },
      { type: 'warning', text: '**数字 vs 百分比的区别**:`line-height: 1.5` 会被**继承为 1.5**,子元素基于自己的 font-size 计算。`line-height: 150%` 会先计算为具体像素值(如 24px),然后继承这个**计算后的值**,子元素不会重新计算。推荐使用数字,响应式更友好。' },

      { type: 'heading', text: 'line-height 的计算:半行距模型' },
      { type: 'paragraph', text: '对于非替换行内元素(如文本、`<span>`),line-height 的计算基于**半行距**(half-leading)模型:' },
      { type: 'list', ordered: true, items: [
        '**内容区域**(content area):由字体的 em-square 决定,通常接近 font-size',
        '**行距**(leading) = line-height - 内容区域高度',
        '**半行距**:行距的一半,分别添加到内容区域的上方和下方',
        '**行内盒子的高度** = 内容区域 + 上半行距 + 下半行距 = line-height'
      ] },
      { type: 'example', title: 'line-height 与行间距', lang: 'css', code: `p {\n  font-size: 16px;\n  line-height: 24px;\n  /* 内容区域高度 ≈ 16px\n     行距 = 24px - 16px = 8px\n     上半行距 = 4px,下半行距 = 4px\n     → 文字上下各有 4px 的"呼吸空间" */\n}`, explanation: '`line-height` 大于 `font-size` 时,文字周围会有额外的空间,让文本更易读。`line-height: 1.5` 或 `1.6` 是常见的可读性推荐值。' },

      { type: 'heading', text: 'vertical-align:行内盒子的垂直对齐' },
      { type: 'paragraph', text: '`vertical-align` 控制行内盒子在行盒中的垂直位置。注意:**它只对行内级元素和 table-cell 元素有效**,对块级元素无效。' },
      { type: 'code', lang: 'css', caption: 'vertical-align 的常用值', code: `/* 1. baseline(默认):元素基线与父元素基线对齐 */\n.baseline { vertical-align: baseline; }\n\n/* 2. top:元素顶部与行盒顶部对齐 */\n.top { vertical-align: top; }\n\n/* 3. bottom:元素底部与行盒底部对齐 */\n.bottom { vertical-align: bottom; }\n\n/* 4. middle:元素中点与父元素基线 + x-height/2 对齐(近似垂直居中) */\n.middle { vertical-align: middle; }\n\n/* 5. text-top:元素顶部与父元素字体顶部对齐 */\n.text-top { vertical-align: text-top; }\n\n/* 6. text-bottom:元素底部与父元素字体底部对齐 */\n.text-bottom { vertical-align: text-bottom; }\n\n/* 7. sub/super:下标/上标,相对基线偏移 */\n.sub { vertical-align: sub; }\n.super { vertical-align: super; }\n\n/* 8. 长度/百分比:相对基线偏移指定距离 */\n.offset { vertical-align: -2px; }      /* 向下偏移 2px */\n.percent { vertical-align: 50%; }      /* 向上偏移 line-height 的 50% */` },
      { type: 'example', title: '图文混排中的对齐问题', lang: 'html', code: `<!-- 常见问题:图片和文字底部不对齐 -->\n<div style="background: #eee;">\n  <img src="icon.png" style="width: 20px; height: 20px;"> 文字内容\n  <!-- 图片底部会比文字底部略低,因为基线不是文字底部 -->\n</div>\n\n<!-- 解决方案 1:vertical-align: middle -->\n<div style="background: #eee;">\n  <img src="icon.png" style="width: 20px; height: 20px; vertical-align: middle;"> 文字内容\n</div>\n\n<!-- 解决方案 2:vertical-align: text-bottom -->\n<div style="background: #eee;">\n  <img src="icon.png" style="width: 20px; height: 20px; vertical-align: text-bottom;"> 文字内容\n</div>\n\n<!-- 解决方案 3:display: block(让图片脱离 IFC) -->\n<div style="background: #eee;">\n  <img src="icon.png" style="display: block; width: 20px; height: 20px;">\n</div>`, explanation: '行内图片默认基线对齐,导致图片下方有一小段空隙(基线到文字底部的距离)。用 `vertical-align: middle/text-bottom` 或 `display: block` 可以消除这个空隙。' },

      { type: 'heading', text: '行盒高度的计算' },
      { type: 'paragraph', text: '行盒的高度**不是**简单地等于最高元素的高度,而是由以下因素共同决定:' },
      { type: 'list', ordered: true, items: [
        '计算每个行内盒子的高度(基于 `line-height` 和 `vertical-align`)',
        '找到最高点和最低点',
        '行盒高度 = 最高点 - 最低点'
      ] },
      { type: 'warning', text: '`vertical-align: top/bottom` 会影响行盒高度!如果一个大图片设置了 `vertical-align: top`,它会被推到行盒顶部,可能撑高整个行盒,导致其他文本下方出现巨大空隙。' },

      { type: 'heading', text: '原子行内级盒子' },
      { type: 'paragraph', text: '**原子行内级盒子**(atomic inline-level box)是不可分割的行内级盒子,作为一个整体参与 IFC。包括:' },
      { type: 'list', items: [
        '**替换元素**:`<img>`、`<input>`、`<video>` 等',
        '**`inline-block` 元素**:对外是行内级,对内是块容器',
        '**`inline-table` 元素**'
      ] },
      { type: 'paragraph', text: '原子行内级盒子的特点:**不能在内部断行**。即使内容很长,也会作为一个整体换到下一行,而不会在中间断开。' },
      { type: 'code', lang: 'html', caption: '原子行内级盒子不会断行', code: `<p style="width: 200px;">\n  这是文字 <span style="display: inline-block; width: 150px; background: lightblue;">这是一个很宽的 inline-block 元素</span> 更多文字\n</p>\n<!-- inline-block 元素太宽,放不下,会整个换到下一行,不会在中间断开 -->` },

      { type: 'heading', text: 'text-align:行内内容的水平对齐' },
      { type: 'paragraph', text: '`text-align` 控制行内内容在行盒中的水平分布(当行内盒子总宽度 < 行盒宽度时)。' },
      { type: 'code', lang: 'css', caption: 'text-align 的常用值', code: `.left    { text-align: left; }      /* 左对齐(LTR 默认) */\n.right   { text-align: right; }     /* 右对齐 */\n.center  { text-align: center; }    /* 居中 */\n.justify { text-align: justify; }   /* 两端对齐(调整词间距) */\n.start   { text-align: start; }     /* 逻辑起点(LTR=left, RTL=right) */\n.end     { text-align: end; }       /* 逻辑终点(LTR=right, RTL=left) */` },
      { type: 'tip', text: '`text-align: center` 可以让 `inline-block` 元素居中(它们是行内级盒子)。这是实现块级元素水平居中的一种技巧(虽然 `margin: auto` 更常见)。' },

      { type: 'heading', text: '空白符处理:white-space 属性' },
      { type: 'paragraph', text: '`white-space` 控制如何处理元素中的空白符(空格、换行、制表符)和是否允许自动换行。' },
      { type: 'code', lang: 'css', caption: 'white-space 的五个值', code: `/* normal(默认):折叠空白,允许换行 */\n.normal { white-space: normal; }\n\n/* nowrap:折叠空白,不允许换行 */\n.nowrap { white-space: nowrap; }\n\n/* pre:保留空白,不允许自动换行(只在换行符处换行) */\n.pre { white-space: pre; }\n\n/* pre-wrap:保留空白,允许换行 */\n.pre-wrap { white-space: pre-wrap; }\n\n/* pre-line:折叠空白(但保留换行符),允许换行 */\n.pre-line { white-space: pre-line; }` },
      { type: 'example', title: '文本截断的经典技巧', lang: 'css', code: `.truncate {\n  white-space: nowrap;      /* 不换行 */\n  overflow: hidden;         /* 隐藏溢出 */\n  text-overflow: ellipsis;  /* 显示省略号 */\n  /* 单行文本溢出显示 "..." */\n}`, explanation: '这是实现单行文本截断的标准方法。`white-space: nowrap` 强制文本在一行显示,`overflow: hidden` 裁剪溢出部分,`text-overflow: ellipsis` 在末尾显示省略号。' },

      { type: 'heading', text: '行内盒子的 margin 和 padding' },
      { type: 'paragraph', text: '行内盒子的 margin 和 padding 行为与块级盒子不同:' },
      { type: 'list', items: [
        '**水平方向**(左右):margin 和 padding **正常生效**,会影响行内盒子的宽度和位置',
        '**垂直方向**(上下):margin **不影响布局**(不撑开行高),padding 会绘制出来(背景可见)但**不撑开行高**'
      ] },
      { type: 'example', title: '行内元素的垂直 padding 陷阱', lang: 'html', code: `<p style="background: #eee; line-height: 1.5;">\n  这是一段文字 <span style="background: lightblue; padding: 20px 10px;">带有 padding 的 span</span> 更多文字\n</p>\n<!-- span 的垂直 padding(20px)会绘制出来(浅蓝色背景扩展),\n     但不会撑开行高,可能覆盖上下行的内容 -->`, explanation: '行内元素的垂直 padding/border 是"视觉效果",不参与行高计算。如果需要撑开行高,用 `line-height` 或改用 `inline-block`。' },

      { type: 'heading', text: '零高度行盒' },
      { type: 'paragraph', text: 'CSS 规范定义:如果行盒不包含文本、保留空白、非零 margin/padding/border 的行内元素或其他流内内容,且不以保留换行符结尾,该行盒被视为**零高度行盒**。' },
      { type: 'paragraph', text: '零高度行盒在布局计算中被忽略,不影响其内部元素的定位。这解释了为什么空的 `<div>` 默认高度为 0,以及为什么单独的 `<br>` 会创建换行但没有高度。' },

      { type: 'heading', text: 'IFC 的常见问题与解决方案' },
      { type: 'list', items: [
        '**问题 1:图片底部空隙**。原因:基线对齐。解决:`vertical-align: middle/top` 或 `display: block`',
        '**问题 2:inline-block 元素之间的间隙**。原因:HTML 中的空白符。解决:父元素 `font-size: 0` 或 HTML 不换行',
        '**问题 3:行内元素高度无法控制**。原因:height 对行内元素无效。解决:用 `line-height` 或改用 `inline-block`',
        '**问题 4:垂直居中困难**。解决:`vertical-align: middle`(近似)或改用 Flexbox(`align-items: center`)',
        '**问题 5:文本溢出**。解决:`overflow: hidden` + `text-overflow: ellipsis` + `white-space: nowrap`'
      ] },

      { type: 'heading', text: 'IFC vs Flexbox' },
      { type: 'paragraph', text: 'IFC 是为文本排版设计的,不是布局工具。对于需要精确控制的行内布局(导航栏、按钮组、图标对齐),**Flexbox 是更好的选择**:' },
      { type: 'list', items: [
        '**用 IFC**:段落文本、文章内容、富文本编辑器',
        '**用 Flexbox**:导航栏、工具栏、卡片、表单布局、任何需要精确对齐的场景'
      ] },
      { type: 'tip', text: 'Flexbox 的 `align-items: center` 比 `vertical-align: middle` 更可靠。Flexbox 的 `gap` 比手动调整 `margin` 更简洁。现代 CSS 布局优先选择 Flexbox/Grid,把 IFC 留给它真正擅长的文本排版。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {
  'display-prop': 'display',
  'block-formatting': 'normal-flow',
  'inline-formatting': 'inline-formatting',
  'floats': 'floats',
  'float-position': 'floats',
  'flow-control': 'floats',
  'absolute-positioning': 'absolute-positioning',
  'fixed-positioning': 'absolute-positioning',
  'choose-position': 'positioning-schemes',
  'positioning-scheme': 'positioning-schemes',
  'dis-pos-flo': 'display',
  'comparison': 'positioning-schemes',
  'normal-flow': 'normal-flow',
  'block-level': 'normal-flow',
  'inline-level': 'inline-formatting',
  'direction': 'inline-formatting',
  'layers': 'stacking-context',
  'propdef-z-index': 'stacking-context',
  'x43': 'stacking-context',
};

// ============================================================
// 属性定义(CSS2.2 Ch9 Visual Formatting Model)
// ============================================================

const VIS = 'https://www.w3.org/TR/CSS22/visuren.html';
const DISPLAY3 = 'https://www.w3.org/TR/css-display-3/';
const POSITION3 = 'https://www.w3.org/TR/css-position-3/';

export const propertyTerms: Record<string, PropertyEntry> = {
  // ── display ──
  'display': {
    zh: '显示类型',
    value: 'inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | none | inherit',
    initial: 'inline',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '见下文',
    css2Url: `${VIS}#propdef-display`,
    css3Url: `${DISPLAY3}#propdef-display`,
    sectionRef: 'visual-formatting#display',
  },

  // ── position ──
  'position': {
    zh: '定位方案',
    value: 'static | relative | absolute | fixed | inherit',
    initial: 'static',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-position`,
    css3Url: `${POSITION3}#propdef-position`,
    sectionRef: 'visual-formatting#positioning-schemes',
  },

  // ── top / right / bottom / left ──
  'top': {
    zh: '顶部偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的高度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-top`,
    css3Url: `${POSITION3}#propdef-top`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },
  'right': {
    zh: '右侧偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-right`,
    css3Url: `${POSITION3}#propdef-right`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },
  'bottom': {
    zh: '底部偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的高度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-bottom`,
    css3Url: `${POSITION3}#propdef-bottom`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },
  'left': {
    zh: '左侧偏移',
    value: '<length> | <percentage> | auto | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '对于相对定位元素,见下文;对于 static 元素,为 auto;对于其他元素,如果指定为长度则为绝对长度,如果指定为百分比则为指定值,否则为 auto',
    css2Url: `${VIS}#propdef-left`,
    css3Url: `${POSITION3}#propdef-left`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },

  // ── float ──
  'float': {
    zh: '浮动',
    value: 'left | right | none | inherit',
    initial: 'none',
    appliesTo: '所有元素(但某些元素的计算值可能为 none)',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-float`,
    css3Url: 'https://www.w3.org/TR/css-page-floats-3/#propdef-float',
    sectionRef: 'visual-formatting#floats',
  },

  // ── clear ──
  'clear': {
    zh: '清除浮动',
    value: 'none | left | right | both | inherit',
    initial: 'none',
    appliesTo: '块级元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-clear`,
    css3Url: 'https://www.w3.org/TR/css-page-floats-3/#propdef-clear',
    sectionRef: 'visual-formatting#floats',
  },

  // ── z-index ──
  'z-index': {
    zh: '层叠层级',
    value: 'auto | <integer> | inherit',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: `${VIS}#propdef-z-index`,
    css3Url: `${POSITION3}#propdef-z-index`,
    sectionRef: 'visual-formatting#stacking-context',
  },

  // ── vertical-align ──
  'vertical-align': {
    zh: '垂直对齐',
    value: 'baseline | sub | super | top | text-top | middle | bottom | text-bottom | <percentage> | <length> | inherit',
    initial: 'baseline',
    appliesTo: '行内级元素和 table-cell 元素',
    inherited: false,
    percentages: "相对于元素自身的 line-height",
    computedValue: '对于百分比和长度值,为绝对长度;否则为指定值',
    css2Url: `${VIS}#propdef-vertical-align`,
    css3Url: 'https://www.w3.org/TR/css-inline-3/#propdef-vertical-align',
    sectionRef: 'visual-formatting#inline-formatting',
  },

  // ── inset (CSS3 shorthand) ──
  'inset': {
    zh: '内缩简写',
    value: '<\'top\'>{1,4}',
    initial: 'auto',
    appliesTo: '定位元素(position 非 static)',
    inherited: false,
    percentages: '相对于包含块对应方向的尺寸',
    computedValue: '各子属性的计算值',
    css2Url: `${VIS}#propdef-top`,
    css3Url: `${POSITION3}#propdef-inset`,
    sectionRef: 'visual-formatting#absolute-positioning',
  },

  // ── line-height ──
  'line-height': {
    zh: '行高',
    value: 'normal | <number> | <length> | <percentage> | inherit',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于元素自身的 font-size',
    computedValue: '对于长度和百分比值,为绝对长度;否则为指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-line-height',
    css3Url: 'https://www.w3.org/TR/css-inline-3/#propdef-line-height',
    sectionRef: 'visual-formatting#inline-formatting',
  },
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'visual formatting model': {
    zh: '视觉格式化模型',
    description:
      'CSS 如何将文档树转换为视觉呈现的规则集合,包括盒子生成、定位方案、格式化上下文等概念。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html',
  },
  'containing block': {
    zh: '包含块',
    description:
      '元素盒子定位和尺寸计算的参照物。对于 static/relative 定位,是最近的块容器祖先的 content box;对于 absolute 定位,是最近的 positioned 祖先的 padding box;对于 fixed 定位,是视口。',
    sectionRef: 'visual-formatting#absolute-positioning',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#containing-block-details',
  },
  'block formatting context': {
    zh: '块格式化上下文(BFC)',
    description:
      '块级盒子参与的布局环境。在 BFC 中,盒子从包含块顶部开始垂直排列,相邻 margin 会折叠。BFC 是独立的渲染区域,内部布局不影响外部。根元素、float、绝对定位、inline-block、overflow 非 visible 等会创建新的 BFC。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-formatting',
    specUrl: 'https://www.w3.org/TR/css-display-3/#block-formatting-context',
  },
  'inline formatting context': {
    zh: '行内格式化上下文(IFC)',
    description:
      '行内级盒子参与的布局环境。在 IFC 中,盒子从包含块顶部开始水平排列,形成行盒(line box)。行盒的高度由 line-height 和 vertical-align 决定,宽度为包含块的宽度。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-formatting',
    specUrl: 'https://www.w3.org/TR/css-display-3/#inline-formatting-context',
  },
  'normal flow': {
    zh: '常规流',
    description:
      '不进行浮动或绝对定位的默认布局方式。常规流包括块级盒子的块格式化、行内级盒子的行内格式化以及相对定位。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#normal-flow',
  },
  'float': {
    zh: '浮动',
    description:
      '浮动盒子通过 float 属性从常规流中取出,向左或向右移动直到碰到包含块边缘或另一个浮动盒子。浮动元素不在常规流中,但会影响行盒布局(行盒会缩短为浮动腾出空间)。',
    sectionRef: 'visual-formatting#floats',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#floats',
  },
  'block-level element': {
    zh: '块级元素',
    description:
      'display 计算值为 block、list-item 或 table 的元素,生成块级盒子(block-level box)。块级盒子参与块格式化上下文(BFC)。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-boxes',
  },
  'inline-level element': {
    zh: '行内级元素',
    description:
      'display 计算值为 inline、inline-block 或 inline-table 的元素,生成行内级盒子(inline-level box)。行内级盒子参与行内格式化上下文(IFC)。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-boxes',
  },
  'block container box': {
    zh: '块容器盒子',
    description:
      '只包含块级盒子或只包含行内级盒子(并建立 IFC)的盒子。块容器盒子要么建立 BFC(用于其块级子元素),要么建立 IFC(用于其行内级子元素)。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-boxes',
  },
  'block box': {
    zh: '块盒子',
    description:
      '既是块级盒子又是块容器盒子的盒子。display: block 的非替换元素会生成块盒子。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#block-boxes',
  },
  'inline box': {
    zh: '行内盒子',
    description:
      '既是行内级盒子又参与其包含 IFC 的盒子。display: inline 的非替换元素会生成行内盒子。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-boxes',
  },
  'line box': {
    zh: '行盒',
    description:
      '行内格式化上下文中,每一行形成的矩形区域。行盒从包含块的一边延伸到另一边,高度由 line-height 和 vertical-align 共同决定,足以包含该行的所有行内盒子。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-formatting',
  },
  'stacking context': {
    zh: '层叠上下文',
    description:
      '三维渲染概念,定义了元素在 Z 轴的绘制顺序。根元素建立根层叠上下文;z-index 非 auto 的定位元素建立局部层叠上下文。CSS3 中,opacity < 1、transform、filter 等也会建立层叠上下文。子元素的 z-index 只在父层叠上下文内比较。',
    sectionRef: 'visual-formatting#stacking-context',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#z-index',
    specUrl: 'https://www.w3.org/TR/css-position-3/#stacking-context',
  },
  'positioned element': {
    zh: '定位元素',
    description:
      'position 计算值不是 static 的元素。包括 relative(相对定位)、absolute(绝对定位)、fixed(固定定位)和 sticky(粘性定位,CSS3)。',
    sectionRef: 'visual-formatting#positioning-schemes',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#positioned-element',
  },
  'replaced element': {
    zh: '替换元素',
    description:
      '内容不由 CSS 格式化模型控制的元素,如 img、input、textarea、select、object 等。替换元素有固有尺寸(intrinsic dimensions),如图片的原始宽高。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#replaced-element',
  },
  'block-start': {
    zh: '块起始方向',
    description: '逻辑方向,在水平书写模式下等于 top。代替物理方向 top/bottom,支持不同书写模式。',
    sectionRef: 'visual-formatting#block-formatting',
  },
  'block-end': {
    zh: '块结束方向',
    description: '逻辑方向,在水平书写模式下等于 bottom。与 block-start 相对。',
    sectionRef: 'visual-formatting#block-formatting',
  },
  'inline-start': {
    zh: '行内起始方向',
    description: '逻辑方向,在 LTR 水平书写模式下等于 left。文本流开始的一侧。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'inline-end': {
    zh: '行内结束方向',
    description: '逻辑方向,在 LTR 水平书写模式下等于 right。文本流结束的一侧。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'inline': {
    zh: '行内方向',
    description: '与文本书写方向平行的轴。在水平书写模式中是水平方向。逻辑属性中用于替代 left/right。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'block-level': {
    zh: '块级',
    description: '参与块级格式化上下文的元素或框。block-level element 的简称,由 display 值为 block、list-item、table 等产生。',
    sectionRef: 'visual-formatting#block-formatting',
  },
  'inline-level': {
    zh: '行内级',
    description: '参与行内格式化上下文的元素或框。inline-level element 的简称,由 display 值为 inline、inline-block、inline-table 等产生。',
    sectionRef: 'visual-formatting#inline-formatting',
  },
  'static-position rectangle': {
    zh: '静态位置矩形',
    description: 'position: static 时元素在正常流中本应占据的位置矩形。用于确定 absolute 定位元素在未指定偏移时的默认位置。',
    sectionRef: 'visual-formatting#positioning',
  },
  'inset': {
    zh: '内缩',
    description: '定位属性的简写(top/right/bottom/left),也指 CSS Shapes 中的 inset() 函数。在逻辑属性中表示内缩偏移。',
    sectionRef: 'visual-formatting#positioning',
  },
  'anonymous box': {
    zh: '匿名盒子',
    description:
      '没有对应元素的盒子,由格式化模型在需要时自动生成。分为匿名块盒子和匿名行内盒子。匿名盒子继承包含它的非匿名盒子的可继承属性,不可继承属性取初始值。百分比值解析时跳过匿名盒子,参照最近的非匿名祖先。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#anonymous-block-level',
    specUrl: 'https://www.w3.org/TR/css-display-3/#anonymous',
  },
  'flow-root': {
    zh: '流根',
    description:
      'display: flow-root 使元素生成块级盒子并建立新的块格式化上下文(BFC)。这是 CSS3 引入的最直接的 BFC 触发方式,无需借助 overflow: hidden 等副作用属性。',
    sectionRef: 'visual-formatting#display',
    specUrl: 'https://www.w3.org/TR/css-display-3/#valdef-display-flow-root',
  },
  'display:contents': {
    zh: '内容显示',
    description:
      'display: contents 使元素本身不生成任何盒子,但其子元素和伪元素仍正常生成盒子。效果类似于将子节点直接提升到父级位置。对替换元素(img、input 等)计算为 display: none。',
    sectionRef: 'visual-formatting#display',
    specUrl: 'https://www.w3.org/TR/css-display-3/#valdef-display-contents',
  },
  'sticky positioning': {
    zh: '粘性定位',
    description:
      'position: sticky 的定位方案。元素在常规流中布局,但当用户滚动时,其位置自动调整以保持在最近滚动容器的可视区域(scrollport)内,约束范围不超出其包含块。inset 属性(top/bottom/left/right)指定触发粘性行为的阈值。',
    sectionRef: 'visual-formatting#positioning-schemes',
    specUrl: 'https://www.w3.org/TR/css-position-3/#sticky-position',
  },
  'viewport': {
    zh: '视口',
    description:
      '用户代理提供的可视区域(窗口或屏幕上的其他查看区域)。连续媒体中每个画布最多一个视口。当视口小于画布时应提供滚动机制。视口尺寸变化时用户代理可能重新布局文档。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#viewport',
  },
  'canvas': {
    zh: '画布',
    description:
      '文档渲染的无限表面。文档在画布上呈现后,通过视口(viewport)展示给用户。一个画布最多对应一个视口,但用户代理可渲染到多个画布。',
    sectionRef: 'visual-formatting#intro',
    css2Url: 'https://www.w3.org/TR/CSS22/intro.html#canvas',
  },
  'run-in': {
    zh: '游离盒子',
    description:
      'display: run-in 生成的盒子。如果后面紧跟一个不建立新 BFC 的块盒子,游离盒子会合并到该块盒子的开头作为行内内容。否则生成匿名块盒子包裹自身和后续行内内容。CSS 2.2 将 run-in 推迟到 CSS3 定义。',
    sectionRef: 'visual-formatting#display',
    specUrl: 'https://www.w3.org/TR/css-display-3/#valdef-display-run-in',
  },
  'margin collapsing': {
    zh: '外边距折叠',
    description:
      '在块格式化上下文中,相邻块级盒子的垂直外边距(margin)会合并为一个外边距,取两者中的较大值(负值时取绝对值较大者)。浮动盒子、绝对定位盒子、inline-block 元素的 margin 不会与相邻元素折叠。建立 BFC 的元素不会与其子元素发生 margin 折叠。',
    sectionRef: 'visual-formatting#normal-flow',
    css2Url: 'https://www.w3.org/TR/CSS22/box.html#collapsing-margins',
  },
  'atomic inline-level box': {
    zh: '原子行内级盒子',
    description:
      '不可分割的行内级盒子,作为单个不透明整体参与行内格式化上下文。包括替换行内元素(如 img)、inline-block 和 inline-table 元素。与行内盒子(inline box)不同,原子行内级盒子不能跨行拆分。',
    sectionRef: 'visual-formatting#inline-formatting',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#inline-boxes',
    specUrl: 'https://www.w3.org/TR/css-display-3/#atomic-inline',
  },
};
