'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, PROCESS_STEPS } from '@/constants/translations';
import { MessageCircle, Ruler, Hammer, Search, Truck, type LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';

// Map PROCESS_STEPS emoji keys → Lucide icons
const PROCESS_ICON_MAP: Record<string, LucideIcon> = {
  '💬': MessageCircle,
  '📐': Ruler,
  '🔨': Hammer,
  '🔍': Search,
  '🚚': Truck,
};

function ProcessIcon({ icon, className = '' }: { icon: string; className?: string }): ReactElement {
  const LucideComp = PROCESS_ICON_MAP[icon];
  if (LucideComp) return <LucideComp size={22} className={className} />;
  return <Hammer size={22} className={className} />;
}

export default function Process() {
  const { tx } = useLanguage();
  const headerRef = useScrollReveal();
  const bodyRef   = useScrollReveal(0.1);

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headerRef} className="scroll-reveal text-center mb-14">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.process.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.process.title)}{' '}
            <span className="text-primary">{tx(t.process.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Desktop timeline */}
        <div ref={bodyRef} className="scroll-reveal hidden md:flex gap-0 relative">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className="flex-1 text-center relative group">
              {/* Connector line (between steps) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-8 left-1/2 right-0 h-0.5
                  bg-gradient-to-r from-primary to-accent-light z-0" />
              )}

              {/* Step number bubble */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full border-[3px] border-primary
                bg-white flex items-center justify-center font-bold text-xl font-rajdhani text-primary
                group-hover:bg-gradient-primary group-hover:text-white group-hover:scale-110
                transition-all duration-300 shadow-sm">
                {step.num}
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center text-primary mb-2 h-7">
                <ProcessIcon icon={step.icon} />
              </div>

              <h3 className="font-bold font-rajdhani text-gray-900 text-sm mb-1.5 px-2">
                {tx(step.title)}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-[130px] mx-auto px-2">
                {tx(step.desc)}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-0 relative ml-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary to-accent-light" />

          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className="flex items-start gap-5 pb-8 last:pb-0">
              {/* Bubble */}
              <div className="relative flex-shrink-0 -ml-8 w-16 h-16 rounded-full border-[3px] border-primary
                bg-white flex flex-col items-center justify-center font-bold text-lg font-rajdhani
                text-primary shadow-sm z-10">
                <span>{step.num}</span>
              </div>

              <div className="pt-3">
                <div className="flex items-center text-primary mb-1 h-6">
                  <ProcessIcon icon={step.icon} />
                </div>
                <h3 className="font-bold font-rajdhani text-gray-900 text-base mb-1">
                  {tx(step.title)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{tx(step.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
