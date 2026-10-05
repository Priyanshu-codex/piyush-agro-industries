import { createClient } from '@/supabase/client';

export async function saveInquiryDb(mappedData: any) {
  const supabase = createClient();
  // Do NOT append .select() here because anonymous/public users only have INSERT permissions
  // on public.inquiries under Postgres RLS. Calling .select() causes a 401 RLS policy violation.
  return await supabase.from('inquiries').insert([mappedData]);
}
