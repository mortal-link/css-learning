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
import { getModule, getAllModuleSlugs, getAdjacentModules, getCSS2SpecNames, CSS2_CHAPTER_MAP, stages } from '@/data/modules';
import { getSpecContent, getCSS2SectionList } from '@/lib/specs';
import { DemoSlot } from '@/components/demos/DemoSlot';
import { hasDemo } from '@/components/demos/has-demo';
import { SpecContent } from '@/components/SpecContent';
import { TutorialRenderer } from '@/components/TutorialRenderer';
import { SidebarNav } from '@/components/SidebarNav';
import { TocSidebar } from '@/components/TocSidebar';
import { MobileTocSheet } from '@/components/MobileTocSheet';
import type { TocItem } from '@/components/TocSidebar';
import { BookMarked } from 'lucide-react';
import { t } from '@/lib/i18n';
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
  const hasSections = (mod.sections || []).length > 0;

  // 加载关联规范的原文内容（CSS3）
  const specContents = (mod.specs || [])
    .map((specName) => ({ specName, content: getSpecContent(specName) }))
    .filter((s) => s.content !== null);

  // 加载关联的 CSS2 原文内容
  const css2SpecNames = getCSS2SpecNames(mod);
  const css2Contents = (css2SpecNames || [])
    .map((specName) => ({ specName, content: getSpecContent(specName) }))
    .filter((s) => s.content !== null);

  // 当没有人工整理的 sections 时，用 CSS2 原文子节作为 fallback
  const css2Sections: CSS2Section[] = !hasSections ? getCSS2SectionList(css2SpecNames) : [];

  // Build TOC items
  const tocItems: TocItem[] = hasSections
    ? (mod.sections || []).map((s) => ({ id: s.id, title: t(s.title, 'en'), number: s.number }))
    : (css2Sections || []).map((s) => ({ id: s.id, title: s.heading }));

  // Find the stage for breadcrumb
  const stage = stages.find((s) => s.moduleIds.includes(mod.id));

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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t('ui.home')}
              </Link>
            </li>
            {stage && (
              <>
                <li>/</li>
                <li>
                  <span className="hover:text-foreground transition-colors">
                    {t('ui.stagePrefix')} {stages.indexOf(stage) + 1}: {t(stage.title)}
                  </span>
                </li>
              </>
            )}
            <li>/</li>
            <li className="text-foreground font-medium">{t(mod.title)}</li>
          </ol>
        </nav>

        {/* Module Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline">Chapter {String(mod.number).padStart(2, '0')} / {totalModules}</Badge>
            {mod.status === 'current' && <Badge>{t('ui.currentlyLearning')}</Badge>}
            {mod.status === 'completed' && <Badge variant="secondary">{t('ui.completed')}</Badge>}
            {mod.status === 'locked' && (
              <Badge variant="secondary">
                <Lock className="w-3 h-3 mr-1" />
                {t('ui.comingSoon')}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{t(mod.title, 'en')}</h1>
          <p className="text-lg text-muted-foreground">
            {t(mod.title)} — {t(mod.description)}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {(mod.specs || []).map((spec) => (
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
              {t('ui.viewCss3Spec')} <ExternalLink className="w-3 h-3" />
            </a>
            {(mod.css2Chapters || []).map((ch) => {
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
                {t(mod.keyConcept.title)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t(mod.keyConcept.content)}</p>
            </CardContent>
          </Card>
        )}

        {/* CSS2 Sections Fallback — 无人工 sections 但有 CSS2 原文时展示 */}
        {!hasSections && (css2Sections || []).length > 0 && (
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookMarked className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">{t('ui.css2SectionsTitle')}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t('ui.css2SectionsDesc')}</p>
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
        {!hasSections && (css2Sections || []).length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <Lock className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">{t('ui.contentDeveloping')}</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t('ui.contentDevDescription')}
              </p>
              <Button asChild className="mt-6">
                <Link href="/modules/cascade">
                  {t('ui.goToCascade')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sections */}
        {hasSections && (
          <div className="space-y-6">
            {(mod.sections || []).map((section) => (
              <Card key={section.id} id={section.id} className="scroll-mt-20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {section.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{t(section.title, 'en')}</CardTitle>
                          {hasDemo(mod.id, section.id) && (
                            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary px-1.5 py-0.5">
                              Demo
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{t(section.title)}</CardDescription>
                      </div>
                    </div>
                    <a
                      href={`${mod.specUrl}#${section.specId || section.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title={t('ui.viewSpec')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t(section.summary)}</p>

                  <Accordion type="multiple" className="w-full" defaultValue={hasDemo(mod.id, section.id) ? ["key-points", "demo"] : ["key-points"]}>
                    <AccordionItem value="key-points" className="border-none">
                      <AccordionTrigger className="py-2 text-sm hover:no-underline">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {section.tutorial ? t('ui.tutorialContent') : t('ui.keyPointsSummary')}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {section.tutorial ? (
                          <TutorialRenderer blocks={section.tutorial} />
                        ) : (
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {(section.keyPoints || []).map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {hasDemo(mod.id, section.id) && (
                      <AccordionItem value="demo" className="border-none">
                        <AccordionTrigger className="py-2 text-sm hover:no-underline">
                          <span className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            {t('ui.interactiveDemo')}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <DemoSlot moduleId={mod.id} sectionId={section.id} />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {/* 规范原文区域 — 默认折叠 */}
                    {(() => {
                      const css2Section = css2Contents
                        .map((s) => s.content!.sections[section.specId || section.id])
                        .find(Boolean);
                      const css3Section = specContents
                        .map((s) => s.content!.sections[section.specId || section.id])
                        .find(Boolean);

                      if (!css2Section && !css3Section) return null;

                      return (
                        <AccordionItem value="spec-text" className="border-none">
                          <AccordionTrigger className="py-2 text-sm hover:no-underline">
                            <span className="flex items-center gap-2">
                              <BookMarked className="w-4 h-4" />
                              {css2Section && css3Section
                                ? `${t('ui.specTabCss2')} / ${t('ui.specTabCss3')}`
                                : css2Section
                                  ? t('ui.specTabCss2')
                                  : t('ui.specTabCss3')}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            {css2Section && !css3Section && (
                              <SpecContent content={css2Section.content} moduleId={mod.id} />
                            )}
                            {!css2Section && css3Section && (
                              <SpecContent content={css3Section.content} moduleId={mod.id} />
                            )}
                            {css2Section && css3Section && (
                              <Tabs defaultValue="css2">
                                <TabsList className="h-8">
                                  <TabsTrigger value="css2" className="text-xs gap-1.5">
                                    <BookMarked className="w-3.5 h-3.5" />
                                    {t('ui.specTabCss2')}
                                  </TabsTrigger>
                                  <TabsTrigger value="css3" className="text-xs gap-1.5">
                                    <FileText className="w-3.5 h-3.5" />
                                    {t('ui.specTabCss3')}
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="css2" className="mt-3">
                                  <SpecContent content={css2Section.content} moduleId={mod.id} />
                                </TabsContent>
                                <TabsContent value="css3" className="mt-3">
                                  <SpecContent content={css3Section.content} moduleId={mod.id} />
                                </TabsContent>
                              </Tabs>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })()}
                  </Accordion>
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
            <div className="text-sm text-muted-foreground">{t('ui.isLastChapter')}</div>
          )}
        </div>
      </div>

      {/* Mobile TOC Button (visible only on mobile) */}
      {(tocItems || []).length > 0 && <MobileTocSheet items={tocItems} />}
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
