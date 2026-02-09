'use client';

import { ExternalLink, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DemoSlot } from '@/components/demos/DemoSlot';
import { getDemoComponent } from '@/components/demos/index';
import type { GlossaryEntry } from '@/data/glossary';

// ============================================================
// Props
// ============================================================

interface TermLinkProps {
  type: 'term';
  text: string;
  entry: GlossaryEntry;
  sectionSummary?: string;
  keyPoints?: string[];
  demoModuleId?: string;
  demoSectionId?: string;
}

interface RelativeLinkProps {
  type: 'relative';
  text: string;
  moduleId: string;
  moduleTitle: string;
  anchor?: string;
  sectionSummary?: string;
  keyPoints?: string[];
  css2Url: string;
  css3Url?: string;
  demoModuleId?: string;
  demoSectionId?: string;
}

interface InternalLinkProps {
  type: 'internal';
  text: string;
  sectionId: string;
  sectionTitle: string;
  sectionSummary: string;
  keyPoints?: string[];
  demoModuleId?: string;
  demoSectionId?: string;
}

interface BibrefLinkProps {
  type: 'bibref';
  text: string;
  url: string | null;
}

interface ExternalUrlLinkProps {
  type: 'external-relative';
  text: string;
  url: string;
}

export type SpecLinkProps =
  | TermLinkProps
  | RelativeLinkProps
  | InternalLinkProps
  | BibrefLinkProps
  | ExternalUrlLinkProps;

// ============================================================
// Component
// ============================================================

export function SpecLink(props: SpecLinkProps) {
  switch (props.type) {
    case 'term':
      return <TermPopover {...props} />;
    case 'relative':
      return <RelativePopover {...props} />;
    case 'internal':
      return <InternalPopover {...props} />;
    case 'bibref':
      return <BibrefLink {...props} />;
    case 'external-relative':
      return <ExternalRelativeLink {...props} />;
  }
}

// ── Shared: section content preview ──

function SectionPreview({
  summary,
  keyPoints,
}: {
  summary?: string;
  keyPoints?: string[];
}) {
  if (!summary && (!keyPoints || keyPoints.length === 0)) return null;

  return (
    <div className="space-y-1.5">
      {summary && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {summary}
        </p>
      )}
      {keyPoints && keyPoints.length > 0 && (
        <ul className="space-y-1">
          {keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
              <span className="text-primary mt-0.5 flex-shrink-0 text-[10px]">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Shared: inline demo ──

function InlineDemo({
  moduleId,
  sectionId,
}: {
  moduleId?: string;
  sectionId?: string;
}) {
  if (!moduleId || !sectionId) return null;
  const hasDemo = getDemoComponent(moduleId, sectionId);
  if (!hasDemo) return null;

  return (
    <>
      <Separator />
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
          <Sparkles className="w-3 h-3 text-primary" />
          交互示例
        </div>
        <DemoSlot moduleId={moduleId} sectionId={sectionId} />
      </div>
    </>
  );
}

// ── Shared: spec version links ──

function SpecVersionLinks({
  siteHref,
  css2Url,
  css3Url,
}: {
  siteHref?: string;
  css2Url?: string;
  css3Url?: string;
}) {
  const hasAny = siteHref || css2Url || css3Url;
  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 border-t border-border mt-2">
      {siteHref && (
        <Link
          href={siteHref}
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <BookOpen className="w-3 h-3" />
          站内查看
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
      {css2Url && (
        <a
          href={css2Url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          CSS2.1
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
      {css3Url && (
        <a
          href={css3Url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          CSS3
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

// ── Term Popover ──
// 颜色：显眼的 primary 实底背景标记，表示有丰富的弹窗内容

function TermPopover({ text, entry, sectionSummary, keyPoints, demoModuleId, demoSectionId }: TermLinkProps) {
  const [moduleId, sectionId] = entry.sectionRef?.split('#') ?? [];
  const siteHref = moduleId && sectionId ? `/modules/${moduleId}#${sectionId}` : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-primary font-semibold border-b-2 border-primary/60 hover:border-primary hover:bg-primary/10 rounded-sm px-0.5 transition-colors cursor-pointer">
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[40rem] p-0" align="start">
        <ScrollArea className="max-h-[70vh]">
          <div className="p-4 space-y-3">
            {/* 术语标题 */}
            <div>
              <div className="font-semibold text-sm text-foreground">{text}</div>
              <div className="text-xs text-muted-foreground">{entry.zh}</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {entry.description}
            </p>

            {/* Section 内容预览 */}
            {(sectionSummary || (keyPoints && keyPoints.length > 0)) && (
              <>
                <Separator />
                <SectionPreview summary={sectionSummary} keyPoints={keyPoints} />
              </>
            )}

            {/* 交互示例 */}
            <InlineDemo moduleId={demoModuleId} sectionId={demoSectionId} />

            {/* 规范链接 */}
            <SpecVersionLinks
              siteHref={siteHref}
              css2Url={entry.css2Url}
              css3Url={entry.specUrl}
            />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

// ── Relative Link Popover (CSS2 cross-chapter links) ──
// 颜色：蓝色调，表示跨章节站内导航

function RelativePopover({ text, moduleId, moduleTitle, anchor, sectionSummary, keyPoints, css2Url, css3Url, demoModuleId, demoSectionId }: RelativeLinkProps) {
  const siteHref = `/modules/${moduleId}${anchor ? `#${anchor}` : ''}`;
  const hasRichContent = sectionSummary || (keyPoints && keyPoints.length > 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={
          hasRichContent
            ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-400/60 hover:border-blue-500 hover:bg-blue-500/10 rounded-sm px-0.5 transition-colors cursor-pointer'
            : 'text-blue-600/80 dark:text-blue-400/80 border-b border-dotted border-blue-400/40 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer'
        }>
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent className={`${hasRichContent ? 'w-[40rem]' : 'w-96'} p-0`} align="start">
        <ScrollArea className={hasRichContent ? 'max-h-[70vh]' : ''}>
          <div className="p-4 space-y-3">
            <div className="font-semibold text-sm text-foreground">{moduleTitle}</div>
            <SectionPreview summary={sectionSummary} keyPoints={keyPoints} />
            <InlineDemo moduleId={demoModuleId} sectionId={demoSectionId} />
            <SpecVersionLinks
              siteHref={siteHref}
              css2Url={css2Url}
              css3Url={css3Url}
            />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

// ── Internal Anchor Popover (same-page section link) ──
// 颜色：紫色调，表示页内章节导航

function InternalPopover({ text, sectionId, sectionTitle, sectionSummary, keyPoints, demoModuleId, demoSectionId }: InternalLinkProps) {
  const hasRichContent = sectionSummary || (keyPoints && keyPoints.length > 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={
          hasRichContent
            ? 'text-violet-600 dark:text-violet-400 font-medium border-b-2 border-violet-400/60 hover:border-violet-500 hover:bg-violet-500/10 rounded-sm px-0.5 transition-colors cursor-pointer'
            : 'text-violet-600/80 dark:text-violet-400/80 border-b border-dotted border-violet-400/40 hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer'
        }>
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent className={`${hasRichContent ? 'w-[40rem]' : 'w-96'} p-0`} align="start">
        <ScrollArea className={hasRichContent ? 'max-h-[70vh]' : ''}>
          <div className="p-4 space-y-3">
            <div className="font-semibold text-sm text-foreground">{sectionTitle}</div>
            <SectionPreview summary={sectionSummary} keyPoints={keyPoints} />
            <InlineDemo moduleId={demoModuleId} sectionId={demoSectionId} />
            <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
              <a
                href={`#${sectionId}`}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ArrowRight className="w-3 h-3" />
                跳转到该节
              </a>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

// ── Bibref Link (clickable external reference) ──
// 颜色：低调 mono 样式，灰色下划线

function BibrefLink({ text, url }: BibrefLinkProps) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bib-ref border-b border-dotted border-muted-foreground/50 text-foreground/80 hover:text-primary text-xs font-mono transition-colors"
      >
        [{text}]
      </a>
    );
  }

  return (
    <span
      className="bib-ref border-b border-dotted border-muted-foreground/50 text-foreground/80 text-xs font-mono cursor-help"
      title={`参考: ${text}`}
    >
      [{text}]
    </span>
  );
}

// ── External Relative Link (unmapped CSS2 links → W3C) ──
// 颜色：橙色调，表示离开站内去外部

function ExternalRelativeLink({ text, url }: ExternalUrlLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-700 dark:text-amber-400 font-medium hover:text-amber-800 dark:hover:text-amber-300 border-b border-dotted border-amber-500/40 hover:border-amber-500 transition-colors"
    >
      {text}
    </a>
  );
}
