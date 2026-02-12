'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `p {
  text-align: left;
  text-indent: 0;
  letter-spacing: 0;
  word-spacing: 0;
  line-height: 1.5;
}`;

const defaultHTML = `<p>CSS 文本排版（Typography）是网页设计的核心。通过 text-align、letter-spacing 和 line-height 等属性，我们可以精确控制文本的视觉呈现。Good typography makes content readable and beautiful.</p>
<p style="margin-top:12px">第二段落用于观察首行缩进的效果。text-indent 属性只影响每个段落的第一行文本，非常适合用于中文排版中的段落缩进。</p>`;

const presets = [
  {
    label: '默认',
    css: `p {
  text-align: left;
  text-indent: 0;
  letter-spacing: 0;
  word-spacing: 0;
  line-height: 1.5;
}`,
  },
  {
    label: '书信排版',
    css: `p {
  text-align: left;
  text-indent: 2em;
  letter-spacing: 0;
  word-spacing: 0;
  line-height: 1.8;
}`,
  },
  {
    label: '紧凑排版',
    css: `p {
  text-align: left;
  text-indent: 0;
  letter-spacing: -0.5px;
  word-spacing: -2px;
  line-height: 1.2;
}`,
  },
  {
    label: '装饰标题',
    css: `p {
  text-align: center;
  text-indent: 0;
  letter-spacing: 3px;
  word-spacing: 5px;
  line-height: 2;
  text-transform: uppercase;
}`,
  },
  {
    label: '两端对齐',
    css: `p {
  text-align: justify;
  text-indent: 2em;
  letter-spacing: 0;
  word-spacing: 0;
  line-height: 1.6;
}`,
  },
];

export function TextLayoutDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={220}
    />
  );
}
