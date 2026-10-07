'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import type { ServiceItem } from '@/constants/servicesData';
import { SERVICES_LIST } from '@/constants/servicesData';
import { findProduct } from '@/utils/productLookup';
import { getProductPrimaryImage } from '@/utils/imageUtils';
import { ProductImage } from '@/components/ui/ProductImage';
import { submitInquiry } from '@/services/enquiryService';
import type { FormErrors, SubmitStatus } from '@/types';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building2,
  ShieldCheck,
  Send,
  Loader2,
  Sparkles,
  Wrench,
  Clock,
  Layers,
  Settings,
} from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const CTABanner = dynamic(() => import('@/components/layout/public/CTABanner'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

interface Props {
  initialService: ServiceItem;
  slug: string;
}

function ServiceDetailContent({ service }: { service: ServiceItem }) {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();

  const titleStr = tx(service.title);
  const shortDescStr = tx(service.shortDesc);
  const fullDescStr = tx(service.fullDesc);

  // Quick inquiry state
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: titleStr,
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'loading') return;

    const errs: FormErrors = {};
    if (!quickForm.name.trim()) errs.name = lang === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    const digits = quickForm.phone.replace(/\D/g, '');
    if (!digits || digits.length < 10) {
      errs.phone = lang === 'en' ? 'Valid 10-digit phone number is required' : 'वैध 10 अंकों का फोन नंबर आवश्यक है';
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitStatus('loading');
    setErrors({});

    const res = await submitInquiry({
      ...quickForm,
      service: titleStr,
      language: lang,
      source: 'service_detail_inline',
      status: 'new',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    });

    if (res.success) {
      setSubmitStatus('success');
      setQuickForm({ name: '', phone: '', email: '', service: titleStr, message: '' });
    } else {
      setSubmitStatus('error');
      setErrors({ submit: res.error });
    }
  };

  // Find relevant product items
  const relevantProducts = service.relevantProducts
    .map((prodSlug) => findProduct(prodSlug))
    .filter(Boolean);

  // Other services for navigation
  const otherServices = SERVICES_LIST.filter((s) => s.slug !== service.slug);

  return (
    <main className="relative min-h-screen bg-gray-50/80 pt-[64px] sm:pt-[100px]">
      <Header />

      {/* ── BREADCRUMB STRIP ── */}
      <nav className="bg-white border-b border-gray-200/80 sticky top-[64px] sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs overflow-x-auto hide-scrollbar gap-4">
          <div className="flex items-center gap-1.5 shrink-0">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-gray-400 shrink-0" />
            <Link href="/services" className="text-gray-500 hover:text-primary transition-colors">
              Services
            </Link>
            <ChevronRight size={13} className="text-gray-400 shrink-0" />
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-sm">
              {titleStr}
            </span>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-gray-700 hover:text-primary font-bold transition-colors bg-gray-100 hover:bg-gray-200/80 px-3 py-1.5 rounded-lg shrink-0"
          >
            <ArrowLeft size={13} />
            <span>{lang === 'en' ? 'All Services' : 'सभी सेवाएं'}</span>
          </Link>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section className="bg-white border-b border-gray-100 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="text-base">{service.icon}</span>
                <span>Piyush Agro Industries • Rajnandgaon</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-rajdhani text-gray-900 leading-tight">
                {titleStr}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                {shortDescStr}
              </p>

              <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold pt-2">
                <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <ShieldCheck size={14} /> Certified Metalwork
                </div>
                <div className="flex items-center gap-1 text-primary bg-primary-50 px-2.5 py-1 rounded-md">
                  <Building2 size={14} /> Thelkadih Workshop
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button suppressHydrationWarning
                  onClick={() => openEnquiry(titleStr)}
                  className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {lang === 'en' ? 'Request Free Quote' : 'मुफ्त कोटेशन प्राप्त करें'}
                </button>
                <a
                  href={`https://wa.me/919425245291?text=${encodeURIComponent(`Hello Piyush Agro, I am interested in ${titleStr} services in Rajnandgaon.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-whatsapp text-white font-bold font-rajdhani text-sm shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="tel:9425245291"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold font-rajdhani text-sm transition-all"
                >
                  <Phone size={15} className="text-primary" /> +91 9425245291
                </a>
              </div>
            </div>

            {/* Right Card: Quick Overview Box */}
            <div className="lg:col-span-5 bg-gradient-primary rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="font-bold font-rajdhani text-2xl mb-3 flex items-center gap-2">
                <span>🔧</span> {lang === 'en' ? 'Workshop Overview' : 'कार्यशाला अवलोकन'}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6">
                {fullDescStr}
              </p>

              <div className="space-y-2.5 border-t border-white/15 pt-5">
                <div className="text-xs uppercase font-bold text-white/60 tracking-wider">
                  {lang === 'en' ? 'Capabilities Included:' : 'शामिल क्षमताएं:'}
                </div>
                {service.offerings.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-medium text-white/95">
                    <CheckCircle2 size={15} className="text-brand-green shrink-0 mt-0.5" />
                    <span>{lang === 'hi' ? item.hi : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILED SERVICE BREAKDOWN ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. What We Provide */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-rajdhani text-gray-900 mb-6 flex items-center gap-2">
                <Layers className="text-primary" size={22} />
                <span>{lang === 'en' ? 'What We Provide in This Service' : 'इस सेवा में हम क्या प्रदान करते हैं'}</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {service.offerings.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                      {lang === 'hi' ? item.hi : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Step-by-Step Technical Workflow */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-rajdhani text-gray-900 mb-6 flex items-center gap-2">
                <Wrench className="text-primary" size={22} />
                <span>{lang === 'en' ? 'Our Execution Process' : 'हमारी कार्य प्रक्रिया'}</span>
              </h2>

              <div className="space-y-4">
                {service.process.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary text-white font-extrabold font-rajdhani flex items-center justify-center text-sm shrink-0 shadow-xs">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold font-rajdhani text-base text-gray-900 mb-1">
                        {tx(step.title)}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {tx(step.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Key Benefits */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-rajdhani text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="text-primary" size={22} />
                <span>{lang === 'en' ? 'Key Benefits & Advantages' : 'प्रमुख लाभ एवं विशेषताएं'}</span>
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                {service.benefits.map((b, i) => (
                  <div key={i} className="p-4 rounded-xl bg-primary-50/50 border border-primary/10">
                    <h4 className="font-bold font-rajdhani text-base text-primary mb-1.5">
                      {tx(b.title)}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{tx(b.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Applications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-rajdhani text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="text-primary" size={22} />
                <span>{lang === 'en' ? 'Typical Industry & Farm Applications' : 'उद्योग एवं कृषि अनुप्रयोग'}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>{lang === 'hi' ? app.hi : app.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Relevant Products / Solutions */}
            {relevantProducts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold font-rajdhani text-gray-900">
                      {lang === 'en' ? 'Related Products & Machinery' : 'संबंधित उत्पाद एवं मशीनरी'}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {lang === 'en' ? 'Manufactured and supported under this service category' : 'इस सेवा श्रेणी के अंतर्गत निर्मित उत्पाद'}
                    </p>
                  </div>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>{lang === 'en' ? 'View Catalogue' : 'उत्पाद सूची'}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {relevantProducts.map((p: any) => {
                    const pTitle = tx(p.title);
                    const pImg = getProductPrimaryImage(p);
                    const pSlug = p.slug || p.id;

                    return (
                      <div
                        key={p.id}
                        className="rounded-xl border border-gray-200/80 p-3 flex gap-3 items-center hover:border-primary/50 transition-colors bg-gray-50/50"
                      >
                        <div className="w-16 h-16 rounded-lg bg-white relative overflow-hidden shrink-0 border border-gray-100">
                          <ProductImage
                            src={pImg}
                            alt={pTitle}
                            fill
                            fallbackIcon={p.icon}
                            fallbackGradient={p.gradient}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold font-rajdhani text-sm text-gray-900 truncate">
                            {pTitle}
                          </h4>
                          <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">
                            {p.short_desc ? tx(p.short_desc) : tx(p.desc)}
                          </p>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/products/${pSlug}`}
                              className="text-[11px] font-bold text-primary hover:underline"
                            >
                              {lang === 'en' ? 'Details →' : 'विवरण →'}
                            </Link>
                            <span className="text-gray-300">•</span>
                            <button suppressHydrationWarning
                              onClick={() => openEnquiry(pTitle)}
                              className="text-[11px] font-bold text-gray-600 hover:text-primary"
                            >
                              {lang === 'en' ? 'Quote' : 'कोटेशन'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Inline Inquiry Card + Other Services */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Inquiry Form */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-28">
              <h3 className="font-bold font-rajdhani text-xl text-gray-900 mb-1">
                {lang === 'en' ? 'Inquire About This Service' : 'इस सेवा के लिए पूछताछ करें'}
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                {lang === 'en'
                  ? 'Send your requirements directly to our workshop team in Rajnandgaon.'
                  : 'राजनांदगांव में हमारी कार्यशाला टीम को अपनी आवश्यकताएं भेजें।'}
              </p>

              {submitStatus === 'success' ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 size={28} className="text-emerald-600 mx-auto" />
                  <div className="font-bold text-emerald-900 text-sm">
                    {lang === 'en' ? 'Inquiry Submitted!' : 'पूछताछ सबमिट हो गई!'}
                  </div>
                  <p className="text-xs text-emerald-700">
                    {lang === 'en'
                      ? 'Our fabrication engineers will contact you shortly.'
                      : 'हमारे इंजीनियर जल्द ही आपसे संपर्क करेंगे।'}
                  </p>
                  <button suppressHydrationWarning
                    onClick={() => setSubmitStatus('idle')}
                    className="text-xs font-bold text-emerald-800 underline mt-2 block mx-auto"
                  >
                    {lang === 'en' ? 'Send another inquiry' : 'अन्य पूछताछ भेजें'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      placeholder={lang === 'en' ? 'Enter full name' : 'पूरा नाम दर्ज करें'}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      {lang === 'en' ? 'Phone Number *' : 'फोन नंबर *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={quickForm.phone}
                      onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                      placeholder="e.g. 9425245291"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      {lang === 'en' ? 'Requirements / Vehicle Details' : 'आवश्यकता / वाहन विवरण'}
                    </label>
                    <textarea
                      rows={3}
                      value={quickForm.message}
                      onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                      placeholder={lang === 'en' ? 'Describe payload, vehicle model, dimensions...' : 'वाहन मॉडल, आकार, आवश्यकता बताएं...'}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  {errors.submit && <p className="text-[11px] text-red-500">{errors.submit}</p>}

                  <button suppressHydrationWarning
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>{lang === 'en' ? 'Submitting...' : 'भेजा जा रहा है...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>{lang === 'en' ? 'Submit Inquiry' : 'पूछताछ भेजें'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct call options */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-xs font-semibold text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Direct Hotline:</span>
                  <a href="tel:9425245291" className="text-primary font-bold hover:underline">
                    +91 9425245291
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Alternate Line:</span>
                  <a href="tel:9479244691" className="text-primary font-bold hover:underline">
                    +91 9479244691
                  </a>
                </div>
              </div>

              {/* Other Services Navigation Box */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <h4 className="font-bold font-rajdhani text-sm text-gray-900 mb-3 uppercase tracking-wider">
                  {lang === 'en' ? 'Other Services' : 'अन्य सेवाएं'}
                </h4>
                <div className="space-y-1.5">
                  {otherServices.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/services/${other.slug}`}
                      className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
                    >
                      <span>{tx(other.title)}</span>
                      <ChevronRight size={13} className="text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER & FOOTER ── */}
      <CTABanner />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function ServiceDetailClient({ initialService }: Props) {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <ServiceDetailContent service={initialService} />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
