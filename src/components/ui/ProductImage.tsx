'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { normalizeImageUrl } from '@/utils/imageUtils';

interface ProductImageProps {
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  fallbackIcon?: string;
  fallbackGradient?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export function ProductImage({
  src,
  alt = '',
  className = '',
  imageClassName = '',
  fallbackIcon = '🚜',
  fallbackGradient = 'from-primary-700 to-primary-900',
  fill = false,
  objectFit = 'contain',
  objectPosition = 'object-center',
}: ProductImageProps) {
  const [imageError, setImageError] = React.useState(false);
  const normalizedSrc = normalizeImageUrl(src);

  React.useEffect(() => {
    setImageError(false);
  }, [normalizedSrc]);

  if (normalizedSrc && !imageError) {
    const isCover = objectFit === 'cover';
    return (
      <div
        suppressHydrationWarning
        className={`${fill ? 'absolute inset-0 w-full h-full' : 'relative w-full h-full min-h-[160px]'} ${isCover ? 'bg-transparent' : 'bg-slate-50'} flex items-center justify-center overflow-hidden ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={normalizedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className={`w-full h-full ${isCover ? 'object-cover p-0' : 'object-contain p-2'} ${objectPosition} transition-transform duration-500 ease-out group-hover:scale-105 ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      className={`${fill ? 'absolute inset-0 w-full h-full' : 'relative w-full h-full min-h-[160px]'} flex items-center justify-center bg-gradient-to-br ${fallbackGradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />
      <Package size={48} className="text-white/60 relative z-10" />
    </div>
  );
}
