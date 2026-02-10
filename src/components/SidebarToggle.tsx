'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { SidebarNav } from './SidebarNav';
import { useLocaleContext } from '@/contexts/LocaleContext';

export function SidebarToggle() {
  const [open, setOpen] = useState(false);
  const { t } = useLocaleContext();

  // Sheet 打开时自动聚焦到导航区域
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const navElement = document.querySelector('[role="dialog"] nav');
        if (navElement && navElement instanceof HTMLElement) {
          navElement.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('ui.openNav')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="h-full pt-10" onClick={(e) => {
          // 点击链接时关闭 Sheet
          if ((e.target as HTMLElement).closest('a')) {
            setOpen(false);
          }
        }}>
          <SidebarNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
