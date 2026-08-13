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

  return trimmed;
}

/**
 * Safely extracts the primary image URL from product thumbnail or images array.
 */
export function getProductPrimaryImage(product?: { thumbnail?: string; images?: string[] } | null): string | undefined {
  if (!product) return undefined;

  const thumbnail = normalizeImageUrl(product.thumbnail);
  if (thumbnail) return thumbnail;

  if (Array.isArray(product.images) && product.images.length > 0) {
    for (const img of product.images) {
      const normalized = normalizeImageUrl(img);
      if (normalized) return normalized;
    }
  }

  return undefined;
}
