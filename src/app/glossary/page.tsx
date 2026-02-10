'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, Check, X, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { glossary } from '@/data/glossary';
import type { GlossaryEntry } from '@/data/glossary';
import { properties } from '@/data/properties';
import type { PropertyEntry } from '@/data/properties';
import { modules } from '@/data/modules';
import { useLocaleContext } from '@/contexts/LocaleContext';

// -- Types --

interface TermItem {
  key: string;
  entry: GlossaryEntry;
  letter: string;
}

interface PropItem {
  key: string;
  entry: PropertyEntry;
  letter: string;
}

interface LetterGroup<T> {
  letter: string;
  items: T[];
}

// -- Helpers --

function getFirstLetter(key: string): string {
  const ch = key.charAt(0).toUpperCase();
  return /[A-Z]/.test(ch) ? ch : '#';
}

function groupByLetter<T extends { letter: string }>(items: T[]): LetterGroup<T>[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const existing = map.get(item.letter);
    if (existing) {
      existing.push(item);
    } else {
      map.set(item.letter, [item]);
    }
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)))
    .map(([letter, items]) => ({ letter, items }));
}

// -- Component --

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('terms');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLocaleContext();

  function getModuleTitle(moduleId: string): string {
    const mod = modules[moduleId];
    return mod ? t(mod.title) : moduleId;
  }

  // Read tab from URL hash on initial load
  useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'properties') {
        setActiveTab('properties');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build term items
  const allTerms = useMemo<TermItem[]>(() => {
    return Object.entries(glossary)
      .map(([key, entry]) => ({
        key,
        entry,
        letter: getFirstLetter(key),
      }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, []);

  // Build property items
  const allProps = useMemo<PropItem[]>(() => {
    return Object.entries(properties)
      .map(([key, entry]) => ({
        key,
        entry,
        letter: getFirstLetter(key),
      }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, []);

  // Filter by search
  const filteredTerms = useMemo(() => {
    if (!search.trim()) return allTerms;
    const q = search.toLowerCase();
    return allTerms.filter(
      (item) =>
        item.key.includes(q) ||
        item.entry.zh.includes(q) ||
        item.entry.description.toLowerCase().includes(q)
    );
  }, [allTerms, search]);

  const filteredProps = useMemo(() => {
    if (!search.trim()) return allProps;
    const q = search.toLowerCase();
    return allProps.filter(
      (p) =>
        p.key.includes(q) ||
        p.entry.zh.includes(q) ||
        p.entry.value.toLowerCase().includes(q)
    );
  }, [allProps, search]);

  // Group by letter
  const termGroups = useMemo(() => groupByLetter(filteredTerms), [filteredTerms]);
  const propGroups = useMemo(() => groupByLetter(filteredProps), [filteredProps]);

  // Alphabet nav letters
  const activeGroups = activeTab === 'terms' ? termGroups : propGroups;
  const availableLetters = useMemo(
    () => new Set(activeGroups.map((g) => g.letter)),
    [activeGroups]
  );

  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  const scrollToLetter = useCallback((letter: string) => {
    const id = `group-${activeTab}-${letter}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-screen-xl px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('ui.home')}
        </Link>
        <h1 className="text-3xl font-bold mb-2">{t('ui.glossaryTitle')}</h1>
        <p className="text-muted-foreground">{t('ui.glossaryDesc')}</p>
        <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
          <span>{allTerms.length} {t('ui.termCount')}</span>
          <span>·</span>
          <span>{allProps.length} {t('ui.propertyCount')}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('ui.searchPlaceholder')}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0" ref={scrollContainerRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="terms">{t('ui.tabTerms')} ({filteredTerms.length})</TabsTrigger>
              <TabsTrigger value="properties">{t('ui.tabProperties')} ({filteredProps.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              {termGroups.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">{t('ui.noResults')}</p>
              ) : (
                <div className="space-y-8">
                  {termGroups.map((group) => (
                    <div key={group.letter} id={`group-terms-${group.letter}`} className="scroll-mt-24">
                      <div className="sticky top-14 z-10 bg-background/95 backdrop-blur py-2 border-b mb-4">
                        <h2 className="text-lg font-bold text-primary">{group.letter}</h2>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {group.items.map((item) => {
                          const moduleId = item.entry.sectionRef?.split('#')[0];
                          const sectionId = item.entry.sectionRef?.split('#')[1];
                          const href = moduleId && sectionId
                            ? `/modules/${moduleId}#${sectionId}`
                            : moduleId
                              ? `/modules/${moduleId}`
                              : undefined;

                          return (
                            <Card
                              key={item.key}
                              id={`term-${item.key}`}
                              className="scroll-mt-24 hover:border-primary/50 transition-colors"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div className="font-medium text-sm text-foreground">{item.key}</div>
                                  {moduleId && (
                                    <Badge variant="secondary" className="text-[10px] shrink-0">
                                      {getModuleTitle(moduleId)}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-foreground/80 mb-1">{item.entry.zh}</div>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                  {item.entry.description}
                                </p>
                                {href && (
                                  <Link
                                    href={href}
                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                                  >
                                    {t('ui.viewInModule')}
                                  </Link>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="properties">
              {propGroups.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">{t('ui.noResults')}</p>
              ) : (
                <div className="space-y-8">
                  {propGroups.map((group) => (
                    <div key={group.letter} id={`group-properties-${group.letter}`} className="scroll-mt-24">
                      <div className="sticky top-14 z-10 bg-background/95 backdrop-blur py-2 border-b mb-4">
                        <h2 className="text-lg font-bold text-primary">{group.letter}</h2>
                      </div>
                      <div className="space-y-2">
                        {group.items.map((item) => {
                          const moduleId = item.entry.sectionRef?.split('#')[0];
                          const sectionId = item.entry.sectionRef?.split('#')[1];
                          const href = moduleId && sectionId
                            ? `/modules/${moduleId}#${sectionId}`
                            : moduleId
                              ? `/modules/${moduleId}`
                              : undefined;

                          return (
                            <Card
                              key={item.key}
                              id={`prop-${item.key}`}
                              className="scroll-mt-24 hover:border-primary/50 transition-colors"
                            >
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                  {/* Name */}
                                  <div className="sm:w-40 shrink-0">
                                    <div className="font-mono font-medium text-sm text-foreground">{item.key}</div>
                                    <div className="text-xs text-foreground/70">{item.entry.zh}</div>
                                  </div>

                                  {/* Value syntax */}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-mono text-xs text-muted-foreground break-all line-clamp-1">
                                      {item.entry.value}
                                    </div>
                                  </div>

                                  {/* Meta */}
                                  <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                                    <span title={item.entry.inherited ? t('ui.inherited') : t('ui.notInherited')}>
                                      {item.entry.inherited ? (
                                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                      ) : (
                                        <X className="w-3.5 h-3.5 text-muted-foreground/50" />
                                      )}
                                    </span>
                                    <span className="text-[10px] w-24 truncate" title={item.entry.initial}>
                                      {item.entry.initial}
                                    </span>
                                    {href && (
                                      <Link
                                        href={href}
                                        className="text-primary hover:underline whitespace-nowrap"
                                      >
                                        {t('ui.viewInModule')}
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Alphabet navigation - desktop only */}
        <nav className="hidden lg:flex flex-col items-center gap-0.5 sticky top-20 h-fit py-2">
          {allLetters.map((letter) => {
            const isAvailable = availableLetters.has(letter);
            return (
              <button
                key={letter}
                onClick={() => isAvailable && scrollToLetter(letter)}
                disabled={!isAvailable}
                className={`w-7 h-6 text-xs font-medium rounded transition-colors ${
                  isAvailable
                    ? 'text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer'
                    : 'text-muted-foreground/30 cursor-default'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
