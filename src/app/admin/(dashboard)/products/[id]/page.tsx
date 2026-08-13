'use client';

import { useState, useEffect } from 'react';
import { ProductForm } from '@/components/admin/ProductForm';
import { getProductBySlug } from '@/services/productService';
import type { Product } from '@/types';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProductBySlug(id).then(res => {
        setProduct(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  if (!product) {
    return <div className="p-12 text-center text-slate-500">Product not found.</div>;
  }

  return <ProductForm initialData={product} />;
}
