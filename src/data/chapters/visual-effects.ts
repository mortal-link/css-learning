import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

const CSS22 = 'https://www.w3.org/TR/CSS22';
const MASKING = 'https://www.w3.org/TR/css-masking-1/';
const SHAPES = 'https://www.w3.org/TR/css-shapes-1/';

// ============================================================
// 小节数据
// ============================================================

export const sections: Section[] = [
  {
    id: 'overflow',
    number: '1',
    title: { zh: '溢出处理', en: 'Overflow' },
    specId: 'overflow',
    summary: { zh: 'overflow 属性控制当内容超出元素盒子时的表现方式。可以选择显示、隐藏、添加滚动条或自动处理溢出内容。', en: 'The overflow property controls how content behaves when it exceeds the element box. Options include displaying, hiding, adding scrollbars, or automatically handling overflowing content.' },
    keyPoints: [
      'visible: 内容可见，溢出部分不裁剪（默认值）',
      'hidden: 溢出内容被裁剪，不可见且不可滚动',
      'scroll: 始终显示滚动条，允许滚动查看溢出内容',
      'auto: 仅在需要时显示滚动条',
      'overflow 属性会创建块级格式化上下文（BFC）',
      'CSS3 引入 overflow-x 和 overflow-y 分别控制水平和垂直方向',
      'CSS3 overflow: clip 值提供严格裁剪，禁用滚动机制',
    ],
    tutorial: [
      { type: 'heading', text: '什么是溢出?' },
      { type: 'paragraph', text: '当元素的内容超出其**内容框**(content box)的边界时,就发生了**溢出**(overflow)。溢出可能由多种原因引起:文本太长、子元素太大、固定尺寸容器装不下动态内容等。CSS 的 `overflow` 属性让你控制浏览器如何处理这些溢出内容。' },
      { type: 'paragraph', text: '理解溢出的关键在于区分两个概念:**盒子的尺寸**和**内容的尺寸**。当内容尺寸大于盒子尺寸时,就会溢出。默认情况下(`overflow: visible`),溢出内容会"逃出"盒子边界,覆盖到周围的内容上——这在布局时可能造成混乱。' },

      { type: 'heading', text: '`overflow` 的四个基础值' },
      { type: 'code', lang: 'css', caption: 'overflow 属性的基本用法', code: `/* visible(默认):溢出内容可见,不裁剪 */\n.visible {\n  overflow: visible;\n  /* 内容会"逃出"盒子,可能覆盖周围内容 */\n}\n\n/* hidden:溢出内容被裁剪,完全不可见 */\n.hidden {\n  overflow: hidden;\n  /* 超出部分被切掉,无法滚动查看 */\n}\n\n/* scroll:始终显示滚动条,允许滚动 */\n.scroll {\n  overflow: scroll;\n  /* 即使内容没有溢出,滚动条也会出现 */\n}\n\n/* auto:智能模式,仅在溢出时显示滚动条 */\n.auto {\n  overflow: auto;\n  /* 内容没溢出时无滚动条,溢出时自动出现 */\n}` },
      { type: 'example', title: '对比 hidden、scroll、auto', lang: 'html', code: `<div style="width: 200px; height: 100px; border: 2px solid #333;">\n  <div style="overflow: hidden;">\n    <!-- 溢出内容被裁剪,看不到 -->\n    很长的文本很长的文本很长的文本...\n  </div>\n</div>\n\n<div style="width: 200px; height: 100px; overflow: scroll;">\n  <!-- 即使内容很少,滚动条也会显示(可能是灰色禁用状态) -->\n  短文本\n</div>\n\n<div style="width: 200px; height: 100px; overflow: auto;">\n  <!-- 内容少:无滚动条; 内容多:自动出现滚动条 -->\n  这是最常用的值\n</div>`, explanation: '实践中 **`overflow: auto` 是最推荐的值**。它既不会让内容溢出到外面(造成布局混乱),也不会在不需要时显示多余的滚动条(影响美观)。`overflow: scroll` 的问题在于即使内容很少,也会显示滚动条占位,浪费空间。' },
      { type: 'tip', text: '`overflow: visible` 是默认值,但它会破坏容器的边界。如果你为一个元素设置了固定高度,通常应该同时设置 `overflow: auto` 或 `overflow: hidden`,否则内容溢出时会覆盖到页面其他部分,造成布局错乱。' },

      { type: 'heading', text: '`overflow-x` 和 `overflow-y`:分轴控制' },
      { type: 'paragraph', text: 'CSS3 引入了 `overflow-x`(水平方向)和 `overflow-y`(垂直方向),允许你分别控制两个方向的溢出行为。这在某些场景下非常有用——比如你希望垂直滚动,但水平方向永远不滚动。' },
      { type: 'code', lang: 'css', caption: '分别控制水平和垂直溢出', code: `/* 垂直滚动,水平不滚动 */\n.vertical-scroll {\n  overflow-x: hidden;  /* 水平溢出裁剪 */\n  overflow-y: auto;    /* 垂直溢出滚动 */\n}\n\n/* 水平滚动,垂直不滚动(少见,如时间轴) */\n.horizontal-scroll {\n  overflow-x: auto;\n  overflow-y: hidden;\n  white-space: nowrap; /* 防止文本换行 */\n}` },
      { type: 'warning', text: '当 `overflow-x` 和 `overflow-y` 设置了不同的值,且其中一个是 `visible`,浏览器会自动将 `visible` **计算为 `auto`**。这是规范的强制要求——你不能在一个方向上裁剪(`hidden`/`scroll`/`auto`),同时在另一个方向上让内容逃出边界(`visible`)。如果你设置了 `overflow-x: hidden; overflow-y: visible;`,实际计算结果是 `overflow-y: auto`。' },

      { type: 'heading', text: '`overflow: clip` — 严格裁剪,禁用滚动' },
      { type: 'paragraph', text: 'CSS Overflow Module Level 3 引入了新值 `clip`。它与 `hidden` 类似,都会裁剪溢出内容,但有一个关键区别:`clip` **完全禁用滚动机制**——即使用 JavaScript 调用 `scrollTo()` 也无法滚动。而 `hidden` 只是隐藏滚动条,但元素仍然是"可滚动的"(programmatically scrollable)。' },
      { type: 'code', lang: 'css', caption: 'clip vs hidden', code: `/* hidden:裁剪内容,但可以通过 JS 滚动 */\n.hidden {\n  overflow: hidden;\n}\n/* JS: element.scrollTop = 100; ← 有效! */\n\n/* clip:裁剪内容,完全禁用滚动 */\n.clip {\n  overflow: clip;\n}\n/* JS: element.scrollTop = 100; ← 无效,scrollTop 始终为 0 */` },
      { type: 'tip', text: '`overflow: clip` 的典型使用场景:装饰性容器、动画遮罩区域、需要绝对禁止滚动的固定布局组件。如果你担心用户或第三方脚本意外滚动你的容器,用 `clip` 而非 `hidden`。' },

      { type: 'heading', text: 'Overflow 创建 BFC' },
      { type: 'paragraph', text: '**重要副作用**:当 `overflow` 的值不是 `visible` 或 `clip` 时,该元素会建立新的**块级格式化上下文**(BFC)。BFC 有很多特性,最常用的两个:' },
      { type: 'list', items: [
        '**包含浮动子元素**:父元素的高度会包裹浮动子元素,不会出现"高度塌陷"',
        '**阻止 margin 折叠**:BFC 内部的 margin 不会与外部的 margin 折叠',
      ] },
      { type: 'example', title: '用 overflow 清除浮动', lang: 'css', code: `/* 问题:父元素高度塌陷,浮动子元素"逃出" */\n.container {\n  border: 2px solid red;\n  /* 高度为 0,因为子元素浮动脱离了文档流 */\n}\n.child {\n  float: left;\n  width: 100px;\n  height: 100px;\n}\n\n/* 解决方案:overflow 创建 BFC,包含浮动 */\n.container {\n  overflow: auto; /* 或 hidden */\n  border: 2px solid red;\n  /* 现在高度是 100px,包裹了浮动子元素! */\n}`, explanation: '在 flexbox 和 grid 流行之前,`overflow: hidden` 是清除浮动的经典技巧。它通过创建 BFC,让父元素的高度计算包含浮动子元素。现代布局中这个技巧用得少了,但理解 overflow 创建 BFC 仍然重要——这解释了很多"意外"的布局行为。' },

      { type: 'heading', text: '实用场景与最佳实践' },
      { type: 'list', items: [
        '**固定高度容器 + `overflow: auto`**:卡片、对话框、侧边栏等固定尺寸区域,内容可能超出时,用 `auto` 自动出现滚动条',
        '**图片容器 + `overflow: hidden`**:配合 `object-fit: cover` 裁剪图片,隐藏超出部分',
        '**单行文本截断**:虽然通常用 `text-overflow: ellipsis`,但前提是 `overflow: hidden`',
        '**水平滚动列表 + `overflow-x: auto`**:图片画廊、标签页、时间轴等需要水平滚动的组件',
        '**禁止页面整体滚动 + `overflow: clip`**:模态框打开时,给 `<body>` 设置 `overflow: clip`,阻止背景滚动'
      ] },
      { type: 'warning', text: '不要在 `<body>` 或 `<html>` 上使用 `overflow: hidden` 来禁用滚动,除非你清楚后果。在某些浏览器中,这会导致触摸滚动、键盘滚动等完全失效,影响无障碍性。现代最佳实践是用 `overflow: clip` 或 CSS `overscroll-behavior` 属性。' },
    ] as TutorialBlock[],
  },
  {
    id: 'clipping',
    number: '2',
    title: { zh: '裁剪', en: 'Clipping' },
    specId: 'clipping',
    summary: { zh: 'CSS2 的 clip 属性允许裁剪绝对定位元素的可见区域，但已被 CSS3 的 clip-path 属性取代。clip-path 提供更强大的裁剪能力，支持多种形状和路径。', en: 'The CSS2 clip property allows clipping the visible region of absolutely positioned elements, but has been replaced by the CSS3 clip-path property. clip-path provides more powerful clipping capabilities, supporting various shapes and paths.' },
    keyPoints: [
      'CSS2 clip: rect() 仅适用于绝对定位元素，已被废弃',
      'CSS3 clip-path 支持基本形状：circle()、ellipse()、polygon()、inset()',
      'clip-path 支持 SVG path 引用，实现复杂裁剪',
      'clip-path 可用于所有元素，不限于绝对定位',
      '裁剪区域外的内容不可见，不响应鼠标事件',
      'clip-path 与 mask 的区别：clip-path 是完全裁剪，mask 支持透明度渐变',
    ],
    tutorial: [
      { type: 'heading', text: '裁剪 vs 遮罩 vs 溢出隐藏' },
      { type: 'paragraph', text: 'CSS 有三种"隐藏内容"的机制,容易混淆:' },
      { type: 'list', items: [
        '**`overflow: hidden`**:隐藏超出**盒子边界**的内容(矩形裁剪),盒子本身仍是矩形',
        '**`clip-path`**:用**几何路径**裁剪元素,裁剪区域外的内容完全不可见,是**硬边缘**(非此即彼,没有半透明)',
        '**`mask`**:用**图像的透明度**控制可见性,支持**渐变透明**(半透明效果),可以创建柔和的边缘'
      ] },
      { type: 'paragraph', text: '本节重点讲 `clip-path`——它让你把元素裁剪成圆形、三角形、多边形等任意形状,是实现非矩形设计的核心工具。' },

      { type: 'heading', text: 'CSS2 `clip`:已废弃的历史遗留' },
      { type: 'paragraph', text: 'CSS2 的 `clip` 属性只能裁剪**绝对定位元素**,而且只支持矩形(`rect()`)。它已被标记为废弃(deprecated),不应在新项目中使用。理解它的存在只是为了读懂旧代码。' },
      { type: 'code', lang: 'css', caption: '旧的 clip 属性(不推荐)', code: `/* ⚠️ 已废弃,仅适用于 position: absolute/fixed */\n.old-clip {\n  position: absolute;\n  clip: rect(10px, 100px, 100px, 10px);\n  /* rect(top, right, bottom, left) */\n  /* 只能裁剪成矩形,非常受限 */\n}` },
      { type: 'warning', text: '不要再使用 `clip: rect()`。改用 `clip-path: inset()`,功能更强,语法更直观,而且适用于所有元素(不限定位元素)。' },

      { type: 'heading', text: '`clip-path`:现代裁剪方案' },
      { type: 'paragraph', text: '`clip-path` 是 CSS Masking Module Level 1 定义的现代裁剪属性。它的核心能力:**用一个形状或路径定义元素的可见区域,区域外的内容被完全裁剪掉(不可见、不可点击、不占空间)**。' },
      { type: 'paragraph', text: '`clip-path` 支持三种值:基本形状函数(`circle()`、`ellipse()` 等)、SVG `<clipPath>` 引用、或 `none`(默认,不裁剪)。' },

      { type: 'heading', text: '基本形状:circle() 和 ellipse()' },
      { type: 'code', lang: 'css', caption: '裁剪成圆形和椭圆', code: `/* 圆形:clip-path: circle(半径 at 圆心x 圆心y) */\n.avatar {\n  clip-path: circle(50%);  /* 半径 50% = 内切圆 */\n  /* 等价于 circle(50% at 50% 50%) */\n}\n\n.badge {\n  clip-path: circle(40px at 80% 20%);\n  /* 半径 40px,圆心在右上角 */\n}\n\n/* 椭圆:clip-path: ellipse(rx ry at 中心x 中心y) */\n.pill {\n  width: 200px;\n  height: 60px;\n  clip-path: ellipse(50% 50%); /* 内切椭圆 */\n}\n\n.eye {\n  clip-path: ellipse(100px 50px at center);\n  /* 水平半轴 100px,垂直半轴 50px */\n}` },
      { type: 'example', title: '圆形头像:最常见的 clip-path 用例', lang: 'css', code: `.avatar {\n  width: 80px;\n  height: 80px;\n  clip-path: circle(50%);\n  /* 任意矩形图片裁剪成圆形 */\n}\n\n/* 配合 object-fit 确保图片不变形 */\n.avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}`, explanation: '`circle(50%)` 会在元素的中心绘制一个半径为宽度/高度一半的圆。对于正方形元素,这刚好是内切圆(圆形头像)。对于矩形,圆会被容器裁剪,实际看到的是椭圆(这时应该用 `ellipse()`)。' },
      { type: 'tip', text: '`circle()` 和 `ellipse()` 的半径/半轴可以用百分比(相对于元素尺寸)或绝对长度。百分比是响应式的——元素缩放时,裁剪形状也跟着缩放。' },

      { type: 'heading', text: '`polygon()`:多边形裁剪' },
      { type: 'paragraph', text: '`polygon()` 通过一系列坐标点定义多边形裁剪路径。每个点用 `x y` 坐标表示,坐标可以是百分比或长度值。浏览器会按顺序连接这些点,最后一点自动连回第一点形成闭合路径。' },
      { type: 'code', lang: 'css', caption: '常见多边形形状', code: `/* 三角形(等腰三角形,顶点朝上) */\n.triangle {\n  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);\n  /* 顶点: 上中(50% 0%), 左下(0% 100%), 右下(100% 100%) */\n}\n\n/* 梯形 */\n.trapezoid {\n  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);\n}\n\n/* 五角星(需要计算复杂坐标,通常用工具生成) */\n.star {\n  clip-path: polygon(\n    50% 0%, 61% 35%, 98% 35%, 68% 57%,\n    79% 91%, 50% 70%, 21% 91%, 32% 57%,\n    2% 35%, 39% 35%\n  );\n}\n\n/* 对话框箭头 */\n.speech-bubble {\n  clip-path: polygon(\n    0% 0%, 100% 0%, 100% 75%,\n    75% 75%, 75% 100%, 50% 75%,  /* 下方三角箭头 */\n    0% 75%\n  );\n}` },
      { type: 'tip', text: '手写复杂多边形坐标非常痛苦。推荐使用在线工具 [Clippy](https://bennettfeely.com/clippy/) 或 [clip-path maker](https://www.cssportal.com/css-clip-path-generator/),可视化调整形状,自动生成代码。' },
      { type: 'example', title: '斜角卡片', lang: 'css', code: `.card {\n  clip-path: polygon(\n    0 0,          /* 左上 */\n    calc(100% - 20px) 0,  /* 右上(距离右边 20px) */\n    100% 20px,    /* 右上角的斜角 */\n    100% 100%,    /* 右下 */\n    0 100%        /* 左下 */\n  );\n  /* 右上角被切成斜角 */\n}`, explanation: '`polygon()` 配合 `calc()` 可以实现相对定位的顶点——比如"距离右边 20px 的点"。这种技巧常用于创建斜角、缺口等设计元素。' },

      { type: 'heading', text: '`inset()`:矩形内缩裁剪' },
      { type: 'paragraph', text: '`inset()` 创建矩形裁剪区域,语法类似 `margin`/`padding`:可以用 1-4 个值定义上右下左的**内缩距离**。它还支持 `round` 关键字添加圆角,相当于"带圆角的 `overflow: hidden`"。' },
      { type: 'code', lang: 'css', caption: 'inset() 裁剪矩形区域', code: `/* 四边各内缩 10px */\n.inset-1 {\n  clip-path: inset(10px);\n}\n\n/* 上下 20px,左右 10px */\n.inset-2 {\n  clip-path: inset(20px 10px);\n}\n\n/* 上 10px,右 20px,下 30px,左 40px */\n.inset-4 {\n  clip-path: inset(10px 20px 30px 40px);\n}\n\n/* 带圆角的矩形裁剪 */\n.inset-rounded {\n  clip-path: inset(0 0 0 0 round 20px);\n  /* 等价于 border-radius: 20px 的裁剪效果 */\n  /* 但不影响背景(border-radius 会影响背景) */\n}\n\n/* 不同圆角 */\n.inset-complex {\n  clip-path: inset(10px round 10px 20px 30px 40px);\n  /* 内缩 10px,四个角分别有不同圆角 */\n}` },
      { type: 'tip', text: '`inset()` 是替代旧 `clip: rect()` 的现代方案。它不需要 `position: absolute`,适用于所有元素,而且语法更直观(内缩距离而非绝对坐标)。`round` 关键字让它可以代替 `border-radius` 实现圆角裁剪,且不影响 `box-shadow` 等效果。' },

      { type: 'heading', text: 'SVG `<clipPath>` 引用' },
      { type: 'paragraph', text: '对于非常复杂的形状(手绘路径、不规则曲线),可以在 SVG 中定义 `<clipPath>` 元素,然后在 CSS 中引用。SVG 的 `<path>` 元素支持贝塞尔曲线、弧线等复杂图形,表现力远超 CSS 基本形状。' },
      { type: 'code', lang: 'html', caption: '引用 SVG clipPath', code: `<!-- SVG 定义裁剪路径 -->\n<svg width="0" height="0">\n  <defs>\n    <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">\n      <path d="M0,0.5 Q0.25,0.3 0.5,0.5 T1,0.5 V1 H0 Z" />\n      <!-- 波浪形状 -->\n    </clipPath>\n  </defs>\n</svg>\n\n<!-- CSS 引用 -->\n<style>\n.wave-section {\n  clip-path: url(#wave-clip);\n}\n</style>`, explanation: '`clipPathUnits="objectBoundingBox"` 让 SVG 路径坐标相对于被裁剪元素的尺寸(0-1 范围),实现响应式裁剪。`url(#id)` 引用 SVG 中定义的 `<clipPath>` 元素。' },
      { type: 'warning', text: 'SVG `clipPath` 引用在某些浏览器中有兼容性问题,尤其是跨域引用外部 SVG 文件时。最安全的做法是把 SVG 内联到 HTML 中。另外,`clipPathUnits="objectBoundingBox"` 需要路径坐标在 0-1 范围内,否则需要用 `userSpaceOnUse` 并处理坐标系转换。' },

      { type: 'heading', text: '动画与过渡' },
      { type: 'paragraph', text: '`clip-path` 支持 CSS 过渡和动画,但有限制:**只有相同类型的形状函数之间可以过渡**。比如 `circle()` 可以过渡到另一个 `circle()`,`polygon()` 可以过渡到**顶点数相同**的另一个 `polygon()`,但 `circle()` 不能直接过渡到 `polygon()`。' },
      { type: 'example', title: '悬停时形状变化', lang: 'css', code: `.morph {\n  width: 200px;\n  height: 200px;\n  background: linear-gradient(45deg, #f06, #48f);\n  clip-path: circle(30% at 50% 50%);\n  transition: clip-path 0.5s ease;\n}\n\n.morph:hover {\n  clip-path: circle(50% at 50% 50%);\n  /* 圆形从 30% 平滑扩展到 50% */\n}\n\n/* 多边形变形(顶点数必须相同!) */\n.shape {\n  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);\n  /* 菱形 */\n  transition: clip-path 0.3s;\n}\n\n.shape:hover {\n  clip-path: polygon(50% 20%, 80% 50%, 50% 80%, 20% 50%);\n  /* 缩小的菱形,4个顶点对应 */\n}`, explanation: '形状动画可以创造惊艳的视觉效果。关键是确保起始和结束形状的**类型相同**且**顶点数相同**(对于 polygon)。常见技巧:用透明顶点"隐藏"多余的点,让不同边数的多边形也能过渡。' },

      { type: 'heading', text: '裁剪与交互' },
      { type: 'warning', text: '**重要特性**:被 `clip-path` 裁剪掉的区域**完全不响应鼠标事件**。点击、悬停等事件只在可见区域内触发。这意味着如果你把一个按钮裁剪成圆形,圆形外的矩形区域点击无效——这通常是你想要的,但有时会造成困扰(尤其是裁剪区域很小时)。' },
      { type: 'paragraph', text: '如果你需要保留完整的点击区域但只是视觉上裁剪,考虑用 `mask` 代替 `clip-path`,或者在裁剪元素外包裹一个透明的可点击层。' },

      { type: 'heading', text: 'clip-path vs border-radius' },
      { type: 'paragraph', text: '对于简单的圆角,`border-radius` 和 `clip-path: inset(0 round ...)` 效果类似,但有区别:' },
      { type: 'list', items: [
        '**`border-radius`**:影响背景、边框、`box-shadow` 的形状,是"盒子级别"的圆角',
        '**`clip-path`**:只裁剪内容,不影响 `box-shadow`(阴影仍然是矩形),是"视觉级别"的裁剪',
        '**性能**:`border-radius` 通常性能更好,因为它是浏览器优化的核心特性;`clip-path` 可能触发更多重绘',
        '**兼容性**:`border-radius` 支持更好(IE9+);`clip-path` 在旧浏览器需要前缀或不支持'
      ] },
      { type: 'tip', text: '如果只需要圆角,优先用 `border-radius`。`clip-path` 的优势在于**非矩形形状**(三角形、多边形、自定义路径)和**动画变形**。' },
    ] as TutorialBlock[],
  },
  {
    id: 'visibility',
    number: '3',
    title: { zh: '可见性', en: 'Visibility' },
    specId: 'visibility',
    summary: { zh: 'visibility 属性控制元素的可见性，但不改变布局。与 display: none 不同，visibility: hidden 的元素仍然占据空间。', en: 'The visibility property controls element visibility without changing layout. Unlike display: none, elements with visibility: hidden still occupy space.' },
    keyPoints: [
      'visible: 元素可见（默认值）',
      'hidden: 元素不可见，但仍占据空间，影响布局',
      'collapse: 用于表格行、列、行组、列组，移除元素并回收空间',
      'collapse 在非表格元素上的行为与 hidden 相同',
      'visibility 属性可继承，子元素可以设置 visible 覆盖父元素的 hidden',
      'visibility: hidden 的元素不响应鼠标事件',
      'visibility 与 display: none 的区别：hidden 占据空间，none 不占据空间',
    ],
    tutorial: [
      { type: 'heading', text: 'visibility:隐藏但占位' },
      { type: 'paragraph', text: '`visibility` 属性控制元素是否**可见**,但与 `display: none` 的关键区别在于:**`visibility: hidden` 的元素仍然占据布局空间**,只是不可见。可以把它想象成"隐形"——元素还在那里,只是眼睛看不到。' },
      { type: 'code', lang: 'css', caption: 'visibility 的三个基本值', code: `/* visible:可见(默认值) */\n.visible {\n  visibility: visible;\n}\n\n/* hidden:不可见,但占据空间 */\n.hidden {\n  visibility: hidden;\n  /* 元素消失,但留下"空白占位" */\n}\n\n/* collapse:折叠(主要用于表格) */\n.collapse {\n  visibility: collapse;\n  /* 在表格行/列上:移除并回收空间\n     在其他元素上:等同于 hidden */\n}` },

      { type: 'heading', text: 'visibility vs display vs opacity' },
      { type: 'paragraph', text: 'CSS 有三种"隐藏元素"的主要方式,它们在**布局占位**、**DOM 存在**、**交互性**、**子元素行为**上有本质区别:' },
      { type: 'example', title: '三种隐藏方式的完整对比', lang: 'html', code: `<!-- 1. display: none -->\n<div style="display: none;">\n  <!-- 完全从渲染树移除\n       ✗ 不可见\n       ✗ 不占空间\n       ✗ 不可交互\n       ✗ 子元素无法覆盖(都被移除) -->\n</div>\n\n<!-- 2. visibility: hidden -->\n<div style="visibility: hidden;">\n  <!-- 不可见但占位\n       ✗ 不可见\n       ✓ 占据空间(留白)\n       ✗ 不可交互\n       ✓ 子元素可以设置 visible 显示 -->\n</div>\n\n<!-- 3. opacity: 0 -->\n<div style="opacity: 0;">\n  <!-- 完全透明但仍存在\n       ✗ 不可见(透明)\n       ✓ 占据空间\n       ✓ 可以交互(点击、悬停)\n       ✗ 子元素无法覆盖(都透明) -->\n</div>`, explanation: '选择哪一种取决于需求:**`display: none`** 用于完全移除元素(条件渲染、响应式隐藏);**`visibility: hidden`** 用于保持布局稳定的隐藏(如占位符、切换时不跳动);**`opacity: 0`** 用于需要保留交互的淡出效果(配合 `transition` 的淡入淡出动画)。' },
      { type: 'list', ordered: true, items: [
        '**布局影响**:`display: none` 不占空间;`visibility: hidden` 和 `opacity: 0` 占据空间',
        '**交互性**:`opacity: 0` 仍可点击;`visibility: hidden` 和 `display: none` 不可点击',
        '**子元素**:只有 `visibility` 允许子元素通过 `visibility: visible` 覆盖父元素的隐藏',
        '**动画**:`display` 不支持过渡;`visibility` 可以延迟过渡;`opacity` 可以平滑过渡',
        '**无障碍**:屏幕阅读器会跳过 `display: none` 和 `visibility: hidden` 的内容,但会读取 `opacity: 0` 的内容'
      ] },

      { type: 'heading', text: 'visibility 的继承特性' },
      { type: 'paragraph', text: '`visibility` 是**可继承**的属性,但有一个独特的行为:子元素可以通过显式设置 `visibility: visible` 来**覆盖**父元素的 `visibility: hidden`,让自己重新显示出来。这是 `display: none` 和 `opacity` 做不到的。' },
      { type: 'example', title: '子元素覆盖父元素的隐藏', lang: 'html', code: `<div style="visibility: hidden; padding: 20px; border: 1px solid red;">\n  <!-- 父元素隐藏 -->\n  这段文字不可见\n  <span style="visibility: visible; color: blue;">\n    <!-- 子元素显式设置 visible -->\n    但这段文字可见!\n  </span>\n  这段也不可见\n</div>\n\n<!-- 渲染结果:看到蓝色文字"但这段文字可见!",\n     周围是红色边框的空白区域(父元素占位) -->`, explanation: '这个特性常用于"部分显示"的场景:隐藏整个容器,但保留关键信息(如标题、图标)可见。注意父元素的边框、背景等仍然不可见——`visibility: hidden` 影响整个盒子,只有**内容**可以通过子元素的 `visible` 恢复。' },
      { type: 'warning', text: '子元素的 `visibility: visible` **不能**覆盖父元素的 `display: none` 或 `opacity: 0`。`display: none` 会移除整个子树,子元素根本不会被渲染;`opacity` 作用于整个元素及其子树,是一个整体的透明度值,子元素无法单独设置不透明。' },

      { type: 'heading', text: 'visibility: collapse — 表格专用' },
      { type: 'paragraph', text: '`visibility: collapse` 是为**表格**设计的特殊值。当应用于表格的行(`<tr>`)、列(`<col>`)、行组(`<tbody>`)或列组(`<colgroup>`)时,它会:**移除该行/列并回收其占据的空间**,就像 `display: none` 一样,但不会导致表格重新计算整体布局(性能更好)。' },
      { type: 'code', lang: 'css', caption: 'collapse 在表格上的效果', code: `/* 隐藏表格的某一行 */\ntr.hidden-row {\n  visibility: collapse;\n  /* 该行消失,下方行上移填补空间\n     表格的列宽不受影响(不会重排) */\n}\n\n/* 隐藏表格的某一列 */\ncol.hidden-col {\n  visibility: collapse;\n  /* 该列消失,右侧列左移\n     表格的行高不受影响 */\n}` },
      { type: 'warning', text: '在**非表格元素**上,`visibility: collapse` 的行为与 `visibility: hidden` 相同(隐藏但占位)。不同浏览器对 `collapse` 的实现有细微差异,Firefox 支持最完整,Chrome/Safari 在某些场景下可能表现不一致。实践中,如果不是处理表格布局,不建议使用 `collapse`。' },

      { type: 'heading', text: '交互与无障碍' },
      { type: 'paragraph', text: '`visibility: hidden` 的元素**不响应任何鼠标事件**——点击、悬停、拖拽等都会穿透到下方的元素。这与 `opacity: 0` 不同,后者完全透明但仍然可以交互。' },
      { type: 'code', lang: 'html', caption: '交互行为对比', code: `<!-- visibility: hidden → 点击穿透 -->\n<button style="visibility: hidden;" onclick="alert(\'不会触发\')">\n  看不见也点不到\n</button>\n\n<!-- opacity: 0 → 仍可点击 -->\n<button style="opacity: 0;" onclick="alert(\'会触发!\')">\n  看不见但能点到\n</button>`, explanation: '这个区别在实现"隐藏但可交互"的元素时很重要。比如自定义文件上传按钮:真正的 `<input type="file">` 用 `opacity: 0` 隐藏但保留点击区域,覆盖在一个美化的按钮上。如果用 `visibility: hidden`,输入框就点不到了。' },
      { type: 'paragraph', text: '**无障碍影响**:屏幕阅读器会**跳过** `visibility: hidden` 的内容,不会朗读给视障用户。如果内容对无障碍很重要,应该用其他方式隐藏(如 `clip` 或绝对定位移出视口),而不是 `visibility: hidden`。' },

      { type: 'heading', text: 'CSS 过渡与动画' },
      { type: 'paragraph', text: '`visibility` 支持 CSS 过渡,但行为特殊:**它是离散的**(非连续值),不会像 `opacity` 那样平滑渐变,而是在过渡的起点或终点瞬间切换。但你可以利用 `transition-delay` 控制切换的时机。' },
      { type: 'example', title: '淡入淡出:opacity + visibility', lang: 'css', code: `.fade-box {\n  opacity: 1;\n  visibility: visible;\n  transition: opacity 0.3s, visibility 0.3s;\n}\n\n.fade-box.hidden {\n  opacity: 0;\n  visibility: hidden;\n  /* 过程:\n     1. opacity 从 1 平滑过渡到 0(0.3s)\n     2. visibility 在 0.3s 结束时瞬间切换到 hidden\n     → 淡出后彻底不可交互 */\n}\n\n/* 淡入时需要调整 transition-delay */\n.fade-box {\n  transition: opacity 0.3s, visibility 0s; /* visibility 立即切换到 visible */\n}\n.fade-box.hidden {\n  transition: opacity 0.3s, visibility 0s 0.3s; /* visibility 延迟到淡出结束后切换 */\n}`, explanation: '组合 `opacity` 和 `visibility` 是实现完美淡入淡出的经典模式:**淡出时**,`opacity` 平滑过渡到 0,`visibility` 在动画结束后切换到 `hidden`(禁用交互)。**淡入时**,`visibility` 立即切换到 `visible`(启用交互),`opacity` 再从 0 平滑过渡到 1。' },
      { type: 'tip', text: '为什么要同时用 `opacity` 和 `visibility`?单用 `opacity: 0` 的问题是元素虽然不可见,但仍占据空间且可以交互(鼠标悬停、点击),可能干扰用户。加上 `visibility: hidden` 后,淡出完成的元素既不可见也不可交互,更符合预期。' },

      { type: 'heading', text: '实用场景' },
      { type: 'list', items: [
        '**占位符隐藏**:加载中状态,先用 `visibility: hidden` 隐藏内容但保留空间,避免内容加载后页面跳动',
        '**条件显示**:表单验证错误提示,用 `visibility` 控制显示/隐藏,保持表单布局稳定(不会因为提示出现而挤压其他元素)',
        '**打印样式**:用 `@media print` 配合 `visibility: hidden` 隐藏不需要打印的元素(导航栏、广告),但保留页面结构',
        '**表格行列控制**:数据表格的列筛选功能,用 `visibility: collapse` 隐藏列但不影响其他列的宽度',
        '**子元素选择性显示**:隐藏整个容器,但让某些关键子元素(如标题、图标)通过 `visibility: visible` 保持可见'
      ] },
      { type: 'warning', text: '不要用 `visibility: hidden` 隐藏安全敏感信息(如密码、密钥)。虽然不可见,但内容仍在 DOM 中,用户可以通过开发者工具查看。真正的安全隐藏应该在服务端完成,或者根本不发送到客户端。' },
    ] as TutorialBlock[],
  },
  {
    id: 'opacity',
    number: '4',
    title: { zh: '不透明度', en: 'Opacity' },
    specId: 'opacity',
    summary: { zh: 'CSS3 opacity 属性控制元素及其所有子元素的不透明度。opacity 值为 0-1 之间的数字，0 表示完全透明，1 表示完全不透明。', en: 'The CSS3 opacity property controls the opacity of an element and all its children. The opacity value is a number between 0 (fully transparent) and 1 (fully opaque).' },
    keyPoints: [
      'opacity 取值范围：0（完全透明）到 1（完全不透明）',
      'opacity 应用于整个元素及其所有子元素',
      'opacity 创建新的层叠上下文（stacking context）',
      'opacity < 1 时，元素会被提升到独立图层',
      'opacity 与 visibility 的区别：opacity: 0 的元素仍响应鼠标事件',
      'opacity 与 background-color: rgba() 的区别：opacity 影响整个元素，rgba 仅影响背景色',
      'opacity 动画性能较好，可以利用硬件加速',
    ],
    tutorial: [
      { type: 'heading', text: 'opacity:整体透明度' },
      { type: 'paragraph', text: '`opacity` 属性控制元素及其**所有子元素**的不透明度,取值范围 `0.0`(完全透明)到 `1.0`(完全不透明)。它与颜色的 alpha 通道(如 `rgba()`)的关键区别在于:**`opacity` 影响整个元素树**,包括背景、边框、文本、子元素,是一个"整体打包"的透明效果。' },
      { type: 'code', lang: 'css', caption: 'opacity 的基本用法', code: `/* 完全不透明(默认) */\n.opaque {\n  opacity: 1;\n}\n\n/* 半透明 */\n.semi-transparent {\n  opacity: 0.5;\n  /* 整个元素(包括子元素)都是 50% 透明 */\n}\n\n/* 几乎透明 */\n.faded {\n  opacity: 0.1;\n}\n\n/* 完全透明(但仍占位且可交互) */\n.invisible {\n  opacity: 0;\n}` },

      { type: 'heading', text: 'opacity vs rgba():透明的层级' },
      { type: 'paragraph', text: '新手常混淆 `opacity` 和 `rgba()`/`hsla()` 中的 alpha 通道。两者都能创造透明效果,但作用层级完全不同:' },
      { type: 'example', title: '对比 opacity 和 rgba()', lang: 'html', code: `<!-- 1. opacity:整个元素透明(包括文字) -->\n<div style="background: blue; color: white; opacity: 0.5;">\n  背景和文字都是半透明\n</div>\n\n<!-- 2. rgba():只有背景透明,文字不透明 -->\n<div style="background: rgba(0, 0, 255, 0.5); color: white;">\n  背景半透明,文字完全不透明\n</div>`, explanation: '`opacity: 0.5` 让整个盒子(背景+内容)都变成 50% 透明,文字会很淡,可读性差。`background: rgba(0, 0, 255, 0.5)` 只让背景半透明,文字保持完全不透明,可读性好。**如果只想让背景透明,用 `rgba()`/`hsla()`,不要用 `opacity`**。' },
      { type: 'list', items: [
        '**`opacity`**:影响整个元素及所有子元素,是"外部"属性,作用于渲染后的整体',
        '**`rgba()`/`hsla()`**:只影响颜色值本身,是"内部"属性,可以单独控制背景色、文字色、边框色的透明度',
        '**组合使用**:`opacity` 和 `rgba()` 会叠加。如果背景是 `rgba(..., 0.5)`,元素 `opacity: 0.5`,最终背景透明度是 `0.5 × 0.5 = 0.25`'
      ] },
      { type: 'warning', text: '不要用 `opacity` 来实现"透明背景+不透明文字"的效果,因为 `opacity` 会让文字也透明。正确做法是给背景用 `rgba()`/`hsla()`,或者把背景和内容分成两个独立元素。' },

      { type: 'heading', text: 'opacity 对子元素的影响' },
      { type: 'paragraph', text: '`opacity` 的一个重要特性:**子元素无法覆盖父元素的透明度**。如果父元素 `opacity: 0.5`,子元素即使设置 `opacity: 1` 也不会变成完全不透明,最终会是 `0.5 × 1 = 0.5`。透明度是**乘法叠加**的。' },
      { type: 'code', lang: 'html', caption: '子元素无法覆盖父元素的 opacity', code: `<div style="opacity: 0.5; background: red; padding: 20px;">\n  <!-- 父元素 50% 透明 -->\n  <div style="opacity: 1; background: blue; padding: 10px;">\n    <!-- 子元素设置 opacity: 1 -->\n    <!-- 但最终仍然是 50% 透明! -->\n    子元素实际 opacity = 0.5 × 1 = 0.5\n  </div>\n</div>`, explanation: '这与 `visibility: hidden` 的行为相反。`visibility` 允许子元素通过 `visible` 覆盖父元素的 `hidden`,但 `opacity` 不允许——一旦父元素设置了 `< 1` 的 opacity,整个子树都会受影响。**如果需要让某个子元素不透明,必须把它移到父元素外面**(改变 DOM 结构),或者不在父元素上用 `opacity`。' },

      { type: 'heading', text: 'opacity 创建层叠上下文' },
      { type: 'paragraph', text: '当 `opacity` 的值小于 `1` 时,元素会建立新的**层叠上下文**(stacking context)。这有几个重要后果:' },
      { type: 'list', items: [
        '元素的 `z-index` 只在其层叠上下文内有效,不会与外部元素比较',
        '元素会被当作一个整体渲染到独立的图层,然后再与页面合成',
        '`position: fixed` 的子元素会相对于该元素定位,而不是视口(这是一个常见的陷阱!)',
        '某些 CSS 属性(如 `mix-blend-mode`)的作用范围被限制在该层叠上下文内'
      ] },
      { type: 'example', title: 'opacity 导致 fixed 定位失效', lang: 'html', code: `<div style="opacity: 0.95;">\n  <!-- opacity < 1 创建了层叠上下文 -->\n  <div style="position: fixed; top: 0; right: 0;">\n    <!-- 本应相对于视口固定 -->\n    <!-- 但实际相对于父元素(层叠上下文)定位! -->\n    我不会固定在视口右上角\n  </div>\n</div>`, explanation: '这是 `opacity` 最常见的陷阱。如果你的 `position: fixed` 元素"不固定",检查祖先元素是否有 `opacity < 1`、`transform`、`filter` 等会创建层叠上下文的属性。解决方案:把 `fixed` 元素移到 DOM 树的更高层级,避开创建层叠上下文的祖先。' },
      { type: 'tip', text: '创建层叠上下文的属性还有很多:`transform`、`filter`、`perspective`、`clip-path`、`mask`、`mix-blend-mode`、`isolation: isolate`、`will-change` 等。它们都会导致类似的"fixed 定位失效"问题。' },

      { type: 'heading', text: '硬件加速与性能' },
      { type: 'paragraph', text: '`opacity` 是**最高性能**的 CSS 动画属性之一(与 `transform` 并列)。当 `opacity` 改变时,浏览器可以利用 GPU 进行硬件加速,只需要调整图层的透明度,而不需要重新绘制(repaint)或重排(reflow)。' },
      { type: 'code', lang: 'css', caption: '高性能的淡入淡出动画', code: `.fade-in {\n  opacity: 0;\n  animation: fadeIn 0.5s forwards;\n}\n\n@keyframes fadeIn {\n  to { opacity: 1; }\n}\n\n/* 过渡也非常高效 */\n.hover-fade {\n  opacity: 1;\n  transition: opacity 0.3s;\n}\n\n.hover-fade:hover {\n  opacity: 0.7;\n}` },
      { type: 'list', items: [
        '**GPU 加速**:`opacity` 动画会自动提升到合成层(compositor layer),由 GPU 处理',
        '**不触发重排**:改变 `opacity` 不会影响元素的尺寸或位置,不会触发布局计算',
        '**不触发重绘(通常)**:在合成层上,透明度改变只需要调整 alpha 值,不需要重新绘制像素',
        '**高帧率**:因为是 GPU 操作,可以轻松达到 60fps,动画流畅'
      ] },
      { type: 'tip', text: '性能对比:改变 `opacity` ≈ 改变 `transform` > 改变 `background-color` >> 改变 `width`/`height` >> 改变会影响布局的属性。如果你需要"消失/出现"的动画,优先用 `opacity` 配合 `visibility`,而不是 `display`(后者无法过渡)。' },

      { type: 'heading', text: '交互与无障碍' },
      { type: 'paragraph', text: '与 `visibility: hidden` 不同,**`opacity: 0` 的元素仍然可以交互**——可以点击、悬停、接收焦点。这既是优点也是潜在陷阱:' },
      { type: 'example', title: 'opacity: 0 仍可交互', lang: 'html', code: `<!-- 完全透明但可以点击 -->\n<button style="opacity: 0;" onclick="alert(\'点到了!\')">\n  看不见的按钮\n</button>\n\n<!-- 常见应用:自定义文件上传 -->\n<label style="position: relative; display: inline-block;">\n  <span style="padding: 10px 20px; background: blue; color: white;">\n    选择文件\n  </span>\n  <input type="file" style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer;">\n  <!-- 真正的 input 透明覆盖在按钮上 -->\n</label>`, explanation: '`opacity: 0` + `position: absolute` 是实现自定义文件上传按钮的经典技巧:真正的 `<input type="file">` 透明覆盖在美化按钮上,用户点击时实际点到的是 input,触发文件选择对话框。如果用 `visibility: hidden`,input 就点不到了。' },
      { type: 'warning', text: '**无障碍警告**:`opacity: 0` 的内容对屏幕阅读器**仍然可见**,会被朗读。如果内容对辅助技术不重要,应该同时设置 `aria-hidden="true"`。另外,完全透明的可点击元素可能让键盘用户困惑(焦点移到了看不见的地方),应该保留焦点样式或提供视觉提示。' },

      { type: 'heading', text: '渐进增强:百分比与小数' },
      { type: 'paragraph', text: '`opacity` 接受 `0` 到 `1` 之间的任何数字,包括小数。虽然规范允许百分比值(如 `opacity: 50%`),但浏览器支持不一致,**建议始终用小数**。' },
      { type: 'code', lang: 'css', caption: 'opacity 的取值范围', code: `/* ✓ 推荐:小数 0-1 */\n.recommended {\n  opacity: 0.75;   /* 75% 不透明 */\n}\n\n/* ✓ 合法:整数 0 或 1 */\n.integer {\n  opacity: 1;      /* 完全不透明 */\n  opacity: 0;      /* 完全透明 */\n}\n\n/* ⚠️ 避免:百分比(兼容性差) */\n.avoid {\n  opacity: 75%;    /* 某些浏览器可能不支持 */\n}\n\n/* ⚠️ 超出范围会被截断 */\n.clamped {\n  opacity: 1.5;    /* 自动截断为 1 */\n  opacity: -0.5;   /* 自动截断为 0 */\n}` },
      { type: 'tip', text: '在 CSS 变量或 JavaScript 动态计算 `opacity` 时,记得用 `Math.max(0, Math.min(1, value))` 确保值在 0-1 范围内,避免浏览器截断导致的意外行为。' },

      { type: 'heading', text: '实用场景与最佳实践' },
      { type: 'list', items: [
        '**淡入淡出动画**:配合 `transition` 或 `@keyframes`,`opacity` 是最流畅的显示/隐藏效果',
        '**加载占位符**:骨架屏(skeleton screen)用 `opacity` 闪烁动画模拟加载状态',
        '**悬停效果**:图片/卡片悬停时 `opacity: 0.8`,提供视觉反馈',
        '**禁用状态**:禁用的按钮设置 `opacity: 0.5` + `cursor: not-allowed`,视觉上变灰',
        '**遮罩层**:模态框的半透明背景遮罩(`opacity: 0.5` + 深色背景)',
        '**水印**:页面水印用 `opacity: 0.1`,既可见又不干扰内容阅读',
        '**自定义控件**:隐藏原生控件(`<input type="file">`、`<select>`)但保留交互,覆盖自定义样式'
      ] },
      { type: 'warning', text: '不要在正文文本上大量使用低 `opacity`(如 `< 0.6`),会严重影响可读性,违反 WCAG 无障碍标准。如果需要浅色文字,用 `color: rgba(...)` 或更浅的颜色值,而不是降低整个文本块的 `opacity`。' },
    ] as TutorialBlock[],
  },
  {
    id: 'filters',
    number: '5',
    title: { zh: '滤镜与混合模式', en: 'Filters & Blend Modes' },
    specId: 'filters',
    summary: { zh: 'CSS3 filter 属性提供了丰富的图像滤镜效果，如模糊、亮度、对比度等。backdrop-filter 可以对元素背后的内容应用滤镜。mix-blend-mode 和 background-blend-mode 控制元素和背景的混合模式。', en: 'The CSS3 filter property provides rich image filter effects such as blur, brightness, and contrast. backdrop-filter applies filters to content behind an element. mix-blend-mode and background-blend-mode control blending modes for elements and backgrounds.' },
    keyPoints: [
      'filter 函数：blur()、brightness()、contrast()、drop-shadow()、grayscale()、hue-rotate()、invert()、opacity()、saturate()、sepia()',
      'filter 可以组合多个函数，按顺序应用',
      'backdrop-filter 对元素背后的内容应用滤镜（需要半透明背景）',
      'backdrop-filter 常用于毛玻璃效果（frosted glass）',
      'mix-blend-mode 控制元素与背景的混合模式：multiply、screen、overlay、darken、lighten 等',
      'background-blend-mode 控制背景图片与背景色之间的混合模式',
      'filter 和 backdrop-filter 可能创建新的层叠上下文和包含块',
    ],
    tutorial: [
      { type: 'heading', text: 'CSS 滤镜:从 Photoshop 到浏览器' },
      { type: 'paragraph', text: 'CSS Filter Effects 模块将图像编辑软件中的滤镜效果带到了 Web。`filter` 属性接受一个或多个**滤镜函数**,可以对元素的渲染结果应用模糊、颜色调整、阴影等效果,无需图像编辑软件预处理。这些效果是实时计算的,可以动画化,且适用于任何 HTML 元素(不限于图片)。' },

      { type: 'heading', text: 'filter 滤镜函数速查' },
      { type: 'code', lang: 'css', caption: '11 个标准滤镜函数', code: `/* 模糊 */\nblur(5px)              /* 高斯模糊,半径 5px */\n\n/* 亮度与对比度 */\nbrightness(1.5)        /* 150% 亮度(变亮) */\nbrightness(0.5)        /* 50% 亮度(变暗) */\ncontrast(2)            /* 200% 对比度 */\n\n/* 颜色调整 */\ngrayscale(100%)        /* 完全灰度(黑白) */\nsepia(100%)            /* 棕褐色调(复古照片) */\nsaturate(2)            /* 200% 饱和度(鲜艳) */\nhue-rotate(90deg)      /* 色相旋转 90 度 */\ninvert(100%)           /* 反色(负片效果) */\n\n/* 透明度(等同于 opacity 属性) */\nopacity(0.5)           /* 50% 不透明度 */\n\n/* 阴影 */\ndrop-shadow(2px 2px 4px rgba(0,0,0,0.5))\n/* 投影,语法类似 box-shadow 但无 spread */` },
      { type: 'paragraph', text: '每个滤镜函数都接受特定类型的参数:长度值(如 `px`)、百分比、数字倍数、角度等。多个滤镜可以空格分隔组合使用,按书写顺序依次应用。' },

      { type: 'heading', text: 'blur():高斯模糊' },
      { type: 'paragraph', text: '`blur()` 应用高斯模糊,参数是模糊半径(length 值,不能是百分比)。值越大,模糊越强。0 表示无模糊。' },
      { type: 'example', title: '模糊效果的典型应用', lang: 'css', code: `/* 轻微模糊背景,突出前景 */\n.bg-blur {\n  filter: blur(3px);\n}\n\n/* 强模糊,隐私保护(如敏感信息打码) */\n.censored {\n  filter: blur(10px);\n}\n\n/* 配合 backdrop-filter 实现毛玻璃 */\n.glass {\n  background: rgba(255, 255, 255, 0.3);\n  backdrop-filter: blur(10px);\n}`, explanation: '`blur()` 常用于图片懒加载的占位符(先显示模糊图,加载完成后清晰化)、背景虚化、失焦效果、敏感内容遮盖。注意模糊会向元素边界外扩展,可能覆盖到周围内容。' },
      { type: 'warning', text: '`blur()` 的性能开销较大,尤其是大半径模糊和频繁动画时。移动设备上大范围模糊可能导致卡顿。如果需要动画模糊,考虑预渲染几个模糊程度不同的图片,通过 `opacity` 切换,而不是实时改变 `blur()` 值。' },

      { type: 'heading', text: 'brightness() & contrast():亮度与对比度' },
      { type: 'code', lang: 'css', caption: '亮度和对比度调整', code: `/* brightness():调整亮度 */\nbrightness(0)    /* 全黑 */\nbrightness(0.5)  /* 50% 亮度(变暗) */\nbrightness(1)    /* 原始亮度(默认) */\nbrightness(1.5)  /* 150% 亮度(变亮) */\nbrightness(2)    /* 200% 亮度(非常亮,可能过曝) */\n\n/* contrast():调整对比度 */\ncontrast(0)      /* 无对比度(全灰) */\ncontrast(0.5)    /* 50% 对比度(柔和) */\ncontrast(1)      /* 原始对比度(默认) */\ncontrast(2)      /* 200% 对比度(强烈,黑更黑白更白) */` },
      { type: 'example', title: '悬停时提亮图片', lang: 'css', code: `img {\n  filter: brightness(0.9);\n  transition: filter 0.3s;\n}\n\nimg:hover {\n  filter: brightness(1.1);\n  /* 悬停时变亮 10% */\n}`, explanation: '轻微的亮度调整(90%-110%)可以创造微妙的悬停反馈,不像 `opacity` 那样让图片"变虚"。`contrast()` 常用于低对比度图片的增强,或创造柔和的视觉效果(降低对比度)。' },

      { type: 'heading', text: 'grayscale() & sepia():颜色风格化' },
      { type: 'code', lang: 'css', caption: '灰度和棕褐色效果', code: `/* grayscale():去色,转黑白 */\ngrayscale(0%)      /* 原始色彩 */\ngrayscale(50%)     /* 半灰度 */\ngrayscale(100%)    /* 完全黑白 */\n\n/* sepia():棕褐色调,复古照片效果 */\nsepia(0%)          /* 原始色彩 */\nsepia(100%)        /* 完全棕褐色(老照片) */` },
      { type: 'example', title: '图片集悬停彩色化', lang: 'css', code: `/* 默认全部黑白 */\n.photo-grid img {\n  filter: grayscale(100%);\n  transition: filter 0.5s;\n}\n\n/* 悬停时恢复彩色 */\n.photo-grid img:hover {\n  filter: grayscale(0%);\n}`, explanation: '这是图片画廊的经典交互模式:平时黑白降低视觉干扰,悬停时彩色化突出重点。`sepia()` 常用于复古风格设计、历史主题网站、怀旧效果。' },

      { type: 'heading', text: 'saturate():饱和度' },
      { type: 'paragraph', text: '`saturate()` 调整色彩饱和度。`0` 等价于 `grayscale(100%)`(完全去色),`1` 是原始饱和度,`>1` 增强饱和度(颜色更鲜艳)。' },
      { type: 'code', lang: 'css', code: `saturate(0)     /* 无饱和度(灰色) */\nsaturate(0.5)   /* 50% 饱和度(柔和) */\nsaturate(1)     /* 原始饱和度 */\nsaturate(2)     /* 200% 饱和度(鲜艳) */\nsaturate(5)     /* 500%(非常鲜艳,可能失真) */` },
      { type: 'tip', text: '`saturate()` 可以"拯救"颜色偏灰的图片,或创造鲜艳的海报风格。但过度饱和(>2)会让颜色失真,偏离真实感。在摄影类网站应谨慎使用。' },

      { type: 'heading', text: 'hue-rotate():色相旋转' },
      { type: 'paragraph', text: '`hue-rotate()` 在 HSL 色彩空间中旋转色相环,参数是角度值(`deg`)。`0deg` 或 `360deg` 是原始色相,`180deg` 产生互补色。' },
      { type: 'example', title: '动态变色效果', lang: 'css', code: `@keyframes rainbow {\n  0%   { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}\n\n.rainbow-animation {\n  animation: rainbow 3s linear infinite;\n  /* 色相循环旋转,彩虹效果 */\n}`, explanation: '`hue-rotate()` 可以创造炫酷的变色动画,或快速生成主题色变体(如蓝色 UI 一键变成绿色)。但它会改变所有颜色,包括中性色,可能产生意外效果。' },

      { type: 'heading', text: 'invert():反色' },
      { type: 'code', lang: 'css', code: `invert(0%)      /* 原始颜色 */\ninvert(100%)    /* 完全反色(黑→白, 白→黑) */\n\n/* 实现暗色模式的快速 hack */\nhtml.dark-mode {\n  filter: invert(1) hue-rotate(180deg);\n  /* invert 反色 + hue-rotate 修正色相偏移 */\n}` },
      { type: 'warning', text: '用 `invert()` 实现暗色模式是一个诱人的捷径,但有严重问题:图片会反色(除非单独处理)、某些颜色会变得很丑、无法精细控制。真正的暗色模式应该用 CSS 变量或分离的样式表。`invert()` 更适合图标颜色快速反转、实验性视觉效果。' },

      { type: 'heading', text: 'drop-shadow():投影' },
      { type: 'paragraph', text: '`drop-shadow()` 创建投影效果,类似 `box-shadow`,但有一个关键区别:**它沿着元素的 alpha 轮廓投影**,而不是盒子的矩形边界。对于透明 PNG、SVG、`clip-path` 裁剪的元素,`drop-shadow()` 的效果更自然。' },
      { type: 'code', lang: 'css', caption: 'drop-shadow vs box-shadow', code: `/* drop-shadow():沿 alpha 轮廓 */\n.png-icon {\n  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));\n  /* 投影跟随图标的实际形状,不是矩形 */\n}\n\n/* 语法:drop-shadow(offset-x offset-y blur-radius color) */\n/* 注意:没有 spread-radius 和 inset 参数 */\n\n/* box-shadow():沿盒子矩形边界 */\n.box {\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n  /* 投影是矩形,即使内容是透明的 */\n}` },
      { type: 'example', title: '透明 PNG 图标的自然阴影', lang: 'css', code: `/* PNG 图标(如五角星形状) */\n.star-icon {\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\n  /* 阴影沿星星的轮廓,不是正方形 */\n}\n\n/* 如果用 box-shadow */\n.star-icon-wrong {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);\n  /* 阴影是正方形,穿过透明区域,很假 */\n}`, explanation: '`drop-shadow()` 是为图标、插图、不规则形状元素设计的。它计算成本比 `box-shadow` 高,因为需要分析 alpha 通道,但视觉效果更好。可以组合多个 `drop-shadow()` 创造多重阴影。' },

      { type: 'heading', text: '组合多个滤镜' },
      { type: 'paragraph', text: '多个滤镜函数可以空格分隔,按**书写顺序**依次应用。顺序不同,结果可能不同(虽然大多数情况差异不大)。' },
      { type: 'code', lang: 'css', caption: '滤镜组合', code: `/* 先提亮再去色 */\n.combo-1 {\n  filter: brightness(1.2) grayscale(100%);\n}\n\n/* 先去色再提亮(结果相同) */\n.combo-2 {\n  filter: grayscale(100%) brightness(1.2);\n}\n\n/* 复杂组合:模糊 + 提亮 + 增强对比度 */\n.dreamy {\n  filter: blur(2px) brightness(1.1) contrast(1.2) saturate(1.3);\n  /* 梦幻柔焦效果 */\n}\n\n/* 复古照片效果 */\n.vintage {\n  filter: sepia(80%) contrast(1.1) brightness(1.05);\n}` },
      { type: 'tip', text: '滤镜组合是创造独特视觉风格的利器。推荐建立一套品牌滤镜预设(如 Instagram 的滤镜),通过 CSS 类或变量复用。例如:`.filter-warm { filter: sepia(30%) saturate(1.2); }`,`.filter-cool { filter: hue-rotate(180deg) saturate(0.8); }`。' },

      { type: 'heading', text: 'backdrop-filter:毛玻璃效果' },
      { type: 'paragraph', text: '`backdrop-filter` 是 Filter Effects Level 2 新增的属性,对元素**背后的内容**应用滤镜,而不是元素本身。它最著名的应用是**毛玻璃效果**(frosted glass / glassmorphism)——苹果设计语言的标志性特征。' },
      { type: 'code', lang: 'css', caption: 'backdrop-filter 实现毛玻璃卡片', code: `.glass-card {\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n  /* 背后的内容被模糊,卡片本身半透明 */\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 12px;\n}\n\n/* 更复杂的毛玻璃 */\n.glass-advanced {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px) saturate(180%);\n  /* 模糊 + 增强背景饱和度 */\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n}` },
      { type: 'warning', text: '**关键要求**:`backdrop-filter` **必须**配合半透明背景(`background` 的 alpha < 1)才能看到效果。如果背景是完全不透明的,你看不到背后的内容,也就看不到模糊效果。另外,`backdrop-filter` 的浏览器兼容性不如 `filter`,Safari 需要 `-webkit-` 前缀,Firefox 在某些版本需要手动开启。' },
      { type: 'example', title: '导航栏滚动时变毛玻璃', lang: 'css', code: `.navbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  background: transparent;\n  transition: background 0.3s, backdrop-filter 0.3s;\n}\n\n.navbar.scrolled {\n  background: rgba(255, 255, 255, 0.8);\n  backdrop-filter: blur(10px) saturate(180%);\n  /* 滚动后背景模糊,内容清晰可读 */\n}`, explanation: '这是 iOS/macOS 风格导航栏的经典实现:滚动前完全透明,滚动后变成毛玻璃,背后内容模糊但隐约可见。配合 `transition` 实现平滑过渡。' },

      { type: 'heading', text: 'mix-blend-mode:混合模式' },
      { type: 'paragraph', text: '`mix-blend-mode` 控制元素与其**背景**(父元素和后面的兄弟元素)如何混合,类似 Photoshop 的图层混合模式。它提供了 16 种混合模式,从简单的正片叠底到复杂的颜色混合。' },
      { type: 'code', lang: 'css', caption: '常用混合模式', code: `/* 正常(默认) */\nmix-blend-mode: normal;\n\n/* 正片叠底:颜色相乘,变暗 */\nmix-blend-mode: multiply;\n\n/* 滤色:颜色相加,变亮 */\nmix-blend-mode: screen;\n\n/* 叠加:multiply 和 screen 的组合 */\nmix-blend-mode: overlay;\n\n/* 变暗/变亮:选择较暗/较亮的颜色 */\nmix-blend-mode: darken;\nmix-blend-mode: lighten;\n\n/* 颜色减淡/颜色加深 */\nmix-blend-mode: color-dodge;\nmix-blend-mode: color-burn;\n\n/* 差值:颜色相减的绝对值 */\nmix-blend-mode: difference;\n\n/* 排除:类似 difference 但对比度更低 */\nmix-blend-mode: exclusion;` },
      { type: 'example', title: '文字混合进背景', lang: 'html', code: `<div style="background: url(texture.jpg); padding: 50px;">\n  <h1 style="font-size: 80px; font-weight: bold; color: white; mix-blend-mode: difference;">\n    标题文字\n  </h1>\n  <!-- 文字与背景图片混合,产生独特效果 -->\n</div>`, explanation: '`mix-blend-mode: difference` 常用于让文字在任何背景上都可读——白色文字在浅色背景上会变暗,在深色背景上会变亮。`multiply` 和 `screen` 适合创造双重曝光效果。' },
      { type: 'tip', text: '混合模式的一个实用技巧:给彩色图标设置 `mix-blend-mode: multiply`,它会自动适配背景颜色,产生"染色"效果,无需准备多套颜色的图标。' },

      { type: 'heading', text: 'background-blend-mode:背景层混合' },
      { type: 'paragraph', text: '`background-blend-mode` 控制元素的**多个背景层**之间,以及背景图片与背景色之间如何混合。它只影响背景,不影响内容。' },
      { type: 'example', title: '图片与颜色混合', lang: 'css', code: `.tinted-image {\n  background-image: url(photo.jpg);\n  background-color: rgba(255, 100, 0, 0.5);\n  background-blend-mode: multiply;\n  /* 图片被橙色"染色" */\n}\n\n/* 双重曝光效果 */\n.double-exposure {\n  background-image:\n    url(portrait.jpg),\n    url(cityscape.jpg);\n  background-blend-mode: screen;\n  /* 两张图片混合叠加 */\n}`, explanation: '`background-blend-mode` 常用于图片调色(overlaying a color tint)、创造艺术效果、实现低质量图片的视觉增强。它比用伪元素叠加颜色层更简洁,性能也更好。' },

      { type: 'heading', text: '性能与兼容性' },
      { type: 'list', items: [
        '**`filter`**:支持良好(IE 不支持,Edge 16+),性能中等,复杂滤镜(如大半径 `blur()`)开销大',
        '**`backdrop-filter`**:兼容性较差(Safari 需要 `-webkit-`前缀,Firefox 70+ 默认启用),性能开销大(需要捕获背景内容并重新渲染)',
        '**混合模式**:支持良好(IE 不支持),性能较好,但大量使用可能触发重绘',
        '**动画**:滤镜和混合模式都支持 CSS 过渡和动画,但频繁改变会消耗性能,移动端需谨慎'
      ] },
      { type: 'warning', text: '`filter` 和 `backdrop-filter` 会创建新的**层叠上下文**和**包含块**,可能导致 `position: fixed` 子元素定位异常(类似 `opacity < 1` 的问题)。另外,它们可能触发硬件加速,将元素提升到合成层,在低端设备上反而可能降低性能。' },
    ] as TutorialBlock[],
  },
  {
    id: 'masking',
    number: '6',
    title: { zh: 'CSS 遮罩', en: 'CSS Masking' },
    specId: 'masking',
    summary: {
      zh: 'CSS Masking 模块定义了两种隐藏元素部分内容的方式：裁剪(clipping)使用路径定义可见区域，遮罩(masking)使用图像的亮度或 alpha 通道控制可见性。',
      en: 'The CSS Masking module defines two ways to hide parts of element content: clipping uses paths to define visible regions, masking uses image luminance or alpha channels to control visibility.',
    },
    keyPoints: [
      'mask-image: 指定一个或多个遮罩图像，支持 url()、linear-gradient() 等 <image> 值和 none',
      'mask-mode: 控制遮罩图像的解释方式 — alpha(使用 alpha 通道)、luminance(使用亮度值)、match-source(SVG 用 luminance，其他用 alpha)',
      'mask-repeat: 控制遮罩图像的平铺方式，语法与 background-repeat 一致(repeat/space/round/no-repeat)',
      'mask-position: 设置遮罩图像的位置，语法与 background-position 一致',
      'mask-size: 设置遮罩图像的大小，语法与 background-size 一致(contain/cover/<length>/<percentage>)',
      'mask-origin: 指定遮罩定位区域 — content-box、padding-box(默认)、border-box、fill-box、stroke-box、view-box',
      'mask-clip: 指定遮罩绘制(painting)区域，值与 mask-origin 相同加上 no-clip',
      'mask-composite: 控制多层遮罩的合成方式 — add(并集)、subtract(差集)、intersect(交集)、exclude(异或)',
      'mask 简写属性可一次设置 mask-image/mode/repeat/position/size/origin/clip/composite',
      '遮罩与裁剪的核心区别：clip-path 产生硬边缘(完全可见或完全不可见)，mask 支持渐变透明度(半透明效果)',
      'SVG <mask> 元素可通过 url(#maskId) 引用，提供更精细的遮罩控制',
      '遮罩会创建层叠上下文(stacking context)，类似于 opacity < 1 的行为',
    ],
    tutorial: [
      { type: 'heading', text: '遮罩 vs 裁剪:核心区别' },
      { type: 'paragraph', text: 'CSS Masking 模块定义了两种隐藏内容的技术:**裁剪**(clipping)和**遮罩**(masking)。虽然都能"隐藏部分内容",但原理和效果完全不同:' },
      { type: 'list', items: [
        '**`clip-path`(裁剪)**:用几何路径定义可见区域,区域内完全可见,区域外完全不可见。是**二元的**(on/off),产生**硬边缘**',
        '**`mask`(遮罩)**:用图像的亮度或 alpha 通道控制透明度,支持**渐变透明**。黑色=完全透明,白色=完全不透明,灰色=半透明,可以创造**柔和的边缘**和复杂的透明度变化'
      ] },
      { type: 'paragraph', text: '可以把 `clip-path` 想象成"用剪刀沿边缘剪切",把 `mask` 想象成"透过带渐变的滤镜观看"。遮罩的表现力远超裁剪,但计算成本也更高。' },

      { type: 'heading', text: 'mask-image:遮罩图像' },
      { type: 'paragraph', text: '`mask-image` 定义遮罩的"形状",接受任何 `<image>` 值:URL 引用的图片、渐变、SVG 遮罩引用。图像中**越亮(或越不透明)的区域,元素越可见**。' },
      { type: 'code', lang: 'css', caption: 'mask-image 的常见值', code: `/* 图片遮罩:PNG 的 alpha 通道控制透明度 */\n.mask-png {\n  mask-image: url(mask.png);\n  /* mask.png 中白色/不透明区域可见,黑色/透明区域不可见 */\n}\n\n/* 渐变遮罩:创造渐隐效果 */\n.mask-gradient {\n  mask-image: linear-gradient(to bottom, black, transparent);\n  /* 顶部完全可见(黑色),底部完全透明(transparent) */\n}\n\n/* SVG 遮罩引用 */\n.mask-svg {\n  mask-image: url(#my-mask);\n  /* 引用 SVG <mask id="my-mask"> 元素 */\n}\n\n/* 无遮罩(默认) */\n.no-mask {\n  mask-image: none;\n}` },
      { type: 'example', title: '线性渐变实现渐隐效果', lang: 'css', code: `/* 文字从上到下渐隐 */\n.fade-out {\n  background: linear-gradient(45deg, #f06, #48f);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  mask-image: linear-gradient(to bottom, black 50%, transparent);\n  /* 上半部分可见,下半部分渐隐 */\n}\n\n/* 图片边缘渐隐(vignette 效果) */\n.vignette {\n  mask-image: radial-gradient(circle, black 40%, transparent 70%);\n  /* 中心可见,边缘渐隐 */\n}`, explanation: '渐变遮罩是最常用的遮罩类型,可以轻松创造渐隐、晕影、聚光灯等效果。`linear-gradient` 适合方向性渐隐,`radial-gradient` 适合中心向外的效果。' },
      { type: 'tip', text: '遮罩图像的**亮度**或 **alpha 通道**决定透明度。对于渐变,`black`(RGB 0,0,0)让内容完全可见,`white`(RGB 255,255,255)或 `transparent` 让内容完全不可见——这与直觉相反!实际上 `mask-mode` 控制具体行为,默认是 alpha 模式。' },

      { type: 'heading', text: 'mask-mode:alpha vs luminance' },
      { type: 'paragraph', text: '`mask-mode` 控制遮罩图像如何被解释为透明度。有三个值:' },
      { type: 'code', lang: 'css', caption: 'mask-mode 的三个值', code: `/* alpha(默认):使用图像的 alpha 通道 */\nmask-mode: alpha;\n/* 不透明像素 → 内容可见,透明像素 → 内容不可见\n   忽略颜色,只看透明度 */\n\n/* luminance:使用图像的亮度值 */\nmask-mode: luminance;\n/* 白色/亮色 → 内容可见,黑色/暗色 → 内容不可见\n   忽略透明度,只看亮度 */\n\n/* match-source:自动选择 */\nmask-mode: match-source;\n/* SVG <mask> → luminance,其他 → alpha */` },
      { type: 'warning', text: '`mask-mode` 的默认值是 `match-source`,对于 CSS 渐变和图片,实际使用的是 **alpha 模式**。这意味着在渐变中,**`transparent`(alpha=0)让内容不可见,`black`(alpha=1)让内容可见**——这与 luminance 模式相反。为了避免混淆,推荐显式设置 `mask-mode`。' },
      { type: 'example', title: 'alpha vs luminance 的区别', lang: 'css', code: `/* alpha 模式:透明度控制可见性 */\n.alpha-mask {\n  mask-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));\n  mask-mode: alpha;\n  /* 左侧(不透明黑色) → 可见,右侧(透明) → 不可见 */\n}\n\n/* luminance 模式:亮度控制可见性 */\n.luminance-mask {\n  mask-image: linear-gradient(to right, white, black);\n  mask-mode: luminance;\n  /* 左侧(白色/亮) → 可见,右侧(黑色/暗) → 不可见 */\n}`, explanation: 'Alpha 模式适合 PNG 遮罩图(利用透明通道),luminance 模式适合黑白图像遮罩(如照片转黑白后作为遮罩)。实践中 alpha 模式更常用。' },

      { type: 'heading', text: 'mask-repeat, mask-position, mask-size' },
      { type: 'paragraph', text: '这三个属性的语法与 `background-*` 系列完全一致,控制遮罩图像的平铺、定位和尺寸。如果你熟悉背景属性,遮罩属性就是"复制粘贴"。' },
      { type: 'code', lang: 'css', caption: '遮罩图像的定位与尺寸', code: `/* 平铺方式 */\nmask-repeat: no-repeat;       /* 不平铺(默认:repeat) */\nmask-repeat: repeat-x;        /* 仅水平平铺 */\nmask-repeat: space;           /* 平铺,用空白间隔 */\n\n/* 位置 */\nmask-position: center;        /* 居中 */\nmask-position: top right;     /* 右上角 */\nmask-position: 50% 50%;       /* 百分比定位 */\n\n/* 尺寸 */\nmask-size: cover;             /* 覆盖整个元素 */\nmask-size: contain;           /* 完整显示遮罩图像 */\nmask-size: 100px 50px;        /* 固定尺寸 */\nmask-size: 50%;               /* 相对元素尺寸 */` },
      { type: 'example', title: '重复的圆点遮罩', lang: 'css', code: `.dotted-mask {\n  background: linear-gradient(45deg, #f06, #4af);\n  mask-image: radial-gradient(circle, black 30%, transparent 30%);\n  mask-size: 50px 50px;     /* 每个圆点 50×50px */\n  mask-repeat: repeat;      /* 平铺 */\n  /* 产生布满圆点的效果 */\n}`, explanation: '通过调整 `mask-size` 和 `mask-repeat`,可以用单个遮罩图像创造纹理、图案、网格等效果。常见应用:半色调点阵效果、镂空纹理、装饰性图案。' },

      { type: 'heading', text: 'mask-composite:多层遮罩合成' },
      { type: 'paragraph', text: '可以为元素应用**多个遮罩层**(用逗号分隔),`mask-composite` 控制它们如何合成。有四种合成运算:' },
      { type: 'code', lang: 'css', caption: '遮罩合成模式', code: `/* add(默认):并集,任一遮罩可见即可见 */\nmask-composite: add;\n\n/* subtract:差集,第一层减去第二层 */\nmask-composite: subtract;\n\n/* intersect:交集,两层都可见才可见 */\nmask-composite: intersect;\n\n/* exclude:异或,有且仅有一层可见时才可见 */\nmask-composite: exclude;` },
      { type: 'example', title: '用 subtract 创造镂空效果', lang: 'css', code: `.cutout {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  mask-image:\n    linear-gradient(black, black),           /* 第一层:全黑 */\n    radial-gradient(circle at 50% 50%, black 40%, transparent 40%);\n                                             /* 第二层:中心圆 */\n  mask-composite: subtract;                  /* 第一层减去第二层 */\n  mask-position: 0 0, center;                /* 各层位置 */\n  /* 结果:中心镂空的圆形 */\n}`, explanation: '`subtract` 常用于"打孔"效果——在完整的遮罩上挖掉一部分。`intersect` 用于只显示多个遮罩的重叠区域。`exclude` 可以创造交替显示的棋盘效果。' },
      { type: 'warning', text: '`mask-composite` 的浏览器兼容性复杂。标准值(`add`/`subtract`/`intersect`/`exclude`)只有 Firefox 支持,Chrome/Safari 使用旧的非标准值(`source-over`/`destination-out`/`source-in`/`xor`)。跨浏览器使用需要写两套:`-webkit-mask-composite` 和 `mask-composite`。' },

      { type: 'heading', text: 'mask 简写属性' },
      { type: 'paragraph', text: '`mask` 是所有 `mask-*` 属性的简写,语法与 `background` 简写一致。可以一次设置图像、位置、尺寸、重复方式等。' },
      { type: 'code', lang: 'css', caption: 'mask 简写示例', code: `/* 完整语法 */\n.full {\n  mask: url(mask.png) center / cover no-repeat;\n  /*    图像          位置   / 尺寸  重复方式 */\n}\n\n/* 渐变遮罩 */\n.gradient {\n  mask: linear-gradient(to bottom, black, transparent);\n}\n\n/* 多层遮罩 */\n.multi {\n  mask:\n    radial-gradient(circle, black 50%, transparent 50%) center / 100px 100px repeat,\n    linear-gradient(black, black);\n}` },

      { type: 'heading', text: 'SVG 遮罩引用' },
      { type: 'paragraph', text: '对于复杂的遮罩形状,可以在 SVG 中定义 `<mask>` 元素,然后通过 `url(#id)` 引用。SVG 遮罩支持任意形状、渐变、滤镜等高级特性。' },
      { type: 'code', lang: 'html', caption: '引用 SVG 遮罩', code: `<!-- 定义 SVG 遮罩 -->\n<svg width="0" height="0">\n  <defs>\n    <mask id="text-mask">\n      <rect width="100%" height="100%" fill="white"/>\n      <text x="50%" y="50%" text-anchor="middle" font-size="80" fill="black">\n        MASK\n      </text>\n    </mask>\n  </defs>\n</svg>\n\n<!-- CSS 引用 -->\n<style>\n.svg-masked {\n  mask: url(#text-mask);\n  /* 图片只在文字形状内可见 */\n}\n</style>`, explanation: 'SVG 遮罩的白色区域让内容可见,黑色区域让内容不可见。可以用 SVG 的文本、路径、形状等元素创造复杂遮罩。注意 SVG 遮罩默认使用 `luminance` 模式。' },

      { type: 'heading', text: '实用场景' },
      { type: 'list', items: [
        '**渐隐效果**:长文本底部渐隐(`linear-gradient`),暗示"还有更多内容"',
        '**图片晕影**:照片边缘暗化(`radial-gradient`),聚焦中心',
        '**文字镂空**:图片只在文字轮廓内显示(SVG text 遮罩),创造填充图案文字',
        '**进度指示**:用遮罩实现圆形进度条(`conic-gradient` 遮罩)',
        '**装饰纹理**:重复的遮罩图案创造半色调、网格、点阵效果',
        '**过渡动画**:动画改变 `mask-position` 或 `mask-size` 创造"擦除"转场'
      ] },
      { type: 'example', title: '文本底部渐隐(阅读更多提示)', lang: 'css', code: `.truncated-text {\n  max-height: 200px;\n  overflow: hidden;\n  position: relative;\n  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);\n  /* 前 60% 可见,后 40% 渐隐 */\n}\n\n/* 或用伪元素实现(更好的兼容性) */\n.truncated-text::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 80px;\n  background: linear-gradient(to bottom, transparent, white);\n  /* 渐变覆盖层,模拟遮罩效果 */\n}`, explanation: '渐隐文本是遮罩的经典应用,提示用户"下面还有内容"。第二种方法(伪元素渐变覆盖)兼容性更好,但需要知道背景色。遮罩方法适用于任何背景。' },

      { type: 'heading', text: '性能与兼容性' },
      { type: 'warning', text: '**兼容性警告**:CSS 遮罩的标准语法浏览器支持参差不齐。Chrome/Safari/Edge 需要 `-webkit-` 前缀(`-webkit-mask-image`),Firefox 支持无前缀标准语法。`mask-composite` 的值在不同浏览器中完全不同。跨浏览器使用遮罩需要大量前缀和回退方案。' },
      { type: 'list', items: [
        '**前缀要求**:WebKit 浏览器需要 `-webkit-mask-*` 前缀',
        '**mask-composite 不兼容**:标准值(`add`/`subtract`)只有 Firefox 支持,WebKit 用旧值(`source-over`/`destination-out`)',
        '**性能开销**:遮罩需要额外的渲染通道,比 `clip-path` 慢,比 `opacity` 慢得多',
        '**创建层叠上下文**:设置 `mask` 会创建层叠上下文,可能影响 `position: fixed` 定位',
        '**IE 完全不支持**:没有任何降级方案,IE 用户看到的是未遮罩的内容'
      ] },
      { type: 'tip', text: '兼容性检查:`@supports (mask-image: url()) { ... }` 或 `@supports (-webkit-mask-image: url()) { ... }`。对于关键 UI(如按钮、导航),避免依赖遮罩;对于装饰性效果(如纹理、艺术效果),遮罩失效时优雅降级到无遮罩状态。' },
    ] as TutorialBlock[],
  },
  {
    id: 'shapes',
    number: '7',
    title: { zh: 'CSS 形状', en: 'CSS Shapes' },
    specId: 'shapes',
    summary: {
      zh: 'CSS Shapes 允许定义非矩形的浮动区域，使文本可以环绕圆形、椭圆、多边形等形状排列，创建杂志式的排版效果。',
      en: 'CSS Shapes allows defining non-rectangular float areas, enabling text to wrap around circles, ellipses, polygons, and other shapes for magazine-style layouts.',
    },
    keyPoints: [
      'shape-outside: 定义浮动元素的浮动区域形状，影响相邻行内内容的排列；仅对浮动元素有效',
      '基本形状函数：circle()、ellipse()、inset()、polygon()，与 clip-path 使用相同的 <basic-shape> 语法',
      'shape-outside 也接受 <image> 值：浏览器提取图像的 alpha 通道形成形状(需设置 shape-image-threshold)',
      'shape-outside 也接受 box 值(margin-box/border-box/padding-box/content-box)，定义形状参考盒子',
      'shape-margin: 在 shape-outside 定义的形状外添加额外间距，值为 <length> 或 <percentage>',
      'shape-image-threshold: 设置图像 alpha 值阈值(0.0-1.0)，alpha 高于此值的像素区域形成形状',
      'shape-inside(CSS Shapes Level 2，尚未广泛实现)将控制元素内部内容的排列形状',
      'CSS Shapes 仅影响浮动区域的形状，不改变元素自身的盒子形状；要裁剪元素外观需配合 clip-path',
    ],
    tutorial: [
      { type: 'heading', text: 'CSS Shapes:打破矩形浮动的限制' },
      { type: 'paragraph', text: '在 CSS Shapes 出现之前,浮动元素的"浮动区域"永远是矩形——即使你用 `border-radius` 或 `clip-path` 把元素裁剪成圆形,周围的文本仍然按照矩形边界环绕,留下难看的空白。CSS Shapes Module Level 1 通过 `shape-outside` 属性打破了这个限制:**让文本可以沿着圆形、椭圆、多边形等非矩形形状流动**,实现杂志级别的排版效果。' },
      { type: 'paragraph', text: '理解 CSS Shapes 的关键在于区分两个概念:**元素的盒子形状**(由 `clip-path`、`border-radius` 等控制)和**浮动区域的形状**(由 `shape-outside` 控制)。前者是视觉外观,后者是文本环绕的边界。两者可以独立设置,也可以配合使用。' },

      { type: 'heading', text: 'shape-outside:定义浮动区域形状' },
      { type: 'paragraph', text: '`shape-outside` 是 CSS Shapes 的核心属性,定义浮动元素的浮动区域形状。**关键限制:它只对 `float: left` 或 `float: right` 的元素有效**,对非浮动元素、flex 项目、grid 项目完全无效。' },
      { type: 'code', lang: 'css', caption: 'shape-outside 的基本用法', code: `/* 仅对浮动元素有效! */\n.circle-float {\n  float: left;\n  width: 150px;\n  height: 150px;\n  shape-outside: circle(50%);\n  /* 文本沿圆形边缘环绕 */\n}\n\n/* 非浮动元素:shape-outside 被忽略 */\n.not-floating {\n  /* 没有 float */\n  shape-outside: circle(50%);  /* 无效! */\n}` },
      { type: 'warning', text: '**CSS Shapes 只适用于浮动布局**,这是规范的硬性限制。在现代布局(flexbox、grid)中,`shape-outside` 完全不起作用。这让 CSS Shapes 的应用场景相对受限——主要用于文章排版、杂志式布局等传统浮动场景。' },

      { type: 'heading', text: '基本形状:circle() 和 ellipse()' },
      { type: 'paragraph', text: '`shape-outside` 支持与 `clip-path` 相同的基本形状函数。最常用的是 `circle()` 和 `ellipse()`——让文本环绕圆形或椭圆形图片。' },
      { type: 'example', title: '圆形图片 + 文本环绕', lang: 'html', code: `<img src="avatar.jpg" style="\n  float: left;\n  width: 150px;\n  height: 150px;\n  margin-right: 20px;\n  shape-outside: circle(50%);\n  clip-path: circle(50%);\n">\n<p>\n  这段文字会沿着圆形图片的边缘流动,而不是围绕矩形边界。\n  注意我们同时设置了 clip-path 和 shape-outside:前者让图片\n  视觉上是圆形,后者让文本沿圆形环绕。两者配合才能达到完美效果。\n</p>`, explanation: '关键点:**`shape-outside` 不改变元素的视觉形状**,只改变文本环绕的边界。所以通常需要配合 `clip-path` 或 `border-radius`,让元素的视觉形状与浮动区域形状一致。如果只设置 `shape-outside`,图片还是矩形,但文本会"避开"一个看不见的圆形区域,效果很怪异。' },
      { type: 'code', lang: 'css', caption: 'ellipse() 创造椭圆环绕', code: `/* 椭圆形浮动区域 */\n.portrait {\n  float: right;\n  width: 200px;\n  height: 300px;\n  shape-outside: ellipse(50% 50% at 50% 50%);\n  clip-path: ellipse(50% 50% at 50% 50%);\n  /* 垂直长方形的照片,椭圆裁剪和环绕 */\n}` },
      { type: 'tip', text: '`circle()` 和 `ellipse()` 的语法与 `clip-path` 完全一致,可以直接复用。实践中,先用 `clip-path` 调整好形状,然后复制给 `shape-outside`,确保视觉形状和浮动形状匹配。' },

      { type: 'heading', text: 'polygon():多边形环绕' },
      { type: 'paragraph', text: '`polygon()` 可以创造三角形、梯形、不规则多边形等浮动形状,实现更复杂的文本环绕效果。' },
      { type: 'example', title: '三角形图片浮动', lang: 'css', code: `.triangle-float {\n  float: left;\n  width: 200px;\n  height: 200px;\n  background: url(photo.jpg) center/cover;\n  shape-outside: polygon(0 0, 100% 100%, 0 100%);\n  clip-path: polygon(0 0, 100% 100%, 0 100%);\n  /* 直角三角形,文本从斜边流过 */\n  margin-right: 20px;\n}`, explanation: '多边形浮动常用于创意排版:菱形、箭头、不规则形状等。复杂坐标通常用工具生成(如 Clippy)。注意浮动元素需要设置明确的宽高,否则 `shape-outside` 的百分比无法计算。' },

      { type: 'heading', text: 'inset():矩形内缩' },
      { type: 'paragraph', text: '`inset()` 创造内缩的矩形浮动区域,可以模拟 `margin` 的效果,但更灵活(支持圆角)。' },
      { type: 'code', lang: 'css', code: `/* 内缩 20px 的矩形浮动区域 */\n.inset-float {\n  float: left;\n  width: 200px;\n  height: 200px;\n  shape-outside: inset(20px);\n  /* 等价于给浮动区域四边各加 20px margin */\n}\n\n/* 带圆角的内缩 */\n.inset-rounded {\n  float: right;\n  width: 150px;\n  height: 150px;\n  shape-outside: inset(0px round 20px);\n  clip-path: inset(0px round 20px);\n  /* 圆角矩形环绕 */\n}` },

      { type: 'heading', text: '图像 alpha 通道形状' },
      { type: 'paragraph', text: '`shape-outside` 可以接受图像 URL,浏览器会自动提取图像的 **alpha 通道**形成浮动形状。这对于不规则形状的 PNG 图片非常有用——文本会自动沿着图片的透明边缘环绕。' },
      { type: 'code', lang: 'html', caption: '用图像 alpha 通道定义形状', code: `<img src="butterfly.png" style="\n  float: left;\n  width: 300px;\n  shape-outside: url(butterfly.png);\n  shape-image-threshold: 0.5;\n  shape-margin: 20px;\n">\n<!-- butterfly.png 是一张透明背景的蝴蝶图片\n     文本会沿着蝴蝶的轮廓(alpha > 0.5 的区域)环绕 -->`, explanation: '`shape-image-threshold` 设置 alpha 阈值(0.0-1.0):**alpha 值高于此阈值的像素**被视为"实心",形成浮动形状;低于阈值的像素被视为"透明",文本可以流入。默认值是 `0.0`,任何非完全透明的像素都算形状的一部分。' },
      { type: 'warning', text: '用图像 alpha 通道定义形状的性能开销较大——浏览器需要解析图像,提取 alpha 通道,计算形状边界。对于复杂图像或大量浮动元素,可能影响性能。另外,图像必须与页面同源,或服务器配置了 CORS,否则浏览器会拒绝读取图像数据,`shape-outside` 失效。' },
      { type: 'tip', text: '`shape-image-threshold` 的调整技巧:如果形状太"松散"(文本距离图片太远),提高阈值(如 `0.8`);如果形状太"紧"(文本紧贴图片甚至重叠),降低阈值(如 `0.2`)。可以在浏览器开发者工具中实时调整,找到最佳值。' },

      { type: 'heading', text: 'shape-margin:形状外边距' },
      { type: 'paragraph', text: '`shape-margin` 在 `shape-outside` 定义的形状外添加额外的间距,类似于给形状加了一圈"缓冲区"。这与元素的 `margin` 独立——`margin` 影响元素盒子,`shape-margin` 影响浮动形状。' },
      { type: 'code', lang: 'css', caption: 'shape-margin 增加环绕间距', code: `.circle-with-margin {\n  float: left;\n  width: 150px;\n  height: 150px;\n  shape-outside: circle(50%);\n  clip-path: circle(50%);\n  shape-margin: 20px;\n  /* 文本距离圆形边缘至少 20px */\n}\n\n/* 对比:用元素 margin */\n.circle-element-margin {\n  float: left;\n  width: 150px;\n  height: 150px;\n  margin-right: 20px;  /* 影响元素盒子,矩形间距 */\n  shape-outside: circle(50%);\n  clip-path: circle(50%);\n  /* 文本沿圆形环绕,但右侧有 20px 矩形空白 */\n}` },
      { type: 'example', title: 'shape-margin vs margin 的区别', lang: 'html', code: `<!-- shape-margin:沿形状等距扩展 -->\n<img style="float: left; width: 100px; height: 100px;\n  shape-outside: circle(50%); clip-path: circle(50%);\n  shape-margin: 15px;">\n<!-- 文本距离圆形边缘均匀 15px,形成"光晕" -->\n\n<!-- margin:矩形扩展 -->\n<img style="float: left; width: 100px; height: 100px;\n  shape-outside: circle(50%); clip-path: circle(50%);\n  margin: 15px;">\n<!-- 文本距离矩形边界 15px,圆形四角空白更大 -->`, explanation: '`shape-margin` 让间距沿着形状的轮廓均匀扩展,视觉上更和谐。`margin` 扩展的是矩形边界,对于圆形等非矩形形状会产生不均匀的空白。实践中通常两者结合使用:`margin` 设置元素与其他元素的间距,`shape-margin` 设置文本环绕的缓冲。' },

      { type: 'heading', text: 'Box 值:使用盒子边界作为形状' },
      { type: 'paragraph', text: '`shape-outside` 可以接受 box 关键字,直接使用元素的某个盒子边界作为浮动形状。有四个值:`margin-box`(外边距盒)、`border-box`(边框盒)、`padding-box`(内边距盒)、`content-box`(内容盒)。' },
      { type: 'code', lang: 'css', caption: '使用盒子边界作为形状', code: `/* 沿 border-box(包含 border 和 padding)环绕 */\n.border-box-shape {\n  float: left;\n  width: 150px;\n  padding: 10px;\n  border: 5px solid red;\n  border-radius: 50%;  /* 圆角 */\n  shape-outside: border-box;\n  /* 浮动形状 = 圆角矩形的 border-box */\n}\n\n/* 沿 margin-box(包含 margin)环绕 */\n.margin-box-shape {\n  float: right;\n  width: 100px;\n  margin: 20px;\n  border-radius: 10px;\n  shape-outside: margin-box;\n  /* 浮动形状包含 margin,文本距离更远 */\n}` },
      { type: 'tip', text: '当浮动元素有 `border-radius` 时,box 值会自动采用圆角形状。这是快速实现圆角环绕的捷径——不需要手写 `inset()` 或 `ellipse()`,直接用 `shape-outside: border-box` 即可。' },

      { type: 'heading', text: '配合 clip-path:视觉与布局一致' },
      { type: 'paragraph', text: 'CSS Shapes 最佳实践:**让 `shape-outside`(浮动形状)与 `clip-path`(视觉形状)一致**,避免视觉与布局脱节。' },
      { type: 'example', title: '完整的圆形浮动元素', lang: 'css', code: `.perfect-circle {\n  float: left;\n  width: 200px;\n  height: 200px;\n  margin-right: 30px;\n  \n  /* 视觉:裁剪成圆形 */\n  clip-path: circle(50%);\n  \n  /* 布局:圆形浮动区域 */\n  shape-outside: circle(50%);\n  \n  /* 额外间距 */\n  shape-margin: 20px;\n}\n\n/* 常见错误:只设置 clip-path */\n.wrong {\n  float: left;\n  width: 200px;\n  height: 200px;\n  clip-path: circle(50%);\n  /* 视觉是圆形,但浮动区域是矩形!\n     文本会"避开"圆形四角的空白,很奇怪 */\n}`, explanation: '如果只设置 `clip-path` 不设置 `shape-outside`,元素视觉上是圆形,但文本按矩形环绕,圆形四角留下大片空白。如果只设置 `shape-outside` 不设置 `clip-path`,文本沿圆形流动,但元素自己还是矩形,视觉混乱。**两者必须配合使用**。' },

      { type: 'heading', text: 'shape-inside:未来的内部形状(Level 2)' },
      { type: 'paragraph', text: 'CSS Shapes Level 2 规范定义了 `shape-inside` 属性,允许控制**元素内部内容的排列形状**——比如让段落文字在圆形或多边形容器内流动,而不仅仅是环绕外部浮动元素。但截至 2024 年,`shape-inside` **尚未被任何主流浏览器实现**,仍处于实验阶段。' },
      { type: 'code', lang: 'css', caption: 'shape-inside(未实现,仅供参考)', code: `/* 未来:文本在圆形容器内流动 */\n.circle-container {\n  width: 300px;\n  height: 300px;\n  shape-inside: circle(50%);\n  /* 内容会在圆形内重排,而不是矩形 */\n}\n\n/* 未来:心形容器 */\n.heart-text {\n  shape-inside: url(heart.svg);\n  /* 文本在心形路径内排列 */\n}` },
      { type: 'warning', text: '不要在生产环境使用 `shape-inside`,它不被任何浏览器支持。如果需要类似效果,只能用 JavaScript 库(如 CSS Shapes Polyfill)或手动布局实现。' },

      { type: 'heading', text: '实用场景与最佳实践' },
      { type: 'list', items: [
        '**杂志式排版**:文章配图圆形浮动,文字自然环绕,打破传统矩形布局的单调',
        '**首字母下沉**:用 `shape-outside: polygon()` 创造复杂的首字下沉效果,文字紧贴大写字母边缘',
        '**产品展示**:产品图片沿轮廓浮动(用 alpha 通道),说明文字紧贴产品形状',
        '**创意布局**:不规则形状的浮动元素创造独特的视觉节奏,适合艺术类、时尚类网站',
        '**提升可读性**:合理的 `shape-margin` 确保文字不会紧贴图片,留出呼吸空间'
      ] },
      { type: 'example', title: '杂志风格的文章排版', lang: 'html', code: `<article>\n  <img src="photo.jpg" class="feature-image">\n  <p>文章正文开始,文字会沿着圆形图片边缘流动...</p>\n  <p>第二段文字继续环绕...</p>\n</article>\n\n<style>\n.feature-image {\n  float: left;\n  width: 250px;\n  height: 250px;\n  margin: 0 30px 20px 0;\n  object-fit: cover;\n  \n  /* 圆形裁剪 */\n  border-radius: 50%;\n  \n  /* 圆形浮动 */\n  shape-outside: circle(50%);\n  shape-margin: 15px;\n}\n</style>`, explanation: '这是 CSS Shapes 最常见的应用:给文章配图添加优雅的环绕效果。`border-radius: 50%` 创造圆形视觉,`shape-outside: circle(50%)` 让文本沿圆形流动,`shape-margin` 确保适当的留白。配合 `object-fit: cover` 确保图片不变形。' },

      { type: 'heading', text: '兼容性与限制' },
      { type: 'list', items: [
        '**浏览器支持**:Chrome 37+、Safari 8+、Firefox 62+、Edge 79+(基于 Chromium)支持良好,IE 完全不支持',
        '**仅限浮动**:CSS Shapes **只对 `float` 元素有效**,不适用于 flexbox、grid、绝对定位等现代布局',
        '**性能**:图像 alpha 通道提取和复杂形状计算有性能开销,大量使用可能影响渲染速度',
        '**调试困难**:形状是"看不见"的,需要借助浏览器开发者工具的 Shapes 检查器可视化调试',
        '**CORS 限制**:用 `url()` 引用图像时,图像必须同源或配置 CORS,否则无法读取 alpha 通道'
      ] },
      { type: 'warning', text: 'CSS Shapes 的最大限制是**只支持浮动布局**。在 flexbox 和 grid 主导的现代 Web 中,浮动布局越来越少见,这限制了 CSS Shapes 的应用范围。它主要适合文章排版、博客、新闻网站等以文本流为主的场景,不适合应用界面、仪表盘等组件化布局。' },
      { type: 'tip', text: '调试 CSS Shapes:Chrome DevTools 和 Firefox DevTools 都有 Shapes 检查器,可以可视化显示 `shape-outside` 定义的形状轮廓,并实时调整参数。在 DevTools 中选中元素,点击 `shape-outside` 属性旁边的形状图标即可启用。' },
    ] as TutorialBlock[],
  },
];

// ============================================================
// 锚点映射
// ============================================================

export const anchors: Record<string, string> = {
  'overflow': 'overflow',
  'clipping': 'clipping',
  'visibility': 'visibility',
  'opacity': 'opacity',
  'filters': 'filters',
  'masking': 'masking',
  'shapes': 'shapes',
  'propdef-overflow': 'overflow',
  'propdef-visibility': 'visibility',
  'propdef-clip': 'clipping',
  'propdef-clip-path': 'clipping',
  'propdef-opacity': 'opacity',
  'propdef-filter': 'filters',
  'propdef-backdrop-filter': 'filters',
  'propdef-mix-blend-mode': 'filters',
  'propdef-background-blend-mode': 'filters',
  'propdef-mask': 'masking',
  'propdef-mask-image': 'masking',
  'propdef-mask-mode': 'masking',
  'propdef-mask-repeat': 'masking',
  'propdef-mask-position': 'masking',
  'propdef-mask-size': 'masking',
  'propdef-mask-origin': 'masking',
  'propdef-mask-clip': 'masking',
  'propdef-mask-composite': 'masking',
  'propdef-shape-outside': 'shapes',
  'propdef-shape-margin': 'shapes',
  'propdef-shape-image-threshold': 'shapes',
};

// ============================================================
// 术语表
// ============================================================

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'overflow': {
    zh: '溢出',
    description: '当内容超出元素盒子的边界时发生的现象。overflow 属性控制如何处理溢出内容：显示、隐藏、滚动或自动处理。',
    sectionRef: 'visual-effects#overflow',
    css2Url: `${CSS22}/visufx.html#overflow`,
    specUrl: 'https://www.w3.org/TR/css-overflow-3/',
  },
  'clipping': {
    zh: '裁剪',
    description: '裁剪是将元素的可见区域限制在特定形状或路径内的技术。CSS2 的 clip 属性已被 CSS3 的 clip-path 取代，后者支持更复杂的裁剪形状。',
    sectionRef: 'visual-effects#clipping',
    css2Url: `${CSS22}/visufx.html#clipping`,
    specUrl: 'https://www.w3.org/TR/css-masking-1/',
  },
  'visibility': {
    zh: '可见性',
    description: 'visibility 属性控制元素是否可见。与 display: none 不同，visibility: hidden 的元素仍占据布局空间。',
    sectionRef: 'visual-effects#visibility',
    css2Url: `${CSS22}/visufx.html#visibility`,
    specUrl: 'https://www.w3.org/TR/css-display-3/',
  },
  'opacity': {
    zh: '不透明度',
    description: 'opacity 属性定义元素及其所有子元素的不透明程度，取值 0（完全透明）到 1（完全不透明）。设置 opacity 会创建新的层叠上下文。',
    sectionRef: 'visual-effects#opacity',
    specUrl: 'https://www.w3.org/TR/css-color-4/#transparency',
  },
  'filter': {
    zh: '滤镜',
    description: 'CSS filter 属性对元素应用图像滤镜效果，如模糊、亮度调整、对比度、灰度等。可以组合多个滤镜函数。',
    sectionRef: 'visual-effects#filters',
    specUrl: 'https://www.w3.org/TR/filter-effects-1/',
  },
  'blend mode': {
    zh: '混合模式',
    description: '混合模式定义元素与其背景或下层内容如何混合。mix-blend-mode 控制元素混合，background-blend-mode 控制背景混合。',
    sectionRef: 'visual-effects#filters',
    specUrl: 'https://www.w3.org/TR/compositing-1/',
  },
  'backdrop-filter': {
    zh: '背景滤镜',
    description: 'backdrop-filter 对元素背后的内容应用滤镜效果，常用于实现毛玻璃效果。需要元素背景半透明才能看到效果。',
    sectionRef: 'visual-effects#filters',
    specUrl: 'https://www.w3.org/TR/filter-effects-2/#BackdropFilterProperty',
  },
  'clip-path': {
    zh: '裁剪路径',
    description: 'clip-path 属性使用形状或路径裁剪元素的可见区域。支持基本形状（circle、ellipse、polygon、inset）和 SVG 路径引用。',
    sectionRef: 'visual-effects#clipping',
    specUrl: 'https://www.w3.org/TR/css-masking-1/#the-clip-path',
  },
  'mask': {
    zh: '遮罩',
    description: 'CSS 遮罩技术使用图像的亮度或 alpha 通道来控制元素内容的可见性。与裁剪不同，遮罩支持渐变透明度，可以创建半透明效果。',
    sectionRef: 'visual-effects#masking',
    specUrl: 'https://www.w3.org/TR/css-masking-1/',
  },
  'mask layer': {
    zh: '遮罩层',
    description: '多层遮罩可以叠加使用，通过 mask-composite 属性控制层间的合成方式（并集、交集、差集、异或）。',
    sectionRef: 'visual-effects#masking',
    specUrl: 'https://www.w3.org/TR/css-masking-1/#the-mask',
  },
  'luminance mask': {
    zh: '亮度遮罩',
    description: '使用图像的亮度值（luminance）控制透明度的遮罩类型。亮度值越高，对应区域越不透明。通过 mask-mode: luminance 启用。',
    sectionRef: 'visual-effects#masking',
    specUrl: 'https://www.w3.org/TR/css-masking-1/#the-mask-mode',
  },
  'alpha mask': {
    zh: 'Alpha 遮罩',
    description: '使用图像的 alpha 通道控制透明度的遮罩类型。alpha 值越高，对应区域越不透明。通过 mask-mode: alpha 启用（默认行为）。',
    sectionRef: 'visual-effects#masking',
    specUrl: 'https://www.w3.org/TR/css-masking-1/#the-mask-mode',
  },
  'shape-outside': {
    zh: '外部形状',
    description: 'shape-outside 属性定义浮动元素的浮动区域形状，使相邻的行内内容可以环绕非矩形形状排列。仅对浮动元素有效。',
    sectionRef: 'visual-effects#shapes',
    specUrl: 'https://www.w3.org/TR/css-shapes-1/#shape-outside-property',
  },
  'float area': {
    zh: '浮动区域',
    description: '浮动元素影响相邻行内内容排列的区域。CSS Shapes 允许通过 shape-outside 将默认的矩形浮动区域改为圆形、多边形等非矩形形状。',
    sectionRef: 'visual-effects#shapes',
    specUrl: 'https://www.w3.org/TR/css-shapes-1/#float-area',
  },
  'shape-image-threshold': {
    zh: '形状图像阈值',
    description: '当 shape-outside 使用图像时，shape-image-threshold 属性设置 alpha 值阈值（0.0-1.0）。图像中 alpha 值高于此阈值的像素区域将形成浮动形状。',
    sectionRef: 'visual-effects#shapes',
    specUrl: 'https://www.w3.org/TR/css-shapes-1/#shape-image-threshold-property',
  },
};

// ============================================================
// 属性表
// ============================================================

export const propertyTerms: Record<string, PropertyEntry> = {
  // NOTE: overflow, visibility, clip, opacity 已在 common.ts 中定义
  // 这里仅定义新属性：overflow-x, overflow-y, clip-path, filter, backdrop-filter, mix-blend-mode

  'overflow-x': {
    zh: '水平溢出处理',
    value: 'visible | hidden | clip | scroll | auto',
    initial: 'visible',
    appliesTo: '块级容器、flex 容器、grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '通常为指定值，visible/clip 在某些情况下计算为 auto/hidden',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-overflow-3/#overflow-properties',
    sectionRef: 'visual-effects#overflow',
  },
  'overflow-y': {
    zh: '垂直溢出处理',
    value: 'visible | hidden | clip | scroll | auto',
    initial: 'visible',
    appliesTo: '块级容器、flex 容器、grid 容器',
    inherited: false,
    percentages: null,
    computedValue: '通常为指定值，visible/clip 在某些情况下计算为 auto/hidden',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-overflow-3/#overflow-properties',
    sectionRef: 'visual-effects#overflow',
  },
  'clip-path': {
    zh: '裁剪路径',
    value: '<clip-source> | [ <basic-shape> || <geometry-box> ] | none',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于除 <defs> 外的容器元素和所有图形元素',
    inherited: false,
    percentages: '相对于引用框的尺寸',
    computedValue: '指定值（<basic-shape> 的值会计算为绝对长度，除非使用百分比）',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/css-masking-1/#the-clip-path',
    sectionRef: 'visual-effects#clipping',
  },
  'filter': {
    zh: '滤镜',
    value: 'none | <filter-function-list>',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/filter-effects-1/#FilterProperty',
    sectionRef: 'visual-effects#filters',
  },
  'backdrop-filter': {
    zh: '背景滤镜',
    value: 'none | <filter-function-list>',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/filter-effects-2/#BackdropFilterProperty',
    sectionRef: 'visual-effects#filters',
  },
  'mix-blend-mode': {
    zh: '混合模式',
    value: '<blend-mode> | normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/compositing-1/#mix-blend-mode',
    sectionRef: 'visual-effects#filters',
  },
  'background-blend-mode': {
    zh: '背景混合模式',
    value: '<blend-mode>#',
    initial: 'normal',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://www.w3.org/TR/compositing-1/#background-blend-mode',
    sectionRef: 'visual-effects#filters',
  },
  'mask-image': {
    zh: '遮罩图像',
    value: '<mask-reference>#',
    initial: 'none',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-image`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-mode': {
    zh: '遮罩模式',
    value: '<masking-mode>#',
    initial: 'match-source',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-mode`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-repeat': {
    zh: '遮罩重复',
    value: '<repeat-style>#',
    initial: 'repeat',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: null,
    computedValue: '由两个关键字组成的列表，每个方向一个',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-repeat`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-position': {
    zh: '遮罩位置',
    value: '<position>#',
    initial: '0% 0%',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: '相对于遮罩定位区域的尺寸',
    computedValue: '由两个关键字表示的偏移量，加上长度或百分比的偏移起点',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-position`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-size': {
    zh: '遮罩大小',
    value: '<bg-size>#',
    initial: 'auto',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: '相对于遮罩定位区域的尺寸',
    computedValue: '指定值，长度转为绝对值',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-size`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-origin': {
    zh: '遮罩原点',
    value: '<geometry-box>#',
    initial: 'border-box',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-origin`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-clip': {
    zh: '遮罩裁剪',
    value: '[ <geometry-box> | no-clip ]#',
    initial: 'border-box',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-clip`,
    sectionRef: 'visual-effects#masking',
  },
  'mask-composite': {
    zh: '遮罩合成',
    value: '<compositing-operator>#',
    initial: 'add',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: `${MASKING}#the-mask-composite`,
    sectionRef: 'visual-effects#masking',
  },
  'mask': {
    zh: '遮罩（简写）',
    value: '<mask-layer>#',
    initial: '见各独立属性',
    appliesTo: '所有元素；在 SVG 中应用于容器元素（除 <defs>）和所有图形元素',
    inherited: false,
    percentages: '见各独立属性',
    computedValue: '见各独立属性',
    css2Url: '',
    css3Url: `${MASKING}#the-mask`,
    sectionRef: 'visual-effects#masking',
  },
  'shape-outside': {
    zh: '外部形状',
    value: 'none | [ <basic-shape> || <shape-box> ] | <image>',
    initial: 'none',
    appliesTo: '浮动元素',
    inherited: false,
    percentages: '相对于浮动元素的包含块',
    computedValue: '指定值，<basic-shape> 的长度值转为绝对值',
    css2Url: '',
    css3Url: `${SHAPES}#shape-outside-property`,
    sectionRef: 'visual-effects#shapes',
  },
  'shape-margin': {
    zh: '形状外边距',
    value: '<length-percentage [0,∞]>',
    initial: '0',
    appliesTo: '浮动元素',
    inherited: false,
    percentages: '相对于浮动元素的包含块宽度',
    computedValue: '计算后的 <length-percentage> 值',
    css2Url: '',
    css3Url: `${SHAPES}#shape-margin-property`,
    sectionRef: 'visual-effects#shapes',
  },
  'shape-image-threshold': {
    zh: '形状图像阈值',
    value: '<opacity-value>',
    initial: '0.0',
    appliesTo: '浮动元素',
    inherited: false,
    percentages: null,
    computedValue: '指定的数字，限制在 [0,1] 范围内',
    css2Url: '',
    css3Url: `${SHAPES}#shape-image-threshold-property`,
    sectionRef: 'visual-effects#shapes',
  },
};
