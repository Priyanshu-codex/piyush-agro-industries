import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Phone, MessageCircle, Tractor, Wrench, Droplets, Hammer } from 'lucide-react';
import Header from '@/components/layout/public/Header';
import Footer from '@/components/layout/public/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { EnquiryProvider } from '@/contexts/EnquiryContext';
import { DataProvider } from '@/contexts/DataContext';

export const metadata = {
  title: 'Page Not Found (404) | Piyush Agro Industries',
  description: 'The requested page could not be found. Explore agricultural equipment, tractor trolleys, and custom fabrication from Piyush Agro Industries.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <LanguageProvider>
      <DataProvider>
        <EnquiryProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <Header />

            <main className="flex-1 flex items-center justify-center pt-28 pb-16 px-4">
              <div className="max-w-2xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80">
                {/* 404 Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6">
                  Error 404
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold font-rajdhani text-slate-900 mb-3 tracking-tight">
                  Page Not Found / पृष्ठ नहीं मिला
                </h1>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8 font-medium">
                  The page you are looking for might have been moved, renamed, or is temporarily unavailable. Browse our products or return home.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-bold font-rajdhani text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <Home size={16} /> Return to Home
                  </Link>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold font-rajdhani text-sm transition-all"
                  >
                    <ArrowLeft size={16} /> Browse All Products
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold font-rajdhani text-sm transition-all"
                  >
                    <Wrench size={16} /> Our Services
                  </Link>
                </div>

                {/* Quick Product Links */}
                <div className="border-t border-slate-100 pt-8">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Popular Products & Services
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                    <Link
                      href="/products/tractor-trolley"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:text-primary transition-all flex items-center gap-2 text-xs font-semibold text-slate-700"
                    >
                      <Tractor size={15} className="text-primary shrink-0" />
                      <span>Tractor Trolley</span>
                    </Link>
                    <Link
                      href="/products/hydraulic-tractor-trolley"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:text-primary transition-all flex items-center gap-2 text-xs font-semibold text-slate-700"
                    >
                      <Wrench size={15} className="text-primary shrink-0" />
                      <span>Hydraulic Trolley</span>
                    </Link>
                    <Link
                      href="/products/water-tanker-trailer"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:text-primary transition-all flex items-center gap-2 text-xs font-semibold text-slate-700"
                    >
                      <Droplets size={15} className="text-primary shrink-0" />
                      <span>Water Tanker</span>
                    </Link>
                    <Link
                      href="/products/custom-fabrication"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:text-primary transition-all flex items-center gap-2 text-xs font-semibold text-slate-700"
                    >
                      <Hammer size={15} className="text-primary shrink-0" />
                      <span>Custom Fabrication</span>
                    </Link>
                  </div>
                </div>

                {/* Direct Contact Assistance */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
                  <span>Need urgent assistance?</span>
                  <a
                    href="tel:9425245291"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline font-bold"
                  >
                    <Phone size={13} /> +91 9425245291
                  </a>
                  <a
                    href="https://wa.me/919425245291?text=Hello%20Piyush%20Agro%2C%20I%20need%20assistance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline font-bold"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </EnquiryProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
