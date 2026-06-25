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

// Firebase inquiry document
export interface InquiryDocument extends InquiryFormData {
  language: Lang;
  source: string;
  status: 'new';
  createdAt?: unknown; // Firestore server timestamp
  userAgent?: string;
}
