'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type TransitionProperty = 'width' | 'height' | 'background-color' | 'transform' | 'all';
type TimingFunction = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';

const propertyLabels: Record<TransitionProperty, string> = {
  'width': '宽度',
  'height': '高度',
  'background-color': '颜色',
  'transform': '变换',
  'all': '全部',
};

const timingLabels: Record<TimingFunction, string> = {
  'ease': 'Ease',
  'linear': 'Linear',
  'ease-in': 'Ease In',
  'ease-out': 'Ease Out',
  'ease-in-out': 'Ease In-Out',
  'cubic-bezier(0.68, -0.55, 0.265, 1.55)': 'Back',
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
        {value}{unit}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-current"
      />
      <span className="text-xs w-20 truncate">{label}</span>
    </div>
  );
}

export function TransitionDemo() {
  const [isActive, setIsActive] = useState(false);
  const [property, setProperty] = useState<TransitionProperty>('all');
  const [duration, setDuration] = useState(0.5);
  const [timingFunction, setTimingFunction] = useState<TimingFunction>('ease');
  const [delay, setDelay] = useState(0);

  const applyPreset = (preset: 'size' | 'color' | 'move' | 'combo') => {
    switch (preset) {
      case 'size':
        setProperty('all');
        setDuration(0.3);
        setTimingFunction('ease-out');
        setDelay(0);
        break;
      case 'color':
        setProperty('background-color');
        setDuration(0.6);
        setTimingFunction('ease-in-out');
        setDelay(0);
        break;
      case 'move':
        setProperty('transform');
        setDuration(0.4);
        setTimingFunction('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
        setDelay(0);
        break;
      case 'combo':
        setProperty('all');
        setDuration(0.8);
        setTimingFunction('ease-in-out');
        setDelay(0.1);
        break;
    }
  };

  const getBeforeStyles = () => {
    return {
      width: '120px',
      height: '120px',
      backgroundColor: 'rgb(59, 130, 246)',
      transform: 'translate(0, 0) rotate(0deg)',
    };
  };

  const getAfterStyles = () => {
    return {
      width: '180px',
      height: '160px',
      backgroundColor: 'rgb(168, 85, 247)',
      transform: 'translate(40px, 0) rotate(15deg)',
    };
  };

  const currentStyles = isActive ? getAfterStyles() : getBeforeStyles();

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card dark:bg-card">
      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => applyPreset('size')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          大小变化
        </button>
        <button
          onClick={() => applyPreset('color')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          颜色渐变
        </button>
        <button
          onClick={() => applyPreset('move')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          移动
        </button>
        <button
          onClick={() => applyPreset('combo')}
          className="px-3 py-1.5 text-xs rounded bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 transition-colors"
        >
          组合效果
        </button>
      </div>

      {/* Visual Container */}
      <div className="flex justify-center items-center p-8 bg-muted/20 dark:bg-muted/10 rounded-lg">
        <div className="relative w-full max-w-[400px] h-[200px] flex items-center">
          <div
            className="rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer"
            style={{
              width: currentStyles.width,
              height: currentStyles.height,
              backgroundColor: currentStyles.backgroundColor,
              transform: currentStyles.transform,
              transition: `${property} ${duration}s ${timingFunction} ${delay}s`,
            }}
            onClick={() => setIsActive(!isActive)}
          >
            CSS
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-6 py-2 text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
        >
          {isActive ? '重置' : '触发'}
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Property Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
              过渡属性
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(propertyLabels) as TransitionProperty[]).map((prop) => (
              <button
                key={prop}
                onClick={() => setProperty(prop)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  property === prop
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80'
                }`}
              >
                {propertyLabels[prop]}
              </button>
            ))}
          </div>
        </div>

        {/* Timing Controls */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
              时间控制
            </Badge>
          </div>
          <Slider
            label="持续时间"
            value={duration}
            onChange={setDuration}
            min={0}
            max={2}
            step={0.1}
            unit="s"
          />
          <Slider
            label="延迟"
            value={delay}
            onChange={setDelay}
            min={0}
            max={1}
            step={0.1}
            unit="s"
          />
        </div>

        {/* Timing Function */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
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

        {/* Before/After Values */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30">
              状态值
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-muted/50 dark:bg-muted/50 rounded p-2">
              <div className="font-medium text-muted-foreground mb-1">初始状态</div>
              <div className="font-mono space-y-0.5">
                <div>宽度: 120px</div>
                <div>高度: 120px</div>
                <div>颜色: blue-500</div>
                <div>位移: 0px, 0°</div>
              </div>
            </div>
            <div className="bg-muted/50 dark:bg-muted/50 rounded p-2">
              <div className="font-medium text-muted-foreground mb-1">目标状态</div>
              <div className="font-mono space-y-0.5">
                <div>宽度: 180px</div>
                <div>高度: 160px</div>
                <div>颜色: purple-500</div>
                <div>位移: 40px, 15°</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">生成的 CSS 代码</div>
        <pre className="bg-muted/50 dark:bg-muted/50 rounded p-3 font-mono text-xs overflow-x-auto">
          <code>{`.element {
  transition-property: ${property};
  transition-duration: ${duration}s;
  transition-timing-function: ${timingFunction};
  transition-delay: ${delay}s;

  /* 简写形式 */
  transition: ${property} ${duration}s ${timingFunction} ${delay}s;
}`}</code>
        </pre>
      </div>
    </div>
  );
}
