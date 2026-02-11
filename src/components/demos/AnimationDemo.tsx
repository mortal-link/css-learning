'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type TimingFunction = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
type Direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
type FillMode = 'none' | 'forwards' | 'backwards' | 'both';
type PlayState = 'running' | 'paused';

const timingLabels: Record<TimingFunction, string> = {
  'ease': 'Ease',
  'linear': 'Linear',
  'ease-in': 'Ease In',
  'ease-out': 'Ease Out',
  'ease-in-out': 'Ease In-Out',
};

const directionLabels: Record<Direction, string> = {
  'normal': '正向',
  'reverse': '反向',
  'alternate': '交替',
  'alternate-reverse': '反向交替',
};

const fillModeLabels: Record<FillMode, string> = {
  'none': '无',
  'forwards': '保持结束',
  'backwards': '保持开始',
  'both': '双向保持',
};

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.1,
  unit = ''
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-12 text-right font-mono">
        {value === Infinity ? '∞' : `${value}${unit}`}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value === Infinity ? max : value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-current"
      />
      <span className="text-xs w-20 truncate">{label}</span>
    </div>
  );
}

export function AnimationDemo() {
  const [animationName, setAnimationName] = useState('bounce');
  const [duration, setDuration] = useState(1);
  const [timingFunction, setTimingFunction] = useState<TimingFunction>('ease');
  const [delay, setDelay] = useState(0);
  const [iterationCount, setIterationCount] = useState(1);
  const [direction, setDirection] = useState<Direction>('normal');
  const [fillMode, setFillMode] = useState<FillMode>('none');
  const [playState, setPlayState] = useState<PlayState>('running');
  const [animationKey, setAnimationKey] = useState(0);

  const applyPreset = (preset: 'bounce' | 'rotate' | 'pulse' | 'shake' | 'slide-fade') => {
    switch (preset) {
      case 'bounce':
        setAnimationName('bounce');
        setDuration(1);
        setTimingFunction('ease');
        setDelay(0);
        setIterationCount(3);
        setDirection('normal');
        setFillMode('none');
        setPlayState('running');
        break;
      case 'rotate':
        setAnimationName('rotate');
        setDuration(2);
        setTimingFunction('linear');
        setDelay(0);
        setIterationCount(Infinity);
        setDirection('normal');
        setFillMode('none');
        setPlayState('running');
        break;
      case 'pulse':
        setAnimationName('pulse');
        setDuration(1.5);
        setTimingFunction('ease-in-out');
        setDelay(0);
        setIterationCount(Infinity);
        setDirection('alternate');
        setFillMode('none');
        setPlayState('running');
        break;
      case 'shake':
        setAnimationName('shake');
        setDuration(0.5);
        setTimingFunction('ease-in-out');
        setDelay(0);
        setIterationCount(2);
        setDirection('normal');
        setFillMode('none');
        setPlayState('running');
        break;
      case 'slide-fade':
        setAnimationName('slideFade');
        setDuration(1);
        setTimingFunction('ease-out');
        setDelay(0);
        setIterationCount(1);
        setDirection('normal');
        setFillMode('both');
        setPlayState('running');
        break;
    }
    setAnimationKey((prev) => prev + 1);
  };

  const restartAnimation = () => {
    setAnimationKey((prev) => prev + 1);
    setPlayState('running');
  };

  const getKeyframes = () => {
    switch (animationName) {
      case 'bounce':
        return `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-60px); }
}`;
      case 'rotate':
        return `@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`;
      case 'pulse':
        return `@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}`;
      case 'shake':
        return `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}`;
      case 'slideFade':
        return `@keyframes slideFade {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card dark:bg-card">
      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => applyPreset('bounce')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          弹跳
        </button>
        <button
          onClick={() => applyPreset('rotate')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          旋转
        </button>
        <button
          onClick={() => applyPreset('pulse')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          脉冲
        </button>
        <button
          onClick={() => applyPreset('shake')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          摇晃
        </button>
        <button
          onClick={() => applyPreset('slide-fade')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          淡入滑出
        </button>
      </div>

      {/* Visual Container */}
      <div className="flex justify-center items-center p-8 bg-muted/20 dark:bg-muted/10 rounded-lg">
        <div className="relative w-full h-[180px] flex items-center justify-center">
          <style key={`animation-${animationKey}`}>
            {`
              ${getKeyframes()}

              .animated-element-${animationKey} {
                animation-name: ${animationName};
                animation-duration: ${duration}s;
                animation-timing-function: ${timingFunction};
                animation-delay: ${delay}s;
                animation-iteration-count: ${iterationCount === Infinity ? 'infinite' : iterationCount};
                animation-direction: ${direction};
                animation-fill-mode: ${fillMode};
                animation-play-state: ${playState};
              }
            `}
          </style>
          <div
            className={`animated-element-${animationKey} w-[120px] h-[120px] bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-bold`}
          >
            CSS
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPlayState(playState === 'running' ? 'paused' : 'running')}
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
        >
          {playState === 'running' ? '暂停' : '播放'}
        </button>
        <button
          onClick={restartAnimation}
          className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md transition-colors font-medium"
        >
          重播
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Timing Controls */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
              时间控制
            </Badge>
          </div>
          <Slider
            label="持续时间"
            value={duration}
            onChange={setDuration}
            min={0.1}
            max={5}
            step={0.1}
            unit="s"
          />
          <Slider
            label="延迟"
            value={delay}
            onChange={setDelay}
            min={0}
            max={2}
            step={0.1}
            unit="s"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-12 text-right font-mono">
              {iterationCount === Infinity ? '∞' : iterationCount}
            </span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={iterationCount === Infinity ? 10 : iterationCount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setIterationCount(value === 10 ? Infinity : value);
              }}
              className="flex-1 h-1.5 accent-current"
            />
            <span className="text-xs w-20 truncate">迭代次数</span>
          </div>
        </div>

        {/* Timing Function */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
              缓动函数
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(timingLabels) as TimingFunction[]).map((timing) => (
              <button
                key={timing}
                onClick={() => setTimingFunction(timing)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  timingFunction === timing
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {timingLabels[timing]}
              </button>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
              播放方向
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(directionLabels) as Direction[]).map((dir) => (
              <button
                key={dir}
                onClick={() => setDirection(dir)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  direction === dir
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {directionLabels[dir]}
              </button>
            ))}
          </div>
        </div>

        {/* Fill Mode */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30">
              填充模式
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(fillModeLabels) as FillMode[]).map((fill) => (
              <button
                key={fill}
                onClick={() => setFillMode(fill)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  fillMode === fill
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {fillModeLabels[fill]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">生成的 CSS 代码</div>
        <pre className="bg-muted/50 dark:bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code>{`${getKeyframes()}

.element {
  animation-name: ${animationName};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount === Infinity ? 'infinite' : iterationCount};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
  animation-play-state: ${playState};

  /* 简写形式 */
  animation: ${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount === Infinity ? 'infinite' : iterationCount} ${direction} ${fillMode};
}`}</code>
        </pre>
      </div>
    </div>
  );
}
