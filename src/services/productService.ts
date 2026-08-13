import { subscribeProductsDb, saveProductDb, deleteProductDb, getProductBySlugDb } from '@/repositories/productRepository';
import type { Product } from '@/types';

export function subscribeProducts(callback: (products: Product[]) => void) {
  return subscribeProductsDb(callback);
}

export async function saveProduct(id: string, data: Partial<Product>) {
  await saveProductDb(id, data);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await getProductBySlugDb(slug);
}

export async function deleteProduct(id: string) {
  await deleteProductDb(id);
}
