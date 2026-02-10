import type { Section } from '../modules';
import type { GlossaryEntry } from '../glossary';
import type { PropertyEntry } from '../properties';

export const sections: Section[] = [
  {
    id: 'color-values',
    number: '1',
    title: { zh: '颜色值', en: 'Color Values' },
    specId: 'color-values',
    summary: {
      zh: 'CSS 支持多种颜色值格式,包括命名颜色、十六进制、RGB/HSL 函数和现代颜色空间。',
      en: 'CSS supports multiple color value formats, including named colors, hexadecimal, RGB/HSL functions, and modern color spaces.',
    },
    keyPoints: [
      '命名颜色、十六进制和 RGB 是 CSS2 的基础颜色格式',
      'HSL、LAB、LCH、OKLCH 等是 CSS3 扩展的颜色空间',
      '所有颜色格式都支持 alpha 透明度通道',
      'transparent 表示完全透明',
      'currentColor 关键字引用当前 color 属性值',
    ],
  },
  {
    id: 'foreground-background',
    number: '2',
    title: { zh: '前景与背景', en: 'Foreground & Background' },
    specId: 'colors',
    summary: {
      zh: 'color 属性控制文本前景色,background 系列属性控制背景的颜色、图像、定位和层叠。',
      en: 'The color property controls text foreground color, while background properties control the color, image, positioning, and layering of backgrounds.',
    },
    keyPoints: [
      'color 属性设置文本前景色,可被子元素继承',
      'currentColor 可用于统一多个属性的颜色',
      'background 包括颜色、图像、重复、附着和定位等属性',
      'CSS3 增加了 background-size、background-origin 和 background-clip',
      'CSS3 支持多层背景图像的叠加',
    ],
  },
  {
    id: 'gradients',
    number: '3',
    title: { zh: '渐变', en: 'Gradients' },
    specId: 'gradients',
    summary: {
      zh: 'CSS3 提供线性、径向和圆锥三种渐变函数,用于创建平滑的颜色过渡效果。',
      en: 'CSS3 provides three types of gradient functions—linear, radial, and conic—for creating smooth color transition effects.',
    },
    keyPoints: [
      'linear-gradient 沿直线方向创建渐变',
      'radial-gradient 从中心点向外辐射创建渐变',
      'conic-gradient 围绕中心点旋转创建渐变',
      '支持 repeating- 前缀创建重复渐变图案',
      '多个渐变可以用逗号分隔进行层叠',
    ],
  },
  {
    id: 'borders-decoration',
    number: '4',
    title: { zh: '边框装饰', en: 'Border Decoration' },
    specId: 'border-radius',
    summary: {
      zh: 'CSS3 为边框增加了圆角、阴影和图像边框等装饰效果,以及不影响布局的轮廓属性。',
      en: 'CSS3 adds decorative effects to borders including rounded corners, shadows, and border images, as well as outline properties that do not affect layout.',
    },
    keyPoints: [
      'border-radius 创建圆角,可单独控制每个角',
      'box-shadow 添加外阴影或内阴影效果',
      'border-image 使用图像作为边框',
      'outline 在边框外绘制轮廓,不占用布局空间',
      'outline-offset 控制轮廓与边框的距离',
    ],
  },
  {
    id: 'shadows-effects',
    number: '5',
    title: { zh: '阴影与效果', en: 'Shadows & Effects' },
    specId: 'box-shadow',
    summary: {
      zh: '综合运用颜色、背景、渐变和阴影属性,创建丰富的视觉效果和层次感。',
      en: 'Combine color, background, gradient, and shadow properties to create rich visual effects and depth.',
    },
    keyPoints: [
      '多重 box-shadow 可叠加创建复杂阴影效果',
      'inset 关键字创建内阴影',
      '渐变与背景图像结合实现复杂图案',
      'background-clip: text 实现渐变文字效果',
      '合理使用透明度和模糊创建自然的视觉层次',
    ],
  },
];

export const anchors: Record<string, string> = {
  'colors': 'foreground-color',
  'background': 'background',
  'propdef-color': 'foreground-color',
  'propdef-background-color': 'background',
  'propdef-background-image': 'background',
  'propdef-background-repeat': 'background',
  'propdef-background-attachment': 'background',
  'propdef-background-position': 'background',
  'propdef-background': 'background',
  'propdef-background-size': 'background',
  'propdef-background-origin': 'background',
  'propdef-background-clip': 'background',
  'gradients': 'gradients',
  'border-radius': 'borders-decoration',
  'box-shadow': 'borders-decoration',
  'border-image': 'borders-decoration',
  'outline': 'borders-decoration'
};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'color value': {
    zh: '颜色值',
    description: 'CSS 中表示颜色的值,可以用多种格式表示,包括命名颜色、十六进制表示法(#RRGGBB)、RGB/RGBA 函数、HSL/HSLA 函数以及 LAB、LCH 和 OKLCH 等高级颜色空间。',
    sectionRef: 'colors-backgrounds#color-values',
  },
  'currentcolor': {
    zh: 'currentColor',
    description: 'CSS 关键字,表示当前元素上 color 属性的计算值。它允许其他属性(如 border-color、box-shadow)自动使用文本颜色,创建一致的配色方案。',
    sectionRef: 'colors-backgrounds#foreground-background',
  },
  'gradient': {
    zh: '渐变',
    description: 'CSS 图像值,在两种或多种颜色之间创建平滑的颜色过渡。CSS3 提供三种类型:线性渐变(沿直线)、径向渐变(从中心点辐射)和圆锥渐变(围绕中心旋转)。',
    sectionRef: 'colors-backgrounds#gradients',
  },
  'background': {
    zh: '背景',
    description: '元素内容和内边距后面的区域。CSS 允许控制背景颜色、图像、定位、重复、大小、裁剪和层叠。CSS3 引入了多个背景层、渐变以及对背景渲染的增强控制。',
    sectionRef: 'colors-backgrounds#foreground-background',
  },
  'box shadow': {
    zh: '盒阴影',
    description: 'CSS3 效果,在元素框周围添加阴影。阴影可以使用 x 和 y 偏移定位,使用模糊半径模糊,使用扩展半径扩展,可以在元素外部(投影)或内部(内阴影)。',
    sectionRef: 'colors-backgrounds#borders-decoration',
  },
  'border radius': {
    zh: '边框圆角',
    description: 'CSS3 属性,使元素边框盒的角变圆。每个角可以独立控制,并且可以有不同的水平和垂直半径以创建椭圆角。在正方形元素上将 border-radius 设置为 50% 可创建完美的圆形。',
    sectionRef: 'colors-backgrounds#borders-decoration',
  },
  'alpha': {
    zh: '透明度通道',
    description: '颜色的第四个分量,控制透明度。0 为完全透明,1 为完全不透明。在 rgba()、hsla() 及现代颜色函数中使用。',
    sectionRef: 'colors-backgrounds#color-values',
    specUrl: 'https://www.w3.org/TR/css-color-4/#transparency',
  }
};

export const propertyTerms: Record<string, PropertyEntry> = {
  'background-size': {
    zh: '背景尺寸',
    value: 'auto | contain | cover | <length> | <percentage>',
    initial: 'auto',
    appliesTo: '所有元素',
    inherited: false,
    percentages: '相对于背景定位区域的大小',
    computedValue: '指定值,但长度是绝对的',
    css2Url: 'https://www.w3.org/TR/CSS22/colors.html#propdef-background',
    css3Url: 'https://www.w3.org/TR/css-backgrounds-3/#propdef-background-size',
    sectionRef: 'colors-backgrounds#foreground-background'
  },
  'background-origin': {
    zh: '背景原点',
    value: 'padding-box | border-box | content-box',
    initial: 'padding-box',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/colors.html#propdef-background',
    css3Url: 'https://www.w3.org/TR/css-backgrounds-3/#propdef-background-origin',
    sectionRef: 'colors-backgrounds#foreground-background'
  },
  'background-clip': {
    zh: '背景裁剪',
    value: 'border-box | padding-box | content-box | text',
    initial: 'border-box',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/colors.html#propdef-background',
    css3Url: 'https://www.w3.org/TR/css-backgrounds-3/#propdef-background-clip',
    sectionRef: 'colors-backgrounds#foreground-background'
  },
  'outline': {
    zh: '轮廓',
    value: '[ <outline-width> || <outline-style> || <outline-color> ]',
    initial: '见各属性',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '见各属性',
    css2Url: 'https://www.w3.org/TR/CSS22/ui.html#propdef-outline',
    sectionRef: 'colors-backgrounds#borders-decoration'
  },
  'outline-width': {
    zh: '轮廓宽度',
    value: 'thin | medium | thick | <length>',
    initial: 'medium',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '绝对长度;如果 outline-style 为 none,则为 0',
    css2Url: 'https://www.w3.org/TR/CSS22/ui.html#propdef-outline-width',
    sectionRef: 'colors-backgrounds#borders-decoration'
  },
  'outline-style': {
    zh: '轮廓样式',
    value: 'none | dotted | dashed | solid | double | groove | ridge | inset | outset',
    initial: 'none',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '指定值',
    css2Url: 'https://www.w3.org/TR/CSS22/ui.html#propdef-outline-style',
    sectionRef: 'colors-backgrounds#borders-decoration'
  },
  'outline-color': {
    zh: '轮廓颜色',
    value: '<color> | invert',
    initial: 'invert',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '计算后的颜色值',
    css2Url: 'https://www.w3.org/TR/CSS22/ui.html#propdef-outline-color',
    sectionRef: 'colors-backgrounds#borders-decoration'
  },
  'outline-offset': {
    zh: '轮廓偏移',
    value: '<length>',
    initial: '0',
    appliesTo: '所有元素',
    inherited: false,
    percentages: null,
    computedValue: '绝对长度',
    css2Url: 'https://www.w3.org/TR/CSS22/ui.html#propdef-outline',
    css3Url: 'https://www.w3.org/TR/css-ui-3/#propdef-outline-offset',
    sectionRef: 'colors-backgrounds#borders-decoration'
  }
};
