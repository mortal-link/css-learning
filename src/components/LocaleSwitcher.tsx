'use client';

import { useLocaleContext } from '@/contexts/LocaleContext';
import { SUPPORTED_LOCALES } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { Languages, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocaleContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const current = SUPPORTED_LOCALES.find((l) => l.code === locale);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
        aria-label="Switch language"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{current?.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 py-1 bg-popover border rounded-lg shadow-lg z-50 min-w-[140px]">
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => {
                setLocale(loc.code as Locale);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors ${
                locale === loc.code ? 'text-primary font-medium' : 'text-foreground'
              }`}
            >
              <span className="w-5 text-center">{loc.flag}</span>
              <span className="flex-1 text-left">{loc.label}</span>
              {locale === loc.code && <Check className="w-3.5 h-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
