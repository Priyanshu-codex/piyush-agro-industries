import { createClient } from '@/supabase/client';
import type { Product } from '@/types';
import { PRODUCTS, EXTENDED_PRODUCTS } from '@/constants/translations';
import { getProductPrimaryImage, getProductGalleryImages } from '@/utils/imageUtils';

function safeParseJSON(str: any, fallback: any = { en: '', hi: '' }) {
  if (typeof str === 'string' && str.startsWith('{')) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return fallback;
    }
  } else if (str && typeof str === 'object') {
    return str;
  }
  return typeof str === 'string' ? { en: str, hi: str } : fallback;
}

function safeParseArray(str: any, fallback: any[] = []) {
  if (typeof str === 'string' && str.startsWith('[')) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return fallback;
    }
  } else if (Array.isArray(str)) {
    return str;
  }
  return fallback;
}

function mapDbToProduct(row: any, categoriesList: any[]): Product {
  const title = safeParseJSON(row.title);
  const short_desc = safeParseJSON(row.short_desc);
  const full_desc = safeParseJSON(row.full_desc);
  
  let specs = row.specs || {};
  if (typeof row.specs === 'string' && row.specs.startsWith('{')) {
    try { specs = JSON.parse(row.specs); } catch (e) {}
  }
  
  let rawImages = safeParseArray(row.images);
  let features = safeParseArray(row.features);
  let applications = safeParseArray(row.applications);
  
  const seo_title = safeParseJSON(row.seo_title);
  const seo_desc = safeParseJSON(row.seo_desc);
  const seo_keywords = safeParseJSON(row.seo_keywords);

  const matchingCat = categoriesList.find((c) => c.id === row.category_id || c.slug === row.category_id);
  const categoryName = matchingCat 
    ? (typeof matchingCat.name === 'object' ? matchingCat.name?.en : matchingCat.name) 
    : (row.category || '');

  const staticMatch = PRODUCTS.find(sp => sp.id === row.slug || sp.slug === row.slug || sp.title?.en === title?.en)
    || EXTENDED_PRODUCTS.find(ep => ep.id === row.slug || ep.slug === row.slug || ep.title?.en === title?.en);

  const productRef = {
    thumbnail: row.thumbnail,
    images: rawImages,
    slug: row.slug,
    id: row.id,
    title,
  };

  const thumbnail = getProductPrimaryImage(productRef) || (staticMatch?.thumbnail || '/images/products/tractor-trolley.png');
  const images = getProductGalleryImages(productRef);
  const finalImages = images.length > 0 ? images : [thumbnail];

  return {
    id: row.slug || row.id,
    icon: row.icon || staticMatch?.icon || '🚜',
    gradient: row.gradient || staticMatch?.gradient || 'from-[#065F2E] to-[#0B7A3B]',
    title: title || staticMatch?.title,
    short_desc: short_desc || staticMatch?.desc,
    full_desc: full_desc || staticMatch?.desc,
    category: categoryName || staticMatch?.category || '',
    category_id: row.category_id,
    featured: row.featured,
    status: row.status,
    displayOrder: row.display_order || 10,
    images: finalImages,
    thumbnail,
    brochure_url: row.brochure_url || '',
    specs: (specs && Object.keys(specs).length > 0) ? specs : (staticMatch?.specs || {}),
    features: features.length > 0 ? features : (staticMatch?.features || []),
    applications: applications.length > 0 ? applications : (staticMatch?.applications || []),
    seo_title,
    seo_desc,
    seo_keywords,
  };
}

export function subscribeProductsDb(callback: (products: Product[]) => void) {
  const supabase = createClient();
  
  const triggerCallback = async () => {
    const { data: catData } = await supabase.from('categories').select('id, name, slug');
    const categoriesList = (catData || []).map((row) => {
      let name = safeParseJSON(row.name);
      return { id: row.id, name, slug: row.slug };
    });

    const { data: prodData, error } = await supabase.from('products').select('*').order('display_order', { ascending: true });
    if (error) console.error('Error fetching products:', error);
    if (prodData) {
      callback(prodData.map((row) => mapDbToProduct(row, categoriesList)));
    }
  };

  triggerCallback();

  const channel = supabase
    .channel(`products_realtime_${Math.random()}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      triggerCallback
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'categories' },
      triggerCallback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function saveProductDb(id: string, data: Partial<Product>) {
  const supabase = createClient();
  
  // 1. Resolve category ID
  let categoryUUID = data.category_id;
  if (!categoryUUID && data.category) {
    const { data: catData } = await supabase.from('categories').select('id, name');
    const matchingCat = (catData || []).find((row) => {
      let name = safeParseJSON(row.name);
      return name.en === data.category;
    });
    categoryUUID = matchingCat ? matchingCat.id : null;
  }

  // 2. Map frontend product format to Supabase columns
  const dbRow: any = {
    slug: id,
    title: typeof data.title === 'string' ? { en: data.title, hi: data.title } : data.title,
    short_desc: typeof data.short_desc === 'string' ? { en: data.short_desc, hi: data.short_desc } : data.short_desc,
    full_desc: typeof data.full_desc === 'string' ? { en: data.full_desc, hi: data.full_desc } : data.full_desc,
    images: data.images || [],
    thumbnail: data.thumbnail || null,
    brochure_url: data.brochure_url || null,
    icon: data.icon,
    gradient: data.gradient,
    specs: data.specs,
    features: data.features || [],
    applications: data.applications || [],
    seo_title: data.seo_title,
    seo_desc: data.seo_desc,
    seo_keywords: data.seo_keywords,
    featured: !!data.featured,
    status: data.status || 'active',
    category_id: categoryUUID,
    display_order: data.displayOrder || 0,
  };

  const { data: res, error } = await supabase
    .from('products')
    .upsert(dbRow, { onConflict: 'slug' })
    .select();

  if (error) throw error;
  return res;
}

export async function getProductBySlugDb(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data: catData } = await supabase.from('categories').select('id, name, slug');
  const categoriesList = (catData || []).map((row) => {
    let name = safeParseJSON(row.name);
    return { id: row.id, name, slug: row.slug };
  });

  const { data: prodData, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
  if (!prodData) return null;
  
  return mapDbToProduct(prodData, categoriesList);
}

export async function deleteProductDb(id: string) {
  const supabase = createClient();
  return await supabase.from('products').delete().eq('slug', id);
}
