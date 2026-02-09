import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Lightbulb,
  Code,
  FileText,
  Lock,
} from 'lucide-react';
import { getModule, getAllModuleSlugs, getAdjacentModules, getCSS2SpecNames, CSS2_CHAPTER_MAP } from '@/data/modules';
import { getSpecContent, getCSS2SectionList } from '@/lib/specs';
import { DemoSlot } from '@/components/demos/DemoSlot';
import { hasDemo } from '@/components/demos/has-demo';
import { SpecContent } from '@/components/SpecContent';
import { SidebarNav } from '@/components/SidebarNav';
import { TocSidebar } from '@/components/TocSidebar';
import type { TocItem } from '@/components/TocSidebar';
import { BookMarked } from 'lucide-react';
import { t } from '@/lib/i18n';
import { UI } from '@/lib/strings';
import type { CSS2Section } from '@/lib/specs';

export function generateStaticParams() {
  return getAllModuleSlugs().map((slug) => ({ slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModule(slug);

  if (!mod) {
    notFound();
  }

  const { prev, next } = getAdjacentModules(slug);
  const totalModules = getAllModuleSlugs().length;
  const hasSections = mod.sections.length > 0;

  // 加载关联规范的原文内容（CSS3）
  const specContents = mod.specs
    .map((specName) => ({ specName, content: getSpecContent(specName) }))
    .filter((s) => s.content !== null);

  // 加载关联的 CSS2 原文内容
  const css2SpecNames = getCSS2SpecNames(mod);
  const css2Contents = css2SpecNames
    .map((specName) => ({ specName, content: getSpecContent(specName) }))
    .filter((s) => s.content !== null);

  // 当没有人工整理的 sections 时，用 CSS2 原文子章节作为 fallback
  const css2Sections: CSS2Section[] = !hasSections ? getCSS2SectionList(css2SpecNames) : [];

  // Build TOC items
  const tocItems: TocItem[] = hasSections
    ? mod.sections.map((s) => ({ id: s.id, title: t(s.title, 'en'), number: s.number }))
    : css2Sections.map((s) => ({ id: s.id, title: s.heading }));

  return (
    <div className="mx-auto max-w-[90rem] xl:grid xl:grid-cols-[16rem_1fr_14rem] xl:gap-6 px-6">
      {/* Left Sidebar — chapter navigation (desktop only) */}
      <aside className="hidden xl:block">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r">
          <SidebarNav />
        </div>
      </aside>

      {/* Center — main content */}
      <article className="min-w-0 max-w-4xl mx-auto w-full py-10">
      <div className="space-y-8">
        {/* Module Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline">Chapter {String(mod.number).padStart(2, '0')} / {totalModules}</Badge>
            {mod.status === 'current' && <Badge>{t(UI.currentlyLearning)}</Badge>}
            {mod.status === 'completed' && <Badge variant="secondary">{t(UI.completed)}</Badge>}
            {mod.status === 'locked' && (
              <Badge variant="secondary">
                <Lock className="w-3 h-3 mr-1" />
                {t(UI.comingSoon)}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{t(mod.title, 'en')}</h1>
          <p className="text-lg text-muted-foreground">
            {t(mod.title)} — {mod.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {mod.specs.map((spec) => (
              <Badge key={spec} variant="secondary">
                <FileText className="w-3 h-3 mr-1" />
                {spec}
              </Badge>
            ))}
            <a
              href={mod.specUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(UI.viewCss3Spec)} <ExternalLink className="w-3 h-3" />
            </a>
            {mod.css2Chapters?.map((ch) => {
              const info = CSS2_CHAPTER_MAP[ch];
              if (!info) return null;
              return (
                <a
                  key={ch}
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  CSS2 Ch.{ch} <ExternalLink className="w-3 h-3" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Key Concept */}
        {mod.keyConcept && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                {mod.keyConcept.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mod.keyConcept.content}</p>
            </CardContent>
          </Card>
        )}

        {/* CSS2 Sections Fallback — 无人工 sections 但有 CSS2 原文时展示 */}
        {!hasSections && css2Sections.length > 0 && (
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookMarked className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">{t(UI.css2SectionsTitle)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t(UI.css2SectionsDesc)}</p>
              </CardContent>
            </Card>
            {css2Sections.map((sec) => (
              <Card key={sec.id} id={sec.id} className="scroll-mt-20">
                <CardHeader>
                  <CardTitle className="text-lg">{sec.heading}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpecContent content={sec.content} moduleId={mod.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Locked Placeholder — 无 sections 也无 CSS2 原文 */}
        {!hasSections && css2Sections.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <Lock className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">{t(UI.contentDeveloping)}</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t(UI.contentDevDescription)}
              </p>
              <Button asChild className="mt-6">
                <Link href="/modules/cascade">
                  {t(UI.goToCascade)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sections */}
        {hasSections && (
          <div className="space-y-6">
            {mod.sections.map((section) => (
              <Card key={section.id} id={section.id} className="scroll-mt-20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {section.number}
                      </span>
                      <div>
                        <CardTitle className="text-lg">{t(section.title, 'en')}</CardTitle>
                        <CardDescription>{t(section.title)}</CardDescription>
                      </div>
                    </div>
                    <a
                      href={`${mod.specUrl}#${section.specId || section.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="查看规范原文"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{section.summary}</p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="key-points" className="border-none">
                      <AccordionTrigger className="py-2 text-sm hover:no-underline">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {t(UI.keyPointsSummary)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {section.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    {hasDemo(mod.id, section.id) && (
                      <AccordionItem value="demo" className="border-none">
                        <AccordionTrigger className="py-2 text-sm hover:no-underline">
                          <span className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            {t(UI.interactiveDemo)}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <DemoSlot moduleId={mod.id} sectionId={section.id} />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  {/* 规范原文区域 — Tabs 平铺展示 */}
                  {(() => {
                    const css2Section = css2Contents
                      .map((s) => s.content!.sections[section.specId || section.id])
                      .find(Boolean);
                    const css3Section = specContents
                      .map((s) => s.content!.sections[section.specId || section.id])
                      .find(Boolean);

                    if (!css2Section && !css3Section) return null;

                    // 只有一个规范时直接展示，不需要 Tab 栏
                    if (css2Section && !css3Section) {
                      return (
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                            <BookMarked className="w-4 h-4" />
                            {t(UI.specTabCss2)}
                          </div>
                          <SpecContent content={css2Section.content} moduleId={mod.id} />
                        </div>
                      );
                    }
                    if (!css2Section && css3Section) {
                      return (
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            {t(UI.specTabCss3)}
                          </div>
                          <SpecContent content={css3Section.content} moduleId={mod.id} />
                        </div>
                      );
                    }

                    // 两个规范都有 → Tabs 切换
                    return (
                      <div className="border-t pt-4">
                        <Tabs defaultValue="css2">
                          <TabsList className="h-8">
                            <TabsTrigger value="css2" className="text-xs gap-1.5">
                              <BookMarked className="w-3.5 h-3.5" />
                              {t(UI.specTabCss2)}
                            </TabsTrigger>
                            <TabsTrigger value="css3" className="text-xs gap-1.5">
                              <FileText className="w-3.5 h-3.5" />
                              {t(UI.specTabCss3)}
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="css2" className="mt-3">
                            <SpecContent content={css2Section!.content} moduleId={mod.id} />
                          </TabsContent>
                          <TabsContent value="css3" className="mt-3">
                            <SpecContent content={css3Section!.content} moduleId={mod.id} />
                          </TabsContent>
                        </Tabs>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t">
          {prev ? (
            <Button variant="ghost" asChild>
              <Link href={`/modules/${prev.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t(prev.title)}
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button asChild>
              <Link href={`/modules/${next.id}`}>
                {t(next.title)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div className="text-sm text-muted-foreground">{t(UI.isLastChapter)}</div>
          )}
        </div>
      </div>
      </article>

      {/* Right Sidebar — table of contents (desktop only) */}
      <aside className="hidden xl:block">
        <div className="sticky top-14 pt-10">
          <TocSidebar items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
