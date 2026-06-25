import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { InquiryDocument } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  REPLACE with your Firebase project credentials
// Console → Project Settings → Your apps → Web app → SDK setup & configuration
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY            ?? 'YOUR_API_KEY',
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN        ?? 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID         ?? 'YOUR_PROJECT_ID',
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET     ?? 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? 'YOUR_SENDER_ID',
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID             ?? 'YOUR_APP_ID',
};

// Singleton pattern — safe in Next.js hot-reload
let app: FirebaseApp;
let db: Firestore;

function getFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

export function getDB(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

// ─────────────────────────────────────────────────────────────────────────────
// Submit inquiry to Firestore
// ─────────────────────────────────────────────────────────────────────────────
export async function submitInquiry(
  data: Omit<InquiryDocument, 'createdAt'>
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    const firestore = getDB();
    const docRef = await addDoc(collection(firestore, 'inquiries'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error occurred';

    // Detect "not configured" state so dev UX is clear
    if (message.includes('YOUR_PROJECT_ID') || message.includes('invalid-argument')) {
      return {
        success: false,
        error: 'Firebase not configured. Add your credentials in lib/firebase.ts or .env.local',
      };
    }
    return { success: false, error: message };
  }
}
