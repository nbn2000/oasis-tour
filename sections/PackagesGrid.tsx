import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { listPackages } from '../lib/packages';
import type { TravelPackage } from '../types';
import Link from 'next/link';
import VideoThumb from '../components/VideoThumb';

const mdToHtml = (s: string) => {
  let out = s
    .replace(/\r\n/g, '\n')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  return `<p>${out}</p>`;
};

type Sanitizer = ((html: string) => string) | null;

const PackagesGrid: React.FC = () => {
  const { t } = useTranslation('common');
  const [items, setItems] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sanitizeFn, setSanitizeFn] = useState<Sanitizer>(null);

  useEffect(() => {
    let mounted = true;
    import('dompurify')
      .then((mod) => {
        if (!mounted) return;
        const DOMPurify = (mod as any).default || (mod as any);
        setSanitizeFn(() => (html: string) => DOMPurify.sanitize(html));
      })
      .catch(() => setSanitizeFn(() => (html: string) => html));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    listPackages().then((data) => {
      setItems(data.slice(-3).reverse());
      setLoading(false);
    });
  }, []);

  const toSafeHtml = (rawText: string): string => {
    const isHtml = typeof rawText === 'string' && /<\w+[\s>]/.test(rawText);
    const raw = isHtml ? rawText : mdToHtml(rawText || '');
    return sanitizeFn ? sanitizeFn(raw || '') : raw || '';
  };

  return (
    <section className="mb-28" id="top">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h3 className="font-serif text-4xl lg:text-5xl">{t('packages')}</h3>
          <p className="mt-2 text-gray-500">{t('packages_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(3)].map((_, i) => <PackageSkeleton key={i} />)
            : items.map((p) => (
                <PackageCard key={p.docId} pkg={p} toSafeHtml={toSafeHtml} nameKey={t('name')} textKey={t('text')} />
              ))}
        </div>

        {!loading && (
          <div className="mt-12 flex  justify-center">
            <Link href="/packages">
              <div className="cursor-pointer rounded-xl bg-accent-1 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-accent-2">
                {t('see_all_packages')}
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesGrid;

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
  const firstMedia = pkg.media && pkg.media.length > 0 ? pkg.media[0] : null;
  const title = pkg[nameKey as keyof TravelPackage] as string;

  return (
    <Link href={`/packages/${pkg.id}`} className="">
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
          <div className="mt-5 flex justify-center">
            <span className="inline-block rounded-xl bg-accent-1 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-accent-2">
              {t('see_details')}
            </span>
          </div>
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
      <div className="mx-auto mt-5 h-8 w-32 rounded-xl bg-gray-200"></div>
    </div>
  </div>
);
