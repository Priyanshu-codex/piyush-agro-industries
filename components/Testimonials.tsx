'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, TESTIMONIALS } from '@/lib/translations';

export default function Testimonials() {
  const { tx } = useLanguage();
  const headerRef = useScrollReveal();

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headerRef} className="scroll-reveal text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.testimonials.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.testimonials.title)}{' '}
            <span className="text-primary">{tx(t.testimonials.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={i} item={item} delay={`${i * 120}ms`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  delay,
}: {
  item: (typeof TESTIMONIALS)[number];
  delay: string;
}) {
  const { tx } = useLanguage();
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal bg-gray-50 rounded-2xl p-6 border border-gray-100
        hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
      style={{ transitionDelay: delay }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: item.rating }).map((_, i) => (
          <span key={i} className="text-brand-amber text-base">★</span>
        ))}
      </div>

      {/* Quote mark */}
      <div className="text-5xl leading-none text-primary/20 font-serif mb-2 -mt-1">"</div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed italic mb-5">
        {tx(item.text)}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.gradient}
            flex items-center justify-center text-white font-bold text-lg font-rajdhani flex-shrink-0`}
        >
          {item.avatar}
        </div>
        <div>
          <div className="font-bold font-rajdhani text-gray-900 text-sm">{tx(item.name)}</div>
          <div className="text-xs text-gray-400">{tx(item.role)}</div>
        </div>
      </div>
    </div>
  );
}
