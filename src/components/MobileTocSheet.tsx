'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { List } from 'lucide-react';
import { useLocaleContext } from '@/contexts/LocaleContext';
import type { TocItem } from '@/components/TocSidebar';

interface MobileTocSheetProps {
  items: TocItem[];
}

export function MobileTocSheet({ items }: MobileTocSheetProps) {
  const { t } = useLocaleContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="xl:hidden fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg z-40"
          aria-label={t('ui.toc')}
        >
          <List className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>{t('ui.toc')}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 overflow-y-auto">
          <nav className="space-y-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm py-2 px-3 rounded-md hover:bg-accent transition-colors"
                onClick={() => {
                  const element = document.getElementById(item.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.number ? `${item.number}. ` : ''}{item.title}
              </a>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
