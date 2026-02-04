'use client';

import Link from 'next/link';

interface ModuleCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  status: 'completed' | 'current' | 'locked';
  specCount?: number;
}

export function ModuleCard({ 
  number, 
  title, 
  subtitle, 
  description, 
  href, 
  status,
  specCount = 0
}: ModuleCardProps) {
  const statusStyles = {
    completed: {
      border: 'border-[#5a8f4a]',
      bg: 'bg-[#e8f5e0]',
      badge: 'bg-[#5a8f4a]',
      badgeText: 'DONE',
      icon: '✓',
    },
    current: {
      border: 'border-[#ffd700]',
      bg: 'bg-[#fff8e7]',
      badge: 'bg-[#f4a460]',
      badgeText: 'NOW',
      icon: '▶',
    },
    locked: {
      border: 'border-[#8b5e3c]',
      bg: 'bg-[#e8dcc4]',
      badge: 'bg-[#999]',
      badgeText: 'SOON',
      icon: '○',
    },
  };

  const style = statusStyles[status];
  const isClickable = status !== 'locked';

  const content = (
    <div 
      className={`
        ${style.bg} ${style.border}
        border-4 p-6
        transition-all duration-150
        ${isClickable ? 'hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_rgba(92,61,46,0.8)] cursor-pointer' : 'opacity-70 cursor-not-allowed'}
      `}
      style={{
        boxShadow: isClickable 
          ? `6px 6px 0 0 rgba(92, 61, 46, 0.8), inset -3px -3px 0 0 rgba(0,0,0,0.05), inset 3px 3px 0 0 rgba(255,255,255,0.5)`
          : `4px 4px 0 0 rgba(92, 61, 46, 0.4)`
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span 
            className="w-10 h-10 flex items-center justify-center text-xl border-4 border-[#8b5e3c] bg-[#f5f0e1]"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.9rem' }}
          >
            {style.icon}
          </span>
          <div>
            <span 
              className="text-[#8b5e3c] text-sm block"
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem' }}
            >
              MODULE {number}
            </span>
            <h3 
              className="text-[#5c3d2e] mt-1"
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.85rem', lineHeight: '1.4' }}
            >
              {title}
            </h3>
          </div>
        </div>
        <span 
          className={`${style.badge} text-white px-3 py-1`}
          style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}
        >
          {style.badgeText}
        </span>
      </div>

      {/* Subtitle */}
      <p 
        className="text-[#5c3d2e] text-lg mb-2"
        style={{ fontFamily: "'VT323', monospace" }}
      >
        {subtitle}
      </p>

      {/* Description */}
      <p 
        className="text-[#8b5e3c] text-base leading-relaxed"
        style={{ fontFamily: "'VT323', monospace" }}
      >
        {description}
      </p>

      {/* Footer */}
      {specCount > 0 && (
        <div 
          className="mt-4 pt-4 border-t-2 border-dashed border-[#8b5e3c]/30 text-[#8b5e3c]"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          📜 {specCount} 个规范文档
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
