import React from 'react';
import DecorHero from 'assets/images/decor-intersect-1.svg';
import DecorTextUnderlineHero from 'assets/images/text-decor-hero.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="relative -z-50 mb-28 " id="hero">
      <span className="absolute right-0 top-0 bottom-0 h-screen w-5/12">
        <DecorHero className="fill-accent-3" />
      </span>
      <div className="absolute -left-80 -top-10 h-[496px] w-[478px] rounded-full bg-accent-4/50 blur-3xl"></div>
      <div className="mx-auto  max-w-7xl px-4">
        <div className="flex">
          <div className="z-30 w-full pt-52 lg:w-[60%]">
            <h1 className="mb-6 text-sm font-bold uppercase text-accent-2 lg:text-xl">{t('hero_subtitle')}</h1>
            <h2
              style={{ lineBreak: 'normal' }}
              className="mb-8 w-full whitespace-pre-wrap font-serif text-4xl leading-tight text-gray-800 lg:text-[78px] lg:leading-[89px]"
            >
              {t('hero_title_prefix')} {t('hero_title_highlight')}&nbsp;
              <span className="relative leading-none">
                {t('hero_title_highlight2')}
                <span className="absolute top-full left-0 -z-10 h-full xl:top-[90%]">
                  <DecorTextUnderlineHero className="h-auto min-h-[5px] w-full min-w-[150px] fill-accent-2 " />
                </span>
              </span>{' '}
              {t('hero_title_suffix')}
            </h2>
            <p className="mb-8 max-w-lg text-sm leading-6 text-gray-500 lg:text-base lg:leading-8">
              {t('hero_description')}
            </p>
            <div className="flex">
              <Link href="https://t.me/oasistour">
                <span
                  style={{ cursor: 'pointer' }}
                  className="mr-11 rounded-xl bg-accent-1 px-6 py-4 text-white shadow-[0-25-35px]"
                >
                  {t('hero_button_info')}
                </span>
              </Link>
              <Link href="https://t.me/oasistour" className="flex items-center">
                <div className="flex cursor-pointer items-center justify-center">
                  <span className="mr-6 inline-flex items-center justify-center rounded-full bg-accent-2 p-4 text-white shadow-accent-2/30">
                    <span className="material-icons">play_arrow</span>
                  </span>
                  <span className="hidden text-gray-500 lg:block">{t('hero_button_demo')}</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="relative hidden w-[40%] pt-24 lg:block">
            <div className="absolute top-[10%] left-0  h-[95px] w-[137px]">
              <Image src="/images/plane.png" layout="responsive" width="100%" height="100%" alt={t('alt_plane')} />
            </div>
            <div className="absolute top-[60%] right-8  h-[95px] w-[137px]">
              <Image src="/images/plane.png" layout="responsive" width="100%" height="100%" alt={t('alt_plane')} />
            </div>
            <div className="relative top-10 right-0 w-[120%] -translate-x-[22%] transform   ">
              <Image
                src="/images/hero-traveller.png"
                priority
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="contain"
                alt={t('alt_traveller')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
