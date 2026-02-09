'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type Scenario = 'siblings' | 'parent-child' | 'empty';

export function MarginCollapseDemo() {
  const [scenario, setScenario] = useState<Scenario>('siblings');
  const [topMargin, setTopMargin] = useState(30);
  const [bottomMargin, setBottomMargin] = useState(20);
  const [parentMargin, setParentMargin] = useState(20);

  const calculateCollapsedMargin = () => {
    switch (scenario) {
      case 'siblings':
        return Math.max(topMargin, bottomMargin);
      case 'parent-child':
        return Math.max(parentMargin, topMargin);
      case 'empty':
        return Math.max(topMargin, bottomMargin);
      default:
        return 0;
    }
  };

  const collapsedMargin = calculateCollapsedMargin();

  return (
    <div className="w-full max-w-2xl space-y-4 p-4">
      {/* Scenario Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setScenario('siblings')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            scenario === 'siblings'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          相邻兄弟
        </button>
        <button
          onClick={() => setScenario('parent-child')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            scenario === 'parent-child'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          父子关系
        </button>
        <button
          onClick={() => setScenario('empty')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            scenario === 'empty'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          空元素
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        {scenario === 'siblings' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>上方元素 margin-bottom:</span>
                <Badge variant="secondary">{topMargin}px</Badge>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={topMargin}
                onChange={(e) => setTopMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>下方元素 margin-top:</span>
                <Badge variant="secondary">{bottomMargin}px</Badge>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={bottomMargin}
                onChange={(e) => setBottomMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </>
        )}

        {scenario === 'parent-child' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>父元素 margin-top:</span>
                <Badge variant="secondary">{parentMargin}px</Badge>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={parentMargin}
                onChange={(e) => setParentMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>子元素 margin-top:</span>
                <Badge variant="secondary">{topMargin}px</Badge>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={topMargin}
                onChange={(e) => setTopMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </>
        )}

        {scenario === 'empty' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>空元素 margin-top:</span>
                <Badge variant="secondary">{topMargin}px</Badge>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={topMargin}
                onChange={(e) => setTopMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>空元素 margin-bottom:</span>
                <Badge variant="secondary">{bottomMargin}px</Badge>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={bottomMargin}
                onChange={(e) => setBottomMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </>
        )}
      </div>

      {/* Visual Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Before Collapse */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-center text-gray-700">折叠前</h3>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 min-h-[240px] flex flex-col justify-center">
            {scenario === 'siblings' && (
              <div className="space-y-0">
                <div className="bg-blue-100 border-2 border-blue-400 rounded p-3 text-xs font-medium text-center">
                  元素 1
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-blue-200/30 border-l-2 border-r-2 border-dashed border-blue-400"
                    style={{ height: `${topMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-blue-400 text-blue-600">
                    {topMargin}px
                  </span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-green-200/30 border-l-2 border-r-2 border-dashed border-green-400"
                    style={{ height: `${bottomMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-green-400 text-green-600">
                    {bottomMargin}px
                  </span>
                </div>
                <div className="bg-green-100 border-2 border-green-400 rounded p-3 text-xs font-medium text-center">
                  元素 2
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">
                  总间距: {topMargin + bottomMargin}px
                </div>
              </div>
            )}

            {scenario === 'parent-child' && (
              <div className="space-y-0">
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-purple-200/30 border-l-2 border-r-2 border-dashed border-purple-400"
                    style={{ height: `${parentMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-purple-400 text-purple-600">
                    {parentMargin}px
                  </span>
                </div>
                <div className="border-2 border-purple-400 rounded p-2">
                  <div className="text-[10px] text-purple-600 font-medium mb-1">父元素</div>
                  <div className="relative flex flex-col items-center">
                    <div
                      className="bg-blue-200/30 border-l-2 border-r-2 border-dashed border-blue-400"
                      style={{ height: `${topMargin}px`, width: '100%' }}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-blue-400 text-blue-600">
                      {topMargin}px
                    </span>
                  </div>
                  <div className="bg-blue-100 border-2 border-blue-400 rounded p-2 text-xs font-medium text-center">
                    子元素
                  </div>
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">
                  总间距: {parentMargin + topMargin}px
                </div>
              </div>
            )}

            {scenario === 'empty' && (
              <div className="space-y-0">
                <div className="bg-blue-100 border-2 border-blue-400 rounded p-3 text-xs font-medium text-center">
                  元素 1
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-gray-200/50 border-l-2 border-r-2 border-dashed border-gray-400"
                    style={{ height: `${topMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-gray-400 text-gray-600">
                    {topMargin}px
                  </span>
                </div>
                <div className="border-2 border-gray-400 rounded h-0 relative">
                  <span className="absolute left-1/2 -translate-x-1/2 -top-2 text-[10px] bg-white px-1 text-gray-500">
                    空元素
                  </span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-gray-200/50 border-l-2 border-r-2 border-dashed border-gray-400"
                    style={{ height: `${bottomMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-gray-400 text-gray-600">
                    {bottomMargin}px
                  </span>
                </div>
                <div className="bg-green-100 border-2 border-green-400 rounded p-3 text-xs font-medium text-center">
                  元素 2
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">
                  总间距: {topMargin + bottomMargin}px
                </div>
              </div>
            )}
          </div>
        </div>

        {/* After Collapse */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-center text-gray-700">折叠后</h3>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 min-h-[240px] flex flex-col justify-center">
            {scenario === 'siblings' && (
              <div className="space-y-0">
                <div className="bg-blue-100 border-2 border-blue-400 rounded p-3 text-xs font-medium text-center">
                  元素 1
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-orange-200/40 border-l-2 border-r-2 border-dashed border-orange-500"
                    style={{ height: `${collapsedMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-orange-500 text-orange-600">
                    {collapsedMargin}px
                  </span>
                </div>
                <div className="bg-green-100 border-2 border-green-400 rounded p-3 text-xs font-medium text-center">
                  元素 2
                </div>
                <div className="text-center text-xs font-medium text-orange-600 mt-2">
                  最终间距: {collapsedMargin}px
                </div>
              </div>
            )}

            {scenario === 'parent-child' && (
              <div className="space-y-0">
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-orange-200/40 border-l-2 border-r-2 border-dashed border-orange-500"
                    style={{ height: `${collapsedMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-orange-500 text-orange-600">
                    {collapsedMargin}px
                  </span>
                </div>
                <div className="border-2 border-purple-400 rounded p-2">
                  <div className="text-[10px] text-purple-600 font-medium mb-1">父元素</div>
                  <div className="bg-blue-100 border-2 border-blue-400 rounded p-2 text-xs font-medium text-center">
                    子元素
                  </div>
                </div>
                <div className="text-center text-xs font-medium text-orange-600 mt-2">
                  最终间距: {collapsedMargin}px
                </div>
              </div>
            )}

            {scenario === 'empty' && (
              <div className="space-y-0">
                <div className="bg-blue-100 border-2 border-blue-400 rounded p-3 text-xs font-medium text-center">
                  元素 1
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="bg-orange-200/40 border-l-2 border-r-2 border-dashed border-orange-500"
                    style={{ height: `${collapsedMargin}px`, width: '100%' }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold bg-white px-1 rounded border border-orange-500 text-orange-600">
                    {collapsedMargin}px
                  </span>
                </div>
                <div className="bg-green-100 border-2 border-green-400 rounded p-3 text-xs font-medium text-center">
                  元素 2
                </div>
                <div className="text-center text-xs font-medium text-orange-600 mt-2">
                  最终间距: {collapsedMargin}px
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-gray-700">
        <p className="font-semibold text-blue-900 mb-1">外边距折叠规则:</p>
        {scenario === 'siblings' && (
          <p>
            相邻兄弟元素的垂直外边距会折叠,最终间距为两者中的<strong>较大值</strong>
            ({Math.max(topMargin, bottomMargin)}px),而非相加。
          </p>
        )}
        {scenario === 'parent-child' && (
          <p>
            父元素与第一个子元素的上外边距会折叠,最终间距为两者中的<strong>较大值</strong>
            ({Math.max(parentMargin, topMargin)}px)。可通过给父元素添加 border 或 padding 来阻止折叠。
          </p>
        )}
        {scenario === 'empty' && (
          <p>
            空元素(无内容、无 padding、无 border)的上下外边距会折叠,最终间距为两者中的
            <strong>较大值</strong> ({Math.max(topMargin, bottomMargin)}px)。
          </p>
        )}
      </div>
    </div>
  );
}
