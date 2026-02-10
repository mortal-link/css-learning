'use client';

import { Search } from 'lucide-react';
import { useLocaleContext } from '@/contexts/LocaleContext';

export function SearchButton() {
  const { t } = useLocaleContext();

  const handleClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    });
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors border rounded-md hover:bg-accent"
    >
      <Search className="w-4 h-4" />
      <span className="hidden sm:inline">{t('ui.search')}</span>
      <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-xs font-mono bg-muted rounded">
        ⌘K
      </kbd>
    </button>
  );
}
