'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useSMLShowcase } from '@/contexts/SMLShowcaseContext';
import { t } from '@/constants/translations';
import {
  ArrowRight,
  Leaf,
  Cog,
  Handshake,
  Users,
  Truck,
  Bus,
  ShieldCheck
} from 'lucide-react';

export default function Hero() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const { openShowcase } = useSMLShowcase();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Motion Variants ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 90,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[calc(100svh-4rem)] sm:min-h-[85vh] lg:min-h-[90vh] xl:min-h-[92vh] flex items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 bg-[#F9FAFB]"
    >
      {/* ── CINEMATIC VEHICLE WORKSHOP & AGRICULTURE BACKGROUND ── */}
      <div className="absolute inset-0 select-none z-0">
        <Image
          src="/images/hero/hero-cinematic-bg.webp"
          alt="Piyush Agro Industries and SML Mahindra Commercial Vehicle Service Support Workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-[75%_center] md:object-[80%_center] lg:object-[84%_center]"
        />

        {/* Soft atmospheric white-to-transparent gradient on tablet & desktop */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 via-50% to-transparent w-full lg:w-[65%] pointer-events-none" />

        {/* High-legibility atmospheric gradient on mobile viewports */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-white/95 via-white/92 to-white/85 pointer-events-none" />
      </div>

      {/* ── HERO CONTENT WRAPPER ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">

          {/* Left Column: Text & Features (matching reference layout) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center"
          >

            {/* Eyebrow Text */}
            <motion.div variants={itemVariants} className="mb-2 sm:mb-3">
              <span className="inline-block text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.18em] text-gray-700 font-rajdhani leading-snug">
                {tx(t.hero.refEyebrow)}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-extrabold text-gray-900 tracking-tight leading-[1.12] sm:leading-[1.08] text-2.5xl xs:text-3xl sm:text-4xl md:text-[46px] lg:text-[54px] xl:text-[58px] mb-3.5 sm:mb-5 font-rajdhani break-words"
            >
              <span className="block sm:inline">{tx(t.hero.refHeading1)}</span>{' '}
              <span className="block sm:inline">{tx(t.hero.refHeading2)}</span>{' '}
              <span className="block sm:inline text-[#E31837]">{tx(t.hero.refHeading3)}</span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-700 text-xs xs:text-sm sm:text-base leading-relaxed max-w-xl mb-5 sm:mb-7 font-medium"
            >
              {tx(t.hero.refSubtitle)}
            </motion.p>

            {/* Four Service Highlights (Direct outline icons matching reference design) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8 py-2.5 sm:py-3.5 border-y border-gray-300/80 max-w-xl lg:max-w-2xl bg-white/50 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none rounded-xl p-2.5 sm:p-0"
            >
              {/* 1. Quality Agri Products */}
              <div className="flex flex-col items-center text-center group cursor-default p-1 sm:p-0">
                <Leaf
                  size={22}
                  strokeWidth={1.8}
                  className="text-gray-800 mb-1.5 sm:mb-2 sm:w-[26px] sm:h-[26px] transition-transform duration-200 group-hover:scale-110 group-hover:text-primary shrink-0"
                />
                <span className="text-[11px] sm:text-xs md:text-[13px] font-bold text-gray-800 leading-tight font-rajdhani">
                  {tx(t.hero.highlight1)}
                </span>
              </div>

              {/* 2. Commercial Vehicle Servicing */}
              <div className="flex flex-col items-center text-center group cursor-default p-1 sm:p-0">
                <Cog
                  size={22}
                  strokeWidth={1.8}
                  className="text-gray-800 mb-1.5 sm:mb-2 sm:w-[26px] sm:h-[26px] transition-transform duration-200 group-hover:scale-110 group-hover:text-[#E31837] shrink-0"
                />
                <span className="text-[11px] sm:text-xs md:text-[13px] font-bold text-gray-800 leading-tight font-rajdhani">
                  {tx(t.hero.highlight2)}
                </span>
              </div>

              {/* 3. Trusted Association */}
              <div className="flex flex-col items-center text-center group cursor-default p-1 sm:p-0">
                <Handshake
                  size={22}
                  strokeWidth={1.8}
                  className="text-gray-800 mb-1.5 sm:mb-2 sm:w-[26px] sm:h-[26px] transition-transform duration-200 group-hover:scale-110 group-hover:text-primary shrink-0"
                />
                <span className="text-[11px] sm:text-xs md:text-[13px] font-bold text-gray-800 leading-tight font-rajdhani">
                  {tx(t.hero.highlight3)}
                </span>
              </div>

              {/* 4. Customer Focused Support */}
              <div className="flex flex-col items-center text-center group cursor-default p-1 sm:p-0">
                <Users
                  size={22}
                  strokeWidth={1.8}
                  className="text-gray-800 mb-1.5 sm:mb-2 sm:w-[26px] sm:h-[26px] transition-transform duration-200 group-hover:scale-110 group-hover:text-[#E31837] shrink-0"
                />
                <span className="text-[11px] sm:text-xs md:text-[13px] font-bold text-gray-800 leading-tight font-rajdhani">
                  {tx(t.hero.highlight4)}
                </span>
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-2 w-full sm:w-auto"
            >
              {/* Button 1: Explore Our Services */}
              <motion.button
                suppressHydrationWarning
                onClick={() => openShowcase('all')}
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-sm sm:text-base shadow-md shadow-red-950/20 hover:shadow-red-950/30 transition-all duration-200 cursor-pointer min-h-[44px]"
              >
                <span>{tx(t.hero.refCta1)}</span>
                <ArrowRight size={17} className="shrink-0" />
              </motion.button>

              {/* Button 2: Enquire About Vehicle Servicing */}
              <motion.button
                suppressHydrationWarning
                onClick={() => openEnquiry(
                  lang === 'en' ? 'SML Mahindra Commercial Vehicle Service' : 'एसएमएल महिंद्रा कमर्शियल वाहन सर्विस',
                  { isVehicleService: true }
                )}
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/80 hover:bg-white text-gray-900 font-bold font-rajdhani text-sm sm:text-base border border-gray-400 hover:border-gray-800 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-xs min-h-[44px]"
              >
                <span className="text-center">{tx(t.hero.refCta2)}</span>
              </motion.button>
            </motion.div>

            {/* Mobile Visual Preview Card (Truck & Bus visible on narrow mobile viewports) */}
            <motion.div
              variants={itemVariants}
              className="mt-5 sm:hidden bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-gray-200 shadow-sm w-full"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-gray-200">
                <span className="text-xs font-bold font-rajdhani text-gray-900 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#E31837] shrink-0" />
                  <span>SML Mahindra Workshop</span>
                </span>
                <span className="text-[10px] font-bold uppercase text-[#E31837] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-rajdhani shrink-0">
                  Rajnandgaon
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => openEnquiry(
                    lang === 'en' ? 'SML Mahindra Commercial Truck Servicing' : 'एसएमएल महिंद्रा कमर्शियल ट्रक सर्विसिंग',
                    { isVehicleService: true, vehicleModel: 'SML Samrat GS Series' }
                  )}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer group active:scale-[0.98] transition-transform"
                >
                  <Image
                    src="/images/sml-mahindra/sml-mahindra-truck.webp"
                    alt="SML Mahindra Samrat GS Commercial Truck"
                    fill
                    sizes="(max-width: 640px) 45vw, 250px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-white text-[10px] font-bold font-rajdhani drop-shadow">
                    SML Samrat Truck
                  </span>
                </div>

                <div
                  onClick={() => openEnquiry(
                    lang === 'en' ? 'SML Mahindra Passenger Bus Servicing' : 'एसएमएल महिंद्रा पैसेंजर बस सर्विसिंग',
                    { isVehicleService: true, vehicleModel: 'SML S7 School & Passenger Buses' }
                  )}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer group active:scale-[0.98] transition-transform"
                >
                  <Image
                    src="/images/sml-mahindra/sml-mahindra-bus.webp"
                    alt="SML Mahindra S7 Passenger and School Bus"
                    fill
                    sizes="(max-width: 640px) 45vw, 250px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-white text-[10px] font-bold font-rajdhani drop-shadow">
                    SML S7 Bus
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Spacious photographic staging area for the background SML vehicles & workshop */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5 pointer-events-none" />

        </div>
      </div>
    </section>
  );
}
