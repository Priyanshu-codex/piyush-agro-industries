'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header        from '@/components/layout/public/Header';
import { Target, Lightbulb, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const About = dynamic(() => import('@/features/public/home/About'));
const WhyUs = dynamic(() => import('@/features/public/home/WhyUs'));
const CTABanner = dynamic(() => import('@/components/layout/public/CTABanner'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

function MissionVision() {
  const { lang } = useLanguage();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal(0.1);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div ref={leftRef} className="scroll-reveal bg-white rounded-2xl p-8 shadow-card border border-gray-100 hover:shadow-card-hover transition-all">
            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center text-primary mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold font-rajdhani text-gray-900 mb-4">
              {lang === 'en' ? 'Our Mission' : 'हमारा मिशन'}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              {lang === 'en' 
                ? 'To provide high-quality, durable, and innovative agricultural and commercial transportation solutions that empower farmers and businesses across Chhattisgarh and beyond, ensuring maximum value and reliability.'
                : 'किसानों और व्यवसायों को सशक्त बनाने वाले उच्च गुणवत्ता, टिकाऊ और अभिनव कृषि और वाणिज्यिक परिवहन समाधान प्रदान करना, जिससे अधिकतम मूल्य और विश्वसनीयता सुनिश्चित हो सके।'}
            </p>
          </div>
          <div ref={rightRef} className="scroll-reveal bg-white rounded-2xl p-8 shadow-card border border-gray-100 hover:shadow-card-hover transition-all">
            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center text-primary mb-6">
              <Lightbulb size={28} />
            </div>
            <h3 className="text-2xl font-bold font-rajdhani text-gray-900 mb-4">
              {lang === 'en' ? 'Our Vision' : 'हमारा दृष्टिकोण'}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              {lang === 'en'
                ? 'To be the most trusted and preferred manufacturing partner in the region, recognized for our commitment to excellence, customer satisfaction, and continuous technological advancement in fabrication.'
                : 'क्षेत्र में सबसे भरोसेमंद और पसंदीदा निर्माण भागीदार बनना, जो उत्कृष्टता, ग्राहकों की संतुष्टि और निरंतर तकनीकी प्रगति के प्रति हमारी प्रतिबद्धता के लिए जाना जाता है।'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageContent() {
  const { lang } = useLanguage();
  return (
    <main className="relative">
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]}
      />
      
      {/* Hero Section for About Page */}
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
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight size={14} />
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-rajdhani text-white mb-6 drop-shadow-md">
            {lang === 'en' ? 'About Piyush Agro Industries' : 'पियूष एग्रो इंडस्ट्रीज का परिचय'}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            {lang === 'en' 
              ? 'Premier manufacturer of agricultural equipment, hydraulic tractor trolleys, and custom engineering fabrication in Rajnandgaon, Chhattisgarh.'
              : 'राजनांदगांव, छत्तीसगढ़ में कृषि उपकरण, हाइड्रोलिक ट्रैक्टर ट्रॉली और कस्टम इंजीनियरिंग फेब्रिकेशन के अग्रणी निर्माता।'}
          </p>
        </div>
      </section>

      <About />
      <MissionVision />
      <WhyUs />
      <CTABanner />
      
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function AboutClient() {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <PageContent />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
