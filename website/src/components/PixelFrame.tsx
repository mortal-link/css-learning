'use client';

interface PixelFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'dark';
}

export function PixelFrame({ children, className = '', variant = 'default' }: PixelFrameProps) {
  const variants = {
    default: 'bg-[#e8dcc4] border-[#8b5e3c]',
    highlight: 'bg-[#fff8e7] border-[#ffd700]',
    dark: 'bg-[#5c3d2e] border-[#8b5e3c] text-[#f5f0e1]',
  };

  return (
    <div 
      className={`
        ${variants[variant]}
        border-4 
        shadow-[6px_6px_0_0_rgba(92,61,46,0.8)]
        ${className}
      `}
      style={{
        boxShadow: `
          6px 6px 0 0 rgba(92, 61, 46, 0.8),
          inset -4px -4px 0 0 rgba(0,0,0,0.05),
          inset 4px 4px 0 0 rgba(255,255,255,0.5)
        `
      }}
    >
      {children}
    </div>
  );
}
