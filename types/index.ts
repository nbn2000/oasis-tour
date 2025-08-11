export type MediaItem = { type: 'photo' | 'video'; url: string; file_id?: string };

export type TravelPackage = {
  id: string;
  name_uz: string;
  name_ru: string;
  price: number;
  text_uz: string;
  text_ru: string;
  docId?: string;
  media?: MediaItem[];
  createdAt?: number;
  updatedAt?: number;
};

// Login: admin@gmail.com
// // Password: 123456789aa
