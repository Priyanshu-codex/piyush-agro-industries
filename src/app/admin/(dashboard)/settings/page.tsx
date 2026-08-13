'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { Loader2 } from 'lucide-react';
import type { ContactSettings, GeneralSettings } from '@/types';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [general, setGeneral] = useState<GeneralSettings | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from('settings').select('*');
      
      const defaultContact = { phone1: '', phone2: '', whatsapp: '', email: '', address: { en: '', hi: '' } } as any;
      const defaultGeneral = { siteName: 'Piyush Agro Industries', logoText: 'Piyush Agro' } as any;

      if (data && !error) {
        setContact(data.find(r => r.id === 'contact')?.data || defaultContact);
        setGeneral(data.find(r => r.id === 'general')?.data || defaultGeneral);
      } else {
        setContact(defaultContact);
        setGeneral(defaultGeneral);
      }
      setLoading(false);
    }
    load();
  }, []);

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    try {
      if (contact) {
        await supabase.from('settings').upsert({ id: 'contact', data: contact });
      }
      if (general) {
        await supabase.from('settings').upsert({ id: 'general', data: general });
      }
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !contact || !general) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Application Settings</h1>
        <p className="text-sm text-gray-500">Configure public-facing company details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <form className="space-y-6" onSubmit={saveSettings}>
          <h2 className="text-lg font-semibold border-b pb-2">General Settings</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input suppressHydrationWarning type="text" value={general.siteName} onChange={e => setGeneral({...general, siteName: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo Text</label>
              <input suppressHydrationWarning type="text" value={general.logoText} onChange={e => setGeneral({...general, logoText: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
          </div>

          <h2 className="text-lg font-semibold border-b pb-2 mt-8">Contact Settings</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
              <input suppressHydrationWarning type="text" value={contact.phone1} onChange={e => setContact({...contact, phone1: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Secondary Phone</label>
              <input suppressHydrationWarning type="text" value={contact.phone2} onChange={e => setContact({...contact, phone2: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input suppressHydrationWarning type="text" value={contact.whatsapp} onChange={e => setContact({...contact, whatsapp: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input suppressHydrationWarning type="email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address (English)</label>
            <textarea value={contact.address?.en || ''} onChange={e => setContact({...contact, address: { ...contact.address, en: e.target.value, hi: contact.address.hi }})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3} />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button suppressHydrationWarning type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm flex items-center gap-2">
              {saving && <Loader2 className="animate-spin h-4 w-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
