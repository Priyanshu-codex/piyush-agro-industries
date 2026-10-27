'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/constants/translations';

// ── UNIQUE INLINE INDUSTRIAL SVG ICONS ── //

function QualityIcon() {
  return (
    <svg
      className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" />
      <path d="m9 12 2 2 4-4" stroke="#E31837" strokeWidth="2.2" />
    </svg>
  );
}

function FabricationIcon() {
  return (
    <svg
      className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" />
      <path d="m18 15 3 3" stroke="#E31837" strokeWidth="2.2" />
      <path d="m15 18 3 3" stroke="#E31837" strokeWidth="2.2" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg
      className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 17h4V5H2v12h3" stroke="currentColor" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L18 8h-4v9h1" stroke="currentColor" />
      <circle cx="7.5" cy="17.5" r="2.5" stroke="currentColor" />
      <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" />
      <path d="M1 8h3" stroke="#E31837" strokeWidth="2" />
      <path d="M1 11h2" stroke="#E31837" strokeWidth="2" />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg
      className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" stroke="currentColor" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="#E31837" stroke="#E31837" />
      <path d="M10 14h4" stroke="#E31837" strokeWidth="2" />
      <path d="M12 12v4" stroke="#E31837" strokeWidth="2" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" stroke="currentColor" />
      <path d="M12 14v4" stroke="#E31837" strokeWidth="2.2" />
      <path d="M10 16h4" stroke="#E31837" strokeWidth="2.2" />
    </svg>
  );
}

function CustomIcon() {
  return (
    <svg
      className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.174 6.812-2.986-2.986a1.5 1.5 0 0 0-2.121 0l-2.061 2.06 5.107 5.108 2.061-2.06a1.5 1.5 0 0 0 0-2.122z" stroke="currentColor" />
      <path d="m14.007 5.886-9.879 9.879a2 2 0 0 0-.586 1.414V21h3.828a2 2 0 0 0 1.414-.586l9.879-9.879" stroke="currentColor" />
      <path d="m14 10 3 3" stroke="#E31837" strokeWidth="2" />
      <circle cx="5" cy="19" r="1.2" fill="#E31837" stroke="#E31837" />
    </svg>
  );
}

function MarqueeSeparator() {
  return (
    <div className="flex items-center px-4 sm:px-6 select-none opacity-60" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-[#E31837] shadow-[0_0_8px_rgba(227,24,55,0.9)]" />
    </div>
  );
}

const TRUST_ITEMS = [
  { key: 'q1', icon: QualityIcon },
  { key: 'q2', icon: FabricationIcon },
  { key: 'q3', icon: DeliveryIcon },
  { key: 'q4', icon: PricingIcon },
  { key: 'q5', icon: SupportIcon },
  { key: 'q6', icon: CustomIcon },
] as const;

// 4x sequence guarantees completely seamless looping across all resolutions (even 4K ultrawide)
const QUAD_ITEMS = [
  ...TRUST_ITEMS,
  ...TRUST_ITEMS,
  ...TRUST_ITEMS,
  ...TRUST_ITEMS,
];

export default function TrustBar() {
  const { tx } = useLanguage();

  return (
    <section
      aria-label="Core Capabilities and Quality Assurance"
      className="marquee-container relative w-full bg-[#0A0D10] border-y border-white/10 py-3 sm:py-3.5 overflow-hidden select-none z-10"
    >
      {/* Left & Right subtle edge fade vignette */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#0A0D10] to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#0A0D10] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Continuously Animated Infinite Track */}
      <div className="animate-marquee-infinite items-center">
        {QUAD_ITEMS.map(({ icon: IconComponent, key }, idx) => (
          <div key={`${key}-${idx}`} className="flex items-center">
            <div className="group/item flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(227,24,55,0.15)] cursor-default">
              <div className="flex items-center justify-center w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/[0.06] border border-white/10 text-gray-300 group-hover/item:text-[#E31837] group-hover/item:border-[#E31837]/60 group-hover/item:bg-[#E31837]/10 transition-all duration-200">
                <IconComponent />
              </div>
              <span className="text-xs sm:text-sm md:text-[15px] font-bold font-rajdhani text-gray-100 group-hover/item:text-white uppercase tracking-wider whitespace-nowrap transition-colors duration-200">
                {tx(t.trust[key])}
              </span>
            </div>
            <MarqueeSeparator />
          </div>
        ))}
      </div>
    </section>
  );
}
