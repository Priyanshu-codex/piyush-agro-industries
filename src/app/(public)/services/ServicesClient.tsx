'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider, useEnquiry } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SERVICES_LIST } from '@/constants/servicesData';
import { 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Award, 
  Phone, 
  MessageCircle, 
  Sparkles,
  Factory,
  Tractor,
  Layers,
  Settings
} from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const CTABanner = dynamic(() => import('@/components/layout/public/CTABanner'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

function ServicesContent() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();

  return (
    <main className="relative min-h-screen bg-gray-50/80">
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />

      {/* ── HERO BANNER ── */}
      <section className="relative bg-gray-900 pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white/75 text-sm font-semibold mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Services</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-rajdhani text-white mb-6 drop-shadow-md">
            {lang === 'en' ? 'Fabrication & Repair Services' : 'फेब्रिकेशन एवं मरम्मत सेवाएं'}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
            {lang === 'en'
              ? 'Complete engineering fabrication, commercial vehicle body building, hydraulic tipping repairs, and custom metalwork in Rajnandgaon, Chhattisgarh.'
              : 'राजनांदगांव, छत्तीसगढ़ में संपूर्ण इंजीनियरिंग फेब्रिकेशन, वाणिज्यिक वाहन बॉडी निर्माण, हाइड्रोलिक मरम्मत और कस्टम मेटल कार्य।'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button suppressHydrationWarning
              onClick={() => openEnquiry(lang === 'en' ? 'General Fabrication Service' : 'सामान्य फेब्रिकेशन सेवा')}
              className="px-7 py-3 rounded-xl bg-white text-primary font-bold font-rajdhani text-sm shadow-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            >
              {lang === 'en' ? 'Request Free Quote' : 'मुफ्त कोटेशन प्राप्त करें'}
            </button>
            <a
              href="tel:9425245291"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold font-rajdhani text-sm border border-white/20 transition-all"
            >
              <Phone size={15} /> +91 9425245291
            </a>
          </div>
        </div>
      </section>

      {/* ── QUICK CAPABILITY HIGHLIGHTS BAR ── */}
      <section className="bg-white border-b border-gray-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-gray-50 flex flex-col items-center justify-center">
              <ShieldCheck size={24} className="text-primary mb-1" />
              <div className="font-bold text-gray-900 text-sm">IS 2062 Grade Steel</div>
              <div className="text-xs text-gray-500">Certified heavy-duty build</div>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 flex flex-col items-center justify-center">
              <Wrench size={24} className="text-primary mb-1" />
              <div className="font-bold text-gray-900 text-sm">Hydraulic Testing</div>
              <div className="text-xs text-gray-500">Pressure tested to safety limits</div>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 flex flex-col items-center justify-center">
              <Clock size={24} className="text-primary mb-1" />
              <div className="font-bold text-gray-900 text-sm">Timely Execution</div>
              <div className="text-xs text-gray-500">Committed project timelines</div>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 flex flex-col items-center justify-center">
              <Award size={24} className="text-primary mb-1" />
              <div className="font-bold text-gray-900 text-sm">Trusted Since Inception</div>
              <div className="text-xs text-gray-500">Rajnandgaon, Chhattisgarh</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES GRID ── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            {lang === 'en' ? 'Our Engineering Services' : 'हमारी इंजीनियरिंग सेवाएं'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-3">
            {lang === 'en' ? 'Comprehensive Fabrication & Repair Solutions' : 'व्यापक फेब्रिकेशन एवं मरम्मत समाधान'}
          </h2>
          <div className="section-divider" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {lang === 'en'
              ? 'From heavy tractor trailers and water tankers to hydraulic maintenance and specialized commercial body modifications, explore our core expertise below.'
              : 'भारी ट्रैक्टर ट्रेलरों और वाटर टैंकरों से लेकर हाइड्रोलिक रखरखाव और वाणिज्यिक वाहन संशोधनों तक, हमारी प्रमुख सेवाओं का अन्वेषण करें।'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((svc) => {
            const titleStr = tx(svc.title);
            const shortDescStr = tx(svc.shortDesc);

            return (
              <div
                key={svc.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col group hover:-translate-y-1"
              >
                {/* Header Icon & Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-2xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                    {svc.icon}
                  </div>
                  <div>
                    <h3 className="font-bold font-rajdhani text-xl text-gray-900 leading-snug group-hover:text-primary transition-colors">
                      {titleStr}
                    </h3>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                      Piyush Agro Workshop
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                  {shortDescStr}
                </p>

                {/* Offerings Checklist */}
                <div className="space-y-2 mb-6 mt-auto">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Key Capabilities:' : 'प्रमुख क्षमताएं:'}
                  </div>
                  {svc.offerings.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{lang === 'hi' ? item.hi : item.en}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex gap-2.5 mt-auto">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 font-bold font-rajdhani text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'en' ? 'View Details' : 'विवरण देखें'}</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button suppressHydrationWarning
                    onClick={() => openEnquiry(titleStr)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-xs shadow-md hover:shadow-lg transition-all text-center"
                  >
                    {lang === 'en' ? 'Get Quote' : 'कोटेशन'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WORKSHOP PROCESS SECTION ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              {lang === 'en' ? 'How We Deliver Quality' : 'हम गुणवत्ता कैसे सुनिश्चित करते हैं'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-3">
              {lang === 'en' ? 'Our 5-Stage Manufacturing & Repair Workflow' : 'हमारी 5-चरणीय निर्माण एवं मरम्मत कार्यप्रणाली'}
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: { en: 'Client Requirement', hi: 'ग्राहक आवश्यकता' }, desc: { en: 'In-depth consultation regarding payload, vehicle type, and intended application.', hi: 'लोड क्षमता, वाहन प्रकार और उपयोग पर विस्तृत परामर्श।' } },
              { num: '02', title: { en: 'Engineering & CAD', hi: 'इंजीनियरिंग एवं डिज़ाइन' }, desc: { en: 'Structural drafting and material grade selection to avoid stress failure.', hi: 'संरचनात्मक ड्राफ्टिंग और उपयुक्त स्टील सामग्री का चयन।' } },
              { num: '03', title: { en: 'Fabrication & Welding', hi: 'फेब्रिकेशन एवं वेल्डिंग' }, desc: { en: 'MIG and multi-pass ARC welding with certified fixture alignment.', hi: 'सटीक क्लैंपिंग के साथ MIG और मल्टी-पास ARC वेल्डिंग।' } },
              { num: '04', title: { en: 'Pressure & Load Test', hi: 'प्रेशर व लोड टेस्ट' }, desc: { en: 'Hydraulic system pressure check and mechanical stress verification.', hi: 'हाइड्रोलिक सिस्टम प्रेशर और लोड वहन क्षमता की जांच।' } },
              { num: '05', title: { en: 'Finishing & Handover', hi: 'फिनिशिंग व सुपुर्दगी' }, desc: { en: 'Corrosion-resistant epoxy priming, high-gloss enamel, and timely delivery.', hi: 'एंटी-रस्ट कोटिंग, टिकाऊ पेंट और समय पर सुरक्षित डिलीवरी।' } },
            ].map((step, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 relative overflow-hidden flex flex-col">
                <span className="text-3xl font-extrabold font-rajdhani text-primary/20 mb-3">{step.num}</span>
                <h4 className="font-bold font-rajdhani text-lg text-gray-900 mb-2">{tx(step.title)}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mt-auto">{tx(step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION FOR SERVICES ── */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold font-rajdhani text-gray-900 mb-2">
            {lang === 'en' ? 'Frequently Asked Questions on Services' : 'सेवाओं पर अक्सर पूछे जाने वाले प्रश्न'}
          </h3>
          <p className="text-sm text-gray-500">
            {lang === 'en' ? 'Find answers to common questions about vehicle fabrication and repair in Rajnandgaon.' : 'राजनांदगांव में वाहन फेब्रिकेशन और मरम्मत के सामान्य प्रश्नों के उत्तर।'}
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: { en: 'What materials are used for trolley and trailer fabrication?', hi: 'ट्रॉली और ट्रेलर फेब्रिकेशन में कौन सी सामग्री का उपयोग किया जाता है?' },
              a: { en: 'We strictly use IS 2062 certified mild steel structural channels, heavy angles, and thick floor plates manufactured by prime steel producers to guarantee long-term durability.', hi: 'हम दीर्घकालिक मजबूती सुनिश्चित करने के लिए केवल IS 2062 प्रमाणित माइल्ड स्टील चैनल, एंगल और भारी फ्लोर प्लेट्स का उपयोग करते हैं।' },
            },
            {
              q: { en: 'Can you convert an existing non-tipping trolley into a hydraulic tipper?', hi: 'क्या आप पुरानी नॉन-टिपिंग ट्रॉली को हाइड्रोलिक टिपर में बदल सकते हैं?' },
              a: { en: 'Yes, our workshop specializes in hydraulic conversions. We install heavy-duty hydraulic telescopic cylinders, reinforced tipping sub-frames, and tractor control valves.', hi: 'हां, हमारी वर्कशॉप हाइड्रोलिक कन्वर्ज़न में माहिर है। हम टेलीस्कोपिक सिलेंडर, सुदृढ़ टिपिंग सब-फ्रेम और कंट्रोल वाल्व लगाते हैं।' },
            },
            {
              q: { en: 'How long does vehicle repair or cylinder overhaul take?', hi: 'वाहन मरम्मत या सिलेंडर ओवरहाल में कितना समय लगता है?' },
              a: { en: 'Standard repairs and hydraulic seal replacements are typically completed within 1 to 3 working days. Full chassis restorations take approximately 5 to 7 days.', hi: 'सामान्य मरम्मत और सील रिप्लेसमेंट 1 से 3 कार्य दिवसों में हो जाती है। पूर्ण चेसिस नवीनीकरण में 5 से 7 दिन लगते हैं।' },
            },
            {
              q: { en: 'Do you provide on-site repair assistance in Rajnandgaon?', hi: 'क्या आप राजनांदगांव में ऑन-साइट मरम्मत सहायता प्रदान करते हैं?' },
              a: { en: 'For emergency breakdowns and heavy farm machinery within Rajnandgaon and surrounding rural areas, we can coordinate technician visits. Call our hotline for quick support.', hi: 'राजनांदगांव और आसपास के ग्रामीण क्षेत्रों में आपातकालीन ब्रेकडाउन के लिए हम तकनीशियन सहायता प्रदान कर सकते हैं।' },
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-xs">
              <h4 className="font-bold font-rajdhani text-base text-gray-900 mb-2">{tx(item.q)}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{tx(item.a)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER & FOOTER ── */}
      <CTABanner />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function ServicesClient() {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <ServicesContent />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
