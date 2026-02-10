'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Hash, FileText, Code, BookOpen } from 'lucide-react';
import { searchItems, getTypeLabel, getModuleTitle } from '@/lib/search-data';
import type { SearchItem } from '@/lib/search-data';
import { useLocaleContext } from '@/contexts/LocaleContext';

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLocaleContext();

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setResults(searchItems('', locale));
      setSelectedIndex(0);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen, locale]);

  // Search
  useEffect(() => {
    const items = searchItems(query, locale);
    setResults(items);
    setSelectedIndex(0);
  }, [query, locale]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    },
    [results, selectedIndex]
  );

  const handleSelect = (item: SearchItem) => {
    router.push(item.url);
    setIsOpen(false);
  };

  const getTypeIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'module':
        return <BookOpen className="w-4 h-4" />;
      case 'section':
        return <FileText className="w-4 h-4" />;
      case 'property':
        return <Code className="w-4 h-4" />;
      case 'term':
        return <Hash className="w-4 h-4" />;
    }
  };

  // Group by type
  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-lg z-50">
        <div className="bg-background border rounded-lg shadow-lg">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('ui.searchPlaceholder')}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-muted rounded">
              ESC
            </kbd>
          </div>

          {/* Search results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                {query ? t('ui.noResults') : t('ui.searchPlaceholder')}
              </div>
            ) : (
              <div className="py-2">
                {Object.entries(groupedResults).map(([type, items]) => (
                  <div key={type}>
                    {/* Type heading */}
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                      {getTypeLabel(type as SearchItem['type'], locale)}
                    </div>
                    {/* Results list */}
                    {items.map((item) => {
                      const globalIndex = results.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={`${item.type}-${item.moduleId}-${item.title}`}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                            isSelected
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {getTypeIcon(item.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground truncate mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>

                          {/* Module badge */}
                          <div className="flex-shrink-0 text-xs text-muted-foreground">
                            {getModuleTitle(item.moduleId, locale)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer hints */}
          <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↓</kbd>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">Enter</kbd>
              </span>
            </div>
            <span className="hidden sm:inline">
              {results.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
