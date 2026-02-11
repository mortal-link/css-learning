import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'transforms-2d',
    number: '1',
    title: { zh: '2D 变换', en: '2D Transforms' },
    summary: {
      zh: 'CSS 2D 变换允许你在二维空间中平移、旋转、缩放和倾斜元素。通过 transform 属性和各种变换函数,你可以改变元素的视觉呈现而不影响文档流。',
      en: 'CSS 2D transforms allow you to translate, rotate, scale, and skew elements in two-dimensional space. Using the transform property and various transform functions, you can change the visual presentation of elements without affecting document flow.',
    },
    keyPoints: [
      'transform 属性应用一个或多个变换函数,函数从左到右依次后乘生成最终变换矩阵',
      'translate() 平移、rotate() 旋转、scale() 缩放、skew() 倾斜',
      'transform-origin 设置变换的基准点(默认为元素中心 50% 50%)',
      'matrix() 函数提供底层的 2D 变换矩阵控制(6 个参数的 3x2 矩阵)',
      '变换不影响文档流和布局,但会影响 overflow 区域的计算',
      '任何非 none 的 transform 值会创建层叠上下文(stacking context)',
      '变换元素会为所有后代建立包含块,包括 fixed 定位的后代元素',
      'CSS Transforms 2 新增独立属性: translate、rotate、scale,可分别设置且按固定顺序应用',
      'transform-box 指定变换的参考框(content-box、border-box 等)',
    ],
    tutorial: [
      { type: 'heading', text: '什么是 CSS 变换?' },
      { type: 'paragraph', text: 'CSS 变换允许你在不改变文档流的前提下,对元素进行平移、旋转、缩放和倾斜操作。变换只影响元素的**视觉呈现**,不会触发文档重排(reflow),因此性能优异,特别适合动画和交互效果。理解变换的关键在于:它改变的是元素在屏幕上的最终渲染位置和形状,但元素在布局中的原始位置和尺寸保持不变。' },

      { type: 'heading', text: '基本变换函数' },
      { type: 'code', lang: 'css', caption: '四种基本 2D 变换', code: `/* 平移:沿 X 和 Y 轴移动元素 */\n.box { transform: translate(50px, 100px); }\n.box { transform: translateX(50px); }  /* 只沿 X 轴 */\n.box { transform: translateY(100px); } /* 只沿 Y 轴 */\n\n/* 旋转:围绕 transform-origin 旋转 */\n.box { transform: rotate(45deg); }     /* 顺时针旋转 45 度 */\n.box { transform: rotate(-30deg); }    /* 逆时针旋转 30 度 */\n\n/* 缩放:改变元素尺寸 */\n.box { transform: scale(1.5); }        /* 等比放大 1.5 倍 */\n.box { transform: scale(2, 0.5); }     /* X 轴 2 倍,Y 轴 0.5 倍 */\n.box { transform: scaleX(0.8); }       /* 只缩放 X 轴 */\n\n/* 倾斜:沿 X 或 Y 轴剪切元素 */\n.box { transform: skew(15deg, 10deg); } /* X 轴倾斜 15°,Y 轴 10° */\n.box { transform: skewX(20deg); }       /* 只沿 X 轴倾斜 */` },

      { type: 'example', title: '平移 translate() 的实际用途', lang: 'css', code: `/* 场景 1:实现绝对居中 */\n.modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  /* translate 的百分比是相对于元素自身尺寸,\n     而 top/left 的百分比相对于包含块 */\n}\n\n/* 场景 2:悬停时向上浮动 */\n.card {\n  transition: transform 0.3s;\n}\n.card:hover {\n  transform: translateY(-10px);\n}`, explanation: '`translate()` 的百分比值相对于**元素自身的尺寸**,这与 `top`/`left` 的百分比(相对于包含块)不同。这使得 `translate(-50%, -50%)` 成为实现绝对居中的最佳方案——无论元素尺寸如何变化,都能保持居中。' },

      { type: 'tip', text: 'translate() 比改变 position 的 top/left 更高效,因为 transform 在合成(compositing)阶段处理,不会触发重排。所以动画位置变化时,优先用 transform: translate() 而不是改变 top/left。' },

      { type: 'heading', text: '组合多个变换:顺序很重要' },
      { type: 'paragraph', text: 'transform 属性可以接受多个变换函数,用空格分隔。这些函数从左到右依次应用,顺序不同会产生完全不同的结果。在数学上,这对应于矩阵的"后乘"(post-multiply)。' },

      { type: 'example', title: '变换顺序的影响', lang: 'css', code: `/* 先平移再旋转 */\n.box-a {\n  transform: translate(100px, 0) rotate(45deg);\n  /* 1. 向右移动 100px\n     2. 在新位置旋转 45° */\n}\n\n/* 先旋转再平移 */\n.box-b {\n  transform: rotate(45deg) translate(100px, 0);\n  /* 1. 在原位置旋转 45°\n     2. 沿着旋转后的 X 轴移动 100px(斜向移动!) */\n}\n\n/* 典型应用:卡片翻转效果 */\n.card {\n  transform: rotateY(0deg) scale(1);\n  transition: transform 0.6s;\n}\n.card:hover {\n  transform: rotateY(180deg) scale(1.1);\n}`, explanation: '第一个例子中,box-a 先向右平移 100px,然后在新位置原地旋转。box-b 先旋转 45°,然后沿着**旋转后的坐标系**平移——相当于向右上方移动。理解这个顺序依赖性对于创建复杂动画至关重要。' },

      { type: 'warning', text: '常见错误:想让元素"原地旋转然后移到右边",写成 `transform: rotate(45deg) translate(100px, 0)`,结果元素斜着飞走了。正确写法是 `transform: translate(100px, 0) rotate(45deg)`——先移动到目标位置,再旋转。' },

      { type: 'heading', text: 'transform-origin:变换的基准点' },
      { type: 'paragraph', text: 'transform-origin 定义变换的**基准点**。默认值是元素的中心点 `50% 50%`。改变基准点会显著影响旋转、缩放和倾斜的视觉效果(但不影响平移,因为平移不依赖基准点)。' },

      { type: 'code', lang: 'css', caption: 'transform-origin 的不同设置', code: `/* 默认:围绕中心旋转 */\n.box { transform-origin: center; }  /* 或 50% 50% */\n\n/* 围绕左上角旋转 */\n.box { transform-origin: top left; }  /* 或 0 0 */\n\n/* 围绕右下角旋转 */\n.box { transform-origin: bottom right; }  /* 或 100% 100% */\n\n/* 精确像素位置 */\n.box { transform-origin: 20px 40px; }\n\n/* 实际应用:时钟指针 */\n.clock-hand {\n  transform-origin: bottom center;  /* 指针底部中心为轴 */\n  transform: rotate(90deg);\n}`, explanation: 'transform-origin 可以用关键字(top/bottom/left/right/center)、百分比或像素值。百分比相对于元素自身的边界框。对于旋转效果,基准点就是"旋转轴心";对于缩放,基准点是"缩放固定点"。' },

      { type: 'example', title: '卡片翻转:transform-origin 实战', lang: 'css', code: `.card-container {\n  perspective: 1000px;\n}\n\n.card {\n  width: 200px;\n  height: 300px;\n  transform-origin: center right;  /* 右边缘为轴 */\n  transition: transform 0.6s;\n}\n\n.card-container:hover .card {\n  transform: rotateY(-90deg);  /* 像门一样向左翻开 */\n}`, explanation: '这个例子实现了"像打开书页"的翻转效果。通过设置 `transform-origin: center right`,卡片围绕其右边缘旋转,而不是中心。如果改为 `left`,效果就像向右翻开。' },

      { type: 'heading', text: '变换不影响文档流' },
      { type: 'paragraph', text: 'transform 改变的只是元素的**渲染位置**,不会影响文档布局。元素在布局中的原始空间仍然被占据,周围元素不会移动。这与 position: relative 的行为类似。' },

      { type: 'code', lang: 'html', caption: '变换不影响周围元素', code: `<div class="container">\n  <div class="box">盒子 A</div>\n  <div class="box transformed">盒子 B</div>\n  <div class="box">盒子 C</div>\n</div>\n\n<style>\n.box {\n  width: 100px;\n  height: 100px;\n  margin: 10px;\n}\n.transformed {\n  transform: translate(50px, 20px) scale(1.5);\n  /* 盒子 B 的渲染位置移动并放大,\n     但 A 和 C 的位置保持不变,\n     就好像 B 仍在原来的位置 */\n}\n</style>` },

      { type: 'heading', text: '新的独立变换属性(CSS Transforms Level 2)' },
      { type: 'paragraph', text: 'CSS Transforms Level 2 引入了三个独立属性:`translate`、`rotate`、`scale`。它们可以单独设置,无需写在 transform 中。关键优势:可以单独修改一个变换类型,无需重写整个 transform 声明。而且它们有固定的应用顺序:translate → rotate → scale。' },

      { type: 'code', lang: 'css', caption: '独立变换属性 vs transform', code: `/* 传统方式:所有变换写在一起 */\n.box {\n  transform: translate(50px, 0) rotate(45deg) scale(1.2);\n}\n.box:hover {\n  /* 想只改变缩放,但必须重写整个 transform */\n  transform: translate(50px, 0) rotate(45deg) scale(1.5);\n}\n\n/* 新方式:分开声明,按需修改 */\n.box {\n  translate: 50px 0;\n  rotate: 45deg;\n  scale: 1.2;\n}\n.box:hover {\n  /* 只覆盖 scale,translate 和 rotate 保持不变 */\n  scale: 1.5;\n}`, explanation: '独立属性的应用顺序是固定的:先 translate,再 rotate,最后 scale。这个顺序无法改变。如果需要其他顺序,仍然要用 transform 属性。浏览器支持:Chrome 104+, Firefox 72+, Safari 14.1+。' },

      { type: 'heading', text: '变换创建层叠上下文和包含块' },
      { type: 'paragraph', text: '任何非 `none` 的 transform 值都会触发两个重要副作用:创建新的**层叠上下文**(stacking context)和成为所有后代元素的**包含块**(containing block)——包括 `position: fixed` 的后代。' },

      { type: 'example', title: 'transform 使 fixed 定位失效', lang: 'css', code: `/* 问题代码 */\n.modal-overlay {\n  transform: scale(1);  /* 即使只是 scale(1) 也会触发! */\n}\n\n.close-button {\n  position: fixed;  /* 期望相对于视口固定 */\n  top: 20px;\n  right: 20px;\n  /* 实际效果:相对于 .modal-overlay 定位! */\n}\n\n/* 解决方案:把 fixed 元素移到 transform 元素外部 */\n<div class="modal-overlay"></div>\n<button class="close-button">×</button>`, explanation: '这是最常见的 transform 陷阱。当祖先元素有 transform(即使是 `scale(1)` 这种不改变外观的变换),`position: fixed` 的子元素会**相对于该祖先定位**,而不是视口。解决方法:将 fixed 元素移到 DOM 树的外层,或者移除祖先的 transform。' },

      { type: 'warning', text: 'transform 创建层叠上下文意味着 z-index 的范围被限制在该上下文内。如果两个元素的共同祖先有 transform,无论它们的 z-index 设多大,都无法穿插到祖先外部的元素之间。' },

      { type: 'heading', text: 'matrix() 函数:底层变换矩阵' },
      { type: 'paragraph', text: '所有 2D 变换最终都会被转换为一个 3×2 变换矩阵,matrix(a, b, c, d, e, f) 允许你直接指定这 6 个参数。一般情况下不需要手动写 matrix,但理解它有助于调试复杂变换。' },

      { type: 'code', lang: 'css', caption: 'transform 函数与 matrix 的等价关系', code: `/* translate(tx, ty) 等价于 */\ntransform: matrix(1, 0, 0, 1, tx, ty);\n\n/* scale(sx, sy) 等价于 */\ntransform: matrix(sx, 0, 0, sy, 0, 0);\n\n/* rotate(θ) 等价于 */\ntransform: matrix(cos(θ), sin(θ), -sin(θ), cos(θ), 0, 0);\n\n/* 组合变换会自动合并为一个 matrix */\ntransform: translate(50px, 0) rotate(45deg);\n/* 浏览器计算后的 computed value:\n   matrix(0.707, 0.707, -0.707, 0.707, 50, 0) */` },

      { type: 'tip', text: '在浏览器开发者工具中查看元素的 computed style,所有 transform 都会显示为 matrix() 或 matrix3d()。这是浏览器内部的统一表示形式。你写的 translate/rotate/scale 只是语法糖,最终都会转换为矩阵。' },
    ] as TutorialBlock[],
  },
  {
    id: 'transforms-3d',
    number: '2',
    title: { zh: '3D 变换', en: '3D Transforms' },
    summary: {
      zh: 'CSS 3D 变换扩展了 2D 变换,允许在三维空间中操作元素。perspective 属性定义透视深度,创建 3D 视觉效果。',
      en: 'CSS 3D transforms extend 2D transforms, allowing manipulation of elements in three-dimensional space. The perspective property defines perspective depth, creating 3D visual effects.',
    },
    keyPoints: [
      'perspective 定义观察者与 z=0 平面的距离,值越小 3D 效果越强烈',
      'translate3d()、rotate3d()、scale3d() 提供三维变换,translateZ() 控制 Z 轴位移',
      'transform-style: preserve-3d 保持子元素的 3D 空间,建立或扩展 3D 渲染上下文',
      'backface-visibility: hidden 使元素背面不可见,常用于卡片翻转效果',
      'perspective-origin 设置 3D 透视的消失点位置(默认 50% 50%)',
      '3D 渲染上下文中的元素可以互相交叉(intersect),使用 Newell 算法进行深度排序',
      '某些 CSS 属性(overflow 非 visible、opacity < 1、filter)会强制 preserve-3d 降级为 flat',
      '累积 3D 变换矩阵(accumulated 3D transformation matrix)决定元素在 3D 渲染上下文中的最终位置',
      'perspective() 变换函数可直接写在 transform 中,与 perspective 属性效果类似但作用范围不同',
      'matrix3d() 函数接受 16 个参数,提供完整的 4x4 齐次变换矩阵控制',
    ],
    tutorial: [
      { type: 'heading', text: '理解 3D 空间与透视' },
      { type: 'paragraph', text: 'CSS 3D 变换引入了 Z 轴——垂直于屏幕的深度轴。正 Z 值表示元素向观察者移动(靠近屏幕),负 Z 值表示远离。但要看到 3D 效果,必须设置**透视**(perspective),它模拟人眼观察三维物体的方式:近大远小。' },

      { type: 'heading', text: 'perspective:定义观察距离' },
      { type: 'paragraph', text: 'perspective 属性设置在**父元素**上,定义观察者与 z=0 平面之间的距离。这个距离决定了 3D 效果的强烈程度:值越小,透视越强烈;值越大,接近正交投影(无透视)。' },

      { type: 'code', lang: 'css', caption: 'perspective 的典型用法', code: `/* 在父容器上设置透视 */\n.scene {\n  perspective: 800px;  /* 观察距离 800px */\n  /* 常用值:400px(强透视)到 1200px(弱透视) */\n}\n\n.card {\n  transform: rotateY(45deg);\n  /* 在父级的透视环境中旋转,产生 3D 效果 */\n}` },

      { type: 'example', title: 'perspective 值的视觉差异', lang: 'css', code: `/* 强透视:3D 效果夸张 */\n.scene-strong {\n  perspective: 400px;\n}\n.scene-strong .card {\n  transform: rotateY(60deg);\n  /* 卡片看起来非常倾斜,远端明显缩小 */\n}\n\n/* 弱透视:3D 效果平缓 */\n.scene-weak {\n  perspective: 1200px;\n}\n.scene-weak .card {\n  transform: rotateY(60deg);\n  /* 卡片倾斜角度较平缓,接近正交投影 */\n}\n\n/* 无透视:看不到 3D 效果 */\n.scene-none {\n  /* 没有 perspective */\n}\n.scene-none .card {\n  transform: rotateY(60deg);\n  /* 卡片只是被水平压缩,看不到深度感 */\n}`, explanation: 'perspective 是 3D 变换的基础。没有它,rotateX/rotateY/translateZ 等 3D 变换不会产生透视效果,元素只是被压扁或拉伸。常用的 perspective 值在 600px-1000px 之间,具体取决于设计需求。' },

      { type: 'heading', text: 'perspective 属性 vs perspective() 函数' },
      { type: 'paragraph', text: '有两种方式设置透视:在父元素上用 perspective 属性,或在元素自身的 transform 中用 perspective() 函数。它们的**作用范围**不同。' },

      { type: 'code', lang: 'css', caption: '两种透视方式的对比', code: `/* 方式 1:父级 perspective 属性(推荐) */\n.scene {\n  perspective: 800px;  /* 作用于所有子元素 */\n}\n.card-1 { transform: rotateY(30deg); }\n.card-2 { transform: rotateY(-30deg); }\n/* 两张卡片共享同一个消失点,形成统一的 3D 场景 */\n\n/* 方式 2:自身 perspective() 函数 */\n.card-1 {\n  transform: perspective(800px) rotateY(30deg);\n  /* 透视只作用于这一个元素 */\n}\n.card-2 {\n  transform: perspective(800px) rotateY(-30deg);\n  /* 每个元素有各自的消失点 */\n}`, explanation: '用父级 perspective 属性时,多个子元素共享同一个透视空间,形成统一的 3D 场景(如立方体的各个面)。用 perspective() 函数时,每个元素有独立的透视,适合单个元素的 3D 效果。' },

      { type: 'tip', text: '创建 3D 场景(如卡片堆叠、立方体、翻转效果)时,在父容器上设置 perspective 属性。如果只是给单个元素添加轻微的 3D 感,可以用 perspective() 函数。' },

      { type: 'heading', text: '3D 旋转:rotateX、rotateY、rotateZ' },
      { type: 'code', lang: 'css', caption: '三个轴向的旋转', code: `/* rotateX:围绕 X 轴旋转(上下翻转) */\n.card { transform: rotateX(45deg); }\n/* 元素上边缘向后倾,下边缘向前 */\n\n/* rotateY:围绕 Y 轴旋转(左右翻转) */\n.card { transform: rotateY(45deg); }\n/* 元素左边缘向后退,右边缘向前 */\n\n/* rotateZ:围绕 Z 轴旋转(平面旋转,等同于 rotate()) */\n.card { transform: rotateZ(45deg); }\n/* 等同于 2D 的 rotate(45deg) */\n\n/* rotate3d:围绕任意轴旋转 */\n.card { transform: rotate3d(1, 1, 0, 45deg); }\n/* 围绕向量 (1, 1, 0) 旋转 45°(对角线轴) */` },

      { type: 'example', title: '经典应用:卡片翻转', lang: 'css', code: `.flip-container {\n  perspective: 1000px;\n}\n\n.card {\n  width: 300px;\n  height: 200px;\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform 0.6s;\n}\n\n.flip-container:hover .card {\n  transform: rotateY(180deg);\n}\n\n.card-front,\n.card-back {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  backface-visibility: hidden;\n}\n\n.card-back {\n  transform: rotateY(180deg);\n}`, explanation: '这是 3D 变换最经典的应用。通过 rotateY(180deg) 翻转卡片,backface-visibility: hidden 确保背面不可见。卡片正面和背面都是绝对定位叠加在一起,初始时背面已经预先旋转 180°,所以当卡片翻转时,背面恰好朝向观察者。' },

      { type: 'heading', text: 'transform-style: preserve-3d' },
      { type: 'paragraph', text: '默认情况下,元素的子元素在 2D 平面上渲染(扁平化)。要创建真正的 3D 场景,必须在父元素上设置 `transform-style: preserve-3d`,使子元素保持各自的 3D 位置,建立**3D 渲染上下文**。' },

      { type: 'code', lang: 'css', caption: 'preserve-3d vs flat', code: `/* 默认:子元素被扁平化 */\n.container {\n  transform-style: flat;  /* 默认值 */\n}\n.child {\n  transform: translateZ(50px);\n  /* translateZ 无效,子元素仍在 2D 平面 */\n}\n\n/* 保持 3D 空间 */\n.container {\n  transform-style: preserve-3d;\n}\n.child-1 { transform: translateZ(50px); }   /* 向前 50px */\n.child-2 { transform: translateZ(-30px); }  /* 向后 30px */\n/* 子元素在 Z 轴上有真实的深度差异 */` },

      { type: 'example', title: '创建 3D 立方体', lang: 'css', code: `.cube {\n  width: 200px;\n  height: 200px;\n  position: relative;\n  transform-style: preserve-3d;  /* 关键! */\n  transform: rotateX(-20deg) rotateY(30deg);\n}\n\n.cube-face {\n  position: absolute;\n  width: 200px;\n  height: 200px;\n  opacity: 0.8;\n}\n\n.front  { transform: translateZ(100px); }\n.back   { transform: rotateY(180deg) translateZ(100px); }\n.right  { transform: rotateY(90deg) translateZ(100px); }\n.left   { transform: rotateY(-90deg) translateZ(100px); }\n.top    { transform: rotateX(90deg) translateZ(100px); }\n.bottom { transform: rotateX(-90deg) translateZ(100px); }`, explanation: '立方体由 6 个面组成,每个面先旋转到对应方向,再沿 Z 轴移动立方体的一半宽度(100px)。`transform-style: preserve-3d` 使所有面保持各自的 3D 位置,形成立体结构。' },

      { type: 'warning', text: '某些 CSS 属性会强制 preserve-3d 降级为 flat,导致 3D 效果消失:overflow(非 visible/clip)、opacity < 1、filter、clip-path、mask。如果你的 3D 场景突然变平了,检查是否意外添加了这些属性。' },

      { type: 'heading', text: 'backface-visibility:控制背面可见性' },
      { type: 'paragraph', text: '当元素通过 3D 旋转使背面朝向观察者时,backface-visibility 决定背面是否可见。默认值 visible 会显示镜像的背面内容;设为 hidden 则背面完全透明。' },

      { type: 'code', lang: 'css', caption: 'backface-visibility 的实际用途', code: `/* 卡片翻转场景 */\n.card-front,\n.card-back {\n  backface-visibility: hidden;\n  /* 当这一面旋转到背面时,不可见 */\n}\n\n/* 不设置的后果 */\n.card-front {\n  /* backface-visibility: visible (默认) */\n  /* 翻转过程中,背面会显示镜像的正面内容,\n     与背面内容重叠,产生闪烁 */\n}` },

      { type: 'tip', text: 'backface-visibility: hidden 是实现卡片翻转效果的必备属性。它确保在翻转过程中,只有朝向观察者的一面可见,另一面完全隐藏。' },

      { type: 'heading', text: 'perspective-origin:改变消失点' },
      { type: 'paragraph', text: 'perspective-origin 定义 3D 透视的**消失点**(vanishing point)位置,即观察者视线的方向。默认值 `50% 50%` 表示从元素中心观察。改变它相当于移动摄像机的位置。' },

      { type: 'code', lang: 'css', caption: '不同的 perspective-origin', code: `/* 从中心观察(默认) */\n.scene {\n  perspective: 800px;\n  perspective-origin: center;  /* 或 50% 50% */\n}\n\n/* 从左上角观察 */\n.scene {\n  perspective: 800px;\n  perspective-origin: left top;  /* 或 0 0 */\n  /* 3D 元素看起来向右下倾斜 */\n}\n\n/* 从右侧观察 */\n.scene {\n  perspective: 800px;\n  perspective-origin: right center;  /* 或 100% 50% */\n  /* 3D 元素看起来向左倾斜 */\n}` },

      { type: 'heading', text: '3D 平移:translateZ 和 translate3d' },
      { type: 'paragraph', text: 'translateZ() 沿 Z 轴移动元素。正值使元素靠近观察者(看起来更大),负值使元素远离(看起来更小)。translate3d(x, y, z) 同时指定三个轴的平移。' },

      { type: 'code', lang: 'css', caption: 'Z 轴平移的视觉效果', code: `/* 元素向前移动 100px */\n.card {\n  transform: translateZ(100px);\n  /* 在透视环境中,元素会变大 */\n}\n\n/* 元素向后移动 100px */\n.card {\n  transform: translateZ(-100px);\n  /* 在透视环境中,元素会变小 */\n}\n\n/* 3D 平移简写 */\n.card {\n  transform: translate3d(50px, 20px, 100px);\n  /* 等价于 translateX(50px) translateY(20px) translateZ(100px) */\n}` },

      { type: 'example', title: '悬停时的 3D 浮起效果', lang: 'css', code: `.scene {\n  perspective: 1000px;\n}\n\n.card {\n  transition: transform 0.3s;\n}\n\n.card:hover {\n  transform: translateZ(50px) rotateY(5deg);\n  /* 卡片向前浮起 50px,并轻微旋转 */\n}`, explanation: '这是现代卡片设计的常见效果:悬停时卡片"浮起来"靠近观察者。配合轻微的旋转,创造生动的交互感。' },

      { type: 'heading', text: '性能提示:will-change 与硬件加速' },
      { type: 'paragraph', text: 'CSS 3D 变换会触发硬件加速(GPU 合成),性能优异。但复杂的 3D 场景仍可能卡顿,可以用 `will-change: transform` 提示浏览器提前优化。' },

      { type: 'code', lang: 'css', caption: '优化 3D 动画性能', code: `.card {\n  will-change: transform;\n  /* 告诉浏览器这个元素的 transform 即将改变,\n     提前创建合成层 */\n}\n\n/* 动画结束后移除 will-change */\n.card.animation-done {\n  will-change: auto;\n}` },

      { type: 'warning', text: '不要过度使用 will-change。每个 will-change: transform 都会消耗额外内存创建合成层。只在真正需要优化的元素上使用,并在动画结束后移除。' },

      { type: 'heading', text: 'matrix3d():4×4 变换矩阵' },
      { type: 'paragraph', text: '所有 3D 变换最终会转换为 4×4 齐次变换矩阵。matrix3d() 接受 16 个参数,提供完全的底层控制。一般不需要手写,但浏览器的 computed value 会显示为 matrix3d()。' },

      { type: 'code', lang: 'css', caption: 'matrix3d 示例', code: `/* 复杂的 3D 变换 */\n.element {\n  transform: translate3d(50px, 100px, 20px) rotateY(45deg) scale(1.2);\n}\n\n/* 浏览器计算后的 computed value */\n/* matrix3d(0.848, 0, 0.848, 0, 0, 1.2, 0, 0, -0.848, 0, 0.848, 0, 50, 100, 20, 1) */` },

      { type: 'tip', text: '在开发者工具中查看 computed style 时,所有 transform 都显示为 matrix() 或 matrix3d()。这是浏览器内部统一的表示方式,方便理解变换的最终结果。' },
    ] as TutorialBlock[],
  },
  {
    id: 'transitions',
    number: '3',
    title: { zh: '过渡', en: 'Transitions' },
    summary: {
      zh: 'CSS 过渡使属性值的变化在一段时间内平滑地进行,而不是瞬间完成。当元素状态改变时(如 :hover),过渡会自动触发。',
      en: 'CSS transitions allow property value changes to occur smoothly over a period of time, rather than instantaneously. Transitions are automatically triggered when element state changes (such as :hover).',
    },
    keyPoints: [
      'transition-property 指定要过渡的属性(或使用 all),不可动画属性会被忽略',
      'transition-duration 设置过渡持续时间,0s 表示无过渡效果',
      'transition-timing-function 定义缓动曲线(ease、linear、cubic-bezier 等)',
      'transition-delay 设置延迟,负值会跳过前面的部分直接从中途开始播放',
      'transition 简写属性: property duration timing-function delay',
      '过渡事件: transitionrun(创建时)、transitionstart(延迟结束)、transitionend(完成)、transitioncancel(取消)',
      '当属性值在过渡进行中被反向更改时,浏览器会智能反转过渡(reversing shortcut)',
      'display:none 会取消所有正在运行的过渡;从 none 切换回来不会触发过渡',
      '过渡在 CSS 层叠中覆盖普通规则,但会被 !important 规则覆盖',
      '简写属性(如 margin)会展开为各个子属性分别过渡',
    ],
    tutorial: [
      { type: 'heading', text: '什么是 CSS 过渡?' },
      { type: 'paragraph', text: 'CSS 过渡(transitions)提供了一种在 CSS 属性值发生变化时创建平滑动画的方式。当属性值从 A 变为 B 时(如鼠标悬停、点击、JavaScript 修改类名),过渡会在指定的时间内平滑地从旧值过渡到新值,而不是瞬间跳变。这是实现交互反馈最简单的方式——无需编写复杂的动画代码。' },

      { type: 'heading', text: '基本语法:四个子属性' },
      { type: 'code', lang: 'css', caption: 'transition 的四个子属性', code: `/* 完整写法 */\n.button {\n  background-color: blue;\n  transition-property: background-color;  /* 要过渡的属性 */\n  transition-duration: 0.3s;              /* 持续时间 */\n  transition-timing-function: ease;       /* 缓动函数 */\n  transition-delay: 0s;                   /* 延迟时间 */\n}\n\n.button:hover {\n  background-color: red;\n  /* 背景色在 0.3 秒内从蓝色平滑过渡到红色 */\n}\n\n/* 简写形式 */\n.button {\n  transition: background-color 0.3s ease 0s;\n  /* property duration timing-function delay */\n}` },

      { type: 'example', title: '最常见用法:悬停效果', lang: 'css', code: `/* 按钮悬停放大 */\n.button {\n  transform: scale(1);\n  transition: transform 0.2s ease-out;\n}\n.button:hover {\n  transform: scale(1.1);\n}\n\n/* 链接下划线动画 */\n.link {\n  position: relative;\n  text-decoration: none;\n}\n.link::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background: currentColor;\n  transition: width 0.3s ease;\n}\n.link:hover::after {\n  width: 100%;\n}`, explanation: '过渡最常用于悬停效果。第一个例子中,按钮在悬停时放大到 1.1 倍,transition 使这个缩放在 0.2 秒内平滑发生。第二个例子实现了"下划线从左向右展开"的效果——伪元素的宽度从 0 过渡到 100%。' },

      { type: 'heading', text: 'transition-property:选择要过渡的属性' },
      { type: 'paragraph', text: 'transition-property 指定哪些 CSS 属性参与过渡。可以是单个属性名、多个属性名(逗号分隔)、`all`(所有可过渡属性)或 `none`(禁用过渡)。只有**可动画的属性**才能过渡(如颜色、长度、数字、transform),离散属性(如 display、visibility)不能平滑过渡。' },

      { type: 'code', lang: 'css', caption: '不同的 property 设置', code: `/* 只过渡一个属性 */\n.box {\n  transition-property: opacity;\n}\n\n/* 过渡多个属性 */\n.box {\n  transition-property: opacity, transform;\n  transition-duration: 0.3s, 0.5s;  /* 可为每个属性设置不同时长 */\n}\n\n/* 过渡所有可过渡属性 */\n.box {\n  transition-property: all;\n  /* 方便但可能影响性能,推荐明确指定属性 */\n}\n\n/* 简写中省略 property,默认为 all */\n.box {\n  transition: 0.3s ease;\n  /* 等价于 transition: all 0.3s ease; */\n}` },

      { type: 'tip', text: '虽然 `transition: all` 很方便,但可能导致意外的属性也产生过渡(如布局属性 width/height),影响性能。最佳实践:明确列出需要过渡的属性,特别是只需要过渡 transform 和 opacity 时(这两个属性性能最好)。' },

      { type: 'heading', text: 'transition-duration:持续时间' },
      { type: 'paragraph', text: 'transition-duration 指定过渡从开始到结束的时间,单位为秒(s)或毫秒(ms)。默认值是 `0s`,表示立即变化(无过渡)。不同的时长会产生不同的节奏感。' },

      { type: 'code', lang: 'css', caption: '不同时长的选择', code: `/* 快速反馈:100-200ms */\n.button {\n  transition-duration: 0.15s;\n  /* 适合按钮点击、菜单展开等即时反馈 */\n}\n\n/* 标准过渡:200-500ms */\n.card {\n  transition-duration: 0.3s;\n  /* 适合大多数悬停效果、颜色变化 */\n}\n\n/* 慢速过渡:500ms-1s */\n.modal {\n  transition-duration: 0.6s;\n  /* 适合大型元素出现、页面切换 */\n}\n\n/* 为不同属性设置不同时长 */\n.box {\n  transition-property: opacity, transform;\n  transition-duration: 0.2s, 0.4s;\n  /* opacity 快速淡出,transform 慢速移动 */\n}` },

      { type: 'warning', text: '过渡时间不是越长越好。超过 1 秒的过渡会让用户感到拖沓,等待焦虑。一般规律:小元素用短时长(100-300ms),大元素用长时长(300-600ms);即时反馈用短时长,装饰效果可以稍长。' },

      { type: 'heading', text: 'transition-timing-function:缓动曲线' },
      { type: 'paragraph', text: 'transition-timing-function 控制过渡的速率变化,决定了过渡是匀速、加速、减速还是其他节奏。CSS 提供了几个预设值,也可以用 cubic-bezier() 自定义曲线。' },

      { type: 'code', lang: 'css', caption: '常用缓动函数', code: `/* ease(默认):慢-快-慢,最自然 */\n.box { transition-timing-function: ease; }\n\n/* linear:匀速,机械感 */\n.box { transition-timing-function: linear; }\n\n/* ease-in:慢速开始,加速结束 */\n.box { transition-timing-function: ease-in; }\n\n/* ease-out:快速开始,减速结束(推荐用于出现动画) */\n.box { transition-timing-function: ease-out; }\n\n/* ease-in-out:慢-快-慢,比 ease 更对称 */\n.box { transition-timing-function: ease-in-out; }\n\n/* cubic-bezier:自定义贝塞尔曲线 */\n.box { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }\n/* 弹性效果(超出目标值再回弹) */` },

      { type: 'example', title: '不同缓动的视觉效果', lang: 'css', code: `/* 元素出现:用 ease-out(快进慢出) */\n.modal {\n  opacity: 0;\n  transform: translateY(20px);\n  transition: opacity 0.3s ease-out, transform 0.3s ease-out;\n}\n.modal.show {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n/* 元素消失:用 ease-in(慢进快出) */\n.tooltip {\n  transition: opacity 0.2s ease-in;\n}\n.tooltip.hide {\n  opacity: 0;\n}\n\n/* 交互反馈:用 ease(平衡) */\n.button:hover {\n  transition: transform 0.2s ease;\n  transform: scale(1.05);\n}`, explanation: '设计师的经验法则:元素**进入**视口时用 ease-out(快速响应,然后缓慢停下,像物体落地),元素**离开**时用 ease-in(缓慢启动,然后加速消失)。这符合物理直觉,让动画更自然。' },

      { type: 'heading', text: 'transition-delay:延迟开始' },
      { type: 'paragraph', text: 'transition-delay 指定过渡开始前的等待时间。正值会延迟过渡开始;负值会使过渡立即开始,但从中途开始播放(跳过前面的部分)。' },

      { type: 'code', lang: 'css', caption: 'delay 的实际应用', code: `/* 正常延迟:0.1 秒后开始 */\n.box {\n  transition: opacity 0.3s ease 0.1s;\n  /*                          ^^^ delay */\n}\n\n/* 负延迟:立即从 50% 进度开始 */\n.box {\n  transition: opacity 1s ease -0.5s;\n  /* 跳过前 0.5 秒,从中途开始,总共只播放 0.5 秒 */\n}\n\n/* 错开动画:创建序列效果 */\n.item:nth-child(1) { transition-delay: 0s; }\n.item:nth-child(2) { transition-delay: 0.1s; }\n.item:nth-child(3) { transition-delay: 0.2s; }\n.item:nth-child(4) { transition-delay: 0.3s; }\n/* 项目依次过渡,产生"波浪"效果 */` },

      { type: 'example', title: '菜单项依次出现', lang: 'css', code: `.menu-item {\n  opacity: 0;\n  transform: translateX(-20px);\n  transition: opacity 0.3s ease, transform 0.3s ease;\n}\n\n.menu.open .menu-item:nth-child(1) { \n  opacity: 1; \n  transform: translateX(0);\n  transition-delay: 0.05s;\n}\n.menu.open .menu-item:nth-child(2) { \n  opacity: 1; \n  transform: translateX(0);\n  transition-delay: 0.1s;\n}\n.menu.open .menu-item:nth-child(3) { \n  opacity: 1; \n  transform: translateX(0);\n  transition-delay: 0.15s;\n}\n/* 菜单打开时,各项依次从左滑入 */`, explanation: '通过为每个元素设置递增的 delay,可以创建"依次出现"的序列动画。这比同时出现更有层次感和节奏感,常用于列表、导航菜单、卡片组。' },

      { type: 'heading', text: '过渡的触发:状态变化' },
      { type: 'paragraph', text: '过渡在 CSS 属性值发生变化时**自动触发**。最常见的触发方式是伪类(:hover、:focus、:active)和类名切换(通过 JavaScript)。' },

      { type: 'list', items: [
        '**伪类触发**:`:hover`、`:focus`、`:active`、`:checked` 等状态变化',
        '**类名切换**:JavaScript 添加/移除类名(如 `.active`、`.open`)',
        '**媒体查询**:视口尺寸变化触发媒体查询内的样式变化',
        '**属性改变**:通过 JavaScript 直接修改 element.style',
      ] },

      { type: 'code', lang: 'css', caption: '不同的触发方式', code: `/* 伪类触发 */\n.button {\n  background: blue;\n  transition: background 0.3s;\n}\n.button:hover {\n  background: red;  /* 鼠标悬停时触发过渡 */\n}\n\n/* 类名切换触发 */\n.sidebar {\n  transform: translateX(-100%);\n  transition: transform 0.3s;\n}\n.sidebar.open {\n  transform: translateX(0);  /* 添加 .open 时触发过渡 */\n}\n\n/* JavaScript 切换类名 */\n// sidebar.classList.add('open');` },

      { type: 'heading', text: '过渡事件:监听过渡进度' },
      { type: 'paragraph', text: 'CSS 过渡会触发 JavaScript 事件,允许你在过渡的不同阶段执行代码。四个事件:`transitionrun`(创建时)、`transitionstart`(延迟结束,真正开始)、`transitionend`(完成)、`transitioncancel`(被中断)。' },

      { type: 'code', lang: 'javascript', caption: '监听过渡结束', code: `const box = document.querySelector('.box');\n\nbox.addEventListener('transitionend', (event) => {\n  console.log(\`过渡完成: \${event.propertyName}\`);\n  console.log(\`持续时间: \${event.elapsedTime}s\`);\n  // 可以在过渡结束后执行其他操作\n});\n\n// 示例:过渡结束后移除元素\nbox.addEventListener('transitionend', () => {\n  if (box.classList.contains('fade-out')) {\n    box.remove();\n  }\n});` },

      { type: 'tip', text: 'transitionend 事件会为每个过渡的属性触发一次。如果你同时过渡 opacity 和 transform,事件会触发两次。可以通过 event.propertyName 区分是哪个属性结束了。' },

      { type: 'heading', text: '反向过渡:智能反转' },
      { type: 'paragraph', text: '当过渡进行到一半时属性值被反向改变(如鼠标悬停一半又移开),浏览器会**智能反转过渡**,而不是跳回起点重新开始。这使得交互更流畅自然。' },

      { type: 'example', title: '过渡反转的实际效果', lang: 'css', code: `.button {\n  transform: scale(1);\n  transition: transform 0.5s ease;\n}\n.button:hover {\n  transform: scale(1.5);\n}\n\n/* 场景:\n   1. 鼠标悬停,按钮开始从 1.0 放大到 1.5\n   2. 0.25s 时(放大到 1.25),鼠标移开\n   3. 浏览器不会跳回 1.0 再过渡,而是从 1.25 平滑缩回 1.0\n   4. 反转时保持相同的缓动曲线,但镜像应用 */`, explanation: '这种反转行为称为 "reversing shortcut"。它使得快速悬停/移开鼠标时动画非常流畅,不会出现"跳跃"或"重置"。浏览器会自动计算反转的起点和速度,保持连续性。' },

      { type: 'heading', text: 'display: none 的问题' },
      { type: 'paragraph', text: '`display: none` 会立即移除元素,不会触发过渡。从 `none` 切换到 `block` 时,元素立即出现,也不会过渡。这是过渡最常见的陷阱。' },

      { type: 'code', lang: 'css', caption: 'display: none 不能过渡', code: `/* 错误:不会有淡入效果 */\n.modal {\n  display: none;\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.modal.show {\n  display: block;\n  opacity: 1;\n  /* display 立即从 none 变为 block,\n     opacity 过渡被跳过 */\n}` },

      { type: 'example', title: '正确的显示/隐藏过渡', lang: 'css', code: `/* 方案 1:用 visibility 代替 display */\n.modal {\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.3s, visibility 0s 0.3s;\n  /* visibility 延迟 0.3s 再隐藏,让 opacity 先完成 */\n}\n.modal.show {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.3s, visibility 0s;\n  /* visibility 立即可见,opacity 开始过渡 */\n}\n\n/* 方案 2:用 JavaScript 分步操作 */\n// 显示:\nmodal.style.display = 'block';\nrequestAnimationFrame(() => {\n  modal.classList.add('show');  // 下一帧添加类,触发过渡\n});\n\n// 隐藏:\nmodal.classList.remove('show');\nmodal.addEventListener('transitionend', () => {\n  modal.style.display = 'none';  // 过渡结束后隐藏\n}, { once: true });`, explanation: '方案 1 的技巧是用两组不同的 transition 声明:显示时 visibility 立即生效(delay 0s),隐藏时 visibility 延迟到 opacity 过渡结束后再隐藏(delay 0.3s)。方案 2 在显示时先设置 display,下一帧再添加类名触发过渡;隐藏时先移除类触发过渡,等过渡结束再设置 display: none。' },

      { type: 'heading', text: '性能最佳实践' },
      { type: 'list', items: [
        '**优先过渡 transform 和 opacity**:这两个属性在合成层处理,不触发重排/重绘,性能最好',
        '**避免过渡布局属性**:width/height/top/left 会触发重排,性能差。改用 transform: scale()/translate()',
        '**明确指定属性**:避免 `transition: all`,只过渡必要的属性',
        '**使用 will-change 提示**:对于频繁过渡的元素,添加 `will-change: transform` 提前优化',
      ] },

      { type: 'code', lang: 'css', caption: '性能优化对比', code: `/* ❌ 性能差:过渡 width 触发重排 */\n.box {\n  width: 100px;\n  transition: width 0.3s;\n}\n.box:hover {\n  width: 200px;\n}\n\n/* ✅ 性能好:用 transform: scaleX() */\n.box {\n  transition: transform 0.3s;\n}\n.box:hover {\n  transform: scaleX(2);\n}\n\n/* ✅ 最佳:只过渡必要属性 */\n.button {\n  transition: transform 0.2s, opacity 0.2s;\n  /* 不用 transition: all */\n}` },

      { type: 'warning', text: '过渡多个布局属性(width、height、margin、padding)可能导致明显的性能问题,特别是在低端设备上。症状:动画卡顿、掉帧。解决方法:用 transform 实现类似效果,或减少过渡的元素数量。' },
    ] as TutorialBlock[],
  },
  {
    id: 'animations',
    number: '4',
    title: { zh: '动画', en: 'Animations' },
    summary: {
      zh: 'CSS 动画通过 @keyframes 规则定义动画序列,可以创建复杂的多步动画效果。与过渡不同,动画可以自动播放,不需要状态变化触发。',
      en: 'CSS animations define animation sequences through @keyframes rules, creating complex multi-step animation effects. Unlike transitions, animations can play automatically without requiring state changes to trigger them.',
    },
    keyPoints: [
      '@keyframes 规则定义动画的关键帧序列,使用百分比(0%-100%)或 from/to 关键字',
      'animation-name 引用 @keyframes 定义的动画名称,名称区分大小写',
      'animation-duration、animation-timing-function、animation-delay 控制时间参数',
      'animation-iteration-count 控制重复次数(可为 infinite),小数值允许中途停止',
      'animation-direction 控制播放方向(normal、reverse、alternate、alternate-reverse)',
      'animation-fill-mode 定义动画前后的样式状态(none、forwards、backwards、both)',
      'animation-play-state 控制动画的播放和暂停,暂停时停留在当前帧',
      '动画事件: animationstart(开始)、animationend(结束)、animationiteration(迭代)、animationcancel(取消)',
      '动画在层叠中覆盖普通规则但被 !important 覆盖;多个同名动画按 animation-name 列表顺序后者优先',
      'display:none 会终止所有动画;运行中的动画自动触发 will-change 行为以优化性能',
    ],
    tutorial: [
      { type: 'heading', text: 'CSS 动画 vs 过渡:核心区别' },
      { type: 'paragraph', text: 'CSS 动画与过渡都能创建动效,但适用场景不同。**过渡**(transitions)是状态驱动的:需要属性值发生变化才会触发,适合交互反馈(悬停、点击)。**动画**(animations)是时间驱动的:可以自动播放、循环、暂停,支持多个关键帧,适合复杂的动画序列(加载指示器、背景动画、入场动画)。' },

      { type: 'heading', text: '@keyframes:定义动画序列' },
      { type: 'paragraph', text: '@keyframes 规则定义动画的关键帧——即动画在不同时间点的样式状态。浏览器会自动计算关键帧之间的中间帧,创建平滑的动画效果。' },

      { type: 'code', lang: 'css', caption: '@keyframes 基本语法', code: `/* 使用百分比定义关键帧 */\n@keyframes slide-in {\n  0% {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n/* 使用 from/to 简写(仅适用于两帧动画) */\n@keyframes fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n/* 多个时间点共享样式 */\n@keyframes pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}` },

      { type: 'tip', text: '@keyframes 的名称区分大小写。`fadeIn` 和 `fadein` 是两个不同的动画。推荐使用 kebab-case 命名(如 `fade-in`、`slide-up`)以保持一致性。' },

      { type: 'heading', text: '应用动画:animation 属性' },
      { type: 'paragraph', text: '定义好 @keyframes 后,用 animation 属性将其应用到元素上。最简单的形式是指定动画名称和持续时间。' },

      { type: 'example', title: '最简单的动画', lang: 'css', code: `/* 定义动画 */\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n\n/* 应用动画 */\n.ball {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background: red;\n  animation: bounce 1s infinite;\n  /*         名称   时长  循环 */\n}`, explanation: '这个例子创建了一个弹跳的球。动画名为 `bounce`,持续 1 秒,无限循环播放。球在 0% 和 100% 时在原位,50% 时向上移动 20px,浏览器自动补间中间的位置,形成上下弹跳效果。' },

      { type: 'heading', text: 'animation-duration 和 animation-delay' },
      { type: 'paragraph', text: 'animation-duration 设置动画完成一个周期的时间,animation-delay 设置动画开始前的延迟。这两个属性的行为与 transition 相同。' },

      { type: 'code', lang: 'css', caption: '时间控制', code: `/* 2 秒完成一次动画 */\n.element {\n  animation-duration: 2s;\n}\n\n/* 延迟 0.5 秒后开始 */\n.element {\n  animation-delay: 0.5s;\n}\n\n/* 负延迟:立即从中途开始 */\n.element {\n  animation-delay: -1s;\n  /* 如果 duration 是 3s,动画会从 1s 进度处开始播放 */\n}\n\n/* 完整示例:延迟后循环播放 */\n.loader {\n  animation: spin 1s linear 0.3s infinite;\n  /*         名称 时长 缓动  延迟  循环 */\n}` },

      { type: 'heading', text: 'animation-iteration-count:循环次数' },
      { type: 'paragraph', text: 'animation-iteration-count 控制动画播放的次数。可以是具体数字、小数(播放到一半停止)或 `infinite`(无限循环)。' },

      { type: 'code', lang: 'css', caption: '不同的循环设置', code: `/* 播放 1 次(默认) */\n.element { animation-iteration-count: 1; }\n\n/* 播放 3 次 */\n.element { animation-iteration-count: 3; }\n\n/* 播放 2.5 次(第 3 次播放到一半停止) */\n.element { animation-iteration-count: 2.5; }\n\n/* 无限循环(加载指示器、背景动画) */\n.spinner { animation-iteration-count: infinite; }` },

      { type: 'example', title: '加载指示器:旋转动画', lang: 'css', code: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid rgba(0, 0, 0, 0.1);\n  border-left-color: #09f;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  /*                      ^^^ 匀速  ^^^ 无限循环 */\n}`, explanation: '这是最经典的加载指示器。动画从 0° 旋转到 360°,使用 linear 缓动保持匀速,infinite 使其永不停止。border-left-color 不同色创造了"缺口"效果,旋转时看起来像在追逐。' },

      { type: 'heading', text: 'animation-direction:播放方向' },
      { type: 'paragraph', text: 'animation-direction 控制动画的播放方向。支持正向、反向和交替播放,创造往返效果。' },

      { type: 'code', lang: 'css', caption: '四种播放方向', code: `/* normal(默认):每次都从 0% 到 100% */\n.element { animation-direction: normal; }\n\n/* reverse:每次都从 100% 到 0%(倒放) */\n.element { animation-direction: reverse; }\n\n/* alternate:奇数次正向,偶数次反向(往返) */\n.element { animation-direction: alternate; }\n\n/* alternate-reverse:奇数次反向,偶数次正向 */\n.element { animation-direction: alternate-reverse; }` },

      { type: 'example', title: 'alternate 实现呼吸灯效果', lang: 'css', code: `@keyframes breathe {\n  from { opacity: 0.3; }\n  to { opacity: 1; }\n}\n\n.indicator {\n  animation: breathe 2s ease-in-out infinite alternate;\n  /*                                      ^^^ 往返播放 */\n}\n\n/* 效果:\n   第 1 次:0.3 → 1.0(正向,2s)\n   第 2 次:1.0 → 0.3(反向,2s)\n   第 3 次:0.3 → 1.0(正向,2s)\n   ...无限循环 */`, explanation: 'alternate 配合 infinite 使用时,动画会在起点和终点之间来回播放,创造"呼吸"效果。这比写成 `0% { opacity: 0.3 } 50% { opacity: 1 } 100% { opacity: 0.3 }` 简洁得多。' },

      { type: 'heading', text: 'animation-fill-mode:动画前后的状态' },
      { type: 'paragraph', text: 'animation-fill-mode 定义动画播放前和播放后元素应用什么样式。这个属性非常重要,决定了动画是否会"跳变"。' },

      { type: 'code', lang: 'css', caption: '四种填充模式', code: `/* none(默认):动画前后不应用关键帧样式 */\n.element { animation-fill-mode: none; }\n/* 动画前:元素原始样式\n   动画后:跳回元素原始样式 */\n\n/* forwards:动画结束后保持最后一帧样式 */\n.element { animation-fill-mode: forwards; }\n/* 动画后:停留在 100% 的样式(或 0% 如果是 reverse) */\n\n/* backwards:动画延迟期间应用第一帧样式 */\n.element { animation-fill-mode: backwards; }\n/* 如果有 delay,延迟期间显示 0% 的样式(或 100% 如果是 reverse) */\n\n/* both:同时应用 forwards 和 backwards */\n.element { animation-fill-mode: both; }` },

      { type: 'example', title: 'fill-mode 的实际差异', lang: 'css', code: `@keyframes slide-in {\n  from {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n/* ❌ none:动画结束后跳回原始状态 */\n.box-1 {\n  animation: slide-in 1s ease;\n  /* 滑入后又瞬间消失,因为原始 opacity 不是 1 */\n}\n\n/* ✅ forwards:动画结束后保持 */\n.box-2 {\n  animation: slide-in 1s ease forwards;\n  /* 滑入后停留在 translateX(0) opacity: 1 */\n}\n\n/* ✅ both:有延迟时,延迟期间已经准备好起始状态 */\n.box-3 {\n  animation: slide-in 1s ease 0.5s both;\n  /* 延迟 0.5s 期间已经在 translateX(-100%) opacity: 0,\n     然后开始滑入,结束后保持 */\n}`, explanation: '对于入场动画,几乎总是需要 `forwards` 或 `both`,否则动画结束后元素会跳回原始状态。`both` 特别适合有延迟的动画,确保延迟期间元素已经处于起始帧状态,而不是原始样式。' },

      { type: 'warning', text: '初学者最常犯的错误:忘记设置 fill-mode。症状:精心制作的入场动画播放完美,但结束后元素突然"跳"回原位或消失。解决方案:添加 `animation-fill-mode: forwards`。' },

      { type: 'heading', text: 'animation-play-state:播放与暂停' },
      { type: 'paragraph', text: 'animation-play-state 允许通过 CSS(如 :hover)或 JavaScript 动态暂停和恢复动画。暂停时动画停留在当前帧,而不是跳到开始或结束。' },

      { type: 'code', lang: 'css', caption: '暂停/恢复动画', code: `/* 默认:播放中 */\n.carousel {\n  animation: scroll 20s linear infinite;\n  animation-play-state: running;\n}\n\n/* 鼠标悬停时暂停 */\n.carousel:hover {\n  animation-play-state: paused;\n}\n\n/* JavaScript 控制 */\n// element.style.animationPlayState = 'paused';\n// element.style.animationPlayState = 'running';` },

      { type: 'example', title: '实用场景:轮播图暂停', lang: 'css', code: `@keyframes auto-scroll {\n  0% { transform: translateX(0); }\n  100% { transform: translateX(-50%); }\n}\n\n.carousel-track {\n  animation: auto-scroll 15s linear infinite;\n}\n\n/* 用户悬停时暂停,便于查看内容 */\n.carousel:hover .carousel-track {\n  animation-play-state: paused;\n}\n\n/* 用户切换到其他标签页时暂停(JavaScript) */\ndocument.addEventListener('visibilitychange', () => {\n  const track = document.querySelector('.carousel-track');\n  track.style.animationPlayState = \n    document.hidden ? 'paused' : 'running';\n});`, explanation: '自动轮播的内容(如证言、新闻滚动)应该在用户悬停时暂停,让用户有时间阅读。另一个常见实践是在页面不可见时暂停所有动画,节省资源。' },

      { type: 'heading', text: 'animation 简写属性' },
      { type: 'paragraph', text: 'animation 简写可以一次性设置所有子属性。顺序不严格,但有几个规则:第一个 <time> 是 duration,第二个是 delay;name 应该放最后以避免与关键字冲突。' },

      { type: 'code', lang: 'css', caption: 'animation 简写语法', code: `/* 完整语法 */\nanimation: name duration timing-function delay iteration-count direction fill-mode play-state;\n\n/* 实际例子 */\n.box {\n  animation: slide-in 0.5s ease-out 0.1s 1 normal forwards running;\n}\n\n/* 常用简写(省略默认值) */\n.box {\n  animation: slide-in 0.5s ease-out;\n  /* duration=0.5s, timing-function=ease-out,其余为默认值 */\n}\n\n/* 多个动画 */\n.box {\n  animation: \n    fade-in 0.5s ease,\n    slide-up 0.5s ease 0.1s;\n  /* 同时应用两个动画 */\n}` },

      { type: 'heading', text: '多关键帧动画:复杂序列' },
      { type: 'paragraph', text: '@keyframes 可以定义任意多个关键帧,创建复杂的多步动画序列。每个关键帧可以设置不同的属性和缓动函数。' },

      { type: 'example', title: '复杂的入场动画', lang: 'css', code: `@keyframes fancy-entrance {\n  0% {\n    transform: translateY(50px) scale(0.8) rotate(-5deg);\n    opacity: 0;\n  }\n  50% {\n    transform: translateY(-10px) scale(1.05) rotate(2deg);\n    opacity: 1;\n  }\n  70% {\n    transform: translateY(5px) scale(0.98) rotate(-1deg);\n  }\n  100% {\n    transform: translateY(0) scale(1) rotate(0deg);\n    opacity: 1;\n  }\n}\n\n.card {\n  animation: fancy-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}`, explanation: '这个入场动画分 4 步:元素从下方淡入并放大(0%),过冲到稍高位置(50%),回落一点(70%),最终稳定在目标位置(100%)。通过精心设计的关键帧和自定义缓动曲线,创造出"弹性"的效果。' },

      { type: 'heading', text: '在关键帧中覆盖缓动函数' },
      { type: 'paragraph', text: 'animation-timing-function 默认应用于整个动画周期,但可以在 @keyframes 的各个关键帧中单独指定,覆盖全局设置。' },

      { type: 'code', lang: 'css', caption: '每段使用不同缓动', code: `@keyframes complex-move {\n  0% {\n    transform: translateX(0);\n    animation-timing-function: ease-in;  /* 0%-50% 慢速启动 */\n  }\n  50% {\n    transform: translateX(200px);\n    animation-timing-function: ease-out; /* 50%-100% 慢速停止 */\n  }\n  100% {\n    transform: translateX(300px);\n  }\n}\n\n.element {\n  animation: complex-move 2s;\n  /* 前半段加速,后半段减速 */\n}` },

      { type: 'heading', text: '动画事件:监听动画生命周期' },
      { type: 'paragraph', text: 'CSS 动画会触发 JavaScript 事件,可以在动画开始、结束、每次迭代时执行代码。' },

      { type: 'code', lang: 'javascript', caption: '四个动画事件', code: `const element = document.querySelector('.animated');\n\n// 动画开始(延迟结束后)\nelement.addEventListener('animationstart', (e) => {\n  console.log(\`动画开始: \${e.animationName}\`);\n});\n\n// 每次迭代结束(不包括最后一次)\nelement.addEventListener('animationiteration', (e) => {\n  console.log(\`迭代 \${e.elapsedTime}s\`);\n});\n\n// 动画完全结束\nelement.addEventListener('animationend', (e) => {\n  console.log('动画结束');\n  // 常见用途:动画结束后移除元素或类名\n  element.classList.remove('animating');\n});\n\n// 动画被取消(如元素被移除、display:none)\nelement.addEventListener('animationcancel', (e) => {\n  console.log('动画被中断');\n});` },

      { type: 'heading', text: '性能优化:动画自动触发 will-change' },
      { type: 'paragraph', text: 'CSS 动画在运行期间会自动触发相应属性的 will-change 行为,浏览器会提前为元素创建合成层。动画结束后,will-change 效果自动移除。这意味着你不需要手动设置 will-change。' },

      { type: 'code', lang: 'css', caption: '不需要手动 will-change', code: `/* ❌ 不必要 */\n.box {\n  animation: slide 1s;\n  will-change: transform;  /* 动画会自动触发 */\n}\n\n/* ✅ 足够了 */\n.box {\n  animation: slide 1s;\n  /* 浏览器自动优化 */\n}\n\n/* ⚠️ 但如果动画是通过 JS 延迟触发的,提前设置有帮助 */\n.box {\n  will-change: transform;\n}\n// 稍后:\nbox.classList.add('animate');` },

      { type: 'heading', text: '常见应用场景' },
      { type: 'list', items: [
        '**加载指示器**:旋转、脉冲、进度条动画,使用 `infinite` 循环',
        '**入场动画**:元素出现时的淡入、滑入、缩放,使用 `forwards` 保持最终状态',
        '**背景动画**:渐变移动、图案滚动,使用 `linear` 缓动和 `infinite` 循环',
        '**注意力引导**:摇晃、闪烁、弹跳,使用 `alternate` 往返播放',
        '**骨架屏**:闪烁加载占位符,模拟内容即将出现',
      ] },

      { type: 'example', title: '骨架屏加载动画', lang: 'css', code: `@keyframes shimmer {\n  0% {\n    background-position: -200px 0;\n  }\n  100% {\n    background-position: calc(200px + 100%) 0;\n  }\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    #f0f0f0 0px,\n    #e0e0e0 40px,\n    #f0f0f0 80px\n  );\n  background-size: 200px 100%;\n  animation: shimmer 1.5s infinite linear;\n}`, explanation: '骨架屏通过移动渐变背景创造"闪光扫过"的效果,暗示内容正在加载。这比静态灰色块更生动,减少用户等待的焦虑感。' },

      { type: 'warning', text: '避免过度使用动画。页面上同时运行的大量动画会消耗 CPU/GPU 资源,导致发热、耗电、掉帧。对于装饰性动画,考虑在用户设置了 `prefers-reduced-motion: reduce` 时禁用它们。' },

      { type: 'code', lang: 'css', caption: '尊重用户的动画偏好', code: `/* 默认:播放动画 */\n.element {\n  animation: bounce 2s infinite;\n}\n\n/* 用户偏好减少动画时禁用 */\n@media (prefers-reduced-motion: reduce) {\n  .element {\n    animation: none;\n  }\n}` },
    ] as TutorialBlock[],
  },
  {
    id: 'easing',
    number: '5',
    title: { zh: '缓动函数', en: 'Easing Functions' },
    summary: {
      zh: '缓动函数(timing function)控制动画或过渡的速率变化,决定了动画如何从起始状态过渡到结束状态,创建更自然的运动效果。',
      en: 'Easing functions (timing functions) control the rate of change in animations or transitions, determining how animations transition from start to end states, creating more natural motion effects.',
    },
    keyPoints: [
      '预定义缓动: ease、linear、ease-in、ease-out、ease-in-out,各自对应特定的 cubic-bezier 值',
      'cubic-bezier(x1, y1, x2, y2) 自定义三次贝塞尔曲线,x 值限制在 [0,1] 范围内',
      'steps(n, position) 创建步进动画,position 可选 jump-start/jump-end/jump-none/jump-both',
      'step-start 等价于 steps(1, start),step-end 等价于 steps(1, end)',
      'linear() 函数提供多段线性插值,可精确控制任意形状的速度曲线',
      '缓动函数应用于整个动画周期,也可在 @keyframes 中的关键帧单独指定以覆盖全局设置',
      '缓动函数是纯函数:相同输入始终产生相同输出,输入/输出均为实数进度值',
      '贝塞尔曲线在输入超出 [0,1] 范围时通过端点切线无限延伸',
      '反向播放动画时缓动函数也会被反转(如 ease-in 表现为 ease-out)',
    ],
    tutorial: [
      { type: 'heading', text: '什么是缓动函数?' },
      { type: 'paragraph', text: '缓动函数(easing function,也叫 timing function)控制动画的**速率变化**。在动画的持续时间内,缓动函数决定了"进度"如何随"时间"变化。匀速动画(linear)看起来机械、生硬,而真实世界的运动往往是加速或减速的——缓动函数让动画符合物理直觉,更自然、更有生命力。' },

      { type: 'heading', text: '预定义缓动函数' },
      { type: 'paragraph', text: 'CSS 提供了 5 个预定义的缓动函数,涵盖最常见的场景。每个都对应一条特定的三次贝塞尔曲线。' },

      { type: 'code', lang: 'css', caption: '五种预定义缓动及其等价贝塞尔曲线', code: `/* linear:匀速,无加减速 */\ntransition-timing-function: linear;\n/* 等价于 cubic-bezier(0, 0, 1, 1) */\n\n/* ease:默认值,慢-快-慢 */\ntransition-timing-function: ease;\n/* 等价于 cubic-bezier(0.25, 0.1, 0.25, 1) */\n\n/* ease-in:慢速开始,加速 */\ntransition-timing-function: ease-in;\n/* 等价于 cubic-bezier(0.42, 0, 1, 1) */\n\n/* ease-out:快速开始,减速 */\ntransition-timing-function: ease-out;\n/* 等价于 cubic-bezier(0, 0, 0.58, 1) */\n\n/* ease-in-out:慢-快-慢,比 ease 更对称 */\ntransition-timing-function: ease-in-out;\n/* 等价于 cubic-bezier(0.42, 0, 0.58, 1) */` },

      { type: 'example', title: '不同缓动的视觉差异', lang: 'css', code: `/* linear:机械感,适合匀速运动(旋转、进度条) */\n.spinner {\n  animation: rotate 1s linear infinite;\n}\n\n/* ease:最通用,适合大多数交互 */\n.button:hover {\n  transform: scale(1.1);\n  transition: transform 0.3s ease;\n}\n\n/* ease-out:元素出现时用(快进慢出,响应迅速) */\n.modal {\n  transition: transform 0.4s ease-out;\n}\n.modal.show {\n  transform: translateY(0);\n}\n\n/* ease-in:元素消失时用(慢进快出,快速离开) */\n.toast {\n  transition: opacity 0.3s ease-in;\n}\n.toast.hide {\n  opacity: 0;\n}\n\n/* ease-in-out:大型元素移动,强调开始和结束 */\n.page-transition {\n  transition: transform 0.6s ease-in-out;\n}`, explanation: '设计师的黄金法则:**出现用 ease-out,消失用 ease-in,交互用 ease**。ease-out 让元素快速响应用户操作(出现),然后平缓停下,符合物理直觉(像球落地)。ease-in 让元素悄悄启动,快速离开视野,减少视觉干扰。' },

      { type: 'heading', text: 'cubic-bezier():自定义三次贝塞尔曲线' },
      { type: 'paragraph', text: 'cubic-bezier(x1, y1, x2, y2) 允许你定义完全自定义的缓动曲线。四个参数定义两个控制点 P1(x1, y1) 和 P2(x2, y2),起点固定在 (0, 0),终点固定在 (1, 1)。X 值必须在 [0, 1] 范围内,但 Y 值可以超出,创造"弹性"或"回弹"效果。' },

      { type: 'code', lang: 'css', caption: '自定义贝塞尔曲线示例', code: `/* 标准曲线:Y 值在 [0, 1] 内 */\ntransition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n/* 渐入渐出,曲线平滑 */\n\n/* 弹性效果:Y 值超出 [0, 1] */\ntransition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n/* 动画会超出目标值,然后回弹(overshoot) */\n\n/* 预期效果:先向后,再向前 */\ntransition: transform 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);\n/* 元素先反向移动一点,再加速到目标位置 */` },

      { type: 'tip', text: '不要手写贝塞尔曲线参数!使用可视化工具:Chrome DevTools 内置贝塞尔曲线编辑器(点击缓动函数值),或访问 cubic-bezier.com 和 easings.net。这些工具让你通过拖拽控制点实时预览效果,然后复制生成的 CSS。' },

      { type: 'example', title: '经典弹性缓动', lang: 'css', code: `/* 来自 easings.net 的弹性出现效果 */\n@keyframes bounce-in {\n  from {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n.notification {\n  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n\n/* 效果:通知框从小到大弹出,\n   稍微超出目标尺寸,再回弹到正常大小 */`, explanation: 'cubic-bezier(0.68, -0.55, 0.265, 1.55) 是最流行的弹性缓动之一。第一个控制点的 y1 = -0.55(负值)使曲线在开始时向下突出,第二个控制点的 y2 = 1.55(大于 1)使曲线在结束时向上突出,创造"超出-回弹"效果。' },

      { type: 'heading', text: 'steps():步进动画' },
      { type: 'paragraph', text: 'steps(n, position) 创建阶梯式的离散动画,而不是平滑过渡。动画被分为 n 个相等的步骤,在每一步之间瞬间跳变。position 参数控制跳变发生在每步的开始还是结束。' },

      { type: 'code', lang: 'css', caption: 'steps() 语法', code: `/* steps(n):分 n 步,默认 jump-end */\ntransition: transform 1s steps(5);\n/* 动画分 5 步完成,每步瞬间跳变 */\n\n/* jump-end(默认):每步结束时跳变 */\nsteps(4, jump-end)  /* 或 steps(4, end) */\n\n/* jump-start:每步开始时跳变 */\nsteps(4, jump-start)  /* 或 steps(4, start) */\n\n/* jump-none:开始和结束都不跳变 */\nsteps(4, jump-none)\n\n/* jump-both:开始和结束都跳变 */\nsteps(4, jump-both)` },

      { type: 'example', title: '逐帧动画:雪碧图动画', lang: 'css', code: `/* 雪碧图:8 帧的跑步动画,横向排列 */\n@keyframes run {\n  from { background-position-x: 0; }\n  to { background-position-x: -800px; }  /* 8 帧 × 100px/帧 */\n}\n\n.character {\n  width: 100px;\n  height: 100px;\n  background: url(sprite.png) 0 0;\n  animation: run 0.8s steps(8) infinite;\n  /*                   ^^^^ 8 帧,逐帧跳变 */\n}\n\n/* 效果:背景图每 0.1s 向左跳 100px,\n   显示雪碧图的下一帧,形成逐帧动画 */`, explanation: 'steps() 是实现雪碧图动画的标准方式。如果用 linear 或 ease,背景会平滑滑动,看起来模糊;用 steps(n) 则每帧清晰跳变,形成传统的逐帧动画效果。n 等于雪碧图中的帧数。' },

      { type: 'example', title: '打字机效果', lang: 'css', code: `@keyframes typing {\n  from { width: 0; }\n  to { width: 100%; }\n}\n\n.typewriter {\n  width: 0;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 2px solid;\n  animation: \n    typing 3s steps(20) forwards,\n    blink 0.5s step-end infinite;\n}\n\n@keyframes blink {\n  50% { border-color: transparent; }\n}`, explanation: '打字机效果通过 steps() 让文本"一个字一个字"地出现,而不是平滑展开。steps(20) 表示 20 个字符,每 3s/20 = 0.15s 显示一个字符。光标闪烁用 step-end,在中点瞬间切换透明/不透明。' },

      { type: 'heading', text: 'step-start 和 step-end' },
      { type: 'paragraph', text: 'step-start 和 step-end 是 steps() 的简写,用于只有 1 步的情况。step-start 在动画开始时立即跳到终点值,step-end 在动画结束时跳到终点值。' },

      { type: 'code', lang: 'css', caption: 'step-start vs step-end', code: `/* step-start = steps(1, start) */\ntransition: opacity 1s step-start;\n/* t=0 时立即变为终点值,然后保持 1s */\n\n/* step-end = steps(1, end) */\ntransition: opacity 1s step-end;\n/* 保持起点值 1s,然后在 t=1s 时瞬间跳到终点值 */\n\n/* 实际应用:延迟显示 */\n.tooltip {\n  opacity: 0;\n  transition: opacity 0s step-end 0.3s;\n}\n.trigger:hover .tooltip {\n  opacity: 1;\n  /* 悬停 0.3s 后立即显示,无淡入动画 */\n}` },

      { type: 'heading', text: 'linear():多段线性插值(CSS Easing Level 2)' },
      { type: 'paragraph', text: 'linear() 函数允许定义多个线性段,每段有不同的斜率,拼接成任意形状的速度曲线。这是 CSS Easing Level 2 的新特性,比 cubic-bezier() 更灵活,可以精确控制复杂的速率变化。' },

      { type: 'code', lang: 'css', caption: 'linear() 语法示例', code: `/* 简单形式:均匀分布的点 */\nlinear(0, 0.25, 0.5, 0.75, 1)\n/* 在 0%, 25%, 50%, 75%, 100% 时间点的输出值 */\n\n/* 复杂形式:指定每个点的时间和输出 */\nlinear(\n  0 0%,\n  0.5 30%,\n  1 50%,\n  0.8 80%,\n  1 100%\n)\n/* 0% 时输出 0,30% 时输出 0.5,50% 时输出 1,\n   80% 时回落到 0.8,100% 时回到 1 */\n\n/* 实际应用:模拟弹跳 */\n.ball {\n  animation: drop 1s linear(\n    0, 0.2, 0.4, 0.6, 0.8, 1,\n    0.9, 0.95, 1\n  ) forwards;\n}`, explanation: 'linear() 的每个值代表一个关键点,浏览器在这些点之间进行线性插值。它可以创造 cubic-bezier() 难以实现的复杂曲线,如多次回弹、不规则振荡。浏览器支持:Chrome 113+, Firefox 112+, Safari 17.2+。' },

      { type: 'heading', text: '缓动函数的作用范围' },
      { type: 'paragraph', text: '在过渡(transitions)中,缓动函数应用于整个过渡过程。在动画(animations)中,缓动函数默认应用于整个动画周期,但可以在 @keyframes 的各个关键帧中单独覆盖。' },

      { type: 'code', lang: 'css', caption: '在关键帧中覆盖缓动', code: `/* 全局缓动:应用于整个动画 */\n.box {\n  animation: slide 2s ease-in-out;\n}\n\n/* 在关键帧中覆盖 */\n@keyframes slide {\n  0% {\n    transform: translateX(0);\n    animation-timing-function: ease-out;  /* 0%-50% 用 ease-out */\n  }\n  50% {\n    transform: translateX(200px);\n    animation-timing-function: ease-in;   /* 50%-100% 用 ease-in */\n  }\n  100% {\n    transform: translateX(300px);\n  }\n}\n/* 前半段快速启动慢速停止,后半段慢速启动快速停止 */` },

      { type: 'heading', text: '反向播放时的缓动反转' },
      { type: 'paragraph', text: '当动画反向播放时(animation-direction: reverse 或 alternate 的回程),缓动函数也会被反转。ease-in 表现为 ease-out,ease-out 表现为 ease-in。' },

      { type: 'code', lang: 'css', caption: '反向播放的缓动变化', code: `@keyframes pulse {\n  from { transform: scale(1); }\n  to { transform: scale(1.2); }\n}\n\n.box {\n  animation: pulse 1s ease-in infinite alternate;\n}\n\n/* 实际效果:\n   正向播放(1→1.2):ease-in(慢速开始,加速)\n   反向播放(1.2→1):ease-in 被反转为 ease-out(快速开始,减速)\n   视觉上:元素慢慢长大,然后快速缩回,产生"吸气-呼气"感 */` },

      { type: 'heading', text: '缓动函数选择指南' },
      { type: 'list', items: [
        '**linear**:匀速运动(旋转、进度条、匀速滚动)',
        '**ease**:通用交互(按钮悬停、颜色变化、大多数过渡)',
        '**ease-out**:元素出现(模态框、下拉菜单、工具提示)——快速响应,平缓停下',
        '**ease-in**:元素消失(Toast 通知、关闭动画)——悄悄启动,快速离开',
        '**ease-in-out**:大型元素移动(页面切换、轮播图)——强调开始和结束',
        '**自定义 cubic-bezier**:品牌化动效、弹性效果、特殊节奏',
        '**steps**:逐帧动画(雪碧图、打字机效果、像素艺术)',
      ] },

      { type: 'example', title: '实战:不同场景的缓动选择', lang: 'css', code: `/* 按钮点击:快速反馈 */\n.button:active {\n  transform: scale(0.95);\n  transition: transform 0.1s ease;  /* ease 足够 */\n}\n\n/* 模态框出现:迅速响应用户操作 */\n.modal {\n  transition: transform 0.4s ease-out, opacity 0.3s ease-out;\n}\n\n/* 通知消失:快速离开视野 */\n.notification.hide {\n  transition: opacity 0.3s ease-in, transform 0.3s ease-in;\n}\n\n/* 页面切换:大型移动,强调感 */\n.page-slide {\n  transition: transform 0.6s ease-in-out;\n}\n\n/* 弹性按钮:品牌化效果 */\n.cta-button:hover {\n  transform: scale(1.1);\n  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n\n/* 加载动画:持续旋转 */\n.spinner {\n  animation: rotate 1s linear infinite;\n}` },

      { type: 'tip', text: '开发时先用预定义缓动(ease/ease-out/ease-in)快速迭代,等动画逻辑确定后,再用 cubic-bezier() 精细调整。过早优化缓动曲线会浪费时间。大多数场景下,预定义缓动已经足够好。' },

      { type: 'warning', text: '避免"缓动过度"。不是所有动画都需要弹性效果或复杂曲线。过度使用弹性缓动会让界面显得轻浮、不专业。保持克制:品牌核心交互用定制缓动,其他地方用标准缓动。' },

      { type: 'heading', text: '工具推荐' },
      { type: 'list', items: [
        '**Chrome DevTools**:点击缓动值,弹出可视化编辑器,拖拽调整曲线',
        '**cubic-bezier.com**:在线贝塞尔曲线编辑器,实时预览动画效果',
        '**easings.net**:常用缓动函数库,提供预设曲线和代码',
        '**Ceaser**:CSS 缓动动画工具,比较不同缓动的效果',
      ] },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {
  'transform-property': 'transforms-2d',
  'transform-functions': 'transforms-2d',
  'translate': 'transforms-2d',
  'rotate': 'transforms-2d',
  'scale': 'transforms-2d',
  'skew': 'transforms-2d',
  'matrix': 'transforms-2d',
  'transform-origin': 'transforms-2d',
  'perspective': 'transforms-3d',
  'translate3d': 'transforms-3d',
  'rotate3d': 'transforms-3d',
  'scale3d': 'transforms-3d',
  'transform-style': 'transforms-3d',
  'backface-visibility': 'transforms-3d',
  'transition-property': 'transitions',
  'transition-duration': 'transitions',
  'transition-timing-function': 'transitions',
  'transition-delay': 'transitions',
  'transition-shorthand': 'transitions',
  'transitionable-properties': 'transitions',
  'keyframes': 'animations',
  'animation-name': 'animations',
  'animation-duration': 'animations',
  'animation-timing-function': 'animations',
  'animation-delay': 'animations',
  'animation-iteration-count': 'animations',
  'animation-direction': 'animations',
  'animation-fill-mode': 'animations',
  'animation-play-state': 'animations',
  'animation-shorthand': 'animations',
  'transform-box': 'transforms-2d',
  'transform-shorthand': 'transforms-2d',
  'translate-property': 'transforms-2d',
  'rotate-property': 'transforms-2d',
  'scale-property': 'transforms-2d',
  'perspective-function': 'transforms-3d',
  'matrix3d': 'transforms-3d',
  '3d-rendering-context': 'transforms-3d',
  'accumulated-3d-transformation-matrix': 'transforms-3d',
  'transitionend': 'transitions',
  'transitionstart': 'transitions',
  'transitionrun': 'transitions',
  'transitioncancel': 'transitions',
  'animationstart': 'animations',
  'animationend': 'animations',
  'animationiteration': 'animations',
  'animationcancel': 'animations',
  'will-change': 'animations',
  'cubic-bezier': 'easing',
  'steps': 'easing',
  'step-start': 'easing',
  'step-end': 'easing',
  'linear-function': 'easing',
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  transform: {
    zh: '变换',
    description: 'CSS 变换允许在不影响文档流的情况下修改元素的视觉呈现,包括平移、旋转、缩放和倾斜等操作。变换可以是 2D 或 3D 的,通过 transform 属性应用一个或多个变换函数。变换不会触发文档重排,只会触发重绘和合成,因此性能较好。',
    sectionRef: 'transforms#transforms-2d',
  },
  'transform-origin': {
    zh: '变换原点',
    description: '变换原点是元素进行变换操作时的基准点。默认情况下,变换原点位于元素的中心(50% 50%),但可以通过 transform-origin 属性修改。改变变换原点会影响旋转、缩放和倾斜等变换的视觉效果。例如,将原点设置为左上角(0 0)会使旋转围绕左上角进行。',
    sectionRef: 'transforms#transforms-2d',
  },
  perspective: {
    zh: '透视',
    description: '透视是 3D 变换中的关键概念,定义了观察者与 z=0 平面之间的距离。perspective 属性值越小,3D 效果越强烈;值越大,效果越平缓。透视可以应用在父元素上(perspective 属性)或直接应用在变换元素上(perspective() 函数)。透视原点由 perspective-origin 属性控制,决定了 3D 空间的消失点位置。',
    sectionRef: 'transforms#transforms-3d',
  },
  transition: {
    zh: '过渡',
    description: 'CSS 过渡提供了一种在属性值变化时创建平滑动画效果的方式。当元素的 CSS 属性值发生变化时(如通过伪类、JavaScript 或用户交互),过渡会在指定的时间内平滑地从旧值过渡到新值,而不是瞬间改变。过渡可以指定要过渡的属性、持续时间、缓动函数和延迟时间。只有可动画的属性才能应用过渡效果。',
    sectionRef: 'transforms#transitions',
  },
  animation: {
    zh: '动画',
    description: 'CSS 动画通过 @keyframes 规则定义一系列关键帧,创建复杂的动画序列。与过渡不同,动画可以自动播放,不需要状态变化触发。动画可以定义多个关键帧,控制重复次数、播放方向、填充模式等。animation 属性系列提供了对动画各个方面的精细控制,包括名称、持续时间、缓动函数、延迟、迭代次数、方向、填充模式和播放状态。',
    sectionRef: 'transforms#animations',
  },
  '@keyframes': {
    zh: '关键帧',
    description: '@keyframes 规则用于定义 CSS 动画的关键帧序列。通过指定动画在不同时间点的样式,浏览器会自动计算中间帧,创建平滑的动画效果。关键帧可以使用百分比(0%-100%)或关键字(from/to)指定。一个 @keyframes 规则可以包含多个关键帧,每个关键帧定义一组 CSS 属性值。关键帧名称用于在 animation-name 中引用。',
    sectionRef: 'transforms#animations',
  },
  'easing-function': {
    zh: '缓动函数',
    description: '缓动函数(也称为计时函数或时间函数)控制动画或过渡的速率变化,决定了动画如何从起始状态过渡到结束状态。CSS 提供了几种预定义的缓动函数(ease、linear、ease-in、ease-out、ease-in-out),也可以使用 cubic-bezier() 自定义三次贝塞尔曲线,或使用 steps() 创建步进式动画。缓动函数通过改变动画的速度曲线,使动画看起来更自然或更有节奏感。',
    sectionRef: 'transforms#easing',
  },
  'stacking context': {
    zh: '层叠上下文',
    description: '层叠上下文是 HTML 元素的三维概念模型,决定元素在 Z 轴方向上的叠放顺序。CSS 变换(transform 值非 none)、opacity 小于 1、filter、will-change 等属性都会创建新的层叠上下文。在层叠上下文内部,子元素按照特定规则排列绘制顺序。层叠上下文可以嵌套,每个上下文内部独立排序,不会与外部上下文的元素穿插。变换元素创建层叠上下文时,z-index: auto 会被视为 z-index: 0。',
    sectionRef: 'transforms#transforms-2d',
  },
  'will-change': {
    zh: 'will-change 提示',
    description: 'will-change 属性允许作者提前告知浏览器元素将发生哪些变化,以便浏览器在变化发生前进行优化准备。常用值包括 transform、opacity 等。浏览器可以提前为这些属性创建合成层,避免在动画开始时出现卡顿。CSS 动画在运行期间会自动为其动画属性触发 will-change 行为。注意不应过度使用 will-change,因为每个提示都可能消耗额外的内存和 GPU 资源。动画结束后应移除 will-change 以释放资源。',
    sectionRef: 'transforms#animations',
  },
  compositing: {
    zh: '合成',
    description: '合成(compositing)是浏览器渲染管线的最后一步,将各个绘制层(layers)组合成最终的屏幕画面。CSS 变换和动画通常在合成阶段处理,因此不会触发重排(reflow)或重绘(repaint),性能优异。transform 和 opacity 是最适合动画的属性,因为它们可以完全在合成器(compositor)线程上运行,不阻塞主线程。will-change 属性可以提示浏览器提前将元素提升为合成层,避免动画启动时的延迟。',
    sectionRef: 'transforms#transforms-2d',
  },
  'transform function': {
    zh: '变换函数',
    description: '变换函数是 transform 属性值中的独立变换操作。CSS 变换规范定义了多种 2D 和 3D 变换函数:translate() 平移、rotate() 旋转、scale() 缩放、skew() 倾斜、matrix() 矩阵变换以及它们的 3D 对应版本。变换函数可以链式组合,从左到右依次应用(矩阵后乘)。每个变换函数都可以用一个 4x4 矩阵表示。派生变换函数(如 translateX)是原始变换函数(如 translate)的特例。',
    sectionRef: 'transforms#transforms-2d',
  },
  'transitionend event': {
    zh: 'transitionend 事件',
    description: 'transitionend 是过渡完成时触发的 DOM 事件,属于 TransitionEvent 接口。事件对象包含 propertyName(过渡的属性名)、elapsedTime(过渡持续时间)和 pseudoElement(伪元素名称)属性。相关事件还有 transitionrun(过渡创建时)、transitionstart(延迟结束后开始时)、transitioncancel(过渡被取消时)。如果过渡在完成前被移除(如属性被更改),transitionend 不会触发。每个参与过渡的属性会独立触发事件。',
    sectionRef: 'transforms#transitions',
  },
  '3d rendering context': {
    zh: '3D 渲染上下文',
    description: '3D 渲染上下文是一组共享同一三维坐标系的元素集合。由设置了 transform-style: preserve-3d 的元素建立,其子元素参与该上下文。在 3D 渲染上下文中,元素可以根据 Z 轴位置进行深度排序,也可以互相交叉穿透。累积 3D 变换矩阵决定每个元素在三维空间中的最终位置。某些 CSS 属性(overflow 非 visible/clip、opacity < 1、filter 等)会强制 preserve-3d 降级为 flat,阻止 3D 渲染上下文的创建或扩展。',
    sectionRef: 'transforms#transforms-3d',
  },
};

export const propertyTerms: Record<string, PropertyEntry> = {
  transform: {
    zh: '变换属性指定应用于元素的一个或多个变换函数列表。变换函数从左到右依次后乘(post-multiply),生成最终的变换矩阵。支持的变换函数包括:translate() 平移、rotate() 旋转、scale() 缩放、skew() 倾斜、matrix() 矩阵,以及它们的各种变体(如 translateX、scaleY 等)。设置任何非 none 的值都会创建层叠上下文,并使元素成为所有后代(包括 fixed 定位)的包含块。变换不影响文档流,但会影响 overflow 区域和客户端矩形(getBoundingClientRect)的计算。计算值序列化为 matrix() 或 matrix3d() 函数。',
    value: 'none | <transform-list>',
    initial: 'none',
    appliesTo: '可变换元素(transformable elements)',
    inherited: false,
    percentages: '相对于参考框(reference box)的尺寸',
    computedValue: '指定值,但长度值转为绝对长度',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transforms-1/#propdef-transform',
    sectionRef: 'transforms#transforms-2d',
  },
  'transform-origin': {
    zh: '变换原点属性设置元素进行变换操作时的基准点。该属性接受 1 到 3 个值,分别表示 x、y 和 z 轴上的原点位置。可以使用长度值、百分比或关键字(left、center、right、top、bottom)。默认值为元素的中心点(50% 50% 0)。改变变换原点会显著影响旋转、缩放等变换的视觉效果。例如,将原点设置为 top left 会使旋转围绕左上角进行,而不是默认的中心点。该属性不影响平移变换,因为平移不依赖于原点位置。',
    value: '[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]? <length>?',
    initial: '50% 50% 0',
    appliesTo: '可变换元素(transformable elements)',
    inherited: false,
    percentages: '相对于边界框的尺寸',
    computedValue: '对于长度值,为绝对长度值;对于百分比,为指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transforms-1/#transform-origin-property',
    sectionRef: 'transforms#transforms-2d',
  },
  'transform-style': {
    zh: '变换样式属性决定元素的子元素是在 3D 空间中定位(preserve-3d)还是在元素的平面中展平(flat)。当设置为 preserve-3d 时,子元素保持其 3D 位置,可以创建真正的 3D 场景效果。设置为 flat 时(默认值),所有子元素被展平到父元素的 2D 平面上。该属性对于构建 3D 场景至关重要,例如创建 3D 立方体、卡片翻转效果等。注意,某些 CSS 属性(如 overflow: hidden、filter、opacity < 1)会强制元素创建层叠上下文,从而覆盖 preserve-3d 效果,导致子元素被展平。',
    value: 'flat | preserve-3d',
    initial: 'flat',
    appliesTo: '可变换元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transforms-2/#transform-style-property',
    sectionRef: 'transforms#transforms-3d',
  },
  perspective: {
    zh: '透视属性为元素的子元素定义 3D 透视效果,指定观察者与 z=0 平面之间的距离。该属性应用在父元素上,影响所有子元素的 3D 变换。属性值是一个长度值,表示透视距离。值越小,3D 效果越强烈,对象看起来越扭曲;值越大,透视效果越平缓,接近正交投影。none 值表示不应用透视。透视距离决定了 z 轴位移对元素大小的影响程度:在相同的 z 轴位移下,透视距离越小,元素的大小变化越明显。常用值范围在 400px 到 1000px 之间,具体取决于设计需求。',
    value: 'none | <length>',
    initial: 'none',
    appliesTo: '可变换元素',
    inherited: false,
    percentages: null,
    computedValue: '绝对长度值或 none',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transforms-2/#perspective-property',
    sectionRef: 'transforms#transforms-3d',
  },
  'perspective-origin': {
    zh: '透视原点属性定义 3D 透视的消失点位置,即观察者的视点位置。该属性应用在父元素上,与 perspective 属性配合使用。接受 1 到 2 个值,分别表示水平和垂直位置。可以使用长度值、百分比或关键字(left、center、right、top、bottom)。默认值为 50% 50%,表示消失点位于元素的中心。改变透视原点会改变 3D 变换的视角,就像移动摄像机的位置一样。例如,设置为 left top 会使视角偏向左上角,看到的 3D 效果会相应变化。该属性对于创建特定视角的 3D 场景非常有用。',
    value: '[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?',
    initial: '50% 50%',
    appliesTo: '可变换元素',
    inherited: false,
    percentages: '相对于边界框的尺寸',
    computedValue: '对于长度值,为绝对长度值;对于百分比,为指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transforms-2/#perspective-origin-property',
    sectionRef: 'transforms#transforms-3d',
  },
  'backface-visibility': {
    zh: '背面可见性属性决定元素背面是否可见。当元素通过 3D 旋转使其背面朝向观察者时,该属性控制背面的显示方式。visible(默认值)使背面可见,元素的内容会镜像显示;hidden 使背面不可见,当元素旋转到背面时会变得透明。该属性常用于卡片翻转效果:当卡片旋转时,正面和背面可以分别设置不同的内容和样式,通过 backface-visibility: hidden 确保只有面向观察者的一面可见。注意,该属性只影响元素本身的背面可见性,不影响其子元素。',
    value: 'visible | hidden',
    initial: 'visible',
    appliesTo: '可变换元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transforms-2/#backface-visibility-property',
    sectionRef: 'transforms#transforms-3d',
  },
  'transition-property': {
    zh: '过渡属性指定要应用过渡效果的 CSS 属性名称。可以是单个属性名、逗号分隔的多个属性名、all(所有可过渡属性)或 none(不过渡任何属性)。只有可动画的属性(如颜色、长度、数字等)才能应用过渡效果。不可动画的属性(如 display)会被忽略。当指定多个属性时,可以为每个属性设置不同的过渡参数(持续时间、缓动函数、延迟)。使用 all 虽然方便,但可能会导致不必要的属性也产生过渡效果,影响性能。建议明确指定需要过渡的属性,以获得更好的控制和性能。',
    value: 'none | <single-transition-property>#',
    initial: 'all',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transitions/#transition-property-property',
    sectionRef: 'transforms#transitions',
  },
  'transition-duration': {
    zh: '过渡持续时间属性指定过渡效果从开始到结束所需的时间。可以使用秒(s)或毫秒(ms)作为单位。默认值为 0s,表示没有过渡效果,属性值会立即改变。当指定多个过渡属性时,可以为每个属性设置不同的持续时间,使用逗号分隔。如果持续时间的数量少于过渡属性的数量,持续时间列表会循环使用。负值会被视为 0s。较短的持续时间(0.1s-0.3s)适合快速反馈,较长的持续时间(0.3s-1s)适合较大的状态变化。过长的持续时间可能使用户感到延迟,影响用户体验。',
    value: '<time>#',
    initial: '0s',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transitions/#transition-duration-property',
    sectionRef: 'transforms#transitions',
  },
  'transition-timing-function': {
    zh: '过渡计时函数属性定义过渡效果的速率曲线,控制过渡在持续时间内如何进行。CSS 提供了几种预定义的缓动函数:linear(匀速)、ease(默认值,慢-快-慢)、ease-in(慢速开始)、ease-out(慢速结束)、ease-in-out(慢速开始和结束)。还可以使用 cubic-bezier(x1, y1, x2, y2) 自定义三次贝塞尔曲线,其中 x1、y1、x2、y2 是 0 到 1 之间的数值,定义曲线的两个控制点。steps(n, start|end) 创建步进式过渡,将过渡分为 n 个相等的步骤。选择合适的计时函数可以使动画看起来更自然或更有节奏感。',
    value: '<easing-function>#',
    initial: 'ease',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transitions/#transition-timing-function-property',
    sectionRef: 'transforms#transitions',
  },
  'transition-delay': {
    zh: '过渡延迟属性指定过渡效果开始前的等待时间。可以使用秒(s)或毫秒(ms)作为单位。默认值为 0s,表示立即开始过渡。正值会延迟过渡的开始,负值会使过渡立即开始,但从中途开始播放(跳过前面的部分)。当指定多个过渡属性时,可以为每个属性设置不同的延迟时间,使用逗号分隔。如果延迟时间的数量少于过渡属性的数量,延迟列表会循环使用。延迟可以用于创建错落有致的动画效果,使多个元素或属性按顺序过渡,而不是同时改变。',
    value: '<time>#',
    initial: '0s',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transitions/#transition-delay-property',
    sectionRef: 'transforms#transitions',
  },
  'animation-name': {
    zh: '动画名称属性指定要应用的 @keyframes 动画的名称。可以是单个名称或逗号分隔的多个名称,用于同时应用多个动画。none 值表示不应用任何动画。名称是大小写敏感的,必须与 @keyframes 规则中定义的名称完全匹配。当指定多个动画时,后面的动画属性(如 duration、timing-function 等)会按照相同的顺序应用到对应的动画上。如果动画属性的数量少于动画名称的数量,属性列表会循环使用。可以动态改变 animation-name 来切换动画,或设置为 none 来停止动画。',
    value: '[ none | <keyframes-name> ]#',
    initial: 'none',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-name',
    sectionRef: 'transforms#animations',
  },
  'animation-duration': {
    zh: '动画持续时间属性指定动画完成一个周期所需的时间。可以使用秒(s)或毫秒(ms)作为单位。默认值为 0s,表示没有动画效果。当指定多个动画时,可以为每个动画设置不同的持续时间,使用逗号分隔。如果持续时间的数量少于动画名称的数量,持续时间列表会循环使用。负值会被视为 0s。动画持续时间与 animation-iteration-count 配合使用,决定整个动画序列的总时长。较短的持续时间(0.2s-0.5s)适合微交互,较长的持续时间(1s-3s)适合复杂的动画序列。过长的持续时间可能使用户失去耐心。',
    value: '<time>#',
    initial: '0s',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-duration',
    sectionRef: 'transforms#animations',
  },
  'animation-timing-function': {
    zh: '动画计时函数属性定义动画在每个周期内的速率曲线,控制关键帧之间的插值方式。与过渡计时函数类似,可以使用预定义的缓动函数(linear、ease、ease-in、ease-out、ease-in-out)、cubic-bezier() 自定义曲线或 steps() 步进函数。该属性应用于整个动画周期,也可以在 @keyframes 规则的各个关键帧中单独指定,覆盖全局设置。当指定多个动画时,可以为每个动画设置不同的计时函数。选择合适的计时函数可以使动画更加流畅自然,或创建特殊的节奏效果。例如,使用 ease-out 可以使动画在结束时减速,创建更真实的物理效果。',
    value: '<easing-function>#',
    initial: 'ease',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-timing-function',
    sectionRef: 'transforms#animations',
  },
  'animation-delay': {
    zh: '动画延迟属性指定动画开始前的等待时间。可以使用秒(s)或毫秒(ms)作为单位。默认值为 0s,表示立即开始动画。正值会延迟动画的开始,负值会使动画立即开始,但从中途开始播放(跳过前面的部分)。例如,animation-delay: -1s 会使 3 秒的动画从第 1 秒的状态开始播放。当指定多个动画时,可以为每个动画设置不同的延迟时间。延迟只影响动画的第一次播放,后续的迭代不受延迟影响。动画延迟可以用于创建序列动画效果,使多个元素或动画按顺序开始,而不是同时播放。',
    value: '<time>#',
    initial: '0s',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-delay',
    sectionRef: 'transforms#animations',
  },
  'animation-iteration-count': {
    zh: '动画迭代次数属性指定动画播放的次数。可以是一个数字(包括小数,如 2.5 表示播放 2 次半)或 infinite(无限循环)。默认值为 1,表示只播放一次。当设置为 0 或负值时,动画不会播放。小数值允许动画在中途停止,例如 0.5 会使动画播放到一半。infinite 值使动画无限重复,常用于加载指示器、背景动画等需要持续播放的场景。当指定多个动画时,可以为每个动画设置不同的迭代次数。动画迭代次数与 animation-duration 相乘,得到动画的总播放时长。',
    value: '<single-animation-iteration-count>#',
    initial: '1',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-iteration-count',
    sectionRef: 'transforms#animations',
  },
  'animation-direction': {
    zh: '动画方向属性指定动画是正向播放、反向播放还是交替播放。normal(默认值)表示每次迭代都正向播放(从 0% 到 100%);reverse 表示每次迭代都反向播放(从 100% 到 0%);alternate 表示奇数次迭代正向播放,偶数次迭代反向播放;alternate-reverse 表示奇数次迭代反向播放,偶数次迭代正向播放。交替播放模式可以创建来回往复的动画效果,常用于钟摆、呼吸灯等动画。该属性与 animation-iteration-count 配合使用,特别是在迭代次数大于 1 时才能体现交替效果。当指定多个动画时,可以为每个动画设置不同的播放方向。',
    value: '<single-animation-direction>#',
    initial: 'normal',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-direction',
    sectionRef: 'transforms#animations',
  },
  'animation-fill-mode': {
    zh: '动画填充模式属性定义动画在执行前和执行后如何应用样式。none(默认值)表示动画不影响动画之外的时间,元素保持原始样式;forwards 表示动画结束后,元素保持最后一个关键帧的样式;backwards 表示在动画延迟期间,元素应用第一个关键帧的样式;both 表示同时应用 forwards 和 backwards 的效果。该属性对于创建平滑的状态转换非常重要。例如,设置为 forwards 可以使元素在动画结束后保持动画的最终状态,而不是突然跳回原始状态。与 animation-delay 配合使用时,backwards 可以在延迟期间提前显示动画的起始状态。',
    value: '<single-animation-fill-mode>#',
    initial: 'none',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-fill-mode',
    sectionRef: 'transforms#animations',
  },
  'animation-play-state': {
    zh: '动画播放状态属性控制动画的播放和暂停。running(默认值)表示动画正在播放;paused 表示动画已暂停。该属性可以用于通过 JavaScript 或 CSS 伪类(如 :hover)动态控制动画的播放状态。当动画暂停时,它会停留在当前帧,而不是跳到开始或结束位置。再次设置为 running 时,动画会从暂停的位置继续播放。这对于创建可交互的动画非常有用,例如鼠标悬停时暂停轮播图、点击按钮控制加载动画等。当指定多个动画时,可以为每个动画独立控制播放状态。',
    value: '<single-animation-play-state>#',
    initial: 'running',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation-play-state',
    sectionRef: 'transforms#animations',
  },
  transition: {
    zh: '过渡简写属性,一次性设置 transition-property、transition-duration、transition-timing-function 和 transition-delay。可以使用逗号分隔多组值,为不同属性设置不同的过渡参数。简写中第一个可解析为 <time> 的值分配给 transition-duration,第二个分配给 transition-delay。如果省略某个子属性,则使用该子属性的初始值。使用 transition: none 可以禁用所有过渡效果。过渡只在属性值真正发生变化时触发,不会在页面加载时自动触发。',
    value: '<single-transition>#',
    initial: '各子属性的初始值',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '各子属性的计算值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-transitions/#transition-shorthand-property',
    sectionRef: 'transforms#transitions',
  },
  animation: {
    zh: '动画简写属性,一次性设置 animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction、animation-fill-mode 和 animation-play-state。可以使用逗号分隔多组值来同时定义多个动画。简写中第一个 <time> 值分配给 animation-duration,第二个分配给 animation-delay。animation-name 应放在最后以避免与其他关键字冲突。如果多个动画修改同一属性,animation-name 列表中靠后的动画优先。',
    value: '<single-animation>#',
    initial: '各子属性的初始值',
    appliesTo: '所有元素,以及 ::before 和 ::after 伪元素',
    inherited: false,
    percentages: null,
    computedValue: '各子属性的计算值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-animations/#animation',
    sectionRef: 'transforms#animations',
  },
  'will-change': {
    zh: 'will-change 属性允许作者提前告知浏览器元素即将发生的变化,以便浏览器做出优化准备。常用值包括 transform 和 opacity,浏览器可以提前创建合成层以避免动画启动时的卡顿。auto 值表示不提供任何提示。scroll-position 值表示元素的滚动位置即将改变。contents 值表示元素内容即将改变。CSS 动画在运行期间会自动触发相应属性的 will-change 行为。不应过度使用,因为每个提示都消耗额外的内存和 GPU 资源。设置非 auto 的值会创建层叠上下文。',
    value: 'auto | <animateable-feature>#',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: '',
    css3Url: 'https://drafts.csswg.org/css-will-change/#propdef-will-change',
    sectionRef: 'transforms#animations',
  },
};
