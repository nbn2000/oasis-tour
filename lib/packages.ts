import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
  where,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { TravelPackage } from '../types';

const COL = 'packages';

export async function listPackages(): Promise<TravelPackage[]> {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as TravelPackage), docId: d.id }));
}

export async function createPackage(pkg: Omit<TravelPackage, 'docId' | 'createdAt' | 'updatedAt'>) {
  const existing = await getDocs(query(collection(db, COL), where('id', '==', pkg.id)));
  if (!existing.empty) throw new Error('A package with this id already exists.');
  await addDoc(collection(db, COL), {
    ...pkg,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
}

export async function updatePackage(docId: string, partial: Partial<TravelPackage>) {
  await updateDoc(doc(db, COL, docId), {
    ...partial,
    updatedAt: Date.now(),
  });
}

export async function deletePackage(docId: string) {
  await deleteDoc(doc(db, COL, docId));
}

export async function getPackage(docId: string): Promise<TravelPackage | null> {
  const d = await getDoc(doc(db, COL, docId));
  if (!d.exists()) return null;
  return { ...(d.data() as TravelPackage), docId: d.id };
}
