import { createClient } from '@/supabase/client';

export async function saveInquiryDb(mappedData: any) {
  const supabase = createClient();
  return await supabase.from('inquiries').insert([mappedData]).select();
}
