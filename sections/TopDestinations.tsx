import React from 'react';
import Image from 'next/image';
import DecorSwirl1 from 'assets/images/decor-swirl-style-1.svg';
import { useTranslation } from 'react-i18next';

const TopDestinations = () => {
  const { t } = useTranslation('common');

  return (
    <section className="mb-28" id="top">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col text-center">
          <h3 className="mb-2 text-lg uppercase text-gray-500">{t('topdest_popular')}</h3>
          <h3 className="font-serif text-4xl uppercase leading-tight text-gray-900 lg:text-5xl lg:leading-snug">
            {t('topdest_title')}
          </h3>
        </div>
        <div className="relative flex flex-wrap space-y-5 pr-0  lg:space-y-0 lg:pr-10">
          <div className="absolute bottom-10 right-0 h-[252px] w-[96px]">
            <DecorSwirl1 className="stroke-gray-600" />
          </div>

          {/* Destination 1 */}
          <div className="relative z-20 w-full px-4 lg:w-4/12">
            <div className="flex flex-col rounded-3xl bg-white pb-10 shadow-great">
              <div className="relative h-96 overflow-hidden rounded-tr-3xl rounded-tl-3xl">
                <Image
                  layout="fill"
                  className="object-cover object-top"
                  src="/images/destination-1.jpg"
                  alt={t('topdest_rome_alt')}
                />
              </div>
              <div className="text-gray-500">
                <div className="flex justify-between px-5 pt-7">
                  <h6 className="text-lg">{t('topdest_rome')}</h6>
                  <h6 className="text-lg">{t('topdest_rome_price')}</h6>
                </div>
                <div className="inline-flex items-center px-5 pt-4">
                  <span className="material-icons mr-2 text-black">near_me</span>
                  <span>{t('topdest_rome_days')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Destination 2 */}
          <div className="relative z-20 w-full px-4 lg:w-4/12">
            <div className="flex flex-col rounded-3xl bg-white pb-10 shadow-great">
              <div className="relative h-96 overflow-hidden rounded-tr-3xl rounded-tl-3xl">
                <Image
                  layout="fill"
                  className="object-cover object-top"
                  src="/images/destination-2.jpg"
                  alt={t('topdest_london_alt')}
                />
              </div>
              <div className="text-gray-500">
                <div className="flex justify-between px-5 pt-7">
                  <h6 className="text-lg">{t('topdest_london')}</h6>
                  <h6 className="text-lg">{t('topdest_london_price')}</h6>
                </div>
                <div className="inline-flex items-center px-5 pt-4">
                  <span className="material-icons mr-2 text-black">near_me</span>
                  <span>{t('topdest_london_days')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Destination 3 */}
          <div className="relative z-20 w-full px-4 lg:w-4/12">
            <div className="flex flex-col rounded-3xl bg-white pb-10 shadow-great">
              <div className="relative h-96 overflow-hidden rounded-tr-3xl rounded-tl-3xl">
                <Image
                  layout="fill"
                  className="object-cover object-top"
                  src="/images/destination-3.jpg"
                  alt={t('topdest_europe_alt')}
                />
              </div>
              <div className="text-gray-500">
                <div className="flex justify-between px-5 pt-7">
                  <h6 className="text-lg">{t('topdest_europe')}</h6>
                  <h6 className="text-lg">{t('topdest_europe_price')}</h6>
                </div>
                <div className="inline-flex items-center px-5 pt-4">
                  <span className="material-icons mr-2 text-black">near_me</span>
                  <span>{t('topdest_europe_days')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
