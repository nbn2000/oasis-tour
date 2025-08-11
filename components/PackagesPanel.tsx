import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ulid } from 'ulid';
import { createPackage, deletePackage, listPackages, updatePackage } from '../lib/packages';
import type { TravelPackage } from '../types';
import { uploadMedia, type UploadedMedia } from '../lib/telegram';
import VideoThumb from './VideoThumb';
import Link from 'next/link';

const RichTextEditor: any = dynamic(() => import('react-rte'), { ssr: false });

type MediaItem = { type: 'photo' | 'video'; url: string; file_id?: string };
type PkgWithMedia = TravelPackage & { media?: MediaItem[] };

type PreviewItem = { url: string; isVideo: boolean };

const emptyForm: PkgWithMedia = {
  id: '',
  name_uz: '',
  name_ru: '',
  price: 0,
  text_uz: '',
  text_ru: '',
  media: [],
};

const PackagesPanel: React.FC<{ onSignOut: () => void }> = ({ onSignOut }) => {
  const [items, setItems] = useState<PkgWithMedia[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<PkgWithMedia>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string>('');

  const [rteApi, setRteApi] = useState<any>(null);
  const [editorValueUz, setEditorValueUz] = useState<any>(null);
  const [editorValueRu, setEditorValueRu] = useState<any>(null);

  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const load = async () => {
    setLoading(true);
    const data = (await listPackages()) as PkgWithMedia[];
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const mod = await import('react-rte');
      if (!mounted) return;
      setRteApi(mod);
      const empty = (mod as any)?.default?.createEmptyValue?.() || (mod as any)?.EditorValue?.createEmpty?.() || null;
      setEditorValueUz(empty);
      setEditorValueRu(empty);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const clearPreviews = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
  };

  const startEdit = (pkg: PkgWithMedia) => {
    setEditingId(pkg.docId!);
    setForm({
      id: pkg.id,
      name_uz: pkg.name_uz || '',
      name_ru: pkg.name_ru || '',
      price: pkg.price,
      text_uz: pkg.text_uz || '',
      text_ru: pkg.text_ru || '',
      docId: pkg.docId,
      media: pkg.media || [],
    });

    clearPreviews();

    if (rteApi) {
      const fromString =
        (rteApi as any)?.default?.createValueFromString || (rteApi as any)?.EditorValue?.createFromString;
      if (fromString) {
        setEditorValueUz(fromString(pkg.text_uz || '', 'html'));
        setEditorValueRu(fromString(pkg.text_ru || '', 'html'));
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setUploadErr('');
    setIsUploading(false);
    clearPreviews();
    if (rteApi) {
      const empty =
        (rteApi as any)?.default?.createEmptyValue?.() || (rteApi as any)?.EditorValue?.createEmpty?.() || null;
      setEditorValueUz(empty);
      setEditorValueRu(empty);
    } else {
      setEditorValueUz(null);
      setEditorValueRu(null);
    }
  };

  const doUploadFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setUploadErr('');
    setIsUploading(true);
    try {
      const uploaded: UploadedMedia[] = await uploadMedia(files);
      const mediaForDb: MediaItem[] = uploaded.map((m) => ({
        type: m.type,
        url: m.url,
        file_id: m.file_id,
      }));
      setForm((f) => ({
        ...f,
        media: editingId && f.media && f.media.length > 0 ? [...f.media, ...mediaForDb] : mediaForDb,
      }));
    } catch (e: any) {
      setUploadErr(e?.message || 'Mediarni Telegramga yuklash muvaffaqiyatsiz tugadi');
    } finally {
      setIsUploading(false);
      clearPreviews();
    }
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    clearPreviews();
    const pvs: PreviewItem[] = list.map((f) => ({
      url: URL.createObjectURL(f),
      isVideo: f.type?.startsWith('video') || false,
    }));
    setPreviews(pvs);
    void doUploadFiles(list);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name_uz.trim() || !form.name_ru.trim()) return setError('O‘zbekcha va ruscha nomlar majburiy');
    if (form.price < 0) return setError('Narx 0 dan kichik bo‘lmasligi kerak');
    if (isUploading) return setError('Iltimos kuting: media hali yuklanmoqda…');

    const htmlUz = editorValueUz?.toString?.('html') || form.text_uz || '';
    const htmlRu = editorValueRu?.toString?.('html') || form.text_ru || '';

    setBusy(true);
    try {
      if (editingId) {
        await updatePackage(editingId, {
          id: form.id,
          name_uz: form.name_uz,
          name_ru: form.name_ru,
          price: form.price,
          text_uz: htmlUz,
          text_ru: htmlRu,
          media: form.media || [],
        } as any);
      } else {
        const generatedId = ulid();
        await createPackage({
          id: generatedId,
          name_uz: form.name_uz,
          name_ru: form.name_ru,
          price: form.price,
          text_uz: htmlUz,
          text_ru: htmlRu,
          media: form.media || [],
        } as any);
      }
      await load();
      resetForm();
    } catch (e: any) {
      setError(e.message || 'Paketni saqlashda xatolik');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (docId?: string) => {
    if (!docId) return;
    if (!confirm('Bu paket o‘chirilsinmi?')) return;
    setBusy(true);
    try {
      await deletePackage(docId);
      await load();
      if (editingId === docId) resetForm();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="cursor-pointer bg-accent-1 px-6 py-3 font-semibold text-white hover:bg-accent-2 hover:text-gray-800"
          >
            ← Bosh sahifaga qaytish
          </Link>
          <button onClick={onSignOut} className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Hisobdan chiqish
          </button>
        </div>

        {/* Forma */}
        <form onSubmit={submit} className="mb-8 rounded-3xl bg-white p-6 shadow-great">
          {/* Nomi */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Nomi (O‘zbek lotin)</label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-accent-6"
                value={form.name_uz}
                onChange={(e) => setForm((f) => ({ ...f, name_uz: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Nomi (Ruscha)</label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-accent-6"
                value={form.name_ru}
                onChange={(e) => setForm((f) => ({ ...f, name_ru: e.target.value }))}
              />
            </div>
          </div>

          {/* Narx */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">Narxi</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-accent-6"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              min={0}
            />
            {editingId && (
              <div className="mt-1 truncate text-xs text-gray-400">
                Joriy ID: <span className="font-medium">{form.id}</span>
              </div>
            )}
          </div>

          {/* Media tanlash */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">Media (rasmlar yoki videolar)</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={onPickFiles}
              disabled={isUploading || busy}
              className="file:px=4 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 file:mr-4 file:rounded-md file:border-0 file:bg-accent-1 file:py-2 file:text-white hover:file:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {isUploading && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-75"
                  />
                </svg>
                Telegramga yuklanmoqda… katta videolar biroz vaqt olishi mumkin.
              </div>
            )}
            {uploadErr && (
              <div className="mt-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                {uploadErr}
              </div>
            )}

            {(previews.length > 0 || (form.media && form.media.length > 0)) && (
              <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-4">
                {previews.map((p, i) => (
                  <div key={`pv-${i}`} className="overflow-hidden rounded-xl border bg-gray-50">
                    {p.isVideo ? (
                      <VideoThumb src={p.url} className="h-24 w-full" />
                    ) : (
                      <img src={p.url} className="h-24 w-full object-cover" alt={`picked-${i}`} />
                    )}
                  </div>
                ))}

                {previews.length === 0 &&
                  form.media?.map((m, i) => (
                    <div key={`ex-${i}`} className="overflow-hidden rounded-xl border bg-gray-50">
                      {m.type === 'video' ? (
                        <VideoThumb src={m.url} className="h-24 w-full" />
                      ) : (
                        <img src={m.url} className="h-24 w-full object-cover" alt={`media-${i}`} />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Uzbek tavsif */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-semibold">Tavsif (O‘zbek lotin)</label>
            <div className="rounded-xl border border-gray-200 bg-white p-2">
              {rteApi && editorValueUz ? (
                <RichTextEditor value={editorValueUz} onChange={setEditorValueUz} />
              ) : (
                <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
              )}
            </div>
          </div>

          {/* Ruscha tavsif */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-semibold">Tavsif (Ruscha)</label>
            <div className="rounded-xl border border-gray-200 bg-white p-2">
              {rteApi && editorValueRu ? (
                <RichTextEditor value={editorValueRu} onChange={setEditorValueRu} />
              ) : (
                <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
              )}
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={busy || isUploading}
              className="rounded-xl bg-accent-1 px-6 py-3 font-semibold text-white hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy
                ? 'Saqlanmoqda…'
                : isUploading
                ? 'Media yuklanmoqda…'
                : editingId
                ? 'O‘zgartirishlarni saqlash'
                : 'Paket qo‘shish'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={busy || isUploading}
                className="rounded-xl border px-6 py-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Bekor qilish
              </button>
            )}
          </div>
        </form>

        {/* Ro‘yxat */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {loading ? (
            <div className="col-span-full flex items-center justify-center p-12 text-gray-500">
              Paketlar yuklanmoqda…
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-500 shadow-great">
              Hozircha paketlar yo‘q. Birinchisini yuqoridan qo‘shing.
            </div>
          ) : (
            items.map((p) => (
              <div key={p.docId} className="rounded-2xl bg-white p-5 shadow-great">
                <div className="mb-2 flex flex-col gap-1">
                  <div className="text-lg font-semibold text-gray-900">
                    {p.name_uz} / {p.name_ru}
                  </div>
                  <div className="font-semibold text-accent-2">${p.price.toLocaleString()}</div>
                </div>
                <div className="mb-2 text-xs text-gray-400">ID: {p.id}</div>

                {p.media && p.media.length > 0 && (
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {p.media.slice(0, 6).map((m, i) => (
                      <div key={i} className="overflow-hidden rounded-lg border">
                        {m.type === 'video' ? (
                          <VideoThumb src={m.url} className="h-20 w-full" />
                        ) : (
                          <img src={m.url} className="h-20 w-full object-cover" alt={`media-${i}`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="prose prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-a:text-accent-2 prose-a:underline max-w-none text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: p.text_uz }}
                />
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => startEdit(p)}
                    className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => remove(p.docId)}
                    className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    O‘chirish
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagesPanel;
