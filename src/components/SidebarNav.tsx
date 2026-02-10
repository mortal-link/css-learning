'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { stages, getStageModules } from '@/data/modules';
import { cn } from '@/lib/utils';
import { useLocaleContext } from '@/contexts/LocaleContext';

export function SidebarNav() {
  const pathname = usePathname();
  const match = pathname.match(/\/modules\/([^/]+)/);
  const currentSlug = match ? match[1] : undefined;
  const currentLinkRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLocaleContext();

  // 自动滚动到当前模块
  useEffect(() => {
    if (currentLinkRef.current) {
      // 使用 setTimeout 确保 DOM 完全渲染后再滚动
      setTimeout(() => {
        currentLinkRef.current?.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [currentSlug]);

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
          <span>{t('ui.home')}</span>
        </Link>

        {stages.map((stage, stageIndex) => {
          const stageModules = getStageModules(stage);
          return (
            <div key={stage.id}>
              {/* 阶段标题 */}
              <div className="flex items-center gap-2 mb-2 px-2">
                <stage.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('ui.stagePrefix')} {stageIndex + 1}: {t(stage.title)}
                </span>
              </div>

              {/* 模块列表 */}
              <div className="space-y-0.5 ml-1">
                {stageModules.map((mod) => {
                  const isActive = mod.id === currentSlug;
                  const isLocked = mod.status === 'locked';
                  return (
                    <div key={mod.id}>
                      <Link
                        ref={isActive ? currentLinkRef : null}
                        href={`/modules/${mod.id}`}
                        data-current={isActive || undefined}
                        className={cn(
                          'flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors relative',
                          isActive
                            ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
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
