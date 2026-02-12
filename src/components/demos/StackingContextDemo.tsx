'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 层叠上下文 (Stacking Context) */
.stage {
  position: relative;
  width: 100%;
  height: 280px;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  overflow: hidden;
}
.layer {
  position: absolute;
  width: 160px;
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.layer-a {
  background: rgba(244, 63, 94, 0.85);
  left: 20px; top: 20px;
  z-index: 1;
}
.layer-b {
  background: rgba(59, 130, 246, 0.85);
  left: 60px; top: 55px;
  z-index: 2;
}
.layer-c {
  background: rgba(34, 197, 94, 0.85);
  left: 100px; top: 90px;
  z-index: 3;
}
.layer-d {
  background: rgba(245, 158, 11, 0.85);
  left: 140px; top: 125px;
  z-index: auto;
}
.order {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  margin-top: 12px;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 13px;
  align-items: center;
}
.order-item {
  padding: 4px 10px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}
.arrow { color: #94a3b8; }
.note {
  margin-top: 12px;
  padding: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="stage">
  <div class="layer layer-a">层 A (z:1)</div>
  <div class="layer layer-b">层 B (z:2)</div>
  <div class="layer layer-c">层 C (z:3)</div>
  <div class="layer layer-d">层 D (z:auto)</div>
</div>
<div class="order">
  绘制顺序：
  <span class="order-item">层D (auto=0)</span>
  <span class="arrow">→</span>
  <span class="order-item">层A (z:1)</span>
  <span class="arrow">→</span>
  <span class="order-item">层B (z:2)</span>
  <span class="arrow">→</span>
  <span class="order-item">层C (z:3)</span>
</div>
<div class="note">z-index 值越大，元素在层叠顺序中越靠上。position 必须非 static 才能使 z-index 生效。</div>`;

const presets = [
  {
    label: '默认',
  },
  {
    label: '反转顺序',
    css: `.stage {
  position: relative; width: 100%; height: 280px;
  background: #f8fafc; border-radius: 8px; border: 2px solid #e2e8f0; overflow: hidden;
}
.layer {
  position: absolute; width: 160px; height: 120px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.layer-a { background: rgba(244,63,94,0.85); left: 20px; top: 20px; z-index: 3; }
.layer-b { background: rgba(59,130,246,0.85); left: 60px; top: 55px; z-index: 2; }
.layer-c { background: rgba(34,197,94,0.85); left: 100px; top: 90px; z-index: 1; }
.layer-d { background: rgba(245,158,11,0.85); left: 140px; top: 125px; z-index: 0; }
.order { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px; margin-top: 12px; background: #f1f5f9; border-radius: 6px; font-size: 13px; align-items: center; }
.order-item { padding: 4px 10px; background: white; border: 1px solid #e2e8f0; border-radius: 4px; font-family: monospace; font-size: 12px; }
.arrow { color: #94a3b8; }
.note { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; }`,
    html: `<div class="stage">
  <div class="layer layer-a">层 A (z:3)</div>
  <div class="layer layer-b">层 B (z:2)</div>
  <div class="layer layer-c">层 C (z:1)</div>
  <div class="layer layer-d">层 D (z:0)</div>
</div>
<div class="order">
  绘制顺序：
  <span class="order-item">层D (z:0)</span>
  <span class="arrow">→</span>
  <span class="order-item">层C (z:1)</span>
  <span class="arrow">→</span>
  <span class="order-item">层B (z:2)</span>
  <span class="arrow">→</span>
  <span class="order-item">层A (z:3)</span>
</div>
<div class="note">反转 z-index 后，层 A 在最上面，层 D 在最下面。</div>`,
  },
  {
    label: '嵌套上下文',
    css: `.stage {
  position: relative; width: 100%; height: 280px;
  background: #f8fafc; border-radius: 8px; border: 2px solid #e2e8f0; overflow: hidden;
}
.layer {
  position: absolute; width: 160px; height: 120px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.layer-a {
  background: rgba(244,63,94,0.85); left: 20px; top: 20px;
  z-index: 1; opacity: 0.99; /* 建立层叠上下文 */
}
.layer-b { background: rgba(59,130,246,0.85); left: 60px; top: 55px; z-index: 2; }
.layer-c {
  background: rgba(34,197,94,0.85); left: 100px; top: 90px;
  z-index: 3; opacity: 0.99; /* 建立层叠上下文 */
}
.ctx-badge {
  position: absolute; top: -8px; right: -8px;
  background: #fbbf24; color: #78350f; font-size: 10px;
  padding: 2px 6px; border-radius: 10px; font-weight: 600;
}
.note { margin-top: 12px; padding: 10px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; font-size: 13px; color: #c2410c; line-height: 1.6; }`,
    html: `<div class="stage">
  <div class="layer layer-a">层 A (z:1)<span class="ctx-badge">SC</span></div>
  <div class="layer layer-b">层 B (z:2)</div>
  <div class="layer layer-c">层 C (z:3)<span class="ctx-badge">SC</span></div>
</div>
<div class="note">
  层 A 和层 C 通过 opacity: 0.99 建立了新的层叠上下文 (SC)。其内部子元素的 z-index 只在该上下文内比较，不会与外部元素对比。
</div>`,
  },
  {
    label: '相同层级',
    css: `.stage {
  position: relative; width: 100%; height: 280px;
  background: #f8fafc; border-radius: 8px; border: 2px solid #e2e8f0; overflow: hidden;
}
.layer {
  position: absolute; width: 160px; height: 120px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.layer-a { background: rgba(244,63,94,0.85); left: 20px; top: 20px; z-index: 0; }
.layer-b { background: rgba(59,130,246,0.85); left: 60px; top: 55px; z-index: 0; }
.layer-c { background: rgba(34,197,94,0.85); left: 100px; top: 90px; z-index: 0; }
.layer-d { background: rgba(245,158,11,0.85); left: 140px; top: 125px; z-index: 0; }
.note { margin-top: 12px; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; }`,
    html: `<div class="stage">
  <div class="layer layer-a">层 A (z:0)</div>
  <div class="layer layer-b">层 B (z:0)</div>
  <div class="layer layer-c">层 C (z:0)</div>
  <div class="layer layer-d">层 D (z:0)</div>
</div>
<div class="note">所有层级 z-index 相同时，按 HTML 文档顺序绘制——后出现的元素在上方。</div>`,
  },
];

export function StackingContextDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={420}
    />
  );
}
