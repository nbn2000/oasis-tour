import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales, pathname, asPath, query } = router;
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    setOpen(false);
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <div className="relative inline-block  ">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 rounded bg-white px-4 py-2 text-sm font-medium text-black shadow hover:bg-gray-100"
      >
        {locale === 'uz' ? 'UZ' : 'RU'}
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.25 7.75L10 12.5l4.75-4.75" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-[75px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          {locales?.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => changeLanguage(loc)}
              className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
            >
              {loc === 'uz' ? 'UZ' : 'RU'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
