'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { UI } from '@/lib/strings';

export interface TocItem {
  id: string;
  title: string;
  number?: string;
}

interface TocSidebarProps {
  items: TocItem[];
}

export function TocSidebar({ items }: TocSidebarProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    headings.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {t(UI.toc)}
      </div>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            'block text-xs py-1 pl-3 border-l-2 transition-colors leading-relaxed',
            activeId === item.id
              ? 'border-primary text-foreground font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
          )}
        >
          {item.number ? `${item.number}. ` : ''}{item.title}
        </a>
      ))}
    </nav>
  );
}
