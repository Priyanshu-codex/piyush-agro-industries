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

  const getTitle = (nameStr: string) => {
    if (!nameStr) return 'Unnamed';
    if (nameStr.startsWith('{')) {
      try { return JSON.parse(nameStr).en; } catch(e) {}
    }
    return nameStr;
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ slug: '', nameEn: '', nameHi: '', icon: '🔧', gradient: 'from-[#065F2E] to-[#0B7A3B]', status: 'active' });
    setShowModal(true);
  };

  const openEditModal = (cat: any) => {
    setEditingId(cat.slug);
    let nameObj = { en: '', hi: '' };
    try { nameObj = JSON.parse(cat.name || '{}'); } catch(e) {}
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Categories</h1>
          <p className="text-sm text-gray-500">Manage product categories</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Icon</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center"><Loader2 className="animate-spin mx-auto h-6 w-6" /></td></tr>
            ) : categories.map((c) => (
              <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-xl">{c.icon}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{getTitle(c.name)}</td>
                <td className="px-6 py-4">{c.slug}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${c.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                    <button onClick={() => deleteCategory(c.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={saveCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name (English)</label>
                <input required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name (Hindi)</label>
                <input required value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emoji Icon</label>
                  <input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option value="active">Active</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
                <button type="submit" disabled={formLoading} className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
                  {formLoading && <Loader2 className="animate-spin h-4 w-4" />}
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
