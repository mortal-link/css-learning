'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 层叠来源: Author > User > UA (正常情况) */
/* UA 默认样式 */
p { color: black; font-size: 16px; background: white; }

/* 用户样式 */
p { color: #0066cc; font-size: 18px; background: #f0f0f0; }

/* 作者样式 (优先级最高) */
p { color: #ff6600; font-size: 20px; background: #fff3e0; }

.demo { font-family: system-ui; padding: 16px; }
.preview {
  padding: 20px;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 16px;
}
.origin-list { font-size: 13px; line-height: 2; }
.origin { padding: 4px 8px; border-radius: 4px; margin: 2px 0; display: block; }
.origin.ua { background: #dbeafe; border-left: 3px solid #3b82f6; }
.origin.user { background: #dcfce7; border-left: 3px solid #22c55e; }
.origin.author { background: #ffedd5; border-left: 3px solid #f97316; }
.winner { font-weight: bold; }
.loser { opacity: 0.5; text-decoration: line-through; }`;

const defaultHTML = `<div class="demo">
  <div class="preview" style="color: #ff6600; font-size: 20px; background: #fff3e0;">
    这是一个示例段落
  </div>
  <div class="origin-list">
    <strong>层叠来源优先级（正常声明）：</strong>
    <span class="origin ua loser">UA 默认: color: black; font-size: 16px;</span>
    <span class="origin user loser">用户样式: color: #0066cc; font-size: 18px;</span>
    <span class="origin author winner">作者样式: color: #ff6600; font-size: 20px; ← 胜出</span>
  </div>
</div>`;

const presets = [
  {
    label: '正常优先级',
    css: `.demo { font-family: system-ui; padding: 16px; }
.preview { padding: 20px; border: 2px dashed #e2e8f0; border-radius: 8px; text-align: center; font-weight: 600; margin-bottom: 16px; }
.origin-list { font-size: 13px; line-height: 2; }
.origin { padding: 4px 8px; border-radius: 4px; margin: 2px 0; display: block; }
.origin.ua { background: #dbeafe; border-left: 3px solid #3b82f6; }
.origin.user { background: #dcfce7; border-left: 3px solid #22c55e; }
.origin.author { background: #ffedd5; border-left: 3px solid #f97316; }
.winner { font-weight: bold; }
.loser { opacity: 0.5; text-decoration: line-through; }`,
    html: `<div class="demo">
  <div class="preview" style="color: #ff6600; font-size: 20px; background: #fff3e0;">
    作者样式获胜 (Author > User > UA)
  </div>
  <div class="origin-list">
    <strong>正常声明优先级：</strong>
    <span class="origin ua loser">UA: color: black</span>
    <span class="origin user loser">User: color: #0066cc</span>
    <span class="origin author winner">Author: color: #ff6600 ← 胜出</span>
  </div>
</div>`,
  },
  {
    label: '!important 反转',
    css: `.demo { font-family: system-ui; padding: 16px; }
.preview { padding: 20px; border: 2px dashed #e2e8f0; border-radius: 8px; text-align: center; font-weight: 600; margin-bottom: 16px; }
.origin-list { font-size: 13px; line-height: 2; }
.origin { padding: 4px 8px; border-radius: 4px; margin: 2px 0; display: block; }
.origin.ua { background: #dbeafe; border-left: 3px solid #3b82f6; }
.origin.user { background: #dcfce7; border-left: 3px solid #22c55e; }
.origin.author { background: #ffedd5; border-left: 3px solid #f97316; }
.winner { font-weight: bold; }
.loser { opacity: 0.5; text-decoration: line-through; }
.important { color: #dc2626; }`,
    html: `<div class="demo">
  <div class="preview" style="color: black; font-size: 20px; background: #dbeafe;">
    UA !important 获胜 (反转!)
  </div>
  <div class="origin-list">
    <strong>!important 声明优先级（反转！）：</strong>
    <span class="origin ua winner"><span class="important">UA !important: color: black ← 胜出</span></span>
    <span class="origin user loser"><span class="important">User !important: color: #0066cc</span></span>
    <span class="origin author loser"><span class="important">Author !important: color: #ff6600</span></span>
  </div>
</div>`,
  },
  {
    label: '完整8级排序',
    css: `.demo { font-family: system-ui; padding: 16px; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 8px 12px; border: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; font-weight: 600; }
.high { background: #fef2f2; color: #dc2626; font-weight: bold; }
.mid { background: #fffbeb; }
.low { background: #f0fdf4; }`,
    html: `<div class="demo">
  <table>
    <tr><th>优先级</th><th>来源</th><th>说明</th></tr>
    <tr class="high"><td>1 (最高)</td><td>Transition</td><td>过渡声明</td></tr>
    <tr class="high"><td>2</td><td>UA !important</td><td>浏览器默认 !important</td></tr>
    <tr class="high"><td>3</td><td>User !important</td><td>用户 !important</td></tr>
    <tr class="high"><td>4</td><td>Author !important</td><td>作者 !important</td></tr>
    <tr class="mid"><td>5</td><td>Animation</td><td>动画声明</td></tr>
    <tr class="low"><td>6</td><td>Author</td><td>作者样式（正常）</td></tr>
    <tr class="low"><td>7</td><td>User</td><td>用户样式（正常）</td></tr>
    <tr class="low"><td>8 (最低)</td><td>UA</td><td>浏览器默认</td></tr>
  </table>
</div>`,
  },
  {
    label: '混合场景',
    css: `.demo { font-family: system-ui; padding: 16px; }
.preview { padding: 16px; border-radius: 8px; margin-bottom: 12px; font-weight: 600; text-align: center; }
.code { font-family: monospace; font-size: 13px; padding: 12px; background: #1e293b; color: #e2e8f0; border-radius: 6px; line-height: 1.8; }
.comment { color: #64748b; }
.important { color: #f87171; }
.normal { color: #4ade80; }`,
    html: `<div class="demo">
  <div class="preview" style="color: #0066cc; font-size: 20px; background: #dcfce7;">
    用户 !important 胜过作者正常声明
  </div>
  <div class="code">
    <span class="comment">/* 作者样式 (正常) */</span><br>
    <span class="normal">p { color: #ff6600; }</span><br><br>
    <span class="comment">/* 用户样式 (!important) */</span><br>
    <span class="important">p { color: #0066cc !important; }</span><br><br>
    <span class="comment">/* 结果: 用户 !important > 作者 normal */</span>
  </div>
</div>`,
  },
];

export function CascadeOriginDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
    />
  );
}
