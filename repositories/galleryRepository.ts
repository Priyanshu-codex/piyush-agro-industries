import { createClient } from '@/supabase/client';
import type { GalleryItem } from '@/types';

function mapDbToGallery(row: any): GalleryItem {
  let label = { en: '', hi: '' };
  if (typeof row.label === 'string' && row.label.startsWith('{')) {
    try {
      label = JSON.parse(row.label);
    } catch (e) {}
  } else if (row.label && typeof row.label === 'object') {
    label = row.label;
  }

  return {
    id: row.id,
    imageUrl: row.image_url,
    label,
    category: row.category || 'hydraulic',
    icon: row.icon || 'âš™ï¸',
    gradient: row.gradient || 'from-[#0d6471] to-[#0e9aad]',
    displayOrder: row.display_order || 10,
    status: row.status || 'active',
  };
}

export function subscribeGalleryDb(callback: (galleryItems: GalleryItem[]) => void) {
  const supabase = createClient();

  supabase
    .from('gallery')
    .select('id, image_url, label, category, icon, gradient, display_order, status')
    .then(({ data }) => {
      if (data) callback(data.map(mapDbToGallery));
    });

  const channel = supabase
    .channel(`gallery_changes_${Math.random()}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'gallery' },
      async () => {
        const { data } = await supabase.from('gallery').select('id, image_url, label, category, icon, gradient, display_order, status');
        if (data) callback(data.map(mapDbToGallery));
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function saveGalleryItemDb(id: string, data: any) {
  const supabase = createClient();

  const dbRow: any = {
    image_url: data.imageUrl || '',
    label: typeof data.label === 'string' ? { en: data.label, hi: data.label } : data.label,
    category: data.category || 'hydraulic',
    icon: data.icon,
    gradient: data.gradient,
    display_order: Number(data.displayOrder) || 0,
    status: data.status || 'active',
  };

  if (id && id.length > 10) {
    // Has a valid UUID id
    dbRow.id = id;
    const { data: res, error } = await supabase.from('gallery').upsert(dbRow).select();
    if (error) throw error;
    return res;
  } else {
    // New item
    const { data: res, error } = await supabase.from('gallery').insert([dbRow]).select();
    if (error) throw error;
    return res;
  }
}

export async function deleteGalleryItemDb(id: string) {
  const supabase = createClient();
  return await supabase.from('gallery').delete().eq('id', id);
}
