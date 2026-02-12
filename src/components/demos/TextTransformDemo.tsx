'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.text-sample {
  font-size: 18px;
  line-height: 1.6;
  text-transform: none;
  letter-spacing: 0;
  word-spacing: 0;
  text-indent: 0;
}`;

const defaultHTML = `<p class="text-sample">CSS text properties control the transformation and spacing of text content. 文本属性控制着文字的转换和间距效果。</p>
<p class="text-sample" style="margin-top:8px;font-size:14px;color:#666">This demo showcases various text transformation and spacing options available in CSS.</p>`;

const presets = [
  {
    label: '大写标题',
    css: `.text-sample {
  font-size: 18px;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 2px;
  word-spacing: 8px;
  text-indent: 0;
}`,
  },
  {
    label: '首字母大写',
    css: `.text-sample {
  font-size: 18px;
  line-height: 1.6;
  text-transform: capitalize;
  letter-spacing: 0;
  word-spacing: 0;
  text-indent: 0;
}`,
  },
  {
    label: '小写转换',
    css: `.text-sample {
  font-size: 18px;
  line-height: 1.6;
  text-transform: lowercase;
  letter-spacing: 1px;
  word-spacing: 0;
  text-indent: 0;
}`,
  },
  {
    label: '宽松字间距',
    css: `.text-sample {
  font-size: 18px;
  line-height: 1.6;
  text-transform: none;
  letter-spacing: 5px;
  word-spacing: 15px;
  text-indent: 0;
}`,
  },
  {
    label: '首行缩进',
    css: `.text-sample {
  font-size: 18px;
  line-height: 1.6;
  text-transform: none;
  letter-spacing: 0;
  word-spacing: 0;
  text-indent: 2em;
}`,
  },
];

export function TextTransformDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={160}
    />
  );
}
