// @ts-nocheck
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, EffectCreative, Navigation, Pagination, Scrollbar } from 'swiper';
import { useTranslation } from 'react-i18next';

import 'swiper/css';

const Items = [
  {
    id: '1',
    descKey: 'testimonials_review_1_desc',
    image: 'user-1.jpg',
    author: 'Susan Smith',
    roleKey: 'testimonials_review_1_role',
  },
  {
    id: '2',
    descKey: 'testimonials_review_2_desc',
    image: 'user-2.jpg',
    author: 'Robert Danuarta',
    roleKey: 'testimonials_review_2_role',
  },
  {
    id: '3',
    descKey: 'testimonials_review_3_desc',
    image: 'user-3.jpg',
    author: 'Mia Khalifa',
    roleKey: 'testimonials_review_3_role',
  },
];

export default function Testimonials() {
  const { t } = useTranslation('common');
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleSlide = (idx: number) => () => {
    if (idx !== activeSlide) {
      swiperRef.current?.slideTo(idx);
    }
  };

  const handleSlideNext = useCallback(() => {
    if (activeSlide < Items.length - 1) {
      swiperRef.current?.slideNext();
    }
  }, [activeSlide]);

  const handleSlidePrev = useCallback(() => {
    if (activeSlide > 0) {
      swiperRef.current?.slidePrev();
    }
  }, [activeSlide]);

  return (
    <section className="mb-28" id="testimonials">
      <div className="relative mx-auto max-w-full px-4 lg:max-w-7xl">
        <div className="flex flex-wrap">
          <div className="w-full px-0 lg:w-5/12 lg:pl-8 lg:pr-20">
            <div className="mb-16 flex flex-col">
              <h3 className="mb-2 text-lg uppercase text-gray-500">{t('testimonials_label')}</h3>
              <h3 className="mb-10 font-serif text-4xl leading-tight text-gray-900 lg:text-5xl lg:leading-snug">
                {t('testimonials_title')}
              </h3>
              <ul className="flex gap-x-6">
                {Items.map((item, idx) => (
                  <li
                    key={idx}
                    className={classNames('h-2 w-2 cursor-pointer rounded-full', {
                      'bg-gray-800': activeSlide === idx,
                      'bg-gray-300': activeSlide !== idx,
                    })}
                    onClick={handleSlide(idx)}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative flex h-[320px] w-full items-center justify-center lg:h-auto lg:w-6/12">
            <div className="absolute -inset-4 lg:-inset-10 lg:-top-20">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCreative]}
                spaceBetween={50}
                slidesPerView={1}
                effect="creative"
                creativeEffect={{
                  prev: {
                    translate: [60, 70, 0],
                  },
                  next: {
                    translate: ['-100%', '-100%', 0],
                  },
                }}
                simulateTouch={false}
                onSlideChange={(slide) => setActiveSlide(slide.realIndex)}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {Items.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative px-12 pt-10 pb-48 lg:px-32 lg:pt-20">
                      <div className="relative">
                        <div className="relative z-20 rounded-xl bg-white p-6 shadow-great">
                          <span className="absolute top-0 left-0 mr-3 h-12 w-12 flex-none -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full">
                            <Image
                              layout="responsive"
                              className="object-cover"
                              width="100%"
                              height="100%"
                              src={`/images/${item.image}`}
                              alt={item.author}
                            />
                          </span>
                          <p className="mb-8 text-gray-500">{t(item.descKey)}</p>
                          <h6 className="text-lg text-gray-900">{item.author}</h6>
                          <h6 className="text-sm text-gray-500">{t(item.roleKey)}</h6>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="hidden w-full items-center justify-center lg:flex lg:w-1/12">
            <div className="flex flex-col">
              <button
                onClick={handleSlidePrev}
                className={classNames({
                  'text-gray-300': activeSlide === 0,
                  'text-gray-800': activeSlide !== 0,
                })}
              >
                <span className="material-icons mr-2">keyboard_arrow_up</span>
              </button>
              <button
                onClick={handleSlideNext}
                className={classNames({
                  'text-gray-300': activeSlide === Items.length - 1,
                  'text-gray-800': activeSlide !== Items.length - 1,
                })}
              >
                <span className="material-icons mr-2">keyboard_arrow_down</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
