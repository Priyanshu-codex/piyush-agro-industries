'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { EnquiryProvider } from '@/contexts/EnquiryContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

import Header        from '@/components/Header';
import Hero          from '@/components/Hero';

// Lazy load below-the-fold sections for optimal loading speed
const TrustBar = dynamic(() => import('@/components/TrustBar'));
const Products = dynamic(() => import('@/components/Products'));
const Services = dynamic(() => import('@/components/Services'));
const WhyUs = dynamic(() => import('@/components/WhyUs'));
const Process = dynamic(() => import('@/components/Process'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const CTABanner = dynamic(() => import('@/components/CTABanner'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const FloatingButtons = dynamic(() => import('@/components/FloatingButtons'), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <EnquiryProvider>
        <ErrorBoundary>
          <main className="relative">
            <Header />
            <Hero />
            <TrustBar />
            <Products />
            <Services />
            <Gallery />
            <WhyUs />
            <Process />
            <Testimonials />
            <CTABanner />
            <FAQ />
            <Contact />
            <Footer />
            <FloatingButtons />
          </main>
        </ErrorBoundary>
      </EnquiryProvider>
    </LanguageProvider>
  );
}
