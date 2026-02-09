'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

// ============================================================
// CSS 选择器匹配器 Demo
// ============================================================

const DEFAULT_HTML = `<div class="container">
  <h1 id="title">Hello World</h1>
  <p class="intro">First paragraph</p>
  <ul>
    <li class="active">Item 1</li>
    <li>Item 2</li>
    <li class="active">Item 3</li>
  </ul>
  <p>Second paragraph</p>
</div>`;

const DEFAULT_SELECTOR = '.active';

interface TreeNode {
  tag: string;
  attrs: Record<string, string>;
  children: TreeNode[];
  text?: string;
  matched: boolean;
}

function parseHTML(html: string): TreeNode | null {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  const firstChild = container.firstElementChild;
  if (!firstChild) return null;

  function buildTree(element: Element): TreeNode {
    const attrs: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      attrs[attr.name] = attr.value;
    }

    const children: TreeNode[] = [];
    let hasText = false;

    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];
      if (child.nodeType === Node.ELEMENT_NODE) {
        children.push(buildTree(child as Element));
      } else if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
        hasText = true;
      }
    }

    return {
      tag: element.tagName.toLowerCase(),
      attrs,
      children,
      text: hasText ? element.textContent?.trim() : undefined,
      matched: false,
    };
  }

  return buildTree(firstChild);
}

function markMatches(tree: TreeNode | null, matchedElements: Element[]): void {
  if (!tree) return;

  const container = document.createElement('div');

  function rebuildElement(node: TreeNode): Element {
    const el = document.createElement(node.tag);
    Object.entries(node.attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    node.children.forEach((child) => {
      el.appendChild(rebuildElement(child));
    });
    if (node.text) {
      el.textContent = node.text;
    }
    return el;
  }

  function mark(node: TreeNode, element: Element): void {
    node.matched = matchedElements.includes(element);
    const childElements = Array.from(element.children);
    node.children.forEach((child, i) => {
      if (childElements[i]) {
        mark(child, childElements[i]);
      }
    });
  }

  const rebuilt = rebuildElement(tree);
  container.appendChild(rebuilt);
  mark(tree, rebuilt);
}

function TreeView({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const indent = level * 16;
  const hasChildren = node.children.length > 0;

  const attrString = Object.entries(node.attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return (
    <div className="font-mono text-sm">
      <div
        className={`py-0.5 px-2 rounded transition-colors ${
          node.matched
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-muted-foreground'
        }`}
        style={{ paddingLeft: `${indent + 8}px` }}
      >
        <span className="text-blue-600 dark:text-blue-400">&lt;{node.tag}</span>
        {attrString && (
          <span className="text-amber-600 dark:text-amber-400"> {attrString}</span>
        )}
        <span className="text-blue-600 dark:text-blue-400">&gt;</span>
        {node.text && !hasChildren && (
          <span className="text-foreground ml-1">{node.text}</span>
        )}
      </div>
      {hasChildren && (
        <div>
          {node.children.map((child, i) => (
            <TreeView key={i} node={child} level={level + 1} />
          ))}
        </div>
      )}
      {hasChildren && (
        <div
          className="py-0.5 px-2 text-muted-foreground"
          style={{ paddingLeft: `${indent + 8}px` }}
        >
          <span className="text-blue-600 dark:text-blue-400">&lt;/{node.tag}&gt;</span>
        </div>
      )}
    </div>
  );
}

const examples = [
  { selector: '*', label: '全部' },
  { selector: 'li', label: '类型' },
  { selector: '.active', label: '类' },
  { selector: '#title', label: 'ID' },
  { selector: 'ul > li', label: '子代' },
  { selector: 'h1 + p', label: '相邻' },
  { selector: 'h1 ~ p', label: '兄弟' },
  { selector: '.container p', label: '后代' },
  { selector: 'li:first-child', label: '伪类' },
  { selector: 'p.intro', label: '复合' },
];

export function SelectorMatcher() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [selector, setSelector] = useState(DEFAULT_SELECTOR);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [matchCount, setMatchCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateMatches = useCallback(() => {
    try {
      setError(null);
      const parsedTree = parseHTML(html);

      if (!parsedTree) {
        setTree(null);
        setMatchCount(0);
        return;
      }

      if (!containerRef.current) return;

      // Create a temporary container to query
      const tempContainer = document.createElement('div');

      function rebuildElement(node: TreeNode): Element {
        const el = document.createElement(node.tag);
        Object.entries(node.attrs).forEach(([key, value]) => {
          el.setAttribute(key, value);
        });
        node.children.forEach((child) => {
          el.appendChild(rebuildElement(child));
        });
        if (node.text) {
          el.textContent = node.text;
        }
        return el;
      }

      tempContainer.appendChild(rebuildElement(parsedTree));

      let matched: Element[] = [];
      if (selector.trim()) {
        try {
          matched = Array.from(tempContainer.querySelectorAll(selector));
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Invalid selector');
          setTree(parsedTree);
          setMatchCount(0);
          return;
        }
      }

      markMatches(parsedTree, matched);
      setTree(parsedTree);
      setMatchCount(matched.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Parse error');
      setTree(null);
      setMatchCount(0);
    }
  }, [html, selector]);

  useEffect(() => {
    updateMatches();
  }, [updateMatches]);

  return (
    <div className="space-y-4">
      {/* HTML Input */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">HTML 片段</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="输入 HTML..."
          rows={8}
          className="w-full px-3 py-2 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
      </div>

      {/* Selector Input */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">CSS 选择器</label>
        <input
          type="text"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          placeholder="例如：.active, ul > li, h1 + p"
          className="w-full px-3 py-2 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Match Result */}
      <div className="flex items-center gap-2">
        <Badge variant={error ? 'destructive' : 'default'} className="text-sm">
          {error ? `错误: ${error}` : `匹配到 ${matchCount} 个元素`}
        </Badge>
      </div>

      {/* Tree Visualization */}
      {tree && (
        <div className="bg-muted/50 rounded-lg p-3 overflow-x-auto">
          <p className="text-xs font-medium mb-2 text-muted-foreground">DOM 树（高亮 = 匹配）</p>
          <div ref={containerRef}>
            <TreeView node={tree} />
          </div>
        </div>
      )}

      {/* Examples */}
      <div>
        <p className="text-xs font-medium mb-2 text-muted-foreground">快速尝试</p>
        <div className="flex flex-wrap gap-1.5">
          {examples.map((ex) => (
            <button
              key={ex.selector}
              onClick={() => setSelector(ex.selector)}
              className="px-2 py-1 text-xs rounded-md border bg-background hover:bg-accent transition-colors font-mono"
            >
              {ex.selector}
              <span className="text-muted-foreground ml-1 font-sans">({ex.label})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
