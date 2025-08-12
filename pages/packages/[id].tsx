'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { listPackages } from '../../lib/packages';
import type { TravelPackage } from '../../types';
import DOMPurify from 'isomorphic-dompurify';
import VideoThumb from '../../components/VideoThumb';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { NextSeo, BreadcrumbJsonLd, ProductJsonLd } from 'next-seo';

const Header = dynamic(() => import('components/Header'), { ssr: false });
const Footer = dynamic(() => import('sections/Footer'), { ssr: false });

export async function getStaticPaths() {
  const packages = await listPackages();
  return {
    paths: packages.map((pkg) => ({ params: { id: String(pkg.id) } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }: { params: any; locale: string }) {
  const packages = await listPackages();
  const pkg = packages.find((p) => String(p.id) === String(params.id)) || null;

  return {
    props: {
      pkg,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
}

const mdToHtml = (s: string) => {
  let out = s
    .replace(/\r\n/g, '\n')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  return `<p>${out}</p>`;
};

const toSafeHtml = (rawText: string): string => {
  const isHtml = typeof rawText === 'string' && /<\w+[\s>]/.test(rawText);
  const raw = isHtml ? rawText : mdToHtml(rawText || '');
  return DOMPurify.sanitize(raw || '');
};

export const toDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v?.toDate === 'function') return v.toDate();
  if (typeof v === 'number') {
    const ms = v < 1e12 ? v * 1000 : v;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

export const formatDate = (v: any, locale = 'uz-UZ'): string => {
  const d = toDate(v);
  if (!d) return '—';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(d);
};

const PackageDetailPage: React.FC<{ pkg: TravelPackage | null }> = ({ pkg }) => {
  const { t, i18n } = useTranslation('common');

  const [openModal, setOpenModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const localizedTitle = (
    (pkg?.[t('name') as keyof TravelPackage] as string) ||
    (pkg ? (pkg as any)[t('name')] : '') ||
    ''
  ).trim();

  const html = useMemo(
    () =>
      toSafeHtml(
        (
          ((pkg?.[t('text') as keyof TravelPackage] as string) || (pkg ? (pkg as any)[t('text')] : '') || '') as string
        ).trim(),
      ),
    [pkg, t],
  );

  if (!pkg) {
    return (
      <>
        <div className="w-full py-6 lg:py-12">
          <Header />
        </div>
        <div className="py-16 text-center">
          <p className="mb-4 text-gray-500">{t('package_not_found')}</p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            {t('back_to_packages')}
          </Link>
        </div>
        <Footer isNotHome />
      </>
    );
  }

  const media = pkg.media || [];
  const priceStr = `$${Number(pkg.price || 0).toLocaleString()}`;
  const baseUrl = 'https://oasis-tour.uz';
  const canonical = `${baseUrl}/packages/${pkg.id}`;
  const images = media.filter((m) => m.type === 'photo').map((m) => m.url);
  const firstImg = images[0];

  const onOpenModal = (index: number) => {
    setModalIndex(index);
    setOpenModal(true);
    document.documentElement.style.overflow = 'hidden';
  };
  const onCloseModal = () => {
    setOpenModal(false);
    document.documentElement.style.overflow = '';
  };

  // Extra JSON-LD (TouristTrip) — complements ProductJsonLd
  const tripJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: localizedTitle || String(pkg.id),
      description: localizedTitle || String(pkg.id),
      inLanguage: i18n.language,
      image: images.length ? images : undefined,
      url: canonical,
      provider: {
        '@type': 'Organization',
        name: 'Oasis Tour',
        url: baseUrl,
      },
      offers:
        typeof pkg.price === 'number'
          ? {
              '@type': 'Offer',
              price: String(pkg.price),
              priceCurrency: 'USD',
              url: canonical,
              availability: 'https://schema.org/InStock',
            }
          : undefined,
      // You can extend with itinerary, departureStation/arrivalStation, etc., if you store those.
    };
  }, [localizedTitle, i18n.language, images, canonical, pkg.price]);

  return (
    <>
      <NextSeo
        title={`${localizedTitle} — Oasis Tour`}
        description={localizedTitle}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: `${localizedTitle} — Oasis Tour`,
          description: localizedTitle,
          images: firstImg ? [{ url: firstImg, width: 1200, height: 630, alt: localizedTitle }] : undefined,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Home', item: `${baseUrl}/` },
          { position: 2, name: 'Packages', item: `${baseUrl}/packages` },
          { position: 3, name: localizedTitle, item: canonical },
        ]}
      />
      <ProductJsonLd
        productName={localizedTitle}
        images={images.length ? images : undefined}
        description={localizedTitle}
        brand="Oasis Tour"
        sku={String(pkg.id)}
        offers={[
          {
            price: String(pkg.price || 0),
            priceCurrency: 'USD',
            url: canonical,
            availability: 'https://schema.org/InStock',
          },
        ]}
      />
      {/* TouristTrip JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />

      <div className="w-full py-6 lg:py-12">
        <Header />
      </div>

      <section className="mb-28">
        <div className="mx-auto max-w-5xl px-4">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">{localizedTitle}</h1>
              <div className="mt-2 text-sm text-gray-500">
                ID: <span className="font-medium">{pkg.id}</span> · {t('created_at')}:{' '}
                {formatDate((pkg as any)?.createdAt, i18n.language)}
              </div>
            </div>
            <div className="rounded-full bg-accent-2/10 px-4 py-2 font-semibold text-accent-2">{priceStr}</div>
          </div>

          {/* Media Swiper */}
          {media.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              spaceBetween={12}
              slidesPerView={1}
              className="mb-8 overflow-hidden rounded-3xl bg-white shadow-great"
            >
              {media.map((m, i) => (
                <SwiperSlide key={i}>
                  <button
                    type="button"
                    onClick={() => onOpenModal(i)}
                    className="group block w-full cursor-zoom-in"
                    aria-label={t('open_media')}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      {m.type === 'video' ? (
                        <VideoThumb src={m.url} className="h-full w-full object-cover" />
                      ) : (
                        <img
                          src={m.url}
                          alt={`${localizedTitle} media ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="mb-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-great" />
          )}

          {/* Content */}
          <div
            className="prose prose-p:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Back CTA */}
          <div className="mt-10">
            <Link href="/packages">
              <div className="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                <span className="material-icons text-base">arrow_back</span>
                {t('back_to_packages')}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer isNotHome />

      {/* Fullscreen Modal */}
      {openModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3"
          onClick={onCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onCloseModal}
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label={t('close')}
          >
            <span className="material-icons">close</span>
          </button>

          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Swiper
              initialSlide={modalIndex}
              modules={[Navigation, Pagination, Keyboard]}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              spaceBetween={12}
              slidesPerView={1}
            >
              {media.map((m, i) => (
                <SwiperSlide key={`modal-${i}`}>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
                    {m.type === 'video' ? (
                      <VideoThumb src={m.url} className="h-full w-full object-contain" />
                    ) : (
                      <img
                        src={m.url}
                        alt={`media ${i + 1}`}
                        className="h-full w-full select-none object-contain"
                        draggable={false}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetailPage;
