import { subscribeCategoriesDb, saveCategoryDb, deleteCategoryDb } from '@/repositories/categoryRepository';

export function subscribeCategories(callback: (categories: any[]) => void) {
  return subscribeCategoriesDb(callback);
}

export async function saveCategory(id: string, data: any) {
  await saveCategoryDb(id, data);
}

export async function deleteCategory(id: string) {
  await deleteCategoryDb(id);
}
