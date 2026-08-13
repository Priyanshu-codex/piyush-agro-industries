'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t } from '@/constants/translations';
import { CheckCircle2, Factory, Tractor } from 'lucide-react';

const MFG_ITEMS = [
  { en: 'Tractor Trolley',          hi: 'ट्रैक्टर ट्रॉली' },
  { en: '4-Wheel Hydraulic Trolley',hi: 'चार पहिया हाइड्रोलिक ट्रॉली' },
  { en: '2-Wheel Hydraulic Trolley',hi: 'दो पहिया हाइड्रोलिक ट्रॉली' },
  { en: 'Hydraulic Dumper',          hi: 'हाइड्रोलिक डम्पर' },
  { en: 'Medical Vehicle',           hi: 'मेडिकल वाहन' },
  { en: 'Garbage Vehicle',           hi: 'कचरा वाहन' },
];

const AGRI_ITEMS = [
  { en: 'Gates',             hi: 'गेट' },
  { en: 'Railings',          hi: 'रेलिंग' },
  { en: 'Cultivators',       hi: 'कल्टीवेटर' },
  { en: 'Agricultural Tools',hi: 'कृषि औजार' },
];

const ADD_SERVICES = [
  { en: 'Vehicle Fabrication',    hi: 'वाहन फेब्रिकेशन' },
  { en: 'Vehicle Modification',   hi: 'वाहन संशोधन' },
  { en: 'Vehicle Repairing',      hi: 'वाहन मरम्मत' },
  { en: 'Custom Manufacturing',   hi: 'कस्टम निर्माण' },
  { en: 'Welding Services',       hi: 'वेल्डिंग सेवाएं' },
  { en: 'Structural Fabrication', hi: 'संरचनात्मक फेब्रिकेशन' },
];

export default function Services() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const headerRef = useScrollReveal();
  const card1Ref  = useScrollReveal();
  const card2Ref  = useScrollReveal();
  const addRef    = useScrollReveal();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="scroll-reveal text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.services.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.services.title)}{' '}
            <span className="text-primary">{tx(t.services.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* We Manufacture */}
          <div ref={card1Ref} className="scroll-reveal bg-white rounded-2xl border border-gray-100 shadow-card p-6
            hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
                <Factory size={20} />
              </div>
              <h3 className="text-xl font-bold font-rajdhani text-gray-900">{tx(t.services.mfgTitle)}</h3>
            </div>
            <ul className="space-y-2 mb-6">
              {MFG_ITEMS.map((item, i) => (
                <li key={i}
                  className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl
                    hover:bg-primary-50 hover:text-primary transition-colors cursor-default group">
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary">
                    {lang === 'hi' ? item.hi : item.en}
                  </span>
                </li>
              ))}
            </ul>
            <button suppressHydrationWarning 
              onClick={() => openEnquiry(lang === 'en' ? 'Industrial Fabrication / Manufacturing' : 'औद्योगिक निर्माण / विनिर्माण')}
              className="mt-auto w-full py-3 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              {lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}
            </button>
          </div>

          {/* Agricultural Equipment */}
          <div ref={card2Ref} className="scroll-reveal delay-100 bg-white rounded-2xl border border-gray-100
            shadow-card p-6 hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-accent flex items-center justify-center text-white">
                <Tractor size={20} />
              </div>
              <h3 className="text-xl font-bold font-rajdhani text-gray-900">{tx(t.services.agriTitle)}</h3>
            </div>
            <ul className="space-y-2 mb-6">
              {AGRI_ITEMS.map((item, i) => (
                <li key={i}
                  className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl
                    hover:bg-primary-50 hover:text-primary transition-colors cursor-default group">
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary">
                    {lang === 'hi' ? item.hi : item.en}
                  </span>
                </li>
              ))}
            </ul>
            <button suppressHydrationWarning 
              onClick={() => openEnquiry(lang === 'en' ? 'Agricultural Equipment' : 'कृषि उपकरण')}
              className="mt-auto w-full py-3 rounded-xl bg-gradient-accent text-white font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              {lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}
            </button>
          </div>
        </div>

        {/* Additional Services */}
        <div ref={addRef} className="scroll-reveal delay-200 bg-gradient-primary rounded-2xl p-7 text-white">
          <h3 className="text-xl font-bold font-rajdhani mb-5 flex items-center gap-2">
            🔧 {tx(t.services.addTitle)}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {ADD_SERVICES.map((item, i) => (
              <div key={i}
                className="flex items-center gap-2.5 px-4 py-3 bg-white/10 border border-white/15
                  rounded-xl text-sm font-semibold">
                <span className="text-brand-green text-base">✓</span>
                {lang === 'hi' ? item.hi : item.en}
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <button suppressHydrationWarning 
              onClick={() => openEnquiry(lang === 'en' ? 'Custom Services & Fabrication' : 'कस्टम सेवाएं और फेब्रिकेशन')}
              className="px-8 py-3 rounded-xl bg-white text-primary font-bold text-xs hover:bg-gray-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {lang === 'en' ? 'Get Quote' : 'कोटेशन प्राप्त करें'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
