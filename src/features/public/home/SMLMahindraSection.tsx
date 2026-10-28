'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useSMLShowcase } from '@/contexts/SMLShowcaseContext';
import { t } from '@/constants/translations';
import {
  Wrench,
  CheckCircle2,
  Truck,
  Bus,
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowRight,
  Info,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface VehicleCardItem {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'trucks' | 'buses';
  typeEn: string;
  typeHi: string;
  specEn: string;
  specHi: string;
  image: string;
  altEn: string;
}

const FLEET_VEHICLES: VehicleCardItem[] = [
  {
    id: 'sml-samrat-tipper',
    nameEn: 'SML Samrat GS Tipper',
    nameHi: 'एसएमएल सम्राट जीएस टिपर',
    category: 'trucks',
    typeEn: 'Mining & Construction Tipper',
    typeHi: 'खनन व निर्माण टिपर',
    specEn: 'Diesel 6-Tyre Heavy Haulage',
    specHi: 'डीजल 6-टायर भारी ढुलाई',
    image: '/images/sml-mahindra/sml-samrat-tipper.webp',
    altEn: 'SML Mahindra Samrat GS Tipper Commercial Truck Servicing at Piyush Agro Industries',
  },
  {
    id: 'sml-sartaj-5252',
    nameEn: 'SML Sartaj 5252',
    nameHi: 'एसएमएल सरताज 5252',
    category: 'trucks',
    typeEn: 'Light Commercial Cargo',
    typeHi: 'लाइट कमर्शियल कार्गो',
    specEn: 'Diesel 4-Tyre City Logistics',
    specHi: 'डीजल 4-टायर सिटी लॉजिस्टिक्स',
    image: '/images/sml-mahindra/sml-sartaj-5252.webp',
    altEn: 'SML Mahindra Sartaj 5252 Light Commercial Truck Maintenance Support',
  },
  {
    id: 'sml-supreme-truck',
    nameEn: 'SML Supreme GS',
    nameHi: 'एसएमएल सुप्रीम जीएस',
    category: 'trucks',
    typeEn: 'Medium & Heavy Haulage',
    typeHi: 'मध्यम एवं भारी ढुलाई ट्रक',
    specEn: 'Diesel 6-Tyre Long Haul Cargo',
    specHi: 'डीजल 6-टायर लॉन्ग हॉल कार्गो',
    image: '/images/sml-mahindra/sml-supreme-truck.webp',
    altEn: 'SML Mahindra Supreme GS Medium Duty Truck Servicing',
  },
  {
    id: 'sml-s7-school-bus',
    nameEn: 'SML S7 School Bus',
    nameHi: 'एसएमएल एस7 स्कूल बस',
    category: 'buses',
    typeEn: 'Institutional & School Transit',
    typeHi: 'संस्थागत एवं स्कूल बस',
    specEn: 'Child-Safety Standards Compliant',
    specHi: 'बाल-सुरक्षा मानकों के अनुरूप',
    image: '/images/sml-mahindra/sml-s7-school-bus.webp',
    altEn: 'SML Mahindra S7 School Bus Safety Inspection and Servicing',
  },
  {
    id: 'sml-executive-bus',
    nameEn: 'SML Executive LX Bus',
    nameHi: 'एसएमएल एक्जीक्यूटिव एलएक्स बस',
    category: 'buses',
    typeEn: 'Staff & Passenger Fleet',
    typeHi: 'स्टाफ एवं पैसेंजर फ्लीट',
    specEn: 'Luxury Passenger Air-Conditioned Coach',
    specHi: 'लक्जरी पैसेंजर कोच',
    image: '/images/sml-mahindra/sml-executive-bus.webp',
    altEn: 'SML Mahindra Executive LX Commercial Staff Bus Fleet Maintenance',
  },
  {
    id: 'sml-hiroi-bus',
    nameEn: 'SML Hiroi Bus',
    nameHi: 'एसएमएल हिरोई बस',
    category: 'buses',
    typeEn: 'Tour & Sightseeing Coach',
    typeHi: 'टूर एवं दर्शनीय स्थल बस',
    specEn: 'High Durability Rugged Chassis',
    specHi: 'उच्च टिकाऊपन रग्ड चेसिस',
    image: '/images/sml-mahindra/sml-hiroi-bus.webp',
    altEn: 'SML Mahindra Hiroi Tour Bus Chassis & Mechanical Servicing',
  },
];

export default function SMLMahindraSection() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const { openShowcase } = useSMLShowcase();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'all' | 'trucks' | 'buses'>('all');

  const spotlightRef = useRef<HTMLDivElement>(null);
  const fleetRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollHorizontally = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredVehicles = FLEET_VEHICLES.filter((v) => {
    if (activeTab === 'all') return true;
    return v.category === activeTab;
  });

  const serviceItems = [
    tx(t.sml.svc1),
    tx(t.sml.svc2),
    tx(t.sml.svc3),
    tx(t.sml.svc4),
    tx(t.sml.svc5),
  ];

  // Motion variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
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

  const clipRevealVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.96, clipPath: 'inset(6% 0% 6% 0% round 24px)' },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0% round 24px)',
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="sml-service"
      className="py-20 sm:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden border-t border-b border-gray-100"
    >
      {/* Subtle Background Geometry */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-red-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-red-600/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── SECTION HEADER ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          {/* Logo & Association Badge Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-4"
          >
            <div className="h-10 w-24 relative overflow-hidden rounded-md shadow-xs border border-gray-200 bg-white p-1">
              <Image
                src="/images/sml-mahindra/sml-mahindra-logo.png"
                alt="SML Mahindra Limited Logo"
                fill
                sizes="100px"
                className="object-contain"
                priority
              />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 text-[#E31837] text-xs font-bold font-rajdhani uppercase tracking-wider border border-red-100 shadow-2xs">
              <ShieldCheck size={14} className="text-[#E31837]" />
              {tx(t.sml.assocBadge)}
            </span>
          </motion.div>

          {/* Section Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-rajdhani text-gray-900 tracking-tight mb-4"
          >
            {tx(t.sml.title)}{' '}
            <span className="text-[#E31837]">{tx(t.sml.titleHL)}</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-[#E31837] rounded-full mx-auto mb-5"
          />

          {/* Supporting Association Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium"
          >
            {tx(t.sml.subtitle)}
          </motion.p>
        </motion.div>

        {/* ── FEATURED TRUCK & BUS SPOTLIGHT (Mobile Horizontal Carousel / Desktop 2-Column Grid) ── */}
        <div className="mb-14 sm:mb-16">
          {/* Mobile Swipe Navigation Controls */}
          <div className="flex sm:hidden items-center justify-between gap-2 mb-3 px-1">
            <span className="text-[11px] font-bold font-rajdhani uppercase tracking-wider text-gray-500 flex items-center gap-1">
              <span>Swipe to browse spotlight</span>
              <ArrowRight size={12} className="text-[#E31837]" />
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollHorizontally(spotlightRef, 'left')}
                aria-label="Previous spotlight vehicle"
                className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollHorizontally(spotlightRef, 'right')}
                aria-label="Next spotlight vehicle"
                className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={spotlightRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:pb-0"
          >
            {/* 1. Featured Commercial Truck Card */}
            <motion.div
              variants={clipRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className="w-[86vw] sm:w-[82vw] max-w-[360px] lg:w-full lg:max-w-none shrink-0 snap-center group bg-white rounded-3xl border border-gray-200 shadow-card hover:shadow-card-hover hover:border-red-200 transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Visual Header with Genuine Truck Image */}
              <div className="relative w-full aspect-[21/11] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden border-b border-gray-100">
                <Image
                  src="/images/sml-mahindra/sml-mahindra-truck.webp"
                  alt="SML Mahindra Samrat GS Commercial Truck Servicing at Piyush Agro Industries Rajnandgaon"
                  fill
                  sizes="(max-width: 1024px) 86vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Category Badges */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold font-rajdhani tracking-wide shadow-xs flex items-center gap-1.5 border border-gray-100">
                    <Truck size={14} className="text-[#E31837]" />
                    {tx(t.sml.trucksCategory)}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#E31837] text-white text-[11px] font-bold font-rajdhani uppercase tracking-wider shadow-xs">
                    Spotlight
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold font-rajdhani text-gray-900 group-hover:text-[#E31837] transition-colors">
                      {tx(t.sml.trucksModel)}
                    </h3>
                    <span className="text-xs font-semibold text-[#E31837] uppercase tracking-wider bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-md">
                      Haulage & Tipper
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {tx(t.sml.trucksDesc)}
                  </p>

                  {/* Truck Highlights */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {[
                      lang === 'en' ? 'Chassis & Subframe Check' : 'चेसिस व सबफ्रेम जांच',
                      lang === 'en' ? 'Brake & Air System Service' : 'ब्रेक व एयर सिस्टम सर्विस',
                      lang === 'en' ? 'Periodic Lubrication & Oil' : 'आवधिक लुब्रिकेशन व ऑयल',
                      lang === 'en' ? 'Suspension Maintenance' : 'सस्पेंशन व लीफ स्प्रिंग मरम्मत',
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-700 bg-gray-50/80 border border-gray-100 px-3 py-2 rounded-xl">
                        <CheckCircle2 size={13} className="text-[#E31837] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  suppressHydrationWarning
                  onClick={() => openEnquiry(
                    lang === 'en' ? 'SML Mahindra Commercial Truck Servicing' : 'एसएमएल महिंद्रा कमर्शियल ट्रक सर्विसिंग',
                    { isVehicleService: true, vehicleModel: 'SML Samrat GS Series' }
                  )}
                  className="w-full py-3.5 px-4 rounded-xl bg-gray-900 hover:bg-[#E31837] text-white font-bold font-rajdhani text-sm flex items-center justify-center gap-2 transition-colors duration-250 cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <span>{lang === 'en' ? 'Enquire for Commercial Trucks' : 'ट्रक सर्विस के लिए पूछताछ करें'}</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* 2. Featured Passenger Buses Card */}
            <motion.div
              variants={clipRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className="w-[86vw] sm:w-[82vw] max-w-[360px] lg:w-full lg:max-w-none shrink-0 snap-center group bg-white rounded-3xl border border-gray-200 shadow-card hover:shadow-card-hover hover:border-red-200 transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Visual Header with Genuine Bus Image */}
              <div className="relative w-full aspect-[21/11] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden border-b border-gray-100">
                <Image
                  src="/images/sml-mahindra/sml-mahindra-bus.webp"
                  alt="SML Mahindra S7 Passenger and School Bus Servicing Support at Piyush Agro Industries"
                  fill
                  sizes="(max-width: 1024px) 86vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Category Badges */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold font-rajdhani tracking-wide shadow-xs flex items-center gap-1.5 border border-gray-100">
                    <Bus size={14} className="text-[#E31837]" />
                    {tx(t.sml.busesCategory)}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#E31837] text-white text-[11px] font-bold font-rajdhani uppercase tracking-wider shadow-xs">
                    Spotlight
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold font-rajdhani text-gray-900 group-hover:text-[#E31837] transition-colors">
                      {tx(t.sml.busesModel)}
                    </h3>
                    <span className="text-xs font-semibold text-[#E31837] uppercase tracking-wider bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-md">
                      School & Staff Fleet
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {tx(t.sml.busesDesc)}
                  </p>

                  {/* Bus Highlights */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {[
                      lang === 'en' ? 'Passenger Safety Check' : 'यात्री सुरक्षा व आपातकालीन जांच',
                      lang === 'en' ? 'Steering & Alignment Check' : 'स्टीयरिंग एवं अलाइनमेंट जांच',
                      lang === 'en' ? 'Brake Drum & Liner Check' : 'ब्रेक ड्रम व लाइनर सर्विस',
                      lang === 'en' ? 'Preventive Bus Servicing' : 'निवारक बस मेंटेनेंस सर्विस',
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-700 bg-gray-50/80 border border-gray-100 px-3 py-2 rounded-xl">
                        <CheckCircle2 size={13} className="text-[#E31837] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  suppressHydrationWarning
                  onClick={() => openEnquiry(
                    lang === 'en' ? 'SML Mahindra Passenger Bus Servicing' : 'एसएमएल महिंद्रा पैसेंजर बस सर्विसिंग',
                    { isVehicleService: true, vehicleModel: 'SML S7 School & Passenger Buses' }
                  )}
                  className="w-full py-3.5 px-4 rounded-xl bg-gray-900 hover:bg-[#E31837] text-white font-bold font-rajdhani text-sm flex items-center justify-center gap-2 transition-colors duration-250 cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <span>{lang === 'en' ? 'Enquire for Passenger Buses' : 'बस सर्विस के लिए पूछताछ करें'}</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── FLEET GALLERY (Mobile Horizontal Carousel / Tablet & Desktop Grid) ── */}
        <div className="mb-14 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E31837] text-xs font-bold font-rajdhani uppercase tracking-wider border border-red-100 mb-2">
                <Layers size={13} />
                {tx(t.sml.galleryBadge)}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-rajdhani text-gray-900">
                {lang === 'en' ? 'Authentic SML Mahindra Fleet Serviced' : 'प्रमाणिक एसएमएल महिंद्रा वाहन मॉडल'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                {tx(t.sml.gallerySubtitle)}
              </p>
            </div>

            {/* Category Filter Pills & Mobile Navigation */}
            <div className="flex items-center justify-between gap-3 self-stretch md:self-auto">
              <div className="inline-flex items-center gap-1.5 bg-gray-100/90 p-1 rounded-2xl border border-gray-200">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-rajdhani transition-all duration-200 cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-gray-900 text-white shadow-xs'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {tx(t.sml.allModels)}
                </button>
                <button
                  onClick={() => setActiveTab('trucks')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-rajdhani transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    activeTab === 'trucks'
                      ? 'bg-[#E31837] text-white shadow-xs'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Truck size={13} />
                  {tx(t.sml.trucksTab)}
                </button>
                <button
                  onClick={() => setActiveTab('buses')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-rajdhani transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    activeTab === 'buses'
                      ? 'bg-[#E31837] text-white shadow-xs'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Bus size={13} />
                  {tx(t.sml.busesTab)}
                </button>
              </div>

              {/* Full Showcase Trigger */}
              <button
                onClick={() => openShowcase(activeTab === 'trucks' ? 'trucks' : activeTab === 'buses' ? 'passenger-buses' : 'all')}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E31837] hover:bg-[#C8102E] text-white text-xs font-bold font-rajdhani transition-colors shadow-xs cursor-pointer"
              >
                <span>{lang === 'en' ? 'Full 15-Model Showcase' : 'पूर्ण 15-मॉडल शोकेस'}</span>
                <ArrowRight size={13} />
              </button>

              {/* Mobile Arrows for Fleet Carousel */}
              <div className="flex sm:hidden items-center gap-1.5">
                <button
                  onClick={() => scrollHorizontally(fleetRef, 'left')}
                  aria-label="Previous fleet vehicle"
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollHorizontally(fleetRef, 'right')}
                  aria-label="Next fleet vehicle"
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Vehicle Carousel / Grid */}
          <div
            ref={fleetRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0"
          >
            <AnimatePresence>
              {filteredVehicles.map((vehicle) => (
                <motion.div
                  layout
                  key={vehicle.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="w-[80vw] sm:w-full max-w-[320px] sm:max-w-none shrink-0 snap-center group bg-white rounded-2xl border border-gray-200/90 shadow-card hover:shadow-card-hover hover:border-red-300 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Vehicle Image Stage */}
                  <div className="relative aspect-[16/10] bg-gradient-to-b from-gray-50/70 to-gray-100/50 p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.altEn}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold font-rajdhani uppercase tracking-wider text-gray-700 bg-white/95 px-2.5 py-0.5 rounded-full border border-gray-200 shadow-2xs">
                      {lang === 'hi' ? vehicle.typeHi : vehicle.typeEn}
                    </span>
                  </div>

                  {/* Vehicle Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-lg font-bold font-rajdhani text-gray-900 group-hover:text-[#E31837] transition-colors">
                          {lang === 'hi' ? vehicle.nameHi : vehicle.nameEn}
                        </h4>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                          {vehicle.category === 'trucks' ? 'Truck' : 'Bus'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-4">
                        {lang === 'hi' ? vehicle.specHi : vehicle.specEn}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold font-rajdhani text-xs flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer"
                      >
                        <Info size={13} className="text-[#E31837]" />
                        <span>{lang === 'en' ? 'Specs & Gallery' : 'विवरण व फोटो'}</span>
                      </Link>

                      <button
                        suppressHydrationWarning
                        onClick={() => openEnquiry(
                          lang === 'en'
                            ? `SML Mahindra Servicing: ${vehicle.nameEn}`
                            : `एसएमएल महिंद्रा सर्विस: ${vehicle.nameHi}`,
                          { isVehicleService: true, vehicleModel: vehicle.nameEn }
                        )}
                        className="py-2 px-3 rounded-xl bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-xs flex items-center gap-1 transition-all duration-200 cursor-pointer shadow-xs"
                      >
                        <span>{lang === 'en' ? 'Enquire' : 'पूछताछ'}</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Full Interactive Catalogue Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-700/80 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-[#E31837] shrink-0">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="font-extrabold font-rajdhani text-base sm:text-lg text-white">
                  {lang === 'en' ? 'Explore Complete 15-Model Commercial Vehicle Showcase' : 'एसएमएल महिंद्रा संपूर्ण 15-मॉडल शोकेस देखें'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  {lang === 'en'
                    ? 'Interactive discovery with official photography, technical specs, school buses, and heavy haulage cargo.'
                    : 'कार्गो ट्रक, एलसीवी, स्कूल बस, स्टाफ बस एवं टिपर के पूर्ण विनिर्देशों सहित संपूर्ण श्रृंखला।'}
                </p>
              </div>
            </div>

            <button
              onClick={() => openShowcase('all')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Launch Full Showcase' : 'शोकेस लॉन्च करें'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* ── VERIFIED SERVICING SUPPORT OVERVIEW ── */}
        <motion.div
          variants={clipRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="bg-gray-50/90 rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-200 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E31837] mb-1 font-rajdhani">
                <Wrench size={16} />
                <span>{tx(t.sml.badge)}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-rajdhani text-gray-900">
                {tx(t.sml.servicesOffered)}
              </h3>
            </div>

            {/* Quick Contact Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:9425245291"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 hover:text-[#E31837] hover:border-red-200 text-xs sm:text-sm font-bold font-rajdhani transition-colors shadow-2xs"
              >
                <Phone size={15} className="text-[#E31837]" />
                <span>+91 9425245291</span>
              </a>
              <a
                href="https://wa.me/919425245291?text=Hello,%20I%20am%20enquiring%20about%20SML%20Mahindra%20commercial%20vehicle%20servicing%20support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold font-rajdhani transition-colors shadow-2xs"
              >
                <MessageCircle size={15} />
                <span>{tx(t.sml.waBtn)}</span>
              </a>
            </div>
          </div>

          {/* Genuine Servicing List Grid (Mobile Carousel / Tablet & Desktop Grid) */}
          <div className="mb-2">
            <div className="flex sm:hidden items-center justify-between gap-2 mb-2 px-1">
              <span className="text-[11px] font-bold font-rajdhani uppercase tracking-wider text-gray-500 flex items-center gap-1">
                <span>Swipe service capabilities</span>
                <ArrowRight size={12} className="text-[#E31837]" />
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollHorizontally(servicesRef, 'left')}
                  aria-label="Previous service capability"
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => scrollHorizontally(servicesRef, 'right')}
                  aria-label="Next service capability"
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div
              ref={servicesRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-3 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 mb-6"
            >
              {serviceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[76vw] sm:w-full max-w-[280px] sm:max-w-none shrink-0 snap-center bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs flex items-start gap-3 hover:border-red-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E31837] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug">
                      {item}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'en' ? 'Piyush Agro Support Team' : 'पियूष एग्रो सपोर्ट टीम'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prominent Red CTA Button & Compliance Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-start gap-2.5 text-xs text-gray-500 max-w-2xl">
              <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {tx(t.sml.disclaimer)}
              </p>
            </div>

            <button
              suppressHydrationWarning
              onClick={() => openEnquiry(
                lang === 'en' ? 'SML Mahindra Commercial Vehicle Service' : 'एसएमएल महिंद्रा कमर्शियल वाहन सर्विस',
                { isVehicleService: true }
              )}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center shrink-0 cursor-pointer"
            >
              {tx(t.sml.ctaBtn)}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
