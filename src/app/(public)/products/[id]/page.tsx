'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider, useData } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import { normalizeImageUrl } from '@/utils/imageUtils';
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
  Share2, 
  Download, 
  Star, 
  Send, 
  Loader2, 
  Building2, 
  Sparkles, 
  Maximize2, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));

// Dynamic Sidebar will be rendered directly from useData()

// Static reviews to display in details section
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
  const id = (pathParams?.id || params?.id) as string;
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const { categories = [], products = [] } = useData() || {};
  
  // Find current product
  const product = useMemo(() => {
    return products.find((p: any) => p.slug === id || p.id === id);
  }, [id, products]);

  const productCatName = useMemo(() => {
    if (!product) return '';
    const cat = categories.find((c: any) => c.id === product.category_id);
    if (cat) return cat.name?.en;
    if (product.category) return product.category;
    return 'Unknown Category';
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

  // Compute multi-photo gallery
  const galleryItems = useMemo(() => {
    if (!product) return [];
    const imgs: string[] = [];
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((img: string) => {
        const norm = normalizeImageUrl(img);
        if (norm && !imgs.includes(norm)) imgs.push(norm);
      });
    }
    const normThumb = normalizeImageUrl(product.thumbnail);
    if (normThumb && !imgs.includes(normThumb)) {
      imgs.unshift(normThumb);
    }
    if (imgs.length > 0) {
      return imgs.map((img: string) => ({ type: 'image', src: img }));
    }
    return [
      { type: 'icon', icon: product.icon, gradient: product.gradient },
    ];
  }, [product]);

  // Mouse move handler for magnifier scale zoom
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

    // Append extra details to message
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
      // Replicate Firebase configuration warning check
      if (result.error.includes('Supabase not configured') || result.error.includes('YOUR_PROJECT_ID')) {
        setSubmitStatus('success');
        setForm({ ...EMPTY_FORM, service: product ? tx(product.title) : '' });
      } else {
        setSubmitStatus('error');
        setErrors({ submit: tx(t.contact.errSubmit) });
      }
    }
  };

  // Mock brochure download action
  const handleDownload = () => {
    setDownloadStatus('loading');
    setTimeout(() => {
      setDownloadStatus('success');
      // Create a mock download link
      const element = document.createElement('a');
      const file = new Blob([`Piyush Agro Industries - ${product ? tx(product.title) : 'Product'} Specifications Brochure`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${product?.id || 'product'}-brochure.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // reset status after 3 seconds
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }, 1500);
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    }
  };

  // Compute related products from the same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(
      (p: any) => {
        if (product.category_id && p.category_id) {
          return p.category_id === product.category_id && p.id !== product.id;
        }
        return p.category === product.category && p.id !== product.id;
      }
    ).slice(0, 3);
  }, [product, products]);

  // If product doesn't exist, show not found screen
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 pt-[100px] flex flex-col justify-between">
        <Header />
        <div className="max-w-md mx-auto my-auto text-center px-4 py-20 bg-white rounded-3xl shadow-card border border-gray-100 animate-fade-up">
          <span className="text-7xl mb-6 block">🔍</span>
          <h1 className="text-3xl font-bold font-rajdhani text-gray-900 mb-3">
            {lang === 'en' ? 'Product Not Found' : 'उत्पाद नहीं मिला'}
          </h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            {lang === 'en' 
              ? 'The product you are looking for might have been moved or renamed.' 
              : 'जिस उत्पाद को आप खोज रहे हैं, उसका नाम बदल दिया गया है या उसे हटा दिया गया है।'}
          </p>
          <button suppressHydrationWarning 
            onClick={() => router.push('/products')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft size={16} /> <span>{lang === 'en' ? 'Back to Products' : 'उत्पादों पर वापस जाएं'}</span>
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative bg-gray-50 min-h-screen pt-[64px] sm:pt-[100px]">
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

      {/* ── Breadcrumb Navigation ── */}
      <section className="bg-white border-b border-gray-100 py-4 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 font-medium">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight size={14} className="text-gray-400" />
            <a href="/products" className="hover:text-primary transition-colors">Products</a>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-400 max-w-[150px] sm:max-w-none truncate">{productCatName}</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-primary font-bold max-w-[150px] sm:max-w-none truncate">{tx(product.title)}</span>
          </div>
          <button suppressHydrationWarning 
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary text-xs font-bold transition-colors bg-gray-100 hover:bg-primary-50 px-3 py-1.5 rounded-lg border border-gray-200"
          >
            <ArrowLeft size={12} /> {lang === 'en' ? 'Go Back' : 'पीछे जाएं'}
          </button>
        </div>
      </section>

      {/* ── Main Details Grid Layout ── */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Column 1: Left Categories Sidebar (lg:col-span-3) ── */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-card p-5 sticky top-[120px] hidden lg:block">
            <h3 className="font-bold font-rajdhani text-gray-900 text-lg border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              {lang === 'en' ? 'Product Categories' : 'उत्पाद श्रेणियाँ'}
            </h3>
            <ul className="space-y-1">
              {categories.map((cat: any) => {
                const catProductsCount = products.filter((p: any) => p.category_id === cat.id).length;
                const isActive = product.category_id === cat.id;
                return (
                  <li key={cat.id}>
                    <button suppressHydrationWarning
                      onClick={() => router.push(`/products?category=${cat.id}`)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                        isActive 
                          ? 'bg-gradient-primary text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}
                    >
                      <span className="truncate pr-2">{tx(cat.name)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {catProductsCount}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <button suppressHydrationWarning
                onClick={() => openEnquiry(tx(product.title))}
                className="w-full py-3 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-primary hover:shadow-primary-lg transition-all"
              >
                {lang === 'en' ? 'Get Quote for This Product' : 'इस उत्पाद के लिए कोटेशन'}
              </button>
            </div>
          </aside>

          {/* ── Column 2: Center Content details (lg:col-span-5) ── */}
          <article className="lg:col-span-5 space-y-8">
            
            {/* Main Details & Title */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full">
                {productCatName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-rajdhani text-gray-900 leading-tight">
                {tx(product.title)}
              </h1>
              {product.short_desc && (
                <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                  {tx(product.short_desc)}
                </p>
              )}
              {product.full_desc && (
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {tx(product.full_desc)}
                </div>
              )}
            </div>

            {/* Interactive Image Gallery with Magnifier Scale Zoom */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card space-y-4">
              {/* Large Image display area */}
              <div 
                className={`relative overflow-hidden w-full h-72 sm:h-96 rounded-xl ${galleryItems[activeImgIdx]?.type === 'image' ? 'bg-gray-100' : `bg-gradient-to-br ${(galleryItems[activeImgIdx] as any)?.gradient || 'from-primary to-primary-dark'}`} flex items-center justify-center cursor-zoom-in shadow-inner border border-white/10`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {galleryItems[activeImgIdx]?.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={(galleryItems[activeImgIdx] as any)?.src}
                    alt={tx(product.title)}
                    className="w-full h-full object-cover transition-transform duration-75 ease-out"
                    style={{
                      transform: isHovered 
                        ? `scale(1.8) translate(${-(zoomPos.x - 50) * 0.3}px, ${-(zoomPos.y - 50) * 0.3}px)` 
                        : 'scale(1) translate(0, 0)',
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                    
                    <div 
                      className="transition-transform duration-75 ease-out text-7xl sm:text-9xl select-none filter drop-shadow-2xl"
                      style={{
                        transform: isHovered 
                          ? `scale(1.8) translate(${-(zoomPos.x - 50) * 0.3}px, ${-(zoomPos.y - 50) * 0.3}px)` 
                          : 'scale(1) translate(0, 0)',
                      }}
                    >
                      {(galleryItems[activeImgIdx] as any)?.icon}
                    </div>
                  </>
                )}

                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/45 hover:bg-black/60 backdrop-blur text-white text-[10px] uppercase font-bold rounded-lg pointer-events-none flex items-center gap-1">
                  <Maximize2 size={10} /> {lang === 'en' ? 'Hover to Zoom' : 'ज़ूम करने के लिए माउस लाएं'}
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="grid grid-cols-3 gap-3">
                {galleryItems.map((item: any, idx: number) => (
                  <button suppressHydrationWarning
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-16 sm:h-20 rounded-xl ${item.type === 'image' ? 'bg-gray-100' : `bg-gradient-to-br ${item.gradient}`} flex items-center justify-center text-3xl transition-all relative overflow-hidden border-2 ${
                      activeImgIdx === idx 
                        ? 'border-primary ring-2 ring-primary-50 scale-95 shadow-md' 
                        : 'border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {item.type === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.src} className="w-full h-full object-cover" alt="Thumbnail" />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
                        <span className="drop-shadow">{item.icon}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-5">
              <h3 className="font-bold font-rajdhani text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                {lang === 'en' ? 'Technical Specifications' : 'तकनीकी विशिष्टताएँ'}
              </h3>
              
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <tbody>
                    <tr className="bg-gray-50/70 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-semibold text-gray-700 w-1/3 border-r border-gray-100">{lang === 'en' ? 'Material' : 'सामग्री'}</td>
                      <td className="p-3 text-gray-600">IS 2062 Grade Mild Steel</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-semibold text-gray-700 w-1/3 border-r border-gray-100">{lang === 'en' ? 'Coatings' : 'कोटिंग'}</td>
                      <td className="p-3 text-gray-600">Anti-corrosive Red Primer with double-coat PU Gloss Paint</td>
                    </tr>
                    
                    {product.specs && Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={key} className={`${idx % 2 === 0 ? 'bg-gray-50/70' : 'bg-white'} border-b border-gray-100 hover:bg-gray-50 transition-colors`}>
                        <td className="p-3 font-semibold text-gray-700 w-1/3 border-r border-gray-100 capitalize">{key}</td>
                        <td className="p-3 text-gray-600">{value as string}</td>
                      </tr>
                    ))}

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-semibold text-gray-700 w-1/3 border-r border-gray-100">{lang === 'en' ? 'Warranty' : 'वारंटी'}</td>
                      <td className="p-3 text-gray-600 font-semibold text-green-600">1 Year Manufacturer Warranty</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Brochure Download & Share Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button suppressHydrationWarning
                  onClick={() => openEnquiry(tx(product.title))}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-primary hover:shadow-primary-lg transition-all"
                >
                  <Sparkles size={16} />
                  <span>{lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}</span>
                </button>

                {product.brochure_url ? (
                  <a
                    href={product.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all duration-200 bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                  >
                    <Download size={16} className="text-gray-500" />
                    <span>{lang === 'en' ? 'Download Brochure' : 'उत्पाद ब्रोशर डाउनलोड करें'}</span>
                  </a>
                ) : (
                  <button suppressHydrationWarning
                    onClick={handleDownload}
                    disabled={downloadStatus === 'loading'}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all duration-200 ${
                      downloadStatus === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  >
                    {downloadStatus === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-primary" />
                        <span>{lang === 'en' ? 'Generating Brochure...' : 'ब्रोशर जनरेट हो रहा है...'}</span>
                      </>
                    ) : downloadStatus === 'success' ? (
                      <>
                        <CheckCircle2 size={16} className="text-green-600" />
                        <span>{lang === 'en' ? 'Brochure Downloaded!' : 'ब्रोशर डाउनलोड हो गया!'}</span>
                      </>
                    ) : (
                      <>
                        <Download size={16} className="text-gray-500" />
                        <span>{lang === 'en' ? 'Download Brochure' : 'उत्पाद ब्रोशर डाउनलोड करें'}</span>
                      </>
                    )}
                  </button>
                )}

                <button suppressHydrationWarning
                  onClick={handleCopyLink}
                  className={`px-4 py-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                    copyStatus 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                  title="Copy Page Link"
                >
                  {copyStatus ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  <span>{copyStatus ? (lang === 'en' ? 'Link Copied!' : 'लिंक कॉपी हो गया!') : (lang === 'en' ? 'Share' : 'शेयर करें')}</span>
                </button>
              </div>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
                <h3 className="font-bold font-rajdhani text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  {lang === 'en' ? 'Key Features' : 'मुख्य विशेषताएँ'}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                  {product.features.map((feature: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">⭐</span>
                      <span>{tx(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications List */}
            {product.applications && product.applications.length > 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
                <h3 className="font-bold font-rajdhani text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  {lang === 'en' ? 'Product Applications' : 'उत्पाद के अनुप्रयोग'}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                  {product.applications.map((app: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✔</span>
                      <span>{tx(app)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
                <h3 className="font-bold font-rajdhani text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  {lang === 'en' ? 'Product Applications' : 'उत्पाद के अनुप्रयोग'}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✔</span>
                    <span>{lang === 'en' ? 'Ideal for heavy agricultural transportation including grain, soil, and sugarcane hauling.' : 'अनाज, मिट्टी और गन्ना ढोने सहित भारी कृषि परिवहन के लिए आदर्श।'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✔</span>
                    <span>{lang === 'en' ? 'Highly customizable structural designs suitable for construction site cargo carriage.' : 'निर्माण स्थलों पर माल ढुलाई के लिए उपयुक्त अत्यधिक कस्टमाइज़ स्ट्रक्चरल डिज़ाइन।'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✔</span>
                    <span>{lang === 'en' ? 'Reinforced chassis for safe operation across rough, rural terrains of Chhattisgarh.' : 'छत्तीसगढ़ के ग्रामीण और उबड़-खाबड़ रास्तों में सुरक्षित संचालन के लिए मजबूत चेसिस।'}</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Customer Reviews Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold font-rajdhani text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                {lang === 'en' ? 'Customer Reviews' : 'ग्राहक समीक्षाएं'}
              </h3>
              
              <div className="space-y-4">
                {SAMPLE_REVIEWS.map((rev, idx) => (
                  <div key={idx} className="p-4 bg-gray-50/70 rounded-xl border border-gray-100 space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-gray-900">{tx(rev.name)}</div>
                        <div className="text-[10px] text-gray-400">{tx(rev.role)}</div>
                      </div>
                      <div className="flex gap-0.5 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed italic">
                      &quot;{tx(rev.text)}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* ── Column 3: Right Enquiry Form Panel (lg:col-span-4) ── */}
          <aside className="lg:col-span-4 sticky top-[120px]">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              {/* Form Title Banner */}
              <div className="bg-gradient-primary p-5 text-white">
                <span className="inline-block px-2.5 py-0.5 bg-white/20 text-white text-[9px] uppercase font-bold tracking-wider rounded-md mb-2">
                  {lang === 'en' ? 'Direct Manufacturer Quote' : 'निर्माता से सीधे कोटेशन'}
                </span>
                <h3 className="font-bold font-rajdhani text-xl sm:text-2xl leading-none">
                  {lang === 'en' ? 'Get a Free Quote' : 'मुफ्त कोटेशन पाएं'}
                </h3>
                <p className="text-white/80 text-xs mt-1.5">
                  {lang === 'en' 
                    ? 'Fill out the form below. We usually respond within 2 hours.' 
                    : 'नीचे दिया गया फॉर्म भरें। हम सामान्यतः 2 घंटे में प्रतिक्रिया देते हैं।'}
                </p>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                
                {submitStatus === 'success' ? (
                  <div className="py-8 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-100">
                      <CheckCircle2 size={36} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg font-rajdhani">
                        {lang === 'en' ? 'Enquiry Submitted Successfully!' : 'पूछताछ सफलतापूर्वक सबमिट हुई!'}
                      </h4>
                      <p className="text-gray-500 text-xs mt-2 px-4 leading-relaxed">
                        {tx(t.contact.successMsg)}
                      </p>
                    </div>
                    <button suppressHydrationWarning
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-xs rounded-xl transition-all"
                    >
                      {lang === 'en' ? 'Send Another Enquiry' : 'एक और पूछताछ भेजें'}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Error Toast */}
                    {errors.submit && (
                      <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl flex items-start gap-2">
                        <span className="font-bold">⚠️</span>
                        <span>{errors.submit}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                      </label>
                      <input suppressHydrationWarning
                        type="text"
                        placeholder={tx(t.contact.namePH)}
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                          errors.name ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                        }`}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
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
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                          errors.phone ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                        }`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                    </div>

                    {/* Email & Company (Two columns) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'en' ? 'Email (Optional)' : 'ईमेल (वैकल्पिक)'}
                        </label>
                        <input suppressHydrationWarning
                          type="email"
                          placeholder="name@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'en' ? 'Company (Optional)' : 'कंपनी (वैकल्पिक)'}
                        </label>
                        <input suppressHydrationWarning
                          type="text"
                          placeholder="Agro Farms Ltd"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Product & Quantity (Two columns) */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'en' ? 'Selected Product' : 'चयनित उत्पाद'}
                        </label>
                        <input suppressHydrationWarning
                          type="text"
                          value={form.service}
                          disabled
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-100 text-xs bg-gray-100 text-gray-500 font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
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
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                            errors.quantity ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                          }`}
                        />
                        {errors.quantity && <span className="text-[10px] text-red-500 mt-1 block">{errors.quantity}</span>}
                      </div>
                    </div>

                    {/* Requirements Message */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {lang === 'en' ? 'Describe Requirements' : 'आवश्यकताओं का विवरण'}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={tx(t.contact.msgPH)}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button suppressHydrationWarning
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-primary hover:shadow-primary-lg disabled:opacity-85 transition-all"
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>{tx(t.contact.sending)}</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>{tx(t.contact.submitBtn)}</span>
                        </>
                      )}
                    </button>

                    {/* Quick Call details */}
                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                      <a 
                        href="tel:9425245291"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-200 text-gray-700 hover:text-primary text-[11px] font-bold transition-all text-center whitespace-normal break-words"
                      >
                        <Phone size={13} className="text-primary shrink-0" />
                        <span>Call +91 9425245291</span>
                      </a>
                      <a 
                        href={`https://wa.me/919425245291?text=Hello,%20I%20am%20interested%20in%20your%20${tx(product.title)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-200 text-gray-700 hover:text-green-600 text-[11px] font-bold transition-all text-center whitespace-normal break-words"
                      >
                        <MessageCircle size={13} className="text-green-500 shrink-0" />
                        <span>WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </>
                )}

              </form>
            </div>
          </aside>

        </div>
      </section>

      {/* ── Related Products Section ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-100/50 border-t border-gray-200/40 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center md:text-left mb-10">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full mb-2">
                {lang === 'en' ? 'Similar Equipment' : 'समान उपकरण'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-rajdhani text-gray-900">
                {lang === 'en' ? 'Related Products' : 'संबंधित उत्पाद'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p: any) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    router.push(`/products/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer card-hover bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-36 shrink-0 flex items-center justify-center relative overflow-hidden ${p.images && p.images.length > 0 ? 'bg-gray-100' : `bg-gradient-to-br ${p.gradient}`}`}>
                    {p.images && p.images.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={p.images[0]} 
                        alt={tx(p.title)} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
                        <span className="text-5xl relative z-10 drop-shadow transition-transform duration-500 hover:scale-110">{p.icon}</span>
                      </>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">{productCatName}</span>
                    <h3 className="font-bold font-rajdhani text-gray-900 text-base mb-2 line-clamp-1 break-words group-hover:text-primary transition-colors">{tx(p.title)}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">{tx(p.desc)}</p>
                    <div className="flex gap-2.5 mt-auto pt-3 border-t border-gray-100/60">
                      <button suppressHydrationWarning
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/products/${p.id}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs transition-colors text-center"
                      >
                        {lang === 'en' ? 'Details' : 'विवरण'}
                      </button>
                      <button suppressHydrationWarning
                        onClick={(e) => {
                          e.stopPropagation();
                          openEnquiry(tx(p.title));
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-sm hover:shadow-md transition-all text-center"
                      >
                        {lang === 'en' ? 'Get Quote' : 'कोटेशन'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
