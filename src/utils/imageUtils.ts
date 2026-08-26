/**
 * Sanitizes and normalizes image URLs to guarantee valid relative paths or absolute URLs.
 */
export function normalizeImageUrl(url?: string | null): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  let trimmed = url.trim();
  if (!trimmed) return undefined;

  // Fix malformed double protocols
  if (trimmed.startsWith('https://https://')) {
    trimmed = trimmed.replace('https://https://', 'https://');
  } else if (trimmed.startsWith('http://http://')) {
    trimmed = trimmed.replace('http://http://', 'http://');
  }

  // Handle local relative paths
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) {
    trimmed = '/' + trimmed;
  }

  // Convert spaces in local product image URLs to clean hyphenated filenames
  if (trimmed.startsWith('/images/products/') && trimmed.includes(' ')) {
    const filename = trimmed.replace('/images/products/', '');
    const cleanFilename = filename.toLowerCase().replace(/\s+/g, '-');
    return '/images/products/' + cleanFilename;
  }

  return trimmed;
}

/**
 * Canonical product mapping database.
 * Every product slug, ID, and English title maps directly to verified image assets on disk.
 */
export interface ProductImageDefinition {
  primary: string;
  images: string[];
}

export const CANONICAL_PRODUCT_IMAGES: Record<string, ProductImageDefinition> = {
  // ── Tractor Trailers ──
  'tractor-trolley': {
    primary: '/images/products/tractor-trolley.png',
    images: [
      '/images/products/tractor-trolley.png',
      '/images/products/tractor-tipping-trailer.png',
      '/images/products/2-ton-agriculture-tractor-trailer.png',
      '/images/products/non-tipping-tractor-trailer.png',
    ],
  },
  '5-ton-agricultural-tractor-trailer': {
    primary: '/images/products/tractor-trolley.png',
    images: [
      '/images/products/tractor-trolley.png',
      '/images/products/2-ton-agriculture-tractor-trailer.png',
    ],
  },
  'tt-5ton': {
    primary: '/images/products/tractor-trolley.png',
    images: [
      '/images/products/tractor-trolley.png',
      '/images/products/2-ton-agriculture-tractor-trailer.png',
    ],
  },
  'hydraulic-tractor-trailer': {
    primary: '/images/products/4-wheel-hydraulic-trolley.png',
    images: [
      '/images/products/4-wheel-hydraulic-trolley.png',
      '/images/products/hydraulic-trolley.png',
    ],
  },
  'tt-hydraulic': {
    primary: '/images/products/4-wheel-hydraulic-trolley.png',
    images: [
      '/images/products/4-wheel-hydraulic-trolley.png',
      '/images/products/hydraulic-trolley.png',
    ],
  },
  'tractor-tipping-trailer': {
    primary: '/images/products/tractor-tipping-trailer.png',
    images: [
      '/images/products/tractor-tipping-trailer.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  'tt-tipping': {
    primary: '/images/products/tractor-tipping-trailer.png',
    images: [
      '/images/products/tractor-tipping-trailer.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  '2-ton-agriculture-tractor-trailer': {
    primary: '/images/products/2-ton-agriculture-tractor-trailer.png',
    images: [
      '/images/products/2-ton-agriculture-tractor-trailer.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  'tt-2ton': {
    primary: '/images/products/2-ton-agriculture-tractor-trailer.png',
    images: [
      '/images/products/2-ton-agriculture-tractor-trailer.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  'non-tipping-tractor-trailer': {
    primary: '/images/products/non-tipping-tractor-trailer.png',
    images: [
      '/images/products/non-tipping-tractor-trailer.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  'tt-nontipping': {
    primary: '/images/products/non-tipping-tractor-trailer.png',
    images: [
      '/images/products/non-tipping-tractor-trailer.png',
      '/images/products/tractor-trolley.png',
    ],
  },

  // ── Hydraulic Trolleys ──
  '4w-hydraulic': {
    primary: '/images/products/4-wheel-hydraulic-trolley.png',
    images: [
      '/images/products/4-wheel-hydraulic-trolley.png',
      '/images/products/hydraulic-trolley.png',
    ],
  },
  '2w-hydraulic': {
    primary: '/images/products/2-wheeler-trolley.png',
    images: [
      '/images/products/2-wheeler-trolley.png',
      '/images/products/hydraulic-trolley.png',
    ],
  },
  'hydraulic-tractor-trolley': {
    primary: '/images/products/hydraulic-trolley.png',
    images: [
      '/images/products/hydraulic-trolley.png',
      '/images/products/4-wheel-hydraulic-trolley.png',
    ],
  },
  'ht-trolley': {
    primary: '/images/products/hydraulic-trolley.png',
    images: [
      '/images/products/hydraulic-trolley.png',
      '/images/products/4-wheel-hydraulic-trolley.png',
    ],
  },
  'special-tractor-trolley': {
    primary: '/images/products/special-tractor-trolley.png',
    images: [
      '/images/products/special-tractor-trolley.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  'ht-special': {
    primary: '/images/products/special-tractor-trolley.png',
    images: [
      '/images/products/special-tractor-trolley.png',
      '/images/products/tractor-trolley.png',
    ],
  },
  'hydraulic-dumper': {
    primary: '/images/products/hydraulic-dumper.png',
    images: [
      '/images/products/hydraulic-dumper.png',
    ],
  },

  // ── Water Tanker ──
  'water-tanker': {
    primary: '/images/products/water-tanker.png',
    images: [
      '/images/products/water-tanker.png',
      '/images/products/mini-water-tank-trolley.png',
    ],
  },
  'mini-water-tank-trolley': {
    primary: '/images/products/mini-water-tank-trolley.png',
    images: [
      '/images/products/mini-water-tank-trolley.png',
      '/images/products/water-tanker.png',
    ],
  },
  'ht-water': {
    primary: '/images/products/mini-water-tank-trolley.png',
    images: [
      '/images/products/mini-water-tank-trolley.png',
      '/images/products/water-tanker.png',
    ],
  },

  // ── Generator Trolley ──
  '4-wheel-generator-trolley': {
    primary: '/images/products/generator-trolley.png',
    images: [
      '/images/products/generator-trolley.png',
      '/images/products/2-wheeler-trolley.png',
    ],
  },
  'gt-4wheel': {
    primary: '/images/products/generator-trolley.png',
    images: [
      '/images/products/generator-trolley.png',
      '/images/products/2-wheeler-trolley.png',
    ],
  },
  'generator-set-trolley': {
    primary: '/images/products/generator-trolley.png',
    images: [
      '/images/products/generator-trolley.png',
    ],
  },
  'gt-set': {
    primary: '/images/products/generator-trolley.png',
    images: [
      '/images/products/generator-trolley.png',
    ],
  },
  '2-wheeler-trolley': {
    primary: '/images/products/2-wheeler-trolley.png',
    images: [
      '/images/products/2-wheeler-trolley.png',
    ],
  },
  'gt-2wheel': {
    primary: '/images/products/2-wheeler-trolley.png',
    images: [
      '/images/products/2-wheeler-trolley.png',
    ],
  },
  'generator-trolley': {
    primary: '/images/products/generator-trolley.png',
    images: [
      '/images/products/generator-trolley.png',
      '/images/products/2-wheeler-trolley.png',
    ],
  },
  'gt-standard': {
    primary: '/images/products/generator-trolley.png',
    images: [
      '/images/products/generator-trolley.png',
      '/images/products/2-wheeler-trolley.png',
    ],
  },

  // ── Material Handling ──
  'i-jgpu-trolley-4-wheel': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'ugpu-trolley-4-wheel': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'mh-ugpu': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'customize-low-bed-trailer': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'mh-lowbed': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'customize-low-bed-trolley': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'mh-lowbedtrolley': {
    primary: '/images/products/customize-low-bed-trolley.png',
    images: [
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'wheeled-cart': {
    primary: '/images/products/wheeled-cart.png',
    images: [
      '/images/products/wheeled-cart.png',
    ],
  },
  'mh-cart': {
    primary: '/images/products/wheeled-cart.png',
    images: [
      '/images/products/wheeled-cart.png',
    ],
  },

  // ── Agricultural & Implements ──
  'agri-equipment': {
    primary: '/images/products/agri-equipment.png',
    images: [
      '/images/products/agri-equipment.png',
    ],
  },
  'cultivators': {
    primary: '/images/products/agri-equipment.png',
    images: [
      '/images/products/agri-equipment.png',
    ],
  },

  // ── Fabrication, Medical, Utilities & Services ──
  'medical-vehicle': {
    primary: '/images/products/medical-vehicle.png',
    images: [
      '/images/products/medical-vehicle.png',
    ],
  },
  'garbage-vehicle': {
    primary: '/images/products/wheeled-cart.png',
    images: [
      '/images/products/wheeled-cart.png',
    ],
  },
  'gates': {
    primary: '/images/products/gates.png',
    images: [
      '/images/products/gates.png',
    ],
  },
  'railings': {
    primary: '/images/products/railings.png',
    images: [
      '/images/products/railings.png',
    ],
  },
  'custom-fab': {
    primary: '/images/products/fabrication.png',
    images: [
      '/images/products/fabrication.png',
      '/images/products/customize-low-bed-trolley.png',
    ],
  },
  'vehicle-repair': {
    primary: '/images/products/fabrication.png',
    images: [
      '/images/products/fabrication.png',
    ],
  },
};

/**
 * Normalizes title / key strings to match the canonical lookup dictionary.
 */
function normalizeKey(str?: string | null): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Finds the canonical image definition for any product identifier (slug, id, or title).
 */
export function getCanonicalProductImageDef(identifier?: { slug?: string; id?: string; title?: any } | string | null): ProductImageDefinition | undefined {
  if (!identifier) return undefined;

  if (typeof identifier === 'string') {
    const rawKey = identifier.trim().toLowerCase();
    const cleanKey = normalizeKey(identifier);
    if (CANONICAL_PRODUCT_IMAGES[rawKey]) return CANONICAL_PRODUCT_IMAGES[rawKey];
    if (CANONICAL_PRODUCT_IMAGES[cleanKey]) return CANONICAL_PRODUCT_IMAGES[cleanKey];
    return undefined;
  }

  const keysToTry: string[] = [];
  if (identifier.slug) {
    keysToTry.push(identifier.slug.toLowerCase());
    keysToTry.push(normalizeKey(identifier.slug));
  }
  if (identifier.id) {
    keysToTry.push(identifier.id.toLowerCase());
    keysToTry.push(normalizeKey(identifier.id));
  }
  if (identifier.title) {
    const titleStr = typeof identifier.title === 'string' 
      ? identifier.title 
      : (identifier.title.en || identifier.title.hi || '');
    if (titleStr) {
      keysToTry.push(titleStr.toLowerCase());
      keysToTry.push(normalizeKey(titleStr));
    }
  }

  for (const k of keysToTry) {
    if (CANONICAL_PRODUCT_IMAGES[k]) {
      return CANONICAL_PRODUCT_IMAGES[k];
    }
  }

  return undefined;
}

/**
 * Safely extracts the primary image URL from a product object or identifier.
 * Guaranteed to return a valid matching image path if known.
 */
export function getProductPrimaryImage(
  product?: { thumbnail?: string; images?: string[]; slug?: string; id?: string; title?: any } | null
): string | undefined {
  if (!product) return undefined;

  // 1. Try resolving via canonical catalog mapping first
  const canonical = getCanonicalProductImageDef(product);
  if (canonical) {
    return canonical.primary;
  }

  // 2. Fall back to normalized explicit thumbnail if provided
  const thumbnail = normalizeImageUrl(product.thumbnail);
  if (thumbnail) return thumbnail;

  // 3. Fall back to first valid image in images array
  if (Array.isArray(product.images) && product.images.length > 0) {
    for (const img of product.images) {
      const normalized = normalizeImageUrl(img);
      if (normalized) return normalized;
    }
  }

  return undefined;
}

/**
 * Safely extracts full multi-photo gallery image URLs for product details and lightbox views.
 */
export function getProductGalleryImages(
  product?: { thumbnail?: string; images?: string[]; slug?: string; id?: string; title?: any } | null
): string[] {
  if (!product) return [];

  const canonical = getCanonicalProductImageDef(product);
  const result: string[] = [];

  if (canonical && Array.isArray(canonical.images)) {
    for (const img of canonical.images) {
      const norm = normalizeImageUrl(img);
      if (norm && !result.includes(norm)) result.push(norm);
    }
  }

  if (Array.isArray(product.images) && product.images.length > 0) {
    for (const img of product.images) {
      const norm = normalizeImageUrl(img);
      if (norm && !result.includes(norm)) result.push(norm);
    }
  }

  const thumb = normalizeImageUrl(product.thumbnail);
  if (thumb && !result.includes(thumb)) {
    result.unshift(thumb);
  }

  return result;
}
