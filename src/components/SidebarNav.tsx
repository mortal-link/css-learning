'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { stages, getStageModules } from '@/data/modules';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { UI } from '@/lib/strings';

export function SidebarNav() {
  const pathname = usePathname();
  const match = pathname.match(/\/modules\/([^/]+)/);
  const currentSlug = match ? match[1] : undefined;

  return (
    <ScrollArea className="h-full">
      <nav className="p-4 space-y-6">
        {/* 首页链接 */}
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors',
            !currentSlug && pathname === '/'
              ? 'bg-accent text-accent-foreground font-medium'
              : 'hover:bg-accent/50'
          )}
        >
          <span className="text-xs text-muted-foreground w-6">🏠</span>
          <span>{t(UI.home)}</span>
        </Link>

        {stages.map((stage, stageIndex) => {
          const stageModules = getStageModules(stage);
          return (
            <div key={stage.id}>
              {/* 阶段标题 */}
              <div className="flex items-center gap-2 mb-2 px-2">
                <stage.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(UI.stagePrefix)} {stageIndex + 1}: {t(stage.title)}
                </span>
              </div>

              {/* 章节列表 */}
              <div className="space-y-0.5 ml-1">
                {stageModules.map((mod) => {
                  const isActive = mod.id === currentSlug;
                  const isLocked = mod.status === 'locked';
                  return (
                    <div key={mod.id}>
                      <Link
                        href={`/modules/${mod.id}`}
                        className={cn(
                          'flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors',
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'hover:bg-accent/50',
                          isLocked && !isActive && 'opacity-50'
                        )}
                      >
                        <span className="text-xs text-muted-foreground w-6 text-right flex-shrink-0">
                          {String(mod.number).padStart(2, '0')}
                        </span>
                        <span className="truncate">{t(mod.title)}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
