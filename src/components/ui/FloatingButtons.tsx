'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Phone, ChevronUp, MessageCircle, FileText } from 'lucide-react';

export default function FloatingButtons() {
  const [showFloating, setShowFloating] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { lang } = useLanguage();
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    let heroObserver: IntersectionObserver | null = null;
    let scrollListener: (() => void) | null = null;

    const heroEl = document.getElementById('hero');

    if (heroEl) {
      // IntersectionObserver for the hero section
      // rootMargin: -80px top accounts for sticky navbar height
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          // Hero is intersecting means it is visible in the viewport -> hide floating contact icons
          // When user scrolls down past the hero, it is no longer intersecting -> reveal icons
          setShowFloating(!entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: '-80px 0px 0px 0px',
        }
      );
      heroObserver.observe(heroEl);
    } else {
      // Fallback for pages without #hero: reveal after scrolling past header area
      scrollListener = () => {
        setShowFloating(window.scrollY > 160);
      };
      window.addEventListener('scroll', scrollListener, { passive: true });
      scrollListener();
    }

    // Scroll-to-top button threshold listener
    const onScrollTop = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();

    return () => {
      if (heroObserver) heroObserver.disconnect();
      if (scrollListener) window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('scroll', onScrollTop);
    };
  }, []);

  return (
    <>
      {/* ── WhatsApp + Call + Get Quote ── */}
      <div
        className={`fixed bottom-6 sm:bottom-7 right-4 sm:right-5 z-[900] flex flex-col gap-2.5 sm:gap-3 transition-all duration-300 ease-out motion-reduce:transition-opacity motion-reduce:transform-none ${
          showFloating
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-12 pointer-events-none'
        }`}
        aria-hidden={!showFloating}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/919425245291?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20details."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          tabIndex={showFloating ? 0 : -1}
          className="group relative"
        >
          {/* Pulse ring */}
          <span
            className={`absolute inset-0 rounded-full bg-[#25D366] ${showFloating ? 'wa-pulse' : ''}`}
            aria-hidden="true"
          />

          <span className="relative flex w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-whatsapp items-center
            justify-center text-white shadow-[0_6px_24px_rgba(37,211,102,0.4)]
            hover:scale-110 transition-transform duration-200">
            <MessageCircle size={24} className="sm:w-[26px] sm:h-[26px]" />
          </span>

          {/* Tooltip */}
          <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs
            font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-200 shadow-lg">
            WhatsApp Us
          </span>
        </a>

        {/* Call */}
        <a
          href="tel:9425245291"
          aria-label="Call us"
          tabIndex={showFloating ? 0 : -1}
          className="group relative flex w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-primary items-center
            justify-center text-white shadow-primary hover:scale-110 hover:shadow-primary-lg
            transition-all duration-200"
        >
          <Phone size={20} className="sm:w-[22px] sm:h-[22px]" />

          {/* Tooltip */}
          <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs
            font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-200 shadow-lg">
            Call Now
          </span>
        </a>

        {/* Get Quote */}
        <button suppressHydrationWarning
          onClick={() => openEnquiry(lang === 'en' ? 'General Enquiry' : 'सामान्य पूछताछ')}
          aria-label="Get Quote"
          tabIndex={showFloating ? 0 : -1}
          className="group relative flex w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-amber items-center
            justify-center text-white shadow-[0_6px_24px_rgba(245,158,11,0.4)] hover:scale-110 hover:shadow-lg
            transition-all duration-200 cursor-pointer"
        >
          <FileText size={20} className="sm:w-[22px] sm:h-[22px]" />

          {/* Tooltip */}
          <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs
            font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-200 shadow-lg">
            {lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}
          </span>
        </button>
      </div>

      {/* ── Scroll to top ── */}
      <button suppressHydrationWarning
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-6 sm:bottom-7 left-4 sm:left-5 z-[900] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-primary
          text-white flex items-center justify-center shadow-primary hover:-translate-y-1
          hover:shadow-primary-lg transition-all duration-200 cursor-pointer
          ${showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ChevronUp size={20} />
      </button>
    </>
  );
}
