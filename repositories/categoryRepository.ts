import { createClient } from '@/supabase/client';

function mapDbToCategory(row: any) {
  let icon = '🚜';
  let gradient = 'from-[#065F2E] to-[#0B7A3B]';
  let displayOrder = 10;
  
  if (typeof row.image_url === 'string' && row.image_url.startsWith('{')) {
    try {
      const parsed = JSON.parse(row.image_url);
      icon = parsed.icon || icon;
      gradient = parsed.gradient || gradient;
      displayOrder = parsed.displayOrder || displayOrder;
    } catch (e) {
      // fallback
    }
  } else if (row.image_url && typeof row.image_url === 'object') {
    icon = row.image_url.icon || icon;
    gradient = row.image_url.gradient || gradient;
    displayOrder = row.image_url.displayOrder || displayOrder;
  }

  let name = typeof row.name === 'string' ? { en: row.name, hi: row.name } : (row.name || { en: '', hi: '' });
  if (typeof row.name === 'string' && row.name.startsWith('{')) {
    try {
      name = JSON.parse(row.name);
    } catch (e) {
      // fallback
    }
  }

  return {
    id: row.slug,
    name,
    icon,
    gradient,
    displayOrder,
    status: row.status,
  };
}

function mapCategoryToDb(data: any) {
  return {
    slug: data.id,
    name: JSON.stringify(data.name),
    image_url: JSON.stringify({
      icon: data.icon,
      gradient: data.gradient,
      displayOrder: data.displayOrder,
    }),
    status: data.status,
  };
}


export function subscribeCategoriesDb(callback: (data: any[]) => void) {
  const supabase = createClient();
  
  supabase
    .from('categories')
    .select('id, slug, name, image_url, status')
    .then(({ data }) => {
      if (data) callback(data.map(mapDbToCategory));
    });

  const channel = supabase
    .channel(`categories_changes_${Math.random()}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'categories' },
      async () => {
        const { data } = await supabase.from('categories').select('id, slug, name, image_url, status');
        if (data) callback(data.map(mapDbToCategory));
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function saveCategoryDb(id: string, data: any) {
  const supabase = createClient();
  const dbRow = mapCategoryToDb({ ...data, id });
  // Upsert on slug column conflict
  const { data: res, error } = await supabase
    .from('categories')
    .upsert(dbRow, { onConflict: 'slug' })
    .select();
  if (error) throw error;
  return res;
}

export async function deleteCategoryDb(id: string) {
  const supabase = createClient();
  return await supabase.from('categories').delete().eq('slug', id);
}
