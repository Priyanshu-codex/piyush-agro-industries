'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, PRODUCTS } from '@/lib/translations';
import { ArrowRight } from 'lucide-react';

export default function Products() {
  const { tx } = useLanguage();
  const headerRef = useScrollReveal();

  const scroll = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

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
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={`${(i % 4) * 80}ms`}
              onQuote={scroll}
              quoteLabel={tx(t.products.quote)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: (typeof PRODUCTS)[number];
  delay: string;
  onQuote: () => void;
  quoteLabel: string;
}

function ProductCard({ product, delay, onQuote, quoteLabel }: ProductCardProps) {
  const { tx } = useLanguage();
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal card-hover bg-white rounded-2xl overflow-hidden shadow-card
        border border-gray-100"
      style={{ transitionDelay: delay }}
    >
      {/* Icon area */}
      <div
        className={`h-36 bg-gradient-to-br ${product.gradient} flex items-center justify-center
          relative overflow-hidden`}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <span className="text-5xl relative z-10 drop-shadow">{product.icon}</span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold font-rajdhani text-gray-900 text-base mb-1">
          {tx(product.title)}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3">
          {tx(product.desc)}
        </p>
        <button
          onClick={onQuote}
          className="inline-flex items-center gap-1 text-primary text-xs font-semibold
            hover:gap-2 transition-all duration-150"
        >
          {quoteLabel} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
