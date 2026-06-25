'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

import Header        from '@/components/Header';
import Hero          from '@/components/Hero';
import TrustBar      from '@/components/TrustBar';
import About         from '@/components/About';
import Products      from '@/components/Products';
import Services      from '@/components/Services';
import WhyUs         from '@/components/WhyUs';
import Process       from '@/components/Process';
import Gallery       from '@/components/Gallery';
import Testimonials  from '@/components/Testimonials';
import CTABanner     from '@/components/CTABanner';
import FAQ           from '@/components/FAQ';
import Contact       from '@/components/Contact';
import Footer        from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Home() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <main className="relative">
          <Header />
          <Hero />
          <TrustBar />
          <About />
          <Products />
          <Services />
          <WhyUs />
          <Process />
          <Gallery />
          <Testimonials />
          <CTABanner />
          <FAQ />
          <Contact />
          <Footer />
          <FloatingButtons />
        </main>
      </ErrorBoundary>
    </LanguageProvider>
  );
}
