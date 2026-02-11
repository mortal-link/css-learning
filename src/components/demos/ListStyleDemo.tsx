'use client';

import { useState } from 'react';

type ListStyleType =
  | 'disc'
  | 'circle'
  | 'square'
  | 'decimal'
  | 'lower-alpha'
  | 'upper-alpha'
  | 'lower-roman'
  | 'upper-roman'
  | 'none'
  | 'custom';

type ListPosition = 'inside' | 'outside';

export function ListStyleDemo() {
  const [styleType, setStyleType] = useState<ListStyleType>('disc');
  const [position, setPosition] = useState<ListPosition>('outside');
  const [customMarker, setCustomMarker] = useState('→');
  const [markerColor, setMarkerColor] = useState('#3b82f6');
  const [markerSize, setMarkerSize] = useState(16);
  const [useImage, setUseImage] = useState(false);

  const generateCSS = () => {
    let css = 'ul {\n';

    if (styleType === 'custom') {
      css += '  list-style-type: none;\n';
    } else {
      css += `  list-style-type: ${styleType};\n`;
    }

    css += `  list-style-position: ${position};\n`;

    if (useImage) {
      css += `  list-style-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n`;
    }

    css += '}\n\n';

    if (styleType === 'custom') {
      css += `li::marker {
  content: "${customMarker} ";
  color: ${markerColor};
  font-size: ${markerSize}px;
}`;
    } else {
      css += `li::marker {
  color: ${markerColor};
  font-size: ${markerSize}px;
}`;
    }

    return css;
  };

  const applyPreset = (preset: 'ordered' | 'unordered' | 'custom' | 'emoji') => {
    switch (preset) {
      case 'ordered':
        setStyleType('decimal');
        setPosition('outside');
        setMarkerColor('#3b82f6');
        setMarkerSize(16);
        setUseImage(false);
        break;
      case 'unordered':
        setStyleType('disc');
        setPosition('outside');
        setMarkerColor('#6b7280');
        setMarkerSize(16);
        setUseImage(false);
        break;
      case 'custom':
        setStyleType('custom');
        setPosition('outside');
        setCustomMarker('▸');
        setMarkerColor('#8b5cf6');
        setMarkerSize(18);
        setUseImage(false);
        break;
      case 'emoji':
        setStyleType('custom');
        setPosition('outside');
        setCustomMarker('✓');
        setMarkerColor('#10b981');
        setMarkerSize(20);
        setUseImage(false);
        break;
    }
  };

  const renderMarker = () => {
    if (styleType === 'custom') {
      return customMarker;
    }
    switch (styleType) {
      case 'disc':
        return '•';
      case 'circle':
        return '◦';
      case 'square':
        return '▪';
      case 'decimal':
        return '1.';
      case 'lower-alpha':
        return 'a.';
      case 'upper-alpha':
        return 'A.';
      case 'lower-roman':
        return 'i.';
      case 'upper-roman':
        return 'I.';
      case 'none':
        return '';
      default:
        return '•';
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-8">
        <ul
          className={`space-y-2 ${position === 'inside' ? 'list-inside' : 'list-outside'}`}
          style={{
            listStyleType: styleType === 'custom' ? 'none' : styleType,
            listStylePosition: position,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <li
              key={i}
              className="text-foreground"
              style={
                {
                  '--marker-content': `"${renderMarker()} "`,
                  '--marker-color': markerColor,
                  '--marker-size': `${markerSize}px`,
                } as any
              }
            >
              <style jsx>{`
                li::marker {
                  color: var(--marker-color);
                  font-size: var(--marker-size);
                  ${styleType === 'custom' ? `content: var(--marker-content);` : ''}
                }
              `}</style>
              列表项 {i} - 这是一个示例文本，用于展示列表样式的效果
            </li>
          ))}
        </ul>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset('ordered')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          有序列表
        </button>
        <button
          onClick={() => applyPreset('unordered')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          无序列表
        </button>
        <button
          onClick={() => applyPreset('custom')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          自定义标记
        </button>
        <button
          onClick={() => applyPreset('emoji')}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 rounded-md transition-colors"
        >
          Emoji标记
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* List Style Type */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">列表样式类型</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { value: 'disc' as ListStyleType, label: 'disc (●)' },
              { value: 'circle' as ListStyleType, label: 'circle (○)' },
              { value: 'square' as ListStyleType, label: 'square (■)' },
              { value: 'decimal' as ListStyleType, label: 'decimal (1.)' },
              { value: 'lower-alpha' as ListStyleType, label: 'lower-alpha (a.)' },
              { value: 'upper-alpha' as ListStyleType, label: 'upper-alpha (A.)' },
              { value: 'lower-roman' as ListStyleType, label: 'lower-roman (i.)' },
              { value: 'upper-roman' as ListStyleType, label: 'upper-roman (I.)' },
              { value: 'none' as ListStyleType, label: 'none' },
              { value: 'custom' as ListStyleType, label: '自定义' },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setStyleType(type.value)}
                className={`px-3 py-2 text-xs rounded-md transition-colors text-left ${
                  styleType === type.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Marker Input */}
        {styleType === 'custom' && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">自定义标记符号</label>
            <input
              type="text"
              value={customMarker}
              onChange={(e) => setCustomMarker(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md"
              placeholder="输入标记符号"
            />
          </div>
        )}

        {/* List Position */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">列表位置</label>
          <div className="flex gap-2">
            <button
              onClick={() => setPosition('outside')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                position === 'outside'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              outside（外部）
            </button>
            <button
              onClick={() => setPosition('inside')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                position === 'inside'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              inside（内部）
            </button>
          </div>
        </div>

        {/* Marker Styling */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">标记颜色</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={markerColor}
                onChange={(e) => setMarkerColor(e.target.value)}
                className="w-12 h-9 rounded border border-border cursor-pointer"
              />
              <input
                type="text"
                value={markerColor}
                onChange={(e) => setMarkerColor(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              标记大小: {markerSize}px
            </label>
            <input
              type="range"
              min={8}
              max={32}
              value={markerSize}
              onChange={(e) => setMarkerSize(Number(e.target.value))}
              className="w-full h-1.5 accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">{generateCSS()}</pre>
      </div>
    </div>
  );
}
