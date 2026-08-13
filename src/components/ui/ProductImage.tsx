'use client';

import React from 'react';

interface ProductImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIcon?: string;
  fallbackGradient?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ProductImage({
  className = '',
  fallbackIcon = '🚜',
  fallbackGradient = 'from-primary-700 to-primary-900',
}: ProductImageProps) {
  return (
    <div
      suppressHydrationWarning
      className={`relative flex items-center justify-center bg-gradient-to-br ${fallbackGradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />
      <span className="text-4xl sm:text-5xl filter drop-shadow-md select-none relative z-10">
        {fallbackIcon}
      </span>
    </div>
  );
}
