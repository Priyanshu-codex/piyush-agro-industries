'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { ShieldCheck, Wrench, Clock, Tag, Headphones, Settings } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: <ShieldCheck size={18} />, key: 'q1' },
  { icon: <Wrench size={18} />,      key: 'q2' },
  { icon: <Clock size={18} />,       key: 'q3' },
  { icon: <Tag size={18} />,         key: 'q4' },
  { icon: <Headphones size={18} />,  key: 'q5' },
  { icon: <Settings size={18} />,    key: 'q6' },
] as const;

export default function TrustBar() {
  const { tx } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-100 py-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-0 min-w-max mx-auto">
          {TRUST_ITEMS.map(({ icon, key }, i) => (
            <div
              key={key}
              className={`flex items-center gap-2 px-5 py-2 ${
                i < TRUST_ITEMS.length - 1 ? 'border-r border-gray-200' : ''
              }`}
            >
              <span className="text-primary">{icon}</span>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                {tx(t.trust[key])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
