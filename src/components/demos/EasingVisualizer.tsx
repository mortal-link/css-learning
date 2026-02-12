'use client';

import { DemoPlayground } from './DemoPlayground';

const defaultCSS = `/* 缓动函数可视化 */
.section { padding: 16px; }
.title { font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 12px; }

.tracks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.track {
  display: flex;
  align-items: center;
  gap: 12px;
}
.track-label {
  width: 90px;
  font-size: 12px;
  font-family: monospace;
  color: #64748b;
  text-align: right;
}
.track-bar {
  flex: 1;
  height: 36px;
  background: #f1f5f9;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
}

@keyframes move {
  from { left: 0; }
  to { left: calc(100% - 36px); }
}

.ball {
  position: absolute;
  top: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  animation: move 2s infinite alternate;
}
.ball.ease { background: #3b82f6; animation-timing-function: ease; }
.ball.linear { background: #64748b; animation-timing-function: linear; }
.ball.ease-in { background: #10b981; animation-timing-function: ease-in; }
.ball.ease-out { background: #f59e0b; animation-timing-function: ease-out; }
.ball.ease-in-out { background: #8b5cf6; animation-timing-function: ease-in-out; }

.note {
  margin-top: 16px;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}`;

const defaultHTML = `<div class="section">
  <div class="title">缓动函数对比</div>
  <div class="tracks">
    <div class="track">
      <span class="track-label">ease</span>
      <div class="track-bar"><div class="ball ease"></div></div>
    </div>
    <div class="track">
      <span class="track-label">linear</span>
      <div class="track-bar"><div class="ball linear"></div></div>
    </div>
    <div class="track">
      <span class="track-label">ease-in</span>
      <div class="track-bar"><div class="ball ease-in"></div></div>
    </div>
    <div class="track">
      <span class="track-label">ease-out</span>
      <div class="track-bar"><div class="ball ease-out"></div></div>
    </div>
    <div class="track">
      <span class="track-label">ease-in-out</span>
      <div class="track-bar"><div class="ball ease-in-out"></div></div>
    </div>
  </div>
  <div class="note">
    ease: 默认，慢-快-慢 | linear: 匀速 | ease-in: 慢入 | ease-out: 慢出 | ease-in-out: 慢入慢出
  </div>
</div>`;

const presets = [
  {
    label: '对比模式',
  },
  {
    label: 'steps() 阶梯',
    css: `.section { padding: 16px; }
.title { font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 12px; }
.tracks { display: flex; flex-direction: column; gap: 12px; }
.track { display: flex; align-items: center; gap: 12px; }
.track-label { width: 90px; font-size: 12px; font-family: monospace; color: #64748b; text-align: right; }
.track-bar { flex: 1; height: 36px; background: #f1f5f9; border-radius: 18px; position: relative; overflow: hidden; }
@keyframes move { from { left: 0; } to { left: calc(100% - 36px); } }
.ball {
  position: absolute; top: 0; width: 36px; height: 36px;
  border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  animation: move 2s infinite alternate;
}
.ball.s4 { background: #ef4444; animation-timing-function: steps(4, end); }
.ball.s8 { background: #f59e0b; animation-timing-function: steps(8, end); }
.ball.s16 { background: #10b981; animation-timing-function: steps(16, end); }
.ball.linear { background: #64748b; animation-timing-function: linear; }
.note { margin-top: 16px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; color: #475569; line-height: 1.6; }`,
    html: `<div class="section">
  <div class="title">steps() 阶梯缓动</div>
  <div class="tracks">
    <div class="track">
      <span class="track-label">steps(4)</span>
      <div class="track-bar"><div class="ball s4"></div></div>
    </div>
    <div class="track">
      <span class="track-label">steps(8)</span>
      <div class="track-bar"><div class="ball s8"></div></div>
    </div>
    <div class="track">
      <span class="track-label">steps(16)</span>
      <div class="track-bar"><div class="ball s16"></div></div>
    </div>
    <div class="track">
      <span class="track-label">linear</span>
      <div class="track-bar"><div class="ball linear"></div></div>
    </div>
  </div>
  <div class="note">steps(n) 将动画分为 n 步阶梯运动，常用于精灵动画。步数越多越接近平滑。</div>
</div>`,
  },
  {
    label: 'cubic-bezier',
    css: `.section { padding: 16px; }
.title { font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 12px; }
.tracks { display: flex; flex-direction: column; gap: 12px; }
.track { display: flex; align-items: center; gap: 12px; }
.track-label { width: 120px; font-size: 11px; font-family: monospace; color: #64748b; text-align: right; }
.track-bar { flex: 1; height: 36px; background: #f1f5f9; border-radius: 18px; position: relative; overflow: hidden; }
@keyframes move { from { left: 0; } to { left: calc(100% - 36px); } }
.ball {
  position: absolute; top: 0; width: 36px; height: 36px;
  border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  animation: move 2s infinite alternate;
}
.ball.back { background: #ef4444; animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.ball.fast-start { background: #3b82f6; animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0); }
.ball.bounce { background: #8b5cf6; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
.ball.linear { background: #64748b; animation-timing-function: linear; }
.note { margin-top: 16px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; color: #475569; line-height: 1.6; }`,
    html: `<div class="section">
  <div class="title">自定义 cubic-bezier</div>
  <div class="tracks">
    <div class="track">
      <span class="track-label">Back (回弹)</span>
      <div class="track-bar"><div class="ball back"></div></div>
    </div>
    <div class="track">
      <span class="track-label">Fast Start</span>
      <div class="track-bar"><div class="ball fast-start"></div></div>
    </div>
    <div class="track">
      <span class="track-label">Bounce</span>
      <div class="track-bar"><div class="ball bounce"></div></div>
    </div>
    <div class="track">
      <span class="track-label">linear (参考)</span>
      <div class="track-bar"><div class="ball linear"></div></div>
    </div>
  </div>
  <div class="note">cubic-bezier(x1, y1, x2, y2) 可创建自定义缓动曲线。y 值超出 0-1 范围可产生回弹效果。</div>
</div>`,
  },
];

export function EasingVisualizer() {
  return (
    <DemoPlayground
      defaultCSS={defaultCSS}
      defaultHTML={defaultHTML}
      presets={presets}
      iframeHeight={340}
    />
  );
}
