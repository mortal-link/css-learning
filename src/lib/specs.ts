import fs from 'fs';
import path from 'path';

// ============================================================
// 类型定义
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
// 读取函数
// ============================================================

const specsDir = path.join(process.cwd(), 'specs');

/** 读取规范的元数据（章节结构） */
export function getSpecMeta(specName: string): SpecMeta | null {
  const filePath = path.join(specsDir, `${specName}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/** 读取规范的提取内容 */
export function getSpecContent(specName: string): SpecContent | null {
  const filePath = path.join(specsDir, `${specName}-content.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/** 获取所有已提取内容的规范名列表 */
export function getExtractedSpecNames(): string[] {
  if (!fs.existsSync(specsDir)) return [];
  return fs
    .readdirSync(specsDir)
    .filter((f) => f.endsWith('-content.json'))
    .map((f) => f.replace('-content.json', ''));
}

/** CSS2 子章节（用于无人工 sections 的章节 fallback 展示） */
export interface CSS2Section {
  id: string;
  heading: string;
  content: string;
}

/** 获取某个模块关联的所有 CSS2 子章节列表（有序） */
export function getCSS2SectionList(specNames: string[]): CSS2Section[] {
  const sections: CSS2Section[] = [];
  for (const specName of specNames) {
    const spec = getSpecContent(specName);
    if (!spec) continue;
    for (const [id, sec] of Object.entries(spec.sections)) {
      sections.push({ id, heading: sec.heading, content: sec.content });
    }
  }
  return sections;
}

/** CSS2 子章节摘要（仅 id + heading，用于侧边栏） */
export interface CSS2SectionHeading {
  id: string;
  heading: string;
}

/** 获取指定 specNames 关联的 CSS2 子章节标题列表（仅 id + heading） */
export function getCSS2SectionHeadings(specNames: string[]): CSS2SectionHeading[] {
  const headings: CSS2SectionHeading[] = [];
  for (const specName of specNames) {
    const spec = getSpecContent(specName);
    if (!spec) continue;
    for (const [id, sec] of Object.entries(spec.sections)) {
      headings.push({ id, heading: sec.heading });
    }
  }
  return headings;
}
