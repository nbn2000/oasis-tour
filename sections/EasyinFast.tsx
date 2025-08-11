import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const EasyinFast = () => {
  const { t } = useTranslation('common');

  return (
    <div className="mb-28" id="easy">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4">
        <div className="flex flex-wrap space-x-4 space-y-4 lg:space-y-0 lg:space-x-0">
          <div className="w-full pl-0 lg:w-6/12 lg:pl-6">
            <div className="mb-3 flex flex-col text-left lg:mb-16">
              <h3 className="mb-2 text-lg uppercase text-gray-500">{t('easy_section_label')}</h3>
              <h3 className="mb-8 font-serif text-4xl uppercase leading-tight text-gray-900 lg:text-5xl lg:leading-snug">
                {t('easy_section_title')}
              </h3>
            </div>

            <ul className="flex flex-col gap-y-8 lg:gap-y-12">
              <li className="flex items-center gap-x-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-1">
                  <span className="material-icons text-white">navigation</span>
                </span>
                <div className="flex flex-col leading-5">
                  <h6 className="font-bold text-gray-900">{t('easy_step1_title')}</h6>
                  <p className="font-thin text-gray-500">{t('easy_step1_desc')}</p>
                </div>
              </li>

              <li className="flex items-center gap-x-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-2">
                  <span className="material-icons text-white">credit_card</span>
                </span>
                <div className="flex flex-col leading-5">
                  <h6 className="font-bold text-gray-900">{t('easy_step2_title')}</h6>
                  <p className="font-thin text-gray-500">{t('easy_step2_desc')}</p>
                </div>
              </li>

              <li className="flex items-center gap-x-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-7">
                  <span className="material-icons text-white">plane</span>
                </span>
                <div className="flex flex-col leading-5">
                  <h6 className="font-bold text-gray-900">{t('easy_step3_title')}</h6>
                  <p className="font-thin text-gray-500">{t('easy_step3_desc')}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex w-full items-center justify-center lg:w-6/12">
            <div className="relative w-[370px]">
              <div className="absolute -top-10 -right-10 z-10 h-60 w-60 rounded-full bg-accent-7/40 blur-3xl" />

              <div className="absolute bottom-16 -right-1 z-30 w-[263px] translate-x-0 transform rounded-2xl bg-white p-4 pr-7 shadow-great lg:right-0 lg:translate-x-1/2">
                <div className="flex">
                  <span className="mr-3 h-12 w-12 flex-none overflow-hidden rounded-full">
                    <Image
                      src="/images/destination-5.jpg"
                      layout="responsive"
                      width="100%"
                      height="100%"
                      alt={t('alt_greece')}
                    />
                  </span>
                  <div className="mb-2 flex w-full flex-col">
                    <span className="text-sm text-gray-500">{t('easy_status_in_progress')}</span>
                    <span className="mb-2 text-sm text-gray-900">{t('easy_trip_name_rome')}</span>
                    <span className="mb-1 text-xs">
                      <span className="mr-1 text-accent-6">{t('easy_completed_percentage')}</span>
                      <span className="text-gray-900">{t('easy_completed_label')}</span>
                    </span>
                    <span className="flex h-1 w-full rounded-full bg-gray-200">
                      <span className="h-full w-20 rounded-full bg-accent-6" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-20 rounded-xl bg-white px-4 pt-4 pb-5 shadow-great">
                <div className="relative mb-6 h-40 overflow-hidden rounded-3xl">
                  <Image layout="fill" className="object-cover" src="/images/destination-4.jpg" alt={t('alt_greece')} />
                </div>
                <h6 className="mb-2 text-lg font-bold text-gray-900">{t('easy_card_title')}</h6>
                <div className="mb-4 flex text-gray-500">
                  <h6>{t('easy_card_date')}</h6>
                  <span className="mx-2">|</span>
                  <h6>{t('easy_card_by')}</h6>
                </div>
                <div className="mb-6 flex gap-x-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                    <span className="material-icons text-base">spa</span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                    <span className="material-icons text-base">map</span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                    <span className="material-icons text-base">near_me</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3 text-gray-500">
                    <span className="material-icons text-base">apartment</span>
                    <span>{t('easy_metric_participants')}</span>
                  </div>
                  <span className="material-icons text-2xl text-accent-6">favorite_border</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyinFast;
