'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, WHY_FEATURES } from '@/lib/translations';

export default function WhyUs() {
  const { tx } = useLanguage();
  const headerRef = useScrollReveal();
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]
  );

  return (
    <section id="why-us" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
          <div ref={headerRef} className="scroll-reveal text-left max-w-2xl">
            <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
              uppercase tracking-widest rounded-full mb-3">
              {tx(t.whyUs.badge)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
              {tx(t.whyUs.title)}{' '}
              <span className="text-primary">{tx(t.whyUs.titleHL)}</span>
            </h2>
            <div className="w-14 h-1 bg-gradient-primary rounded-full mt-4" />
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-5 touch-pan-y">
            {WHY_FEATURES.map((feature, i) => (
              <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-5 min-w-0">
                <WhyCard feature={feature} delay="0ms" />
              </div>
            ))}
          </div>
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
