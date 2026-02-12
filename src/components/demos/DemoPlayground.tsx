'use client';

import { useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme-provider';

export interface DemoPreset {
  label: string;
  css?: string;
  html?: string;
}

export interface DemoPlaygroundProps {
  defaultCSS: string;
  defaultHTML: string;
  presets?: DemoPreset[];
  iframeHeight?: number;
  editorHeight?: number;
  headExtra?: string;
}

export function DemoPlayground({
  defaultCSS,
  defaultHTML,
  presets,
  iframeHeight = 300,
  editorHeight = 240,
  headExtra = '',
}: DemoPlaygroundProps) {
  const [css, setCss] = useState(defaultCSS);
  const [html, setHtml] = useState(defaultHTML);
  const [activeTab, setActiveTab] = useState<'css' | 'html'>('css');
  const { theme } = useTheme();

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (activeTab === 'css') {
        setCss(value ?? '');
      } else {
        setHtml(value ?? '');
      }
    },
    [activeTab],
  );

  const handlePreset = useCallback(
    (preset: DemoPreset) => {
      setCss(preset.css ?? defaultCSS);
      setHtml(preset.html ?? defaultHTML);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setCss(defaultCSS);
    setHtml(defaultHTML);
  }, [defaultCSS, defaultHTML]);

  const srcDoc = useMemo(() => {
    const safeCSS = css.replace(/</g, '\\3c ');
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${headExtra}<style>*{box-sizing:border-box;margin:0}body{font-family:system-ui,-apple-system,sans-serif;padding:16px;color:#1a1a1a;line-height:1.5}${safeCSS}</style></head><body>${html}</body></html>`;
  }, [css, html, headExtra]);

  const editorValue = activeTab === 'css' ? css : html;
  const editorLang = activeTab === 'css' ? 'css' : 'html';

  return (
    <div className="space-y-3">
      {/* Preset buttons */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePreset(preset)}
              className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* iframe preview */}
      <div className="border rounded-md overflow-hidden">
        <iframe
          srcDoc={srcDoc}
          className="w-full bg-white"
          style={{ height: iframeHeight }}
          sandbox="allow-same-origin"
          title="Demo Preview"
        />
      </div>

      {/* Tab bar + reset */}
      <div className="border rounded-md overflow-hidden">
        <div className="flex items-center border-b bg-muted/50">
          {(['css', 'html'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.toUpperCase()}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="ml-auto mr-2 text-[10px] px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
          >
            重置
          </button>
        </div>

        {/* Monaco Editor */}
        <Editor
          key={activeTab}
          height={`${editorHeight}px`}
          defaultLanguage={editorLang}
          value={editorValue}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
            padding: { top: 8 },
          }}
        />
      </div>
    </div>
  );
}
