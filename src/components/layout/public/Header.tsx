'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { t, MEGA_MENU, MEGA_MENU_CTA } from '@/constants/translations';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  MapPin, 
  MessageCircle,
  Truck,
  Bus,
  ShieldCheck,
  Users,
  HardHat,
  ArrowUpRight
} from 'lucide-react';
import Image from 'next/image';
import PiyushAgroLogo from '@/components/branding/PiyushAgroLogo';
import { useOptionalSMLShowcase } from '@/contexts/SMLShowcaseContext';

const NAV_LINKS = [
  { href: '/#hero',     key: 'home'     },
  { href: '/products', key: 'products' },
  { href: '/about',    key: 'about'    },
  { href: '/services', key: 'services' },
  { href: '/gallery',  key: 'gallery'  },
  { href: '/contact',  key: 'contact'  },
] as const;

const SML_NAV_CATEGORIES = [
  {
    key: 'all',
    label: { en: 'All Commercial Vehicles', hi: 'सभी कमर्शियल वाहन' },
    desc: { en: 'Complete range of trucks & buses', hi: 'ट्रकों एवं बसों की संपूर्ण रेंज' },
    icon: Truck,
    href: '/#sml-catalogue',
  },
  {
    key: 'trucks',
    label: { en: 'Trucks & Cargo Vehicles', hi: 'ट्रक एवं भारी कार्गो' },
    desc: { en: 'Samrat GS & Sartaj haulage series', hi: 'सम्राट जीएस और सरताज कार्गो सीरीज' },
    icon: Truck,
    href: '/?showcase=sml&category=trucks#sml-catalogue',
  },
  {
    key: 'passenger-buses',
    label: { en: 'Passenger & Tourist Buses', hi: 'पैसेंजर एवं टूरिस्ट बसें' },
    desc: { en: 'Executive LX coach & transit buses', hi: 'एग्जीक्यूटिव एलएक्स व टूरिस्ट बसें' },
    icon: Bus,
    href: '/?showcase=sml&category=passenger-buses#sml-catalogue',
  },
  {
    key: 'school-buses',
    label: { en: 'School Buses (AIS 063)', hi: 'स्कूल बसें (सुरक्षित मानक)' },
    desc: { en: 'S7 & Hiroi student transit safety', hi: 'एस7 और हिरोई छात्र सुरक्षा बसें' },
    icon: ShieldCheck,
    href: '/?showcase=sml&category=school-buses#sml-catalogue',
  },
  {
    key: 'staff-buses',
    label: { en: 'Staff & Employee Transport', hi: 'स्टाफ एवं एम्प्लॉई बसें' },
    desc: { en: 'Corporate commute & factory transport', hi: 'कॉर्पोरेट व फैक्ट्री कर्मचारी परिवहन' },
    icon: Users,
    href: '/?showcase=sml&category=staff-buses#sml-catalogue',
  },
  {
    key: 'sml-samrat-tipper',
    label: { en: 'SML Samrat Tipper', hi: 'एसएमएल सम्राट टिपर' },
    desc: { en: 'Heavy construction & tipping trucks', hi: 'हैवी कंस्ट्रक्शन एवं टिपिंग ट्रक' },
    icon: HardHat,
    href: '/vehicles/sml-samrat-tipper',
  },
];

const SML_FLAGSHIP_MODELS = [
  { id: 'sml-samrat-gs', name: 'Samrat GS', tag: '10.7T GVW', href: '/vehicles/sml-samrat-gs' },
  { id: 'sml-sartaj-5252', name: 'Sartaj 5252', tag: '5.2T GVW', href: '/vehicles/sml-sartaj-5252' },
  { id: 'sml-s7-school-bus', name: 'S7 School Bus', tag: '38-52 Seats', href: '/vehicles/sml-s7-school-bus' },
  { id: 'sml-executive-lx-coach', name: 'Executive LX', tag: 'Luxury Coach', href: '/vehicles/sml-executive-lx-coach' },
];

export default function Header() {
  const { lang, setLang, tx } = useLanguage();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('hero');
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const showcase = useOptionalSMLShowcase();

  const handleSMLCategoryClick = useCallback((categoryKey: string, href?: string, e?: React.MouseEvent) => {
    setMenuOpen(false);
    if (href && href.startsWith('/vehicles/')) {
      // Direct vehicle details page link - allow default navigation
      return;
    }
    if (pathname === '/') {
      if (e) e.preventDefault();
      if (showcase) {
        showcase.openShowcase(categoryKey as any);
      }
      const el = document.getElementById('sml-catalogue') || document.getElementById('sml-service');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [pathname, showcase]);

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
      else if (pathname.includes('/services')) setActive('services');
      else if (pathname.includes('/gallery')) setActive('gallery');
      else if (pathname.includes('/contact')) setActive('contact');
      return;
    }

    const ids = ['hero', 'products', 'services', 'sml-service', 'gallery', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id === 'sml-service' ? 'services' : e.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback((href: string, e?: React.MouseEvent) => {
    setMenuOpen(false);

    if (href === '/services' && pathname === '/') {
      const el = document.getElementById('services');
      if (el) {
        if (e) e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    if (href === '/gallery' && pathname === '/') {
      const el = document.getElementById('gallery');
      if (el) {
        if (e) e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    
    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '');
      if (pathname === '/') {
        if (e) e.preventDefault();
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
  }, [pathname]);

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
            ? 'shadow-lg shadow-gray-100/40 bg-white/95 backdrop-blur-md border-gray-200/60'
            : 'bg-white border-gray-100 shadow-2xs'
        }`}
      >
        {/* ── Top bar ── */}
        <div className={`bg-primary-dark text-white text-xs hidden sm:block transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-1.5 opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
            <span className="opacity-90 flex items-center gap-1.5">
              <MapPin size={11} className="shrink-0" /> Khairagarh Road, Thelkadih, Rajnandgaon, CG 491441
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="tel:9425245291" className="hover:text-brand-green transition-colors flex items-center gap-1">
                <Phone size={11} /> 9425245291
              </a>
              <a href="tel:8319634646" className="hover:text-brand-green transition-colors flex items-center gap-1">
                <Phone size={11} /> 8319634646
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
        <nav className="relative max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo + SML Partner Brand (matching reference image header) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0 max-w-[65%] xs:max-w-[72%] sm:max-w-none h-full py-1.5">
            <Link
              href="/"
              className="flex items-center shrink min-w-0"
            >
              <PiyushAgroLogo variant="horizontal" mode="light" size="md" />
            </Link>
            <div className="h-6 w-px bg-gray-300 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 pl-0.5">
              <div className="h-6 w-16 relative overflow-hidden shrink-0">
                <Image
                  src="/images/sml-mahindra/sml-mahindra-logo.png"
                  alt="SML Mahindra"
                  fill
                  sizes="64px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, key }) => {
              if (key === 'products') {
                return (
                  <li key={key} className="group">
                    <Link
                      href="/products"
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold font-rajdhani transition-colors duration-150 ${
                        activeSection === 'products'
                          ? 'text-primary bg-primary-50'
                          : 'text-gray-600 hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      {tx(t.nav[key as keyof typeof t.nav])}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-0 right-0 mx-auto pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-300 z-[100] w-full max-w-[1140px] px-2 sm:px-4">
                      {/* Invisible hover bridge to prevent unexpected closing */}
                      <div className="absolute -top-4 left-0 right-0 h-6 bg-transparent" />
                      
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/90 overflow-hidden ring-1 ring-black/5 relative">
                        <div className="grid grid-cols-12 divide-x divide-gray-100 max-h-[82vh] overflow-y-auto scrollbar-dropdown">
                          
                          {/* ── LEFT ZONE: Agricultural Equipment & Trailers (7 columns) ── */}
                          <div className="col-span-7 p-6 flex flex-col justify-between bg-white">
                            <div>
                              {/* Header */}
                              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                                <div>
                                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-gray-400 block">
                                    {lang === 'en' ? 'Piyush Agro Manufacturing' : 'पियूष एग्रो निर्माण'}
                                  </span>
                                  <h3 className="text-base font-extrabold font-rajdhani text-gray-950 uppercase tracking-wide">
                                    {lang === 'en' ? 'Agricultural Equipment & Trailers' : 'कृषि उपकरण एवं ट्रैक्टर ट्रॉली'}
                                  </h3>
                                </div>
                                <Link
                                  href="/products"
                                  className="text-xs font-bold text-primary hover:text-primary-700 flex items-center gap-1 transition-colors"
                                >
                                  {lang === 'en' ? 'All Products' : 'सभी उत्पाद'} <ArrowRight size={13} />
                                </Link>
                              </div>

                              {/* 4 Agricultural Categories in 2x2 grid */}
                              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                {MEGA_MENU.map((col, idx) => (
                                  <div key={idx} className="space-y-1.5">
                                    <h4 className="font-bold font-rajdhani text-xs text-primary uppercase tracking-wider border-b border-primary/10 pb-1">
                                      {tx(col.title)}
                                    </h4>
                                    <ul className="space-y-0.5">
                                      {col.items.map((item, i) => (
                                        <li key={i}>
                                          <Link
                                            href={(item as any).id ? `/products/${(item as any).id}` : `/products?category=${encodeURIComponent(col.title.en)}`}
                                            className="text-[13px] font-medium text-gray-600 hover:text-primary hover:bg-primary-50/60 py-1 px-2 rounded-md block transition-colors duration-150"
                                          >
                                            {tx(item)}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Bottom CTA Bar */}
                            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                              <span>{lang === 'en' ? 'Custom fabrication & heavy-duty trailers' : 'कस्टम फेब्रिकेशन एवं हैवी ड्यूटी ट्रेलर'}</span>
                              <Link
                                href="/products"
                                className="font-bold text-primary hover:underline flex items-center gap-1"
                              >
                                {tx(MEGA_MENU_CTA)} <ArrowRight size={13} />
                              </Link>
                            </div>
                          </div>

                          {/* ── RIGHT ZONE: SML Mahindra Commercial Vehicles (5 columns) ── */}
                          <div className="col-span-5 p-6 bg-slate-50/70 flex flex-col justify-between">
                            <div>
                              {/* Header */}
                              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-gray-200/80">
                                <div>
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="w-2 h-2 rounded-full bg-[#E31837]" />
                                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-gray-500">
                                      Commercial Fleet Partner
                                    </span>
                                  </div>
                                  <h3 className="text-base font-extrabold font-rajdhani text-gray-950 uppercase tracking-wide flex items-center gap-2">
                                    <span>SML Mahindra</span>
                                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#E31837]/10 text-[#E31837] rounded">
                                      CV Range
                                    </span>
                                  </h3>
                                </div>
                                <Link
                                  href="/#sml-catalogue"
                                  onClick={(e) => handleSMLCategoryClick('all', '/#sml-catalogue', e)}
                                  className="text-xs font-bold text-[#E31837] hover:underline flex items-center gap-1"
                                >
                                  {lang === 'en' ? 'Full Fleet' : 'सभी वाहन'} <ArrowRight size={13} />
                                </Link>
                              </div>

                              {/* Verified Category Links */}
                              <div className="grid grid-cols-2 gap-2 mb-3.5">
                                {SML_NAV_CATEGORIES.map((cat) => {
                                  const Icon = cat.icon;
                                  return (
                                    <Link
                                      key={cat.key}
                                      href={cat.href}
                                      onClick={(e) => handleSMLCategoryClick(cat.key, cat.href, e)}
                                      className="group/item p-2 bg-white rounded-lg border border-gray-200/80 hover:border-[#E31837]/50 hover:shadow-xs transition-all text-left flex flex-col justify-between"
                                    >
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <div className="w-5 h-5 rounded bg-gray-100 text-gray-700 flex items-center justify-center group-hover/item:bg-[#E31837] group-hover/item:text-white transition-colors shrink-0">
                                          <Icon size={12} />
                                        </div>
                                        <span className="font-bold font-rajdhani text-xs text-gray-900 group-hover/item:text-[#E31837] transition-colors leading-tight line-clamp-1">
                                          {tx(cat.label)}
                                        </span>
                                      </div>
                                      <span className="text-[10px] text-gray-500 line-clamp-1 pl-6">
                                        {tx(cat.desc)}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Featured Vehicle Preview Card */}
                              <Link
                                href="/vehicles/sml-samrat-gs"
                                className="group/card block bg-white rounded-xl border border-gray-200/90 p-2.5 hover:border-[#E31837] hover:shadow-sm transition-all relative overflow-hidden"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="relative w-20 h-14 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-1">
                                    <Image
                                      src="/images/sml-mahindra/sml-samrat-gs.png"
                                      alt="SML Samrat GS Cargo Truck"
                                      fill
                                      sizes="80px"
                                      className="object-contain p-1 group-hover/card:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-bold uppercase font-mono text-[#E31837]">
                                        Featured Commercial Model
                                      </span>
                                      <ArrowUpRight size={12} className="text-gray-400 group-hover/card:text-[#E31837] transition-colors" />
                                    </div>
                                    <h4 className="font-extrabold font-rajdhani text-xs text-gray-950 truncate group-hover/card:text-[#E31837] transition-colors">
                                      SML Samrat GS Cargo Truck
                                    </h4>
                                    <p className="text-[10px] text-gray-500 truncate">
                                      10,700 kg GVW · 3455 cc Turbo Engine · Dual Air Brakes
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* Direct Vehicle Detail Pages */}
                            <div className="mt-3 pt-2.5 border-t border-gray-200/80">
                              <div className="flex items-center justify-between text-[11px] gap-1">
                                <span className="text-gray-500 font-medium shrink-0">
                                  {lang === 'en' ? 'Dedicated Pages:' : 'वाहन पेज:'}
                                </span>
                                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                  {SML_FLAGSHIP_MODELS.map((model) => (
                                    <Link
                                      key={model.id}
                                      href={model.href}
                                      className="text-[10px] font-bold text-gray-700 hover:text-[#E31837] bg-white px-1.5 py-0.5 rounded border border-gray-200/60 hover:border-[#E31837]/30 transition-colors"
                                    >
                                      {model.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={(e) => handleNavClick(href, e)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold font-rajdhani transition-colors duration-150 ${
                      activeSection === href.replace('/#', '').replace('/', '')
                        ? 'text-primary bg-primary-50'
                        : 'text-gray-600 hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    {tx(t.nav[key as keyof typeof t.nav])}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language toggle */}
            <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5">
              {(['en', 'hi'] as const).map((l) => (
                <button suppressHydrationWarning
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
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
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {menuOpen ? <X size={20} className="sm:w-[22px] sm:h-[22px]" /> : <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />}
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
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <PiyushAgroLogo variant="horizontal" mode="light" size="sm" />
            </Link>
            <button suppressHydrationWarning
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-950 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 p-4 overflow-y-auto scrollbar-dropdown">
            <ul className="space-y-1.5">
              {NAV_LINKS.map(({ href, key }) => {
                const isActive = activeSection === href.replace('/#', '').replace('/', '');
                if (key === 'products') {
                  return (
                    <li key={key} className="flex flex-col">
                      <button suppressHydrationWarning
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-rajdhani transition-all flex items-center justify-between cursor-pointer ${
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
                          mobileProductsOpen ? 'max-h-[3500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-2 pr-2 pb-3 pt-2 space-y-4">
                          {/* ── 1. SML Mahindra Commercial Vehicles ── */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-gray-200/90 space-y-3">
                            <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#E31837]" />
                                <span className="font-extrabold font-rajdhani text-xs text-gray-950 uppercase tracking-wide">
                                  SML Mahindra CV
                                </span>
                              </div>
                              <Link
                                href="/#sml-catalogue"
                                onClick={(e) => {
                                  setMenuOpen(false);
                                  handleSMLCategoryClick('all', '/#sml-catalogue', e);
                                }}
                                className="text-[11px] font-bold text-[#E31837] hover:underline"
                              >
                                {lang === 'en' ? 'Fleet Range →' : 'फ्लीट रेंज →'}
                              </Link>
                            </div>

                            {/* Category Links */}
                            <div className="grid grid-cols-1 gap-1">
                              {SML_NAV_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <Link
                                    key={cat.key}
                                    href={cat.href}
                                    onClick={(e) => {
                                      setMenuOpen(false);
                                      handleSMLCategoryClick(cat.key, cat.href, e);
                                    }}
                                    className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-gray-200/70 hover:border-[#E31837] text-xs font-semibold text-gray-800 transition-colors"
                                  >
                                    <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                                      <Icon size={12} />
                                    </div>
                                    <span className="truncate">{tx(cat.label)}</span>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Standalone Vehicle Detail Page Links */}
                            <div className="pt-2 border-t border-gray-200">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                                {lang === 'en' ? 'Vehicle Detail Pages' : 'विस्तृत वाहन पेज'}
                              </span>
                              <div className="grid grid-cols-2 gap-1">
                                {SML_FLAGSHIP_MODELS.map((model) => (
                                  <Link
                                    key={model.id}
                                    href={model.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="p-1.5 bg-white rounded border border-gray-200/60 text-[11px] font-medium text-gray-700 hover:text-[#E31837] truncate text-center"
                                  >
                                    {model.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* ── 2. Agricultural Equipment ── */}
                          <div className="space-y-3 pt-1">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                              {lang === 'en' ? 'Agricultural Equipment' : 'कृषि उपकरण'}
                            </div>
                            {MEGA_MENU.map((col, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="text-[11px] font-extrabold text-primary px-2 uppercase tracking-wide border-b border-primary/10 pb-0.5">
                                  {tx(col.title)}
                                </div>
                                <ul className="space-y-0.5 border-l-2 border-gray-100 pl-2.5 ml-1.5">
                                  {col.items.map((item, i) => (
                                    <li key={i}>
                                      <Link
                                        href={(item as any).id ? `/products/${(item as any).id}` : `/products?category=${encodeURIComponent(col.title.en)}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-left text-xs font-medium text-gray-600 hover:text-primary block w-full py-1.5 px-2 rounded-lg hover:bg-primary-50 transition-colors"
                                      >
                                        {tx(item)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <Link
                              href="/products"
                              onClick={() => setMenuOpen(false)}
                              className="w-full justify-center text-xs font-bold text-primary py-2.5 px-4 bg-primary/5 hover:bg-primary hover:text-white rounded-xl flex items-center gap-2 mt-3 transition-colors"
                            >
                              {tx(MEGA_MENU_CTA)} <ArrowRight size={13} className="shrink-0" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={key}>
                    <Link
                      href={href}
                      onClick={(e) => handleNavClick(href, e)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-rajdhani transition-all block ${
                        isActive
                          ? 'text-primary bg-primary-50'
                          : 'text-gray-700 hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      {tx(t.nav[key as keyof typeof t.nav])}
                    </Link>
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
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
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
