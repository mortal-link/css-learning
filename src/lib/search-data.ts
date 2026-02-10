/**
 * Search data source
 * Extracts searchable entries from modules, properties, and terms
 */

import { modules, getModuleList } from '@/data/modules';
import { properties } from '@/data/properties';
import { glossary } from '@/data/glossary';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export interface SearchItem {
  type: 'module' | 'section' | 'property' | 'term';
  title: string;
  description?: string;
  moduleId: string;
  sectionId?: string;
  url: string;
}

const searchIndexCache: Record<string, SearchItem[]> = {};

/**
 * Build search index for a given locale
 */
export function buildSearchIndex(locale: Locale): SearchItem[] {
  if (searchIndexCache[locale]) return searchIndexCache[locale];

  const items: SearchItem[] = [];
  const moduleList = getModuleList();

  // 1. Modules
  for (const module of moduleList) {
    items.push({
      type: 'module',
      title: t(module.title, locale),
      description: t(module.description, locale),
      moduleId: module.id,
      url: `/modules/${module.id}`,
    });

    // 2. Sections
    for (const section of module.sections) {
      items.push({
        type: 'section',
        title: t(section.title, locale),
        description: t(section.summary, locale),
        moduleId: module.id,
        sectionId: section.id,
        url: `/modules/${module.id}#${section.id}`,
      });
    }
  }

  // 3. CSS properties
  for (const [propName, propEntry] of Object.entries(properties)) {
    const moduleId = propEntry.sectionRef?.split('#')[0] || 'common';
    const sectionId = propEntry.sectionRef?.split('#')[1];

    items.push({
      type: 'property',
      title: propName,
      description: `${propEntry.zh} - ${propEntry.appliesTo}`,
      moduleId,
      sectionId,
      url: sectionId ? `/modules/${moduleId}#${sectionId}` : `/modules/${moduleId}`,
    });
  }

  // 4. Terms
  for (const [termName, termEntry] of Object.entries(glossary)) {
    const moduleId = termEntry.sectionRef?.split('#')[0] || 'intro';
    const sectionId = termEntry.sectionRef?.split('#')[1];

    items.push({
      type: 'term',
      title: termName,
      description: `${termEntry.zh} - ${termEntry.description}`,
      moduleId,
      sectionId,
      url: sectionId ? `/modules/${moduleId}#${sectionId}` : `/modules/${moduleId}`,
    });
  }

  searchIndexCache[locale] = items;
  return items;
}

/**
 * Search items by query
 */
export function searchItems(query: string, locale: Locale, maxResults = 20): SearchItem[] {
  if (!query.trim()) {
    // Empty query: return popular modules
    const moduleList = getModuleList();
    return moduleList.slice(0, 5).map((module) => ({
      type: 'module' as const,
      title: t(module.title, locale),
      description: t(module.description, locale),
      moduleId: module.id,
      url: `/modules/${module.id}`,
    }));
  }

  const index = buildSearchIndex(locale);
  const lowerQuery = query.toLowerCase();
  const results: Array<SearchItem & { score: number }> = [];

  for (const item of index) {
    const titleLower = item.title.toLowerCase();
    const descLower = item.description?.toLowerCase() || '';

    let score = 0;

    if (titleLower === lowerQuery) {
      score = 100;
    } else if (titleLower.startsWith(lowerQuery)) {
      score = 80;
    } else if (titleLower.includes(lowerQuery)) {
      score = 60;
    } else if (descLower.includes(lowerQuery)) {
      score = 40;
    }

    if (score > 0) {
      results.push({ ...item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}

/**
 * Get type label text (locale-aware)
 */
export function getTypeLabel(type: SearchItem['type'], locale: Locale): string {
  return t(`ui.searchType${type.charAt(0).toUpperCase()}${type.slice(1)}`, locale);
}

/**
 * Get module title
 */
export function getModuleTitle(moduleId: string, locale: Locale): string {
  const module = modules[moduleId];
  return module ? t(module.title, locale) : moduleId;
}
