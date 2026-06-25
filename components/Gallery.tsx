'use client';

import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, GALLERY_ITEMS } from '@/lib/translations';
import type { GalleryCategory, GalleryItem } from '@/types';
import { ZoomIn, X } from 'lucide-react';

const FILTERS: { key: GalleryCategory; labelKey: keyof typeof t.gallery }[] = [
  { key: 'all',        labelKey: 'filterAll' },
  { key: 'hydraulic',  labelKey: 'f1' },
  { key: 'tractor',    labelKey: 'f2' },
  { key: 'water',      labelKey: 'f3' },
  { key: 'agri',       labelKey: 'f4' },
  { key: 'fabrication',labelKey: 'f5' },
];

export default function Gallery() {
  const { tx } = useLanguage();
  const [activeFilter, setFilter] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox]   = useState<GalleryItem | null>(null);
  const headerRef = useScrollReveal();

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === activeFilter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="scroll-reveal text-center mb-10">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.gallery.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.gallery.title)}{' '}
            <span className="text-primary">{tx(t.gallery.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-rajdhani border-2 transition-all duration-200 ${
                activeFilter === key
                  ? 'bg-gradient-primary text-white border-transparent shadow-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {tx(t.gallery[labelKey])}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <GalleryCard key={item.id} item={item} delay={`${(i % 4) * 60}ms`} onOpen={setLightbox} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9990] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-lg w-full animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Image area */}
            <div
              className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${lightbox.gradient}
                flex items-center justify-center`}
            >
              <span className="text-7xl drop-shadow-2xl">{lightbox.icon}</span>
            </div>

            {/* Caption */}
            <p className="text-center text-white/80 mt-4 font-semibold font-rajdhani text-lg">
              {tx(lightbox.label)}
            </p>

            <p className="text-center text-white/40 text-xs mt-1">
              Piyush Agro Industries · Rajnandgaon, Chhattisgarh
            </p>
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
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
        <span className="text-5xl drop-shadow group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </span>
      </div>

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
