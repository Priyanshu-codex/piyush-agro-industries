import { PRODUCTS, EXTENDED_PRODUCTS } from '@/constants/translations';
import { getProductPrimaryImage, getProductGalleryImages } from '@/utils/imageUtils';
import type { Product } from '@/types';

export const ALL_PRODUCTS: Product[] = [
  ...PRODUCTS.map((p) => ({
    ...p,
    slug: p.slug || p.id,
    thumbnail: getProductPrimaryImage(p) || p.thumbnail || '/images/products/tractor-trolley.png',
    images: getProductGalleryImages(p).length > 0 ? getProductGalleryImages(p) : (p.images || [p.thumbnail || '/images/products/tractor-trolley.png']),
  })),
  ...EXTENDED_PRODUCTS.map((p) => ({
    ...p,
    slug: p.slug || p.id,
    thumbnail: getProductPrimaryImage(p) || p.thumbnail || '/images/products/tractor-trolley.png',
    images: getProductGalleryImages(p).length > 0 ? getProductGalleryImages(p) : (p.images || [p.thumbnail || '/images/products/tractor-trolley.png']),
  })),
];

/**
 * Finds a product by its canonical slug, id, or normalized title.
 */
export function findProduct(targetSlugOrId: string): Product | undefined {
  if (!targetSlugOrId) return undefined;
  const target = targetSlugOrId.toLowerCase().trim();
  const targetClean = target.replace(/[^a-z0-9]/g, '');

  // 1. Exact slug or id match
  let found = ALL_PRODUCTS.find((p) => {
    const slug = (p.slug || '').toLowerCase().trim();
    const id = (p.id || '').toLowerCase().trim();
    return slug === target || id === target;
  });
  if (found) return found;

  // 2. Clean normalized match
  found = ALL_PRODUCTS.find((p) => {
    const slugClean = (p.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const idClean = (p.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return slugClean === targetClean || idClean === targetClean;
  });
  if (found) return found;

  // 3. Title match
  found = ALL_PRODUCTS.find((p) => {
    const titleEn = (p.title?.en || (typeof p.title === 'string' ? p.title : '')).toLowerCase().trim();
    const titleSlug = titleEn.replace(/\s+/g, '-');
    const titleClean = titleEn.replace(/[^a-z0-9]/g, '');
    return titleSlug === target || titleClean === targetClean || titleEn === target;
  });

  return found;
}
