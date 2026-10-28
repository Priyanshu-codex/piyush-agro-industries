'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { SMLVehicleItem } from '@/constants/smlVehiclesData';
import { 
  X, 
  Phone, 
  MessageCircle, 
  Wrench, 
  Check, 
  Gauge, 
  Truck, 
  Shield, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';

interface SMLVehicleDetailModalProps {
  vehicle: SMLVehicleItem | null;
  onClose: () => void;
}

export default function SMLVehicleDetailModal({ vehicle, onClose }: SMLVehicleDetailModalProps) {
  const { lang } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const shouldReduceMotion = useReducedMotion();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setImageError(false);
  }, [vehicle]);

  if (!vehicle) return null;

  const currentImage = vehicle.gallery[activeImageIndex] || vehicle.primaryImage;

  const handleBookService = () => {
    openEnquiry(vehicle.nameEn, {
      isVehicleService: true,
      vehicleModel: vehicle.nameEn,
      serviceRequirement: `Commercial servicing and technical inspection for ${vehicle.nameEn}`,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Piyush Agro Industries, I am interested in official servicing and details for SML Mahindra ${vehicle.nameEn}. Please share more information.`
  );

  return (
    <AnimatePresence>
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="vehicle-spec-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        {/* Architectural Modal Window */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-lg border border-[#DCE0E5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 text-gray-900"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#DCE0E5] bg-white">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-gray-500 bg-gray-100 border border-[#DCE0E5] px-2 py-0.5">
                {lang === 'en' ? vehicle.categoryLabelEn : vehicle.categoryLabelHi}
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-gray-900 bg-gray-100 border border-[#DCE0E5] px-2 py-0.5 font-bold">
                {vehicle.fuelType}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close vehicle specifications"
              className="inline-flex items-center gap-1 text-xs font-mono uppercase text-gray-500 hover:text-gray-950 p-1.5 transition-colors focus:outline-hidden"
            >
              <span className="text-[10px] hidden sm:inline">[ESC]</span>
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 scrollbar-vehicle">
            {/* Title & Overview */}
            <div>
              <h2 id="vehicle-spec-title" className="text-2xl sm:text-3xl font-black font-rajdhani text-gray-950 uppercase tracking-tight leading-tight">
                {vehicle.nameEn}
              </h2>
              {vehicle.nameHi && (
                <p className="text-xs font-semibold text-gray-500 font-rajdhani mt-0.5">
                  {vehicle.nameHi}
                </p>
              )}
              <div className="w-10 h-0.5 bg-[#E31837] my-3" />
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {lang === 'en' ? vehicle.descriptionEn : vehicle.descriptionHi}
              </p>
            </div>

            {/* Main Stage Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] bg-[#F6F7F9] border border-[#DCE0E5] rounded-md overflow-hidden flex items-center justify-center p-4">
              <Image
                src={imageError ? '/images/sml-mahindra/sml-mahindra-truck.webp' : currentImage}
                alt={vehicle.nameEn}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 850px"
                className="object-contain p-2"
                onError={() => setImageError(true)}
              />
              <span className="absolute bottom-2.5 right-3 text-[10px] font-mono tracking-wider text-gray-400 uppercase bg-white/90 border border-gray-200 px-2 py-0.5">
                Official Photography
              </span>
            </div>

            {/* Multi-angle Thumbnails */}
            {vehicle.gallery.length > 1 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Available Perspectives ({vehicle.gallery.length})
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {vehicle.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setImageError(false);
                      }}
                      className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden border transition-all shrink-0 bg-[#F6F7F9] p-1 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#E31837] ring-1 ring-[#E31837]'
                          : 'border-[#DCE0E5] hover:border-gray-500 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${vehicle.nameEn} angle ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Official Technical Specifications Matrix */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#DCE0E5]">
                <Gauge size={16} className="text-[#E31837]" />
                <h3 className="text-sm font-bold text-gray-950 font-rajdhani uppercase tracking-wider">
                  {lang === 'en' ? 'Verified Technical Specifications' : 'प्रमाणित तकनीकी विनिर्देश'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DCE0E5] border border-[#DCE0E5] rounded-md overflow-hidden text-xs">
                {/* 1. GVW / Capacity */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.gvwOrCapacity.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.gvwOrCapacity.valueEn : vehicle.specs.gvwOrCapacity.valueHi}
                  </span>
                </div>

                {/* 2. Engine Type */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.engine.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.engine.valueEn : vehicle.specs.engine.valueHi}
                  </span>
                </div>

                {/* 3. Power */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.power.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.power.valueEn : vehicle.specs.power.valueHi}
                  </span>
                </div>

                {/* 4. Torque */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.torque.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.torque.valueEn : vehicle.specs.torque.valueHi}
                  </span>
                </div>

                {/* 5. Wheelbase */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.wheelbase.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.wheelbase.valueEn : vehicle.specs.wheelbase.valueHi}
                  </span>
                </div>

                {/* 6. Braking System */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.brakes.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.brakes.valueEn : vehicle.specs.brakes.valueHi}
                  </span>
                </div>

                {/* 7. Fuel System */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.fuelSystem.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.fuelSystem.valueEn : vehicle.specs.fuelSystem.valueHi}
                  </span>
                </div>

                {/* 8. Deck / Interior */}
                <div className="bg-white p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    {vehicle.specs.deckOrInterior.label}
                  </span>
                  <span className="font-bold text-gray-950 font-rajdhani text-sm">
                    {lang === 'en' ? vehicle.specs.deckOrInterior.valueEn : vehicle.specs.deckOrInterior.valueHi}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Commercial Features */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#DCE0E5]">
                <Shield size={16} className="text-[#E31837]" />
                <h3 className="text-sm font-bold text-gray-950 font-rajdhani uppercase tracking-wider">
                  {lang === 'en' ? 'Verified Commercial Characteristics' : 'प्रमाणित व्यावसायिक विशेषताएं'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(lang === 'en' ? vehicle.highlightsEn : vehicle.highlightsHi).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 bg-[#F6F7F9] border border-[#DCE0E5] rounded-md">
                    <Check size={14} className="text-[#E31837] shrink-0 mt-0.5" />
                    <span className="text-gray-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workshop Support Note */}
            <div className="border border-[#DCE0E5] rounded-md p-4 bg-[#F9FAFB] flex items-start gap-3">
              <Wrench size={18} className="text-gray-900 shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700">
                <p className="font-bold font-rajdhani text-gray-950 uppercase">
                  {lang === 'en' ? 'Authorized Maintenance Facility Support' : 'अधिकृत वर्कशॉप मेंटेनेंस सुविधा'}
                </p>
                <p className="mt-0.5 text-gray-600 leading-relaxed">
                  {lang === 'en' 
                    ? 'Piyush Agro Industries provides certified mechanical diagnostics, brake testing, suspension maintenance, and genuine OEM parts for this vehicle model at our Thelkadih, Rajnandgaon facility.' 
                    : 'पियूष एग्रो इंडस्ट्रीज इस मॉडल हेतु अधिकृत मैकेनिकल डायग्नोस्टिक्स, ब्रेक टेस्टिंग, सस्पेंशन एवं ओरिजिनल स्पेयर पार्ट्स सुविधा उपलब्ध कराता है।'}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs Footer */}
          <div className="p-4 sm:p-5 border-t border-[#DCE0E5] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href="tel:9425245291"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#DCE0E5] bg-white hover:bg-gray-50 text-gray-900 font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-colors"
              >
                <Phone size={13} className="text-[#E31837]" />
                <span>+91 94252 45291</span>
              </a>

              <a
                href={`https://wa.me/919425245291?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-colors"
              >
                <MessageCircle size={13} />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleBookService}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-[#E31837] text-white font-bold font-rajdhani text-xs sm:text-sm uppercase tracking-wider rounded-md transition-colors cursor-pointer"
            >
              <span>{lang === 'en' ? 'Book Servicing / Enquire' : 'सर्विसिंग बुक करें / पूछताछ'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
