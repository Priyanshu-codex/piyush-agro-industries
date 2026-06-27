import { subscribeGalleryDb, saveGalleryItemDb, deleteGalleryItemDb } from '@/repositories/galleryRepository';
import type { GalleryItem } from '@/types';

export function subscribeGallery(callback: (galleryItems: GalleryItem[]) => void) {
  return subscribeGalleryDb(callback);
}

export async function saveGalleryItem(id: string, data: any) {
  await saveGalleryItemDb(id, data);
}

export async function deleteGalleryItem(id: string) {
  await deleteGalleryItemDb(id);
}
