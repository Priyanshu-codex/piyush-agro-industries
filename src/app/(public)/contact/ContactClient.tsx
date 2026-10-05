'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { EnquiryProvider } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Header from '@/components/layout/public/Header';
import Contact from '@/features/public/home/Contact';
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, Phone, MessageCircle, MapPin } from 'lucide-react';

const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

function ContactContent() {
  const { lang } = useLanguage();

  return (
    <main className="relative min-h-screen bg-white">
      <Header />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' },
        ]}
      />

      {/* Hero Header */}
      <section className="relative bg-gray-900 pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
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
            <span className="text-white">Contact</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-rajdhani text-white mb-4 drop-shadow-md">
            {lang === 'en' ? 'Contact Piyush Agro Industries' : 'पियूष एग्रो इंडस्ट्रीज से संपर्क करें'}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-medium">
            {lang === 'en'
              ? 'Get in touch for tractor trolleys, hydraulic trailers, and custom metal fabrication in Rajnandgaon, Chhattisgarh.'
              : 'राजनांदगांव, छत्तीसगढ़ में ट्रैक्टर ट्रॉली, हाइड्रोलिक ट्रेलर और कस्टम फेब्रिकेशन के लिए हमसे संपर्क करें।'}
          </p>
        </div>
      </section>

      {/* Contact Section Component */}
      <Contact />

      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function ContactClient() {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <ErrorBoundary>
            <ContactContent />
          </ErrorBoundary>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
