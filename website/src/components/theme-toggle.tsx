'use client';

import * as React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const colorThemes = [
    { id: 'default', name: '默认', color: 'bg-blue-500' },
    { id: 'forest', name: '森林', color: 'bg-green-500' },
    { id: 'ocean', name: '海洋', color: 'bg-cyan-500' },
    { id: 'sunset', name: '日落', color: 'bg-orange-500' },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {/* 颜色主题选择 */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="h-9 w-9"
        >
          <Palette className="h-4 w-4" />
          <span className="sr-only">选择主题颜色</span>
        </Button>
        
        {showColorPicker && (
          <div className="absolute right-0 top-full mt-2 p-2 bg-popover border rounded-lg shadow-lg z-50 min-w-[120px]">
            {colorThemes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => {
                  setColorTheme(ct.id);
                  setShowColorPicker(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors ${
                  colorTheme === ct.id ? 'bg-accent' : ''
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${ct.color}`} />
                {ct.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 明暗切换 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="h-9 w-9"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">切换主题</span>
      </Button>
    </div>
  );
}
