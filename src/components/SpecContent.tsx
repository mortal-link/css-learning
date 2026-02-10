import React from 'react';
import { SpecLink } from './SpecLink';
import { lookupGlossary } from '@/data/glossary';
import { lookupProperty } from '@/data/properties';
import { resolveCSS2Link, toCSS2ExternalUrl, getBibrefUrl, degradeAnchor } from '@/data/css2-links';
import { getModule, type Section } from '@/data/modules';
import { t } from '@/lib/i18n';

interface SpecContentProps {
  content: string;
  /** 当前模块 ID（用于解析内部锚点） */
  moduleId?: string;
}

/**
 * 解析规范内容中的伪 Markdown 格式并渲染为 React 元素。
 *
 * 规范内容由 extract-content.js / extract-css2.js 从 HTML 转换而来，包含：
 * - 链接: [text](url)
 * - 参考文献: [[CSS2]](#biblio-css2) 或 [[ISO10646]](refs.html#ref-ISO10646)
 * - 行内代码: `code`
 * - 代码块: ```...```
 * - 粗体: **term**
 * - 列表: - item（支持缩进嵌套）
 * - 表格式数据: 多行两列对齐的键值对
 */
export function SpecContent({ content, moduleId }: SpecContentProps) {
  // Build context for inline rendering
  const mod = moduleId ? getModule(moduleId) : undefined;
  const ctx: InlineContext = { moduleId, sections: mod?.sections ?? [] };

  const elements = parseContent(content, ctx);
  return (
    <div className="spec-content prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
      {elements}
    </div>
  );
}

// ============================================================
// Context for inline rendering
// ============================================================

interface InlineContext {
  moduleId?: string;
  sections: Section[];
}

// ============================================================
// Parsing
// ============================================================

/** 解码残留的 HTML 实体（提取脚本可能遗漏的） */
function decodeEntities(text: string): string {
  return text
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&nbsp;/g, '\u00A0')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&times;/g, '\u00D7')
    .replace(/&rarr;/g, '\u2192')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/** 将内容分割为代码块和非代码块，分别处理 */
function parseContent(rawContent: string, ctx: InlineContext): React.ReactNode[] {
  const content = decodeEntities(rawContent);
  const parts = content.split(/(```[\s\S]*?```)/g);
  const result: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('```')) {
      const code = part.replace(/^```\n?/, '').replace(/\n?```$/, '');
      result.push(
        <pre key={i} className="bg-muted rounded-md p-3 overflow-x-auto text-xs my-3">
          <code>{code}</code>
        </pre>
      );
    } else if (part.trim()) {
      const paragraphs = part.split(/\n\n+/);
      for (let j = 0; j < paragraphs.length; j++) {
        const para = paragraphs[j].trim();
        if (!para) continue;

        const lines = para.split('\n');

        // 检测表格式数据
        if (isTableLike(lines)) {
          result.push(renderTable(lines, `${i}-${j}`, ctx));
          continue;
        }

        // 检测列表
        const isListBlock = lines.every(
          (l) => l.trim().startsWith('- ') || l.trim().startsWith('* ') || l.trim() === ''
        );

        if (isListBlock) {
          result.push(renderList(lines, `${i}-${j}`, ctx));
        } else {
          result.push(
            <p key={`${i}-${j}`} className="my-2">
              {renderInline(para, ctx)}
            </p>
          );
        }
      }
    }
  }

  return result;
}

/** 检测是否为表格式数据 */
function isTableLike(lines: string[]): boolean {
  const dataLines = lines.filter((l) => l.trim().length > 0);
  if (dataLines.length < 3) return false;

  let twoPartCount = 0;
  for (const line of dataLines) {
    const trimmed = line.trim();
    if (trimmed.includes('\t') || trimmed.match(/\S\s{2,}\S/)) {
      twoPartCount++;
    }
  }

  return twoPartCount >= dataLines.length * 0.5 && twoPartCount >= 3;
}

/** 渲染表格式数据 */
function renderTable(lines: string[], key: string, ctx: InlineContext): React.ReactNode {
  const rows: { col1: string; col2: string }[] = [];
  let headerLine: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let parts = trimmed.split('\t').map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) {
      parts = trimmed.split(/\s{2,}/).map((s) => s.trim()).filter(Boolean);
    }

    if (parts.length >= 2) {
      rows.push({ col1: parts[0], col2: parts.slice(1).join(' ') });
    } else if (rows.length === 0) {
      headerLine = trimmed;
    } else {
      rows.push({ col1: trimmed, col2: '' });
    }
  }

  if (rows.length === 0) return null;

  return (
    <div key={key} className="my-3 overflow-x-auto">
      {headerLine && (
        <div className="text-xs font-semibold text-foreground/70 mb-1">{headerLine}</div>
      )}
      <div className="text-xs border rounded-md overflow-hidden">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[auto_1fr] gap-x-4 px-3 py-1.5 ${
              idx % 2 === 0 ? 'bg-muted' : ''
            }`}
          >
            <span className="font-mono text-foreground/80 whitespace-nowrap">
              {renderInline(row.col1, ctx)}
            </span>
            <span className="text-muted-foreground">{renderInline(row.col2, ctx)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 渲染列表 */
function renderList(lines: string[], key: string, ctx: InlineContext): React.ReactNode {
  const items = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- ') || l.startsWith('* '));

  return (
    <ul key={key} className="space-y-1 my-2 list-none pl-0">
      {items.map((item, k) => (
        <li key={k} className="flex items-start gap-2">
          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
          <span>{renderInline(item.slice(2), ctx)}</span>
        </li>
      ))}
    </ul>
  );
}

/** 处理行内元素：链接、参考文献、行内代码、粗体 → SpecLink */
function renderInline(text: string, ctx: InlineContext): React.ReactNode[] {
  // 按优先级排列：
  // 1. 参考文献: [[REF]](any-url)
  // 2. 外部链接: [text](https://...)
  // 3. 内部锚点: [text](#anchor)
  // 4. 相对链接: [text](path)
  // 5. 行内代码: `code`
  // 6. 粗体: **term**
  const inlineRegex =
    /(\[\[([^\]]+)\]\]\([^)]+\))|(\[([^\]]+)\]\((https?:\/\/[^)]+)\))|(\[([^\]]+)\]\(#([^)]+)\))|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|\*\*([^*]+)\*\*/g;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // 参考文献: [[CSS2]](any-url) → clickable external link
      const ref = match[2];
      const url = getBibrefUrl(ref);
      result.push(<SpecLink key={key++} type="bibref" text={ref} url={url} />);
    } else if (match[3]) {
      // 外部链接: [text](https://...)
      const extUrl = match[5];
      const extText = match[4];
      // CSS3 规范中的属性定义链接：https://.../#propdef-xxx → 属性弹窗
      const extPropMatch = extUrl.match(/#propdef-([a-z][\w-]*)/);
      if (extPropMatch) {
        const propEntry = lookupProperty(extPropMatch[1]);
        if (propEntry) {
          result.push(
            <SpecLink key={key++} type="property" text={extText} entry={propEntry} />
          );
          lastIndex = match.index + match[0].length;
          continue;
        }
      }
      result.push(
        <a
          key={key++}
          href={extUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/30 hover:decoration-primary transition-colors"
        >
          {extText}
        </a>
      );
    } else if (match[6]) {
      // 内部锚点: [text](#anchor)
      const anchor = match[8];
      const linkText = match[7];

      // 属性定义锚点：#propdef-xxx → 属性弹窗
      if (anchor.startsWith('propdef-')) {
        const propEntry = lookupProperty(anchor.slice('propdef-'.length));
        if (propEntry) {
          result.push(
            <SpecLink key={key++} type="property" text={linkText} entry={propEntry} />
          );
          lastIndex = match.index + match[0].length;
          continue;
        }
      }

      let section = ctx.sections.find((s) => s.specId === anchor || s.id === anchor);

      // 降级：CSS2 细粒度锚点 → 我们的 section
      if (!section && ctx.moduleId) {
        const degradedId = degradeAnchor(ctx.moduleId, anchor);
        if (degradedId) {
          section = ctx.sections.find((s) => s.id === degradedId);
        }
      }

      if (section) {
        result.push(
          <SpecLink
            key={key++}
            type="internal"
            text={linkText}
            sectionId={section.id}
            sectionTitle={t(section.title)}
            sectionSummary={t(section.summary)}
            keyPoints={section.keyPoints}
            demoModuleId={ctx.moduleId}
            demoSectionId={section.id}
          />
        );
      } else {
        // No matching section → simple anchor link
        result.push(
          <a key={key++} href={`#${anchor}`} className="text-foreground/80 font-medium hover:text-primary transition-colors">
            {linkText}
          </a>
        );
      }
    } else if (match[9]) {
      // 相对链接: [text](path.html) or [text](path.html#anchor)
      const linkText = match[10];
      const url = match[11];
      const resolved = resolveCSS2Link(url);

      if (resolved && resolved.moduleId) {
        // 属性定义链接：#propdef-* → 属性弹窗
        if (resolved.anchor?.startsWith('propdef-')) {
          const propName = resolved.anchor.slice('propdef-'.length);
          const propEntry = lookupProperty(propName);
          if (propEntry) {
            result.push(
              <SpecLink key={key++} type="property" text={linkText} entry={propEntry} />
            );
            lastIndex = match.index + match[0].length;
            continue;
          }
        }

        const targetMod = getModule(resolved.moduleId);
        // 尝试匹配目标 section 获取 summary + keyPoints
        let sectionSummary: string | undefined;
        let keyPoints: string[] | undefined;
        let resolvedSectionId: string | undefined;
        if (targetMod && resolved.anchor) {
          let targetSection = targetMod.sections.find(
            (s) => s.specId === resolved.anchor || s.id === resolved.anchor
          );
          // 降级：CSS2 细粒度锚点 → 我们的 section
          if (!targetSection) {
            const degradedId = degradeAnchor(resolved.moduleId, resolved.anchor);
            if (degradedId) {
              targetSection = targetMod.sections.find((s) => s.id === degradedId);
            }
          }
          if (targetSection) {
            sectionSummary = t(targetSection.summary);
            keyPoints = targetSection.keyPoints;
            resolvedSectionId = targetSection.id;
          }
        }
        result.push(
          <SpecLink
            key={key++}
            type="relative"
            text={linkText}
            moduleId={resolved.moduleId}
            moduleTitle={targetMod ? t(targetMod.title) : resolved.moduleId}
            anchor={resolved.anchor}
            sectionSummary={sectionSummary}
            keyPoints={keyPoints}
            css2Url={toCSS2ExternalUrl(url)}
            css3Url={targetMod?.specUrl}
            demoModuleId={resolved.moduleId}
            demoSectionId={resolvedSectionId}
          />
        );
      } else {
        // Can't map → external link to W3C
        result.push(
          <SpecLink
            key={key++}
            type="external-relative"
            text={linkText}
            url={toCSS2ExternalUrl(url)}
          />
        );
      }
    } else if (match[12]) {
      // 行内代码: `code`
      result.push(
        <code
          key={key++}
          className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground/90"
        >
          {match[13]}
        </code>
      );
    } else if (match[14]) {
      // 粗体/术语: **term** → SpecLink if in glossary
      const term = match[14];
      const entry = lookupGlossary(term);

      if (entry) {
        // 从 sectionRef 查找关联 section 的 summary + keyPoints
        let termSummary: string | undefined;
        let termKeyPoints: string[] | undefined;
        let termModuleId: string | undefined;
        let termSectionId: string | undefined;
        if (entry.sectionRef) {
          const [refModId, refSecId] = entry.sectionRef.split('#');
          termModuleId = refModId;
          termSectionId = refSecId;
          const refMod = refModId ? getModule(refModId) : undefined;
          if (refMod && refSecId) {
            const refSection = refMod.sections.find((s) => s.id === refSecId);
            if (refSection) {
              termSummary = t(refSection.summary);
              termKeyPoints = refSection.keyPoints;
            }
          }
        }
        result.push(
          <SpecLink
            key={key++}
            type="term"
            text={term}
            entry={entry}
            sectionSummary={termSummary}
            keyPoints={termKeyPoints}
            demoModuleId={termModuleId}
            demoSectionId={termSectionId}
          />
        );
      } else {
        // 属性 fallback：加粗术语不在 glossary 时查找属性注册表
        const propEntry = lookupProperty(term);
        if (propEntry) {
          result.push(
            <SpecLink key={key++} type="property" text={term} entry={propEntry} />
          );
        } else {
          result.push(
            <strong key={key++} className="text-foreground font-semibold">
              {term}
            </strong>
          );
        }
      }
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}
