'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Phone, ChevronUp, MessageCircle, FileText } from 'lucide-react';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const { lang } = useLanguage();
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── WhatsApp + Call + Get Quote ── */}
      <div className="fixed bottom-7 right-5 z-[900] flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/919425245291?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20details."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] wa-pulse" aria-hidden="true" />

          <span className="relative flex w-14 h-14 rounded-full bg-gradient-whatsapp items-center
            justify-center text-white shadow-[0_6px_24px_rgba(37,211,102,0.4)]
            hover:scale-110 transition-transform duration-200">
            <MessageCircle size={26} />
          </span>

          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs
            font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-200 shadow-lg">
            WhatsApp Us
          </span>
        </a>

        {/* Call */}
        <a
          href="tel:9425245291"
          aria-label="Call us"
          className="group relative flex w-14 h-14 rounded-full bg-gradient-primary items-center
            justify-center text-white shadow-primary hover:scale-110 hover:shadow-primary-lg
            transition-all duration-200"
        >
          <Phone size={22} />

          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs
            font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-200 shadow-lg">
            Call Now
          </span>
        </a>

        {/* Get Quote */}
        <button
          onClick={() => openEnquiry(lang === 'en' ? 'General Enquiry' : 'सामान्य पूछताछ')}
          aria-label="Get Quote"
          className="group relative flex w-14 h-14 rounded-full bg-brand-amber items-center
            justify-center text-white shadow-[0_6px_24px_rgba(245,158,11,0.4)] hover:scale-110 hover:shadow-lg
            transition-all duration-200"
        >
          <FileText size={22} />

          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs
            font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-200 shadow-lg">
            {lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}
          </span>
        </button>
      </div>

      {/* ── Scroll to top ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-7 left-5 z-[900] w-11 h-11 rounded-full bg-gradient-primary
          text-white flex items-center justify-center shadow-primary hover:-translate-y-1
          hover:shadow-primary-lg transition-all duration-200
          ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ChevronUp size={20} />
      </button>
    </>
  );
}
