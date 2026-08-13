'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { saveProduct } from '@/services/productService';
import type { Product } from '@/types';
import { ImageUpload, MultiImageUpload, DocumentUpload } from './FileUpload';

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    slug: '',
    nameEn: '',
    nameHi: '',
    shortDescEn: '',
    shortDescHi: '',
    fullDescEn: '',
    fullDescHi: '',
    categoryId: '',
    categoryName: '',
    status: 'active',
    featured: false,
    displayOrder: 10,
    
    // Specs
    specs: {} as Record<string, string>,
    
    // Arrays
    featuresEn: [] as string[],
    featuresHi: [] as string[],
    applicationsEn: [] as string[],
    applicationsHi: [] as string[],
    
    // Media
    thumbnail: '',
    images: [] as string[],
    brochureUrl: '',
    
    // SEO
    seoTitle: '',
    seoDesc: '',
    seoKeywords: '',
  });

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCategories() {
    const supabase = createClient();
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
    
    if (initialData) {
      setFormData({
        slug: initialData.id,
        nameEn: initialData.title?.en || '',
        nameHi: initialData.title?.hi || '',
        shortDescEn: initialData.short_desc?.en || '',
        shortDescHi: initialData.short_desc?.hi || '',
        fullDescEn: initialData.full_desc?.en || '',
        fullDescHi: initialData.full_desc?.hi || '',
        categoryId: initialData.category_id || '',
        categoryName: initialData.category || '',
        status: initialData.status || 'active',
        featured: !!initialData.featured,
        displayOrder: initialData.displayOrder || 10,
        
        specs: initialData.specs || {},
        
        featuresEn: initialData.features?.map(f => f.en) || [],
        featuresHi: initialData.features?.map(f => f.hi) || [],
        applicationsEn: initialData.applications?.map(a => a.en) || [],
        applicationsHi: initialData.applications?.map(a => a.hi) || [],
        
        thumbnail: initialData.thumbnail || '',
        images: initialData.images || [],
        brochureUrl: initialData.brochure_url || '',
        
        seoTitle: initialData.seo_title?.en || '',
        seoDesc: initialData.seo_desc?.en || '',
        seoKeywords: initialData.seo_keywords?.en || '',
      });
    } else {
      setFormData(prev => ({
        ...prev,
        categoryId: data?.[0]?.id || ''
      }));
    }
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

  const handleArrayChange = (type: 'features' | 'applications', lang: 'en' | 'hi', index: number, value: string) => {
    const key = `${type}${lang === 'en' ? 'En' : 'Hi'}` as keyof typeof formData;
    const arr = [...(formData[key] as string[])];
    arr[index] = value;
    setFormData({ ...formData, [key]: arr });
  };

  const addArrayItem = (type: 'features' | 'applications') => {
    setFormData({
      ...formData,
      [`${type}En`]: [...formData[`${type}En` as keyof typeof formData] as string[], ''],
      [`${type}Hi`]: [...formData[`${type}Hi` as keyof typeof formData] as string[], ''],
    });
  };

  const removeArrayItem = (type: 'features' | 'applications', index: number) => {
    const arrEn = [...formData[`${type}En` as keyof typeof formData] as string[]];
    const arrHi = [...formData[`${type}Hi` as keyof typeof formData] as string[]];
    arrEn.splice(index, 1);
    arrHi.splice(index, 1);
    setFormData({
      ...formData,
      [`${type}En`]: arrEn,
      [`${type}Hi`]: arrHi,
    });
  };

  const handleSpecChange = (key: string, value: string) => {
    setFormData({ ...formData, specs: { ...formData.specs, [key]: value } });
  };

  const addSpec = () => {
    setFormData({ ...formData, specs: { ...formData.specs, ['New Spec ' + Object.keys(formData.specs).length]: '' } });
  };

  const updateSpecKey = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    const newSpecs = { ...formData.specs };
    newSpecs[newKey] = newSpecs[oldKey];
    delete newSpecs[oldKey];
    setFormData({ ...formData, specs: newSpecs });
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData({ ...formData, specs: newSpecs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const slug = formData.slug || formData.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const selectedCat = categories.find(c => c.id === formData.categoryId);
    const categoryName = selectedCat ? getTitle(selectedCat.name) : formData.categoryName;

    const payload: Partial<Product> = {
      title: { en: formData.nameEn, hi: formData.nameHi },
      short_desc: { en: formData.shortDescEn, hi: formData.shortDescHi },
      full_desc: { en: formData.fullDescEn, hi: formData.fullDescHi },
      category: categoryName,
      category_id: formData.categoryId,
      status: formData.status,
      featured: formData.featured,
      displayOrder: formData.displayOrder,
      thumbnail: formData.thumbnail,
      images: formData.images,
      brochure_url: formData.brochureUrl,
      specs: formData.specs,
      features: formData.featuresEn.map((en, i) => ({ en, hi: formData.featuresHi[i] || '' })),
      applications: formData.applicationsEn.map((en, i) => ({ en, hi: formData.applicationsHi[i] || '' })),
      seo_title: { en: formData.seoTitle, hi: formData.seoTitle },
      seo_desc: { en: formData.seoDesc, hi: formData.seoDesc },
      seo_keywords: { en: formData.seoKeywords, hi: formData.seoKeywords },
    };

    try {
      await saveProduct(slug, payload);
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      console.error('Save failed', err);
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'desc', label: 'Descriptions' },
    { id: 'specs', label: 'Specs & Features' },
    { id: 'media', label: 'Media & Files' },
    { id: 'seo', label: 'SEO Settings' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-rajdhani">{initialData ? 'Edit Product' : 'Add New Product'}</h1>
        </div>
        <button suppressHydrationWarning onClick={handleSubmit} disabled={saving} className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2">
          {saving ? <Loader2 className="animate-spin w-4 h-4" /> : null}
          {saving ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'basic' && (
            <div className="space-y-6 w-full">
              {!initialData && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Slug (URL)</label>
                  <input suppressHydrationWarning value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="leave blank to auto-generate from English name" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (English) *</label>
                  <input suppressHydrationWarning required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (Hindi) *</label>
                  <input suppressHydrationWarning required value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-hindi" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                  <select suppressHydrationWarning value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
                    <option value="">Select Category...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{getTitle(c.name)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Display Order</label>
                  <input suppressHydrationWarning type="number" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="flex gap-8 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.status === 'active'} onChange={e => setFormData({...formData, status: e.target.checked ? 'active' : 'hidden'})} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="font-medium text-slate-700">Active (Visible)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="font-medium text-slate-700">Featured Product</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="space-y-8 w-full">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Short Description</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <textarea rows={3} value={formData.shortDescEn} onChange={e => setFormData({...formData, shortDescEn: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="English short description..." />
                  <textarea rows={3} value={formData.shortDescHi} onChange={e => setFormData({...formData, shortDescHi: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-hindi" placeholder="Hindi short description..." />
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">Full Description</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <textarea rows={6} value={formData.fullDescEn} onChange={e => setFormData({...formData, fullDescEn: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="English full description..." />
                  <textarea rows={6} value={formData.fullDescHi} onChange={e => setFormData({...formData, fullDescHi: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-hindi" placeholder="Hindi full description..." />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-10 w-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Specifications</h3>
                  <button type="button" onClick={addSpec} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"><Plus size={16}/> Add Spec</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.specs).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-3">
                      <input value={k} onChange={e => updateSpecKey(k, e.target.value)} className="w-1/3 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-50 font-medium" />
                      <input value={v} onChange={e => handleSpecChange(k, e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Value..." />
                      <button type="button" onClick={() => removeSpec(k)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {Object.keys(formData.specs).length === 0 && <p className="text-slate-500 text-sm col-span-2">No specifications added yet.</p>}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Features</h3>
                  <button type="button" onClick={() => addArrayItem('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"><Plus size={16}/> Add Feature</button>
                </div>
                <div className="space-y-3">
                  {formData.featuresEn.map((f, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <input value={f} onChange={e => handleArrayChange('features', 'en', i, e.target.value)} placeholder="English feature..." className="flex-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none" />
                      <input value={formData.featuresHi[i] || ''} onChange={e => handleArrayChange('features', 'hi', i, e.target.value)} placeholder="Hindi feature..." className="flex-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none font-hindi" />
                      <button type="button" onClick={() => removeArrayItem('features', i)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {formData.featuresEn.length === 0 && <p className="text-slate-500 text-sm">No features added yet.</p>}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Applications / Uses</h3>
                  <button type="button" onClick={() => addArrayItem('applications')} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"><Plus size={16}/> Add Application</button>
                </div>
                <div className="space-y-3">
                  {formData.applicationsEn.map((a, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <input value={a} onChange={e => handleArrayChange('applications', 'en', i, e.target.value)} placeholder="English application..." className="flex-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none" />
                      <input value={formData.applicationsHi[i] || ''} onChange={e => handleArrayChange('applications', 'hi', i, e.target.value)} placeholder="Hindi application..." className="flex-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none font-hindi" />
                      <button type="button" onClick={() => removeArrayItem('applications', i)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {formData.applicationsEn.length === 0 && <p className="text-slate-500 text-sm">No applications added yet.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-10 w-full">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Thumbnail Image</h3>
                <p className="text-sm text-slate-500 mb-4">The main image shown in product cards and category pages.</p>
                <ImageUpload bucket="product-images" folder="thumbnails" value={formData.thumbnail} onChange={url => setFormData({...formData, thumbnail: url})} />
              </div>
              
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Product Gallery Images</h3>
                <p className="text-sm text-slate-500 mb-4">Additional images shown in the product details carousel.</p>
                <MultiImageUpload bucket="product-images" folder="gallery" value={formData.images} onChange={urls => setFormData({...formData, images: urls})} />
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Product Brochure (PDF)</h3>
                <p className="text-sm text-slate-500 mb-4">Optional PDF catalog or brochure for download.</p>
                <DocumentUpload bucket="brochures" folder="products" value={formData.brochureUrl} onChange={url => setFormData({...formData, brochureUrl: url})} />
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6 w-full">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Title</label>
                <input value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="SEO Title (50-60 characters)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                <textarea rows={3} value={formData.seoDesc} onChange={e => setFormData({...formData, seoDesc: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="SEO Description (150-160 characters)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Keywords</label>
                <input value={formData.seoKeywords} onChange={e => setFormData({...formData, seoKeywords: e.target.value})} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. tractor trolley, hydraulic trailer, farming equipment" />
                <p className="text-xs text-slate-500 mt-1.5">Comma-separated keywords.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
