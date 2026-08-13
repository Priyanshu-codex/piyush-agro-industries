'use client';

import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, GALLERY_ITEMS } from '@/constants/translations';
import type { GalleryCategory, GalleryItem } from '@/types';
import { ZoomIn, X } from 'lucide-react';

import { ProductImage } from '@/components/ui/ProductImage';

const FILTERS: { key: GalleryCategory; labelKey: keyof typeof t.gallery }[] = [
  { key: 'all',        labelKey: 'filterAll' },
  { key: 'hydraulic',  labelKey: 'f1' },
  { key: 'tractor',    labelKey: 'f2' },
  { key: 'water',      labelKey: 'f3' },
  { key: 'agri',       labelKey: 'f4' },
  { key: 'fabrication',labelKey: 'f5' },
];

export default function Gallery() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const [activeFilter, setFilter] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox]   = useState<GalleryItem | null>(null);
  const headerRef = useScrollReveal();

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === activeFilter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="scroll-reveal text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold font-rajdhani uppercase tracking-wider mb-3">
            📷 {tx(t.gallery.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-rajdhani text-gray-900 tracking-tight">
            {tx(t.gallery.title)}{' '}
            <span className="text-primary-600">{tx(t.gallery.titleHL)}</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button suppressHydrationWarning
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-rajdhani tracking-wider uppercase transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-gradient-primary text-white shadow-primary scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tx(t.gallery[f.labelKey])}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              delay={`${(idx % 4) * 0.08}s`}
              onOpen={(i) => setLightbox(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-gray-900 rounded-3xl p-6 max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button suppressHydrationWarning
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-20 p-2 rounded-full bg-black/40 hover:bg-black/60"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>

            {/* Image area */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-gray-900">
              <ProductImage
                src={lightbox.imageUrl}
                alt={tx(lightbox.label)}
                fill
                priority
                fallbackIcon={lightbox.icon}
                fallbackGradient={lightbox.gradient}
              />
            </div>

            {/* Caption */}
            <p className="text-center text-white/80 mt-4 font-semibold font-rajdhani text-lg">
              {tx(lightbox.label)}
            </p>

            <div className="mt-4 text-center">
              <button suppressHydrationWarning
                onClick={() => {
                  openEnquiry(tx(lightbox.label));
                  closeLightbox();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-primary transition-all duration-200"
              >
                <span>{lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryCard({
  item,
  delay,
  onOpen,
}: {
  item: GalleryItem;
  delay: string;
  onOpen: (item: GalleryItem) => void;
}) {
  const { tx } = useLanguage();
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal group relative rounded-2xl overflow-hidden aspect-[4/3]
        cursor-pointer shadow-card"
      style={{ transitionDelay: delay }}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}
      aria-label={`View ${tx(item.label)}`}
    >
      {/* Background */}
      <ProductImage
        src={item.imageUrl}
        alt={tx(item.label)}
        fill
        fallbackIcon={item.icon}
        fallbackGradient={item.gradient}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full
        group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-semibold font-rajdhani drop-shadow">{tx(item.label)}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
        flex items-center justify-center text-white opacity-0 group-hover:opacity-100
        transition-opacity duration-300">
        <ZoomIn size={14} />
      </div>
    </div>
  );
}
