'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t } from '@/constants/translations';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Tractor, Wrench, Droplets, Wheat, Zap, Building2, Hammer, type LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';

// Map category emoji → Lucide icon
const CAT_ICON_MAP: Record<string, LucideIcon> = {
  '🚜': Tractor,
  '🔧': Wrench,
  '💧': Droplets,
  '🌾': Wheat,
  '⚡': Zap,
  '🏗️': Building2,
  '🔨': Hammer,
};

function CatIcon({ icon, size = 13 }: { icon: string; size?: number }): ReactElement {
  const LucideComp = CAT_ICON_MAP[icon];
  if (LucideComp) return <LucideComp size={size} />;
  return <Wrench size={size} />;
}
import { useData } from '@/contexts/DataContext';
import { ProductImage } from '@/components/ui/ProductImage';
import type { Product } from '@/types';
import { getProductPrimaryImage } from '@/utils/imageUtils';

// ── Mobile Category Metadata ──────────────────────────────────────────────────

interface CategoryMeta {
  id: string;
  name: { en: string; hi: string };
  desc: { en: string; hi: string };
  icon: string;
  gradient: string;
  displayOrder: number;
}

const DEFAULT_CATEGORY_METAS: CategoryMeta[] = [
  {
    id: 'tractor',
    name: { en: 'Tractor Trailers', hi: 'ट्रैक्टर ट्रेलर' },
    desc: {
      en: 'Heavy-duty agricultural tipping and non-tipping tractor trailers designed for robust farm transportation.',
      hi: 'मजबूत कृषि परिवहन के लिए निर्मित भारी-भरकम टिपिंग और नॉन-टिपिंग ट्रैक्टर ट्रेलर।',
    },
    icon: '🚜',
    gradient: 'from-[#065F2E] to-[#0B7A3B]',
    displayOrder: 1,
  },
  {
    id: 'hydraulic',
    name: { en: 'Hydraulic Trolleys & Dumpers', hi: 'हाइड्रोलिक ट्रॉली और डम्पर' },
    desc: {
      en: 'High-performance 2-wheel and 4-wheel hydraulic lifting trolleys with heavy-duty tipping cylinders.',
      hi: 'शक्तिशाली लिफ्टिंग सिलेंडर से लैस उच्च प्रदर्शन 2-पहिया और 4-पहिया हाइड्रोलिक ट्रॉली।',
    },
    icon: '🔧',
    gradient: 'from-[#1a2f6f] to-[#243B8F]',
    displayOrder: 2,
  },
  {
    id: 'water',
    name: { en: 'Water Tanker Trailers', hi: 'वाटर टैंकर ट्रेलर' },
    desc: {
      en: 'Durable leak-proof water tankers for agricultural irrigation, construction sites, and municipal supply.',
      hi: 'कृषि सिंचाई, निर्माण स्थलों और जल आपूर्ति के लिए विश्वसनीय वाटर टैंकर ट्रेलर।',
    },
    icon: '💧',
    gradient: 'from-[#0c4a6e] to-[#0ea5e9]',
    displayOrder: 3,
  },
  {
    id: 'agri',
    name: { en: 'Agricultural Implements', hi: 'कृषि उपकरण' },
    desc: {
      en: 'High-grade cultivators, land preparation tools, and heavy farming implements for modern agriculture.',
      hi: 'आधुनिक खेती के लिए उच्च गुणवत्ता वाले कल्टीवेटर और कृषि उपकरण।',
    },
    icon: '🌾',
    gradient: 'from-[#365314] to-[#4d7c0f]',
    displayOrder: 4,
  },
  {
    id: 'generator',
    name: { en: 'Generator Trolleys', hi: 'जनरेटर ट्रॉली' },
    desc: {
      en: 'Heavy-duty mobile bases and protective trolleys for silent and standard generator sets.',
      hi: 'जनरेटर सेटों के लिए मजबूत मोबाइल बेस और सुरक्षित परिवहन ट्रॉली।',
    },
    icon: '⚡',
    gradient: 'from-[#78350f] to-[#92400e]',
    displayOrder: 5,
  },
  {
    id: 'material',
    name: { en: 'Material Handling Equipment', hi: 'मटेरियल हैंडलिंग उपकरण' },
    desc: {
      en: 'Low bed trailers, industrial carts, and custom utility trolleys for warehouses and factories.',
      hi: 'वेयरहाउस और कारखानों के लिए लो बेड ट्रेलर, औद्योगिक गाड़ियां और यूटिलिटी ट्रॉली।',
    },
    icon: '🏗️',
    gradient: 'from-[#991b1b] to-[#dc2626]',
    displayOrder: 6,
  },
  {
    id: 'fabrication',
    name: { en: 'Custom Fabrication & Vehicles', hi: 'कस्टम फेब्रिकेशन और वाहन' },
    desc: {
      en: 'Tailored commercial vehicle bodies, utility vehicles, steel gates, railings, and vehicle repairing services.',
      hi: 'कस्टम व्यावसायिक वाहन बॉडी, उपयोगिता वाहन, स्टील गेट, रेलिंग और वाहन मरम्मत सेवाएं।',
    },
    icon: '🔨',
    gradient: 'from-[#4c1d95] to-[#6d28d9]',
    displayOrder: 7,
  },
];

function getProductCategoryId(product: Product, categoryList: any[]): string {
  if (product.category_id) {
    const matched = categoryList.find(c => c.id === product.category_id || c.slug === product.category_id);
    if (matched) return matched.id;
  }

  const rawCat = typeof product.category === 'object' ? (product.category as any)?.en : product.category;
  const catStr = (rawCat || '').toLowerCase().trim();
  const slug = (product.slug || product.id || '').toLowerCase().trim();
  const titleEn = (product.title?.en || (typeof product.title === 'string' ? product.title : '')).toLowerCase().trim();

  if (catStr.includes('hydraulic') || slug.startsWith('ht-') || slug.includes('hydraulic') || slug.includes('dumper') || titleEn.includes('hydraulic') || titleEn.includes('dumper')) {
    return 'hydraulic';
  }

  if (catStr.includes('tractor trailer') || catStr === 'tractor' || slug.startsWith('tt-') || slug.includes('tractor-trolley') || slug.includes('tractor-trailer') || slug.includes('tipping') || titleEn.includes('tractor trailer') || titleEn.includes('tractor trolley') || titleEn.includes('tipping trailer')) {
    return 'tractor';
  }

  if (catStr.includes('water') || slug.includes('water') || slug.includes('tanker') || titleEn.includes('water') || titleEn.includes('tanker')) {
    return 'water';
  }

  if (catStr.includes('generator') || slug.startsWith('gt-') || slug.includes('generator') || titleEn.includes('generator')) {
    return 'generator';
  }

  if (catStr.includes('material') || slug.startsWith('mh-') || slug.includes('lowbed') || slug.includes('ugpu') || slug.includes('cart') || titleEn.includes('low bed') || titleEn.includes('wheeled cart') || titleEn.includes('ugpu')) {
    return 'material';
  }

  if (catStr.includes('agri') || slug.includes('cultivator') || slug.includes('agri-equipment') || titleEn.includes('cultivator') || titleEn.includes('agricultural')) {
    return 'agri';
  }

  return 'fabrication';
}

interface GroupedCategory {
  id: string;
  name: { en: string; hi: string };
  desc: { en: string; hi: string };
  icon: string;
  gradient: string;
  displayOrder: number;
  products: Product[];
}

export default function Products() {
  const { lang, tx } = useLanguage();
  const desktopHeaderRef = useScrollReveal();
  const mobileHeaderRef = useScrollReveal();
  const router = useRouter();
  const { products = [], categories = [] } = useData() || {};
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Group products into categories for mobile view
  const groupedCategories = useMemo<GroupedCategory[]>(() => {
    const metaMap = new Map<string, CategoryMeta>();
    DEFAULT_CATEGORY_METAS.forEach(meta => metaMap.set(meta.id, meta));

    categories.forEach((cat: any) => {
      const existing = metaMap.get(cat.id);
      if (existing) {
        if (cat.name) existing.name = typeof cat.name === 'object' ? cat.name : { en: cat.name, hi: cat.name };
        if (cat.icon) existing.icon = cat.icon;
        if (cat.gradient) existing.gradient = cat.gradient;
        if (cat.displayOrder) existing.displayOrder = cat.displayOrder;
      } else {
        metaMap.set(cat.id, {
          id: cat.id,
          name: typeof cat.name === 'object' ? cat.name : { en: cat.name || cat.id, hi: cat.name || cat.id },
          desc: {
            en: 'High quality industrial and agricultural equipment manufactured with precision.',
            hi: 'सटीकता और स्थायित्व के साथ निर्मित उच्च गुणवत्ता वाले उपकरण।',
          },
          icon: cat.icon || '📦',
          gradient: cat.gradient || 'from-[#065F2E] to-[#0B7A3B]',
          displayOrder: cat.displayOrder || 99,
        });
      }
    });

    const groups: { [key: string]: Product[] } = {};
    metaMap.forEach((_, id) => {
      groups[id] = [];
    });

    products.forEach(product => {
      const catId = getProductCategoryId(product, categories);
      if (!groups[catId]) {
        groups[catId] = [];
      }
      groups[catId].push(product);
    });

    const result: GroupedCategory[] = [];
    metaMap.forEach(meta => {
      const prods = groups[meta.id] || [];
      if (prods.length > 0) {
        result.push({
          ...meta,
          products: prods,
        });
      }
    });

    return result.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [products, categories]);

  const visibleCategories = useMemo(() => {
    if (selectedCategoryFilter === 'all') {
      return groupedCategories;
    }
    return groupedCategories.filter(c => c.id === selectedCategoryFilter);
  }, [groupedCategories, selectedCategoryFilter]);

  const handleCategoryPillClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    if (catId !== 'all') {
      const el = document.getElementById(`category-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Desktop-only: filter out duplicate canonical image references so each image appears only once on the home page web view
  const desktopProducts = useMemo(() => {
    const seenImages = new Set<string>();
    return products.filter(product => {
      const rawImg = getProductPrimaryImage(product) || '';
      const normalized = rawImg.trim().toLowerCase();
      if (!normalized) return true;
      if (seenImages.has(normalized)) {
        return false; // Skip duplicate image on web/desktop view
      }
      seenImages.add(normalized);
      return true;
    });
  }, [products]);

  return (
    <section id="products" className="py-16 sm:py-20 bg-gray-50/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ═══════════════════════════════════════════════════════════════════════
            DESKTOP & TABLET VIEW: Restored Previous Working Unified Grid
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="hidden sm:block">
          {/* Desktop Section Header */}
          <div ref={desktopHeaderRef} className="scroll-reveal text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
              uppercase tracking-widest rounded-full mb-3 shadow-xs">
              {tx(t.products.badge)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
              {tx(t.products.title)}{' '}
              <span className="text-primary">{tx(t.products.titleHL)}</span>
            </h2>
            <div className="section-divider" />
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              {tx(t.products.subtitle)}
            </p>
          </div>

          {/* Desktop Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
            {desktopProducts.map((product, i) => (
              <DesktopProductCard
                key={product.id || product.slug}
                product={product}
                delay={`${(i % 4) * 80}ms`}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            MOBILE VIEW: Preserved Category-Wise Presentation & Swipe Carousels
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="block sm:hidden">
          {/* Mobile Section Header */}
          <div ref={mobileHeaderRef} className="scroll-reveal text-center mb-8">
            <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
              uppercase tracking-widest rounded-full mb-3 shadow-xs">
              {tx(t.products.badge)}
            </span>
            <h2 className="text-2xl font-bold font-rajdhani text-gray-900 mb-2">
              {tx(t.products.title)}{' '}
              <span className="text-primary">{tx(t.products.titleHL)}</span>
            </h2>
            <div className="section-divider" />
            <p className="text-gray-500 max-w-2xl mx-auto text-xs">
              {tx(t.products.subtitle)}
            </p>
          </div>

          {/* Category Quick Filter / Jump Navigation Bar */}
          {groupedCategories.length > 1 && (
            <div className="mb-8">
              <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
                <button
                  suppressHydrationWarning
                  onClick={() => handleCategoryPillClick('all')}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    selectedCategoryFilter === 'all'
                      ? 'bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/20'
                      : 'bg-white text-gray-700 hover:bg-gray-100/80 border border-gray-200/80'
                  }`}
                >
                  {lang === 'en' ? 'All' : 'सभी'}
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-black/10">
                    {products.length}
                  </span>
                </button>

                {groupedCategories.map(cat => (
                  <button
                    suppressHydrationWarning
                    key={cat.id}
                    onClick={() => handleCategoryPillClick(cat.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/20'
                        : 'bg-white text-gray-700 hover:bg-gray-100/80 border border-gray-200/80'
                    }`}
                  >
                    <CatIcon icon={cat.icon} />
                    <span>{tx(cat.name)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category-Wise Product Sections */}
          <div className="flex flex-col gap-10">
            {visibleCategories.map((category, catIdx) => (
              <CategorySection
                key={category.id}
                category={category}
                index={catIdx}
              />
            ))}
          </div>

          {/* Bottom CTA to All Products Page */}
          <div className="mt-12 text-center pt-6 border-t border-gray-200/60">
            <button
              suppressHydrationWarning
              onClick={() => router.push('/products')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs border border-gray-200 shadow-xs"
            >
              <span>{lang === 'en' ? 'Browse Full Catalogue' : 'सम्पूर्ण उत्पाद सूची देखें'}</span>
              <ArrowRight size={14} className="text-primary" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Desktop Product Card Component (Restored Previous Working Design) ──────────

function DesktopProductCard({ product, delay }: { product: Product; delay: string }) {
  const { lang, tx } = useLanguage();
  const ref = useScrollReveal();
  const router = useRouter();
  const { openEnquiry } = useEnquiry();

  const primaryImage = getProductPrimaryImage(product);
  const targetSlug = product.slug || product.id;

  return (
    <div
      ref={ref}
      className="scroll-reveal card-hover bg-white rounded-2xl overflow-hidden shadow-card
        border border-gray-100 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ transitionDelay: delay }}
    >
      {/* Icon/Image area */}
      <div
        onClick={() => router.push(`/products/${targetSlug}`)}
        className="h-44 w-full shrink-0 relative overflow-hidden bg-gray-100 cursor-pointer group"
      >
        <ProductImage
          src={primaryImage}
          alt={`${tx(product.title)} - Piyush Agro Industries`}
          fill
          fallbackIcon={product.icon}
          fallbackGradient={product.gradient}
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          onClick={() => router.push(`/products/${targetSlug}`)}
          className="font-bold font-rajdhani text-gray-900 text-base mb-1 line-clamp-2 break-words cursor-pointer hover:text-primary transition-colors"
        >
          {tx(product.title)}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
          {product.short_desc ? tx(product.short_desc) : (product.desc ? tx(product.desc) : '')}
        </p>

        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="bg-gray-50/80 rounded-xl p-3 mb-4 flex flex-col gap-2.5 border border-gray-100 mt-auto">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => {
              const formattedKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/_/g, ' ')
                .replace(/^./, str => str.toUpperCase())
                .trim();

              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-[11px] sm:text-xs capitalize">{formattedKey}</span>
                  <span className="text-gray-700 text-[11px] sm:text-xs font-semibold px-2 py-0.5 bg-white border border-gray-100 rounded-md shadow-sm text-right line-clamp-1 max-w-[120px]">
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {(!product.specs || Object.keys(product.specs).length === 0) && <div className="mt-auto" />}

        <div className="flex gap-2.5 mt-auto pt-3 border-t border-gray-100/60">
          <button
            suppressHydrationWarning
            onClick={() => router.push(`/products/${targetSlug}`)}
            className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs transition-colors text-center shadow-sm"
          >
            {lang === 'en' ? 'View Details' : 'विवरण देखें'}
          </button>
          <button
            suppressHydrationWarning
            onClick={() => openEnquiry(tx(product.title))}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-md hover:shadow-lg transition-all text-center relative overflow-hidden group"
          >
            <span className="relative z-10">{lang === 'en' ? 'Get Quote' : 'कोटेशन'}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Category Section Component ─────────────────────────────────────────

interface CategorySectionProps {
  category: GroupedCategory;
  index: number;
}

function CategorySection({ category, index }: CategorySectionProps) {
  const { lang, tx } = useLanguage();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile-only: deduplicate products by exact image reference
  const mobileProducts = useMemo(() => {
    const seenImages = new Set<string>();
    return category.products.filter(product => {
      const rawImg = getProductPrimaryImage(product) || '';
      const normalized = rawImg.trim().toLowerCase();
      if (!normalized) return true;
      if (seenImages.has(normalized)) {
        return false; // Skip duplicate image on mobile
      }
      seenImages.add(normalized);
      return true;
    });
  }, [category.products]);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    const firstCard = el.querySelector('[data-card-item="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 14 : 270;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), mobileProducts.length - 1));
  }, [mobileProducts.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scrollPrev = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-card-item="true"]') as HTMLElement | null;
    const shift = firstCard ? firstCard.offsetWidth + 14 : 270;
    el.scrollBy({ left: -shift, behavior: 'smooth' });
  };

  const scrollNext = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-card-item="true"]') as HTMLElement | null;
    const shift = firstCard ? firstCard.offsetWidth + 14 : 270;
    el.scrollBy({ left: shift, behavior: 'smooth' });
  };

  return (
    <div
      id={`category-${category.id}`}
      className="scroll-mt-24 pt-2 border-b border-gray-200/50 pb-10 last:border-b-0 last:pb-0"
    >
      {/* Category Section Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-sm shadow-xs">
            {category.icon}
          </span>
          <h3 className="text-lg font-bold font-rajdhani text-gray-900 tracking-tight">
            {tx(category.name)}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200/60">
            {mobileProducts.length}
          </span>
        </div>
      </div>

      {/* Mobile Horizontal Snap Row */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar
          -mx-4 px-4 gap-3.5 pb-2 scroll-pl-4 scroll-pr-4 overscroll-x-contain items-stretch"
      >
        {mobileProducts.map((product, pIdx) => (
          <div
            key={product.id || product.slug}
            data-card-item="true"
            className="w-[76vw] max-w-[295px] min-w-[245px] shrink-0 snap-start flex flex-col h-full"
          >
            <MobileProductCard
              product={product}
              delay={`${(pIdx % 4) * 60}ms`}
            />
          </div>
        ))}
      </div>

      {/* Mobile-Only Independent Category Controls */}
      {mobileProducts.length > 1 && (
        <div className="flex items-center justify-between mt-2.5 px-1">
          {/* Category Progress Bar & Counter */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(15, ((activeIndex + 1) / mobileProducts.length) * 100))}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-gray-500 font-semibold tracking-wide">
              {activeIndex + 1} <span className="text-gray-400 font-normal">/</span> {mobileProducts.length}
            </span>
          </div>

          {/* Mini Prev / Next arrow buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-white border-gray-200 text-gray-700 active:bg-gray-100 shadow-xs'
                  : 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed opacity-40'
              }`}
              aria-label="Previous product"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-white border-gray-200 text-gray-700 active:bg-gray-100 shadow-xs'
                  : 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed opacity-40'
              }`}
              aria-label="Next product"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mobile Product Card Component ─────────────────────────────────────────────

function MobileProductCard({ product, delay }: { product: Product; delay: string }) {
  const { lang, tx } = useLanguage();
  const router = useRouter();
  const { openEnquiry } = useEnquiry();

  const primaryImage = getProductPrimaryImage(product);
  const description = product.short_desc ? tx(product.short_desc) : (product.desc ? tx(product.desc) : '');
  const targetSlug = product.slug || product.id;

  return (
    <div
      className="card-hover bg-white rounded-2xl overflow-hidden shadow-card
        border border-gray-100 h-full flex flex-col"
      style={{ transitionDelay: delay }}
    >
      {/* Product Image Area */}
      <div
        onClick={() => router.push(`/products/${targetSlug}`)}
        className="h-44 w-full shrink-0 relative overflow-hidden bg-gray-100 cursor-pointer group"
      >
        <ProductImage
          src={primaryImage}
          alt={`${tx(product.title)} - Piyush Agro Industries`}
          fill
          fallbackIcon={product.icon}
          fallbackGradient={product.gradient}
        />
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex flex-col flex-1">
        <h4
          onClick={() => router.push(`/products/${targetSlug}`)}
          className="font-bold font-rajdhani text-gray-900 text-base mb-1 line-clamp-2 break-words leading-snug cursor-pointer hover:text-primary transition-colors"
        >
          {tx(product.title)}
        </h4>

        {description ? (
          <p className="text-gray-500 text-xs leading-relaxed mb-3.5 line-clamp-2">
            {description}
          </p>
        ) : null}

        {/* Specifications snippet */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="bg-gray-50/90 rounded-xl p-2.5 mb-3.5 flex flex-col gap-1.5 border border-gray-100 mt-auto">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => {
              const formattedKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/_/g, ' ')
                .replace(/^./, str => str.toUpperCase())
                .trim();

              return (
                <div key={key} className="flex items-center justify-between text-xs gap-2">
                  <span className="font-semibold text-gray-600 text-[10px] truncate max-w-[50%]">
                    {formattedKey}
                  </span>
                  <span className="text-gray-900 text-[10px] font-bold px-1.5 py-0.5 bg-white border border-gray-100 rounded-md shadow-xs text-right truncate max-w-[50%]">
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {(!product.specs || Object.keys(product.specs).length === 0) && <div className="mt-auto" />}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100/70">
          <button
            suppressHydrationWarning
            onClick={() => router.push(`/products/${targetSlug}`)}
            className="flex-1 py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-[11px] transition-colors text-center shadow-xs"
          >
            {lang === 'en' ? 'View Details' : 'विवरण देखें'}
          </button>
          <button
            suppressHydrationWarning
            onClick={() => openEnquiry(tx(product.title))}
            className="flex-1 py-2.5 px-2 rounded-xl bg-gradient-primary text-white font-bold text-[11px] shadow-md hover:shadow-lg transition-all text-center relative overflow-hidden group"
          >
            <span className="relative z-10">{lang === 'en' ? 'Get Quote' : 'कोटेशन'}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
