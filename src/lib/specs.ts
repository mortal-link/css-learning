import fs from 'fs';
import path from 'path';
import type { Locale } from '@/lib/i18n';

// ============================================================
// Types
// ============================================================

export interface SpecMeta {
  title: string;
  specName: string;
  sections: {
    level: number;
    id: string;
    heading: string;
  }[];
  fetchedAt: string;
}

export interface SpecContentSection {
  id: string;
  heading: string;
  content: string;
  rawLength: number;
}

export interface SpecContent {
  specName: string;
  extractedAt: string;
  totalSections: number;
  coreSections: number;
  sections: Record<string, SpecContentSection>;
}

// ============================================================
// Helpers
// ============================================================

const specsDir = path.join(process.cwd(), 'specs');

function resolveSpecPath(filename: string, locale?: Locale): string {
  if (locale) {
    const localePath = path.join(specsDir, locale, filename);
    if (fs.existsSync(localePath)) return localePath;
  }
  // Fallback to en
  const enPath = path.join(specsDir, 'en', filename);
  if (fs.existsSync(enPath)) return enPath;
  // Legacy fallback: root level (shouldn't happen after migration)
  return path.join(specsDir, filename);
}

// ============================================================
// Read functions
// ============================================================

/** Read spec metadata (section structure) */
export function getSpecMeta(specName: string, locale?: Locale): SpecMeta | null {
  const filePath = resolveSpecPath(`${specName}.json`, locale);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/** Read extracted spec content */
export function getSpecContent(specName: string, locale?: Locale): SpecContent | null {
  const filePath = resolveSpecPath(`${specName}-content.json`, locale);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/** Get list of all extracted spec names */
export function getExtractedSpecNames(): string[] {
  const enDir = path.join(specsDir, 'en');
  if (!fs.existsSync(enDir)) return [];
  return fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith('-content.json'))
    .map((f) => f.replace('-content.json', ''));
}

/** CSS2 section (used as fallback display for modules without curated sections) */
export interface CSS2Section {
  id: string;
  heading: string;
  content: string;
}

/** Get all CSS2 sub-sections for given spec names (ordered) */
export function getCSS2SectionList(specNames: string[], locale?: Locale): CSS2Section[] {
  const sections: CSS2Section[] = [];
  for (const specName of specNames) {
    const spec = getSpecContent(specName, locale);
    if (!spec) continue;
    for (const [id, sec] of Object.entries(spec.sections)) {
      sections.push({ id, heading: sec.heading, content: sec.content });
    }
  }
  return sections;
}

/** CSS2 section heading summary (id + heading only, for sidebar) */
export interface CSS2SectionHeading {
  id: string;
  heading: string;
}

/** Get CSS2 section headings for given spec names */
export function getCSS2SectionHeadings(specNames: string[], locale?: Locale): CSS2SectionHeading[] {
  const headings: CSS2SectionHeading[] = [];
  for (const specName of specNames) {
    const spec = getSpecContent(specName, locale);
    if (!spec) continue;
    for (const [id, sec] of Object.entries(spec.sections)) {
      headings.push({ id, heading: sec.heading });
    }
  }
  return headings;
}
