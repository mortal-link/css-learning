import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'containing-block',
    number: '1',
    title: { zh: '包含块', en: 'Containing Block Definition' },
    summary: { zh: '包含块是 CSS 布局中的核心概念，它决定了元素的尺寸和位置的计算基准。', en: 'The containing block is a core concept in CSS layout, determining the reference frame for calculating element dimensions and positions.' },
    keyPoints: [
      '包含块的确定规则取决于元素的定位方式',
      'static/relative 定位：最近块级祖先的内容边界',
      'absolute 定位：最近非 static 祖先的内边距边界',
      'fixed 定位：视口或页面区域',
      '包含块决定百分比宽高和偏移属性的计算基准',
      '初始包含块(initial containing block)与视口尺寸相同，锚定在画布原点',
      'transform、filter、will-change 等属性会为后代创建新的包含块',
      '行内祖先作为包含块时，由其首尾行内盒的内边距边界围成的矩形决定',
      '若绝对定位元素找不到非 static 祖先，则回退到初始包含块',
    ],
    specId: 'containing-block-details',
    tutorial: [
      { type: 'heading', text: '什么是包含块?' },
      { type: 'paragraph', text: '包含块(containing block)是 CSS 布局的**参照系**——就像物理学中的坐标原点。当你给元素设置 `width: 50%` 或 `top: 10px` 时,这些值相对于谁计算?答案就是**包含块**。理解包含块是理解 CSS 定位和尺寸计算的第一步。' },
      { type: 'paragraph', text: '包含块不是一个实际存在的元素,而是一个**矩形区域**,由某个祖先元素的盒子定义。关键问题是:**哪个祖先?用它的哪个区域?**答案取决于元素的 `position` 属性。' },

      { type: 'heading', text: '包含块的确定规则' },
      { type: 'code', lang: 'css', caption: '不同定位方式的包含块', code: `/* 1. static 和 relative:最近块级容器的内容区域 */\n.parent {\n  width: 600px;\n  padding: 20px;  /* padding 不算在包含块内 */\n}\n.child {\n  position: relative;\n  width: 50%;  /* 50% × 600px = 300px */\n}\n\n/* 2. absolute:最近定位祖先的 padding box */\n.positioned-parent {\n  position: relative;\n  width: 600px;\n  padding: 20px;  /* padding 算在包含块内! */\n}\n.abs-child {\n  position: absolute;\n  width: 50%;  /* 50% × (600px + 20px×2) = 320px */\n}\n\n/* 3. fixed:视口(viewport) */\n.fixed {\n  position: fixed;\n  width: 50vw;  /* 视口宽度的 50% */\n  top: 0;       /* 相对于视口顶部 */\n}` },
      { type: 'example', title: 'static/relative 元素的包含块', lang: 'html', code: `<div style="width: 400px; padding: 50px; border: 10px solid;">\n  <div style="width: 50%; background: lightblue;">\n    我的宽度是 200px\n    <!-- 50% × 400px(父元素的 content-box 宽度) -->\n    <!-- padding 和 border 不参与计算 -->\n  </div>\n</div>`, explanation: 'Static 和 relative 定位的元素,包含块是**最近块级祖先的内容区域**(content box)。这里父元素的 content-box 是 400px,所以子元素 `width: 50%` 计算为 200px。父元素的 padding 和 border 不影响包含块尺寸。' },
      { type: 'example', title: 'absolute 元素的包含块', lang: 'html', code: `<div style="position: relative; width: 400px; padding: 50px; border: 10px solid;">\n  <div style="position: absolute; width: 50%; background: lightcoral;">\n    我的宽度是 250px\n    <!-- 50% × (400px + 50px×2) = 250px -->\n    <!-- absolute 的包含块包括 padding! -->\n  </div>\n</div>`, explanation: 'Absolute 定位的元素,包含块是**最近定位祖先的 padding box**(包括 padding,但不包括 border)。这里父元素的 padding-box 是 400px + 50px×2 = 500px,所以子元素 `width: 50%` 计算为 250px。' },
      { type: 'warning', text: '注意 static/relative 和 absolute 的包含块**边界不同**:前者用 content-box(不含 padding),后者用 padding-box(含 padding)。这是 CSS 中最容易混淆的点之一。' },

      { type: 'heading', text: '什么是"定位祖先"?' },
      { type: 'paragraph', text: 'Absolute 定位元素寻找的是**最近的定位祖先**,即 `position` 不是 `static` 的祖先(`relative`、`absolute`、`fixed`、`sticky` 都算)。如果找不到,就回退到**初始包含块**(通常是视口大小的矩形,锚定在画布原点)。' },
      { type: 'code', lang: 'html', caption: '找不到定位祖先时回退到初始包含块', code: `<body>\n  <div>  <!-- position: static,不算定位祖先 -->\n    <div>  <!-- position: static,不算定位祖先 -->\n      <div style="position: absolute; top: 0; left: 0;">\n        我相对于视口定位,因为没有定位祖先\n        <!-- 包含块 = 初始包含块(视口大小) -->\n      </div>\n    </div>\n  </div>\n</body>` },
      { type: 'tip', text: '实践中常用技巧:**在父元素上设置 `position: relative`**(无偏移),让子元素的 `position: absolute` 相对于它定位。这是"相对定位容器 + 绝对定位子元素"的经典模式。' },

      { type: 'heading', text: 'Fixed 定位的包含块' },
      { type: 'paragraph', text: '`position: fixed` 的元素默认相对于**视口**(viewport)定位,包含块就是视口的矩形区域。但有一个重要例外:**如果祖先元素有 `transform`、`filter`、`perspective` 或某些 `will-change` 值,该祖先会成为 fixed 元素的包含块**。' },
      { type: 'example', title: 'transform 属性改变 fixed 元素的包含块', lang: 'html', code: `<div style="transform: translateZ(0); width: 400px; height: 300px; overflow: auto;">\n  <div style="position: fixed; top: 0; right: 0;">\n    我不是固定在视口右上角,而是固定在父元素右上角!\n    <!-- 因为父元素有 transform 属性 -->\n  </div>\n  <div style="height: 1000px;">长内容...</div>\n</div>`, explanation: '当父元素有 `transform` 属性(即使是 `translateZ(0)` 这样的"无操作"变换),`position: fixed` 的子元素不再相对于视口,而是相对于该父元素定位。这是创建"固定在容器内"效果的方式,但也可能是意外 bug 的来源。' },
      { type: 'warning', text: 'Transform、filter、perspective、will-change(这些值)等属性会**劫持** fixed 定位的包含块。如果你发现 `position: fixed` 元素没有固定在视口上,检查祖先是否有这些属性。' },

      { type: 'heading', text: '行内祖先的包含块' },
      { type: 'paragraph', text: '当绝对定位元素的包含块是一个**行内元素**时,规则更复杂:包含块是该行内元素生成的**所有行内盒的首尾行盒的 padding edge 围成的矩形**。如果行内元素跨多行,包含块会是一个"怪异"的矩形。' },
      { type: 'code', lang: 'html', caption: '行内祖先的包含块', code: `<p>\n  一段文字\n  <span style="position: relative; padding: 10px;">\n    这是一个很长的行内元素,\n    可能会换行到下一行,\n    <strong style="position: absolute; top: 0; left: 0;">我</strong>\n    继续文本...\n  </span>\n  更多文字。\n</p>\n<!-- <strong> 的包含块是 <span> 所有行盒的首尾 padding edge 围成的矩形 -->\n<!-- 如果 <span> 跨了 3 行,包含块就是第 1 行起点到第 3 行终点的矩形 -->` },
      { type: 'tip', text: '实践中很少遇到行内元素作为包含块的情况,因为人们通常用块级元素做定位参照。但理解这个规则有助于理解某些"诡异"的定位行为。' },

      { type: 'heading', text: '初始包含块' },
      { type: 'paragraph', text: '**初始包含块**(initial containing block)是根元素(`<html>`)的包含块。对于连续媒体(如屏幕),初始包含块的尺寸等于视口,方向属性与根元素相同。对于分页媒体(如打印),初始包含块是页面区域。' },
      { type: 'list', items: [
        '尺寸:在屏幕上通常等于浏览器视口的尺寸',
        '位置:锚定在画布的原点(0, 0)',
        '作用:作为根元素和"孤儿"绝对定位元素(找不到定位祖先)的包含块'
      ] },

      { type: 'heading', text: '包含块决定什么?' },
      { type: 'paragraph', text: '包含块是以下属性的计算基准:' },
      { type: 'list', items: [
        '**百分比尺寸**:`width: 50%`、`height: 80%`、`padding: 5%`、`margin: 10%` 等',
        '**定位偏移**:`top`、`right`、`bottom`、`left` 的百分比值',
        '**内在尺寸关键字**:某些情况下影响 `min-content`、`max-content` 的计算',
        '**对齐属性**:某些对齐属性的百分比值'
      ] },
      { type: 'tip', text: '记住这个核心原则:**元素的尺寸和位置计算,几乎总是相对于它的包含块**。理解了包含块,就理解了 CSS 布局的坐标系统。' },

      { type: 'heading', text: '常见陷阱:百分比高度不生效' },
      { type: 'example', title: '为什么 height: 100% 不生效?', lang: 'css', code: `.parent {\n  /* height: auto → 高度由内容决定 */\n}\n\n.child {\n  height: 100%;  /* ❌ 不生效!为什么? */\n  /* 因为包含块(父元素)的高度是 auto(不确定),\n     百分比相对于"不确定"无法计算,被视为 auto */\n}\n\n/* 解决方案 1:给父元素明确高度 */\n.parent {\n  height: 500px;  /* 或 100vh */\n}\n\n/* 解决方案 2:用 flexbox */\n.parent {\n  display: flex;\n  flex-direction: column;\n}\n.child {\n  flex: 1;  /* 不用百分比,用 flex 扩展 */\n}`, explanation: '百分比高度的经典陷阱:**如果包含块的高度是 `auto`(由内容决定),子元素的百分比高度会失效**,被视为 `auto`。这形成了"鸡生蛋"的循环:父高度依赖子内容,子高度依赖父高度。解决方案是给包含块一个明确的高度,或者用 flexbox/grid 等现代布局。' },
    ] as TutorialBlock[],
  },
  {
    id: 'width-calculation',
    number: '2',
    title: { zh: '宽度计算', en: 'Width Calculation' },
    summary: { zh: 'CSS 中元素的宽度计算规则因元素类型和定位方式而异，理解这些规则对于精确控制布局至关重要。', en: 'Width calculation rules in CSS vary by element type and positioning method, and understanding these rules is crucial for precise layout control.' },
    keyPoints: [
      '行内非替换元素的 width 属性不适用',
      '块级元素的水平尺寸必须满足包含块宽度等式',
      'auto width 会填充可用空间',
      'margin: auto 可实现水平居中',
      'min-width/max-width 约束最终宽度',
      'CSS3 内在尺寸：min-content, max-content, fit-content',
      '浮动和 inline-block 元素 auto 宽度使用 shrink-to-fit 算法：min(max(首选最小宽度, 可用宽度), 首选宽度)',
      '替换元素宽度优先使用固有宽度，可通过固有比例从高度推导',
      '绝对定位元素的宽度约束：left + margin + border + padding + width + padding + border + margin + right = 包含块宽度',
      '过度约束(over-constrained)时，LTR 下忽略 margin-right，RTL 下忽略 margin-left',
    ],
    specId: 'Computing_widths_and_margins',
    tutorial: [
      { type: 'heading', text: '块级元素的水平尺寸方程' },
      { type: 'paragraph', text: 'CSS 规定:块级非替换元素在常规流(normal flow)中的水平尺寸必须**精确等于包含块的宽度**。这产生了一个著名的"宽度方程":' },
      { type: 'code', lang: 'text', code: `margin-left + border-left + padding-left + width + padding-right + border-right + margin-right = 包含块宽度` },
      { type: 'paragraph', text: '如果这 7 个值的总和不等于包含块宽度,浏览器会**自动调整**某些值来满足等式。哪些值会被调整?规则如下:' },
      { type: 'list', items: [
        '如果 `width` 是 `auto`,它会被计算为满足等式所需的值(吸收剩余空间)',
        '如果 `margin-left` 或 `margin-right` 是 `auto`,它们会被计算为均分剩余空间',
        '如果没有 `auto` 值(过度约束),在 LTR 布局中强制 `margin-right` 为 `auto`'
      ] },

      { type: 'heading', text: '`width: auto` — 块级元素的默认行为' },
      { type: 'example', title: '块级元素默认填充包含块', lang: 'css', code: `/* 包含块宽度: 800px */\n.container {\n  width: 800px;\n  padding: 20px;\n}\n\n.block {\n  /* width: auto (默认) */\n  padding: 10px;\n  border: 5px solid;\n  margin: 20px;\n  \n  /* 计算过程:\n     包含块宽度 = 800px\n     margin + border + padding = 20+20 + 5+5 + 10+10 = 70px\n     width = 800px - 70px = 730px (自动计算)\n     → 元素总宽度(包括 margin)正好是 800px\n  */\n}`, explanation: '`width: auto` 是块级元素的默认值,它让元素的 `width` **自动计算**以填满包含块。计算时会扣除 margin、border、padding 的宽度。这就是为什么块级 `<div>` 默认会"占满一行"。' },
      { type: 'tip', text: '`width: 100%` 和 `width: auto` 的区别:**`auto` 会扣除 margin/border/padding 后填充,总宽度正好等于包含块;`100%` 只让 content-box 等于包含块,加上 padding/border 后会溢出**。大多数情况应该用 `auto`。' },

      { type: 'heading', text: '`margin: auto` — 水平居中的原理' },
      { type: 'paragraph', text: '当 `width` 是具体值(非 `auto`),且 `margin-left` 和 `margin-right` 都是 `auto` 时,两个 margin 会**均分剩余空间**,实现水平居中。' },
      { type: 'example', title: '经典的水平居中技巧', lang: 'css', code: `.centered {\n  width: 600px;          /* 固定宽度 */\n  margin-left: auto;     /* 吸收左侧剩余空间 */\n  margin-right: auto;    /* 吸收右侧剩余空间 */\n  /* 简写: margin: 0 auto; */\n}\n\n/* 计算过程(假设包含块 1000px):\n   1000px = margin-left + 600px + margin-right\n   剩余空间 = 1000px - 600px = 400px\n   margin-left = margin-right = 400px / 2 = 200px\n   → 元素居中!\n*/`, explanation: '这是 CSS 中最经典的居中技巧。**前提条件**:元素必须是块级元素,且 `width` 不是 `auto`(必须有明确宽度)。如果 `width: auto`,它会填满包含块,margin 没有剩余空间可分配。' },
      { type: 'warning', text: '`margin: auto` 垂直方向不生效!`margin-top: auto` 和 `margin-bottom: auto` 在常规流中会被计算为 `0`。垂直居中需要用其他方法(flexbox、grid、absolute 定位等)。' },

      { type: 'heading', text: 'min-width 和 max-width 的约束' },
      { type: 'paragraph', text: '`min-width` 和 `max-width` 会**覆盖** `width` 的计算值。计算顺序:先算出 `width`,再应用 min/max 约束,最后用约束后的值参与水平方程求解。' },
      { type: 'code', lang: 'css', caption: 'min/max-width 的优先级', code: `.element {\n  width: 1000px;\n  max-width: 800px;  /* width 被限制为 800px */\n  /* 实际宽度: 800px (不是 1000px) */\n}\n\n.element2 {\n  width: 200px;\n  min-width: 300px;  /* width 被提升为 300px */\n  /* 实际宽度: 300px (不是 200px) */\n}\n\n.responsive {\n  width: 100%;\n  max-width: 1200px;  /* 常见响应式模式 */\n  margin: 0 auto;     /* 居中 */\n  /* 窄屏:width 100%,宽屏:最多 1200px 且居中 */\n}`, explanation: 'min/max-width 的优先级**高于** width。实践中常用 `width: 100%; max-width: XXXpx; margin: 0 auto;` 实现"窄屏占满,宽屏居中"的响应式布局。' },

      { type: 'heading', text: '行内非替换元素:width 不适用' },
      { type: 'paragraph', text: '`<span>`、`<a>`、`<strong>` 等行内非替换元素的 `width` 和 `height` 属性**完全被忽略**。它们的尺寸由内容和字体决定。' },
      { type: 'code', lang: 'css', caption: 'width 对行内元素无效', code: `span {\n  width: 200px;   /* ❌ 无效,被忽略 */\n  height: 100px;  /* ❌ 无效,被忽略 */\n  /* 行内元素的宽度由文本内容决定 */\n}\n\n/* 如果需要设置宽高,改为块级或 inline-block */\nspan.sized {\n  display: inline-block;  /* 或 block */\n  width: 200px;           /* ✅ 现在生效了 */\n}` },

      { type: 'heading', text: '浮动和 inline-block:shrink-to-fit' },
      { type: 'paragraph', text: '浮动元素、`inline-block` 元素和某些绝对定位元素的 `width: auto` 使用**shrink-to-fit**(收缩适应)算法,而不是填满包含块。它们的宽度"包裹"内容,介于最小和最大内容宽度之间。' },
      { type: 'code', lang: 'text', code: `shrink-to-fit 宽度 = min(max(min-content, 可用宽度), max-content)` },
      { type: 'example', title: 'shrink-to-fit 的表现', lang: 'html', code: `<div style="width: 500px;">\n  <div style="float: left; border: 1px solid;">\n    短文本\n    <!-- 宽度 ≈ "短文本"的宽度,不是 500px -->\n  </div>\n</div>\n\n<div style="width: 200px;">\n  <div style="float: left; border: 1px solid;">\n    一段很长的文本内容会自动换行,宽度不会超过 200px\n    <!-- 宽度 = 200px (可用宽度) -->\n  </div>\n</div>`, explanation: 'Shrink-to-fit 让元素"包裹"内容:内容少时窄,内容多时宽,但不超过可用空间。这是浮动布局和 `inline-block` 布局的核心机制。' },

      { type: 'heading', text: '替换元素:使用固有宽度' },
      { type: 'paragraph', text: '替换元素(`<img>`, `<video>`, `<iframe>` 等)有**固有宽度**(intrinsic width)——来自图片/视频文件本身的尺寸。`width: auto` 时优先使用固有宽度。' },
      { type: 'code', lang: 'html', caption: '替换元素的宽度计算', code: `<!-- 图片原始尺寸 400×300 -->\n<img src="photo.jpg">\n<!-- width: auto → 400px (固有宽度) -->\n\n<img src="photo.jpg" style="width: 200px;">\n<!-- width: 200px → 高度自动按比例缩放为 150px -->\n\n<img src="photo.jpg" style="width: 100%;">\n<!-- width: 100% → 占满容器,高度按比例缩放 -->` },
      { type: 'tip', text: '给替换元素设置 `width` 或 `height` 其中一个,另一个会自动按**固有宽高比**(aspect ratio)计算,保持图片不变形。CSS `aspect-ratio` 属性可以为非替换元素也提供这种能力。' },

      { type: 'heading', text: '绝对定位元素的宽度方程' },
      { type: 'paragraph', text: '绝对定位(`position: absolute/fixed`)元素的宽度计算更复杂,因为还要考虑 `left` 和 `right` 偏移属性。完整方程:' },
      { type: 'code', lang: 'text', code: `left + margin-left + border-left + padding-left + width + padding-right + border-right + margin-right + right = 包含块宽度` },
      { type: 'example', title: '用 left 和 right 控制绝对定位元素的宽度', lang: 'css', code: `.positioned {\n  position: absolute;\n  left: 50px;\n  right: 50px;\n  /* width: auto → 自动计算\n     = 包含块宽度 - left - right - margin - border - padding\n     → 元素左右各距容器边缘 50px\n  */\n}\n\n.centered {\n  position: absolute;\n  left: 0;\n  right: 0;\n  width: 600px;\n  margin: 0 auto;\n  /* left 和 right 为 0,width 固定,margin auto 居中 */\n}`, explanation: '绝对定位元素可以同时使用 `left/right` 来拉伸宽度,或者 `left/right + width + margin: auto` 来居中。这是实现绝对定位元素水平居中的技巧。' },
      { type: 'warning', text: '如果 left/right/width/margin 都有值且总和超过包含块宽度(过度约束),在 LTR 布局中 `right` 值会被忽略(RTL 中忽略 `left`)。避免过度约束的方式:让 width 或 margin 至少有一个是 `auto`。' },

      { type: 'heading', text: 'CSS3 内在尺寸关键字' },
      { type: 'paragraph', text: 'CSS3 引入了基于内容的尺寸关键字,让宽度计算更加灵活:' },
      { type: 'list', items: [
        '**`min-content`**:内容不溢出的最小宽度(长单词/URL 不折行的宽度)',
        '**`max-content`**:内容完全不换行的宽度(把所有文本排成一行)',
        '**`fit-content`**:在 min-content 和 max-content 之间,优先 max-content 但不超过可用空间'
      ] },
      { type: 'code', lang: 'css', caption: '内在尺寸关键字的表现', code: `.min {\n  width: min-content;\n  /* 宽度 = 最长单词/图片的宽度,文本能换行就换行 */\n}\n\n.max {\n  width: max-content;\n  /* 宽度 = 所有内容排成一行的宽度,不换行 */\n}\n\n.fit {\n  width: fit-content;\n  /* 类似 shrink-to-fit:能一行就一行,容器窄了就换行 */\n  margin: 0 auto;  /* 可以配合 margin auto 居中! */\n}` },
      { type: 'tip', text: '`width: fit-content` + `margin: 0 auto` 是实现"内容宽度 + 居中"的现代方案,无需指定具体宽度。以前需要 `display: inline-block` + 外包裹层才能实现。' },
    ] as TutorialBlock[],
  },
  {
    id: 'height-calculation',
    number: '3',
    title: { zh: '高度计算', en: 'Height Calculation' },
    summary: { zh: 'CSS 中元素的高度计算规则与宽度计算类似，但在处理 auto 值和百分比值时有重要区别。', en: 'Height calculation rules in CSS are similar to width calculation, but have important differences when handling auto values and percentage values.' },
    keyPoints: [
      '行内非替换元素的高度由 line-height 决定',
      'auto height 取决于子元素的内容高度',
      '百分比高度需要包含块有明确高度',
      'line-height 控制行内元素的行高',
      'min-height/max-height 约束最终高度',
      'vertical-align 控制行内元素在行盒中的垂直对齐方式（baseline/middle/top/bottom 等）',
      '行盒(line box)高度由其中最高和最低盒子的边界距离决定，包括 strut 的影响',
      '无基线的盒子使用合成基线(synthesized baseline)：底部外边距边界对齐父元素基线',
      '替换元素的 auto 高度优先使用固有高度，或通过固有比例从已用宽度推导',
      'BFC 根元素的 auto 高度会包含浮动后代的底部边界',
    ],
    specId: 'Computing_heights_and_margins',
    tutorial: [
      { type: 'heading', text: '高度计算与宽度计算的核心差异' },
      { type: 'paragraph', text: '高度计算的规则表面上和宽度类似,但有一个**本质区别**:块级元素的高度不像宽度那样"必须填满包含块"。`height: auto` 的块级元素高度由**内容决定**,不会自动撑满父容器。这导致了 CSS 中最常见的困惑之一:百分比高度不生效。' },

      { type: 'heading', text: '`height: auto` — 由内容撑开' },
      { type: 'example', title: '块级元素的默认高度行为', lang: 'html', code: `<div style="height: 500px; border: 1px solid;">\n  <div style="border: 1px solid red;">\n    这个 div 的 height: auto (默认值)\n    高度由这段文字撑开,大约 20-30px\n    <!-- 不会像 width 那样填满父容器的 500px -->\n  </div>\n</div>`, explanation: '块级元素的 `height: auto` 会收缩到**刚好包裹内容**的高度。即使父容器有 500px 高,子元素也不会自动填充。这与 `width: auto` 的"填满包含块"行为完全不同。' },
      { type: 'tip', text: '如果希望子元素填满父容器的高度,不能依赖 `height: auto`。需要显式设置 `height: 100%`(前提是父容器有明确高度)或使用 flexbox/grid 布局。' },

      { type: 'heading', text: '百分比高度的"鸡生蛋"问题' },
      { type: 'paragraph', text: 'CSS 中最让人抓狂的问题之一:**`height: 100%` 经常不生效**。原因是百分比高度相对于包含块的高度计算,但如果包含块的高度是 `auto`(由内容决定),百分比就无法计算,被视为 `auto`。' },
      { type: 'example', title: '为什么 height: 100% 失效?', lang: 'html', code: `<div class="parent">  <!-- height: auto -->\n  <div class="child" style="height: 100%;">\n    我想占满父容器的高度\n    <!-- ❌ 不生效!height: 100% 被视为 auto -->\n  </div>\n</div>\n\n<!-- 为什么?\n父元素的高度是 auto,由子元素内容决定\n→ 子元素的百分比高度相对于父元素高度计算\n→ 父元素高度又依赖子元素内容\n→ 形成循环依赖,百分比失效\n-->`, explanation: '这是 CSS 规范的明确规定:如果包含块的高度不是明确的(即 `auto` 或取决于内容),后代元素的百分比高度无法计算,会回退为 `auto`。' },
      { type: 'warning', text: '**百分比高度的必要条件**:包含块必须有**明确的高度**(如 `height: 500px` 或 `height: 100vh`)。仅仅给包含块设置 `height: 100%` 是不够的——你需要一路向上给所有祖先设置高度,直到某个祖先有明确高度(通常是 `html, body { height: 100%; }`)。' },

      { type: 'heading', text: '让百分比高度生效的 3 种方法' },
      { type: 'code', lang: 'css', caption: '方法 1:给包含块明确高度', code: `html, body {\n  height: 100%;  /* 根元素高度 = 视口高度 */\n}\n\n.container {\n  height: 100%;  /* 现在可以用百分比了 */\n}\n\n.child {\n  height: 50%;   /* 相对于 container 的 50% */\n}` },
      { type: 'code', lang: 'css', caption: '方法 2:使用视口单位', code: `.fullscreen {\n  height: 100vh;  /* 视口高度的 100%,不依赖父元素 */\n}\n\n.half {\n  height: 50vh;   /* 视口高度的 50% */\n}` },
      { type: 'code', lang: 'css', caption: '方法 3:使用 flexbox', code: `.container {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;  /* 或任何明确高度 */\n}\n\n.child {\n  flex: 1;  /* 占据所有剩余空间,无需百分比 */\n}` },
      { type: 'tip', text: '实践中**推荐用 flexbox/grid**,它们不依赖百分比就能实现"填满父容器"效果,且更灵活。`100vh` 适合全屏布局,但要注意移动浏览器的地址栏问题(地址栏会占据视口高度)。' },

      { type: 'heading', text: 'line-height 与行内元素的高度' },
      { type: 'paragraph', text: '行内非替换元素(如 `<span>`, `<a>`)的高度不由 `height` 属性控制,而由 `line-height` 决定。`line-height` 定义了行盒(line box)的**最小高度**。' },
      { type: 'code', lang: 'css', caption: 'line-height 的 3 种取值方式', code: `/* 1. 无单位数字(推荐):相对于元素自身的 font-size */\np {\n  font-size: 16px;\n  line-height: 1.5;  /* 行高 = 16px × 1.5 = 24px */\n}\n\n/* 2. 长度值:固定行高 */\np {\n  line-height: 24px;  /* 行高固定为 24px */\n}\n\n/* 3. 百分比:相对于 font-size,但会被继承为计算后的值 */\np {\n  font-size: 16px;\n  line-height: 150%;  /* = 24px,且子元素继承 24px */\n}` },
      { type: 'example', title: 'line-height 如何影响元素高度', lang: 'html', code: `<div style="font-size: 16px; line-height: 2; border: 1px solid;">\n  单行文本\n  <!-- 行盒高度 = 16px × 2 = 32px -->\n  <!-- div 的高度 = 32px -->\n</div>\n\n<div style="font-size: 16px; line-height: 2; border: 1px solid;">\n  第一行文本<br>\n  第二行文本\n  <!-- 两个行盒,每个 32px -->\n  <!-- div 的高度 = 32px × 2 = 64px -->\n</div>`, explanation: '行内格式化上下文中,包含块的高度等于其所有行盒的高度之和。每个行盒的高度至少等于 `line-height`(如果内容更高,行盒会撑大)。' },
      { type: 'tip', text: '**推荐使用无单位数字**作为 `line-height` 值(如 `1.5`)。这样子元素会继承比例而非固定值,能根据自己的 `font-size` 重新计算行高,避免文字重叠。' },

      { type: 'heading', text: 'vertical-align:行内元素的垂直对齐' },
      { type: 'paragraph', text: '`vertical-align` 控制行内级元素(行内元素、`inline-block`、表格单元格)在**行盒内**的垂直位置。注意:它不控制块级元素的对齐。' },
      { type: 'code', lang: 'css', caption: 'vertical-align 常用值', code: `/* 基线对齐(默认) */\nspan { vertical-align: baseline; }\n\n/* 中线对齐 */\nspan { vertical-align: middle; }\n\n/* 顶部/底部对齐 */\nspan { vertical-align: top; }\nspan { vertical-align: bottom; }\n\n/* 上标/下标 */\nsup { vertical-align: super; }\nsub { vertical-align: sub; }\n\n/* 文本顶部/底部 */\nspan { vertical-align: text-top; }\nspan { vertical-align: text-bottom; }\n\n/* 长度/百分比偏移 */\nspan { vertical-align: 5px; }   /* 相对基线上移 5px */\nspan { vertical-align: -20%; }  /* 相对基线下移 line-height 的 20% */` },
      { type: 'example', title: '用 vertical-align 对齐图标和文字', lang: 'html', code: `<button style="font-size: 16px;">\n  <img src="icon.svg" style="height: 16px; vertical-align: middle;">\n  按钮文字\n</button>\n<!-- vertical-align: middle 让图标和文字在垂直方向居中对齐 -->\n\n<span style="font-size: 14px;">\n  价格: <span style="font-size: 24px; vertical-align: baseline;">¥99</span>\n</span>\n<!-- baseline 对齐让不同字号的文字底部对齐 -->`, explanation: '`vertical-align: middle` 是对齐图标和文字的常用技巧。注意 `middle` 不是真正的"垂直居中",而是对齐到字体的 x-height 中点,但视觉上足够接近。' },
      { type: 'warning', text: '`vertical-align` **只对行内级元素和表格单元格有效**,对块级元素完全无效。如果你发现 `vertical-align` 不生效,检查元素的 `display` 是否是 `inline`、`inline-block` 或 `table-cell`。' },

      { type: 'heading', text: '行盒高度的计算' },
      { type: 'paragraph', text: '行盒(line box)的高度是行内格式化上下文的核心概念。行盒高度由**行内最高点和最低点之间的距离**决定,受以下因素影响:' },
      { type: 'list', items: [
        '**Strut**:每个行盒都有一个假想的"支柱",高度等于父元素的 `line-height`,总是存在',
        '**行内元素**:每个行内元素根据 `vertical-align` 在行盒内定位,其上边界和下边界影响行盒高度',
        '**替换元素**:图片、`inline-block` 元素等也参与行盒高度计算',
        '最终行盒高度:**所有元素(包括 strut)的最高点到最低点的距离**'
      ] },
      { type: 'example', title: '行盒高度大于 line-height 的情况', lang: 'html', code: `<div style="line-height: 20px; border: 1px solid;">\n  文字\n  <img src="icon.png" style="height: 40px; vertical-align: bottom;">\n  更多文字\n  <!-- 行盒高度 = 40px (图片高度),不是 20px (line-height) -->\n  <!-- 因为图片撑高了行盒 -->\n</div>`, explanation: '`line-height` 只是行盒的**最小**高度。如果行内元素(如高图片、大字号文字)超过这个高度,行盒会被撑大。' },

      { type: 'heading', text: '替换元素的高度' },
      { type: 'paragraph', text: '替换元素(如 `<img>`)的 `height: auto` 优先使用**固有高度**(图片文件自身的高度)。如果设置了 `width` 但 `height` 是 `auto`,高度会根据**固有宽高比**自动计算。' },
      { type: 'code', lang: 'html', caption: '替换元素的宽高比保持', code: `<!-- 图片原始尺寸 800×600,宽高比 4:3 -->\n<img src="photo.jpg">\n<!-- width: auto → 800px, height: auto → 600px -->\n\n<img src="photo.jpg" style="width: 400px;">\n<!-- width: 400px → height: 300px (保持 4:3 比例) -->\n\n<img src="photo.jpg" style="width: 400px; height: 200px;">\n<!-- 宽高都明确指定 → 图片可能变形(4:2 比例) -->` },
      { type: 'tip', text: '只给替换元素设置 `width` 或 `height` 其中一个,让另一个保持 `auto`,可以避免图片变形。CSS `aspect-ratio` 属性可以为普通元素也提供类似的宽高比约束。' },

      { type: 'heading', text: 'BFC 根元素包含浮动' },
      { type: 'paragraph', text: '块格式化上下文(BFC)的根元素在计算 `height: auto` 时,会**包含浮动子元素的底部边界**。这与普通块级元素不同——普通元素的 `height: auto` 不考虑浮动子元素(浮动元素脱离了常规流)。' },
      { type: 'example', title: 'BFC 清除浮动', lang: 'html', code: `<!-- 普通容器:高度塌陷 -->\n<div style="border: 1px solid;">\n  <div style="float: left; width: 100px; height: 100px;">浮动</div>\n  <!-- 父容器高度 ≈ 0,因为浮动元素脱离了常规流 -->\n</div>\n\n<!-- BFC 容器:包含浮动 -->\n<div style="overflow: auto; border: 1px solid;">\n  <div style="float: left; width: 100px; height: 100px;">浮动</div>\n  <!-- 父容器高度 = 100px,因为 overflow: auto 创建了 BFC -->\n</div>`, explanation: '`overflow: hidden/auto`、`display: flow-root`、`float`、`position: absolute` 等会创建 BFC。BFC 容器的 `height: auto` 会自动包含浮动子元素,这是"清除浮动"技巧的原理。' },

      { type: 'heading', text: 'min-height 和 max-height' },
      { type: 'paragraph', text: '`min-height` 和 `max-height` 的工作方式与 `min/max-width` 完全一致:在 `height` 计算完成后应用约束,优先级高于 `height`。' },
      { type: 'code', lang: 'css', caption: 'min/max-height 的实际应用', code: `.flexible-card {\n  min-height: 200px;  /* 内容少时至少 200px 高 */\n  max-height: 500px;  /* 内容多时最多 500px 高 */\n  overflow: auto;     /* 超出时显示滚动条 */\n}\n\n.full-viewport {\n  min-height: 100vh;  /* 至少占满视口高度 */\n  /* 内容更多时自动扩展 */\n}` },
      { type: 'tip', text: '`min-height: 100vh` 是实现"至少全屏"布局的常用技巧:内容少时占满视口,内容多时自动扩展。比固定 `height: 100vh` 更灵活(后者会裁剪多余内容)。' },
    ] as TutorialBlock[],
  },
  {
    id: 'alignment',
    number: '4',
    title: { zh: '盒对齐', en: 'Box Alignment' },
    summary: { zh: 'CSS Box Alignment Module Level 3 提供了统一的对齐属性，适用于 Flexbox、Grid、Block 等多种布局模式。', en: 'CSS Box Alignment Module Level 3 provides unified alignment properties applicable to multiple layout modes including Flexbox, Grid, and Block.' },
    keyPoints: [
      'justify-content: 主轴/行内轴方向的空间分配',
      'align-items: 交叉轴/块轴方向的默认对齐',
      'align-self: 单个元素的交叉轴对齐',
      'align-content: 多行内容的交叉轴分布',
      'place-items/place-self/place-content: 简写属性',
      'gap/row-gap/column-gap: 项目间固定间距，适用于 Flex、Grid 和多列布局',
      '分布对齐：space-between(两端对齐)、space-around(等间距)、space-evenly(完全等分)',
      'safe/unsafe 溢出对齐：safe 在溢出时回退到 flex-start，unsafe 严格遵循指定对齐',
      '基线对齐(baseline)：同一行/列中多个项目按其基线对齐，支持 first/last baseline',
      'justify-self/justify-items: 行内轴方向的自身对齐与默认对齐设置',
    ],
    tutorial: [
      { type: 'heading', text: 'Box Alignment:统一的对齐系统' },
      { type: 'paragraph', text: 'CSS Box Alignment Module Level 3 是一套**跨布局模式的统一对齐规范**,适用于 Flexbox、Grid、多列布局甚至块布局。它提供了一组一致的属性,让你可以用相同的语法在不同布局中实现对齐。这个模块的设计哲学是:**对齐应该独立于布局模式**。' },
      { type: 'paragraph', text: '理解 Box Alignment 的关键是理解两根轴:**主轴(main axis)和交叉轴(cross axis)** (flexbox)或**行内轴(inline axis)和块轴(block axis)** (grid/block)。所有对齐属性都围绕这两根轴工作。' },

      { type: 'heading', text: '对齐属性全景图' },
      { type: 'list', items: [
        '**内容分布**:`justify-content`, `align-content` — 控制项目组/行列之间的空间分配',
        '**自身对齐**:`justify-self`, `align-self` — 控制单个项目在其网格区域/交叉轴的位置',
        '**默认对齐**:`justify-items`, `align-items` — 设置所有项目的默认自身对齐',
        '**简写**:`place-content`, `place-self`, `place-items` — 同时设置两个轴的对齐',
        '**间距**:`gap`, `row-gap`, `column-gap` — 项目之间的固定间距'
      ] },
      { type: 'tip', text: '记忆规则:**justify-** 前缀控制主轴/行内轴(水平方向)对齐,**align-** 前缀控制交叉轴/块轴(垂直方向)对齐。但这只是大致规则,具体方向取决于 `writing-mode` 和 `flex-direction`。' },

      { type: 'heading', text: 'justify-content:主轴空间分配' },
      { type: 'paragraph', text: '`justify-content` 控制容器在**主轴/行内轴**方向上如何分配剩余空间。它作用于项目组,而非单个项目。' },
      { type: 'code', lang: 'css', caption: 'justify-content 的所有值', code: `/* 位置对齐 */\n.container {\n  justify-content: start;        /* 起点对齐 */\n  justify-content: end;          /* 终点对齐 */\n  justify-content: center;       /* 居中 */\n  justify-content: flex-start;   /* Flexbox 特有:主轴起点 */\n  justify-content: flex-end;     /* Flexbox 特有:主轴终点 */\n}\n\n/* 分布对齐 */\n.container {\n  justify-content: space-between;  /* 两端对齐,间距相等 */\n  justify-content: space-around;   /* 每个项目两侧间距相等 */\n  justify-content: space-evenly;   /* 所有间距完全相等 */\n}\n\n/* 基线对齐 */\n.container {\n  justify-content: baseline;       /* 按基线对齐(主要用于 Grid) */\n}` },
      { type: 'example', title: 'space-between vs space-around vs space-evenly', lang: 'text', code: `/* 假设容器 [                    ] 里有 3 个项目 ■ */\n\nspace-between:  [■        ■        ■]  两端紧贴,间距相等\nspace-around:   [  ■      ■      ■  ]  每个项目两侧间距相等(两端间距=项目间距÷2)\nspace-evenly:   [   ■     ■     ■   ]  所有间距完全相等(包括两端)`, explanation: '`space-between` 让第一个和最后一个项目紧贴容器边缘,中间间距均分。`space-around` 给每个项目两侧分配相等空间,所以两端间距是项目间距的一半。`space-evenly` 让所有间距完全相等,包括两端。' },
      { type: 'warning', text: '`justify-content` 只在有**剩余空间**时才有效。如果 flex 项目的 `flex-grow` 已经把空间全部分配了,或者 grid 轨道已经填满了容器,`justify-content` 就没有可分配的空间,不会产生任何效果。' },

      { type: 'heading', text: 'align-items:交叉轴默认对齐' },
      { type: 'paragraph', text: '`align-items` 设置在容器上,为所有项目提供**交叉轴/块轴**方向的默认对齐方式。在 flexbox 中,这是最常用的属性之一。' },
      { type: 'code', lang: 'css', caption: 'align-items 常用值', code: `/* Flexbox 水平布局中,以下值控制垂直对齐 */\n.flex-container {\n  display: flex;\n  \n  align-items: stretch;      /* 默认:拉伸填满交叉轴 */\n  align-items: flex-start;   /* 紧贴交叉轴起点(顶部) */\n  align-items: flex-end;     /* 紧贴交叉轴终点(底部) */\n  align-items: center;       /* 交叉轴居中 */\n  align-items: baseline;     /* 按首行文本基线对齐 */\n}\n\n/* Grid 中,align-items 控制项目在网格行方向的对齐 */\n.grid-container {\n  display: grid;\n  align-items: start;        /* 紧贴网格区域顶部 */\n  align-items: end;          /* 紧贴网格区域底部 */\n  align-items: center;       /* 网格区域内垂直居中 */\n}` },
      { type: 'example', title: '等高卡片 vs 顶部对齐卡片', lang: 'css', code: `/* 默认:所有卡片等高 */\n.card-list {\n  display: flex;\n  gap: 16px;\n  align-items: stretch;  /* 默认值,所有卡片拉伸到最高卡片的高度 */\n}\n\n/* 让卡片保持自然高度,顶部对齐 */\n.card-list-natural {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;  /* 卡片高度各异,顶部对齐 */\n}`, explanation: '`align-items: stretch` 让所有 flex 项目拉伸到交叉轴的容器尺寸(或同一行中最高项目的高度),实现等高效果。`align-items: flex-start` 让项目保持自然高度,顶部对齐。' },

      { type: 'heading', text: 'align-self:单个项目覆盖' },
      { type: 'paragraph', text: '`align-self` 设置在项目上,允许单个项目覆盖容器的 `align-items` 设置。它的值与 `align-items` 相同,外加 `auto`(默认值,继承 `align-items`)。' },
      { type: 'code', lang: 'css', caption: '让某个项目特殊对齐', code: `.container {\n  display: flex;\n  align-items: flex-start;  /* 所有项目靠顶部 */\n  height: 200px;\n}\n\n.special-item {\n  align-self: flex-end;     /* 这个项目靠底部 */\n}\n\n.centered-item {\n  align-self: center;       /* 这个项目垂直居中 */\n}` },
      { type: 'tip', text: '`align-self: center` 是在 flex 布局中实现单个元素垂直居中的最简单方式。常见场景:在顶部对齐的工具栏中让某个按钮垂直居中,或在等高卡片中让底部按钮始终靠下对齐。' },

      { type: 'heading', text: 'align-content:多行/列的空间分配' },
      { type: 'paragraph', text: '`align-content` 控制**多行 flex 容器**或**多轨道 grid 容器**在交叉轴方向的空间分配。它作用于行/列之间,而非单个项目。' },
      { type: 'code', lang: 'css', caption: 'align-content 用于多行布局', code: `/* 多行 flex 容器 */\n.wrap-container {\n  display: flex;\n  flex-wrap: wrap;         /* 必须是多行! */\n  height: 400px;           /* 必须有明确高度! */\n  \n  align-content: flex-start;     /* 所有行挤在顶部 */\n  align-content: space-between;  /* 第一行顶部,最后一行底部 */\n  align-content: center;         /* 所有行居中 */\n}\n\n/* Grid 容器 */\n.grid {\n  display: grid;\n  grid-template-rows: repeat(3, 100px);\n  height: 500px;  /* 剩余 200px 由 align-content 分配 */\n  \n  align-content: space-around;  /* 行之间均匀分布 */\n}` },
      { type: 'warning', text: '`align-content` 常见误区:**它只在多行/多列容器中生效**。单行 flex 容器(`flex-wrap: nowrap`)或只有一行内容的容器,`align-content` 完全无效。另外,容器在交叉轴方向必须有剩余空间(即容器高度 > 所有行的总高度),`align-content` 才有可见效果。' },

      { type: 'heading', text: 'justify-self 和 justify-items:行内轴对齐' },
      { type: 'paragraph', text: '`justify-self` 和 `justify-items` 控制项目在**行内轴/主轴**方向的对齐,与 `align-self/align-items` 对称。但注意:**这两个属性在 flexbox 中不生效**,只在 grid 和块布局中有效。' },
      { type: 'code', lang: 'css', caption: 'Grid 中的 justify-self', code: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  justify-items: center;  /* 所有项目在网格单元格内水平居中 */\n}\n\n.special-item {\n  justify-self: end;      /* 这个项目在单元格内靠右对齐 */\n}` },
      { type: 'tip', text: 'Flexbox 中没有 `justify-self`,因为主轴方向的对齐由 `justify-content`、`flex-grow` 和 `margin: auto` 控制。如果你需要单个 flex 项目在主轴方向特殊对齐,用 `margin-left: auto` 或 `margin-right: auto`。' },

      { type: 'heading', text: '简写属性:place-*' },
      { type: 'paragraph', text: '`place-content`、`place-items`、`place-self` 是简写属性,可以同时设置两个轴的对齐。语法:`place-XXX: <align> <justify>`。如果只提供一个值,两个轴使用相同值。' },
      { type: 'code', lang: 'css', caption: 'place-* 简写', code: `/* place-items = align-items + justify-items */\n.grid {\n  display: grid;\n  place-items: center;       /* 两个轴都居中 */\n  /* 等同于: align-items: center; justify-items: center; */\n  \n  place-items: start end;    /* 垂直起点,水平终点 */\n}\n\n/* place-self = align-self + justify-self */\n.item {\n  place-self: center;        /* 在网格单元格内完全居中 */\n}\n\n/* place-content = align-content + justify-content */\n.container {\n  place-content: space-between center;\n}` },
      { type: 'tip', text: '`place-items: center` 是在 grid 中实现完美居中的最简洁方式:一行 CSS 让所有项目在网格单元格内水平和垂直都居中。' },

      { type: 'heading', text: 'gap:项目间距的现代方案' },
      { type: 'paragraph', text: '`gap` 属性(及其子属性 `row-gap`、`column-gap`)在项目**之间**添加固定间距,适用于 flexbox、grid 和多列布局。它只影响项目之间的间距,不影响容器边缘。' },
      { type: 'code', lang: 'css', caption: 'gap 的使用', code: `/* Flexbox */\n.flex {\n  display: flex;\n  gap: 16px;              /* 主轴和交叉轴都是 16px */\n}\n\n/* Grid */\n.grid {\n  display: grid;\n  gap: 20px 10px;         /* 行间距 20px,列间距 10px */\n  /* 等同于: row-gap: 20px; column-gap: 10px; */\n}\n\n/* 多列布局 */\n.multicol {\n  column-count: 3;\n  column-gap: 30px;       /* 列之间的间距 */\n}` },
      { type: 'example', title: '对比:gap vs margin', lang: 'css', code: `/* ❌ 旧方法:用 margin,需要处理边缘 */\n.grid-old {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.grid-old > * {\n  margin: 8px;  /* 问题:容器边缘也有 8px 间距 */\n}\n\n/* ✅ 新方法:用 gap,自动处理边缘 */\n.grid-new {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;    /* 只在项目之间,边缘没有间距 */\n}`, explanation: '`gap` 的优势:**只在项目之间生效**,第一个和最后一个项目旁边没有多余间距,不需要负 margin hack 或 `:first-child/:last-child` 选择器。代码更简洁,意图更清晰。' },

      { type: 'heading', text: '基线对齐(Baseline Alignment)' },
      { type: 'paragraph', text: '`align-items: baseline` 和 `justify-content: baseline` 让项目按照**文本基线**对齐。这在项目包含不同字号或行高的文本时非常有用。' },
      { type: 'code', lang: 'html', caption: '基线对齐的应用场景', code: `<div style="display: flex; align-items: baseline; gap: 8px;">\n  <h2 style="font-size: 32px; margin: 0;">标题</h2>\n  <span style="font-size: 14px;">副标题</span>\n  <span style="font-size: 12px; color: gray;">2024-01-15</span>\n</div>\n<!-- 三个元素的文字底部在同一条基线上 -->` },
      { type: 'list', items: [
        '**first baseline**:项目的第一行文本基线对齐',
        '**last baseline**:项目的最后一行文本基线对齐',
        '**合成基线**:如果项目没有文本内容(如空 div、图片),使用其底部边缘作为基线'
      ] },

      { type: 'heading', text: '溢出对齐:safe vs unsafe' },
      { type: 'paragraph', text: '当对齐的项目溢出容器时,`safe` 和 `unsafe` 关键字控制如何处理溢出。`safe` 在溢出时回退到 `start` 对齐,确保内容可访问;`unsafe` 严格遵循指定对齐,即使导致内容溢出到不可滚动区域。' },
      { type: 'code', lang: 'css', caption: '溢出对齐', code: `.container {\n  display: flex;\n  height: 200px;\n  overflow: auto;\n  \n  /* 安全对齐:如果项目高度 > 200px,回退到 flex-start */\n  align-items: safe center;\n  \n  /* 不安全对齐:即使溢出也强制居中(可能裁剪顶部内容) */\n  align-items: unsafe center;\n}` },
      { type: 'warning', text: '默认行为是 `unsafe`,即严格遵循指定对齐。如果你的内容可能溢出容器(如用户生成内容、国际化文本),建议使用 `safe` 关键字,确保溢出内容始终可访问。' },

      { type: 'heading', text: '不同布局模式的对齐支持' },
      { type: 'paragraph', text: 'Box Alignment 属性在不同布局模式中的支持程度不同:' },
      { type: 'list', items: [
        '**Flexbox**:完全支持 `justify-content`, `align-items`, `align-self`, `align-content`, `gap`。不支持 `justify-self/justify-items`',
        '**Grid**:完全支持所有对齐属性',
        '**多列布局**:支持 `column-gap` 和部分 `align-content`',
        '**块布局**:支持 `align-content` 和 `justify-content`(实验性),支持 `align-self` 用于绝对定位元素'
      ] },
      { type: 'tip', text: '记住这个核心原则:**flexbox 是一维布局,只能控制一根轴上的项目对齐(`justify-content`),交叉轴只能逐项对齐(`align-items/self`);grid 是二维布局,可以同时控制行和列的对齐,且支持单个项目在单元格内的双向对齐(`justify-self + align-self`)**。' },
    ] as TutorialBlock[],
  },
  {
    id: 'baseline-alignment',
    number: '4.1',
    title: { zh: '基线对齐详解', en: 'Baseline Alignment Details' },
    summary: { zh: '基线对齐是 CSS 对齐模型中最复杂的部分，涉及基线集的确定、合成基线的生成规则，以及 Flexbox/Grid 等布局中的基线参与机制。', en: 'Baseline alignment is the most complex part of the CSS alignment model, involving baseline set determination, synthesized baseline generation rules, and baseline participation mechanisms in Flexbox/Grid layouts.' },
    keyPoints: [
      '每个盒子在给定轴上有 first baseline set 和 last baseline set，分别对应盒子内首行/末行文本的基线集',
      'alignment baseline（对齐基线）是基线集中实际用于对齐的基线，通常是共享对齐上下文的 dominant baseline',
      '行盒的基线集由其 root inline box 的 dominant baseline 和字体指标生成',
      '块容器的基线集取自首个/末个流内行盒或流内块级子元素贡献的基线集；无匹配时该块容器没有基线集',
      '块容器若为滚动容器(scroll container)且 baseline-source 为 auto，则始终具有 last baseline set，位于 block-end margin edge',
      '表格的基线集取自首行/末行；表格行的基线集由参与基线对齐的单元格共享基线生成，否则从单元格内容边缘合成',
      'Flex 容器主轴基线(main-axis baseline)确定：① 首行/末行有基线参与项 → 使用共享对齐基线 ② 至少有一个 flex 项 → 使用最起始/末端项的基线(无则从 border edge 合成) ③ 无项目 → 按对齐上下文规则合成',
      'Flex 容器交叉轴基线(cross-axis baseline)确定：① 至少有一个 flex 项 → 使用最起始/末端项的基线(无则从 border edge 合成) ② 无项目 → 按对齐上下文规则合成',
      'Flex 项若 align-self 为 baseline 则"参与基线对齐"(baseline participation)，其基线与同一 flex 行内其他基线参与项共享对齐',
      '合成基线(synthesized baseline)规则：从矩形合成时，alphabetic baseline 取 line-under 边，central baseline 取上下边平均值',
      '合成基线使用的边缘因格式化上下文而异：行内级盒 → margin edge，表格单元格 → content edge，flex/grid 项 → border edge',
      'baseline-sharing group(基线共享组)：同一对齐上下文中、基线对齐偏好兼容的盒子组成一组共同对齐',
      '基线对齐偏好兼容条件：① 相同 block flow direction + 相同 baseline preference ② 相反 block flow direction + 相反 baseline preference',
      '基线对齐算法：① 从对齐上下文的 first available font 生成基线表 ② 按各主体的 alignment baseline 对齐到基线表 ③ 按 fallback alignment 在对齐容器中定位 ④ 对于 baseline content-alignment 添加最小必要额外空间',
      '计算基线时，有滚动机制的盒子必须视为处于初始滚动位置(initial scroll position)',
      'writing mode 与对齐轴平行时，需假设一个轴兼容的书写模式来确定合成基线的 line-under/line-over 边',
    ],
    specId: 'baseline-rules',
    tutorial: [
      { type: 'heading', text: '基线对齐:CSS 对齐模型的硬核部分' },
      { type: 'paragraph', text: '基线对齐(baseline alignment)是 CSS 对齐系统中最复杂、最精细的部分。它的目标是让包含文本的元素**按照文字的视觉基线对齐**,而不是按盒子边缘对齐。这需要浏览器理解字体的内部结构、确定每个元素的"基线"位置,并在不同字号、不同字体的元素之间建立视觉对齐。' },
      { type: 'paragraph', text: '理解基线对齐的关键概念:**基线集(baseline set)**、**对齐基线(alignment baseline)**、**合成基线(synthesized baseline)**、**基线共享组(baseline-sharing group)**。这些概念层层递进,构成了一个完整的基线对齐算法。' },

      { type: 'heading', text: 'First Baseline Set 和 Last Baseline Set' },
      { type: 'paragraph', text: '每个盒子在给定的对齐轴上有**两组基线**:' },
      { type: 'list', items: [
        '**First baseline set**:对应盒子内**第一行文本**的基线集(通常用于 `align-items: baseline`)',
        '**Last baseline set**:对应盒子内**最后一行文本**的基线集(用于 `align-items: last baseline`)'
      ] },
      { type: 'paragraph', text: '为什么需要两组?因为在某些布局中(如 Grid 的多行布局),我们可能希望项目按首行对齐,或按末行对齐。两组基线提供了这种灵活性。' },
      { type: 'example', title: '块容器的基线集确定', lang: 'html', code: `<div style="border: 1px solid;">\n  <p>第一段文字</p>\n  <p>第二段文字</p>\n  <p>最后一段文字</p>\n</div>\n<!-- First baseline set: 取自第一个 <p> 的第一行文字基线\n     Last baseline set: 取自最后一个 <p> 的最后一行文字基线 -->`, explanation: '块容器的基线集取自其首个/末个**流内行盒**或**流内块级子元素**。如果子元素是块容器,递归取其基线集。如果容器是空的或只有浮动/绝对定位元素,**没有基线集**,需要合成。' },

      { type: 'heading', text: '对齐基线(Alignment Baseline)' },
      { type: 'paragraph', text: '基线集中可能包含多条基线(alphabetic baseline、ideographic baseline、mathematical baseline 等),但对齐时只使用其中一条——**对齐基线**(alignment baseline)。它通常是对齐上下文的 **dominant baseline**(主导基线),由字体和书写模式决定。' },
      { type: 'list', items: [
        '拉丁字母:使用 **alphabetic baseline**(字母底部的基线,如 a、x 的底部)',
        '中文/日文:使用 **ideographic baseline**(表意文字的底部基线)',
        '数学排版:使用 **mathematical baseline**(用于公式排版)'
      ] },
      { type: 'tip', text: '大多数情况你不需要关心具体用哪条基线——浏览器会根据字体自动选择合适的基线。但理解"基线不止一条"有助于理解为什么混合中英文时对齐看起来正确。' },

      { type: 'heading', text: '合成基线(Synthesized Baseline)' },
      { type: 'paragraph', text: '如果一个盒子**没有文本内容**(如空的 `<div>`、`<img>` 元素、`inline-block` 空盒子),它就没有自然的基线。这时浏览器需要**合成基线**(从盒子的几何边界生成假想的基线)。' },
      { type: 'code', lang: 'text', caption: '合成基线规则', code: `Alphabetic baseline: 使用盒子的 line-under 边(通常是底部边缘)\nCentral baseline: 使用盒子上下边的中点\n\n使用哪个边缘取决于格式化上下文:\n- 行内级盒(inline/inline-block): margin edge\n- 表格单元格: content edge  \n- Flex/Grid 项: border edge` },
      { type: 'example', title: '合成基线的实际表现', lang: 'html', code: `<div style="display: flex; align-items: baseline; font-size: 20px;">\n  <span>文字</span>\n  <div style="display: inline-block; width: 50px; height: 50px; background: lightblue;"></div>\n  <span>更多文字</span>\n</div>\n<!-- 空的 inline-block 盒子没有文字,基线被合成为其 margin bottom edge\n     它的底部会和周围文字的基线对齐 -->`, explanation: '空的 `inline-block` 元素在基线对齐时,浏览器使用其**底部外边距边界**(margin bottom edge)作为合成基线。这就是为什么空的 `inline-block` 盒子底部会和周围文字的底部对齐。' },
      { type: 'warning', text: '合成基线的一个常见"陷阱":如果 `inline-block` 元素内部有文字,它的基线是**最后一行文字的基线**;如果是空的,基线是**底部边缘**。这导致有无文字时对齐位置不同,可能产生意外的布局偏移。' },

      { type: 'heading', text: 'Flex 容器的基线确定' },
      { type: 'paragraph', text: 'Flex 容器自身也可能参与基线对齐(如嵌套的 flex 容器)。它的基线取决于其内部 flex 项目的基线,规则比较复杂:' },
      { type: 'list', ordered: true, items: [
        '**主轴基线**(main-axis baseline):如果首行/末行有参与基线对齐的 flex 项(即 `align-self: baseline` 的项),使用这些项的共享对齐基线',
        '如果没有基线参与项,但至少有一个 flex 项,使用**最起始/末端项的基线**(如果该项也没有基线,从其 border edge 合成)',
        '如果容器完全空,按照对齐上下文的规则合成基线',
        '**交叉轴基线**(cross-axis baseline):类似逻辑,但不考虑基线参与,直接使用最起始/末端项的基线'
      ] },
      { type: 'code', lang: 'html', caption: 'Flex 容器的基线传递', code: `<div style="display: flex; align-items: baseline;">\n  <div style="display: flex; flex-direction: column;">\n    <span>内层第一行</span>\n    <span>内层第二行</span>\n  </div>\n  <span>外层文字</span>\n</div>\n<!-- 内层 flex 容器的 first baseline 取自 "内层第一行"\n     外层对齐时,内层容器的这条基线会和 "外层文字" 对齐 -->`, explanation: 'Flex 容器的基线会"传递"到外层——如果外层需要基线对齐,内层容器会使用其首个/末个 flex 项的基线作为自己的基线。这使得嵌套布局也能正确参与基线对齐。' },

      { type: 'heading', text: '基线参与(Baseline Participation)' },
      { type: 'paragraph', text: '在 flex 布局中,只有 `align-self: baseline` 的 flex 项才**参与基线对齐**(baseline participation)。这些项会组成一个**基线共享组**(baseline-sharing group),共享同一条对齐基线。' },
      { type: 'code', lang: 'css', caption: '基线参与示例', code: `.container {\n  display: flex;\n  align-items: flex-start;  /* 默认:不参与基线对齐 */\n}\n\n.item1 {\n  align-self: baseline;  /* 参与基线对齐 */\n}\n\n.item2 {\n  align-self: baseline;  /* 也参与,和 item1 基线对齐 */\n}\n\n.item3 {\n  align-self: center;    /* 不参与基线对齐 */\n}` },
      { type: 'paragraph', text: '基线共享组内的所有项目会调整垂直位置,使它们的基线对齐。非参与项(如 `align-self: center`)不受影响,按自己的对齐规则定位。' },

      { type: 'heading', text: '基线共享组(Baseline-Sharing Group)' },
      { type: 'paragraph', text: '基线共享组是**一组需要共同基线对齐的盒子**。它们必须满足:' },
      { type: 'list', items: [
        '在同一个对齐上下文中(如同一 flex 行、同一 grid 行/列)',
        '基线对齐偏好兼容(baseline preference compatible)'
      ] },
      { type: 'paragraph', text: '**基线对齐偏好兼容**的条件:' },
      { type: 'list', items: [
        '相同 block flow direction(块流方向) + 相同 baseline preference(first/last)',
        '或:相反 block flow direction + 相反 baseline preference'
      ] },
      { type: 'tip', text: '在普通水平布局中,你不需要担心这些复杂规则——所有项目默认就是兼容的。这些规则主要影响混合了不同书写模式(如横排和竖排文本)的复杂布局。' },

      { type: 'heading', text: '基线对齐算法(简化版)' },
      { type: 'paragraph', text: '浏览器执行基线对齐的步骤(简化):' },
      { type: 'list', ordered: true, items: [
        '**生成基线表**:从对齐上下文的首个可用字体生成一组标准基线(alphabetic、ideographic 等)',
        '**确定每个主体的基线**:读取每个盒子的 first/last baseline set,提取对齐基线',
        '**对齐到基线表**:调整每个盒子的位置,使其对齐基线与基线表中的对应基线重合',
        '**应用 fallback alignment**:如果对齐失败(如盒子没有基线),使用回退对齐(通常是 `start`)',
        '**分配剩余空间**:如果是 `align-content: baseline`,在所有基线对齐后分配容器的剩余空间'
      ] },

      { type: 'heading', text: '滚动容器的特殊规则' },
      { type: 'paragraph', text: '块容器如果是**滚动容器**(即有 `overflow: scroll/auto` 且内容溢出)且 `baseline-source: auto`,它始终具有 **last baseline set**,位于 **block-end margin edge**(块结束方向的外边距边界)。这确保滚动容器可以参与基线对齐,即使内部内容滚动了也不影响对齐。' },
      { type: 'warning', text: '计算基线时,滚动容器必须**视为处于初始滚动位置**(scrollTop/scrollLeft = 0)。这意味着基线位置不受当前滚动状态影响,保持稳定。' },

      { type: 'heading', text: '表格的基线' },
      { type: 'paragraph', text: '表格元素的基线确定规则:' },
      { type: 'list', items: [
        '**表格**:first baseline 取自首行,last baseline 取自末行',
        '**表格行**:如果行内有单元格参与基线对齐,使用这些单元格的共享基线;否则从首个/末个单元格的内容边缘合成',
        '**表格单元格**:基线取自内部首个/末个行盒或块级元素'
      ] },
      { type: 'tip', text: '表格的基线规则让表格可以和周围的行内内容正确对齐。这在表单布局中特别有用:表格形式的输入控件组可以和标签文字基线对齐。' },

      { type: 'heading', text: '书写模式的影响' },
      { type: 'paragraph', text: '当 `writing-mode` 与对齐轴平行时(如垂直书写模式中的垂直对齐),基线的"上下"方向变得模糊。这时浏览器需要**假设一个轴兼容的书写模式**来确定合成基线的 line-under 和 line-over 边。' },
      { type: 'paragraph', text: '实践中这些复杂情况很少遇到。大多数网站使用水平书写模式,基线对齐就是"文字底部对齐",直观且可预测。' },

      { type: 'heading', text: '何时使用基线对齐?' },
      { type: 'paragraph', text: '基线对齐最适合以下场景:' },
      { type: 'list', items: [
        '**不同字号的文本**:标题和副标题、价格和货币符号、上标下标',
        '**图标和文字混排**:小图标需要和周围文字"视觉对齐"',
        '**表单布局**:标签和输入框、按钮和文字',
        '**卡片标题行**:多个不同高度的元素需要底部对齐'
      ] },
      { type: 'example', title: '基线对齐的典型应用', lang: 'html', code: `<!-- 价格展示 -->\n<div style="display: flex; align-items: baseline; gap: 4px;">\n  <span style="font-size: 14px; color: gray;">¥</span>\n  <span style="font-size: 32px; font-weight: bold;">199</span>\n  <span style="font-size: 14px; color: gray;">/月</span>\n</div>\n\n<!-- 图标和文字 -->\n<button style="display: inline-flex; align-items: baseline; gap: 6px;">\n  <svg style="width: 16px; height: 16px;">...</svg>\n  <span>下载</span>\n</button>`, explanation: '基线对齐让不同字号的元素"自然地"排列在一起,文字底部在视觉上对齐。这比 `align-items: center` 更和谐,因为它尊重文字的排版基线。' },

      { type: 'warning', text: '基线对齐的计算成本相对较高(需要读取字体信息、确定基线集),在包含大量项目的列表中可能影响性能。如果对齐要求不严格,`align-items: center` 是更高效的选择。' },
    ] as TutorialBlock[],
  },
  {
    id: 'intrinsic-sizing',
    number: '5',
    title: { zh: '内在尺寸', en: 'Intrinsic Sizing' },
    summary: { zh: 'CSS3 引入了基于内容的尺寸关键字和宽高比控制，使得响应式设计更加灵活和强大。', en: 'CSS3 introduced content-based sizing keywords and aspect ratio control, making responsive design more flexible and powerful.' },
    keyPoints: [
      'min-content: 不溢出的最小可能尺寸',
      'max-content: 不换行时的尺寸',
      'fit-content: 在 min-content 和 max-content 之间智能选择',
      'aspect-ratio: 定义元素的首选宽高比',
      'box-sizing: 控制 width/height 是否包含 padding 和 border',
      'fit-content(<length>) 函数与 fit-content 关键字不同：函数接受上限参数 clamp(min-content, stretch, <length>)',
      'CSS Sizing 4 引入 stretch 关键字，使元素填充可用空间（替代旧有的 -webkit-fill-available）',
      'contain-intrinsic-size 为 content-visibility: auto 元素提供占位尺寸，避免布局偏移',
      'Flex/Grid 项目中 auto 的 min-width/min-height 使用基于内容的最小尺寸，可通过 min-width: 0 覆盖',
      'aspect-ratio 与 auto 组合时(auto <ratio>)，替换元素优先使用固有比例，仅在无固有比例时回退',
    ],
    tutorial: [
      { type: 'heading', text: '内在尺寸 vs 外在尺寸' },
      { type: 'paragraph', text: 'CSS 尺寸计算可以分为两大类:**外在尺寸**(extrinsic sizing)由外部因素决定,如容器宽度、显式的 `width` 值;**内在尺寸**(intrinsic sizing)由元素内容本身决定,不考虑外部约束。传统 CSS 主要依赖外在尺寸,CSS3 引入的内在尺寸关键字让布局更加灵活和内容驱动。' },
      { type: 'paragraph', text: '内在尺寸的核心思想:**让元素的尺寸适应内容,而不是强制内容适应固定尺寸**。这在响应式设计、组件化开发和国际化场景中特别有价值。' },

      { type: 'heading', text: 'min-content:最小内容宽度' },
      { type: 'paragraph', text: '`width: min-content` 让元素收缩到**不会导致内容溢出的最小宽度**。对于文本,这意味着宽度等于最长单词/URL/不可折行内容的宽度;对于其他内容,是内容本身的最小尺寸。' },
      { type: 'code', lang: 'css', caption: 'min-content 的表现', code: `.min {\n  width: min-content;\n}\n\n/* 示例内容:\n"Hello world this-is-a-very-long-word end"\n\nmin-content 宽度 = "this-is-a-very-long-word" 的宽度\n文本会在空格处换行:\n  Hello world\n  this-is-a-very-long-word\n  end\n*/` },
      { type: 'example', title: 'min-content 的实际应用', lang: 'html', code: `<!-- 紧凑的按钮,宽度刚好包裹文字 -->\n<button style="width: min-content; padding: 8px 16px;">\n  提交\n</button>\n\n<!-- 卡片宽度由最宽内容决定 -->\n<div style="width: min-content; border: 1px solid; padding: 16px;">\n  <h3>标题</h3>\n  <p>短文本</p>\n  <img src="wide-image.jpg" style="max-width: 100%;">\n  <!-- 宽度 = 图片的宽度(如果是最宽的内容) -->\n</div>`, explanation: '`min-content` 让元素尽可能窄,但保证内容不溢出。文本会在所有可能的换行点换行,图片等替换元素使用其固有宽度。这在实现"内容驱动宽度"的紧凑布局时很有用。' },
      { type: 'tip', text: '`min-content` 常用于按钮、标签、徽章等需要"包裹文字"的组件。它比固定宽度更灵活,能适应不同语言的文本长度。' },

      { type: 'heading', text: 'max-content:最大内容宽度' },
      { type: 'paragraph', text: '`width: max-content` 让元素扩展到**内容完全不换行时的宽度**。对于文本,就是把所有文本排成一行的宽度;对于其他内容,是内容的首选尺寸。' },
      { type: 'code', lang: 'css', caption: 'max-content 的表现', code: `.max {\n  width: max-content;\n}\n\n/* 示例内容:\n"Hello world this is a long sentence"\n\nmax-content 宽度 = 整句话不换行的宽度\n文本不会换行:\n  Hello world this is a long sentence\n*/` },
      { type: 'example', title: 'max-content 的实际应用', lang: 'html', code: `<!-- 表格列宽由最长内容决定 -->\n<table>\n  <tr>\n    <td style="width: max-content;">姓名</td>\n    <td style="width: max-content;">这是一个很长的表头标题</td>\n  </tr>\n  <!-- 第二列宽度 = "这是一个很长的表头标题" 的宽度 -->\n</table>\n\n<!-- 下拉菜单宽度由最长选项决定 -->\n<select style="width: max-content;">\n  <option>短</option>\n  <option>这是一个非常非常长的选项</option>\n</select>`, explanation: '`max-content` 让元素扩展到足以容纳最宽内容且不换行的宽度。这在表格、下拉菜单、代码块等场景中很有用——让宽度由内容决定,而不是固定值。' },
      { type: 'warning', text: '`max-content` 可能导致元素非常宽,甚至溢出容器。在响应式布局中使用时,建议配合 `max-width` 约束:`width: max-content; max-width: 100%;`。' },

      { type: 'heading', text: 'fit-content:智能适应' },
      { type: 'paragraph', text: '`width: fit-content` 是 `min-content` 和 `max-content` 之间的智能折中:如果可用空间足够,使用 `max-content` 宽度(不换行);如果空间不足,收缩到可用空间,允许换行;但永远不小于 `min-content`。' },
      { type: 'code', lang: 'text', caption: 'fit-content 的计算公式', code: `fit-content = min(max-content, max(min-content, 可用空间))` },
      { type: 'example', title: 'fit-content 的响应式表现', lang: 'html', code: `<!-- 宽容器 (1000px) -->\n<div style="width: 1000px;">\n  <div style="width: fit-content; border: 1px solid;">\n    这段文字不太长\n    <!-- 宽度 = max-content ≈ 100px (不换行) -->\n  </div>\n</div>\n\n<!-- 窄容器 (200px) -->\n<div style="width: 200px;">\n  <div style="width: fit-content; border: 1px solid;">\n    这段文字不太长\n    <!-- 宽度 = 200px (可用空间),文字可能换行 -->\n  </div>\n</div>`, explanation: '`fit-content` 的核心优势:**自适应容器宽度,既不浪费空间也不强制换行**。宽屏时内容横向排列,窄屏时自动换行,无需媒体查询。' },
      { type: 'tip', text: '`width: fit-content; margin: 0 auto;` 是实现"内容宽度居中"的现代方案,无需知道内容的具体宽度。这在卡片、对话框、导航菜单等组件中非常实用。' },

      { type: 'heading', text: 'fit-content() 函数:带上限的 fit-content' },
      { type: 'paragraph', text: 'CSS Sizing 4 引入了 `fit-content(<length>)` 函数(注意有括号),与关键字 `fit-content` 不同。它允许你指定一个**上限**,宽度不会超过这个值。' },
      { type: 'code', lang: 'css', caption: 'fit-content 关键字 vs 函数', code: `/* 关键字:上限是可用空间 */\n.keyword {\n  width: fit-content;  /* = min(max-content, 可用空间) */\n}\n\n/* 函数:上限是指定值 */\n.function {\n  width: fit-content(500px);  /* = min(max-content, 500px) */\n  /* 等价于: clamp(min-content, max-content, 500px) */\n}` },
      { type: 'example', title: '响应式卡片宽度', lang: 'css', code: `.card {\n  width: fit-content(600px);\n  margin: 0 auto;\n  /* 内容少时:包裹内容\n     内容多时:最多 600px 宽\n     窄屏时:不超过可用空间\n  */\n}`, explanation: '`fit-content(600px)` 让卡片在内容少时自动收缩,内容多时最多 600px 宽,且永远不会溢出容器。这比固定 `width: 600px` 更灵活。' },

      { type: 'heading', text: 'aspect-ratio:宽高比控制' },
      { type: 'paragraph', text: '`aspect-ratio` 属性让你为元素定义**首选宽高比**。当只指定宽度或高度时,另一个维度会自动根据宽高比计算。这对于响应式媒体、占位符、网格布局非常有用。' },
      { type: 'code', lang: 'css', caption: 'aspect-ratio 的用法', code: `/* 16:9 视频容器 */\n.video-container {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  /* 高度自动 = 宽度 ÷ (16/9) */\n}\n\n/* 正方形头像 */\n.avatar {\n  width: 100px;\n  aspect-ratio: 1;  /* 简写:1 / 1 */\n  /* 高度 = 100px */\n}\n\n/* 4:3 图片占位符 */\n.placeholder {\n  aspect-ratio: 4 / 3;\n  background: lightgray;\n  /* width 和 height 都是 auto 时,\n     aspect-ratio 也会影响尺寸计算 */\n}` },
      { type: 'example', title: '防止布局偏移(CLS)', lang: 'html', code: `<!-- ❌ 旧方法:图片加载前高度为 0,加载后跳动 -->\n<img src="large-photo.jpg">\n\n<!-- ✅ 新方法:提前声明宽高比,预留空间 -->\n<img src="large-photo.jpg" style="width: 100%; aspect-ratio: 16 / 9;">\n<!-- 图片加载前就有正确的高度占位,不会跳动 -->`, explanation: '`aspect-ratio` 可以有效防止**累积布局偏移**(Cumulative Layout Shift, CLS)——这是 Core Web Vitals 的重要指标。提前声明宽高比,浏览器在图片加载前就能预留正确的空间。' },
      { type: 'tip', text: '`aspect-ratio` 与 `width`/`height` 的优先级:**明确的 width 和 height 同时存在时,aspect-ratio 被忽略**;只有其中一个明确时,另一个根据比例计算;两者都是 auto 时,aspect-ratio 提供默认比例。' },

      { type: 'heading', text: 'aspect-ratio 的 auto 关键字' },
      { type: 'paragraph', text: '替换元素(如 `<img>`)有**固有宽高比**(来自图片文件本身)。`aspect-ratio: auto` 让元素优先使用固有比例,`aspect-ratio: auto 16/9` 让元素优先使用固有比例,只有在没有固有比例时才回退到 16/9。' },
      { type: 'code', lang: 'css', caption: 'auto 关键字的行为', code: `img {\n  width: 100%;\n  aspect-ratio: auto;     /* 默认:使用图片的固有比例 */\n}\n\nimg {\n  width: 100%;\n  aspect-ratio: 16 / 9;   /* 强制 16:9,忽略图片原始比例(可能变形) */\n}\n\nimg {\n  aspect-ratio: auto 16 / 9;\n  /* 有固有比例 → 使用固有比例\n     无固有比例 → 使用 16/9 */\n}` },

      { type: 'heading', text: 'box-sizing:改变盒模型' },
      { type: 'paragraph', text: '`box-sizing` 控制 `width` 和 `height` 是否包含 `padding` 和 `border`。默认值 `content-box` 只设置内容区域的尺寸,`border-box` 设置包括 padding 和 border 的总尺寸。' },
      { type: 'code', lang: 'css', caption: 'box-sizing 的两个值', code: `/* content-box (默认) */\n.content-box {\n  box-sizing: content-box;\n  width: 200px;\n  padding: 20px;\n  border: 5px solid;\n  /* 内容区域 = 200px\n     总宽度 = 200 + 20×2 + 5×2 = 250px */\n}\n\n/* border-box */\n.border-box {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 20px;\n  border: 5px solid;\n  /* 总宽度 = 200px\n     内容区域 = 200 - 20×2 - 5×2 = 150px */\n}` },
      { type: 'example', title: '为什么 border-box 更实用?', lang: 'css', code: `/* ❌ content-box:宽度计算困难 */\n.input-old {\n  width: 100%;      /* 100% 是内容宽度 */\n  padding: 10px;    /* padding 额外增加 */\n  border: 1px solid;\n  /* 总宽度 > 100%,溢出容器! */\n}\n\n/* ✅ border-box:宽度直观可控 */\n.input-new {\n  box-sizing: border-box;\n  width: 100%;      /* 100% 是总宽度,包括 padding 和 border */\n  padding: 10px;\n  border: 1px solid;\n  /* 总宽度 = 100%,不溢出 */\n}`, explanation: '`border-box` 让尺寸计算更符合直觉:**你设置的 width 就是元素的总宽度**,不用心算 padding 和 border。这在表单控件、网格布局中特别有用。' },
      { type: 'tip', text: '现代 CSS 重置样式通常包含 `*, *::before, *::after { box-sizing: border-box; }`,让所有元素都使用 `border-box`。这是目前的最佳实践。' },

      { type: 'heading', text: 'stretch:填充可用空间' },
      { type: 'paragraph', text: 'CSS Sizing 4 引入了 `stretch` 关键字,让元素**填充可用空间**(除去 margin)。它替代了非标准的 `-webkit-fill-available`,语义更清晰。' },
      { type: 'code', lang: 'css', caption: 'stretch 的用法', code: `/* 让绝对定位元素填充包含块 */\n.fullscreen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: stretch;   /* 等同于旧的 width: 100% */\n  height: stretch;\n  /* 但比百分比更明确:我要填充空间,不是"相对于包含块的 100%" */\n}\n\n/* Grid 项目填充网格单元格 */\n.grid-item {\n  width: stretch;  /* 填充单元格宽度 */\n  justify-self: stretch;  /* 等价效果 */\n}` },
      { type: 'warning', text: '`stretch` 目前浏览器支持尚不完善。实践中仍然使用传统方法(flexbox 的 `flex: 1`、grid 的 `align-self: stretch`、百分比等)来实现填充效果。' },

      { type: 'heading', text: 'contain-intrinsic-size:虚拟化占位' },
      { type: 'paragraph', text: '当元素使用 `content-visibility: auto` 实现虚拟化(屏幕外内容不渲染)时,浏览器不知道元素的实际高度。`contain-intrinsic-size` 提供一个**占位尺寸**,避免滚动条跳动和布局偏移。' },
      { type: 'code', lang: 'css', caption: 'contain-intrinsic-size 用法', code: `.virtual-item {\n  content-visibility: auto;  /* 屏幕外不渲染 */\n  contain-intrinsic-size: 300px;  /* 占位高度 */\n  /* 浏览器用 300px 计算滚动条和布局,\n     实际渲染时才知道真实高度 */\n}\n\n/* 也可以分别设置宽高 */\n.virtual-item-2 {\n  content-visibility: auto;\n  contain-intrinsic-width: 200px;\n  contain-intrinsic-height: 150px;\n}` },
      { type: 'tip', text: '`contain-intrinsic-size` 是性能优化工具,用于长列表、信息流等场景。占位尺寸应该接近真实尺寸的平均值,以减少布局偏移。' },

      { type: 'heading', text: 'Flex/Grid 中的自动最小尺寸' },
      { type: 'paragraph', text: 'Flex 和 Grid 项目的 `min-width: auto` 和 `min-height: auto` 有特殊行为:**默认等于基于内容的最小尺寸**,而不是 `0`。这防止项目被压缩到无法显示内容,但也可能导致溢出。' },
      { type: 'example', title: 'Flex 项目的 min-width: auto 陷阱', lang: 'css', code: `/* 问题:flex 项目不收缩,溢出容器 */\n.container {\n  display: flex;\n  width: 300px;\n}\n\n.item {\n  flex: 1;  /* flex-shrink: 1,理论上应该收缩 */\n  /* 但 min-width: auto (默认) = 内容最小宽度\n     如果内容是长 URL/单词,项目不会收缩到小于这个宽度 */\n}\n\n/* 解决方案:显式设置 min-width: 0 */\n.item-fixed {\n  flex: 1;\n  min-width: 0;  /* 允许收缩到 0 */\n  overflow: hidden;  /* 或 auto,处理溢出内容 */\n}`, explanation: '这是 Flex 布局中**排名第一的 bug 来源**。症状:flex 项目不收缩、内容溢出。解决方案:**显式设置 `min-width: 0`**(允许无限收缩)或 `overflow: hidden/auto`(建立新 BFC,裁剪溢出)。' },

      { type: 'heading', text: '内在尺寸的浏览器支持' },
      { type: 'paragraph', text: '内在尺寸关键字的浏览器支持情况(2024):' },
      { type: 'list', items: [
        '**min-content, max-content, fit-content**:现代浏览器全面支持,包括 Chrome、Firefox、Safari',
        '**aspect-ratio**:所有现代浏览器支持(Chrome 88+, Firefox 89+, Safari 15+)',
        '**fit-content() 函数**:Chrome 115+, Firefox 94+, Safari 17+',
        '**stretch 关键字**:部分支持,仍在标准化中,建议用回退方案',
        '**contain-intrinsic-size**:Chrome 83+, Firefox 107+, Safari 17+'
      ] },
      { type: 'tip', text: '内在尺寸关键字在现代浏览器中已经非常成熟,可以放心使用。对于需要支持旧浏览器的项目,提供回退方案:`width: 100%; width: fit-content;`(不支持的浏览器会忽略第二个声明)。' },
    ] as TutorialBlock[],
  },
];

// 保留原始详细内容作为注释或未来使用
/*
旧版详细内容结构（已废弃）:
  {
    id: 'containing-block',
    title: '包含块',
    titleEn: 'Containing Block Definition',
    content: `
*/

export const anchors: Record<string, string> = {
  'containing-block-details': 'containing-block',
  'Computing_widths_and_margins': 'width-calculation',
  'Computing_heights_and_margins': 'height-calculation',
  'the-width-property': 'width-calculation',
  'the-height-property': 'height-calculation',
  'min-max-widths': 'width-calculation',
  'min-max-heights': 'height-calculation',
  'line-height': 'height-calculation',
  'propdef-width': 'width-calculation',
  'propdef-height': 'height-calculation',
  'propdef-min-width': 'width-calculation',
  'propdef-max-width': 'width-calculation',
  'propdef-min-height': 'height-calculation',
  'propdef-max-height': 'height-calculation',
  'propdef-line-height': 'height-calculation',
  'baseline-rules': 'baseline-alignment',
  'flex-baselines': 'baseline-alignment',
  'baseline-export': 'baseline-alignment',
  'baseline-terms': 'baseline-alignment',
  'align-by-baseline': 'baseline-alignment',
  'synthesize-baseline': 'baseline-alignment',
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'containing block': {
    zh: '包含块',
    description:
      '包含块是用于计算元素尺寸和位置的参照矩形区域。包含块的确定规则取决于元素的定位方式：static 和 relative 定位元素的包含块是最近块级祖先的内容区域；absolute 定位元素的包含块是最近非 static 定位祖先的内边距区域；fixed 定位元素的包含块是视口。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#containing-block-details',
    sectionRef: 'sizing#containing-block',
  },
  'intrinsic size': {
    zh: '内在尺寸',
    description:
      '内在尺寸是元素基于其内容的自然尺寸，不考虑外部约束。CSS3 引入了 min-content（不溢出的最小尺寸）、max-content（不换行时的尺寸）和 fit-content（两者之间的智能折中）等关键字来表示不同类型的内在尺寸。',
    specUrl: 'https://www.w3.org/TR/css-sizing-3/#intrinsic-sizes',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'extrinsic size': {
    zh: '外在尺寸',
    description:
      '外在尺寸是由外部因素决定的元素尺寸，而非元素的内容。外部因素包括包含块的尺寸、显式的 width/height 值、min-width/max-width 约束等。外在尺寸与内在尺寸相对，两者共同决定元素的最终尺寸。',
    specUrl: 'https://www.w3.org/TR/css-sizing-3/#extrinsic-sizes',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'auto sizing': {
    zh: '自动尺寸',
    description:
      '自动尺寸是指 width 或 height 属性值为 auto 时的尺寸计算行为。auto 的具体行为取决于元素类型和布局上下文：对于块级元素，auto 宽度会填充包含块；auto 高度会适应内容。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#the-width-property',
    sectionRef: 'sizing#width-calculation',
  },
  'aspect ratio': {
    zh: '宽高比',
    description:
      '宽高比是元素宽度与高度的比例关系。CSS3 引入了 aspect-ratio 属性来为元素定义首选的宽高比。当只指定一个维度时，另一个维度会根据宽高比自动计算，这对于响应式媒体内容和防止布局偏移（CLS）非常有用。',
    specUrl: 'https://www.w3.org/TR/css-sizing-4/#aspect-ratio',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'box alignment': {
    zh: '盒对齐',
    description:
      '盒对齐是 CSS Box Alignment Module Level 3 提供的一套统一的对齐属性系统，适用于 Flexbox、Grid、Block 和 Table 等多种布局模式。核心属性包括：justify-content（主轴分布）、align-items（交叉轴对齐）、align-self（单个元素对齐）、align-content（多行分布）。',
    specUrl: 'https://www.w3.org/TR/css-align-3/',
    sectionRef: 'sizing#alignment',
  },
  'definite': {
    zh: '确定的',
    description:
      '尺寸值已确定(非 auto、非内容依赖)的状态。确定尺寸可以直接计算,无需依赖内容或布局。',
    sectionRef: 'sizing#sizing-model',
  },
  'content-based minimum size': {
    zh: '基于内容的最小尺寸',
    description:
      'Flex/Grid 项目的自动最小尺寸,确保项目不会缩小到无法显示其内容。可通过 min-width: 0 覆盖。',
    sectionRef: 'sizing#sizing-model',
  },
  'specified size suggestion': {
    zh: '指定尺寸建议',
    description:
      '尺寸算法中由 width/height 属性显式指定的目标尺寸。在 Flex/Grid 布局中作为弹性计算的参考输入。',
    sectionRef: 'sizing#sizing-model',
  },
  'transferred size suggestion': {
    zh: '传递尺寸建议',
    description:
      '通过宽高比(aspect-ratio)从另一轴传递过来的尺寸建议。用于保持元素的固有比例。',
    sectionRef: 'sizing#sizing-model',
  },
  'content size suggestion': {
    zh: '内容尺寸建议',
    description:
      '由元素内容本身决定的尺寸建议,即 min-content 或 max-content 尺寸。',
    sectionRef: 'sizing#sizing-model',
  },
  'stretch': {
    zh: '拉伸',
    description:
      '对齐属性的值之一。使项目在交叉轴方向拉伸填满容器(减去 margin)。Flexbox 交叉轴的默认对齐方式。',
    sectionRef: 'sizing#sizing-model',
  },
  'initial containing block': {
    zh: '初始包含块',
    description:
      '根元素所在的包含块，对于连续媒体其尺寸等于视口，锚定在画布原点；对于分页媒体则为页面区域。其 direction 属性与根元素相同。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#containing-block-details',
    sectionRef: 'sizing#containing-block',
  },
  'line box': {
    zh: '行盒',
    description:
      '行内格式化上下文中用于容纳行内级盒子的矩形区域。行盒的高度由其包含的最高和最低盒子的边界决定，宽度由包含块决定但可能因浮动而缩短。',
    css2Url: 'https://www.w3.org/TR/CSS22/visuren.html#line-box',
    sectionRef: 'sizing#height-calculation',
  },
  'vertical-align': {
    zh: '垂直对齐',
    description:
      '控制行内级元素或表格单元格内容在垂直方向的对齐方式。行内元素中影响元素在行盒内的垂直定位，支持 baseline、middle、sub、super、top、bottom 等值。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-vertical-align',
    sectionRef: 'sizing#height-calculation',
  },
  'baseline': {
    zh: '基线',
    description:
      '字体中用于对齐字形的参考线。CSS 对齐中，基线对齐使同一对齐上下文中的多个盒子按其基线对齐。每个盒子有 first baseline set 和 last baseline set。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#baseline-values',
    sectionRef: 'sizing#alignment',
  },
  'synthesized baseline': {
    zh: '合成基线',
    description:
      '当盒子参与基线对齐但没有自然基线集时，按照其格式化上下文的规则合成基线。合成规则：从矩形的 line-under 边生成 alphabetic baseline，取两条边的平均位置生成 central baseline。不同上下文使用不同的边缘：行内级盒使用 margin edge，表格单元格使用 content edge，flex/grid 项使用 border edge。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#synthesize-baseline',
    sectionRef: 'sizing#baseline-alignment',
  },
  'first baseline set': {
    zh: '首基线集',
    description:
      '盒子在给定轴上的第一组基线，对应盒子内首行文本的基线集。块容器取自首个流内行盒或块级子元素的基线集；Flex 容器取自首条 flex 行中参与基线对齐的项；表格取自首行。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#first-baseline-set',
    sectionRef: 'sizing#baseline-alignment',
  },
  'last baseline set': {
    zh: '末基线集',
    description:
      '盒子在给定轴上的最后一组基线，对应盒子内末行文本的基线集。与 first baseline set 对称，取自末尾的行盒/子元素/flex 行/表格行。滚动容器在 baseline-source: auto 时始终拥有 last baseline set，位于 block-end margin edge。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#last-baseline-set',
    sectionRef: 'sizing#baseline-alignment',
  },
  'baseline-sharing group': {
    zh: '基线共享组',
    description:
      '一组共同参与基线对齐的盒子。成员必须共享对齐上下文(如同一 flex 行、同一 grid 行/列、同一表格行)，且基线对齐偏好兼容。兼容条件：相同 block flow direction + 相同偏好，或相反 block flow direction + 相反偏好。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#baseline-sharing-group',
    sectionRef: 'sizing#baseline-alignment',
  },
  'baseline participation': {
    zh: '基线参与',
    description:
      'Flex 项的 align-self 值为 baseline 时，该项"参与基线对齐"。参与基线对齐的项会与同一 flex 行中的其他基线参与项组成基线共享组，按其共享对齐基线进行对齐。这影响 flex 容器自身基线集的确定。',
    specUrl: 'https://www.w3.org/TR/css-flexbox-1/#baseline-participation',
    sectionRef: 'sizing#baseline-alignment',
  },
  'alignment baseline': {
    zh: '对齐基线',
    description:
      '基线集中实际用于对齐的那条基线。通常是共享对齐上下文的 dominant baseline（由 dominant-baseline 属性控制）。可通过 alignment-baseline 属性指定使用基线集中的其他基线。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#alignment-baseline',
    sectionRef: 'sizing#baseline-alignment',
  },
  'replaced element': {
    zh: '替换元素',
    description:
      '内容不由 CSS 格式化模型直接渲染的元素，如 img、video、iframe 等。替换元素通常具有固有尺寸(固有宽度、固有高度和/或固有比例)，用于确定其默认大小。',
    css2Url: 'https://www.w3.org/TR/CSS22/conform.html#replaced-element',
    sectionRef: 'sizing#width-calculation',
  },
  'shrink-to-fit': {
    zh: '收缩适应',
    description:
      'CSS2 中浮动、inline-block 和某些绝对定位元素在 width: auto 时使用的宽度算法。公式为 min(max(首选最小宽度, 可用宽度), 首选宽度)，类似于自动表格布局算法。',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#float-width',
    sectionRef: 'sizing#width-calculation',
  },
  'gap': {
    zh: '间距',
    description:
      'gap 属性(及其子属性 row-gap/column-gap)用于在多列、Flex 和 Grid 容器中指定项目之间的固定间距。间距表现为项目间的最小空间，额外空间可通过 justify-content/align-content 增加。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#gaps',
    sectionRef: 'sizing#alignment',
  },
  'safe alignment': {
    zh: '安全对齐',
    description:
      '溢出对齐模式之一。当对齐主体溢出对齐容器时，safe 将对齐方式回退为 flex-start（等同于 start），避免内容被裁剪到不可滚动区域。与 unsafe 相对，后者严格遵循指定对齐。',
    specUrl: 'https://www.w3.org/TR/css-align-3/#overflow-values',
    sectionRef: 'sizing#alignment',
  },
  'stretch fit': {
    zh: '拉伸适应',
    description:
      'CSS Sizing 4 引入的 stretch 关键字尺寸行为，使元素的尺寸填充其包含块的可用空间(减去 margin/border/padding)。替代了非标准的 -webkit-fill-available。',
    specUrl: 'https://www.w3.org/TR/css-sizing-4/#stretch-fit-sizing',
    sectionRef: 'sizing#intrinsic-sizing',
  },
};

export const propertyTerms: Record<string, PropertyEntry> = {
  width: {
    zh: '宽度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格行、行组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-width',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-width',
    sectionRef: 'sizing#width-calculation',
  },
  height: {
    zh: '高度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格列、列组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的高度（如果包含块高度不明确，则视为 auto）',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-height',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-height',
    sectionRef: 'sizing#height-calculation',
  },
  'min-width': {
    zh: '最小宽度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格行、行组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-widths',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-min-width',
    sectionRef: 'sizing#width-calculation',
  },
  'max-width': {
    zh: '最大宽度',
    value: '<length> | <percentage> | none | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'none',
    appliesTo: '除行内非替换元素、表格行、行组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的宽度',
    computedValue: '百分比、none 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-widths',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-max-width',
    sectionRef: 'sizing#width-calculation',
  },
  'min-height': {
    zh: '最小高度',
    value: '<length> | <percentage> | auto | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'auto',
    appliesTo: '除行内非替换元素、表格列、列组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的高度（如果包含块高度不明确，则视为 auto）',
    computedValue: '百分比、auto 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-heights',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-min-height',
    sectionRef: 'sizing#height-calculation',
  },
  'max-height': {
    zh: '最大高度',
    value: '<length> | <percentage> | none | min-content | max-content | fit-content(<length-percentage>)',
    initial: 'none',
    appliesTo: '除行内非替换元素、表格列、列组外的所有元素',
    inherited: false,
    percentages: '相对于包含块的高度（如果包含块高度不明确，则视为 none）',
    computedValue: '百分比、none 或绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#min-max-heights',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#propdef-max-height',
    sectionRef: 'sizing#height-calculation',
  },
  'aspect-ratio': {
    zh: '宽高比',
    value: 'auto | <ratio> | auto <ratio>',
    initial: 'auto',
    appliesTo: '除行内非替换元素和内部 ruby 或表格盒外的所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定的关键字或 <ratio>',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-sizing-4/#aspect-ratio',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'align-self': {
    zh: '自身对齐',
    value: 'auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>',
    initial: 'auto',
    appliesTo: 'flex 项、grid 项和绝对定位盒',
    inherited: false,
    percentages: null,
    computedValue: 'auto 计算为父元素的 align-items 值；其他值按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#align-self-property',
    sectionRef: 'sizing#alignment',
  },
  'align-content': {
    zh: '内容对齐',
    value: 'normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>',
    initial: 'normal',
    appliesTo: '块级容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#align-content-property',
    sectionRef: 'sizing#alignment',
  },
  'place-items': {
    zh: '放置项',
    value: '<align-items> <justify-items>?',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#place-items-property',
    sectionRef: 'sizing#alignment',
  },
  'place-content': {
    zh: '放置内容',
    value: '<align-content> <justify-content>?',
    initial: 'normal',
    appliesTo: '块级容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html',
    css3Url: 'https://www.w3.org/TR/css-align-3/#place-content-property',
    sectionRef: 'sizing#alignment',
  },
  'box-sizing': {
    zh: '盒尺寸',
    value: 'content-box | border-box',
    initial: 'content-box',
    appliesTo: '接受 width 或 height 的所有元素',
    inherited: false,
    percentages: null,
    computedValue: '按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/box.html',
    css3Url: 'https://www.w3.org/TR/css-sizing-3/#box-sizing',
    sectionRef: 'sizing#intrinsic-sizing',
  },
  'line-height': {
    zh: '行高',
    value: 'normal | <number> | <length> | <percentage>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: true,
    percentages: '相对于元素自身的字体大小',
    computedValue: '<length> 和 <percentage> 为绝对值；其他按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-line-height',
    sectionRef: 'sizing#height-calculation',
  },
  'vertical-align': {
    zh: '垂直对齐',
    value: 'baseline | sub | super | top | text-top | middle | bottom | text-bottom | <percentage> | <length>',
    initial: 'baseline',
    appliesTo: '行内级元素和表格单元格元素',
    inherited: false,
    percentages: '相对于元素自身的 line-height',
    computedValue: '<percentage> 和 <length> 为绝对值；其他按指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/visudet.html#propdef-vertical-align',
    sectionRef: 'sizing#height-calculation',
  },
  'justify-content': {
    zh: '主轴内容对齐',
    value: 'normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]',
    initial: 'normal',
    appliesTo: '多列容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '按指定关键字',
    css2Url: 'https://www.w3.org/TR/css-align-3/#justify-content-property',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-justify-content',
    sectionRef: 'sizing#alignment',
  },
  'align-items': {
    zh: '项目对齐',
    value: 'normal | stretch | <baseline-position> | <overflow-position>? <self-position>',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '按指定关键字',
    css2Url: 'https://www.w3.org/TR/css-align-3/#align-items-property',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-align-items',
    sectionRef: 'sizing#alignment',
  },
  'justify-self': {
    zh: '自身主轴对齐',
    value: 'auto | <overflow-position>? [ normal | <self-position> | left | right ] | stretch | <baseline-position>',
    initial: 'auto',
    appliesTo: '块级盒、绝对定位盒和 grid 项',
    inherited: false,
    percentages: null,
    computedValue: '按指定关键字',
    css2Url: 'https://www.w3.org/TR/css-align-3/#justify-self-property',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-justify-self',
    sectionRef: 'sizing#alignment',
  },
  'justify-items': {
    zh: '项目主轴对齐',
    value: 'normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]',
    initial: 'legacy',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '按指定关键字（legacy 见规范）',
    css2Url: 'https://www.w3.org/TR/css-align-3/#justify-items-property',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-justify-items',
    sectionRef: 'sizing#alignment',
  },
  'gap': {
    zh: '间距',
    value: "<'row-gap'> <'column-gap'>?",
    initial: '见各子属性',
    appliesTo: '多列容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: '相对于内容区域对应维度',
    computedValue: '见各子属性',
    css2Url: 'https://www.w3.org/TR/css-align-3/#gap-shorthand',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-gap',
    sectionRef: 'sizing#alignment',
  },
  'row-gap': {
    zh: '行间距',
    value: 'normal | <length-percentage [0,∞]>',
    initial: 'normal',
    appliesTo: '多列容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: '相对于内容区域对应维度',
    computedValue: '指定关键字或计算后的 <length-percentage>',
    css2Url: 'https://www.w3.org/TR/css-align-3/#column-row-gap',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-row-gap',
    sectionRef: 'sizing#alignment',
  },
  'column-gap': {
    zh: '列间距',
    value: 'normal | <length-percentage [0,∞]>',
    initial: 'normal',
    appliesTo: '多列容器、flex 容器和 grid 容器',
    inherited: false,
    percentages: '相对于内容区域对应维度',
    computedValue: '指定关键字或计算后的 <length-percentage>',
    css2Url: 'https://www.w3.org/TR/css-align-3/#column-row-gap',
    css3Url: 'https://www.w3.org/TR/css-align-3/#propdef-column-gap',
    sectionRef: 'sizing#alignment',
  },
};
