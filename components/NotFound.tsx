import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation('common');

  return (
    <section className="flex min-h-[100vh] flex-col items-center justify-center bg-accent-4/20 px-4">
      <h1 className="mb-4 font-serif text-6xl font-bold text-accent-2 lg:text-8xl">404</h1>
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 lg:text-4xl">{t('notfound_title')}</h2>
      <p className="mb-8 max-w-xl text-center text-gray-500">{t('notfound_desc')}</p>
      <Link href="/">
        <a className="rounded-xl bg-accent-1 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-accent-2">
          {t('notfound_button')}
        </a>
      </Link>
    </section>
  );
}
