import React from 'react';
import DecorPlus1 from 'assets/images/decor-plus-style-1.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Category = () => {
  const { t } = useTranslation('common');

  return (
    <section className="mb-32">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="absolute -top-10 h-36 w-36 lg:-right-10">
          <DecorPlus1 className="decor-plus-style-1" />
        </div>
        <div className="mb-16 flex flex-col text-center">
          <h3 className="mb-2 text-lg uppercase text-gray-500">{t('category_section_label')}</h3>
          <h3 className="font-serif text-4xl uppercase leading-tight text-gray-900 lg:text-5xl lg:leading-snug">
            {t('category_section_title')}
          </h3>
        </div>
        <div className="flex flex-wrap text-gray-900">
          <div className="w-full px-8 lg:w-3/12">
            <div className="group relative flex flex-col items-center justify-center rounded-[36px] bg-white text-center shadow-none transition-all duration-300 hover:shadow-great">
              <div className="absolute bottom-12 left-12 -z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 transform rounded-tl-3xl rounded-br-lg bg-accent-2 opacity-0 transition-all duration-300 group-hover:left-6 group-hover:bottom-6 group-hover:opacity-100"></div>
              <div className="relative mb-6 inline-flex h-28">
                <div className="absolute -right-11 z-10 translate-y-1/2 -translate-x-1/2">
                  <Image
                    layout="fixed"
                    width={60}
                    height={60}
                    src="/images/illustration-satellite.png"
                    alt="sun'iy yo'ldosh"
                  />
                </div>
                <div className="absolute bottom-0 left-5 h-12 w-12 -translate-x-1/2 transform rounded-tl-lg rounded-tr-md rounded-br-[18px] rounded-bl-md bg-accent-3"></div>
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">{t('category_item1_title')}</h4>
              <h5 className="mb-8 px-0 text-base font-medium text-gray-500 lg:px-8">{t('category_item1_desc')}</h5>
            </div>
          </div>
          <div className="w-full px-8 lg:w-3/12">
            <div className="group relative flex flex-col items-center justify-center rounded-[36px] bg-white text-center shadow-none transition-all duration-300 hover:shadow-great">
              <div className="absolute bottom-12 left-12 -z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 transform rounded-tl-3xl rounded-br-lg bg-accent-2 opacity-0 transition-all duration-300 group-hover:left-6 group-hover:bottom-6 group-hover:opacity-100"></div>
              <div className="relative mb-6 inline-flex h-28">
                <div className="absolute z-10 -translate-x-1/2">
                  <Image layout="fixed" width={146} height={133} src="/images/plane.png" alt={t('alt_plane')} />
                </div>
                <div className="absolute bottom-10 -left-3 h-12 w-12 -translate-x-1/2 transform rounded-tl-md rounded-tr-lg rounded-br-md rounded-bl-[18px] bg-accent-3"></div>
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">{t('category_item2_title')}</h4>
              <h5 className="mb-8 px-0 text-base font-medium text-gray-500 lg:px-8">{t('category_item2_desc')}</h5>
            </div>
          </div>
          <div className="w-full px-8 lg:w-3/12">
            <div className="group relative flex flex-col items-center justify-center rounded-[36px] bg-white text-center shadow-none transition-all duration-300 hover:shadow-great">
              <div className="absolute bottom-12 left-12 -z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 transform rounded-tl-3xl rounded-br-lg bg-accent-2 opacity-0 transition-all duration-300 group-hover:left-6 group-hover:bottom-6 group-hover:opacity-100"></div>
              <div className="relative mb-6 inline-flex h-28">
                <div className="absolute -left-3 top-2 z-10 translate-y-1/2 -translate-x-1/2">
                  <Image
                    layout="fixed"
                    width={40}
                    height={69}
                    src="/images/illustration-mic.png"
                    alt={t('category_microphone_alt')}
                  />
                </div>
                <div className="absolute bottom-5 left-3 h-12 w-12 -translate-x-1/2 transform rounded-tl-md rounded-tr-[18px] rounded-br-md rounded-bl-lg bg-accent-3"></div>
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">{t('category_item3_title')}</h4>
              <h5 className="mb-8 px-0 text-base font-medium text-gray-500 lg:px-8">{t('category_item3_desc')}</h5>
            </div>
          </div>
          <div className="w-full px-8 lg:w-3/12">
            <div className="group relative flex flex-col items-center justify-center rounded-[36px] bg-white text-center shadow-none transition-all duration-300 hover:shadow-great">
              <div className="absolute bottom-12 left-12 -z-10 h-28 w-28 -translate-x-1/2 translate-y-1/2 transform rounded-tl-3xl rounded-br-lg bg-accent-2 opacity-0 transition-all duration-300 group-hover:left-6 group-hover:bottom-6 group-hover:opacity-100"></div>
              <div className="relative mb-6 inline-flex h-28">
                <div className="absolute -right-10 top-3 z-10 translate-y-1/2 -translate-x-1/2">
                  <Image
                    layout="fixed"
                    width={50}
                    height={50}
                    src="/images/illustration-power.png"
                    alt={t('category_power_alt')}
                  />
                </div>
                <div className="absolute bottom-0 left-5 h-12 w-12 -translate-x-1/2 transform rounded-tl-md rounded-tr-lg rounded-br-md rounded-bl-[18px] bg-accent-3"></div>
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">{t('category_item4_title')}</h4>
              <h5 className="mb-8 px-0 text-base font-medium text-gray-500 lg:px-8">{t('category_item4_desc')}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
