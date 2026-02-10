'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Locale, LocaleText } from '@/lib/i18n';
import { DEFAULT_LOCALE, t as staticT } from '@/lib/i18n';

const STORAGE_KEY = 'css-quest-locale';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Supports both key-based t('ui.heroTitle') and legacy t({ zh, en }), with optional locale override */
  t: (keyOrText: string | LocaleText, localeOverride?: Locale) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') {
        setLocaleState(stored);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Ignore localStorage errors
    }
    // Update html lang attribute
    document.documentElement.lang = newLocale === 'zh' ? 'zh-CN' : 'en';
  }, []);

  const t = useCallback(
    (keyOrText: string | LocaleText, localeOverride?: Locale) => staticT(keyOrText, localeOverride ?? locale),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return ctx;
}
