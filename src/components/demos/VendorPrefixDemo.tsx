'use client';
import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 浏览器供应商前缀演示 */
.demo { padding: 16px; font-family: system-ui, sans-serif; }
.info-box { padding: 12px 16px; background: #eef2ff; border-left: 4px solid #6366f1; border-radius: 4px; margin-bottom: 16px; font-size: 13px; color: #3730a3; }
.prefix-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.prefix-card { padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
.prefix-card h4 { font-size: 13px; font-family: monospace; font-weight: 600; margin: 0 0 4px; }
.prefix-card p { font-size: 11px; color: #6b7280; margin: 0; }
.prefix-list { margin-top: 16px; }
.prefix-item { display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 4px; border: 1px solid #e5e7eb; margin-bottom: 4px; }
.prefix-label { width: 80px; font-family: monospace; font-size: 13px; font-weight: 600; color: #6366f1; }
.prefix-value { font-family: monospace; font-size: 13px; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; line-height: 1.6; margin-top: 16px; }
.code-comment { color: #6a9955; }
.ref-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 16px; }
.ref-table th, .ref-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left; }
.ref-table th { background: #f9fafb; font-weight: 600; }
.ref-table .mono { font-family: monospace; color: #6366f1; }
.best-practices { padding: 16px; background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; margin-top: 16px; }
.best-practices h4 { font-size: 13px; font-weight: 600; color: #166534; margin: 0 0 8px; }
.best-practices li { font-size: 12px; color: #15803d; margin-bottom: 4px; }
.live-demo { margin-top: 16px; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; }
.demo-text {
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 28px;
  font-weight: 700;
}
.demo-blur {
  padding: 20px;
  background: rgba(255,255,255,0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.3);
}`;

const defaultHTML = `<div class="demo">
  <div class="info-box">
    <strong>浏览器供应商前缀：</strong>当 CSS 特性处于实验阶段时，浏览器使用前缀（-webkit-, -moz-, -ms-）来实现。成熟后移除前缀。
  </div>

  <h3 style="font-size:14px;margin:0 0 12px;">实际效果展示</h3>
  <div class="live-demo">
    <div class="demo-text">渐变文字效果</div>
    <div style="font-size:11px;color:#888;margin-top:4px;">使用 -webkit-text-fill-color + -webkit-background-clip</div>
  </div>

  <div class="live-demo" style="background:linear-gradient(135deg,#6366f1,#ec4899);margin-top:12px;">
    <div class="demo-blur">
      <div style="font-size:14px;font-weight:600;">毛玻璃效果</div>
      <div style="font-size:11px;color:#666;">使用 -webkit-backdrop-filter + backdrop-filter</div>
    </div>
  </div>

  <h3 style="font-size:14px;margin:16px 0 12px;">需要前缀的属性</h3>
  <div class="prefix-grid">
    <div class="prefix-card"><h4>user-select</h4><p>控制用户是否可以选择文本</p></div>
    <div class="prefix-card"><h4>appearance</h4><p>控制元素的原生外观</p></div>
    <div class="prefix-card"><h4>backdrop-filter</h4><p>对元素背后区域应用滤镜</p></div>
    <div class="prefix-card"><h4>text-fill-color</h4><p>设置文本填充颜色</p></div>
  </div>

  <h3 style="font-size:14px;margin:0 0 12px;">Autoprefixer 输出示例</h3>
  <div class="code-block">
    .element {<br>
    &nbsp;&nbsp;-webkit-user-select: none;<br>
    &nbsp;&nbsp;-moz-user-select: none;<br>
    &nbsp;&nbsp;-ms-user-select: none;<br>
    &nbsp;&nbsp;user-select: none;<br>
    }
  </div>

  <table class="ref-table">
    <tr><th>前缀</th><th>浏览器引擎</th><th>代表浏览器</th></tr>
    <tr><td class="mono">-webkit-</td><td>WebKit / Blink</td><td>Chrome, Safari, Edge</td></tr>
    <tr><td class="mono">-moz-</td><td>Gecko</td><td>Firefox</td></tr>
    <tr><td class="mono">-ms-</td><td>Trident</td><td>IE, 旧版 Edge</td></tr>
    <tr><td class="mono">-o-</td><td>Presto</td><td>旧版 Opera</td></tr>
  </table>

  <div class="best-practices">
    <h4>最佳实践建议</h4>
    <ul style="padding-left:16px;margin:0;">
      <li>使用 Autoprefixer 等工具自动添加前缀</li>
      <li>标准属性写在最后，让它覆盖带前缀的版本</li>
      <li>定期检查 caniuse.com，移除不再需要的前缀</li>
      <li>使用 browserslist 配置目标浏览器</li>
    </ul>
  </div>
</div>`;

const presets = [
  { label: '渐变文字', css: `/* 渐变文字需要 -webkit- 前缀 */
.demo { padding: 16px; font-family: system-ui; }
.gradient-text {
  background: linear-gradient(135deg, #6366f1, #ec4899, #f59e0b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  padding: 20px;
}`,
    html: `<div class="demo"><div class="gradient-text">CSS 渐变文字效果</div><p style="text-align:center;font-size:12px;color:#888;">需要 -webkit-background-clip 和 -webkit-text-fill-color</p></div>` },
  { label: '毛玻璃效果', css: `/* backdrop-filter 需要 -webkit- 前缀 */
.demo { padding: 20px; font-family: system-ui; background: linear-gradient(135deg, #667eea, #764ba2); min-height: 200px; display: flex; align-items: center; justify-content: center; }
.glass {
  padding: 24px 32px;
  background: rgba(255,255,255,0.2);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  text-align: center;
}
.glass h3 { margin: 0 0 8px; font-size: 18px; }
.glass p { margin: 0; font-size: 13px; opacity: 0.9; }`,
    html: `<div class="demo"><div class="glass"><h3>毛玻璃效果</h3><p>-webkit-backdrop-filter: blur(12px)</p></div></div>` },
];

export function VendorPrefixDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={520}
    />
  );
}
