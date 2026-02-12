'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.ws-box {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  max-width: 100%;
  overflow-x: auto;
}
.ws-box h3 {
  font-size: 13px;
  color: #3b82f6;
  font-weight: bold;
  margin-bottom: 6px;
  font-family: monospace;
}
.ws-normal   { white-space: normal; }
.ws-nowrap   { white-space: nowrap; }
.ws-pre      { white-space: pre; }
.ws-prewrap  { white-space: pre-wrap; }
.ws-preline  { white-space: pre-line; }

table { border-collapse: collapse; width: 100%; margin-top: 16px; font-size: 13px; }
th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: center; }
th { background: #f0f0f0; font-weight: 600; }
.yes { color: #16a34a; font-weight: bold; }
.no  { color: #dc2626; }`;

const sampleText = `这是一段    包含多个空格    的文本。
这是第二行\t包含制表符的内容。
The   quick   brown   fox   jumps.

This is after an empty line.`;

const defaultHTML = `<div class="ws-box"><h3>normal</h3><div class="ws-normal">${sampleText}</div></div>
<div class="ws-box"><h3>nowrap</h3><div class="ws-nowrap">${sampleText}</div></div>
<div class="ws-box"><h3>pre</h3><div class="ws-pre">${sampleText}</div></div>
<div class="ws-box"><h3>pre-wrap</h3><div class="ws-prewrap">${sampleText}</div></div>
<div class="ws-box"><h3>pre-line</h3><div class="ws-preline">${sampleText}</div></div>

<table>
  <tr><th>特性</th><th>normal</th><th>nowrap</th><th>pre</th><th>pre-wrap</th><th>pre-line</th></tr>
  <tr><td>合并空格</td><td class="yes">Y</td><td class="yes">Y</td><td class="no">N</td><td class="no">N</td><td class="yes">Y</td></tr>
  <tr><td>保留换行</td><td class="no">N</td><td class="no">N</td><td class="yes">Y</td><td class="yes">Y</td><td class="yes">Y</td></tr>
  <tr><td>自动换行</td><td class="yes">Y</td><td class="no">N</td><td class="no">N</td><td class="yes">Y</td><td class="yes">Y</td></tr>
</table>`;

const presets = [
  {
    label: 'normal',
    css: `.ws-box { border: 1px solid #ccc; padding: 12px; margin-bottom: 12px; border-radius: 4px; max-width: 100%; overflow-x: auto; }
.ws-box h3 { font-size: 13px; color: #3b82f6; font-weight: bold; margin-bottom: 6px; font-family: monospace; }
.demo { white-space: normal; }
table { display: none; }`,
    html: `<div class="ws-box"><h3>white-space: normal</h3><div class="demo">${sampleText}</div></div>
<p style="margin-top:12px;font-size:13px;color:#666">合并空格，自动换行，不保留源码换行。</p>`,
  },
  {
    label: 'pre',
    css: `.ws-box { border: 1px solid #ccc; padding: 12px; margin-bottom: 12px; border-radius: 4px; max-width: 100%; overflow-x: auto; }
.ws-box h3 { font-size: 13px; color: #3b82f6; font-weight: bold; margin-bottom: 6px; font-family: monospace; }
.demo { white-space: pre; }
table { display: none; }`,
    html: `<div class="ws-box"><h3>white-space: pre</h3><div class="demo">${sampleText}</div></div>
<p style="margin-top:12px;font-size:13px;color:#666">保留空格和换行，不自动换行（类似 &lt;pre&gt; 标签）。</p>`,
  },
  {
    label: 'pre-wrap',
    css: `.ws-box { border: 1px solid #ccc; padding: 12px; margin-bottom: 12px; border-radius: 4px; max-width: 100%; overflow-x: auto; }
.ws-box h3 { font-size: 13px; color: #3b82f6; font-weight: bold; margin-bottom: 6px; font-family: monospace; }
.demo { white-space: pre-wrap; }
table { display: none; }`,
    html: `<div class="ws-box"><h3>white-space: pre-wrap</h3><div class="demo">${sampleText}</div></div>
<p style="margin-top:12px;font-size:13px;color:#666">保留空格和换行，同时允许自动换行。</p>`,
  },
  {
    label: 'nowrap',
    css: `.ws-box { border: 1px solid #ccc; padding: 12px; margin-bottom: 12px; border-radius: 4px; max-width: 100%; overflow-x: auto; }
.ws-box h3 { font-size: 13px; color: #3b82f6; font-weight: bold; margin-bottom: 6px; font-family: monospace; }
.demo { white-space: nowrap; }
table { display: none; }`,
    html: `<div class="ws-box"><h3>white-space: nowrap</h3><div class="demo">${sampleText}</div></div>
<p style="margin-top:12px;font-size:13px;color:#666">合并空格，不换行（需要手动换行或 &lt;br&gt;）。</p>`,
  },
  {
    label: '全部对比',
    css: `.ws-box { border: 1px solid #ccc; padding: 12px; margin-bottom: 12px; border-radius: 4px; max-width: 100%; overflow-x: auto; }
.ws-box h3 { font-size: 13px; color: #3b82f6; font-weight: bold; margin-bottom: 6px; font-family: monospace; }
.ws-normal   { white-space: normal; }
.ws-nowrap   { white-space: nowrap; }
.ws-pre      { white-space: pre; }
.ws-prewrap  { white-space: pre-wrap; }
.ws-preline  { white-space: pre-line; }
table { border-collapse: collapse; width: 100%; margin-top: 16px; font-size: 13px; }
th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: center; }
th { background: #f0f0f0; font-weight: 600; }
.yes { color: #16a34a; font-weight: bold; }
.no  { color: #dc2626; }`,
  },
];

export function WhiteSpaceDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={520}
    />
  );
}
