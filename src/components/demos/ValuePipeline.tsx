'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

// ============================================================
// CSS 值处理流程可视化器
// ============================================================

interface Scenario {
  name: string;
  property: string;
  description: string;
  stages: {
    declared: string;
    cascaded: string;
    specified: string;
    computed: string;
    used: string;
    actual: string;
  };
  explanations: {
    declared: string;
    cascaded: string;
    specified: string;
    computed: string;
    used: string;
    actual: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    name: 'width: 50%',
    property: 'width',
    description: '百分比宽度 (父元素宽度 800px)',
    stages: {
      declared: '50%',
      cascaded: '50%',
      specified: '50%',
      computed: '50%',
      used: '400px',
      actual: '400px',
    },
    explanations: {
      declared: '样式表中声明的原始值',
      cascaded: '经过层叠后的获胜值',
      specified: '应用默认规则后的值',
      computed: '相对值保持不变，等待布局',
      used: '基于父元素实际宽度计算',
      actual: '浏览器渲染的最终值',
    },
  },
  {
    name: 'font-size: 1.5em',
    property: 'font-size',
    description: '相对字体大小 (父元素 16px)',
    stages: {
      declared: '1.5em',
      cascaded: '1.5em',
      specified: '1.5em',
      computed: '24px',
      used: '24px',
      actual: '24px',
    },
    explanations: {
      declared: '声明为 1.5em',
      cascaded: '无冲突，直接作为层叠值',
      specified: '继承属性保持层叠值',
      computed: 'em 单位被解析为绝对值',
      used: '计算值即为使用值',
      actual: '无需调整，直接渲染',
    },
  },
  {
    name: 'color (继承)',
    property: 'color',
    description: '未声明，继承自父元素 (blue)',
    stages: {
      declared: '(无)',
      cascaded: '(无)',
      specified: 'blue',
      computed: 'rgb(0, 0, 255)',
      used: 'rgb(0, 0, 255)',
      actual: 'rgb(0, 0, 255)',
    },
    explanations: {
      declared: '元素本身未声明此属性',
      cascaded: '无任何声明适用',
      specified: '继承父元素的计算值',
      computed: '关键字转换为绝对颜色',
      used: '颜色值不需布局信息',
      actual: '最终显示的颜色值',
    },
  },
  {
    name: 'margin-left: auto',
    property: 'margin-left',
    description: '自动外边距 (块宽 600px, 容器 1000px)',
    stages: {
      declared: 'auto',
      cascaded: 'auto',
      specified: 'auto',
      computed: 'auto',
      used: '200px',
      actual: '200px',
    },
    explanations: {
      declared: '声明为 auto',
      cascaded: '无冲突，保持 auto',
      specified: 'auto 是有效值',
      computed: 'auto 无法在此阶段计算',
      used: '布局时计算剩余空间分配',
      actual: '像素值用于渲染',
    },
  },
  {
    name: 'border-width: thin',
    property: 'border-width',
    description: '关键字边框宽度',
    stages: {
      declared: 'thin',
      cascaded: 'thin',
      specified: 'thin',
      computed: '1px',
      used: '1px',
      actual: '1px',
    },
    explanations: {
      declared: '使用关键字 thin',
      cascaded: '选择此声明',
      specified: '关键字是有效的指定值',
      computed: 'thin 被解析为具体像素',
      used: '1px 可直接使用',
      actual: '浏览器绘制 1px 边框',
    },
  },
];

const STAGE_NAMES = ['Declared', 'Cascaded', 'Specified', 'Computed', 'Used', 'Actual'];
const STAGE_NAMES_ZH = ['声明值', '层叠值', '指定值', '计算值', '使用值', '实际值'];
const STAGE_KEYS = ['declared', 'cascaded', 'specified', 'computed', 'used', 'actual'] as const;

export function ValuePipeline() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const scenario = SCENARIOS[scenarioIndex];

  return (
    <div className="space-y-4">
      {/* Scenario Selector */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">选择示例场景</label>
        <div className="flex flex-wrap gap-1.5">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setScenarioIndex(i);
                setActiveStage(null);
              }}
              className={`px-2 py-1 text-xs rounded-md border transition-colors font-mono ${
                scenarioIndex === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-accent'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="text-xs">
          <span className="font-medium">属性: </span>
          <code className="font-mono text-primary">{scenario.property}</code>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{scenario.description}</div>
      </div>

      {/* Pipeline Visualization */}
      <div className="overflow-x-auto py-4">
        <div className="flex items-center justify-center gap-2 min-w-max px-4">
          {STAGE_KEYS.map((key, idx) => (
            <div key={key} className="flex items-center">
              {/* Stage Card */}
              <button
                onClick={() => setActiveStage(activeStage === idx ? null : idx)}
                className={`flex flex-col items-center px-3 py-2 rounded-lg border-2 transition-all min-w-[80px] ${
                  activeStage === idx
                    ? 'bg-primary/10 border-primary scale-105'
                    : 'bg-background border-border hover:bg-accent hover:scale-102'
                }`}
              >
                <div className="text-xs font-medium mb-1 text-center">
                  {STAGE_NAMES_ZH[idx]}
                </div>
                <div className="text-xs text-muted-foreground mb-1.5">
                  {STAGE_NAMES[idx]}
                </div>
                <Badge
                  variant={activeStage === idx ? 'default' : 'outline'}
                  className="font-mono text-xs"
                >
                  {scenario.stages[key]}
                </Badge>
              </button>

              {/* Arrow */}
              {idx < STAGE_KEYS.length - 1 && (
                <div className="text-muted-foreground mx-1 text-lg">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stage Explanation */}
      {activeStage !== null && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Badge variant="default" className="mt-0.5">
              {STAGE_NAMES_ZH[activeStage]}
            </Badge>
            <div>
              <div className="text-sm font-medium mb-1">
                {STAGE_NAMES[activeStage]} Value
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {scenario.explanations[STAGE_KEYS[activeStage]]}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="border-t pt-3">
        <p className="text-xs font-medium mb-2 text-muted-foreground">处理流程说明</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium">Declared → Cascaded:</span>
            <span className="text-muted-foreground ml-1">解决层叠冲突</span>
          </div>
          <div>
            <span className="font-medium">Cascaded → Specified:</span>
            <span className="text-muted-foreground ml-1">处理继承和默认值</span>
          </div>
          <div>
            <span className="font-medium">Specified → Computed:</span>
            <span className="text-muted-foreground ml-1">解析相对值 (em, %)</span>
          </div>
          <div>
            <span className="font-medium">Computed → Used:</span>
            <span className="text-muted-foreground ml-1">完成布局计算</span>
          </div>
          <div>
            <span className="font-medium">Used → Actual:</span>
            <span className="text-muted-foreground ml-1">应用渲染约束</span>
          </div>
        </div>
      </div>
    </div>
  );
}
