// Language
export type Lang = 'en' | 'hi';

// Translation pair
export type TText = { en: string; hi: string };

// Form types
export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  submit?: string;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// Product / Gallery types
export interface Product {
  id: string;
  icon: string;
  gradient: string;
  title: TText;
  desc: TText;
  category: string;
  category_id?: string;
  slug?: string;
  featured?: boolean;
  status?: string;
  displayOrder?: number;
  images?: string[];
  specs?: {
    nameOfPart: string;
    capacity: string;
    size: string;
  };
}

export interface GalleryItem {
  id: string;
  icon: string;
  gradient: string;
  label: TText;
  category: GalleryCategory;
  imageUrl?: string;
  displayOrder?: number;
  status?: string;
}

export type GalleryCategory =
  | 'all'
  | 'hydraulic'
  | 'tractor'
  | 'water'
  | 'agri'
  | 'fabrication';

// FAQ
export interface FAQItem {
  question: TText;
  answer: TText;
}

// Testimonial
export interface Testimonial {
  id?: string;
  name: TText;
  role: TText;
  text: TText;
  avatar: string;
  gradient: string;
  rating: number;
}

// Why Us feature
export interface Feature {
  icon: string;
  title: TText;
  desc: TText;
}

// Process step
export interface ProcessStep {
  num: number;
  icon: string;
  title: TText;
  desc: TText;
}

// Supabase inquiry document
export interface InquiryDocument extends InquiryFormData {
  language: Lang;
  source: string;
  status: 'new';
  createdAt?: string; // ISO timestamp set by Supabase
  userAgent?: string;
}

export interface HomepageSettings {
  hero: {
    badge: { en: string; hi: string };
    titleHi: { en: string; hi: string };
    titleEn: { en: string; hi: string };
    subtitle: { en: string; hi: string };
    cta1: { en: string; hi: string };
    cta2: { en: string; hi: string };
    cta3: { en: string; hi: string };
    cta4: { en: string; hi: string };
    stat1Num: { en: string; hi: string };
    stat1Label: { en: string; hi: string };
    stat2Num: { en: string; hi: string };
    stat2Label: { en: string; hi: string };
    stat3Num: { en: string; hi: string };
    stat3Label: { en: string; hi: string };
    backgroundImage?: string;
  };
  whyUs: {
    badge: { en: string; hi: string };
    title: { en: string; hi: string };
    titleHL: { en: string; hi: string };
  };
  process: {
    badge: { en: string; hi: string };
    title: { en: string; hi: string };
    titleHL: { en: string; hi: string };
  };
  faq: {
    badge: { en: string; hi: string };
    title: { en: string; hi: string };
    titleHL: { en: string; hi: string };
  };
  cta: {
    title: { en: string; hi: string };
    subtitle: { en: string; hi: string };
    btn1: { en: string; hi: string };
    btn2: { en: string; hi: string };
  };
}

export interface ContactSettings {
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  address: { en: string; hi: string };
  gmapsLink: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface GeneralSettings {
  siteName: string;
  logoText: string;
  logoUrl?: string;
  faviconUrl?: string;
  footerText: { en: string; hi: string };
  copyrightText: { en: string; hi: string };
}

