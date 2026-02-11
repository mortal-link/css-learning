'use client';

import { useState } from 'react';

type UserSelect = 'auto' | 'none' | 'text' | 'all';
type Resize = 'none' | 'both' | 'horizontal' | 'vertical';
type Cursor = 'pointer' | 'text' | 'grab' | 'not-allowed' | 'wait' | 'help' | 'crosshair';

export function CSSUIDemo() {
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [caretColor, setCaretColor] = useState('#ef4444');
  const [userSelect, setUserSelect] = useState<UserSelect>('auto');
  const [cursor, setCursor] = useState<Cursor>('pointer');
  const [resize, setResize] = useState<Resize>('both');

  const presetColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const generateCSS = () => {
    return `/* 表单元素强调色 */
input[type="checkbox"],
input[type="radio"],
input[type="range"],
progress {
  accent-color: ${accentColor};
}

/* 文本光标颜色 */
input[type="text"],
textarea {
  caret-color: ${caretColor};
}

/* 用户选择行为 */
.selectable {
  user-select: ${userSelect};
}

/* 鼠标指针样式 */
.interactive {
  cursor: ${cursor};
}

/* 可调整大小 */
.resizable {
  resize: ${resize};
  overflow: auto;
}`;
  };

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg">
      {/* accent-color Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          accent-color (强调色)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer"
          />
          <div className="flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                className="w-10 h-10 rounded border-2 border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <span className="font-mono text-sm text-muted-foreground">{accentColor}</span>
        </div>

        {/* accent-color Demo */}
        <div className="mt-4 p-4 border border-border rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked style={{ accentColor }} />
              <span className="text-sm">复选框</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" style={{ accentColor }} />
              <span className="text-sm">复选框 2</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="demo" defaultChecked style={{ accentColor }} />
              <span className="text-sm">单选 A</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="demo" style={{ accentColor }} />
              <span className="text-sm">单选 B</span>
            </label>
          </div>
          <input
            type="range"
            className="w-full"
            style={{ accentColor }}
          />
          <progress
            value="70"
            max="100"
            className="w-full"
            style={{ accentColor }}
          />
        </div>
      </div>

      {/* caret-color Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          caret-color (光标颜色)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={caretColor}
            onChange={(e) => setCaretColor(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer"
          />
          <div className="flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setCaretColor(color)}
                className="w-10 h-10 rounded border-2 border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <span className="font-mono text-sm text-muted-foreground">{caretColor}</span>
        </div>

        {/* caret-color Demo */}
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="在这里输入，观察光标颜色"
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
            style={{ caretColor }}
          />
          <textarea
            placeholder="多行文本输入"
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
            rows={3}
            style={{ caretColor }}
          />
        </div>
      </div>

      {/* user-select Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          user-select (选择行为)
        </label>
        <div className="flex gap-2 flex-wrap">
          {(['auto', 'none', 'text', 'all'] as UserSelect[]).map((value) => (
            <button
              key={value}
              onClick={() => setUserSelect(value)}
              className={`px-4 py-2 rounded transition-colors ${
                userSelect === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* user-select Demo */}
        <div
          className="mt-4 p-4 border border-border rounded-lg bg-muted/50"
          style={{ userSelect }}
        >
          <p className="text-foreground">
            尝试选择这段文本。当前设置: <strong>{userSelect}</strong>。
            {userSelect === 'none' && ' (无法选择)'}
            {userSelect === 'all' && ' (点击选择全部)'}
            {userSelect === 'text' && ' (可正常选择文本)'}
          </p>
        </div>
      </div>

      {/* cursor Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          cursor (鼠标指针)
        </label>
        <div className="flex gap-2 flex-wrap">
          {(['pointer', 'text', 'grab', 'not-allowed', 'wait', 'help', 'crosshair'] as Cursor[]).map((value) => (
            <button
              key={value}
              onClick={() => setCursor(value)}
              className={`px-4 py-2 rounded transition-colors ${
                cursor === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* cursor Demo */}
        <div
          className="mt-4 p-8 border border-border rounded-lg bg-muted/50 text-center"
          style={{ cursor }}
        >
          <p className="text-foreground">
            将鼠标移到此区域，查看 <strong>{cursor}</strong> 样式
          </p>
        </div>
      </div>

      {/* resize Control */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          resize (可调整大小)
        </label>
        <div className="flex gap-2 flex-wrap">
          {(['none', 'both', 'horizontal', 'vertical'] as Resize[]).map((value) => (
            <button
              key={value}
              onClick={() => setResize(value)}
              className={`px-4 py-2 rounded transition-colors ${
                resize === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* resize Demo */}
        <div
          className="mt-4 p-4 border-2 border-dashed border-border rounded-lg bg-muted/50 overflow-auto min-h-[100px]"
          style={{ resize }}
        >
          <p className="text-foreground">
            {resize !== 'none' ? '拖动右下角调整大小 →↘' : '当前禁用调整大小'}
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            resize: {resize}
          </p>
        </div>
      </div>

      {/* CSS Code Output */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          生成的 CSS 代码
        </label>
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {generateCSS()}
        </pre>
      </div>
    </div>
  );
}
