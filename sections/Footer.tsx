import React from 'react';
import Link from 'next/link';
import FacebookIco from 'assets/images/facebook.svg';
import InstagramIco from 'assets/images/instagram.svg';
import TwitterIco from 'assets/images/twitter.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="relative overflow-x-hidden pb-32">
      <div className="bg-accent-6.20 absolute -bottom-0 -right-10 z-10 h-6 w-60 rounded-full blur-3xl"></div>
      <div className="relative mx-auto max-w-full px-4 lg:max-w-7xl">
        <div className="mb-12 flex flex-wrap">
          <div className="w-full lg:w-3/12 lg:px-4">
            <h6 className="mb-4 text-5xl tracking-tight text-gray-900">Oasis Tour</h6>
            <p className="pr-8 text-sm text-gray-500">{t('footer_company_slogan')}</p>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-4">
              <div>
                <h6 className="mt-2 mb-6 text-xl font-semibold tracking-tight text-gray-900">{t('footer_company')}</h6>
                <ul className="space-y-2 text-lg text-gray-500">
                  <li>
                    <Link href="/#">
                      <a>{t('footer_about')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <a>{t('footer_careers')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <a>{t('footer_mobile_app')}</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="mt-2 mb-6 text-xl font-semibold tracking-tight text-gray-900">{t('footer_contact')}</h6>
                <ul className="space-y-2 text-lg text-gray-500">
                  <li>
                    <Link href="/#">
                      <a>{t('footer_help')}</a>
                    </Link>
                    /FAQ
                  </li>
                  <li>
                    <Link href="/#">
                      <a>{t('footer_press')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <a>{t('footer_partners')}</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="mt-2 mb-6 text-xl font-semibold tracking-tight text-gray-900">{t('footer_other')}</h6>
                <ul className="space-y-2 text-lg text-gray-500">
                  <li>
                    <Link href="/#">
                      <a>{t('footer_airline_fees')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <a>{t('footer_airlines')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <a>{t('footer_cheap_tickets')}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full lg:mt-0 lg:w-3/12">
            <div className="flex space-x-5">
              <Link href="https://facebook.com" className="cursor-pointer" passHref>
                <a target="blank" rel="noreferrer noopener">
                  <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white fill-black shadow-xl">
                    <span className="bg-gradient-social absolute inset-0 rotate-0 transform opacity-0 transition-all duration-300 group-hover:rotate-[180deg] group-hover:opacity-100"></span>
                    <span className="relative z-20">
                      <FacebookIco className="fill-black group-hover:fill-white" />
                    </span>
                  </div>
                </a>
              </Link>
              <Link href="https://instagram.com" className="cursor-pointer" passHref>
                <a target="blank" rel="noreferrer noopener">
                  <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white fill-black shadow-xl">
                    <span className="bg-gradient-social absolute inset-0 rotate-0 transform opacity-0 transition-all duration-300 group-hover:rotate-[180deg] group-hover:opacity-100"></span>
                    <span className="relative z-20">
                      <InstagramIco className="fill-black group-hover:fill-white" />
                    </span>
                  </div>
                </a>
              </Link>
              <Link href="https://twitter.com" className="cursor-pointer" passHref>
                <a target="blank" rel="noreferrer noopener">
                  <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full	bg-white fill-black shadow-xl">
                    <span className="bg-gradient-social absolute inset-0 rotate-0 transform opacity-0 transition-all duration-300 group-hover:rotate-[180deg] group-hover:opacity-100"></span>
                    <span className="relative z-20">
                      <TwitterIco className="fill-black group-hover:fill-white" />
                    </span>
                  </div>
                </a>
              </Link>
            </div>
            <h6 className="mt-7 text-xl tracking-tight text-gray-500">{t('footer_discover_app')}</h6>
            <div className="mt-4 flex space-x-1">
              <div className="relative h-[35px] w-[107px]">
                <a href="https://play.google.com" target="_blank" className="relative flex h-full w-full">
                  <Image layout="fill" alt="Google Play" className="object-contain" src="/images/google-play-1.jpg" />
                </a>
              </div>
              <div className="relative h-[35px] w-[107px]">
                <a href="https://www.apple.com/id/app-store/" target="_blank" className="relative flex h-full w-full">
                  <Image layout="fill" alt="App Store" className="object-contain" src="/images/apple-1.jpg" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-gray-500">{t('footer_rights')}</div>
      </div>
    </footer>
  );
};

export default Footer;
