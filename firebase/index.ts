import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJOqJq-tgMpo0rterDNik4nbpVZLKXJGg',
  authDomain: 'savvy-badge-450111-q0.firebaseapp.com',
  projectId: 'savvy-badge-450111-q0',
  storageBucket: 'savvy-badge-450111-q0.firebasestorage.app',
  messagingSenderId: '177796483272',
  appId: '1:177796483272:web:e5c2ab1f1d5d7db1a3bdfd',
  measurementId: 'G-XKW7W4W26T',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
