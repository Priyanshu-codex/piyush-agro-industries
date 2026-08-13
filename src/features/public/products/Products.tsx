'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t } from '@/constants/translations';
import { ArrowRight, Settings, Weight, Maximize } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { ProductImage } from '@/components/ui/ProductImage';

export default function Products() {
  const { tx } = useLanguage();
  const headerRef = useScrollReveal();
  const { products = [] } = useData() || {};

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="scroll-reveal text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.products.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.products.title)}{' '}
            <span className="text-primary">{tx(t.products.titleHL)}</span>
          </h2>
          <div className="section-divider" />
          <p className="text-gray-500 max-w-xl mx-auto">{tx(t.products.subtitle)}</p>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={`${(i % 4) * 80}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Product } from '@/types';

// ── Sub-component ─────────────────────────────────────────────────────────────

import { getProductPrimaryImage } from '@/utils/imageUtils';

interface ProductCardProps {
  product: Product;
  delay: string;
}

function ProductCard({ product, delay }: ProductCardProps) {
  const { lang, tx } = useLanguage();
  const ref = useScrollReveal();
  const router = useRouter();
  const { openEnquiry } = useEnquiry();

  const primaryImage = getProductPrimaryImage(product);

  return (
    <div
      ref={ref}
      className="scroll-reveal card-hover bg-white rounded-2xl overflow-hidden shadow-card
        border border-gray-100 h-full flex flex-col"
      style={{ transitionDelay: delay }}
    >
      {/* Icon/Image area */}
      <ProductImage
        src={primaryImage}
        alt={`${tx(product.title)} - Piyush Agro Industries`}
        className="h-44 w-full shrink-0"
        fill
        fallbackIcon={product.icon}
        fallbackGradient={product.gradient}
      />

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold font-rajdhani text-gray-900 text-base mb-1 line-clamp-2 break-words">
          {tx(product.title)}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
          {product.short_desc ? tx(product.short_desc) : ''}
        </p>

        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="bg-gray-50/80 rounded-xl p-3 mb-4 flex flex-col gap-2.5 border border-gray-100 mt-auto">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-[11px] sm:text-xs capitalize">{key}</span>
                <span className="text-gray-700 text-[11px] sm:text-xs font-semibold px-2 py-0.5 bg-white border border-gray-100 rounded-md shadow-sm text-right line-clamp-1 max-w-[120px]">
                  {value as string}
                </span>
              </div>
            ))}
          </div>
        )}

        {(!product.specs || Object.keys(product.specs).length === 0) && <div className="mt-auto" />}

        <div className="flex gap-2.5 mt-auto pt-3 border-t border-gray-100/60">
          <button suppressHydrationWarning
            onClick={() => router.push(`/products/${product.id}`)}
            className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs transition-colors text-center shadow-sm"
          >
            {lang === 'en' ? 'View Details' : 'विवरण'}
          </button>
          <button suppressHydrationWarning
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
