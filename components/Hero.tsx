'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Phone, MessageCircle, FileText, LayoutGrid } from 'lucide-react';

const HERO_PRODUCTS = [
  { icon: '🚜', en: 'Tractor Trolley',   hi: 'ट्रैक्टर ट्रॉली',   span: false },
  { icon: '🔧', en: 'Hydraulic Trolley', hi: 'हाइड्रोलिक ट्रॉली', span: true },
  { icon: '💧', en: 'Water Tanker',      hi: 'वाटर टैंकर',         span: false },
  { icon: '⚙️', en: 'Agri Equipment',    hi: 'कृषि उपकरण',         span: false },
  { icon: '🔩', en: 'Fabrication',       hi: 'फेब्रिकेशन',          span: false },
];

export default function Hero() {
  const { lang, tx } = useLanguage();

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden pt-32 pb-16"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
        bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      {/* Ghost text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[10vw] font-bold text-white/[0.03] whitespace-nowrap font-rajdhani tracking-widest">
          पियूष एग्रो
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-primary/25 border border-primary/40 text-white/90 text-xs font-semibold
              uppercase tracking-widest mb-6">
              <span className="text-brand-green">✦</span>
              {tx(t.hero.badge)}
            </div>

            {/* Title */}
            <h1 className="mb-3">
              <span className="block gradient-text font-bold leading-tight text-3xl sm:text-4xl font-noto" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                पियूष एग्रो इंडस्ट्रीज
              </span>
              <span className="block text-white font-rajdhani font-bold leading-tight text-4xl sm:text-5xl lg:text-6xl">
                {lang === 'hi' ? 'राजनांदगांव, छत्तीसगढ़' : 'Piyush Agro\nIndustries'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              {tx(t.hero.subtitle)}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="tel:9425245291"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary
                  text-white font-semibold font-rajdhani shadow-primary hover:shadow-primary-lg
                  hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone size={16} /> {tx(t.hero.cta1)}
              </a>
              <a
                href="https://wa.me/919425245291?text=Hello%2C%20interested%20in%20your%20products"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-whatsapp
                  text-white font-semibold font-rajdhani hover:-translate-y-0.5 transition-all duration-200
                  shadow-[0_4px_15px_rgba(37,211,102,0.35)]"
              >
                <MessageCircle size={16} /> {tx(t.hero.cta2)}
              </a>
              <button
                onClick={() => scroll('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/60
                  text-white font-semibold font-rajdhani hover:bg-white hover:text-primary
                  hover:-translate-y-0.5 transition-all duration-200"
              >
                <FileText size={16} /> {tx(t.hero.cta3)}
              </button>
              <button
                onClick={() => scroll('products')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-brand-amber text-white font-semibold font-rajdhani
                  hover:-translate-y-0.5 transition-all duration-200
                  shadow-[0_4px_15px_rgba(245,158,11,0.35)]"
              >
                <LayoutGrid size={16} /> {tx(t.hero.cta4)}
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-white/15">
              {[
                { num: t.hero.stat1Num, label: t.hero.stat1Label },
                { num: t.hero.stat2Num, label: t.hero.stat2Label },
                { num: t.hero.stat3Num, label: t.hero.stat3Label },
              ].map(({ num, label }, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-brand-green font-rajdhani leading-none">
                    {tx(num)}
                  </div>
                  <div className="text-[11px] text-white/60 uppercase tracking-wide mt-1">
                    {tx(label)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Product showcase ── */}
          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-2 gap-3">
              {HERO_PRODUCTS.map((p, i) => (
                <div
                  key={i}
                  onClick={() => scroll('products')}
                  className={`glass-card rounded-2xl p-5 text-center cursor-pointer
                    hover:border-brand-green/40 hover:bg-white/12 hover:-translate-y-1
                    transition-all duration-300
                    ${p.span ? 'col-span-2 bg-primary/25 border-brand-green/30' : ''}`}
                >
                  <div className="text-4xl mb-2">{p.icon}</div>
                  <div className="text-white text-sm font-semibold font-rajdhani">
                    {lang === 'hi' ? p.hi : p.en}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact bar */}
            <div className="mt-4 glass-card rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-white/60 text-xs mb-0.5">Call or WhatsApp</div>
                <div className="text-white font-bold font-rajdhani text-sm">9425245291</div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <div className="text-white/60 text-xs mb-0.5">Location</div>
                <div className="text-white font-bold font-rajdhani text-sm">Rajnandgaon, CG</div>
              </div>
              <a
                href="tel:9425245291"
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-primary text-white
                  text-sm font-semibold font-rajdhani hover:opacity-90 transition-opacity"
              >
                Call Now
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-pulse">
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
    </section>
  );
}
