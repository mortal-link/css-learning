'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type MilestoneData = {
  id: string
  year: string
  title: string
  status: string
  features: string[]
  modules?: Array<{ name: string; status: string }>
}

export function CSSTimelineDemo() {
  const [selectedMilestone, setSelectedMilestone] = useState<string>('css1')

  const milestones: MilestoneData[] = [
    {
      id: 'css1',
      year: '1996',
      title: 'CSS1',
      status: '已废弃',
      features: [
        '基本选择器（类型、类、ID）',
        '字体属性（font-family, font-size, font-weight）',
        '颜色和背景',
        '文本属性（text-align, text-decoration）',
        '盒模型基础（margin, padding, border）',
      ],
    },
    {
      id: 'css2',
      year: '1998',
      title: 'CSS2',
      status: '已废弃',
      features: [
        '定位（position: absolute, relative, fixed）',
        'z-index 和层叠',
        '媒体类型（@media screen, print）',
        '伪元素 ::before, ::after',
        '表格布局',
        '光标样式',
      ],
    },
    {
      id: 'css2.1',
      year: '2011',
      title: 'CSS2.1',
      status: '已废弃',
      features: [
        '修复 CSS2 错误和矛盾',
        '移除未实现的功能',
        '明确继承和计算值规则',
        '细化浮动和清除规则',
        '改进 display 和 visibility',
      ],
    },
    {
      id: 'css2.2',
      year: '2017',
      title: 'CSS2.2',
      status: '当前稳定版',
      features: [
        '进一步修正 CSS2.1',
        '更新双向文本处理',
        '细化溢出行为',
        '改进表格算法',
        '为 CSS3 模块奠定基础',
      ],
    },
    {
      id: 'css3',
      year: '2000s-现在',
      title: 'CSS3 模块',
      status: '持续演进',
      features: [
        '模块化架构，每个功能独立演进',
        'Flexbox 和 Grid 布局',
        '变换、过渡和动画',
        '媒体查询 Level 4+',
        '变量（自定义属性）',
        '新选择器（:is, :where, :has）',
      ],
      modules: [
        { name: 'Selectors L3', status: 'REC' },
        { name: 'Selectors L4', status: 'WD' },
        { name: 'Flexbox L1', status: 'CR' },
        { name: 'Grid L1', status: 'CR' },
        { name: 'Grid L2', status: 'WD' },
        { name: 'Box Model L3', status: 'WD' },
        { name: 'Color L4', status: 'WD' },
        { name: 'Color L5', status: 'WD' },
        { name: 'Transforms L1', status: 'CR' },
        { name: 'Animations L1', status: 'WD' },
        { name: 'Transitions L1', status: 'WD' },
        { name: 'Media Queries L4', status: 'CR' },
        { name: 'Custom Properties', status: 'CR' },
        { name: 'Cascade L4', status: 'CR' },
        { name: 'Cascade L5', status: 'WD' },
      ],
    },
    {
      id: 'snapshots',
      year: '2023',
      title: 'CSS Snapshot 2023',
      status: '最新快照',
      features: [
        '所有稳定 CSS 规范的集合',
        '包含已广泛实现的特性',
        '每年更新一次',
        '不包含实验性功能',
        '浏览器兼容性参考',
      ],
    },
  ]

  const currentMilestone = milestones.find(m => m.id === selectedMilestone)!

  const getStatusColor = (status: string) => {
    if (status === '已废弃') return 'bg-gray-400'
    if (status === '当前稳定版') return 'bg-green-500'
    if (status === '持续演进') return 'bg-blue-500'
    if (status === '最新快照') return 'bg-purple-500'
    return 'bg-gray-400'
  }

  const getModuleStatusColor = (status: string) => {
    if (status === 'REC') return 'bg-green-600'
    if (status === 'CR') return 'bg-blue-600'
    if (status === 'WD') return 'bg-yellow-600'
    return 'bg-gray-600'
  }

  const getModuleStatusLabel = (status: string) => {
    if (status === 'REC') return 'REC (推荐标准)'
    if (status === 'CR') return 'CR (候选推荐)'
    if (status === 'WD') return 'WD (工作草案)'
    return status
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4">CSS 演进时间线</h3>

      {/* Timeline */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-center">
              <button
                onClick={() => setSelectedMilestone(milestone.id)}
                className={`flex flex-col items-center justify-center w-32 h-32 rounded-lg border-2 transition-all ${
                  selectedMilestone === milestone.id
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {milestone.year}
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {milestone.title}
                </div>
                <Badge className={getStatusColor(milestone.status)}>
                  {milestone.status}
                </Badge>
              </button>
              {index < milestones.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-800">
            {currentMilestone.title}
          </h4>
          <Badge className={getStatusColor(currentMilestone.status)}>
            {currentMilestone.status}
          </Badge>
          <span className="text-sm text-gray-600">
            发布于 {currentMilestone.year}
          </span>
        </div>

        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">关键特性</h5>
          <ul className="space-y-2">
            {currentMilestone.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-blue-500 mt-0.5">▪</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CSS3 Modules Grid */}
        {currentMilestone.modules && (
          <div className="mt-6 pt-6 border-t border-blue-200">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">
              模块规范（部分列表）
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {currentMilestone.modules.map((module, index) => (
                <div
                  key={index}
                  className="group relative p-2 bg-white rounded border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-help"
                  title={getModuleStatusLabel(module.status)}
                >
                  <div className="text-xs font-mono text-gray-700 mb-1">
                    {module.name}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getModuleStatusColor(module.status)} text-white`}
                  >
                    {module.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-white rounded text-xs text-gray-600 space-y-1">
              <div><strong>REC (Recommendation)</strong> = W3C 推荐标准，稳定且广泛实现</div>
              <div><strong>CR (Candidate Recommendation)</strong> = 候选推荐，接近稳定</div>
              <div><strong>WD (Working Draft)</strong> = 工作草案，仍在演进</div>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
        <p className="text-sm text-gray-700">
          <strong>提示：</strong>CSS3 之后不再有统一的大版本号。每个功能模块独立演进，拥有自己的版本号（如 Selectors Level 4, Grid Layout Level 2）。CSS Snapshot 每年发布一次，汇总所有稳定的规范。
        </p>
      </div>
    </div>
  )
}
