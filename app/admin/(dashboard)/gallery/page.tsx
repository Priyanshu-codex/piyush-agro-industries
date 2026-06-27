'use client';

import { useState, useEffect } from 'react';
import { subscribeGalleryDb, deleteGalleryItemDb, saveGalleryItemDb } from '@/repositories/galleryRepository';
import type { GalleryItem } from '@/types';
import Image from 'next/image';

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 flex flex-col items-center bg-white shadow-sm">
            <div className="w-full h-40 relative mb-4">
              <Image 
                src={item.imageUrl || '/placeholder.png'} 
                alt={item.label?.en || 'Gallery Image'} 
                fill 
                className="object-cover rounded-lg"
              />
            </div>
            <p className="font-semibold text-gray-800">{item.label?.en}</p>
            <p className="text-sm text-gray-500 mb-4">{item.category}</p>
            <button 
              onClick={() => handleDelete(item.id)}
              className="mt-auto px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-bold w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
