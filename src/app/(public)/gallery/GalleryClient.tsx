'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { t, GALLERY_ITEMS } from '@/constants/translations';
import type { GalleryCategory, GalleryItem } from '@/types';
import { ProductImage } from '@/components/ui/ProductImage';
import {
  ChevronRight,
  ZoomIn,
  X,
  Camera,
  Phone,
  MessageCircle,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const CTABanner = dynamic(() => import('@/components/layout/public/CTABanner'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

const FILTERS: { key: GalleryCategory; labelKey: keyof typeof t.gallery }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'hydraulic', labelKey: 'f1' },
  { key: 'tractor', labelKey: 'f2' },
  { key: 'water', labelKey: 'f3' },
  { key: 'agri', labelKey: 'f4' },
  { key: 'fabrication', labelKey: 'f5' },
];

function GalleryContent() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const [activeFilter, setFilter] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeFilter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <main className="relative min-h-screen bg-gray-50/80">
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
        ]}
      />

      {/* ── HERO BANNER ── */}
      <section className="relative bg-gray-900 pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white/75 text-sm font-semibold mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Gallery</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-rajdhani text-white mb-6 drop-shadow-md">
            {lang === 'en' ? 'Product & Workshop Gallery' : 'उत्पाद एवं कार्यशाला गैलरी'}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            {lang === 'en'
              ? 'Real photographs of manufactured tractor trolleys, hydraulic trailers, water tankers, and custom fabrication projects in Rajnandgaon, Chhattisgarh.'
              : 'राजनांदगांव, छत्तीसगढ़ में निर्मित ट्रैक्टर ट्रॉली, हाइड्रोलिक ट्रेलर, वाटर टैंकर और कस्टम फेब्रिकेशन प्रोजेक्ट्स की वास्तविक तस्वीरें।'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-white text-primary font-bold font-rajdhani text-sm shadow-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            >
              {lang === 'en' ? 'Explore Product Catalogue' : 'उत्पाद सूची देखें'}
            </Link>
            <button suppressHydrationWarning
              onClick={() => openEnquiry(lang === 'en' ? 'General Enquiry' : 'सामान्य पूछताछ')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold font-rajdhani text-sm border border-white/20 transition-all"
            >
              {lang === 'en' ? 'Get Custom Quote' : 'कस्टम कोटेशन पाएं'}
            </button>
          </div>
        </div>
      </section>

      {/* ── GALLERY FILTER & GRID ── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              suppressHydrationWarning
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-rajdhani tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-gradient-primary text-white shadow-primary scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
              }`}
            >
              {tx(t.gallery[f.labelKey])}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => {
            const labelStr = tx(item.label);

            return (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <ProductImage
                    src={item.imageUrl}
                    alt={`${labelStr} - Piyush Agro Industries`}
                    fill
                    fallbackIcon={item.icon}
                    fallbackGradient={item.gradient}
                    className="group-hover:scale-110 transition-transform duration-500 object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg">
                      <ZoomIn size={18} />
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 flex items-center justify-between mt-auto">
                  <div>
                    <h3 className="font-bold font-rajdhani text-gray-900 text-sm group-hover:text-primary transition-colors">
                      {labelStr}
                    </h3>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs text-primary font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-gray-900 rounded-3xl p-6 max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              suppressHydrationWarning
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Image area */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-gray-950 flex items-center justify-center">
              <ProductImage
                src={lightbox.imageUrl}
                alt={tx(lightbox.label)}
                fill
                fallbackIcon={lightbox.icon}
                fallbackGradient={lightbox.gradient}
                className="object-contain"
              />
            </div>

            {/* Caption & Actions */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-primary-400 text-xs font-bold font-rajdhani uppercase tracking-wider">
                  {lightbox.category}
                </span>
                <h4 className="text-xl font-bold font-rajdhani text-white">
                  {tx(lightbox.label)}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Piyush Agro Industries • Thelkadih, Rajnandgaon, CG
                </p>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => {
                  closeLightbox();
                  openEnquiry(tx(lightbox.label));
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-xs shadow-md hover:shadow-lg transition-all text-center cursor-pointer shrink-0"
              >
                {lang === 'en' ? 'Get Quote For This' : 'इसके लिए कोटेशन पाएं'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── WORKSHOP LOCATION & FACILITIES ── */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200/80 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <Building2 size={13} /> Workshop Facility
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-rajdhani text-gray-900 mb-4">
                {lang === 'en' ? 'Visit Our Manufacturing Works' : 'हमारी निर्माण कार्यशाला पर पधारें'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {lang === 'en'
                  ? 'Our facility is located on Khairagarh Road, Thelkadih, Rajnandgaon, Chhattisgarh. We invite farmers, fleet owners, and transport contractors to inspect work in progress and discuss customized orders directly.'
                  : 'हमारी इकाई खैरागढ़ रोड, ठेलकाडीह, राजनांदगांव, छत्तीसगढ़ में स्थित है। हम किसानों और परिवहन मालिकों को निर्माण कार्य का अवलोकन करने और कस्टम ऑर्डर पर चर्चा करने के लिए आमंत्रित करते हैं।'}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Piyush+Agro+Industries+Thelkadih"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold font-rajdhani text-xs hover:bg-primary-dark transition-all"
                >
                  {lang === 'en' ? 'Open in Google Maps' : 'गूगल मैप्स में देखें'}
                </a>
                <a
                  href="tel:9425245291"
                  className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold font-rajdhani text-xs hover:bg-gray-100 transition-all"
                >
                  {lang === 'en' ? 'Call: +91 9425245291' : 'कॉल करें: 9425245291'}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <div className="text-2xl mb-2">🚜</div>
                <div className="font-bold text-gray-900 text-sm">Tractor Trolleys</div>
                <div className="text-xs text-gray-500">2W, 4W & Tipping models</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <div className="text-2xl mb-2">💧</div>
                <div className="font-bold text-gray-900 text-sm">Water Tankers</div>
                <div className="text-xs text-gray-500">2000L to 5000L capacity</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <div className="text-2xl mb-2">🌾</div>
                <div className="font-bold text-gray-900 text-sm">Cultivators</div>
                <div className="text-xs text-gray-500">7 to 11 Tyne implements</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <div className="text-2xl mb-2">🔨</div>
                <div className="font-bold text-gray-900 text-sm">Custom Steelwork</div>
                <div className="text-xs text-gray-500">Gates, sheds & railings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER & FOOTER ── */}
      <CTABanner />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function GalleryClient() {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <GalleryContent />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
