'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { EnquiryProvider } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

import Header        from '@/components/layout/public/Header';
import Hero          from '@/features/public/home/Hero';

// Lazy load below-the-fold sections for optimal loading speed
const TrustBar = dynamic(() => import('@/features/public/home/TrustBar'));
const Products = dynamic(() => import('@/features/public/products/Products'));
const Services = dynamic(() => import('@/features/public/home/Services'));
const WhyUs = dynamic(() => import('@/features/public/home/WhyUs'));
const Process = dynamic(() => import('@/features/public/home/Process'));
const Gallery = dynamic(() => import('@/features/public/products/Gallery'));
const Testimonials = dynamic(() => import('@/features/public/home/Testimonials'));
const CTABanner = dynamic(() => import('@/components/layout/public/CTABanner'));
const FAQ = dynamic(() => import('@/features/public/home/FAQ'));
const Contact = dynamic(() => import('@/features/public/home/Contact'));
const Footer = dynamic(() => import('@/components/layout/public/Footer'));
const FloatingButtons = dynamic(() => import('@/components/ui/FloatingButtons'), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <DataProvider>
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
      </DataProvider>
    </LanguageProvider>
  );
}
