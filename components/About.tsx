'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t } from '@/lib/translations';
import { ArrowRight, Tractor, HardHat, Truck, Building2, Car, Factory } from 'lucide-react';

const SERVE_ICONS = [Tractor, HardHat, Truck, Building2, Car, Factory];

const STATS = [
  { numKey: 'stat1' as const, labelKey: 'stat1L' as const },
  { numKey: 'stat2' as const, labelKey: 'stat2L' as const },
  { numKey: 'stat3' as const, labelKey: 'stat3L' as const },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          let start = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function About() {
  const { tx } = useLanguage();
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal(0.1);

  const SERVE_KEYS = ['serve1', 'serve2', 'serve3', 'serve4', 'serve5', 'serve6'] as const;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Visual ── */}
          <div ref={leftRef} className="scroll-reveal relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden h-[460px] bg-gradient-primary flex items-center justify-center">
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <span className="text-9xl relative z-10 drop-shadow-2xl">🏭</span>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-card-hover px-5 py-4 flex items-center gap-3 border border-gray-100">
                <div className="text-3xl font-bold text-primary font-rajdhani leading-none">✓</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm font-rajdhani">{tx(t.about.trusted)}</div>
                  <div className="text-xs text-gray-400">Rajnandgaon, CG</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div ref={rightRef} className="scroll-reveal delay-200">
            <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
              uppercase tracking-widest rounded-full mb-3">
              {tx(t.about.badge)}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2 leading-tight">
              {tx(t.about.title).split('Piyush Agro')[0]}
              <span className="text-primary">
                {tx(t.about.title).includes('Piyush Agro') ? 'Piyush Agro' : 'पियूष एग्रो'}
              </span>
              {tx(t.about.title).split('Piyush Agro')[1] ?? ''}
            </h2>
            <div className="section-divider !mx-0" />

            <p className="text-gray-500 leading-relaxed mb-4">{tx(t.about.p1)}</p>
            <p className="text-gray-500 leading-relaxed mb-6">{tx(t.about.p2)}</p>

            {/* We serve grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-7">
              {SERVE_KEYS.map((key, i) => {
                const Icon = SERVE_ICONS[i];
                return (
                  <div key={key}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-primary-50
                      rounded-xl border-l-4 border-primary">
                    <Icon size={15} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">{tx(t.about[key])}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 mb-7">
              {STATS.map(({ numKey, labelKey }) => {
                const raw = tx(t.about[numKey]).replace(/\D/g, '');
                const suffix = tx(t.about[numKey]).replace(/\d/g, '');
                return (
                  <div key={numKey} className="text-center">
                    <div className="text-2xl font-bold text-primary font-rajdhani leading-none">
                      <AnimatedCounter target={parseInt(raw) || 0} suffix={suffix} />
                    </div>
                    <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">
                      {tx(t.about[labelKey])}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary
                text-white font-semibold font-rajdhani shadow-primary hover:shadow-primary-lg
                hover:-translate-y-0.5 transition-all duration-200"
            >
              {tx(t.about.cta)} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
