'use client';

import { useState, useEffect } from 'react';

interface FontEntry {
  name: string;
  available: boolean | null;
}

export function FontStackDemo() {
  const [fonts, setFonts] = useState<FontEntry[]>([
    { name: 'Helvetica Neue', available: null },
    { name: 'Arial', available: null },
    { name: 'sans-serif', available: null },
  ]);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog. 快速的棕色狐狸跳过懒狗。');

  const presets = {
    '系统默认': ['system-ui', '-apple-system', 'sans-serif'],
    '等宽': ['Courier New', 'Fira Code', 'monospace'],
    '衬线': ['Georgia', 'Times New Roman', 'serif'],
    '中文优先': ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
  };

  // Check font availability on client
  useEffect(() => {
    const checkFontAvailability = async () => {
      const updatedFonts = await Promise.all(
        fonts.map(async (font) => {
          try {
            // Generic fonts are always available
            if (['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'].includes(font.name.toLowerCase())) {
              return { ...font, available: true };
            }

            // Check if font is loaded/available
            const available = document.fonts.check(`16px "${font.name}"`);
            return { ...font, available };
          } catch {
            return { ...font, available: false };
          }
        })
      );
      setFonts(updatedFonts);
    };

    if (typeof window !== 'undefined') {
      checkFontAvailability();
    }
  }, [fonts.map(f => f.name).join(',')]);

  const addFont = () => {
    if (fonts.length < 6) {
      setFonts([...fonts, { name: '', available: null }]);
    }
  };

  const removeFont = (index: number) => {
    if (fonts.length > 1) {
      setFonts(fonts.filter((_, i) => i !== index));
    }
  };

  const updateFontName = (index: number, name: string) => {
    const newFonts = [...fonts];
    newFonts[index] = { name, available: null };
    setFonts(newFonts);
  };

  const loadPreset = (presetName: keyof typeof presets) => {
    const presetFonts = presets[presetName];
    setFonts(presetFonts.map(name => ({ name, available: null })));
  };

  const getFontStack = () => {
    return fonts
      .filter(f => f.name.trim())
      .map(f => (f.name.includes(' ') && !f.name.startsWith("'") ? `'${f.name}'` : f.name))
      .join(', ');
  };

  const getActiveFontName = () => {
    const availableFont = fonts.find(f => f.available === true);
    return availableFont ? availableFont.name : '未知';
  };

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg border border-border">
      {/* Preset Buttons */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">预设字体栈</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(presets).map((presetName) => (
            <button
              key={presetName}
              onClick={() => loadPreset(presetName as keyof typeof presets)}
              className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {presetName}
            </button>
          ))}
        </div>
      </div>

      {/* Font Stack Builder */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">字体回退链</h3>
        <div className="space-y-2">
          {fonts.map((font, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
              <input
                type="text"
                value={font.name}
                onChange={(e) => updateFontName(index, e.target.value)}
                placeholder="输入字体名称"
                className="flex-1 px-3 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {font.available !== null && (
                <div className="flex items-center gap-1.5 min-w-[80px]">
                  {font.available ? (
                    <>
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-green-700 dark:text-green-300">可用</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-red-700 dark:text-red-300">不可用</span>
                    </>
                  )}
                </div>
              )}
              {fonts.length > 1 && (
                <button
                  onClick={() => removeFont(index)}
                  className="px-2 py-1 text-sm text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                >
                  删除
                </button>
              )}
            </div>
          ))}
        </div>
        {fonts.length < 6 && (
          <button
            onClick={addFont}
            className="mt-3 px-4 py-2 text-sm bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
          >
            + 添加字体
          </button>
        )}
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">预览效果</h3>
        <div className="space-y-3">
          <div className="p-4 bg-muted/50 rounded border border-border">
            <div
              style={{ fontFamily: getFontStack() }}
              className="text-lg text-foreground leading-relaxed"
            >
              {previewText}
            </div>
          </div>
          <textarea
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            placeholder="修改预览文本..."
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">当前使用字体:</span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
              {getActiveFontName()}
            </span>
          </div>
        </div>
      </div>

      {/* CSS Code */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">生成的 CSS</h3>
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded overflow-x-auto">
          <code className="text-sm text-green-400 font-mono">
            font-family: {getFontStack() || '/* 请添加字体 */'};
          </code>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">回退机制说明</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
          <li>浏览器从左到右检查每个字体</li>
          <li>使用第一个可用的字体进行渲染</li>
          <li>如果所有字体都不可用，使用浏览器默认字体</li>
          <li>通用字体族（serif、sans-serif、monospace）始终可用</li>
          <li>建议将通用字体族作为最后的回退选项</li>
        </ul>
      </div>
    </div>
  );
}
