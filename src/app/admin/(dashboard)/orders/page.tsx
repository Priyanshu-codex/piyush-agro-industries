'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { Loader2, Mail, Trash2, CheckCircle2, Phone, Clock, MessageSquare, ChevronDown } from 'lucide-react';

export default function AdminOrdersPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setInquiries(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const supabase = createClient();
    const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    if (error) {
      alert('Failed to update status: ' + error.message);
    } else {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
    setUpdatingId(null);
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return;
    setUpdatingId(id);
    const supabase = createClient();
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) {
      alert('Failed to delete enquiry: ' + error.message);
    } else {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
    setUpdatingId(null);
  };

  const filteredInquiries = inquiries.filter((item) => {
    if (filter === 'all') return true;
    return (item.status || 'new') === filter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-rajdhani tracking-tight">Orders & Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">View, track, and manage customer requests and quote enquiries.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start md:self-auto">
          {(['all', 'new', 'contacted', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Product / Service</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Requirement / Message</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-primary/60 mx-auto" />
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No enquiries found under &quot;{filter}&quot; filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <a href={`tel:${item.phone}`} className="text-slate-700 font-medium text-xs hover:text-primary transition-colors flex items-center gap-1 mt-0.5">
                        <Phone size={12} className="text-slate-400" />
                        {item.phone}
                      </a>
                      {item.email && (
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Mail size={12} className="text-slate-400" />
                          {item.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
                        {item.service || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-slate-600 line-clamp-2" title={item.message || 'No additional message'}>
                        {item.message || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select
                          value={item.status || 'new'}
                          disabled={updatingId === item.id}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className={`text-xs rounded-full font-semibold px-3 py-1 border transition-all cursor-pointer ${
                            item.status === 'completed'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : item.status === 'contacted'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => deleteInquiry(item.id)}
                        disabled={updatingId === item.id}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
