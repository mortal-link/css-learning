'use client';

interface PixelTitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export function PixelTitle({ children, level = 1, className = '' }: PixelTitleProps) {
  const sizes = {
    1: 'text-2xl md:text-3xl',
    2: 'text-xl md:text-2xl',
    3: 'text-lg md:text-xl',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag 
      className={`
        text-[#5c3d2e] 
        ${sizes[level]}
        ${className}
      `}
      style={{ 
        fontFamily: "'Press Start 2P', cursive",
        lineHeight: '1.5',
        textShadow: '3px 3px 0 rgba(139, 94, 60, 0.3)'
      }}
    >
      {children}
    </Tag>
  );
}
