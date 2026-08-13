import { createClient } from '@/supabase/client';
import type { Product } from '@/types';

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
  
  let images = safeParseArray(row.images);
  let features = safeParseArray(row.features);
  let applications = safeParseArray(row.applications);
  
  const seo_title = safeParseJSON(row.seo_title);
  const seo_desc = safeParseJSON(row.seo_desc);
  const seo_keywords = safeParseJSON(row.seo_keywords);

  const matchingCat = categoriesList.find((c) => c.id === row.category_id);
  const categoryName = matchingCat ? matchingCat.name.en : '';

  return {
    id: row.slug,
    icon: row.icon || '🚜',
    gradient: row.gradient || 'from-[#065F2E] to-[#0B7A3B]',
    title,
    short_desc,
    full_desc,
    category: categoryName,
    category_id: row.category_id,
    featured: row.featured,
    status: row.status,
    displayOrder: row.display_order || 10,
    images,
    thumbnail: row.thumbnail || '',
    brochure_url: row.brochure_url || '',
    specs,
    features,
    applications,
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
