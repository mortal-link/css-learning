'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.container {
  max-width: 400px;
  margin: 0 auto;
}

.float-shape {
  width: 150px;
  height: 150px;
  float: left;
  margin-right: 16px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  shape-outside: circle(50%);
  clip-path: circle(50%);
}

.text {
  font-size: 14px;
  line-height: 1.8;
  color: #333;
}

.label {
  clear: both;
  padding-top: 12px;
  text-align: center;
  font-size: 12px;
  color: #888;
  font-family: monospace;
}`;

const defaultHTML = `<div class="container">
  <div class="float-shape"></div>
  <p class="text">CSS Shapes 允许文本围绕非矩形区域流动。shape-outside 属性定义了浮动元素周围文本的环绕形状。这使得我们可以创建更有趣的文本布局，而不仅仅是围绕矩形盒子。文本会自动沿着定义的形状边缘流动，创造出更加自然和美观的排版效果。这个功能特别适合杂志风格的布局设计。</p>
</div>
<div class="label">shape-outside: circle(50%)</div>`;

const presets = [
  {
    label: '圆形环绕',
    css: `.container { max-width: 400px; margin: 0 auto; }
.float-shape {
  width: 150px; height: 150px; float: left;
  margin-right: 16px; margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  shape-outside: circle(50%);
  clip-path: circle(50%);
}
.text { font-size: 14px; line-height: 1.8; color: #333; }
.label { clear: both; padding-top: 12px; text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container"><div class="float-shape"></div><p class="text">CSS Shapes 允许文本围绕非矩形区域流动。shape-outside 属性定义了浮动元素周围文本的环绕形状。这使得我们可以创建更有趣的文本布局，而不仅仅是围绕矩形盒子。文本会自动沿着定义的形状边缘流动，创造出更加自然和美观的排版效果。</p></div>
<div class="label">shape-outside: circle(50%)</div>`,
  },
  {
    label: '椭圆环绕',
    css: `.container { max-width: 400px; margin: 0 auto; }
.float-shape {
  width: 150px; height: 200px; float: left;
  margin-right: 16px; margin-bottom: 8px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  shape-outside: ellipse(50% 50%);
  clip-path: ellipse(50% 50%);
}
.text { font-size: 14px; line-height: 1.8; color: #333; }
.label { clear: both; padding-top: 12px; text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container"><div class="float-shape"></div><p class="text">椭圆形状的 shape-outside 让文本沿着椭圆边缘流动。与圆形不同，椭圆可以有不同的水平和垂直半径，适合用于更多样化的布局。文本会紧贴椭圆形状排列，创造出独特的视觉效果。这在杂志和博客排版中非常实用。</p></div>
<div class="label">shape-outside: ellipse(50% 50%)</div>`,
  },
  {
    label: '多边形环绕',
    css: `.container { max-width: 400px; margin: 0 auto; }
.float-shape {
  width: 150px; height: 150px; float: left;
  margin-right: 16px; margin-bottom: 8px;
  background: linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%);
  shape-outside: polygon(50% 0%, 100% 100%, 0% 100%);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
.text { font-size: 14px; line-height: 1.8; color: #333; }
.label { clear: both; padding-top: 12px; text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container"><div class="float-shape"></div><p class="text">三角形的 polygon 形状让文本沿着三角形的斜边流动。polygon() 函数可以定义任意多边形，非常灵活。你可以用它创建各种复杂的环绕形状，实现创意十足的文本布局效果。</p></div>
<div class="label">shape-outside: polygon(50% 0%, 100% 100%, 0% 100%)</div>`,
  },
  {
    label: 'inset 内嵌',
    css: `.container { max-width: 400px; margin: 0 auto; }
.float-shape {
  width: 150px; height: 150px; float: left;
  margin-right: 16px; margin-bottom: 8px;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  shape-outside: inset(10% round 50%);
  clip-path: inset(10% round 50%);
}
.text { font-size: 14px; line-height: 1.8; color: #333; }
.label { clear: both; padding-top: 12px; text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container"><div class="float-shape"></div><p class="text">inset 形状创建一个内嵌的矩形区域，可以添加圆角。当 round 值设置为 50% 时，实际上会形成一个圆角矩形。这种方式比直接使用 circle 更灵活，可以控制各方向的内边距。</p></div>
<div class="label">shape-outside: inset(10% round 50%)</div>`,
  },
  {
    label: 'shape-margin',
    css: `.container { max-width: 400px; margin: 0 auto; }
.float-shape {
  width: 150px; height: 150px; float: left;
  margin-right: 16px; margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  shape-outside: circle(50%);
  clip-path: circle(50%);
  shape-margin: 20px;
}
.text { font-size: 14px; line-height: 1.8; color: #333; }
.label { clear: both; padding-top: 12px; text-align: center; font-size: 12px; color: #888; font-family: monospace; }`,
    html: `<div class="container"><div class="float-shape"></div><p class="text">shape-margin 属性给形状外部添加间距，让文本不会紧贴形状边缘。这里设置了 20px 的 shape-margin，文本距离圆形边缘有额外的间距，使阅读更加舒适。</p></div>
<div class="label">shape-outside: circle(50%); shape-margin: 20px;</div>`,
  },
];

export function CSSShapeDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={300}
    />
  );
}
