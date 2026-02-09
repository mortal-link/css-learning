'use client';

import { getDemoComponent } from './index';
import { t } from '@/lib/i18n';
import { UI } from '@/lib/strings';

/** 客户端组件：根据 moduleId + sectionId 渲染对应的 demo */
export function DemoSlot({
  moduleId,
  sectionId,
}: {
  moduleId: string;
  sectionId: string;
}) {
  const Demo = getDemoComponent(moduleId, sectionId);

  if (!Demo) {
    return (
      <div className="p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
        {t(UI.demoInProgress)}
      </div>
    );
  }

  return <Demo />;
}
