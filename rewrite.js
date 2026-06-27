const fs = require('fs');
const file = fs.readFileSync('./constants/translations.ts', 'utf8');
const tObjectEnd = file.indexOf('// ─── Data arrays ──────────────────────────────────────────────────────────────');
if (tObjectEnd > 0) {
  const newContent = file.substring(0, tObjectEnd) + 
`// ─── Data arrays ──────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [];
export const GALLERY_ITEMS: GalleryItem[] = [];
export const FAQ_ITEMS: FAQItem[] = [];
export const TESTIMONIALS: Testimonial[] = [];
export const WHY_FEATURES: Feature[] = [];
export const PROCESS_STEPS: ProcessStep[] = [];
export const SERVICE_OPTIONS: any[] = [];
export const MEGA_MENU: any[] = [];
export const MEGA_MENU_CTA = { en: 'View All Products', hi: 'सभी उत्पाद देखें' };
export const EXTENDED_PRODUCTS: Product[] = [];
export const PRODUCT_CATEGORIES: string[] = [];
`;
  fs.writeFileSync('./constants/translations.ts', newContent);
  console.log('Successfully stripped hardcoded data from translations.ts');
} else {
  console.log('Could not find delimiter');
}
