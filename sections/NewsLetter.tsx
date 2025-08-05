import React from 'react';
import { useTranslation } from 'react-i18next';

import DecorPlus1 from 'assets/images/decor-plus-style-1.svg';
import DecorEllipse1 from 'assets/images/decor-ellipse-style-1.svg';

const NewsLetter = () => {
  const { t } = useTranslation('common');

  return (
    <section className="mb-32">
      <div className="relative mx-auto max-w-full px-4 lg:max-w-7xl">
        <div className="absolute bottom-0 -z-10 h-36 w-36 translate-y-1/2 rotate-90 transform lg:-right-20">
          <DecorPlus1 className="decor-plus-style-1" />
        </div>
        <div className="relative w-full bg-white">
          <div className="relative top-8 right-auto left-1/2 z-30 flex h-16 w-16 -translate-x-1/2 translate-y-0 transform items-center justify-center rounded-full bg-gradient-to-b from-accent-6/60 to-accent-6 lg:absolute lg:top-0 lg:right-0 lg:translate-x-1/2 lg:-translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex h-8 w-8 items-center justify-center text-4xl leading-[64px] text-white"
              height={24}
              viewBox="0 -960 960 960"
              width={24}
              fill="#fff"
            >
              <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z" />
            </svg>
          </div>
          <div className="relative z-20 mb-8 overflow-hidden rounded-xl rounded-tl-3xl bg-accent-4/20 pt-20 pb-20 lg:rounded-3xl lg:rounded-tl-[120px]">
            <div className="absolute top-0 right-0 h-[290px] w-[284px] -translate-y-1/3 translate-x-1/4 rotate-[45deg] scale-x-[-1] transform">
              <DecorEllipse1 className="stroke-accent-6/10 opacity-10" />
            </div>
            <div className="absolute -bottom-0 left-4 h-[397px] w-[389px] translate-y-1/3 transform">
              <DecorEllipse1 className="stroke-accent-6/10 opacity-10" />
            </div>
            <div className="relative z-10">
              <h6 className="mb-10 px-4 text-center text-lg font-bold leading-normal text-gray-500 lg:px-36 lg:text-3xl">
                {t('newsletter_subtitle')}
              </h6>
              <form action="" className="flex justify-center lg:space-x-5">
                <fieldset className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    className="absolute left-2 top-1/2 flex h-full w-8 -translate-y-1/2 items-center justify-center text-4xl leading-[64px] text-gray-500"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="oklch(55.1% 0.027 264.364)"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder={t('newsletter_email_placeholder')}
                    className="w-auto appearance-none rounded-l-lg border-2 border-transparent bg-white py-4 pl-14 transition duration-300 focus:border-accent-6 focus:outline-none lg:w-96 lg:rounded-lg"
                  />
                </fieldset>
                <button className="flex items-center justify-center gap-4 rounded-r-lg bg-gradient-to-b from-accent-2/90 to-accent-2 py-4 px-4 text-white lg:rounded-lg lg:px-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className=" flex h-6 w-6 items-center justify-center text-2xl leading-[24px] text-white"
                    fill="#fff"
                  >
                    <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                  </svg>
                  <span className="hidden lg:block">{t('newsletter_subscribe')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
