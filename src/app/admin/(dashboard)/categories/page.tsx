'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    slug: '',
    nameEn: '',
    nameHi: '',
    icon: '',
    gradient: 'from-[#065F2E] to-[#0B7A3B]',
    status: 'active',
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
    if (data) setCategories(data);
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

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ slug: '', nameEn: '', nameHi: '', icon: '🔧', gradient: 'from-[#065F2E] to-[#0B7A3B]', status: 'active' });
    setShowModal(true);
  };

  const openEditModal = (cat: any) => {
    setEditingId(cat.slug);
    let nameObj = typeof cat.name === 'string' ? JSON.parse(cat.name) : (cat.name || {});
    setFormData({
      slug: cat.slug,
      nameEn: nameObj.en || '',
      nameHi: nameObj.hi || '',
      icon: cat.icon || '',
      gradient: cat.gradient || '',
      status: cat.status || 'active',
    });
    setShowModal(true);
  };

  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const supabase = createClient();

    const payload = {
      slug: formData.slug || formData.nameEn.toLowerCase().replace(/\s+/g, '-'),
      name: JSON.stringify({ en: formData.nameEn, hi: formData.nameHi }),
      icon: formData.icon,
      gradient: formData.gradient,
      status: formData.status,
      display_order: categories.length + 1
    };

    if (editingId) {
      await supabase.from('categories').update(payload).eq('slug', editingId);
    } else {
      await supabase.from('categories').insert([payload]);
    }

    setShowModal(false);
    setFormLoading(false);
    loadData();
  };

  const deleteCategory = async (slug: string) => {
    if (confirm('Are you sure you want to delete this category? Make sure no products are using it.')) {
      const supabase = createClient();
      await supabase.from('categories').delete().eq('slug', slug);
      loadData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-rajdhani tracking-tight">Categories</h1>
          <p className="text-sm text-slate-500 mt-1">Organize your products into categories.</p>
        </div>
        <button suppressHydrationWarning onClick={openAddModal} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md transition-all">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap w-16">Icon</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Name</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap hidden sm:table-cell">Slug</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto h-8 w-8 text-primary/60" /></td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No categories found. Add one to get started.</td></tr>
              ) : categories.map((c) => (
                <tr key={c.slug} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-2xl">{c.icon}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{getTitle(c.name)}</td>
                  <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{c.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-medium border ${c.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button suppressHydrationWarning onClick={() => openEditModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Category"><Edit2 size={16} /></button>
                      <button suppressHydrationWarning onClick={() => deleteCategory(c.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Category"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
              <button suppressHydrationWarning type="button" onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={saveCategory} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (English) <span className="text-red-500">*</span></label>
                <input suppressHydrationWarning required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="e.g. Tractors" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (Hindi) <span className="text-red-500">*</span></label>
                <input suppressHydrationWarning required value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-hindi" placeholder="उदा. ट्रैक्टर" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Emoji Icon</label>
                  <input suppressHydrationWarning value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center" placeholder="🚜" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                  <select suppressHydrationWarning value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white appearance-none">
                    <option value="active">Active</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button suppressHydrationWarning type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 font-medium border border-slate-300 rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors">Cancel</button>
                <button suppressHydrationWarning type="submit" disabled={formLoading} className="px-5 py-2.5 font-medium bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {formLoading ? <Loader2 className="animate-spin h-5 w-5" /> : null}
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
