'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { t } from '@/constants/translations';
import { Phone, MessageCircle, FileText, LayoutGrid } from 'lucide-react';
import { FLOATING_ICONS } from '@/constants/floatingIcons';

const HERO_PRODUCTS = [
  { icon: '🚜', en: 'Tractor Trolley', hi: 'ट्रैक्टर ट्रॉली', span: false },
  { icon: '🔧', en: 'Hydraulic Trolley', hi: 'हाइड्रोलिक ट्रॉली', span: true },
  { icon: '💧', en: 'Water Tanker', hi: 'वाटर टैंकर', span: false },
  { icon: '⚙️', en: 'Agri Equipment', hi: 'कृषि उपकरण', span: false },
  { icon: '🔩', en: 'Fabrication', hi: 'फेब्रिकेशन', span: false },
];

const PARTICLES = [
  { top: 15, left: 12, size: 3, delay: '0.5s', duration: '6s' },
  { top: 25, left: 85, size: 4, delay: '2.1s', duration: '5s' },
  { top: 40, left: 22, size: 2, delay: '1.2s', duration: '7s' },
  { top: 55, left: 70, size: 3, delay: '3.4s', duration: '6s' },
  { top: 72, left: 15, size: 4, delay: '0.8s', duration: '4s' },
  { top: 80, left: 80, size: 2, delay: '2.5s', duration: '8s' },
  { top: 10, left: 60, size: 3, delay: '1.7s', duration: '5s' },
  { top: 90, left: 35, size: 2, delay: '0.1s', duration: '6s' },
  { top: 62, left: 92, size: 3, delay: '4.2s', duration: '5s' },
  { top: 32, left: 48, size: 4, delay: '1.5s', duration: '7s' },
];

function AnimatedCounter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isNaN(target)) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  if (isNaN(target)) {
    return <span>{value}</span>;
  }
  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ── Interactive mouse-parallax handler ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !sectionRef.current) return;
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5; // range: -0.5 to 0.5
    const y = (clientY - top) / height - 0.5; // range: -0.5 to 0.5
    sectionRef.current.style.setProperty('--mouse-x', x.toString());
    sectionRef.current.style.setProperty('--mouse-y', y.toString());
  };

  const handleMouseLeave = () => {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty('--mouse-x', '0');
    sectionRef.current.style.setProperty('--mouse-y', '0');
  };

  /* ── Framer Motion Reveal Variants ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 22,
        stiffness: 90,
      },
    },
  } as const;

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden pt-32 pb-16"
    >
      <style>
        {`
          @keyframes emoji-tractor-bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(-1deg) translateX(1px); }
          }
          @keyframes emoji-gear-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes emoji-trolley-bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-1.5px) rotate(1deg); }
          }
          @keyframes emoji-tanker-bounce {
            0%, 100% { transform: translateY(0) scaleY(1) scaleX(1); }
            50% { transform: translateY(-2px) scaleY(1.04) scaleX(0.96); }
          }
          @keyframes emoji-fabrication-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-emoji-tractor {
            animation: emoji-tractor-bounce 0.6s ease-in-out infinite;
            display: inline-block;
          }
          .animate-emoji-gear {
            animation: emoji-gear-spin 6s linear infinite;
            display: inline-block;
            transform-origin: center;
          }
          .animate-emoji-trolley {
            animation: emoji-trolley-bounce 0.55s ease-in-out infinite;
            display: inline-block;
          }
          .animate-emoji-tanker {
            animation: emoji-tanker-bounce 0.5s ease-in-out infinite;
            display: inline-block;
          }
          .animate-emoji-fabrication {
            animation: emoji-fabrication-spin 5s linear infinite;
            display: inline-block;
            transform-origin: center;
          }
          @keyframes text-drift {
            0% { transform: translateX(-3%); }
            50% { transform: translateX(3%); }
            100% { transform: translateX(-3%); }
          }
          .animate-text-drift {
            animation: text-drift 15s ease-in-out infinite;
            display: inline-block;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-emoji-tractor,
            .animate-emoji-gear,
            .animate-emoji-trolley,
            .animate-emoji-tanker,
            .animate-emoji-fabrication,
            .animate-text-drift {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid pointer-events-none z-0" />

      {/* Light sweep ray */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent pointer-events-none animate-light-ray z-0" />

      {/* Glowing background blobs */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
        bg-primary/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow z-0" />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow z-0"
        style={{ animationDelay: '2s' }}
      />

      {/* Twinkling particle stars */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute bg-white/25 rounded-full animate-pulse-slow"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Floating moving icons */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {FLOATING_ICONS.map((icon) => (
          <div
            key={icon.id}
            className={`absolute parallax-layer ${icon.className} ${icon.animationClass}`}
            style={{
              '--parallax-factor': `${icon.parallaxFactor}px`,
              animationDelay: icon.delay,
            } as React.CSSProperties}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {/* Ghost text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[10vw] font-bold text-white/[0.025] whitespace-nowrap font-rajdhani tracking-widest select-none animate-text-drift">
          पियूष एग्रो
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full
                bg-primary/25 border border-primary/40 text-white/90 text-xs font-semibold
                uppercase tracking-widest mb-6"
            >
              <span className="text-brand-green">✦</span>
              {tx(t.hero.badge)}
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="mb-4">
              <span className="block gradient-text font-bold leading-tight text-3.5xl sm:text-4.5xl font-noto mb-1" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                पियूष एग्रो इंडस्ट्रीज
              </span>
              <span className="block text-white font-rajdhani font-bold leading-none text-4xl sm:text-5xl lg:text-6xl">
                {lang === 'hi' ? 'राजनांदगांव, छत्तीसगढ़' : 'Piyush Agro\nIndustries'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              {tx(t.hero.subtitle)}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <motion.a
                href="tel:9425245291"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center w-full sm:w-auto items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary
                  text-white font-semibold font-rajdhani shadow-primary hover:shadow-primary-lg
                  transition-all duration-250"
              >
                <Phone size={16} /> {tx(t.hero.cta1)}
              </motion.a>
              <motion.a
                href="https://wa.me/919425245291?text=Hello%2C%20interested%20in%20your%20products"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center w-full sm:w-auto items-center gap-2 px-6 py-3 rounded-xl bg-gradient-whatsapp
                  text-white font-semibold font-rajdhani transition-all duration-250
                  shadow-[0_4px_15px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle size={16} /> {tx(t.hero.cta2)}
              </motion.a>
              <motion.button suppressHydrationWarning
                onClick={() => openEnquiry(lang === 'en' ? 'General Enquiry' : 'सामान्य पूछताछ')}
                whileHover={{ y: -2, scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center w-full sm:w-auto items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/60
                  text-white font-semibold font-rajdhani transition-all duration-250"
              >
                <FileText size={16} /> {tx(t.hero.cta3)}
              </motion.button>
              <motion.button suppressHydrationWarning
                onClick={() => scroll('products')}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center w-full sm:w-auto items-center gap-2 px-6 py-3 rounded-xl
                  bg-brand-amber text-white font-semibold font-rajdhani transition-all duration-250
                  shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
              >
                <LayoutGrid size={16} /> {tx(t.hero.cta4)}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-8 border-t border-white/15"
            >
              {[
                { num: t.hero.stat1Num, label: t.hero.stat1Label },
                { num: t.hero.stat2Num, label: t.hero.stat2Label },
                { num: t.hero.stat3Num, label: t.hero.stat3Label },
              ].map(({ num, label }, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-brand-green font-rajdhani leading-none">
                    <AnimatedCounter value={tx(num)} />
                  </div>
                  <div className="text-[11px] text-white/60 uppercase tracking-wide mt-1.5">
                    {tx(label)}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Product showcase ── */}
          <div className="hidden lg:block z-10">
            <div className="grid grid-cols-2 gap-3">
              {HERO_PRODUCTS.map((p, i) => {
                let animClass = '';
                if (p.en === 'Tractor Trolley') animClass = 'animate-emoji-tractor';
                else if (p.en === 'Agri Equipment') animClass = 'animate-emoji-gear';
                else if (p.en === 'Hydraulic Trolley') animClass = 'animate-emoji-trolley';
                else if (p.en === 'Water Tanker') animClass = 'animate-emoji-tanker';
                else if (p.en === 'Fabrication') animClass = 'animate-emoji-fabrication';

                return (
                  <motion.div
                    key={i}
                    onClick={() => scroll('products')}
                    whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(74, 222, 128, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.6, type: 'spring', damping: 20 }}
                    className={`glass-card rounded-2xl p-5 text-center cursor-pointer transition-shadow duration-300
                      ${p.span ? 'col-span-2 bg-primary/25 border-brand-green/30' : ''}`}
                  >
                    <div className="text-4xl mb-2 select-none">
                      <span className={animClass}>{p.icon}</span>
                    </div>
                    <div className="text-white text-sm font-semibold font-rajdhani">
                      {lang === 'hi' ? p.hi : p.en}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick contact bar */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, type: 'spring', damping: 22 }}
              className="mt-4 glass-card rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-white/60 text-xs mb-0.5">Call or WhatsApp</div>
                <div className="text-white font-bold font-rajdhani text-sm">9425245291</div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <div className="text-white/60 text-xs mb-0.5">Location</div>
                <div className="text-white font-bold font-rajdhani text-sm">Rajnandgaon, CG</div>
              </div>
              <motion.a
                href="tel:9425245291"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-primary text-white
                  text-sm font-semibold font-rajdhani transition-all duration-200"
              >
                Call Now
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-pulse z-10">
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
      </div>
    </section>
  );
}
