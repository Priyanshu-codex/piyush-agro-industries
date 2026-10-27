'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/constants/translations';
import { submitInquiry } from '@/services/enquiryService'; // Updated path to service
import type { InquiryFormData, FormErrors, SubmitStatus } from '@/types';
import { X, Phone, MessageCircle, Send, Loader2, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export interface OpenEnquiryOptions {
  isVehicleService?: boolean;
  vehicleModel?: string;
  serviceRequirement?: string;
}

interface EnquiryContextValue {
  openEnquiry: (productName: string, options?: OpenEnquiryOptions) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const { lang, tx } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVehicleMode, setIsVehicleMode] = useState(false);
  const [productName, setProductName] = useState('');
  
  const EMPTY_FORM = {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    company: '',
    quantity: '1',
    vehicleModel: '',
    regNumber: '',
    serviceRequirement: 'Commercial vehicle servicing and maintenance',
    preferredDate: '',
  };
  
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const openEnquiry = useCallback((prodName: string, options?: OpenEnquiryOptions) => {
    const isVehicle = options?.isVehicleService || 
      prodName.toLowerCase().includes('sml') || 
      prodName.toLowerCase().includes('vehicle service');
    
    setIsVehicleMode(Boolean(isVehicle));
    setProductName(prodName);
    setForm({
      ...EMPTY_FORM,
      service: prodName,
      vehicleModel: options?.vehicleModel || (prodName.includes('Truck') ? 'SML Samrat GS Series' : prodName.includes('Bus') ? 'SML S7 School & Passenger Bus' : ''),
      serviceRequirement: options?.serviceRequirement || 'Commercial vehicle servicing and maintenance',
    });
    setErrors({});
    setStatus('idle');
    setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = (): Record<string, string | undefined> => {
    const errs: Record<string, string | undefined> = {};
    if (!form.name.trim()) errs.name = lang === 'en' ? 'Customer / Owner name is required' : 'ग्राहक / मालिक का नाम आवश्यक है';
    
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      errs.phone = lang === 'en' ? 'Valid phone number is required (10+ digits)' : 'वैध 10 अंकों का फोन नंबर आवश्यक है';
    }
    
    if (isVehicleMode) {
      if (!form.vehicleModel.trim()) {
        errs.vehicleModel = lang === 'en' ? 'Vehicle model is required' : 'वाहन मॉडल आवश्यक है';
      }
      if (!form.serviceRequirement) {
        errs.serviceRequirement = lang === 'en' ? 'Service requirement is required' : 'सर्विस आवश्यकता आवश्यक है';
      }
    } else {
      const qty = parseInt(form.quantity);
      if (isNaN(qty) || qty < 1) {
        errs.quantity = lang === 'en' ? 'Quantity must be at least 1' : 'मात्रा कम से कम 1 होनी चाहिए';
      }
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    const msg = isVehicleMode
      ? `Vehicle Model: ${form.vehicleModel.trim()} | Reg No: ${form.regNumber.trim() || 'N/A'} | Service Requirement: ${form.serviceRequirement} | Preferred Appointment Date: ${form.preferredDate || 'Flexible'}${form.message.trim() ? ` | Problem Notes: ${form.message.trim()}` : ''}`
      : `Quantity: ${form.quantity} | Company: ${form.company || 'N/A'} | Message: ${form.message}`;

    const result = await submitInquiry({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: isVehicleMode ? (form.service || 'SML Mahindra Commercial Vehicle Service') : form.service,
      company: form.company,
      quantity: form.quantity,
      message: msg,
      language: lang,
      source: isVehicleMode ? 'sml_service_modal' : 'get_quote_modal',
      status: 'new',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    } as any);

    if (result.success) {
      setStatus('success');
      setForm(EMPTY_FORM);
    } else {
      setStatus('error');
      setErrors({ submit: result.error || tx(t.contact.errSubmit) });
    }
  };

  // Min date for appointment picker: today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={closeEnquiry}
        >
          <div 
            className={`bg-white rounded-2xl sm:rounded-3xl w-[96%] sm:w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up flex flex-col relative border border-gray-100 ${
              isVehicleMode ? 'scrollbar-vehicle' : 'scrollbar-primary'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── MODAL HEADER ── */}
            <div className={`p-4 sm:p-5 text-white relative shrink-0 ${isVehicleMode ? 'bg-[#E31837]' : 'bg-gradient-primary'}`}>
              <button 
                onClick={closeEnquiry}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {isVehicleMode ? (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/20 text-white text-[10px] uppercase font-bold tracking-wider rounded-md mb-2 font-rajdhani">
                    <span>SML MAHINDRA SUPPORT</span>
                  </div>
                  <h3 className="font-bold font-rajdhani text-2xl leading-none">
                    {tx(t.sml.modalTitle)}
                  </h3>
                  <p className="text-white/90 text-xs mt-1.5 leading-snug">
                    {tx(t.sml.modalSub)}
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/25 text-white text-[9px] uppercase font-bold tracking-wider rounded-md mb-2">
                    <Sparkles size={10} />
                    {lang === 'en' ? 'Get Instant Quotation' : 'तुरंत कोटेशन प्राप्त करें'}
                  </div>
                  <h3 className="font-bold font-rajdhani text-2xl leading-none">
                    {lang === 'en' ? 'Request a Quote' : 'कोटेशन का अनुरोध करें'}
                  </h3>
                  {productName && (
                    <p className="text-white/90 text-sm font-semibold mt-2 bg-white/10 px-3 py-1 rounded-lg inline-block">
                      {productName}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* ── MODAL CONTENT ── */}
            <div className="p-4 sm:p-5 flex-1">
              {status === 'success' ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-100">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg font-rajdhani">
                      {isVehicleMode ? tx(t.sml.bookingSuccess) : (lang === 'en' ? 'Request Submitted Successfully!' : 'अनुरोध सफलतापूर्वक सबमिट हुआ!')}
                    </h4>
                    <p className="text-gray-500 text-xs mt-2 px-4 leading-relaxed">
                      {isVehicleMode ? tx(t.sml.bookingSuccessMsg) : tx(t.contact.successMsg)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeEnquiry}
                    className={`px-6 py-2.5 text-white font-bold text-xs rounded-xl transition-all shadow-md ${
                      isVehicleMode ? 'bg-[#E31837] hover:bg-[#C8102E]' : 'bg-gradient-primary'
                    }`}
                  >
                    {lang === 'en' ? 'Close Window' : 'खिड़की बंद करें'}
                  </button>
                </div>
              ) : isVehicleMode ? (
                /* ── VEHICLE SERVICING BOOKING FORM ── */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errors.submit && (
                    <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-700 text-[11px] sm:text-xs rounded-xl flex items-start gap-2">
                      <span className="font-bold">⚠️</span>
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {tx(t.sml.nameLabel)}
                    </label>
                    <input
                      type="text"
                      placeholder={tx(t.contact.namePH)}
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none transition-all ${
                        errors.name ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      {tx(t.sml.phoneLabel)}
                    </label>
                    <input
                      type="tel"
                      placeholder={tx(t.contact.phonePH)}
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none transition-all ${
                        errors.phone ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                  </div>

                  {/* Vehicle Model & Registration Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        {tx(t.sml.modelLabel)}
                      </label>
                      <input
                        type="text"
                        list="sml-models-list"
                        placeholder={tx(t.sml.modelPH)}
                        value={form.vehicleModel}
                        onChange={(e) => {
                          setForm({ ...form, vehicleModel: e.target.value });
                          if (errors.vehicleModel) setErrors({ ...errors, vehicleModel: undefined });
                        }}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none transition-all ${
                          errors.vehicleModel ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                        }`}
                      />
                      <datalist id="sml-models-list">
                        <option value="SML Samrat GS (Commercial Truck)" />
                        <option value="SML S7 School Bus" />
                        <option value="SML S7 Passenger / Staff Bus" />
                        <option value="SML Sartaj GS Series" />
                        <option value="SML Supreme Commercial Vehicle" />
                        <option value="Other Commercial Vehicle" />
                      </datalist>
                      {errors.vehicleModel && <span className="text-[10px] text-red-500 mt-1 block">{errors.vehicleModel}</span>}
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        {tx(t.sml.regLabel)}
                      </label>
                      <input
                        type="text"
                        placeholder={tx(t.sml.regPH)}
                        value={form.regNumber}
                        onChange={(e) => setForm({ ...form, regNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none transition-all uppercase"
                      />
                    </div>
                  </div>

                  {/* Service Requirement */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      {tx(t.sml.reqLabel)}
                    </label>
                    <select
                      value={form.serviceRequirement}
                      onChange={(e) => setForm({ ...form, serviceRequirement: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none transition-all"
                    >
                      <option value="Commercial vehicle servicing and maintenance">
                        {lang === 'en' ? 'Commercial vehicle servicing and maintenance' : 'कमर्शियल वाहन सर्विसिंग एवं रखरखाव'}
                      </option>
                      <option value="Vehicle inspection and troubleshooting">
                        {lang === 'en' ? 'Vehicle inspection and troubleshooting' : 'वाहन निरीक्षण एवं तकनीकी खराबी निवारण'}
                      </option>
                      <option value="Repairs and technical support">
                        {lang === 'en' ? 'Repairs and technical support' : 'मरम्मत एवं तकनीकी सहायता'}
                      </option>
                      <option value="Preventive maintenance and periodic servicing">
                        {lang === 'en' ? 'Preventive maintenance and periodic servicing' : 'निवारक रखरखाव एवं आवधिक सर्विसिंग'}
                      </option>
                      <option value="Spare-parts assistance, if available">
                        {lang === 'en' ? 'Spare-parts assistance, if available' : 'स्पेयर पार्ट्स सहायता (उपलब्धता अनुसार)'}
                      </option>
                    </select>
                  </div>

                  {/* Preferred Appointment Date */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      {tx(t.sml.dateLabel)}
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none transition-all"
                    />
                  </div>

                  {/* Notes / Message */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      {tx(t.sml.notesLabel)}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={lang === 'en' ? 'Mention any specific issue, noise, or service requirements...' : 'विशिष्ट समस्या, आवाज़, या सर्विस की आवश्यकता बताएं...'}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-200 focus:border-[#E31837] outline-none resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3 px-4 mt-2 rounded-xl bg-[#E31837] hover:bg-[#C8102E] text-white font-bold font-rajdhani text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-85 transition-all cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{tx(t.contact.sending)}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{tx(t.sml.submitBooking)}</span>
                      </>
                    )}
                  </button>

                  {/* Direct Contact Options */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                    <a 
                      href="tel:9425245291"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-200 text-gray-700 hover:text-[#E31837] text-[11px] font-bold transition-all text-center"
                    >
                      <Phone size={13} className="text-[#E31837] shrink-0" />
                      <span>{tx(t.sml.callBtn)} (+91 9425245291)</span>
                    </a>
                    <a 
                      href={`https://wa.me/919425245291?text=Hello,%20I%20am%20enquiring%20about%20SML%20Mahindra%20commercial%20vehicle%20servicing%20for%20${encodeURIComponent(form.vehicleModel || 'commercial vehicle')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-200 text-gray-700 hover:text-green-600 text-[11px] font-bold transition-all text-center"
                    >
                      <MessageCircle size={13} className="text-green-500 shrink-0" />
                      <span>WhatsApp Service Support</span>
                    </a>
                  </div>
                </form>
              ) : (
                /* ── REGULAR PRODUCT QUOTE FORM ── */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errors.submit && (
                    <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-700 text-[11px] sm:text-xs rounded-xl flex items-start gap-2">
                      <span className="font-bold">⚠️</span>
                      <span>{errors.submit}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                    </label>
                    <input
                      type="text"
                      placeholder={tx(t.contact.namePH)}
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                        errors.name ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      {lang === 'en' ? 'Phone Number *' : 'फोन नंबर *'}
                    </label>
                    <input
                      type="tel"
                      placeholder={tx(t.contact.phonePH)}
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                        errors.phone ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        {lang === 'en' ? 'Email (Optional)' : 'ईमेल (वैकल्पिक)'}
                      </label>
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        {lang === 'en' ? 'Company (Optional)' : 'कंपनी (वैकल्पिक)'}
                      </label>
                      <input
                        type="text"
                        placeholder="Agro Farms Ltd"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-2">
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        {lang === 'en' ? 'Product / Service' : 'उत्पाद / सेवा'}
                      </label>
                      <input
                        type="text"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        {lang === 'en' ? 'Quantity' : 'मात्रा'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={form.quantity}
                        onChange={(e) => {
                          setForm({ ...form, quantity: e.target.value });
                          if (errors.quantity) setErrors({ ...errors, quantity: undefined });
                        }}
                        className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                          errors.quantity ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-200'
                        }`}
                      />
                      {errors.quantity && <span className="text-[10px] text-red-500 mt-1 block">{errors.quantity}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      {lang === 'en' ? 'Describe Requirements' : 'आवश्यकताओं का विवरण'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={tx(t.contact.msgPH)}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-2.5 sm:py-3 px-4 mt-2 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-primary hover:shadow-primary-lg disabled:opacity-85 transition-all cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{tx(t.contact.sending)}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{tx(t.contact.submitBtn)}</span>
                      </>
                    )}
                  </button>

                  <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                    <a 
                      href={`tel:9425245291`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-200 text-gray-700 hover:text-primary text-[11px] font-bold transition-all text-center"
                    >
                      <Phone size={13} className="text-primary shrink-0" />
                      <span>Call +91 9425245291</span>
                    </a>
                    <a 
                      href={`https://wa.me/919425245291?text=Hello,%20I%20am%20interested%20in%20getting%20a%20quote%20for%20${encodeURIComponent(productName || 'your products')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-200 text-gray-700 hover:text-green-600 text-[11px] font-bold transition-all text-center"
                    >
                      <MessageCircle size={13} className="text-green-500 shrink-0" />
                      <span>WhatsApp Quote</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  }
  return ctx;
}
