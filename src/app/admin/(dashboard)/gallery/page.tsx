'use client';

import { useState, useEffect } from 'react';
import { subscribeGalleryDb, deleteGalleryItemDb, saveGalleryItemDb } from '@/repositories/galleryRepository';
import type { GalleryItem } from '@/types';
import { ImageUpload } from '@/components/admin/FileUpload';
import { Loader2, X } from 'lucide-react';

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    labelEn: '',
    labelHi: '',
    category: 'hydraulic',
    displayOrder: 10
  });

  useEffect(() => {
    const unsub = subscribeGalleryDb((data) => {
      setItems(data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await deleteGalleryItemDb(id);
    }
  };

  const handleSave = async () => {
    if (!formData.imageUrl) {
      alert('Please upload an image');
      return;
    }
    try {
      setIsSaving(true);
      await saveGalleryItemDb('', {
        imageUrl: formData.imageUrl,
        label: { en: formData.labelEn, hi: formData.labelHi },
        category: formData.category,
        displayOrder: formData.displayOrder,
        status: 'active'
      });
      setIsModalOpen(false);
      setFormData({ imageUrl: '', labelEn: '', labelHi: '', category: 'hydraulic', displayOrder: 10 });
    } catch (error: any) {
      console.error('Error saving gallery item:', error.message || error);
      alert('Error saving image: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-rajdhani tracking-tight">Gallery</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize your photo gallery.</p>
        </div>
        <button suppressHydrationWarning 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md transition-all">
          <span className="text-lg leading-none">+</span>
          <span>Upload Image</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No images found</h3>
          <p className="text-slate-500">Upload an image to start building your gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300">
              <div className="w-full h-48 relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
                <span className="text-4xl">🖼️</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 transition-opacity duration-300"></div>
                
                <button suppressHydrationWarning 
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 shadow-sm transition-all duration-300"
                  title="Delete Image"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 border-t border-slate-100">
                <p className="font-semibold text-slate-800 line-clamp-1">{item.label?.en || 'Untitled Image'}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                    {item.category || 'Uncategorized'}
                  </span>
                  <span className="text-xs text-slate-400">Order: {item.displayOrder || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-slate-900">Upload Gallery Image</h3>
              <button suppressHydrationWarning onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image <span className="text-red-500">*</span></label>
                <ImageUpload 
                  bucket="product-images" 
                  folder="gallery" 
                  value={formData.imageUrl} 
                  onChange={(url) => setFormData({...formData, imageUrl: url})} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Label (English)</label>
                <input 
                  type="text" 
                  value={formData.labelEn}
                  onChange={(e) => setFormData({...formData, labelEn: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Combine Harvester"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Label (Hindi)</label>
                <input 
                  type="text" 
                  value={formData.labelHi}
                  onChange={(e) => setFormData({...formData, labelHi: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="e.g. कंबाइन हार्वेस्टर"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                  >
                    <option value="hydraulic">Hydraulic</option>
                    <option value="tractor">Tractor</option>
                    <option value="water">Water</option>
                    <option value="agri">Agri</option>
                    <option value="fabrication">Fabrication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                  <input 
                    type="number" 
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 shrink-0">
              <button suppressHydrationWarning 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button suppressHydrationWarning 
                onClick={handleSave}
                disabled={isSaving || !formData.imageUrl}
                className="px-5 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : null}
                Save Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
