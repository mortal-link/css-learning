'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `.grandparent {
  position: relative;
  background: #f1f5f9;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 280px;
}
.grandparent::before {
  content: "祖父元素 (relative)";
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 11px;
  color: #64748b;
}

.parent {
  position: relative;
  background: #dbeafe;
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 180px;
}
.parent::before {
  content: "父元素 (relative) — 包含块";
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 11px;
  color: #2563eb;
  font-weight: 600;
}

.child {
  position: absolute;
  top: 50px;
  left: 30px;
  width: 80px;
  height: 60px;
  background: #fecdd3;
  border: 2px solid #e11d48;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #9f1239;
}`;

const defaultHTML = `<div class="grandparent">
  <div class="parent">
    <div class="child">子元素</div>
  </div>
</div>`;

const presets = [
  {
    label: '父 relative + 子 absolute',
    css: `.grandparent {
  position: relative;
  background: #f1f5f9;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 280px;
}
.grandparent::before { content: "祖父元素 (relative)"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #64748b; }
.parent {
  position: relative;
  background: #dbeafe;
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 180px;
}
.parent::before { content: "父元素 (relative) — 包含块"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #2563eb; font-weight: 600; }
.child { position: absolute; top: 50px; left: 30px; width: 80px; height: 60px; background: #fecdd3; border: 2px solid #e11d48; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #9f1239; }`,
  },
  {
    label: '父 static → 穿透到祖父',
    css: `.grandparent {
  position: relative;
  background: #f1f5f9;
  border: 2px solid #f59e0b;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 280px;
}
.grandparent::before { content: "祖父元素 (relative) — 包含块"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #d97706; font-weight: 600; }
.parent {
  position: static;
  background: #dbeafe;
  border: 2px dashed #93c5fd;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 180px;
}
.parent::before { content: "父元素 (static) — 不是包含块"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #64748b; }
.child { position: absolute; top: 50px; left: 30px; width: 80px; height: 60px; background: #fecdd3; border: 2px solid #e11d48; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #9f1239; }`,
  },
  {
    label: '子 relative (在文档流中偏移)',
    css: `.grandparent {
  position: static;
  background: #f1f5f9;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 280px;
}
.grandparent::before { content: "祖父元素 (static)"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #64748b; }
.parent {
  position: static;
  background: #dbeafe;
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 180px;
}
.parent::before { content: "父元素 (static) — 包含块(内容区)"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #2563eb; font-weight: 600; }
.child { position: relative; top: 20px; left: 20px; width: 80px; height: 60px; background: #dcfce7; border: 2px solid #22c55e; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #166534; }`,
  },
  {
    label: '子 fixed (相对视口)',
    css: `.grandparent {
  position: relative;
  background: #f1f5f9;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 280px;
}
.grandparent::before { content: "祖父元素"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #64748b; }
.parent {
  position: relative;
  background: #dbeafe;
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  padding: 40px 16px 16px;
  min-height: 180px;
}
.parent::before { content: "父元素 (relative)"; position: absolute; top: 8px; left: 8px; font-size: 11px; color: #2563eb; }
/* fixed 子元素的包含块是 iframe 视口 */
.child { position: fixed; top: 10px; right: 10px; width: 80px; height: 60px; background: #fef3c7; border: 2px solid #f59e0b; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #92400e; }`,
  },
];

export function ContainingBlockDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={340}
    />
  );
}
