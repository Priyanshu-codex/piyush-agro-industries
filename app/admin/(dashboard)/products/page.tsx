'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, X } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    slug: '',
    nameEn: '',
    nameHi: '',
    descEn: '',
    descHi: '',
    categoryId: '',
    status: 'active',
    featured: false,
    capacity: '',
    size: '',
    partName: '',
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();
    const { data: catData } = await supabase.from('categories').select('*');
    if (catData) setCategories(catData);

    const { data: prodData } = await supabase.from('products').select('*');
    if (prodData) setProducts(prodData);
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
    setFormData({
      slug: '', nameEn: '', nameHi: '', descEn: '', descHi: '',
      categoryId: categories[0]?.id || '', status: 'active', featured: false,
      capacity: '', size: '', partName: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product: any) => {
    setEditingId(product.slug);
    
    let nameObj = { en: '', hi: '' };
    try { nameObj = JSON.parse(product.product_name || '{}'); } catch(e) {}
    
    let descObj = { desc: { en: '', hi: '' }, specs: { capacity: '', size: '', nameOfPart: '' } };
    try { descObj = JSON.parse(product.description || '{}'); } catch(e) {}

    setFormData({
      slug: product.slug,
      nameEn: nameObj.en || '',
      nameHi: nameObj.hi || '',
      descEn: descObj.desc?.en || '',
      descHi: descObj.desc?.hi || '',
      categoryId: product.category_id || '',
      status: product.status || 'active',
      featured: product.featured || false,
      capacity: descObj.specs?.capacity || '',
      size: descObj.specs?.size || '',
      partName: descObj.specs?.nameOfPart || '',
    });
    setShowModal(true);
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const supabase = createClient();

    const payload = {
      slug: formData.slug || formData.nameEn.toLowerCase().replace(/\s+/g, '-'),
      product_name: JSON.stringify({ en: formData.nameEn, hi: formData.nameHi }),
      description: JSON.stringify({
        desc: { en: formData.descEn, hi: formData.descHi },
        specs: { capacity: formData.capacity, size: formData.size, nameOfPart: formData.partName },
        displayOrder: 10
      }),
      category_id: formData.categoryId,
      status: formData.status,
      featured: formData.featured,
      image_url: '[]' // Placeholders for images for now
    };

    if (editingId) {
      await supabase.from('products').update(payload).eq('slug', editingId);
    } else {
      await supabase.from('products').insert([payload]);
    }

    setShowModal(false);
    setFormLoading(false);
    loadData();
  };

  const deleteProduct = async (slug: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const supabase = createClient();
      await supabase.from('products').delete().eq('slug', slug);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-10 text-center"><Loader2 className="animate-spin mx-auto h-6 w-6" /></td></tr>
            ) : products.map((p) => (
              <tr key={p.slug} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{getTitle(p.product_name)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">{p.featured ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                    <button onClick={() => deleteProduct(p.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={saveProduct} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name (English)</label>
                  <input required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name (Hindi)</label>
                  <input required value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2">
                  <option value="">Select Category...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{getTitle(c.name)}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <input value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2">
                    <option value="active">Active</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="rounded text-primary" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Product (Shows on Homepage)</label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" disabled={formLoading} className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
                  {formLoading && <Loader2 className="animate-spin h-4 w-4" />}
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
