import type { TutorialBlock } from '@/data/modules';
import type { ReactNode } from 'react';

// ============================================================
// Inline text parser: handles `code` and **bold** only
// ============================================================

function parseInlineText(text: string): ReactNode[] {
  if (!text) return [];
  const parts: ReactNode[] = [];
  // Match `code` or **bold**
  const regex = /(`([^`]+)`)|(\*\*([^*]+)\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // `code`
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">
          {match[2]}
        </code>
      );
    } else if (match[3]) {
      // **bold**
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[4]}
        </strong>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// ============================================================
// Block renderers
// ============================================================

function HeadingBlock({ text }: { text: string }) {
  return <h4 className="text-base font-semibold mt-6 mb-2">{parseInlineText(text || '')}</h4>;
}

function ParagraphBlock({ text }: { text: string }) {
  return <p className="text-sm leading-relaxed text-muted-foreground">{parseInlineText(text || '')}</p>;
}

function CodeBlock({ code, caption }: { code: string; lang: string; caption?: string }) {
  return (
    <div className="my-3">
      <pre className="rounded-lg bg-muted/50 border p-4 overflow-x-auto text-xs font-mono leading-relaxed">
        <code>{code || ''}</code>
      </pre>
      {caption && (
        <p className="text-xs text-muted-foreground mt-1.5 italic">{parseInlineText(caption)}</p>
      )}
    </div>
  );
}

function TipBlock({ text }: { text: string }) {
  return (
    <div className="my-3 rounded-lg border-l-4 border-green-500/70 bg-green-500/5 p-4">
      <div className="flex gap-2">
        <span className="shrink-0 text-sm">💡</span>
        <p className="text-sm leading-relaxed text-muted-foreground">{parseInlineText(text || '')}</p>
      </div>
    </div>
  );
}

function WarningBlock({ text }: { text: string }) {
  return (
    <div className="my-3 rounded-lg border-l-4 border-amber-500/70 bg-amber-500/5 p-4">
      <div className="flex gap-2">
        <span className="shrink-0 text-sm">⚠️</span>
        <p className="text-sm leading-relaxed text-muted-foreground">{parseInlineText(text || '')}</p>
      </div>
    </div>
  );
}

function ExampleBlock({ title, code, explanation }: { title: string; code: string; lang?: string; explanation: string }) {
  return (
    <div className="my-3 rounded-lg border bg-card overflow-hidden">
      <div className="px-4 py-2.5 border-b bg-muted/30">
        <span className="text-sm font-medium">{parseInlineText(title || '')}</span>
      </div>
      <div className="p-4 space-y-3">
        <pre className="rounded-lg bg-muted/50 border p-4 overflow-x-auto text-xs font-mono leading-relaxed">
          <code>{code || ''}</code>
        </pre>
        <p className="text-sm leading-relaxed text-muted-foreground">{parseInlineText(explanation || '')}</p>
      </div>
    </div>
  );
}

function ListBlock({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  const safeItems = items || [];
  return (
    <Tag className={`my-2 space-y-1.5 text-sm text-muted-foreground ${ordered ? 'list-decimal' : 'list-none'} pl-0`}>
      {safeItems.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          {ordered ? (
            <span className="text-primary font-medium shrink-0">{i + 1}.</span>
          ) : (
            <span className="text-primary mt-1 shrink-0">•</span>
          )}
          <span className="leading-relaxed">{parseInlineText(item)}</span>
        </li>
      ))}
    </Tag>
  );
}

// ============================================================
// Main renderer
// ============================================================

export function TutorialRenderer({ blocks }: { blocks: TutorialBlock[] }) {
  return (
    <div className="space-y-1">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return <HeadingBlock key={i} text={block.text} />;
          case 'paragraph':
            return <ParagraphBlock key={i} text={block.text} />;
          case 'code':
            return <CodeBlock key={i} code={block.code} lang={block.lang} caption={block.caption} />;
          case 'tip':
            return <TipBlock key={i} text={block.text} />;
          case 'warning':
            return <WarningBlock key={i} text={block.text} />;
          case 'example':
            return <ExampleBlock key={i} title={block.title} code={block.code} lang={block.lang} explanation={block.explanation} />;
          case 'list':
            return <ListBlock key={i} items={block.items} ordered={block.ordered} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
