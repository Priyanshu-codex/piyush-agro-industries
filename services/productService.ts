import { subscribeProductsDb, saveProductDb, deleteProductDb } from '@/repositories/productRepository';
import type { Product } from '@/types';

export function subscribeProducts(callback: (products: Product[]) => void) {
  return subscribeProductsDb(callback);
}

export async function saveProduct(id: string, data: Partial<Product>) {
  await saveProductDb(id, data);
}

export async function deleteProduct(id: string) {
  await deleteProductDb(id);
}
