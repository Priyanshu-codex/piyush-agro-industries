'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminProfilePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setMessage({ type: 'error', text: 'Please enter a new password to update.' });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update password' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Admin Profile</h1>
        <p className="text-sm text-gray-500">Manage your administrator account credentials</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{email || 'Administrator'}</h2>
            <p className="text-sm text-slate-500">Authorized Administrator</p>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center gap-2 mb-6 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 size={18} className="shrink-0" />
            ) : (
              <AlertCircle size={18} className="shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                suppressHydrationWarning
                type="email"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2.5 border text-gray-700 cursor-not-allowed"
                value={email || 'Administrator'}
              />
              <p className="mt-1 text-xs text-gray-500">Managed via Supabase Auth</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                suppressHydrationWarning
                type="password"
                placeholder="Enter new password (min. 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-50 p-2.5 border"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              suppressHydrationWarning
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm flex items-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
