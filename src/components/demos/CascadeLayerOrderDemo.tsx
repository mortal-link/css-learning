'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 声明层顺序：后声明的层优先级更高 */
@layer base, theme, utilities;

@layer base {
  .target {
    color: blue;
    font-size: 24px;
    font-weight: bold;
    padding: 16px;
    border: 3px solid blue;
    border-radius: 8px;
    text-align: center;
  }
}

@layer theme {
  .target {
    color: green;
    border-color: green;
    background: #f0fdf4;
  }
}

@layer utilities {
  .target {
    color: red;
    border-color: red;
    background: #fef2f2;
  }
}`;

const defaultHTML = `<div class="target">目标元素</div>
<p style="margin-top:12px;font-size:13px;color:#64748b;">
  层顺序: base &lt; theme &lt; utilities<br>
  最后声明的 utilities 层优先级最高，所以文字为红色。
</p>`;

const presets = [
  {
    label: '默认顺序 (base < theme < utilities)',
    css: `@layer base, theme, utilities;

@layer base {
  .target { color: blue; font-size: 24px; font-weight: bold; padding: 16px; border: 3px solid blue; border-radius: 8px; text-align: center; }
}
@layer theme {
  .target { color: green; border-color: green; background: #f0fdf4; }
}
@layer utilities {
  .target { color: red; border-color: red; background: #fef2f2; }
}`,
  },
  {
    label: '反转顺序 (utilities < theme < base)',
    css: `/* 反转声明顺序 */
@layer utilities, theme, base;

@layer base {
  .target { color: blue; font-size: 24px; font-weight: bold; padding: 16px; border: 3px solid blue; border-radius: 8px; text-align: center; background: #eff6ff; }
}
@layer theme {
  .target { color: green; border-color: green; background: #f0fdf4; }
}
@layer utilities {
  .target { color: red; border-color: red; background: #fef2f2; }
}`,
    html: `<div class="target">目标元素</div>
<p style="margin-top:12px;font-size:13px;color:#64748b;">
  层顺序: utilities &lt; theme &lt; base<br>
  base 层最后声明，优先级最高，所以文字为蓝色。
</p>`,
  },
  {
    label: '无层样式优先',
    css: `@layer base, theme;

@layer base {
  .target { color: blue; font-size: 24px; font-weight: bold; padding: 16px; border: 3px solid blue; border-radius: 8px; text-align: center; }
}
@layer theme {
  .target { color: green; border-color: green; background: #f0fdf4; }
}

/* 无层样式优先级高于所有 @layer */
.target {
  color: purple;
  border-color: purple;
  background: #faf5ff;
}`,
    html: `<div class="target">目标元素</div>
<p style="margin-top:12px;font-size:13px;color:#64748b;">
  无层样式 (unlayered) 优先级最高，覆盖所有 @layer 规则。<br>
  所以文字为紫色。
</p>`,
  },
  {
    label: '同层多规则',
    css: `@layer base, theme;

@layer base {
  .target { color: blue; font-size: 24px; font-weight: bold; padding: 16px; border: 3px solid blue; border-radius: 8px; text-align: center; }
}
@layer theme {
  .target { color: green; border-color: green; background: #f0fdf4; }
  /* 同一层内后面的规则覆盖前面的（正常级联） */
  .target { color: orange; border-color: orange; background: #fff7ed; }
}`,
    html: `<div class="target">目标元素</div>
<p style="margin-top:12px;font-size:13px;color:#64748b;">
  同一层内遵循正常级联规则（后出现的覆盖前面的）。<br>
  theme 层内 orange 覆盖 green。
</p>`,
  },
];

export function CascadeLayerOrderDemo() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={200}
    />
  );
}
