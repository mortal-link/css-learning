'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';
type ColorTheme = 'default' | 'forest' | 'ocean' | 'sunset';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorTheme?: ColorTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
};

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorTheme = 'default',
  storageKey = 'css-quest-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>(defaultColorTheme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    const savedColorTheme = localStorage.getItem(`${storageKey}-color`) as ColorTheme | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedColorTheme) setColorTheme(savedColorTheme);
  }, [storageKey]);

  React.useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  React.useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove('theme-forest', 'theme-ocean', 'theme-sunset');
    
    if (colorTheme !== 'default') {
      root.classList.add(`theme-${colorTheme}`);
    }
    
    localStorage.setItem(`${storageKey}-color`, colorTheme);
  }, [colorTheme, mounted, storageKey]);

  const value = {
    theme,
    colorTheme,
    setTheme: (theme: Theme) => setTheme(theme),
    setColorTheme: (colorTheme: ColorTheme) => setColorTheme(colorTheme),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
