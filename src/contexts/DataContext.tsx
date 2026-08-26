'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createClient } from '@/supabase/client';
import {
  t as staticT,
  PRODUCTS,
  EXTENDED_PRODUCTS,
  GALLERY_ITEMS as staticGalleryItems,
  FAQ_ITEMS as staticFaqItems,
  TESTIMONIALS as staticTestimonials,
} from '@/constants/translations';
import { getProductPrimaryImage, getProductGalleryImages } from '@/utils/imageUtils';
import type { Product, GalleryItem, FAQItem, Testimonial, HomepageSettings, ContactSettings, GeneralSettings } from '@/types';

export type { HomepageSettings, ContactSettings, GeneralSettings };

import { subscribeProducts } from '@/services/productService';
import { subscribeCategories } from '@/services/categoryService';
import { subscribeGallery } from '@/services/galleryService';
import { subscribeHomepageSettings, subscribeContactSettings, subscribeGeneralSettings } from '@/services/settingsService';

interface DataContextValue {
  supabaseConfigured: boolean;
  loading: boolean;
  products: Product[];
  categories: { id: string; name: { en: string; hi: string }; icon: string; gradient: string; displayOrder: number; status: string }[];
  galleryItems: GalleryItem[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  homepageSettings: HomepageSettings;
  contactSettings: ContactSettings;
  generalSettings: GeneralSettings;
}

export const DataContext = createContext<DataContextValue | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export const ALL_STATIC_PRODUCTS: Product[] = [
  ...PRODUCTS.map(p => ({
    ...p,
    slug: p.slug || p.id,
    thumbnail: getProductPrimaryImage(p) || p.thumbnail || '/images/products/tractor-trolley.png',
    images: getProductGalleryImages(p).length > 0 ? getProductGalleryImages(p) : (p.images || [p.thumbnail || '/images/products/tractor-trolley.png']),
  })),
  ...EXTENDED_PRODUCTS.map(p => ({
    ...p,
    slug: p.slug || p.id,
    thumbnail: getProductPrimaryImage(p) || p.thumbnail || '/images/products/tractor-trolley.png',
    images: getProductGalleryImages(p).length > 0 ? getProductGalleryImages(p) : (p.images || [p.thumbnail || '/images/products/tractor-trolley.png']),
  })),
];

const MOCK_STORAGE_PREFIX = 'piyush_agro_mock_v2_';

export const DEFAULT_STATIC_CATEGORIES = [
  { id: 'tractor', name: { en: 'Tractor Trailers', hi: 'ट्रैक्टर ट्रेलर' }, icon: '🚜', gradient: 'from-[#065F2E] to-[#0B7A3B]', displayOrder: 1, status: 'active' },
  { id: 'hydraulic', name: { en: 'Hydraulic Tractor Trolley', hi: 'हाइड्रोलिक ट्रैक्टर ट्रॉली' }, icon: '🔧', gradient: 'from-[#1a2f6f] to-[#243B8F]', displayOrder: 2, status: 'active' },
  { id: 'water', name: { en: 'Water Tanker Trailers', hi: 'वाटर टैंकर ट्रेलर' }, icon: '💧', gradient: 'from-[#0c4a6e] to-[#0ea5e9]', displayOrder: 3, status: 'active' },
  { id: 'agri', name: { en: 'Agricultural Implements', hi: 'कृषि उपकरण' }, icon: '🌾', gradient: 'from-[#365314] to-[#4d7c0f]', displayOrder: 4, status: 'active' },
  { id: 'generator', name: { en: 'Generator Trolley', hi: 'जनरेटर ट्रॉली' }, icon: '⚡', gradient: 'from-[#78350f] to-[#92400e]', displayOrder: 5, status: 'active' },
  { id: 'material', name: { en: 'Material Handling Equipment', hi: 'मटेरियल हैंडलिंग उपकरण' }, icon: '🏗️', gradient: 'from-[#991b1b] to-[#dc2626]', displayOrder: 6, status: 'active' },
  { id: 'fabrication', name: { en: 'Custom Fabrication', hi: 'कस्टम फेब्रिकेशन' }, icon: '🔨', gradient: 'from-[#4c1d95] to-[#6d28d9]', displayOrder: 7, status: 'active' },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(ALL_STATIC_PRODUCTS);
  const [categories, setCategories] = useState<any[]>(DEFAULT_STATIC_CATEGORIES);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(staticGalleryItems);
  const [faqs, setFaqs] = useState<FAQItem[]>(staticFaqItems);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  const defaultHomepageSettings: HomepageSettings = {
    hero: {
      badge: staticT.hero.badge,
      titleHi: staticT.hero.titleHi,
      titleEn: staticT.hero.titleEn,
      subtitle: staticT.hero.subtitle,
      cta1: staticT.hero.cta1,
      cta2: staticT.hero.cta2,
      cta3: staticT.hero.cta3,
      cta4: staticT.hero.cta4,
      stat1Num: staticT.hero.stat1Num,
      stat1Label: staticT.hero.stat1Label,
      stat2Num: staticT.hero.stat2Num,
      stat2Label: staticT.hero.stat2Label,
      stat3Num: staticT.hero.stat3Num,
      stat3Label: staticT.hero.stat3Label,
    },
    whyUs: {
      badge: staticT.whyUs.badge,
      title: staticT.whyUs.title,
      titleHL: staticT.whyUs.titleHL,
    },
    process: {
      badge: staticT.process.badge,
      title: staticT.process.title,
      titleHL: staticT.process.titleHL,
    },
    faq: {
      badge: staticT.faq.badge,
      title: staticT.faq.title,
      titleHL: staticT.faq.titleHL,
    },
    cta: {
      title: staticT.cta.title,
      subtitle: staticT.cta.subtitle,
      btn1: staticT.cta.btn1,
      btn2: staticT.cta.btn2,
    },
  };

  const defaultContactSettings: ContactSettings = {
    phone1: '+919425245291',
    phone2: '+917748825291',
    whatsapp: '919425245291',
    email: 'info@piyushagro.com',
    address: {
      en: 'Khairagarh Road, Thelkadih, Rajnandgaon, Chhattisgarh 491441',
      hi: 'खैरागढ़ रोड, ठेलकाडीह, राजनांदगांव, छत्तीसगढ़ 491441',
    },
    gmapsLink: 'https://maps.google.com/?q=Piyush+Agro+Industries+Thelkadih',
    facebook: 'https://facebook.com/piyushagro',
    twitter: 'https://twitter.com/piyushagro',
    instagram: 'https://instagram.com/piyushagro',
    linkedin: 'https://linkedin.com/company/piyushagro',
  };

  const defaultGeneralSettings: GeneralSettings = {
    siteName: 'Piyush Agro Industries',
    logoText: 'Piyush Agro',
    footerText: staticT.footer.desc,
    copyrightText: staticT.footer.copyright,
  };

  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(defaultHomepageSettings);
  const [contactSettings, setContactSettings] = useState<ContactSettings>(defaultContactSettings);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(defaultGeneralSettings);

  const getMockData = (key: string, fallback: any) => {
    if (typeof window === 'undefined') return fallback;
    try {
      const data = localStorage.getItem(MOCK_STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  };

  const setMockData = (key: string, data: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(MOCK_STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (e) {
      console.error('Error writing mock storage', e);
    }
  };

  const mutateStaticTranslations = (
    currentGallery: GalleryItem[],
    currentFaqs: FAQItem[],
    currentTestimonials: Testimonial[],
    homeSet: HomepageSettings,
    contactSet: ContactSettings,
    genSet: GeneralSettings
  ) => {
    const activeGallery = currentGallery.filter((g: any) => g.status !== 'hidden');
    staticGalleryItems.length = 0;
    staticGalleryItems.push(...activeGallery);

    staticFaqItems.length = 0;
    staticFaqItems.push(...currentFaqs);

    staticTestimonials.length = 0;
    staticTestimonials.push(...(currentFaqs.length > 0 ? currentTestimonials : staticTestimonials));

    if (homeSet.hero) {
      Object.assign(staticT.hero.badge, homeSet.hero.badge);
      Object.assign(staticT.hero.titleHi, homeSet.hero.titleHi);
      Object.assign(staticT.hero.titleEn, homeSet.hero.titleEn);
      Object.assign(staticT.hero.subtitle, homeSet.hero.subtitle);
      Object.assign(staticT.hero.cta1, homeSet.hero.cta1);
      Object.assign(staticT.hero.cta2, homeSet.hero.cta2);
      Object.assign(staticT.hero.cta3, homeSet.hero.cta3);
      Object.assign(staticT.hero.cta4, homeSet.hero.cta4);
      Object.assign(staticT.hero.stat1Num, homeSet.hero.stat1Num);
      Object.assign(staticT.hero.stat1Label, homeSet.hero.stat1Label);
      Object.assign(staticT.hero.stat2Num, homeSet.hero.stat2Num);
      Object.assign(staticT.hero.stat2Label, homeSet.hero.stat2Label);
      Object.assign(staticT.hero.stat3Num, homeSet.hero.stat3Num);
      Object.assign(staticT.hero.stat3Label, homeSet.hero.stat3Label);
      Object.assign(staticT.whyUs.badge, homeSet.whyUs.badge);
      Object.assign(staticT.whyUs.title, homeSet.whyUs.title);
      Object.assign(staticT.whyUs.titleHL, homeSet.whyUs.titleHL);
      Object.assign(staticT.process.badge, homeSet.process.badge);
      Object.assign(staticT.process.title, homeSet.process.title);
      Object.assign(staticT.process.titleHL, homeSet.process.titleHL);
      Object.assign(staticT.faq.badge, homeSet.faq.badge);
      Object.assign(staticT.faq.title, homeSet.faq.title);
      Object.assign(staticT.faq.titleHL, homeSet.faq.titleHL);
      Object.assign(staticT.cta.title, homeSet.cta.title);
      Object.assign(staticT.cta.subtitle, homeSet.cta.subtitle);
      Object.assign(staticT.cta.btn1, homeSet.cta.btn1);
      Object.assign(staticT.cta.btn2, homeSet.cta.btn2);
    }

    if (contactSet) {
      Object.assign(staticT.contact.addrLabel, { en: 'Address', hi: 'पता' });
      Object.assign(staticT.contact.desc, {
        en: `We're here to help with all your agricultural and commercial vehicle fabrication needs. Reach us via phone, WhatsApp, or the form.`,
        hi: 'हम आपकी सभी कृषि और वाहन फेब्रिकेशन आवश्यकताओं में मदद के लिए यहां हैं। फोन, व्हाट्सएप या फॉर्म के माध्यम से संपर्क करें।',
      });
      staticT.contact.phone1Label = { en: contactSet.phone1, hi: contactSet.phone1 };
      staticT.contact.phone2Label = { en: contactSet.phone2, hi: contactSet.phone2 };
      staticT.contact.waText = {
        en: `Chat on WhatsApp (+91 ${contactSet.whatsapp})`,
        hi: `व्हाट्सएप पर चैट करें (+91 ${contactSet.whatsapp})`,
      };
    }

    if (genSet) {
      Object.assign(staticT.footer.desc, genSet.footerText);
      Object.assign(staticT.footer.copyright, genSet.copyrightText);
    }
  };

  const initializeSupabaseDefaults = async () => {
    try {
      const { saveCategory } = await import('@/services/categoryService');
      const { saveGalleryItem } = await import('@/services/galleryService');
      const { saveSettings } = await import('@/services/settingsService');
      const supabase = createClient();

      const cats = [
        { id: 'tractor', name: { en: 'Tractor Trailers', hi: 'ट्रैक्टर ट्रेलर' }, icon: '🚜', gradient: 'from-[#065F2E] to-[#0B7A3B]', displayOrder: 1, status: 'active' },
        { id: 'hydraulic', name: { en: 'Hydraulic Tractor Trolley', hi: 'हाइड्रोलिक ट्रैक्टर ट्रॉली' }, icon: '🔧', gradient: 'from-[#1a2f6f] to-[#243B8F]', displayOrder: 2, status: 'active' },
        { id: 'generator', name: { en: 'Generator Trolley', hi: 'जनरेटर ट्रॉली' }, icon: '⚡', gradient: 'from-[#78350f] to-[#92400e]', displayOrder: 3, status: 'active' },
        { id: 'material', name: { en: 'Material Handling Equipment', hi: 'मटेरियल हैंडलिंग उपकरण' }, icon: '🏗️', gradient: 'from-[#991b1b] to-[#dc2626]', displayOrder: 4, status: 'active' },
        { id: 'fabrication', name: { en: 'Custom Fabrication', hi: 'कस्टम फेब्रिकेशन' }, icon: '🔨', gradient: 'from-[#4c1d95] to-[#6d28d9]', displayOrder: 5, status: 'active' },
      ];
      for (const c of cats) {
        await saveCategory(c.id, c);
      }

      for (const g of staticGalleryItems) {
        await saveGalleryItem(g.id, { ...g, displayOrder: 10, status: 'active' });
      }

      let fIdx = 0;
      for (const f of staticFaqItems) {
        await supabase.from('faqs').upsert({ id: `faq${fIdx++}`, ...f });
      }

      let tIdx = 0;
      for (const t of staticTestimonials) {
        await supabase.from('testimonials').upsert({ id: `test${tIdx++}`, ...t, displayOrder: 10 });
      }

      await saveSettings('homepage', defaultHomepageSettings);
      await saveSettings('contact', defaultContactSettings);
      await saveSettings('general', defaultGeneralSettings);
    } catch (e: any) {
      console.error('Error initializing Supabase defaults', e?.message || e, e);
    }
  };

  useEffect(() => {
    const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url';
    setSupabaseConfigured(isConfigured);

    if (isConfigured) {
      const supabase = createClient();

      let isInitializing = false;
      
      const unsubCategories = subscribeCategories((list) => {
        setCategories(list);
        if (list.length === 0 && !isInitializing) {
          isInitializing = true;
          initializeSupabaseDefaults().finally(() => {
            isInitializing = false;
          });
        }
      });

      const unsubProducts = subscribeProducts((list) => {
        if (list && list.length > 0) {
          const enriched = list.map((p: any) => {
            const staticProd = ALL_STATIC_PRODUCTS.find(sp => sp.id === p.id || sp.slug === p.slug || sp.id === p.slug || sp.title?.en === p.title?.en);
            const thumb = getProductPrimaryImage(p) || (staticProd?.thumbnail || '/images/products/tractor-trolley.png');
            const imgs = getProductGalleryImages(p);
            const finalImages = imgs.length > 0 ? imgs : (staticProd?.images || [thumb]);
            return {
              ...p,
              slug: p.slug || p.id,
              thumbnail: thumb,
              images: finalImages,
            };
          });
          const existingIds = new Set(enriched.map((p: any) => (p.slug || p.id || '').toLowerCase()));
          const remainingStatic = ALL_STATIC_PRODUCTS.filter(sp => !existingIds.has((sp.slug || sp.id || '').toLowerCase()));
          setProducts([...enriched, ...remainingStatic]);
        } else {
          setProducts(ALL_STATIC_PRODUCTS);
        }
      });

      const unsubGallery = subscribeGallery((list) => {
        setGalleryItems(list);
      });

      // FAQs
      supabase.from('faqs').select('*').then(({ data }) => {
        if (data) setFaqs(data as FAQItem[]);
      });
      const faqChan = supabase.channel(`faqs_chan_${Math.random()}`).on('postgres_changes', { event: '*', schema: 'public', table: 'faqs' }, async () => {
        const { data } = await supabase.from('faqs').select('*');
        if (data) setFaqs(data as FAQItem[]);
      }).subscribe();

      // Testimonials
      supabase.from('testimonials').select('*').order('display_order', { ascending: true }).then(({ data }) => {
        if (data) setTestimonials(data as Testimonial[]);
      });
      const testChan = supabase.channel(`tests_chan_${Math.random()}`).on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, async () => {
        const { data } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
        if (data) setTestimonials(data as Testimonial[]);
      }).subscribe();

      const unsubHomepageSet = subscribeHomepageSettings((set) => {
        setHomepageSettings(set);
      });

      const unsubContactSet = subscribeContactSettings((set) => {
        setContactSettings(set);
      });

      const unsubGeneralSet = subscribeGeneralSettings((set) => {
        setGeneralSettings(set);
      });

      setLoading(false);

      return () => {
        unsubProducts();
        unsubCategories();
        unsubGallery();
        supabase.removeChannel(faqChan);
        supabase.removeChannel(testChan);
        unsubHomepageSet();
        unsubContactSet();
        unsubGeneralSet();
      };
    } else {
      const cachedCategories = getMockData('categories', null);
      if (!cachedCategories) {
        setMockData('products', ALL_STATIC_PRODUCTS);
        setMockData('categories', DEFAULT_STATIC_CATEGORIES);
        setMockData('gallery', staticGalleryItems.map((g, idx) => ({ ...g, displayOrder: idx + 1, status: 'active' })));
        setMockData('faqs', staticFaqItems);
        setMockData('testimonials', staticTestimonials.map((t, idx) => ({ ...t, id: `t${idx}`, displayOrder: idx + 1 })));
        setMockData('homepage', defaultHomepageSettings);
        setMockData('contact', defaultContactSettings);
        setMockData('general', defaultGeneralSettings);
      }

      const initialProducts = getMockData('products', null);
      if (!initialProducts || initialProducts.length === 0) {
        setProducts(ALL_STATIC_PRODUCTS);
      } else {
        const resolvedProducts = initialProducts.map((p: any) => {
          const staticProd = ALL_STATIC_PRODUCTS.find(sp => sp.id === p.id || sp.slug === p.slug || sp.id === p.slug || sp.title?.en === p.title?.en);
          const thumb = getProductPrimaryImage(p) || staticProd?.thumbnail || '/images/products/tractor-trolley.png';
          const imgs = getProductGalleryImages(p);
          return {
            ...p,
            slug: p.slug || p.id,
            thumbnail: thumb,
            images: imgs.length > 0 ? imgs : (staticProd?.images || [thumb]),
          };
        });
        const existingIds = new Set(resolvedProducts.map((p: any) => (p.slug || p.id || '').toLowerCase()));
        const remainingStatic = ALL_STATIC_PRODUCTS.filter(sp => !existingIds.has((sp.slug || sp.id || '').toLowerCase()));
        setProducts([...resolvedProducts, ...remainingStatic]);
      }
      setCategories(getMockData('categories', DEFAULT_STATIC_CATEGORIES));
      setGalleryItems(getMockData('gallery', staticGalleryItems.map((g, idx) => ({ ...g, displayOrder: idx + 1, status: 'active' }))));
      setFaqs(getMockData('faqs', staticFaqItems));
      setTestimonials(getMockData('testimonials', staticTestimonials.map((t, idx) => ({ ...t, id: `t${idx}`, displayOrder: idx + 1 }))));
      setHomepageSettings(getMockData('homepage', defaultHomepageSettings));
      setContactSettings(getMockData('contact', defaultContactSettings));
      setGeneralSettings(getMockData('general', defaultGeneralSettings));
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mutateStaticTranslations(
      galleryItems,
      faqs,
      testimonials,
      homepageSettings,
      contactSettings,
      generalSettings
    );
  }, [galleryItems, faqs, testimonials, homepageSettings, contactSettings, generalSettings]);

  const value = useMemo(() => ({
    supabaseConfigured,
    loading,
    products,
    categories,
    galleryItems,
    faqs,
    testimonials,
    homepageSettings,
    contactSettings,
    generalSettings,
  }), [
    supabaseConfigured,
    loading,
    products,
    categories,
    galleryItems,
    faqs,
    testimonials,
    homepageSettings,
    contactSettings,
    generalSettings,
  ]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
