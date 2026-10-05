'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider, useData } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import { t } from '@/constants/translations';
import { Search, ChevronRight, ArrowRight, X, Phone, MessageCircle } from 'lucide-react';
import { ProductImage } from '@/components/ui/ProductImage';
import { getProductPrimaryImage } from '@/utils/imageUtils';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

function ProductsContent() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync initial category and search query on load if they change in URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);
    else setSearchQuery('');
  }, [searchParams]);

  const { categories = [], products = [] } = useData() || {};
  
  const CATEGORIES = useMemo(() => {
    const raw = ['All', ...categories.map((c: any) => typeof c.name === 'object' ? (c.name?.en || c.name?.hi) : c.name).filter(Boolean)];
    return Array.from(new Set(raw));
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      let productCatName = '';
      const cat = categories.find((c: any) => c.id === product.category_id || c.slug === product.category_id);
      if (cat) {
        productCatName = typeof cat.name === 'object' ? (cat.name?.en || cat.name?.hi) : cat.name;
      } else if (product.category) {
        productCatName = typeof product.category === 'object' ? (product.category?.en || product.category?.hi) : product.category;
      }
      
      const matchesCategory = 
        activeCategory === 'All' || 
        productCatName.toLowerCase() === activeCategory.toLowerCase() ||
        (product.category_id && product.category_id.toLowerCase() === activeCategory.toLowerCase());

      const titleStr = tx(product.title).toLowerCase();
      const matchesSearch = !searchQuery || titleStr.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, tx, products, categories]);

  return (
    <main className="relative bg-gray-50 min-h-screen pt-[64px] sm:pt-[100px]">
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
        ]}
      />
      
      {/* ── Hero & Breadcrumb ── */}
      <section className="relative bg-gray-900 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center scroll-reveal" data-visible="true">
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-rajdhani text-white mb-4 drop-shadow-md">
            {lang === 'en' ? 'Our Products' : 'हमारे उत्पाद'}
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base">
            {lang === 'en' 
              ? 'Explore our premium range of heavy-duty tractor trolleys, hydraulic trailers, and custom fabrication manufactured in Rajnandgaon, Chhattisgarh.' 
              : 'राजनांदगांव, छत्तीसगढ़ में निर्मित हमारे अत्यधिक टिकाऊ ट्रैक्टर ट्रॉली, हाइड्रोलिक ट्रेलर और कस्टम फेब्रिकेशन की प्रीमियम श्रृंखला देखें।'}
          </p>
        </div>
      </section>

      {/* ── Filters & Search ── */}
      <section className="sticky top-[64px] z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {CATEGORIES.map((cat) => (
                <button
                  suppressHydrationWarning
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    const newParams = new URLSearchParams(searchParams.toString());
                    if (cat === 'All') newParams.delete('category');
                    else newParams.set('category', cat);
                    router.push(`/products?${newParams.toString()}`, { scroll: false });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search equipment...' : 'उपकरण खोजें...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 bg-gray-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-800 placeholder-gray-400 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product: any, idx: number) => {
              const primaryImage = getProductPrimaryImage(product);
              const targetSlug = product.slug || product.id;
              const productUrl = `/products/${targetSlug}`;
              const productTitleStr = tx(product.title);

              return (
                <div 
                  key={product.id || idx}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                >
                  {/* Image Container with crawlable link */}
                  <Link
                    href={productUrl}
                    className="relative h-56 bg-gray-50 flex items-center justify-center p-4 overflow-hidden border-b border-gray-50 block"
                  >
                    <ProductImage 
                      src={primaryImage}
                      alt={`Piyush Agro Industries ${productTitleStr} in Rajnandgaon, Chhattisgarh`}
                      fill
                      fallbackIcon={product.icon}
                      fallbackGradient={product.gradient}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold tracking-wider uppercase text-primary shadow-xs">
                        {typeof product.category === 'object' ? tx(product.category) : product.category}
                      </span>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold font-rajdhani text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      <Link href={productUrl}>
                        {productTitleStr}
                      </Link>
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                      {product.short_desc ? tx(product.short_desc) : (product.desc ? tx(product.desc) : '')}
                    </p>

                    {/* Specs Preview */}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-1.5 border border-gray-100/80 mt-auto">
                        {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="font-bold text-gray-900 text-[11px] sm:text-xs capitalize">{key}</span>
                            <span className="text-gray-700 text-[11px] sm:text-xs font-semibold px-2 py-0.5 bg-white border border-gray-100 rounded-md shadow-sm text-right line-clamp-1 max-w-[120px]">
                              {value as string}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {(!product.specs || Object.keys(product.specs).length === 0) && <div className="mt-auto" />}

                    <div className="flex gap-2.5 mt-4 pt-3 border-t border-gray-100/60">
                      <Link
                        href={productUrl}
                        className="flex-1 py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs transition-colors text-center shadow-sm"
                      >
                        {lang === 'en' ? 'View Details' : 'विवरण देखें'}
                      </Link>
                      <button suppressHydrationWarning
                        onClick={() => openEnquiry(productTitleStr)}
                        className="flex-1 py-2.5 px-2 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-md hover:shadow-lg transition-all text-center relative overflow-hidden group"
                      >
                        <span className="relative z-10">{lang === 'en' ? 'Get Quote' : 'कोटेशन'}</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold font-rajdhani text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or category filters.</p>
            <button suppressHydrationWarning 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 px-6 py-2 rounded-xl bg-gradient-primary text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function ProductsClient() {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-32 text-center text-gray-400 font-rajdhani">Loading catalogue...</div>}>
              <ProductsContent />
            </Suspense>
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
