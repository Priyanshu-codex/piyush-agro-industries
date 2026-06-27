'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t } from '@/constants/translations';
import { Phone, MessageCircle, FileText } from 'lucide-react';

export default function CTABanner() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const ref = useScrollReveal(0.2);

  return (
    <div className="relative bg-gradient-hero py-20 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
        bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="scroll-reveal relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-white mb-4 leading-tight">
          {tx(t.cta.title)}
        </h2>
        <p className="text-white/75 text-base sm:text-lg mb-10 leading-relaxed">
          {tx(t.cta.subtitle)}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:9425245291"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
              bg-gradient-primary text-white font-semibold font-rajdhani text-base
              shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <Phone size={18} /> 9425245291
          </a>
          <a
            href="https://wa.me/919425245291?text=Hello%2C%20I%20am%20interested%20in%20your%20products"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
              bg-gradient-whatsapp text-white font-semibold font-rajdhani text-base
              hover:-translate-y-0.5 transition-all duration-200
              shadow-[0_4px_15px_rgba(37,211,102,0.35)]"
          >
            <MessageCircle size={18} /> {tx(t.cta.btn1)}
          </a>
          <button
            onClick={() => openEnquiry(lang === 'en' ? 'General Enquiry' : 'सामान्य पूछताछ')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/60
              text-white font-semibold font-rajdhani text-base hover:bg-white hover:text-primary
              hover:-translate-y-0.5 transition-all duration-200"
          >
            <FileText size={18} /> {tx(t.cta.btn2)}
          </button>
        </div>
      </div>
    </div>
  );
}
