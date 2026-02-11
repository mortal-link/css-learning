'use client';

import { useState } from 'react';

type VisibilityMethod = 'none' | 'hidden' | 'opacity';

export function VisibilityDemo() {
  const [box1Method, setBox1Method] = useState<VisibilityMethod | null>(null);
  const [box2Method, setBox2Method] = useState<VisibilityMethod | null>(null);
  const [box3Method, setBox3Method] = useState<VisibilityMethod | null>(null);

  const getBoxStyle = (method: VisibilityMethod | null) => {
    if (!method) return {};
    switch (method) {
      case 'none':
        return { display: 'none' };
      case 'hidden':
        return { visibility: 'hidden' as const };
      case 'opacity':
        return { opacity: 0 };
      default:
        return {};
    }
  };

  const getBoxCSS = (method: VisibilityMethod | null) => {
    if (!method) return 'display: block;';
    switch (method) {
      case 'none':
        return 'display: none;';
      case 'hidden':
        return 'visibility: hidden;';
      case 'opacity':
        return 'opacity: 0;';
      default:
        return '';
    }
  };

  const resetAll = () => {
    setBox1Method(null);
    setBox2Method(null);
    setBox3Method(null);
  };

  const applyPreset = (preset: 'all-hidden' | 'all-none' | 'all-opacity' | 'mixed') => {
    switch (preset) {
      case 'all-hidden':
        setBox1Method('hidden');
        setBox2Method('hidden');
        setBox3Method('hidden');
        break;
      case 'all-none':
        setBox1Method('none');
        setBox2Method('none');
        setBox3Method('none');
        break;
      case 'all-opacity':
        setBox1Method('opacity');
        setBox2Method('opacity');
        setBox3Method('opacity');
        break;
      case 'mixed':
        setBox1Method('hidden');
        setBox2Method('none');
        setBox3Method('opacity');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border overflow-hidden bg-muted p-6">
        <div className="flex gap-4 items-start justify-center min-h-32">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-24 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold transition-opacity duration-300"
              style={getBoxStyle(box1Method)}
            >
              Box 1
            </div>
            <span className="text-xs text-muted-foreground">
              {box1Method ? box1Method : '可见'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-24 bg-purple-500 dark:bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold transition-opacity duration-300"
              style={getBoxStyle(box2Method)}
            >
              Box 2
            </div>
            <span className="text-xs text-muted-foreground">
              {box2Method ? box2Method : '可见'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-24 bg-pink-500 dark:bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold transition-opacity duration-300"
              style={getBoxStyle(box3Method)}
            >
              Box 3
            </div>
            <span className="text-xs text-muted-foreground">
              {box3Method ? box3Method : '可见'}
            </span>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('all-hidden')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          全部 visibility:hidden
        </button>
        <button
          onClick={() => applyPreset('all-none')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          全部 display:none
        </button>
        <button
          onClick={() => applyPreset('all-opacity')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          全部 opacity:0
        </button>
        <button
          onClick={() => applyPreset('mixed')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        >
          混合演示
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md transition-colors"
        >
          重置
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Box 1</label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setBox1Method(box1Method === 'none' ? null : 'none')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box1Method === 'none'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              display: none
            </button>
            <button
              onClick={() => setBox1Method(box1Method === 'hidden' ? null : 'hidden')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box1Method === 'hidden'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              visibility: hidden
            </button>
            <button
              onClick={() => setBox1Method(box1Method === 'opacity' ? null : 'opacity')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box1Method === 'opacity'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              opacity: 0
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Box 2</label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setBox2Method(box2Method === 'none' ? null : 'none')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box2Method === 'none'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              display: none
            </button>
            <button
              onClick={() => setBox2Method(box2Method === 'hidden' ? null : 'hidden')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box2Method === 'hidden'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              visibility: hidden
            </button>
            <button
              onClick={() => setBox2Method(box2Method === 'opacity' ? null : 'opacity')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box2Method === 'opacity'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              opacity: 0
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Box 3</label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setBox3Method(box3Method === 'none' ? null : 'none')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box3Method === 'none'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              display: none
            </button>
            <button
              onClick={() => setBox3Method(box3Method === 'hidden' ? null : 'hidden')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box3Method === 'hidden'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              visibility: hidden
            </button>
            <button
              onClick={() => setBox3Method(box3Method === 'opacity' ? null : 'opacity')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                box3Method === 'opacity'
                  ? 'bg-purple-500 text-white dark:bg-purple-600'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              opacity: 0
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">方法</th>
              <th className="px-4 py-2 text-left">占据空间</th>
              <th className="px-4 py-2 text-left">可点击</th>
              <th className="px-4 py-2 text-left">支持过渡</th>
              <th className="px-4 py-2 text-left">屏幕阅读器</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-2 font-mono text-xs">visibility: hidden</td>
              <td className="px-4 py-2">✓ 占据</td>
              <td className="px-4 py-2">✗ 不可点击</td>
              <td className="px-4 py-2">✓ 支持</td>
              <td className="px-4 py-2">✗ 隐藏</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs">display: none</td>
              <td className="px-4 py-2">✗ 不占据</td>
              <td className="px-4 py-2">✗ 不可点击</td>
              <td className="px-4 py-2">✗ 不支持</td>
              <td className="px-4 py-2">✗ 隐藏</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs">opacity: 0</td>
              <td className="px-4 py-2">✓ 占据</td>
              <td className="px-4 py-2">✓ 可点击</td>
              <td className="px-4 py-2">✓ 支持</td>
              <td className="px-4 py-2">✓ 可见</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <div className="space-y-2 text-sm font-mono text-foreground">
          <div>
            <span className="text-muted-foreground">/* Box 1 */</span> {getBoxCSS(box1Method)}
          </div>
          <div>
            <span className="text-muted-foreground">/* Box 2 */</span> {getBoxCSS(box2Method)}
          </div>
          <div>
            <span className="text-muted-foreground">/* Box 3 */</span> {getBoxCSS(box3Method)}
          </div>
        </div>
      </div>
    </div>
  );
}
