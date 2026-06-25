'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header        from '@/components/Header';
import { t, EXTENDED_PRODUCTS } from '@/lib/translations';
import { Search, ChevronRight, ArrowRight, X, Phone, MessageCircle, Settings, Weight, Maximize } from 'lucide-react';

const Footer = dynamic(() => import('@/components/Footer'));

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

  const CATEGORIES = ['All', 'Tractor Trailers', 'Hydraulic Tractor Trolley', 'Generator Trolley', 'Material Handling Equipment'];

  const filteredProducts = useMemo(() => {
    return EXTENDED_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const titleStr = tx(product.title).toLowerCase();
      const matchesSearch = titleStr.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, tx]);

  return (
    <main className="relative bg-gray-50 min-h-screen pt-[64px] sm:pt-[100px]">
      <Header />
      
      {/* ── Hero & Breadcrumb ── */}
      <section className="relative bg-gray-900 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center animate-fade-up">
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-semibold mb-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight size={14} />
            <span className="text-white">Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-rajdhani text-white mb-4 drop-shadow-md">
            {lang === 'en' ? 'Our Products' : 'हमारे उत्पाद'}
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base">
            {lang === 'en' 
              ? 'Explore our premium range of highly durable agricultural and commercial transport equipment.' 
              : 'हमारे अत्यधिक टिकाऊ कृषि और वाणिज्यिक परिवहन उपकरणों की प्रीमियम श्रृंखला देखें।'}
          </p>
        </div>
      </section>

      {/* ── Filters & Search ── */}
      <section className="sticky top-[64px] z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeCategory === cat 
                      ? 'bg-gradient-primary text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 flex-shrink-0">
              <input 
                type="text" 
                placeholder={lang === 'en' ? 'Search products...' : 'उत्पाद खोजें...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 border-none text-sm focus:ring-2 focus:ring-primary outline-none transition-shadow"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <div 
                key={product.id}
                className="card-hover bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 h-full flex flex-col animate-fade-up"
                style={{ animationDelay: `${(i % 8) * 50}ms` }}
              >
                <div className={`h-40 shrink-0 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                  <span className="text-6xl relative z-10 drop-shadow">{product.icon}</span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1.5">{product.category}</span>
                  <h3 className="font-bold font-rajdhani text-gray-900 text-lg mb-2 line-clamp-2 break-words">{tx(product.title)}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{tx(product.desc)}</p>

                  {product.specs && (
                    <div className="bg-gray-50/80 rounded-xl p-3 mb-4 flex flex-col gap-2.5 border border-gray-100 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Settings size={14} className="text-primary" />
                          <span className="font-bold text-gray-900 text-[11px] sm:text-xs">Part Name</span>
                        </div>
                        <span className="text-gray-700 text-[11px] sm:text-xs font-semibold px-2 py-0.5 bg-white border border-gray-100 rounded-md shadow-sm text-right line-clamp-1 max-w-[120px]">
                          {product.specs.nameOfPart}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Weight size={14} className="text-primary" />
                          <span className="font-bold text-gray-900 text-[11px] sm:text-xs">Capacity</span>
                        </div>
                        <span className="text-gray-700 text-[11px] sm:text-xs font-semibold px-2 py-0.5 bg-white border border-gray-100 rounded-md shadow-sm text-right line-clamp-1 max-w-[120px]">
                          {product.specs.capacity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Maximize size={14} className="text-primary" />
                          <span className="font-bold text-gray-900 text-[11px] sm:text-xs">Size</span>
                        </div>
                        <span className="text-gray-700 text-[11px] sm:text-xs font-semibold px-2 py-0.5 bg-white border border-gray-100 rounded-md shadow-sm text-right line-clamp-1 max-w-[120px]">
                          {product.specs.size}
                        </span>
                      </div>
                    </div>
                  )}

                  {!product.specs && <div className="mt-auto" />}

                  <div className="flex gap-2.5 mt-4 pt-3 border-t border-gray-100/60">
                    <button
                      onClick={() => router.push('/products/' + product.id)}
                      className="flex-1 py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs transition-colors text-center shadow-sm"
                    >
                      {lang === 'en' ? 'View Details' : 'विवरण देखें'}
                    </button>
                    <button
                      onClick={() => openEnquiry(tx(product.title))}
                      className="flex-1 py-2.5 px-2 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-md hover:shadow-lg transition-all text-center relative overflow-hidden group"
                    >
                      <span className="relative z-10">{lang === 'en' ? 'Get Quote' : 'कोटेशन'}</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold font-rajdhani text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 px-6 py-2 rounded-xl bg-gradient-primary text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <LanguageProvider>
      <EnquiryProvider>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <ProductsContent />
          </Suspense>
        </ErrorBoundary>
      </EnquiryProvider>
    </LanguageProvider>
  );
}
