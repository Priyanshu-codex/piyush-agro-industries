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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Orders & Enquiries</h1>
        <p className="text-sm text-gray-500">View and manage customer requests</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <Loader2 className="animate-spin h-6 w-6 text-primary mx-auto" />
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4">
                      <div>{item.phone}</div>
                      {item.email && <div className="text-xs flex items-center gap-1"><Mail size={12}/>{item.email}</div>}
                    </td>
                    <td className="px-6 py-4">{item.product_interest || 'General'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${item.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
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
