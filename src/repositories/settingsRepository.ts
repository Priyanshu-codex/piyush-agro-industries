import { createClient } from '@/supabase/client';

export function subscribeSettingsDb(docId: 'homepage' | 'contact' | 'general', callback: (data: any) => void) {
  const supabase = createClient();
  
  supabase
    .from('settings')
    .select('data')
    .eq('id', docId)
    .single()
    .then(({ data }) => {
      if (data) callback(data.data);
    });

  const channel = supabase
    .channel(`settings_${docId}_changes_${Math.random()}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'settings', filter: `id=eq.${docId}` },
      async () => {
        const { data } = await supabase.from('settings').select('data').eq('id', docId).single();
        if (data) callback(data.data);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function saveSettingsDb(docId: 'homepage' | 'contact' | 'general', data: any) {
  const supabase = createClient();
  return await supabase.from('settings').upsert({ id: docId, data });
}
