import { saveInquiryDb } from '@/repositories/enquiryRepository';
import type { InquiryDocument } from '@/types';

export async function submitInquiry(
  data: Omit<InquiryDocument, 'createdAt'>
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    const mappedData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message,
      status: data.status || 'new',
      language: data.language,
      source: data.source,
      user_agent: data.userAgent,
      created_at: new Date().toISOString(),
    };

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url') {
      return {
        success: false,
        error: 'Supabase not configured. Add your credentials in .env',
      };
    }

    const { data: inserted, error } = await saveInquiryDb(mappedData);

    if (error) throw error;
    if (!inserted || inserted.length === 0) throw new Error('No data returned from insert');

    return { success: true, id: inserted[0].id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    return { success: false, error: message };
  }
}
