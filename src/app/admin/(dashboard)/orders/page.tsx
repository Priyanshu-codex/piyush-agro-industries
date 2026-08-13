'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { Loader2, Mail } from 'lucide-react';

export default function AdminOrdersPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (data) setInquiries(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-rajdhani tracking-tight">Orders & Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">View and manage customer requests and inquiries.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Name</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Contact</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Product</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-primary/60 mx-auto" />
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800 font-medium">{item.phone}</div>
                      {item.email && <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1"><Mail size={12}/>{item.email}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
                        {item.service || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-medium border ${item.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                        {item.status || 'new'}
                      </span>
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
