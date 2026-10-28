'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import Footer from '@/components/layout/public/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SMLVehicleItem } from '@/constants/smlVehiclesData';
import { submitInquiry } from '@/services/enquiryService';
import {
  ChevronRight,
  ArrowRight,
  Phone,
  MessageCircle,
  Truck,
  Bus,
  Gauge,
  Shield,
  Wrench,
  Check,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface VehicleDetailClientProps {
  vehicle: SMLVehicleItem;
  relatedVehicles: SMLVehicleItem[];
}

function VehicleContent({ vehicle, relatedVehicles }: VehicleDetailClientProps) {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const shouldReduceMotion = useReducedMotion();

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Embedded enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentImage = vehicle.gallery[activeImageIndex] || vehicle.primaryImage;
  const isBus = vehicle.category.includes('bus');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = lang === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phone = lang === 'en' ? 'Phone number is required' : 'फ़ोन नंबर आवश्यक है';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = lang === 'en' ? 'Enter a valid 10-digit mobile number' : 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: '',
        service: `Commercial Vehicle: ${vehicle.nameEn}`,
        message: formData.message.trim() || `Enquiry for ${vehicle.nameEn} (${vehicle.fuelType}) commercial vehicle servicing and details.`,
        status: 'new',
        language: lang,
        source: 'vehicle_detail_page',
        quantity: '1',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Browser',
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitError(result.error || (lang === 'en' ? 'Unable to submit enquiry. Please try calling directly.' : 'पूछताछ दर्ज नहीं हो सकी। कृपया सीधे कॉल करें।'));
      }
    } catch (err) {
      setSubmitError(lang === 'en' ? 'Network error occurred. Please contact us via phone or WhatsApp.' : 'नेटवर्क समस्या। कृपया फ़ोन या व्हाट्सएप से संपर्क करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Piyush Agro Industries, I am interested in SML Mahindra ${vehicle.nameEn} (${vehicle.fuelType}). Please share specifications and service details.`
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Header />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Commercial Vehicles', url: '/#sml-service' },
          { name: vehicle.nameEn, url: `/vehicles/${vehicle.id}` },
        ]}
      />

      {/* ── BREADCRUMB & BACK NAVIGATION BAR ── */}
      <div className="bg-[#F8F9FA] border-b border-[#DCE0E5] pt-28 sm:pt-32 pb-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-rajdhani">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-gray-500 uppercase tracking-wider">
              <Link href="/" className="hover:text-gray-950 transition-colors">
                Home
              </Link>
              <ChevronRight size={12} className="text-gray-400" />
              <Link href="/#sml-service" className="hover:text-gray-950 transition-colors">
                Commercial Vehicles
              </Link>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="text-gray-950 font-bold">
                {vehicle.nameEn}
              </span>
            </nav>

            <Link
              href="/#sml-service"
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#E31837] font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={13} />
              <span>{lang === 'en' ? 'Back to All Vehicles' : 'सभी वाहन देखें'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── SECTION A: VEHICLE HERO & GALLERY ── */}
      <section className="bg-white border-b border-[#DCE0E5] py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Gallery Stage */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Image Stage */}
              <div className="relative aspect-[16/10] bg-[#F6F7F9] border border-[#DCE0E5] rounded-lg p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={imageError ? '/images/sml-mahindra/sml-mahindra-truck.webp' : currentImage}
                    alt={`${vehicle.nameEn} - SML Mahindra commercial vehicle`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-contain transition-all duration-300"
                    onError={() => setImageError(true)}
                  />
                </div>

                {/* Perspective Tag */}
                <span className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest uppercase bg-white/95 border border-[#DCE0E5] px-2 py-0.5 text-gray-500">
                  Perspective {activeImageIndex + 1} of {vehicle.gallery.length}
                </span>

                {/* Category & Fuel indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-white border border-[#DCE0E5] px-2 py-0.5 text-gray-900 font-bold">
                    {vehicle.fuelType}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-white border border-[#DCE0E5] px-2 py-0.5 text-gray-500">
                    {lang === 'en' ? vehicle.categoryLabelEn : vehicle.categoryLabelHi}
                  </span>
                </div>
              </div>

              {/* Multi-Angle Clickable Thumbnails */}
              {vehicle.gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {vehicle.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setImageError(false);
                      }}
                      className={`relative w-24 h-16 sm:w-28 sm:h-18 rounded-md overflow-hidden border transition-all shrink-0 bg-[#F6F7F9] p-1.5 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#E31837] ring-1 ring-[#E31837]'
                          : 'border-[#DCE0E5] hover:border-gray-500 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`View angle ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${vehicle.nameEn} view ${idx + 1}`}
                        fill
                        sizes="112px"
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Key Details & Quick Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Partner Association Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-16 h-4">
                    <Image
                      src="/images/sml-mahindra/sml-mahindra-logo.png"
                      alt="SML Mahindra"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 font-rajdhani">
                    Official Commercial Range
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-black font-rajdhani text-gray-950 uppercase tracking-tight leading-tight">
                  {vehicle.nameEn}
                </h1>
                {vehicle.nameHi && (
                  <p className="text-sm font-semibold text-gray-500 font-rajdhani mt-0.5">
                    {vehicle.nameHi}
                  </p>
                )}

                <div className="w-12 h-0.5 bg-[#E31837] my-4" />

                {/* Factual Tagline */}
                <p className="text-xs sm:text-sm font-semibold text-gray-800 font-rajdhani uppercase tracking-wider mb-2">
                  {lang === 'en' ? vehicle.taglineEn : vehicle.taglineHi}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                  {lang === 'en' ? vehicle.descriptionEn : vehicle.descriptionHi}
                </p>

                {/* Key Spec Snapshot Bar */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8F9FA] border border-[#DCE0E5] rounded-md mb-6 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                      {vehicle.specs.gvwOrCapacity.label}
                    </span>
                    <span className="font-bold text-gray-950 font-rajdhani text-sm">
                      {lang === 'en' ? vehicle.specs.gvwOrCapacity.valueEn : vehicle.specs.gvwOrCapacity.valueHi}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                      Engine Configuration
                    </span>
                    <span className="font-bold text-gray-900 font-rajdhani text-sm">
                      SLT4 Turbo (3455 cc)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                      Max Output
                    </span>
                    <span className="font-bold text-gray-900 font-rajdhani text-sm">
                      100 HP @ 2800 RPM
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                      Braking & Safety
                    </span>
                    <span className="font-bold text-gray-900 font-rajdhani text-sm">
                      Dual Air Brakes + ABS
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#DCE0E5]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-xs sm:text-sm uppercase tracking-wider rounded-md transition-colors shadow-xs"
                  >
                    <span>{lang === 'en' ? 'Enquire for Vehicle' : 'वाहन हेतु पूछताछ'}</span>
                    <ArrowRight size={14} />
                  </a>

                  <button
                    onClick={() => openEnquiry(vehicle.nameEn, {
                      isVehicleService: true,
                      vehicleModel: vehicle.nameEn,
                      serviceRequirement: `Maintenance and inspection for ${vehicle.nameEn}`,
                    })}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white font-bold font-rajdhani text-xs sm:text-sm uppercase tracking-wider rounded-md transition-colors"
                  >
                    <Wrench size={14} />
                    <span>{lang === 'en' ? 'Book Servicing' : 'सर्विस बुक करें'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:9425245291"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-[#DCE0E5] bg-white hover:bg-gray-50 text-gray-800 font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-colors"
                  >
                    <Phone size={13} className="text-[#E31837]" />
                    <span>+91 94252 45291</span>
                  </a>

                  <a
                    href={`https://wa.me/919425245291?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-colors"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION B: VERIFIED TECHNICAL SPECIFICATIONS ── */}
      <section className="bg-[#F8F9FA] border-b border-[#DCE0E5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-1">
              Engineering Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-rajdhani text-gray-950 uppercase tracking-tight">
              {lang === 'en' ? 'Verified Manufacturer Specifications' : 'प्रमाणित तकनीकी विनिर्देश'}
            </h2>
            <div className="w-10 h-0.5 bg-[#E31837] my-3" />
            <p className="text-xs sm:text-sm text-gray-600">
              Technical parameters published by SML Mahindra Limited. Verified for chassis dimensions, payload rating, and mechanical powertrain.
            </p>
          </div>

          {/* 8-Point Specification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* 1 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.gvwOrCapacity.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.gvwOrCapacity.valueEn : vehicle.specs.gvwOrCapacity.valueHi}
              </span>
            </div>

            {/* 2 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.engine.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.engine.valueEn : vehicle.specs.engine.valueHi}
              </span>
            </div>

            {/* 3 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.power.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.power.valueEn : vehicle.specs.power.valueHi}
              </span>
            </div>

            {/* 4 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.torque.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.torque.valueEn : vehicle.specs.torque.valueHi}
              </span>
            </div>

            {/* 5 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.wheelbase.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.wheelbase.valueEn : vehicle.specs.wheelbase.valueHi}
              </span>
            </div>

            {/* 6 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.brakes.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.brakes.valueEn : vehicle.specs.brakes.valueHi}
              </span>
            </div>

            {/* 7 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.fuelSystem.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.fuelSystem.valueEn : vehicle.specs.fuelSystem.valueHi}
              </span>
            </div>

            {/* 8 */}
            <div className="bg-white p-4 border border-[#DCE0E5] rounded-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                {vehicle.specs.deckOrInterior.label}
              </span>
              <span className="font-bold text-gray-950 font-rajdhani text-base block">
                {lang === 'en' ? vehicle.specs.deckOrInterior.valueEn : vehicle.specs.deckOrInterior.valueHi}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION C: FEATURES & COMMERCIAL APPLICATIONS ── */}
      <section className="bg-white border-b border-[#DCE0E5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Highlights Checklist */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-1">
                Application & Performance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-rajdhani text-gray-950 uppercase tracking-tight">
                {lang === 'en' ? 'Engineered for Real-World Demands' : 'व्यावसायिक आवश्यकताओं के अनुरूप निर्माण'}
              </h2>
              <div className="w-10 h-0.5 bg-[#E31837] my-3" />
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Key operational strengths confirmed by SML Mahindra for demanding Indian road conditions and transport duties.
              </p>

              <div className="space-y-3">
                {(lang === 'en' ? vehicle.highlightsEn : vehicle.highlightsHi).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 bg-[#F9FAFB] border border-[#DCE0E5] rounded-md text-xs sm:text-sm text-gray-800"
                  >
                    <Check size={16} className="text-[#E31837] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Authorized Workshop Care Box */}
            <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#DCE0E5] rounded-md p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-3">
                <Wrench size={18} className="text-[#E31837]" />
                <h3 className="font-extrabold font-rajdhani text-base uppercase text-gray-950">
                  {lang === 'en' ? 'Piyush Agro Workshop Support' : 'पियूष एग्रो अधिकृत वर्कशॉप सुविधा'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                {lang === 'en'
                  ? `Our facility in Thelkadih, Rajnandgaon is equipped with computerized diagnostics, OEM alignment benches, hydraulic tipping gear calibration, and genuine spare parts for the ${vehicle.nameEn}.`
                  : `राजनांदगांव स्थित हमारा अधिकृत वर्कशॉप ${vehicle.nameEn} हेतु पूर्ण डायग्नोस्टिक्स, ब्रेक सर्विस, हाइड्रोलिक टेस्टिंग एवं ओरिजिनल स्पेयर पार्ट्स उपलब्ध कराता है।`}
              </p>

              <ul className="space-y-2 text-xs text-gray-700 pt-3 border-t border-gray-200">
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#E31837]" />
                  <span>Periodic preventive maintenance & oil service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#E31837]" />
                  <span>Dual-circuit air brake & ABS diagnostics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#E31837]" />
                  <span>Heavy-duty leaf spring suspension overhaul</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#E31837]" />
                  <span>Authorized fitness testing & renewal assistance</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION D: EMBEDDED VEHICLE ENQUIRY SECTION ── */}
      <section id="enquiry-section" className="bg-[#111315] text-white py-14 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Heading & Direct Contacts */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-1">
                  Commercial Fleet Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-rajdhani uppercase tracking-tight text-white leading-tight">
                  Interested in This Vehicle?
                </h2>
                <div className="w-10 h-0.5 bg-[#E31837] my-3" />
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  Submit your details below to receive official specifications, pricing breakdown, or schedule a service inspection for the <strong className="text-white">{vehicle.nameEn}</strong>.
                </p>
              </div>

              {/* Verified Contact Details Card */}
              <div className="p-5 bg-[#1C1F24] border border-[#2B313A] rounded-md space-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-[#E31837] shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">Telephone Helpline</span>
                    <a href="tel:9425245291" className="text-white font-bold font-rajdhani text-sm hover:text-[#E31837] transition-colors">
                      +91 94252 45291 / +91 83196 34646
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle size={15} className="text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">WhatsApp Support</span>
                    <a
                      href={`https://wa.me/919425245291?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold font-rajdhani text-sm hover:underline"
                    >
                      Chat with Fleet Advisor
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-gray-700">
                  <MapPin size={15} className="text-[#E31837] shrink-0 mt-0.5" />
                  <div className="text-gray-300 leading-relaxed">
                    Khairagarh Road, Thelkadih, Rajnandgaon, Chhattisgarh 491441
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Embedded Form */}
            <div className="lg:col-span-7 bg-[#1C1F24] border border-[#2B313A] rounded-md p-6 sm:p-8">
              {submitSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 size={44} className="text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold font-rajdhani text-white uppercase">
                    {lang === 'en' ? 'Enquiry Submitted Successfully' : 'पूछताछ सफलतापूर्वक प्राप्त हुई'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in the <strong>{vehicle.nameEn}</strong>. Our commercial vehicle technical representative in Rajnandgaon will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-4 py-2 border border-gray-600 hover:border-white text-xs font-bold font-rajdhani uppercase tracking-wider text-white rounded-md transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Selected Vehicle Badge */}
                  <div className="p-3 bg-[#111315] border border-gray-700 rounded-md flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                        Selected Vehicle Model
                      </span>
                      <span className="font-bold text-white font-rajdhani text-sm">
                        {vehicle.nameEn} ({vehicle.fuelType})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded">
                      Commercial Service
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-950/80 border border-red-800 rounded-md flex items-center gap-2 text-xs text-red-200">
                      <AlertCircle size={15} className="shrink-0 text-red-400" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold font-rajdhani uppercase tracking-wider text-gray-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3.5 py-2.5 bg-[#111315] border border-gray-700 rounded-md text-sm text-white placeholder:text-gray-500 focus:outline-hidden focus:border-[#E31837] transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold font-rajdhani uppercase tracking-wider text-gray-300 mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setFormData({ ...formData, phone: val });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="94252 45291"
                        className="w-full pl-12 pr-3.5 py-2.5 bg-[#111315] border border-gray-700 rounded-md text-sm text-white font-mono placeholder:text-gray-500 focus:outline-hidden focus:border-[#E31837] transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-bold font-rajdhani uppercase tracking-wider text-gray-300 mb-1">
                      Specific Requirements / Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`e.g. Requesting technical quotation, tipper conversion details, or preventive fleet servicing schedule.`}
                      className="w-full px-3.5 py-2.5 bg-[#111315] border border-gray-700 rounded-md text-sm text-white placeholder:text-gray-500 focus:outline-hidden focus:border-[#E31837] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 bg-[#E31837] hover:bg-[#C8102E] disabled:opacity-60 text-white font-bold font-rajdhani text-sm uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting to Workshop...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Vehicle Enquiry</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-mono">
                    Direct communication with authorized workshop. We do not share your number.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION E: RELATED COMMERCIAL VEHICLES ── */}
      {relatedVehicles.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#DCE0E5]">
              <div>
                <span className="text-xs font-bold text-[#E31837] uppercase tracking-widest font-rajdhani block mb-1">
                  Alternative Models
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-rajdhani text-gray-950 uppercase tracking-tight">
                  Related Commercial Vehicles
                </h2>
              </div>

              <Link
                href="/#sml-service"
                className="inline-flex items-center gap-1.5 text-xs font-bold font-rajdhani uppercase tracking-wider text-gray-900 hover:text-[#E31837] transition-colors"
              >
                <span>View Complete Lineup</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-white border border-[#DCE0E5] rounded-lg overflow-hidden flex flex-col justify-between hover:border-gray-400 transition-colors"
                >
                  <div>
                    {/* Image Stage */}
                    <div className="relative aspect-[16/10] bg-[#F6F7F9] p-4 flex items-center justify-center border-b border-[#DCE0E5] overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={rel.primaryImage}
                          alt={rel.nameEn}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-104"
                        />
                      </div>
                      <span className="absolute top-3 left-3 text-[9px] font-mono tracking-widest uppercase bg-white border border-[#DCE0E5] px-1.5 py-0.5 text-gray-700">
                        {rel.fuelType}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="p-4 sm:p-5">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 block mb-1">
                        {rel.categoryLabelEn}
                      </span>
                      <h3 className="font-extrabold text-base text-gray-950 font-rajdhani uppercase group-hover:text-[#E31837] transition-colors">
                        {rel.nameEn}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                        {rel.taglineEn}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      href={`/vehicles/${rel.id}`}
                      className="w-full inline-flex items-center justify-center gap-1 py-2 px-3 border border-[#DCE0E5] group-hover:border-gray-900 bg-gray-50 group-hover:bg-gray-900 text-gray-800 group-hover:text-white font-bold font-rajdhani text-xs uppercase tracking-wider rounded-md transition-all"
                    >
                      <span>Explore {rel.nameEn}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function VehicleDetailClient(props: VehicleDetailClientProps) {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <VehicleContent {...props} />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
