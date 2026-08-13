'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();

    const { data: prodData } = await supabase.from('products').select('*').order('display_order', { ascending: true });
    if (prodData) setProducts(prodData);
    setLoading(false);
  }

  const getTitle = (nameStr: any) => {
    if (!nameStr) return 'Unnamed';
    if (typeof nameStr === 'object') return nameStr.en || 'Unnamed';
    if (typeof nameStr === 'string' && nameStr.startsWith('{')) {
      try { return JSON.parse(nameStr).en; } catch(e) {}
    }
    return String(nameStr);
  };

  const deleteProduct = async (slug: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const supabase = createClient();
      await supabase.from('products').delete().eq('slug', slug);
      loadData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-rajdhani tracking-tight">Products</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your product catalog and inventory.</p>
        </div>
        <Link href="/admin/products/create" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md transition-all">
          <Plus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Image</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Product Name</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Featured</th>
                <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto h-8 w-8 text-primary/60" /></td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No products found. Add a product to get started.</td></tr>
              ) : products.map((p) => (
                <tr key={p.slug} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    {p.thumbnail ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative border border-slate-200">
                        <Image src={p.thumbnail} alt="" fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {getTitle(p.title)}
                    <div className="text-xs text-slate-400 font-normal mt-0.5">{p.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-medium border ${p.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-medium border ${p.featured ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {p.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${p.slug}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Product"><Edit2 size={16} /></Link>
                      <button suppressHydrationWarning onClick={() => deleteProduct(p.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Product"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
