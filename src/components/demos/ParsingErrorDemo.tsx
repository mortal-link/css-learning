'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* CSS 解析错误恢复演示 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box {
  padding: 12px 16px;
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #92400e;
}
.info-box strong { color: #78350f; }
.error-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}
.error-card {
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}
.error-card h4 { font-size: 12px; font-weight: 600; margin: 0 0 4px; }
.error-card p { font-size: 11px; color: #6b7280; margin: 0; }
.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 8px;
  padding: 16px;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}
.valid { color: #4ade80; }
.invalid { color: #f87171; text-decoration: line-through; }
.error-hint { color: #fca5a5; font-size: 11px; margin-left: 8px; }`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>CSS 错误恢复模型：</strong>
    当浏览器遇到无法解析的 CSS 时，它会跳过无效的声明或规则，继续解析后续的有效内容。
    这种容错机制确保部分错误不会导致整个样式表失效。
  </div>

  <h3 style="font-size:14px;margin:0 0 12px;">缺少分号示例</h3>
  <div class="code-block">
    <span class="valid">.box {</span><br>
    <span class="invalid">&nbsp;&nbsp;color: red</span><span class="error-hint">&larr; 缺少分号</span><br>
    <span class="invalid">&nbsp;&nbsp;background: blue;</span><span class="error-hint">&larr; 被上一行拖累</span><br>
    <span class="valid">&nbsp;&nbsp;padding: 10px;</span><br>
    <span class="valid">}</span>
  </div>

  <h3 style="font-size:14px;margin:16px 0 12px;">浏览器实际应用效果</h3>
  <div style="display:flex;gap:16px;">
    <div style="padding:16px;background:#fee2e2;border-radius:8px;flex:1;">
      <div style="font-size:12px;color:#991b1b;margin-bottom:8px;font-weight:600;">有错误的 CSS</div>
      <div style="padding:10px;border:1px solid #ddd;border-radius:4px;background:white;">
        只有 padding 生效，color 和 background 被跳过
      </div>
    </div>
    <div style="padding:16px;background:#dcfce7;border-radius:8px;flex:1;">
      <div style="font-size:12px;color:#166534;margin-bottom:8px;font-weight:600;">修正后的 CSS</div>
      <div style="color:red;background:blue;padding:10px;border-radius:4px;color:white;">
        所有属性正常生效
      </div>
    </div>
  </div>

  <div class="error-grid">
    <div class="error-card">
      <h4>缺少分号</h4>
      <p>每个声明必须以分号结尾，否则后续声明会被跳过</p>
    </div>
    <div class="error-card">
      <h4>未知属性</h4>
      <p>浏览器无法识别的属性会被忽略，不影响其他声明</p>
    </div>
    <div class="error-card">
      <h4>未闭合括号</h4>
      <p>缺少闭合括号会导致整个规则块及后续内容被跳过</p>
    </div>
    <div class="error-card">
      <h4>无效值</h4>
      <p>属性值不符合规范时，该声明会被忽略</p>
    </div>
  </div>
</div>`;

const presets = [
  { label: '缺少分号', css: `/* 缺少分号 — 浏览器跳过后续声明 */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #92400e; }
.code-block { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; line-height: 1.6; }
.valid { color: #4ade80; }
.invalid { color: #f87171; text-decoration: line-through; }
.error-hint { color: #fca5a5; font-size: 11px; margin-left: 8px; }
.error-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
.error-card { padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; }
.error-card h4 { font-size: 12px; font-weight: 600; margin: 0 0 4px; }
.error-card p { font-size: 11px; color: #6b7280; margin: 0; }` },
  { label: '无效值', css: `/* 无效值 — 声明被忽略 */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #92400e; }
.code-block { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; line-height: 1.6; }
.valid { color: #4ade80; }
.invalid { color: #f87171; text-decoration: line-through; }
.error-hint { color: #fca5a5; font-size: 11px; margin-left: 8px; }`,
    html: `<div class="demo">
  <div class="info-box"><strong>无效值：</strong>属性值不符合规范时，浏览器忽略该声明，使用默认值。</div>
  <div class="code-block">
    <span class="valid">.box {</span><br>
    <span class="invalid">&nbsp;&nbsp;color: redd;</span><span class="error-hint">&larr; 无效的颜色值</span><br>
    <span class="invalid">&nbsp;&nbsp;width: 100pixels;</span><span class="error-hint">&larr; 无效的单位</span><br>
    <span class="invalid">&nbsp;&nbsp;display: flexbox;</span><span class="error-hint">&larr; 应为 flex</span><br>
    <span class="valid">&nbsp;&nbsp;padding: 10px;</span><br>
    <span class="valid">}</span>
  </div>
</div>` },
  { label: '未闭合括号', css: `/* 未闭合括号 — 后续规则被吞噬 */
.demo { padding: 16px; font-family: system-ui; }
.info-box { padding: 12px 16px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #92400e; }
.code-block { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; line-height: 1.6; }
.valid { color: #4ade80; }
.invalid { color: #f87171; text-decoration: line-through; }
.error-hint { color: #fca5a5; font-size: 11px; margin-left: 8px; }`,
    html: `<div class="demo">
  <div class="info-box"><strong>未闭合括号：</strong>缺少 } 会导致浏览器将后续规则当作当前规则的一部分。</div>
  <div class="code-block">
    <span class="valid">.box {</span><br>
    <span class="valid">&nbsp;&nbsp;color: red;</span><br>
    <span class="valid">&nbsp;&nbsp;background: blue;</span><br>
    <span class="invalid">&nbsp;&nbsp;/* 缺少 } */</span><span class="error-hint">&larr; 未闭合</span><br>
    <br>
    <span class="invalid">.other {</span><span class="error-hint">&larr; 被上一个规则吞噬</span><br>
    <span class="invalid">&nbsp;&nbsp;margin: 5px;</span><br>
    <span class="valid">}</span>
  </div>
</div>` },
];

export function ParsingErrorDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={420}
    />
  );
}
