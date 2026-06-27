'use client';

import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { t, SERVICE_OPTIONS } from '@/constants/translations';
import { FieldError, ErrorToast, FirebaseConfigWarning } from '@/components/ui/ErrorIndicator';
import { submitInquiry } from '@/services/enquiryService';
import type { InquiryFormData, FormErrors, SubmitStatus } from '@/types';
import { Phone, MapPin, MessageCircle, Send, Loader2 } from 'lucide-react';

const EMPTY_FORM: InquiryFormData = { name: '', phone: '', email: '', service: '', message: '' };

export default function Contact() {
  const { lang, tx } = useLanguage();
  const [form, setForm]             = useState<InquiryFormData>(EMPTY_FORM);
  const [errors, setErrors]         = useState<FormErrors>({});
  const [status, setStatus]         = useState<SubmitStatus>('idle');
  const [showFbWarning, setFbWarn]  = useState(false);

  const infoRef = useScrollReveal();
  const formRef = useScrollReveal();

  /* ── Validation ── */
  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = tx(t.contact.errName);
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) e.phone = tx(t.contact.errPhone);
    if (!form.service) e.service = tx(t.contact.errService);
    return e;
  }, [form, tx]);

  /* ── Field change ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    // Clear the error for this field on change
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => { const next = { ...prev }; delete next[id as keyof FormErrors]; return next; });
    }
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    const result = await submitInquiry({
      ...form,
      language: lang,
      source: 'website',
      status: 'new',
      userAgent: navigator.userAgent,
    });

    if (result.success) {
      setStatus('success');
      setForm(EMPTY_FORM);
    } else {
      setStatus('error');
      // Check if it's a config error
      if (result.error.includes('Supabase not configured') || result.error.includes('YOUR_PROJECT_ID')) {
        setFbWarn(true);
        // Still show success for demo purposes when Firebase isn't configured
        setStatus('success');
        setForm(EMPTY_FORM);
      } else {
        setErrors({ submit: tx(t.contact.errSubmit) });
      }
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `input-field ${errors[field] ? 'error' : ''}`;

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-bold
            uppercase tracking-widest rounded-full mb-3">
            {tx(t.contact.badge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-rajdhani text-gray-900 mb-2">
            {tx(t.contact.title)}{' '}
            <span className="text-primary">{tx(t.contact.titleHL)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Info ── */}
          <div ref={infoRef} className="scroll-reveal">
            <p className="text-gray-500 leading-relaxed mb-8">{tx(t.contact.desc)}</p>

            <div className="space-y-3 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100
                hover:border-primary/20 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center
                  text-white flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{tx(t.contact.addrLabel)}</div>
                  <div className="font-semibold text-gray-800 text-sm">
                    Khairagarh Road, Thelkadih, Rajnandgaon, Chhattisgarh
                  </div>
                </div>
              </div>

              {/* Phone 1 */}
              <a href="tel:9425245291"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100
                  hover:border-primary/30 hover:bg-primary-50/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{tx(t.contact.phone1Label)}</div>
                  <div className="font-semibold text-gray-800">+91 9425245291</div>
                </div>
              </a>

              {/* Phone 2 */}
              <a href="tel:9479244691"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100
                  hover:border-primary/30 hover:bg-primary-50/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{tx(t.contact.phone2Label)}</div>
                  <div className="font-semibold text-gray-800">+91 9479244691</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/919425245291" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100
                  hover:border-green-300 hover:bg-green-50/40 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-whatsapp flex items-center justify-center text-white flex-shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{tx(t.contact.waLabel)}</div>
                  <div className="font-semibold text-gray-800">{tx(t.contact.waText)}</div>
                </div>
              </a>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.26555193952!2d81.03061757519967!3d21.236625480464673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a296900377961ad%3A0x290f7a5e51655cea!2sPiyush%20Agro%20Industries%20pvt%20LTD!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Piyush Agro Industries Location"
              />
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div ref={formRef} className="scroll-reveal delay-200">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-7 shadow-card">
              <h3 className="text-xl font-bold font-rajdhani text-gray-900 mb-1">
                {tx(t.contact.formTitle)}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{tx(t.contact.formSub)}</p>

              {/* Submit error */}
              {errors.submit && (
                <div className="mb-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200
                  rounded-xl animate-bounce-in" role="alert">
                  <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
                  <p className="text-sm text-red-700 font-medium">{errors.submit}</p>
                </div>
              )}

              {/* Success message */}
              {status === 'success' && (
                <div className="mb-4 flex items-start gap-3 p-4 bg-green-50 border border-green-200
                  rounded-xl animate-bounce-in" role="status">
                  <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                  <p className="text-sm text-green-700 font-medium">{tx(t.contact.successMsg)}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4 mb-1">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {tx(t.contact.nameLabel)}
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={tx(t.contact.namePH)}
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                    <FieldError message={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {tx(t.contact.phoneLabel)}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={tx(t.contact.phonePH)}
                      className={inputClass('phone')}
                      autoComplete="tel"
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {tx(t.contact.emailLabel)}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={tx(t.contact.emailPH)}
                    className="input-field"
                    autoComplete="email"
                  />
                </div>

                {/* Service */}
                <div className="mb-4">
                  <label htmlFor="service" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {tx(t.contact.serviceLabel)}
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass('service')}
                  >
                    <option value="">{tx(t.contact.servicePH)}</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <FieldError message={errors.service} />
                </div>

                {/* Message */}
                <div className="mb-5">
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {tx(t.contact.msgLabel)}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={tx(t.contact.msgPH)}
                    className="input-field resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                    bg-gradient-primary text-white font-bold font-rajdhani text-base
                    shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5 transition-all duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> {tx(t.contact.sending)}</>
                  ) : (
                    <><Send size={16} /> {tx(t.contact.submitBtn)}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase config warning (dev only) */}
      <FirebaseConfigWarning show={showFbWarning} />
    </section>
  );
}
