'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

interface ParsedValue {
  raw: string;
  type: string;
  detail: string;
  color: string;
  supported: boolean | null;
}

const TYPE_COLORS: Record<string, string> = {
  '<length>': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  '<percentage>': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  '<number>': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  '<integer>': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  '<color>': 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
  '<string>': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  '<url>': 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  '<angle>': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  '<time>': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  '<frequency>': 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  '<resolution>': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  '<flex>': 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  '<keyword>': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  '<function>': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  unknown: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

const LENGTH_UNITS = ['px', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'dvw', 'dvh', 'svw', 'svh', 'lvw', 'lvh', 'ch', 'ex', 'ic', 'lh', 'rlh', 'cm', 'mm', 'in', 'pt', 'pc', 'Q', 'cap', 'cqw', 'cqh', 'cqi', 'cqb', 'cqmin', 'cqmax'];
const ANGLE_UNITS = ['deg', 'rad', 'grad', 'turn'];
const TIME_UNITS = ['s', 'ms'];
const FREQ_UNITS = ['Hz', 'kHz'];
const RES_UNITS = ['dpi', 'dpcm', 'dppx', 'x'];
const FLEX_UNITS = ['fr'];

const COLOR_KEYWORDS = [
  'red', 'blue', 'green', 'black', 'white', 'gray', 'grey', 'yellow',
  'orange', 'purple', 'pink', 'cyan', 'magenta', 'transparent', 'currentcolor',
  'inherit', 'initial', 'unset', 'revert', 'revert-layer',
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige',
  'bisque', 'blanchedalmond', 'blueviolet', 'brown', 'burlywood',
  'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
  'cornsilk', 'crimson', 'darkblue', 'darkcyan', 'darkgoldenrod',
  'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
  'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
  'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet',
  'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick',
  'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
  'gold', 'goldenrod', 'greenyellow', 'honeydew', 'hotpink',
  'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
  'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink',
  'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray',
  'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
  'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid',
  'mediumpurple', 'mediumseagreen', 'mediumslateblue',
  'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
  'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
  'navy', 'oldlace', 'olive', 'olivedrab', 'orangered', 'orchid',
  'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred',
  'papayawhip', 'peachpuff', 'peru', 'plum', 'powderblue',
  'rebeccapurple', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
  'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
  'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan',
  'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat',
  'whitesmoke', 'yellowgreen',
];

const COLOR_FNS = ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklch', 'oklab', 'color', 'color-mix', 'light-dark'];

const GLOBAL_KEYWORDS = ['inherit', 'initial', 'unset', 'revert', 'revert-layer'];

function parseValue(raw: string): ParsedValue {
  const v = raw.trim();
  if (!v) return { raw: v, type: '', detail: '', color: '', supported: null };

  // String
  if (/^["'].*["']$/.test(v)) {
    return { raw: v, type: '<string>', detail: '字符串值', color: TYPE_COLORS['<string>'], supported: null };
  }

  // URL
  if (/^url\s*\(/i.test(v)) {
    return { raw: v, type: '<url>', detail: 'URL 资源引用', color: TYPE_COLORS['<url>'], supported: null };
  }

  // Color functions
  const fnMatch = v.match(/^([a-zA-Z-]+)\s*\(/);
  if (fnMatch) {
    const fn = fnMatch[1].toLowerCase();
    if (COLOR_FNS.includes(fn)) {
      const supported = checkSupport('color', v);
      return { raw: v, type: '<color>', detail: `颜色函数 ${fn}()`, color: TYPE_COLORS['<color>'], supported };
    }
    // calc / min / max / clamp etc
    const mathFns = ['calc', 'min', 'max', 'clamp', 'round', 'mod', 'rem', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'pow', 'sqrt', 'hypot', 'log', 'exp', 'abs', 'sign'];
    if (mathFns.includes(fn)) {
      const supported = checkSupport('width', v);
      return { raw: v, type: '<function>', detail: `数学函数 ${fn}()`, color: TYPE_COLORS['<function>'], supported };
    }
    // Other functions
    const supported = checkSupport('width', v);
    return { raw: v, type: '<function>', detail: `函数 ${fn}()`, color: TYPE_COLORS['<function>'], supported };
  }

  // Hex color
  if (/^#([0-9a-fA-F]{3,8})$/.test(v)) {
    const hex = v.slice(1);
    const len = hex.length;
    const valid = [3, 4, 6, 8].includes(len);
    return {
      raw: v,
      type: '<color>',
      detail: valid ? `十六进制颜色 (${len <= 4 ? len * 2 : len} 位)` : '无效的十六进制颜色',
      color: TYPE_COLORS['<color>'],
      supported: valid ? true : false,
    };
  }

  // Number with unit
  const numUnit = v.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)\s*([a-zA-Z%]+)$/i);
  if (numUnit) {
    const [, num, unit] = numUnit;
    if (unit === '%') {
      return { raw: v, type: '<percentage>', detail: `百分比值 (${num}%)`, color: TYPE_COLORS['<percentage>'], supported: true };
    }
    if (LENGTH_UNITS.includes(unit)) {
      const abs = ['px', 'cm', 'mm', 'in', 'pt', 'pc', 'Q'];
      const kind = abs.includes(unit) ? '绝对' : '相对';
      return { raw: v, type: '<length>', detail: `${kind}长度单位 ${unit}`, color: TYPE_COLORS['<length>'], supported: true };
    }
    if (ANGLE_UNITS.includes(unit)) {
      return { raw: v, type: '<angle>', detail: `角度单位 ${unit}`, color: TYPE_COLORS['<angle>'], supported: true };
    }
    if (TIME_UNITS.includes(unit)) {
      return { raw: v, type: '<time>', detail: `时间单位 ${unit}`, color: TYPE_COLORS['<time>'], supported: true };
    }
    if (FREQ_UNITS.includes(unit.toLowerCase())) {
      return { raw: v, type: '<frequency>', detail: `频率单位 ${unit}`, color: TYPE_COLORS['<frequency>'], supported: true };
    }
    if (RES_UNITS.includes(unit)) {
      return { raw: v, type: '<resolution>', detail: `分辨率单位 ${unit}`, color: TYPE_COLORS['<resolution>'], supported: true };
    }
    if (FLEX_UNITS.includes(unit)) {
      return { raw: v, type: '<flex>', detail: `弹性单位 ${unit}`, color: TYPE_COLORS['<flex>'], supported: true };
    }
    return { raw: v, type: 'unknown', detail: `未知单位 ${unit}`, color: TYPE_COLORS.unknown, supported: false };
  }

  // Pure number
  if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(v)) {
    const isInt = /^[+-]?\d+$/.test(v);
    return {
      raw: v,
      type: isInt ? '<integer>' : '<number>',
      detail: isInt ? '整数' : '数值',
      color: TYPE_COLORS[isInt ? '<integer>' : '<number>'],
      supported: true,
    };
  }

  // Named color
  if (COLOR_KEYWORDS.includes(v.toLowerCase())) {
    return { raw: v, type: '<color>', detail: '命名颜色', color: TYPE_COLORS['<color>'], supported: true };
  }

  // Global keywords
  if (GLOBAL_KEYWORDS.includes(v.toLowerCase())) {
    return { raw: v, type: '<keyword>', detail: 'CSS 全局关键字', color: TYPE_COLORS['<keyword>'], supported: true };
  }

  // Custom ident / keyword
  if (/^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(v)) {
    const supported = checkSupport('display', v) || checkSupport('position', v);
    return { raw: v, type: '<keyword>', detail: '标识符/关键字', color: TYPE_COLORS['<keyword>'], supported };
  }

  return { raw: v, type: 'unknown', detail: '无法识别的值', color: TYPE_COLORS.unknown, supported: null };
}

function checkSupport(prop: string, value: string): boolean | null {
  if (typeof CSS === 'undefined' || !CSS.supports) return null;
  try {
    return CSS.supports(prop, value);
  } catch {
    return null;
  }
}

const EXAMPLES = [
  { label: '长度', value: '16px' },
  { label: '百分比', value: '50%' },
  { label: '颜色', value: '#ff6600' },
  { label: '函数', value: 'calc(100% - 20px)' },
  { label: 'oklch', value: 'oklch(0.7 0.15 180)' },
  { label: '角度', value: '45deg' },
  { label: '时间', value: '300ms' },
  { label: '弹性', value: '1fr' },
];

/** Get a visual preview style for the parsed value */
function getPreviewStyle(parsed: ParsedValue): Record<string, string> | null {
  const v = parsed.raw.trim();
  if (!v || parsed.type === 'unknown') return null;

  switch (parsed.type) {
    case '<color>':
      return { backgroundColor: v, width: '100%', height: '100%', borderRadius: '8px' };
    case '<length>':
    case '<percentage>':
    case '<function>':
      return { width: v, height: '32px', backgroundColor: 'var(--preview-bar)', borderRadius: '4px', transition: 'width 0.3s' };
    case '<angle>':
      return { transform: `rotate(${v})`, width: '60px', height: '60px' };
    default:
      return null;
  }
}

export function CSSValueParser() {
  const [input, setInput] = useState('16px');

  const parsed = useMemo(() => parseValue(input), [input]);
  const previewStyle = useMemo(() => getPreviewStyle(parsed), [parsed]);

  return (
    <div className="space-y-4">
      {/* Quick examples */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => setInput(ex.value)}
            className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入 CSS 值，如 16px、#ff0、calc(100% - 20px)"
          className="flex-1 px-3 py-2 text-sm font-mono border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Result + Preview side by side */}
      {parsed.type && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Analysis */}
          <div className="border rounded-md p-4 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={`text-sm font-mono ${parsed.color}`}>
                {parsed.type}
              </Badge>
              {parsed.supported === true && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                  浏览器支持
                </Badge>
              )}
              {parsed.supported === false && (
                <Badge variant="outline" className="text-xs bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                  不支持
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{parsed.detail}</p>
          </div>

          {/* Visual Preview */}
          <div className="border rounded-md p-4 flex flex-col">
            <div className="text-xs text-muted-foreground mb-2 font-medium">实时预览</div>
            {previewStyle ? (
              <div
                className="flex-1 min-h-[60px] flex items-center overflow-hidden rounded-md"
                style={{ '--preview-bar': 'oklch(0.65 0.15 250)' } as React.CSSProperties}
              >
                {parsed.type === '<color>' ? (
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className="w-16 h-16 rounded-lg border shadow-sm flex-shrink-0"
                      style={{ backgroundColor: parsed.raw.trim() }}
                    />
                    <div className="space-y-1">
                      <div className="text-sm font-mono">{parsed.raw.trim()}</div>
                      <div className="text-xs text-muted-foreground">应用到 background-color</div>
                    </div>
                  </div>
                ) : parsed.type === '<angle>' ? (
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-2 border-muted" />
                      <div
                        className="absolute top-1/2 left-1/2 w-0.5 h-7 bg-primary origin-bottom rounded"
                        style={{ transform: `translate(-50%, -100%) rotate(${parsed.raw.trim()})` }}
                      />
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      transform: rotate({parsed.raw.trim()})
                    </div>
                  </div>
                ) : (
                  <div className="w-full space-y-1">
                    <div className="bg-muted rounded-md overflow-hidden">
                      <div style={previewStyle} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      width: {parsed.raw.trim()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 min-h-[60px] flex items-center justify-center text-sm text-muted-foreground">
                该类型无可视化预览
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reference table */}
      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground transition-colors">
          CSS 值类型速查
        </summary>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 pl-4">
          <span className="font-medium">&lt;length&gt;</span>
          <span>px, em, rem, vw, vh, ch...</span>
          <span className="font-medium">&lt;percentage&gt;</span>
          <span>50%, 100%</span>
          <span className="font-medium">&lt;number&gt;</span>
          <span>1.5, 0.8, 3</span>
          <span className="font-medium">&lt;color&gt;</span>
          <span>#hex, rgb(), hsl(), oklch()</span>
          <span className="font-medium">&lt;angle&gt;</span>
          <span>deg, rad, grad, turn</span>
          <span className="font-medium">&lt;time&gt;</span>
          <span>s, ms</span>
          <span className="font-medium">&lt;resolution&gt;</span>
          <span>dpi, dpcm, dppx</span>
          <span className="font-medium">&lt;flex&gt;</span>
          <span>fr</span>
        </div>
      </details>
    </div>
  );
}
