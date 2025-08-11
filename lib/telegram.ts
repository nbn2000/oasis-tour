// lib/telegram.ts
// Mixed photo/video upload via Telegram, returns public file URLs you can store.

type TgMediaType = 'photo' | 'video';

export interface UploadedMedia {
  type: TgMediaType;
  file_id: string;
  url: string;
}

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!;
const TG_API = (p: string) => `https://api.telegram.org/bot${BOT_TOKEN}/${p}`;
const TG_FILE = (path: string) => `https://api.telegram.org/file/bot${BOT_TOKEN}/${path}`;

async function tgGetFileUrl(fileId: string): Promise<string | null> {
  const res = await fetch(TG_API(`getFile?file_id=${encodeURIComponent(fileId)}`));
  const data = await res.json();
  const fp = data?.result?.file_path;
  return fp ? TG_FILE(fp) : null;
}

/**
 * Upload a single file using the best Telegram endpoint.
 * - photo -> sendPhoto
 * - video -> sendVideo
 * Returns UploadedMedia with url resolved via getFile.
 */
export async function uploadSingle(file: File): Promise<UploadedMedia> {
  const isVideo = file.type.startsWith('video');
  const ep = isVideo ? 'sendVideo' : 'sendPhoto';

  const fd = new FormData();
  fd.append('chat_id', CHAT_ID);
  fd.append(isVideo ? 'video' : 'photo', file);

  const res = await fetch(TG_API(ep), { method: 'POST', body: fd });
  const json = await res.json();

  if (!json.ok) throw new Error(json.description || 'Telegram upload failed');

  // For photo, Telegram returns array of sizes; pick the largest
  let fileId: string | undefined;
  if (json.result?.photo) {
    const last = json.result.photo[json.result.photo.length - 1];
    fileId = last?.file_id;
  } else if (json.result?.video) {
    fileId = json.result.video.file_id;
  }

  if (!fileId) throw new Error('No file_id in Telegram response');

  const url = (await tgGetFileUrl(fileId)) || '';
  return { type: isVideo ? 'video' : 'photo', file_id: fileId, url };
}

/**
 * Upload multiple files (photo and/or video) as a media group (2–10).
 * If only one file is provided, falls back to single upload.
 */
export async function uploadMultiple(files: File[]): Promise<UploadedMedia[]> {
  if (files.length === 0) return [];
  if (files.length === 1) return [await uploadSingle(files[0])];

  // Build sendMediaGroup payload (supports mixed types)
  const fd = new FormData();
  fd.append('chat_id', CHAT_ID);

  const media = files.map((file, i) => {
    const key = `media${i}`;
    fd.append(key, file);
    const type: TgMediaType = file.type.startsWith('video') ? 'video' : 'photo';
    return { type, media: `attach://${key}` };
  });

  fd.append('media', JSON.stringify(media));

  const res = await fetch(TG_API('sendMediaGroup'), { method: 'POST', body: fd });
  const json = await res.json();
  if (!json.ok) throw new Error(json.description || 'Telegram media group failed');

  // Map result items -> file_ids (photo uses array, video is single)
  const out: UploadedMedia[] = [];
  for (const it of json.result || []) {
    if (it.photo) {
      const last = it.photo[it.photo.length - 1];
      if (!last?.file_id) continue;
      const url = (await tgGetFileUrl(last.file_id)) || '';
      out.push({ type: 'photo', file_id: last.file_id, url });
    } else if (it.video?.file_id) {
      const url = (await tgGetFileUrl(it.video.file_id)) || '';
      out.push({ type: 'video', file_id: it.video.file_id, url });
    }
  }
  return out;
}

/** Public entry: upload any list of files, returns UploadedMedia[] with urls */
export async function uploadMedia(files: File[]): Promise<UploadedMedia[]> {
  return files.length <= 1 ? uploadMultiple(files) : uploadMultiple(files);
}
