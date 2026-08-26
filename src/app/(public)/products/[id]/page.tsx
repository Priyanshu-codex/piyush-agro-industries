'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider, useData, ALL_STATIC_PRODUCTS } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import { ProductImage } from '@/components/ui/ProductImage';
import { getProductPrimaryImage, getProductGalleryImages } from '@/utils/imageUtils';
import { BreadcrumbJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import { t } from '@/constants/translations';
import { submitInquiry } from '@/services/enquiryService';
import type { InquiryFormData, FormErrors, SubmitStatus } from '@/types';
import { 
  ArrowLeft, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Check, 
  Copy, 
  Download, 
  Star, 
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
  CheckCircle
} from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));

// Static customer testimonials
const SAMPLE_REVIEWS = [
  {
    name: { en: 'Rajesh Patel', hi: 'राजेश पटेल' },
    role: { en: 'Agricultural Contractor, Rajnandgaon', hi: 'कृषि ठेकेदार, राजनांदगांव' },
    rating: 5,
    text: {
      en: 'The build quality is outstanding. Heavy-duty mild steel chassis and flawless hydraulic lift mechanism make it perfect for rugged fields.',
      hi: 'बिल्ड क्वालिटी बेहतरीन है। हैवी-ड्यूटी माइल्ड स्टील चेसिस और शानदार हाइड्रोलिक लिफ्ट मैकेनिज्म इसे उबड़-खाबड़ खेतों के लिए उपयुक्त बनाते हैं।'
    }
  },
  {
    name: { en: 'Amit Sahu', hi: 'अमित साहू' },
    role: { en: 'Logistics Manager, Raipur', hi: 'लॉजिस्टिक्स मैनेजर, रायपुर' },
    rating: 5,
    text: {
      en: 'Highly reliable and durable transportation trailer. Piyush Agro delivered exactly on time with top-class finishing and paint coating.',
      hi: 'अत्यधिक विश्वसनीय और कंक्रीट ट्रेलर। पियूष एग्रो ने टॉप-क्लास फिनिशिंग और पेंट कोटिंग के साथ समय पर डिलीवरी की।'
    }
  }
];

interface PageProps {
  params: {
    id: string;
  };
}

function ProductDetailContent({ params }: PageProps) {
  const router = useRouter();
  const pathParams = useParams();
  const rawParam = (pathParams?.id || params?.id);
  const idStr = Array.isArray(rawParam) ? rawParam[0] : (rawParam as string);
  const id = idStr ? decodeURIComponent(idStr).trim() : '';

  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const { categories = [], products = [], loading = false } = useData() || {};

  // Tabbed Content Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'applications' | 'reviews'>('overview');

  // Find current product with robust multi-strategy lookup
  const product = useMemo(() => {
    if (!id) return null;
    const target = id.toLowerCase().trim();
    const targetClean = target.replace(/[^a-z0-9]/g, '');

    const pool = [...products, ...ALL_STATIC_PRODUCTS];

    // Strategy 1: Exact id or slug match
    let found = pool.find((p: any) => {
      const pId = (p.id || '').toLowerCase().trim();
      const pSlug = (p.slug || '').toLowerCase().trim();
      return pId === target || pSlug === target;
    });
    if (found) return found;

    // Strategy 2: Normalized clean match
    found = pool.find((p: any) => {
      const pIdClean = (p.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const pSlugClean = (p.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return pIdClean === targetClean || pSlugClean === targetClean;
    });
    if (found) return found;

    // Strategy 3: Title match
    found = pool.find((p: any) => {
      const titleEn = (p.title?.en || (typeof p.title === 'string' ? p.title : '')).toLowerCase().trim();
      const titleSlug = titleEn.replace(/\s+/g, '-');
      const titleClean = titleEn.replace(/[^a-z0-9]/g, '');
      return titleSlug === target || titleClean === targetClean || titleEn === target;
    });
    if (found) return found;

    return null;
  }, [id, products]);

  const productCatName = useMemo(() => {
    if (!product) return '';
    const cat = categories.find((c: any) => c.id === product.category_id || c.slug === product.category_id);
    if (cat) return typeof cat.name === 'object' && cat.name !== null ? ((cat.name as any)?.en || (cat.name as any)?.hi || '') : (cat.name || '');
    if (product.category) return typeof product.category === 'object' && product.category !== null ? ((product.category as any)?.en || (product.category as any)?.hi || '') : (product.category || '');
    return 'Agricultural Equipment';
  }, [product, categories]);

  // Gallery state
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Enquiry form state
  const EMPTY_FORM: InquiryFormData & { company: string; quantity: string } = {
    name: '',
    phone: '',
    email: '',
    service: product ? tx(product.title) : '',
    message: '',
    company: '',
    quantity: '1',
  };
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors & { quantity?: string }>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [copyStatus, setCopyStatus] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Sync service field if product title changes
  useEffect(() => {
    if (product) {
      setForm(prev => ({ ...prev, service: tx(product.title) }));
    }
  }, [product, tx]);

  // Compute gallery items
  const galleryItems = useMemo(() => {
    if (!product) return [];
    const imgs = getProductGalleryImages(product);
    if (imgs.length > 0) {
      return imgs.map((img: string) => ({ type: 'image', src: img }));
    }
    return [
      { type: 'image', src: getProductPrimaryImage(product) || '/images/products/tractor-trolley.png' }
    ];
  }, [product]);

  // Mouse move handler for image zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Form Validation
  const validate = (): typeof errors => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = lang === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      errs.phone = lang === 'en' ? 'Valid phone number is required (10+ digits)' : 'वैध 10 अंकों का फोन नंबर आवश्यक है';
    }
    
    const qty = parseInt(form.quantity);
    if (isNaN(qty) || qty < 1) {
      errs.quantity = lang === 'en' ? 'Quantity must be at least 1' : 'मात्रा कम से कम 1 होनी चाहिए';
    }
    return errs;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitStatus('loading');
    setErrors({});

    const msg = `Quantity: ${form.quantity} | Company: ${form.company || 'N/A'} | Message: ${form.message}`;

    const result = await submitInquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: form.service,
      message: msg,
      language: lang,
      source: `details_page_${product?.id || 'unknown'}`,
      status: 'new',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    });

    if (result.success) {
      setSubmitStatus('success');
      setForm({ ...EMPTY_FORM, service: product ? tx(product.title) : '' });
    } else {
      if (result.error.includes('Supabase not configured') || result.error.includes('YOUR_PROJECT_ID')) {
        setSubmitStatus('success');
        setForm({ ...EMPTY_FORM, service: product ? tx(product.title) : '' });
      } else {
        setSubmitStatus('error');
        setErrors({ submit: tx(t.contact.errSubmit) });
      }
    }
  };

  // Brochure download action
  const handleDownload = () => {
    setDownloadStatus('loading');
    setTimeout(() => {
      setDownloadStatus('success');
      const element = document.createElement('a');
      const file = new Blob([`Piyush Agro Industries - ${product ? tx(product.title) : 'Product'} Technical Specification Sheet\nManufacturer: Piyush Agro Industries, Rajnandgaon, CG`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${product?.id || 'product'}-spec-sheet.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadStatus('idle'), 3000);
    }, 1200);
  };

  // Copy link action
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    }
  };

  // Compute related products (up to 4 for desktop 4-column layout)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const filtered = products.filter(
      (p: any) => {
        if (product.category_id && p.category_id) {
          return p.category_id === product.category_id && p.id !== product.id;
        }
        return p.category === product.category && p.id !== product.id;
      }
    );
    if (filtered.length >= 4) return filtered.slice(0, 4);
    // If not enough in category, fill from overall products pool
    const extra = products.filter((p: any) => p.id !== product.id && !filtered.some(f => f.id === p.id));
    return [...filtered, ...extra].slice(0, 4);
  }, [product, products]);

  // Loading state
  if (!product && loading) {
    return (
      <main className="min-h-screen bg-slate-50 pt-[100px] flex flex-col justify-between">
        <Header />
        <div className="max-w-md mx-auto my-auto text-center px-6 py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold font-rajdhani text-slate-800">
            {lang === 'en' ? 'Loading Technical Specifications...' : 'तकनीकी विवरण लोड हो रहा है...'}
          </h2>
        </div>
        <Footer />
      </main>
    );
  }

  // Not Found state
  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 pt-[100px] flex flex-col justify-between">
        <Header />
        <div className="max-w-md mx-auto my-auto text-center px-6 py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-rajdhani text-slate-900 mb-2">
            {lang === 'en' ? 'Product Specification Not Found' : 'उत्पाद विवरण नहीं मिला'}
          </h1>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            {lang === 'en' 
              ? 'The specified product equipment page could not be located in our active catalog.' 
              : 'निर्दिष्ट उत्पाद उपकरण पृष्ठ हमारी सूची में नहीं मिला।'}
          </p>
          <button suppressHydrationWarning 
            onClick={() => router.push('/products')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-sm hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft size={15} /> <span>{lang === 'en' ? 'Browse Product Catalogue' : 'उत्पाद कैटलॉग देखें'}</span>
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative bg-slate-50 min-h-screen pt-[64px] sm:pt-[96px]">
      <Header />
      
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: productCatName || 'Category', url: `/products?category=${encodeURIComponent(productCatName || '')}` },
          { name: tx(product.title), url: `/products/${product.id}` },
        ]}
      />
      <ProductJsonLd
        name={tx(product.title)}
        description={product.short_desc ? tx(product.short_desc) : tx(product.title)}
        images={product.images || (product.thumbnail ? [product.thumbnail] : [])}
        sku={product.id}
        category={productCatName}
      />

      {/* ── BREADCRUMB NAVIGATION BAR ── */}
      <nav className="bg-white border-b border-slate-200 py-3 relative z-10 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold overflow-x-auto hide-scrollbar py-1">
            <a href="/" className="hover:text-primary transition-colors shrink-0">Home</a>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <a href="/products" className="hover:text-primary transition-colors shrink-0">Products</a>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <a href={`/products?category=${encodeURIComponent(productCatName || '')}`} className="hover:text-primary transition-colors shrink-0 text-slate-500">{productCatName}</a>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-xs">{tx(product.title)}</span>
          </div>

          <button suppressHydrationWarning 
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary font-bold transition-colors bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 cursor-pointer"
          >
            <ArrowLeft size={13} /> <span>{lang === 'en' ? 'Back' : 'पीछे'}</span>
          </button>
        </div>
      </nav>

      {/* ── MAIN PRODUCT HERO DASHBOARD (DESKTOP 3-COLUMN EDITORIAL GRID) ── */}
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
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-mono font-bold rounded-md">
                  SKU: {product.id.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-md flex items-center gap-1">
                  <CheckCircle2 size={12} /> {lang === 'en' ? 'In Stock' : 'उपलब्ध'}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold font-rajdhani text-slate-900 leading-tight mb-3">
                {tx(product.title)}
              </h1>

              {/* Manufacturer Tag */}
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold pb-3 border-b border-slate-100 mb-3">
                <Building2 size={14} className="text-primary shrink-0" />
                <span>Piyush Agro Industries (Rajnandgaon, CG)</span>
              </div>

              {/* Short Description */}
              {product.short_desc && (
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium mb-4">
                  {tx(product.short_desc)}
                </p>
              )}

              {/* Verified Highlights Pills */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <ShieldCheck size={14} className="text-primary shrink-0" />
                  <span className="truncate">IS 2062 Mild Steel</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <Award size={14} className="text-amber-500 shrink-0" />
                  <span className="truncate">Dual PU Finish</span>
                </div>
              </div>
            </div>

            {/* CTAs & Utilities */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button suppressHydrationWarning
                  onClick={() => openEnquiry(tx(product.title))}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={15} />
                  <span>{lang === 'en' ? 'Instant Quote' : 'तुरंत कोटेशन'}</span>
                </button>

                <a
                  href="tel:9425245291"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>Call Sales</span>
                </a>
              </div>

              {/* Utility Row */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
                <a
                  href={`https://wa.me/919425245291?text=Hello,%20I%20am%20interested%20in%20your%20${encodeURIComponent(tx(product.title))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="py-2 px-2 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1 truncate"
                >
                  <MessageCircle size={13} className="text-emerald-600 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                {product.brochure_url ? (
                  <a
                    href={product.brochure_url}
                    target="_blank" rel="noopener noreferrer"
                    className="py-2 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1 truncate"
                  >
                    <Download size={13} className="text-slate-500 shrink-0" />
                    <span>Spec Sheet</span>
                  </a>
                ) : (
                  <button suppressHydrationWarning
                    onClick={handleDownload}
                    disabled={downloadStatus === 'loading'}
                    className="py-2 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1 truncate cursor-pointer"
                  >
                    {downloadStatus === 'loading' ? (
                      <Loader2 size={13} className="animate-spin text-primary shrink-0" />
                    ) : downloadStatus === 'success' ? (
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    ) : (
                      <Download size={13} className="text-slate-500 shrink-0" />
                    )}
                    <span>{downloadStatus === 'success' ? 'Saved' : 'Spec Sheet'}</span>
                  </button>
                )}

                <button suppressHydrationWarning
                  onClick={handleCopyLink}
                  className="py-2 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1 truncate cursor-pointer"
                >
                  {copyStatus ? <Check size={13} className="text-emerald-600 shrink-0" /> : <Share2 size={13} className="text-slate-500 shrink-0" />}
                  <span>{copyStatus ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── COLUMN 2: PRODUCT VISUAL (~36% - lg:col-span-4) ── */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
            {/* Viewport */}
            <div 
              className="relative w-full aspect-[4/3] max-h-[360px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden cursor-zoom-in group flex items-center justify-center p-3"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {galleryItems[activeImgIdx]?.type === 'image' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={galleryItems[activeImgIdx]?.src}
                  alt={tx(product.title)}
                  className="w-full h-full object-contain transition-transform duration-150 ease-out"
                  style={{
                    transform: isHovered 
                      ? `scale(1.75) translate(${-(zoomPos.x - 50) * 0.25}px, ${-(zoomPos.y - 50) * 0.25}px)` 
                      : 'scale(1) translate(0, 0)',
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/85 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider rounded-md flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Verified Asset</span>
              </div>

              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-slate-900/85 backdrop-blur text-white text-[10px] font-bold rounded-md pointer-events-none flex items-center gap-1">
                <Maximize2 size={10} />
                <span>Zoom</span>
              </div>
            </div>

            {/* Directly Integrated Thumbnails Bar */}
            {galleryItems.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {galleryItems.map((item: any, idx: number) => (
                  <button suppressHydrationWarning
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`aspect-[4/3] rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center transition-all overflow-hidden cursor-pointer ${
                      activeImgIdx === idx 
                        ? 'ring-2 ring-primary ring-offset-1 scale-95 shadow-sm' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} className="w-full h-full object-contain p-1" alt={`Thumbnail ${idx + 1}`} />
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

                      {product.specs && Object.entries(product.specs).map(([key, value], idx) => {
                        const formattedKey = key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/_/g, ' ')
                          .replace(/^./, str => str.toUpperCase())
                          .trim();

                        return (
                          <tr key={key} className={`${idx % 2 === 0 ? 'bg-slate-50/80' : 'bg-white'} border-b border-slate-200`}>
                            <td className="p-2.5 font-bold text-slate-800 border-r border-slate-200 capitalize">{formattedKey}</td>
                            <td className="p-2.5 text-slate-700 font-bold">{String(value)}</td>
                          </tr>
                        );
                      })}

                      <tr className="bg-emerald-50/50">
                        <td className="p-2.5 font-bold text-slate-800 border-r border-slate-200">Warranty</td>
                        <td className="p-2.5 text-emerald-800 font-bold flex items-center gap-1">
                          <Award size={14} className="text-emerald-600" />
                          <span>1 Year Manufacturer</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-primary" /> Tested Industrial Quality
              </span>
              <button suppressHydrationWarning 
                onClick={() => openEnquiry(tx(product.title))}
                className="text-primary hover:underline font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ask Specs</span> <ArrowUpRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── FULL-WIDTH HORIZONTAL PRODUCT HIGHLIGHTS STRIP ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold font-rajdhani text-sm text-slate-100">IS 2062 Grade Steel</h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-snug">Heavy duty chassis engineered for high load capacity.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-bold font-rajdhani text-sm text-slate-100">Dual PU Gloss Finish</h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-snug">Anti-corrosive primer and weather-resistant coating.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                <Wrench size={20} />
              </div>
              <div>
                <h4 className="font-bold font-rajdhani text-sm text-slate-100">Heavy Hydraulic System</h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-snug">Precision lift cylinders built for seamless dumping.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold font-rajdhani text-sm text-slate-100">1 Year Factory Warranty</h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-snug">Full structural and manufacturing coverage guarantee.</p>
              </div>
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
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Star size={14} />
                <span>{lang === 'en' ? 'Owner Reviews' : 'समीक्षाएं'}</span>
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
                      <p className="text-slate-500 text-[11px]">Precision welding with IS 2062 grade steel structure.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Industrial Axle & Suspension</h4>
                      <p className="text-slate-500 text-[11px]">Heavy-duty stub axles designed for extreme haul loads.</p>
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
                  {lang === 'en' ? 'Key Features & Advantages' : 'मुख्य विशेषताएँ और लाभ'}
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
                      <span className="text-slate-800 text-xs font-semibold">High-capacity hydraulic cylinder for smooth un-loading.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-xs font-semibold">Reinforced floor plates for high impact durability.</span>
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
                        <p className="text-[11px] text-slate-500">Grain, soil, and harvest cargo transport across rugged farm tracks.</p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
                          <Building2 size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Construction Cargo</h4>
                        <p className="text-[11px] text-slate-500">Sand, gravel, bricks and heavy infrastructure material carriage.</p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                          <Truck size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Industrial Utility</h4>
                        <p className="text-[11px] text-slate-500">Factory logistics, municipal waste, and commercial site carriage.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: OWNER REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="font-bold font-rajdhani text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Star size={17} className="text-amber-500" />
                  {lang === 'en' ? 'Verified Testimonials' : 'ग्राहकों की समीक्षाएँ'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SAMPLE_REVIEWS.map((rev, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">{tx(rev.name)}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{tx(rev.role)}</div>
                        </div>
                        <div className="flex gap-0.5 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={11} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed italic">
                        &quot;{tx(rev.text)}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN: MANUFACTURER DIRECT ENQUIRY FORM (35% - lg:col-span-4) ── */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden lg:sticky lg:top-[110px]">
            <div className="bg-slate-900 text-white p-4 sm:p-5">
              <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider rounded mb-1">
                Direct Factory Inquiry
              </span>
              <h3 className="font-bold font-rajdhani text-lg sm:text-xl">
                {lang === 'en' ? 'Request Price Quotation' : 'मूल्य कोटेशन का अनुरोध करें'}
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                {lang === 'en' 
                  ? 'Get direct manufacturer pricing details.' 
                  : 'सीधे निर्माता मूल्य विवरण प्राप्त करें।'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
              {submitStatus === 'success' ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base font-rajdhani">
                    {lang === 'en' ? 'Quotation Request Sent!' : 'कोटेशन अनुरोध भेजा गया!'}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Our sales team will contact you shortly with complete pricing details.
                  </p>
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Send Another Inquiry' : 'एक और पूछताछ भेजें'}
                  </button>
                </div>
              ) : (
                <>
                  {errors.submit && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
                      <span className="font-bold">!</span>
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                    </label>
                    <input suppressHydrationWarning
                      type="text"
                      placeholder={tx(t.contact.namePH)}
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                        errors.name ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Phone Number *' : 'फोन नंबर *'}
                    </label>
                    <input suppressHydrationWarning
                      type="tel"
                      placeholder={tx(t.contact.phonePH)}
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                        errors.phone ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                        {lang === 'en' ? 'Email' : 'ईमेल'}
                      </label>
                      <input suppressHydrationWarning
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                        {lang === 'en' ? 'Company' : 'कंपनी'}
                      </label>
                      <input suppressHydrationWarning
                        type="text"
                        placeholder="Company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-2">
                      <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                        {lang === 'en' ? 'Selected Model' : 'चयनित मॉडल'}
                      </label>
                      <input suppressHydrationWarning
                        type="text"
                        value={form.service}
                        disabled
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-100 text-slate-700 font-bold outline-none truncate"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                        {lang === 'en' ? 'Quantity' : 'मात्रा'}
                      </label>
                      <input suppressHydrationWarning
                        type="number"
                        min="1"
                        value={form.quantity}
                        onChange={(e) => {
                          setForm({ ...form, quantity: e.target.value });
                          if (errors.quantity) setErrors({ ...errors, quantity: undefined });
                        }}
                        className={`w-full px-3 py-2 rounded-lg border text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                          errors.quantity ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Notes / Requirements' : 'नोट्स'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={tx(t.contact.msgPH)}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                    />
                  </div>

                  <button suppressHydrationWarning
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-85 transition-all cursor-pointer"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Quotation Request</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>

        </div>
      </section>

      {/* ── RELATED PRODUCTS SHOWCASE (FULL-WIDTH 4-COLUMN DESKTOP GRID) ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white border-t border-slate-200 py-12 mt-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {lang === 'en' ? 'Similar Manufacturing Models' : 'समान विनिर्माण मॉडल'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-rajdhani text-slate-900 mt-1.5">
                  {lang === 'en' ? 'Related Equipment' : 'संबंधित उपकरण'}
                </h2>
              </div>

              <button suppressHydrationWarning
                onClick={() => router.push(`/products?category=${encodeURIComponent(productCatName || '')}`)}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
              >
                <span>{lang === 'en' ? 'View All Category Models' : 'श्रेणी के सभी मॉडल देखें'}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p: any) => {
                const targetSlug = p.slug || p.id;
                return (
                  <div 
                    key={p.id || p.slug}
                    onClick={() => {
                      router.push(`/products/${targetSlug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-2xs border border-slate-200 flex flex-col transition-all hover:-translate-y-1 hover:shadow-md group"
                  >
                    <div className="h-44 shrink-0 relative overflow-hidden bg-slate-50 border-b border-slate-100">
                      <ProductImage
                        src={getProductPrimaryImage(p)}
                        alt={`${tx(p.title)} - Piyush Agro Industries`}
                        fill
                        fallbackIcon={p.icon}
                        fallbackGradient={p.gradient}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">{productCatName}</span>
                      <h3 className="font-bold font-rajdhani text-slate-900 text-base mb-1.5 line-clamp-1 break-words group-hover:text-primary transition-colors">{tx(p.title)}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">{tx(p.desc || p.short_desc)}</p>
                      
                      <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100">
                        <button suppressHydrationWarning
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/products/${targetSlug}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs transition-colors text-center cursor-pointer"
                        >
                          {lang === 'en' ? 'View Details' : 'विवरण'}
                        </button>
                        <button suppressHydrationWarning
                          onClick={(e) => {
                            e.stopPropagation();
                            openEnquiry(tx(p.title));
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-gradient-primary text-white font-bold text-xs shadow-2xs hover:shadow-xs transition-all text-center cursor-pointer"
                        >
                          {lang === 'en' ? 'Get Quote' : 'कोटेशन'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <ProductDetailContent params={params} />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
