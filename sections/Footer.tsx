import React from 'react';
import Link from 'next/link';
import FacebookIco from 'assets/images/facebook.svg';
import InstagramIco from 'assets/images/instagram.svg';
import TwitterIco from 'assets/images/twitter.svg';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="relative overflow-x-hidden  pb-32 pt-20">
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Top Row */}
        <div className="mb-12 flex flex-wrap items-start">
          {/* Brand */}
          <div className="mb-8 w-full lg:mb-0 lg:w-4/12">
            <h6 className="mb-4 bg-gradient-to-r from-accent-2 to-accent-1 bg-clip-text font-serif text-4xl font-bold text-transparent drop-shadow-sm">
              Oasis Tour
            </h6>
            <p className="pr-4 text-sm text-gray-600">{t('footer_company_slogan')}</p>
          </div>

          {/* Navigation */}
          <div className="w-full lg:w-8/12">
            <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 lg:gap-x-8">
              <div>
                <h6 className="mb-4 text-lg font-semibold text-gray-900">{t('footer_sections')}</h6>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#hero" className="hover:text-accent-2">
                      {t('nav_home')}
                    </a>
                  </li>
                  <li>
                    <a href="#internal" className="hover:text-accent-2">
                      {t('nav_internal')}
                    </a>
                  </li>
                  <li>
                    <a href="#external" className="hover:text-accent-2">
                      {t('nav_external')}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="mb-4 text-lg font-semibold text-gray-900">{t('footer_more')}</h6>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#category" className="hover:text-accent-2">
                      {t('nav_categories')}
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-accent-2">
                      {t('nav_destinations')}
                    </a>
                  </li>
                  <li>
                    <a href="#easy" className="hover:text-accent-2">
                      {t('nav_easy')}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="mb-4 text-lg font-semibold text-gray-900">{t('footer_about_us')}</h6>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#testimonials" className="hover:text-accent-2">
                      {t('nav_testimonials')}
                    </a>
                  </li>
                  <li>
                    <a href="#client" className="hover:text-accent-2">
                      {t('nav_clients')}
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-accent-2">
                      {t('nav_contact')}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="mb-4 text-lg font-semibold text-gray-900">{t('footer_follow_us')}</h6>
                <div className="flex space-x-4">
                  {[FacebookIco, InstagramIco, TwitterIco].map((Icon, idx) => (
                    <Link href="https://t.me/oasistour" key={idx} className="cursor-pointer" passHref>
                      <a target="blank" rel="noreferrer noopener">
                        <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white fill-black shadow-xl">
                          <span className="bg-gradient-social absolute inset-0 rotate-0 transform opacity-0 transition-all duration-300 group-hover:rotate-[180deg] group-hover:opacity-100"></span>
                          <span className="relative z-20">
                            <Icon className="fill-black group-hover:fill-white" />
                          </span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <div className="text-sm text-gray-500">{t('footer_rights')}</div>
          <div className="mt-1 text-xs text-gray-400">{t('footer_legal_info')}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
