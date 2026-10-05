import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Minimal in-memory rate limiting: max 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60_000 });
    return true;
  }
  if (record.count >= 10) {
    return false;
  }
  record.count += 1;
  return true;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 300_000);
}

// Simple email sender via HTTP (Resend or webhook) if configured
async function sendEmailNotification(payload: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  quantity?: string | number;
  company?: string;
  message?: string;
  date: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.QUOTE_RECEIVER_EMAIL || process.env.ADMIN_EMAIL || 'piyushagroindustries2016@gmail.com';
  const senderEmail = process.env.SMTP_FROM || 'quotes@piyushagroindustries.in';

  if (!resendApiKey) {
    console.log('[Quote API] No email service key (RESEND_API_KEY) configured. Notification skipped; quote saved in database.');
    return;
  }

  try {
    console.log('[Quote API] Email send started to:', receiverEmail);
    const textBody = `
New Quote Request - Piyush Agro Industries
=========================================
Customer Name: ${payload.name}
Phone:         ${payload.phone}
Email:         ${payload.email || 'N/A'}
Company:       ${payload.company || 'N/A'}
Product:       ${payload.service || 'General Enquiry'}
Quantity:      ${payload.quantity || '1'}
Requirement:   ${payload.message || 'N/A'}
Date/Time:     ${payload.date}
=========================================
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [receiverEmail],
        subject: `New Quote Request: ${payload.service || 'Product'} from ${payload.name}`,
        text: textBody,
      }),
    });

    if (response.ok) {
      console.log('[Quote API] Email send succeeded');
    } else {
      const errText = await response.text();
      console.warn('[Quote API] Email send failed (non-blocking):', response.status, errText);
    }
  } catch (err: any) {
    console.warn('[Quote API] Email send error (non-blocking):', err?.message || err);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    console.log('[Quote API] Quote request received');

    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      console.warn('[Quote API] Rate limit exceeded for IP:', ip);
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // 2. Body Parsing
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    const {
      name,
      phone,
      email,
      service,
      company,
      quantity,
      message,
      language = 'en',
      source = 'get_quote_modal',
      userAgent = '',
      hp_field, // Honeypot field
    } = body;

    // 3. Anti-Spam Honeypot Check
    if (hp_field) {
      console.warn('[Quote API] Honeypot triggered by bot submission.');
      return NextResponse.json(
        { success: false, error: 'Malformed submission rejected.' },
        { status: 400 }
      );
    }

    // 4. Safe Server-Side Validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid name (at least 2 characters).' },
        { status: 400 }
      );
    }

    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number (at least 10 digits).' },
        { status: 400 }
      );
    }

    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 100) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid email address.' },
          { status: 400 }
        );
      }
    }

    const trimmedCompany = typeof company === 'string' ? company.trim().slice(0, 100) : '';
    const trimmedService = typeof service === 'string' ? service.trim().slice(0, 200) : 'General Enquiry';
    const trimmedMessage = typeof message === 'string' ? message.trim().slice(0, 2000) : '';

    let parsedQuantity = '1';
    if (quantity !== undefined && quantity !== null && quantity !== '') {
      const qNum = parseInt(String(quantity), 10);
      if (isNaN(qNum) || qNum < 1) {
        return NextResponse.json(
          { success: false, error: 'Quantity must be at least 1.' },
          { status: 400 }
        );
      }
      parsedQuantity = String(qNum);
    }

    console.log('[Quote API] Quote validation passed for:', trimmedName);

    // 5. Database Connection & Record Creation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || supabaseUrl === 'your-supabase-url' || !supabaseKey) {
      console.error('[Quote API] Supabase environment variables missing on server.');
      return NextResponse.json(
        { success: false, error: 'Database service is temporarily unavailable. Please call us directly.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Preserve full requirements string in message
    const fullMessage = trimmedMessage.includes('Quantity:') 
      ? trimmedMessage 
      : `Quantity: ${parsedQuantity}${trimmedCompany ? ` | Company: ${trimmedCompany}` : ''}${trimmedMessage ? ` | Message: ${trimmedMessage}` : ''}`;

    const mappedData = {
      id,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail || null,
      service: trimmedService,
      message: fullMessage,
      status: 'new',
      language: language === 'hi' ? 'hi' : 'en',
      source: source || 'get_quote_modal',
      user_agent: userAgent || req.headers.get('user-agent') || 'Server API',
      created_at: createdAt,
    };

    // Note: Do NOT append .select() here because anonymous/public users do not have SELECT
    // permissions on the inquiries table due to Postgres RLS policies (INSERT-only is allowed).
    const { error: dbError } = await supabase.from('inquiries').insert([mappedData]);

    if (dbError) {
      console.error('[Quote API] Database insert failed:', dbError.message);
      return NextResponse.json(
        { success: false, error: 'Failed to record your quote request. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    console.log('[Quote API] Database record created successfully with ID:', id);

    // 6. Optional Email Notification Dispatch (asynchronous & non-blocking)
    sendEmailNotification({
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      service: trimmedService,
      quantity: parsedQuantity,
      company: trimmedCompany,
      message: trimmedMessage,
      date: createdAt,
    }).catch((err) => {
      console.warn('[Quote API] Background email error:', err);
    });

    // 7. Successful Response
    return NextResponse.json(
      {
        success: true,
        message: 'Quote request submitted successfully.',
        id,
      },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    console.error('[Quote API] Unexpected server error:', err?.message || err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
