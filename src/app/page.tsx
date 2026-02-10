'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  ArrowRight,
  BookOpen,
  Layers,
  Check,
  Play,
} from 'lucide-react';
import { stages, getStageModules, getStats, modules } from '@/data/modules';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useProgress } from '@/hooks/useProgress';
import { hasDemo } from '@/components/demos/has-demo';

export default function Home() {
  const { totalSpecs, totalModules } = getStats();
  const { progress, isCompleted, completedCount } = useProgress();
  const { t } = useLocaleContext();

  const stats = [
    { label: t('ui.specDocs'), value: String(totalSpecs), icon: FileText },
    { label: t('ui.learningChapters'), value: String(totalModules), icon: BookOpen },
    { label: t('ui.learningStages'), value: String(stages.length), icon: Layers },
  ];

  // Get module name for continue learning button
  const lastVisitedModule = progress.lastVisitedModule
    ? modules[progress.lastVisitedModule]
    : null;

  // Count demos for a module
  const countDemos = (moduleId: string): number => {
    const module = modules[moduleId];
    if (!module) return 0;
    return module.sections.filter((section) => hasDemo(moduleId, section.id)).length;
  };

  return (
    <div>
      {/* Hero */}
      <section className="px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            {t('ui.heroBadge')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t('ui.heroTitle1')}
            <br />
            <span className="text-primary">{t('ui.heroTitle2')}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('ui.heroDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {lastVisitedModule ? (
              <Button asChild size="lg">
                <Link href={`/modules/${lastVisitedModule.id}`}>
                  <Play className="mr-2 h-4 w-4" />
                  {t('ui.continueLearning')}: {t(lastVisitedModule.title)}
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href="/modules/intro">
                  {t('ui.startLearning')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          {completedCount > 0 && (
            <div className="mt-6 text-sm text-muted-foreground">
              {t('ui.completedProgress')} {completedCount}/{totalModules} {t('ui.modules')}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Learning Path */}
      <section className="mx-auto max-w-screen-xl px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('ui.learningPath')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('ui.learningPathDesc')}
          </p>
        </div>

        <div className="space-y-12">
          {stages.map((stage, stageIndex) => {
            const stageModules = getStageModules(stage);

            return (
              <div key={stage.id}>
                {/* Stage Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stage.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {t('ui.stagePrefix')} {stageIndex + 1}: {t(stage.title)}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t(stage.description)}</p>
                  </div>
                </div>

                {/* Module Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-[52px]">
                  {stageModules.map((mod) => {
                    const isLocked = mod.status === 'locked';
                    const isCurrent = mod.status === 'current';
                    const isUserCompleted = isCompleted(mod.id);
                    const isLastVisited = progress.lastVisitedModule === mod.id;
                    const sectionCount = mod.sections.length;
                    const demoCount = countDemos(mod.id);

                    return (
                      <Card
                        key={mod.id}
                        className={`group transition-all relative ${
                          isLocked
                            ? 'opacity-60 cursor-not-allowed'
                            : 'hover:shadow-md hover:border-primary/50 cursor-pointer'
                        } ${isCurrent ? 'border-primary ring-1 ring-primary/20' : ''}`}
                      >
                        {isLocked ? (
                          <div className="p-6">
                            <CardHeader className="p-0 mb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{t(mod.title, 'en')}</CardTitle>
                                <Badge variant="secondary" className="text-xs">{t('ui.comingSoon')}</Badge>
                              </div>
                              <CardDescription>{t(mod.title)}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                              <div className="text-xs text-muted-foreground">
                                {sectionCount} {t('ui.sections')} · {demoCount} {t('ui.demos')}
                              </div>
                            </CardContent>
                          </div>
                        ) : (
                          <Link href={`/modules/${mod.id}`}>
                            <div className="p-6">
                              <CardHeader className="p-0 mb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                                    {t(mod.title, 'en')}
                                  </CardTitle>
                                  <div className="flex items-center gap-2">
                                    {isUserCompleted && (
                                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-primary" />
                                      </div>
                                    )}
                                    {isLastVisited && !isUserCompleted && (
                                      <Badge variant="outline" className="text-xs">{t('ui.lastVisited')}</Badge>
                                    )}
                                    {isCurrent && <Badge>{t('ui.current')}</Badge>}
                                    {mod.status === 'completed' && <Badge variant="secondary">{t('ui.completed')}</Badge>}
                                  </div>
                                </div>
                                <CardDescription>{t(mod.title)}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-0">
                                <div className="text-xs text-muted-foreground flex items-center justify-between">
                                  <span>{sectionCount} {t('ui.sections')} · {demoCount} {t('ui.demos')}</span>
                                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </CardContent>
                            </div>
                          </Link>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('ui.readyToStart')}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('ui.ctaDescription')}
          </p>
          <Button asChild size="lg">
            <Link href="/modules/intro">
              {t('ui.startChapter1')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t('ui.footerText')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.w3.org/Style/CSS/"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              W3C CSS
            </Link>
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              MDN
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
