'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider, useData } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import { ProductImage } from '@/components/ui/ProductImage';
import { getProductPrimaryImage, getProductGalleryImages } from '@/utils/imageUtils';
import { BreadcrumbJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import { t } from '@/constants/translations';
import { submitInquiry } from '@/services/enquiryService';
import type { InquiryFormData, FormErrors, SubmitStatus, Product } from '@/types';
import { 
  ArrowLeft, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Check, 
  Copy, 
  Download, 
  Send, 
  Loader2, 
  Sparkles, 
  Maximize2, 
  CheckCircle2,
  ShieldCheck,
  Award,
  Wrench,
  Building2,
  Share2,
  Layers,
  ArrowUpRight,
  FileText,
  Zap,
  Sprout,
  Truck,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

interface ProductDetailClientProps {
  initialProduct: Product;
  slug: string;
}

function ProductDetailInner({ initialProduct, slug }: ProductDetailClientProps) {
  const router = useRouter();
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const { categories = [], products = [] } = useData() || {};

  // Tabbed Content Navigation State: 'overview' | 'features' | 'applications' | 'support'
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'applications' | 'support'>('overview');

  // Use initial product passed from server, or fallback to real-time products
  const product = useMemo(() => {
    if (!products || products.length === 0) return initialProduct;
    const match = products.find(
      (p: any) =>
        (p.slug && p.slug.toLowerCase() === slug.toLowerCase()) ||
        (p.id && p.id.toLowerCase() === slug.toLowerCase())
    );
    return match || initialProduct;
  }, [products, slug, initialProduct]);

  // Gallery state
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Quick Inline Enquiry Form State
  const [quickForm, setQuickForm] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'ready'>('idle');
  const [copyStatus, setCopyStatus] = useState(false);

  // Set default service name in form
  useEffect(() => {
    if (product) {
      const pTitle = tx(product.title);
      setQuickForm((prev) => ({
        ...prev,
        service: pTitle,
        message: `I am interested in ${pTitle}. Please send specifications and quotation for Rajnandgaon / Chhattisgarh delivery.`,
      }));
    }
  }, [product, tx]);

  // Extract gallery images
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return getProductGalleryImages(product);
  }, [product]);

  const activeImage = galleryImages[activeImgIdx] || getProductPrimaryImage(product) || '/images/products/tractor-trolley.png';

  // Resolve category name
  const productCatName = useMemo(() => {
    if (!product) return 'Agricultural Equipment';
    const cat = categories.find((c: any) => c.id === product.category_id || c.slug === product.category_id);
    if (cat) {
      return typeof cat.name === 'object' ? (cat.name?.en || cat.name?.hi) : cat.name;
    }
    if (product.category) {
      return typeof product.category === 'object' && product.category !== null ? ((product.category as any)?.en || (product.category as any)?.hi) : String(product.category);
    }
    return 'Agricultural Equipment';
  }, [product, categories]);

  // Handle image mouse zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Form submit
  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'loading') return;

    const errs: FormErrors = {};
    if (!quickForm.name.trim()) errs.name = lang === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    const digits = quickForm.phone.replace(/\D/g, '');
    if (!digits || digits.length < 10) {
      errs.phone = lang === 'en' ? 'Valid phone number is required (10+ digits)' : 'वैध 10 अंकों का फोन नंबर आवश्यक है';
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitStatus('loading');
    setErrors({});

    const res = await submitInquiry({
      ...quickForm,
      language: lang,
      source: 'product_page_inline',
      status: 'new',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    });

    if (res.success) {
      setSubmitStatus('success');
      setQuickForm((prev) => ({ ...prev, name: '', phone: '', email: '' }));
    } else {
      setSubmitStatus('error');
      setErrors({ submit: res.error || tx(t.contact.errSubmit) });
    }
  };

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const filtered = products.filter(
      (p: any) =>
        (p.slug !== product.slug && p.id !== product.id) &&
        (p.category === product.category || p.category_id === product.category_id)
    );
    if (filtered.length >= 4) return filtered.slice(0, 4);
    const extra = products.filter(
      (p: any) => p.slug !== product.slug && p.id !== product.id && !filtered.some((f: any) => f.id === p.id)
    );
    return [...filtered, ...extra].slice(0, 4);
  }, [product, products]);

  const canonicalUrl = `https://www.piyushagroindustries.in/products/${product.slug || product.id}`;
  const productTitleStr = tx(product.title);

  return (
    <main className="relative bg-slate-50 min-h-screen pt-[64px] sm:pt-[96px]">
      <Header />

      {/* ── BREADCRUMB NAVIGATION BAR ── */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-3 relative z-10 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold overflow-x-auto hide-scrollbar py-1">
            <Link href="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <Link href="/products" className="hover:text-primary transition-colors shrink-0">Products</Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <span className="text-slate-500 shrink-0">{productCatName}</span>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-xs">{productTitleStr}</span>
          </div>

          <Link 
            href="/products"
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary font-bold transition-colors bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 cursor-pointer"
          >
            <ArrowLeft size={13} /> <span>{lang === 'en' ? 'All Products' : 'सभी उत्पाद'}</span>
          </Link>
        </div>
      </nav>

      {/* ── MAIN PRODUCT HERO DASHBOARD ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* ── COLUMN 1: PRODUCT INFORMATION (~32% - lg:col-span-4) ── */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Category & Status Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold uppercase tracking-wider rounded-md">
                  {productCatName}
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-md flex items-center gap-1">
                  <CheckCircle2 size={12} /> {lang === 'en' ? 'Custom Built Available' : 'कस्टम निर्माण उपलब्ध'}
                </span>
              </div>

              {/* Primary H1 Heading */}
              <h1 className="text-2xl sm:text-3xl font-bold font-rajdhani text-slate-900 leading-tight mb-2">
                {productTitleStr} Manufacturer in Rajnandgaon
              </h1>

              {/* Manufacturer & Location Tag */}
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold pb-3 border-b border-slate-100 mb-3">
                <Building2 size={14} className="text-primary shrink-0" />
                <span>Piyush Agro Industries • Rajnandgaon, Chhattisgarh</span>
              </div>

              {/* Short Description */}
              {product.short_desc && (
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium mb-4">
                  {tx(product.short_desc)}
                </p>
              )}

              {/* Verified Highlights */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <ShieldCheck size={14} className="text-primary shrink-0" />
                  <span className="truncate">IS 2062 Heavy Steel</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <Award size={14} className="text-amber-500 shrink-0" />
                  <span className="truncate">Precision Fabricated</span>
                </div>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <a
                href={`https://wa.me/919425245291?text=${encodeURIComponent(`Hello Piyush Agro, I am interested in ${productTitleStr} in Rajnandgaon.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-whatsapp text-white font-bold font-rajdhani text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <MessageCircle size={16} /> {lang === 'en' ? 'Chat on WhatsApp' : 'व्हाट्सएप पर संपर्क करें'}
              </a>

              <a
                href="tel:9425245291"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold font-rajdhani text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Phone size={14} className="text-primary" /> {lang === 'en' ? 'Call +91 9425245291' : 'कॉल करें +91 9425245291'}
              </a>
            </div>
          </div>

          {/* ── COLUMN 2: HIGH-RESOLUTION PRODUCT DISPLAY (~36% - lg:col-span-4) ── */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
            <div 
              className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center cursor-crosshair group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <ProductImage
                src={activeImage}
                alt={`Piyush Agro Industries ${productTitleStr} in Rajnandgaon, Chhattisgarh`}
                fill
                fallbackIcon={product.icon}
                fallbackGradient={product.gradient}
                className={`transition-transform duration-200 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/85 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider rounded-md flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Authentic Equipment</span>
              </div>
            </div>

            {/* Thumbnails Bar */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {galleryImages.map((src: string, idx: number) => (
                  <button
                    suppressHydrationWarning
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`aspect-[4/3] rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center transition-all overflow-hidden cursor-pointer ${
                      activeImgIdx === idx 
                        ? 'ring-2 ring-primary ring-offset-1 scale-95 shadow-sm' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} className="w-full h-full object-contain p-1" alt={`${productTitleStr} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── COLUMN 3: TECHNICAL DATA SHEET (~32% - lg:col-span-4) ── */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench size={16} className="text-emerald-400" />
                  <h3 className="font-bold font-rajdhani text-base uppercase tracking-wider">
                    {lang === 'en' ? 'Technical Specifications' : 'तकनीकी विशिष्टताएँ'}
                  </h3>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono font-semibold px-2 py-0.5 rounded border border-slate-700">
                  IS 2062 Grade
                </span>
              </div>

              {/* Spec Table */}
              <div className="p-3.5 sm:p-4">
                <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="bg-slate-50/80 border-b border-slate-200">
                        <td className="p-2.5 font-bold text-slate-800 border-r border-slate-200 w-5/12">Chassis Material</td>
                        <td className="p-2.5 text-slate-700 font-medium">IS 2062 Heavy Mild Steel</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-2.5 font-bold text-slate-800 border-r border-slate-200">Surface Finish</td>
                        <td className="p-2.5 text-slate-700 font-medium">Red Oxide + Dual PU Paint</td>
                      </tr>

                      {product.specs && Object.entries(product.specs).map(([key, value]) => {
                        const formattedKey = key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/_/g, ' ')
                          .replace(/^./, str => str.toUpperCase())
                          .trim();

                        return (
                          <tr key={key} className="border-b border-slate-200 last:border-b-0 odd:bg-slate-50/50">
                            <td className="p-2.5 font-bold text-slate-800 border-r border-slate-200">{formattedKey}</td>
                            <td className="p-2.5 text-slate-700 font-semibold">{String(value)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Enquiry Trigger */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                suppressHydrationWarning
                onClick={() => openEnquiry(productTitleStr)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all"
              >
                <span>{lang === 'en' ? 'Request Custom Quote' : 'कस्टम कोटेशन मांगें'}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── BALANCED CONTENT + ENQUIRY SECTION (65% / 35%) ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: TABBED PRODUCT CONTENT (65% - lg:col-span-8) ── */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
            
            {/* Segmented Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto hide-scrollbar">
              <button suppressHydrationWarning
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText size={14} />
                <span>{lang === 'en' ? 'Overview' : 'विवरण'}</span>
              </button>

              <button suppressHydrationWarning
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Zap size={14} />
                <span>{lang === 'en' ? 'Technical Features' : 'विशेषताएँ'}</span>
              </button>

              <button suppressHydrationWarning
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'applications'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Building2 size={14} />
                <span>{lang === 'en' ? 'Field Applications' : 'अनुप्रयोग'}</span>
              </button>

              <button suppressHydrationWarning
                onClick={() => setActiveTab('support')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'support'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Wrench size={14} />
                <span>{lang === 'en' ? 'Manufacturing & Support' : 'निर्माण एवं सहायता'}</span>
              </button>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="font-bold font-rajdhani text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Layers size={17} className="text-primary" />
                  {lang === 'en' ? 'Equipment Construction & Overview' : 'उपकरण निर्माण और विवरण'}
                </h3>
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {product.full_desc ? tx(product.full_desc) : (product.desc ? tx(product.desc) : tx(product.short_desc))}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Heavy Mild Steel Construction</h4>
                      <p className="text-slate-500 text-[11px]">Precision welding with IS 2062 grade steel structure for demanding transport tasks.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Industrial Axle & Suspension</h4>
                      <p className="text-slate-500 text-[11px]">Heavy-duty stub axles designed for high payloads across agricultural terrain.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FEATURES */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="font-bold font-rajdhani text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Zap size={17} className="text-primary" />
                  {lang === 'en' ? 'Key Technical Features' : 'मुख्य तकनीकी विशेषताएँ'}
                </h3>
                {product.features && product.features.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feature: any, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-800 text-xs font-semibold">{tx(feature)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-xs font-semibold">High-grade hydraulic cylinder for rapid, dependable tipping and unloading.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-xs font-semibold">Reinforced floor sheets and sidewall stiffeners for high-impact durability.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <h3 className="font-bold font-rajdhani text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Building2 size={17} className="text-primary" />
                  {lang === 'en' ? 'Recommended Field Applications' : 'अनुशंसित अनुप्रयोग'}
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {product.applications && product.applications.length > 0 ? (
                    product.applications.map((app: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                        <Sprout size={16} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-800 text-xs font-bold">{tx(app)}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                          <Sprout size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Agricultural Hauling</h4>
                        <p className="text-[11px] text-slate-500">Grain, paddy, sugarcane, soil, and harvest cargo transport across farm tracks.</p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
                          <Building2 size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Construction Cargo</h4>
                        <p className="text-[11px] text-slate-500">Sand, gravel, aggregate, bricks, and infrastructure materials.</p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                          <Truck size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Industrial & Municipal Utility</h4>
                        <p className="text-[11px] text-slate-500">Factory logistics, waste handling, and commercial yard transport.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SUPPORT & SERVICE (Truthful, verified business information) */}
            {activeTab === 'support' && (
              <div className="space-y-4">
                <h3 className="font-bold font-rajdhani text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Wrench size={17} className="text-primary" />
                  {lang === 'en' ? 'Fabrication & After-Sales Support' : 'निर्माण एवं बिक्री-उपरांत सहायता'}
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
                      <MapPin size={15} />
                      <span>Rajnandgaon Workshop</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Custom manufacturing, inspections, and welding repairs are conducted at our workshop on Khairagarh Road, Thelkadih, Rajnandgaon, Chhattisgarh.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
                      <Clock size={15} />
                      <span>Delivery & Timelines</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Standard configurations take 7 to 15 working days. We deliver directly to farmers and businesses across Chhattisgarh and neighboring regions.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-primary-50/60 rounded-xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-xs text-primary-dark">Need Custom Dimensions or Load Requirements?</h4>
                    <p className="text-slate-600 text-xs">Speak directly with our fabrication engineers for custom orders.</p>
                  </div>
                  <a
                    href="tel:9425245291"
                    className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold whitespace-nowrap hover:bg-primary-dark transition-colors"
                  >
                    Call Engineer
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN: QUICK QUOTE ENQUIRY FORM (35% - lg:col-span-4) ── */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 sticky top-[110px]">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white shrink-0">
                <Send size={15} />
              </div>
              <div>
                <h3 className="font-bold font-rajdhani text-slate-900 text-base leading-tight">
                  {lang === 'en' ? 'Get Instant Quotation' : 'तुरंत कोटेशन प्राप्त करें'}
                </h3>
                <p className="text-slate-500 text-[11px]">Direct factory pricing from manufacturer</p>
              </div>
            </div>

            {submitStatus === 'success' ? (
              <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold font-rajdhani text-slate-900 text-base">Inquiry Submitted!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you! Our engineering team will contact you shortly regarding <strong className="text-slate-900">{productTitleStr}</strong>.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-4 py-2 bg-white text-emerald-700 text-xs font-bold rounded-xl border border-emerald-300 shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'Enter full name' : 'पूरा नाम लिखें'}
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                  />
                  {errors.name && <span className="text-[11px] text-red-500 mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Phone Number *' : 'फोन नंबर *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={lang === 'en' ? '10-digit mobile number' : '10 अंकों का मोबाइल नंबर'}
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                  />
                  {errors.phone && <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Message / Requirements' : 'संदेश / आवश्यकताएं'}
                  </label>
                  <textarea
                    rows={3}
                    value={quickForm.message}
                    onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 resize-none"
                  />
                </div>

                {errors.submit && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>{lang === 'en' ? 'Send Product Inquiry' : 'पूछताछ भेजें'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── RELATED PRODUCTS SECTION ── */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Related Equipment</span>
              <h3 className="text-xl sm:text-2xl font-bold font-rajdhani text-slate-900">
                More Agricultural Equipment from Piyush Agro
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel: any) => {
              const relSlug = rel.slug || rel.id;
              const relImg = getProductPrimaryImage(rel);
              const relTitle = tx(rel.title);

              return (
                <Link
                  key={rel.id}
                  href={`/products/${relSlug}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-4 flex flex-col group hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden mb-3">
                    <ProductImage
                      src={relImg}
                      alt={`Piyush Agro Industries ${relTitle}`}
                      fill
                      fallbackIcon={rel.icon}
                      fallbackGradient={rel.gradient}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-bold font-rajdhani text-slate-900 text-sm group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {relTitle}
                  </h4>
                  <p className="text-slate-500 text-[11px] line-clamp-2 mb-3">
                    {rel.short_desc ? tx(rel.short_desc) : (rel.desc ? tx(rel.desc) : '')}
                  </p>
                  <span className="mt-auto text-[11px] font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Specifications</span>
                    <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function ProductDetailClient(props: ProductDetailClientProps) {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <ProductDetailInner {...props} />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
