import { subscribeSettingsDb, saveSettingsDb } from '@/repositories/settingsRepository';
import type { HomepageSettings, ContactSettings, GeneralSettings } from '@/types';

export function subscribeHomepageSettings(callback: (settings: HomepageSettings) => void) {
  return subscribeSettingsDb('homepage', (data) => callback(data as HomepageSettings));
}

export function subscribeContactSettings(callback: (settings: ContactSettings) => void) {
  return subscribeSettingsDb('contact', (data) => callback(data as ContactSettings));
}

export function subscribeGeneralSettings(callback: (settings: GeneralSettings) => void) {
  return subscribeSettingsDb('general', (data) => callback(data as GeneralSettings));
}

export async function saveSettings(docId: 'homepage' | 'contact' | 'general', data: any) {
  await saveSettingsDb(docId, data);
}
