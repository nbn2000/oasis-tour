'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { listPackages } from '../../lib/packages';
import type { TravelPackage } from '../../types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import VideoThumb from '../../components/VideoThumb';
import DOMPurify from 'isomorphic-dompurify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

const Header = dynamic(() => import('components/Header'), { ssr: false });
const Footer = dynamic(() => import('sections/Footer'), { ssr: false });

const mdToHtml = (s: string) => {
  let out = s
    .replace(/\r\n/g, '\n')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  return `<p>${out}</p>`;
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const perPage = 6;

const PackagesPage: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const gridTopRef = useRef<HTMLDivElement | null>(null);

  const [items, setItems] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const initialPage = useMemo(() => {
    const p = Number(router.query.page || 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [router.query.page]);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    listPackages().then((data) => {
      setItems([...data].reverse());
      setLoading(false);
    });
  }, []);

  const toSafeHtml = (rawText: string): string => {
    const isHtml = typeof rawText === 'string' && /<\w+[\s>]/.test(rawText);
    const raw = isHtml ? rawText : mdToHtml(rawText || '');
    return DOMPurify.sanitize(raw || '');
  };

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const clampedPage = Math.min(Math.max(page, 1), totalPages);

  const paginated = useMemo(() => {
    const start = (clampedPage - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, clampedPage]);

  const goToPage = (next: number) => {
    const target = Math.min(Math.max(next, 1), totalPages);
    if (target === clampedPage) return;
    router.push({ pathname: '/packages', query: target === 1 ? {} : { page: target } }, undefined, {
      shallow: true,
      scroll: false,
    });
    setPage(target);
    setTimeout(() => {
      gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <>
      <div className="w-full py-6 lg:z-10 lg:py-12">
        <Header />
      </div>

      <section className="mb-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center" ref={gridTopRef}>
            <h3 className="font-serif text-4xl lg:text-5xl">{t('packages')}</h3>
            <p className="mt-2 text-gray-500">{t('packages_subtitle')}</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: perPage }).map((_, i) => (
                <PackageSkeleton key={i} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-great">{t('no_packages')}</div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((p) => (
                <PackageCard key={p.docId} pkg={p} toSafeHtml={toSafeHtml} nameKey={t('name')} textKey={t('text')} />
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
              <button
                onClick={() => goToPage(clampedPage - 1)}
                disabled={clampedPage === 1}
                className="rounded-xl border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('prev')}
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const num = i + 1;
                const isActive = num === clampedPage;
                return (
                  <button
                    key={num}
                    onClick={() => goToPage(num)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`rounded-xl border px-4 py-2 text-sm ${
                      isActive ? 'bg-accent-1 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(clampedPage + 1)}
                disabled={clampedPage === totalPages}
                className="rounded-xl border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('next')}
              </button>
            </nav>
          )}
        </div>
      </section>

      <Footer isNotHome />
    </>
  );
};

export default PackagesPage;

const PackageCard: React.FC<{
  pkg: TravelPackage;
  toSafeHtml: (s: string) => string;
  nameKey: string;
  textKey: string;
}> = ({ pkg, toSafeHtml, nameKey, textKey }) => {
  const html = useMemo(
    () => toSafeHtml((pkg[textKey as keyof TravelPackage] as string) || ''),
    [pkg, textKey, toSafeHtml],
  );
  const { t } = useTranslation('common');
  const title = pkg[nameKey as keyof TravelPackage] as string;
  const firstMedia = pkg.media && pkg.media.length > 0 ? pkg.media[0] : null;

  return (
    <Link href={`/packages/${pkg.id}`}>
      <div className="group block cursor-pointer overflow-hidden rounded-3xl bg-white shadow-great transition hover:-translate-y-1 hover:shadow-2xl">
        {firstMedia && (
          <div className="aspect-[4/3] w-full overflow-hidden">
            {firstMedia.type === 'video' ? (
              <VideoThumb src={firstMedia.url} className="h-full w-full object-cover" />
            ) : (
              <img
                src={firstMedia.url}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
        )}

        <div className="relative p-6">
          <h4 className="mb-2 font-semibold text-gray-900">{title}</h4>
          <span className="mb-3 block font-bold text-accent-2">${pkg.price.toLocaleString()}</span>
          <div
            className="prose prose-p:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none text-gray-700 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <div className="mt-5 mb-8 flex justify-center">
          <span className="inline-block rounded-xl bg-accent-1 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-accent-2">
            {t('see_details')}
          </span>
        </div>
      </div>
    </Link>
  );
};

const PackageSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-great">
    <div className="aspect-[4/3] w-full bg-gray-200" />
    <div className="space-y-3 p-6">
      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      <div className="h-3 w-1/4 rounded bg-gray-200"></div>
      <div className="h-3 w-full rounded bg-gray-200"></div>
      <div className="h-3 w-5/6 rounded bg-gray-200"></div>
    </div>
  </div>
);
