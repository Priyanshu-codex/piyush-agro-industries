'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, WHY_FEATURES } from '@/lib/translations';

export default function WhyUs() {
  const { tx } = useLanguage();
  const headerRef = useScrollReveal();

  return (
    <section id="why-us" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headerRef} className="scroll-reveal text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.whyUs.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.whyUs.title)}{' '}
            <span className="text-primary">{tx(t.whyUs.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_FEATURES.map((feature, i) => (
            <WhyCard key={i} feature={feature} delay={`${(i % 4) * 80}ms`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({
  feature,
  delay,
}: {
  feature: (typeof WHY_FEATURES)[number];
  delay: string;
}) {
  const { tx } = useLanguage();
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal group bg-white rounded-2xl p-6 text-center shadow-card
        border border-gray-100 hover:shadow-card-hover hover:-translate-y-1.5
        transition-all duration-300 relative overflow-hidden"
      style={{ transitionDelay: delay }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-primary
        scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 flex items-center
        justify-center text-2xl group-hover:bg-gradient-primary transition-colors duration-300">
        {feature.icon}
      </div>
      <h3 className="font-bold font-rajdhani text-gray-900 text-base mb-2">
        {tx(feature.title)}
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed">{tx(feature.desc)}</p>
    </div>
  );
}
