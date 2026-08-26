'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { t, MEGA_MENU, MEGA_MENU_CTA } from '@/constants/translations';
import { Phone, Menu, X, ChevronDown, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import PiyushAgroLogo from '@/components/branding/PiyushAgroLogo';

const NAV_LINKS = [
  { href: '#hero',         key: 'home'     },
  { href: '#products',     key: 'products' },
  { href: '/about',        key: 'about'    },
  { href: '#services',     key: 'services' },
  { href: '#gallery',      key: 'gallery'  },
  { href: '#contact',      key: 'contact'  },
] as const;

export default function Header() {
  const { lang, setLang, tx } = useLanguage();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('hero');
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  /* ── Scroll behaviour ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    if (pathname !== '/') {
      if (pathname.includes('/about')) setActive('about');
      else if (pathname.includes('/products')) setActive('products');
      return;
    }

    const ids = ['hero', 'products', 'services', 'gallery', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    
    if (href.startsWith('/')) {
      router.push(href);
      return;
    }
    
    if (href.startsWith('#')) {
      if (pathname !== '/') {
        router.push(`/${href}`);
      } else {
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [pathname, router]);

  /* ── Prevent body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'shadow-lg shadow-gray-100/40 bg-white/90 backdrop-blur-md border-gray-200/50'
            : 'bg-white border-transparent'
        }`}
      >
        {/* ── Top bar ── */}
        <div className={`bg-primary-dark text-white text-xs hidden sm:block transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-1.5 opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
            <span className="opacity-90 flex items-center gap-1.5">
              <MapPin size={11} className="shrink-0" /> Khairagarh Road, Thelkadih, Rajnandgaon, CG
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="tel:9425245291" className="hover:text-brand-green transition-colors flex items-center gap-1">
                <Phone size={11} /> 9425245291
              </a>
              <a href="tel:9479244691" className="hover:text-brand-green transition-colors flex items-center gap-1">
                <Phone size={11} /> 9479244691
              </a>
              <a
                href="https://wa.me/919425245291"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-green transition-colors flex items-center gap-1"
              >
                <MessageCircle size={11} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Nav ── */}
        <nav className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo + Brand Text */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center shrink min-w-0 max-w-[70%] sm:max-w-none h-full py-1.5"
          >
            <PiyushAgroLogo variant="horizontal" mode="light" size="md" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, key }) => {
              if (key === 'products') {
                return (
                  <li key={key} className="group">
                    <button suppressHydrationWarning
                      onClick={() => handleNavClick(href)}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold font-rajdhani transition-colors duration-150 ${
                        activeSection === 'products'
                          ? 'text-primary bg-primary-50'
                          : 'text-gray-600 hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      {tx(t.nav[key as keyof typeof t.nav])}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-0 right-0 mx-auto pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-300 z-[100] w-full max-w-[900px] px-4">
                      {/* Invisible hover bridge to prevent unexpected closing */}
                      <div className="absolute -top-4 left-0 right-0 h-6 bg-transparent" />
                      
                      <div className="bg-white rounded-[1.5rem] shadow-2xl border border-gray-100 p-6 max-h-[85vh] overflow-y-auto cursor-default ring-1 ring-black/5 relative">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                          {MEGA_MENU.map((col, idx) => (
                            <div key={idx} className="space-y-2.5">
                              <h4 className="font-extrabold font-rajdhani text-[15px] text-primary border-b-2 border-primary/10 pb-1.5 mb-2 uppercase tracking-wide">
                                {tx(col.title)}
                              </h4>
                              <ul className="space-y-1">
                                {col.items.map((item, i) => (
                                  <li key={i}>
                                    <button suppressHydrationWarning 
                                      onClick={() => handleNavClick((item as any).id ? `/products/${(item as any).id}` : `/products?category=${encodeURIComponent(col.title.en)}`)}
                                      className="text-left text-[13px] font-medium text-gray-600 hover:text-primary hover:bg-primary-50 focus:text-primary focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:translate-x-1 transition-all duration-200 block w-full py-1.5 px-2 rounded-xl"
                                    >
                                      {tx(item)}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {/* CTA Row */}
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                          <button suppressHydrationWarning
                            onClick={() => handleNavClick('/products')}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary/5 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                          >
                            {tx(MEGA_MENU_CTA)} <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={key}>
                  <button suppressHydrationWarning
                    onClick={() => handleNavClick(href)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold font-rajdhani transition-colors duration-150 ${
                      activeSection === href.replace('#', '')
                        ? 'text-primary bg-primary-50'
                        : 'text-gray-600 hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    {tx(t.nav[key as keyof typeof t.nav])}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Language toggle */}
            <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5">
              {(['en', 'hi'] as const).map((l) => (
                <button suppressHydrationWarning
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                    lang === l
                      ? 'bg-gradient-primary text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label={`Switch to ${l === 'en' ? 'English' : 'Hindi'}`}
                >
                  {l === 'en' ? 'EN' : 'हिं'}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="tel:9425245291"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                bg-gradient-primary text-white text-sm font-semibold font-rajdhani
                shadow-primary hover:shadow-primary-lg transition-shadow duration-200"
            >
              <Phone size={13} /> {tx(t.nav.callNow)}
            </a>

            {/* Hamburger */}
            <button suppressHydrationWarning
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer container */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-80 max-w-[calc(100vw-3rem)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-10 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <PiyushAgroLogo variant="horizontal" mode="light" size="sm" />
            <button suppressHydrationWarning
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-950 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1.5">
              {NAV_LINKS.map(({ href, key }) => {
                const isActive = activeSection === href.replace('#', '');
                if (key === 'products') {
                  return (
                    <li key={key} className="flex flex-col">
                      <button suppressHydrationWarning
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-rajdhani transition-all flex items-center justify-between ${
                          isActive || mobileProductsOpen
                            ? 'text-primary bg-primary-50'
                            : 'text-gray-700 hover:text-primary hover:bg-primary-50'
                        }`}
                      >
                        <span>{tx(t.nav[key as keyof typeof t.nav])}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            mobileProductsOpen ? 'rotate-180 text-primary' : 'text-gray-400'
                          }`}
                        />
                      </button>
                      
                      {/* Mobile Accordion */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          mobileProductsOpen ? 'max-h-[2000px] opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 pr-2 pb-3 pt-2 space-y-5">
                          {MEGA_MENU.map((col, idx) => (
                            <div key={idx} className="space-y-2.5">
                              <div className="text-[13px] font-extrabold text-primary px-2 uppercase tracking-wide border-b border-primary/10 pb-1">{tx(col.title)}</div>
                              <ul className="space-y-1 border-l-2 border-gray-100 pl-3 ml-2">
                                {col.items.map((item, i) => (
                                  <li key={i}>
                                    <button suppressHydrationWarning
                                      onClick={() => handleNavClick((item as any).id ? `/products/${(item as any).id}` : `/products?category=${encodeURIComponent(col.title.en)}`)}
                                      className="text-left text-[13px] font-medium text-gray-600 hover:text-primary block w-full py-2.5 px-3 rounded-xl hover:bg-primary-50 focus:bg-primary-50 focus:text-primary transition-colors"
                                    >
                                      {tx(item)}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <button suppressHydrationWarning
                            onClick={() => handleNavClick('/products')}
                            className="w-full justify-center text-[13px] font-bold text-primary py-3 px-4 bg-primary/5 hover:bg-primary hover:text-white rounded-xl flex items-center gap-2 mt-4 transition-colors"
                          >
                            {tx(MEGA_MENU_CTA)} <ArrowRight size={14} className="shrink-0" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={key}>
                    <button suppressHydrationWarning
                      onClick={() => handleNavClick(href)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-rajdhani transition-all ${
                        isActive
                          ? 'text-primary bg-primary-50'
                          : 'text-gray-700 hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      {tx(t.nav[key as keyof typeof t.nav])}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile footer */}
          <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50/50">
            <div className="flex bg-gray-100 rounded-full p-1 gap-1">
              {(['en', 'hi'] as const).map((l) => (
                <button suppressHydrationWarning
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    lang === l ? 'bg-gradient-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {l === 'en' ? 'English' : 'हिंदी'}
                </button>
              ))}
            </div>
            <a
              href="tel:9425245291"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                bg-gradient-primary text-white text-sm font-semibold font-rajdhani shadow-primary hover:shadow-primary-lg transition-all"
            >
              <Phone size={14} /> {tx(t.nav.callNow)}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
