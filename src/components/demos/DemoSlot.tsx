'use client';

import { getDemoComponent } from './index';
import { useLocaleContext } from '@/contexts/LocaleContext';

/** 客户端组件：根据 moduleId + sectionId 渲染对应的 demo */
export function DemoSlot({
  moduleId,
  sectionId,
}: {
  moduleId: string;
  sectionId: string;
}) {
  const Demo = getDemoComponent(moduleId, sectionId);
  const { t } = useLocaleContext();

  if (!Demo) {
    return (
      <div className="p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
        {t('ui.demoInProgress')}
      </div>
    );
  }

  return <Demo />;
}
