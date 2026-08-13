'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, FAQ_ITEMS } from '@/constants/translations';
import { Plus } from 'lucide-react';

export default function FAQ() {
  const { tx } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useScrollReveal();
  const bodyRef   = useScrollReveal(0.05);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div ref={headerRef} className="scroll-reveal text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.faq.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.faq.title)}{' '}
            <span className="text-primary">{tx(t.faq.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div ref={bodyRef} className="scroll-reveal space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200
                  ${isOpen ? 'border-primary/30 shadow-card' : 'border-gray-100 hover:border-gray-200'}`}
              >
                {/* Question */}
                <button suppressHydrationWarning
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left
                    hover:bg-primary-50/50 transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <h4 className="font-bold font-rajdhani text-gray-900 text-base leading-snug">
                    {tx(item.question)}
                  </h4>
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center
                      justify-center transition-all duration-300
                      ${isOpen
                        ? 'bg-primary border-primary text-white rotate-45'
                        : 'border-gray-200 text-gray-400'
                      }`}
                  >
                    <Plus size={14} />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-350 ease-in-out"
                  style={{ maxHeight: isOpen ? '300px' : '0' }}
                >
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                    {tx(item.answer)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
