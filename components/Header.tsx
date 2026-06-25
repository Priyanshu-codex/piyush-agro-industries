'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Phone, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#hero',         key: 'home'     },
  { href: '#about',        key: 'about'    },
  { href: '#products',     key: 'products' },
  { href: '#services',     key: 'services' },
  { href: '#gallery',      key: 'gallery'  },
  { href: '#contact',      key: 'contact'  },
] as const;

export default function Header() {
  const { lang, setLang, tx } = useLanguage();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('hero');

  /* ── Scroll behaviour ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    const ids = ['hero', 'about', 'products', 'services', 'gallery', 'faq', 'contact'];
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
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /* ── Prevent body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-md bg-white/97 backdrop-blur-xl' : 'bg-white/97'
        }`}
      >
        {/* ── Top bar ── */}
        <div className="bg-primary-dark text-white text-xs py-1.5 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <span className="opacity-90 flex items-center gap-1.5">
              <span>📍</span> Khairagarh Road, Thelkadih, Rajnandgaon, CG
            </span>
            <div className="flex items-center gap-4">
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
                className="hover:text-brand-green transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Nav ── */}
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg font-rajdhani shadow-primary">
              P
            </div>
            <div className="leading-tight">
              <div className="font-rajdhani font-bold text-gray-900 text-base">Piyush Agro Industries</div>
              <div className="text-[10px] text-gray-400 tracking-wide">Manufacturer &amp; Fabricator · Rajnandgaon</div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, key }) => (
              <li key={key}>
                <button
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
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Language toggle */}
            <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5">
              {(['en', 'hi'] as const).map((l) => (
                <button
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
            <button
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

      {/* ── Mobile overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">P</div>
                <div>
                  <div className="text-sm font-bold font-rajdhani text-gray-900">Piyush Agro</div>
                  <div className="text-[10px] text-gray-400">Industries</div>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-1">
                {NAV_LINKS.map(({ href, key }) => (
                  <li key={key}>
                    <button
                      onClick={() => handleNavClick(href)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-rajdhani
                        text-gray-700 hover:text-primary hover:bg-primary-50 transition-colors"
                    >
                      {tx(t.nav[key as keyof typeof t.nav])}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile footer */}
            <div className="p-4 border-t border-gray-100 space-y-2">
              <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                {(['en', 'hi'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                      lang === l ? 'bg-gradient-primary text-white' : 'text-gray-500'
                    }`}
                  >
                    {l === 'en' ? 'English' : 'हिंदी'}
                  </button>
                ))}
              </div>
              <a
                href="tel:9425245291"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                  bg-gradient-primary text-white text-sm font-semibold"
              >
                <Phone size={14} /> 9425245291
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
