'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useSMLShowcase } from '@/contexts/SMLShowcaseContext';
import { 
  SML_VEHICLES, 
  SML_CATEGORIES, 
  VehicleCategoryKey, 
  SMLVehicleItem 
} from '@/constants/smlVehiclesData';
import Link from 'next/link';
import { 
  X, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Wrench, 
  Check, 
  Shield, 
  Layers, 
  Cpu, 
  Truck, 
  Settings, 
  Clock, 
  MapPin,
  ArrowUpRight
} from 'lucide-react';

const FLAGSHIP_IDS = [
  'sml-samrat-gs',
  'sml-sartaj-5252',
  'sml-executive-lx-coach',
  'sml-s7-school-bus',
  'sml-s7-staff-bus',
  'sml-samrat-tipper'
];

export default function SMLVehicleDiscoveryModal() {
  const { lang } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const shouldReduceMotion = useReducedMotion();
  const { 
    isOpen, 
    closeShowcase, 
    activeCategory, 
    setActiveCategory, 
    searchQuery,
    setSearchQuery 
  } = useSMLShowcase();

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Filtered vehicle list
  const filteredVehicles = useMemo(() => {
    return SML_VEHICLES.filter((vehicle) => {
      const matchesCategory = activeCategory === 'all' || vehicle.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        vehicle.nameEn.toLowerCase().includes(q) ||
        vehicle.nameHi.includes(q) ||
        vehicle.categoryLabelEn.toLowerCase().includes(q) ||
        vehicle.taglineEn.toLowerCase().includes(q) ||
        vehicle.descriptionEn.toLowerCase().includes(q) ||
        vehicle.fuelType.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Determine the flagship feature model and supporting models
  const { featureVehicle, supportingVehicles } = useMemo(() => {
    if (filteredVehicles.length === 0) {
      return { featureVehicle: null, supportingVehicles: [] };
    }
    // Try to find a flagship in current filtered set
    const flagship = filteredVehicles.find(v => FLAGSHIP_IDS.includes(v.id)) || filteredVehicles[0];
    const rest = filteredVehicles.filter(v => v.id !== flagship.id);
    return { featureVehicle: flagship, supportingVehicles: rest };
  }, [filteredVehicles]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SML_VEHICLES.length };
    SML_VEHICLES.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Commercial Vehicle Discovery Showcase"
        className="fixed inset-0 z-[90] flex flex-col bg-[#F9FAFB] overflow-hidden text-gray-900"
      >
        {/* ── TOP ARCHITECTURAL COMMAND BAR ── */}
        <header className="shrink-0 bg-white border-b border-[#DCE0E5] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            {/* Branding Section */}
            <div className="flex items-center gap-3">
              <span className="font-rajdhani font-extrabold text-base sm:text-lg tracking-wider text-gray-950 uppercase">
                Piyush Agro Industries
              </span>
              <span className="h-4 w-px bg-gray-300 hidden sm:inline-block" />
              <div className="flex items-center gap-2">
                <div className="relative w-20 h-5 sm:w-24 sm:h-6">
                  <Image
                    src="/images/sml-mahindra/sml-mahindra-logo.png"
                    alt="SML Mahindra"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <span className="hidden lg:inline-block text-[11px] font-semibold tracking-wider text-gray-500 uppercase font-rajdhani">
                  Authorized Commercial Support
                </span>
              </div>
            </div>

            {/* Helpline & Close Button */}
            <div className="flex items-center gap-3">
              <a
                href="tel:9425245291"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#E31837] tracking-wider transition-colors font-rajdhani uppercase"
              >
                <Phone size={13} className="text-[#E31837]" />
                <span>+91 94252 45291</span>
              </a>

              <button
                onClick={closeShowcase}
                aria-label="Close vehicle discovery"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#DCE0E5] bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold font-rajdhani tracking-wider uppercase transition-colors focus:outline-hidden focus:ring-1 focus:ring-gray-950"
              >
                <span>{lang === 'en' ? 'Close' : 'बंद करें'}</span>
                <span className="hidden sm:inline text-[10px] text-gray-400 font-mono">[ESC]</span>
                <X size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* ── SCROLLABLE SHOWCASE CONTENT ── */}
        <main className="flex-1 overflow-y-auto scrollbar-vehicle">
          {/* SECTION A: EDITORIAL INTRODUCTION */}
          <section className="bg-white border-b border-[#DCE0E5] pt-8 pb-10 sm:pt-12 sm:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Text Content */}
                <div className="lg:col-span-7">
                  <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-2">
                    {lang === 'en' ? 'Commercial Fleet Discovery' : 'कमर्शियल फ्लीट डिस्कवरी'}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-rajdhani tracking-tight text-gray-950 uppercase leading-none">
                    {lang === 'en' ? 'Find the Right Vehicle for Your Business.' : 'अपने व्यवसाय हेतु सही कमर्शियल वाहन चुनें।'}
                  </h1>
                  <div className="w-12 h-0.5 bg-[#E31837] my-4" />
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl font-normal">
                    {lang === 'en'
                      ? 'Piyush Agro Industries delivers certified commercial vehicle servicing, periodic preventive maintenance, and heavy-duty fabrication in association with SML Mahindra Limited. Explore the verified commercial lineup engineered for long-haul logistics, passenger transit, child-safe school transport, and high-tensile tipper operations.'
                      : 'पियूष एग्रो इंडस्ट्रीज एसएमएल महिंद्रा के सहयोग से प्रमाणित कमर्शियल वाहन सर्विसिंग, आवधिक मेंटेनेंस एवं हेवी-ड्यूटी फैब्रिकेशन सुविधा प्रदान करता है। कार्गो ट्रक, स्कूल बस, पैसेंजर कोच व टिपर की संपूर्ण श्रृंखला देखें।'}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="block font-bold text-gray-950 font-rajdhani text-sm">100% Genuine</span>
                      <span className="text-gray-500">Official SML Lineup</span>
                    </div>
                    <div>
                      <span className="block font-bold text-gray-950 font-rajdhani text-sm">Full Diagnostics</span>
                      <span className="text-gray-500">Authorized Workshop</span>
                    </div>
                    <div>
                      <span className="block font-bold text-gray-950 font-rajdhani text-sm">Rajnandgaon, CG</span>
                      <span className="text-gray-500">Dedicated Facility</span>
                    </div>
                  </div>
                </div>

                {/* Clean Automotive Studio Visual */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[16/10] bg-[#F6F7F9] border border-[#DCE0E5] rounded-lg p-6 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/sml-mahindra/sml-samrat-gs.png"
                        alt="SML Mahindra Commercial Vehicle Lineup"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="object-contain"
                      />
                    </div>
                    <span className="absolute bottom-2.5 right-3 text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                      SML Samrat GS 10.2T
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION B: MODERN CATEGORY NAVIGATION (NO PILL BADGES) */}
          <section className="sticky top-0 bg-white border-b border-[#DCE0E5] z-20 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
                {/* Horizontal Text Navigation */}
                <nav 
                  role="tablist"
                  aria-label="Vehicle Categories"
                  className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none"
                >
                  {SML_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    const count = categoryCounts[cat.key] || 0;
                    return (
                      <button
                        key={cat.key}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`group pb-3 pt-1 text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${
                          isActive 
                            ? 'text-gray-950' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <span>{lang === 'en' ? cat.labelEn : cat.labelHi}</span>
                          <span className={`text-[11px] font-mono font-normal ${isActive ? 'text-[#E31837]' : 'text-gray-400'}`}>
                            ({count})
                          </span>
                        </span>
                        {/* Red Active Indicator Line */}
                        {isActive && (
                          <motion.span
                            layoutId="activeCategoryIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E31837]"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Minimalist Search Box */}
                <div className="pb-2 md:pb-0 shrink-0 w-full md:w-60">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === 'en' ? 'Search models, fuel, tonnage...' : 'मॉडल अथवा विनिर्देश खोजें...'}
                      className="w-full pl-8 pr-7 py-1.5 bg-gray-50 border border-[#DCE0E5] rounded-md text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:border-gray-950 focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION C: PREMIUM VEHICLE SHOWCASE (FEATURE + SUPPORTING GRID) */}
          <section className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Result Meta Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                  {lang === 'en' ? (
                    <>Displaying <strong className="text-gray-900">{filteredVehicles.length}</strong> verified commercial models</>
                  ) : (
                    <><strong className="text-gray-900">{filteredVehicles.length}</strong> मॉडल उपलब्ध</>
                  )}
                </span>

                {(activeCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs font-bold text-[#E31837] hover:underline font-rajdhani uppercase tracking-wider"
                  >
                    {lang === 'en' ? 'Reset Filters' : 'फ़िल्टर रीसेट करें'}
                  </button>
                )}
              </div>

              {/* EMPTY STATE */}
              {filteredVehicles.length === 0 && (
                <div className="py-16 text-center bg-white border border-[#DCE0E5] rounded-lg p-6 max-w-lg mx-auto">
                  <Truck size={36} className="mx-auto text-gray-400 mb-3" />
                  <h3 className="text-base font-bold text-gray-900 font-rajdhani uppercase">
                    {lang === 'en' ? 'No Commercial Vehicles Match Your Query' : 'कोई मॉडल नहीं मिला'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4">
                    {lang === 'en' 
                      ? 'No vehicle specifications match your selected category or search keyword. Clear the search or switch categories.'
                      : 'आपके खोज मापदंड के अनुसार कोई वाहन नहीं मिला। कृपया पुनः प्रयास करें।'}
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-gray-900 hover:bg-[#E31837] text-white text-xs font-bold font-rajdhani uppercase tracking-wider rounded-md transition-colors"
                  >
                    {lang === 'en' ? 'View All Vehicles' : 'सभी वाहन देखें'}
                  </button>
                </div>
              )}

              {/* 1. EDITORIAL FLAGSHIP FEATURE CARD */}
              {featureVehicle && (
                <div className="mb-8">
                  <div className="bg-white border border-[#DCE0E5] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:border-gray-400">
                    {/* Large Image Stage */}
                    <div className="lg:col-span-7 bg-[#F6F7F9] p-6 sm:p-8 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-[#DCE0E5] group">
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={imageErrors[featureVehicle.id] ? '/images/sml-mahindra/sml-mahindra-truck.webp' : featureVehicle.primaryImage}
                          alt={featureVehicle.nameEn}
                          fill
                          sizes="(max-width: 1024px) 100vw, 720px"
                          className="object-contain transition-transform duration-500 group-hover:scale-103"
                          onError={() => handleImageError(featureVehicle.id)}
                        />
                      </div>
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-white border border-[#DCE0E5] px-2 py-0.5 text-gray-700">
                          {featureVehicle.fuelType}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 bg-white border border-[#DCE0E5] px-2 py-0.5">
                          {lang === 'en' ? featureVehicle.categoryLabelEn : featureVehicle.categoryLabelHi}
                        </span>
                      </div>
                    </div>

                    {/* Feature Details Content */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="mb-3">
                          <span className="text-[11px] font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-1">
                            {lang === 'en' ? 'Featured Model' : 'प्रमुख मॉडल'}
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-black font-rajdhani text-gray-950 uppercase leading-tight">
                            {featureVehicle.nameEn}
                          </h2>
                          {featureVehicle.nameHi && (
                            <p className="text-xs font-semibold text-gray-500 font-rajdhani mt-0.5">
                              {featureVehicle.nameHi}
                            </p>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                          {lang === 'en' ? featureVehicle.descriptionEn : featureVehicle.descriptionHi}
                        </p>

                        {/* 4-Point Spec Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-gray-100 text-xs">
                          <div>
                            <span className="text-gray-400 block font-mono text-[10px] uppercase">GVW / Capacity</span>
                            <span className="font-bold text-gray-900 font-rajdhani text-sm">
                              {lang === 'en' ? featureVehicle.specs.gvwOrCapacity.valueEn : featureVehicle.specs.gvwOrCapacity.valueHi}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-mono text-[10px] uppercase">Engine Type</span>
                            <span className="font-bold text-gray-900 font-rajdhani text-sm">
                              SLT4 Turbo (3455 cc)
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-mono text-[10px] uppercase">Power / Torque</span>
                            <span className="font-bold text-gray-900 font-rajdhani text-sm">
                              100 HP / 315 Nm
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-mono text-[10px] uppercase">Braking</span>
                            <span className="font-bold text-gray-900 font-rajdhani text-sm">
                              Air Brakes + ABS
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Feature Actions */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-[#DCE0E5]">
                        <Link
                          href={`/vehicles/${featureVehicle.id}`}
                          onClick={closeShowcase}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gray-900 hover:bg-[#E31837] text-white font-bold font-rajdhani text-xs sm:text-sm uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                        >
                          <span>{lang === 'en' ? 'View Technical Specifications' : 'पूर्ण विनिर्देश देखें'}</span>
                          <ArrowRight size={14} />
                        </Link>

                        <button
                          onClick={() => openEnquiry(featureVehicle.nameEn, {
                            isVehicleService: true,
                            vehicleModel: featureVehicle.nameEn,
                            serviceRequirement: `Commercial servicing and inspection for ${featureVehicle.nameEn}`,
                          })}
                          className="inline-flex items-center justify-center gap-1 py-2.5 px-4 bg-white hover:bg-gray-100 text-gray-900 border border-[#DCE0E5] font-bold font-rajdhani text-xs sm:text-sm uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                        >
                          <span>{lang === 'en' ? 'Enquire Now' : 'पूछताछ करें'}</span>
                          <ArrowUpRight size={14} className="text-[#E31837]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SUPPORTING VEHICLE CATALOGUE GRID */}
              {supportingVehicles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {supportingVehicles.map((vehicle) => {
                    const isImgErr = imageErrors[vehicle.id];
                    const cardImg = isImgErr ? '/images/sml-mahindra/sml-mahindra-truck.webp' : vehicle.primaryImage;

                    return (
                      <div
                        key={vehicle.id}
                        className="group bg-white border border-[#DCE0E5] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
                      >
                        {/* Image Stage */}
                        <div>
                          <div className="relative aspect-[16/10] bg-[#F6F7F9] p-4 flex items-center justify-center border-b border-[#DCE0E5] overflow-hidden">
                            <div className="relative w-full h-full">
                              <Image
                                src={cardImg}
                                alt={vehicle.nameEn}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-contain p-1 transition-transform duration-300 group-hover:scale-104"
                                onError={() => handleImageError(vehicle.id)}
                              />
                            </div>
                            <div className="absolute top-3 left-3 flex items-center gap-1.5">
                              <span className="text-[9px] font-mono tracking-widest uppercase bg-white border border-[#DCE0E5] px-1.5 py-0.5 text-gray-700">
                                {vehicle.fuelType}
                              </span>
                              <span className="text-[9px] font-mono tracking-widest uppercase bg-white border border-[#DCE0E5] px-1.5 py-0.5 text-gray-500">
                                {lang === 'en' ? vehicle.categoryLabelEn : vehicle.categoryLabelHi}
                              </span>
                            </div>
                          </div>

                          {/* Body Information */}
                          <div className="p-4 sm:p-5">
                            <div className="mb-2">
                              <h3 className="font-extrabold text-base text-gray-950 font-rajdhani uppercase group-hover:text-[#E31837] transition-colors leading-snug">
                                {vehicle.nameEn}
                              </h3>
                              {vehicle.nameHi && (
                                <p className="text-xs font-semibold text-gray-500 font-rajdhani mt-0.5">
                                  {vehicle.nameHi}
                                </p>
                              )}
                            </div>

                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                              {lang === 'en' ? vehicle.taglineEn : vehicle.taglineHi}
                            </p>

                            {/* Minimal 2-Column Spec */}
                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-[11px]">
                              <div>
                                <span className="text-gray-400 block font-mono text-[9px] uppercase">GVW / Seats</span>
                                <span className="font-bold text-gray-900 font-rajdhani">
                                  {lang === 'en' ? vehicle.specs.gvwOrCapacity.valueEn : vehicle.specs.gvwOrCapacity.valueHi}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400 block font-mono text-[9px] uppercase">Engine</span>
                                <span className="font-bold text-gray-900 font-rajdhani">
                                  SLT4 Turbo
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="p-4 pt-0">
                          <div className="flex items-center gap-2 pt-3 border-t border-[#DCE0E5]">
                            <Link
                              href={`/vehicles/${vehicle.id}`}
                              onClick={closeShowcase}
                              className="flex-1 py-2 px-3 text-xs font-bold font-rajdhani uppercase tracking-wider text-gray-800 bg-gray-50 hover:bg-gray-100 border border-[#DCE0E5] rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>{lang === 'en' ? 'View Details' : 'विवरण'}</span>
                              <ChevronRight size={13} className="text-gray-400 group-hover:text-[#E31837]" />
                            </Link>

                            <button
                              onClick={() => openEnquiry(vehicle.nameEn, {
                                isVehicleService: true,
                                vehicleModel: vehicle.nameEn,
                                serviceRequirement: `Service enquiry for ${vehicle.nameEn}`,
                              })}
                              className="py-2 px-3 text-xs font-bold font-rajdhani uppercase tracking-wider text-white bg-gray-900 hover:bg-[#E31837] rounded-md transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>{lang === 'en' ? 'Enquire' : 'पूछताछ'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* SECTION E: SERVICE DISCOVERY */}
          <section className="bg-white border-t border-b border-[#DCE0E5] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-8 sm:mb-10">
                <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-1">
                  {lang === 'en' ? 'Certified Fleet Maintenance' : 'प्रमाणित फ्लीट मेंटेनेंस'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-rajdhani text-gray-950 uppercase tracking-tight">
                  {lang === 'en' ? 'Authorized Workshop Services & Fleet Support' : 'अधिकृत वर्कशॉप सर्विसेज एवं फ्लीट सपोर्ट'}
                </h2>
                <div className="w-10 h-0.5 bg-[#E31837] my-3" />
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {lang === 'en'
                    ? 'Our dedicated mechanical workshop on Khairagarh Road, Rajnandgaon, provides complete commercial vehicle inspection, body fabrication, hydraulic tipping overhauls, and genuine parts support for fleet owners, contractors, and transport operators.'
                    : 'खैरागढ़ रोड, राजनांदगांव स्थित हमारा अधिकृत वर्कशॉप कमर्शियल फ्लीट मालिकों, ट्रांसपोर्टरों एवं ठेकेदारों हेतु संपूर्ण मेंटेनेंस, हाइड्रोलिक टिपर फैब्रिकेशन एवं ओरिजिनल स्पेयर पार्ट्स सुविधा उपलब्ध कराता है।'}
                </p>
              </div>

              {/* 5-Card Service Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Commercial Vehicle Servicing */}
                <div className="p-5 border border-[#DCE0E5] rounded-lg bg-[#F9FAFB] hover:border-gray-400 transition-colors">
                  <div className="w-9 h-9 rounded-md bg-gray-900 text-white flex items-center justify-center mb-3">
                    <Wrench size={18} />
                  </div>
                  <h3 className="font-extrabold text-base font-rajdhani text-gray-950 uppercase mb-1">
                    {lang === 'en' ? 'Vehicle Servicing & Diagnostics' : 'कमर्शियल सर्विसिंग एवं डायग्नोस्टिक्स'}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Comprehensive multi-point mechanical inspections, electronic fault diagnosis, SLT4 engine tuning, and scheduled periodic oil and filter changes.'
                      : 'मल्टी-पॉइंट मैकेनिकल निरीक्षण, इलेक्ट्रॉनिक फॉल्ट डायग्नोसिस, एसएलटी4 इंजन ट्यूनिंग एवं आवधिक ऑयल और फिल्टर बदलाव।'}
                  </p>
                </div>

                {/* 2. Preventive Fleet Maintenance */}
                <div className="p-5 border border-[#DCE0E5] rounded-lg bg-[#F9FAFB] hover:border-gray-400 transition-colors">
                  <div className="w-9 h-9 rounded-md bg-gray-900 text-white flex items-center justify-center mb-3">
                    <Clock size={18} />
                  </div>
                  <h3 className="font-extrabold text-base font-rajdhani text-gray-950 uppercase mb-1">
                    {lang === 'en' ? 'Preventive Fleet Maintenance' : 'निवारक फ्लीट मेंटेनेंस अनुबंध'}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Scheduled maintenance contracts for school and corporate bus fleets, brake drum relining, dual-circuit air brake calibration, and steering wheel alignment.'
                      : 'स्कूल एवं कॉरपोरेट बस फ्लीट हेतु आवधिक मेंटेनेंस अनुबंध, ब्रेक लाइनर सर्विसिंग, एयर ब्रेक टेस्टिंग व स्टीयरिंग अलाइनमेंट।'}
                  </p>
                </div>

                {/* 3. Fabrication & Tipper Conversions */}
                <div className="p-5 border border-[#DCE0E5] rounded-lg bg-[#F9FAFB] hover:border-gray-400 transition-colors">
                  <div className="w-9 h-9 rounded-md bg-gray-900 text-white flex items-center justify-center mb-3">
                    <Layers size={18} />
                  </div>
                  <h3 className="font-extrabold text-base font-rajdhani text-gray-950 uppercase mb-1">
                    {lang === 'en' ? 'Fabrication & Tipper Engineering' : 'टिपर एवं वाहन फैब्रिकेशन इंजीनियरिंग'}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Specialized heavy-duty hydraulic ram hoist installation, reinforced high-tensile steel tipping bodies, subframe reinforcement, and custom trailer fabrications.'
                      : 'हेवी-ड्यूटी हाइड्रोलिक रैम स्थापना, हाई-टेन्साइल स्टील टिपर बॉडी निर्माण, सबफ्रेम मजबूतीकरण एवं कस्टम कृषि ट्रेलर फैब्रिकेशन।'}
                  </p>
                </div>

                {/* 4. Genuine OEM Parts */}
                <div className="p-5 border border-[#DCE0E5] rounded-lg bg-[#F9FAFB] hover:border-gray-400 transition-colors">
                  <div className="w-9 h-9 rounded-md bg-gray-900 text-white flex items-center justify-center mb-3">
                    <Settings size={18} />
                  </div>
                  <h3 className="font-extrabold text-base font-rajdhani text-gray-950 uppercase mb-1">
                    {lang === 'en' ? 'Genuine SML Spare Parts' : 'वास्तविक एसएमएल स्पेयर पार्ट्स'}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Guaranteed authentic manufacturer spare parts, suspension leaf springs, brake shoes, clutch plates, and filtration units for uninterrupted fleet longevity.'
                      : 'ओरिजिनल निर्माता स्पेयर पार्ट्स, लीफ स्प्रिंग सस्पेंशन, ब्रेक शू, क्लच प्लेट्स एवं फिल्टर यूनिट्स की विश्वसनीय आपूर्ति।'}
                  </p>
                </div>

                {/* 5. After-Sales Assistance */}
                <div className="p-5 border border-[#DCE0E5] rounded-lg bg-[#F9FAFB] hover:border-gray-400 transition-colors md:col-span-2 lg:col-span-2">
                  <div className="w-9 h-9 rounded-md bg-gray-900 text-white flex items-center justify-center mb-3">
                    <Shield size={18} />
                  </div>
                  <h3 className="font-extrabold text-base font-rajdhani text-gray-950 uppercase mb-1">
                    {lang === 'en' ? 'Dedicated After-Sales & Fitness Renewal Support' : 'बिक्री उपरांत सहायता एवं फिटनेस नवीनीकरण'}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Priority workshop turnaround for mission-critical commercial transport, emergency mechanical repair support, and government fitness inspection preparation.'
                      : 'कमर्शियल वाहनों के लिए प्राथमिकता के आधार पर त्वरित वर्कशॉप सर्विसिंग, आपातकालीन तकनीकी सहायता एवं फिटनेस प्रमाणन की तैयारी।'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION F: STRONG CONVERSION SECTION */}
          <section className="py-12 sm:py-16 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#111315] text-white rounded-lg border border-[#23272E] p-8 sm:p-12 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-2">
                      {lang === 'en' ? 'Direct Workshop Consultation' : 'प्रत्यक्ष वर्कशॉप परामर्श'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-rajdhani uppercase tracking-tight text-white leading-tight">
                      {lang === 'en' ? 'Need Commercial Vehicle Support or Fleet Consultation?' : 'कमर्शियल वाहन सहयोग अथवा फ्लीट परामर्श चाहिए?'}
                    </h2>
                    <div className="w-10 h-0.5 bg-[#E31837] my-3" />
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                      {lang === 'en'
                        ? 'Visit our authorized service facility in Thelkadih, Rajnandgaon, or connect directly with our technical team to schedule preventive maintenance, source verified parts, or discuss commercial vehicle requirements.'
                        : 'थेल्काडीह, राजनांदगांव स्थित हमारे वर्कशॉप पर पधारें अथवा मेंटेनेंस बुकिंग व पार्ट्स आपूर्ति हेतु हमारी तकनीकी टीम से सीधे संपर्क करें।'}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={14} className="text-[#E31837] shrink-0" />
                      <span>Khairagarh Road, Thelkadih, Rajnandgaon, Chhattisgarh 491441</span>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <button
                      onClick={() => openEnquiry(
                        lang === 'en' ? 'Commercial Vehicle Fleet Servicing' : 'कमर्शियल फ्लीट सर्विसिंग परामर्श',
                        { isVehicleService: true }
                      )}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-sm uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Schedule Service / Request Consultation' : 'सर्विस शेड्यूल करें / परामर्श मांगें'}</span>
                      <ArrowRight size={15} />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="tel:9425245291"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-[#1C1F24] hover:bg-[#252A31] border border-[#2F3540] text-white font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-colors"
                      >
                        <Phone size={13} className="text-[#E31837]" />
                        <span>Call +91 94252 45291</span>
                      </a>

                      <a
                        href="https://wa.me/919425245291?text=Hello%20Piyush%20Agro%20Industries,%20I%20am%20enquiring%20about%20SML%20Mahindra%20commercial%20vehicle%20servicing%20and%20fleet%20support."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-colors"
                      >
                        <MessageCircle size={13} />
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AnimatePresence>
  );
}
