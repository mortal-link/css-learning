'use client';

import { useState } from 'react';

interface QuoteStyle {
  name: string;
  label: string;
  open1: string;
  close1: string;
  open2: string;
  close2: string;
}

const QUOTE_STYLES: QuoteStyle[] = [
  {
    name: 'chinese',
    label: '中文',
    open1: '「',
    close1: '」',
    open2: '『',
    close2: '』',
  },
  {
    name: 'english',
    label: 'English',
    open1: '"',
    close1: '"',
    open2: '\u2018',
    close2: '\u2019',
  },
  {
    name: 'french',
    label: 'Français',
    open1: '« ',
    close1: ' »',
    open2: '‹ ',
    close2: ' ›',
  },
  {
    name: 'japanese',
    label: '日本語',
    open1: '「',
    close1: '」',
    open2: '『',
    close2: '』',
  },
  {
    name: 'german',
    label: 'Deutsch',
    open1: '»',
    close1: '«',
    open2: '›',
    close2: '‹',
  },
];

export function QuotesDemo() {
  const [selectedStyle, setSelectedStyle] = useState<QuoteStyle>(QUOTE_STYLES[0]);
  const [customOpen1, setCustomOpen1] = useState('');
  const [customClose1, setCustomClose1] = useState('');
  const [customOpen2, setCustomOpen2] = useState('');
  const [customClose2, setCustomClose2] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const currentQuotes = useCustom
    ? {
        open1: customOpen1 || '"',
        close1: customClose1 || '"',
        open2: customOpen2 || '\u2018',
        close2: customClose2 || '\u2019',
      }
    : selectedStyle;

  const generateCSS = () => {
    return `blockquote {
  quotes: "${currentQuotes.open1}" "${currentQuotes.close1}" "${currentQuotes.open2}" "${currentQuotes.close2}";
}

blockquote::before {
  content: open-quote;
}

blockquote::after {
  content: close-quote;
}`;
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-8">
        <div className="space-y-4">
          {/* Level 1 quote */}
          <blockquote className="text-lg text-foreground">
            <span className="text-blue-500 font-bold text-2xl">{currentQuotes.open1}</span>
            <span className="mx-2">这是第一层引用</span>
            <span className="text-blue-500 font-bold text-2xl">{currentQuotes.close1}</span>
          </blockquote>

          {/* Level 2 nested quote */}
          <blockquote className="text-lg text-foreground ml-8">
            <span className="text-blue-500 font-bold text-2xl">{currentQuotes.open1}</span>
            <span className="mx-2">第一层引用</span>
            <span className="text-purple-500 font-bold text-xl">{currentQuotes.open2}</span>
            <span className="mx-1">第二层嵌套引用</span>
            <span className="text-purple-500 font-bold text-xl">{currentQuotes.close2}</span>
            <span className="mx-2">继续第一层</span>
            <span className="text-blue-500 font-bold text-2xl">{currentQuotes.close1}</span>
          </blockquote>

          {/* Level 3 nested quote */}
          <blockquote className="text-base text-foreground ml-16">
            <span className="text-blue-500 font-bold text-xl">{currentQuotes.open1}</span>
            <span className="mx-1">层一</span>
            <span className="text-purple-500 font-bold text-lg">{currentQuotes.open2}</span>
            <span className="mx-1">层二</span>
            <span className="text-green-500 font-bold">{currentQuotes.open1}</span>
            <span className="mx-1">层三</span>
            <span className="text-green-500 font-bold">{currentQuotes.close1}</span>
            <span className="mx-1">回层二</span>
            <span className="text-purple-500 font-bold text-lg">{currentQuotes.close2}</span>
            <span className="mx-1">回层一</span>
            <span className="text-blue-500 font-bold text-xl">{currentQuotes.close1}</span>
          </blockquote>
        </div>
      </div>

      {/* Language Selector */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">语言/地区</label>
        <div className="flex flex-wrap gap-2">
          {QUOTE_STYLES.map((style) => (
            <button
              key={style.name}
              onClick={() => {
                setSelectedStyle(style);
                setUseCustom(false);
              }}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                selectedStyle.name === style.name && !useCustom
                  ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80'
              }`}
            >
              {style.label}
            </button>
          ))}
          <button
            onClick={() => setUseCustom(true)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              useCustom
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80'
            }`}
          >
            自定义
          </button>
        </div>
      </div>

      {/* Quote Characters Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-xs text-muted-foreground mb-2">第一层 开始</div>
          <div className="text-3xl font-bold text-blue-500">{currentQuotes.open1}</div>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-xs text-muted-foreground mb-2">第一层 结束</div>
          <div className="text-3xl font-bold text-blue-500">{currentQuotes.close1}</div>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-xs text-muted-foreground mb-2">第二层 开始</div>
          <div className="text-2xl font-bold text-purple-500">{currentQuotes.open2}</div>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-xs text-muted-foreground mb-2">第二层 结束</div>
          <div className="text-2xl font-bold text-purple-500">{currentQuotes.close2}</div>
        </div>
      </div>

      {/* Custom Quote Inputs */}
      {useCustom && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">第一层 开始</label>
            <input
              type="text"
              value={customOpen1}
              onChange={(e) => setCustomOpen1(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-center"
              placeholder={'"'}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">第一层 结束</label>
            <input
              type="text"
              value={customClose1}
              onChange={(e) => setCustomClose1(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-center"
              placeholder={'"'}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">第二层 开始</label>
            <input
              type="text"
              value={customOpen2}
              onChange={(e) => setCustomOpen2(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-center"
              placeholder={'\u2018'}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">第二层 结束</label>
            <input
              type="text"
              value={customClose2}
              onChange={(e) => setCustomClose2(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-center"
              placeholder={'\u2018'}
            />
          </div>
        </div>
      )}

      {/* CSS Code Output */}
      <div className="rounded-lg border border-border bg-muted p-4">
        <div className="text-xs text-muted-foreground mb-2">生成的 CSS 代码：</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">{generateCSS()}</pre>
      </div>
    </div>
  );
}
