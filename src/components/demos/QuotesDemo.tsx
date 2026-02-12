'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `blockquote {
  quotes: "\\300C" "\\300D" "\\300E" "\\300F";
  font-size: 16px;
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 6px 6px 0;
}
blockquote::before { content: open-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
blockquote::after  { content: close-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }

.nested { margin-left: 24px; margin-top: 8px; border-left-color: #8b5cf6; }
.nested::before, .nested::after { color: #8b5cf6; font-size: 18px; }

.chars {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 16px;
}
.char-box {
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px 8px;
}
.char-box .symbol { font-size: 28px; font-weight: bold; color: #3b82f6; }
.char-box .desc { font-size: 11px; color: #666; margin-top: 4px; }`;

const defaultHTML = `<blockquote>
  这是第一层引用
</blockquote>

<blockquote>
  第一层引用
  <blockquote class="nested">
    第二层嵌套引用
  </blockquote>
  继续第一层
</blockquote>

<div class="chars">
  <div class="char-box"><div class="symbol">\\300C</div><div class="desc">第一层 开始</div></div>
  <div class="char-box"><div class="symbol">\\300D</div><div class="desc">第一层 结束</div></div>
  <div class="char-box"><div class="symbol">\\300E</div><div class="desc">第二层 开始</div></div>
  <div class="char-box"><div class="symbol">\\300F</div><div class="desc">第二层 结束</div></div>
</div>`;

const presets = [
  {
    label: '中文',
    css: `blockquote {
  quotes: "\\300C" "\\300D" "\\300E" "\\300F";
  font-size: 16px;
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 6px 6px 0;
}
blockquote::before { content: open-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
blockquote::after  { content: close-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
.nested { margin-left: 24px; margin-top: 8px; border-left-color: #8b5cf6; }
.nested::before, .nested::after { color: #8b5cf6; font-size: 18px; }
.chars { display: none; }`,
  },
  {
    label: 'English',
    css: `blockquote {
  quotes: "\\201C" "\\201D" "\\2018" "\\2019";
  font-size: 16px;
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 6px 6px 0;
}
blockquote::before { content: open-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
blockquote::after  { content: close-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
.nested { margin-left: 24px; margin-top: 8px; border-left-color: #8b5cf6; }
.nested::before, .nested::after { color: #8b5cf6; font-size: 18px; }
.chars { display: none; }`,
  },
  {
    label: 'Francais',
    css: `blockquote {
  quotes: "\\AB\\A0" "\\A0\\BB" "\\2039\\A0" "\\A0\\203A";
  font-size: 16px;
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 6px 6px 0;
}
blockquote::before { content: open-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
blockquote::after  { content: close-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
.nested { margin-left: 24px; margin-top: 8px; border-left-color: #8b5cf6; }
.nested::before, .nested::after { color: #8b5cf6; font-size: 18px; }
.chars { display: none; }`,
  },
  {
    label: 'Deutsch',
    css: `blockquote {
  quotes: "\\BB" "\\AB" "\\203A" "\\2039";
  font-size: 16px;
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 6px 6px 0;
}
blockquote::before { content: open-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
blockquote::after  { content: close-quote; font-size: 20px; color: #3b82f6; font-weight: bold; }
.nested { margin-left: 24px; margin-top: 8px; border-left-color: #8b5cf6; }
.nested::before, .nested::after { color: #8b5cf6; font-size: 18px; }
.chars { display: none; }`,
  },
];

export function QuotesDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={320}
    />
  );
}
