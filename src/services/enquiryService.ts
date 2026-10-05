import { saveInquiryDb } from '@/repositories/enquiryRepository';
import type { InquiryDocument } from '@/types';

export async function submitInquiry(
  data: Omit<InquiryDocument, 'createdAt'> & { quantity?: string; company?: string; hp_field?: string }
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  // 1. Try calling the backend /api/quote route if running in the browser
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        return { success: true, id: result.id };
      }

      // Return server-provided validation/rate-limit error message if available
      if (response.status === 400 || response.status === 429) {
        return { success: false, error: result?.error || 'Invalid request' };
      }

      // If server returned 404 or other 500 error, fall through to direct DB insert
      console.warn('[submitInquiry] /api/quote returned status', response.status, '- attempting direct DB fallback');
    } catch (fetchErr) {
      console.warn('[submitInquiry] /api/quote fetch failed, attempting direct DB fallback:', fetchErr);
    }
  }

  // 2. Direct database submission fallback
  try {
    const generatedId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `inq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const mappedData = {
      id: generatedId,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      message: data.message,
      status: data.status || 'new',
      language: data.language,
      source: data.source,
      user_agent: data.userAgent || (typeof window !== 'undefined' ? navigator.userAgent : 'Server'),
      created_at: new Date().toISOString(),
    };

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url') {
      return {
        success: false,
        error: 'Database not configured. Add your credentials in .env',
      };
    }

    const { error } = await saveInquiryDb(mappedData);

    if (error) {
      console.error('[submitInquiry] Direct DB insert error:', error.message);
      throw error;
    }

    return { success: true, id: generatedId };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    return { success: false, error: message };
  }
}
