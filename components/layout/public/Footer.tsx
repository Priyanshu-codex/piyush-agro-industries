'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { t } from '@/constants/translations';
import { Phone, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react';

const QUICK_LINKS = [
  { href: '#hero',     enLabel: 'Home',     hiLabel: 'होम' },
  { href: '#products', enLabel: 'Products',  hiLabel: 'उत्पाद' },
  { href: '/about',    enLabel: 'About Us',  hiLabel: 'हमारे बारे में' },
  { href: '#services', enLabel: 'Services',  hiLabel: 'सेवाएं' },
  { href: '#gallery',  enLabel: 'Gallery',   hiLabel: 'गैलरी' },
  { href: '#contact',  enLabel: 'Contact',   hiLabel: 'संपर्क' },
];

const PRODUCT_LINKS = [
  { enLabel: 'Tractor Trolley',       hiLabel: 'ट्रैक्टर ट्रॉली' },
  { enLabel: 'Hydraulic Trolley',     hiLabel: 'हाइड्रोलिक ट्रॉली' },
  { enLabel: 'Hydraulic Dumper',      hiLabel: 'हाइड्रोलिक डम्पर' },
  { enLabel: 'Water Tanker',          hiLabel: 'वाटर टैंकर' },
  { enLabel: 'Cultivator',            hiLabel: 'कल्टीवेटर' },
  { enLabel: 'Custom Fabrication',    hiLabel: 'कस्टम फेब्रिकेशन' },
];

const SERVICE_LINKS = [
  { enLabel: 'Vehicle Fabrication',   hiLabel: 'वाहन फेब्रिकेशन' },
  { enLabel: 'Vehicle Repairing',     hiLabel: 'वाहन मरम्मत' },
  { enLabel: 'Welding Services',      hiLabel: 'वेल्डिंग सेवाएं' },
  { enLabel: 'Vehicle Modification',  hiLabel: 'वाहन संशोधन' },
  { enLabel: 'Get Free Quote',        hiLabel: 'मुफ्त कोटेशन' },
];

export default function Footer() {
  const { lang, tx } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const pathname = usePathname();
  const router = useRouter();

  const scroll = (href: string) => {
    if (href.startsWith('/')) {
      router.push(href);
      return;
    }
    if (pathname !== '/') {
      router.push(`/${href}`);
    } else {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-gray-950 text-gray-400 pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center
                text-white font-bold text-lg font-rajdhani">P</div>
              <div>
                <div className="text-white font-bold font-rajdhani text-base leading-tight">Piyush Agro Industries</div>
                <div className="text-brand-green text-xs" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  पियूष एग्रो इंडस्ट्रीज
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-5">{tx(t.footer.desc)}</p>

            {/* Contact */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Khairagarh Road, Thelkadih, Rajnandgaon, CG</span>
              </div>
              <a href="tel:9425245291" className="flex items-center gap-2 hover:text-brand-green transition-colors">
                <Phone size={14} className="text-primary flex-shrink-0" /> +91 9425245291
              </a>
              <a href="tel:9479244691" className="flex items-center gap-2 hover:text-brand-green transition-colors">
                <Phone size={14} className="text-primary flex-shrink-0" /> +91 9479244691
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2.5 mt-5">
              {[
                { icon: <MessageCircle size={16} />, href: 'https://wa.me/919425245291', label: 'WhatsApp' },
                { icon: <Facebook size={16} />,       href: '#',                          label: 'Facebook' },
                { icon: <Instagram size={16} />,      href: '#',                          label: 'Instagram' },
                { icon: <Phone size={16} />,           href: 'tel:9425245291',             label: 'Call' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center
                    justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary
                    transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h5 className="text-white font-bold font-rajdhani mb-4 text-sm uppercase tracking-wide">
              {tx(t.footer.links)}
            </h5>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ href, enLabel, hiLabel }) => (
                <li key={href}>
                  <button
                    onClick={() => scroll(href)}
                    className="flex items-center gap-1.5 text-sm hover:text-brand-green hover:pl-1
                      transition-all duration-150 text-left"
                  >
                    <span className="text-primary text-xs">→</span>
                    {lang === 'hi' ? hiLabel : enLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Products ── */}
          <div>
            <h5 className="text-white font-bold font-rajdhani mb-4 text-sm uppercase tracking-wide">
              {tx(t.footer.products)}
            </h5>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map(({ enLabel, hiLabel }) => (
                <li key={enLabel}>
                  <button
                    onClick={() => scroll('#products')}
                    className="flex items-center gap-1.5 text-sm hover:text-brand-green hover:pl-1
                      transition-all duration-150 text-left"
                  >
                    <span className="text-primary text-xs">→</span>
                    {lang === 'hi' ? hiLabel : enLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h5 className="text-white font-bold font-rajdhani mb-4 text-sm uppercase tracking-wide">
              {tx(t.footer.servicesH)}
            </h5>
            <ul className="space-y-2">
              {SERVICE_LINKS.map(({ enLabel, hiLabel }) => (
                <li key={enLabel}>
                  <button
                    onClick={() => {
                      if (enLabel === 'Get Free Quote') {
                        openEnquiry(lang === 'en' ? 'General Enquiry' : 'सामान्य पूछताछ');
                      } else {
                        scroll('#services');
                      }
                    }}
                    className="flex items-center gap-1.5 text-sm hover:text-brand-green hover:pl-1
                      transition-all duration-150 text-left"
                  >
                    <span className="text-primary text-xs">→</span>
                    {lang === 'hi' ? hiLabel : enLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-5 flex flex-col sm:flex-row justify-between
          items-center gap-3 text-xs text-gray-600">
          <span>{tx(t.footer.copyright)}</span>
          <span>{tx(t.footer.location)}</span>
        </div>
      </div>
    </footer>
  );
}
