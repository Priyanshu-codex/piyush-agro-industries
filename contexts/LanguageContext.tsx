'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Lang, TText } from '@/types';

// ─── Context shape ────────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  /** Resolve a TText object to the current language string */
  tx: (text: TText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'piyush-agro-lang';

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'hi' || saved === 'en') setLangState(saved);
    } catch {
      // localStorage may be unavailable (SSR / private mode)
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch { /* ignore */ }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'hi' : 'en');
  }, [lang, setLang]);

  const tx = useCallback(
    (text: TText): string => text[lang],
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, tx }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }
  return ctx;
}
