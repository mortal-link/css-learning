'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 用户交互伪类 */
button {
  padding: 8px 16px;
  border: 2px solid #3b82f6;
  background: #dbeafe;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  margin: 4px;
}
button:hover {
  background: #3b82f6;
  color: white;
  transform: scale(1.05);
}
button:active {
  transform: scale(0.95);
  background: #1d4ed8;
}
a {
  color: #3b82f6;
  margin: 8px;
  display: inline-block;
}
a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }`;

const defaultHTML = `<div class="container">
  <h3>用户交互伪类</h3>
  <div>
    <button>悬停我 :hover</button>
    <button>按住我 :active</button>
  </div>
  <div>
    <a href="#">链接 :hover</a>
  </div>
  <p style="color:#666;font-size:12px;margin-top:12px">尝试悬停和点击按钮，观察 :hover 和 :active 效果</p>
</div>`;

const presets = [
  {
    label: '用户交互',
    css: `button { padding: 8px 16px; border: 2px solid #3b82f6; background: #dbeafe; border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.2s; margin: 4px; }
button:hover { background: #3b82f6; color: white; transform: scale(1.05); }
button:active { transform: scale(0.95); background: #1d4ed8; color: white; }
a { color: #3b82f6; margin: 8px; display: inline-block; }
a:hover { color: #1d4ed8; text-decoration: underline; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }`,
    html: `<div class="container">
  <h3>:hover / :active / :focus</h3>
  <button>悬停我 :hover</button>
  <button>按住我 :active</button>
  <br><a href="#">链接悬停效果</a>
  <p style="color:#666;font-size:12px;margin-top:12px">鼠标悬停、点击按钮查看效果</p>
</div>`,
  },
  {
    label: 'UI 状态',
    css: `input[type="checkbox"] { width: 18px; height: 18px; accent-color: #3b82f6; vertical-align: middle; }
input[type="checkbox"]:checked + label { color: #22c55e; font-weight: bold; }
input[type="text"] { padding: 8px; border: 2px solid #ccc; border-radius: 4px; font-size: 14px; width: 200px; transition: border-color 0.2s; }
input[type="text"]:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
input:disabled { opacity: 0.5; cursor: not-allowed; }
button { padding: 8px 16px; border: 2px solid #3b82f6; background: #dbeafe; border-radius: 6px; cursor: pointer; font-size: 14px; margin: 4px; }
button:disabled { opacity: 0.5; cursor: not-allowed; background: #e5e7eb; border-color: #9ca3af; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
.row { margin: 8px 0; display: flex; align-items: center; gap: 8px; }`,
    html: `<div class="container">
  <h3>:checked / :disabled / :focus</h3>
  <div class="row"><input type="checkbox" id="c1"><label for="c1">选中变绿 :checked</label></div>
  <div class="row"><input type="checkbox" id="c2" checked><label for="c2">已选中 :checked</label></div>
  <div class="row"><input type="text" placeholder="点击聚焦 :focus"></div>
  <div class="row"><button disabled>禁用按钮 :disabled</button></div>
</div>`,
  },
  {
    label: '结构伪类',
    css: `ul { list-style: none; padding: 0; margin: 0; }
li { padding: 8px 12px; margin: 2px 0; border-radius: 4px; font-size: 14px; }
li:first-child { background: #dbeafe; border-left: 4px solid #3b82f6; font-weight: bold; }
li:last-child { background: #f3e8ff; border-left: 4px solid #a855f7; font-weight: bold; }
li:nth-child(even) { background: #fef3c7; }
li:nth-child(odd):not(:first-child):not(:last-child) { background: #f8fafc; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }`,
    html: `<div class="container">
  <h3>:first-child / :last-child / :nth-child</h3>
  <ul>
    <li>第一项 — :first-child (蓝)</li>
    <li>第二项 — :nth-child(even) (黄)</li>
    <li>第三项 — :nth-child(odd)</li>
    <li>第四项 — :nth-child(even) (黄)</li>
    <li>最后一项 — :last-child (紫)</li>
  </ul>
</div>`,
  },
  {
    label: '表单验证',
    css: `input[type="email"] { padding: 8px; border: 2px solid #ccc; border-radius: 4px; font-size: 14px; width: 240px; transition: border-color 0.2s; }
input:valid { border-color: #22c55e; background: #f0fdf4; }
input:invalid { border-color: #ef4444; background: #fef2f2; }
input:focus { outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
input::placeholder { color: #9ca3af; }
.container { padding: 12px; font-family: sans-serif; font-size: 14px; }
.hint { font-size: 12px; color: #666; margin-top: 4px; }`,
    html: `<div class="container">
  <h3>:valid / :invalid</h3>
  <input type="email" placeholder="输入邮箱地址" value="test@example.com">
  <div class="hint">有效邮箱 → 绿色边框 :valid</div>
  <br><br>
  <input type="email" placeholder="输入邮箱地址" value="invalid-email">
  <div class="hint">无效邮箱 → 红色边框 :invalid</div>
</div>`,
  },
];

export function PseudoClassDemo() {
  return <DemoPlayground defaultCSS={defaultCSS} defaultHTML={defaultHTML} presets={presets} iframeHeight={280} />;
}
