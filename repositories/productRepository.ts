import { createClient } from '@/supabase/client';
import type { Product } from '@/types';

function mapDbToProduct(row: any, categoriesList: any[]): Product {
  let title = typeof row.title === 'string' ? { en: row.title, hi: row.title } : (row.title || { en: '', hi: '' });
  if (typeof row.title === 'string' && row.title.startsWith('{')) {
    try {
      title = JSON.parse(row.title);
    } catch (e) {}
  }
  
  let desc = { en: '', hi: '' };
  if (typeof row.desc === 'string' && row.desc.startsWith('{')) {
    try {
      desc = JSON.parse(row.desc);
    } catch (e) {}
  } else if (row.desc && typeof row.desc === 'object') {
    desc = row.desc;
  } else {
    desc = { en: row.desc || '', hi: row.desc || '' };
  }

  let specs = { nameOfPart: '', capacity: '', size: '' };
  if (typeof row.specs === 'string' && row.specs.startsWith('{')) {
    try {
      specs = JSON.parse(row.specs);
    } catch (e) {}
  } else if (row.specs && typeof row.specs === 'object') {
    specs = row.specs;
  }

  let images: string[] = [];
  if (typeof row.images === 'string' && row.images.startsWith('[')) {
    try {
      images = JSON.parse(row.images);
    } catch (e) {}
  } else if (Array.isArray(row.images)) {
    images = row.images;
  }

  const matchingCat = categoriesList.find((c) => c.id === row.category_id);
  const categoryName = matchingCat ? matchingCat.name.en : '';

  return {
    id: row.slug,
    icon: row.icon || '🚜',
    gradient: row.gradient || 'from-[#065F2E] to-[#0B7A3B]',
    title,
    desc,
    category: categoryName,
    featured: row.featured,
    status: row.status,
    displayOrder: row.display_order || 10,
    images,
    specs,
  };
}

export function subscribeProductsDb(callback: (products: Product[]) => void) {
  const supabase = createClient();
  
  const triggerCallback = async () => {
    const { data: catData } = await supabase.from('categories').select('id, name, slug');
    const categoriesList = (catData || []).map((row) => {
      let name = typeof row.name === 'string' ? { en: row.name, hi: row.name } : (row.name || { en: '', hi: '' });
      if (typeof row.name === 'string' && row.name.startsWith('{')) {
        try { name = JSON.parse(row.name); } catch(e) {}
      }
      return { id: row.id, name, slug: row.slug };
    });

    const { data: prodData, error } = await supabase.from('products').select('slug, title, desc, icon, gradient, images, specs, category_id, featured, status, display_order');
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
  
  // 1. Fetch categories to map category name to category UUID
  const { data: catData } = await supabase.from('categories').select('id, name');
  const matchingCat = (catData || []).find((row) => {
    let name = typeof row.name === 'string' ? { en: row.name, hi: row.name } : (row.name || { en: '', hi: '' });
    if (typeof row.name === 'string' && row.name.startsWith('{')) {
      try { name = JSON.parse(row.name); } catch(e) {}
    }
    return name.en === data.category;
  });

  const categoryUUID = matchingCat ? matchingCat.id : null;

  // 2. Map frontend product format to Supabase columns
  const dbRow: any = {
    slug: id,
    title: typeof data.title === 'string' ? { en: data.title, hi: data.title } : data.title,
    desc: typeof data.desc === 'string' ? { en: data.desc, hi: data.desc } : data.desc,
    images: data.images || [],
    icon: data.icon,
    gradient: data.gradient,
    specs: data.specs,
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

export async function deleteProductDb(id: string) {
  const supabase = createClient();
  return await supabase.from('products').delete().eq('slug', id);
}
