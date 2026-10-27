import React from 'react';
import Image from 'next/image';

export interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon' | 'primary';
  mode?: 'light' | 'dark' | 'monochrome';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function PiyushAgroLogo({
  variant = 'horizontal',
  mode = 'light',
  className = '',
  showTagline = false,
  size = 'md',
}: LogoProps) {
  // Dimension mapping for emblem icon image
  const iconHeights = {
    sm: 'max-h-6 sm:max-h-8 w-auto',
    md: 'max-h-7 xs:max-h-8 sm:max-h-9 md:max-h-10 w-auto',
    lg: 'max-h-10 sm:max-h-12 w-auto',
    xl: 'max-h-14 sm:max-h-20 w-auto',
  }[size];

  const EmblemIcon = (
    <div className="inline-flex items-center justify-center shrink-0">
      <Image
        src="/branding/logo.png"
        alt="PA Monogram"
        width={90}
        height={90}
        style={{ width: 'auto', height: 'auto' }}
        className={`object-contain shrink-0 ${iconHeights}`}
        priority
      />
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>{EmblemIcon}</div>;
  }

  const Typography = (
    <div className={`leading-none flex flex-col shrink min-w-0 ${variant === 'stacked' ? 'items-center text-center' : 'items-start'}`}>
      <span
        className={`font-extrabold font-rajdhani tracking-wider uppercase whitespace-nowrap ${
          size === 'sm' ? 'text-xs sm:text-base' : size === 'md' ? 'text-sm xs:text-base sm:text-lg lg:text-xl' : size === 'lg' ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-4xl'
        } ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}
      >
        PIYUSH AGRO
      </span>
      <span
        className={`font-semibold font-rajdhani tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap ${
          size === 'sm' ? 'text-[7.5px] sm:text-[9px]' : size === 'md' ? 'text-[8px] xs:text-[9px] sm:text-[10px]' : size === 'lg' ? 'text-[10px] sm:text-[12px]' : 'text-[12px] sm:text-[15px]'
        } ${mode === 'dark' ? 'text-emerald-400' : 'text-emerald-700'} mt-0.5`}
      >
        INDUSTRIES
      </span>
      {showTagline && (
        <span
          className={`font-medium font-noto tracking-wider uppercase whitespace-nowrap text-slate-400 ${
            size === 'sm' ? 'text-[7.5px] sm:text-[8px]' : size === 'md' ? 'text-[8.5px] sm:text-[9.5px]' : size === 'lg' ? 'text-[10px] sm:text-[11px]' : 'text-[12px] sm:text-[13px]'
          } mt-1 border-t border-slate-200/20 pt-0.5`}
        >
          INNOVATING AGRICULTURE, ENRICHING FUTURE
        </span>
      )}
    </div>
  );

  if (variant === 'stacked' || variant === 'primary') {
    return (
      <div className={`inline-flex flex-col items-center gap-2 shrink min-w-0 ${className}`}>
        {EmblemIcon}
        {Typography}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 shrink min-w-0 ${className}`}>
      {EmblemIcon}
      {Typography}
    </div>
  );
}
